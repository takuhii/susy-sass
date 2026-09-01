# Susy-sass: Power Tools For The Web

Susy-sass is an agnostic set of tools for creating powerful, custom layouts. We provide the language, but you provide all the opinions.

**This is the Susy 2.x _mixin_ API, kept alive on modern [Dart Sass](https://sass-lang.com/dart-sass/).** It's a fork of the original Susy 2.x library — the version with the ergonomic layout mixins (`@include container()`, `@include span(3 of 12)`) — updated to run on Dart Sass instead of the deprecated Node-sass. Susy 3.x deliberately removed those mixins; this project exists to keep them working.

## Which Susy should I use?

There are two maintained forks, serving different needs:

| You want… | Use |
| --- | --- |
| Ergonomic layout **mixins** — `@include container()`, `@include span(3 of 12)` | **`susy-sass`** (this project) |
| Trimmed-down, function-only grid **math** — `span()`, `gutter()`, build your own mixins | [**`susy-sass3`**](https://github.com/takuhii/susy-sass3) |

If you're upgrading an existing Susy 2.x project, or you just want the mixins to do the work for you, you're in the right place. If you'd rather compose your own grid system from raw math primitives, [susy-sass3](https://github.com/takuhii/susy-sass3) is the modern continuation of Susy 3.x.

## Project status

**Legacy, but maintained.** The 2.x mixin API is stable and complete. This project is kept working on current toolchains (Dart Sass, current Node.js), but it is not gaining new features. "Legacy" here means _stable and supported_, not abandoned.

### Support policy

**In scope** (contributions and issues welcome):

- Bug fixes that restore documented 2.x behaviour
- Compatibility fixes for new Dart Sass / Node.js releases
- Deprecation-warning cleanup and toolchain/build maintenance
- Documentation corrections and clarifications

**Out of scope** (belongs in [susy-sass3](https://github.com/takuhii/susy-sass3)):

- New mixins, functions, or settings — any new API surface
- Changes to the existing mixin API's behaviour or signatures
- Adopting the function-only 3.x design

If you need new capabilities, [susy-sass3](https://github.com/takuhii/susy-sass3) is the actively-developed continuation and the right place for feature work.

## Features

- Use a grid, don't use a grid, or use a combination of grids — it's all up to you
- Compatible with both legacy (@import) and modern (@use) Sass syntax
- Works with Dart Sass (the actively maintained Sass implementation)
- No external dependencies beyond Sass itself

## Installation

```bash
npm install susy-sass --save-dev
```

Make sure you have Sass installed in your project:

```bash
npm install sass --save-dev
```

## Usage

### Legacy Syntax (with @import)

```scss
@import "susy";

.container {
  @include container();
}

.span {
  @include span(3 of 12);
}
```

### Modern Syntax (with @use)

```scss
@use "susy-modern" as susy;

.container {
  @include susy.container();
}

.span {
  @include susy.span(3 of 12);
}
```

Note: The legacy syntax will show deprecation warnings with Dart Sass but will continue to work until Dart Sass 3.0.0.

## Recent Improvements

- **Modern Sass Support**: Updated to work with Dart Sass instead of the deprecated Node-sass
- **Dual Syntax Support**: Added support for both legacy (@import) and modern (@use) Sass syntax
- **Improved Testing**: Replaced Ruby-based tests with a modern Node.js testing approach
- **CI Integration**: Added GitHub Actions workflow for continuous integration
- **Cleaned Codebase**: Removed unnecessary Ruby-related files for a more focused package

## Documentation

For detailed documentation on using Susy, please refer to:

- [Susy Documentation](https://susy-sass-docs.readthedocs.io/en/latest/)
- [Susy Website](http://takuhii.github.io/susy-sass/)

## Development

### Testing

Run the tests to ensure everything is working correctly:

```bash
npm test
```

`npm test` runs the full test suite:

1. the sass-true value-assertion suite (grid math and function return values),
2. a compile check of both the legacy (`@import`) and modern (`@use`) entry points, and
3. a sass-true CSS output-comparison suite for the output primitives (the
   `shared` / `support` / `float` output layers), run via Mocha.

Note: the higher-level `language/susy` mixin output tests (span, container,
gallery, etc.) are not yet ported to the sass-true 5.x
`assert()`/`output()`/`expect()` API — see `TODO.md`.

## License

BSD-3-Clause

## Credits

Original Susy created by [Miriam Eric Suzanne](https://github.com/mirisuzanne).
This fork maintained by [Darren Mackintosh](https://github.com/takuhii).
