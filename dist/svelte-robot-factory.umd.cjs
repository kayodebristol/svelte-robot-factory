(function(c,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(c=typeof globalThis<"u"?globalThis:c||self,s(c["my-vite-module"]={}))})(this,function(c){"use strict";function s(e){return{enumerable:!0,value:e}}function m(e){return{enumerable:!0,writable:!0,value:e}}let d={},O=()=>!0,w=e=>e,M=(e,n,t,r)=>e.apply(t,r)&&n.apply(t,r),S=(e,n,t,[r,i])=>n.call(t,e.call(t,r,i),i),b=(e,n)=>Object.freeze(Object.create(e,n));function y(e,n,t){return e.reduce((r,i)=>function(...o){return t(r,i,this,o)},n)}function g(e){return b(this,{fn:s(e)})}let T={};g.bind(T);let x={};g.bind(x);function _(e,n){return n.filter(t=>e.isPrototypeOf(t))}function j(e,n,...t){let r=y(_(x,t).map(o=>o.fn),O,M),i=y(_(T,t).map(o=>o.fn),w,S);return b(this,{from:s(e),to:s(n),guards:s(r),reducers:s(i)})}let q={},z={};j.bind(q),j.bind(z,null);function k(e,n,t,r){let{context:i}=e;for(let{to:o,guards:h,reducers:l}of r)if(h(i,t)){e.context=l.call(e,i,t);let f=n.original||n,u=b(f,{current:s(o),original:{value:f}});return d._onEnter&&d._onEnter(n,o,e.context,i,t),u.state.value.enter(u,e,t)}}function C(e,n){let t=n.type||n,{machine:r}=e,{value:i,name:o}=r.state;return i.transitions.has(t)?k(e,r,n,i.transitions.get(t))||r:(d._send&&d._send(t,o),r)}let N={send(e){this.machine=C(this,e),this.onChange(this)}};function P(e,n,t,r){let i=Object.create(N,{machine:m(e),context:m(e.context(t,r)),onChange:s(n)});return i.send=i.send.bind(i),i.machine=i.machine.state.value.enter(i.machine,i,r),i}function p(){}function B(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}const a=[];function E(e,n=p){let t;const r=new Set;function i(l){if(B(e,l)&&(e=l,t)){const f=!a.length;for(const u of r)u[1](),a.push(u,e);if(f){for(let u=0;u<a.length;u+=2)a[u][0](a[u+1]);a.length=0}}}function o(l){i(l(e))}function h(l,f=p){const u=[l,f];return r.add(u),r.size===1&&(t=n(i)||p),l(e),()=>{r.delete(u),r.size===0&&t&&(t(),t=null)}}return{set:i,update:o,subscribe:h}}function F(e,n){const{subscribe:t,set:r}=E(P(e,i=>r(i),n));return{subscribe:t}}c.useMachine=F,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
