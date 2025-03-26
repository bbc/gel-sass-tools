<h1 align="center">GEL Sass Tools</h1>
<p align="center">
    A collection of Sass Settings & Tools which align to key GEL values.<br />
    Forms part of the <a href="https://github.com/bbc/gel-foundations" target="_blank"><b>GEL Foundations</b></a>
</p>

## Breaking Change: v4.0.0

v4.0.0 of GEL Sass Tools implements the [@use](https://sass-lang.com/documentation/at-rules/use/) and [@forward](https://sass-lang.com/documentation/at-rules/forward/) approach and removes [@import](https://sass-lang.com/documentation/at-rules/import/).

This has a number of consequences; how modules are loaded, and how to access variables. Namespaces now come into play, so please read the sass documentation links above to learn more.

In addition there were a number of __browser prefixes__ used in versions prior to v4. Given how much the browser landscape has changed since they were added, it is __now time to remove them__.

For usage of GEL Sass Tools prior to v4.0.0 please reference the [v3.4.0 readme](https://github.com/bbc/gel-sass-tools/tree/3.4.0).


## What is this?

GEL Sass Tools is a collection of Sass variables, functions and mixins which allows you to work with GEL units consistently within your Sass. It is also used by other [GEL Foundations](https://github.com/bbc/gel-foundations) components.

Here is how you could use these tools in your Sass:

```scss
@use 'gel-sass-tools/sass-tools';
@use 'sass-mq/mq';

.my-component {
    margin-top: sass-tools.$gel-spacing-unit;

    @include mq.mq($from: gel-bp-m) {
        margin-top: sass-tools.double(sass-tools.$gel-spacing-unit);
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

### Install using NPM

```bash
$ npm install --save gel-sass-tools
```

```scss
// your-app/main.scss
@use 'gel-sass-tools/sass-tools';

```

### Install manually

You can install this component manually by downloading the content of this Git repo into your project and use a Sass @use to include it in your project.

> **Note:** you will manually need to manage the dependencies below, without these this component will fail to compile.


### IMPORTANT: Specify a Loadpath

Because this module depends on other modules such as [Sass MQ](https://github.com/sass-mq/sass-mq), when compiling your Sass it needs to know where find the referenced modules. It does this via a [loadPath](https://sass-lang.com/documentation/at-rules/use/#load-paths).

If compiling from the command line you can specify:
```
sass --load-path=node_modules/ <options>
```

whereas within nodejs you can call compile ot compileAsync:
```js
await sass.compileAsync(file, { loadPaths: ['./node_modules'] })
```

This ensures the dependencies required by this module can be loaded correctly.

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

```scss
@use 'sass-mq/mq';

.my-component {
    ...

    @include mq.mq($from: gel-bp-s) {
        ...
    }

    @include mq.mq($from: gel-bp-m) {
        ...
    }

    @include mq.mq($from: gel-bp-l) {
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

```scss
@use 'gel-sass-tools/sass-tools';

.my-component {
    margin-bottom: sass-tools.halve(sass-tools.$gel-spacing-unit);
    padding-left: sass-tools.double(sass-tools.$gel-spacing-unit);
    padding-right: sass-tools.double(sass-tools.$gel-spacing-unit);
}
```

or functions can be nested within other Sass features such as mixins:

```scss
@use 'gel-sass-tools/sass-tools';

.my-component {
    @include sass-tools.toRem('margin-bottom', sass-tools.halve(sass-tools.$gel-spacing-unit));
    @include sass-tools.toRem('padding-left', sass-tools.double(sass-tools.$gel-spacing-unit));
    @include sass-tools.toRem('padding-right', sass-tools.double(sass-tools.$gel-spacing-unit));
}
```

### REM mixin

The `rem` tool can be used in two ways. Either by directly calling the `toRem($value)` function, which will convert the supplied value and return a `rem` unit. E.g:

```scss
@use 'gel-sass-tools/sass-tools';

.my-component {
    margin-bottom: sass-tools.toRem(sass-tools.$gel-spacing-unit);
}
```

> Beware that [rem](http://caniuse.com/#feat=rem) units are not universal supported. IE8 and below do not support `rem` so require a `px` fallback.

You can also use the `@include toRem($value);` mixin, which by default returns a `px` fallback to allow support for older browsers which don't support `rem` units. E.g:

**Sass**
```scss
@use 'gel-sass-tools/sass-tools';

.my-component {
    @include sass-tools.toRem('margin-bottom', 16px);
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
- `$gel-tools-rem-enable--fallback` - disable the automatic generation of a `px` fallback when the mixin in called, use this open if you want to remove all `px` values from your stylesheets

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

```scss
// Original Sass
.my-component {
    float: left;
}
```

For a RTL layout, `float: left;` should be flipped to `float: right;`. We can use the `flip()` function to accomplish this.

```scss
@use 'gel-sass-tools/sass-tools';

.ltr {
    float: sass-tools.flip(left, right);
}

sass-tools.$rtl: true;

.rtl {
    float: sass-tools.flip(left, right);
}
```

When Sass comes across the `flip()` function, it will check the value of the `$rtl` variable. If `$rtl` is `false`, the `flip()` function will take the first parameter. If `$rtl` is `true`, the `flip()` function will take the second parameter.

The Sass will compile out as follows:

```css
.ltr {
    float: left;
}

.rtl {
    float: right;
}
```

#### Interpolation

Interpolation is used to adjust CSS properties which contain a direction within their name. For example `padding-left` would need to change to `padding-right` in a RTL context. Our interpolation technique works by changing the value of variables based on the value of the `$rtl` variable.

Taking the following CSS as an example:

```scss
@use 'gel-sass-tools/sass-tools';

// Original Sass
.my-component {
    padding-left: sass-tools.$gel-spacing-unit; // 8px
}
```

For a RTL layout, `padding-left: 8px;` should be flipped to `padding-right: 8px;`.

In order to flip this, we have to interpolate the style property:

```scss
@use 'gel-sass-tools/sass-tools';

.ltr {
    #{sass-tools.$padding-left}: sass-tools.$gel-spacing-unit; // 8px
}

sass-tools.$rtl: true;

.rtl {
    #{sass-tools.$padding-left}: sass-tools.$gel-spacing-unit; // 8px
}

```

This will compile out to:

```css
.ltr {
    padding-left: 8px;
}

.rtl {
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
