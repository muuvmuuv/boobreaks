# Boobreaks 📏

[Demo](https://muuvmuuv.github.io/boobreaks/)

A simple and small (782B JavaScript and 131B CSS) utility to make [Bootstraps
breakpoints][1] available in your JavaScript files.

## Installation

```bash
$ npm install boobreaks
```

## How to use

First you need to install [Bootstrap](https://getbootstrap.com/) on your site and
then add either the SCSS yourself or load the CSS (recommend) file.

### SCSS

```scss
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/mixins';
@import 'bootstrap/scss/variables';

body {
  &::before {
    content: 'xs';
    display: none;
  }

  @each $breakpoint, $breakpoint-width in $grid-breakpoints {
    @include media-breakpoint-up($breakpoint) {
      &::before {
        content: '#{$breakpoint}';
      }
    }
  }
}
```

### CSS (recommend)

```css
@import 'boobreaks/dist/boobreaks.css';
```

### JavaScript

```js
import Boobreaks from 'boobreaks'

console.log(`Breakpoint is at`, Boobreaks.current(), Boobreaks.width())
```

## Available functions

| Function    | Params   | Return   | Description                                             |
| ----------- | -------- | -------- | ------------------------------------------------------- |
| `current()` | /        | `string` | Current breakpoint alias.                               |
| `width()`   | /        | `number` | Current screen width by alias.                          |
| `is()`      | `string` | `string` | If the current screen matches the pattern, e.g.: `>=sm` |

[1]: https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
