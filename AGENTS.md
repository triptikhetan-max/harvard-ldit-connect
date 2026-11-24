<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep fictional platform records in `src/data/mockData.ts`; all demo views consume one browser-side context so changes survive navigation without real authentication or database writes.
- Keep matching and message generation in pure browser-safe helpers with rule tests; matching must honor directory consent and hidden fields.
- Give each platform section its own TanStack route and metadata; retain networking preparation on the coffee chat guide.
- Preserve the uploaded First Hello activity in an isolated iframe with its fictional records exported from the shared mock data module; this retains the authored game mechanics without colliding with the app DOM.
- Use licensed fonts only; local Adobe Garamond and ITC Franklin Gothic font stacks fall back to system serif/sans fonts until authorized web fonts are supplied.
