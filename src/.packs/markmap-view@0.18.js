const d3 = require('./d3.js')
/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /npm/markmap-view@0.18.4/dist/browser/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,e){"use strict";const n=Math.random().toString(36).slice(2,8);let r=0;function i(){}function a(t,e){const n=(t,r)=>e(t,(()=>{var e;return null==(e=t.children)?void 0:e.map((e=>n(e,t)))}),r);return n(t)}function o(t){if("string"==typeof t){const e=t;t=t=>t.tagName===e}const e=t;return function(){let t=Array.from(this.childNodes);return e&&(t=t.filter((t=>e(t)))),t}}function s(){const t={};return t.promise=new Promise(((e,n)=>{t.resolve=e,t.reject=n})),t}
/*! @gera2ld/jsx-dom v2.2.2 | ISC License */
const l="http://www.w3.org/1999/xlink",c={show:l,actuate:l,href:l};function h(t,e,...n){return function(t,e){let n;if("string"==typeof t)n=1;else{if("function"!=typeof t)throw new Error("Invalid VNode type");n=2}return{vtype:n,type:t,props:e}}(t,e=Object.assign({},e,{children:1===n.length?n[0]:n}))}function d(t){return t.children}const u={isSvg:!1};function p(t,e){Array.isArray(e)||(e=[e]),(e=e.filter(Boolean)).length&&t.append(...e)}const m={className:"class",labelFor:"for"};function f(t,e,n,r){if(e=m[e]||e,!0===n)t.setAttribute(e,"");else if(!1===n)t.removeAttribute(e);else{const i=r?c[e]:void 0;void 0!==i?t.setAttributeNS(i,e,n):t.setAttribute(e,n)}}function g(t,e){return Array.isArray(t)?t.map((t=>g(t,e))).reduce(((t,e)=>t.concat(e)),[]):v(t,e)}function v(t,e=u){if(null==t||"boolean"==typeof t)return null;if(t instanceof Node)return t;if(2===(null==(n=t)?void 0:n.vtype)){const{type:n,props:r}=t;if(n===d){const t=document.createDocumentFragment();if(r.children){p(t,g(r.children,e))}return t}return v(n(r),e)}var n;if((t=>"string"==typeof t||"number"==typeof t)(t))return document.createTextNode(`${t}`);if((t=>1===(null==t?void 0:t.vtype))(t)){let n;const{type:r,props:i}=t;if(e.isSvg||"svg"!==r||(e=Object.assign({},e,{isSvg:!0})),n=e.isSvg?document.createElementNS("http://www.w3.org/2000/svg",r):document.createElement(r),function(t,e,n){for(const r in e)if("key"!==r&&"children"!==r&&"ref"!==r)if("dangerouslySetInnerHTML"===r)t.innerHTML=e[r].__html;else if("innerHTML"===r||"textContent"===r||"innerText"===r||"value"===r&&["textarea","select"].includes(t.tagName)){const n=e[r];null!=n&&(t[r]=n)}else r.startsWith("on")?t[r.toLowerCase()]=e[r]:f(t,r,e[r],n.isSvg)}(n,i,e),i.children){let t=e;e.isSvg&&"foreignObject"===r&&(t=Object.assign({},t,{isSvg:!1}));const a=g(i.children,t);null!=a&&p(n,a)}const{ref:a}=i;return"function"==typeof a&&a(n),n}throw new Error("mount: Invalid Vnode!")}function y(...t){return v(h(...t))}const x=function(t){const e={};return function(...n){const r=`${n[0]}`;let i=e[r];return i||(i={value:t(...n)},e[r]=i),i.value}}((t=>{document.head.append(y("link",{rel:"preload",as:"script",href:t}))})),k={},b={};async function w(t,e){var n;const r="script"===t.type&&(null==(n=t.data)?void 0:n.src)||"";if(t.loaded||(t.loaded=k[r]),!t.loaded){const n=s();if(t.loaded=n.promise,"script"===t.type&&(document.head.append(y("script",{...t.data,onLoad:()=>n.resolve(),onError:n.reject})),r?k[r]=t.loaded:n.resolve()),"iife"===t.type){const{fn:r,getParams:i}=t.data;r(...(null==i?void 0:i(e))||[]),n.resolve()}}await t.loaded}const z="undefined"!=typeof navigator&&navigator.userAgent.includes("Macintosh"),S=e.scaleOrdinal(e.schemeCategory10),E={autoFit:!1,color:t=>{var e;return S(`${(null==(e=t.state)?void 0:e.path)||""}`)},duration:500,embedGlobalCSS:!0,fitRatio:.95,maxInitialScale:2,maxWidth:0,nodeMinHeight:16,paddingX:8,scrollForPan:z,spacingHorizontal:80,spacingVertical:5,initialExpandLevel:-1,zoom:!0,pan:!0,toggleRecursively:!1};function C(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n)|0;return(e>>>0).toString(36)}function X(t){var e=0,n=t.children,r=n&&n.length;if(r)for(;--r>=0;)e+=n[r].value;else e=1;t.value=e}function j(t,e){var n,r,i,a,o,s=new M(t),l=+t.value&&(s.value=t.value),c=[s];for(null==e&&(e=A);n=c.pop();)if(l&&(n.value=+n.data.value),(i=e(n.data))&&(o=i.length))for(n.children=new Array(o),a=o-1;a>=0;--a)c.push(r=n.children[a]=new M(i[a])),r.parent=n,r.depth=n.depth+1;return s.eachBefore(R)}function A(t){return t.children}function O(t){t.data=t.data.data}function R(t){var e=0;do{t.height=e}while((t=t.parent)&&t.height<++e)}function M(t){this.data=t,this.depth=this.height=0,this.parent=null}M.prototype=j.prototype={constructor:M,count:function(){return this.eachAfter(X)},each:function(t){var e,n,r,i,a=this,o=[a];do{for(e=o.reverse(),o=[];a=e.pop();)if(t(a),n=a.children)for(r=0,i=n.length;r<i;++r)o.push(n[r])}while(o.length);return this},eachAfter:function(t){for(var e,n,r,i=this,a=[i],o=[];i=a.pop();)if(o.push(i),e=i.children)for(n=0,r=e.length;n<r;++n)a.push(e[n]);for(;i=o.pop();)t(i);return this},eachBefore:function(t){for(var e,n,r=this,i=[r];r=i.pop();)if(t(r),e=r.children)for(n=e.length-1;n>=0;--n)i.push(e[n]);return this},sum:function(t){return this.eachAfter((function(e){for(var n=+t(e.data)||0,r=e.children,i=r&&r.length;--i>=0;)n+=r[i].value;e.value=n}))},sort:function(t){return this.eachBefore((function(e){e.children&&e.children.sort(t)}))},path:function(t){for(var e=this,n=function(t,e){if(t===e)return t;var n=t.ancestors(),r=e.ancestors(),i=null;t=n.pop(),e=r.pop();for(;t===e;)i=t,t=n.pop(),e=r.pop();return i}(e,t),r=[e];e!==n;)e=e.parent,r.push(e);for(var i=r.length;t!==n;)r.splice(i,0,t),t=t.parent;return r},ancestors:function(){for(var t=this,e=[t];t=t.parent;)e.push(t);return e},descendants:function(){var t=[];return this.each((function(e){t.push(e)})),t},leaves:function(){var t=[];return this.eachBefore((function(e){e.children||t.push(e)})),t},links:function(){var t=this,e=[];return t.each((function(n){n!==t&&e.push({source:n.parent,target:n})})),e},copy:function(){return j(this).eachBefore(O)}};const $={name:"d3-flextree",version:"2.1.2",main:"build/d3-flextree.js",module:"index","jsnext:main":"index",author:{name:"Chris Maloney",url:"http://chrismaloney.org"},description:"Flexible tree layout algorithm that allows for variable node sizes.",keywords:["d3","d3-module","layout","tree","hierarchy","d3-hierarchy","plugin","d3-plugin","infovis","visualization","2d"],homepage:"https://github.com/klortho/d3-flextree",license:"WTFPL",repository:{type:"git",url:"https://github.com/klortho/d3-flextree.git"},scripts:{clean:"rm -rf build demo test","build:demo":"rollup -c --environment BUILD:demo","build:dev":"rollup -c --environment BUILD:dev","build:prod":"rollup -c --environment BUILD:prod","build:test":"rollup -c --environment BUILD:test",build:"rollup -c",lint:"eslint index.js src","test:main":"node test/bundle.js","test:browser":"node test/browser-tests.js",test:"npm-run-all test:*",prepare:"npm-run-all clean build lint test"},dependencies:{"d3-hierarchy":"^1.1.5"},devDependencies:{"babel-plugin-external-helpers":"^6.22.0","babel-preset-es2015-rollup":"^3.0.0",d3:"^4.13.0","d3-selection-multi":"^1.0.1",eslint:"^4.19.1",jsdom:"^11.6.2","npm-run-all":"^4.1.2",rollup:"^0.55.3","rollup-plugin-babel":"^2.7.1","rollup-plugin-commonjs":"^8.0.2","rollup-plugin-copy":"^0.2.3","rollup-plugin-json":"^2.3.0","rollup-plugin-node-resolve":"^3.0.2","rollup-plugin-uglify":"^3.0.0","uglify-es":"^3.3.9"}},{version:B}=$,T=Object.freeze({children:t=>t.children,nodeSize:t=>t.data.size,spacing:0});function D(t){const e=Object.assign({},T,t);function n(t){const n=e[t];return"function"==typeof n?n:()=>n}function r(t){const e=a(function(){const t=i(),e=n("nodeSize"),r=n("spacing");return class extends t{constructor(t){super(t),Object.assign(this,{x:0,y:0,relX:0,prelim:0,shift:0,change:0,lExt:this,lExtRelX:0,lThr:null,rExt:this,rExtRelX:0,rThr:null})}get size(){return e(this.data)}spacing(t){return r(this.data,t.data)}get x(){return this.data.x}set x(t){this.data.x=t}get y(){return this.data.y}set y(t){this.data.y=t}update(){return L(this),N(this),this}}}(),t,(t=>t.children));return e.update(),e.data}function i(){const t=n("nodeSize"),e=n("spacing");return class n extends j.prototype.constructor{constructor(t){super(t)}copy(){const t=a(this.constructor,this,(t=>t.children));return t.each((t=>t.data=t.data.data)),t}get size(){return t(this)}spacing(t){return e(this,t)}get nodes(){return this.descendants()}get xSize(){return this.size[0]}get ySize(){return this.size[1]}get top(){return this.y}get bottom(){return this.y+this.ySize}get left(){return this.x-this.xSize/2}get right(){return this.x+this.xSize/2}get root(){const t=this.ancestors();return t[t.length-1]}get numChildren(){return this.hasChildren?this.children.length:0}get hasChildren(){return!this.noChildren}get noChildren(){return null===this.children}get firstChild(){return this.hasChildren?this.children[0]:null}get lastChild(){return this.hasChildren?this.children[this.numChildren-1]:null}get extents(){return(this.children||[]).reduce(((t,e)=>n.maxExtents(t,e.extents)),this.nodeExtents)}get nodeExtents(){return{top:this.top,bottom:this.bottom,left:this.left,right:this.right}}static maxExtents(t,e){return{top:Math.min(t.top,e.top),bottom:Math.max(t.bottom,e.bottom),left:Math.min(t.left,e.left),right:Math.max(t.right,e.right)}}}}function a(t,e,n){const r=(e,i)=>{const a=new t(e);Object.assign(a,{parent:i,depth:null===i?0:i.depth+1,height:0,length:1});const o=n(e)||[];return a.children=0===o.length?null:o.map((t=>r(t,a))),a.children&&Object.assign(a,a.children.reduce(((t,e)=>({height:Math.max(t.height,e.height+1),length:t.length+e.length})),a)),a};return r(e,null)}return Object.assign(r,{nodeSize(t){return arguments.length?(e.nodeSize=t,r):e.nodeSize},spacing(t){return arguments.length?(e.spacing=t,r):e.spacing},children(t){return arguments.length?(e.children=t,r):e.children},hierarchy(t,n){const r=void 0===n?e.children:n;return a(i(),t,r)},dump(t){const e=n("nodeSize"),r=t=>n=>{const i=t+"  ",a=t+"    ",{x:o,y:s}=n,l=e(n),c=n.children||[],h=0===c.length?" ":`,${i}children: [${a}${c.map(r(a)).join(a)}${i}],${t}`;return`{ size: [${l.join(", ")}],${i}x: ${o}, y: ${s}${h}},`};return r("\n")(t)}}),r}D.version=B;const L=(t,e=0)=>(t.y=e,(t.children||[]).reduce(((e,n)=>{const[r,i]=e;L(n,t.y+t.ySize);const a=(0===r?n.lExt:n.rExt).bottom;0!==r&&I(t,r,i);return[r+1,Y(a,r,i)]}),[0,null]),H(t),U(t),t),N=(t,e,n)=>{void 0===e&&(e=-t.relX-t.prelim,n=0);const r=e+t.relX;return t.relX=r+t.prelim-n,t.prelim=0,t.x=n+t.relX,(t.children||[]).forEach((e=>N(e,r,t.x))),t},H=t=>{(t.children||[]).reduce(((t,e)=>{const[n,r]=t,i=n+e.shift,a=r+i+e.change;return e.relX+=a,[i,a]}),[0,0])},I=(t,e,n)=>{const r=t.children[e-1],i=t.children[e];let a=r,o=r.relX,s=i,l=i.relX,c=!0;for(;a&&s;){a.bottom>n.lowY&&(n=n.next);const r=o+a.prelim-(l+s.prelim)+a.xSize/2+s.xSize/2+a.spacing(s);(r>0||r<0&&c)&&(l+=r,F(i,r),P(t,e,n.index,r)),c=!1;const h=a.bottom,d=s.bottom;h<=d&&(a=W(a),a&&(o+=a.relX)),h>=d&&(s=V(s),s&&(l+=s.relX))}!a&&s?_(t,e,s,l):a&&!s&&K(t,e,a,o)},F=(t,e)=>{t.relX+=e,t.lExtRelX+=e,t.rExtRelX+=e},P=(t,e,n,r)=>{const i=t.children[e],a=e-n;if(a>1){const e=r/a;t.children[n+1].shift+=e,i.shift-=e,i.change-=r-e}},V=t=>t.hasChildren?t.firstChild:t.lThr,W=t=>t.hasChildren?t.lastChild:t.rThr,_=(t,e,n,r)=>{const i=t.firstChild,a=i.lExt,o=t.children[e];a.lThr=n;const s=r-n.relX-i.lExtRelX;a.relX+=s,a.prelim-=s,i.lExt=o.lExt,i.lExtRelX=o.lExtRelX},K=(t,e,n,r)=>{const i=t.children[e],a=i.rExt,o=t.children[e-1];a.rThr=n;const s=r-n.relX-i.rExtRelX;a.relX+=s,a.prelim-=s,i.rExt=o.rExt,i.rExtRelX=o.rExtRelX},U=t=>{if(t.hasChildren){const e=t.firstChild,n=t.lastChild,r=(e.prelim+e.relX-e.xSize/2+n.relX+n.prelim+n.xSize/2)/2;Object.assign(t,{prelim:r,lExt:e.lExt,lExtRelX:e.lExtRelX,rExt:n.rExt,rExtRelX:n.rExtRelX})}},Y=(t,e,n)=>{for(;null!==n&&t>=n.lowY;)n=n.next;return{lowY:t,index:e,next:n}},G=".markmap {\n  --markmap-max-width: 9999px;\n  --markmap-a-color: #0097e6;\n  --markmap-a-hover-color: #00a8ff;\n  --markmap-code-bg: #f0f0f0;\n  --markmap-code-color: #555;\n  --markmap-highlight-bg: #ffeaa7;\n  --markmap-table-border: 1px solid currentColor;\n  --markmap-font: 300 16px/20px sans-serif;\n  --markmap-circle-open-bg: #fff;\n  --markmap-text-color: #333;\n\n  font: var(--markmap-font);\n  color: var(--markmap-text-color);\n}\n\n  .markmap-link {\n    fill: none;\n  }\n\n  .markmap-node > circle {\n      cursor: pointer;\n    }\n\n  .markmap-foreign {\n    display: inline-block;\n  }\n\n  .markmap-foreign p {\n      margin: 0;\n    }\n\n  .markmap-foreign a {\n      color: var(--markmap-a-color);\n    }\n\n  .markmap-foreign a:hover {\n        color: var(--markmap-a-hover-color);\n      }\n\n  .markmap-foreign code {\n      padding: 0.25em;\n      font-size: calc(1em - 2px);\n      color: var(--markmap-code-color);\n      background-color: var(--markmap-code-bg);\n      border-radius: 2px;\n    }\n\n  .markmap-foreign pre {\n      margin: 0;\n    }\n\n  .markmap-foreign pre > code {\n        display: block;\n      }\n\n  .markmap-foreign del {\n      text-decoration: line-through;\n    }\n\n  .markmap-foreign em {\n      font-style: italic;\n    }\n\n  .markmap-foreign strong {\n      font-weight: bold;\n    }\n\n  .markmap-foreign mark {\n      background: var(--markmap-highlight-bg);\n    }\n\n  .markmap-foreign table,\n    .markmap-foreign th,\n    .markmap-foreign td {\n      border-collapse: collapse;\n      border: var(--markmap-table-border);\n    }\n\n  .markmap-foreign img {\n      display: inline-block;\n    }\n\n  .markmap-foreign svg {\n      fill: currentColor;\n    }\n\n  .markmap-foreign > div {\n      width: var(--markmap-max-width);\n      text-align: left;\n    }\n\n  .markmap-foreign > div > div {\n        display: inline-block;\n      }\n\n.markmap-dark .markmap {\n  --markmap-code-bg: #1a1b26;\n  --markmap-code-color: #ddd;\n  --markmap-circle-open-bg: #444;\n  --markmap-text-color: #eee;\n}\n",Z=G,q=e.linkHorizontal();function J(t){return Math.max(4-2*t.state.depth,1.5)}function Q(t,n){return t[e.minIndex(t,n)]}function tt(t){t.stopPropagation()}const et=new class{constructor(){this.listeners=[]}tap(t){return this.listeners.push(t),()=>this.revoke(t)}revoke(t){const e=this.listeners.indexOf(t);e>=0&&this.listeners.splice(e,1)}revokeAll(){this.listeners.splice(0)}call(...t){for(const e of this.listeners)e(...t)}};class nt{constructor(t,i){this.options=E,this.revokers=[],this.handleZoom=t=>{const{transform:e}=t;this.g.attr("transform",e)},this.handlePan=t=>{t.preventDefault();const n=e.zoomTransform(this.svg.node()),r=n.translate(-t.deltaX/n.k,-t.deltaY/n.k);this.svg.call(this.zoom.transform,r)},this.handleClick=(t,e)=>{let n=this.options.toggleRecursively;(z?t.metaKey:t.ctrlKey)&&(n=!n),this.toggleNode(e,n)},this.ensureView=this.ensureVisible,this.svg=t.datum?t:e.select(t),this.styleNode=this.svg.append("style"),this.zoom=e.zoom().filter((t=>this.options.scrollForPan&&"wheel"===t.type?t.ctrlKey&&!t.button:!(t.ctrlKey&&"wheel"!==t.type||t.button))).on("zoom",this.handleZoom),this.setOptions(i),this.state={id:this.options.id||this.svg.attr("id")||(r+=1,`mm-${n}-${r}`),rect:{x1:0,y1:0,x2:0,y2:0}},this.g=this.svg.append("g"),this.observer=new ResizeObserver(function(t,e){const n={timer:0};function r(){n.timer&&(window.clearTimeout(n.timer),n.timer=0)}function i(){r(),n.args&&(n.result=t(...n.args))}return function(...t){return r(),n.args=t,n.timer=window.setTimeout(i,e),n.result}}((()=>{this.renderData()}),100)),this.revokers.push(et.tap((()=>{this.setData()})),(()=>this.observer.disconnect()))}getStyleContent(){const{style:t}=this.options,{id:e}=this.state,n="function"==typeof t?t(e):"";return[this.options.embedGlobalCSS&&G,n].filter(Boolean).join("\n")}updateStyle(){this.svg.attr("class",function(t,...e){const n=(t||"").split(" ").filter(Boolean);return e.forEach((t=>{t&&n.indexOf(t)<0&&n.push(t)})),n.join(" ")}(this.svg.attr("class"),"markmap",this.state.id));const t=this.getStyleContent();this.styleNode.text(t)}async toggleNode(t,e=!1){var n,r;const i=(null==(n=t.payload)?void 0:n.fold)?0:1;e?a(t,((t,e)=>{t.payload={...t.payload,fold:i},e()})):t.payload={...t.payload,fold:(null==(r=t.payload)?void 0:r.fold)?0:1},await this.renderData(t)}_initializeData(t){let e=0;const{color:n,initialExpandLevel:r}=this.options;let i=0,o=0;a(t,((t,a,s)=>{var l,c,h,d;o+=1,t.children=null==(l=t.children)?void 0:l.map((t=>({...t}))),e+=1,t.state={...t.state,depth:o,id:e,rect:{x:0,y:0,width:0,height:0},size:[0,0]},t.state.key=[null==(c=null==s?void 0:s.state)?void 0:c.id,t.state.id].filter(Boolean).join(".")+C(t.content),t.state.path=[null==(h=null==s?void 0:s.state)?void 0:h.path,t.state.id].filter(Boolean).join("."),n(t);const u=2===(null==(d=t.payload)?void 0:d.fold);u?i+=1:(i||r>=0&&t.state.depth>=r)&&(t.payload={...t.payload,fold:1}),a(),u&&(i-=1),o-=1}))}_relayout(){if(!this.state.data)return;this.g.selectAll(o("g")).selectAll(o("foreignObject")).each((function(t){var e;const n=null==(e=this.firstChild)?void 0:e.firstChild,r=[n.scrollWidth,n.scrollHeight];t.state.size=r}));const{spacingHorizontal:t,paddingX:n,spacingVertical:r}=this.options,i=D({}).children((t=>{var e;if(!(null==(e=t.payload)?void 0:e.fold))return t.children})).nodeSize((e=>{const[r,i]=e.data.state.size;return[i,r+(r?2*n:0)+t]})).spacing(((t,e)=>t.parent===e.parent?r:2*r)),a=i.hierarchy(this.state.data);i(a);const s=a.descendants();s.forEach((e=>{e.data.state.rect={x:e.y,y:e.x-e.xSize/2,width:e.ySize-t,height:e.xSize}})),this.state.rect={x1:e.min(s,(t=>t.data.state.rect.x))||0,y1:e.min(s,(t=>t.data.state.rect.y))||0,x2:e.max(s,(t=>t.data.state.rect.x+t.data.state.rect.width))||0,y2:e.max(s,(t=>t.data.state.rect.y+t.data.state.rect.height))||0}}setOptions(t){this.options={...this.options,...t},this.options.zoom?this.svg.call(this.zoom):this.svg.on(".zoom",null),this.options.pan?this.svg.on("wheel",this.handlePan):this.svg.on("wheel",null)}async setData(t,e){e&&this.setOptions(e),t&&(this.state.data=t),this.state.data&&(this._initializeData(this.state.data),this.updateStyle(),await this.renderData())}async renderData(t){const{paddingX:e,autoFit:n,color:r,maxWidth:i}=this.options,s=this.state.data;if(!s)return;const l={},c={},h=[];a(s,((t,e,n)=>{var r;(null==(r=t.payload)?void 0:r.fold)||e(),l[t.state.id]=t,n&&(c[t.state.id]=n.state.id),h.push(t)}));const d={},u={},p=t=>{t&&!d[t.state.id]&&a(t,((e,n)=>{d[e.state.id]=t.state.id,n()}))},m=t=>u[d[t.state.id]]||s.state.rect,f=t=>(l[d[t.state.id]]||s).state.rect;u[s.state.id]=s.state.rect,t&&p(t);const g=this.g.selectAll(o("g")).each((t=>{u[t.state.id]=t.state.rect})).data(h,(t=>t.state.key)),v=g.enter().append("g").attr("data-depth",(t=>t.state.depth)).attr("data-path",(t=>t.state.path)).each((t=>{p(l[c[t.state.id]])})),y=g.exit().each((t=>{p(l[c[t.state.id]])})),x=g.merge(v).attr("class",(t=>{var e;return["markmap-node",(null==(e=t.payload)?void 0:e.fold)&&"markmap-fold"].filter(Boolean).join(" ")})),k=x.selectAll(o("line")).data((t=>[t]),(t=>t.state.key)),b=k.enter().append("line").attr("stroke",(t=>r(t))).attr("stroke-width",0),w=k.merge(b),z=x.selectAll(o("circle")).data((t=>{var e;return(null==(e=t.children)?void 0:e.length)?[t]:[]}),(t=>t.state.key)),S=z.enter().append("circle").attr("stroke-width",0).attr("r",0).on("click",((t,e)=>this.handleClick(t,e))).on("mousedown",tt).merge(z).attr("stroke",(t=>r(t))).attr("fill",(t=>{var e;return(null==(e=t.payload)?void 0:e.fold)&&t.children?r(t):"var(--markmap-circle-open-bg)"})),E=this.observer,C=x.selectAll(o("foreignObject")).data((t=>[t]),(t=>t.state.key)),X=C.enter().append("foreignObject").attr("class","markmap-foreign").attr("x",e).attr("y",0).style("opacity",0).on("mousedown",tt).on("dblclick",tt);X.append("xhtml:div").append("xhtml:div").html((t=>t.content)).attr("xmlns","http://www.w3.org/1999/xhtml"),X.each((function(){var t;const e=null==(t=this.firstChild)?void 0:t.firstChild;E.observe(e)}));const j=y.selectAll(o("foreignObject"));j.each((function(){var t;const e=null==(t=this.firstChild)?void 0:t.firstChild;E.unobserve(e)}));const A=X.merge(C),O=h.flatMap((t=>{var e;return(null==(e=t.payload)?void 0:e.fold)?[]:t.children.map((e=>({source:t,target:e})))})),R=this.g.selectAll(o("path")).data(O,(t=>t.target.state.key)),M=R.exit(),$=R.enter().insert("path","g").attr("class","markmap-link").attr("data-depth",(t=>t.target.state.depth)).attr("data-path",(t=>t.target.state.path)).attr("d",(t=>{const e=m(t.target),n=[e.x+e.width,e.y+e.height];return q({source:n,target:n})})).attr("stroke-width",0).merge(R);this.svg.style("--markmap-max-width",i?`${i}px`:null),await new Promise(requestAnimationFrame),this._relayout(),v.attr("transform",(t=>{const e=m(t);return`translate(${e.x+e.width-t.state.rect.width},${e.y+e.height-t.state.rect.height})`})),this.transition(y).attr("transform",(t=>{const e=f(t);return`translate(${e.x+e.width-t.state.rect.width},${e.y+e.height-t.state.rect.height})`})).remove(),this.transition(x).attr("transform",(t=>`translate(${t.state.rect.x},${t.state.rect.y})`));const B=y.selectAll(o("line"));this.transition(B).attr("x1",(t=>t.state.rect.width)).attr("stroke-width",0),b.attr("x1",(t=>t.state.rect.width)).attr("x2",(t=>t.state.rect.width)),w.attr("y1",(t=>t.state.rect.height)).attr("y2",(t=>t.state.rect.height)),this.transition(w).attr("x1",-1).attr("x2",(t=>t.state.rect.width+2)).attr("stroke",(t=>r(t))).attr("stroke-width",J);const T=y.selectAll(o("circle"));this.transition(T).attr("r",0).attr("stroke-width",0),S.attr("cx",(t=>t.state.rect.width)).attr("cy",(t=>t.state.rect.height)),this.transition(S).attr("r",6).attr("stroke-width","1.5"),this.transition(j).style("opacity",0),A.attr("width",(t=>Math.max(0,t.state.rect.width-2*e))).attr("height",(t=>t.state.rect.height)),this.transition(A).style("opacity",1),this.transition(M).attr("d",(t=>{const e=f(t.target),n=[e.x+e.width,e.y+e.height];return q({source:n,target:n})})).attr("stroke-width",0).remove(),this.transition($).attr("stroke",(t=>r(t.target))).attr("stroke-width",(t=>J(t.target))).attr("d",(t=>{const e=t.source,n=t.target,r=[e.state.rect.x+e.state.rect.width,e.state.rect.y+e.state.rect.height],i=[n.state.rect.x,n.state.rect.y+n.state.rect.height];return q({source:r,target:i})})),n&&this.fit()}transition(t){const{duration:e}=this.options;return t.transition().duration(e)}async fit(t=this.options.maxInitialScale){const n=this.svg.node(),{width:r,height:a}=n.getBoundingClientRect(),{fitRatio:o}=this.options,{x1:s,y1:l,x2:c,y2:h}=this.state.rect,d=c-s,u=h-l,p=Math.min(r/d*o,a/u*o,t),m=e.zoomIdentity.translate((r-d*p)/2-s*p,(a-u*p)/2-l*p).scale(p);return this.transition(this.svg).call(this.zoom.transform,m).end().catch(i)}findElement(t){let e;return this.g.selectAll(o("g")).each((function(n){n===t&&(e={data:n,g:this})})),e}async ensureVisible(t,n){var r;const a=null==(r=this.findElement(t))?void 0:r.data;if(!a)return;const o=this.svg.node(),s=o.getBoundingClientRect(),l=e.zoomTransform(o),[c,h]=[a.state.rect.x,a.state.rect.x+a.state.rect.width+2].map((t=>t*l.k+l.x)),[d,u]=[a.state.rect.y,a.state.rect.y+a.state.rect.height].map((t=>t*l.k+l.y)),p={left:0,right:0,top:0,bottom:0,...n},m=[p.left-c,s.width-p.right-h],f=[p.top-d,s.height-p.bottom-u],g=m[0]*m[1]>0?Q(m,Math.abs)/l.k:0,v=f[0]*f[1]>0?Q(f,Math.abs)/l.k:0;if(g||v){const t=l.translate(g,v);return this.transition(this.svg).call(this.zoom.transform,t).end().catch(i)}}async centerNode(t,n){var r;const a=null==(r=this.findElement(t))?void 0:r.data;if(!a)return;const o=this.svg.node(),s=o.getBoundingClientRect(),l=e.zoomTransform(o),c=(a.state.rect.x+a.state.rect.width/2)*l.k+l.x,h=(a.state.rect.y+a.state.rect.height/2)*l.k+l.y,d={left:0,right:0,top:0,bottom:0,...n},u=(d.left+s.width-d.right)/2,p=(d.top+s.height-d.bottom)/2,m=(u-c)/l.k,f=(p-h)/l.k;if(m||f){const t=l.translate(m,f);return this.transition(this.svg).call(this.zoom.transform,t).end().catch(i)}}async rescale(t){const n=this.svg.node(),{width:r,height:a}=n.getBoundingClientRect(),o=r/2,s=a/2,l=e.zoomTransform(n),c=l.translate((o-l.x)*(1-t)/l.k,(s-l.y)*(1-t)/l.k).scale(t);return this.transition(this.svg).call(this.zoom.transform,c).end().catch(i)}destroy(){this.svg.on(".zoom",null),this.svg.html(null),this.revokers.forEach((t=>{t()}))}static create(t,e,n=null){const r=new nt(t,e);return n&&r.setData(n).then((()=>{r.fit()})),r}}t.Markmap=nt,t.defaultColorFn=S,t.defaultOptions=E,t.deriveOptions=function(t){const n={},r={...t},{color:i,colorFreezeLevel:a}=r;if(1===(null==i?void 0:i.length)){const t=i[0];n.color=()=>t}else if(null==i?void 0:i.length){const t=e.scaleOrdinal(i);n.color=e=>t(`${e.state.path}`)}if(a){const t=n.color||E.color;n.color=e=>(e={...e,state:{...e.state,path:e.state.path.split(".").slice(0,a).join(".")}},t(e))}return["duration","fitRatio","initialExpandLevel","maxInitialScale","maxWidth","nodeMinHeight","paddingX","spacingHorizontal","spacingVertical"].forEach((t=>{const e=r[t];"number"==typeof e&&(n[t]=e)})),["zoom","pan"].forEach((t=>{const e=r[t];null!=e&&(n[t]=!!e)})),n},t.globalCSS=Z,t.isMacintosh=z,t.loadCSS=async function(t){await Promise.all(t.map((t=>async function(t){const e="stylesheet"===t.type&&t.data.href||"";if(t.loaded||(t.loaded=b[e]),!t.loaded){const n=s();t.loaded=n.promise,e&&(b[e]=t.loaded),"style"===t.type?(document.head.append(y("style",{textContent:t.data})),n.resolve()):e&&(document.head.append(y("link",{rel:"stylesheet",...t.data})),fetch(e).then((t=>{if(t.ok)return t.text();throw t})).then((()=>n.resolve()),n.reject))}await t.loaded}(t))))},t.loadJS=async function(t,e){t.forEach((t=>{var e;"script"===t.type&&(null==(e=t.data)?void 0:e.src)&&x(t.data.src)})),e={getMarkmap:()=>window.markmap,...e};for(const n of t)await w(n,e)},t.refreshHook=et,t.simpleHash=C,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}(this.markmap=this.markmap||{},d3);
//# sourceMappingURL=/sm/427fca5106d2c32001d2fbb4428a5ecf8cf265ac323cddc5e0b1707af50ee362.map