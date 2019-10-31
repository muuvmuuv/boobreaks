# Boobreaks 📏

[Demo](https://muuvmuuv.github.io/boobreaks/)

A simple and small (881 bytes) utility to make [Bootstraps breakpoints][1] available in
your JavaScript files.

> Tested with Bootstrap version: 4.3.1

- [Installation](#installation)
- [How to use](#how-to-use)
  - [UMD](#umd)
  - [CommonJS](#commonjs)
- [Available functions](#available-functions)

## Installation

```bash
npm install boobreaks
```

## How to use

### UMD

Load the library:

```html
<!-- <head> -->
<link rel="stylesheet" href="./path/to/boobreaks.umd.css" />
<script defer src="./path/to/boobreaks.umd.js"></script>
<!-- </head> -->
```

Use it:

```js
console.log(`Breakpoint is at`, Boobreaks.current(), Boobreaks.width())
```

### CommonJS

```javascript
import 'boobreaks/dist/boobreaks.css'
import { current, width } from 'boobreaks'

console.log(`Breakpoint is at`, current(), width())
```

## Available functions

| Function    | Params     | Return   | Description                                                |
| ----------- | ---------- | -------- | ---------------------------------------------------------- |
| `current()` | none       | `string` | Current breakpoint alias.                                  |
| `width()`   | none       | `number` | Current screen width by alias.                             |
| `is()`      | expression | `string` | If the current screen matches the expression, e.g.: `>=sm` |

[1]: https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
