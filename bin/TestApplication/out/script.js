(function(){var b=this;var c=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};function e(a,d){return a<d?-1:a>d?1:0};var h;a:{var k=b.navigator;if(k){var l=k.userAgent;if(l){h=l;break a}}h=""};var m=-1!=h.indexOf("Opera")||-1!=h.indexOf("OPR"),n=-1!=h.indexOf("Trident")||-1!=h.indexOf("MSIE"),q=-1!=h.indexOf("Edge"),r=-1!=h.indexOf("Gecko")&&!(-1!=h.toLowerCase().indexOf("webkit")&&-1==h.indexOf("Edge"))&&!(-1!=h.indexOf("Trident")||-1!=h.indexOf("MSIE"))&&-1==h.indexOf("Edge"),t=-1!=h.toLowerCase().indexOf("webkit")&&-1==h.indexOf("Edge");function u(){var a=b.document;return a?a.documentMode:void 0}var v;
a:{var w="",x=function(){var a=h;if(r)return/rv\:([^\);]+)(\)|;)/.exec(a);if(q)return/Edge\/([\d\.]+)/.exec(a);if(n)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(t)return/WebKit\/(\S+)/.exec(a);if(m)return/(?:Version)[ \/]?(\S+)/.exec(a)}();x&&(w=x?x[1]:"");if(n){var y=u();if(null!=y&&y>parseFloat(w)){v=String(y);break a}}v=w}var z={};
function A(a){if(!z[a]){for(var d=0,F=c(String(v)).split("."),G=c(String(a)).split("."),M=Math.max(F.length,G.length),p=0;0==d&&p<M;p++){var N=F[p]||"",O=G[p]||"",P=RegExp("(\\d*)(\\D*)","g"),Q=RegExp("(\\d*)(\\D*)","g");do{var f=P.exec(N)||["","",""],g=Q.exec(O)||["","",""];if(0==f[0].length&&0==g[0].length)break;d=e(0==f[1].length?0:parseInt(f[1],10),0==g[1].length?0:parseInt(g[1],10))||e(0==f[2].length,0==g[2].length)||e(f[2],g[2])}while(0==d)}z[a]=0<=d}}
var B=b.document,C=B&&n?u()||("CSS1Compat"==B.compatMode?parseInt(v,10):5):void 0;var D;if(!(D=!r&&!n)){var E;if(E=n)E=9<=Number(C);D=E}D||r&&A("1.9.1");n&&A("9");function H(a){this.a=document.createElement("button");this.a.id=a;this.a.type="submit";document.body.appendChild(this.a)};function I(){this.b=document.createElement("DIV");this.b.id="toolbar";document.body.appendChild(this.b);this.a=[];this.a.push(new H("circle"));this.a.push(new H("triangle"));this.a.push(new H("square"));this.a.push(new H("undo"));this.a.push(new H("redo"))};function J(){new I};function K(){new J}var L=["Application","start"],R=b;L[0]in R||!R.execScript||R.execScript("var "+L[0]);for(var S;L.length&&(S=L.shift());){var T;if(T=!L.length)T=void 0!==K;T?R[S]=K:R[S]?R=R[S]:R=R[S]={}};})();
