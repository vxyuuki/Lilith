var l0=Object.defineProperty;var c0=(i,e,t)=>e in i?l0(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Ve=(i,e,t)=>c0(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();var yd="1.3.25";function Cm(i,e,t){return Math.max(i,Math.min(e,t))}function u0(i,e,t){return(1-t)*i+t*e}function f0(i,e,t,n){return u0(i,e,1-Math.exp(-t*n))}function h0(i,e){return(i%e+e)%e}var d0=class{constructor(){Ve(this,"isRunning",!1);Ve(this,"value",0);Ve(this,"from",0);Ve(this,"to",0);Ve(this,"currentTime",0);Ve(this,"lerp");Ve(this,"duration");Ve(this,"easing");Ve(this,"onUpdate")}advance(i){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=i;const n=Cm(0,this.currentTime/this.duration,1);e=n>=1;const r=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*r}else this.lerp?(this.value=f0(this.value,this.to,this.lerp*60,i),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(i,e,{lerp:t,duration:n,easing:r,onStart:s,onUpdate:a}){this.from=this.value=i,this.to=e,this.lerp=t,this.duration=n,this.easing=r,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=a}};function p0(i,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,i.apply(this,n)},e)}}var m0=class{constructor(i,e,{autoResize:t=!0,debounce:n=250}={}){Ve(this,"width",0);Ve(this,"height",0);Ve(this,"scrollHeight",0);Ve(this,"scrollWidth",0);Ve(this,"debouncedResize");Ve(this,"wrapperResizeObserver");Ve(this,"contentResizeObserver");Ve(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ve(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ve(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=i,this.content=e,t&&(this.debouncedResize=p0(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var i,e;(i=this.wrapperResizeObserver)==null||i.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Pm=class{constructor(){Ve(this,"events",{})}emit(i,...e){var n;const t=this.events[i]||[];for(let r=0,s=t.length;r<s;r++)(n=t[r])==null||n.call(t,...e)}on(i,e){return this.events[i]?this.events[i].push(e):this.events[i]=[e],()=>{var t;this.events[i]=(t=this.events[i])==null?void 0:t.filter(n=>e!==n)}}off(i,e){var t;this.events[i]=(t=this.events[i])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}};const _0=100/6,Nr={passive:!1};function Td(i,e){return i===1?_0:i===2?e:1}var g0=class{constructor(i,e={wheelMultiplier:1,touchMultiplier:1}){Ve(this,"touchStart",{x:0,y:0});Ve(this,"lastDelta",{x:0,y:0});Ve(this,"window",{width:0,height:0});Ve(this,"emitter",new Pm);Ve(this,"onTouchStart",i=>{const{clientX:e,clientY:t}=i.targetTouches?i.targetTouches[0]:i;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:i})});Ve(this,"onTouchMove",i=>{const{clientX:e,clientY:t}=i.targetTouches?i.targetTouches[0]:i,n=-(e-this.touchStart.x)*this.options.touchMultiplier,r=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:r},this.emitter.emit("scroll",{deltaX:n,deltaY:r,event:i})});Ve(this,"onTouchEnd",i=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:i})});Ve(this,"onWheel",i=>{let{deltaX:e,deltaY:t,deltaMode:n}=i;const r=Td(n,this.window.width),s=Td(n,this.window.height);e*=r,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:i})});Ve(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=i,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Nr),this.element.addEventListener("touchstart",this.onTouchStart,Nr),this.element.addEventListener("touchmove",this.onTouchMove,Nr),this.element.addEventListener("touchend",this.onTouchEnd,Nr)}on(i,e){return this.emitter.on(i,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Nr),this.element.removeEventListener("touchstart",this.onTouchStart,Nr),this.element.removeEventListener("touchmove",this.onTouchMove,Nr),this.element.removeEventListener("touchend",this.onTouchEnd,Nr)}};const Ed=i=>Math.min(1,1.001-2**(-10*i));var v0=class{constructor({wrapper:i=window,content:e=document.documentElement,eventsTarget:t=i,smoothWheel:n=!0,syncTouch:r=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f=d==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:p=1,autoResize:g=!0,prevent:m,virtualScroll:_,overscroll:M=!0,autoRaf:w=!1,anchors:S=!1,autoToggle:y=!1,allowNestedScroll:T=!1,__experimental__naiveDimensions:b=!1,naiveDimensions:x=b,stopInertiaOnNavigate:A=!1}={}){Ve(this,"_isScrolling",!1);Ve(this,"_isStopped",!1);Ve(this,"_isLocked",!1);Ve(this,"_preventNextNativeScrollEvent",!1);Ve(this,"_resetVelocityTimeout",null);Ve(this,"_rafId",null);Ve(this,"_isDraggingSelection",!1);Ve(this,"isTouching");Ve(this,"isIos");Ve(this,"time",0);Ve(this,"userData",{});Ve(this,"lastVelocity",0);Ve(this,"velocity",0);Ve(this,"direction",0);Ve(this,"options");Ve(this,"targetScroll");Ve(this,"animatedScroll");Ve(this,"animate",new d0);Ve(this,"emitter",new Pm);Ve(this,"dimensions");Ve(this,"virtualScroll");Ve(this,"onScrollEnd",i=>{i instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&i.stopPropagation()});Ve(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ve(this,"onTransitionEnd",i=>{var e;(e=i.propertyName)!=null&&e.includes("overflow")&&i.target===this.rootElement&&this.checkOverflow()});Ve(this,"onClick",i=>{const e=i.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(r=>t.host===r.host&&t.pathname===r.pathname&&r.hash);if(n){const r=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,r);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}});Ve(this,"onPointerDown",i=>{i.button===1&&this.reset()});Ve(this,"onVirtualScroll",i=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(i)===!1)return;const{deltaX:e,deltaY:t,event:n}=i;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const r=n.type.includes("touch"),s=n.type.includes("wheel");if(r&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&r&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(p=>{var g,m,_,M,w;return p instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(p))||((g=p.hasAttribute)==null?void 0:g.call(p,"data-lenis-prevent"))||u==="vertical"&&((m=p.hasAttribute)==null?void 0:m.call(p,"data-lenis-prevent-vertical"))||u==="horizontal"&&((_=p.hasAttribute)==null?void 0:_.call(p,"data-lenis-prevent-horizontal"))||r&&((M=p.hasAttribute)==null?void 0:M.call(p,"data-lenis-prevent-touch"))||s&&((w=p.hasAttribute)==null?void 0:w.call(p,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&r||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=t;this.options.gestureOrientation==="both"?d=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(d=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const f=r&&this.options.syncTouch,h=r&&n.type==="touchend";h&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:h?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ve(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const i=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-i,this.direction=Math.sign(this.animatedScroll-i),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ve(this,"raf",i=>{const e=i-(this.time||i);this.time=i,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=yd,window.lenis||(window.lenis={}),window.lenis.version=yd,d==="horizontal"&&(window.lenis.horizontal=!0),r===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!i||i===document.documentElement)&&(i=window),typeof o=="number"&&typeof l!="function"?l=Ed:typeof l=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:i,content:e,eventsTarget:t,smoothWheel:n,syncTouch:r,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:p,autoResize:g,prevent:m,virtualScroll:_,overscroll:M,autoRaf:w,anchors:S,autoToggle:y,allowNestedScroll:T,naiveDimensions:x,stopInertiaOnNavigate:A},this.dimensions=new m0(i,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new g0(t,{touchMultiplier:h,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(i,e){return this.emitter.on(i,e)}off(i,e){return this.emitter.off(i,e)}get overflow(){const i=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[i]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(i){this.isHorizontal?this.options.wrapper.scrollTo({left:i,behavior:"instant"}):this.options.wrapper.scrollTo({top:i,behavior:"instant"})}isTouchOnSelectionHandle(i){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=i.targetTouches[0]??i.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const r=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-r.left,t.clientY-r.top)<=a,l=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(i,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:r=!0,lerp:s=r?this.options.lerp:void 0,duration:a=r?this.options.duration:void 0,easing:o=r?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:d}={}){if((this.isStopped||this.isLocked)&&!u)return;let f=i,h=e;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let p=null;if(typeof f=="string"?(p=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),p||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof HTMLElement&&(f!=null&&f.nodeType)&&(p=f),p){if(this.options.wrapper!==window){const S=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?S.left:S.top}const g=p.getBoundingClientRect(),m=getComputedStyle(p),_=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),M=getComputedStyle(this.rootElement),w=this.isHorizontal?Number.parseFloat(M.scrollPaddingLeft):Number.parseFloat(M.scrollPaddingTop);f=(this.isHorizontal?g.left:g.top)+this.animatedScroll-(Number.isNaN(_)?0:_)-(Number.isNaN(w)?0:w)}}if(typeof f=="number"){if(f+=h,this.options.infinite){if(r){this.targetScroll=this.animatedScroll=this.scroll;const p=f-this.animatedScroll;p>this.limit/2?f-=this.limit:p<-this.limit/2&&(f+=this.limit)}}else f=Cm(0,f,this.limit);if(f===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}r||(this.targetScroll=f),typeof a=="number"&&typeof o!="function"?o=Ed:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,f,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(p,g)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),r&&(this.targetScroll=p),g||this.emit(),g&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(i,{deltaX:e,deltaY:t}){const n=Date.now();i._lenis||(i._lenis={});const r=i._lenis;let s,a,o,l,c,u,d,f,h,p;if(n-(r.time??0)>2e3){r.time=Date.now();const T=window.getComputedStyle(i);if(r.computedStyle=T,s=["auto","overlay","scroll"].includes(T.overflowX),a=["auto","overlay","scroll"].includes(T.overflowY),c=["auto"].includes(T.overscrollBehaviorX),u=["auto"].includes(T.overscrollBehaviorY),r.hasOverflowX=s,r.hasOverflowY=a,!(s||a))return!1;d=i.scrollWidth,f=i.scrollHeight,h=i.clientWidth,p=i.clientHeight,o=d>h,l=f>p,r.isScrollableX=o,r.isScrollableY=l,r.scrollWidth=d,r.scrollHeight=f,r.clientWidth=h,r.clientHeight=p,r.hasOverscrollBehaviorX=c,r.hasOverscrollBehaviorY=u}else o=r.isScrollableX,l=r.isScrollableY,s=r.hasOverflowX,a=r.hasOverflowY,d=r.scrollWidth,f=r.scrollHeight,h=r.clientWidth,p=r.clientHeight,c=r.hasOverscrollBehaviorX,u=r.hasOverscrollBehaviorY;if(!(s&&o||a&&l))return!1;const g=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let m,_,M,w,S,y;if(g==="horizontal")m=Math.round(i.scrollLeft),_=d-h,M=e,w=s,S=o,y=c;else if(g==="vertical")m=Math.round(i.scrollTop),_=f-p,M=t,w=a,S=l,y=u;else return!1;return!y&&(m>=_||m<=0)?!0:(M>0?m<_:m>0)&&w&&S}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const i=this.options.wrapper;return this.isHorizontal?i.scrollX??i.scrollLeft:i.scrollY??i.scrollTop}get scroll(){return this.options.infinite?h0(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(i){this._isScrolling!==i&&(this._isScrolling=i,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(i){this._isStopped!==i&&(this._isStopped=i,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(i){this._isLocked!==i&&(this._isLocked=i,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let i="lenis";return this.options.autoToggle&&(i+=" lenis-autoToggle"),this.isStopped&&(i+=" lenis-stopped"),this.isLocked&&(i+=" lenis-locked"),this.isScrolling&&(i+=" lenis-scrolling"),this.isScrolling==="smooth"&&(i+=" lenis-smooth"),i}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(i=>{this.rootElement.classList.add(i)})}cleanUpClassName(){for(const i of Array.from(this.rootElement.classList))(i==="lenis"||i.startsWith("lenis-"))&&this.rootElement.classList.remove(i)}};/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Cr=typeof window<"u",Kc=Cr?window:null,An=Cr?document:null,Ft={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},ht={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},li={NONE:0,AUTO:1,FORCE:2},Cn={replace:0,none:1,blend:2},bd=Symbol(),Na=Symbol(),Dm=Symbol(),zc=Symbol(),x0=Symbol(),St=1e-11,rf=1e12,Ua=1e3,sf=240,Ns="",S0="var(",tl=[],Lm=(()=>{const i=new Map;return i.set("x","translateX"),i.set("y","translateY"),i.set("z","translateZ"),i})(),mc=["perspective","translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY"],M0=mc.reduce((i,e)=>({...i,[e]:e+"("}),{}),si=()=>{},y0=i=>i,T0=/\)\s*[-.\d]/,E0=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,b0=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,A0=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,w0=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,R0=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Ad=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,Im=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,C0=/([a-z])([A-Z])/g,P0=/(\*=|\+=|-=)/,D0=/var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const _c={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:sf,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:Ua,delay:0,loopDelay:0,ease:"out(2)",composition:Cn.replace,modifier:y0,onBegin:si,onBeforeUpdate:si,onUpdate:si,onLoop:si,onPause:si,onComplete:si,onRender:si},L0={root:An},nn={defaults:_c,precision:4,timeScale:1,tickThreshold:200,editor:null},Nm={version:"4.5.0",engine:null};Cr&&(Kc.AnimeJS||(Kc.AnimeJS=[]),Kc.AnimeJS.push(Nm));/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Um=i=>i.replace(C0,"$1-$2").toLowerCase(),xr=(i,e)=>i.indexOf(e)===0,Fa=Date.now,ji=Array.isArray,Zr=i=>i&&i.constructor===Object,Ii=i=>typeof i=="number"&&!isNaN(i),Er=i=>typeof i=="string",Yn=i=>typeof i=="function",je=i=>typeof i>"u",Ma=i=>je(i)||i===null,Fm=i=>Cr&&i instanceof SVGElement,Om=i=>E0.test(i),Bm=i=>xr(i,"rgb"),zm=i=>xr(i,"hsl"),I0=i=>Om(i)||(Bm(i)||zm(i))&&(i[i.length-1]===")"||!T0.test(i)),$l=i=>!nn.defaults.hasOwnProperty(i),N0=["opacity","rotate","overflow","color"],U0=(i,e)=>{if(N0.includes(e))return!1;if(i.getAttribute(e)||e in i){if(e==="scale"){const t=i.parentNode;return t&&t.tagName==="filter"}return!0}},Zc=i=>Er(i)?parseFloat(i):i,pa=Math.pow,af=Math.sqrt,F0=Math.sin,O0=Math.cos,nl=Math.abs,uo=Math.floor,B0=Math.asin,wh=Math.PI,wd=Math.round,Fi=(i,e,t)=>i<e?e:i>t?t:i,It=(i,e)=>{if(e<0)return i;if(!e)return wd(i);const t=10**e;return wd(i*t)/t},Kl=(i,e,t)=>t===1?e:t===0?i:i+(e-i)*t,kc=i=>i===1/0?rf:i===-1/0?-rf:i,ya=i=>i<=St?St:kc(It(i,11)),wn=i=>ji(i)?[...i]:i,km=(i,e)=>{const t={...i};for(let n in e){const r=i[n];t[n]=je(r)?e[n]:r}return t},Ot=(i,e,t,n="_prev",r="_next")=>{let s=i._head,a=r;for(t&&(s=i._tail,a=n);s;){const o=s[a];e(s),s=o}},Ms=(i,e,t="_prev",n="_next")=>{const r=e[t],s=e[n];r?r[n]=s:i._head=s,s?s[t]=r:i._tail=r,e[t]=null,e[n]=null},ys=(i,e,t,n="_prev",r="_next")=>{let s=i._tail;for(;s&&t&&t(s,e);)s=s[n];const a=s?s[r]:i._head;s?s[r]=e:i._head=e,a?a[n]=e:i._tail=e,e[n]=s,e[r]=a};/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const z0=(i,e,t)=>{const n=i.style.transform;if(n){const r=i[zc];let s=0;const a=n.length;let o;for(;s<a;){for(;s<a&&n.charCodeAt(s)===32;)s++;if(s>=a)break;const c=s;for(;s<a&&n.charCodeAt(s)!==40;)s++;if(s>=a)break;const u=n.substring(c,s);let d=1;const f=s+1;let h=-1,p=-1;for(s++;s<a&&d>0;){const m=n.charCodeAt(s);m===40?d++:m===41?d--:m===44&&d===1&&(h===-1?h=s:p===-1&&(p=s)),s++}const g=s-1;u==="translate"||u==="translate3d"?(h===-1?r.translateX=n.substring(f,g).trim():(r.translateX=n.substring(f,h).trim(),p===-1?r.translateY=n.substring(h+1,g).trim():(r.translateY=n.substring(h+1,p).trim(),r.translateZ=n.substring(p+1,g).trim())),o=n.substring(f,g)):u==="scale"||u==="scale3d"?h===-1?r.scale=n.substring(f,g).trim():(r.scaleX=n.substring(f,h).trim(),p===-1?r.scaleY=n.substring(h+1,g).trim():(r.scaleY=n.substring(h+1,p).trim(),r.scaleZ=n.substring(p+1,g).trim())):r[u]=n.substring(f,g)}if(e==="translate3d"&&o)return t&&(t[e]=o),o;const l=r[e];if(!je(l))return t&&(t[e]=l),l}return e==="translate3d"?"0px, 0px, 0px":e==="rotate3d"?"0, 0, 0, 0deg":xr(e,"scale")?"1":xr(e,"rotate")||xr(e,"skew")?"0deg":"0px"},Vm=i=>{let e=Ns;for(let t=0,n=mc.length;t<n;t++){const r=mc[t],s=i[r];if(s!==void 0){if(r==="translateX"){const a=i.translateY;if(a!==void 0){const o=i.translateZ;o!==void 0?(e+=`translate3d(${s},${a},${o}) `,t+=2):(e+=`translate(${s},${a}) `,t+=1);continue}}if(r==="scaleX"&&i.scale===void 0){const a=i.scaleY;if(a!==void 0){const o=i.scaleZ;o!==void 0?(e+=`scale3d(${s},${a},${o}) `,t+=2):(e+=`scale(${s},${a}) `,t+=1);continue}}e+=`${M0[r]}${s}) `}r==="rotateZ"&&i.rotate3d!==void 0&&(e+=`rotate3d(${i.rotate3d}) `)}return i.matrix!==void 0&&(e+=`matrix(${i.matrix}) `),i.matrix3d!==void 0&&(e+=`matrix3d(${i.matrix3d}) `),e};/**
 * Anime.js - adapters - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Jc=[];function Hm(i,e){if(!i)return null;const t=Jc.length;e:for(let n=0;n<t;n++){const r=Jc[n];if(r.detect&&!r.detect(i))continue;const s=r.targetAdapters;for(let a=0,o=s.length;a<o;a++){const l=s[a];if(l.detect(i)){const c=l.props[e];if(c&&(!c.gate||c.gate(i)))return c;break e}}}for(let n=0;n<t;n++){const r=Jc[n];if(r.detect&&!r.detect(i))continue;const s=r.propertyResolvers;for(let a=0,o=s.length;a<o;a++){const l=s[a](i,e);if(l)return l}}return null}/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const k0=i=>{const e=b0.exec(i)||A0.exec(i),t=je(e[4])?1:+e[4];return[+e[1],+e[2],+e[3],t]},V0=i=>{const e=i.length,t=e===4||e===5;return[+("0x"+i[1]+i[t?1:2]),+("0x"+i[t?2:3]+i[t?2:4]),+("0x"+i[t?3:5]+i[t?3:6]),e===5||e===9?+(+("0x"+i[t?4:7]+i[t?4:8])/255).toFixed(3):1]},Qc=(i,e,t)=>(t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*(2/3-t)*6:i),H0=i=>{const e=w0.exec(i)||R0.exec(i),t=+e[1]/360,n=+e[2]/100,r=+e[3]/100,s=je(e[4])?1:+e[4];let a,o,l;if(n===0)a=o=l=r;else{const c=r<.5?r*(1+n):r+n-r*n,u=2*r-c;a=It(Qc(u,c,t+1/3)*255,0),o=It(Qc(u,c,t)*255,0),l=It(Qc(u,c,t-1/3)*255,0)}return[a,o,l,s]},G0=i=>Bm(i)?k0(i):Om(i)?V0(i):zm(i)?H0(i):[0,0,0,1];/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Bt=(i,e)=>je(i)?e:i,Rd=(i,e)=>{var s;const t=i.match(D0),n=e[Na]?e:document.documentElement;let r=(s=getComputedStyle(n))==null?void 0:s.getPropertyValue(t[1]);return(!r||r.trim()===Ns)&&t[2]&&(r=t[2].trim()),r||0},or=(i,e,t,n,r,s)=>{if(Yn(i)){if(!r){const o=i(e,t,n,s);return isNaN(+o)?o||0:+o}const a=()=>{const o=i(e,t,n,s);return isNaN(+o)?o||0:+o};return r.func=a,a()}if(Er(i)&&xr(i,S0)){if(!r)return Rd(i,e);const a=()=>Rd(i,e);return r.func=a,a()}return i},Gm=(i,e)=>i[Na]?i[Dm]&&U0(i,e)?Ft.ATTRIBUTE:mc.includes(e)||Lm.get(e)?Ft.TRANSFORM:xr(e,"--")?Ft.CSS_VAR:e in i.style?Ft.CSS:e in i?Ft.OBJECT:Ft.ATTRIBUTE:Ft.OBJECT,Cd=(i,e,t)=>{const n=i.style[e];n&&t&&(t[e]=n);const r=n||getComputedStyle(i[x0]||i).getPropertyValue(e);return r==="auto"?"0":r},ma=(i,e,t,n)=>{const r=je(t)?Gm(i,e):t,s=Hm(i,e);if(s){const a=s.get(i);return a&&n&&(n[e]=a),a??0}if(r===Ft.OBJECT){const a=i[e];return a&&n&&(n[e]=a),a||0}if(r===Ft.ATTRIBUTE){const a=i.getAttribute(e);return a&&n&&(n[e]=a),a}return r===Ft.TRANSFORM?z0(i,e,n):r===Ft.CSS_VAR?Cd(i,e,n).trimStart():Cd(i,e,n)},Zl=(i,e,t)=>t==="-"?i-e:t==="+"?i+e:i*e,Rh=()=>({t:ht.NUMBER,n:0,u:null,o:null,d:null,s:null}),Si=(i,e)=>{if(e.t=ht.NUMBER,e.n=0,e.u=null,e.o=null,e.d=null,e.s=null,!i)return e;const t=+i;if(!isNaN(t))return e.n=t,e;let n=i;n[1]==="="&&(e.o=n[0],n=n.slice(2));const r=n.includes(" ")?!1:Im.exec(n);if(r)return e.t=ht.UNIT,e.n=+r[1],e.u=r[2],e;if(e.o)return e.n=+n,e;if(I0(n))return e.t=ht.COLOR,e.d=G0(n),e;{const s=n.match(Ad);return e.t=ht.COMPLEX,e.d=s?s.map(Number):[],e.s=n.split(Ad)||[],e}},Pd=(i,e)=>(e.t=i._valueType,e.n=i._toNumber,e.u=i._unit,e.o=null,e.d=wn(i._toNumbers),e.s=wn(i._strings),e),Ni=Rh(),Wm=(i,e,t)=>{const n=i._modifier,r=i._fromNumbers,s=i._toNumbers,a=i._strings;let o=a[0];for(let l=0,c=s.length;l<c;l++){const u=n(It(Kl(r[l],s[l],e),t)),d=a[l+1];o+=`${d?u+d:u}`,i._numbers[l]=u}return o};/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Jl=(i,e,t,n,r)=>{const s=i.parent,a=i.duration,o=i.completed,l=i.iterationDuration,c=i.iterationCount,u=i._currentIteration,d=i._loopDelay,f=i._reversed,h=i._alternate,p=i._hasChildren,g=i._delay,m=i._currentTime,_=g+l,M=e-g,w=Fi(m,-g,a),S=Fi(M,-g,a),y=M-m,T=S>0,b=S>=a,x=a<=St,A=r===li.FORCE;let C=0,D=M,L=0;if(c>1){const U=l+(b?0:d),Y=~~(S/U);i._currentIteration=Fi(Y,0,c),b&&i._currentIteration--,C=i._currentIteration%2,D=S-Y*U||0}const q=f^(h&&C),X=i._ease;let N=b?q?0:a:q?l-D:D;X&&(N=l*X(N/l)||0);const H=(s?s.backwards:M<m)?!q:!!q;if(i._currentTime=M,i._iterationTime=N,i.backwards=H,T&&!i.began?(i.began=!0,!t&&!(s&&(H||!s.began))&&i.onBegin(i)):M<=0&&(i.began=!1),!t&&!p&&T&&i._currentIteration!==u&&i.onLoop(i),A||r===li.AUTO&&(e>=(s&&g>0?0:g)&&e<=_||e<=g&&w>g||e>=_&&w!==a)||N>=_&&w!==a||N<=g&&w>0&&!b||e<=w&&w===a&&o||b&&!o&&x){if(T&&(i.computeDeltaTime(w),t||i.onBeforeUpdate(i)),!p){const U=A||(H?y*-1:y)>=nn.tickThreshold,Y=It(i._offset+(s?s._offset:0)+g+N,12);let B=i._head,P,ne,de,Ye,Ge=0;for(;B;){const Fe=B._composition,G=B._currentTime,oe=B._changeDuration,te=B._absoluteStartTime+B._changeDuration,fe=B._nextRep,Ce=B._prevRep,Me=Fe!==Cn.none,Ee=Ce?Ce._absoluteStartTime+Ce._changeDuration:0,ue=Ce&&Ce.parent!==B.parent,Pe=!fe||fe._isOverridden?te:fe.parent===B.parent?te+fe._delay:fe._absoluteStartTime<fe._absoluteUpdateStartTime?fe._absoluteStartTime:fe._absoluteUpdateStartTime;if((U||(G!==oe||Y<=Pe||Ce&&!ue&&(!fe||fe.parent!==B.parent))&&(G!==0||Y>=B._absoluteStartTime||ue&&!B._hasFromValue&&!Ce._isOverridden&&Y>=Ee||fe&&!fe._isOverridden&&fe.parent===B.parent&&fe._currentTime!==0&&N<fe._startTime))&&(!Ce||ue||N>=B._startTime)&&(!Me||!B._isOverridden&&(!B._isOverlapped||Y<=te)&&(!fe||fe._isOverridden||Y<=Pe)&&(!Ce||Ce._isOverridden||(ue?Y>=B._absoluteStartTime||!B._hasFromValue&&Y>=Ee:Y>=Ee+B._delay)))){const Oe=B._currentTime=Fi(N-B._startTime,0,oe),be=B._ease(Oe/B._updateDuration),V=B._modifier,qe=B._valueType,Ke=B._tweenType,it=Ke===Ft.OBJECT,De=qe===ht.NUMBER,$e=De&&it||be===0||be===1?-1:nn.precision;let I,Ze;if(De)I=Ze=V(It(Kl(B._fromNumber,B._toNumber,be),$e));else if(qe===ht.UNIT)Ze=V(It(Kl(B._fromNumber,B._toNumber,be),$e)),I=`${Ze}${B._unit}`;else if(qe===ht.COLOR){const ye=B._numbers,R=B._fromNumbers,v=B._toNumbers,O=1-be,z=R[0],J=R[1],ce=R[2],le=v[0],Q=v[1],j=v[2];ye[0]=V(Math.sqrt(z*z*O+le*le*be)),ye[1]=V(Math.sqrt(J*J*O+Q*Q*be)),ye[2]=V(Math.sqrt(ce*ce*O+j*j*be)),ye[3]=V(Kl(R[3],v[3],be)),(!B._setter||n)&&(I=`rgba(${It(ye[0],0)},${It(ye[1],0)},${It(ye[2],0)},${ye[3]})`)}else qe===ht.COMPLEX&&(I=Wm(B,be,$e));if(Me&&(B._number=Ze),!n&&Fe!==Cn.blend){const ye=B.property;P=B.target,B._setter?B._setter(P,Ze,B):it?P[ye]=I:Ke===Ft.ATTRIBUTE?P.setAttribute(ye,I):(ne=P.style,Ke===Ft.TRANSFORM?(P!==de&&(de=P,Ye=P[zc]),Ye[ye]=I,Ge=1):Ke===Ft.CSS?ne[ye]=I:Ke===Ft.CSS_VAR&&ne.setProperty(ye,I)),T&&(L=1)}else B._value=I}else G&&Ce&&!ue&&N<B._startTime&&(B._currentTime=0);Ge&&B._renderTransforms&&(ne.transform=Vm(Ye),Ge=0),B=B._next}!t&&L&&i.onRender(i)}!t&&T&&i.onUpdate(i)}return s&&x?!t&&(s.began&&!H&&M>0&&!o||H&&M<=St&&o)&&(i.onComplete(i),i.completed=!H):T&&b?c===1/0?i._startTime+=i.duration:i._currentIteration>=c-1&&(i.paused=!0,!o&&!p&&(i.completed=!0,!t&&!(s&&(H||!s.began))&&(i.onComplete(i),i._resolve(i)))):i.completed=!1,L},vs=(i,e,t,n,r)=>{const s=i._currentIteration;if(Jl(i,e,t,n,r),i._hasChildren){const a=i,o=a.backwards,l=n?e:a._iterationTime,c=Fa();let u=0,d=!0;if(!n&&a._currentIteration!==s){const f=a.iterationDuration;Ot(a,h=>{if(!o)!h.completed&&!h.backwards&&h._currentTime<h.iterationDuration&&Jl(h,f,t,1,li.FORCE),h.began=!1,h.completed=!1;else{const p=h.duration,g=h._offset+h._delay,m=g+p;!t&&p<=St&&(!g||m===f)&&h.onComplete(h)}}),t||a.onLoop(a)}Ot(a,f=>{const h=It((l-f._offset)*f._speed,12);if(o&&h>f._delay+f.duration)return;const p=f._fps<a._fps?f.requestTick(c):r;u+=Jl(f,h,t,n,p),!f.completed&&d&&(d=!1)},o),!t&&u&&a.onRender(a),(d||o)&&a._currentTime>=a.duration&&(a.paused=!0,a.completed||(a.completed=!0,t||(a.onComplete(a),a._resolve(a))))}};/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Dd={},Xm=(i,e,t)=>{if(t===Ft.TRANSFORM){const n=Lm.get(i);return n||i}else if(t===Ft.CSS||t===Ft.ATTRIBUTE&&Fm(e)&&i in e.style){const n=Dd[i];if(n)return n;{const r=i&&Um(i);return Dd[i]=r,r}}else return i},Ch=(i,e=!1)=>{if(i._hasChildren)Ot(i,t=>Ch(t,e),!0);else{const t=i;t.pause(),Ot(t,n=>{const r=n.property,s=n.target,a=n._tweenType,o=n._inlineValue,l=Ma(o)||o===Ns;if(n._setter){if(!e&&!l){if(Si(o,Ni),Ni.d){const c=Ni.d,u=n._numbers;for(let d=0,f=c.length;d<f;d++)u[d]=c[d]}else n._number=Ni.n;n._setter(n.target,n._number,n)}}else if(a===Ft.OBJECT)!e&&!l&&(s[r]=o);else if(s[Na])if(a===Ft.ATTRIBUTE)e||(l?s.removeAttribute(r):s.setAttribute(r,o));else{const c=s.style;if(a===Ft.TRANSFORM){const u=s[zc];l?delete u[r]:u[r]=o,n._renderTransforms&&(Object.keys(u).length?c.transform=Vm(u):c.removeProperty("transform"))}else l?c.removeProperty(Um(r)):c[r]=o}s[Na]&&t._tail===n&&t.targets.forEach(c=>{c.getAttribute&&c.getAttribute("style")===Ns&&c.removeAttribute("style")})})}return i};/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */let qm=class{constructor(e=0){this.deltaTime=0,this._currentTime=e,this._lastTickTime=e,this._startTime=e,this._lastTime=e,this._frameDuration=Ua/sf,this._fps=sf,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(e){const t=+e,n=t<St?St:t,r=Ua/n;n>_c.frameRate&&(_c.frameRate=n),this._fps=n,this._frameDuration=r}get speed(){return this._speed}set speed(e){const t=+e;this._speed=t<St?St:t}requestTick(e){const t=this._frameDuration,n=e-this._lastTickTime,r=t*.25,s=r<4?r:4;return n+s<t?li.NONE:(this._lastTickTime=n>=t?e-n%t:e,li.AUTO)}computeDeltaTime(e){const t=e-this._lastTime;return this.deltaTime=t,this._lastTime=e,t}};/**
 * Anime.js - animation - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Ta={animation:null,update:si},W0=i=>{let e=Ta.animation;return e||(e={duration:St,computeDeltaTime:si,_offset:0,_delay:0,_head:null,_tail:null},Ta.animation=e,Ta.update=()=>{i.forEach(t=>{for(let n in t){const r=t[n],s=r._head;if(s){const a=s._valueType,o=a===ht.COMPLEX||a===ht.COLOR?wn(s._fromNumbers):null;let l=s._fromNumber,c=r._tail;for(;c&&c!==s;){if(o)for(let u=0,d=c._numbers.length;u<d;u++)o[u]+=c._numbers[u];else l+=c._number;c=c._prevAdd}s._toNumber=l,s._toNumbers=o}}}),Jl(e,1,1,0,li.FORCE)}),e};/**
 * Anime.js - engine - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Ym=Cr?requestAnimationFrame:setImmediate,X0=Cr?cancelAnimationFrame:clearImmediate;class q0 extends qm{constructor(e){super(e),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=_c,this.paused=!0,this.reqId=0}update(){const e=this._currentTime=Fa();if(this.requestTick(e)){this.computeDeltaTime(e);const t=this._speed,n=this._fps;let r=this._head;for(;r;){const s=r._next;r.paused?(Ms(this,r),this._hasChildren=!!this._tail,r._running=!1,r.completed&&!r._cancelled&&r.cancel()):vs(r,(e-r._startTime)*r._speed*t,0,0,r._fps<n?r.requestTick(e):li.AUTO),r=s}Ta.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&(this.requestTick(Fa()),this.reqId=Ym($m)),this}pause(){if(this.reqId)return this.paused=!0,Y0()}resume(){if(this.paused)return this.paused=!1,Ot(this,e=>e.resetTime()),this.wake()}get speed(){return this._speed*(nn.timeScale===1?1:Ua)}set speed(e){const t=e*nn.timeScale;this._speed!==t&&(this._speed=t,Ot(this,n=>n.speed=n._speed))}get timeUnit(){return nn.timeScale===1?"ms":"s"}set timeUnit(e){const n=e==="s",r=n?.001:1;if(nn.timeScale!==r){nn.timeScale=r,nn.tickThreshold=200*r;const s=n?.001:Ua;this.defaults.duration*=s,this._speed*=s}}get precision(){return nn.precision}set precision(e){nn.precision=e}}const gn=(()=>{const i=new q0(Fa());return Cr&&(Nm.engine=i,An.addEventListener("visibilitychange",()=>{i.pauseOnDocumentHidden&&(An.hidden?i.pause():i.resume())})),i})(),$m=()=>{gn._head?(gn.reqId=Ym($m),gn.update()):gn.reqId=0},Y0=()=>(X0(gn.reqId),gn.reqId=0,gn);/**
 * Anime.js - animation - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const gc={_rep:new WeakMap,_add:new Map},Ph=(i,e,t="_rep")=>{const n=gc[t];let r=n.get(i);return r||(r={},n.set(i,r)),r[e]?r[e]:r[e]={_head:null,_tail:null}},$0=(i,e)=>i._isOverridden||i._absoluteStartTime>e._absoluteStartTime,Ql=i=>{i._isOverlapped=1,i._isOverridden=1,i._changeDuration=St,i._currentTime=St},Km=(i,e)=>{const t=i._composition;if(t===Cn.replace){const n=i._absoluteStartTime;ys(e,i,$0,"_prevRep","_nextRep");const r=i._prevRep;if(r){const s=r.parent,a=r._absoluteEndTime;if(i.parent.id!==s.id&&s.iterationCount>1&&a+(s.duration-s.iterationDuration)>n){Ql(r);let c=r._prevRep;for(;c&&c.parent.id===s.id;)Ql(c),c=c._prevRep}const o=i._absoluteUpdateStartTime;if(a>o){const c=r._startTime,u=a-(c+r._updateDuration),d=It(o-u-c,12);r._changeDuration=d,r._currentTime=d,r._isOverlapped=1,d<St&&Ql(r)}const l=i.parent.parent;if(!l||l!==s.parent){let c=!0;if(Ot(s,u=>{u._isOverlapped||(c=!1)}),c){const u=s.parent;if(u){let d=!0;Ot(u,f=>{f!==s&&Ot(f,h=>{h._isOverlapped||(d=!1)})}),d&&u.cancel()}else s.cancel()}}}}else if(t===Cn.blend){const n=Ph(i.target,i.property,"_add"),r=W0(gc._add);let s=n._head;s||(s={...i},s._composition=Cn.replace,s._updateDuration=St,s._startTime=0,s._numbers=wn(i._fromNumbers),s._number=0,s._next=null,s._prev=null,ys(n,s),ys(r,s));const a=i._toNumber;if(i._fromNumber=s._fromNumber-a,i._toNumber=0,i._numbers=wn(i._fromNumbers),i._number=0,s._fromNumber=a,i._toNumbers.length){const o=wn(i._toNumbers);o.forEach((l,c)=>{i._fromNumbers[c]=s._fromNumbers[c]-l,i._toNumbers[c]=0}),s._fromNumbers=o}ys(n,i,null,"_prevAdd","_nextAdd")}return i},Zm=i=>{const e=i._composition;if(e!==Cn.none){const t=i.target,n=i.property,a=gc._rep.get(t)[n];if(Ms(a,i,"_prevRep","_nextRep"),e===Cn.blend){const o=gc._add,l=o.get(t);if(!l)return;const c=l[n],u=Ta.animation;Ms(c,i,"_prevAdd","_nextAdd");const d=c._head;if(d&&d===c._tail){Ms(c,d,"_prevAdd","_nextAdd"),Ms(u,d);let f=!0;for(let h in l)if(l[h]._head){f=!1;break}f&&o.delete(t)}}}return i},Ld=(i,e,t)=>{let n=!1;return Ot(e,r=>{const s=r.target;if(i.includes(s)){const a=r.property,o=r._tweenType,l=Xm(t,s,o);(!l||l&&l===a)&&(r.parent._tail===r&&r._tweenType===Ft.TRANSFORM&&r._prev&&r._prev._tweenType===Ft.TRANSFORM&&(r._prev._renderTransforms=1),Ms(e,r),Zm(r),n=!0)}},!0),n},Jm=(i,e,t)=>{const n=e||gn;let r;if(n._hasChildren){let s=0;Ot(n,a=>{if(!a._hasChildren)if(r=Ld(i,a,t),r&&!a._head)a.cancel(),Ms(n,a);else{const l=a._offset+a._delay+a.duration;l>s&&(s=l)}a._head?Jm(i,a,t):a._hasChildren=!1},!0),je(n.iterationDuration)||(n.iterationDuration=s)}else r=Ld(i,n,t);r&&!n._head&&(n._hasChildren=!1,n.cancel&&n.cancel())};/**
 * Anime.js - timer - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Id=i=>(i.paused=!0,i.began=!1,i.completed=!1,i),of=i=>(i._cancelled&&(i._hasChildren?Ot(i,of):Ot(i,e=>{e._composition!==Cn.none&&Km(e,Ph(e.target,e.property))}),i._cancelled=0),i);let Nd=0;const K0=(i,e)=>i._priority>e._priority;class Dh extends qm{constructor(e={},t=null,n=0){super(0),++Nd;const{id:r,delay:s,duration:a,reversed:o,alternate:l,loop:c,loopDelay:u,autoplay:d,frameRate:f,playbackRate:h,priority:p,onComplete:g,onLoop:m,onPause:_,onBegin:M,onBeforeUpdate:w,onUpdate:S}=e,y=t?0:gn._lastTickTime,T=t?t.defaults:nn.defaults,b=Yn(s)||je(s)?T.delay:+s,x=Yn(a)||je(a)?1/0:+a,A=Bt(c,T.loop),C=Bt(u,T.loopDelay);let D=A===!0||A===1/0||A<0?1/0:A+1,L=0;t?L=n:(gn.reqId||gn.requestTick(Fa()),L=(gn._lastTickTime-gn._startTime)*nn.timeScale),this.id=je(r)?Nd:r,this.parent=t,this.duration=kc((x+C)*D-C)||St,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=M||T.onBegin,this.onBeforeUpdate=w||T.onBeforeUpdate,this.onUpdate=S||T.onUpdate,this.onLoop=m||T.onLoop,this.onPause=_||T.onPause,this.onComplete=g||T.onComplete,this.iterationDuration=x,this.iterationCount=D,this._autoplay=t?!1:Bt(d,T.autoplay),this._offset=L,this._delay=b,this._loopDelay=C,this._iterationTime=0,this._currentIteration=0,this._resolve=si,this._running=!1,this._reversed=+Bt(o,T.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=Bt(l,T.alternate),this._prev=null,this._next=null,this._lastTickTime=y,this._startTime=y,this._lastTime=y,this._fps=Bt(f,T.frameRate),this._speed=Bt(h,T.playbackRate),this._priority=+Bt(p,1)}get cancelled(){return!!this._cancelled}set cancelled(e){e?this.cancel():this.reset(!0).play()}get currentTime(){return Fi(It(this._currentTime,nn.precision),-this._delay,this.duration)}set currentTime(e){const t=this.paused;this.pause().seek(+e),t||this.resume()}get iterationCurrentTime(){return Fi(It(this._iterationTime,nn.precision),0,this.iterationDuration)}set iterationCurrentTime(e){this.currentTime=this.iterationDuration*this._currentIteration+e}get progress(){return Fi(It(this._currentTime/this.duration,10),0,1)}set progress(e){this.currentTime=this.duration*e}get iterationProgress(){return Fi(It(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(e){const t=this.iterationDuration;this.currentTime=t*this._currentIteration+t*e}get currentIteration(){return this._currentIteration}set currentIteration(e){this.currentTime=this.iterationDuration*Fi(+e,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(e){e?this.reverse():this.play()}get speed(){return super.speed}set speed(e){super.speed=e,this.resetTime()}reset(e=!1){return of(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,vs(this,0,1,~~e,li.FORCE),Id(this),this._hasChildren&&Ot(this,Id),this}init(e=!1){this.fps=this._fps,this.speed=this._speed,!e&&this._hasChildren&&vs(this,this.duration,1,~~e,li.FORCE),this.reset(e);const t=this._autoplay;return t===!0?this.resume():t&&!je(t.linked)&&t.link(this),this}resetTime(){const e=1/(this._speed*gn._speed);return this._startTime=Fa()-(this._currentTime+this._delay)*e,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=St&&!this._hasChildren?vs(this,St,0,0,li.FORCE):(this._running||(ys(gn,this,K0),gn._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,gn.wake()),this):this}restart(){return this.reset().resume()}seek(e,t=0,n=0){of(this),this.completed=!1;const r=this.paused;return this.paused=!0,vs(this,e+this._delay,~~t,~~n,li.AUTO),r?this:this.resume()}alternate(){const e=this._reversed,t=this.iterationCount,n=this.iterationDuration,r=t===1/0?uo(rf/n):t;return this._reversed=+(this._alternate&&!(r%2)?e:!e),t===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(n*r-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Ot(this,e=>e.cancel(),!0):Ot(this,Zm),this._cancelled=1,this.pause()}stretch(e){const t=this.duration,n=ya(e);if(t===n)return this;const r=e/t,s=e<=St;return this.duration=s?St:n,this.iterationDuration=s?St:ya(this.iterationDuration*r),this._offset*=r,this._delay*=r,this._loopDelay*=r,this}revert(){vs(this,0,1,0,li.AUTO);const e=this._autoplay;return e&&e.linked&&e.linked===this&&e.revert(),this.cancel()}complete(e=0){return this.seek(this.duration,e).cancel()}then(e=si){const t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=si};return new Promise(r=>(this._resolve=()=>r(n()),this.completed&&this._resolve(),this))}}/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */function lf(i){const e=Er(i)?L0.root.querySelectorAll(i):i;if(e instanceof NodeList||e instanceof HTMLCollection)return e}function cf(i){if(Ma(i))return[];if(!Cr)return ji(i)&&i.flat(1/0)||[i];if(ji(i)){const t=i.flat(1/0),n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];if(!Ma(a)){const o=lf(a);if(o)for(let l=0,c=o.length;l<c;l++){const u=o[l];if(!Ma(u)){let d=!1;for(let f=0,h=n.length;f<h;f++)if(n[f]===u){d=!0;break}d||n.push(u)}}else{let l=!1;for(let c=0,u=n.length;c<u;c++)if(n[c]===a){l=!0;break}l||n.push(a)}}}return n}const e=lf(i);return e?Array.from(e):[i]}function Qm(i){const e=cf(i),t=e.length;for(let n=0;n<t;n++){const r=e[n];if(!r[bd]){r[bd]=!0;const s=Fm(r);(r.nodeType||s)&&(r[Na]=!0,r[Dm]=s,r[zc]={})}}return e}/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const jc={deg:1,rad:180/wh,turn:360},Ud={},Fd=(i,e,t,n=!1)=>{const r=e.u,s=e.n;if(e.t===ht.UNIT&&r===t)return e;const a=s+r+t,o=Ud[a];if(!je(o)&&!n)e.n=o;else{let l;if(r in jc)l=s*jc[r]/jc[t];else{const u=i.cloneNode(),d=i.parentNode,f=d&&d!==An?d:An.body;f.appendChild(u);const h=u.style;h.width=100+r;const p=u.offsetWidth||100;h.width=100+t;const g=u.offsetWidth||100,m=p/g;f.removeChild(u),l=m*s}e.n=l,Ud[a]=l}return e.t,ht.UNIT,e.u=t,e};/**
 * Anime.js - easings - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const ts=i=>i;/**
 * Anime.js - easings - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Ka=(i=1.68)=>e=>pa(e,+i),uf={in:i=>e=>i(e),out:i=>e=>1-i(1-e),inOut:i=>e=>e<.5?i(e*2)/2:1-i(e*-2+2)/2,outIn:i=>e=>e<.5?(1-i(1-e*2))/2:(i(e*2-1)+1)/2},Z0=wh/2,Od=wh*2,Bd={[Ns]:Ka,Quad:Ka(2),Cubic:Ka(3),Quart:Ka(4),Quint:Ka(5),Sine:i=>1-O0(i*Z0),Circ:i=>1-af(1-i*i),Expo:i=>i?pa(2,10*i-10):0,Bounce:i=>{let e,t=4;for(;i<((e=pa(2,--t))-1)/11;);return 1/pa(4,3-t)-7.5625*pa((e*3-2)/22-i,2)},Back:(i=1.7)=>e=>(+i+1)*e*e*e-+i*e*e,Elastic:(i=1,e=.3)=>{const t=Fi(+i,1,10),n=Fi(+e,St,2),r=n/Od*B0(1/t),s=Od/n;return a=>a===0||a===1?a:-t*pa(2,-10*(1-a))*F0((1-a-r)*s)}},eu=(()=>{const i={linear:ts,none:ts};for(let e in uf)for(let t in Bd){const n=Bd[t],r=uf[e];i[e+t]=t===Ns||t==="Back"||t==="Elastic"?(s,a)=>r(n(s,a)):r(n)}return i})(),il={linear:ts,none:ts},J0=i=>{if(il[i])return il[i];if(i.indexOf("(")<=-1){const t=uf[i]||i.includes("Back")||i.includes("Elastic")?eu[i]():eu[i];return t?il[i]=t:ts}else{const e=i.slice(0,-1).split("("),t=eu[e[0]];return t?il[i]=t(...e[1].split(",")):ts}},zd=["steps(","irregular(","linear(","cubicBezier("],vc=i=>{if(Er(i)){for(let t=0,n=zd.length;t<n;t++)if(xr(i,zd[t]))return console.warn(`String syntax for \`ease: "${i}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${i}\``),ts}return Yn(i)?i:Er(i)?J0(i):ts};/**
 * Anime.js - animation - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const Qe=Rh(),rt=Rh(),Ys={},rl={func:null},sl={func:null},al=[null],$s=[null,null],ol={to:null};let Q0=0,kd=0,Ur,Hi;const j0=(i,e)=>{const t={};if(ji(i)){const n=[].concat(...i.map(r=>Object.keys(r))).filter($l);for(let r=0,s=n.length;r<s;r++){const a=n[r],o=i.map(l=>{const c={};for(let u in l){const d=l[u];$l(u)?u===a&&(c.to=d):c[u]=d}return c});t[a]=o}}else{const n=Bt(e.duration,nn.defaults.duration);Object.keys(i).map(s=>({o:parseFloat(s)/100,p:i[s]})).sort((s,a)=>s.o-a.o).forEach(s=>{const a=s.o,o=s.p;for(let l in o)if($l(l)){let c=t[l];c||(c=t[l]=[]);const u=a*n;let d=c.length,f=c[d-1];const h={to:o[l]};let p=0;for(let g=0;g<d;g++)p+=c[g].duration;d===1&&(h.from=f.to),o.ease&&(h.ease=o.ease),h.duration=u-(d?p:0),c.push(h)}return s});for(let s in t){const a=t[s];let o;for(let l=0,c=a.length;l<c;l++){const u=a[l],d=u.ease;u.ease=o||void 0,o=d}a[0].duration||a.shift()}}return t};class jm extends Dh{constructor(e,t,n,r,s=!1,a=0,o){super(t,n,r),this._head,this._tail,++kd;const l=Qm(e),c=l.length,u=t.keyframes,d=u?km(j0(u,t),t):t,{id:f,delay:h,duration:p,ease:g,playbackEase:m,modifier:_,composition:M,onRender:w}=d,S=n?n.defaults:nn.defaults,y=Bt(g,S.ease),T=Bt(m,S.playbackEase),b=T?vc(T):null,x=!je(y.ease),A=x?y.ease:Bt(g,b?"linear":S.ease),C=x?y.settlingDuration:Bt(p,S.duration),D=Bt(h,S.delay),L=_||S.modifier,q=je(M)&&c>=Ua?Cn.none:je(M)?S.composition:M,X=this._offset+(n?n._offset:0);x&&(y.parent=this);let N=NaN,H=NaN,U=0,Y=0;for(let B=0;B<c;B++){const P=l[B],ne=a||B,de=o||l;let Ye=NaN,Ge=NaN;for(let Fe in d)if($l(Fe)){const G=Gm(P,Fe),oe=Hm(P,Fe),te=Xm(Fe,P,G);let fe=d[Fe];const Ce=ji(fe);if(s&&!Ce&&($s[0]=fe,$s[1]=fe,fe=$s),Ce){const be=fe.length,V=!Zr(fe[0]);be===2&&V?(ol.to=fe,al[0]=ol,Ur=al):be>2&&V?(Ur=[],fe.forEach((qe,Ke)=>{Ke?Ke===1?($s[1]=qe,Ur.push($s)):Ur.push(qe):$s[0]=qe})):Ur=fe}else al[0]=fe,Ur=al;let Me=null,Ee=null,ue=NaN,Pe=0,Oe=0;for(let be=Ur.length;Oe<be;Oe++){const V=Ur[Oe];Zr(V)?Hi=V:(ol.to=V,Hi=ol),rl.func=null,sl.func=null;const qe=or(Bt(Hi.composition,q),P,ne,de,null,null),Ke=Ii(qe)?qe:Cn[qe];!Me&&Ke!==Cn.none&&(Me=Ph(P,te));const it=Me?Me._tail:null,De=n&&it&&it.parent.parent===n?it:Ee,$e=or(Hi.to,P,ne,de,rl,De);let I;Zr($e)&&!je($e.to)?(Hi=$e,I=$e.to):I=$e;const Ze=or(Hi.from,P,ne,de,sl,De),ye=Hi.ease||A,R=or(ye,P,ne,de,null,De),v=Yn(R)||Er(R)?R:ye,O=!je(v)&&!je(v.ease),z=O?v.ease:v,J=O?v.settlingDuration:or(Bt(Hi.duration,be>1?or(C,P,ne,de,null,De)/be:C),P,ne,de,null,De),ce=or(Bt(Hi.delay,Oe?0:D),P,ne,de,null,De),le=Hi.modifier||L,Q=!je(Ze),j=!je(I),me=ji(I),Ne=me||Q&&j,xe=Ee?Pe:0,_e=Ee?Pe+ce:ce,he=It(X+_e,12),ze=It(X+xe,12);!Y&&(Q||me)&&(Y=1);let Le=Ee;if(Ke!==Cn.none){let ve=Me._head;for(;ve&&ve._absoluteStartTime<=he;)if(ve._isOverridden||(Le=ve),ve=ve._nextRep,ve&&ve._absoluteStartTime>=he)for(;ve;)Ql(ve),ve=ve._nextRep}if(Ne){Si(me?or(I[0],P,ne,de,sl,De):Ze,Qe),Si(me?or(I[1],P,ne,de,rl,De):I,rt);const ve=ma(P,te,G,Ys);Qe.t===ht.NUMBER&&(Le?Le._valueType===ht.UNIT&&(Qe.t=ht.UNIT,Qe.u=Le._unit):(Si(ve,Ni),Ni.t===ht.UNIT&&(Qe.t=ht.UNIT,Qe.u=Ni.u)))}else j?Si(I,rt):Ee?Pd(Ee,rt):Si(n&&Le&&Le.parent.parent===n?Le._value:ma(P,te,G,Ys),rt),Q?Si(Ze,Qe):Ee?Pd(Ee,Qe):Si(n&&Le&&Le.parent.parent===n?Le._value:ma(P,te,G,Ys),Qe);if(Qe.o&&(Qe.n=Zl(Le?Le._toNumber:Si(ma(P,te,G,Ys),Ni).n,Qe.n,Qe.o)),rt.o&&(rt.n=Zl(Qe.n,rt.n,rt.o)),Qe.t!==rt.t){if(Qe.t===ht.COMPLEX||rt.t===ht.COMPLEX){const ve=Qe.t===ht.COMPLEX?Qe:rt,ie=Qe.t===ht.COMPLEX?rt:Qe;ie.t=ht.COMPLEX,ie.s=wn(ve.s),ie.d=ve.d.map(()=>ie.n)}else if(Qe.t===ht.UNIT||rt.t===ht.UNIT){const ve=Qe.t===ht.UNIT?Qe:rt,ie=Qe.t===ht.UNIT?rt:Qe;ie.t=ht.UNIT,ie.u=ve.u}else if(Qe.t===ht.COLOR||rt.t===ht.COLOR){const ve=Qe.t===ht.COLOR?Qe:rt,ie=Qe.t===ht.COLOR?rt:Qe;ie.t=ht.COLOR,ie.d=ve.d.map(()=>0)}}if(Qe.u!==rt.u){let ve=rt.u?Qe:rt;ve=Fd(P,ve,rt.u?rt.u:Qe.u,!1)}if(rt.d&&Qe.d&&rt.d.length!==Qe.d.length){const ve=Qe.d.length>rt.d.length?Qe:rt,ie=ve===Qe?rt:Qe;ie.d=ve.d.map((Xe,Ue)=>je(ie.d[Ue])?0:ie.d[Ue]),ie.s=wn(ve.s)}const F=It(+J||St,12);let pe=Ys[te];Ma(pe)||(Ys[te]=null);const ee=oe?oe.set:null;Pe=It(_e+F,12);const ge=Qe.d,Se=rt.d,ae=rt.s,re={parent:this,id:Q0++,property:te,target:P,_value:null,_toFunc:rl.func,_fromFunc:sl.func,_ease:vc(z),_fromNumbers:ge?wn(ge):tl,_toNumbers:Se?wn(Se):tl,_strings:ae?wn(ae):tl,_fromNumber:Qe.n,_toNumber:rt.n,_numbers:ge?wn(ge):tl,_number:Qe.n,_unit:rt.u,_modifier:le,_currentTime:0,_startTime:_e,_delay:+ce,_updateDuration:F,_changeDuration:F,_absoluteStartTime:he,_absoluteUpdateStartTime:ze,_absoluteEndTime:It(X+Pe,12),_hasFromValue:Q||me?1:0,_tweenType:G,_setter:ee,_valueType:rt.t,_composition:Ke,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_inlineValue:pe,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};Ke!==Cn.none&&Km(re,Me);const se=re._valueType;if(se===ht.COMPLEX)re._value=Wm(re,1,-1);else if(se===ht.UNIT)re._value=`${le(re._toNumber)}${re._unit}`;else if(se===ht.COLOR){const ve=rt.d;re._value=`rgba(${It(ve[0],0)},${It(ve[1],0)},${It(ve[2],0)},${ve[3]})`}else re._value=le(re._toNumber);isNaN(ue)&&(ue=re._startTime),Ee=re,U++,ys(this,re)}(isNaN(H)||ue<H)&&(H=ue),(isNaN(N)||Pe>N)&&(N=Pe),G===Ft.TRANSFORM&&(Ye=U-Oe,Ge=U)}if(!isNaN(Ye)){let Fe=0;Ot(this,G=>{Fe>=Ye&&Fe<Ge&&(G._renderTransforms=1,G._composition===Cn.blend&&Ot(Ta.animation,oe=>{oe.id===G.id&&(oe._renderTransforms=1)})),Fe++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),H?(Ot(this,B=>{B._startTime-B._delay||(B._delay-=H),B._startTime-=H}),N-=H):H=0,N||(N=St,this.iterationCount=0),this.targets=l,this.id=je(f)?kd:f,this.duration=N===St?St:kc((N+this._loopDelay)*this.iterationCount-this._loopDelay)||St,this.onRender=w||S.onRender,this._ease=b,this._delay=H,this.iterationDuration=N,!this._autoplay&&Y&&this.onRender(this)}stretch(e){const t=this.duration;if(t===ya(e))return this;const n=e/t;return Ot(this,r=>{r._updateDuration=ya(r._updateDuration*n),r._changeDuration=ya(r._changeDuration*n),r._currentTime*=n,r._delay*=n,r._startTime*=n,r._absoluteStartTime*=n,r._absoluteUpdateStartTime*=n,r._absoluteEndTime*=n}),super.stretch(e)}refresh(){return Ot(this,e=>{const t=e._toFunc,n=e._fromFunc;(t||n)&&(n?(Si(n(),Qe),Qe.u!==e._unit&&e.target[Na]&&Fd(e.target,Qe,e._unit,!0),e._fromNumbers=wn(Qe.d),e._fromNumber=Qe.n):t&&(Si(ma(e.target,e.property,e._tweenType),Ni),e._fromNumbers=wn(Ni.d),e._fromNumber=Ni.n),t&&(Si(t(),rt),e._toNumbers=wn(rt.d),e._strings=wn(rt.s),e._toNumber=rt.o?Zl(e._fromNumber,rt.n,rt.o):rt.n))}),this.duration===St&&this.restart(),this}revert(){return super.revert(),Ch(this)}then(e){return super.then(e)}}const xc=(i,e)=>new jm(i,e,null,0,!1).init();/**
 * Anime.js - timeline - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const ev=(i,e)=>{if(xr(e,"<")){const t=e[1]==="<",n=i._tail,r=n?n._offset+n._delay:0;return t?r:r+n.duration}},fo=(i,e)=>{let t=i.iterationDuration;if(t===St&&(t=0),je(e))return t;if(Ii(+e))return+e;const n=e,r=i?i.labels:null,s=!Ma(r),a=ev(i,n),o=!je(a),l=P0.exec(n);if(l){const c=l[0],u=n.split(c),d=s&&u[0]?r[u[0]]:t,f=o?a:s?d:t,h=+u[1];return Zl(f,h,c[0])}else return o?a:s?je(r[n])?t:r[n]:t};/**
 * Anime.js - timeline - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */function tv(i){return kc((i.iterationDuration+i._loopDelay)*i.iterationCount-i._loopDelay)||St}function tu(i,e,t,n,r,s){const o=Ii(i.duration)&&i.duration<=St?t-St:t;e.composition&&vs(e,o,1,1,li.AUTO);const l=n?new jm(n,i,e,o,!1,r,s):new Dh(i,e,o);return e.composition&&l.init(!0),ys(e,l),Ot(e,c=>{const d=c._offset+c._delay+c.duration;d>e.iterationDuration&&(e.iterationDuration=d)}),e.duration=tv(e),e}let Vd=0,nv=class extends Dh{constructor(e={}){super(e,null,0),++Vd,this.id=je(e.id)?Vd:e.id,this.duration=0,this.labels={};const t=e.defaults,n=nn.defaults;this.defaults=t?km(t,n):n,this.composition=Bt(e.composition,!0),this.onRender=e.onRender||n.onRender;const r=Bt(e.playbackEase,n.playbackEase);this._ease=r?vc(r):null,this.iterationDuration=0}add(e,t,n){const r=Zr(t),s=Zr(e);if(r||s){if(this._hasChildren=!0,r){const a=t,o=n&&n.type==="Stagger"&&nn.editor,l=Yn(n)?n:null;if(l||o){const c=cf(e),u=this.duration,d=this.iterationDuration,f=a.id;let h=0;c.length;const p=l||nn.editor.resolveStagger(n.defaultValue);c.forEach(g=>{const m={...a};this.duration=u,this.iterationDuration=d,je(f)||(m.id=f+"-"+h);const _=fo(this,p(g,h,c,null,this));tu(m,this,_,g,h,c),h++})}else{const c=a,u=n&&n.type?n.defaultValue:n;tu(c,this,fo(this,u),e)}}else tu(e,this,fo(this,t));return this.composition&&this.init(!0),this}}sync(e,t){if(je(e)||e&&je(e.pause))return this;e.pause();const n=+(e.effect?e.effect.getTiming().duration:e.duration);return!je(e)&&!je(e.persist)&&(e.persist=!0),this.add(e,{currentTime:[0,n],duration:n,delay:0,ease:"linear",playbackEase:"linear"},t)}set(e,t,n){return je(t)?this:(t.duration=St,t.composition=Cn.replace,this.add(e,t,n))}call(e,t){return je(e)||e&&!Yn(e)?this:this.add({duration:0,delay:0,onComplete:()=>e(this)},t)}label(e,t){return je(e)||e&&!Er(e)?this:(this.labels[e]=fo(this,t),this)}remove(e,t){return Jm(cf(e),this,t),this}stretch(e){const t=this.duration;if(t===ya(e))return this;const n=e/t,r=this.labels;Ot(this,s=>s.stretch(s.duration*n));for(let s in r)r[s]*=n;return super.stretch(e)}refresh(){return Ot(this,e=>{e.refresh&&e.refresh()}),this}revert(){return super.revert(),Ot(this,e=>e.revert,!0),Ch(this)}then(e){return super.then(e)}};const iv=i=>new nv(i).init();/**
 * Anime.js - utils - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const rv=i=>{let e;return(...t)=>{let n,r,s,a,o;e&&(n=e.currentIteration,r=e.iterationProgress,s=e.reversed,a=e._alternate,o=e._startTime,e.revert());const l=i(...t);return l&&!Yn(l)&&l.revert&&(e=l),je(r)||(e.currentIteration=n,e.iterationProgress=(a&&n%2?!s:s)?1-r:r,e._startTime=o),l||si}};/**
 * Anime.js - utils - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const e_=(i=0,e=1,t=0)=>{const n=10**t;return Math.floor((Math.random()*(e-i+1/n)+i)*n)/n};let sv=0;const av=(i,e=0,t=1,n=0)=>{let r=i===void 0?sv++:i;return(s=e,a=t,o=n)=>{r+=1831565813,r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61);const l=10**o;return Math.floor((((r^r>>>14)>>>0)/4294967296*(a-s+1/l)+s)*l)/l}},ov=(i,e=e_)=>{let t=i.length,n,r;for(;t;)r=e(0,--t),n=i[t],i[t]=i[r],i[r]=n;return i};/**
 * Anime.js - utils - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const ho=(i,e={})=>{let t=[],n=0,r,s=null;const a=e.from,o=e.reversed,l=e.ease,c=!je(l),d=c&&!je(l.ease)?l.ease:c?vc(l):null,f=e.grid,h=f===!0,p=e.axis,g=e.total,m=je(a)||a===0||a==="first",_=a==="center",M=a==="last",w=a==="random",S=ji(a),y=ji(i),T=e.use,b=Zc(y?i[0]:i),x=y?Zc(i[1]):0,A=Im.exec((y?i[1]:i)+Ns),C=e.start||0+(y?b:0),D=e.seed,q=!je(D)&&D!==!1?av(D===!0?0:D):e_,X=e.jitter,N=!je(X),H=ji(X),U=H?X[0]:X||0,Y=H?X[1]:X||0;let B=m?0:Ii(a)?a:0;return(P,ne,de,Ye,Ge)=>{const[Fe]=Qm(P),G=je(g)?de.length:g,oe=je(T)?!1:Yn(T)?T(Fe,ne,G):ma(Fe,T),te=Ii(oe)||Er(oe)&&Ii(+oe)?+oe:ne,fe=te>=0&&te<G?te:ne;if(_&&(B=(G-1)/2),M&&(B=G-1),!t.length){if(h){let Ee=!0,ue=!1,Pe=1/0,Oe=1/0,be=1/0,V=-1/0,qe=-1/0,Ke=-1/0;const it=[],De=[],$e=[];for(let I=0;I<G;I++){const Ze=de[I];let ye=0,R=0,v=0,O=!1;if(Ze&&Yn(Ze.getBoundingClientRect)){const z=Ze.getBoundingClientRect();ye=z.left+z.width/2,R=z.top+z.height/2,O=!0}else{const z=Ze;z&&Ii(z.x)&&Ii(z.y)&&(ye=z.x,R=z.y,Ii(z.z)&&(v=z.z,ue=!0),O=!0)}if(!O){Ee=!1;break}it.push(ye),De.push(R),$e.push(v),ye<Pe&&(Pe=ye),R<Oe&&(Oe=R),v<be&&(be=v),ye>V&&(V=ye),R>qe&&(qe=R),v>Ke&&(Ke=v)}if(Ee){let I=it[0],Ze=De[0],ye=$e[0];S?(I=Pe+a[0]*(V-Pe),Ze=Oe+a[1]*(qe-Oe),ye=ue?be+(a.length>=3?a[2]:.5)*(Ke-be):0):_?(I=(Pe+V)/2,Ze=(Oe+qe)/2,ye=(be+Ke)/2):M?(I=it[G-1],Ze=De[G-1],ye=$e[G-1]):Ii(a)&&(I=it[a],Ze=De[a],ye=$e[a]);for(let v=0;v<G;v++){const O=I-it[v],z=Ze-De[v],J=ye-$e[v];let ce=af(O*O+z*z+(ue?J*J:0));p==="x"&&(ce=-O),p==="y"&&(ce=-z),p==="z"&&(ce=-J),t.push(ce)}let R=1/0;for(let v=0;v<G;v++){const O=nl(t[v]);O>0&&O<R&&(R=O)}if(R>0&&R<1/0)for(let v=0;v<G;v++)t[v]=t[v]/R}else for(let I=0;I<G;I++)t.push(nl(B-I))}else for(let Ee=0;Ee<G;Ee++)if(!f)t.push(nl(B-Ee));else{const ue=f.length,Pe=f[0]*f[1];let Oe,be,V;S?(Oe=a[0]*(f[0]-1),be=a[1]*(f[1]-1),V=ue===3?(a.length>=3?a[2]:.5)*(f[2]-1):0):_?(Oe=(f[0]-1)/2,be=(f[1]-1)/2,V=ue===3?(f[2]-1)/2:0):(Oe=B%f[0],be=uo(B/f[0])%f[1],V=ue===3?uo(B/Pe):0);const qe=Ee%f[0],Ke=uo(Ee/f[0])%f[1],it=ue===3?uo(Ee/Pe):0,De=Oe-qe,$e=be-Ke,I=V-it;let Ze=af(De*De+$e*$e+(ue===3?I*I:0));p==="x"&&(Ze=-De),p==="y"&&(Ze=-$e),p==="z"&&(Ze=-I),t.push(Ze)}n=t[0];for(let Ee=1;Ee<G;Ee++)t[Ee]>n&&(n=t[Ee]);if(d||o)for(let Ee=0;Ee<G;Ee++){let ue=t[Ee];d&&(ue=d(ue/n)*n),o&&(ue=p?-ue:nl(n-ue)),t[Ee]=ue}if(N){s=new Array(G);for(let Ee=0;Ee<G;Ee++)s[Ee]=q(-1,1,4)}w&&(t=ov(t,q))}const Ce=y?(x-b)/n:b;je(r)&&(r=Ge?fo(Ge,je(e.start)?Ge.iterationDuration:C):C);let Me=r+(Ce*It(t[fe],2)||0);if(N){const Ee=n?t[fe]/n:0,ue=U+(Y-U)*Ee;Me=Me+s[fe]*ue}return e.modifier&&(Me=e.modifier(Me)),A&&(Me=`${Me}${A[2]}`),Me}};/**
 * Anime.js - text - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */const ll=typeof Intl<"u"&&Intl.Segmenter,lv=/\{value\}/g,cv=/\{i\}/g,nu=/(\s+)/,ff=/^\s+$/,hf="line",Za="word",po="char",Eo="data-line";let iu=null,ru=null,Sc=null;const Hd=i=>i.isWordLike||i.segment===" "||Ii(+i.segment),su=i=>i.setAttribute("aria-hidden","true"),cl=(i,e)=>[...i.querySelectorAll(`[data-${e}]:not([data-${e}] [data-${e}])`)],uv={line:"#00D672",word:"#FF4B4B",char:"#5A87FF"},t_=i=>{if(!i.childElementCount&&!i.textContent.trim()){const e=i.parentElement;i.remove(),e&&t_(e)}},n_=(i,e,t)=>{const n=i.getAttribute(Eo);if(n!==null&&+n!==e||i.tagName==="BR"){t.add(i);const s=i.previousSibling,a=i.nextSibling;s&&s.nodeType===3&&ff.test(s.textContent)&&t.add(s),a&&a.nodeType===3&&ff.test(a.textContent)&&t.add(a)}let r=i.childElementCount;for(;r--;)n_(i.children[r],e,t);return t},au=(i,e={})=>{let t="";e||(e={});const n=Er(e.class)?` class="${e.class}"`:"",r=Bt(e.clone,!1),s=Bt(e.wrap,!1),a=s?s===!0?"clip":s:r?"clip":!1;if(s&&(t+=`<span${a?` style="overflow:${a};"`:""}>`),t+=`<span${n}${r?' style="position:relative;"':""} data-${i}="{i}">`,r){const o=r==="left"?"-100%":r==="right"?"100%":"0",l=r==="top"?"-100%":r==="bottom"?"100%":"0";t+="<span>{value}</span>",t+=`<span inert style="position:absolute;top:${l};left:${o};white-space:nowrap;">{value}</span>`}else t+="{value}";return t+="</span>",s&&(t+="</span>"),t},ou=(i,e,t,n,r,s,a,o,l)=>{const c=r===hf,u=r===po,d=`_${r}_`,f=Yn(i)?i(t):i,h=c?"block":"inline-block";Sc.innerHTML=f.replace(lv,`<i class="${d}"></i>`).replace(cv,`${u?l:c?a:o}`);const p=Sc.content,g=p.firstElementChild,m=p.querySelector(`[data-${r}]`)||g,_=p.querySelectorAll(`i.${d}`),M=_.length;if(M){g.style.display=h,m.style.display=h,m.setAttribute(Eo,`${a}`),c||(m.setAttribute("data-word",`${o}`),u&&m.setAttribute("data-char",`${l}`));let w=M;for(;w--;){const S=_[w],y=S.parentElement;y.style.display=h,c?y.innerHTML=t.innerHTML:y.replaceChild(t.cloneNode(!0),S)}e.push(m),n.appendChild(p)}else console.warn('The expression "{value}" is missing from the provided template.');return s&&(g.style.outline=`1px dotted ${uv[r]}`),g};class fv{constructor(e,t={}){iu||(iu=ll?new ll([],{granularity:Za}):{segment:p=>{const g=[],m=p.split(nu);for(let _=0,M=m.length;_<M;_++){const w=m[_];g.push({segment:w,isWordLike:!ff.test(w)})}return g}}),ru||(ru=ll?new ll([],{granularity:"grapheme"}):{segment:p=>[...p].map(g=>({segment:g}))}),!Sc&&Cr&&(Sc=An.createElement("template"));const{words:n,chars:r,lines:s,accessible:a,includeSpaces:o,debug:l}=t,c=(e=ji(e)?e[0]:e)&&e.nodeType?e:(lf(e)||[])[0],u=s===!0?{}:s,d=n===!0||je(n)?{}:n,f=r===!0?{}:r;this.debug=Bt(l,!1),this.includeSpaces=Bt(o,!1),this.accessible=Bt(a,!0),this.linesOnly=u&&!d&&!f,this.lineTemplate=Zr(u)?au(hf,u):u,this.wordTemplate=Zr(d)||this.linesOnly?au(Za,d):d,this.charTemplate=Zr(f)?au(po,f):f,this.$target=c,this.html=c&&c.innerHTML,this.lines=[],this.words=[],this.chars=[],this.effects=[],this.effectsCleanups=[],this.cache=null,this.ready=!1,this.width=0,this.resizeTimeout=null;const h=()=>this.html&&(u||d||f)&&this.split();this.resizeObserver=new ResizeObserver(()=>{clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{const p=c.offsetWidth;p!==this.width&&(this.width=p,h())},150)}),this.lineTemplate&&!this.ready?An.fonts.ready.then(h):h(),c?this.resizeObserver.observe(c):console.warn("No Text Splitter target found.")}addEffect(e){if(!Yn(e))return console.warn("Effect must return a function."),this;const t=rv(e);return this.effects.push(t),this.ready&&(this.effectsCleanups[this.effects.length-1]=t(this)),this}revert(){return clearTimeout(this.resizeTimeout),this.lines.length=this.words.length=this.chars.length=0,this.resizeObserver.disconnect(),this.effectsCleanups.forEach(e=>Yn(e)?e(this):e.revert&&e.revert()),this.$target.innerHTML=this.html,this}splitNode(e){const t=this.wordTemplate,n=this.charTemplate,r=this.includeSpaces,s=this.debug,a=e.nodeType;if(a===3){const o=e.nodeValue;if(o.trim()){const l=[],c=this.words,u=this.chars,d=iu.segment(o),f=An.createDocumentFragment();let h=null;for(const p of d){const g=p.segment,m=Hd(p);if(!h||m&&h&&Hd(h))l.push(g);else{const _=l.length-1,M=l[_];!nu.test(M)&&!nu.test(g)?l[_]+=g:l.push(g)}h=p}for(let p=0,g=l.length;p<g;p++){const m=l[p];if(m.trim()){const _=l[p+1],M=r&&_&&!_.trim(),w=m,S=n?ru.segment(w):null,y=n?An.createDocumentFragment():An.createTextNode(M?m+" ":m);if(n){const T=[...S];for(let b=0,x=T.length;b<x;b++){const A=T[b],D=b===x-1&&M?A.segment+" ":A.segment,L=An.createTextNode(D);ou(n,u,L,y,po,s,-1,c.length,u.length)}}t?ou(t,c,y,f,Za,s,-1,c.length,u.length):n?f.appendChild(y):f.appendChild(An.createTextNode(m)),M&&p++}else{if(p&&r)continue;f.appendChild(An.createTextNode(m))}}e.parentNode.replaceChild(f,e)}}else if(a===1){const o=[...e.childNodes];for(let l=0,c=o.length;l<c;l++)this.splitNode(o[l])}}split(e=!1){const t=this.$target,n=!!this.cache&&!e,r=this.lineTemplate,s=this.wordTemplate,a=this.charTemplate,o=An.fonts.status!=="loading",l=r&&o;this.ready=!r||o,(l||e)&&this.effectsCleanups.forEach(f=>Yn(f)&&f(this)),n||(e&&(t.innerHTML=this.html,this.words.length=this.chars.length=0),this.splitNode(t),this.cache=t.innerHTML),l&&(n&&(t.innerHTML=this.cache),this.lines.length=0,s&&(this.words=cl(t,Za))),a&&(l||s)&&(this.chars=cl(t,po));const c=this.words.length?this.words:this.chars;let u,d=0;for(let f=0,h=c.length;f<h;f++){const p=c[f],{top:g,height:m}=p.getBoundingClientRect();!je(u)&&g-u>m*.5&&d++,p.setAttribute(Eo,`${d}`);const _=p.querySelectorAll(`[${Eo}]`);let M=_.length;for(;M--;)_[M].setAttribute(Eo,`${d}`);u=g}if(l){const f=An.createDocumentFragment(),h=new Set,p=[];for(let g=0;g<d+1;g++){const m=t.cloneNode(!0);n_(m,g,new Set).forEach(_=>{const M=_.parentNode;M&&(_.nodeType===1&&h.add(M),M.removeChild(_))}),p.push(m)}h.forEach(t_);for(let g=0,m=p.length;g<m;g++)ou(r,this.lines,p[g],f,hf,this.debug,g);t.innerHTML="",t.appendChild(f),s&&(this.words=cl(t,Za)),a&&(this.chars=cl(t,po))}if(this.linesOnly){const f=this.words;let h=f.length;for(;h--;){const p=f[h];p.replaceWith(p.textContent)}f.length=0}if(this.accessible&&(l||!n)){const f=An.createElement("span");f.style.cssText="position:absolute;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;white-space:nowrap;",f.innerHTML=this.html,t.insertBefore(f,t.firstChild),this.lines.forEach(su),this.words.forEach(su),this.chars.forEach(su)}return this.width=t.offsetWidth,(l||e)&&this.effects.forEach((f,h)=>this.effectsCleanups[h]=f(this)),this}refresh(){this.split(!0)}}const i_=(i,e)=>new fv(i,e);function dr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function r_(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Oo={duration:.5,overwrite:!1,delay:0},Lh,Sn,zt,Ai=1e8,Pt=1/Ai,df=Math.PI*2,hv=df/4,dv=0,s_=Math.sqrt,pv=Math.cos,mv=Math.sin,_n=function(e){return typeof e=="string"},qt=function(e){return typeof e=="function"},br=function(e){return typeof e=="number"},Ih=function(e){return typeof e>"u"},rr=function(e){return typeof e=="object"},$n=function(e){return e!==!1},Nh=function(){return typeof window<"u"},ul=function(e){return qt(e)||_n(e)},a_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},In=Array.isArray,_v=/random\([^)]+\)/g,gv=/,\s*/g,Gd=/(?:-?\.?\d|\.)+/gi,o_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,va=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,lu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,l_=/[+-]=-?[.\d]+/,vv=/[^,'"\[\]\s]+/gi,xv=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Vt,Xi,pf,Uh,mi={},Mc={},c_,u_=function(e){return(Mc=Oa(e,mi))&&jn},Fh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Bo=function(e,t){return!t&&console.warn(e)},f_=function(e,t){return e&&(mi[e]=t)&&Mc&&(Mc[e]=t)||mi},zo=function(){return 0},Sv={suppressEvents:!0,isStart:!0,kill:!1},jl={suppressEvents:!0,kill:!1},Mv={suppressEvents:!0},Oh={},Jr=[],mf={},h_,ai={},cu={},Wd=30,ec=[],Bh="",zh=function(e){var t=e[0],n,r;if(rr(t)||qt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(r=ec.length;r--&&!ec[r].targetTest(t););n=ec[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new N_(e[r],n)))||e.splice(r,1);return e},ws=function(e){return e._gsap||zh(wi(e))[0]._gsap},d_=function(e,t,n){return(n=e[t])&&qt(n)?e[t]():Ih(n)&&e.getAttribute&&e.getAttribute(t)||n},Kn=function(e,t){return(e=e.split(",")).forEach(t)||e},Zt=function(e){return Math.round(e*1e5)/1e5||0},kt=function(e){return Math.round(e*1e7)/1e7||0},Ea=function(e,t){var n=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+r:n==="-"?e-r:n==="*"?e*r:e/r},yv=function(e,t){for(var n=t.length,r=0;e.indexOf(t[r])<0&&++r<n;);return r<n},yc=function(){var e=Jr.length,t=Jr.slice(0),n,r;for(mf={},Jr.length=0,n=0;n<e;n++)r=t[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},kh=function(e){return!!(e._initted||e._startAt||e.add)},p_=function(e,t,n,r){Jr.length&&!Sn&&yc(),e.render(t,n,!!(Sn&&t<0&&kh(e))),Jr.length&&!Sn&&yc()},m_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(vv).length<2?t:_n(e)?e.trim():e},__=function(e){return e},_i=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Tv=function(e){return function(t,n){for(var r in n)r in t||r==="duration"&&e||r==="ease"||(t[r]=n[r])}},Oa=function(e,t){for(var n in t)e[n]=t[n];return e},Xd=function i(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=rr(t[n])?i(e[n]||(e[n]={}),t[n]):t[n]);return e},Tc=function(e,t){var n={},r;for(r in e)r in t||(n[r]=e[r]);return n},bo=function(e){var t=e.parent||Vt,n=e.keyframes?Tv(In(e.keyframes)):_i;if($n(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},Ev=function(e,t){for(var n=e.length,r=n===t.length;r&&n--&&e[n]===t[n];);return n<0},g_=function(e,t,n,r,s){var a=e[r],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[r]=t,t._prev=a,t.parent=t._dp=e,t},Vc=function(e,t,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},ns=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Rs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},bv=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},_f=function(e,t,n,r){return e._startAt&&(Sn?e._startAt.revert(jl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},Av=function i(e){return!e||e._ts&&i(e.parent)},qd=function(e){return e._repeat?Ba(e._tTime,e=e.duration()+e._rDelay)*e:0},Ba=function(e,t){var n=Math.floor(e=kt(e/t));return e&&n===e?n-1:n},Ec=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Hc=function(e){return e._end=kt(e._start+(e._tDur/Math.abs(e._ts||e._rts||Pt)||0))},Gc=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=kt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Hc(e),n._dirty||Rs(n,e)),e},v_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Ec(e.rawTime(),t),(!t._dur||Ko(0,t.totalDuration(),n)-t._tTime>Pt)&&t.render(n,!0)),Rs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Pt}},$i=function(e,t,n,r){return t.parent&&ns(t),t._start=kt((br(n)?n:n||e!==Vt?Mi(e,n,t):e._time)+t._delay),t._end=kt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),g_(e,t,"_first","_last",e._sort?"_start":0),gf(t)||(e._recent=t),r||v_(e,t),e._ts<0&&Gc(e,e._tTime),e},x_=function(e,t){return(mi.ScrollTrigger||Fh("scrollTrigger",t))&&mi.ScrollTrigger.create(t,e)},S_=function(e,t,n,r,s){if(Hh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Sn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&h_!==ci.frame)return Jr.push(e),e._lazy=[s,r],1},wv=function i(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||i(t))},gf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Rv=function(e,t,n,r){var s=e.ratio,a=t<0||!t&&(!e._start&&wv(e)&&!(!e._initted&&gf(e))||(e._ts<0||e._dp._ts<0)&&!gf(e))?0:1,o=e._rDelay,l=0,c,u,d;if(o&&e._repeat&&(l=Ko(0,e._tDur,t),u=Ba(l,o),e._yoyo&&u&1&&(a=1-a),u!==Ba(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||Sn||r||e._zTime===Pt||!t&&e._zTime){if(!e._initted&&S_(e,t,r,n,l))return;for(d=e._zTime,e._zTime=t||(n?Pt:0),n||(n=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&_f(e,t,n,!0),e._onUpdate&&!n&&fi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&fi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&ns(e,1),!n&&!Sn&&(fi(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},Cv=function(e,t,n){var r;if(n>t)for(r=e._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},za=function(e,t,n,r){var s=e._repeat,a=kt(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:kt(a*(s+1)+e._rDelay*s):a,o>0&&!r&&Gc(e,e._tTime=e._tDur*o),e.parent&&Hc(e),n||Rs(e.parent,e),e},Yd=function(e){return e instanceof qn?Rs(e):za(e,e._dur)},Pv={_start:0,endTime:zo,totalDuration:zo},Mi=function i(e,t,n){var r=e.labels,s=e._recent||Pv,a=e.duration()>=Ai?s.endTime(!1):e._dur,o,l,c;return _n(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in r||(r[t]=a),r[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(In(n)?n[0]:n).totalDuration()),o>1?i(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Ao=function(e,t,n){var r=br(t[1]),s=(r?2:1)+(e<2?0:1),a=t[s],o,l;if(r&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;a.immediateRender=$n(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new rn(t[0],a,t[s+1])},os=function(e,t){return e||e===0?t(e):t},Ko=function(e,t,n){return n<e?e:n>t?t:n},Pn=function(e,t){return!_n(e)||!(t=xv.exec(e))?"":t[1]},Dv=function(e,t,n){return os(n,function(r){return Ko(e,t,r)})},vf=[].slice,M_=function(e,t){return e&&rr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&rr(e[0]))&&!e.nodeType&&e!==Xi},Lv=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(r){var s;return _n(r)&&!t||M_(r,1)?(s=n).push.apply(s,wi(r)):n.push(r)})||n},wi=function(e,t,n){return zt&&!t&&zt.selector?zt.selector(e):_n(e)&&!n&&(pf||!ka())?vf.call((t||Uh).querySelectorAll(e),0):In(e)?Lv(e,n):M_(e)?vf.call(e,0):e?[e]:[]},xf=function(e){return e=wi(e)[0]||Bo("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return wi(t,n.querySelectorAll?n:n===e?Bo("Invalid scope")||Uh.createElement("div"):e)}},y_=function(e){return e.sort(function(){return .5-Math.random()})},T_=function(e){if(qt(e))return e;var t=rr(e)?e:{each:e},n=Cs(t.ease),r=t.from||0,s=parseFloat(t.base)||0,a={},o=r>0&&r<1,l=isNaN(r)||o,c=t.axis,u=r,d=r;return _n(r)?u=d={center:.5,edges:.5,end:1}[r]||0:!o&&l&&(u=r[0],d=r[1]),function(f,h,p){var g=(p||t).length,m=a[g],_,M,w,S,y,T,b,x,A;if(!m){if(A=t.grid==="auto"?0:(t.grid||[1,Ai])[1],!A){for(b=-Ai;b<(b=p[A++].getBoundingClientRect().left)&&A<g;);A<g&&A--}for(m=a[g]=[],_=l?Math.min(A,g)*u-.5:r%A,M=A===Ai?0:l?g*d/A-.5:r/A|0,b=0,x=Ai,T=0;T<g;T++)w=T%A-_,S=M-(T/A|0),m[T]=y=c?Math.abs(c==="y"?S:w):s_(w*w+S*S),y>b&&(b=y),y<x&&(x=y);r==="random"&&y_(m),m.max=b-x,m.min=x,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(A>g?g-1:c?c==="y"?g/A:A:Math.max(A,g/A))||0)*(r==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Pn(t.amount||t.each)||0,n=n&&g<0?Xv(n):n}return g=(m[f]-m.min)/m.max||0,kt(m.b+(n?n(g):g)*m.v)+m.u}},Sf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var r=kt(Math.round(parseFloat(n)/e)*e*t);return(r-r%1)/t+(br(n)?0:Pn(n))}},E_=function(e,t){var n=In(e),r,s;return!n&&rr(e)&&(r=n=e.radius||Ai,e.values?(e=wi(e.values),(s=!br(e[0]))&&(r*=r)):e=Sf(e.increment)),os(t,n?qt(e)?function(a){return s=e(a),Math.abs(s-a)<=r?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=Ai,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-o,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-o),f<c&&(c=f,u=d);return u=!r||c<=r?e[u]:a,s||u===a||br(a)?u:u+Pn(a)}:Sf(e))},b_=function(e,t,n,r){return os(In(e)?!t:n===!0?!!(n=0):!r,function(){return In(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*r)/r})},Iv=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(r){return t.reduce(function(s,a){return a(s)},r)}},Nv=function(e,t){return function(n){return e(parseFloat(n))+(t||Pn(n))}},Uv=function(e,t,n){return w_(e,t,0,1,n)},A_=function(e,t,n){return os(n,function(r){return e[~~t(r)]})},Fv=function i(e,t,n){var r=t-e;return In(e)?A_(e,i(0,e.length),t):os(n,function(s){return(r+(s-e)%r)%r+e})},Ov=function i(e,t,n){var r=t-e,s=r*2;return In(e)?A_(e,i(0,e.length-1),t):os(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>r?s-a:a)})},ko=function(e){return e.replace(_v,function(t){var n=t.indexOf("[")+1,r=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(gv);return b_(n?r:+r[0],n?0:+r[1],+r[2]||1e-5)})},w_=function(e,t,n,r,s){var a=t-e,o=r-n;return os(s,function(l){return n+((l-e)/a*o||0)})},Bv=function i(e,t,n,r){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var a=_n(e),o={},l,c,u,d,f;if(n===!0&&(r=1)&&(n=null),a)e={p:e},t={p:t};else if(In(e)&&!In(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(i(e[c-1],e[c]));d--,s=function(p){p*=d;var g=Math.min(f,~~p);return u[g](p-g)},n=t}else r||(e=Oa(In(e)?[]:{},e));if(!u){for(l in t)Vh.call(o,e,l,"get",t[l]);s=function(p){return Xh(p,o)||(a?e.p:e)}}}return os(n,s)},$d=function(e,t,n){var r=e.labels,s=Ai,a,o,l;for(a in r)o=r[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},fi=function(e,t,n){var r=e.vars,s=r[t],a=zt,o=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,n&&Jr.length&&yc(),o&&(zt=o),u=l?s.apply(c,l):s.call(c),zt=a,u},mo=function(e){return ns(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Sn),e.progress()<1&&fi(e,"onInterrupt"),e},xa,R_=[],C_=function(e){if(e)if(e=!e.name&&e.default||e,Nh()||e.headless){var t=e.name,n=qt(e),r=t&&!n&&e.init?function(){this._props=[]}:e,s={init:zo,render:Xh,add:Vh,kill:tx,modifier:ex,rawVars:0},a={targetTest:0,get:0,getSetter:Wh,aliases:{},register:0};if(ka(),e!==r){if(ai[t])return;_i(r,_i(Tc(e,s),a)),Oa(r.prototype,Oa(s,Tc(e,a))),ai[r.prop=t]=r,e.targetTest&&(ec.push(r),Oh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}f_(t,r),e.register&&e.register(jn,r,Zn)}else R_.push(e)},Ct=255,_o={aqua:[0,Ct,Ct],lime:[0,Ct,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ct],navy:[0,0,128],white:[Ct,Ct,Ct],olive:[128,128,0],yellow:[Ct,Ct,0],orange:[Ct,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ct,0,0],pink:[Ct,192,203],cyan:[0,Ct,Ct],transparent:[Ct,Ct,Ct,0]},uu=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ct+.5|0},P_=function(e,t,n){var r=e?br(e)?[e>>16,e>>8&Ct,e&Ct]:0:_o.black,s,a,o,l,c,u,d,f,h,p;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),_o[e])r=_o[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Ct,r&Ct,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Ct,e&Ct]}else if(e.substr(0,3)==="hsl"){if(r=p=e.match(Gd),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,a=u<=.5?u*(c+1):u+c-u*c,s=u*2-a,r.length>3&&(r[3]*=1),r[0]=uu(l+1/3,s,a),r[1]=uu(l,s,a),r[2]=uu(l-1/3,s,a);else if(~e.indexOf("="))return r=e.match(o_),n&&r.length<4&&(r[3]=1),r}else r=e.match(Gd)||_o.transparent;r=r.map(Number)}return t&&!p&&(s=r[0]/Ct,a=r[1]/Ct,o=r[2]/Ct,d=Math.max(s,a,o),f=Math.min(s,a,o),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(a-o)/h+(a<o?6:0):d===a?(o-s)/h+2:(s-a)/h+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},D_=function(e){var t=[],n=[],r=-1;return e.split(Qr).forEach(function(s){var a=s.match(va)||[];t.push.apply(t,a),n.push(r+=a.length+1)}),t.c=n,t},Kd=function(e,t,n){var r="",s=(e+r).match(Qr),a=t?"hsla(":"rgba(",o=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=P_(f,t,1))&&a+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=D_(e),l=n.c,l.join(r)!==u.c.join(r)))for(c=e.replace(Qr,"1").split(va),d=c.length-1;o<d;o++)r+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Qr),d=c.length-1;o<d;o++)r+=c[o]+s[o];return r+c[d]},Qr=function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in _o)i+="|"+e+"\\b";return new RegExp(i+")","gi")}(),zv=/hsl[a]?\(/,L_=function(e){var t=e.join(" "),n;if(Qr.lastIndex=0,Qr.test(t))return n=zv.test(t),e[1]=Kd(e[1],n),e[0]=Kd(e[0],n,D_(e[1])),!0},Vo,ci=function(){var i=Date.now,e=500,t=33,n=i(),r=n,s=1e3/240,a=s,o=[],l,c,u,d,f,h,p=function g(m){var _=i()-r,M=m===!0,w,S,y,T;if((_>e||_<0)&&(n+=_-t),r+=_,y=r-n,w=y-a,(w>0||M)&&(T=++d.frame,f=y-d.time*1e3,d.time=y=y/1e3,a+=w+(w>=s?4:s-w),S=1),M||(l=c(g)),S)for(h=0;h<o.length;h++)o[h](y,f,T,m)};return d={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){c_&&(!pf&&Nh()&&(Xi=pf=window,Uh=Xi.document||{},mi.gsap=jn,(Xi.gsapVersions||(Xi.gsapVersions=[])).push(jn.version),u_(Mc||Xi.GreenSockGlobals||!Xi.gsap&&Xi||{}),R_.forEach(C_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,a-d.time*1e3+1|0)},Vo=1,p(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Vo=0,c=zo},lagSmoothing:function(m,_){e=m||1/0,t=Math.min(_||33,e)},fps:function(m){s=1e3/(m||240),a=d.time*1e3+s},add:function(m,_,M){var w=_?function(S,y,T,b){m(S,y,T,b),d.remove(w)}:m;return d.remove(m),o[M?"unshift":"push"](w),ka(),w},remove:function(m,_){~(_=o.indexOf(m))&&o.splice(_,1)&&h>=_&&h--},_listeners:o},d}(),ka=function(){return!Vo&&ci.wake()},_t={},kv=/^[\d.\-M][\d.\-,\s]/,Vv=/["']/g,Hv=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),r=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[r]=isNaN(c)?c.replace(Vv,"").trim():+c,r=l.substr(o+1).trim();return t},Gv=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<n?e.indexOf(")",n+1):n)},Wv=function(e){var t=(e+"").split("("),n=_t[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[Hv(t[1])]:Gv(e).split(",").map(m_)):_t._CE&&kv.test(e)?_t._CE("",e):n},Xv=function(e){return function(t){return 1-e(1-t)}},Cs=function(e,t){return e&&(qt(e)?e:_t[e]||Wv(e))||t},Hs=function(e,t,n,r){n===void 0&&(n=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:r},a;return Kn(e,function(o){_t[o]=mi[o]=s,_t[a=o.toLowerCase()]=n;for(var l in s)_t[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=_t[o+"."+l]=s[l]}),s},I_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},fu=function i(e,t,n){var r=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/df*(Math.asin(1/r)||0),o=function(u){return u===1?1:r*Math.pow(2,-10*u)*mv((u-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:I_(o);return s=df/s,l.config=function(c,u){return i(e,c,u)},l},hu=function i(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},r=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:I_(n);return r.config=function(s){return i(e,s)},r};Kn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,e){var t=e<5?e+1:e;Hs(i+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});_t.Linear.easeNone=_t.none=_t.Linear.easeIn;Hs("Elastic",fu("in"),fu("out"),fu());(function(i,e){var t=1/e,n=2*t,r=2.5*t,s=function(o){return o<t?i*o*o:o<n?i*Math.pow(o-1.5/e,2)+.75:o<r?i*(o-=2.25/e)*o+.9375:i*Math.pow(o-2.625/e,2)+.984375};Hs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);Hs("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Hs("Circ",function(i){return-(s_(1-i*i)-1)});Hs("Sine",function(i){return i===1?1:-pv(i*hv)+1});Hs("Back",hu("in"),hu("out"),hu());_t.SteppedEase=_t.steps=mi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,r=e+(t?0:1),s=t?1:0,a=1-Pt;return function(o){return((r*Ko(0,a,o)|0)+s)*n}}};Oo.ease=_t["quad.out"];Kn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return Bh+=i+","+i+"Params,"});var N_=function(e,t){this.id=dv++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:d_,this.set=t?t.getSetter:Wh},Ho=function(){function i(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,za(this,+t.duration,1,1),this.data=t.data,zt&&(this._ctx=zt,zt.data.push(this)),Vo||ci.wake()}var e=i.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,za(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,r){if(ka(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Gc(this,n),!s._dp||s.parent||v_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&$i(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Pt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),p_(this,n,r)),this},e.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+qd(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},e.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+qd(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?Ba(this._tTime,s)+1:1},e.timeScale=function(n,r){if(!arguments.length)return this._rts===-Pt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ec(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Pt?0:this._rts,this.totalTime(Ko(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),Hc(this),bv(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ka(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Pt&&(this._tTime-=Pt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=kt(n);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&$i(r,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+($n(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ec(r.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Mv);var r=Sn;return Sn=n,kh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Sn=r,this},e.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Yd(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Yd(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,r){return this.totalTime(Mi(this,n),$n(r))},e.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,$n(r)),this._dur||(this._zTime=-Pt),this},e.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},e.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Pt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Pt,this},e.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Pt)},e.eventCallback=function(n,r,s){var a=this.vars;return arguments.length>1?(r?(a[n]=r,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete a[n],this):a[n]},e.then=function(n){var r=this,s=r._prom;return new Promise(function(a){var o=qt(n)?n:__,l=function(){var u=r.then;r.then=null,s&&s(),qt(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=u),a(o),r.then=u};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){mo(this)},i}();_i(Ho.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Pt,_prom:0,_ps:!1,_rts:1});var qn=function(i){r_(e,i);function e(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=$n(n.sortChildren),Vt&&$i(n.parent||Vt,dr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&x_(dr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,a){return Ao(0,arguments,this),this},t.from=function(r,s,a){return Ao(1,arguments,this),this},t.fromTo=function(r,s,a,o){return Ao(2,arguments,this),this},t.set=function(r,s,a){return s.duration=0,s.parent=this,bo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new rn(r,s,Mi(this,a),1),this},t.call=function(r,s,a){return $i(this,rn.delayedCall(0,r,s),a)},t.staggerTo=function(r,s,a,o,l,c,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=u,a.parent=this,new rn(r,a,Mi(this,l)),this},t.staggerFrom=function(r,s,a,o,l,c,u){return a.runBackwards=1,bo(a).immediateRender=$n(a.immediateRender),this.staggerTo(r,s,a,o,l,c,u)},t.staggerFromTo=function(r,s,a,o,l,c,u,d){return o.startAt=a,bo(o).immediateRender=$n(o.immediateRender),this.staggerTo(r,s,o,l,c,u,d)},t.render=function(r,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:kt(r),d=this._zTime<0!=r<0&&(this._initted||!c),f,h,p,g,m,_,M,w,S,y,T,b;if(this!==Vt&&u>l&&r>=0&&(u=l),u!==this._tTime||a||d){if(o!==this._time&&c&&(u+=this._time-o,r+=this._time-o),f=u,S=this._start,w=this._ts,_=!w,d&&(c||(o=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,a);if(f=kt(u%m),u===l?(g=this._repeat,f=c):(y=kt(u/m),g=~~y,g&&g===y&&(f=c,g--),f>c&&(f=c)),y=Ba(this._tTime,m),!o&&this._tTime&&y!==g&&this._tTime-y*m-this._dur<=0&&(y=g),T&&g&1&&(f=c-f,b=1),g!==y&&!this._lock){var x=T&&y&1,A=x===(T&&g&1);if(g<y&&(x=!x),o=x?0:u%c?c:u,this._lock=1,this.render(o||(b?0:kt(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&fi(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1,y=g),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,A&&(this._lock=2,o=x?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!_)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=Cv(this,kt(o),kt(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&u&&c&&!s&&!y&&(fi(this,"onStart"),this._tTime!==u))return this;if(f>=o&&r>=0)for(h=this._first;h;){if(p=h._next,(h._act||f>=h._start)&&h._ts&&M!==h){if(h.parent!==this)return this.render(r,s,a);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,a),f!==this._time||!this._ts&&!_){M=0,p&&(u+=this._zTime=-Pt);break}}h=p}else{h=this._last;for(var C=r<0?r:f;h;){if(p=h._prev,(h._act||C<=h._end)&&h._ts&&M!==h){if(h.parent!==this)return this.render(r,s,a);if(h.render(h._ts>0?(C-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(C-h._start)*h._ts,s,a||Sn&&kh(h)),f!==this._time||!this._ts&&!_){M=0,p&&(u+=this._zTime=C?-Pt:Pt);break}}h=p}}if(M&&!s&&(this.pause(),M.render(f>=o?0:-Pt)._zTime=f>=o?1:-1,this._ts))return this._start=S,Hc(this),this.render(r,s,a);this._onUpdate&&!s&&fi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&o)&&(S===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ns(this,1),!s&&!(r<0&&!o)&&(u||o||!l)&&(fi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var a=this;if(br(s)||(s=Mi(this,s,r)),!(r instanceof Ho)){if(In(r))return r.forEach(function(o){return a.add(o,s)}),this;if(_n(r))return this.addLabel(r,s);if(qt(r))r=rn.delayedCall(0,r);else return this}return this!==r?$i(this,r,s):this},t.getChildren=function(r,s,a,o){r===void 0&&(r=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-Ai);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof rn?s&&l.push(c):(a&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===r)return s[a]},t.remove=function(r){return _n(r)?this.removeLabel(r):qt(r)?this.killTweensOf(r):(r.parent===this&&Vc(this,r),r===this._recent&&(this._recent=this._last),Rs(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=kt(ci.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Mi(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,a){var o=rn.delayedCall(0,s||zo,a);return o.data="isPause",this._hasPause=1,$i(this,o,Mi(this,r))},t.removePause=function(r){var s=this._first;for(r=Mi(this,r);s;)s._start===r&&s.data==="isPause"&&ns(s),s=s._next},t.killTweensOf=function(r,s,a){for(var o=this.getTweensOf(r,a),l=o.length;l--;)Wr!==o[l]&&o[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var a=[],o=wi(r),l=this._first,c=br(s),u;l;)l instanceof rn?yv(l._targets,o)&&(c?(!Wr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(u=l.getTweensOf(o,s)).length&&a.push.apply(a,u),l=l._next;return a},t.tweenTo=function(r,s){s=s||{};var a=this,o=Mi(a,r),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,p=rn.to(a,_i({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Pt,onStart:function(){if(a.pause(),!h){var m=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());p._dur!==m&&za(p,m,0,1).render(p._time,!0,!0),h=1}u&&u.apply(p,d||[])}},s));return f?p.render(0):p},t.tweenFromTo=function(r,s,a){return this.tweenTo(s,_i({startAt:{time:Mi(this,r)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),$d(this,Mi(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),$d(this,Mi(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Pt)},t.shiftChildren=function(r,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(r=kt(r);o;)o._start>=a&&(o._start+=r,o._end+=r),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=r);return Rs(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Rs(this)},t.totalDuration=function(r){var s=0,a=this,o=a._last,l=Ai,c,u,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-r:r));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,$i(a,o,u-o._delay,1)._lock=0):l=u,u<0&&o._ts&&(s-=u,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=kt(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;za(a,a===Vt&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(r){if(Vt._ts&&(p_(Vt,Ec(r,Vt)),h_=ci.frame),ci.frame>=Wd){Wd+=di.autoSleep||120;var s=Vt._first;if((!s||!s._ts)&&di.autoSleep&&ci._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ci.sleep()}}},e}(Ho);_i(qn.prototype,{_lock:0,_hasPause:0,_forcing:0});var qv=function(e,t,n,r,s,a,o){var l=new Zn(this._pt,e,t,0,1,k_,null,s),c=0,u=0,d,f,h,p,g,m,_,M;for(l.b=n,l.e=r,n+="",r+="",(_=~r.indexOf("random("))&&(r=ko(r)),a&&(M=[n,r],a(M,e,t),n=M[0],r=M[1]),f=n.match(lu)||[];d=lu.exec(r);)p=d[0],g=r.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),p!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:p.charAt(1)==="="?Ea(m,p)-m:parseFloat(p)-m,m:h&&h<4?Math.round:0},c=lu.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=o,(l_.test(r)||_)&&(l.e=0),this._pt=l,l},Vh=function(e,t,n,r,s,a,o,l,c,u){qt(r)&&(r=r(s||0,e,a));var d=e[t],f=n!=="get"?n:qt(d)?c?e[t.indexOf("set")||!qt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=qt(d)?c?Jv:B_:Gh,p;if(_n(r)&&(~r.indexOf("random(")&&(r=ko(r)),r.charAt(1)==="="&&(p=Ea(f,r)+(Pn(f)||0),(p||p===0)&&(r=p))),!u||f!==r||Mf)return!isNaN(f*r)&&r!==""?(p=new Zn(this._pt,e,t,+f||0,r-(f||0),typeof d=="boolean"?jv:z_,0,h),c&&(p.fp=c),o&&p.modifier(o,this,e),this._pt=p):(!d&&!(t in e)&&Fh(t,r),qv.call(this,e,t,f,r,h,l||di.stringFilter,c))},Yv=function(e,t,n,r,s){if(qt(e)&&(e=wo(e,s,t,n,r)),!rr(e)||e.style&&e.nodeType||In(e)||a_(e))return _n(e)?wo(e,s,t,n,r):e;var a={},o;for(o in e)a[o]=wo(e[o],s,t,n,r);return a},U_=function(e,t,n,r,s,a){var o,l,c,u;if(ai[e]&&(o=new ai[e]).init(s,o.rawVars?t[e]:Yv(t[e],r,s,a,n),n,r,a)!==!1&&(n._pt=l=new Zn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==xa))for(c=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)c[o._props[u]]=l;return o},Wr,Mf,Hh=function i(e,t,n){var r=e.vars,s=r.ease,a=r.startAt,o=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,d=r.yoyoEase,f=r.keyframes,h=r.autoRevert,p=e._dur,g=e._startAt,m=e._targets,_=e.parent,M=_&&_.data==="nested"?_.vars.targets:m,w=e._overwrite==="auto"&&!Lh,S=e.timeline,y=r.easeReverse||d,T,b,x,A,C,D,L,q,X,N,H,U,Y;if(S&&(!f||!s)&&(s="none"),e._ease=Cs(s,Oo.ease),e._rEase=y&&(Cs(y)||e._ease),e._from=!S&&!!r.runBackwards,e._from&&(e.ratio=1),!S||f&&!r.stagger){if(q=m[0]?ws(m[0]).harness:0,U=q&&r[q.prop],T=Tc(r,Oh),g&&(g._zTime<0&&g.progress(1),t<0&&u&&o&&!h?g.render(-1,!0):g.revert(u&&p?jl:Sv),g._lazy=0),a){if(ns(e._startAt=rn.set(m,_i({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!g&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return fi(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Sn||!o&&!h)&&e._startAt.revert(jl),o&&p&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&p&&!g){if(t&&(o=!1),x=_i({overwrite:!1,data:"isFromStart",lazy:o&&!g&&$n(l),immediateRender:o,stagger:0,parent:_},T),U&&(x[q.prop]=U),ns(e._startAt=rn.set(m,x)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Sn?e._startAt.revert(jl):e._startAt.render(-1,!0)),e._zTime=t,!o)i(e._startAt,Pt,Pt);else if(!t)return}for(e._pt=e._ptCache=0,l=p&&$n(l)||l&&!p,b=0;b<m.length;b++){if(C=m[b],L=C._gsap||zh(m)[b]._gsap,e._ptLookup[b]=N={},mf[L.id]&&Jr.length&&yc(),H=M===m?b:M.indexOf(C),q&&(X=new q).init(C,U||T,e,H,M)!==!1&&(e._pt=A=new Zn(e._pt,C,X.name,0,1,X.render,X,0,X.priority),X._props.forEach(function(B){N[B]=A}),X.priority&&(D=1)),!q||U)for(x in T)ai[x]&&(X=U_(x,T,e,H,C,M))?X.priority&&(D=1):N[x]=A=Vh.call(e,C,x,"get",T[x],H,M,0,r.stringFilter);e._op&&e._op[b]&&e.kill(C,e._op[b]),w&&e._pt&&(Wr=e,Vt.killTweensOf(C,N,e.globalTime(t)),Y=!e.parent,Wr=0),e._pt&&l&&(mf[L.id]=1)}D&&V_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Y,f&&t<=0&&S.render(Ai,!0,!0)},$v=function(e,t,n,r,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Mf=1,e.vars[t]="+=0",Hh(e,o),Mf=0,l?Bo(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(r||r===0)&&!s?r:u.s+(r||0)+a*u.c,u.c=n-u.s,d.e&&(d.e=Zt(n)+Pn(d.e)),d.b&&(d.b=u.s+Pn(d.b))},Kv=function(e,t){var n=e[0]?ws(e[0]).harness:0,r=n&&n.aliases,s,a,o,l;if(!r)return t;s=Oa({},t);for(a in r)if(a in s)for(l=r[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},Zv=function(e,t,n,r){var s=t.ease||r||"power1.inOut",a,o;if(In(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},wo=function(e,t,n,r,s){return qt(e)?e.call(t,n,r,s):_n(e)&&~e.indexOf("random(")?ko(e):e},F_=Bh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",O_={};Kn(F_+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return O_[i]=1});var rn=function(i){r_(e,i);function e(n,r,s,a){var o;typeof r=="number"&&(s.duration=r,r=s,s=null),o=i.call(this,a?r:bo(r))||this;var l=o.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,p=l.keyframes,g=l.defaults,m=l.scrollTrigger,_=r.parent||Vt,M=(In(n)||a_(n)?br(n[0]):"length"in r)?[n]:wi(n),w,S,y,T,b,x,A,C;if(o._targets=M.length?zh(M):Bo("GSAP target "+n+" not found. https://gsap.com",!di.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=h,p||f||ul(c)||ul(u)){r=o.vars;var D=r.easeReverse||r.yoyoEase;if(w=o.timeline=new qn({data:"nested",defaults:g||{},targets:_&&_.data==="nested"?_.vars.targets:M}),w.kill(),w.parent=w._dp=dr(o),w._start=0,f||ul(c)||ul(u)){if(T=M.length,A=f&&T_(f),rr(f))for(b in f)~F_.indexOf(b)&&(C||(C={}),C[b]=f[b]);for(S=0;S<T;S++)y=Tc(r,O_),y.stagger=0,D&&(y.easeReverse=D),C&&Oa(y,C),x=M[S],y.duration=+wo(c,dr(o),S,x,M),y.delay=(+wo(u,dr(o),S,x,M)||0)-o._delay,!f&&T===1&&y.delay&&(o._delay=u=y.delay,o._start+=u,y.delay=0),w.to(x,y,A?A(S,x,M):0),w._ease=_t.none;w.duration()?c=u=0:o.timeline=0}else if(p){bo(_i(w.vars.defaults,{ease:"none"})),w._ease=Cs(p.ease||r.ease||"none");var L=0,q,X,N;if(In(p))p.forEach(function(H){return w.to(M,H,">")}),w.duration();else{y={};for(b in p)b==="ease"||b==="easeEach"||Zv(b,p[b],y,p.easeEach);for(b in y)for(q=y[b].sort(function(H,U){return H.t-U.t}),L=0,S=0;S<q.length;S++)X=q[S],N={ease:X.e,duration:(X.t-(S?q[S-1].t:0))/100*c},N[b]=X.v,w.to(M,N,L),L+=N.duration;w.duration()<c&&w.to({},{duration:c-w.duration()})}}c||o.duration(c=w.duration())}else o.timeline=0;return h===!0&&!Lh&&(Wr=dr(o),Vt.killTweensOf(M),Wr=0),$i(_,dr(o),s),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(d||!c&&!p&&o._start===kt(_._time)&&$n(d)&&Av(dr(o))&&_.data!=="nested")&&(o._tTime=-Pt,o.render(Math.max(0,-u)||0)),m&&x_(dr(o),m),o}var t=e.prototype;return t.render=function(r,s,a){var o=this._time,l=this._tDur,c=this._dur,u=r<0,d=r>l-Pt&&!u?l:r<Pt?0:r,f,h,p,g,m,_,M,w;if(!c)Rv(this,r,s,a);else if(d!==this._tTime||!r||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,w=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+r,s,a);if(f=kt(d%g),d===l?(p=this._repeat,f=c):(m=kt(d/g),p=~~m,p&&p===m?(f=c,p--):f>c&&(f=c)),_=this._yoyo&&p&1,_&&(f=c-f),m=Ba(this._tTime,g),f===o&&!a&&this._initted&&p===m)return this._tTime=d,this;p!==m&&this.vars.repeatRefresh&&!_&&!this._lock&&f!==g&&this._initted&&(this._lock=a=1,this.render(kt(g*p),!0).invalidate()._lock=0)}if(!this._initted){if(S_(this,u?r:f,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(r,s,a)}if(this._rEase){var S=f<o;if(S!==this._inv){var y=S?o:c-o;this._inv=S,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=y?(S?-1:1)/y:0,this._invScale=S?-this.ratio:1-this.ratio,this._invEase=S?this._rEase:this._ease}this.ratio=M=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=M=this._ease(f/c);if(this._from&&(this.ratio=M=1-M),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!m&&(fi(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(M,h.d),h=h._next;w&&w.render(r<0?r:w._dur*w._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&_f(this,r,s,a),fi(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!s&&this.parent&&fi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&_f(this,r,!0,!0),(r||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&ns(this,1),!s&&!(u&&!o)&&(d||o||_)&&(fi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,a,o,l){Vo||ci.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Hh(this,c),u=this._ease(c/this._dur),$v(this,r,s,a,o,u,c,l)?this.resetTo(r,s,a,o,1):(Gc(this,0),this.parent||g_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?mo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Sn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Wr&&Wr.vars.overwrite!==!0)._first||mo(this),this.parent&&a!==this.timeline.totalDuration()&&za(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=r?wi(r):o,c=this._ptLookup,u=this._pt,d,f,h,p,g,m,_;if((!s||s==="all")&&Ev(o,l))return s==="all"&&(this._pt=0),mo(this);for(d=this._op=this._op||[],s!=="all"&&(_n(s)&&(g={},Kn(s,function(M){return g[M]=1}),s=g),s=Kv(o,s)),_=o.length;_--;)if(~l.indexOf(o[_])){f=c[_],s==="all"?(d[_]=s,p=f,h={}):(h=d[_]=d[_]||{},p=s);for(g in p)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Vc(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&mo(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ao(1,arguments)},e.delayedCall=function(r,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(r,s,a){return Ao(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,a){return Vt.killTweensOf(r,s,a)},e}(Ho);_i(rn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Kn("staggerTo,staggerFrom,staggerFromTo",function(i){rn[i]=function(){var e=new qn,t=vf.call(arguments,0);return t.splice(i==="staggerFromTo"?5:4,0,0),e[i].apply(e,t)}});var Gh=function(e,t,n){return e[t]=n},B_=function(e,t,n){return e[t](n)},Jv=function(e,t,n,r){return e[t](r.fp,n)},Qv=function(e,t,n){return e.setAttribute(t,n)},Wh=function(e,t){return qt(e[t])?B_:Ih(e[t])&&e.setAttribute?Qv:Gh},z_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},jv=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},k_=function(e,t){var n=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+r,n=n._next;r+=t.c}t.set(t.t,t.p,r,t)},Xh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},ex=function(e,t,n,r){for(var s=this._pt,a;s;)a=s._next,s.p===r&&s.modifier(e,t,n),s=a},tx=function(e){for(var t=this._pt,n,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Vc(this,t,"_pt"):t.dep||(n=1),t=r;return!n},nx=function(e,t,n,r){r.mSet(e,t,r.m.call(r.tween,n,r.mt),r)},V_=function(e){for(var t=e._pt,n,r,s,a;t;){for(n=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:a)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:a=t,t=n}e._pt=s},Zn=function(){function i(t,n,r,s,a,o,l,c,u){this.t=n,this.s=s,this.c=a,this.p=r,this.r=o||z_,this.d=l||this,this.set=c||Gh,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=i.prototype;return e.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=nx,this.m=n,this.mt=s,this.tween=r},i}();Kn(Bh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(i){return Oh[i]=1});mi.TweenMax=mi.TweenLite=rn;mi.TimelineLite=mi.TimelineMax=qn;Vt=new qn({sortChildren:!1,defaults:Oo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});di.stringFilter=L_;var Ps=[],tc={},ix=[],Zd=0,rx=0,du=function(e){return(tc[e]||ix).map(function(t){return t()})},yf=function(){var e=Date.now(),t=[];e-Zd>2&&(du("matchMediaInit"),Ps.forEach(function(n){var r=n.queries,s=n.conditions,a,o,l,c;for(o in r)a=Xi.matchMedia(r[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),du("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Zd=e,du("matchMedia"))},H_=function(){function i(t,n){this.selector=n&&xf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=rx++,t&&this.add(t)}var e=i.prototype;return e.add=function(n,r,s){qt(n)&&(s=r,r=n,n=qt);var a=this,o=function(){var c=zt,u=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=xf(s)),zt=a,d=r.apply(a,arguments),qt(d)&&a._r.push(d),zt=c,a.selector=u,a.isReverted=!1,d};return a.last=o,n===qt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var r=zt;zt=null,n(this),zt=r},e.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof rn&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,r){var s=this;if(n?function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof qn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof rn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var a=Ps.length;a--;)Ps[a].id===this.id&&Ps.splice(a,1)},e.revert=function(n){this.kill(n||{})},i}(),sx=function(){function i(t){this.contexts=[],this.scope=t,zt&&zt.data.push(this)}var e=i.prototype;return e.add=function(n,r,s){rr(n)||(n={matches:n});var a=new H_(0,s||this.scope),o=a.conditions={},l,c,u;zt&&!a.selector&&(a.selector=zt.selector),this.contexts.push(a),r=a.add("onMatch",r),a.queries=n;for(c in n)c==="all"?u=1:(l=Xi.matchMedia(n[c]),l&&(Ps.indexOf(a)<0&&Ps.push(a),(o[c]=l.matches)&&(u=1),l.addListener?l.addListener(yf):l.addEventListener("change",yf)));return u&&r(a,function(d){return a.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i}(),bc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(r){return C_(r)})},timeline:function(e){return new qn(e)},getTweensOf:function(e,t){return Vt.getTweensOf(e,t)},getProperty:function(e,t,n,r){_n(e)&&(e=wi(e)[0]);var s=ws(e||{}).get,a=n?__:m_;return n==="native"&&(n=""),e&&(t?a((ai[t]&&ai[t].get||s)(e,t,n,r)):function(o,l,c){return a((ai[o]&&ai[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=wi(e),e.length>1){var r=e.map(function(u){return jn.quickSetter(u,t,n)}),s=r.length;return function(u){for(var d=s;d--;)r[d](u)}}e=e[0]||{};var a=ai[t],o=ws(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(u){var d=new a;xa._pt=0,d.init(e,n?u+n:u,xa,0,[e]),d.render(1,d),xa._pt&&Xh(1,xa)}:o.set(e,l);return a?c:function(u){return c(e,l,n?u+n:u,o,1)}},quickTo:function(e,t,n){var r,s=jn.to(e,_i((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),a=function(l,c,u){return s.resetTo(t,l,c,u)};return a.tween=s,a},isTweening:function(e){return Vt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Cs(e.ease,Oo.ease)),Xd(Oo,e||{})},config:function(e){return Xd(di,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,r=e.plugins,s=e.defaults,a=e.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!ai[o]&&!mi[o]&&Bo(t+" effect requires "+o+" plugin.")}),cu[t]=function(o,l,c){return n(wi(o),_i(l||{},s),c)},a&&(qn.prototype[t]=function(o,l,c){return this.add(cu[t](o,rr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){_t[e]=Cs(t)},parseEase:function(e,t){return arguments.length?Cs(e,t):_t},getById:function(e){return Vt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new qn(e),r,s;for(n.smoothChildTiming=$n(e.smoothChildTiming),Vt.remove(n),n._dp=0,n._time=n._tTime=Vt._time,r=Vt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof rn&&r.vars.onComplete===r._targets[0]))&&$i(n,r,r._start-r._delay),r=s;return $i(Vt,n,0),n},context:function(e,t){return e?new H_(e,t):zt},matchMedia:function(e){return new sx(e)},matchMediaRefresh:function(){return Ps.forEach(function(e){var t=e.conditions,n,r;for(r in t)t[r]&&(t[r]=!1,n=1);n&&e.revert()})||yf()},addEventListener:function(e,t){var n=tc[e]||(tc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=tc[e],r=n&&n.indexOf(t);r>=0&&n.splice(r,1)},utils:{wrap:Fv,wrapYoyo:Ov,distribute:T_,random:b_,snap:E_,normalize:Uv,getUnit:Pn,clamp:Dv,splitColor:P_,toArray:wi,selector:xf,mapRange:w_,pipe:Iv,unitize:Nv,interpolate:Bv,shuffle:y_},install:u_,effects:cu,ticker:ci,updateRoot:qn.updateRoot,plugins:ai,globalTimeline:Vt,core:{PropTween:Zn,globals:f_,Tween:rn,Timeline:qn,Animation:Ho,getCache:ws,_removeLinkedListItem:Vc,reverting:function(){return Sn},context:function(e){return e&&zt&&(zt.data.push(e),e._ctx=zt),zt},suppressOverwrites:function(e){return Lh=e}}};Kn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return bc[i]=rn[i]});ci.add(qn.updateRoot);xa=bc.to({},{duration:0});var ax=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},ox=function(e,t){var n=e._targets,r,s,a;for(r in t)for(s=n.length;s--;)a=e._ptLookup[s][r],a&&(a=a.d)&&(a._pt&&(a=ax(a,r)),a&&a.modifier&&a.modifier(t[r],e,n[s],r))},pu=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,a){a._onInit=function(o){var l,c;if(_n(s)&&(l={},Kn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}ox(o,s)}}}},jn=bc.registerPlugin({name:"attr",init:function(e,t,n,r,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],r,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Sn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},pu("roundProps",Sf),pu("modifiers"),pu("snap",E_))||bc;rn.version=qn.version=jn.version="3.15.0";c_=1;Nh()&&ka();_t.Power0;_t.Power1;_t.Power2;_t.Power3;_t.Power4;_t.Linear;_t.Quad;_t.Cubic;_t.Quart;_t.Quint;_t.Strong;_t.Elastic;_t.Back;_t.SteppedEase;_t.Bounce;_t.Sine;_t.Expo;_t.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Jd,Xr,ba,qh,Ts,Qd,Yh,lx=function(){return typeof window<"u"},Ar={},ps=180/Math.PI,Aa=Math.PI/180,Ks=Math.atan2,jd=1e8,$h=/([A-Z])/g,cx=/(left|right|width|margin|padding|x)/i,ux=/[\s,\(]\S/,Ki={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Tf=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},fx=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},hx=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},dx=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},px=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},G_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},W_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},mx=function(e,t,n){return e.style[t]=n},_x=function(e,t,n){return e.style.setProperty(t,n)},gx=function(e,t,n){return e._gsap[t]=n},vx=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},xx=function(e,t,n,r,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Sx=function(e,t,n,r,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Ht="transform",Jn=Ht+"Origin",Mx=function i(e,t){var n=this,r=this.target,s=r.style,a=r._gsap;if(e in Ar&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ki[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=pr(r,o)}):this.tfm[e]=a.x?a[e]:pr(r,e),e===Jn&&(this.tfm.zOrigin=a.zOrigin);else return Ki.transform.split(",").forEach(function(o){return i.call(n,o,t)});if(this.props.indexOf(Ht)>=0)return;a.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Jn,t,"")),e=Ht}(s||t)&&this.props.push(e,t,s[e])},X_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},yx=function(){var e=this.props,t=this.target,n=t.style,r=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace($h,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)r[a]=this.tfm[a];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Yh(),(!s||!s.isStart)&&!n[Ht]&&(X_(n),r.zOrigin&&n[Jn]&&(n[Jn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},q_=function(e,t){var n={target:e,props:[],revert:yx,save:Mx};return e._gsap||jn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return n.save(r)}),n},Y_,Ef=function(e,t){var n=Xr.createElementNS?Xr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Xr.createElement(e);return n&&n.style?n:Xr.createElement(e)},hi=function i(e,t,n){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace($h,"-$1").toLowerCase())||r.getPropertyValue(t)||!n&&i(e,Va(t)||t,1)||""},ep="O,Moz,ms,Ms,Webkit".split(","),Va=function(e,t,n){var r=t||Ts,s=r.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(ep[a]+e in s););return a<0?null:(a===3?"ms":a>=0?ep[a]:"")+e},bf=function(){lx()&&window.document&&(Jd=window,Xr=Jd.document,ba=Xr.documentElement,Ts=Ef("div")||{style:{}},Ef("div"),Ht=Va(Ht),Jn=Ht+"Origin",Ts.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Y_=!!Va("perspective"),Yh=jn.core.reverting,qh=1)},tp=function(e){var t=e.ownerSVGElement,n=Ef("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",n.appendChild(r),ba.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),ba.removeChild(n),s},np=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},$_=function(e){var t,n;try{t=e.getBBox()}catch{t=tp(e),n=1}return t&&(t.width||t.height)||n||(t=tp(e)),t&&!t.width&&!t.x&&!t.y?{x:+np(e,["x","cx","x1"])||0,y:+np(e,["y","cy","y1"])||0,width:0,height:0}:t},K_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&$_(e))},is=function(e,t){if(t){var n=e.style,r;t in Ar&&t!==Jn&&(t=Ht),n.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(r==="--"?t:t.replace($h,"-$1").toLowerCase())):n.removeAttribute(t)}},qr=function(e,t,n,r,s,a){var o=new Zn(e._pt,t,n,0,1,a?W_:G_);return e._pt=o,o.b=r,o.e=s,e._props.push(n),o},ip={deg:1,rad:1,turn:1},Tx={grid:1,flex:1},rs=function i(e,t,n,r){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=Ts.style,l=cx.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=r==="px",h=r==="%",p,g,m,_;if(r===a||!s||ip[r]||ip[a])return s;if(a!=="px"&&!f&&(s=i(e,t,n,"px")),_=e.getCTM&&K_(e),(h||a==="%")&&(Ar[t]||~t.indexOf("adius")))return p=_?e.getBBox()[l?"width":"height"]:e[u],Zt(h?s/p*d:s/100*p);if(o[l?"width":"height"]=d+(f?a:r),g=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,_&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Xr||!g.appendChild)&&(g=Xr.body),m=g._gsap,m&&h&&m.width&&l&&m.time===ci.time&&!m.uncache)return Zt(s/m.width*d);if(h&&(t==="height"||t==="width")){var M=e.style[t];e.style[t]=d+r,p=e[u],M?e.style[t]=M:is(e,t)}else(h||a==="%")&&!Tx[hi(g,"display")]&&(o.position=hi(e,"position")),g===e&&(o.position="static"),g.appendChild(Ts),p=Ts[u],g.removeChild(Ts),o.position="absolute";return l&&h&&(m=ws(g),m.time=ci.time,m.width=g[u]),Zt(f?p*s/d:p&&s?d/p*s:0)},pr=function(e,t,n,r){var s;return qh||bf(),t in Ki&&t!=="transform"&&(t=Ki[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ar[t]&&t!=="transform"?(s=Wo(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:wc(hi(e,Jn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Ac[t]&&Ac[t](e,t,n)||hi(e,t)||d_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?rs(e,t,s,n)+n:s},Ex=function(e,t,n,r){if(!n||n==="none"){var s=Va(t,e,1),a=s&&hi(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=hi(e,"borderTopColor"))}var o=new Zn(this._pt,e.style,t,0,1,k_),l=0,c=0,u,d,f,h,p,g,m,_,M,w,S,y;if(o.b=n,o.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=hi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(g=e.style[t],e.style[t]=r,r=hi(e,t)||r,g?e.style[t]=g:is(e,t)),u=[n,r],L_(u),n=u[0],r=u[1],f=n.match(va)||[],y=r.match(va)||[],y.length){for(;d=va.exec(r);)m=d[0],M=r.substring(l,d.index),p?p=(p+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(p=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,S=g.substr((h+"").length),m.charAt(1)==="="&&(m=Ea(h,m)+S),_=parseFloat(m),w=m.substr((_+"").length),l=va.lastIndex-w.length,w||(w=w||di.units[t]||S,l===r.length&&(r+=w,o.e+=w)),S!==w&&(h=rs(e,t,g,w)||0),o._pt={_next:o._pt,p:M||c===1?M:",",s:h,c:_-h,m:p&&p<4||t==="zIndex"?Math.round:0});o.c=l<r.length?r.substring(l,r.length):""}else o.r=t==="display"&&r==="none"?W_:G_;return l_.test(r)&&(o.e=0),this._pt=o,o},rp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},bx=function(e){var t=e.split(" "),n=t[0],r=t[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(e=n,n=r,r=e),t[0]=rp[n]||n,t[1]=rp[r]||r,t.join(" ")},Ax=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,r=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],Ar[o]&&(l=1,o=o==="transformOrigin"?Jn:Ht),is(n,o);l&&(is(n,Ht),a&&(a.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Wo(n,1),a.uncache=1,X_(r)))}},Ac={clearProps:function(e,t,n,r,s){if(s.data!=="isFromStart"){var a=e._pt=new Zn(e._pt,t,n,0,0,Ax);return a.u=r,a.pr=-10,a.tween=s,e._props.push(n),1}}},Go=[1,0,0,1,0,0],Z_={},J_=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},sp=function(e){var t=hi(e,Ht);return J_(t)?Go:t.substr(7).match(o_).map(Zt)},Kh=function(e,t){var n=e._gsap||ws(e),r=e.style,s=sp(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Go:s):(s===Go&&!e.offsetParent&&e!==ba&&!n.svg&&(l=r.display,r.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,ba.appendChild(e)),s=sp(e),l?r.display=l:is(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):ba.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Af=function(e,t,n,r,s,a){var o=e._gsap,l=s||Kh(e,!0),c=o.xOrigin||0,u=o.yOrigin||0,d=o.xOffset||0,f=o.yOffset||0,h=l[0],p=l[1],g=l[2],m=l[3],_=l[4],M=l[5],w=t.split(" "),S=parseFloat(w[0])||0,y=parseFloat(w[1])||0,T,b,x,A;n?l!==Go&&(b=h*m-p*g)&&(x=S*(m/b)+y*(-g/b)+(g*M-m*_)/b,A=S*(-p/b)+y*(h/b)-(h*M-p*_)/b,S=x,y=A):(T=$_(e),S=T.x+(~w[0].indexOf("%")?S/100*T.width:S),y=T.y+(~(w[1]||w[0]).indexOf("%")?y/100*T.height:y)),r||r!==!1&&o.smooth?(_=S-c,M=y-u,o.xOffset=d+(_*h+M*g)-_,o.yOffset=f+(_*p+M*m)-M):o.xOffset=o.yOffset=0,o.xOrigin=S,o.yOrigin=y,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!n,e.style[Jn]="0px 0px",a&&(qr(a,o,"xOrigin",c,S),qr(a,o,"yOrigin",u,y),qr(a,o,"xOffset",d,o.xOffset),qr(a,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",S+" "+y)},Wo=function(e,t){var n=e._gsap||new N_(e);if("x"in n&&!t&&!n.uncache)return n;var r=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=hi(e,Jn)||"0",u,d,f,h,p,g,m,_,M,w,S,y,T,b,x,A,C,D,L,q,X,N,H,U,Y,B,P,ne,de,Ye,Ge,Fe;return u=d=f=g=m=_=M=w=S=0,h=p=1,n.svg=!!(e.getCTM&&K_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Ht]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ht]!=="none"?l[Ht]:"")),r.scale=r.rotate=r.translate="none"),b=Kh(e,n.svg),n.svg&&(n.uncache?(Y=e.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",U=""):U=!t&&e.getAttribute("data-svg-origin"),Af(e,U||c,!!U||n.originIsAbsolute,n.smooth!==!1,b)),y=n.xOrigin||0,T=n.yOrigin||0,b!==Go&&(D=b[0],L=b[1],q=b[2],X=b[3],u=N=b[4],d=H=b[5],b.length===6?(h=Math.sqrt(D*D+L*L),p=Math.sqrt(X*X+q*q),g=D||L?Ks(L,D)*ps:0,M=q||X?Ks(q,X)*ps+g:0,M&&(p*=Math.abs(Math.cos(M*Aa))),n.svg&&(u-=y-(y*D+T*q),d-=T-(y*L+T*X))):(Fe=b[6],Ye=b[7],P=b[8],ne=b[9],de=b[10],Ge=b[11],u=b[12],d=b[13],f=b[14],x=Ks(Fe,de),m=x*ps,x&&(A=Math.cos(-x),C=Math.sin(-x),U=N*A+P*C,Y=H*A+ne*C,B=Fe*A+de*C,P=N*-C+P*A,ne=H*-C+ne*A,de=Fe*-C+de*A,Ge=Ye*-C+Ge*A,N=U,H=Y,Fe=B),x=Ks(-q,de),_=x*ps,x&&(A=Math.cos(-x),C=Math.sin(-x),U=D*A-P*C,Y=L*A-ne*C,B=q*A-de*C,Ge=X*C+Ge*A,D=U,L=Y,q=B),x=Ks(L,D),g=x*ps,x&&(A=Math.cos(x),C=Math.sin(x),U=D*A+L*C,Y=N*A+H*C,L=L*A-D*C,H=H*A-N*C,D=U,N=Y),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,_=180-_),h=Zt(Math.sqrt(D*D+L*L+q*q)),p=Zt(Math.sqrt(H*H+Fe*Fe)),x=Ks(N,H),M=Math.abs(x)>2e-4?x*ps:0,S=Ge?1/(Ge<0?-Ge:Ge):0),n.svg&&(U=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!J_(hi(e,Ht)),U&&e.setAttribute("transform",U))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(h*=-1,M+=g<=0?180:-180,g+=g<=0?180:-180):(p*=-1,M+=M<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Zt(h),n.scaleY=Zt(p),n.rotation=Zt(g)+o,n.rotationX=Zt(m)+o,n.rotationY=Zt(_)+o,n.skewX=M+o,n.skewY=w+o,n.transformPerspective=S+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(r[Jn]=wc(c)),n.xOffset=n.yOffset=0,n.force3D=di.force3D,n.renderTransform=n.svg?Rx:Y_?Q_:wx,n.uncache=0,n},wc=function(e){return(e=e.split(" "))[0]+" "+e[1]},mu=function(e,t,n){var r=Pn(t);return Zt(parseFloat(t)+parseFloat(rs(e,"x",n+"px",r)))+r},wx=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Q_(e,t)},ls="0deg",Ja="0px",cs=") ",Q_=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,p=n.scaleX,g=n.scaleY,m=n.transformPerspective,_=n.force3D,M=n.target,w=n.zOrigin,S="",y=_==="auto"&&e&&e!==1||_===!0;if(w&&(d!==ls||u!==ls)){var T=parseFloat(u)*Aa,b=Math.sin(T),x=Math.cos(T),A;T=parseFloat(d)*Aa,A=Math.cos(T),a=mu(M,a,b*A*-w),o=mu(M,o,-Math.sin(T)*-w),l=mu(M,l,x*A*-w+w)}m!==Ja&&(S+="perspective("+m+cs),(r||s)&&(S+="translate("+r+"%, "+s+"%) "),(y||a!==Ja||o!==Ja||l!==Ja)&&(S+=l!==Ja||y?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+cs),c!==ls&&(S+="rotate("+c+cs),u!==ls&&(S+="rotateY("+u+cs),d!==ls&&(S+="rotateX("+d+cs),(f!==ls||h!==ls)&&(S+="skew("+f+", "+h+cs),(p!==1||g!==1)&&(S+="scale("+p+", "+g+cs),M.style[Ht]=S||"translate(0, 0)"},Rx=function(e,t){var n=t||this,r=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,p=n.xOrigin,g=n.yOrigin,m=n.xOffset,_=n.yOffset,M=n.forceCSS,w=parseFloat(a),S=parseFloat(o),y,T,b,x,A;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Aa,c*=Aa,y=Math.cos(l)*d,T=Math.sin(l)*d,b=Math.sin(l-c)*-f,x=Math.cos(l-c)*f,c&&(u*=Aa,A=Math.tan(c-u),A=Math.sqrt(1+A*A),b*=A,x*=A,u&&(A=Math.tan(u),A=Math.sqrt(1+A*A),y*=A,T*=A)),y=Zt(y),T=Zt(T),b=Zt(b),x=Zt(x)):(y=d,x=f,T=b=0),(w&&!~(a+"").indexOf("px")||S&&!~(o+"").indexOf("px"))&&(w=rs(h,"x",a,"px"),S=rs(h,"y",o,"px")),(p||g||m||_)&&(w=Zt(w+p-(p*y+g*b)+m),S=Zt(S+g-(p*T+g*x)+_)),(r||s)&&(A=h.getBBox(),w=Zt(w+r/100*A.width),S=Zt(S+s/100*A.height)),A="matrix("+y+","+T+","+b+","+x+","+w+","+S+")",h.setAttribute("transform",A),M&&(h.style[Ht]=A)},Cx=function(e,t,n,r,s){var a=360,o=_n(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?ps:1),c=l-r,u=r+c+"deg",d,f;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*jd)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*jd)%a-~~(c/a)*a)),e._pt=f=new Zn(e._pt,t,n,r,c,fx),f.e=u,f.u="deg",e._props.push(n),f},ap=function(e,t){for(var n in t)e[n]=t[n];return e},Px=function(e,t,n){var r=ap({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,u,d,f,h,p;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ht]=t,o=Wo(n,1),is(n,Ht),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ht],a[Ht]=t,o=Wo(n,1),a[Ht]=c);for(l in Ar)c=r[l],u=o[l],c!==u&&s.indexOf(l)<0&&(h=Pn(c),p=Pn(u),d=h!==p?rs(n,l,c,p):parseFloat(c),f=parseFloat(u),e._pt=new Zn(e._pt,o,l,d,f-d,Tf),e._pt.u=p||0,e._props.push(l));ap(o,r)};Kn("padding,margin,Width,Radius",function(i,e){var t="Top",n="Right",r="Bottom",s="Left",a=(e<3?[t,n,r,s]:[t+s,t+n,r+n,r+s]).map(function(o){return e<2?i+o:"border"+o+i});Ac[e>1?"border"+i:i]=function(o,l,c,u,d){var f,h;if(arguments.length<4)return f=a.map(function(p){return pr(o,p,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},a.forEach(function(p,g){return h[p]=f[g]=f[g]||f[(g-1)/2|0]}),o.init(l,h,d)}});var j_={name:"css",register:bf,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,r,s){var a=this._props,o=e.style,l=n.vars.startAt,c,u,d,f,h,p,g,m,_,M,w,S,y,T,b,x,A;qh||bf(),this.styles=this.styles||q_(e),x=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(ai[g]&&U_(g,t,n,r,e,s)))){if(h=typeof u,p=Ac[g],h==="function"&&(u=u.call(n,r,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=ko(u)),p)p(this,e,g,u,n)&&(b=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Qr.lastIndex=0,Qr.test(c)||(m=Pn(c),_=Pn(u),_?m!==_&&(c=rs(e,g,c,_)+_):m&&(u+=m)),this.add(o,"setProperty",c,u,r,s,0,0,g),a.push(g),x.push(g,0,o[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,r,e,s):l[g],_n(c)&&~c.indexOf("random(")&&(c=ko(c)),Pn(c+"")||c==="auto"||(c+=di.units[g]||Pn(pr(e,g))||""),(c+"").charAt(1)==="="&&(c=pr(e,g))):c=pr(e,g),f=parseFloat(c),M=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),d=parseFloat(u),g in Ki&&(g==="autoAlpha"&&(f===1&&pr(e,"visibility")==="hidden"&&d&&(f=0),x.push("visibility",0,o.visibility),qr(this,o,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Ki[g],~g.indexOf(",")&&(g=g.split(",")[0]))),w=g in Ar,w){if(this.styles.save(g),A=u,h==="string"&&u.substring(0,6)==="var(--"){if(u=hi(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=u,u=hi(e,"perspective"),C?e.style.perspective=C:is(e,"perspective")}d=parseFloat(u)}if(S||(y=e._gsap,y.renderTransform&&!t.parseTransform||Wo(e,t.parseTransform),T=t.smoothOrigin!==!1&&y.smooth,S=this._pt=new Zn(this._pt,o,Ht,0,1,y.renderTransform,y,0,-1),S.dep=1),g==="scale")this._pt=new Zn(this._pt,y,"scaleY",y.scaleY,(M?Ea(y.scaleY,M+d):d)-y.scaleY||0,Tf),this._pt.u=0,a.push("scaleY",g),g+="X";else if(g==="transformOrigin"){x.push(Jn,0,o[Jn]),u=bx(u),y.svg?Af(e,u,0,T,0,this):(_=parseFloat(u.split(" ")[2])||0,_!==y.zOrigin&&qr(this,y,"zOrigin",y.zOrigin,_),qr(this,o,g,wc(c),wc(u)));continue}else if(g==="svgOrigin"){Af(e,u,1,T,0,this);continue}else if(g in Z_){Cx(this,y,g,f,M?Ea(f,M+u):u);continue}else if(g==="smoothOrigin"){qr(this,y,"smooth",y.smooth,u);continue}else if(g==="force3D"){y[g]=u;continue}else if(g==="transform"){Px(this,u,e);continue}}else g in o||(g=Va(g)||g);if(w||(d||d===0)&&(f||f===0)&&!ux.test(u)&&g in o)m=(c+"").substr((f+"").length),d||(d=0),_=Pn(u)||(g in di.units?di.units[g]:m),m!==_&&(f=rs(e,g,c,_)),this._pt=new Zn(this._pt,w?y:o,g,f,(M?Ea(f,M+d):d)-f,!w&&(_==="px"||g==="zIndex")&&t.autoRound!==!1?px:Tf),this._pt.u=_||0,w&&A!==u?(this._pt.b=c,this._pt.e=A,this._pt.r=dx):m!==_&&_!=="%"&&(this._pt.b=c,this._pt.r=hx);else if(g in o)Ex.call(this,e,g,c,M?M+u:u);else if(g in e)this.add(e,g,c||e[g],M?M+u:u,r,s);else if(g!=="parseTransform"){Fh(g,u);continue}w||(g in o?x.push(g,0,o[g]):typeof e[g]=="function"?x.push(g,2,e[g]()):x.push(g,1,c||e[g])),a.push(g)}}b&&V_(this)},render:function(e,t){if(t.tween._time||!Yh())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:pr,aliases:Ki,getSetter:function(e,t,n){var r=Ki[t];return r&&r.indexOf(",")<0&&(t=r),t in Ar&&t!==Jn&&(e._gsap.x||pr(e,"x"))?n&&Qd===n?t==="scale"?vx:gx:(Qd=n||{})&&(t==="scale"?xx:Sx):e.style&&!Ih(e.style[t])?mx:~t.indexOf("-")?_x:Wh(e,t)},core:{_removeProperty:is,_getMatrix:Kh}};jn.utils.checkPrefix=Va;jn.core.getStyleSaver=q_;(function(i,e,t,n){var r=Kn(i+","+e+","+t,function(s){Ar[s]=1});Kn(e,function(s){di.units[s]="deg",Z_[s]=1}),Ki[r[13]]=i+","+e,Kn(n,function(s){var a=s.split(":");Ki[a[1]]=r[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Kn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){di.units[i]="px"});jn.registerPlugin(j_);var jr=jn.registerPlugin(j_)||jn;jr.core.Tween;function Dx(i,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function Lx(i,e,t){return e&&Dx(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var vn,nc,ui,Yr,$r,wa,eg,ms,Ra,tg,gr,Li,ng,ig=function(){return vn||typeof window<"u"&&(vn=window.gsap)&&vn.registerPlugin&&vn},rg=1,Sa=[],ut=[],er=[],Ro=Date.now,wf=function(e,t){return t},Ix=function(){var e=Ra.core,t=e.bridge||{},n=e._scrollers,r=e._proxies;n.push.apply(n,ut),r.push.apply(r,er),ut=n,er=r,wf=function(a,o){return t[a](o)}},es=function(e,t){return~er.indexOf(e)&&er[er.indexOf(e)+1][t]},Co=function(e){return!!~tg.indexOf(e)},On=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:r!==!1,capture:!!s})},Fn=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},fl="scrollLeft",hl="scrollTop",Rf=function(){return gr&&gr.isPressed||ut.cache++},Rc=function(e,t){var n=function r(s){if(s||s===0){rg&&(ui.history.scrollRestoration="manual");var a=gr&&gr.isPressed;s=r.v=Math.round(s)||(gr&&gr.iOS?1:0),e(s),r.cacheID=ut.cache,a&&wf("ss",s)}else(t||ut.cache!==r.cacheID||wf("ref"))&&(r.cacheID=ut.cache,r.v=e());return r.v+r.offset};return n.offset=0,e&&n},Hn={s:fl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Rc(function(i){return arguments.length?ui.scrollTo(i,ln.sc()):ui.pageXOffset||Yr[fl]||$r[fl]||wa[fl]||0})},ln={s:hl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Hn,sc:Rc(function(i){return arguments.length?ui.scrollTo(Hn.sc(),i):ui.pageYOffset||Yr[hl]||$r[hl]||wa[hl]||0})},Xn=function(e,t){return(t&&t._ctx&&t._ctx.selector||vn.utils.toArray)(e)[0]||(typeof e=="string"&&vn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Nx=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},ss=function(e,t){var n=t.s,r=t.sc;Co(e)&&(e=Yr.scrollingElement||$r);var s=ut.indexOf(e),a=r===ln.sc?1:2;!~s&&(s=ut.push(e)-1),ut[s+a]||On(e,"scroll",Rf);var o=ut[s+a],l=o||(ut[s+a]=Rc(es(e,n),!0)||(Co(e)?r:Rc(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=vn.getProperty(e,"scrollBehavior")==="smooth"),l},Cf=function(e,t,n){var r=e,s=e,a=Ro(),o=a,l=t||50,c=Math.max(500,l*3),u=function(p,g){var m=Ro();g||m-a>l?(s=r,r=p,o=a,a=m):n?r+=p:r=s+(p-s)/(m-o)*(a-o)},d=function(){s=r=n?0:r,o=a=0},f=function(p){var g=o,m=s,_=Ro();return(p||p===0)&&p!==r&&u(p),a===o||_-o>c?0:(r+(n?m:-m))/((n?_:a)-g)*1e3};return{update:u,reset:d,getVelocity:f}},Qa=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},op=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},sg=function(){Ra=vn.core.globals().ScrollTrigger,Ra&&Ra.core&&Ix()},ag=function(e){return vn=e||ig(),!nc&&vn&&typeof document<"u"&&document.body&&(ui=window,Yr=document,$r=Yr.documentElement,wa=Yr.body,tg=[ui,Yr,$r,wa],vn.utils.clamp,ng=vn.core.context||function(){},ms="onpointerenter"in wa?"pointer":"mouse",eg=Jt.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Li=Jt.eventTypes=("ontouchstart"in $r?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in $r?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return rg=0},500),nc=1),Ra||sg(),nc};Hn.op=ln;ut.cache=0;var Jt=function(){function i(t){this.init(t)}var e=i.prototype;return e.init=function(n){nc||ag(vn)||console.warn("Please gsap.registerPlugin(Observer)"),Ra||sg();var r=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,p=n.wheelSpeed,g=n.event,m=n.onDragStart,_=n.onDragEnd,M=n.onDrag,w=n.onPress,S=n.onRelease,y=n.onRight,T=n.onLeft,b=n.onUp,x=n.onDown,A=n.onChangeX,C=n.onChangeY,D=n.onChange,L=n.onToggleX,q=n.onToggleY,X=n.onHover,N=n.onHoverEnd,H=n.onMove,U=n.ignoreCheck,Y=n.isNormalizer,B=n.onGestureStart,P=n.onGestureEnd,ne=n.onWheel,de=n.onEnable,Ye=n.onDisable,Ge=n.onClick,Fe=n.scrollSpeed,G=n.capture,oe=n.allowClicks,te=n.lockAxis,fe=n.onLockAxis;this.target=o=Xn(o)||$r,this.vars=n,h&&(h=vn.utils.toArray(h)),r=r||1e-9,s=s||0,p=p||1,Fe=Fe||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(wa).lineHeight)||22);var Ce,Me,Ee,ue,Pe,Oe,be,V=this,qe=0,Ke=0,it=n.passive||!u&&n.passive!==!1,De=ss(o,Hn),$e=ss(o,ln),I=De(),Ze=$e(),ye=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Li[0]==="pointerdown",R=Co(o),v=o.ownerDocument||Yr,O=[0,0,0],z=[0,0,0],J=0,ce=function(){return J=Ro()},le=function(se,ve){return(V.event=se)&&h&&Nx(se.target,h)||ve&&ye&&se.pointerType!=="touch"||U&&U(se,ve)},Q=function(){V._vx.reset(),V._vy.reset(),Me.pause(),d&&d(V)},j=function(){var se=V.deltaX=op(O),ve=V.deltaY=op(z),ie=Math.abs(se)>=r,Xe=Math.abs(ve)>=r;D&&(ie||Xe)&&D(V,se,ve,O,z),ie&&(y&&V.deltaX>0&&y(V),T&&V.deltaX<0&&T(V),A&&A(V),L&&V.deltaX<0!=qe<0&&L(V),qe=V.deltaX,O[0]=O[1]=O[2]=0),Xe&&(x&&V.deltaY>0&&x(V),b&&V.deltaY<0&&b(V),C&&C(V),q&&V.deltaY<0!=Ke<0&&q(V),Ke=V.deltaY,z[0]=z[1]=z[2]=0),(ue||Ee)&&(H&&H(V),Ee&&(m&&Ee===1&&m(V),M&&M(V),Ee=0),ue=!1),Oe&&!(Oe=!1)&&fe&&fe(V),Pe&&(ne(V),Pe=!1),Ce=0},me=function(se,ve,ie){O[ie]+=se,z[ie]+=ve,V._vx.update(se),V._vy.update(ve),c?Ce||(Ce=requestAnimationFrame(j)):j()},Ne=function(se,ve){te&&!be&&(V.axis=be=Math.abs(se)>Math.abs(ve)?"x":"y",Oe=!0),be!=="y"&&(O[2]+=se,V._vx.update(se,!0)),be!=="x"&&(z[2]+=ve,V._vy.update(ve,!0)),c?Ce||(Ce=requestAnimationFrame(j)):j()},xe=function(se){if(!le(se,1)){se=Qa(se,u);var ve=se.clientX,ie=se.clientY,Xe=ve-V.x,Ue=ie-V.y,et=V.isDragging;V.x=ve,V.y=ie,(et||(Xe||Ue)&&(Math.abs(V.startX-ve)>=s||Math.abs(V.startY-ie)>=s))&&(Ee||(Ee=et?2:1),et||(V.isDragging=!0),Ne(Xe,Ue))}},_e=V.onPress=function(re){le(re,1)||re&&re.button||(V.axis=be=null,Me.pause(),V.isPressed=!0,re=Qa(re),qe=Ke=0,V.startX=V.x=re.clientX,V.startY=V.y=re.clientY,V._vx.reset(),V._vy.reset(),On(Y?o:v,Li[1],xe,it,!0),V.deltaX=V.deltaY=0,w&&w(V))},he=V.onRelease=function(re){if(!le(re,1)){Fn(Y?o:v,Li[1],xe,!0);var se=!isNaN(V.y-V.startY),ve=V.isDragging,ie=ve&&(Math.abs(V.x-V.startX)>3||Math.abs(V.y-V.startY)>3),Xe=Qa(re);!ie&&se&&(V._vx.reset(),V._vy.reset(),u&&oe&&vn.delayedCall(.08,function(){if(Ro()-J>300&&!re.defaultPrevented){if(re.target.click)re.target.click();else if(v.createEvent){var Ue=v.createEvent("MouseEvents");Ue.initMouseEvent("click",!0,!0,ui,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),re.target.dispatchEvent(Ue)}}})),V.isDragging=V.isGesturing=V.isPressed=!1,d&&ve&&!Y&&Me.restart(!0),Ee&&j(),_&&ve&&_(V),S&&S(V,ie)}},ze=function(se){return se.touches&&se.touches.length>1&&(V.isGesturing=!0)&&B(se,V.isDragging)},Le=function(){return(V.isGesturing=!1)||P(V)},F=function(se){if(!le(se)){var ve=De(),ie=$e();me((ve-I)*Fe,(ie-Ze)*Fe,1),I=ve,Ze=ie,d&&Me.restart(!0)}},pe=function(se){if(!le(se)){se=Qa(se,u),ne&&(Pe=!0);var ve=(se.deltaMode===1?l:se.deltaMode===2?ui.innerHeight:1)*p;me(se.deltaX*ve,se.deltaY*ve,0),d&&!Y&&Me.restart(!0)}},ee=function(se){if(!le(se)){var ve=se.clientX,ie=se.clientY,Xe=ve-V.x,Ue=ie-V.y;V.x=ve,V.y=ie,ue=!0,d&&Me.restart(!0),(Xe||Ue)&&Ne(Xe,Ue)}},ge=function(se){V.event=se,X(V)},Se=function(se){V.event=se,N(V)},ae=function(se){return le(se)||Qa(se,u)&&Ge(V)};Me=V._dc=vn.delayedCall(f||.25,Q).pause(),V.deltaX=V.deltaY=0,V._vx=Cf(0,50,!0),V._vy=Cf(0,50,!0),V.scrollX=De,V.scrollY=$e,V.isDragging=V.isGesturing=V.isPressed=!1,ng(this),V.enable=function(re){return V.isEnabled||(On(R?v:o,"scroll",Rf),a.indexOf("scroll")>=0&&On(R?v:o,"scroll",F,it,G),a.indexOf("wheel")>=0&&On(o,"wheel",pe,it,G),(a.indexOf("touch")>=0&&eg||a.indexOf("pointer")>=0)&&(On(o,Li[0],_e,it,G),On(v,Li[2],he),On(v,Li[3],he),oe&&On(o,"click",ce,!0,!0),Ge&&On(o,"click",ae),B&&On(v,"gesturestart",ze),P&&On(v,"gestureend",Le),X&&On(o,ms+"enter",ge),N&&On(o,ms+"leave",Se),H&&On(o,ms+"move",ee)),V.isEnabled=!0,V.isDragging=V.isGesturing=V.isPressed=ue=Ee=!1,V._vx.reset(),V._vy.reset(),I=De(),Ze=$e(),re&&re.type&&_e(re),de&&de(V)),V},V.disable=function(){V.isEnabled&&(Sa.filter(function(re){return re!==V&&Co(re.target)}).length||Fn(R?v:o,"scroll",Rf),V.isPressed&&(V._vx.reset(),V._vy.reset(),Fn(Y?o:v,Li[1],xe,!0)),Fn(R?v:o,"scroll",F,G),Fn(o,"wheel",pe,G),Fn(o,Li[0],_e,G),Fn(v,Li[2],he),Fn(v,Li[3],he),Fn(o,"click",ce,!0),Fn(o,"click",ae),Fn(v,"gesturestart",ze),Fn(v,"gestureend",Le),Fn(o,ms+"enter",ge),Fn(o,ms+"leave",Se),Fn(o,ms+"move",ee),V.isEnabled=V.isPressed=V.isDragging=!1,Ye&&Ye(V))},V.kill=V.revert=function(){V.disable();var re=Sa.indexOf(V);re>=0&&Sa.splice(re,1),gr===V&&(gr=0)},Sa.push(V),Y&&Co(o)&&(gr=V),V.enable(g)},Lx(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();Jt.version="3.15.0";Jt.create=function(i){return new Jt(i)};Jt.register=ag;Jt.getAll=function(){return Sa.slice()};Jt.getById=function(i){return Sa.filter(function(e){return e.vars.id===i})[0]};ig()&&vn.registerPlugin(Jt);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Be,_a,ct,Tt,oi,Mt,Zh,Cc,Xo,Po,go,dl,bn,Wc,Pf,kn,lp,cp,ga,og,_u,lg,zn,Df,cg,ug,Hr,Lf,Jh,Ca,Qh,Do,If,gu,pl=1,Rn=Date.now,vu=Rn(),Ri=0,vo=0,up=function(e,t,n){var r=ri(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},fp=function(e,t){return t&&(!ri(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Ux=function i(){return vo&&requestAnimationFrame(i)},hp=function(){return Wc=1},dp=function(){return Wc=0},qi=function(e){return e},xo=function(e){return Math.round(e*1e5)/1e5||0},fg=function(){return typeof window<"u"},hg=function(){return Be||fg()&&(Be=window.gsap)&&Be.registerPlugin&&Be},Us=function(e){return!!~Zh.indexOf(e)},dg=function(e){return(e==="Height"?Qh:ct["inner"+e])||oi["client"+e]||Mt["client"+e]},pg=function(e){return es(e,"getBoundingClientRect")||(Us(e)?function(){return oc.width=ct.innerWidth,oc.height=Qh,oc}:function(){return mr(e)})},Fx=function(e,t,n){var r=n.d,s=n.d2,a=n.a;return(a=es(e,"getBoundingClientRect"))?function(){return a()[r]}:function(){return(t?dg(s):e["client"+s])||0}},Ox=function(e,t){return!t||~er.indexOf(e)?pg(e):function(){return oc}},Zi=function(e,t){var n=t.s,r=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+r)&&(a=es(e,n))?a()-pg(e)()[s]:Us(e)?(oi[n]||Mt[n])-dg(r):e[n]-e["offset"+r])},ml=function(e,t){for(var n=0;n<ga.length;n+=3)(!t||~t.indexOf(ga[n+1]))&&e(ga[n],ga[n+1],ga[n+2])},ri=function(e){return typeof e=="string"},Dn=function(e){return typeof e=="function"},So=function(e){return typeof e=="number"},_s=function(e){return typeof e=="object"},ja=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Zs=function(e,t,n){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);r&&r.totalTime&&(e.callbackAnimation=r)}},Js=Math.abs,mg="left",_g="top",jh="right",ed="bottom",Ds="width",Ls="height",Lo="Right",Io="Left",No="Top",Uo="Bottom",tn="padding",Ti="margin",Ha="Width",td="Height",on="px",Ei=function(e){return ct.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Bx=function(e){var t=Ei(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},pp=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},mr=function(e,t){var n=t&&Ei(e)[Pf]!=="matrix(1, 0, 0, 1, 0, 0)"&&Be.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),r},Pc=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},gg=function(e){var t=[],n=e.labels,r=e.duration(),s;for(s in n)t.push(n[s]/r);return t},zx=function(e){return function(t){return Be.utils.snap(gg(e),t)}},nd=function(e){var t=Be.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return n?function(r,s,a){a===void 0&&(a=.001);var o;if(!s)return t(r);if(s>0){for(r-=a,o=0;o<n.length;o++)if(n[o]>=r)return n[o];return n[o-1]}else for(o=n.length,r+=a;o--;)if(n[o]<=r)return n[o];return n[0]}:function(r,s,a){a===void 0&&(a=.001);var o=t(r);return!s||Math.abs(o-r)<a||o-r<0==s<0?o:t(s<0?r-e:r+e)}},kx=function(e){return function(t,n){return nd(gg(e))(t,n.direction)}},_l=function(e,t,n,r){return n.split(",").forEach(function(s){return e(t,s,r)})},mn=function(e,t,n,r,s){return e.addEventListener(t,n,{passive:!r,capture:!!s})},pn=function(e,t,n,r){return e.removeEventListener(t,n,!!r)},gl=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},mp={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},vl={toggleActions:"play",anticipatePin:0},Dc={top:0,left:0,center:.5,bottom:1,right:1},ic=function(e,t){if(ri(e)){var n=e.indexOf("="),r=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(r*=t/100),e=e.substr(0,n-1)),e=r+(e in Dc?Dc[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},xl=function(e,t,n,r,s,a,o,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,p=Tt.createElement("div"),g=Us(n)||es(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,_=g?Mt:n.tagName==="IFRAME"?n.contentDocument.body:n,M=e.indexOf("start")!==-1,w=M?c:u,S="border-color:"+w+";font-size:"+d+";color:"+w+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return S+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(S+=(r===ln?jh:ed)+":"+(a+parseFloat(f))+"px;"),o&&(S+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),p._isStart=M,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=S,p.innerText=t||t===0?e+"-"+t:e,_.children[0]?_.insertBefore(p,_.children[0]):_.appendChild(p),p._offset=p["offset"+r.op.d2],rc(p,0,r,M),p},rc=function(e,t,n,r){var s={display:"block"},a=n[r?"os2":"p2"],o=n[r?"p2":"os2"];e._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+a+Ha]=1,s["border"+o+Ha]=0,s[n.p]=t+"px",Be.set(e,s)},ot=[],Nf={},qo,_p=function(){return Rn()-Ri>34&&(qo||(qo=requestAnimationFrame(Sr)))},Qs=function(){(!zn||!zn.isPressed||zn.startX>Mt.clientWidth)&&(ut.cache++,zn?qo||(qo=requestAnimationFrame(Sr)):Sr(),Ri||Os("scrollStart"),Ri=Rn())},xu=function(){ug=ct.innerWidth,cg=ct.innerHeight},Mo=function(e){ut.cache++,(e===!0||!bn&&!lg&&!Tt.fullscreenElement&&!Tt.webkitFullscreenElement&&(!Df||ug!==ct.innerWidth||Math.abs(ct.innerHeight-cg)>ct.innerHeight*.25))&&Cc.restart(!0)},Fs={},Vx=[],vg=function i(){return pn(ft,"scrollEnd",i)||Es(!0)},Os=function(e){return Fs[e]&&Fs[e].map(function(t){return t()})||Vx},ii=[],xg=function(e){for(var t=0;t<ii.length;t+=5)(!e||ii[t+4]&&ii[t+4].query===e)&&(ii[t].style.cssText=ii[t+1],ii[t].getBBox&&ii[t].setAttribute("transform",ii[t+2]||""),ii[t+3].uncache=1)},Sg=function(){return ut.forEach(function(e){return Dn(e)&&++e.cacheID&&(e.rec=e())})},id=function(e,t){var n;for(kn=0;kn<ot.length;kn++)n=ot[kn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Do=!0,t&&xg(t),t||Os("revert")},Mg=function(e,t){ut.cache++,(t||!Vn)&&ut.forEach(function(n){return Dn(n)&&n.cacheID++&&(n.rec=0)}),ri(e)&&(ct.history.scrollRestoration=Jh=e)},Vn,Is=0,gp,Hx=function(){if(gp!==Is){var e=gp=Is;requestAnimationFrame(function(){return e===Is&&Es(!0)})}},yg=function(){Mt.appendChild(Ca),Qh=!zn&&Ca.offsetHeight||ct.innerHeight,Mt.removeChild(Ca)},vp=function(e){return Xo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Es=function(e,t){if(oi=Tt.documentElement,Mt=Tt.body,Zh=[ct,Tt,oi,Mt],Ri&&!e&&!Do){mn(ft,"scrollEnd",vg);return}yg(),Vn=ft.isRefreshing=!0,Do||Sg();var n=Os("refreshInit");og&&ft.sort(),t||id(),ut.forEach(function(r){Dn(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),ot.slice(0).forEach(function(r){return r.refresh()}),Do=!1,ot.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",a=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-a),r.refresh()}}),If=1,vp(!0),ot.forEach(function(r){var s=Zi(r.scroller,r._dir),a=r.vars.end==="max"||r._endClamp&&r.end>s,o=r._startClamp&&r.start>=s;(a||o)&&r.setPositions(o?s-1:r.start,a?Math.max(o?s:r.start+1,s):r.end,!0)}),vp(!1),If=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),ut.forEach(function(r){Dn(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),Mg(Jh,1),Cc.pause(),Is++,Vn=2,Sr(2),ot.forEach(function(r){return Dn(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Vn=ft.isRefreshing=!1,Os("refresh")},Uf=0,sc=1,Fo,Sr=function(e){if(e===2||!Vn&&!Do){ft.isUpdating=!0,Fo&&Fo.update(0);var t=ot.length,n=Rn(),r=n-vu>=50,s=t&&ot[0].scroll();if(sc=Uf>s?-1:1,Vn||(Uf=s),r&&(Ri&&!Wc&&n-Ri>200&&(Ri=0,Os("scrollEnd")),go=vu,vu=n),sc<0){for(kn=t;kn-- >0;)ot[kn]&&ot[kn].update(0,r);sc=1}else for(kn=0;kn<t;kn++)ot[kn]&&ot[kn].update(0,r);ft.isUpdating=!1}qo=0},Ff=[mg,_g,ed,jh,Ti+Uo,Ti+Lo,Ti+No,Ti+Io,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ac=Ff.concat([Ds,Ls,"boxSizing","max"+Ha,"max"+td,"position",Ti,tn,tn+No,tn+Lo,tn+Uo,tn+Io]),Gx=function(e,t,n){Pa(n);var r=e._gsap;if(r.spacerIsNative)Pa(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Su=function(e,t,n,r){if(!e._gsap.swappedIn){for(var s=Ff.length,a=t.style,o=e.style,l;s--;)l=Ff[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[ed]=o[jh]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[Ds]=Pc(e,Hn)+on,a[Ls]=Pc(e,ln)+on,a[tn]=o[Ti]=o[_g]=o[mg]="0",Pa(r),o[Ds]=o["max"+Ha]=n[Ds],o[Ls]=o["max"+td]=n[Ls],o[tn]=n[tn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Wx=/([A-Z])/g,Pa=function(e){if(e){var t=e.t.style,n=e.length,r=0,s,a;for((e.t._gsap||Be.core.getCache(e.t)).uncache=1;r<n;r+=2)a=e[r+1],s=e[r],a?t[s]=a:t[s]&&t.removeProperty(s.replace(Wx,"-$1").toLowerCase())}},Sl=function(e){for(var t=ac.length,n=e.style,r=[],s=0;s<t;s++)r.push(ac[s],n[ac[s]]);return r.t=e,r},Xx=function(e,t,n){for(var r=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],r.push(o,o in t?t[o]:e[a+1]);return r.t=e.t,r},oc={left:0,top:0},xp=function(e,t,n,r,s,a,o,l,c,u,d,f,h,p){Dn(e)&&(e=e(l)),ri(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?ic("0"+e.substr(3),n):0));var g=h?h.time():0,m,_,M;if(h&&h.seek(0),isNaN(e)||(e=+e),So(e))h&&(e=Be.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),o&&rc(o,n,r,!0);else{Dn(t)&&(t=t(l));var w=(e||"0").split(" "),S,y,T,b;M=Xn(t,l)||Mt,S=mr(M)||{},(!S||!S.left&&!S.top)&&Ei(M).display==="none"&&(b=M.style.display,M.style.display="block",S=mr(M),b?M.style.display=b:M.style.removeProperty("display")),y=ic(w[0],S[r.d]),T=ic(w[1]||"0",n),e=S[r.p]-c[r.p]-u+y+s-T,o&&rc(o,T,r,n-T<20||o._isStart&&T>20),n-=n-T}if(p&&(l[p]=e||-.001,e<0&&(e=0)),a){var x=e+n,A=a._isStart;m="scroll"+r.d2,rc(a,x,r,A&&x>20||!A&&(d?Math.max(Mt[m],oi[m]):a.parentNode[m])<=x+1),d&&(c=mr(o),d&&(a.style[r.op.p]=c[r.op.p]-r.op.m-a._offset+on))}return h&&M&&(m=mr(M),h.seek(f),_=mr(M),h._caScrollDist=m[r.p]-_[r.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},qx=/(webkit|moz|length|cssText|inset)/i,Sp=function(e,t,n,r){if(e.parentNode!==t){var s=e.style,a,o;if(t===Mt){e._stOrig=s.cssText,o=Ei(e);for(a in o)!+a&&!qx.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=r}else s.cssText=e._stOrig;Be.core.getCache(e).uncache=1,t.appendChild(e)}},Tg=function(e,t,n){var r=t,s=r;return function(a){var o=Math.round(e());return o!==r&&o!==s&&Math.abs(o-r)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=r,r=Math.round(a),r}},Ml=function(e,t,n){var r={};r[t.p]="+="+n,Be.set(e,r)},Mp=function(e,t){var n=ss(e,t),r="_scroll"+t.p2,s=function a(o,l,c,u,d){var f=a.tween,h=l.onComplete,p={};c=c||n();var g=Tg(n,c,function(){f.kill(),a.tween=0});return d=u&&d||0,u=u||o-c,f&&f.kill(),l[r]=o,l.inherit=!1,l.modifiers=p,p[r]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){ut.cache++,a.tween&&Sr()},l.onComplete=function(){a.tween=0,h&&h.call(f)},f=a.tween=Be.to(e,l),f};return e[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},mn(e,"wheel",n.wheelHandler),ft.isTouch&&mn(e,"touchmove",n.wheelHandler),s},ft=function(){function i(t,n){_a||i.register(Be)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Lf(this),this.init(t,n)}var e=i.prototype;return e.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!vo){this.update=this.refresh=this.kill=qi;return}n=pp(ri(n)||So(n)||n.nodeType?{trigger:n}:n,vl);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,p=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,_=s.onScrubComplete,M=s.onSnapComplete,w=s.once,S=s.snap,y=s.pinReparent,T=s.pinSpacer,b=s.containerAnimation,x=s.fastScrollEnd,A=s.preventOverlaps,C=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Hn:ln,D=!d&&d!==0,L=Xn(n.scroller||ct),q=Be.core.getCache(L),X=Us(L),N=("pinType"in n?n.pinType:es(L,"pinType")||X&&"fixed")==="fixed",H=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],U=D&&n.toggleActions.split(" "),Y="markers"in n?n.markers:vl.markers,B=X?0:parseFloat(Ei(L)["border"+C.p2+Ha])||0,P=this,ne=n.onRefreshInit&&function(){return n.onRefreshInit(P)},de=Fx(L,X,C),Ye=Ox(L,X),Ge=0,Fe=0,G=0,oe=ss(L,C),te,fe,Ce,Me,Ee,ue,Pe,Oe,be,V,qe,Ke,it,De,$e,I,Ze,ye,R,v,O,z,J,ce,le,Q,j,me,Ne,xe,_e,he,ze,Le,F,pe,ee,ge,Se;if(P._startClamp=P._endClamp=!1,P._dir=C,m*=45,P.scroller=L,P.scroll=b?b.time.bind(b):oe,Me=oe(),P.vars=n,r=r||n.animation,"refreshPriority"in n&&(og=1,n.refreshPriority===-9999&&(Fo=P)),q.tweenScroll=q.tweenScroll||{top:Mp(L,ln),left:Mp(L,Hn)},P.tweenTo=te=q.tweenScroll[C.p],P.scrubDuration=function(ie){ze=So(ie)&&ie,ze?he?he.duration(ie):he=Be.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ze,paused:!0,onComplete:function(){return _&&_(P)}}):(he&&he.progress(1).kill(),he=0)},r&&(r.vars.lazy=!1,r._initted&&!P.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),P.animation=r.pause(),r.scrollTrigger=P,P.scrubDuration(d),xe=0,l||(l=r.vars.id)),S&&((!_s(S)||S.push)&&(S={snapTo:S}),"scrollBehavior"in Mt.style&&Be.set(X?[Mt,oi]:L,{scrollBehavior:"auto"}),ut.forEach(function(ie){return Dn(ie)&&ie.target===(X?Tt.scrollingElement||oi:L)&&(ie.smooth=!1)}),Ce=Dn(S.snapTo)?S.snapTo:S.snapTo==="labels"?zx(r):S.snapTo==="labelsDirectional"?kx(r):S.directional!==!1?function(ie,Xe){return nd(S.snapTo)(ie,Rn()-Fe<500?0:Xe.direction)}:Be.utils.snap(S.snapTo),Le=S.duration||{min:.1,max:2},Le=_s(Le)?Po(Le.min,Le.max):Po(Le,Le),F=Be.delayedCall(S.delay||ze/2||.1,function(){var ie=oe(),Xe=Rn()-Fe<500,Ue=te.tween;if((Xe||Math.abs(P.getVelocity())<10)&&!Ue&&!Wc&&Ge!==ie){var et=(ie-ue)/De,Qt=r&&!D?r.totalProgress():et,lt=Xe?0:(Qt-_e)/(Rn()-go)*1e3||0,Nt=Be.utils.clamp(-et,1-et,Js(lt/2)*lt/.185),fn=et+(S.inertia===!1?0:Nt),Ut,At,dt=S,Nn=dt.onStart,Dt=dt.onInterrupt,Mn=dt.onComplete;if(Ut=Ce(fn,P),So(Ut)||(Ut=fn),At=Math.max(0,Math.round(ue+Ut*De)),ie<=Pe&&ie>=ue&&At!==ie){if(Ue&&!Ue._initted&&Ue.data<=Js(At-ie))return;S.inertia===!1&&(Nt=Ut-et),te(At,{duration:Le(Js(Math.max(Js(fn-Qt),Js(Ut-Qt))*.185/lt/.05||0)),ease:S.ease||"power3",data:Js(At-ie),onInterrupt:function(){return F.restart(!0)&&Dt&&Zs(P,Dt)},onComplete:function(){P.update(),Ge=oe(),r&&!D&&(he?he.resetTo("totalProgress",Ut,r._tTime/r._tDur):r.progress(Ut)),xe=_e=r&&!D?r.totalProgress():P.progress,M&&M(P),Mn&&Zs(P,Mn)}},ie,Nt*De,At-ie-Nt*De),Nn&&Zs(P,Nn,te.tween)}}else P.isActive&&Ge!==ie&&F.restart(!0)}).pause()),l&&(Nf[l]=P),f=P.trigger=Xn(f||h!==!0&&h),Se=f&&f._gsap&&f._gsap.stRevert,Se&&(Se=Se(P)),h=h===!0?f:Xn(h),ri(o)&&(o={targets:f,className:o}),h&&(p===!1||p===Ti||(p=!p&&h.parentNode&&h.parentNode.style&&Ei(h.parentNode).display==="flex"?!1:tn),P.pin=h,fe=Be.core.getCache(h),fe.spacer?$e=fe.pinState:(T&&(T=Xn(T),T&&!T.nodeType&&(T=T.current||T.nativeElement),fe.spacerIsNative=!!T,T&&(fe.spacerState=Sl(T))),fe.spacer=ye=T||Tt.createElement("div"),ye.classList.add("pin-spacer"),l&&ye.classList.add("pin-spacer-"+l),fe.pinState=$e=Sl(h)),n.force3D!==!1&&Be.set(h,{force3D:!0}),P.spacer=ye=fe.spacer,Ne=Ei(h),ce=Ne[p+C.os2],v=Be.getProperty(h),O=Be.quickSetter(h,C.a,on),Su(h,ye,Ne),Ze=Sl(h)),Y){Ke=_s(Y)?pp(Y,mp):mp,V=xl("scroller-start",l,L,C,Ke,0),qe=xl("scroller-end",l,L,C,Ke,0,V),R=V["offset"+C.op.d2];var ae=Xn(es(L,"content")||L);Oe=this.markerStart=xl("start",l,ae,C,Ke,R,0,b),be=this.markerEnd=xl("end",l,ae,C,Ke,R,0,b),b&&(ge=Be.quickSetter([Oe,be],C.a,on)),!N&&!(er.length&&es(L,"fixedMarkers")===!0)&&(Bx(X?Mt:L),Be.set([V,qe],{force3D:!0}),Q=Be.quickSetter(V,C.a,on),me=Be.quickSetter(qe,C.a,on))}if(b){var re=b.vars.onUpdate,se=b.vars.onUpdateParams;b.eventCallback("onUpdate",function(){P.update(0,0,1),re&&re.apply(b,se||[])})}if(P.previous=function(){return ot[ot.indexOf(P)-1]},P.next=function(){return ot[ot.indexOf(P)+1]},P.revert=function(ie,Xe){if(!Xe)return P.kill(!0);var Ue=ie!==!1||!P.enabled,et=bn;Ue!==P.isReverted&&(Ue&&(pe=Math.max(oe(),P.scroll.rec||0),G=P.progress,ee=r&&r.progress()),Oe&&[Oe,be,V,qe].forEach(function(Qt){return Qt.style.display=Ue?"none":"block"}),Ue&&(bn=P,P.update(Ue)),h&&(!y||!P.isActive)&&(Ue?Gx(h,ye,$e):Su(h,ye,Ei(h),le)),Ue||P.update(Ue),bn=et,P.isReverted=Ue)},P.refresh=function(ie,Xe,Ue,et){if(!((bn||!P.enabled)&&!Xe)){if(h&&ie&&Ri){mn(i,"scrollEnd",vg);return}!Vn&&ne&&ne(P),bn=P,te.tween&&!Ue&&(te.tween.kill(),te.tween=0),he&&he.pause(),g&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren?r.getChildren(!0,!0,!1).forEach(function(Ae){return Ae.vars.immediateRender&&Ae.render(0,!0,!0)}):r.vars.immediateRender&&r.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var Qt=de(),lt=Ye(),Nt=b?b.duration():Zi(L,C),fn=De<=.01||!De,Ut=0,At=et||0,dt=_s(Ue)?Ue.end:n.end,Nn=n.endTrigger||f,Dt=_s(Ue)?Ue.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Mn=P.pinnedContainer=n.pinnedContainer&&Xn(n.pinnedContainer,P),Un=f&&Math.max(0,ot.indexOf(P))||0,jt=Un,Gt,an,ki,Ws,hn,Yt,gi,E,k,K,W,$,Te;for(Y&&_s(Ue)&&($=Be.getProperty(V,C.p),Te=Be.getProperty(qe,C.p));jt-- >0;)Yt=ot[jt],Yt.end||Yt.refresh(0,1)||(bn=P),gi=Yt.pin,gi&&(gi===f||gi===h||gi===Mn)&&!Yt.isReverted&&(K||(K=[]),K.unshift(Yt),Yt.revert(!0,!0)),Yt!==ot[jt]&&(Un--,jt--);for(Dn(Dt)&&(Dt=Dt(P)),Dt=up(Dt,"start",P),ue=xp(Dt,f,Qt,C,oe(),Oe,V,P,lt,B,N,Nt,b,P._startClamp&&"_startClamp")||(h?-.001:0),Dn(dt)&&(dt=dt(P)),ri(dt)&&!dt.indexOf("+=")&&(~dt.indexOf(" ")?dt=(ri(Dt)?Dt.split(" ")[0]:"")+dt:(Ut=ic(dt.substr(2),Qt),dt=ri(Dt)?Dt:(b?Be.utils.mapRange(0,b.duration(),b.scrollTrigger.start,b.scrollTrigger.end,ue):ue)+Ut,Nn=f)),dt=up(dt,"end",P),Pe=Math.max(ue,xp(dt||(Nn?"100% 0":Nt),Nn,Qt,C,oe()+Ut,be,qe,P,lt,B,N,Nt,b,P._endClamp&&"_endClamp"))||-.001,Ut=0,jt=Un;jt--;)Yt=ot[jt]||{},gi=Yt.pin,gi&&Yt.start-Yt._pinPush<=ue&&!b&&Yt.end>0&&(Gt=Yt.end-(P._startClamp?Math.max(0,Yt.start):Yt.start),(gi===f&&Yt.start-Yt._pinPush<ue||gi===Mn)&&isNaN(Dt)&&(Ut+=Gt*(1-Yt.progress)),gi===h&&(At+=Gt));if(ue+=Ut,Pe+=Ut,P._startClamp&&(P._startClamp+=Ut),P._endClamp&&!Vn&&(P._endClamp=Pe||-.001,Pe=Math.min(Pe,Zi(L,C))),De=Pe-ue||(ue-=.01)&&.001,fn&&(G=Be.utils.clamp(0,1,Be.utils.normalize(ue,Pe,pe))),P._pinPush=At,Oe&&Ut&&(Gt={},Gt[C.a]="+="+Ut,Mn&&(Gt[C.p]="-="+oe()),Be.set([Oe,be],Gt)),h&&!(If&&P.end>=Zi(L,C)))Gt=Ei(h),Ws=C===ln,ki=oe(),z=parseFloat(v(C.a))+At,!Nt&&Pe>1&&(W=(X?Tt.scrollingElement||oi:L).style,W={style:W,value:W["overflow"+C.a.toUpperCase()]},X&&Ei(Mt)["overflow"+C.a.toUpperCase()]!=="scroll"&&(W.style["overflow"+C.a.toUpperCase()]="scroll")),Su(h,ye,Gt),Ze=Sl(h),an=mr(h,!0),E=N&&ss(L,Ws?Hn:ln)(),p?(le=[p+C.os2,De+At+on],le.t=ye,jt=p===tn?Pc(h,C)+De+At:0,jt&&(le.push(C.d,jt+on),ye.style.flexBasis!=="auto"&&(ye.style.flexBasis=jt+on)),Pa(le),Mn&&ot.forEach(function(Ae){Ae.pin===Mn&&Ae.vars.pinSpacing!==!1&&(Ae._subPinOffset=!0)}),N&&oe(pe)):(jt=Pc(h,C),jt&&ye.style.flexBasis!=="auto"&&(ye.style.flexBasis=jt+on)),N&&(hn={top:an.top+(Ws?ki-ue:E)+on,left:an.left+(Ws?E:ki-ue)+on,boxSizing:"border-box",position:"fixed"},hn[Ds]=hn["max"+Ha]=Math.ceil(an.width)+on,hn[Ls]=hn["max"+td]=Math.ceil(an.height)+on,hn[Ti]=hn[Ti+No]=hn[Ti+Lo]=hn[Ti+Uo]=hn[Ti+Io]="0",hn[tn]=Gt[tn],hn[tn+No]=Gt[tn+No],hn[tn+Lo]=Gt[tn+Lo],hn[tn+Uo]=Gt[tn+Uo],hn[tn+Io]=Gt[tn+Io],I=Xx($e,hn,y),Vn&&oe(0)),r?(k=r._initted,_u(1),r.render(r.duration(),!0,!0),J=v(C.a)-z+De+At,j=Math.abs(De-J)>1,N&&j&&I.splice(I.length-2,2),r.render(0,!0,!0),k||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),_u(0)):J=De,W&&(W.value?W.style["overflow"+C.a.toUpperCase()]=W.value:W.style.removeProperty("overflow-"+C.a));else if(f&&oe()&&!b)for(an=f.parentNode;an&&an!==Mt;)an._pinOffset&&(ue-=an._pinOffset,Pe-=an._pinOffset),an=an.parentNode;K&&K.forEach(function(Ae){return Ae.revert(!1,!0)}),P.start=ue,P.end=Pe,Me=Ee=Vn?pe:oe(),!b&&!Vn&&(Me<pe&&oe(pe),P.scroll.rec=0),P.revert(!1,!0),Fe=Rn(),F&&(Ge=-1,F.restart(!0)),bn=0,r&&D&&(r._initted||ee)&&r.progress()!==ee&&r.progress(ee||0,!0).render(r.time(),!0,!0),(fn||G!==P.progress||b||g||r&&!r._initted)&&(r&&!D&&(r._initted||G||r.vars.immediateRender!==!1)&&r.totalProgress(b&&ue<-.001&&!G?Be.utils.normalize(ue,Pe,0):G,!0),P.progress=fn||(Me-ue)/De===G?0:G),h&&p&&(ye._pinOffset=Math.round(P.progress*J)),he&&he.invalidate(),isNaN($)||($-=Be.getProperty(V,C.p),Te-=Be.getProperty(qe,C.p),Ml(V,C,$),Ml(Oe,C,$-(et||0)),Ml(qe,C,Te),Ml(be,C,Te-(et||0))),fn&&!Vn&&P.update(),u&&!Vn&&!it&&(it=!0,u(P),it=!1)}},P.getVelocity=function(){return(oe()-Ee)/(Rn()-go)*1e3||0},P.endAnimation=function(){ja(P.callbackAnimation),r&&(he?he.progress(1):r.paused()?D||ja(r,P.direction<0,1):ja(r,r.reversed()))},P.labelToScroll=function(ie){return r&&r.labels&&(ue||P.refresh()||ue)+r.labels[ie]/r.duration()*De||0},P.getTrailing=function(ie){var Xe=ot.indexOf(P),Ue=P.direction>0?ot.slice(0,Xe).reverse():ot.slice(Xe+1);return(ri(ie)?Ue.filter(function(et){return et.vars.preventOverlaps===ie}):Ue).filter(function(et){return P.direction>0?et.end<=ue:et.start>=Pe})},P.update=function(ie,Xe,Ue){if(!(b&&!Ue&&!ie)){var et=Vn===!0?pe:P.scroll(),Qt=ie?0:(et-ue)/De,lt=Qt<0?0:Qt>1?1:Qt||0,Nt=P.progress,fn,Ut,At,dt,Nn,Dt,Mn,Un;if(Xe&&(Ee=Me,Me=b?oe():et,S&&(_e=xe,xe=r&&!D?r.totalProgress():lt)),m&&h&&!bn&&!pl&&Ri&&(!lt&&ue<et+(et-Ee)/(Rn()-go)*m?lt=1e-4:lt===1&&Pe>et+(et-Ee)/(Rn()-go)*m&&(lt=.9999)),lt!==Nt&&P.enabled){if(fn=P.isActive=!!lt&&lt<1,Ut=!!Nt&&Nt<1,Dt=fn!==Ut,Nn=Dt||!!lt!=!!Nt,P.direction=lt>Nt?1:-1,P.progress=lt,Nn&&!bn&&(At=lt&&!Nt?0:lt===1?1:Nt===1?2:3,D&&(dt=!Dt&&U[At+1]!=="none"&&U[At+1]||U[At],Un=r&&(dt==="complete"||dt==="reset"||dt in r))),A&&(Dt||Un)&&(Un||d||!r)&&(Dn(A)?A(P):P.getTrailing(A).forEach(function(ki){return ki.endAnimation()})),D||(he&&!bn&&!pl?(he._dp._time-he._start!==he._time&&he.render(he._dp._time-he._start),he.resetTo?he.resetTo("totalProgress",lt,r._tTime/r._tDur):(he.vars.totalProgress=lt,he.invalidate().restart())):r&&r.totalProgress(lt,!!(bn&&(Fe||ie)))),h){if(ie&&p&&(ye.style[p+C.os2]=ce),!N)O(xo(z+J*lt));else if(Nn){if(Mn=!ie&&lt>Nt&&Pe+1>et&&et+1>=Zi(L,C),y)if(!ie&&(fn||Mn)){var jt=mr(h,!0),Gt=et-ue;Sp(h,Mt,jt.top+(C===ln?Gt:0)+on,jt.left+(C===ln?0:Gt)+on)}else Sp(h,ye);Pa(fn||Mn?I:Ze),j&&lt<1&&fn||O(z+(lt===1&&!Mn?J:0))}}S&&!te.tween&&!bn&&!pl&&F.restart(!0),o&&(Dt||w&&lt&&(lt<1||!gu))&&Xo(o.targets).forEach(function(ki){return ki.classList[fn||w?"add":"remove"](o.className)}),a&&!D&&!ie&&a(P),Nn&&!bn?(D&&(Un&&(dt==="complete"?r.pause().totalProgress(1):dt==="reset"?r.restart(!0).pause():dt==="restart"?r.restart(!0):r[dt]()),a&&a(P)),(Dt||!gu)&&(c&&Dt&&Zs(P,c),H[At]&&Zs(P,H[At]),w&&(lt===1?P.kill(!1,1):H[At]=0),Dt||(At=lt===1?1:3,H[At]&&Zs(P,H[At]))),x&&!fn&&Math.abs(P.getVelocity())>(So(x)?x:2500)&&(ja(P.callbackAnimation),he?he.progress(1):ja(r,dt==="reverse"?1:!lt,1))):D&&a&&!bn&&a(P)}if(me){var an=b?et/b.duration()*(b._caScrollDist||0):et;Q(an+(V._isFlipped?1:0)),me(an)}ge&&ge(-et/b.duration()*(b._caScrollDist||0))}},P.enable=function(ie,Xe){P.enabled||(P.enabled=!0,mn(L,"resize",Mo),X||mn(L,"scroll",Qs),ne&&mn(i,"refreshInit",ne),ie!==!1&&(P.progress=G=0,Me=Ee=Ge=oe()),Xe!==!1&&P.refresh())},P.getTween=function(ie){return ie&&te?te.tween:he},P.setPositions=function(ie,Xe,Ue,et){if(b){var Qt=b.scrollTrigger,lt=b.duration(),Nt=Qt.end-Qt.start;ie=Qt.start+Nt*ie/lt,Xe=Qt.start+Nt*Xe/lt}P.refresh(!1,!1,{start:fp(ie,Ue&&!!P._startClamp),end:fp(Xe,Ue&&!!P._endClamp)},et),P.update()},P.adjustPinSpacing=function(ie){if(le&&ie){var Xe=le.indexOf(C.d)+1;le[Xe]=parseFloat(le[Xe])+ie+on,le[1]=parseFloat(le[1])+ie+on,Pa(le)}},P.disable=function(ie,Xe){if(ie!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,Xe||he&&he.pause(),pe=0,fe&&(fe.uncache=1),ne&&pn(i,"refreshInit",ne),F&&(F.pause(),te.tween&&te.tween.kill()&&(te.tween=0)),!X)){for(var Ue=ot.length;Ue--;)if(ot[Ue].scroller===L&&ot[Ue]!==P)return;pn(L,"resize",Mo),X||pn(L,"scroll",Qs)}},P.kill=function(ie,Xe){P.disable(ie,Xe),he&&!Xe&&he.kill(),l&&delete Nf[l];var Ue=ot.indexOf(P);Ue>=0&&ot.splice(Ue,1),Ue===kn&&sc>0&&kn--,Ue=0,ot.forEach(function(et){return et.scroller===P.scroller&&(Ue=1)}),Ue||Vn||(P.scroll.rec=0),r&&(r.scrollTrigger=null,ie&&r.revert({kill:!1}),Xe||r.kill()),Oe&&[Oe,be,V,qe].forEach(function(et){return et.parentNode&&et.parentNode.removeChild(et)}),Fo===P&&(Fo=0),h&&(fe&&(fe.uncache=1),Ue=0,ot.forEach(function(et){return et.pin===h&&Ue++}),Ue||(fe.spacer=0)),n.onKill&&n.onKill(P)},ot.push(P),P.enable(!1,!1),Se&&Se(P),r&&r.add&&!De){var ve=P.update;P.update=function(){P.update=ve,ut.cache++,ue||Pe||P.refresh()},Be.delayedCall(.01,P.update),De=.01,ue=Pe=0}else P.refresh();h&&Hx()},i.register=function(n){return _a||(Be=n||hg(),fg()&&window.document&&i.enable(),_a=vo),_a},i.defaults=function(n){if(n)for(var r in n)vl[r]=n[r];return vl},i.disable=function(n,r){vo=0,ot.forEach(function(a){return a[r?"kill":"disable"](n)}),pn(ct,"wheel",Qs),pn(Tt,"scroll",Qs),clearInterval(dl),pn(Tt,"touchcancel",qi),pn(Mt,"touchstart",qi),_l(pn,Tt,"pointerdown,touchstart,mousedown",hp),_l(pn,Tt,"pointerup,touchend,mouseup",dp),Cc.kill(),ml(pn);for(var s=0;s<ut.length;s+=3)gl(pn,ut[s],ut[s+1]),gl(pn,ut[s],ut[s+2])},i.enable=function(){if(ct=window,Tt=document,oi=Tt.documentElement,Mt=Tt.body,Be){if(Xo=Be.utils.toArray,Po=Be.utils.clamp,Lf=Be.core.context||qi,_u=Be.core.suppressOverwrites||qi,Jh=ct.history.scrollRestoration||"auto",Uf=ct.pageYOffset||0,Be.core.globals("ScrollTrigger",i),Mt){vo=1,Ca=document.createElement("div"),Ca.style.height="100vh",Ca.style.position="absolute",yg(),Ux(),Jt.register(Be),i.isTouch=Jt.isTouch,Hr=Jt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Df=Jt.isTouch===1,mn(ct,"wheel",Qs),Zh=[ct,Tt,oi,Mt],Be.matchMedia?(i.matchMedia=function(u){var d=Be.matchMedia(),f;for(f in u)d.add(f,u[f]);return d},Be.addEventListener("matchMediaInit",function(){Sg(),id()}),Be.addEventListener("matchMediaRevert",function(){return xg()}),Be.addEventListener("matchMedia",function(){Es(0,1),Os("matchMedia")}),Be.matchMedia().add("(orientation: portrait)",function(){return xu(),xu})):console.warn("Requires GSAP 3.11.0 or later"),xu(),mn(Tt,"scroll",Qs);var n=Mt.hasAttribute("style"),r=Mt.style,s=r.borderTopStyle,a=Be.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",o=mr(Mt),ln.m=Math.round(o.top+ln.sc())||0,Hn.m=Math.round(o.left+Hn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(Mt.setAttribute("style",""),Mt.removeAttribute("style")),dl=setInterval(_p,250),Be.delayedCall(.5,function(){return pl=0}),mn(Tt,"touchcancel",qi),mn(Mt,"touchstart",qi),_l(mn,Tt,"pointerdown,touchstart,mousedown",hp),_l(mn,Tt,"pointerup,touchend,mouseup",dp),Pf=Be.utils.checkPrefix("transform"),ac.push(Pf),_a=Rn(),Cc=Be.delayedCall(.2,Es).pause(),ga=[Tt,"visibilitychange",function(){var u=ct.innerWidth,d=ct.innerHeight;Tt.hidden?(lp=u,cp=d):(lp!==u||cp!==d)&&Mo()},Tt,"DOMContentLoaded",Es,ct,"load",Es,ct,"resize",Mo],ml(mn),ot.forEach(function(u){return u.enable(0,1)}),l=0;l<ut.length;l+=3)gl(pn,ut[l],ut[l+1]),gl(pn,ut[l],ut[l+2])}else if(Tt){var c=function u(){i.enable(),Tt.removeEventListener("DOMContentLoaded",u)};Tt.addEventListener("DOMContentLoaded",c)}}},i.config=function(n){"limitCallbacks"in n&&(gu=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(dl)||(dl=r)&&setInterval(_p,r),"ignoreMobileResize"in n&&(Df=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ml(pn)||ml(mn,n.autoRefreshEvents||"none"),lg=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Xn(n),a=ut.indexOf(s),o=Us(s);~a&&ut.splice(a,o?6:2),r&&(o?er.unshift(ct,r,Mt,r,oi,r):er.unshift(s,r))},i.clearMatchMedia=function(n){ot.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var a=(ri(n)?Xn(n):n).getBoundingClientRect(),o=a[s?Ds:Ls]*r||0;return s?a.right-o>0&&a.left+o<ct.innerWidth:a.bottom-o>0&&a.top+o<ct.innerHeight},i.positionInViewport=function(n,r,s){ri(n)&&(n=Xn(n));var a=n.getBoundingClientRect(),o=a[s?Ds:Ls],l=r==null?o/2:r in Dc?Dc[r]*o:~r.indexOf("%")?parseFloat(r)*o/100:parseFloat(r)||0;return s?(a.left+l)/ct.innerWidth:(a.top+l)/ct.innerHeight},i.killAll=function(n){if(ot.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Fs.killAll||[];Fs={},r.forEach(function(s){return s()})}},i}();ft.version="3.15.0";ft.saveStyles=function(i){return i?Xo(i).forEach(function(e){if(e&&e.style){var t=ii.indexOf(e);t>=0&&ii.splice(t,5),ii.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Be.core.getCache(e),Lf())}}):ii};ft.revert=function(i,e){return id(!i,e)};ft.create=function(i,e){return new ft(i,e)};ft.refresh=function(i){return i?Mo(!0):(_a||ft.register())&&Es(!0)};ft.update=function(i){return++ut.cache&&Sr(i===!0?2:0)};ft.clearScrollMemory=Mg;ft.maxScroll=function(i,e){return Zi(i,e?Hn:ln)};ft.getScrollFunc=function(i,e){return ss(Xn(i),e?Hn:ln)};ft.getById=function(i){return Nf[i]};ft.getAll=function(){return ot.filter(function(i){return i.vars.id!=="ScrollSmoother"})};ft.isScrolling=function(){return!!Ri};ft.snapDirectional=nd;ft.addEventListener=function(i,e){var t=Fs[i]||(Fs[i]=[]);~t.indexOf(e)||t.push(e)};ft.removeEventListener=function(i,e){var t=Fs[i],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};ft.batch=function(i,e){var t=[],n={},r=e.interval||.016,s=e.batchMax||1e9,a=function(c,u){var d=[],f=[],h=Be.delayedCall(r,function(){u(d,f),d=[],f=[]}).pause();return function(p){d.length||h.restart(!0),d.push(p.trigger),f.push(p),s<=d.length&&h.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&Dn(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return Dn(s)&&(s=s(),mn(ft,"refresh",function(){return s=e.batchMax()})),Xo(i).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(ft.create(c))}),t};var yp=function(e,t,n,r){return t>r?e(r):t<0&&e(0),n>r?(r-t)/(n-t):n<0?t/(t-n):1},Mu=function i(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Jt.isTouch?" pinch-zoom":""):"none",e===oi&&i(Mt,t)},yl={auto:1,scroll:1},Yx=function(e){var t=e.event,n=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Be.core.getCache(s),o=Rn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==Mt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(yl[(l=Ei(s)).overflowY]||yl[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!Us(s)&&(yl[(l=Ei(s)).overflowY]||yl[l.overflowX]),a._isScrollT=o}(a._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Eg=function(e,t,n,r){return Jt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&Yx,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&mn(Tt,Jt.eventTypes[0],Ep,!1,!0)},onDisable:function(){return pn(Tt,Jt.eventTypes[0],Ep,!0)}})},$x=/(input|label|select|textarea)/i,Tp,Ep=function(e){var t=$x.test(e.target.tagName);(t||Tp)&&(e._gsapAllow=!0,Tp=t)},Kx=function(e){_s(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=Xn(e.target)||oi,u=Be.core.globals().ScrollSmoother,d=u&&u.get(),f=Hr&&(e.content&&Xn(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=ss(c,ln),p=ss(c,Hn),g=1,m=(Jt.isTouch&&ct.visualViewport?ct.visualViewport.scale*ct.visualViewport.width:ct.outerWidth)/ct.innerWidth,_=0,M=Dn(r)?function(){return r(o)}:function(){return r||2.8},w,S,y=Eg(c,e.type,!0,s),T=function(){return S=!1},b=qi,x=qi,A=function(){l=Zi(c,ln),x=Po(Hr?1:0,l),n&&(b=Po(0,Zi(c,Hn))),w=Is},C=function(){f._gsap.y=xo(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},D=function(){if(S){requestAnimationFrame(T);var Y=xo(o.deltaY/2),B=x(h.v-Y);if(f&&B!==h.v+h.offset){h.offset=B-h.v;var P=xo((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",f._gsap.y=P+"px",h.cacheID=ut.cache,Sr()}return!0}h.offset&&C(),S=!0},L,q,X,N,H=function(){A(),L.isActive()&&L.vars.scrollY>l&&(h()>l?L.progress(1)&&h(l):L.resetTo("scrollY",l))};return f&&Be.set(f,{y:"+=0"}),e.ignoreCheck=function(U){return Hr&&U.type==="touchmove"&&D()||g>1.05&&U.type!=="touchstart"||o.isGesturing||U.touches&&U.touches.length>1},e.onPress=function(){S=!1;var U=g;g=xo((ct.visualViewport&&ct.visualViewport.scale||1)/m),L.pause(),U!==g&&Mu(c,g>1.01?!0:n?!1:"x"),q=p(),X=h(),A(),w=Is},e.onRelease=e.onGestureStart=function(U,Y){if(h.offset&&C(),!Y)N.restart(!0);else{ut.cache++;var B=M(),P,ne;n&&(P=p(),ne=P+B*.05*-U.velocityX/.227,B*=yp(p,P,ne,Zi(c,Hn)),L.vars.scrollX=b(ne)),P=h(),ne=P+B*.05*-U.velocityY/.227,B*=yp(h,P,ne,Zi(c,ln)),L.vars.scrollY=x(ne),L.invalidate().duration(B).play(.01),(Hr&&L.vars.scrollY>=l||P>=l-1)&&Be.to({},{onUpdate:H,duration:B})}a&&a(U)},e.onWheel=function(){L._ts&&L.pause(),Rn()-_>1e3&&(w=0,_=Rn())},e.onChange=function(U,Y,B,P,ne){if(Is!==w&&A(),Y&&n&&p(b(P[2]===Y?q+(U.startX-U.x):p()+Y-P[1])),B){h.offset&&C();var de=ne[2]===B,Ye=de?X+U.startY-U.y:h()+B-ne[1],Ge=x(Ye);de&&Ye!==Ge&&(X+=Ge-Ye),h(Ge)}(B||Y)&&Sr()},e.onEnable=function(){Mu(c,n?!1:"x"),ft.addEventListener("refresh",H),mn(ct,"resize",H),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=p.smooth=!1),y.enable()},e.onDisable=function(){Mu(c,!0),pn(ct,"resize",H),ft.removeEventListener("refresh",H),y.kill()},e.lockAxis=e.lockAxis!==!1,o=new Jt(e),o.iOS=Hr,Hr&&!h()&&h(1),Hr&&Be.ticker.add(qi),N=o._dc,L=Be.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Tg(h,h(),function(){return L.pause()})},onUpdate:Sr,onComplete:N.vars.onComplete}),o};ft.sort=function(i){if(Dn(i))return ot.sort(i);var e=ct.pageYOffset||0;return ft.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ct.innerHeight}),ot.sort(i||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ft.observe=function(i){return new Jt(i)};ft.normalizeScroll=function(i){if(typeof i>"u")return zn;if(i===!0&&zn)return zn.enable();if(i===!1){zn&&zn.kill(),zn=i;return}var e=i instanceof Jt?i:Kx(i);return zn&&zn.target===e.target&&zn.kill(),Us(e.target)&&(zn=e),e};ft.core={_getVelocityProp:Cf,_inputObserver:Eg,_scrollers:ut,_proxies:er,bridge:{ss:function(){Ri||Os("scrollStart"),Ri=Rn()},ref:function(){return bn}}};hg()&&Be.registerPlugin(ft);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rd="185",Zx=0,bp=1,Jx=2,lc=1,Qx=2,yo=3,as=0,Qn=1,_r=2,Mr=0,Da=1,Ap=2,wp=3,Rp=4,jx=5,xs=100,eS=101,tS=102,nS=103,iS=104,rS=200,sS=201,aS=202,oS=203,Of=204,Bf=205,lS=206,cS=207,uS=208,fS=209,hS=210,dS=211,pS=212,mS=213,_S=214,zf=0,kf=1,Vf=2,Ga=3,Hf=4,Gf=5,Wf=6,Xf=7,bg=0,gS=1,vS=2,tr=0,Ag=1,wg=2,Rg=3,Cg=4,Pg=5,Dg=6,Lg=7,Ig=300,Bs=301,Wa=302,yu=303,Tu=304,Xc=306,qf=1e3,vr=1001,Yf=1002,xn=1003,xS=1004,Tl=1005,Ln=1006,Eu=1007,bs=1008,bi=1009,Ng=1010,Ug=1011,Yo=1012,sd=1013,sr=1014,Ji=1015,wr=1016,ad=1017,od=1018,$o=1020,Fg=35902,Og=35899,Bg=1021,zg=1022,Bi=1023,Rr=1026,As=1027,kg=1028,ld=1029,zs=1030,cd=1031,ud=1033,cc=33776,uc=33777,fc=33778,hc=33779,$f=35840,Kf=35841,Zf=35842,Jf=35843,Qf=36196,jf=37492,eh=37496,th=37488,nh=37489,Lc=37490,ih=37491,rh=37808,sh=37809,ah=37810,oh=37811,lh=37812,ch=37813,uh=37814,fh=37815,hh=37816,dh=37817,ph=37818,mh=37819,_h=37820,gh=37821,vh=36492,xh=36494,Sh=36495,Mh=36283,yh=36284,Ic=36285,Th=36286,SS=3200,Cp=0,MS=1,Gr="",yi="srgb",Nc="srgb-linear",Uc="linear",Et="srgb",js=7680,Pp=519,yS=512,TS=513,ES=514,fd=515,bS=516,AS=517,hd=518,wS=519,Dp=35044,Lp="300 es",Qi=2e3,Fc=2001;function RS(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Oc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function CS(){const i=Oc("canvas");return i.style.display="block",i}const Ip={};function Np(...i){const e="THREE."+i.shift();console.log(e,...i)}function Vg(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Je(...i){i=Vg(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Vg(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function La(...i){const e=i.join(" ");e in Ip||(Ip[e]=!0,Je(...i))}function PS(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const DS={[zf]:kf,[Vf]:Wf,[Hf]:Xf,[Ga]:Gf,[kf]:zf,[Wf]:Vf,[Xf]:Hf,[Gf]:Ga};class Gs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],bu=Math.PI/180,Eh=180/Math.PI;function Zo(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tn[i&255]+Tn[i>>8&255]+Tn[i>>16&255]+Tn[i>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[t&63|128]+Tn[t>>8&255]+"-"+Tn[t>>16&255]+Tn[t>>24&255]+Tn[n&255]+Tn[n>>8&255]+Tn[n>>16&255]+Tn[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function LS(i,e){return(i%e+e)%e}function Au(i,e,t){return(1-t)*i+t*e}function eo(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const _d=class _d{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};_d.prototype.isVector2=!0;let xt=_d;class Ya{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],f=s[a+0],h=s[a+1],p=s[a+2],g=s[a+3];if(d!==g||l!==f||c!==h||u!==p){let m=l*f+c*h+u*p+d*g;m<0&&(f=-f,h=-h,p=-p,g=-g,m=-m);let _=1-o;if(m<.9995){const M=Math.acos(m),w=Math.sin(M);_=Math.sin(_*M)/w,o=Math.sin(o*M)/w,l=l*_+f*o,c=c*_+h*o,u=u*_+p*o,d=d*_+g*o}else{l=l*_+f*o,c=c*_+h*o,u=u*_+p*o,d=d*_+g*o;const M=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=M,c*=M,u*=M,d*=M}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[a],f=s[a+1],h=s[a+2],p=s[a+3];return e[t]=o*p+u*d+l*h-c*f,e[t+1]=l*p+u*f+c*d-o*h,e[t+2]=c*p+u*h+o*f-l*d,e[t+3]=u*p-o*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),d=o(s/2),f=l(n/2),h=l(r/2),p=l(s/2);switch(a){case"XYZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"YXZ":this._x=f*u*d+c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"ZXY":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d-f*h*p;break;case"ZYX":this._x=f*u*d-c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d+f*h*p;break;case"YZX":this._x=f*u*d+c*h*p,this._y=c*h*d+f*u*p,this._z=c*u*p-f*h*d,this._w=c*u*d-f*h*p;break;case"XZY":this._x=f*u*d-c*h*p,this._y=c*h*d-f*u*p,this._z=c*u*p+f*h*d,this._w=c*u*d+f*h*p;break;default:Je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(a-r)*h}else if(n>o&&n>d){const h=2*Math.sqrt(1+n-o-d);this._w=(u-l)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+c)/h}else if(o>d){const h=2*Math.sqrt(1+o-n-d);this._w=(s-c)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-o);this._w=(a-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const gd=class gd{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Up.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Up.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*u,this.y=n+l*u+o*c-s*d,this.z=r+l*d+s*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wu.copy(this).projectOnVector(e),this.sub(wu)}reflect(e){return this.sub(wu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};gd.prototype.isVector3=!0;let Z=gd;const wu=new Z,Up=new Ya,vd=class vd{constructor(e,t,n,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c)}set(e,t,n,r,s,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],p=n[8],g=r[0],m=r[3],_=r[6],M=r[1],w=r[4],S=r[7],y=r[2],T=r[5],b=r[8];return s[0]=a*g+o*M+l*y,s[3]=a*m+o*w+l*T,s[6]=a*_+o*S+l*b,s[1]=c*g+u*M+d*y,s[4]=c*m+u*w+d*T,s[7]=c*_+u*S+d*b,s[2]=f*g+h*M+p*y,s[5]=f*m+h*w+p*T,s[8]=f*_+h*S+p*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,f=o*l-u*s,h=c*s-a*l,p=t*d+n*f+r*h;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/p;return e[0]=d*g,e[1]=(r*c-u*n)*g,e[2]=(o*n-r*a)*g,e[3]=f*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-o*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(a*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return La("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ru.makeScale(e,t)),this}rotate(e){return La("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ru.makeRotation(-e)),this}translate(e,t){return La("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ru.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};vd.prototype.isMatrix3=!0;let tt=vd;const Ru=new tt,Fp=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Op=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function IS(){const i={enabled:!0,workingColorSpace:Nc,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Et&&(r.r=yr(r.r),r.g=yr(r.g),r.b=yr(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Et&&(r.r=Ia(r.r),r.g=Ia(r.g),r.b=Ia(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Gr?Uc:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return La("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return La("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Nc]:{primaries:e,whitePoint:n,transfer:Uc,toXYZ:Fp,fromXYZ:Op,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:Fp,fromXYZ:Op,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}}),i}const pt=IS();function yr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ia(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ea;class NS{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ea===void 0&&(ea=Oc("canvas")),ea.width=e.width,ea.height=e.height;const r=ea.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=ea}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Oc("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=yr(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(yr(t[n]/255)*255):t[n]=yr(t[n]);return{data:t,width:e.width,height:e.height}}else return Je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let US=0;class dd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:US++}),this.uuid=Zo(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Cu(r[a].image)):s.push(Cu(r[a]))}else s=Cu(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Cu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?NS.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Je("Texture: Unable to serialize Texture."),{})}let FS=0;const Pu=new Z;class Gn extends Gs{constructor(e=Gn.DEFAULT_IMAGE,t=Gn.DEFAULT_MAPPING,n=vr,r=vr,s=Ln,a=bs,o=Bi,l=bi,c=Gn.DEFAULT_ANISOTROPY,u=Gr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:FS++}),this.uuid=Zo(),this.name="",this.source=new dd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Pu).x}get height(){return this.source.getSize(Pu).y}get depth(){return this.source.getSize(Pu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Je(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ig)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qf:e.x=e.x-Math.floor(e.x);break;case vr:e.x=e.x<0?0:1;break;case Yf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qf:e.y=e.y-Math.floor(e.y);break;case vr:e.y=e.y<0?0:1;break;case Yf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=Ig;Gn.DEFAULT_ANISOTROPY=1;const xd=class xd{constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],p=l[9],g=l[2],m=l[6],_=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(p-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(p+m)<.1&&Math.abs(c+h+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,S=(h+1)/2,y=(_+1)/2,T=(u+f)/4,b=(d+g)/4,x=(p+m)/4;return w>S&&w>y?w<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(w),r=T/n,s=b/n):S>y?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=T/r,s=x/r):y<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(y),n=b/s,r=x/s),this.set(n,r,s,t),this}let M=Math.sqrt((m-p)*(m-p)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-p)/M,this.y=(d-g)/M,this.z=(f-u)/M,this.w=Math.acos((c+h+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};xd.prototype.isVector4=!0;let Xt=xd;class OS extends Gs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Xt(0,0,e,t),this.scissorTest=!1,this.viewport=new Xt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Gn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ln,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new dd(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nr extends OS{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Hg extends Gn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=xn,this.minFilter=xn,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class BS extends Gn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=xn,this.minFilter=xn,this.wrapR=vr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bc=class Bc{constructor(e,t,n,r,s,a,o,l,c,u,d,f,h,p,g,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,l,c,u,d,f,h,p,g,m)}set(e,t,n,r,s,a,o,l,c,u,d,f,h,p,g,m){const _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=r,_[1]=s,_[5]=a,_[9]=o,_[13]=l,_[2]=c,_[6]=u,_[10]=d,_[14]=f,_[3]=h,_[7]=p,_[11]=g,_[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bc().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/ta.setFromMatrixColumn(e,0).length(),s=1/ta.setFromMatrixColumn(e,1).length(),a=1/ta.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,h=a*d,p=o*u,g=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+p*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=p+h*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,p=c*u,g=c*d;t[0]=f+g*o,t[4]=p*o-h,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=h*o-p,t[6]=g+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,p=c*u,g=c*d;t[0]=f-g*o,t[4]=-a*d,t[8]=p+h*o,t[1]=h+p*o,t[5]=a*u,t[9]=g-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*u,h=a*d,p=o*u,g=o*d;t[0]=l*u,t[4]=p*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,h=a*c,p=o*l,g=o*c;t[0]=l*u,t[4]=g-f*d,t[8]=p*d+h,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=h*d+p,t[10]=f-g*d}else if(e.order==="XZY"){const f=a*l,h=a*c,p=o*l,g=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=a*u,t[9]=h*d-p,t[2]=p*d-h,t[6]=o*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zS,e,kS)}lookAt(e,t,n){const r=this.elements;return ti.subVectors(e,t),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),Fr.crossVectors(n,ti),Fr.lengthSq()===0&&(Math.abs(n.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),Fr.crossVectors(n,ti)),Fr.normalize(),El.crossVectors(ti,Fr),r[0]=Fr.x,r[4]=El.x,r[8]=ti.x,r[1]=Fr.y,r[5]=El.y,r[9]=ti.y,r[2]=Fr.z,r[6]=El.z,r[10]=ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],p=n[2],g=n[6],m=n[10],_=n[14],M=n[3],w=n[7],S=n[11],y=n[15],T=r[0],b=r[4],x=r[8],A=r[12],C=r[1],D=r[5],L=r[9],q=r[13],X=r[2],N=r[6],H=r[10],U=r[14],Y=r[3],B=r[7],P=r[11],ne=r[15];return s[0]=a*T+o*C+l*X+c*Y,s[4]=a*b+o*D+l*N+c*B,s[8]=a*x+o*L+l*H+c*P,s[12]=a*A+o*q+l*U+c*ne,s[1]=u*T+d*C+f*X+h*Y,s[5]=u*b+d*D+f*N+h*B,s[9]=u*x+d*L+f*H+h*P,s[13]=u*A+d*q+f*U+h*ne,s[2]=p*T+g*C+m*X+_*Y,s[6]=p*b+g*D+m*N+_*B,s[10]=p*x+g*L+m*H+_*P,s[14]=p*A+g*q+m*U+_*ne,s[3]=M*T+w*C+S*X+y*Y,s[7]=M*b+w*D+S*N+y*B,s[11]=M*x+w*L+S*H+y*P,s[15]=M*A+w*q+S*U+y*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],p=e[3],g=e[7],m=e[11],_=e[15],M=l*h-c*f,w=o*h-c*d,S=o*f-l*d,y=a*h-c*u,T=a*f-l*u,b=a*d-o*u;return t*(g*M-m*w+_*S)-n*(p*M-m*y+_*T)+r*(p*w-g*y+_*b)-s*(p*S-g*T+m*b)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(s*u-o*l)+r*(s*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],p=e[12],g=e[13],m=e[14],_=e[15],M=t*o-n*a,w=t*l-r*a,S=t*c-s*a,y=n*l-r*o,T=n*c-s*o,b=r*c-s*l,x=u*g-d*p,A=u*m-f*p,C=u*_-h*p,D=d*m-f*g,L=d*_-h*g,q=f*_-h*m,X=M*q-w*L+S*D+y*C-T*A+b*x;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/X;return e[0]=(o*q-l*L+c*D)*N,e[1]=(r*L-n*q-s*D)*N,e[2]=(g*b-m*T+_*y)*N,e[3]=(f*T-d*b-h*y)*N,e[4]=(l*C-a*q-c*A)*N,e[5]=(t*q-r*C+s*A)*N,e[6]=(m*S-p*b-_*w)*N,e[7]=(u*b-f*S+h*w)*N,e[8]=(a*L-o*C+c*x)*N,e[9]=(n*C-t*L-s*x)*N,e[10]=(p*T-g*S+_*M)*N,e[11]=(d*S-u*T-h*M)*N,e[12]=(o*A-a*D-l*x)*N,e[13]=(t*D-n*A+r*x)*N,e[14]=(g*w-p*y-m*M)*N,e[15]=(u*y-d*w+f*M)*N,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,u=a+a,d=o+o,f=s*c,h=s*u,p=s*d,g=a*u,m=a*d,_=o*d,M=l*c,w=l*u,S=l*d,y=n.x,T=n.y,b=n.z;return r[0]=(1-(g+_))*y,r[1]=(h+S)*y,r[2]=(p-w)*y,r[3]=0,r[4]=(h-S)*T,r[5]=(1-(f+_))*T,r[6]=(m+M)*T,r[7]=0,r[8]=(p+w)*b,r[9]=(m-M)*b,r[10]=(1-(f+g))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=ta.set(r[0],r[1],r[2]).length();const o=ta.set(r[4],r[5],r[6]).length(),l=ta.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Ci.copy(this);const c=1/a,u=1/o,d=1/l;return Ci.elements[0]*=c,Ci.elements[1]*=c,Ci.elements[2]*=c,Ci.elements[4]*=u,Ci.elements[5]*=u,Ci.elements[6]*=u,Ci.elements[8]*=d,Ci.elements[9]*=d,Ci.elements[10]*=d,t.setFromRotationMatrix(Ci),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,s,a,o=Qi,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-r),f=(t+e)/(t-e),h=(n+r)/(n-r);let p,g;if(l)p=s/(a-s),g=a*s/(a-s);else if(o===Qi)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===Fc)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Qi,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),h=-(n+r)/(n-r);let p,g;if(l)p=1/(a-s),g=a/(a-s);else if(o===Qi)p=-2/(a-s),g=-(a+s)/(a-s);else if(o===Fc)p=-1/(a-s),g=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Bc.prototype.isMatrix4=!0;let sn=Bc;const ta=new Z,Ci=new sn,zS=new Z(0,0,0),kS=new Z(1,1,1),Fr=new Z,El=new Z,ti=new Z,Bp=new sn,zp=new Ya;class ks{constructor(e=0,t=0,n=0,r=ks.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(mt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:Je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zp.setFromEuler(this),this.setFromQuaternion(zp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ks.DEFAULT_ORDER="XYZ";class Gg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let VS=0;const kp=new Z,na=new Ya,lr=new sn,bl=new Z,to=new Z,HS=new Z,GS=new Ya,Vp=new Z(1,0,0),Hp=new Z(0,1,0),Gp=new Z(0,0,1),Wp={type:"added"},WS={type:"removed"},ia={type:"childadded",child:null},Du={type:"childremoved",child:null};class pi extends Gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:VS++}),this.uuid=Zo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pi.DEFAULT_UP.clone();const e=new Z,t=new ks,n=new Ya,r=new Z(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new sn},normalMatrix:{value:new tt}}),this.matrix=new sn,this.matrixWorld=new sn,this.matrixAutoUpdate=pi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return na.setFromAxisAngle(e,t),this.quaternion.multiply(na),this}rotateOnWorldAxis(e,t){return na.setFromAxisAngle(e,t),this.quaternion.premultiply(na),this}rotateX(e){return this.rotateOnAxis(Vp,e)}rotateY(e){return this.rotateOnAxis(Hp,e)}rotateZ(e){return this.rotateOnAxis(Gp,e)}translateOnAxis(e,t){return kp.copy(e).applyQuaternion(this.quaternion),this.position.add(kp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vp,e)}translateY(e){return this.translateOnAxis(Hp,e)}translateZ(e){return this.translateOnAxis(Gp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(lr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bl.copy(e):bl.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),to.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?lr.lookAt(to,bl,this.up):lr.lookAt(bl,to,this.up),this.quaternion.setFromRotationMatrix(lr),r&&(lr.extractRotation(r.matrixWorld),na.setFromRotationMatrix(lr),this.quaternion.premultiply(na.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wp),ia.child=e,this.dispatchEvent(ia),ia.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(WS),Du.child=e,this.dispatchEvent(Du),Du.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),lr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),lr.multiply(e.parent.matrixWorld)),e.applyMatrix4(lr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wp),ia.child=e,this.dispatchEvent(ia),ia.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,e,HS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,GS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),h=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),p.length>0&&(n.nodes=p)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}pi.DEFAULT_UP=new Z(0,1,0);pi.DEFAULT_MATRIX_AUTO_UPDATE=!0;pi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Al extends pi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XS={type:"move"};class Lu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Al,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Al,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Al,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),_=this._getHandJoint(c,g);m!==null&&(_.matrix.fromArray(m.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=m.radius),_.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,p=.005;c.inputState.pinching&&f>h+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(XS)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Al;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Wg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Or={h:0,s:0,l:0},wl={h:0,s:0,l:0};function Iu(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class yt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=pt.workingColorSpace){if(e=LS(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Iu(a,s,e+1/3),this.g=Iu(a,s,e),this.b=Iu(a,s,e-1/3)}return pt.colorSpaceToWorking(this,r),this}setStyle(e,t=yi){function n(s){s!==void 0&&parseFloat(s)<1&&Je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yi){const n=Wg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yr(e.r),this.g=yr(e.g),this.b=yr(e.b),this}copyLinearToSRGB(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yi){return pt.workingToColorSpace(En.copy(this),e),Math.round(mt(En.r*255,0,255))*65536+Math.round(mt(En.g*255,0,255))*256+Math.round(mt(En.b*255,0,255))}getHexString(e=yi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(En.copy(this),t);const n=En.r,r=En.g,s=En.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=yi){pt.workingToColorSpace(En.copy(this),e);const t=En.r,n=En.g,r=En.b;return e!==yi?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Or),this.setHSL(Or.h+e,Or.s+t,Or.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Or),e.getHSL(wl);const n=Au(Or.h,wl.h,t),r=Au(Or.s,wl.s,t),s=Au(Or.l,wl.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const En=new yt;yt.NAMES=Wg;class qS extends pi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ks,this.environmentIntensity=1,this.environmentRotation=new ks,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Pi=new Z,cr=new Z,Nu=new Z,ur=new Z,ra=new Z,sa=new Z,Xp=new Z,Uu=new Z,Fu=new Z,Ou=new Z,Bu=new Xt,zu=new Xt,ku=new Xt;class Oi{constructor(e=new Z,t=new Z,n=new Z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pi.subVectors(e,t),r.cross(Pi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Pi.subVectors(r,t),cr.subVectors(n,t),Nu.subVectors(e,t);const a=Pi.dot(Pi),o=Pi.dot(cr),l=Pi.dot(Nu),c=cr.dot(cr),u=cr.dot(Nu),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-o*u)*f,p=(a*u-o*l)*f;return s.set(1-h-p,p,h)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ur)===null?!1:ur.x>=0&&ur.y>=0&&ur.x+ur.y<=1}static getInterpolation(e,t,n,r,s,a,o,l){return this.getBarycoord(e,t,n,r,ur)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ur.x),l.addScaledVector(a,ur.y),l.addScaledVector(o,ur.z),l)}static getInterpolatedAttribute(e,t,n,r,s,a){return Bu.setScalar(0),zu.setScalar(0),ku.setScalar(0),Bu.fromBufferAttribute(e,t),zu.fromBufferAttribute(e,n),ku.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Bu,s.x),a.addScaledVector(zu,s.y),a.addScaledVector(ku,s.z),a}static isFrontFacing(e,t,n,r){return Pi.subVectors(n,t),cr.subVectors(e,t),Pi.cross(cr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pi.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),Pi.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Oi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Oi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Oi.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Oi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Oi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;ra.subVectors(r,n),sa.subVectors(s,n),Uu.subVectors(e,n);const l=ra.dot(Uu),c=sa.dot(Uu);if(l<=0&&c<=0)return t.copy(n);Fu.subVectors(e,r);const u=ra.dot(Fu),d=sa.dot(Fu);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(ra,a);Ou.subVectors(e,s);const h=ra.dot(Ou),p=sa.dot(Ou);if(p>=0&&h<=p)return t.copy(s);const g=h*c-l*p;if(g<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(sa,o);const m=u*p-h*d;if(m<=0&&d-u>=0&&h-p>=0)return Xp.subVectors(s,r),o=(d-u)/(d-u+(h-p)),t.copy(r).addScaledVector(Xp,o);const _=1/(m+g+f);return a=g*_,o=f*_,t.copy(n).addScaledVector(ra,a).addScaledVector(sa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jo{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Di):Di.fromBufferAttribute(s,a),Di.applyMatrix4(e.matrixWorld),this.expandByPoint(Di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Rl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Rl.copy(n.boundingBox)),Rl.applyMatrix4(e.matrixWorld),this.union(Rl)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Di),Di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(no),Cl.subVectors(this.max,no),aa.subVectors(e.a,no),oa.subVectors(e.b,no),la.subVectors(e.c,no),Br.subVectors(oa,aa),zr.subVectors(la,oa),us.subVectors(aa,la);let t=[0,-Br.z,Br.y,0,-zr.z,zr.y,0,-us.z,us.y,Br.z,0,-Br.x,zr.z,0,-zr.x,us.z,0,-us.x,-Br.y,Br.x,0,-zr.y,zr.x,0,-us.y,us.x,0];return!Vu(t,aa,oa,la,Cl)||(t=[1,0,0,0,1,0,0,0,1],!Vu(t,aa,oa,la,Cl))?!1:(Pl.crossVectors(Br,zr),t=[Pl.x,Pl.y,Pl.z],Vu(t,aa,oa,la,Cl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fr=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Di=new Z,Rl=new Jo,aa=new Z,oa=new Z,la=new Z,Br=new Z,zr=new Z,us=new Z,no=new Z,Cl=new Z,Pl=new Z,fs=new Z;function Vu(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){fs.fromArray(i,s);const o=r.x*Math.abs(fs.x)+r.y*Math.abs(fs.y)+r.z*Math.abs(fs.z),l=e.dot(fs),c=t.dot(fs),u=n.dot(fs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const en=new Z,Dl=new xt;let YS=0;class ir extends Gs{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:YS++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Dp,this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dl.fromBufferAttribute(this,t),Dl.applyMatrix3(e),this.setXY(t,Dl.x,Dl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=eo(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Wn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=eo(t,this.array)),t}setX(e,t){return this.normalized&&(t=Wn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=eo(t,this.array)),t}setY(e,t){return this.normalized&&(t=Wn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=eo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Wn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=eo(t,this.array)),t}setW(e,t){return this.normalized&&(t=Wn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Wn(t,this.array),n=Wn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Wn(t,this.array),n=Wn(n,this.array),r=Wn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Wn(t,this.array),n=Wn(n,this.array),r=Wn(r,this.array),s=Wn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Dp&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Xg extends ir{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class qg extends ir{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Tr extends ir{constructor(e,t,n){super(new Float32Array(e),t,n)}}const $S=new Jo,io=new Z,Hu=new Z;class pd{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$S.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;io.subVectors(e,this.center);const t=io.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(io,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(io.copy(e.center).add(Hu)),this.expandByPoint(io.copy(e.center).sub(Hu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let KS=0;const xi=new sn,Gu=new pi,ca=new Z,ni=new Jo,ro=new Jo,dn=new Z;class Pr extends Gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=Zo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(RS(e)?qg:Xg)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xi.makeRotationFromQuaternion(e),this.applyMatrix4(xi),this}rotateX(e){return xi.makeRotationX(e),this.applyMatrix4(xi),this}rotateY(e){return xi.makeRotationY(e),this.applyMatrix4(xi),this}rotateZ(e){return xi.makeRotationZ(e),this.applyMatrix4(xi),this}translate(e,t,n){return xi.makeTranslation(e,t,n),this.applyMatrix4(xi),this}scale(e,t,n){return xi.makeScale(e,t,n),this.applyMatrix4(xi),this}lookAt(e){return Gu.lookAt(e),Gu.updateMatrix(),this.applyMatrix4(Gu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ca).negate(),this.translate(ca.x,ca.y,ca.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tr(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];ni.setFromBufferAttribute(s),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pd);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const n=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ro.setFromBufferAttribute(o),this.morphTargetsRelative?(dn.addVectors(ni.min,ro.min),ni.expandByPoint(dn),dn.addVectors(ni.max,ro.max),ni.expandByPoint(dn)):(ni.expandByPoint(ro.min),ni.expandByPoint(ro.max))}ni.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)dn.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(dn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)dn.fromBufferAttribute(o,c),l&&(ca.fromBufferAttribute(e,c),dn.add(ca)),r=Math.max(r,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new ir(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[];for(let x=0;x<n.count;x++)o[x]=new Z,l[x]=new Z;const c=new Z,u=new Z,d=new Z,f=new xt,h=new xt,p=new xt,g=new Z,m=new Z;function _(x,A,C){c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,A),d.fromBufferAttribute(n,C),f.fromBufferAttribute(s,x),h.fromBufferAttribute(s,A),p.fromBufferAttribute(s,C),u.sub(c),d.sub(c),h.sub(f),p.sub(f);const D=1/(h.x*p.y-p.x*h.y);isFinite(D)&&(g.copy(u).multiplyScalar(p.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-p.x).multiplyScalar(D),o[x].add(g),o[A].add(g),o[C].add(g),l[x].add(m),l[A].add(m),l[C].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,A=M.length;x<A;++x){const C=M[x],D=C.start,L=C.count;for(let q=D,X=D+L;q<X;q+=3)_(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const w=new Z,S=new Z,y=new Z,T=new Z;function b(x){y.fromBufferAttribute(r,x),T.copy(y);const A=o[x];w.copy(A),w.sub(y.multiplyScalar(y.dot(A))).normalize(),S.crossVectors(T,A);const D=S.dot(l[x])<0?-1:1;a.setXYZW(x,w.x,w.y,w.z,D)}for(let x=0,A=M.length;x<A;++x){const C=M[x],D=C.start,L=C.count;for(let q=D,X=D+L;q<X;q+=3)b(e.getX(q+0)),b(e.getX(q+1)),b(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new ir(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const r=new Z,s=new Z,a=new Z,o=new Z,l=new Z,c=new Z,u=new Z,d=new Z;if(e)for(let f=0,h=e.count;f<h;f+=3){const p=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(t,p),s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)dn.fromBufferAttribute(e,t),dn.normalize(),e.setXYZ(t,dn.x,dn.y,dn.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let h=0,p=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?h=l[g]*o.data.stride+o.offset:h=l[g]*u;for(let _=0;_<u;_++)f[p++]=c[h++]}return new ir(f,u,d)}if(this.index===null)return Je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pr,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let ZS=0;class qc extends Gs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ZS++}),this.uuid=Zo(),this.name="",this.type="Material",this.blending=Da,this.side=as,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Of,this.blendDst=Bf,this.blendEquation=xs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=Ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Je(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Da&&(n.blending=this.blending),this.side!==as&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Of&&(n.blendSrc=this.blendSrc),this.blendDst!==Bf&&(n.blendDst=this.blendDst),this.blendEquation!==xs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ga&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==js&&(n.stencilFail=this.stencilFail),this.stencilZFail!==js&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==js&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new yt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new xt().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const hr=new Z,Wu=new Z,Ll=new Z,kr=new Z,Xu=new Z,Il=new Z,qu=new Z;class JS{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hr.copy(this.origin).addScaledVector(this.direction,t),hr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Wu.copy(e).add(t).multiplyScalar(.5),Ll.copy(t).sub(e).normalize(),kr.copy(this.origin).sub(Wu);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ll),o=kr.dot(this.direction),l=-kr.dot(Ll),c=kr.lengthSq(),u=Math.abs(1-a*a);let d,f,h,p;if(u>0)if(d=a*l-o,f=a*o-l,p=s*u,d>=0)if(f>=-p)if(f<=p){const g=1/u;d*=g,f*=g,h=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;else f<=-p?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=p?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Wu).addScaledVector(Ll,f),h}intersectSphere(e,t){hr.subVectors(e.center,this.origin);const n=hr.dot(this.direction),r=hr.dot(hr)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,hr)!==null}intersectTriangle(e,t,n,r,s){Xu.subVectors(t,e),Il.subVectors(n,e),qu.crossVectors(Xu,Il);let a=this.direction.dot(qu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;kr.subVectors(this.origin,e);const l=o*this.direction.dot(Il.crossVectors(kr,Il));if(l<0)return null;const c=o*this.direction.dot(Xu.cross(kr));if(c<0||l+c>a)return null;const u=-o*kr.dot(qu);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Yg extends qc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ks,this.combine=bg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const qp=new sn,hs=new JS,Nl=new pd,Yp=new Z,Ul=new Z,Fl=new Z,Ol=new Z,Yu=new Z,Bl=new Z,$p=new Z,zl=new Z;class ar extends pi{constructor(e=new Pr,t=new Yg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Bl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(Yu.fromBufferAttribute(d,e),a?Bl.addScaledVector(Yu,u):Bl.addScaledVector(Yu.sub(t),u))}t.add(Bl)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nl.copy(n.boundingSphere),Nl.applyMatrix4(s),hs.copy(e.ray).recast(e.near),!(Nl.containsPoint(hs.origin)===!1&&(hs.intersectSphere(Nl,Yp)===null||hs.origin.distanceToSquared(Yp)>(e.far-e.near)**2))&&(qp.copy(s).invert(),hs.copy(e.ray).applyMatrix4(qp),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,hs)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,g=f.length;p<g;p++){const m=f[p],_=a[m.materialIndex],M=Math.max(m.start,h.start),w=Math.min(o.count,Math.min(m.start+m.count,h.start+h.count));for(let S=M,y=w;S<y;S+=3){const T=o.getX(S),b=o.getX(S+1),x=o.getX(S+2);r=kl(this,_,e,n,c,u,d,T,b,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),g=Math.min(o.count,h.start+h.count);for(let m=p,_=g;m<_;m+=3){const M=o.getX(m),w=o.getX(m+1),S=o.getX(m+2);r=kl(this,a,e,n,c,u,d,M,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,g=f.length;p<g;p++){const m=f[p],_=a[m.materialIndex],M=Math.max(m.start,h.start),w=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let S=M,y=w;S<y;S+=3){const T=S,b=S+1,x=S+2;r=kl(this,_,e,n,c,u,d,T,b,x),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const p=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=p,_=g;m<_;m+=3){const M=m,w=m+1,S=m+2;r=kl(this,a,e,n,c,u,d,M,w,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function QS(i,e,t,n,r,s,a,o){let l;if(e.side===Qn?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,e.side===as,o),l===null)return null;zl.copy(o),zl.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(zl);return c<t.near||c>t.far?null:{distance:c,point:zl.clone(),object:i}}function kl(i,e,t,n,r,s,a,o,l,c){i.getVertexPosition(o,Ul),i.getVertexPosition(l,Fl),i.getVertexPosition(c,Ol);const u=QS(i,e,t,n,Ul,Fl,Ol,$p);if(u){const d=new Z;Oi.getBarycoord($p,Ul,Fl,Ol,d),r&&(u.uv=Oi.getInterpolatedAttribute(r,o,l,c,d,new xt)),s&&(u.uv1=Oi.getInterpolatedAttribute(s,o,l,c,d,new xt)),a&&(u.normal=Oi.getInterpolatedAttribute(a,o,l,c,d,new Z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new Z,materialIndex:0};Oi.getNormal(Ul,Fl,Ol,f.normal),u.face=f,u.barycoord=d}return u}class jS extends Gn{constructor(e=null,t=1,n=1,r,s,a,o,l,c=xn,u=xn,d,f){super(null,a,o,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $u=new Z,eM=new Z,tM=new tt;class gs{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=$u.subVectors(n,t).cross(eM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta($u),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||tM.getNormalMatrix(e),r=this.coplanarPoint($u).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new pd,nM=new xt(.5,.5),Vl=new Z;class $g{constructor(e=new gs,t=new gs,n=new gs,r=new gs,s=new gs,a=new gs){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qi,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],p=s[8],g=s[9],m=s[10],_=s[11],M=s[12],w=s[13],S=s[14],y=s[15];if(r[0].setComponents(c-a,h-u,_-p,y-M).normalize(),r[1].setComponents(c+a,h+u,_+p,y+M).normalize(),r[2].setComponents(c+o,h+d,_+g,y+w).normalize(),r[3].setComponents(c-o,h-d,_-g,y-w).normalize(),n)r[4].setComponents(l,f,m,S).normalize(),r[5].setComponents(c-l,h-f,_-m,y-S).normalize();else if(r[4].setComponents(c-l,h-f,_-m,y-S).normalize(),t===Qi)r[5].setComponents(c+l,h+f,_+m,y+S).normalize();else if(t===Fc)r[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){ds.center.set(0,0,0);const t=nM.distanceTo(e.center);return ds.radius=.7071067811865476+t,ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Vl.x=r.normal.x>0?e.max.x:e.min.x,Vl.y=r.normal.y>0?e.max.y:e.min.y,Vl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Vl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Kg extends Gn{constructor(e=[],t=Bs,n,r,s,a,o,l,c,u){super(e,t,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Xa extends Gn{constructor(e,t,n=sr,r,s,a,o=xn,l=xn,c,u=Rr,d=1){if(u!==Rr&&u!==As)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new dd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class iM extends Xa{constructor(e,t=sr,n=Bs,r,s,a=xn,o=xn,l,c=Rr){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zg extends Gn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qo extends Pr{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],d=[];let f=0,h=0;p("z","y","x",-1,-1,n,t,e,a,s,0),p("z","y","x",1,-1,n,t,-e,a,s,1),p("x","z","y",1,1,e,n,t,r,a,2),p("x","z","y",1,-1,e,n,-t,r,a,3),p("x","y","z",1,-1,e,t,n,r,s,4),p("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Tr(c,3)),this.setAttribute("normal",new Tr(u,3)),this.setAttribute("uv",new Tr(d,2));function p(g,m,_,M,w,S,y,T,b,x,A){const C=S/b,D=y/x,L=S/2,q=y/2,X=T/2,N=b+1,H=x+1;let U=0,Y=0;const B=new Z;for(let P=0;P<H;P++){const ne=P*D-q;for(let de=0;de<N;de++){const Ye=de*C-L;B[g]=Ye*M,B[m]=ne*w,B[_]=X,c.push(B.x,B.y,B.z),B[g]=0,B[m]=0,B[_]=T>0?1:-1,u.push(B.x,B.y,B.z),d.push(de/b),d.push(1-P/x),U+=1}}for(let P=0;P<x;P++)for(let ne=0;ne<b;ne++){const de=f+ne+N*P,Ye=f+ne+N*(P+1),Ge=f+(ne+1)+N*(P+1),Fe=f+(ne+1)+N*P;l.push(de,Ye,Fe),l.push(Ye,Ge,Fe),Y+=6}o.addGroup(h,Y,A),h+=Y,f+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class jo extends Pr{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,d=e/o,f=t/l,h=[],p=[],g=[],m=[];for(let _=0;_<u;_++){const M=_*f-a;for(let w=0;w<c;w++){const S=w*d-s;p.push(S,-M,0),g.push(0,0,1),m.push(w/o),m.push(1-_/l)}}for(let _=0;_<l;_++)for(let M=0;M<o;M++){const w=M+c*_,S=M+c*(_+1),y=M+1+c*(_+1),T=M+1+c*_;h.push(w,S,T),h.push(S,y,T)}this.setIndex(h),this.setAttribute("position",new Tr(p,3)),this.setAttribute("normal",new Tr(g,3)),this.setAttribute("uv",new Tr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jo(e.width,e.height,e.widthSegments,e.heightSegments)}}function qa(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Kp(r))r.isRenderTargetTexture?(Je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Kp(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function Bn(i){const e={};for(let t=0;t<i.length;t++){const n=qa(i[t]);for(const r in n)e[r]=n[r]}return e}function Kp(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function rM(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Jg(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const sM={clone:qa,merge:Bn};var aM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends qc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=aM,this.fragmentShader=oM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qa(e.uniforms),this.uniformsGroups=rM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new yt().setHex(r.value);break;case"v2":this.uniforms[n].value=new xt().fromArray(r.value);break;case"v3":this.uniforms[n].value=new Z().fromArray(r.value);break;case"v4":this.uniforms[n].value=new Xt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new tt().fromArray(r.value);break;case"m4":this.uniforms[n].value=new sn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class lM extends zi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class cM extends qc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=SS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class uM extends qc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hl=new Z,Gl=new Ya,Gi=new Z;class Qg extends pi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new sn,this.projectionMatrix=new sn,this.projectionMatrixInverse=new sn,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hl,Gl,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hl,Gl,Gi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hl,Gl,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hl,Gl,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vr=new Z,Zp=new xt,Jp=new xt;class Ui extends Qg{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Eh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(bu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Eh*2*Math.atan(Math.tan(bu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Vr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vr.x,Vr.y).multiplyScalar(-e/Vr.z),Vr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vr.x,Vr.y).multiplyScalar(-e/Vr.z)}getViewSize(e,t){return this.getViewBounds(e,Zp,Jp),t.subVectors(Jp,Zp)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(bu*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class md extends Qg{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ua=-90,fa=1;class fM extends pi{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ui(ua,fa,e,t);r.layers=this.layers,this.add(r);const s=new Ui(ua,fa,e,t);s.layers=this.layers,this.add(s);const a=new Ui(ua,fa,e,t);a.layers=this.layers,this.add(a);const o=new Ui(ua,fa,e,t);o.layers=this.layers,this.add(o);const l=new Ui(ua,fa,e,t);l.layers=this.layers,this.add(l);const c=new Ui(ua,fa,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Qi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class hM extends Ui{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dM{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Je("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Sd=class Sd{constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}};Sd.prototype.isMatrix2=!0;let Qp=Sd;function jp(i,e,t,n){const r=pM(n);switch(t){case Bg:return i*e;case kg:return i*e/r.components*r.byteLength;case ld:return i*e/r.components*r.byteLength;case zs:return i*e*2/r.components*r.byteLength;case cd:return i*e*2/r.components*r.byteLength;case zg:return i*e*3/r.components*r.byteLength;case Bi:return i*e*4/r.components*r.byteLength;case ud:return i*e*4/r.components*r.byteLength;case cc:case uc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fc:case hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Kf:case Jf:return Math.max(i,16)*Math.max(e,8)/4;case $f:case Zf:return Math.max(i,8)*Math.max(e,8)/2;case Qf:case jf:case th:case nh:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case eh:case Lc:case ih:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case rh:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sh:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ah:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case oh:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case lh:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ch:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case uh:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case fh:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case hh:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case dh:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ph:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case mh:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case _h:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case gh:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case vh:case xh:case Sh:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Mh:case yh:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ic:case Th:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function pM(i){switch(i){case bi:case Ng:return{byteLength:1,components:1};case Yo:case Ug:case wr:return{byteLength:2,components:1};case ad:case od:return{byteLength:2,components:4};case sr:case sd:case Ji:return{byteLength:4,components:1};case Fg:case Og:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rd}}));typeof window<"u"&&(window.__THREE__?Je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rd);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function jg(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function mM(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,u);else{d.sort((h,p)=>h.start-p.start);let f=0;for(let h=1;h<d.length;h++){const p=d[f],g=d[h];g.start<=p.start+p.count+1?p.count=Math.max(p.count,g.start+g.count-p.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,p=d.length;h<p;h++){const g=d[h];i.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var _M=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,MM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,TM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,EM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,bM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,AM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,RM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,CM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,PM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,DM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,LM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,IM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,NM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,UM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,FM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,OM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,BM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,zM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,kM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,VM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,HM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,GM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,XM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qM="gl_FragColor = linearToOutputTexel( gl_FragColor );",YM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$M=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,KM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ZM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,JM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,QM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ey=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ny=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ry=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ay=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,ly=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,py=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,my=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_y=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vy=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,xy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Sy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,My=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ty=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ey=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,by=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ay=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ry=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Py=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ly=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Iy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ny=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Uy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,By=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ky=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,qy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$y=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ky=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Zy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,jy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,aT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,uT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _T=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ST=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,TT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ET=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,AT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,CT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,PT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,DT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,IT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,UT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,OT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,BT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,VT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,XT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$T=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,KT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,st={alphahash_fragment:_M,alphahash_pars_fragment:gM,alphamap_fragment:vM,alphamap_pars_fragment:xM,alphatest_fragment:SM,alphatest_pars_fragment:MM,aomap_fragment:yM,aomap_pars_fragment:TM,batching_pars_vertex:EM,batching_vertex:bM,begin_vertex:AM,beginnormal_vertex:wM,bsdfs:RM,iridescence_fragment:CM,bumpmap_pars_fragment:PM,clipping_planes_fragment:DM,clipping_planes_pars_fragment:LM,clipping_planes_pars_vertex:IM,clipping_planes_vertex:NM,color_fragment:UM,color_pars_fragment:FM,color_pars_vertex:OM,color_vertex:BM,common:zM,cube_uv_reflection_fragment:kM,defaultnormal_vertex:VM,displacementmap_pars_vertex:HM,displacementmap_vertex:GM,emissivemap_fragment:WM,emissivemap_pars_fragment:XM,colorspace_fragment:qM,colorspace_pars_fragment:YM,envmap_fragment:$M,envmap_common_pars_fragment:KM,envmap_pars_fragment:ZM,envmap_pars_vertex:JM,envmap_physical_pars_fragment:ly,envmap_vertex:QM,fog_vertex:jM,fog_pars_vertex:ey,fog_fragment:ty,fog_pars_fragment:ny,gradientmap_pars_fragment:iy,lightmap_pars_fragment:ry,lights_lambert_fragment:sy,lights_lambert_pars_fragment:ay,lights_pars_begin:oy,lights_toon_fragment:cy,lights_toon_pars_fragment:uy,lights_phong_fragment:fy,lights_phong_pars_fragment:hy,lights_physical_fragment:dy,lights_physical_pars_fragment:py,lights_fragment_begin:my,lights_fragment_maps:_y,lights_fragment_end:gy,lightprobes_pars_fragment:vy,logdepthbuf_fragment:xy,logdepthbuf_pars_fragment:Sy,logdepthbuf_pars_vertex:My,logdepthbuf_vertex:yy,map_fragment:Ty,map_pars_fragment:Ey,map_particle_fragment:by,map_particle_pars_fragment:Ay,metalnessmap_fragment:wy,metalnessmap_pars_fragment:Ry,morphinstance_vertex:Cy,morphcolor_vertex:Py,morphnormal_vertex:Dy,morphtarget_pars_vertex:Ly,morphtarget_vertex:Iy,normal_fragment_begin:Ny,normal_fragment_maps:Uy,normal_pars_fragment:Fy,normal_pars_vertex:Oy,normal_vertex:By,normalmap_pars_fragment:zy,clearcoat_normal_fragment_begin:ky,clearcoat_normal_fragment_maps:Vy,clearcoat_pars_fragment:Hy,iridescence_pars_fragment:Gy,opaque_fragment:Wy,packing:Xy,premultiplied_alpha_fragment:qy,project_vertex:Yy,dithering_fragment:$y,dithering_pars_fragment:Ky,roughnessmap_fragment:Zy,roughnessmap_pars_fragment:Jy,shadowmap_pars_fragment:Qy,shadowmap_pars_vertex:jy,shadowmap_vertex:eT,shadowmask_pars_fragment:tT,skinbase_vertex:nT,skinning_pars_vertex:iT,skinning_vertex:rT,skinnormal_vertex:sT,specularmap_fragment:aT,specularmap_pars_fragment:oT,tonemapping_fragment:lT,tonemapping_pars_fragment:cT,transmission_fragment:uT,transmission_pars_fragment:fT,uv_pars_fragment:hT,uv_pars_vertex:dT,uv_vertex:pT,worldpos_vertex:mT,background_vert:_T,background_frag:gT,backgroundCube_vert:vT,backgroundCube_frag:xT,cube_vert:ST,cube_frag:MT,depth_vert:yT,depth_frag:TT,distance_vert:ET,distance_frag:bT,equirect_vert:AT,equirect_frag:wT,linedashed_vert:RT,linedashed_frag:CT,meshbasic_vert:PT,meshbasic_frag:DT,meshlambert_vert:LT,meshlambert_frag:IT,meshmatcap_vert:NT,meshmatcap_frag:UT,meshnormal_vert:FT,meshnormal_frag:OT,meshphong_vert:BT,meshphong_frag:zT,meshphysical_vert:kT,meshphysical_frag:VT,meshtoon_vert:HT,meshtoon_frag:GT,points_vert:WT,points_frag:XT,shadow_vert:qT,shadow_frag:YT,sprite_vert:$T,sprite_frag:KT},we={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Z},probesMax:{value:new Z},probesResolution:{value:new Z}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Yi={basic:{uniforms:Bn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:Bn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new yt(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:Bn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:Bn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:Bn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new yt(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:Bn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:Bn([we.points,we.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:Bn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:Bn([we.common,we.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:Bn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:Bn([we.sprite,we.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:Bn([we.common,we.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:Bn([we.lights,we.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};Yi.physical={uniforms:Bn([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const Wl={r:0,b:0,g:0},ZT=new sn,e0=new tt;e0.set(-1,0,0,0,1,0,0,0,1);function JT(i,e,t,n,r,s){const a=new yt(0);let o=r===!0?0:1,l,c,u=null,d=0,f=null;function h(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){const S=M.backgroundBlurriness>0;w=e.get(w,S)}return w}function p(M){let w=!1;const S=h(M);S===null?m(a,o):S&&S.isColor&&(m(S,1),w=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,w){const S=h(w);S&&(S.isCubeTexture||S.mapping===Xc)?(c===void 0&&(c=new ar(new Qo(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:qa(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:Qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,T,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ZT.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(e0),c.material.toneMapped=pt.getTransfer(S.colorSpace)!==Et,(u!==S||d!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ar(new jo(2,2),new zi({name:"BackgroundMaterial",uniforms:qa(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:as,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=pt.getTransfer(S.colorSpace)!==Et,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function m(M,w){M.getRGB(Wl,Jg(i)),t.buffers.color.setClear(Wl.r,Wl.g,Wl.b,w,s)}function _(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:p,addToRenderList:g,dispose:_}}function QT(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(D,L,q,X,N){let H=!1;const U=d(D,X,q,L);s!==U&&(s=U,c(s.object)),H=h(D,X,q,N),H&&p(D,X,q,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,S(D,L,q,X),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,L,q,X){const N=X.wireframe===!0;let H=n[L.id];H===void 0&&(H={},n[L.id]=H);const U=D.isInstancedMesh===!0?D.id:0;let Y=H[U];Y===void 0&&(Y={},H[U]=Y);let B=Y[q.id];B===void 0&&(B={},Y[q.id]=B);let P=B[N];return P===void 0&&(P=f(l()),B[N]=P),P}function f(D){const L=[],q=[],X=[];for(let N=0;N<t;N++)L[N]=0,q[N]=0,X[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:q,attributeDivisors:X,object:D,attributes:{},index:null}}function h(D,L,q,X){const N=s.attributes,H=L.attributes;let U=0;const Y=q.getAttributes();for(const B in Y)if(Y[B].location>=0){const ne=N[B];let de=H[B];if(de===void 0&&(B==="instanceMatrix"&&D.instanceMatrix&&(de=D.instanceMatrix),B==="instanceColor"&&D.instanceColor&&(de=D.instanceColor)),ne===void 0||ne.attribute!==de||de&&ne.data!==de.data)return!0;U++}return s.attributesNum!==U||s.index!==X}function p(D,L,q,X){const N={},H=L.attributes;let U=0;const Y=q.getAttributes();for(const B in Y)if(Y[B].location>=0){let ne=H[B];ne===void 0&&(B==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),B==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor));const de={};de.attribute=ne,ne&&ne.data&&(de.data=ne.data),N[B]=de,U++}s.attributes=N,s.attributesNum=U,s.index=X}function g(){const D=s.newAttributes;for(let L=0,q=D.length;L<q;L++)D[L]=0}function m(D){_(D,0)}function _(D,L){const q=s.newAttributes,X=s.enabledAttributes,N=s.attributeDivisors;q[D]=1,X[D]===0&&(i.enableVertexAttribArray(D),X[D]=1),N[D]!==L&&(i.vertexAttribDivisor(D,L),N[D]=L)}function M(){const D=s.newAttributes,L=s.enabledAttributes;for(let q=0,X=L.length;q<X;q++)L[q]!==D[q]&&(i.disableVertexAttribArray(q),L[q]=0)}function w(D,L,q,X,N,H,U){U===!0?i.vertexAttribIPointer(D,L,q,N,H):i.vertexAttribPointer(D,L,q,X,N,H)}function S(D,L,q,X){g();const N=X.attributes,H=q.getAttributes(),U=L.defaultAttributeValues;for(const Y in H){const B=H[Y];if(B.location>=0){let P=N[Y];if(P===void 0&&(Y==="instanceMatrix"&&D.instanceMatrix&&(P=D.instanceMatrix),Y==="instanceColor"&&D.instanceColor&&(P=D.instanceColor)),P!==void 0){const ne=P.normalized,de=P.itemSize,Ye=e.get(P);if(Ye===void 0)continue;const Ge=Ye.buffer,Fe=Ye.type,G=Ye.bytesPerElement,oe=Fe===i.INT||Fe===i.UNSIGNED_INT||P.gpuType===sd;if(P.isInterleavedBufferAttribute){const te=P.data,fe=te.stride,Ce=P.offset;if(te.isInstancedInterleavedBuffer){for(let Me=0;Me<B.locationSize;Me++)_(B.location+Me,te.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Me=0;Me<B.locationSize;Me++)m(B.location+Me);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let Me=0;Me<B.locationSize;Me++)w(B.location+Me,de/B.locationSize,Fe,ne,fe*G,(Ce+de/B.locationSize*Me)*G,oe)}else{if(P.isInstancedBufferAttribute){for(let te=0;te<B.locationSize;te++)_(B.location+te,P.meshPerAttribute);D.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let te=0;te<B.locationSize;te++)m(B.location+te);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let te=0;te<B.locationSize;te++)w(B.location+te,de/B.locationSize,Fe,ne,de*G,de/B.locationSize*te*G,oe)}}else if(U!==void 0){const ne=U[Y];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(B.location,ne);break;case 3:i.vertexAttrib3fv(B.location,ne);break;case 4:i.vertexAttrib4fv(B.location,ne);break;default:i.vertexAttrib1fv(B.location,ne)}}}}M()}function y(){A();for(const D in n){const L=n[D];for(const q in L){const X=L[q];for(const N in X){const H=X[N];for(const U in H)u(H[U].object),delete H[U];delete X[N]}}delete n[D]}}function T(D){if(n[D.id]===void 0)return;const L=n[D.id];for(const q in L){const X=L[q];for(const N in X){const H=X[N];for(const U in H)u(H[U].object),delete H[U];delete X[N]}}delete n[D.id]}function b(D){for(const L in n){const q=n[L];for(const X in q){const N=q[X];if(N[D.id]===void 0)continue;const H=N[D.id];for(const U in H)u(H[U].object),delete H[U];delete N[D.id]}}}function x(D){for(const L in n){const q=n[L],X=D.isInstancedMesh===!0?D.id:0,N=q[X];if(N!==void 0){for(const H in N){const U=N[H];for(const Y in U)u(U[Y].object),delete U[Y];delete N[H]}delete q[X],Object.keys(q).length===0&&delete n[L]}}}function A(){C(),a=!0,s!==r&&(s=r,c(s.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:C,dispose:y,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:b,initAttributes:g,enableAttribute:m,disableUnusedAttributes:M}}function jT(i,e,t){let n;function r(l){n=l}function s(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let f=0;for(let h=0;h<u;h++)f+=c[h];t.update(f,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function eE(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(b){return!(b!==Bi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const x=b===wr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==bi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Ji&&!x)}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:p,maxTextureSize:g,maxCubemapSize:m,maxAttributes:_,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:S,maxSamples:y,samples:T}}function tE(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new gs,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||r;return r=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const p=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,_=i.get(d);if(!r||p===null||p.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,w=M*4;let S=_.clippingState||null;l.value=S,S=u(p,f,w,h);for(let y=0;y!==w;++y)S[y]=t[y];_.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,p){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,p!==!0||m===null){const _=h+g*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<_)&&(m=new Float32Array(_));for(let w=0,S=h;w!==g;++w,S+=4)a.copy(d[w]).applyMatrix4(M,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}const Kr=4,em=[.125,.215,.35,.446,.526,.582],Ss=20,nE=256,so=new md,tm=new yt;let Ku=null,Zu=0,Ju=0,Qu=!1;const iE=new Z;class nm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=iE}=s;Ku=this._renderer.getRenderTarget(),Zu=this._renderer.getActiveCubeFace(),Ju=this._renderer.getActiveMipmapLevel(),Qu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ku,Zu,Ju),this._renderer.xr.enabled=Qu,e.scissorTest=!1,ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bs||e.mapping===Wa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ku=this._renderer.getRenderTarget(),Zu=this._renderer.getActiveCubeFace(),Ju=this._renderer.getActiveMipmapLevel(),Qu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ln,minFilter:Ln,generateMipmaps:!1,type:wr,format:Bi,colorSpace:Nc,depthBuffer:!1},r=im(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=im(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=rE(s)),this._blurMaterial=aE(s,e,t),this._ggxMaterial=sE(s,e,t)}return r}_compileMaterial(e){const t=new ar(new Pr,e);this._renderer.compile(t,so)}_sceneToCubeUV(e,t,n,r,s){const l=new Ui(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(tm),d.toneMapping=tr,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ar(new Qo,new Yg({name:"PMREM.Background",side:Qn,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let _=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,_=!0):(m.color.copy(tm),_=!0);for(let w=0;w<6;w++){const S=w%3;S===0?(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[w],s.y,s.z)):S===1?(l.up.set(0,0,c[w]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[w],s.z)):(l.up.set(0,c[w],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[w]));const y=this._cubeSize;ha(r,S*y,w>2?y:0,y,y),d.setRenderTarget(r),_&&d.render(g,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Bs||e.mapping===Wa;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rm());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ha(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,so)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const l=a.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,h=d*f,{_lodMax:p}=this,g=this._sizeLods[n],m=3*g*(n>p-Kr?n-p+Kr:0),_=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=p-t,ha(s,m,_,3*g,2*g),r.setRenderTarget(s),r.render(o,so),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=p-n,ha(e,m,_,3*g,2*g),r.setRenderTarget(e),r.render(o,so)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&vt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,h=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ss-1),g=s/p,m=isFinite(s)?1+Math.floor(u*g):Ss;m>Ss&&Je(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ss}`);const _=[];let M=0;for(let b=0;b<Ss;++b){const x=b/g,A=Math.exp(-x*x/2);_.push(A),b===0?M+=A:b<m&&(M+=2*A)}for(let b=0;b<_.length;b++)_[b]=_[b]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=_,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:w}=this;f.dTheta.value=p,f.mipInt.value=w-n;const S=this._sizeLods[r],y=3*S*(r>w-Kr?r-w+Kr:0),T=4*(this._cubeSize-S);ha(t,y,T,3*S,2*S),l.setRenderTarget(t),l.render(d,so)}}function rE(i){const e=[],t=[],n=[];let r=i;const s=i-Kr+1+em.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Kr?l=em[a-i+Kr-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,p=6,g=3,m=2,_=1,M=new Float32Array(g*p*h),w=new Float32Array(m*p*h),S=new Float32Array(_*p*h);for(let T=0;T<h;T++){const b=T%3*2/3-1,x=T>2?0:-1,A=[b,x,0,b+2/3,x,0,b+2/3,x+1,0,b,x,0,b+2/3,x+1,0,b,x+1,0];M.set(A,g*p*T),w.set(f,m*p*T);const C=[T,T,T,T,T,T];S.set(C,_*p*T)}const y=new Pr;y.setAttribute("position",new ir(M,g)),y.setAttribute("uv",new ir(w,m)),y.setAttribute("faceIndex",new ir(S,_)),n.push(new ar(y,null)),r>Kr&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function im(i,e,t){const n=new nr(i,e,t);return n.texture.mapping=Xc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ha(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function sE(i,e,t){return new zi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:nE,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Yc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function aE(i,e,t){const n=new Float32Array(Ss),r=new Z(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function rm(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function sm(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mr,depthTest:!1,depthWrite:!1})}function Yc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class t0 extends nr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Kg(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Qo(5,5,5),s=new zi({name:"CubemapFromEquirect",uniforms:qa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qn,blending:Mr});s.uniforms.tEquirect.value=t;const a=new ar(r,s),o=t.minFilter;return t.minFilter===bs&&(t.minFilter=Ln),new fM(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function oE(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,h=!1){return f==null?null:h?a(f):s(f)}function s(f){if(f&&f.isTexture){const h=f.mapping;if(h===yu||h===Tu)if(e.has(f)){const p=e.get(f).texture;return o(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const g=new t0(p.height);return g.fromEquirectangularTexture(i,f),e.set(f,g),f.addEventListener("dispose",c),o(g.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const h=f.mapping,p=h===yu||h===Tu,g=h===Bs||h===Wa;if(p||g){let m=t.get(f);const _=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==_)return n===null&&(n=new nm(i)),m=p?n.fromEquirectangular(f,m):n.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),m.texture;if(m!==void 0)return m.texture;{const M=f.image;return p&&M&&M.height>0||g&&M&&l(M)?(n===null&&(n=new nm(i)),m=p?n.fromEquirectangular(f):n.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,t.set(f,m),f.addEventListener("dispose",u),m.texture):null}}}return f}function o(f,h){return h===yu?f.mapping=Bs:h===Tu&&(f.mapping=Wa),f}function l(f){let h=0;const p=6;for(let g=0;g<p;g++)f[g]!==void 0&&h++;return h===p}function c(f){const h=f.target;h.removeEventListener("dispose",c);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function u(f){const h=f.target;h.removeEventListener("dispose",u);const p=t.get(h);p!==void 0&&(t.delete(h),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function lE(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&La("WebGLRenderer: "+n+" extension not supported."),r}}}function cE(i,e,t,n){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",a),delete r[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],i.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,p=d.attributes.position;let g=0;if(p===void 0)return;if(h!==null){const M=h.array;g=h.version;for(let w=0,S=M.length;w<S;w+=3){const y=M[w+0],T=M[w+1],b=M[w+2];f.push(y,T,T,b,b,y)}}else{const M=p.array;g=p.version;for(let w=0,S=M.length/3-1;w<S;w+=3){const y=w+0,T=w+1,b=w+2;f.push(y,T,T,b,b,y)}}const m=new(p.count>=65535?qg:Xg)(f,1);m.version=g;const _=s.get(d);_&&e.remove(_),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function uE(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,h){h!==0&&(i.drawElementsInstanced(n,f,s,d*a,h),t.update(f,n,h))}function u(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,h);let g=0;for(let m=0;m<h;m++)g+=f[m];t.update(g,n,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function fE(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:vt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function hE(i,e,t){const n=new WeakMap,r=new Xt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let C=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",C)};var h=C;f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),g===!0&&(S=2),m===!0&&(S=3);let y=o.attributes.position.count*S,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const b=new Float32Array(y*T*4*d),x=new Hg(b,y,T,d);x.type=Ji,x.needsUpdate=!0;const A=S*4;for(let D=0;D<d;D++){const L=_[D],q=M[D],X=w[D],N=y*T*4*D;for(let H=0;H<L.count;H++){const U=H*A;p===!0&&(r.fromBufferAttribute(L,H),b[N+U+0]=r.x,b[N+U+1]=r.y,b[N+U+2]=r.z,b[N+U+3]=0),g===!0&&(r.fromBufferAttribute(q,H),b[N+U+4]=r.x,b[N+U+5]=r.y,b[N+U+6]=r.z,b[N+U+7]=0),m===!0&&(r.fromBufferAttribute(X,H),b[N+U+8]=r.x,b[N+U+9]=r.y,b[N+U+10]=r.z,b[N+U+11]=X.itemSize===4?r.w:1)}}f={count:d,texture:x,size:new xt(y,T)},n.set(o,f),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function dE(i,e,t,n,r){let s=new WeakMap;function a(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const h=c.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return f}function o(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const pE={[Ag]:"LINEAR_TONE_MAPPING",[wg]:"REINHARD_TONE_MAPPING",[Rg]:"CINEON_TONE_MAPPING",[Cg]:"ACES_FILMIC_TONE_MAPPING",[Dg]:"AGX_TONE_MAPPING",[Lg]:"NEUTRAL_TONE_MAPPING",[Pg]:"CUSTOM_TONE_MAPPING"};function mE(i,e,t,n,r,s){const a=new nr(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,depthTexture:r?new Xa(e,t):void 0}),o=new nr(e,t,{type:wr,depthBuffer:!1,stencilBuffer:!1}),l=new Pr;l.setAttribute("position",new Tr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Tr([0,2,0,0,2,0],2));const c=new lM({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new ar(l,c),d=new md(-1,1,1,-1,0,1);let f=null,h=null,p=!1,g,m=null,_=[],M=!1;this.setSize=function(w,S){a.setSize(w,S),o.setSize(w,S);for(let y=0;y<_.length;y++){const T=_[y];T.setSize&&T.setSize(w,S)}},this.setEffects=function(w){_=w,M=_.length>0&&_[0].isRenderPass===!0;const S=a.width,y=a.height;for(let T=0;T<_.length;T++){const b=_[T];b.setSize&&b.setSize(S,y)}},this.begin=function(w,S){if(p||w.toneMapping===tr&&_.length===0)return!1;if(m=S,S!==null){const y=S.width,T=S.height;(a.width!==y||a.height!==T)&&this.setSize(y,T)}return M===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=tr,!0},this.hasRenderPass=function(){return M},this.end=function(w,S){w.toneMapping=g,p=!0;let y=a,T=o;for(let b=0;b<_.length;b++){const x=_[b];if(x.enabled!==!1&&(x.render(w,T,y,S),x.needsSwap!==!1)){const A=y;y=T,T=A}}if(f!==w.outputColorSpace||h!==w.toneMapping){f=w.outputColorSpace,h=w.toneMapping,c.defines={},pt.getTransfer(f)===Et&&(c.defines.SRGB_TRANSFER="");const b=pE[h];b&&(c.defines[b]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,w.setRenderTarget(m),w.render(u,d),m=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),l.dispose(),c.dispose()}}const n0=new Gn,bh=new Xa(1,1),i0=new Hg,r0=new BS,s0=new Kg,am=[],om=[],lm=new Float32Array(16),cm=new Float32Array(9),um=new Float32Array(4);function $a(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=am[r];if(s===void 0&&(s=new Float32Array(r),am[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function cn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function un(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function $c(i,e){let t=om[e];t===void 0&&(t=new Int32Array(e),om[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _E(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2fv(this.addr,e),un(t,e)}}function vE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(cn(t,e))return;i.uniform3fv(this.addr,e),un(t,e)}}function xE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4fv(this.addr,e),un(t,e)}}function SE(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),un(t,e)}else{if(cn(t,n))return;um.set(n),i.uniformMatrix2fv(this.addr,!1,um),un(t,n)}}function ME(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),un(t,e)}else{if(cn(t,n))return;cm.set(n),i.uniformMatrix3fv(this.addr,!1,cm),un(t,n)}}function yE(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),un(t,e)}else{if(cn(t,n))return;lm.set(n),i.uniformMatrix4fv(this.addr,!1,lm),un(t,n)}}function TE(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function EE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2iv(this.addr,e),un(t,e)}}function bE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3iv(this.addr,e),un(t,e)}}function AE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4iv(this.addr,e),un(t,e)}}function wE(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function RE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2uiv(this.addr,e),un(t,e)}}function CE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3uiv(this.addr,e),un(t,e)}}function PE(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4uiv(this.addr,e),un(t,e)}}function DE(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(bh.compareFunction=t.isReversedDepthBuffer()?hd:fd,s=bh):s=n0,t.setTexture2D(e||s,r)}function LE(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||r0,r)}function IE(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||s0,r)}function NE(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||i0,r)}function UE(i){switch(i){case 5126:return _E;case 35664:return gE;case 35665:return vE;case 35666:return xE;case 35674:return SE;case 35675:return ME;case 35676:return yE;case 5124:case 35670:return TE;case 35667:case 35671:return EE;case 35668:case 35672:return bE;case 35669:case 35673:return AE;case 5125:return wE;case 36294:return RE;case 36295:return CE;case 36296:return PE;case 35678:case 36198:case 36298:case 36306:case 35682:return DE;case 35679:case 36299:case 36307:return LE;case 35680:case 36300:case 36308:case 36293:return IE;case 36289:case 36303:case 36311:case 36292:return NE}}function FE(i,e){i.uniform1fv(this.addr,e)}function OE(i,e){const t=$a(e,this.size,2);i.uniform2fv(this.addr,t)}function BE(i,e){const t=$a(e,this.size,3);i.uniform3fv(this.addr,t)}function zE(i,e){const t=$a(e,this.size,4);i.uniform4fv(this.addr,t)}function kE(i,e){const t=$a(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function VE(i,e){const t=$a(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function HE(i,e){const t=$a(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function GE(i,e){i.uniform1iv(this.addr,e)}function WE(i,e){i.uniform2iv(this.addr,e)}function XE(i,e){i.uniform3iv(this.addr,e)}function qE(i,e){i.uniform4iv(this.addr,e)}function YE(i,e){i.uniform1uiv(this.addr,e)}function $E(i,e){i.uniform2uiv(this.addr,e)}function KE(i,e){i.uniform3uiv(this.addr,e)}function ZE(i,e){i.uniform4uiv(this.addr,e)}function JE(i,e,t){const n=this.cache,r=e.length,s=$c(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),un(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=bh:a=n0;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function QE(i,e,t){const n=this.cache,r=e.length,s=$c(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),un(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||r0,s[a])}function jE(i,e,t){const n=this.cache,r=e.length,s=$c(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),un(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||s0,s[a])}function eb(i,e,t){const n=this.cache,r=e.length,s=$c(t,r);cn(n,s)||(i.uniform1iv(this.addr,s),un(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||i0,s[a])}function tb(i){switch(i){case 5126:return FE;case 35664:return OE;case 35665:return BE;case 35666:return zE;case 35674:return kE;case 35675:return VE;case 35676:return HE;case 5124:case 35670:return GE;case 35667:case 35671:return WE;case 35668:case 35672:return XE;case 35669:case 35673:return qE;case 5125:return YE;case 36294:return $E;case 36295:return KE;case 36296:return ZE;case 35678:case 36198:case 36298:case 36306:case 35682:return JE;case 35679:case 36299:case 36307:return QE;case 35680:case 36300:case 36308:case 36293:return jE;case 36289:case 36303:case 36311:case 36292:return eb}}class nb{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=UE(t.type)}}class ib{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tb(t.type)}}class rb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ju=/(\w+)(\])?(\[|\.)?/g;function fm(i,e){i.seq.push(e),i.map[e.id]=e}function sb(i,e,t){const n=i.name,r=n.length;for(ju.lastIndex=0;;){const s=ju.exec(n),a=ju.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){fm(t,c===void 0?new nb(o,i,e):new ib(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new rb(o),fm(t,d)),t=d}}}class dc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);sb(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function hm(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ab=37297;let ob=0;function lb(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const dm=new tt;function cb(i){pt._getMatrix(dm,pt.workingColorSpace,i);const e=`mat3( ${dm.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case Uc:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return Je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function pm(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+lb(i.getShaderSource(e),o)}else return s}function ub(i,e){const t=cb(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const fb={[Ag]:"Linear",[wg]:"Reinhard",[Rg]:"Cineon",[Cg]:"ACESFilmic",[Dg]:"AgX",[Lg]:"Neutral",[Pg]:"Custom"};function hb(i,e){const t=fb[e];return t===void 0?(Je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Xl=new Z;function db(){pt.getLuminanceCoefficients(Xl);const i=Xl.x.toFixed(4),e=Xl.y.toFixed(4),t=Xl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pb(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(To).join(`
`)}function mb(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _b(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function To(i){return i!==""}function mm(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _m(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const gb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ah(i){return i.replace(gb,xb)}const vb=new Map;function xb(i,e){let t=st[e];if(t===void 0){const n=vb.get(e);if(n!==void 0)t=st[n],Je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ah(t)}const Sb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gm(i){return i.replace(Sb,Mb)}function Mb(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function vm(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const yb={[lc]:"SHADOWMAP_TYPE_PCF",[yo]:"SHADOWMAP_TYPE_VSM"};function Tb(i){return yb[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Eb={[Bs]:"ENVMAP_TYPE_CUBE",[Wa]:"ENVMAP_TYPE_CUBE",[Xc]:"ENVMAP_TYPE_CUBE_UV"};function bb(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Eb[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ab={[Wa]:"ENVMAP_MODE_REFRACTION"};function wb(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ab[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Rb={[bg]:"ENVMAP_BLENDING_MULTIPLY",[gS]:"ENVMAP_BLENDING_MIX",[vS]:"ENVMAP_BLENDING_ADD"};function Cb(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Rb[i.combine]||"ENVMAP_BLENDING_NONE"}function Pb(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Db(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Tb(t),c=bb(t),u=wb(t),d=Cb(t),f=Pb(t),h=pb(t),p=mb(s),g=r.createProgram();let m,_,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(To).join(`
`),m.length>0&&(m+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(To).join(`
`),_.length>0&&(_+=`
`)):(m=[vm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(To).join(`
`),_=[vm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==tr?"#define TONE_MAPPING":"",t.toneMapping!==tr?st.tonemapping_pars_fragment:"",t.toneMapping!==tr?hb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,ub("linearToOutputTexel",t.outputColorSpace),db(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(To).join(`
`)),a=Ah(a),a=mm(a,t),a=_m(a,t),o=Ah(o),o=mm(o,t),o=_m(o,t),a=gm(a),o=gm(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,_=["#define varying in",t.glslVersion===Lp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const w=M+m+a,S=M+_+o,y=hm(r,r.VERTEX_SHADER,w),T=hm(r,r.FRAGMENT_SHADER,S);r.attachShader(g,y),r.attachShader(g,T),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function b(D){if(i.debug.checkShaderErrors){const L=r.getProgramInfoLog(g)||"",q=r.getShaderInfoLog(y)||"",X=r.getShaderInfoLog(T)||"",N=L.trim(),H=q.trim(),U=X.trim();let Y=!0,B=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,g,y,T);else{const P=pm(r,y,"vertex"),ne=pm(r,T,"fragment");vt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+N+`
`+P+`
`+ne)}else N!==""?Je("WebGLProgram: Program Info Log:",N):(H===""||U==="")&&(B=!1);B&&(D.diagnostics={runnable:Y,programLog:N,vertexShader:{log:H,prefix:m},fragmentShader:{log:U,prefix:_}})}r.deleteShader(y),r.deleteShader(T),x=new dc(r,g),A=_b(r,g)}let x;this.getUniforms=function(){return x===void 0&&b(this),x};let A;this.getAttributes=function(){return A===void 0&&b(this),A};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(g,ab)),C},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ob++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=y,this.fragmentShader=T,this}let Lb=0;class Ib{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Nb(e),t.set(e,n)),n}}class Nb{constructor(e){this.id=Lb++,this.code=e,this.usedTimes=0}}function Ub(i){return i===zs||i===Lc||i===Ic}function Fb(i,e,t,n,r,s){const a=new Gg,o=new Ib,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,A,C,D,L,q){const X=D.fog,N=L.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,U=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Y=e.get(x.envMap||H,U),B=Y&&Y.mapping===Xc?Y.image.height:null,P=h[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Je("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const ne=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,de=ne!==void 0?ne.length:0;let Ye=0;N.morphAttributes.position!==void 0&&(Ye=1),N.morphAttributes.normal!==void 0&&(Ye=2),N.morphAttributes.color!==void 0&&(Ye=3);let Ge,Fe,G,oe;if(P){const se=Yi[P];Ge=se.vertexShader,Fe=se.fragmentShader}else{Ge=x.vertexShader,Fe=x.fragmentShader;const se=o.getVertexShaderStage(x),ve=o.getFragmentShaderStage(x);o.update(x,se,ve),G=se.id,oe=ve.id}const te=i.getRenderTarget(),fe=i.state.buffers.depth.getReversed(),Ce=L.isInstancedMesh===!0,Me=L.isBatchedMesh===!0,Ee=!!x.map,ue=!!x.matcap,Pe=!!Y,Oe=!!x.aoMap,be=!!x.lightMap,V=!!x.bumpMap&&x.wireframe===!1,qe=!!x.normalMap,Ke=!!x.displacementMap,it=!!x.emissiveMap,De=!!x.metalnessMap,$e=!!x.roughnessMap,I=x.anisotropy>0,Ze=x.clearcoat>0,ye=x.dispersion>0,R=x.iridescence>0,v=x.sheen>0,O=x.transmission>0,z=I&&!!x.anisotropyMap,J=Ze&&!!x.clearcoatMap,ce=Ze&&!!x.clearcoatNormalMap,le=Ze&&!!x.clearcoatRoughnessMap,Q=R&&!!x.iridescenceMap,j=R&&!!x.iridescenceThicknessMap,me=v&&!!x.sheenColorMap,Ne=v&&!!x.sheenRoughnessMap,xe=!!x.specularMap,_e=!!x.specularColorMap,he=!!x.specularIntensityMap,ze=O&&!!x.transmissionMap,Le=O&&!!x.thicknessMap,F=!!x.gradientMap,pe=!!x.alphaMap,ee=x.alphaTest>0,ge=!!x.alphaHash,Se=!!x.extensions;let ae=tr;x.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(ae=i.toneMapping);const re={shaderID:P,shaderType:x.type,shaderName:x.name,vertexShader:Ge,fragmentShader:Fe,defines:x.defines,customVertexShaderID:G,customFragmentShaderID:oe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:Me,batchingColor:Me&&L._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&L.instanceColor!==null,instancingMorph:Ce&&L.morphTexture!==null,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:pt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ee,matcap:ue,envMap:Pe,envMapMode:Pe&&Y.mapping,envMapCubeUVHeight:B,aoMap:Oe,lightMap:be,bumpMap:V,normalMap:qe,displacementMap:Ke,emissiveMap:it,normalMapObjectSpace:qe&&x.normalMapType===MS,normalMapTangentSpace:qe&&x.normalMapType===Cp,packedNormalMap:qe&&x.normalMapType===Cp&&Ub(x.normalMap.format),metalnessMap:De,roughnessMap:$e,anisotropy:I,anisotropyMap:z,clearcoat:Ze,clearcoatMap:J,clearcoatNormalMap:ce,clearcoatRoughnessMap:le,dispersion:ye,iridescence:R,iridescenceMap:Q,iridescenceThicknessMap:j,sheen:v,sheenColorMap:me,sheenRoughnessMap:Ne,specularMap:xe,specularColorMap:_e,specularIntensityMap:he,transmission:O,transmissionMap:ze,thicknessMap:Le,gradientMap:F,opaque:x.transparent===!1&&x.blending===Da&&x.alphaToCoverage===!1,alphaMap:pe,alphaTest:ee,alphaHash:ge,combine:x.combine,mapUv:Ee&&p(x.map.channel),aoMapUv:Oe&&p(x.aoMap.channel),lightMapUv:be&&p(x.lightMap.channel),bumpMapUv:V&&p(x.bumpMap.channel),normalMapUv:qe&&p(x.normalMap.channel),displacementMapUv:Ke&&p(x.displacementMap.channel),emissiveMapUv:it&&p(x.emissiveMap.channel),metalnessMapUv:De&&p(x.metalnessMap.channel),roughnessMapUv:$e&&p(x.roughnessMap.channel),anisotropyMapUv:z&&p(x.anisotropyMap.channel),clearcoatMapUv:J&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:ce&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:le&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:j&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:me&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&p(x.sheenRoughnessMap.channel),specularMapUv:xe&&p(x.specularMap.channel),specularColorMapUv:_e&&p(x.specularColorMap.channel),specularIntensityMapUv:he&&p(x.specularIntensityMap.channel),transmissionMapUv:ze&&p(x.transmissionMap.channel),thicknessMapUv:Le&&p(x.thicknessMap.channel),alphaMapUv:pe&&p(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(qe||I),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!N.attributes.uv&&(Ee||pe),fog:!!X,useFog:x.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&qe===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:fe,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Ye,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:Ee&&x.map.isVideoTexture===!0&&pt.getTransfer(x.map.colorSpace)===Et,decodeVideoTextureEmissive:it&&x.emissiveMap.isVideoTexture===!0&&pt.getTransfer(x.emissiveMap.colorSpace)===Et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===_r,flipSided:x.side===Qn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Se&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Se&&x.extensions.multiDraw===!0||Me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return re.vertexUv1s=l.has(1),re.vertexUv2s=l.has(2),re.vertexUv3s=l.has(3),l.clear(),re}function m(x){const A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)A.push(C),A.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(_(A,x),M(A,x),A.push(i.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function _(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function M(x,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function w(x){const A=h[x.type];let C;if(A){const D=Yi[A];C=sM.clone(D.uniforms)}else C=x.uniforms;return C}function S(x,A){let C=u.get(A);return C!==void 0?++C.usedTimes:(C=new Db(i,A,x,r),c.push(C),u.set(A,C)),C}function y(x){if(--x.usedTimes===0){const A=c.indexOf(x);c[A]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function b(){o.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:w,acquireProgram:S,releaseProgram:y,releaseShaderCache:T,programs:c,dispose:b}}function Ob(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Bb(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function xm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Sm(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(f){let h=0;return f.isInstancedMesh&&(h+=2),f.isSkinnedMesh&&(h+=1),h}function o(f,h,p,g,m,_){let M=i[e];return M===void 0?(M={id:f.id,object:f,geometry:h,material:p,materialVariant:a(f),groupOrder:g,renderOrder:f.renderOrder,z:m,group:_},i[e]=M):(M.id=f.id,M.object=f,M.geometry=h,M.material=p,M.materialVariant=a(f),M.groupOrder=g,M.renderOrder=f.renderOrder,M.z=m,M.group=_),e++,M}function l(f,h,p,g,m,_){const M=o(f,h,p,g,m,_);p.transmission>0?n.push(M):p.transparent===!0?r.push(M):t.push(M)}function c(f,h,p,g,m,_){const M=o(f,h,p,g,m,_);p.transmission>0?n.unshift(M):p.transparent===!0?r.unshift(M):t.unshift(M)}function u(f,h,p){t.length>1&&t.sort(f||Bb),n.length>1&&n.sort(h||xm),r.length>1&&r.sort(h||xm),p&&(t.reverse(),n.reverse(),r.reverse())}function d(){for(let f=e,h=i.length;f<h;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function zb(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Sm,i.set(n,[a])):r>=s.length?(a=new Sm,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function kb(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new yt};break;case"SpotLight":t={position:new Z,direction:new Z,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new yt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":t={color:new yt,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return i[e.id]=t,t}}}function Vb(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Hb=0;function Gb(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Wb(i){const e=new kb,t=Vb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Z);const r=new Z,s=new sn,a=new sn;function o(c){let u=0,d=0,f=0;for(let A=0;A<9;A++)n.probe[A].set(0,0,0);let h=0,p=0,g=0,m=0,_=0,M=0,w=0,S=0,y=0,T=0,b=0;c.sort(Gb);for(let A=0,C=c.length;A<C;A++){const D=c[A],L=D.color,q=D.intensity,X=D.distance;let N=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===zs?N=D.shadow.map.texture:N=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=L.r*q,d+=L.g*q,f+=L.b*q;else if(D.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(D.sh.coefficients[H],q);b++}else if(D.isDirectionalLight){const H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const U=D.shadow,Y=t.get(D);Y.shadowIntensity=U.intensity,Y.shadowBias=U.bias,Y.shadowNormalBias=U.normalBias,Y.shadowRadius=U.radius,Y.shadowMapSize=U.mapSize,n.directionalShadow[h]=Y,n.directionalShadowMap[h]=N,n.directionalShadowMatrix[h]=D.shadow.matrix,M++}n.directional[h]=H,h++}else if(D.isSpotLight){const H=e.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(L).multiplyScalar(q),H.distance=X,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,n.spot[g]=H;const U=D.shadow;if(D.map&&(n.spotLightMap[y]=D.map,y++,U.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[g]=U.matrix,D.castShadow){const Y=t.get(D);Y.shadowIntensity=U.intensity,Y.shadowBias=U.bias,Y.shadowNormalBias=U.normalBias,Y.shadowRadius=U.radius,Y.shadowMapSize=U.mapSize,n.spotShadow[g]=Y,n.spotShadowMap[g]=N,S++}g++}else if(D.isRectAreaLight){const H=e.get(D);H.color.copy(L).multiplyScalar(q),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=H,m++}else if(D.isPointLight){const H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){const U=D.shadow,Y=t.get(D);Y.shadowIntensity=U.intensity,Y.shadowBias=U.bias,Y.shadowNormalBias=U.normalBias,Y.shadowRadius=U.radius,Y.shadowMapSize=U.mapSize,Y.shadowCameraNear=U.camera.near,Y.shadowCameraFar=U.camera.far,n.pointShadow[p]=Y,n.pointShadowMap[p]=N,n.pointShadowMatrix[p]=D.shadow.matrix,w++}n.point[p]=H,p++}else if(D.isHemisphereLight){const H=e.get(D);H.skyColor.copy(D.color).multiplyScalar(q),H.groundColor.copy(D.groundColor).multiplyScalar(q),n.hemi[_]=H,_++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=we.LTC_FLOAT_1,n.rectAreaLTC2=we.LTC_FLOAT_2):(n.rectAreaLTC1=we.LTC_HALF_1,n.rectAreaLTC2=we.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const x=n.hash;(x.directionalLength!==h||x.pointLength!==p||x.spotLength!==g||x.rectAreaLength!==m||x.hemiLength!==_||x.numDirectionalShadows!==M||x.numPointShadows!==w||x.numSpotShadows!==S||x.numSpotMaps!==y||x.numLightProbes!==b)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=p,n.hemi.length=_,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=S+y-T,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=b,x.directionalLength=h,x.pointLength=p,x.spotLength=g,x.rectAreaLength=m,x.hemiLength=_,x.numDirectionalShadows=M,x.numPointShadows=w,x.numSpotShadows=S,x.numSpotMaps=y,x.numLightProbes=b,n.version=Hb++)}function l(c,u){let d=0,f=0,h=0,p=0,g=0;const m=u.matrixWorldInverse;for(let _=0,M=c.length;_<M;_++){const w=c[_];if(w.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(w.isSpotLight){const S=n.spot[h];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(w.isRectAreaLight){const S=n.rectArea[p];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(w.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(w.width*.5,0,0),S.halfHeight.set(0,w.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),p++}else if(w.isPointLight){const S=n.point[f];S.position.setFromMatrixPosition(w.matrixWorld),S.position.applyMatrix4(m),f++}else if(w.isHemisphereLight){const S=n.hemi[g];S.direction.setFromMatrixPosition(w.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Mm(i){const e=new Wb(i),t=[],n=[],r=[];function s(f){d.camera=f,t.length=0,n.length=0,r.length=0}function a(f){t.push(f)}function o(f){n.push(f)}function l(f){r.push(f)}function c(){e.setup(t)}function u(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function Xb(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Mm(i),e.set(r,[o])):s>=a.length?(o=new Mm(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const qb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,$b=[new Z(1,0,0),new Z(-1,0,0),new Z(0,1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1)],Kb=[new Z(0,-1,0),new Z(0,-1,0),new Z(0,0,1),new Z(0,0,-1),new Z(0,-1,0),new Z(0,-1,0)],ym=new sn,ao=new Z,ef=new Z;function Zb(i,e,t){let n=new $g;const r=new xt,s=new xt,a=new Xt,o=new cM,l=new uM,c={},u=t.maxTextureSize,d={[as]:Qn,[Qn]:as,[_r]:_r},f=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:qb,fragmentShader:Yb}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const p=new Pr;p.setAttribute("position",new ir(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ar(p,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lc;let _=this.type;this.render=function(T,b,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Qx&&(Je("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=lc);const A=i.getRenderTarget(),C=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),L=i.state;L.setBlending(Mr),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const q=_!==this.type;q&&b.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(N=>N.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,N=T.length;X<N;X++){const H=T[X],U=H.shadow;if(U===void 0){Je("WebGLShadowMap:",H,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;r.copy(U.mapSize);const Y=U.getFrameExtents();r.multiply(Y),s.copy(U.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Y.x),r.x=s.x*Y.x,U.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Y.y),r.y=s.y*Y.y,U.mapSize.y=s.y));const B=i.state.buffers.depth.getReversed();if(U.camera._reversedDepth=B,U.map===null||q===!0){if(U.map!==null&&(U.map.depthTexture!==null&&(U.map.depthTexture.dispose(),U.map.depthTexture=null),U.map.dispose()),this.type===yo){if(H.isPointLight){Je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}U.map=new nr(r.x,r.y,{format:zs,type:wr,minFilter:Ln,magFilter:Ln,generateMipmaps:!1}),U.map.texture.name=H.name+".shadowMap",U.map.depthTexture=new Xa(r.x,r.y,Ji),U.map.depthTexture.name=H.name+".shadowMapDepth",U.map.depthTexture.format=Rr,U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=xn,U.map.depthTexture.magFilter=xn}else H.isPointLight?(U.map=new t0(r.x),U.map.depthTexture=new iM(r.x,sr)):(U.map=new nr(r.x,r.y),U.map.depthTexture=new Xa(r.x,r.y,sr)),U.map.depthTexture.name=H.name+".shadowMap",U.map.depthTexture.format=Rr,this.type===lc?(U.map.depthTexture.compareFunction=B?hd:fd,U.map.depthTexture.minFilter=Ln,U.map.depthTexture.magFilter=Ln):(U.map.depthTexture.compareFunction=null,U.map.depthTexture.minFilter=xn,U.map.depthTexture.magFilter=xn);U.camera.updateProjectionMatrix()}const P=U.map.isWebGLCubeRenderTarget?6:1;for(let ne=0;ne<P;ne++){if(U.map.isWebGLCubeRenderTarget)i.setRenderTarget(U.map,ne),i.clear();else{ne===0&&(i.setRenderTarget(U.map),i.clear());const de=U.getViewport(ne);a.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),L.viewport(a)}if(H.isPointLight){const de=U.camera,Ye=U.matrix,Ge=H.distance||de.far;Ge!==de.far&&(de.far=Ge,de.updateProjectionMatrix()),ao.setFromMatrixPosition(H.matrixWorld),de.position.copy(ao),ef.copy(de.position),ef.add($b[ne]),de.up.copy(Kb[ne]),de.lookAt(ef),de.updateMatrixWorld(),Ye.makeTranslation(-ao.x,-ao.y,-ao.z),ym.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),U._frustum.setFromProjectionMatrix(ym,de.coordinateSystem,de.reversedDepth)}else U.updateMatrices(H);n=U.getFrustum(),S(b,x,U.camera,H,this.type)}U.isPointLightShadow!==!0&&this.type===yo&&M(U,x),U.needsUpdate=!1}_=this.type,m.needsUpdate=!1,i.setRenderTarget(A,C,D)};function M(T,b){const x=e.update(g);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,h.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new nr(r.x,r.y,{format:zs,type:wr})),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(b,null,x,f,g,null),h.uniforms.shadow_pass.value=T.mapPass.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(b,null,x,h,g,null)}function w(T,b,x,A){let C=null;const D=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)C=D;else if(C=x.isPointLight===!0?l:o,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const L=C.uuid,q=b.uuid;let X=c[L];X===void 0&&(X={},c[L]=X);let N=X[q];N===void 0&&(N=C.clone(),X[q]=N,b.addEventListener("dispose",y)),C=N}if(C.visible=b.visible,C.wireframe=b.wireframe,A===yo?C.side=b.shadowSide!==null?b.shadowSide:b.side:C.side=b.shadowSide!==null?b.shadowSide:d[b.side],C.alphaMap=b.alphaMap,C.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,C.map=b.map,C.clipShadows=b.clipShadows,C.clippingPlanes=b.clippingPlanes,C.clipIntersection=b.clipIntersection,C.displacementMap=b.displacementMap,C.displacementScale=b.displacementScale,C.displacementBias=b.displacementBias,C.wireframeLinewidth=b.wireframeLinewidth,C.linewidth=b.linewidth,x.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const L=i.properties.get(C);L.light=x}return C}function S(T,b,x,A,C){if(T.visible===!1)return;if(T.layers.test(b.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===yo)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const q=e.update(T),X=T.material;if(Array.isArray(X)){const N=q.groups;for(let H=0,U=N.length;H<U;H++){const Y=N[H],B=X[Y.materialIndex];if(B&&B.visible){const P=w(T,B,A,C);T.onBeforeShadow(i,T,b,x,q,P,Y),i.renderBufferDirect(x,null,q,P,T,Y),T.onAfterShadow(i,T,b,x,q,P,Y)}}}else if(X.visible){const N=w(T,X,A,C);T.onBeforeShadow(i,T,b,x,q,N,null),i.renderBufferDirect(x,null,q,N,T,null),T.onAfterShadow(i,T,b,x,q,N,null)}}const L=T.children;for(let q=0,X=L.length;q<X;q++)S(L[q],b,x,A,C)}function y(T){T.target.removeEventListener("dispose",y);for(const x in c){const A=c[x],C=T.target.uuid;C in A&&(A[C].dispose(),delete A[C])}}}function Jb(i,e){function t(){let F=!1;const pe=new Xt;let ee=null;const ge=new Xt(0,0,0,0);return{setMask:function(Se){ee!==Se&&!F&&(i.colorMask(Se,Se,Se,Se),ee=Se)},setLocked:function(Se){F=Se},setClear:function(Se,ae,re,se,ve){ve===!0&&(Se*=se,ae*=se,re*=se),pe.set(Se,ae,re,se),ge.equals(pe)===!1&&(i.clearColor(Se,ae,re,se),ge.copy(pe))},reset:function(){F=!1,ee=null,ge.set(-1,0,0,0)}}}function n(){let F=!1,pe=!1,ee=null,ge=null,Se=null;return{setReversed:function(ae){if(pe!==ae){const re=e.get("EXT_clip_control");ae?re.clipControlEXT(re.LOWER_LEFT_EXT,re.ZERO_TO_ONE_EXT):re.clipControlEXT(re.LOWER_LEFT_EXT,re.NEGATIVE_ONE_TO_ONE_EXT),pe=ae;const se=Se;Se=null,this.setClear(se)}},getReversed:function(){return pe},setTest:function(ae){ae?te(i.DEPTH_TEST):fe(i.DEPTH_TEST)},setMask:function(ae){ee!==ae&&!F&&(i.depthMask(ae),ee=ae)},setFunc:function(ae){if(pe&&(ae=DS[ae]),ge!==ae){switch(ae){case zf:i.depthFunc(i.NEVER);break;case kf:i.depthFunc(i.ALWAYS);break;case Vf:i.depthFunc(i.LESS);break;case Ga:i.depthFunc(i.LEQUAL);break;case Hf:i.depthFunc(i.EQUAL);break;case Gf:i.depthFunc(i.GEQUAL);break;case Wf:i.depthFunc(i.GREATER);break;case Xf:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=ae}},setLocked:function(ae){F=ae},setClear:function(ae){Se!==ae&&(Se=ae,pe&&(ae=1-ae),i.clearDepth(ae))},reset:function(){F=!1,ee=null,ge=null,Se=null,pe=!1}}}function r(){let F=!1,pe=null,ee=null,ge=null,Se=null,ae=null,re=null,se=null,ve=null;return{setTest:function(ie){F||(ie?te(i.STENCIL_TEST):fe(i.STENCIL_TEST))},setMask:function(ie){pe!==ie&&!F&&(i.stencilMask(ie),pe=ie)},setFunc:function(ie,Xe,Ue){(ee!==ie||ge!==Xe||Se!==Ue)&&(i.stencilFunc(ie,Xe,Ue),ee=ie,ge=Xe,Se=Ue)},setOp:function(ie,Xe,Ue){(ae!==ie||re!==Xe||se!==Ue)&&(i.stencilOp(ie,Xe,Ue),ae=ie,re=Xe,se=Ue)},setLocked:function(ie){F=ie},setClear:function(ie){ve!==ie&&(i.clearStencil(ie),ve=ie)},reset:function(){F=!1,pe=null,ee=null,ge=null,Se=null,ae=null,re=null,se=null,ve=null}}}const s=new t,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f={},h=new WeakMap,p=[],g=null,m=!1,_=null,M=null,w=null,S=null,y=null,T=null,b=null,x=new yt(0,0,0),A=0,C=!1,D=null,L=null,q=null,X=null,N=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,Y=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(B)[1]),U=Y>=1):B.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),U=Y>=2);let P=null,ne={};const de=i.getParameter(i.SCISSOR_BOX),Ye=i.getParameter(i.VIEWPORT),Ge=new Xt().fromArray(de),Fe=new Xt().fromArray(Ye);function G(F,pe,ee,ge){const Se=new Uint8Array(4),ae=i.createTexture();i.bindTexture(F,ae),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let re=0;re<ee;re++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(pe+re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return ae}const oe={};oe[i.TEXTURE_2D]=G(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=G(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=G(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=G(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),te(i.DEPTH_TEST),a.setFunc(Ga),V(!1),qe(bp),te(i.CULL_FACE),Oe(Mr);function te(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function fe(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function Ce(F,pe){return f[F]!==pe?(i.bindFramebuffer(F,pe),f[F]=pe,F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=pe),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function Me(F,pe){let ee=p,ge=!1;if(F){ee=h.get(pe),ee===void 0&&(ee=[],h.set(pe,ee));const Se=F.textures;if(ee.length!==Se.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,re=Se.length;ae<re;ae++)ee[ae]=i.COLOR_ATTACHMENT0+ae;ee.length=Se.length,ge=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ge=!0);ge&&i.drawBuffers(ee)}function Ee(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const ue={[xs]:i.FUNC_ADD,[eS]:i.FUNC_SUBTRACT,[tS]:i.FUNC_REVERSE_SUBTRACT};ue[nS]=i.MIN,ue[iS]=i.MAX;const Pe={[rS]:i.ZERO,[sS]:i.ONE,[aS]:i.SRC_COLOR,[Of]:i.SRC_ALPHA,[hS]:i.SRC_ALPHA_SATURATE,[uS]:i.DST_COLOR,[lS]:i.DST_ALPHA,[oS]:i.ONE_MINUS_SRC_COLOR,[Bf]:i.ONE_MINUS_SRC_ALPHA,[fS]:i.ONE_MINUS_DST_COLOR,[cS]:i.ONE_MINUS_DST_ALPHA,[dS]:i.CONSTANT_COLOR,[pS]:i.ONE_MINUS_CONSTANT_COLOR,[mS]:i.CONSTANT_ALPHA,[_S]:i.ONE_MINUS_CONSTANT_ALPHA};function Oe(F,pe,ee,ge,Se,ae,re,se,ve,ie){if(F===Mr){m===!0&&(fe(i.BLEND),m=!1);return}if(m===!1&&(te(i.BLEND),m=!0),F!==jx){if(F!==_||ie!==C){if((M!==xs||y!==xs)&&(i.blendEquation(i.FUNC_ADD),M=xs,y=xs),ie)switch(F){case Da:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ap:i.blendFunc(i.ONE,i.ONE);break;case wp:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rp:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",F);break}else switch(F){case Da:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ap:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wp:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rp:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",F);break}w=null,S=null,T=null,b=null,x.set(0,0,0),A=0,_=F,C=ie}return}Se=Se||pe,ae=ae||ee,re=re||ge,(pe!==M||Se!==y)&&(i.blendEquationSeparate(ue[pe],ue[Se]),M=pe,y=Se),(ee!==w||ge!==S||ae!==T||re!==b)&&(i.blendFuncSeparate(Pe[ee],Pe[ge],Pe[ae],Pe[re]),w=ee,S=ge,T=ae,b=re),(se.equals(x)===!1||ve!==A)&&(i.blendColor(se.r,se.g,se.b,ve),x.copy(se),A=ve),_=F,C=!1}function be(F,pe){F.side===_r?fe(i.CULL_FACE):te(i.CULL_FACE);let ee=F.side===Qn;pe&&(ee=!ee),V(ee),F.blending===Da&&F.transparent===!1?Oe(Mr):Oe(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),s.setMask(F.colorWrite);const ge=F.stencilWrite;o.setTest(ge),ge&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),it(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function V(F){D!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),D=F)}function qe(F){F!==Zx?(te(i.CULL_FACE),F!==L&&(F===bp?i.cullFace(i.BACK):F===Jx?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):fe(i.CULL_FACE),L=F}function Ke(F){F!==q&&(U&&i.lineWidth(F),q=F)}function it(F,pe,ee){F?(te(i.POLYGON_OFFSET_FILL),(X!==pe||N!==ee)&&(X=pe,N=ee,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,ee))):fe(i.POLYGON_OFFSET_FILL)}function De(F){F?te(i.SCISSOR_TEST):fe(i.SCISSOR_TEST)}function $e(F){F===void 0&&(F=i.TEXTURE0+H-1),P!==F&&(i.activeTexture(F),P=F)}function I(F,pe,ee){ee===void 0&&(P===null?ee=i.TEXTURE0+H-1:ee=P);let ge=ne[ee];ge===void 0&&(ge={type:void 0,texture:void 0},ne[ee]=ge),(ge.type!==F||ge.texture!==pe)&&(P!==ee&&(i.activeTexture(ee),P=ee),i.bindTexture(F,pe||oe[F]),ge.type=F,ge.texture=pe)}function Ze(){const F=ne[P];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ye(){try{i.compressedTexImage2D(...arguments)}catch(F){vt("WebGLState:",F)}}function R(){try{i.compressedTexImage3D(...arguments)}catch(F){vt("WebGLState:",F)}}function v(){try{i.texSubImage2D(...arguments)}catch(F){vt("WebGLState:",F)}}function O(){try{i.texSubImage3D(...arguments)}catch(F){vt("WebGLState:",F)}}function z(){try{i.compressedTexSubImage2D(...arguments)}catch(F){vt("WebGLState:",F)}}function J(){try{i.compressedTexSubImage3D(...arguments)}catch(F){vt("WebGLState:",F)}}function ce(){try{i.texStorage2D(...arguments)}catch(F){vt("WebGLState:",F)}}function le(){try{i.texStorage3D(...arguments)}catch(F){vt("WebGLState:",F)}}function Q(){try{i.texImage2D(...arguments)}catch(F){vt("WebGLState:",F)}}function j(){try{i.texImage3D(...arguments)}catch(F){vt("WebGLState:",F)}}function me(F){return d[F]!==void 0?d[F]:i.getParameter(F)}function Ne(F,pe){d[F]!==pe&&(i.pixelStorei(F,pe),d[F]=pe)}function xe(F){Ge.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Ge.copy(F))}function _e(F){Fe.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),Fe.copy(F))}function he(F,pe){let ee=c.get(pe);ee===void 0&&(ee=new WeakMap,c.set(pe,ee));let ge=ee.get(F);ge===void 0&&(ge=i.getUniformBlockIndex(pe,F.name),ee.set(F,ge))}function ze(F,pe){const ge=c.get(pe).get(F);l.get(pe)!==ge&&(i.uniformBlockBinding(pe,ge,F.__bindingPointIndex),l.set(pe,ge))}function Le(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},h=new WeakMap,p=[],g=null,m=!1,_=null,M=null,w=null,S=null,y=null,T=null,b=null,x=new yt(0,0,0),A=0,C=!1,D=null,L=null,q=null,X=null,N=null,Ge.set(0,0,i.canvas.width,i.canvas.height),Fe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:te,disable:fe,bindFramebuffer:Ce,drawBuffers:Me,useProgram:Ee,setBlending:Oe,setMaterial:be,setFlipSided:V,setCullFace:qe,setLineWidth:Ke,setPolygonOffset:it,setScissorTest:De,activeTexture:$e,bindTexture:I,unbindTexture:Ze,compressedTexImage2D:ye,compressedTexImage3D:R,texImage2D:Q,texImage3D:j,pixelStorei:Ne,getParameter:me,updateUBOMapping:he,uniformBlockBinding:ze,texStorage2D:ce,texStorage3D:le,texSubImage2D:v,texSubImage3D:O,compressedTexSubImage2D:z,compressedTexSubImage3D:J,scissor:xe,viewport:_e,reset:Le}}function Qb(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,u=new WeakMap,d=new Set;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,v){return p?new OffscreenCanvas(R,v):Oc("canvas")}function m(R,v,O){let z=1;const J=ye(R);if((J.width>O||J.height>O)&&(z=O/Math.max(J.width,J.height)),z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const ce=Math.floor(z*J.width),le=Math.floor(z*J.height);f===void 0&&(f=g(ce,le));const Q=v?g(ce,le):f;return Q.width=ce,Q.height=le,Q.getContext("2d").drawImage(R,0,0,ce,le),Je("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+ce+"x"+le+")."),Q}else return"data"in R&&Je("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function _(R){return R.generateMipmaps}function M(R){i.generateMipmap(R)}function w(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(R,v,O,z,J,ce=!1){if(R!==null){if(i[R]!==void 0)return i[R];Je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let le;z&&(le=e.get("EXT_texture_norm16"),le||Je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===i.RED&&(O===i.FLOAT&&(Q=i.R32F),O===i.HALF_FLOAT&&(Q=i.R16F),O===i.UNSIGNED_BYTE&&(Q=i.R8),O===i.UNSIGNED_SHORT&&le&&(Q=le.R16_EXT),O===i.SHORT&&le&&(Q=le.R16_SNORM_EXT)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Q=i.R8UI),O===i.UNSIGNED_SHORT&&(Q=i.R16UI),O===i.UNSIGNED_INT&&(Q=i.R32UI),O===i.BYTE&&(Q=i.R8I),O===i.SHORT&&(Q=i.R16I),O===i.INT&&(Q=i.R32I)),v===i.RG&&(O===i.FLOAT&&(Q=i.RG32F),O===i.HALF_FLOAT&&(Q=i.RG16F),O===i.UNSIGNED_BYTE&&(Q=i.RG8),O===i.UNSIGNED_SHORT&&le&&(Q=le.RG16_EXT),O===i.SHORT&&le&&(Q=le.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Q=i.RG8UI),O===i.UNSIGNED_SHORT&&(Q=i.RG16UI),O===i.UNSIGNED_INT&&(Q=i.RG32UI),O===i.BYTE&&(Q=i.RG8I),O===i.SHORT&&(Q=i.RG16I),O===i.INT&&(Q=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),O===i.UNSIGNED_INT&&(Q=i.RGB32UI),O===i.BYTE&&(Q=i.RGB8I),O===i.SHORT&&(Q=i.RGB16I),O===i.INT&&(Q=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),O===i.UNSIGNED_INT&&(Q=i.RGBA32UI),O===i.BYTE&&(Q=i.RGBA8I),O===i.SHORT&&(Q=i.RGBA16I),O===i.INT&&(Q=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_SHORT&&le&&(Q=le.RGB16_EXT),O===i.SHORT&&le&&(Q=le.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),v===i.RGBA){const j=ce?Uc:pt.getTransfer(J);O===i.FLOAT&&(Q=i.RGBA32F),O===i.HALF_FLOAT&&(Q=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Q=j===Et?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&le&&(Q=le.RGBA16_EXT),O===i.SHORT&&le&&(Q=le.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function y(R,v){let O;return R?v===null||v===sr||v===$o?O=i.DEPTH24_STENCIL8:v===Ji?O=i.DEPTH32F_STENCIL8:v===Yo&&(O=i.DEPTH24_STENCIL8,Je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===sr||v===$o?O=i.DEPTH_COMPONENT24:v===Ji?O=i.DEPTH_COMPONENT32F:v===Yo&&(O=i.DEPTH_COMPONENT16),O}function T(R,v){return _(R)===!0||R.isFramebufferTexture&&R.minFilter!==xn&&R.minFilter!==Ln?Math.log2(Math.max(v.width,v.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?v.mipmaps.length:1}function b(R){const v=R.target;v.removeEventListener("dispose",b),A(v),v.isVideoTexture&&u.delete(v),v.isHTMLTexture&&d.delete(v)}function x(R){const v=R.target;v.removeEventListener("dispose",x),D(v)}function A(R){const v=n.get(R);if(v.__webglInit===void 0)return;const O=R.source,z=h.get(O);if(z){const J=z[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&C(R),Object.keys(z).length===0&&h.delete(O)}n.remove(R)}function C(R){const v=n.get(R);i.deleteTexture(v.__webglTexture);const O=R.source,z=h.get(O);delete z[v.__cacheKey],a.memory.textures--}function D(R){const v=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(v.__webglFramebuffer[z]))for(let J=0;J<v.__webglFramebuffer[z].length;J++)i.deleteFramebuffer(v.__webglFramebuffer[z][J]);else i.deleteFramebuffer(v.__webglFramebuffer[z]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[z])}else{if(Array.isArray(v.__webglFramebuffer))for(let z=0;z<v.__webglFramebuffer.length;z++)i.deleteFramebuffer(v.__webglFramebuffer[z]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let z=0;z<v.__webglColorRenderbuffer.length;z++)v.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[z]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const O=R.textures;for(let z=0,J=O.length;z<J;z++){const ce=n.get(O[z]);ce.__webglTexture&&(i.deleteTexture(ce.__webglTexture),a.memory.textures--),n.remove(O[z])}n.remove(R)}let L=0;function q(){L=0}function X(){return L}function N(R){L=R}function H(){const R=L;return R>=r.maxTextures&&Je("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),L+=1,R}function U(R){const v=[];return v.push(R.wrapS),v.push(R.wrapT),v.push(R.wrapR||0),v.push(R.magFilter),v.push(R.minFilter),v.push(R.anisotropy),v.push(R.internalFormat),v.push(R.format),v.push(R.type),v.push(R.generateMipmaps),v.push(R.premultiplyAlpha),v.push(R.flipY),v.push(R.unpackAlignment),v.push(R.colorSpace),v.join()}function Y(R,v){const O=n.get(R);if(R.isVideoTexture&&I(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&O.__version!==R.version){const z=R.image;if(z===null)Je("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)Je("WebGLRenderer: Texture marked for update but image is incomplete");else{fe(O,R,v);return}}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function B(R,v){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){fe(O,R,v);return}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function P(R,v){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){fe(O,R,v);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function ne(R,v){const O=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&O.__version!==R.version){Ce(O,R,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const de={[qf]:i.REPEAT,[vr]:i.CLAMP_TO_EDGE,[Yf]:i.MIRRORED_REPEAT},Ye={[xn]:i.NEAREST,[xS]:i.NEAREST_MIPMAP_NEAREST,[Tl]:i.NEAREST_MIPMAP_LINEAR,[Ln]:i.LINEAR,[Eu]:i.LINEAR_MIPMAP_NEAREST,[bs]:i.LINEAR_MIPMAP_LINEAR},Ge={[yS]:i.NEVER,[wS]:i.ALWAYS,[TS]:i.LESS,[fd]:i.LEQUAL,[ES]:i.EQUAL,[hd]:i.GEQUAL,[bS]:i.GREATER,[AS]:i.NOTEQUAL};function Fe(R,v){if(v.type===Ji&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ln||v.magFilter===Eu||v.magFilter===Tl||v.magFilter===bs||v.minFilter===Ln||v.minFilter===Eu||v.minFilter===Tl||v.minFilter===bs)&&Je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,de[v.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,de[v.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,de[v.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ye[v.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ye[v.minFilter]),v.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Ge[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===xn||v.minFilter!==Tl&&v.minFilter!==bs||v.type===Ji&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function G(R,v){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,v.addEventListener("dispose",b));const z=v.source;let J=h.get(z);J===void 0&&(J={},h.set(z,J));const ce=U(v);if(ce!==R.__cacheKey){J[ce]===void 0&&(J[ce]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),J[ce].usedTimes++;const le=J[R.__cacheKey];le!==void 0&&(J[R.__cacheKey].usedTimes--,le.usedTimes===0&&C(v)),R.__cacheKey=ce,R.__webglTexture=J[ce].texture}return O}function oe(R,v,O){return Math.floor(Math.floor(R/O)/v)}function te(R,v,O,z){const ce=R.updateRanges;if(ce.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,z,v.data);else{ce.sort((Ne,xe)=>Ne.start-xe.start);let le=0;for(let Ne=1;Ne<ce.length;Ne++){const xe=ce[le],_e=ce[Ne],he=xe.start+xe.count,ze=oe(_e.start,v.width,4),Le=oe(xe.start,v.width,4);_e.start<=he+1&&ze===Le&&oe(_e.start+_e.count-1,v.width,4)===ze?xe.count=Math.max(xe.count,_e.start+_e.count-xe.start):(++le,ce[le]=_e)}ce.length=le+1;const Q=t.getParameter(i.UNPACK_ROW_LENGTH),j=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Ne=0,xe=ce.length;Ne<xe;Ne++){const _e=ce[Ne],he=Math.floor(_e.start/4),ze=Math.ceil(_e.count/4),Le=he%v.width,F=Math.floor(he/v.width),pe=ze,ee=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Le),t.pixelStorei(i.UNPACK_SKIP_ROWS,F),t.texSubImage2D(i.TEXTURE_2D,0,Le,F,pe,ee,O,z,v.data)}R.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,j),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function fe(R,v,O){let z=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(z=i.TEXTURE_3D);const J=G(R,v),ce=v.source;t.bindTexture(z,R.__webglTexture,i.TEXTURE0+O);const le=n.get(ce);if(ce.version!==le.__version||J===!0){if(t.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ee=pt.getPrimaries(pt.workingColorSpace),ge=v.colorSpace===Gr?null:pt.getPrimaries(v.colorSpace),Se=v.colorSpace===Gr||ee===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let j=m(v.image,!1,r.maxTextureSize);j=Ze(v,j);const me=s.convert(v.format,v.colorSpace),Ne=s.convert(v.type);let xe=S(v.internalFormat,me,Ne,v.normalized,v.colorSpace,v.isVideoTexture);Fe(z,v);let _e;const he=v.mipmaps,ze=v.isVideoTexture!==!0,Le=le.__version===void 0||J===!0,F=ce.dataReady,pe=T(v,j);if(v.isDepthTexture)xe=y(v.format===As,v.type),Le&&(ze?t.texStorage2D(i.TEXTURE_2D,1,xe,j.width,j.height):t.texImage2D(i.TEXTURE_2D,0,xe,j.width,j.height,0,me,Ne,null));else if(v.isDataTexture)if(he.length>0){ze&&Le&&t.texStorage2D(i.TEXTURE_2D,pe,xe,he[0].width,he[0].height);for(let ee=0,ge=he.length;ee<ge;ee++)_e=he[ee],ze?F&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,_e.width,_e.height,me,Ne,_e.data):t.texImage2D(i.TEXTURE_2D,ee,xe,_e.width,_e.height,0,me,Ne,_e.data);v.generateMipmaps=!1}else ze?(Le&&t.texStorage2D(i.TEXTURE_2D,pe,xe,j.width,j.height),F&&te(v,j,me,Ne)):t.texImage2D(i.TEXTURE_2D,0,xe,j.width,j.height,0,me,Ne,j.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ze&&Le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,he[0].width,he[0].height,j.depth);for(let ee=0,ge=he.length;ee<ge;ee++)if(_e=he[ee],v.format!==Bi)if(me!==null)if(ze){if(F)if(v.layerUpdates.size>0){const Se=jp(_e.width,_e.height,v.format,v.type);for(const ae of v.layerUpdates){const re=_e.data.subarray(ae*Se/_e.data.BYTES_PER_ELEMENT,(ae+1)*Se/_e.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,ae,_e.width,_e.height,1,me,re)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,_e.width,_e.height,j.depth,me,_e.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,xe,_e.width,_e.height,j.depth,0,_e.data,0,0);else Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?F&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,_e.width,_e.height,j.depth,me,Ne,_e.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,xe,_e.width,_e.height,j.depth,0,me,Ne,_e.data)}else{ze&&Le&&t.texStorage2D(i.TEXTURE_2D,pe,xe,he[0].width,he[0].height);for(let ee=0,ge=he.length;ee<ge;ee++)_e=he[ee],v.format!==Bi?me!==null?ze?F&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,_e.width,_e.height,me,_e.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,xe,_e.width,_e.height,0,_e.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?F&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,_e.width,_e.height,me,Ne,_e.data):t.texImage2D(i.TEXTURE_2D,ee,xe,_e.width,_e.height,0,me,Ne,_e.data)}else if(v.isDataArrayTexture)if(ze){if(Le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,j.width,j.height,j.depth),F)if(v.layerUpdates.size>0){const ee=jp(j.width,j.height,v.format,v.type);for(const ge of v.layerUpdates){const Se=j.data.subarray(ge*ee/j.data.BYTES_PER_ELEMENT,(ge+1)*ee/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ge,j.width,j.height,1,me,Ne,Se)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,me,Ne,j.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,j.width,j.height,j.depth,0,me,Ne,j.data);else if(v.isData3DTexture)ze?(Le&&t.texStorage3D(i.TEXTURE_3D,pe,xe,j.width,j.height,j.depth),F&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,me,Ne,j.data)):t.texImage3D(i.TEXTURE_3D,0,xe,j.width,j.height,j.depth,0,me,Ne,j.data);else if(v.isFramebufferTexture){if(Le)if(ze)t.texStorage2D(i.TEXTURE_2D,pe,xe,j.width,j.height);else{let ee=j.width,ge=j.height;for(let Se=0;Se<pe;Se++)t.texImage2D(i.TEXTURE_2D,Se,xe,ee,ge,0,me,Ne,null),ee>>=1,ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const ee=i.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),j.parentNode!==ee){ee.appendChild(j),d.add(v),ee.onpaint=ge=>{const Se=ge.changedElements;for(const ae of d)Se.includes(ae.image)&&(ae.needsUpdate=!0)},ee.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const Se=i.RGBA,ae=i.RGBA,re=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Se,ae,re,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(he.length>0){if(ze&&Le){const ee=ye(he[0]);t.texStorage2D(i.TEXTURE_2D,pe,xe,ee.width,ee.height)}for(let ee=0,ge=he.length;ee<ge;ee++)_e=he[ee],ze?F&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,me,Ne,_e):t.texImage2D(i.TEXTURE_2D,ee,xe,me,Ne,_e);v.generateMipmaps=!1}else if(ze){if(Le){const ee=ye(j);t.texStorage2D(i.TEXTURE_2D,pe,xe,ee.width,ee.height)}F&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Ne,j)}else t.texImage2D(i.TEXTURE_2D,0,xe,me,Ne,j);_(v)&&M(z),le.__version=ce.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Ce(R,v,O){if(v.image.length!==6)return;const z=G(R,v),J=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+O);const ce=n.get(J);if(J.version!==ce.__version||z===!0){t.activeTexture(i.TEXTURE0+O);const le=pt.getPrimaries(pt.workingColorSpace),Q=v.colorSpace===Gr?null:pt.getPrimaries(v.colorSpace),j=v.colorSpace===Gr||le===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const me=v.isCompressedTexture||v.image[0].isCompressedTexture,Ne=v.image[0]&&v.image[0].isDataTexture,xe=[];for(let ae=0;ae<6;ae++)!me&&!Ne?xe[ae]=m(v.image[ae],!0,r.maxCubemapSize):xe[ae]=Ne?v.image[ae].image:v.image[ae],xe[ae]=Ze(v,xe[ae]);const _e=xe[0],he=s.convert(v.format,v.colorSpace),ze=s.convert(v.type),Le=S(v.internalFormat,he,ze,v.normalized,v.colorSpace),F=v.isVideoTexture!==!0,pe=ce.__version===void 0||z===!0,ee=J.dataReady;let ge=T(v,_e);Fe(i.TEXTURE_CUBE_MAP,v);let Se;if(me){F&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Le,_e.width,_e.height);for(let ae=0;ae<6;ae++){Se=xe[ae].mipmaps;for(let re=0;re<Se.length;re++){const se=Se[re];v.format!==Bi?he!==null?F?ee&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re,0,0,se.width,se.height,he,se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re,Le,se.width,se.height,0,se.data):Je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re,0,0,se.width,se.height,he,ze,se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re,Le,se.width,se.height,0,he,ze,se.data)}}}else{if(Se=v.mipmaps,F&&pe){Se.length>0&&ge++;const ae=ye(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Le,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Ne){F?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,xe[ae].width,xe[ae].height,he,ze,xe[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Le,xe[ae].width,xe[ae].height,0,he,ze,xe[ae].data);for(let re=0;re<Se.length;re++){const ve=Se[re].image[ae].image;F?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re+1,0,0,ve.width,ve.height,he,ze,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re+1,Le,ve.width,ve.height,0,he,ze,ve.data)}}else{F?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,he,ze,xe[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Le,he,ze,xe[ae]);for(let re=0;re<Se.length;re++){const se=Se[re];F?ee&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re+1,0,0,he,ze,se.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,re+1,Le,he,ze,se.image[ae])}}}_(v)&&M(i.TEXTURE_CUBE_MAP),ce.__version=J.version,v.onUpdate&&v.onUpdate(v)}R.__version=v.version}function Me(R,v,O,z,J,ce){const le=s.convert(O.format,O.colorSpace),Q=s.convert(O.type),j=S(O.internalFormat,le,Q,O.normalized,O.colorSpace),me=n.get(v),Ne=n.get(O);if(Ne.__renderTarget=v,!me.__hasExternalTextures){const xe=Math.max(1,v.width>>ce),_e=Math.max(1,v.height>>ce);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,ce,j,xe,_e,v.depth,0,le,Q,null):t.texImage2D(J,ce,j,xe,_e,0,le,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),$e(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,J,Ne.__webglTexture,0,De(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,J,Ne.__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(R,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,R),v.depthBuffer){const z=v.depthTexture,J=z&&z.isDepthTexture?z.type:null,ce=y(v.stencilBuffer,J),le=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;$e(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De(v),ce,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,De(v),ce,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ce,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,R)}else{const z=v.textures;for(let J=0;J<z.length;J++){const ce=z[J],le=s.convert(ce.format,ce.colorSpace),Q=s.convert(ce.type),j=S(ce.internalFormat,le,Q,ce.normalized,ce.colorSpace);$e(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De(v),j,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,De(v),j,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,j,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(R,v,O){const z=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=n.get(v.depthTexture);if(J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),z){if(J.__webglInit===void 0&&(J.__webglInit=!0,v.depthTexture.addEventListener("dispose",b)),J.__webglTexture===void 0){J.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,v.depthTexture);const me=s.convert(v.depthTexture.format),Ne=s.convert(v.depthTexture.type);let xe;v.depthTexture.format===Rr?xe=i.DEPTH_COMPONENT24:v.depthTexture.format===As&&(xe=i.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,xe,v.width,v.height,0,me,Ne,null)}}else Y(v.depthTexture,0);const ce=J.__webglTexture,le=De(v),Q=z?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,j=v.depthTexture.format===As?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Rr)$e(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,ce,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,ce,0);else if(v.depthTexture.format===As)$e(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,ce,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Pe(R){const v=n.get(R),O=R.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==R.depthTexture){const z=R.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),z){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,z.removeEventListener("dispose",J)};z.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=z}if(R.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let z=0;z<6;z++)ue(v.__webglFramebuffer[z],R,z);else{const z=R.texture.mipmaps;z&&z.length>0?ue(v.__webglFramebuffer[0],R,0):ue(v.__webglFramebuffer,R,0)}else if(O){v.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[z]),v.__webglDepthbuffer[z]===void 0)v.__webglDepthbuffer[z]=i.createRenderbuffer(),Ee(v.__webglDepthbuffer[z],R,!1);else{const J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,ce)}}else{const z=R.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),Ee(v.__webglDepthbuffer,R,!1);else{const J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,ce)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(R,v,O){const z=n.get(R);v!==void 0&&Me(z.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Pe(R)}function be(R){const v=R.texture,O=n.get(R),z=n.get(v);R.addEventListener("dispose",x);const J=R.textures,ce=R.isWebGLCubeRenderTarget===!0,le=J.length>1;if(le||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=v.version,a.memory.textures++),ce){O.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer[Q]=[];for(let j=0;j<v.mipmaps.length;j++)O.__webglFramebuffer[Q][j]=i.createFramebuffer()}else O.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){O.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)O.__webglFramebuffer[Q]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(le)for(let Q=0,j=J.length;Q<j;Q++){const me=n.get(J[Q]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&$e(R)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Q=0;Q<J.length;Q++){const j=J[Q];O.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Q]);const me=s.convert(j.format,j.colorSpace),Ne=s.convert(j.type),xe=S(j.internalFormat,me,Ne,j.normalized,j.colorSpace,R.isXRRenderTarget===!0),_e=De(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,xe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,O.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),Ee(O.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ce){t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),Fe(i.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)Me(O.__webglFramebuffer[Q][j],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,j);else Me(O.__webglFramebuffer[Q],R,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);_(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let Q=0,j=J.length;Q<j;Q++){const me=J[Q],Ne=n.get(me);let xe=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(xe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,Ne.__webglTexture),Fe(xe,me),Me(O.__webglFramebuffer,R,me,i.COLOR_ATTACHMENT0+Q,xe,0),_(me)&&M(xe)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Q=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,z.__webglTexture),Fe(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let j=0;j<v.mipmaps.length;j++)Me(O.__webglFramebuffer[j],R,v,i.COLOR_ATTACHMENT0,Q,j);else Me(O.__webglFramebuffer,R,v,i.COLOR_ATTACHMENT0,Q,0);_(v)&&M(Q),t.unbindTexture()}R.depthBuffer&&Pe(R)}function V(R){const v=R.textures;for(let O=0,z=v.length;O<z;O++){const J=v[O];if(_(J)){const ce=w(R),le=n.get(J).__webglTexture;t.bindTexture(ce,le),M(ce),t.unbindTexture()}}}const qe=[],Ke=[];function it(R){if(R.samples>0){if($e(R)===!1){const v=R.textures,O=R.width,z=R.height;let J=i.COLOR_BUFFER_BIT;const ce=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(R),Q=v.length>1;if(Q)for(let me=0;me<v.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);const j=R.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let me=0;me<v.length;me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const Ne=n.get(v[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,O,z,0,0,O,z,J,i.NEAREST),l===!0&&(qe.length=0,Ke.length=0,qe.push(i.COLOR_ATTACHMENT0+me),R.depthBuffer&&R.resolveDepthBuffer===!1&&(qe.push(ce),Ke.push(ce),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,qe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let me=0;me<v.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,le.__webglColorRenderbuffer[me]);const Ne=n.get(v[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const v=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function De(R){return Math.min(r.maxSamples,R.samples)}function $e(R){const v=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function I(R){const v=a.render.frame;u.get(R)!==v&&(u.set(R,v),R.update())}function Ze(R,v){const O=R.colorSpace,z=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==Nc&&O!==Gr&&(pt.getTransfer(O)===Et?(z!==Bi||J!==bi)&&Je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",O)),v}function ye(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=q,this.getTextureUnits=X,this.setTextureUnits=N,this.setTexture2D=Y,this.setTexture2DArray=B,this.setTexture3D=P,this.setTextureCube=ne,this.rebindTextures=Oe,this.setupRenderTarget=be,this.updateRenderTargetMipmap=V,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=Me,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jb(i,e){function t(n,r=Gr){let s;const a=pt.getTransfer(r);if(n===bi)return i.UNSIGNED_BYTE;if(n===ad)return i.UNSIGNED_SHORT_4_4_4_4;if(n===od)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fg)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Og)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ng)return i.BYTE;if(n===Ug)return i.SHORT;if(n===Yo)return i.UNSIGNED_SHORT;if(n===sd)return i.INT;if(n===sr)return i.UNSIGNED_INT;if(n===Ji)return i.FLOAT;if(n===wr)return i.HALF_FLOAT;if(n===Bg)return i.ALPHA;if(n===zg)return i.RGB;if(n===Bi)return i.RGBA;if(n===Rr)return i.DEPTH_COMPONENT;if(n===As)return i.DEPTH_STENCIL;if(n===kg)return i.RED;if(n===ld)return i.RED_INTEGER;if(n===zs)return i.RG;if(n===cd)return i.RG_INTEGER;if(n===ud)return i.RGBA_INTEGER;if(n===cc||n===uc||n===fc||n===hc)if(a===Et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===cc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===uc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===cc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===uc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===$f||n===Kf||n===Zf||n===Jf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===$f)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qf||n===jf||n===eh||n===th||n===nh||n===Lc||n===ih)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Qf||n===jf)return a===Et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===eh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===th)return s.COMPRESSED_R11_EAC;if(n===nh)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Lc)return s.COMPRESSED_RG11_EAC;if(n===ih)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===rh||n===sh||n===ah||n===oh||n===lh||n===ch||n===uh||n===fh||n===hh||n===dh||n===ph||n===mh||n===_h||n===gh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===rh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===sh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ah)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===oh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===lh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ch)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===dh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ph)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_h)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===gh)return a===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===vh||n===xh||n===Sh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===vh)return a===Et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mh||n===yh||n===Ic||n===Th)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Mh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===yh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ic)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Th)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$o?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const e1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class n1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Zg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new zi({vertexShader:e1,fragmentShader:t1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ar(new jo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i1 extends Gs{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,p=null;const g=typeof XRWebGLBinding<"u",m=new n1,_={},M=t.getContextAttributes();let w=null,S=null;const y=[],T=[],b=new xt;let x=null;const A=new Ui;A.viewport=new Xt;const C=new Ui;C.viewport=new Xt;const D=[A,C],L=new hM;let q=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let oe=y[G];return oe===void 0&&(oe=new Lu,y[G]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(G){let oe=y[G];return oe===void 0&&(oe=new Lu,y[G]=oe),oe.getGripSpace()},this.getHand=function(G){let oe=y[G];return oe===void 0&&(oe=new Lu,y[G]=oe),oe.getHandSpace()};function N(G){const oe=T.indexOf(G.inputSource);if(oe===-1)return;const te=y[oe];te!==void 0&&(te.update(G.inputSource,G.frame,c||a),te.dispatchEvent({type:G.type,data:G.inputSource}))}function H(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",U);for(let G=0;G<y.length;G++){const oe=T[G];oe!==null&&(T[G]=null,y[G].disconnect(oe))}q=null,X=null,m.reset();for(const G in _)delete _[G];e.setRenderTarget(w),h=null,f=null,d=null,r=null,S=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&Je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&Je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",H),r.addEventListener("inputsourceschange",U),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(b),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,fe=null,Ce=null;M.depth&&(Ce=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=M.stencil?As:Rr,fe=M.stencil?$o:sr);const Me={colorFormat:t.RGBA8,depthFormat:Ce,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Me),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new nr(f.textureWidth,f.textureHeight,{format:Bi,type:bi,depthTexture:new Xa(f.textureWidth,f.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const te={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new nr(h.framebufferWidth,h.framebufferHeight,{format:Bi,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Fe.setContext(r),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(G){for(let oe=0;oe<G.removed.length;oe++){const te=G.removed[oe],fe=T.indexOf(te);fe>=0&&(T[fe]=null,y[fe].disconnect(te))}for(let oe=0;oe<G.added.length;oe++){const te=G.added[oe];let fe=T.indexOf(te);if(fe===-1){for(let Me=0;Me<y.length;Me++)if(Me>=T.length){T.push(te),fe=Me;break}else if(T[Me]===null){T[Me]=te,fe=Me;break}if(fe===-1)break}const Ce=y[fe];Ce&&Ce.connect(te)}}const Y=new Z,B=new Z;function P(G,oe,te){Y.setFromMatrixPosition(oe.matrixWorld),B.setFromMatrixPosition(te.matrixWorld);const fe=Y.distanceTo(B),Ce=oe.projectionMatrix.elements,Me=te.projectionMatrix.elements,Ee=Ce[14]/(Ce[10]-1),ue=Ce[14]/(Ce[10]+1),Pe=(Ce[9]+1)/Ce[5],Oe=(Ce[9]-1)/Ce[5],be=(Ce[8]-1)/Ce[0],V=(Me[8]+1)/Me[0],qe=Ee*be,Ke=Ee*V,it=fe/(-be+V),De=it*-be;if(oe.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(De),G.translateZ(it),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),Ce[10]===-1)G.projectionMatrix.copy(oe.projectionMatrix),G.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{const $e=Ee+it,I=ue+it,Ze=qe-De,ye=Ke+(fe-De),R=Pe*ue/I*$e,v=Oe*ue/I*$e;G.projectionMatrix.makePerspective(Ze,ye,R,v,$e,I),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function ne(G,oe){oe===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(oe.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let oe=G.near,te=G.far;m.texture!==null&&(m.depthNear>0&&(oe=m.depthNear),m.depthFar>0&&(te=m.depthFar)),L.near=C.near=A.near=oe,L.far=C.far=A.far=te,(q!==L.near||X!==L.far)&&(r.updateRenderState({depthNear:L.near,depthFar:L.far}),q=L.near,X=L.far),L.layers.mask=G.layers.mask|6,A.layers.mask=L.layers.mask&-5,C.layers.mask=L.layers.mask&-3;const fe=G.parent,Ce=L.cameras;ne(L,fe);for(let Me=0;Me<Ce.length;Me++)ne(Ce[Me],fe);Ce.length===2?P(L,A,C):L.projectionMatrix.copy(A.projectionMatrix),de(G,L,fe)};function de(G,oe,te){te===null?G.matrix.copy(oe.matrixWorld):(G.matrix.copy(te.matrixWorld),G.matrix.invert(),G.matrix.multiply(oe.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(oe.projectionMatrix),G.projectionMatrixInverse.copy(oe.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Eh*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(G){return _[G]};let Ye=null;function Ge(G,oe){if(u=oe.getViewerPose(c||a),p=oe,u!==null){const te=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let fe=!1;te.length!==L.cameras.length&&(L.cameras.length=0,fe=!0);for(let ue=0;ue<te.length;ue++){const Pe=te[ue];let Oe=null;if(h!==null)Oe=h.getViewport(Pe);else{const V=d.getViewSubImage(f,Pe);Oe=V.viewport,ue===0&&(e.setRenderTargetTextures(S,V.colorTexture,V.depthStencilTexture),e.setRenderTarget(S))}let be=D[ue];be===void 0&&(be=new Ui,be.layers.enable(ue),be.viewport=new Xt,D[ue]=be),be.matrix.fromArray(Pe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Pe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),ue===0&&(L.matrix.copy(be.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),fe===!0&&L.cameras.push(be)}const Ce=r.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const ue=d.getDepthInformation(te[0]);ue&&ue.isValid&&ue.texture&&m.init(ue,r.renderState)}if(Ce&&Ce.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let ue=0;ue<te.length;ue++){const Pe=te[ue].camera;if(Pe){let Oe=_[Pe];Oe||(Oe=new Zg,_[Pe]=Oe);const be=d.getCameraImage(Pe);Oe.sourceTexture=be}}}}for(let te=0;te<y.length;te++){const fe=T[te],Ce=y[te];fe!==null&&Ce!==void 0&&Ce.update(fe,oe,c||a)}Ye&&Ye(G,oe),oe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:oe}),p=null}const Fe=new jg;Fe.setAnimationLoop(Ge),this.setAnimationLoop=function(G){Ye=G},this.dispose=function(){}}}const r1=new sn,a0=new tt;a0.set(-1,0,0,0,1,0,0,0,1);function s1(i,e){function t(m,_){m.matrixAutoUpdate===!0&&m.updateMatrix(),_.value.copy(m.matrix)}function n(m,_){_.color.getRGB(m.fogColor.value,Jg(i)),_.isFog?(m.fogNear.value=_.near,m.fogFar.value=_.far):_.isFogExp2&&(m.fogDensity.value=_.density)}function r(m,_,M,w,S){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?s(m,_):_.isMeshLambertMaterial?(s(m,_),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(s(m,_),d(m,_)):_.isMeshPhongMaterial?(s(m,_),u(m,_),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(s(m,_),f(m,_),_.isMeshPhysicalMaterial&&h(m,_,S)):_.isMeshMatcapMaterial?(s(m,_),p(m,_)):_.isMeshDepthMaterial?s(m,_):_.isMeshDistanceMaterial?(s(m,_),g(m,_)):_.isMeshNormalMaterial?s(m,_):_.isLineBasicMaterial?(a(m,_),_.isLineDashedMaterial&&o(m,_)):_.isPointsMaterial?l(m,_,M,w):_.isSpriteMaterial?c(m,_):_.isShadowMaterial?(m.color.value.copy(_.color),m.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function s(m,_){m.opacity.value=_.opacity,_.color&&m.diffuse.value.copy(_.color),_.emissive&&m.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(m.map.value=_.map,t(_.map,m.mapTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,t(_.alphaMap,m.alphaMapTransform)),_.bumpMap&&(m.bumpMap.value=_.bumpMap,t(_.bumpMap,m.bumpMapTransform),m.bumpScale.value=_.bumpScale,_.side===Qn&&(m.bumpScale.value*=-1)),_.normalMap&&(m.normalMap.value=_.normalMap,t(_.normalMap,m.normalMapTransform),m.normalScale.value.copy(_.normalScale),_.side===Qn&&m.normalScale.value.negate()),_.displacementMap&&(m.displacementMap.value=_.displacementMap,t(_.displacementMap,m.displacementMapTransform),m.displacementScale.value=_.displacementScale,m.displacementBias.value=_.displacementBias),_.emissiveMap&&(m.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,m.emissiveMapTransform)),_.specularMap&&(m.specularMap.value=_.specularMap,t(_.specularMap,m.specularMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest);const M=e.get(_),w=M.envMap,S=M.envMapRotation;w&&(m.envMap.value=w,m.envMapRotation.value.setFromMatrix4(r1.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(a0),m.reflectivity.value=_.reflectivity,m.ior.value=_.ior,m.refractionRatio.value=_.refractionRatio),_.lightMap&&(m.lightMap.value=_.lightMap,m.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,m.lightMapTransform)),_.aoMap&&(m.aoMap.value=_.aoMap,m.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,m.aoMapTransform))}function a(m,_){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,_.map&&(m.map.value=_.map,t(_.map,m.mapTransform))}function o(m,_){m.dashSize.value=_.dashSize,m.totalSize.value=_.dashSize+_.gapSize,m.scale.value=_.scale}function l(m,_,M,w){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,m.size.value=_.size*M,m.scale.value=w*.5,_.map&&(m.map.value=_.map,t(_.map,m.uvTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,t(_.alphaMap,m.alphaMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest)}function c(m,_){m.diffuse.value.copy(_.color),m.opacity.value=_.opacity,m.rotation.value=_.rotation,_.map&&(m.map.value=_.map,t(_.map,m.mapTransform)),_.alphaMap&&(m.alphaMap.value=_.alphaMap,t(_.alphaMap,m.alphaMapTransform)),_.alphaTest>0&&(m.alphaTest.value=_.alphaTest)}function u(m,_){m.specular.value.copy(_.specular),m.shininess.value=Math.max(_.shininess,1e-4)}function d(m,_){_.gradientMap&&(m.gradientMap.value=_.gradientMap)}function f(m,_){m.metalness.value=_.metalness,_.metalnessMap&&(m.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,m.metalnessMapTransform)),m.roughness.value=_.roughness,_.roughnessMap&&(m.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,m.roughnessMapTransform)),_.envMap&&(m.envMapIntensity.value=_.envMapIntensity)}function h(m,_,M){m.ior.value=_.ior,_.sheen>0&&(m.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),m.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(m.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,m.sheenColorMapTransform)),_.sheenRoughnessMap&&(m.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,m.sheenRoughnessMapTransform))),_.clearcoat>0&&(m.clearcoat.value=_.clearcoat,m.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(m.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,m.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(m.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===Qn&&m.clearcoatNormalScale.value.negate())),_.dispersion>0&&(m.dispersion.value=_.dispersion),_.iridescence>0&&(m.iridescence.value=_.iridescence,m.iridescenceIOR.value=_.iridescenceIOR,m.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(m.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,m.iridescenceMapTransform)),_.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),_.transmission>0&&(m.transmission.value=_.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),_.transmissionMap&&(m.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,m.transmissionMapTransform)),m.thickness.value=_.thickness,_.thicknessMap&&(m.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=_.attenuationDistance,m.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(m.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(m.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=_.specularIntensity,m.specularColor.value.copy(_.specularColor),_.specularColorMap&&(m.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,m.specularColorMapTransform)),_.specularIntensityMap&&(m.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,_){_.matcap&&(m.matcap.value=_.matcap)}function g(m,_){const M=e.get(_).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function a1(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,y){const T=y.program;n.uniformBlockBinding(S,T)}function c(S,y){let T=r[S.id];T===void 0&&(m(S),T=u(S),r[S.id]=T,S.addEventListener("dispose",M));const b=y.program;n.updateUBOMapping(S,b);const x=e.render.frame;s[S.id]!==x&&(f(S),s[S.id]=x)}function u(S){const y=d();S.__bindingPointIndex=y;const T=i.createBuffer(),b=S.__size,x=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,b,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,T),T}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const y=r[S.id],T=S.uniforms,b=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let x=0,A=T.length;x<A;x++){const C=T[x];if(Array.isArray(C))for(let D=0,L=C.length;D<L;D++)h(C[D],x,D,b);else h(C,x,0,b)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(S,y,T,b){if(g(S,y,T,b)===!0){const x=S.__offset,A=S.value;if(Array.isArray(A)){let C=0;for(let D=0;D<A.length;D++){const L=A[D],q=_(L);p(L,S.__data,C),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(C+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(A,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,S.__data)}}function p(S,y,T){typeof S=="number"||typeof S=="boolean"?y[0]=S:S.isMatrix3?(y[0]=S.elements[0],y[1]=S.elements[1],y[2]=S.elements[2],y[3]=0,y[4]=S.elements[3],y[5]=S.elements[4],y[6]=S.elements[5],y[7]=0,y[8]=S.elements[6],y[9]=S.elements[7],y[10]=S.elements[8],y[11]=0):ArrayBuffer.isView(S)?y.set(new S.constructor(S.buffer,S.byteOffset,y.length)):S.toArray(y,T)}function g(S,y,T,b){const x=S.value,A=y+"_"+T;if(b[A]===void 0)return typeof x=="number"||typeof x=="boolean"?b[A]=x:ArrayBuffer.isView(x)?b[A]=x.slice():b[A]=x.clone(),!0;{const C=b[A];if(typeof x=="number"||typeof x=="boolean"){if(C!==x)return b[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(C.equals(x)===!1)return C.copy(x),!0}}return!1}function m(S){const y=S.uniforms;let T=0;const b=16;for(let A=0,C=y.length;A<C;A++){const D=Array.isArray(y[A])?y[A]:[y[A]];for(let L=0,q=D.length;L<q;L++){const X=D[L],N=Array.isArray(X.value)?X.value:[X.value];for(let H=0,U=N.length;H<U;H++){const Y=N[H],B=_(Y),P=T%b,ne=P%B.boundary,de=P+ne;T+=ne,de!==0&&b-de<B.storage&&(T+=b-de),X.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=T,T+=B.storage}}}const x=T%b;return x>0&&(T+=b-x),S.__size=T,S.__cache={},this}function _(S){const y={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(y.boundary=4,y.storage=4):S.isVector2?(y.boundary=8,y.storage=8):S.isVector3||S.isColor?(y.boundary=16,y.storage=12):S.isVector4?(y.boundary=16,y.storage=16):S.isMatrix3?(y.boundary=48,y.storage=48):S.isMatrix4?(y.boundary=64,y.storage=64):S.isTexture?Je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(y.boundary=16,y.storage=S.byteLength):Je("WebGLRenderer: Unsupported uniform value type.",S),y}function M(S){const y=S.target;y.removeEventListener("dispose",M);const T=a.indexOf(y.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function w(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:l,update:c,dispose:w}}const o1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Wi=null;function l1(){return Wi===null&&(Wi=new jS(o1,16,16,zs,wr),Wi.name="DFG_LUT",Wi.minFilter=Ln,Wi.magFilter=Ln,Wi.wrapS=vr,Wi.wrapT=vr,Wi.generateMipmaps=!1,Wi.needsUpdate=!0),Wi}class c1{constructor(e={}){const{canvas:t=CS(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:h=bi}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=h,m=new Set([ud,cd,ld]),_=new Set([bi,sr,Yo,$o,ad,od]),M=new Uint32Array(4),w=new Int32Array(4),S=new Z;let y=null,T=null;const b=[],x=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=tr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let D=!1,L=null,q=null,X=null,N=null;this._outputColorSpace=yi;let H=0,U=0,Y=null,B=-1,P=null;const ne=new Xt,de=new Xt;let Ye=null;const Ge=new yt(0);let Fe=0,G=t.width,oe=t.height,te=1,fe=null,Ce=null;const Me=new Xt(0,0,G,oe),Ee=new Xt(0,0,G,oe);let ue=!1;const Pe=new $g;let Oe=!1,be=!1;const V=new sn,qe=new Z,Ke=new Xt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let De=!1;function $e(){return Y===null?te:1}let I=n;function Ze(E,k){return t.getContext(E,k)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rd}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",ie,!1),t.addEventListener("webglcontextcreationerror",Xe,!1),I===null){const k="webgl2";if(I=Ze(k,E),I===null)throw Ze(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw vt("WebGLRenderer: "+E.message),E}let ye,R,v,O,z,J,ce,le,Q,j,me,Ne,xe,_e,he,ze,Le,F,pe,ee,ge,Se,ae;function re(){ye=new lE(I),ye.init(),ge=new jb(I,ye),R=new eE(I,ye,e,ge),v=new Jb(I,ye),R.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),q=I.createFramebuffer(),X=I.createFramebuffer(),N=I.createFramebuffer(),O=new fE(I),z=new Ob,J=new Qb(I,ye,v,z,R,ge,O),ce=new oE(C),le=new mM(I),Se=new QT(I,le),Q=new cE(I,le,O,Se),j=new dE(I,Q,le,Se,O),F=new hE(I,R,J),he=new tE(z),me=new Fb(C,ce,ye,R,Se,he),Ne=new s1(C,z),xe=new zb,_e=new Xb(ye),Le=new JT(C,ce,v,j,p,l),ze=new Zb(C,j,R),ae=new a1(I,O,R,v),pe=new jT(I,ye,O),ee=new uE(I,ye,O),O.programs=me.programs,C.capabilities=R,C.extensions=ye,C.properties=z,C.renderLists=xe,C.shadowMap=ze,C.state=v,C.info=O}re(),g!==bi&&(A=new mE(g,t.width,t.height,o,r,s));const se=new i1(C,I);this.xr=se,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=ye.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ye.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(E){E!==void 0&&(te=E,this.setSize(G,oe,!1))},this.getSize=function(E){return E.set(G,oe)},this.setSize=function(E,k,K=!0){if(se.isPresenting){Je("WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,oe=k,t.width=Math.floor(E*te),t.height=Math.floor(k*te),K===!0&&(t.style.width=E+"px",t.style.height=k+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(G*te,oe*te).floor()},this.setDrawingBufferSize=function(E,k,K){G=E,oe=k,te=K,t.width=Math.floor(E*K),t.height=Math.floor(k*K),this.setViewport(0,0,E,k)},this.setEffects=function(E){if(g===bi){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let k=0;k<E.length;k++)if(E[k].isOutputPass===!0){Je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(ne)},this.getViewport=function(E){return E.copy(Me)},this.setViewport=function(E,k,K,W){E.isVector4?Me.set(E.x,E.y,E.z,E.w):Me.set(E,k,K,W),v.viewport(ne.copy(Me).multiplyScalar(te).round())},this.getScissor=function(E){return E.copy(Ee)},this.setScissor=function(E,k,K,W){E.isVector4?Ee.set(E.x,E.y,E.z,E.w):Ee.set(E,k,K,W),v.scissor(de.copy(Ee).multiplyScalar(te).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(E){v.setScissorTest(ue=E)},this.setOpaqueSort=function(E){fe=E},this.setTransparentSort=function(E){Ce=E},this.getClearColor=function(E){return E.copy(Le.getClearColor())},this.setClearColor=function(){Le.setClearColor(...arguments)},this.getClearAlpha=function(){return Le.getClearAlpha()},this.setClearAlpha=function(){Le.setClearAlpha(...arguments)},this.clear=function(E=!0,k=!0,K=!0){let W=0;if(E){let $=!1;if(Y!==null){const Te=Y.texture.format;$=m.has(Te)}if($){const Te=Y.texture.type,Ae=_.has(Te),Re=Le.getClearColor(),ke=Le.getClearAlpha(),He=Re.r,nt=Re.g,at=Re.b;Ae?(M[0]=He,M[1]=nt,M[2]=at,M[3]=ke,I.clearBufferuiv(I.COLOR,0,M)):(w[0]=He,w[1]=nt,w[2]=at,w[3]=ke,I.clearBufferiv(I.COLOR,0,w))}else W|=I.COLOR_BUFFER_BIT}k&&(W|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),L=E},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",ie,!1),t.removeEventListener("webglcontextcreationerror",Xe,!1),Le.dispose(),xe.dispose(),_e.dispose(),z.dispose(),ce.dispose(),j.dispose(),Se.dispose(),ae.dispose(),me.dispose(),se.dispose(),se.removeEventListener("sessionstart",Ut),se.removeEventListener("sessionend",At),dt.stop()};function ve(E){E.preventDefault(),Np("WebGLRenderer: Context Lost."),D=!0}function ie(){Np("WebGLRenderer: Context Restored."),D=!1;const E=O.autoReset,k=ze.enabled,K=ze.autoUpdate,W=ze.needsUpdate,$=ze.type;re(),O.autoReset=E,ze.enabled=k,ze.autoUpdate=K,ze.needsUpdate=W,ze.type=$}function Xe(E){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ue(E){const k=E.target;k.removeEventListener("dispose",Ue),et(k)}function et(E){Qt(E),z.remove(E)}function Qt(E){const k=z.get(E).programs;k!==void 0&&(k.forEach(function(K){me.releaseProgram(K)}),E.isShaderMaterial&&me.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,K,W,$,Te){k===null&&(k=it);const Ae=$.isMesh&&$.matrixWorld.determinantAffine()<0,Re=hn(E,k,K,W,$);v.setMaterial(W,Ae);let ke=K.index,He=1;if(W.wireframe===!0){if(ke=Q.getWireframeAttribute(K),ke===void 0)return;He=2}const nt=K.drawRange,at=K.attributes.position;let We=nt.start*He,bt=(nt.start+nt.count)*He;Te!==null&&(We=Math.max(We,Te.start*He),bt=Math.min(bt,(Te.start+Te.count)*He)),ke!==null?(We=Math.max(We,0),bt=Math.min(bt,ke.count)):at!=null&&(We=Math.max(We,0),bt=Math.min(bt,at.count));const $t=bt-We;if($t<0||$t===1/0)return;Se.setup($,W,Re,K,ke);let Wt,wt=pe;if(ke!==null&&(Wt=le.get(ke),wt=ee,wt.setIndex(Wt)),$.isMesh)W.wireframe===!0?(v.setLineWidth(W.wireframeLinewidth*$e()),wt.setMode(I.LINES)):wt.setMode(I.TRIANGLES);else if($.isLine){let yn=W.linewidth;yn===void 0&&(yn=1),v.setLineWidth(yn*$e()),$.isLineSegments?wt.setMode(I.LINES):$.isLineLoop?wt.setMode(I.LINE_LOOP):wt.setMode(I.LINE_STRIP)}else $.isPoints?wt.setMode(I.POINTS):$.isSprite&&wt.setMode(I.TRIANGLES);if($.isBatchedMesh)if(ye.get("WEBGL_multi_draw"))wt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const yn=$._multiDrawStarts,Ie=$._multiDrawCounts,ei=$._multiDrawCount,gt=ke?le.get(ke).bytesPerElement:1,vi=z.get(W).currentProgram.getUniforms();for(let Vi=0;Vi<ei;Vi++)vi.setValue(I,"_gl_DrawID",Vi),wt.render(yn[Vi]/gt,Ie[Vi])}else if($.isInstancedMesh)wt.renderInstances(We,$t,$.count);else if(K.isInstancedBufferGeometry){const yn=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ie=Math.min(K.instanceCount,yn);wt.renderInstances(We,$t,Ie)}else wt.render(We,$t)};function lt(E,k,K){E.transparent===!0&&E.side===_r&&E.forceSinglePass===!1?(E.side=Qn,E.needsUpdate=!0,Gt(E,k,K),E.side=as,E.needsUpdate=!0,Gt(E,k,K),E.side=_r):Gt(E,k,K)}this.compile=function(E,k,K=null){K===null&&(K=E),T=_e.get(K),T.init(k),x.push(T),K.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),E!==K&&E.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(T.pushLight($),$.castShadow&&T.pushShadow($))}),T.setupLights();const W=new Set;return E.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Te=$.material;if(Te)if(Array.isArray(Te))for(let Ae=0;Ae<Te.length;Ae++){const Re=Te[Ae];lt(Re,K,$),W.add(Re)}else lt(Te,K,$),W.add(Te)}),T=x.pop(),W},this.compileAsync=function(E,k,K=null){const W=this.compile(E,k,K);return new Promise($=>{function Te(){if(W.forEach(function(Ae){z.get(Ae).currentProgram.isReady()&&W.delete(Ae)}),W.size===0){$(E);return}setTimeout(Te,10)}ye.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Nt=null;function fn(E){Nt&&Nt(E)}function Ut(){dt.stop()}function At(){dt.start()}const dt=new jg;dt.setAnimationLoop(fn),typeof self<"u"&&dt.setContext(self),this.setAnimationLoop=function(E){Nt=E,se.setAnimationLoop(E),E===null?dt.stop():dt.start()},se.addEventListener("sessionstart",Ut),se.addEventListener("sessionend",At),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;L!==null&&L.renderStart(E,k);const K=se.enabled===!0&&se.isPresenting===!0,W=A!==null&&(Y===null||K)&&A.begin(C,Y);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(k),k=se.getCamera()),E.isScene===!0&&E.onBeforeRender(C,E,k,Y),T=_e.get(E,x.length),T.init(k),T.state.textureUnits=J.getTextureUnits(),x.push(T),V.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Pe.setFromProjectionMatrix(V,Qi,k.reversedDepth),be=this.localClippingEnabled,Oe=he.init(this.clippingPlanes,be),y=xe.get(E,b.length),y.init(),b.push(y),se.enabled===!0&&se.isPresenting===!0){const Ae=C.xr.getDepthSensingMesh();Ae!==null&&Nn(Ae,k,-1/0,C.sortObjects)}Nn(E,k,0,C.sortObjects),y.finish(),C.sortObjects===!0&&y.sort(fe,Ce,k.reversedDepth),De=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,De&&Le.addToRenderList(y,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Oe===!0&&he.beginShadows();const $=T.state.shadowsArray;if(ze.render($,E,k),Oe===!0&&he.endShadows(),(W&&A.hasRenderPass())===!1){const Ae=y.opaque,Re=y.transmissive;if(T.setupLights(),k.isArrayCamera){const ke=k.cameras;if(Re.length>0)for(let He=0,nt=ke.length;He<nt;He++){const at=ke[He];Mn(Ae,Re,E,at)}De&&Le.render(E);for(let He=0,nt=ke.length;He<nt;He++){const at=ke[He];Dt(y,E,at,at.viewport)}}else Re.length>0&&Mn(Ae,Re,E,k),De&&Le.render(E),Dt(y,E,k)}Y!==null&&U===0&&(J.updateMultisampleRenderTarget(Y),J.updateRenderTargetMipmap(Y)),W&&A.end(C),E.isScene===!0&&E.onAfterRender(C,E,k),Se.resetDefaultState(),B=-1,P=null,x.pop(),x.length>0?(T=x[x.length-1],J.setTextureUnits(T.state.textureUnits),Oe===!0&&he.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,b.pop(),b.length>0?y=b[b.length-1]:y=null,L!==null&&L.renderEnd()};function Nn(E,k,K,W){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)K=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLightProbeGrid)T.pushLightProbeGrid(E);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Pe.intersectsSprite(E)){W&&Ke.setFromMatrixPosition(E.matrixWorld).applyMatrix4(V);const Ae=j.update(E),Re=E.material;Re.visible&&y.push(E,Ae,Re,K,Ke.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Pe.intersectsObject(E))){const Ae=j.update(E),Re=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ke.copy(E.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ke.copy(Ae.boundingSphere.center)),Ke.applyMatrix4(E.matrixWorld).applyMatrix4(V)),Array.isArray(Re)){const ke=Ae.groups;for(let He=0,nt=ke.length;He<nt;He++){const at=ke[He],We=Re[at.materialIndex];We&&We.visible&&y.push(E,Ae,We,K,Ke.z,at)}}else Re.visible&&y.push(E,Ae,Re,K,Ke.z,null)}}const Te=E.children;for(let Ae=0,Re=Te.length;Ae<Re;Ae++)Nn(Te[Ae],k,K,W)}function Dt(E,k,K,W){const{opaque:$,transmissive:Te,transparent:Ae}=E;T.setupLightsView(K),Oe===!0&&he.setGlobalState(C.clippingPlanes,K),W&&v.viewport(ne.copy(W)),$.length>0&&Un($,k,K),Te.length>0&&Un(Te,k,K),Ae.length>0&&Un(Ae,k,K),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Mn(E,k,K,W){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[W.id]===void 0){const We=ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[W.id]=new nr(1,1,{generateMipmaps:!0,type:We?wr:bi,minFilter:bs,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace})}const Te=T.state.transmissionRenderTarget[W.id],Ae=W.viewport||ne;Te.setSize(Ae.z*C.transmissionResolutionScale,Ae.w*C.transmissionResolutionScale);const Re=C.getRenderTarget(),ke=C.getActiveCubeFace(),He=C.getActiveMipmapLevel();C.setRenderTarget(Te),C.getClearColor(Ge),Fe=C.getClearAlpha(),Fe<1&&C.setClearColor(16777215,.5),C.clear(),De&&Le.render(K);const nt=C.toneMapping;C.toneMapping=tr;const at=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),T.setupLightsView(W),Oe===!0&&he.setGlobalState(C.clippingPlanes,W),Un(E,K,W),J.updateMultisampleRenderTarget(Te),J.updateRenderTargetMipmap(Te),ye.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let bt=0,$t=k.length;bt<$t;bt++){const Wt=k[bt],{object:wt,geometry:yn,material:Ie,group:ei}=Wt;if(Ie.side===_r&&wt.layers.test(W.layers)){const gt=Ie.side;Ie.side=Qn,Ie.needsUpdate=!0,jt(wt,K,W,yn,Ie,ei),Ie.side=gt,Ie.needsUpdate=!0,We=!0}}We===!0&&(J.updateMultisampleRenderTarget(Te),J.updateRenderTargetMipmap(Te))}C.setRenderTarget(Re,ke,He),C.setClearColor(Ge,Fe),at!==void 0&&(W.viewport=at),C.toneMapping=nt}function Un(E,k,K){const W=k.isScene===!0?k.overrideMaterial:null;for(let $=0,Te=E.length;$<Te;$++){const Ae=E[$],{object:Re,geometry:ke,group:He}=Ae;let nt=Ae.material;nt.allowOverride===!0&&W!==null&&(nt=W),Re.layers.test(K.layers)&&jt(Re,k,K,ke,nt,He)}}function jt(E,k,K,W,$,Te){E.onBeforeRender(C,k,K,W,$,Te),E.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),$.onBeforeRender(C,k,K,W,E,Te),$.transparent===!0&&$.side===_r&&$.forceSinglePass===!1?($.side=Qn,$.needsUpdate=!0,C.renderBufferDirect(K,k,W,$,E,Te),$.side=as,$.needsUpdate=!0,C.renderBufferDirect(K,k,W,$,E,Te),$.side=_r):C.renderBufferDirect(K,k,W,$,E,Te),E.onAfterRender(C,k,K,W,$,Te)}function Gt(E,k,K){k.isScene!==!0&&(k=it);const W=z.get(E),$=T.state.lights,Te=T.state.shadowsArray,Ae=$.state.version,Re=me.getParameters(E,$.state,Te,k,K,T.state.lightProbeGridArray),ke=me.getProgramCacheKey(Re);let He=W.programs;W.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?k.environment:null,W.fog=k.fog;const nt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;W.envMap=ce.get(E.envMap||W.environment,nt),W.envMapRotation=W.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,He===void 0&&(E.addEventListener("dispose",Ue),He=new Map,W.programs=He);let at=He.get(ke);if(at!==void 0){if(W.currentProgram===at&&W.lightsStateVersion===Ae)return ki(E,Re),at}else Re.uniforms=me.getUniforms(E),L!==null&&E.isNodeMaterial&&L.build(E,K,Re),E.onBeforeCompile(Re,C),at=me.acquireProgram(Re,ke),He.set(ke,at),W.uniforms=Re.uniforms;const We=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(We.clippingPlanes=he.uniform),ki(E,Re),W.needsLights=gi(E),W.lightsStateVersion=Ae,W.needsLights&&(We.ambientLightColor.value=$.state.ambient,We.lightProbe.value=$.state.probe,We.directionalLights.value=$.state.directional,We.directionalLightShadows.value=$.state.directionalShadow,We.spotLights.value=$.state.spot,We.spotLightShadows.value=$.state.spotShadow,We.rectAreaLights.value=$.state.rectArea,We.ltc_1.value=$.state.rectAreaLTC1,We.ltc_2.value=$.state.rectAreaLTC2,We.pointLights.value=$.state.point,We.pointLightShadows.value=$.state.pointShadow,We.hemisphereLights.value=$.state.hemi,We.directionalShadowMatrix.value=$.state.directionalShadowMatrix,We.spotLightMatrix.value=$.state.spotLightMatrix,We.spotLightMap.value=$.state.spotLightMap,We.pointShadowMatrix.value=$.state.pointShadowMatrix),W.lightProbeGrid=T.state.lightProbeGridArray.length>0,W.currentProgram=at,W.uniformsList=null,at}function an(E){if(E.uniformsList===null){const k=E.currentProgram.getUniforms();E.uniformsList=dc.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function ki(E,k){const K=z.get(E);K.outputColorSpace=k.outputColorSpace,K.batching=k.batching,K.batchingColor=k.batchingColor,K.instancing=k.instancing,K.instancingColor=k.instancingColor,K.instancingMorph=k.instancingMorph,K.skinning=k.skinning,K.morphTargets=k.morphTargets,K.morphNormals=k.morphNormals,K.morphColors=k.morphColors,K.morphTargetsCount=k.morphTargetsCount,K.numClippingPlanes=k.numClippingPlanes,K.numIntersection=k.numClipIntersection,K.vertexAlphas=k.vertexAlphas,K.vertexTangents=k.vertexTangents,K.toneMapping=k.toneMapping}function Ws(E,k){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let K=0,W=E.length;K<W;K++){const $=E[K];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function hn(E,k,K,W,$){k.isScene!==!0&&(k=it),J.resetTextureUnits();const Te=k.fog,Ae=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?k.environment:null,Re=Y===null?C.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:pt.workingColorSpace,ke=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,He=ce.get(W.envMap||Ae,ke),nt=W.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,at=!!K.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),We=!!K.morphAttributes.position,bt=!!K.morphAttributes.normal,$t=!!K.morphAttributes.color;let Wt=tr;W.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Wt=C.toneMapping);const wt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,yn=wt!==void 0?wt.length:0,Ie=z.get(W),ei=T.state.lights;if(Oe===!0&&(be===!0||E!==P)){const Lt=E===P&&W.id===B;he.setState(W,E,Lt)}let gt=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==ei.state.version||Ie.outputColorSpace!==Re||$.isBatchedMesh&&Ie.batching===!1||!$.isBatchedMesh&&Ie.batching===!0||$.isBatchedMesh&&Ie.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Ie.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Ie.instancing===!1||!$.isInstancedMesh&&Ie.instancing===!0||$.isSkinnedMesh&&Ie.skinning===!1||!$.isSkinnedMesh&&Ie.skinning===!0||$.isInstancedMesh&&Ie.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ie.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ie.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ie.instancingMorph===!1&&$.morphTexture!==null||Ie.envMap!==He||W.fog===!0&&Ie.fog!==Te||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==he.numPlanes||Ie.numIntersection!==he.numIntersection)||Ie.vertexAlphas!==nt||Ie.vertexTangents!==at||Ie.morphTargets!==We||Ie.morphNormals!==bt||Ie.morphColors!==$t||Ie.toneMapping!==Wt||Ie.morphTargetsCount!==yn||!!Ie.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Ie.__version=W.version);let vi=Ie.currentProgram;gt===!0&&(vi=Gt(W,k,$),L&&W.isNodeMaterial&&L.onUpdateProgram(W,vi,Ie));let Vi=!1,Dr=!1,Xs=!1;const Rt=vi.getUniforms(),Kt=Ie.uniforms;if(v.useProgram(vi.program)&&(Vi=!0,Dr=!0,Xs=!0),W.id!==B&&(B=W.id,Dr=!0),Ie.needsLights){const Lt=Ws(T.state.lightProbeGridArray,$);Ie.lightProbeGrid!==Lt&&(Ie.lightProbeGrid=Lt,Dr=!0)}if(Vi||P!==E){v.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Rt.setValue(I,"projectionMatrix",E.projectionMatrix),Rt.setValue(I,"viewMatrix",E.matrixWorldInverse);const Ir=Rt.map.cameraPosition;Ir!==void 0&&Ir.setValue(I,qe.setFromMatrixPosition(E.matrixWorld)),R.logarithmicDepthBuffer&&Rt.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Rt.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),P!==E&&(P=E,Dr=!0,Xs=!0)}if(Ie.needsLights&&(ei.state.directionalShadowMap.length>0&&Rt.setValue(I,"directionalShadowMap",ei.state.directionalShadowMap,J),ei.state.spotShadowMap.length>0&&Rt.setValue(I,"spotShadowMap",ei.state.spotShadowMap,J),ei.state.pointShadowMap.length>0&&Rt.setValue(I,"pointShadowMap",ei.state.pointShadowMap,J)),$.isSkinnedMesh){Rt.setOptional(I,$,"bindMatrix"),Rt.setOptional(I,$,"bindMatrixInverse");const Lt=$.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),Rt.setValue(I,"boneTexture",Lt.boneTexture,J))}$.isBatchedMesh&&(Rt.setOptional(I,$,"batchingTexture"),Rt.setValue(I,"batchingTexture",$._matricesTexture,J),Rt.setOptional(I,$,"batchingIdTexture"),Rt.setValue(I,"batchingIdTexture",$._indirectTexture,J),Rt.setOptional(I,$,"batchingColorTexture"),$._colorsTexture!==null&&Rt.setValue(I,"batchingColorTexture",$._colorsTexture,J));const Lr=K.morphAttributes;if((Lr.position!==void 0||Lr.normal!==void 0||Lr.color!==void 0)&&F.update($,K,vi),(Dr||Ie.receiveShadow!==$.receiveShadow)&&(Ie.receiveShadow=$.receiveShadow,Rt.setValue(I,"receiveShadow",$.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&k.environment!==null&&(Kt.envMapIntensity.value=k.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=l1()),Dr){if(Rt.setValue(I,"toneMappingExposure",C.toneMappingExposure),Ie.needsLights&&Yt(Kt,Xs),Te&&W.fog===!0&&Ne.refreshFogUniforms(Kt,Te),Ne.refreshMaterialUniforms(Kt,W,te,oe,T.state.transmissionRenderTarget[E.id]),Ie.needsLights&&Ie.lightProbeGrid){const Lt=Ie.lightProbeGrid;Kt.probesSH.value=Lt.texture,Kt.probesMin.value.copy(Lt.boundingBox.min),Kt.probesMax.value.copy(Lt.boundingBox.max),Kt.probesResolution.value.copy(Lt.resolution)}dc.upload(I,an(Ie),Kt,J)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(dc.upload(I,an(Ie),Kt,J),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Rt.setValue(I,"center",$.center),Rt.setValue(I,"modelViewMatrix",$.modelViewMatrix),Rt.setValue(I,"normalMatrix",$.normalMatrix),Rt.setValue(I,"modelMatrix",$.matrixWorld),W.uniformsGroups!==void 0){const Lt=W.uniformsGroups;for(let Ir=0,qs=Lt.length;Ir<qs;Ir++){const Md=Lt[Ir];ae.update(Md,vi),ae.bind(Md,vi)}}return vi}function Yt(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function gi(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(E,k,K){const W=z.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),z.get(E.texture).__webglTexture=k,z.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:K,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,k){const K=z.get(E);K.__webglFramebuffer=k,K.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,K=0){Y=E,H=k,U=K;let W=null,$=!1,Te=!1;if(E){const Re=z.get(E);if(Re.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(I.FRAMEBUFFER,Re.__webglFramebuffer),ne.copy(E.viewport),de.copy(E.scissor),Ye=E.scissorTest,v.viewport(ne),v.scissor(de),v.setScissorTest(Ye),B=-1;return}else if(Re.__webglFramebuffer===void 0)J.setupRenderTarget(E);else if(Re.__hasExternalTextures)J.rebindTextures(E,z.get(E.texture).__webglTexture,z.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const nt=E.depthTexture;if(Re.__boundDepthTexture!==nt){if(nt!==null&&z.has(nt)&&(E.width!==nt.image.width||E.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(E)}}const ke=E.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Te=!0);const He=z.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(He[k])?W=He[k][K]:W=He[k],$=!0):E.samples>0&&J.useMultisampledRTT(E)===!1?W=z.get(E).__webglMultisampledFramebuffer:Array.isArray(He)?W=He[K]:W=He,ne.copy(E.viewport),de.copy(E.scissor),Ye=E.scissorTest}else ne.copy(Me).multiplyScalar(te).floor(),de.copy(Ee).multiplyScalar(te).floor(),Ye=ue;if(K!==0&&(W=q),v.bindFramebuffer(I.FRAMEBUFFER,W)&&v.drawBuffers(E,W),v.viewport(ne),v.scissor(de),v.setScissorTest(Ye),$){const Re=z.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+k,Re.__webglTexture,K)}else if(Te){const Re=k;for(let ke=0;ke<E.textures.length;ke++){const He=z.get(E.textures[ke]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+ke,He.__webglTexture,K,Re)}}else if(E!==null&&K!==0){const Re=z.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Re.__webglTexture,K)}B=-1},this.readRenderTargetPixels=function(E,k,K,W,$,Te,Ae,Re=0){if(!(E&&E.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ae!==void 0&&(ke=ke[Ae]),ke){v.bindFramebuffer(I.FRAMEBUFFER,ke);try{const He=E.textures[Re],nt=He.format,at=He.type;if(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Re),!R.textureFormatReadable(nt)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(at)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-W&&K>=0&&K<=E.height-$&&I.readPixels(k,K,W,$,ge.convert(nt),ge.convert(at),Te)}finally{const He=Y!==null?z.get(Y).__webglFramebuffer:null;v.bindFramebuffer(I.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(E,k,K,W,$,Te,Ae,Re=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ae!==void 0&&(ke=ke[Ae]),ke)if(k>=0&&k<=E.width-W&&K>=0&&K<=E.height-$){v.bindFramebuffer(I.FRAMEBUFFER,ke);const He=E.textures[Re],nt=He.format,at=He.type;if(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Re),!R.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(at))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,We),I.bufferData(I.PIXEL_PACK_BUFFER,Te.byteLength,I.STREAM_READ),I.readPixels(k,K,W,$,ge.convert(nt),ge.convert(at),0);const bt=Y!==null?z.get(Y).__webglFramebuffer:null;v.bindFramebuffer(I.FRAMEBUFFER,bt);const $t=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await PS(I,$t,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,We),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,Te),I.deleteBuffer(We),I.deleteSync($t),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,k=null,K=0){const W=Math.pow(2,-K),$=Math.floor(E.image.width*W),Te=Math.floor(E.image.height*W),Ae=k!==null?k.x:0,Re=k!==null?k.y:0;J.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,K,0,0,Ae,Re,$,Te),v.unbindTexture()},this.copyTextureToTexture=function(E,k,K=null,W=null,$=0,Te=0){let Ae,Re,ke,He,nt,at,We,bt,$t;const Wt=E.isCompressedTexture?E.mipmaps[Te]:E.image;if(K!==null)Ae=K.max.x-K.min.x,Re=K.max.y-K.min.y,ke=K.isBox3?K.max.z-K.min.z:1,He=K.min.x,nt=K.min.y,at=K.isBox3?K.min.z:0;else{const Kt=Math.pow(2,-$);Ae=Math.floor(Wt.width*Kt),Re=Math.floor(Wt.height*Kt),E.isDataArrayTexture?ke=Wt.depth:E.isData3DTexture?ke=Math.floor(Wt.depth*Kt):ke=1,He=0,nt=0,at=0}W!==null?(We=W.x,bt=W.y,$t=W.z):(We=0,bt=0,$t=0);const wt=ge.convert(k.format),yn=ge.convert(k.type);let Ie;k.isData3DTexture?(J.setTexture3D(k,0),Ie=I.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(J.setTexture2DArray(k,0),Ie=I.TEXTURE_2D_ARRAY):(J.setTexture2D(k,0),Ie=I.TEXTURE_2D),v.activeTexture(I.TEXTURE0),v.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,k.flipY),v.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),v.pixelStorei(I.UNPACK_ALIGNMENT,k.unpackAlignment);const ei=v.getParameter(I.UNPACK_ROW_LENGTH),gt=v.getParameter(I.UNPACK_IMAGE_HEIGHT),vi=v.getParameter(I.UNPACK_SKIP_PIXELS),Vi=v.getParameter(I.UNPACK_SKIP_ROWS),Dr=v.getParameter(I.UNPACK_SKIP_IMAGES);v.pixelStorei(I.UNPACK_ROW_LENGTH,Wt.width),v.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Wt.height),v.pixelStorei(I.UNPACK_SKIP_PIXELS,He),v.pixelStorei(I.UNPACK_SKIP_ROWS,nt),v.pixelStorei(I.UNPACK_SKIP_IMAGES,at);const Xs=E.isDataArrayTexture||E.isData3DTexture,Rt=k.isDataArrayTexture||k.isData3DTexture;if(E.isDepthTexture){const Kt=z.get(E),Lr=z.get(k),Lt=z.get(Kt.__renderTarget),Ir=z.get(Lr.__renderTarget);v.bindFramebuffer(I.READ_FRAMEBUFFER,Lt.__webglFramebuffer),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,Ir.__webglFramebuffer);for(let qs=0;qs<ke;qs++)Xs&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,z.get(E).__webglTexture,$,at+qs),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,z.get(k).__webglTexture,Te,$t+qs)),I.blitFramebuffer(He,nt,Ae,Re,We,bt,Ae,Re,I.DEPTH_BUFFER_BIT,I.NEAREST);v.bindFramebuffer(I.READ_FRAMEBUFFER,null),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if($!==0||E.isRenderTargetTexture||z.has(E)){const Kt=z.get(E),Lr=z.get(k);v.bindFramebuffer(I.READ_FRAMEBUFFER,X),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,N);for(let Lt=0;Lt<ke;Lt++)Xs?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Kt.__webglTexture,$,at+Lt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Kt.__webglTexture,$),Rt?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Lr.__webglTexture,Te,$t+Lt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Lr.__webglTexture,Te),$!==0?I.blitFramebuffer(He,nt,Ae,Re,We,bt,Ae,Re,I.COLOR_BUFFER_BIT,I.NEAREST):Rt?I.copyTexSubImage3D(Ie,Te,We,bt,$t+Lt,He,nt,Ae,Re):I.copyTexSubImage2D(Ie,Te,We,bt,He,nt,Ae,Re);v.bindFramebuffer(I.READ_FRAMEBUFFER,null),v.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Rt?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(Ie,Te,We,bt,$t,Ae,Re,ke,wt,yn,Wt.data):k.isCompressedArrayTexture?I.compressedTexSubImage3D(Ie,Te,We,bt,$t,Ae,Re,ke,wt,Wt.data):I.texSubImage3D(Ie,Te,We,bt,$t,Ae,Re,ke,wt,yn,Wt):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,Te,We,bt,Ae,Re,wt,yn,Wt.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,Te,We,bt,Wt.width,Wt.height,wt,Wt.data):I.texSubImage2D(I.TEXTURE_2D,Te,We,bt,Ae,Re,wt,yn,Wt);v.pixelStorei(I.UNPACK_ROW_LENGTH,ei),v.pixelStorei(I.UNPACK_IMAGE_HEIGHT,gt),v.pixelStorei(I.UNPACK_SKIP_PIXELS,vi),v.pixelStorei(I.UNPACK_SKIP_ROWS,Vi),v.pixelStorei(I.UNPACK_SKIP_IMAGES,Dr),Te===0&&k.generateMipmaps&&I.generateMipmap(Ie),v.unbindTexture()},this.initRenderTarget=function(E){z.get(E).__webglFramebuffer===void 0&&J.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?J.setTextureCube(E,0):E.isData3DTexture?J.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?J.setTexture2DArray(E,0):J.setTexture2D(E,0),v.unbindTexture()},this.resetState=function(){H=0,U=0,Y=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}function u1(){const i=document.getElementById("webgl-bg");if(!i)return;const e=new qS,t=new md(-1,1,1,-1,0,1),n=new c1({canvas:i,alpha:!0,antialias:!1});n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(Math.min(window.devicePixelRatio,2));const r=new jo(2,2),s=new zi({uniforms:{uTime:{value:0},uResolution:{value:new xt(window.innerWidth,window.innerHeight)},uMouse:{value:new xt(.5,.5)},uScroll:{value:0}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uScroll;
      
      varying vec2 vUv;

      // Classic Perlin 2D Noise 
      // by Stefan Gustavson
      vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

      float cnoise(vec2 P) {
        vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
        Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x,gy.x);
        vec2 g10 = vec2(gx.y,gy.y);
        vec2 g01 = vec2(gx.z,gy.z);
        vec2 g11 = vec2(gx.w,gy.w);
        vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
        g00 *= norm.x;
        g01 *= norm.y;
        g10 *= norm.z;
        g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
        return 2.3 * n_xy;
      }

      // Fractional Brownian Motion
      float fbm(vec2 x) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotate to reduce axial bias
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * cnoise(x);
          x = rot * x * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y; // Correct aspect ratio

        // Add slow movement and scroll influence
        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * uTime);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * uTime + uScroll * 0.5);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * uTime);

        float f = fbm(st + r);

        // Mix colors: Deep void black to cyber red
        vec3 colorBlack = vec3(0.02, 0.02, 0.03); // base dark
        vec3 colorRed = vec3(0.6, 0.05, 0.1);     // subtle accent
        vec3 colorBrightRed = vec3(0.9, 0.1, 0.2); // high intensity

        // Mouse interaction ripple
        float distToMouse = distance(vUv, uMouse);
        float mouseGlow = smoothstep(0.4, 0.0, distToMouse) * 0.5;
        
        // Base smoke color
        vec3 finalColor = mix(colorBlack, colorRed, clamp((f*f)*4.0, 0.0, 1.0));
        
        // Add brighter red edges
        finalColor = mix(finalColor, colorBrightRed, clamp(length(q), 0.0, 1.0) * mouseGlow);
        
        // Vignette
        float vignette = st.x * st.y * (1.0 - st.x) * (1.0 - st.y);
        vignette = clamp(pow(vignette * 15.0, 0.25), 0.0, 1.0);
        
        gl_FragColor = vec4(finalColor * vignette, 1.0);
      }
    `}),a=new ar(r,s);e.add(a);let o={x:.5,y:.5};window.addEventListener("mousemove",d=>{o.x=d.clientX/window.innerWidth,o.y=1-d.clientY/window.innerHeight});let l=0;window.addEventListener("scroll",()=>{l=window.scrollY/window.innerHeight});const c=new dM;function u(){requestAnimationFrame(u);const d=c.getElapsedTime();s.uniforms.uTime.value=d,s.uniforms.uMouse.value.x+=(o.x-s.uniforms.uMouse.value.x)*.05,s.uniforms.uMouse.value.y+=(o.y-s.uniforms.uMouse.value.y)*.05,s.uniforms.uScroll.value+=(l-s.uniforms.uScroll.value)*.1,n.render(e,t)}u(),window.addEventListener("resize",()=>{n.setSize(window.innerWidth,window.innerHeight),s.uniforms.uResolution.value.set(window.innerWidth,window.innerHeight)})}jr.registerPlugin(ft);u1();const el=new v0({duration:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i)),direction:"vertical",gestureDirection:"vertical",smooth:!0,mouseMultiplier:1,smoothTouch:!1,touchMultiplier:2,infinite:!1});el.on("scroll",ft.update);function o0(i){el.raf(i),requestAnimationFrame(o0)}requestAnimationFrame(o0);el.stop();const da=document.getElementById("lilith-loader");if(da){const i=da.querySelector(".loader-red-eye"),e=da.querySelectorAll(".loader-txt"),t=da.querySelector(".loader-gif"),n=document.querySelector(".hero-main-title"),r=document.querySelector(".hero-subtitle");n&&(n.style.opacity="0"),r&&(r.style.opacity="0"),jr.timeline({onComplete:()=>{if(da.style.display="none",el.start(),n&&r){n.style.opacity="1",i_(n,{chars:!0});const l=n.querySelectorAll("span");l.forEach(c=>{c.style.display="inline-block",c.style.opacity="0"}),xc(l,{translateY:[100,0],translateZ:[400,0],rotateX:[-90,0],opacity:[0,1],filter:["blur(10px)","blur(0px)"],duration:1200,delay:ho(60),ease:"outExpo"}),xc(r,{opacity:[0,1],letterSpacing:["1em","0.5em"],filter:["blur(10px)","blur(0px)"],duration:1500,delay:800,ease:"outQuart"})}const a=document.getElementById("bg-audio"),o=document.querySelector(".sound-toggle");a&&o&&a.play().then(()=>{o.classList.add("playing"),o.querySelector(".sound-text").textContent="SOUND ON"}).catch(()=>{console.log("Autoplay blocked. User needs to click SOUND OFF to play.")})}}).to(e[0],{opacity:1,duration:.1,yoyo:!0,repeat:5}).to(t,{opacity:.3,duration:.05,yoyo:!0,repeat:11},"<").to(e[1],{opacity:1,duration:.1,yoyo:!0,repeat:5}).to(t,{opacity:.6,filter:"invert(1) grayscale(100%)",duration:.05,yoyo:!0,repeat:11},"<").to(e[2],{opacity:1,scale:1.2,duration:.6,ease:"back.out(2)"}).to(e[2],{x:()=>Math.random()*20-10,y:()=>Math.random()*20-10,color:"#ffffff",duration:.05,yoyo:!0,repeat:10}).to(t,{opacity:1,filter:"contrast(300%) hue-rotate(90deg)",duration:.05,yoyo:!0,repeat:10},"<").to(i,{scale:1,opacity:1,duration:.2,ease:"back.out(2)"}).to(i,{scale:200,duration:1,ease:"power4.in"},"-=0.1").to(da,{opacity:0,filter:"blur(20px)",duration:.6,ease:"power2.out"})}const Tm=["/Image/125966425_p0.png","/Image/135330897_p0.jpg","/Image/137053802_p2.png","/Image/140460103_p0.jpg","/Image/146911000_p0.png","/Image/kosong.png","/Image/Lilith(2).png","/Image/Lilith(5).png","/Image/Lilith(6).png"],Em=document.querySelector(".image-trail-container");if(Em)for(let e=0;e<40;e++){const t=document.createElement("img");t.src=Tm[e%Tm.length];const n=120+Math.random()*180,r=n*(1.1+Math.random()*.4);t.style.position="absolute",t.style.width=`${n}px`,t.style.height=`${r}px`,t.style.objectFit="cover",t.style.borderRadius="12px",t.style.boxShadow="0 15px 40px rgba(0,0,0,0.6)",t.style.opacity="0",t.style.filter="brightness(0.5) sepia(0.3)",t.style.pointerEvents="auto",t.style.cursor="crosshair",t.style.left=`${Math.random()*90}vw`,t.style.top=`${Math.random()*90}vh`;const s=Math.random()*50-25;t.dataset.rotation=s,t.style.transform=`scale(0.8) rotate(${s}deg)`,t.style.transition="opacity 0.5s ease-out, transform 0.5s ease-out",t.addEventListener("mouseenter",()=>{t.style.transition="opacity 0.2s ease-out, transform 0.2s ease-out",t.style.opacity="0.25",t.style.transform=`scale(1) rotate(${s}deg)`,clearTimeout(t.hideTimeout),t.hideTimeout=setTimeout(()=>{t.style.transition="opacity 0.5s ease-in, transform 0.5s ease-in",t.style.opacity="0",t.style.transform=`scale(0.8) rotate(${s}deg)`},400)}),Em.appendChild(t)}const Vs=document.querySelector(".cursor"),f1=document.querySelector(".cursor-text");window.addEventListener("mousemove",i=>{Vs.style.transform=`translate(${i.clientX}px, ${i.clientY}px) translate(-50%, -50%)`});document.querySelectorAll("a, button, h1, h2, h3").forEach(i=>{i.addEventListener("mouseenter",()=>Vs.classList.add("active")),i.addEventListener("mouseleave",()=>Vs.classList.remove("active"))});document.querySelectorAll(".hover-explore").forEach(i=>{i.addEventListener("mouseenter",()=>{Vs.classList.add("explore"),f1.innerText="EXPLORE"}),i.addEventListener("mouseleave",()=>{Vs.classList.remove("explore")})});document.querySelectorAll(".magnetic").forEach(i=>{i.addEventListener("mousemove",e=>{const t=i.getBoundingClientRect(),n=e.clientX-t.left-t.width/2,r=e.clientY-t.top-t.height/2;i.style.transform=`translate(${n*.3}px, ${r*.3}px)`,i.querySelector(".magnetic-inner").style.transform=`translate(${n*.2}px, ${r*.2}px)`,Vs.classList.add("magnetic-active")}),i.addEventListener("mouseleave",()=>{i.style.transform="translate(0px, 0px)",i.querySelector(".magnetic-inner").style.transform="translate(0px, 0px)",i.style.transition="transform 0.5s ease-out",i.querySelector(".magnetic-inner").style.transition="transform 0.5s ease-out",Vs.classList.remove("magnetic-active"),setTimeout(()=>{i.style.transition="",i.querySelector(".magnetic-inner").style.transition=""},500)})});const oo=document.getElementById("bg-audio"),ql=document.querySelector(".sound-toggle"),tf=document.querySelector(".sound-text");oo&&ql&&tf&&(oo.volume=.4,ql.addEventListener("click",()=>{oo.paused?(oo.play(),ql.classList.add("playing"),tf.textContent="SOUND ON"):(oo.pause(),ql.classList.remove("playing"),tf.textContent="SOUND OFF")}));const lo=document.querySelector(".secret");lo&&lo.addEventListener("mousemove",i=>{const e=lo.getBoundingClientRect(),t=i.clientX-e.left,n=i.clientY-e.top;lo.style.setProperty("--mouse-x",`${t}px`),lo.style.setProperty("--mouse-y",`${n}px`)});const bm=document.querySelectorAll(".mono-line"),Am=document.querySelector(".mono-author");bm.length>0&&(jr.fromTo(bm,{opacity:0,y:30,filter:"blur(5px)"},{opacity:1,y:0,filter:"blur(0px)",stagger:1.5,scrollTrigger:{trigger:".monologue",start:"top 50%",end:"bottom 80%",scrub:1}}),Am&&jr.fromTo(Am,{opacity:0,x:-20,filter:"blur(5px)"},{opacity:1,x:0,filter:"blur(0px)",scrollTrigger:{trigger:".monologue",start:"bottom 90%",end:"bottom 70%",scrub:1}}));document.querySelectorAll(".split-target").forEach(i=>{i_(i,{words:!1,chars:!0}),i.querySelectorAll("span").forEach(t=>{t.style.opacity="0",t.style.transform="translateY(100px) rotate(10deg)"})});document.querySelectorAll(".game-title .border-frame, .game-title .word-the, .game-title .red-slash, .game-title .glitch-text, .game-title .word-of, .game-title .red-and").forEach(i=>{i.style.opacity="0"});const pc=new IntersectionObserver(i=>{i.forEach(e=>{if(e.isIntersecting){const t=e.target;if(t.classList.contains("split-target")){const n=t.querySelectorAll("span");xc(n,{y:[100,0],rotate:[10,0],opacity:[0,1],delay:ho(30,{start:100}),duration:1200,ease:"outExpo"}),pc.unobserve(t)}t.classList.contains("game-title")&&!t.dataset.animated&&(t.dataset.animated="true",iv({loop:!1}).add(".border-frame",{scale:[.9,1],opacity:[0,1],duration:800,ease:"easeOutElastic(1, .8)"}).add(".word-the",{opacity:[0,1],translateX:["-50%","-50%"],translateY:[-20,0],duration:400,ease:"outExpo"},"-=400").add(".red-slash",{opacity:[0,1],scale:[1.5,1],duration:600,ease:"outExpo",delay:ho(200)},"-=200").add(".glitch-text",{opacity:[0,1],skewX:[20,0],duration:500,ease:"outExpo",delay:ho(100)},"-=400").add(".word-of, .red-and",{opacity:[0,1],scale:[.5,1],duration:400,ease:"outBack",delay:ho(100)},"-=200"),pc.unobserve(t)),t.classList.contains("fade-target")&&(t.style.opacity="0",xc(t,{opacity:[0,1],y:[40,0],duration:1200,delay:200,ease:"outCirc"}),pc.unobserve(t))}})},{threshold:.1});document.querySelectorAll(".split-target, .fade-target, .game-title").forEach(i=>pc.observe(i));const wm=document.getElementById("hero");document.getElementById("character");const Yl=document.getElementById("gallery"),h1=document.getElementById("mystery"),Rm=document.querySelector(".reveal-img"),co=document.querySelector(".gallery-track");el.on("scroll",()=>{const i=window.scrollY,e=window.innerHeight,t=window.innerWidth,n=Math.max(0,Math.min(1,i/(wm.offsetHeight-e)));if(n>=0&&n<=1){const a=wm.querySelector(".hero-titles");a&&(a.style.transform=`translate(-50%, -50%) scale(${1+n*.5}) translateY(${n*100}px)`,a.style.opacity=1-n*1.5)}const r=Yl.offsetTop;if(i>=r&&i<=r+Yl.offsetHeight-e){const a=(i-r)/(Yl.offsetHeight-e),o=co.scrollWidth-t;co.style.transform=`translateX(${-a*o}px)`}else if(i<r)co.style.transform="translateX(0px)";else if(i>r+Yl.offsetHeight-e){const a=co.scrollWidth-t;co.style.transform=`translateX(${-a}px)`}const s=h1.offsetTop;if(i>s-e){const a=Math.max(0,Math.min(1,(i-s+e/2)/e));Rm.style.transform=`scale(${1.2-a*.2})`,Rm.style.filter=`sepia(${.8-a*.8}) hue-rotate(${-30+a*30}deg) saturate(${2-a})`}});const nf=document.querySelector(".gsap-text-container");if(nf){const i=nf.querySelector(".gsap-title"),e=nf.querySelector(".gsap-desc");if(i&&e){const t=i.textContent;i.innerHTML=t.split("").map(o=>o===" "?"&nbsp;":`<span class="gsap-char" style="display:inline-block;">${o}</span>`).join("");const n=e.textContent.trim().split(" ");e.innerHTML=n.map(o=>`<span class="gsap-word" style="display:inline-block; margin-right:5px;">${o}</span>`).join("");const r=i.querySelectorAll(".gsap-char"),s=e.querySelectorAll(".gsap-word");jr.set(r,{opacity:0,y:50,rotationX:-90,z:-100}),jr.set(s,{opacity:0,y:20,filter:"blur(5px)"}),jr.timeline({repeat:-1,repeatDelay:3,yoyo:!0}).to(r,{opacity:1,y:0,rotationX:0,z:0,duration:1,stagger:{amount:.8,from:"random"},ease:"back.out(2)"}).to(r,{color:"#ffffff",textShadow:"0 0 30px #ffffff, 0 0 60px #ffffff",duration:.15,yoyo:!0,repeat:1,stagger:.05},"-=0.5").to(s,{opacity:1,y:0,filter:"blur(0px)",duration:.6,stagger:.05,ease:"power2.out"},"-=0.8")}}
