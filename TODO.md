# susy-sass — Roadmap & Improvements

## Guiding principle

`susy-sass` is the **Susy 2.x mixin API on modern Dart Sass**. Its whole reason
to exist is the ergonomic, opinionated mixins (`@include container()`,
`@include span(3 of 12)`) that oddbird's Susy 3.x deliberately removed.

The sibling project **`susy-sass3`** is the maintained continuation of that
function-only 3.x branch (`span()`, `gutter()` — you build your own mixins).

**Every improvement here must protect the 2.x mixin API. Improve everything
_around_ it — never drift toward becoming a duplicate of susy-sass3.**

### Do NOT (these turn us into susy-sass3)

- [ ] ~~Remove or deprecate mixins~~
- [ ] ~~Add a `susy-prefix` entry point or rename entry points to match 3.x~~
- [ ] ~~Rewrite the API around bare functions~~
- [ ] ~~Bump to a 3.x version number~~

---

## 1. Positioning & docs (highest priority, lowest risk) — ✅ DONE

Make the identity explicit so users self-route to the right project.

- [x] Update `README.md` to state clearly: this is the **Susy 2.x mixin API on
      Dart Sass**, kept alive because 3.x dropped the mixins.
- [x] Add a "Which Susy should I use?" section:
  - `susy-sass` (this) → want mixins like `@include span(3 of 12)`.
  - `susy-sass3` → want the trimmed-down, function-only 3.x math primitives.
- [x] Cross-link **forward** to `susy-sass3`
      (https://github.com/takuhii/susy-sass3). Note: susy-sass3's README
      already links _back_ to the Susy 1/2 docs, so this closes the loop.
- [x] Mirror the same positioning in `susy-sass-docs`
      (index page: "Which Susy should I use?" + status note; reworked the
      stale "ToDo" section into "Maintenance"). Docs build verified (exit 0,
      no new warnings).

## 2. Maintenance status (legacy, but honest) — ✅ DONE

Keep it clearly "legacy" without implying "abandoned".

- [x] Add a maintenance-status line: **stable 2.x API, maintained to keep
      working on modern toolchains (Dart Sass, current Node), not gaining new
      features.** ("Legacy" = stable and supported, not abandoned.)
- [x] State the support policy explicitly — in-scope (bug fixes, Dart
      Sass/Node compatibility, deprecation cleanup, docs) vs out-of-scope (any
      new API surface / behaviour changes → susy-sass3). Added as a "Support
      policy" section in `README.md` and mirrored in the docs
      `index.rst` "Maintenance" section. Docs build verified (exit 0).

## 3. Finish the test suite (defends the differentiator) — 🟡 PARTIAL

The value here is the _mixins_. `npm test` now runs value assertions AND CSS
output-comparison for the output primitives via Mocha. The higher-level
`language/susy` mixin output tests remain to be ported.

Done:

- [x] Discovered that sass-true 5.x output-comparison requires the JS runner
      (Mocha), not just CLI compilation. Added `mocha` devDep + `test/sass.test.js`
      calling `runSass(...)` with `sass: require('sass')` (Dart Sass).
- [x] Resolved the `output()` name collision: Susy defines a global `output()`
      mixin that clashed with sass-true's. Fixed by loading sass-true through a
      namespace (`@use "sass-true/sass/true" as t`) in the output-test entry so
      Susy's own `output()` stays reachable.
- [x] Ported the helpers and the **output primitives** to the sass-true 5.x
      `assert()`/`output()`/`expect()` API: `output/shared/*`, `output/support/*`,
      `output/float/*`. New entry `test/scss/test-output.scss`, wired into
      `npm test` as step 4. **23 output-comparison tests passing.**
- [x] Kept the value-assertion suite (`test-values.scss`) intact and green.

Remaining (deferred):

- [ ] Port the `language/susy` mixin output tests (span, container, gallery,
      bleed, rows, gutters, margins, padding, background, isolate,
      breakpoint-plugin, box-sizing). These are large, their expected blocks
      call Susy's own `output()` and use deprecated `percentage(x/y)` math, and
      each assertion must be verified against actual emitted CSS (sass-true does
      an exact literal comparison — old scaffolding decls do NOT match real
      output). Port file-by-file, verifying each against Mocha output.
- [ ] Re-enable / retire the legacy `test/scss/test.scss` aggregator once the
      language tests are ported (it still uses removed sass-true internals like
      `_true-get-result`).
- [ ] Note: `test/scss/test/_layout.scss` is old HTML-report scaffolding with a
      stray assertion; it is intentionally not imported by either entry.

## 4. Borrow tooling from susy-sass3 (NOT its API)

susy-sass3 has a stronger dev setup that can be adopted wholesale with zero
change to our API surface.

- [ ] Add **stylelint** (`stylelint` + `stylelint-config-standard-scss` +
      `stylelint-scss`) with a `lint` script over `sass/**/*.scss`.
      Add `.stylelintrc.json` / `.stylelintignore`.
- [ ] Add **sassdoc** (`sassdoc`, optionally `sassdoc-theme-herman`) with a
      `sassdoc` script to generate API docs from the source comments.
- [ ] Consider a structured **mocha + sass-true** harness (as susy-sass3 uses)
      once the output tests are ported (see section 3).
- [ ] Wire a `commit`/CI script that runs lint + test (+ sassdoc) together.

## 5. Optional cleanups (decide, then act)

Open questions flagged during the modernization pass.

- [ ] **Eyeglass**: decide whether to keep or drop the `eyeglass` block +
      `eyeglass-exports.js` (+ the `eyeglass-module` keyword). It's a
      node-sass-era tool that doesn't apply on Dart Sass. Kept for now to avoid
      breaking existing consumers.
- [ ] **susy-sass-docs duplication**: the docs repo carries copies of `sass/`,
      `test/`, and `templates/`. Decide whether those should stay (for building
      examples) or be removed as stale duplicates.

---

## Notes / context

- Current version: **2.4.0** (published `2.3.2` is already on npm).
- Toolchain: Dart Sass (`sass ^1.77.0`), Node `>=20.19.0`, CI matrix 20/22/24.
- Package is slimmed to `sass/` + `eyeglass-exports.js` + README + LICENSE.
- License: BSD-3-Clause (derivative of Miriam Suzanne's original; fork
  attribution added).
