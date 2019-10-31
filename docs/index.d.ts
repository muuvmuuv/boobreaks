import './style.scss';
export declare type Breakpoint = string;
export declare type Width = number;
export interface Vars {
    breakpoints: Breakpoint[];
    widths: Width[];
}
/**
 * Default bootstrap values.
 *
 * @see https://github.com/twbs/bootstrap/blob/master/scss/_variables.scss#L191-L197
 */
declare const vars: Vars;
/**
 * The target element to optain the pseudo content value from.
 */
/**
 * Set the target.
 */
/**
 * Returns current breakpoint alias.
 */
declare function current(): Breakpoint | undefined;
/**
 * Returns current breakpoint size.
 */
declare function width(): Width | undefined;
/**
 * Returns true if current breakpoint matches passed glob.
 */
declare function is(str: string): boolean | undefined;
export { vars, current, is, width };
