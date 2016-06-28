<h1 align="center">GEL Sass Tools</h1>
<p align="center">
  <a href="https://travis-ci.org/bbc/gel-sass-tools" target="_blank"><img src="https://travis-ci.org/bbc/gel-sass-tools.svg?branch=master"></a>
</p>
<p align="center">
    A collection of Sass Settings & Tools which align to key GEL values.<br />
    Forms part of the <a href="https://github.com/bbc/gel-foundations" target="_blank"><b>GEL Foundations</b></a>
</p>

## What is this?

GEL Sass Tools is a collection of Sass variables, functions and mixins which allows you to work with GEL units consistently within your Sass. It is also required by other [GEL Foundations](https://github.com/bbc/gel-foundations) components.

Here is how you could use these tools in your Sass:

```sass
.my-component {
    margin-top: $gel-spacing-unit;

    @include mq($from: gel-bp-m) {
        margin-top: double($gel-spacing-unit);
    }
}
```

This would compile to:

```css
.my-component {
    margin-top: 8px;
}

@media (min-width: 37.50em) {
    .my-component {
        margin-top: 16px;
    }
}
```

## Installation

### Install using Bower

```bash
$ bower install --save gel-sass-tools
```

```sass
// your-app/main.scss
@import 'bower_components/gel-sass-tools/sass-tools';
@import 'bower_components/sass-mq/mq'
```

### Install using NPM

```bash
$ npm install --save gel-sass-tools
```

```sass
// your-app/main.scss
@import 'node_modules/gel-sass-tools/sass-tools';
@import 'node_modules/sass-mq/mq'
```

### Install manually

You can install this component manually by downloading the content of this Git repo into your project and use a Sass @import to include it in your project.

> **Note:** you will manually need to manage the dependencies below, without these this component will fail to compile.

## Dependencies

In order to use the component you will need the following components available:

- [Sass MQ](https://github.com/sass-mq/sass-mq)

## Usage

Usage of the included tools is as follows:

### Spacing units

The following spacing variables are made available:

- `$gel-spacing-unit` - baseline spacing unit - `8px`
- `$gel-alt-spacing-unit` - alternative baseline spacing unit - `12px`

### Breakpoints

The following breakpoints are defined and added to the [Sass MQ](https://github.com/sass-mq/sass-mq) breakpoint list:

- `gel-bp-xs` - 240px
- `gel-bp-s` - 400px
- `gel-bp-m` - 600px
- `gel-bp-l` - 900px
- `gel-bp-xl` - 1008px
- `gel-bp-xxl` - 1280px

These can be called when using the `mq` mixin:

```sass
.my-component {
    ...

    @include mq($from: gel-bp-s) {
        ...
    }

    @include mq($from: gel-bp-m) {
        ...
    }

    @include mq($from: gel-bp-l) {
        ...
    }
}
```

### Math functions

The following `math` functions are included:

- `quarter($value)`
- `third($value)`
- `halve($value)`
- `double($value)`
- `triple($value)`
- `quadruple($value)`

These functions can be used inline with any numerical CSS rule. E.g:

```sass
.my-component {
    margin-bottom: halve($gel-spacing-unit);
    padding-left: double($gel-spacing-unit);
    padding-right: double($gel-spacing-unit);
}
```

or functions can be nested within other Sass features such as mixins:

```sass
.my-component {
    @include rem('margin-bottom', halve($gel-spacing-unit));
    @include rem('padding-left', double($gel-spacing-unit));
    @include rem('padding-right', double($gel-spacing-unit));
}
```

### REM mixin

The `rem` tool can be used in two ways. Either by directly calling the `rem($value)` function, which will convert the supplied value and return a `rem` unit. E.g:

```sass
.my-component {
    margin-bottom: rem($gel-spacing-unit);
}
```

> Beware that [rem](http://caniuse.com/#feat=rem) units are not universal supported. IE8 and below do not support `rem` so require a `px` fallback.

You can also use the `@include rem($value);` mixin, which by default returns a `px` fallback to allow support for older browsers which don't support `rem` units. E.g:

**Sass**
```sass
.my-component {
    @include rem('margin-bottom', 16px);
}
```

**CSS**
```css
.my-component {
    margin-bottom: 16px;
    margin-bottom: 1rem;
}
```

#### Options

The following options can be defined before the tools partial is included to customise the functionality and output. By default the following options are all set to `true`:

- `$gel-tools-rem-enable--function` - enable/disable the rem conversion, if this option is disabled only `px` values will be returned
- `$gel-tools-rem-enable--mixin` - disable the mixin if you only want to output the `px`, this can be useful for IE8 stylesheets who don't need `rem` values
- `$tel-tools-rem-enable--fallback` - disable the automatic generation of a `px` fallback when the mixin in called, use this open if you want to remove all `px` values from your stylesheets

### Right-to-Left (RTL)

Support for Right-to-Left language is offered via two methods to flip CSS styles: interpolated properties and the `flip()` function.

Interpolation should be used for any property which has a direction (e.g. `padding-left`, `margin-right`, `border-right`, `left`, etc), `flip()`` should be used for all other properties.

#### Which properties need to be flipped?

- `background`
- `background-position`
- `border`
- `border-radius`
- `clear`
- `cursor`
- `direction`
- `float`
- `left/right`
- `margin`
- `padding`
- `text-align`
- `text-indent`

#### Flip

Taking the following CSS as an example:

```sass
// Original Sass
.my-component {
    float: left;
}
```

For a RTL layout, `float: left;` should be flipped to `float: right;`. We can use the `flip()` function to accomplish this.

```sass
// Flipped Sass
.my-component {
    float: flip(left, right);
}
```

When Sass comes across the `flip()` function, it will check the value of the `$rtl` variable. If `$rtl` is `false`, the `flip()` function will take the first parameter. If `$rtl` is `true`, the `flip()` function will take the second parameter.

The Sass will compile out as follows:

```sass
// Compiled LTR style
.my-component {
    float: left;
}

// Compiled RTL style
.my-component {
    float: right;
}
```

#### Interpolation

Interpolation is used to adjust CSS properties which contain a direction within their name. For example `padding-left` would need to change to `padding-right` in a RTL context. Our interpolation technique works by changing the value of variables based on the value of the `$rtl` variable.

Taking the following CSS as an example:

```sass
// Original Sass
.my-component {
    padding-left: $gel-spacing-unit; // 8px
}
```

For a RTL layout, `padding-left: 8px;` should be flipped to `padding-right: 8px;`.

In order to flip this, we have to interpolate the style property:

```sass
// Flipped Sass
.my-component {
    #{$padding-left}: $gel-spacing-unit; // 8px
}
```

This will compile out to:

```sass
// Compiled LTR style
.my-component {
    padding-left: 8px;
}

// Compiled RTL style
.my-component {
    padding-right: 8px;
}
```

#### Best practices & Tips

- Don't flip everything! Only flip what needs to be flipped. This will help keep the CSS as clean and predictable as possible.
- Styles which are hiding elements by pushing them off the screen (e.g. `text-align: -320px;` or `right: 5000%;`) don't need to be flipped unless they are being transitioned or overridden.
- If left and right properties have the same values in the same selector, they don't need to be flipped (e.g. `margin-left: 0;` `margin-right: 0;`)

## Credits

- [Shaun Bent](https://twitter.com/shaunbent)
- [Al Jones](https://twitter.com/Itsaljones)

## License

> The MIT License (MIT)
>
> Copyright 2016 British Broadcasting Corporation
>
> Permission is hereby granted, free of charge, to any person obtaining a copy of
> this software and associated documentation files (the "Software"), to deal in
> the Software without restriction, including without limitation the rights to
> use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
> the Software, and to permit persons to whom the Software is furnished to do so,
> subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
> FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
> COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
> IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
> CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
