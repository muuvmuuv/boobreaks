/*!
 * Boobreaks v3.0.1
 * https://github.com/muuvmuuv/boobreaks
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 2019-05-08T08:31:20.646Z
 */
!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Boobreaks = t())
})(this, function() {
  'use strict'
  const e = {
    breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
    widths: [null, 576, 768, 992, 1200],
  }
  return class {
    constructor(t) {
      this.vars = Object.assign({}, e, t)
    }
    current() {
      const e = document.querySelector('body')
      if (!e) throw new Error('No `body` found!')
      return (
        window
          .getComputedStyle(e, ':before')
          .getPropertyValue('content')
          .replace(/"/g, '') || 'unrecognized'
      )
    }
    width() {
      return this
        .vars.widths[this.vars.breakpoints.indexOf(this.current().toLowerCase())]
    }
    is(e) {
      return this.isAnExpression(e)
        ? this.isMatchingExpression(e) || !1
        : this.current() === e
    }
    isAnExpression(e) {
      return '<' === e.charAt(0) || '>' === e.charAt(0)
    }
    splitExpression(e) {
      const t = e.charAt(0),
        r = '=' === e.charAt(1),
        s = 1 + (r ? 1 : 0)
      return { operator: t, orEqual: r, breakpointName: e.slice(s) }
    }
    isMatchingExpression(e) {
      const t = this.splitExpression(e),
        r = this.vars.breakpoints
      let s = r.indexOf(t.breakpointName)
      if (-1 !== s) {
        let e = 0,
          o = 0
        return (
          '<' === t.operator && ((e = 0), (o = t.orEqual ? ++s : s)),
          '>' === t.operator && ((e = t.orEqual ? s : ++s), (o = void 0)),
          r.slice(e, o).includes(this.current())
        )
      }
    }
  }
})
//# sourceMappingURL=boobreaks.js.map
