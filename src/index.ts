import './style.scss'

export type Breakpoint = string
export type Width = number

export interface Vars {
  breakpoints: Breakpoint[]
  widths: Width[]
}

/**
 * Default bootstrap values.
 *
 * @see https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss#L191-L197
 */
const vars: Vars = {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  widths: [0, 576, 768, 992, 1200],
}

/**
 * The target element to optain the pseudo content value from.
 */
// let __target: HTMLElement = <HTMLElement>document.querySelector('body')

/**
 * Set the target.
 */
// function target(element: string | HTMLElement) {
//   let target
//   if (typeof element === 'string') {
//     target = <HTMLElement>document.querySelector(element)
//   } else {
//     target = element
//   }
//   if (!target) {
//     return console.error('Unknown element', element)
//   }
//   __target = target
// }

/**
 * Returns current breakpoint alias.
 */
function current(): Breakpoint | undefined {
  const target = <HTMLElement>document.querySelector('body')
  const content = window.getComputedStyle(target, ':before').getPropertyValue('content')
  // if (content === 'none') {
  //   console.error('No breakpoint value found for', target)
  // }
  return content.replace(/"/g, '') || undefined
}

/**
 * Returns current breakpoint size.
 */
function width(): Width | undefined {
  const curr = current()
  if (!curr) return undefined
  return vars.widths[vars.breakpoints.indexOf(curr.toLowerCase())]
}

/**
 * Returns true if current breakpoint matches passed glob.
 */
function is(str: string): boolean | undefined {
  if (__isAnExpression(str)) {
    return __isMatchingExpression(str)
  }

  return current() === str
}

/**
 * Determines whether passed string is a parsable expression.
 */
function __isAnExpression(str: string): boolean {
  return str.charAt(0) === '<' || str.charAt(0) === '>'
}

/**
 * Splits the expression into <,> and = alias.
 */
function __splitExpression(str: string) {
  const operator = str.charAt(0) // operator
  const orEqual = str.charAt(1) === '=' // equal to

  /**
   * Index at which the breakpoint name starts.
   *
   * For:  >sm, index = 1
   * For: >=sm, index = 2
   */
  const index = 1 + (orEqual ? 1 : 0)

  /**
   * The remaining part of the expression, after the operator, will be treated as the
   * breakpoint name to compare with
   */
  const breakpointName = str.slice(index)

  return {
    operator,
    orEqual,
    breakpointName,
  }
}

/**
 * Determines whether current breakpoint matches the expression given
 */
function __isMatchingExpression(str: string): boolean | undefined {
  const curr = current()
  if (!curr) return undefined

  const expression = __splitExpression(str)

  let pos = vars.breakpoints.indexOf(expression.breakpointName)
  if (pos == -1) return undefined

  let start: number = 0
  let end: number | undefined = undefined

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
    end = expression.orEqual ? ++pos : pos
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
    start = expression.orEqual ? pos : ++pos
  }

  const acceptedBreakpoints = vars.breakpoints.slice(start, end)

  /**
   * If there are no accepted breakpoints we are below `xs` or above `xl` and if
   * it matches the current breakpoint its true.
   */
  if (acceptedBreakpoints.length === 0 && expression.breakpointName === current()) {
    return true
  }

  return acceptedBreakpoints.includes(curr)
}

export { vars, current, is, width }
