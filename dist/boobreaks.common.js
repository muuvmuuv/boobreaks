/*!
 * Boobreaks v3.2.0
 * https://github.com/muuvmuuv/boobreaks
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 2019-05-08T11:39:17.403Z
 */
"use strict";class Boobreaks{constructor(r){this.vars={breakpoints:["xs","sm","md","lg","xl"],widths:[null,576,768,992,1200]},this.vars=Object.assign({},this.vars,r)}current(){const r=document.querySelector("body");if(!r)throw new Error("No `body` found!");return window.getComputedStyle(r,":before").getPropertyValue("content").replace(/"/g,"")||"unrecognized"}width(){return this.vars.widths[this.vars.breakpoints.indexOf(this.current().toLowerCase())]}is(r){return this.isAnExpression(r)?this.isMatchingExpression(r)||!1:this.current()===r}isAnExpression(r){return"<"===r.charAt(0)||">"===r.charAt(0)}splitExpression(r){const t=r.charAt(0),s="="===r.charAt(1),e=1+(s?1:0);return{operator:t,orEqual:s,breakpointName:r.slice(e)}}isMatchingExpression(r){const t=this.splitExpression(r),s=this.vars.breakpoints;let e=s.indexOf(t.breakpointName);if(-1!==e){let r=0,o=0;return"<"===t.operator&&(r=0,o=t.orEqual?++e:e),">"===t.operator&&(r=t.orEqual?e:++e,o=void 0),s.slice(r,o).includes(this.current())}}}module.exports=Boobreaks;
//# sourceMappingURL=boobreaks.common.js.map
