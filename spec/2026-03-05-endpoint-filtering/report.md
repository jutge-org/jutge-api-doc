# Filtering Endpoints in the Sidebar

## Current Architecture

The documentation page has two independent data paths:

1. **Sidebar** (`AppSidebar`): receives a `tree: Item[]` built by `modules()` in `lib/api/dir.ts`.
   The `Item` type has `name`, `url`, `type`, `spath`, and optionally `actor` and `items`.
   Crucially, **the `endpoints()` function in `dir.ts` does NOT copy `actor` or `domains` into the
   sidebar Items** — it only copies `name`, `url`, `type`, `spath`.

2. **Main content** (`Module` → `Endpoint`): receives the raw `ApiModule` tree and renders endpoints
   with full `ApiEndpoint` data (including `actor` and `domains`). This is a server component.

Both paths call `getApiDir()` independently (layout for sidebar, page for content).

## What Needs to Change

### 1. Propagate `actor` and `domains` into sidebar Items

In `lib/api/dir.ts`, the `endpoints()` function must copy `actor` and `domains` from the
`ApiEndpoint` into the `Item`:

```ts
export function endpoints(mod: ApiModule, path: string[]): Item[] {
    return mod.endpoints.map(
        (endpoint: any): Item => ({
            name: endpoint.name,
            url: `#${path.join(".")}.${endpoint.name}`,
            type: "endpoint",
            spath: path.map((p) => `${p}.`).join(""),
            actor: endpoint.actor, // ADD
            domains: endpoint.domains, // ADD
            isActive: false,
        }),
    )
}
```

The `Item` type in `types.ts` already has `actor?: string` but needs `domains?: string[]` added.

### 2. Create filter state (shared between sidebar and main content)

Since the sidebar is a client component but the main content (`Module`, `Endpoint`) are server
components, we need a way to share filter state. Options:

-   **Option A — URL search params**: Store filters in the URL (e.g.,
    `?actor=userActor&domain=jutge`). Both sidebar and content can read them. Requires making
    content components aware of params, but the `Module` component is a server component that
    doesn't filter — it renders everything.

-   **Option B — React Context**: Create a `FilterProvider` context in the layout. The sidebar sets
    filters, and the main content reads them. This requires the `Module`/`Endpoint` components to
    become client components (or wrapping them in a client filtering layer).

-   **Option C — Sidebar-only filtering (hide in sidebar, CSS-hide in content)**: The sidebar
    filters its own tree. For the main content, use a client wrapper that hides non-matching
    endpoints via CSS/JS. This avoids converting server components to client components.

**Recommended: Option B** — React Context. The `EndpointWrapper` is already a client component, so
we can leverage that to hide/show endpoints based on filter state. The `Module` component stays as a
server component rendering all endpoints, but each `EndpointWrapper` checks context and hides itself
if filtered out. We'd need to pass `actor` and `domains` to `EndpointWrapper`.

### 3. Add filter UI in the sidebar

Add a new section at the top of the sidebar (above the "API Directory" group) with two filter
groups:

**Actor filter** (single-select, radio-like):

-   All (default — no filter)
-   Public (`anyActor`)
-   User (`userActor`)
-   Instructor (`instructorActor`)
-   Competitions (`competitionsActor`)
-   Admin (`adminActor`)

**Domain filter** (single-select, radio-like):

-   All (default — no filter)
-   Normal (`jutge`)
-   Exam/Contest (`exam` + `contest`)

### 4. Apply filtering

When a filter is active:

-   **Sidebar**: Hide endpoint Items that don't match. Hide module Items that become empty after
    filtering. This requires the sidebar to know `actor` and `domains` per endpoint (hence step 1).

-   **Main content**: Each `EndpointWrapper` reads filter context. If the endpoint doesn't match, it
    renders `null` (or `display: none`). We need to pass `actor` and `domains` to `EndpointWrapper`.
    The `Module` sections that become fully empty should also hide — this can be done with a client
    wrapper around each module section that checks if any children are visible.

## Summary of Files to Modify

| File                                            | Change                                            |
| ----------------------------------------------- | ------------------------------------------------- |
| `lib/api/types.ts`                              | Add `domains?: string[]` to `Item`                |
| `lib/api/dir.ts`                                | Copy `actor` and `domains` in `endpoints()`       |
| `app/documentation/layout.tsx`                  | Wrap with `FilterProvider`                        |
| `components/app-sidebar.tsx`                    | Add filter UI section; filter tree based on state |
| `components/documentation/endpoint.tsx`         | Pass `actor`/`domains` to wrapper                 |
| `components/documentation/endpoint-wrapper.tsx` | Read filter context, hide if filtered             |
| `components/documentation/module.tsx`           | Possibly wrap module sections to hide when empty  |
| New: `components/filter-provider.tsx`           | React Context for filter state                    |
