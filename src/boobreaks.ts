import './boobreaks.scss'

export type XS = 'xs'
export type SM = 'sm'
export type MD = 'md'
export type LG = 'lg'
export type XL = 'xl'
export type ALIAS = XS | SM | MD | LG | XL
export type UN = 'unrecognized'

export interface IBoobreaksVars {
  breakpoints: string[]
  widths: (number | null)[]
}

/**
 * Default bootstrap values.
 *
 * @see https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss#L191-L197
 */
const BoobreaksVars: IBoobreaksVars = {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  widths: [null, 576, 768, 992, 1200],
}

class Boobreaks {
  private vars: IBoobreaksVars

  constructor(vars: IBoobreaksVars) {
    this.vars = { ...BoobreaksVars, ...vars }
  }

  /**
   * Returns current breakpoint alias.
   */
  current(): ALIAS | UN {
    const body = document.querySelector('body')
    if (!body) throw new Error('No `body` found!')
    return <ALIAS>window
        .getComputedStyle(body, ':before')
        .getPropertyValue('content')
        .replace(/"/g, '') || 'unrecognized'
  }

  /**
   * Returns current breakpoint size.
   */
  width(): number | null {
    return this.vars.widths[
      this.vars.breakpoints.indexOf(this.current().toLowerCase())
    ]
  }

  /**
   * Returns true if current breakpoint matches passed glob.
   */
  is(str: string): boolean {
    if (this.isAnExpression(str)) {
      return this.isMatchingExpression(str) || false
    }

    return this.current() === str
  }

  /**
   * Determines whether passed string is a parsable expression
   */
  private isAnExpression(str: string): boolean {
    return str.charAt(0) === '<' || str.charAt(0) === '>'
  }

  /**
   * Splits the expression into <,> and = alias
   */
  private splitExpression(str: string) {
    // Used operator
    const operator = str.charAt(0)
    // Includes breakpoint equal to alias?
    const orEqual = str.charAt(1) === '='

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
  private isMatchingExpression(str: string): boolean | undefined {
    const expression = this.splitExpression(str)

    // Cache breakpoint names
    const breakpointList = this.vars.breakpoints

    // Get index of sought breakpoint in the list
    let pos = breakpointList.indexOf(expression.breakpointName)

    // Breakpoint found
    if (pos !== -1) {
      let start: number | undefined = 0
      let end: number | undefined = 0

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
        start = 0
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
        end = undefined
      }

      const acceptedBreakpoints = breakpointList.slice(start, end)

      return acceptedBreakpoints.includes(this.current())
    }

    return undefined
  }
}

export default Boobreaks
