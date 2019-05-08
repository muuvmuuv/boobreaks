/*!
 * Boobreaks v3.3.0
 * https://github.com/muuvmuuv/boobreaks
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 08.05.2019
 */
"use strict";class Boobreaks{constructor(r){this.vars=Object.assign({},{breakpoints:["xs","sm","md","lg","xl"],widths:[null,576,768,992,1200]},r)}current(){const r=document.querySelector("body");if(!r)throw new Error("No `body` found!");return window.getComputedStyle(r,":before").getPropertyValue("content").replace(/"/g,"")||"unrecognized"}width(){return this.vars.widths[this.vars.breakpoints.indexOf(this.current().toLowerCase())]}is(r){return this.isAnExpression(r)?this.isMatchingExpression(r)||!1:this.current()===r}isAnExpression(r){return"<"===r.charAt(0)||">"===r.charAt(0)}splitExpression(r){const t=r.charAt(0),e="="===r.charAt(1),s=1+(e?1:0);return{operator:t,orEqual:e,breakpointName:r.slice(s)}}isMatchingExpression(r){const t=this.splitExpression(r),e=this.vars.breakpoints;let s=e.indexOf(t.breakpointName);if(-1!==s){let r=0,o=0;return"<"===t.operator&&(r=0,o=t.orEqual?++s:s),">"===t.operator&&(r=t.orEqual?s:++s,o=void 0),e.slice(r,o).includes(this.current())}}}module.exports=Boobreaks;
//# sourceMappingURL=boobreaks.common.js.map
