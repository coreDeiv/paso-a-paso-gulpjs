"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var isBrowser="undefined"!=typeof window&&"undefined"!=typeof document&&"undefined"!=typeof navigator,timeoutDuration=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(isBrowser&&0<=navigator.userAgent.indexOf(e[t]))return 1;return 0}();function microtaskDebounce(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}function taskDebounce(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},timeoutDuration))}}var supportsMicroTasks=isBrowser&&window.Promise,debounce=supportsMicroTasks?microtaskDebounce:taskDebounce;function isFunction(e){return e&&"[object Function]"==={}.toString.call(e)}function getStyleComputedProperty(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function getParentNode(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function getScrollParent(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=getStyleComputedProperty(e),n=t.overflow,o=t.overflowX,r=t.overflowY;return/(auto|scroll|overlay)/.test(n+r+o)?e:getScrollParent(getParentNode(e))}function getReferenceNode(e){return e&&e.referenceNode?e.referenceNode:e}var isIE11=isBrowser&&!(!window.MSInputMethodContext||!document.documentMode),isIE10=isBrowser&&/MSIE 10/.test(navigator.userAgent);function isIE(e){return 11===e?isIE11:10===e?isIE10:isIE11||isIE10}function getOffsetParent(e){if(!e)return document.documentElement;for(var t=isIE(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var o=n&&n.nodeName;return o&&"BODY"!==o&&"HTML"!==o?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===getStyleComputedProperty(n,"position")?getOffsetParent(n):n:e?e.ownerDocument.documentElement:document.documentElement}function isOffsetContainer(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||getOffsetParent(e.firstElementChild)===e)}function getRoot(e){return null!==e.parentNode?getRoot(e.parentNode):e}function findCommonOffsetParent(e,t){if(!(e&&e.nodeType&&t&&t.nodeType))return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,o=n?e:t,r=n?t:e,i=document.createRange();i.setStart(o,0),i.setEnd(r,0);var s=i.commonAncestorContainer;if(e!==s&&t!==s||o.contains(r))return isOffsetContainer(s)?s:getOffsetParent(s);var a=getRoot(e);return a.host?findCommonOffsetParent(a.host,t):findCommonOffsetParent(e,getRoot(t).host)}function getScroll(e){var t="top"===(1<arguments.length&&void 0!==arguments[1]?arguments[1]:"top")?"scrollTop":"scrollLeft",n=e.nodeName;if("BODY"!==n&&"HTML"!==n)return e[t];var o=e.ownerDocument.documentElement;return(e.ownerDocument.scrollingElement||o)[t]}function includeScroll(e,t){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],o=getScroll(t,"top"),r=getScroll(t,"left"),i=n?-1:1;return e.top+=o*i,e.bottom+=o*i,e.left+=r*i,e.right+=r*i,e}function getBordersSize(e,t){var n="x"===t?"Left":"Top",o="Left"===n?"Right":"Bottom";return parseFloat(e["border".concat(n,"Width")])+parseFloat(e["border".concat(o,"Width")])}function getSize(e,t,n,o){return Math.max(t["offset".concat(e)],t["scroll".concat(e)],n["client".concat(e)],n["offset".concat(e)],n["scroll".concat(e)],isIE(10)?parseInt(n["offset".concat(e)])+parseInt(o["margin".concat("Height"===e?"Top":"Left")])+parseInt(o["margin".concat("Height"===e?"Bottom":"Right")]):0)}function getWindowSizes(e){var t=e.body,n=e.documentElement,o=isIE(10)&&getComputedStyle(n);return{height:getSize("Height",t,n,o),width:getSize("Width",t,n,o)}}var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};function getClientRect(e){return _extends({},e,{right:e.left+e.width,bottom:e.top+e.height})}function getBoundingClientRect(e){var t={};try{if(isIE(10)){t=e.getBoundingClientRect();var n=getScroll(e,"top"),o=getScroll(e,"left");t.top+=n,t.left+=o,t.bottom+=n,t.right+=o}else t=e.getBoundingClientRect()}catch(e){}var r={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},i="HTML"===e.nodeName?getWindowSizes(e.ownerDocument):{},s=i.width||e.clientWidth||r.width,a=i.height||e.clientHeight||r.height,f=e.offsetWidth-s,p=e.offsetHeight-a;if(f||p){var l=getStyleComputedProperty(e);f-=getBordersSize(l,"x"),p-=getBordersSize(l,"y"),r.width-=f,r.height-=p}return getClientRect(r)}function getOffsetRectRelativeToArbitraryNode(e,t){var n=2<arguments.length&&void 0!==arguments[2]&&arguments[2],o=isIE(10),r="HTML"===t.nodeName,i=getBoundingClientRect(e),s=getBoundingClientRect(t),a=getScrollParent(e),f=getStyleComputedProperty(t),p=parseFloat(f.borderTopWidth),l=parseFloat(f.borderLeftWidth);n&&r&&(s.top=Math.max(s.top,0),s.left=Math.max(s.left,0));var c=getClientRect({top:i.top-s.top-p,left:i.left-s.left-l,width:i.width,height:i.height});if(c.marginTop=0,c.marginLeft=0,!o&&r){var d=parseFloat(f.marginTop),u=parseFloat(f.marginLeft);c.top-=p-d,c.bottom-=p-d,c.left-=l-u,c.right-=l-u,c.marginTop=d,c.marginLeft=u}return(o&&!n?t.contains(a):t===a&&"BODY"!==a.nodeName)&&(c=includeScroll(c,t)),c}function getViewportOffsetRectRelativeToArtbitraryNode(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,o=getOffsetRectRelativeToArbitraryNode(e,n),r=Math.max(n.clientWidth,window.innerWidth||0),i=Math.max(n.clientHeight,window.innerHeight||0),s=t?0:getScroll(n),a=t?0:getScroll(n,"left");return getClientRect({top:s-o.top+o.marginTop,left:a-o.left+o.marginLeft,width:r,height:i})}function isFixed(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===getStyleComputedProperty(e,"position"))return!0;var n=getParentNode(e);return!!n&&isFixed(n)}function getFixedPositionOffsetParent(e){if(!e||!e.parentElement||isIE())return document.documentElement;for(var t=e.parentElement;t&&"none"===getStyleComputedProperty(t,"transform");)t=t.parentElement;return t||document.documentElement}function getBoundaries(e,t,n,o){var r=4<arguments.length&&void 0!==arguments[4]&&arguments[4],i={top:0,left:0},s=r?getFixedPositionOffsetParent(e):findCommonOffsetParent(e,getReferenceNode(t));if("viewport"===o)i=getViewportOffsetRectRelativeToArtbitraryNode(s,r);else{var a;"scrollParent"===o?"BODY"===(a=getScrollParent(getParentNode(t))).nodeName&&(a=e.ownerDocument.documentElement):a="window"===o?e.ownerDocument.documentElement:o;var f=getOffsetRectRelativeToArbitraryNode(a,s,r);if("HTML"!==a.nodeName||isFixed(s))i=f;else{var p=getWindowSizes(e.ownerDocument),l=p.height,c=p.width;i.top+=f.top-f.marginTop,i.bottom=l+f.top,i.left+=f.left-f.marginLeft,i.right=c+f.left}}var d="number"==typeof(n=n||0);return i.left+=d?n:n.left||0,i.top+=d?n:n.top||0,i.right-=d?n:n.right||0,i.bottom-=d?n:n.bottom||0,i}function getArea(e){return e.width*e.height}function computeAutoPlacement(e,t,o,n,r){var i=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var s=getBoundaries(o,n,i,r),a={top:{width:s.width,height:t.top-s.top},right:{width:s.right-t.right,height:s.height},bottom:{width:s.width,height:s.bottom-t.bottom},left:{width:t.left-s.left,height:s.height}},f=Object.keys(a).map(function(e){return _extends({key:e},a[e],{area:getArea(a[e])})}).sort(function(e,t){return t.area-e.area}),p=f.filter(function(e){var t=e.width,n=e.height;return t>=o.clientWidth&&n>=o.clientHeight}),l=0<p.length?p[0].key:f[0].key,c=e.split("-")[1];return l+(c?"-".concat(c):"")}function getReferenceOffsets(e,t,n){var o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return getOffsetRectRelativeToArbitraryNode(n,o?getFixedPositionOffsetParent(t):findCommonOffsetParent(t,getReferenceNode(n)),o)}function getOuterSizes(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),o=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+o,height:e.offsetHeight+n}}function getOppositePlacement(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function getPopperOffsets(e,t,n){n=n.split("-")[0];var o=getOuterSizes(e),r={width:o.width,height:o.height},i=-1!==["right","left"].indexOf(n),s=i?"top":"left",a=i?"left":"top",f=i?"height":"width",p=i?"width":"height";return r[s]=t[s]+t[f]/2-o[f]/2,r[a]=n===a?t[a]-o[p]:t[getOppositePlacement(a)],r}function find(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function findIndex(e,t,n){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===n});var o=find(e,function(e){return e[t]===n});return e.indexOf(o)}function runModifiers(e,n,t){return(void 0===t?e:e.slice(0,findIndex(e,"name",t))).forEach(function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var t=e.function||e.fn;e.enabled&&isFunction(t)&&(n.offsets.popper=getClientRect(n.offsets.popper),n.offsets.reference=getClientRect(n.offsets.reference),n=t(n,e))}),n}function _update(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=getReferenceOffsets(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=computeAutoPlacement(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=getPopperOffsets(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=runModifiers(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function isModifierEnabled(e,n){return e.some(function(e){var t=e.name;return e.enabled&&t===n})}function getSupportedPropertyName(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),o=0;o<t.length;o++){var r=t[o],i=r?"".concat(r).concat(n):e;if(void 0!==document.body.style[i])return i}return null}function _destroy(){return this.state.isDestroyed=!0,isModifierEnabled(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[getSupportedPropertyName("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function getWindow(e){var t=e.ownerDocument;return t?t.defaultView:window}function attachToScrollParents(e,t,n,o){var r="BODY"===e.nodeName,i=r?e.ownerDocument.defaultView:e;i.addEventListener(t,n,{passive:!0}),r||attachToScrollParents(getScrollParent(i.parentNode),t,n,o),o.push(i)}function setupEventListeners(e,t,n,o){n.updateBound=o,getWindow(e).addEventListener("resize",n.updateBound,{passive:!0});var r=getScrollParent(e);return attachToScrollParents(r,"scroll",n.updateBound,n.scrollParents),n.scrollElement=r,n.eventsEnabled=!0,n}function _enableEventListeners(){this.state.eventsEnabled||(this.state=setupEventListeners(this.reference,this.options,this.state,this.scheduleUpdate))}function removeEventListeners(e,t){return getWindow(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function _disableEventListeners(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=removeEventListeners(this.reference,this.state))}function isNumeric(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function setStyles(n,o){Object.keys(o).forEach(function(e){var t="";-1!==["width","height","top","right","bottom","left"].indexOf(e)&&isNumeric(o[e])&&(t="px"),n.style[e]=o[e]+t})}function setAttributes(t,n){Object.keys(n).forEach(function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})}function applyStyle(e){return setStyles(e.instance.popper,e.styles),setAttributes(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&setStyles(e.arrowElement,e.arrowStyles),e}function applyStyleOnLoad(e,t,n,o,r){var i=getReferenceOffsets(r,t,e,n.positionFixed),s=computeAutoPlacement(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",s),setStyles(t,{position:n.positionFixed?"fixed":"absolute"}),n}function getRoundedOffsets(e,t){var n=e.offsets,o=n.popper,r=n.reference,i=Math.round,s=Math.floor,a=function(e){return e},f=i(r.width),p=i(o.width),l=-1!==["left","right"].indexOf(e.placement),c=-1!==e.placement.indexOf("-"),d=t?l||c||f%2==p%2?i:s:a,u=t?i:a;return{left:d(f%2==1&&p%2==1&&!c&&t?o.left-1:o.left),top:u(o.top),bottom:u(o.bottom),right:d(o.right)}}var isFirefox=isBrowser&&/Firefox/i.test(navigator.userAgent);function computeStyle(e,t){var n=t.x,o=t.y,r=e.offsets.popper,i=find(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var s,a,f=void 0!==i?i:t.gpuAcceleration,p=getOffsetParent(e.instance.popper),l=getBoundingClientRect(p),c={position:r.position},d=getRoundedOffsets(e,window.devicePixelRatio<2||!isFirefox),u="bottom"===n?"top":"bottom",h="right"===o?"left":"right",m=getSupportedPropertyName("transform");if(a="bottom"===u?"HTML"===p.nodeName?-p.clientHeight+d.bottom:-l.height+d.bottom:d.top,s="right"===h?"HTML"===p.nodeName?-p.clientWidth+d.right:-l.width+d.right:d.left,f&&m)c[m]="translate3d(".concat(s,"px, ").concat(a,"px, 0)"),c[u]=0,c[h]=0,c.willChange="transform";else{var g="bottom"===u?-1:1,v="right"===h?-1:1;c[u]=a*g,c[h]=s*v,c.willChange="".concat(u,", ").concat(h)}var b={"x-placement":e.placement};return e.attributes=_extends({},b,e.attributes),e.styles=_extends({},c,e.styles),e.arrowStyles=_extends({},e.offsets.arrow,e.arrowStyles),e}function isModifierRequired(e,t,n){var o=find(e,function(e){return e.name===t}),r=!!o&&e.some(function(e){return e.name===n&&e.enabled&&e.order<o.order});if(!r){var i="`".concat(t,"`"),s="`".concat(n,"`");console.warn("".concat(s," modifier is required by ").concat(i," modifier in order to work, be sure to include it before ").concat(i,"!"))}return r}function arrow(e,t){var n;if(!isModifierRequired(e.instance.modifiers,"arrow","keepTogether"))return e;var o=t.element;if("string"==typeof o){if(!(o=e.instance.popper.querySelector(o)))return e}else if(!e.instance.popper.contains(o))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var r=e.placement.split("-")[0],i=e.offsets,s=i.popper,a=i.reference,f=-1!==["left","right"].indexOf(r),p=f?"height":"width",l=f?"Top":"Left",c=l.toLowerCase(),d=f?"left":"top",u=f?"bottom":"right",h=getOuterSizes(o)[p];a[u]-h<s[c]&&(e.offsets.popper[c]-=s[c]-(a[u]-h)),a[c]+h>s[u]&&(e.offsets.popper[c]+=a[c]+h-s[u]),e.offsets.popper=getClientRect(e.offsets.popper);var m=a[c]+a[p]/2-h/2,g=getStyleComputedProperty(e.instance.popper),v=parseFloat(g["margin".concat(l)]),b=parseFloat(g["border".concat(l,"Width")]),y=m-e.offsets.popper[c]-v-b;return y=Math.max(Math.min(s[p]-h,y),0),e.arrowElement=o,e.offsets.arrow=(_defineProperty(n={},c,Math.round(y)),_defineProperty(n,d,""),n),e}function getOppositeVariation(e){return"end"===e?"start":"start"===e?"end":e}var placements=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],validPlacements=placements.slice(3);function clockwise(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],n=validPlacements.indexOf(e),o=validPlacements.slice(n+1).concat(validPlacements.slice(0,n));return t?o.reverse():o}var BEHAVIORS={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"};function flip(m,g){if(isModifierEnabled(m.instance.modifiers,"inner"))return m;if(m.flipped&&m.placement===m.originalPlacement)return m;var v=getBoundaries(m.instance.popper,m.instance.reference,g.padding,g.boundariesElement,m.positionFixed),b=m.placement.split("-")[0],y=getOppositePlacement(b),w=m.placement.split("-")[1]||"",O=[];switch(g.behavior){case BEHAVIORS.FLIP:O=[b,y];break;case BEHAVIORS.CLOCKWISE:O=clockwise(b);break;case BEHAVIORS.COUNTERCLOCKWISE:O=clockwise(b,!0);break;default:O=g.behavior}return O.forEach(function(e,t){if(b!==e||O.length===t+1)return m;b=m.placement.split("-")[0],y=getOppositePlacement(b);var n=m.offsets.popper,o=m.offsets.reference,r=Math.floor,i="left"===b&&r(n.right)>r(o.left)||"right"===b&&r(n.left)<r(o.right)||"top"===b&&r(n.bottom)>r(o.top)||"bottom"===b&&r(n.top)<r(o.bottom),s=r(n.left)<r(v.left),a=r(n.right)>r(v.right),f=r(n.top)<r(v.top),p=r(n.bottom)>r(v.bottom),l="left"===b&&s||"right"===b&&a||"top"===b&&f||"bottom"===b&&p,c=-1!==["top","bottom"].indexOf(b),d=!!g.flipVariations&&(c&&"start"===w&&s||c&&"end"===w&&a||!c&&"start"===w&&f||!c&&"end"===w&&p),u=!!g.flipVariationsByContent&&(c&&"start"===w&&a||c&&"end"===w&&s||!c&&"start"===w&&p||!c&&"end"===w&&f),h=d||u;(i||l||h)&&(m.flipped=!0,(i||l)&&(b=O[t+1]),h&&(w=getOppositeVariation(w)),m.placement=b+(w?"-"+w:""),m.offsets.popper=_extends({},m.offsets.popper,getPopperOffsets(m.instance.popper,m.offsets.reference,m.placement)),m=runModifiers(m.instance.modifiers,m,"flip"))}),m}function keepTogether(e){var t=e.offsets,n=t.popper,o=t.reference,r=e.placement.split("-")[0],i=Math.floor,s=-1!==["top","bottom"].indexOf(r),a=s?"right":"bottom",f=s?"left":"top",p=s?"width":"height";return n[a]<i(o[f])&&(e.offsets.popper[f]=i(o[f])-n[p]),n[f]>i(o[a])&&(e.offsets.popper[f]=i(o[a])),e}function toValue(e,t,n,o){var r,i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),s=+i[1],a=i[2];if(!s)return e;if(0!==a.indexOf("%"))return"vh"!==a&&"vw"!==a?s:("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*s;switch(a){case"%p":r=n;break;case"%":case"%r":default:r=o}return getClientRect(r)[t]/100*s}function parseOffset(e,r,i,t){var s=[0,0],a=-1!==["right","left"].indexOf(t),n=e.split(/(\+|\-)/).map(function(e){return e.trim()}),o=n.indexOf(find(n,function(e){return-1!==e.search(/,|\s/)}));n[o]&&-1===n[o].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var f=/\s*,\s*|\s+/,p=-1!==o?[n.slice(0,o).concat([n[o].split(f)[0]]),[n[o].split(f)[1]].concat(n.slice(o+1))]:[n];return(p=p.map(function(e,t){var n=(1===t?!a:a)?"height":"width",o=!1;return e.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,o=!0,e):o?(e[e.length-1]+=t,o=!1,e):e.concat(t)},[]).map(function(e){return toValue(e,n,r,i)})})).forEach(function(n,o){n.forEach(function(e,t){isNumeric(e)&&(s[o]+=e*("-"===n[t-1]?-1:1))})}),s}function offset(e,t){var n,o=t.offset,r=e.placement,i=e.offsets,s=i.popper,a=i.reference,f=r.split("-")[0];return n=isNumeric(+o)?[+o,0]:parseOffset(o,s,a,f),"left"===f?(s.top+=n[0],s.left-=n[1]):"right"===f?(s.top+=n[0],s.left+=n[1]):"top"===f?(s.left+=n[0],s.top-=n[1]):"bottom"===f&&(s.left+=n[0],s.top+=n[1]),e.popper=s,e}function preventOverflow(e,o){var t=o.boundariesElement||getOffsetParent(e.instance.popper);e.instance.reference===t&&(t=getOffsetParent(t));var n=getSupportedPropertyName("transform"),r=e.instance.popper.style,i=r.top,s=r.left,a=r[n];r.top="",r.left="",r[n]="";var f=getBoundaries(e.instance.popper,e.instance.reference,o.padding,t,e.positionFixed);r.top=i,r.left=s,r[n]=a,o.boundaries=f;var p=o.priority,l=e.offsets.popper,c={primary:function(e){var t=l[e];return l[e]<f[e]&&!o.escapeWithReference&&(t=Math.max(l[e],f[e])),_defineProperty({},e,t)},secondary:function(e){var t="right"===e?"left":"top",n=l[t];return l[e]>f[e]&&!o.escapeWithReference&&(n=Math.min(l[t],f[e]-("right"===e?l.width:l.height))),_defineProperty({},t,n)}};return p.forEach(function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";l=_extends({},l,c[t](e))}),e.offsets.popper=l,e}function shift(e){var t=e.placement,n=t.split("-")[0],o=t.split("-")[1];if(o){var r=e.offsets,i=r.reference,s=r.popper,a=-1!==["bottom","top"].indexOf(n),f=a?"left":"top",p=a?"width":"height",l={start:_defineProperty({},f,i[f]),end:_defineProperty({},f,i[f]+i[p]-s[p])};e.offsets.popper=_extends({},s,l[o])}return e}function hide(e){if(!isModifierRequired(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=find(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}function inner(e){var t=e.placement,n=t.split("-")[0],o=e.offsets,r=o.popper,i=o.reference,s=-1!==["left","right"].indexOf(n),a=-1===["top","left"].indexOf(n);return r[s?"left":"top"]=i[n]-(a?r[s?"width":"height"]:0),e.placement=getOppositePlacement(t),e.offsets.popper=getClientRect(r),e}var modifiers={shift:{order:100,enabled:!0,fn:shift},offset:{order:200,enabled:!0,fn:offset,offset:0},preventOverflow:{order:300,enabled:!0,fn:preventOverflow,priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:keepTogether},arrow:{order:500,enabled:!0,fn:arrow,element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:flip,behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:inner},hide:{order:800,enabled:!0,fn:hide},computeStyle:{order:850,enabled:!0,fn:computeStyle,gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:applyStyle,onLoad:applyStyleOnLoad,gpuAcceleration:void 0}},Defaults={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:modifiers},Popper=function(){function i(e,t){var n=this,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};_classCallCheck(this,i),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=debounce(this.update.bind(this)),this.options=_extends({},i.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=e&&e.jquery?e[0]:e,this.popper=t&&t.jquery?t[0]:t,this.options.modifiers={},Object.keys(_extends({},i.Defaults.modifiers,o.modifiers)).forEach(function(e){n.options.modifiers[e]=_extends({},i.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return _extends({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&isFunction(e.onLoad)&&e.onLoad(n.reference,n.popper,n.options,e,n.state)}),this.update();var r=this.options.eventsEnabled;r&&this.enableEventListeners(),this.state.eventsEnabled=r}return _createClass(i,[{key:"update",value:function(){return _update.call(this)}},{key:"destroy",value:function(){return _destroy.call(this)}},{key:"enableEventListeners",value:function(){return _enableEventListeners.call(this)}},{key:"disableEventListeners",value:function(){return _disableEventListeners.call(this)}}]),i}();Popper.Utils=("undefined"!=typeof window?window:global).PopperUtils,Popper.placements=placements,Popper.Defaults=Defaults;var _default=Popper;exports.default=_default;
//# sourceMappingURL=maps/popper.js.map
