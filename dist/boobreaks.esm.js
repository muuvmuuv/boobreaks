/*!
 * Boobreaks v2.4.0
 * https://github.com/muuvmuuv/boobreaks
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 2019-05-08T07:40:36.592Z
 */
const r={breakpoints:["xs","sm","md","lg","xl"],widths:[null,576,768,992,1200]};export default class{constructor(t){this.vars=Object.assign({},r,t)}current(){const r=document.querySelector("body");if(!r)throw new Error("No `body` found!");return window.getComputedStyle(r,":before").getPropertyValue("content").replace(/"/g,"")||"unrecognized"}width(){return this.vars.widths[this.vars.breakpoints.indexOf(this.current().toLowerCase())]}is(r){return this.isAnExpression(r)?this.isMatchingExpression(r)||!1:this.current()===r}isAnExpression(r){return"<"===r.charAt(0)||">"===r.charAt(0)}splitExpression(r){const t=r.charAt(0),e="="===r.charAt(1),s=1+(e?1:0);return{operator:t,orEqual:e,breakpointName:r.slice(s)}}isMatchingExpression(r){const t=this.splitExpression(r),e=this.vars.breakpoints;let s=e.indexOf(t.breakpointName);if(-1!==s){let r=0,i=0;return"<"===t.operator&&(r=0,i=t.orEqual?++s:s),">"===t.operator&&(r=t.orEqual?s:++s,i=void 0),e.slice(r,i).includes(this.current())}}}
//# sourceMappingURL=boobreaks.esm.js.map
