# Report: Filtering the Search Dialog

## The Problem

The search dialog (Ctrl+K) shows all endpoints regardless of the active filter. If a user selects
"User" credentials and then searches, they see endpoints like `auth.login` (anyActor) which are hidden
in the documentation. Pressing Enter navigates to an invisible endpoint.

## Architecture Issue

The `Header` component (which contains `SearchBar`) is rendered in the **root layout**
(`app/layout.tsx`), which is _outside_ the `FilterProvider` that lives in the documentation layout
(`app/documentation/layout.tsx`).

```
RootLayout (app/layout.tsx)
├── Header + SearchBar          ← outside FilterProvider
├── DocumentationLayout (app/documentation/layout.tsx)
│   └── FilterProvider
│       ├── AppSidebar
│       └── Page content
```

This means `SearchBar` **cannot** use `useFilter()` — it would get the default empty context values
(no filter applied) since it's not wrapped by `FilterProvider`.

## The Solution

The search results are already `Item[]` objects that include `actor` (and we should add `domains`).
The `searchDirectory` function in `lib/api/search.ts` already copies `actor` into the result items
(line 22) but not `domains`.

### Changes needed:

1. **`lib/api/search.ts`**: Add `domains: endpoint.domains` to the search result items (line 18-25).

2. **Move `FilterProvider` up to the root layout**: Instead of wrapping only the documentation layout,
   wrap the entire app (or at least the `Header` + documentation area). This way `SearchBar` can
   access the filter context.

   In `app/layout.tsx`:
   ```tsx
   <FilterProvider>
       <Header directory={directory} />
       ...
       {children}
   </FilterProvider>
   ```

   And remove the `FilterProvider` from `app/documentation/layout.tsx`.

3. **`components/header/search-bar.tsx`**: Import `useFilter` and `matchesFilter`. After
   `searchDirectory` returns results, filter them:
   ```ts
   const { actorFilter, domainFilter } = useFilter()
   // in the useEffect:
   let results = searchDirectory(directory, search)
   if (actorFilter || domainFilter) {
       results = results.filter(r => matchesFilter(r.actor, r.domains, { actor: actorFilter, domain: domainFilter }))
   }
   ```

### Summary of changes:

| File | Change |
|------|--------|
| `lib/api/search.ts` | Add `domains` to result items |
| `app/layout.tsx` | Wrap with `FilterProvider` |
| `app/documentation/layout.tsx` | Remove `FilterProvider` wrapper |
| `components/header/search-bar.tsx` | Filter search results using `useFilter` + `matchesFilter` |
