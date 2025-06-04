# Susy-sass: Power Tools For The Web

Susy-sass is an agnostic set of tools for creating powerful, custom layouts. We provide the language, but you provide all the opinions.

This is a fork of the original Susy 2.x library (not Susy 3.x as it has no mixins), updated to work with modern Dart Sass instead of the deprecated Node-sass.

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

This will test both the legacy (@import) and modern (@use) syntax approaches.

### Cleanup

If you want to remove unnecessary Ruby-related files:

```bash
npm run cleanup
```

## License

BSD-3-Clause

## Credits

Original Susy created by [Miriam Eric Suzanne](https://github.com/mirisuzanne).
This fork maintained by [Darren Mackintosh](https://github.com/takuhii).
