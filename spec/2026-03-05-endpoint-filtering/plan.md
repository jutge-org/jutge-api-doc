# Implementation Plan: Endpoint Filtering

## Step 1 — Add `domains` to `Item` type

**File: `lib/api/types.ts`**

Add `domains?: string[]` to the `Item` type (line 43-51).

## Step 2 — Propagate `actor` and `domains` into sidebar Items

**File: `lib/api/dir.ts`**

In the `endpoints()` function (line 30-39), add `actor: endpoint.actor` and `domains: endpoint.domains` to the returned Item object.

## Step 3 — Create `FilterProvider` context

**New file: `components/filter-provider.tsx`**

- `"use client"` component.
- Define filter state type:
  ```ts
  type FilterState = {
      actor: string    // "" means "all", otherwise "anyActor" | "userActor" | "instructorActor" | "competitionsActor" | "adminActor"
      domain: string   // "" means "all", otherwise "jutge" | "exam_contest"
  }
  ```
- Create context with state + setters: `actorFilter`, `setActorFilter`, `domainFilter`, `setDomainFilter`.
- Export `FilterProvider` wrapper and `useFilter` hook.
- A helper function `matchesFilter(actor, domains, filter)` that returns `boolean`:
  - If `filter.actor` is set, `actor` must match.
  - If `filter.domain === "jutge"`, `domains` must include `"jutge"`.
  - If `filter.domain === "exam_contest"`, `domains` must include both `"exam"` and `"contest"`.

## Step 4 — Wrap layout with `FilterProvider`

**File: `app/documentation/layout.tsx`**

Wrap the `SidebarProvider` children (or the whole return) with `<FilterProvider>`. Since the layout is a server component, we wrap the client part:

```tsx
<SidebarProvider>
    <FilterProvider>
        <AppSidebar ... />
        <div ...>{children}</div>
    </FilterProvider>
</SidebarProvider>
```

## Step 5 — Add filter UI at the bottom of the sidebar

**File: `components/app-sidebar.tsx`**

Add a new `SidebarGroup` below `<RawFiles>` with label "Filter". Inside it, two `<select>` elements with small font:

```tsx
<SidebarGroup>
    <SidebarGroupLabel>Filter</SidebarGroupLabel>
    <SidebarGroupContent>
        <div className="flex flex-col gap-2 px-2">
            <select
                className="text-xs border rounded px-1 py-0.5"
                value={actorFilter}
                onChange={(e) => setActorFilter(e.target.value)}
            >
                <option value="">Credentials: All</option>
                <option value="anyActor">Public</option>
                <option value="userActor">User</option>
                <option value="instructorActor">Instructor</option>
                <option value="competitionsActor">Competitions</option>
                <option value="adminActor">Admin</option>
            </select>
            <select
                className="text-xs border rounded px-1 py-0.5"
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
            >
                <option value="">Domain: All</option>
                <option value="jutge">Normal (jutge)</option>
                <option value="exam_contest">Exam / Contest</option>
            </select>
        </div>
    </SidebarGroupContent>
</SidebarGroup>
```

## Step 6 — Filter the sidebar tree

**File: `components/app-sidebar.tsx`**

Add a `filterTree` function that takes the tree and filter state, and returns a filtered copy:

- For endpoint Items: keep only if `matchesFilter(item.actor, item.domains, filter)`.
- For module Items: recursively filter `item.items`, then keep the module only if it still has children.
- When no filter is active (both ""), return the tree as-is.

Apply this to the tree before rendering: `const filteredTree = filterTree(tree, { actor: actorFilter, domain: domainFilter })`.

## Step 7 — Hide filtered endpoints in main content

**File: `components/documentation/endpoint.tsx`**

Pass `actor={endpoint.actor}` and `domains={endpoint.domains}` as new props to `EndpointWrapper`.

**File: `components/documentation/endpoint-wrapper.tsx`**

- Import `useFilter` and `matchesFilter` from the filter provider.
- If the endpoint doesn't match the current filter, return `null` (or render with `hidden` class).
- Add `actor?: string` and `domains?: string[]` to the `Props` type.

## Step 8 — Hide empty module sections in main content

**File: `components/documentation/module.tsx`**

The `Module` component is a server component. To hide empty modules we have two options:

- **Option A**: Wrap the module `<div>` in a small client component (`ModuleWrapper`) that checks if it has visible children (using a ref or context). If all endpoints inside are hidden, hide the module section too.
- **Option B**: Keep it simple — hidden endpoints will leave an empty module section visible. This is acceptable if filtering is expected to be used occasionally.

**Recommended: Option A** — Create a `ModuleWrapper` client component that uses `useFilter` + the module's endpoint data to determine visibility. It receives the list of endpoints' actor/domains and hides if none match.

## Order of Implementation

1. Step 1 + 2 (types + data propagation) — no visible change
2. Step 3 (FilterProvider) — no visible change
3. Step 4 (wrap layout) — no visible change
4. Step 5 (filter UI in sidebar) — selects appear, but don't do anything yet
5. Step 6 (filter sidebar tree) — sidebar filtering works
6. Step 7 (filter main content endpoints) — main content filtering works
7. Step 8 (hide empty modules) — polish
