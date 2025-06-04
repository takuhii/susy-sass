Power Tools For The Web
=======================
First of all, I take no credit for this what-so-ever. I just needed to use Susy 2.x (not Susy 3.x as it has no mixins), and wanted to change it to work with SASS instead of NODE-SASS, which is now does...

Susy-sass is an agnostic set of tools for creating powerful, custom layouts. We provide the language, but you provide all the opinions.

Use a grid, don't use a grid, or use a combination of grids — it's all up to you.

We didn't want to build another system, we wanted to build power tools that you could use in any system.

Resources
---------

- [Website](http://susy.oddbird.net/)
- [Documentation](http://susydocs.oddbird.net/)

Usage
-----

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
