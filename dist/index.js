/*!
 * position-sticky
 * version: 0.0.5
 * build: 2020-03-23 16:34:28
 */
module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p=".",n(n.s=1)}([function(t,e){t.exports=require("react")},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r);n(2);function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function i(t,e){if(null==t)return{};var n,r,o=function(t,e){if(null==t)return{};var n,r,o={},c=Object.keys(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(t);for(r=0;r<c.length;r++)n=c[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(o[n]=t[n])}return o}e.default=function(t){var e=t.scrollContainer,n=t.wrapperSelector,a=t.stickySelector,s=t.hideBottom,u=t.className,l=t.children,f=i(t,["scrollContainer","wrapperSelector","stickySelector","hideBottom","className","children"]),p=Object(r.useRef)(null),d=Object(r.useRef)(null),v=Object(r.useRef)(null);Object(r.useEffect)((function(){if(n&&a){var t,e=document.querySelector("".concat(n," ").concat(a));if(e)(null===(t=window.CSS)||void 0===t?void 0:t.supports("position: sticky"))?e.classList.add("sticky"):(v.current=e,y());else console.warn("请检查 ".concat(n," ").concat(a," 是否是有效元素！"));return function(){p.current?p.current.removeEventListener("scroll",m,!1):window.removeEventListener("scroll",b,!1)}}}),[]);var y=function(){var t=document.querySelector("".concat(e));e&&t?(p.current=t,p.current.addEventListener("scroll",m,!1)):console.warn("请检查 ".concat(e," 是否是有效元素！")),void 0===e&&window.addEventListener("scroll",b,!1)},m=function(t){var e=t.target.scrollTop,n=d.current.parentElement,r=d.current,o=r.offsetTop,c=r.offsetHeight,i=o-n.offsetTop,a=i+c,u=v.current.clientHeight,l=void 0!==s?s:u;e>i&&e<a&&(v.current.style.top="".concat(e-i,"px"),v.current.classList.contains("position-sticky")||(d.current.style.paddingTop="".concat(u,"px"),v.current.classList.add("position-sticky"))),(e<=i||e>a-l)&&v.current.classList.contains("position-sticky")&&(v.current.classList.remove("position-sticky"),v.current.style.top="".concat(0,"px"),d.current.style.paddingTop="".concat(0,"px"))},b=function(){var t=d.current.getBoundingClientRect(),e=t.top,n=t.bottom,r=v.current.clientHeight;e<=0&&n>=0&&(d.current.style.paddingTop="".concat(r,"px"),v.current.classList.add("position-sticky"),v.current.style.top="".concat(-e,"px")),(n<r||e>0)&&v.current.classList.contains("position-sticky")&&(v.current.classList.remove("position-sticky"),v.current.style.top="".concat(0,"px"),d.current.style.paddingTop="".concat(0,"px"))};return o.a.createElement("div",c({ref:d,className:"position-sticky-wrapper ".concat(u||"")},f),l)}},function(t,e,n){var r=n(3),o=n(4);"string"==typeof(o=o.__esModule?o.default:o)&&(o=[[t.i,o,""]]);var c={insert:"head",singleton:!1},i=(r(o,c),o.locals?o.locals:{});t.exports=i},function(t,e,n){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},c=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),i=[];function a(t){for(var e=-1,n=0;n<i.length;n++)if(i[n].identifier===t){e=n;break}return e}function s(t,e){for(var n={},r=[],o=0;o<t.length;o++){var c=t[o],s=e.base?c[0]+e.base:c[0],u=n[s]||0,l="".concat(s," ").concat(u);n[s]=u+1;var f=a(l),p={css:c[1],media:c[2],sourceMap:c[3]};-1!==f?(i[f].references++,i[f].updater(p)):i.push({identifier:l,updater:m(p,e),references:1}),r.push(l)}return r}function u(t){var e=document.createElement("style"),r=t.attributes||{};if(void 0===r.nonce){var o=n.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(t){e.setAttribute(t,r[t])})),"function"==typeof t.insert)t.insert(e);else{var i=c(t.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(e)}return e}var l,f=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function p(t,e,n,r){var o=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(t.styleSheet)t.styleSheet.cssText=f(e,o);else{var c=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(c,i[e]):t.appendChild(c)}}function d(t,e,n){var r=n.css,o=n.media,c=n.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),c&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(c))))," */")),t.styleSheet)t.styleSheet.cssText=r;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(r))}}var v=null,y=0;function m(t,e){var n,r,o;if(e.singleton){var c=y++;n=v||(v=u(e)),r=p.bind(null,n,c,!1),o=p.bind(null,n,c,!0)}else n=u(e),r=d.bind(null,n,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var n=s(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var r=0;r<n.length;r++){var o=a(n[r]);i[o].references--}for(var c=s(t,e),u=0;u<n.length;u++){var l=a(n[u]);0===i[l].references&&(i[l].updater(),i.splice(l,1))}n=c}}}},function(t,e,n){(e=n(5)(!1)).push([t.i,".position-sticky-wrapper {\r\n  position: relative;\r\n}\r\n\r\n.position-sticky {\r\n  width: 100%;\r\n  position: absolute !important;\r\n  top: 0;\r\n  left: 0;\r\n  transition: none !important;\r\n  z-index: 10;\r\n}\r\n\r\n.sticky {\r\n  position: -webkit-sticky;\r\n  position: sticky;\r\n  top: 0;\r\n}\r\n",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(i=r,a=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(s," */")),c=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(c).concat([o]).join("\n")}var i,a,s;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(r)for(var c=0;c<this.length;c++){var i=this[c][0];null!=i&&(o[i]=!0)}for(var a=0;a<t.length;a++){var s=[].concat(t[a]);r&&o[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),e.push(s))}},e}}]);