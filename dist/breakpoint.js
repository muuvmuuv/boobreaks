"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Use Bootstrap breakpoints inside you JavaScript!
 *
 * Originally created by Maciej Gurban
 * https://github.com/maciej-gurban/responsive-bootstrap-toolkit
 *
 * @author Marvin Heilemann
 * @license MIT
 * @see https://getbootstrap.com/docs/4.3/layout/overview/#responsive-breakpoints
 */
var Breakpoint = {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  widths: [null, 576, 768, 992, 1200],

  /**
   * Returns current breakpoint alias.
   *
   * @example Breakpoint.current()
   * @return {string} xs|sm|md|lg|xl
   */
  current: function current() {
    return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/"/g, '') || 'unrecognized';
  },

  /**
   * Returns current breakpoint size.
   *
   * @example Breakpoint.width()
   * @return {boolean} null|576|768|992|1200
   */
  width: function width() {
    return this.widths[this.breakpoints.indexOf(this.current().toLowerCase())];
  },

  /**
   * Returns true if current breakpoint matches passed glob.
   *
   * @example Breakpoint.is('<=md')
   * @return {boolean} true|false
   */
  is: function is(str) {
    if (this._isAnExpression(str)) {
      return this._isMatchingExpression(str);
    }

    return this.current() === str;
  },

  /**
   * Determines whether passed string is a parsable expression
   */
  _isAnExpression: function _isAnExpression(str) {
    return str.charAt(0) === '<' || str.charAt(0) === '>';
  },

  /**
   * Splits the expression into <,> and = alias
   */
  _splitExpression: function _splitExpression(str) {
    // Used operator
    var operator = str.charAt(0); // Includes breakpoint equal to alias?

    var orEqual = str.charAt(1) === '=';
    /**
     * Index at which the breakpoint name starts.
     *
     * For:  >sm, index = 1
     * For: >=sm, index = 2
     */

    var index = 1 + (orEqual ? 1 : 0);
    /**
     * The remaining part of the expression, after the operator, will be treated as the
     * breakpoint name to compare with
     */

    var breakpointName = str.slice(index);
    return {
      operator: operator,
      orEqual: orEqual,
      breakpointName: breakpointName
    };
  },

  /**
   * Returns true if currently active breakpoint matches the expression
   */
  _isAnyActive: function _isAnyActive(breakpoints) {
    var _this = this;

    return breakpoints.find(function (alias) {
      return _this.current() === alias;
    });
  },

  /**
   * Determines whether current breakpoint matches the expression given
   */
  _isMatchingExpression: function _isMatchingExpression(str) {
    var expression = this._splitExpression(str); // Cache breakpoint names


    var breakpointList = this.breakpoints; // Get index of sought breakpoint in the list

    var pos = breakpointList.indexOf(expression.breakpointName); // Breakpoint found

    if (pos !== -1) {
      var start = 0;
      var end = 0;
      /**
       * Parsing viewport.is('<=md') we interate from smallest breakpoint ('xs') and end
       * at 'md' breakpoint, indicated in the expression,
       * That makes: start = 0, end = 2 (index of 'md' breakpoint)
       *
       * Parsing viewport.is('<md') we start at index 'xs' breakpoint, and end at
       * 'sm' breakpoint, one before 'md'.
       * Which makes: start = 0, end = 1
       */

      if (expression.operator === '<') {
        start = 0;
        end = expression.orEqual ? ++pos : pos;
      }
      /**
       * Parsing viewport.is('>=sm') we interate from breakpoint 'sm' and end at the end
       * of breakpoint list.
       * That makes: start = 1, end = undefined
       *
       * Parsing viewport.is('>sm') we start at breakpoint 'md' and end at the end of
       * breakpoint list.
       * Which makes: start = 2, end = undefined
       */


      if (expression.operator === '>') {
        start = expression.orEqual ? pos : ++pos;
        end = undefined;
      }

      var acceptedBreakpoints = breakpointList.slice(start, end);
      return this._isAnyActive(acceptedBreakpoints);
    }
  }
};
var _default = Breakpoint;
exports.default = _default;
//# sourceMappingURL=breakpoint.js.map
