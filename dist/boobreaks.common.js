/*!
 * Boobreaks v3.0.1
 * https://github.com/muuvmuuv/boobreaks
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 2019-05-08T08:31:20.646Z
 */
"use strict";const BoobreaksVars={breakpoints:["xs","sm","md","lg","xl"],widths:[null,576,768,992,1200]};class Boobreaks{constructor(r){this.vars=Object.assign({},BoobreaksVars,r)}current(){const r=document.querySelector("body");if(!r)throw new Error("No `body` found!");return window.getComputedStyle(r,":before").getPropertyValue("content").replace(/"/g,"")||"unrecognized"}width(){return this.vars.widths[this.vars.breakpoints.indexOf(this.current().toLowerCase())]}is(r){return this.isAnExpression(r)?this.isMatchingExpression(r)||!1:this.current()===r}isAnExpression(r){return"<"===r.charAt(0)||">"===r.charAt(0)}splitExpression(r){const s=r.charAt(0),t="="===r.charAt(1),e=1+(t?1:0);return{operator:s,orEqual:t,breakpointName:r.slice(e)}}isMatchingExpression(r){const s=this.splitExpression(r),t=this.vars.breakpoints;let e=t.indexOf(s.breakpointName);if(-1!==e){let r=0,o=0;return"<"===s.operator&&(r=0,o=s.orEqual?++e:e),">"===s.operator&&(r=s.orEqual?e:++e,o=void 0),t.slice(r,o).includes(this.current())}}}module.exports=Boobreaks;
//# sourceMappingURL=boobreaks.common.js.map
