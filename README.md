# Boobreaks

A utility to make [Bootstraps breakpoints][1] available in your JavaScript
files.

## Installation

```bash
$ npm install boobreaks
```

## Usage

First you need to install [Bootstrap](https://getbootstrap.com/) on your site
and then add the below snippet somewhere in your [SCSS](https://sass-lang.com/)
files.

```scss
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

## Development

```bash
$ npm install
$ npm start
```

## Production

```bash
$ npm run build
```

## Todo

- [] Add testing
- [] Add badges

[1]: https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
