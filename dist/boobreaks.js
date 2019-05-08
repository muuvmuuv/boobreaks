/*!
 * Boobreaks v3.2.0
 * https://github.com/muuvmuuv/boobreaks
 *
 * Copyright 2019 Marvin Heilemann
 * Released under the MIT license
 *
 * Date: 2019-05-08T11:39:17.403Z
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Boobreaks=t()}(this,function(){"use strict";return class{constructor(e){this.vars={breakpoints:["xs","sm","md","lg","xl"],widths:[null,576,768,992,1200]},this.vars=Object.assign({},this.vars,e)}current(){const e=document.querySelector("body");if(!e)throw new Error("No `body` found!");return window.getComputedStyle(e,":before").getPropertyValue("content").replace(/"/g,"")||"unrecognized"}width(){return this.vars.widths[this.vars.breakpoints.indexOf(this.current().toLowerCase())]}is(e){return this.isAnExpression(e)?this.isMatchingExpression(e)||!1:this.current()===e}isAnExpression(e){return"<"===e.charAt(0)||">"===e.charAt(0)}splitExpression(e){const t=e.charAt(0),r="="===e.charAt(1),s=1+(r?1:0);return{operator:t,orEqual:r,breakpointName:e.slice(s)}}isMatchingExpression(e){const t=this.splitExpression(e),r=this.vars.breakpoints;let s=r.indexOf(t.breakpointName);if(-1!==s){let e=0,i=0;return"<"===t.operator&&(e=0,i=t.orEqual?++s:s),">"===t.operator&&(e=t.orEqual?s:++s,i=void 0),r.slice(e,i).includes(this.current())}}}});
//# sourceMappingURL=boobreaks.js.map
