(this.webpackJsonpTEAyudo=this.webpackJsonpTEAyudo||[]).push([[3],{169:function(t,n,e){"use strict";e.r(n),e.d(n,"KEYBOARD_DID_CLOSE",(function(){return r})),e.d(n,"KEYBOARD_DID_OPEN",(function(){return i})),e.d(n,"copyLayoutViewport",(function(){return K})),e.d(n,"copyVisualViewport",(function(){return k})),e.d(n,"keyboardDidClose",(function(){return b})),e.d(n,"keyboardDidOpen",(function(){return w})),e.d(n,"keyboardDidResize",(function(){return y})),e.d(n,"resetKeyboardAssist",(function(){return c})),e.d(n,"setKeyboardClose",(function(){return g})),e.d(n,"setKeyboardOpen",(function(){return p})),e.d(n,"startKeyboardAssist",(function(){return f})),e.d(n,"trackViewportChanges",(function(){return l}));var i="ionKeyboardDidShow",r="ionKeyboardDidHide",o={},u={},d={},a={},s=!1,c=function(){o={},u={},d={},a={},s=!1},f=function(t){h(t),t.visualViewport&&(u=k(t.visualViewport),a=K(t),t.visualViewport.onresize=function(){l(t),w()||y(t)?p(t):b(t)&&g(t)})},h=function(t){t.addEventListener("keyboardDidShow",(function(n){return p(t,n)})),t.addEventListener("keyboardDidHide",(function(){return g(t)}))},p=function(t,n){D(t,n),s=!0},g=function(t){E(t),s=!1},w=function(){var t=(o.height-u.height)*u.scale;return!s&&o.width===u.width&&t>150&&!v()},y=function(t){return s&&!b(t)},b=function(t){return s&&u.height===t.innerHeight},v=function(){return a.width!==d.width||a.height!==d.height},D=function(t,n){var e=n?n.keyboardHeight:t.innerHeight-u.height,r=new CustomEvent(i,{detail:{keyboardHeight:e}});t.dispatchEvent(r)},E=function(t){var n=new CustomEvent(r);t.dispatchEvent(n)},l=function(t){o=Object.assign({},u),u=k(t.visualViewport),d=Object.assign({},a),a=K(t)},k=function(t){return{width:Math.round(t.width),height:Math.round(t.height),offsetTop:t.offsetTop,offsetLeft:t.offsetLeft,pageTop:t.pageTop,pageLeft:t.pageLeft,scale:t.scale}},K=function(t){return{width:t.innerWidth,height:t.innerHeight}}}}]);
//# sourceMappingURL=3.79abb068.chunk.js.map