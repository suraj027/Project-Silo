(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},t={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},n=1e3,r=1001,i=1002,a=1003,o=1004,s=1005,c=1006,l=1007,u=1008,d=1009,f=1010,p=1011,m=1012,h=1013,g=1014,_=1015,v=1016,y=1017,b=1018,x=1020,S=35902,C=35899,w=1021,T=1022,E=1023,D=1026,O=1027,k=1028,A=1029,j=1030,M=1031,N=1033,P=33776,F=33777,I=33778,L=33779,R=35840,ee=35841,te=35842,ne=35843,re=36196,ie=37492,z=37496,ae=37488,oe=37489,se=37490,ce=37491,le=37808,ue=37809,de=37810,fe=37811,pe=37812,me=37813,he=37814,ge=37815,_e=37816,ve=37817,ye=37818,be=37819,xe=37820,Se=37821,Ce=36492,we=36494,Te=36495,Ee=36283,De=36284,Oe=36285,B=36286,ke=2300,Ae=2301,je=2302,V=2303,Me=2400,Ne=2401,Pe=2402,Fe=3200,Ie=`srgb`,Le=`srgb-linear`,Re=`linear`,ze=`srgb`,Be=7680,Ve=35044,He=2e3;function Ue(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function We(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ge(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ke(){let e=Ge(`canvas`);return e.style.display=`block`,e}var qe={};function Je(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ye(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function Xe(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Ze(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qe(...e){let t=e.join(` `);t in qe||(qe[t]=!0,Xe(...e))}function $e(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var et={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},tt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},nt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),rt=1234567,it=Math.PI/180,at=180/Math.PI;function ot(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(nt[e&255]+nt[e>>8&255]+nt[e>>16&255]+nt[e>>24&255]+`-`+nt[t&255]+nt[t>>8&255]+`-`+nt[t>>16&15|64]+nt[t>>24&255]+`-`+nt[n&63|128]+nt[n>>8&255]+`-`+nt[n>>16&255]+nt[n>>24&255]+nt[r&255]+nt[r>>8&255]+nt[r>>16&255]+nt[r>>24&255]).toLowerCase()}function st(e,t,n){return Math.max(t,Math.min(n,e))}function ct(e,t){return(e%t+t)%t}function lt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ut(e,t,n){return e===t?0:(n-e)/(t-e)}function dt(e,t,n){return(1-n)*e+n*t}function ft(e,t,n,r){return dt(e,t,1-Math.exp(-n*r))}function pt(e,t=1){return t-Math.abs(ct(e,t*2)-t)}function mt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function ht(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function gt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function _t(e,t){return e+Math.random()*(t-e)}function vt(e){return e*(.5-Math.random())}function yt(e){e!==void 0&&(rt=e);let t=rt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bt(e){return e*it}function xt(e){return e*at}function St(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function Ct(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function wt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Tt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:Xe(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Et(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Dt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Ot={DEG2RAD:it,RAD2DEG:at,generateUUID:ot,clamp:st,euclideanModulo:ct,mapLinear:lt,inverseLerp:ut,lerp:dt,damp:ft,pingpong:pt,smoothstep:mt,smootherstep:ht,randInt:gt,randFloat:_t,randFloatSpread:vt,seededRandom:yt,degToRad:bt,radToDeg:xt,isPowerOfTwo:St,ceilPowerOfTwo:Ct,floorPowerOfTwo:wt,setQuaternionFromProperEuler:Tt,normalize:Dt,denormalize:Et},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},kt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:Xe(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return At.copy(this).projectOnVector(e),this.sub(At)}reflect(e){return this.sub(At.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},At=new U,jt=new kt,Mt=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Qe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Nt.makeScale(e,t)),this}rotate(e){return Qe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Nt.makeRotation(-e)),this}translate(e,t){return Qe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Nt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Nt=new Mt,Pt=new Mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ft=new Mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function It(){let e={enabled:!0,workingColorSpace:Le,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Rt(e.r),e.g=Rt(e.g),e.b=Rt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=zt(e.r),e.g=zt(e.g),e.b=zt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Re:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Qe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Qe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Le]:{primaries:t,whitePoint:r,transfer:Re,toXYZ:Pt,fromXYZ:Ft,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:r,transfer:ze,toXYZ:Pt,fromXYZ:Ft,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),e}var Lt=It();function Rt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function zt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Bt,Vt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bt===void 0&&(Bt=Ge(`canvas`)),Bt.width=e.width,Bt.height=e.height;let t=Bt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Bt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ge(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Rt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Rt(t[e]/255)*255):t[e]=Rt(t[e]);return{data:t,width:e.width,height:e.height}}return Xe(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ht=0,Ut=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ht++}),this.uuid=ot(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Wt(r[t].image)):e.push(Wt(r[t]))}else e=Wt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Wt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Vt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Xe(`Texture: Unable to serialize Texture.`),{})}var Gt=0,Kt=new U,qt=class e extends tt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=r,a=r,o=c,s=u,l=E,f=d,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gt++}),this.uuid=ot(),this.name=``,this.source=new Ut(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=s,this.anisotropy=p,this.format=l,this.internalFormat=null,this.type=f,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kt).x}get height(){return this.source.getSize(Kt).y}get depth(){return this.source.getSize(Kt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case n:e.x-=Math.floor(e.x);break;case r:e.x=e.x<0?0:1;break;case i:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case n:e.y-=Math.floor(e.y);break;case r:e.y=e.y<0?0:1;break;case i:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null,qt.DEFAULT_MAPPING=300,qt.DEFAULT_ANISOTROPY=1;var Jt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yt=class extends tt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:c,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t),this.textures=[];let r=new qt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:c,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ut(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xt=class extends Yt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zt=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qt=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=a,this.minFilter=a,this.wrapR=r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},$t=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/en.setFromMatrixColumn(e,0).length(),i=1/en.setFromMatrixColumn(e,1).length(),a=1/en.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nn,e,rn)}lookAt(e,t,n){let r=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),an.crossVectors(n,sn),an.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),an.crossVectors(n,sn)),an.normalize(),on.crossVectors(sn,an),r[0]=an.x,r[4]=on.x,r[8]=sn.x,r[1]=an.y,r[5]=on.y,r[9]=sn.y,r[2]=an.z,r[6]=on.z,r[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=en.set(r[0],r[1],r[2]).length(),o=en.set(r[4],r[5],r[6]).length(),s=en.set(r[8],r[9],r[10]).length();i<0&&(a=-a),tn.copy(this);let c=1/a,l=1/o,u=1/s;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=l,tn.elements[5]*=l,tn.elements[6]*=l,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},en=new U,tn=new $t,nn=new U(0,0,0),rn=new U(1,1,1),an=new U,on=new U,sn=new U,cn=new $t,ln=new kt,un=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-st(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(st(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(st(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:Xe(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ln.setFromEuler(this),this.setFromQuaternion(ln,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER=`XYZ`;var dn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},fn=0,pn=new U,mn=new kt,hn=new $t,gn=new U,_n=new U,vn=new U,yn=new kt,bn=new U(1,0,0),xn=new U(0,1,0),Sn=new U(0,0,1),Cn={type:`added`},wn={type:`removed`},Tn={type:`childadded`,child:null},En={type:`childremoved`,child:null},Dn=class e extends tt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fn++}),this.uuid=ot(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new un,r=new kt,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $t},normalMatrix:{value:new Mt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.multiply(mn),this}rotateOnWorldAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.premultiply(mn),this}rotateX(e){return this.rotateOnAxis(bn,e)}rotateY(e){return this.rotateOnAxis(xn,e)}rotateZ(e){return this.rotateOnAxis(Sn,e)}translateOnAxis(e,t){return pn.copy(e).applyQuaternion(this.quaternion),this.position.add(pn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bn,e)}translateY(e){return this.translateOnAxis(xn,e)}translateZ(e){return this.translateOnAxis(Sn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gn.copy(e):gn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),_n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(_n,gn,this.up):hn.lookAt(gn,_n,this.up),this.quaternion.setFromRotationMatrix(hn),r&&(hn.extractRotation(r.matrixWorld),mn.setFromRotationMatrix(hn),this.quaternion.premultiply(mn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(Ze(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null):Ze(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,e,vn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,yn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Dn.DEFAULT_UP=new U(0,1,0),Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var On=class extends Dn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},kn={type:`move`},An=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new On;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},jn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},Nn={h:0,s:0,l:0};function Pn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ie){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Lt.workingColorSpace){if(e=ct(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Pn(i,r,e+1/3),this.g=Pn(i,r,e),this.b=Pn(i,r,e-1/3)}return Lt.colorSpaceToWorking(this,r),this}setStyle(e,t=Ie){function n(t){t!==void 0&&parseFloat(t)<1&&Xe(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:Xe(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);Xe(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ie){let n=jn[e.toLowerCase()];return n===void 0?Xe(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rt(e.r),this.g=Rt(e.g),this.b=Rt(e.b),this}copyLinearToSRGB(e){return this.r=zt(e.r),this.g=zt(e.g),this.b=zt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ie){return Lt.workingToColorSpace(Fn.copy(this),e),Math.round(st(Fn.r*255,0,255))*65536+Math.round(st(Fn.g*255,0,255))*256+Math.round(st(Fn.b*255,0,255))}getHexString(e=Ie){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.workingToColorSpace(Fn.copy(this),t);let n=Fn.r,r=Fn.g,i=Fn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Lt.workingColorSpace){return Lt.workingToColorSpace(Fn.copy(this),t),e.r=Fn.r,e.g=Fn.g,e.b=Fn.b,e}getStyle(e=Ie){Lt.workingToColorSpace(Fn.copy(this),e);let t=Fn.r,n=Fn.g,r=Fn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Mn),this.setHSL(Mn.h+e,Mn.s+t,Mn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mn),e.getHSL(Nn);let n=dt(Mn.h,Nn.h,t),r=dt(Mn.s,Nn.s,t),i=dt(Mn.l,Nn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Fn=new W;W.NAMES=jn;var In=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new W(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Ln=class extends Dn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new U,zn=new U,Bn=new U,Vn=new U,Hn=new U,Un=new U,Wn=new U,Gn=new U,Kn=new U,qn=new U,Jn=new Jt,Yn=new Jt,Xn=new Jt,Zn=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Rn.subVectors(e,t),r.cross(Rn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Rn.subVectors(r,t),zn.subVectors(n,t),Bn.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(zn),s=Rn.dot(Bn),c=zn.dot(zn),l=zn.dot(Bn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Vn)!==null&&Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Vn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Vn.x),s.addScaledVector(a,Vn.y),s.addScaledVector(o,Vn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Jn.setScalar(0),Yn.setScalar(0),Xn.setScalar(0),Jn.fromBufferAttribute(e,t),Yn.fromBufferAttribute(e,n),Xn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Jn,i.x),a.addScaledVector(Yn,i.y),a.addScaledVector(Xn,i.z),a}static isFrontFacing(e,t,n,r){return Rn.subVectors(n,t),zn.subVectors(e,t),Rn.cross(zn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),Rn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Hn.subVectors(r,n),Un.subVectors(i,n),Gn.subVectors(e,n);let s=Hn.dot(Gn),c=Un.dot(Gn);if(s<=0&&c<=0)return t.copy(n);Kn.subVectors(e,r);let l=Hn.dot(Kn),u=Un.dot(Kn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Hn,a);qn.subVectors(e,i);let f=Hn.dot(qn),p=Un.dot(qn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Un,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Wn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Wn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Hn,a).addScaledVector(Un,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qn=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(er.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(er.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=er.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,er):er.fromBufferAttribute(r,t),er.applyMatrix4(e.matrixWorld),this.expandByPoint(er);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),tr.copy(e.boundingBox)),tr.applyMatrix4(e.matrixWorld),this.union(tr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,er),er.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cr),lr.subVectors(this.max,cr),nr.subVectors(e.a,cr),rr.subVectors(e.b,cr),ir.subVectors(e.c,cr),ar.subVectors(rr,nr),or.subVectors(ir,rr),sr.subVectors(nr,ir);let t=[0,-ar.z,ar.y,0,-or.z,or.y,0,-sr.z,sr.y,ar.z,0,-ar.x,or.z,0,-or.x,sr.z,0,-sr.x,-ar.y,ar.x,0,-or.y,or.x,0,-sr.y,sr.x,0];return!fr(t,nr,rr,ir,lr)||(t=[1,0,0,0,1,0,0,0,1],!fr(t,nr,rr,ir,lr))?!1:(ur.crossVectors(ar,or),t=[ur.x,ur.y,ur.z],fr(t,nr,rr,ir,lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,er).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(er).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},$n=[new U,new U,new U,new U,new U,new U,new U,new U],er=new U,tr=new Qn,nr=new U,rr=new U,ir=new U,ar=new U,or=new U,sr=new U,cr=new U,lr=new U,ur=new U,dr=new U;function fr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){dr.fromArray(e,a);let o=i.x*Math.abs(dr.x)+i.y*Math.abs(dr.y)+i.z*Math.abs(dr.z),s=t.dot(dr),c=n.dot(dr),l=r.dot(dr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var pr=mr();function mr(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function hr(e){Math.abs(e)>65504&&Xe(`DataUtils.toHalfFloat(): Value out of range.`),e=st(e,-65504,65504),pr.floatView[0]=e;let t=pr.uint32View[0],n=t>>23&511;return pr.baseTable[n]+((t&8388607)>>pr.shiftTable[n])}function gr(e){let t=e>>10;return pr.uint32View[0]=pr.mantissaTable[pr.offsetTable[t]+(e&1023)]+pr.exponentTable[t],pr.floatView[0]}var _r=class{static toHalfFloat(e){return hr(e)}static fromHalfFloat(e){return gr(e)}},vr=new U,yr=new H,br=0,xr=class extends tt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:br++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ve,this.updateRanges=[],this.gpuType=_,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix3(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyMatrix4(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.applyNormalMatrix(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vr.fromBufferAttribute(this,t),vr.transformDirection(e),this.setXYZ(t,vr.x,vr.y,vr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Et(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Et(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Et(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Et(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Et(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array),i=Dt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Sr=class extends xr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Cr=class extends xr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},wr=class extends xr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tr=new Qn,Er=new U,Dr=new U,Or=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Tr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Er.subVectors(e,this.center);let t=Er.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Er,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Er.copy(e.center).add(Dr)),this.expandByPoint(Er.copy(e.center).sub(Dr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},kr=0,Ar=new $t,jr=new Dn,Mr=new U,Nr=new Qn,Pr=new Qn,Fr=new U,Ir=class e extends tt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kr++}),this.uuid=ot(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ue(e)?Cr:Sr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Mt().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ar.makeRotationFromQuaternion(e),this.applyMatrix4(Ar),this}rotateX(e){return Ar.makeRotationX(e),this.applyMatrix4(Ar),this}rotateY(e){return Ar.makeRotationY(e),this.applyMatrix4(Ar),this}rotateZ(e){return Ar.makeRotationZ(e),this.applyMatrix4(Ar),this}translate(e,t,n){return Ar.makeTranslation(e,t,n),this.applyMatrix4(Ar),this}scale(e,t,n){return Ar.makeScale(e,t,n),this.applyMatrix4(Ar),this}lookAt(e){return jr.lookAt(e),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new wr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&Xe(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Nr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(this.boundingBox.min,Nr.min),this.boundingBox.expandByPoint(Fr),Fr.addVectors(this.boundingBox.max,Nr.max),this.boundingBox.expandByPoint(Fr)):(this.boundingBox.expandByPoint(Nr.min),this.boundingBox.expandByPoint(Nr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Or);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(Nr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Pr.setFromBufferAttribute(n),this.morphTargetsRelative?(Fr.addVectors(Nr.min,Pr.min),Nr.expandByPoint(Fr),Fr.addVectors(Nr.max,Pr.max),Nr.expandByPoint(Fr)):(Nr.expandByPoint(Pr.min),Nr.expandByPoint(Pr.max))}Nr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Fr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Fr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Fr.fromBufferAttribute(a,t),o&&(Mr.fromBufferAttribute(e,t),Fr.add(Mr)),r=Math.max(r,n.distanceToSquared(Fr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ze(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new xr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new xr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Fr.fromBufferAttribute(e,t),Fr.normalize(),e.setXYZ(t,Fr.x,Fr.y,Fr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new xr(a,r,i)}if(this.index===null)return Xe(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Lr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ve,this.updateRanges=[],this.version=0,this.uuid=ot()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ot()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ot()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Rr=new U,zr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix4(e),this.setXYZ(t,Rr.x,Rr.y,Rr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyNormalMatrix(e),this.setXYZ(t,Rr.x,Rr.y,Rr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.transformDirection(e),this.setXYZ(t,Rr.x,Rr.y,Rr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Et(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Et(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Et(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Et(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Et(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array),i=Dt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Je(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new xr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Je(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Br=new U,Vr=new U,Hr=new Mt,Ur=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Br.subVectors(n,t).cross(Vr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Br),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Hr.getNormalMatrix(e),r=this.coplanarPoint(Br).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Wr=0,Gr=class extends tt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wr++}),this.uuid=ot(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Be,this.stencilZFail=Be,this.stencilZPass=Be,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ur().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Kr=class extends Gr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qr,Jr=new U,Yr=new U,Xr=new U,Zr=new H,Qr=new H,$r=new $t,ei=new U,ti=new U,ni=new U,ri=new H,ii=new H,ai=new H,oi=class extends Dn{constructor(e=new Kr){if(super(),this.isSprite=!0,this.type=`Sprite`,qr===void 0){qr=new Ir;let e=new Lr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);qr.setIndex([0,1,2,0,2,3]),qr.setAttribute(`position`,new zr(e,3,0,!1)),qr.setAttribute(`uv`,new zr(e,2,3,!1))}this.geometry=qr,this.material=e,this.center=new H(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ze(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Yr.setFromMatrixScale(this.matrixWorld),$r.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Xr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yr.multiplyScalar(-Xr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;si(ei.set(-.5,-.5,0),Xr,a,Yr,r,i),si(ti.set(.5,-.5,0),Xr,a,Yr,r,i),si(ni.set(.5,.5,0),Xr,a,Yr,r,i),ri.set(0,0),ii.set(1,0),ai.set(1,1);let o=e.ray.intersectTriangle(ei,ti,ni,!1,Jr);if(o===null&&(si(ti.set(-.5,.5,0),Xr,a,Yr,r,i),ii.set(0,1),o=e.ray.intersectTriangle(ei,ni,ti,!1,Jr),o===null))return;let s=e.ray.origin.distanceTo(Jr);s<e.near||s>e.far||t.push({distance:s,point:Jr.clone(),uv:Zn.getInterpolation(Jr,ei,ti,ni,ri,ii,ai,new H),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function si(e,t,n,r,i,a){Zr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Qr.copy(Zr):(Qr.x=a*Zr.x-i*Zr.y,Qr.y=i*Zr.x+a*Zr.y),e.copy(t),e.x+=Qr.x,e.y+=Qr.y,e.applyMatrix4($r)}var ci=new U,li=new U,ui=new U,di=new U,fi=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){li.copy(e).add(t).multiplyScalar(.5),ui.copy(t).sub(e).normalize(),di.copy(this.origin).sub(li);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ui),o=di.dot(this.direction),s=-di.dot(ui),c=di.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(li).addScaledVector(ui,d),f}intersectSphere(e,t){if(e.radius<0)return null;ci.subVectors(e.center,this.origin);let n=ci.dot(this.direction),r=ci.dot(ci)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,R=E-F*D,ee=O-P*A,te=k-F*A,ne=j-P*N,re=M-F*N,ie=ne*te-re*ee,z=L*re-R*ne,ae=ee*R-te*L;if(r){if(ie<0||z<0||ae<0)return null}else if((ie<0||z<0||ae<0)&&(ie>0||z>0||ae>0))return null;let oe=ie+z+ae;if(oe===0)return null;let se=I*(ie*D+z*A+ae*N);return(oe>0?se<0:se>0)?null:this.at(se/oe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},pi=class extends Gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},mi=new $t,hi=new fi,gi=new Or,_i=new U,vi=new U,yi=new U,bi=new U,xi=new U,Si=new U,Ci=new U,wi=new U,G=class extends Dn{constructor(e=new Ir,t=new pi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Si.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(xi.fromBufferAttribute(s,e),a?Si.addScaledVector(xi,r):Si.addScaledVector(xi.sub(t),r))}t.add(Si)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gi.copy(n.boundingSphere),gi.applyMatrix4(i),hi.copy(e.ray).recast(e.near),!(gi.containsPoint(hi.origin)===!1&&(hi.intersectSphere(gi,_i)===null||hi.origin.distanceToSquared(_i)>(e.far-e.near)**2))&&(mi.copy(i).invert(),hi.copy(e.ray).applyMatrix4(mi),(n.boundingBox===null||hi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,hi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ei(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ei(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ei(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ei(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ti(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;wi.copy(s),wi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(wi);return l<n.near||l>n.far?null:{distance:l,point:wi.clone(),object:e}}function Ei(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,vi),e.getVertexPosition(c,yi),e.getVertexPosition(l,bi);let u=Ti(e,t,n,r,vi,yi,bi,Ci);if(u){let e=new U;Zn.getBarycoord(Ci,vi,yi,bi,e),i&&(u.uv=Zn.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=Zn.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=Zn.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};Zn.getNormal(vi,yi,bi,t.normal),u.face=t,u.barycoord=e}return u}var Di=class extends qt{constructor(e=null,t=1,n=1,r,i,o,s,c,l=a,u=a,d,f){super(null,o,s,c,l,u,r,i,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oi=class extends xr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ki=new $t,Ai=new $t,ji=[],Mi=new Qn,Ni=new $t,Pi=new G,Fi=new Or,Ii=class extends G{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Oi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ni)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),Mi.copy(e.boundingBox).applyMatrix4(ki),this.boundingBox.union(Mi)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Or),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ki),Fi.copy(e.boundingSphere).applyMatrix4(ki),this.boundingSphere.union(Fi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Pi.geometry=this.geometry,Pi.material=this.material,Pi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fi.copy(this.boundingSphere),Fi.applyMatrix4(n),e.ray.intersectsSphere(Fi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,ki),Ai.multiplyMatrices(n,ki),Pi.matrixWorld=Ai,Pi.raycast(e,ji);for(let e=0,n=ji.length;e<n;e++){let n=ji[e];n.instanceId=i,n.object=this,t.push(n)}ji.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Oi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Di(new Float32Array(r*this.count),r,this.count,k,_));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Li=new Or,Ri=new H(.5,.5),zi=new U,Bi=class{constructor(e=new Ur,t=new Ur,n=new Ur,r=new Ur,i=new Ur,a=new Ur){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=He,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){return Li.center.set(0,0,0),Li.radius=.7071067811865476+Ri.distanceTo(e.center),Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(zi.x=r.normal.x>0?e.max.x:e.min.x,zi.y=r.normal.y>0?e.max.y:e.min.y,zi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Vi=class extends Gr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hi=new $t,Ui=new fi,Wi=new Or,Gi=new U,Ki=class extends Dn{constructor(e=new Ir,t=new Vi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wi.copy(n.boundingSphere),Wi.applyMatrix4(r),Wi.radius+=i,e.ray.intersectsSphere(Wi)===!1)return;Hi.copy(r).invert(),Ui.copy(e.ray).applyMatrix4(Hi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Gi.fromBufferAttribute(l,n),qi(Gi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Gi.fromBufferAttribute(l,a),qi(Gi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function qi(e,t,n,r,i,a,o){let s=Ui.distanceSqToPoint(e);if(s<n){let n=new U;Ui.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ji=class extends qt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Yi=class extends qt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Xi=class extends qt{constructor(e,t,n=g,r,i,o,s=a,c=a,l,u=D,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,i,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ut(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Zi=class extends Xi{constructor(e,t=g,n=301,r,i,o=a,s=a,c,l=D){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,i,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Qi=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},$i=class e extends Ir{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ea=class e extends Ir{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new wr(a,3)),this.setAttribute(`normal`,new wr(o,3)),this.setAttribute(`uv`,new wr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ta=class e extends Ir{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},na=class e extends ta{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ra=class e extends Ir{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new wr(i,3)),this.setAttribute(`normal`,new wr(i.slice(),3)),this.setAttribute(`uv`,new wr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ia=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xe(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new $t;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(st(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(st(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},aa=class extends ia{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},oa=class extends aa{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function sa(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ca=new U,la=new U,ua=new sa,da=new sa,fa=new sa,pa=class extends ia{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(la.subVectors(r[0],r[1]).add(r[0]),c=la);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ca.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ca),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ua.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),da.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),fa.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(ua.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),da.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),fa.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(ua.calc(s),da.calc(s),fa.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ma(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ha(e,t){let n=1-e;return n*n*t}function ga(e,t){return 2*(1-e)*e*t}function _a(e,t){return e*e*t}function va(e,t,n,r){return ha(e,t)+ga(e,n)+_a(e,r)}function ya(e,t){let n=1-e;return n*n*n*t}function ba(e,t){let n=1-e;return 3*n*n*e*t}function xa(e,t){return 3*(1-e)*e*e*t}function Sa(e,t){return e*e*e*t}function Ca(e,t,n,r,i){return ya(e,t)+ba(e,n)+xa(e,r)+Sa(e,i)}var wa=class extends ia{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ca(e,r.x,i.x,a.x,o.x),Ca(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ta=class extends ia{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ca(e,r.x,i.x,a.x,o.x),Ca(e,r.y,i.y,a.y,o.y),Ca(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ea=class extends ia{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends ia{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Oa=class extends ia{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(va(e,r.x,i.x,a.x),va(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ka=class extends ia{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(va(e,r.x,i.x,a.x),va(e,r.y,i.y,a.y),va(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Aa=class extends ia{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ma(o,s.x,c.x,l.x,u.x),ma(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}},ja=Object.freeze({__proto__:null,ArcCurve:oa,CatmullRomCurve3:pa,CubicBezierCurve:wa,CubicBezierCurve3:Ta,EllipseCurve:aa,LineCurve:Ea,LineCurve3:Da,QuadraticBezierCurve:Oa,QuadraticBezierCurve3:ka,SplineCurve:Aa}),Ma=class extends ia{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new ja[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new ja[n.type]().fromJSON(n))}return this}},Na=class extends Ma{constructor(e){super(),this.type=`Path`,this.currentPoint=new H,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ea(this.currentPoint.clone(),new H(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Oa(this.currentPoint.clone(),new H(e,t),new H(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new wa(this.currentPoint.clone(),new H(e,t),new H(n,r),new H(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Aa([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new aa(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Pa=class extends Na{constructor(e){super(e),this.uuid=ot(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Na().fromJSON(n))}return this}};function Fa(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Ia(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=Ua(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Ra(a,o,n,s,c,l,0),o}function Ia(e,t,n,r,i){let a;if(i===mo(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=uo(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=uo(i/r|0,e[i],e[i+1],a);return a&&no(a,a.next)&&(fo(a),a=a.next),a}function La(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(no(n,n.next)||to(n.prev,n,n.next)===0)){if(fo(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Ra(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Ja(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Ba(e,r,i,a):za(e)){t.push(c.i,e.i,l.i),fo(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=Va(La(e),t),Ra(e,t,n,r,i,a,2)):o===2&&Ha(e,t,n,r,i,a):Ra(La(e),t,n,r,i,a,1);break}}}function za(e){let t=e.prev,n=e,r=e.next;if(to(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&$a(i,s,a,c,o,l,m.x,m.y)&&to(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ba(e,t,n,r){let i=e.prev,a=e,o=e.next;if(to(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Xa(p,m,t,n,r),v=Xa(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&$a(s,u,c,d,l,f,y.x,y.y)&&to(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&$a(s,u,c,d,l,f,b.x,b.y)&&to(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&$a(s,u,c,d,l,f,y.x,y.y)&&to(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&$a(s,u,c,d,l,f,b.x,b.y)&&to(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Va(e,t){let n=e;do{let r=n.prev,i=n.next.next;!no(r,i)&&ro(r,n,n.next,i)&&so(r,i)&&so(i,r)&&(t.push(r.i,n.i,i.i),fo(n),fo(n.next),n=e=i),n=n.next}while(n!==e);return La(n)}function Ha(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&eo(o,e)){let s=lo(o,e);o=La(o,o.next),s=La(s,s.next),Ra(o,t,n,r,i,a,0),Ra(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Ua(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Ia(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Za(o))}i.sort(Wa);for(let e=0;e<i.length;e++)n=Ga(i[e],n);return n}function Wa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Ga(e,t){let n=Ka(e,t);if(!n)return t;let r=lo(n,e);return La(r,r.next),La(n,n.next)}function Ka(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(no(e,n))return n;do{if(no(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Qa(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);so(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&qa(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function qa(e,t){return to(e.prev,e,t.prev)<0&&to(t.next,e,e.next)<0}function Ja(e,t,n,r){let i=e;do i.z===0&&(i.z=Xa(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Ya(i)}function Ya(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Xa(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Za(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Qa(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function $a(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Qa(e,t,n,r,i,a,o,s)}function eo(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!oo(e,t)&&(so(e,t)&&so(t,e)&&co(e,t)&&(to(e.prev,e,t.prev)||to(e,t.prev,t))||no(e,t)&&to(e.prev,e,e.next)>0&&to(t.prev,t,t.next)>0)}function to(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function no(e,t){return e.x===t.x&&e.y===t.y}function ro(e,t,n,r){let i=ao(to(e,t,n)),a=ao(to(e,t,r)),o=ao(to(n,r,e)),s=ao(to(n,r,t));return!!(i!==a&&o!==s||i===0&&io(e,n,t)||a===0&&io(e,r,t)||o===0&&io(n,e,r)||s===0&&io(n,t,r))}function io(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ao(e){return e>0?1:e<0?-1:0}function oo(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&ro(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function so(e,t){return to(e.prev,e,e.next)<0?to(e,t,e.next)>=0&&to(e,e.prev,t)>=0:to(e,t,e.prev)<0||to(e,e.next,t)<0}function co(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function lo(e,t){let n=po(e.i,e.x,e.y),r=po(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function uo(e,t,n,r){let i=po(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function fo(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function po(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function mo(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var ho=class{static triangulate(e,t,n=2){return Fa(e,t,n)}},go=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];_o(e),vo(n,e);let a=e.length;t.forEach(_o);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,vo(n,t[e]);let o=ho.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function _o(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function vo(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var yo=class e extends Ir{constructor(e=new Pa([new H(.5,.5),new H(-.5,.5),new H(-.5,-.5),new H(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new wr(r,3)),this.setAttribute(`uv`,new wr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?bo:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new U,b=new U,x=new U}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!go.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];go.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||Ze(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new H(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new H(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let F;if(p===0)F=go.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);ne(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);ne(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}F=go.triangulateShape(e,t)}let I=F.length,L=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],L):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ne(x.x,x.y,x.z)):ne(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],L):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ne(x.x,x.y,x.z)):ne(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);ne(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?ne(i.x,i.y+g[s-1].y,g[s-1].x+n):ne(i.x,i.y,c+n)}}}R(),ee();function R(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<I;e++){let n=F[e];re(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<I;e++){let n=F[e];re(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<I;e++){let t=F[e];re(t[2],t[1],t[0])}for(let e=0;e<I;e++){let t=F[e];re(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ee(){let e=r.length/3,t=0;te(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];te(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function te(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);ie(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ne(e,t,n){a.push(e),a.push(t),a.push(n)}function re(e,t,i){z(e),z(t),z(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);ae(o[0]),ae(o[1]),ae(o[2])}function ie(e,t,i,a){z(e),z(t),z(a),z(t),z(i),z(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);ae(s[0]),ae(s[1]),ae(s[3]),ae(s[1]),ae(s[2]),ae(s[3])}function z(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function ae(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return xo(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ja[i.type]().fromJSON(i)),new e(r,t.options)}},bo={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new H(a,o),new H(s,c),new H(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new H(o,1-c),new H(l,1-d),new H(f,1-m),new H(h,1-_)]:[new H(s,1-c),new H(u,1-d),new H(p,1-m),new H(g,1-_)]}};function xo(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var So=class e extends ra{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Co=class e extends Ir{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},wo=class e extends Ir{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new U,p=new H;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new wr(s,3)),this.setAttribute(`normal`,new wr(c,3)),this.setAttribute(`uv`,new wr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},To=class e extends Ir{constructor(e=new Pa([new H(0,.5),new H(-.5,-.5),new H(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new wr(r,3)),this.setAttribute(`normal`,new wr(i,3)),this.setAttribute(`uv`,new wr(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;go.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];go.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=go.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Eo(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Eo(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Do=class e extends Ir{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new wr(p,3)),this.setAttribute(`normal`,new wr(m,3)),this.setAttribute(`uv`,new wr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Oo=class e extends Ir{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new U,f=new U,p=new U;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new wr(c,3)),this.setAttribute(`normal`,new wr(l,3)),this.setAttribute(`uv`,new wr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},ko=class e extends Ir{constructor(e=new ka(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,s=new U,c=new H,l=new U,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new wr(u,3)),this.setAttribute(`normal`,new wr(d,3)),this.setAttribute(`uv`,new wr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new ja[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Ao(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Mo(i))i.isRenderTargetTexture?(Xe(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Mo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function jo(e){let t={};for(let n=0;n<e.length;n++){let r=Ao(e[n]);for(let e in r)t[e]=r[e]}return t}function Mo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function No(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Po(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Lt.workingColorSpace}var Fo={clone:Ao,merge:jo},Io=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ro=class extends Gr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Io,this.fragmentShader=Lo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ao(e.uniforms),this.uniformsGroups=No(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Jt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Mt().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new $t().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},zo=class extends Ro{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Bo=class extends Gr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vo=class extends Bo{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new H(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new W(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new W(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new W(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ho=class extends Gr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Uo=class extends Gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Fe,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Wo=class extends Gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Go(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function Ko(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var qo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Jo=class extends qo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Me,endingEnd:Me}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ne:i=e,o=2*t-n;break;case Pe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Ne:a=e,s=2*n-t;break;case Pe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Yo=class extends qo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Xo=class extends qo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Zo=class extends qo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=es(n,t,g,y,r);i[p]=Qo(x,o,_,b,m)}return i}};function Qo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function $o(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function es(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=Qo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=$o(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var ts=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Go(t,this.TimeBufferType),this.values=Go(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Go(e.times,Array),values:Go(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),Ko(e.settings)&&(n.settings={inTangents:Go(e.settings.inTangents,Array),outTangents:Go(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Xo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Zo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ke:t=this.InterpolantFactoryMethodDiscrete;break;case Ae:t=this.InterpolantFactoryMethodLinear;break;case je:t=this.InterpolantFactoryMethodSmooth;break;case V:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return Xe(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ke;case this.InterpolantFactoryMethodLinear:return Ae;case this.InterpolantFactoryMethodSmooth:return je;case this.InterpolantFactoryMethodBezier:return V}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;Ko(this.settings)&&(ns(this.settings.inTangents,e),ns(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(Ze(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){Ze(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){Ze(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&We(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){Ze(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===je,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,Ko(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ns(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}ts.prototype.ValueTypeName=``,ts.prototype.TimeBufferType=Float32Array,ts.prototype.ValueBufferType=Float32Array,ts.prototype.DefaultInterpolation=Ae;var rs=class extends ts{constructor(e,t,n){super(e,t,n)}};rs.prototype.ValueTypeName=`bool`,rs.prototype.ValueBufferType=Array,rs.prototype.DefaultInterpolation=ke,rs.prototype.InterpolantFactoryMethodLinear=void 0,rs.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}};is.prototype.ValueTypeName=`color`;var as=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}};as.prototype.ValueTypeName=`number`;var os=class extends qo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)kt.slerpFlat(i,0,a,c-o,a,c,s);return i}},ss=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new os(this.times,this.values,this.getValueSize(),e)}};ss.prototype.ValueTypeName=`quaternion`,ss.prototype.InterpolantFactoryMethodSmooth=void 0;var cs=class extends ts{constructor(e,t,n){super(e,t,n)}};cs.prototype.ValueTypeName=`string`,cs.prototype.ValueBufferType=Array,cs.prototype.DefaultInterpolation=ke,cs.prototype.InterpolantFactoryMethodLinear=void 0,cs.prototype.InterpolantFactoryMethodSmooth=void 0;var ls=class extends ts{constructor(e,t,n,r){super(e,t,n,r)}};ls.prototype.ValueTypeName=`vector`;var us=class extends Dn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ds=class extends us{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},fs=new $t,ps=new U,ms=new U,hs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=d,this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bi,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ps.setFromMatrixPosition(e.matrixWorld),t.position.copy(ps),ms.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ms),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){fs.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(fs,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(fs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},gs=new U,_s=new kt,vs=new U,ys=class extends Dn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=He,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(gs,_s,vs),vs.x===1&&vs.y===1&&vs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(gs,_s,vs.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(gs,_s,vs),vs.x===1&&vs.y===1&&vs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(gs,_s,vs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},bs=new U,xs=new H,Ss=new H,Cs=class extends ys{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=at*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(it*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return at*2*Math.atan(Math.tan(it*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){bs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(bs.x,bs.y).multiplyScalar(-e/bs.z),bs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bs.x,bs.y).multiplyScalar(-e/bs.z)}getViewSize(e,t){return this.getViewBounds(e,xs,Ss),t.subVectors(Ss,xs)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(it*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ws=class extends hs{constructor(){super(new Cs(90,1,.5,500)),this.isPointLightShadow=!0}},Ts=class extends us{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new ws}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Es=class extends ys{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ds=class extends hs{constructor(){super(new Es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Os=class extends us{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.shadow=new Ds}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ks=class extends Ir{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type=`InstancedBufferGeometry`,this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},As=-90,js=1,Ms=class extends Dn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Cs(As,js,e,t);r.layers=this.layers,this.add(r);let i=new Cs(As,js,e,t);i.layers=this.layers,this.add(i);let a=new Cs(As,js,e,t);a.layers=this.layers,this.add(a);let o=new Cs(As,js,e,t);o.layers=this.layers,this.add(o);let s=new Cs(As,js,e,t);s.layers=this.layers,this.add(s);let c=new Cs(As,js,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ns=class extends Cs{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ps=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Fs.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Fs(){this._document.hidden===!1&&this.reset()}var Is=`\\[\\]\\.:\\/`,Ls=RegExp(`[\\[\\]\\.:\\/]`,`g`),Rs=`[^\\[\\]\\.:\\/]`,zs=`[^`+Is.replace(`\\.`,``)+`]`,Bs=`((?:WC+[\\/:])*)`.replace(`WC`,Rs),Vs=`(WCOD+)?`.replace(`WCOD`,zs),Hs=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Rs),Us=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Rs),Ws=RegExp(`^`+Bs+Vs+Hs+Us+`$`),Gs=[`material`,`materials`,`bones`,`map`],Ks=class{constructor(e,t,n){let r=n||qs.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},qs=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ls,``)}static parseTrackName(e){let t=Ws.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Gs.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Xe(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){Ze(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){Ze(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){Ze(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){Ze(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){Ze(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){Ze(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){Ze(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;Ze(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){Ze(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){Ze(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};qs.Composite=Ks,qs.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},qs.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},qs.prototype.GetterByBindingType=[qs.prototype._getValue_direct,qs.prototype._getValue_array,qs.prototype._getValue_arrayElement,qs.prototype._getValue_toArray],qs.prototype.SetterByBindingTypeAndVersioning=[[qs.prototype._setValue_direct,qs.prototype._setValue_direct_setNeedsUpdate,qs.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qs.prototype._setValue_array,qs.prototype._setValue_array_setNeedsUpdate,qs.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qs.prototype._setValue_arrayElement,qs.prototype._setValue_arrayElement_setNeedsUpdate,qs.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qs.prototype._setValue_fromArray,qs.prototype._setValue_fromArray_setNeedsUpdate,qs.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Js=new $t,Ys=class{constructor(e,t,n=0,r=1/0){this.ray=new fi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new dn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Js.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Js),this}intersectObject(e,t=!0,n=[]){return Zs(e,this,n,t),n.sort(Xs),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Zs(e[r],this,n,t);return n.sort(Xs),n}};function Xs(e,t){return e.distance-t.distance}function Zs(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Zs(r[e],t,n,!0)}}var Qs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=st(this.phi,e,Math.PI-e),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var $s=class extends tt{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function ec(e,t,n,r){let i=tc(r);switch(n){case w:return e*t;case k:return e*t/i.components*i.byteLength;case A:return e*t/i.components*i.byteLength;case j:return e*t*2/i.components*i.byteLength;case M:return e*t*2/i.components*i.byteLength;case T:return e*t*3/i.components*i.byteLength;case E:return e*t*4/i.components*i.byteLength;case N:return e*t*4/i.components*i.byteLength;case P:case F:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case I:case L:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ee:case ne:return Math.max(e,16)*Math.max(t,8)/4;case R:case te:return Math.max(e,8)*Math.max(t,8)/2;case re:case ie:case ae:case oe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case z:case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case fe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case me:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ce:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Oe:case B:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function tc(e){switch(e){case d:case f:return{byteLength:1,components:1};case m:case p:case v:return{byteLength:2,components:1};case y:case b:return{byteLength:2,components:4};case g:case h:case _:return{byteLength:4,components:1};case S:case C:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?Xe(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function nc(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function rc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ic={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,common:`#define PI 3.141592653589793
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
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
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
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
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
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
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
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
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
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
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
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
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
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
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
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
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
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
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
}`,distance_vert:`#define DISTANCE
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
}`,distance_frag:`#define DISTANCE
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
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
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
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
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
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},K={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Mt}},envmap:{envMap:{value:null},envMapRotation:{value:new Mt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Mt},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0},uvTransform:{value:new Mt}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Mt},alphaMap:{value:null},alphaMapTransform:{value:new Mt},alphaTest:{value:0}}},ac={basic:{uniforms:jo([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.fog]),vertexShader:ic.meshbasic_vert,fragmentShader:ic.meshbasic_frag},lambert:{uniforms:jo([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:ic.meshlambert_vert,fragmentShader:ic.meshlambert_frag},phong:{uniforms:jo([K.common,K.specularmap,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.fog,K.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ic.meshphong_vert,fragmentShader:ic.meshphong_frag},standard:{uniforms:jo([K.common,K.envmap,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.roughnessmap,K.metalnessmap,K.fog,K.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ic.meshphysical_vert,fragmentShader:ic.meshphysical_frag},toon:{uniforms:jo([K.common,K.aomap,K.lightmap,K.emissivemap,K.bumpmap,K.normalmap,K.displacementmap,K.gradientmap,K.fog,K.lights,{emissive:{value:new W(0)}}]),vertexShader:ic.meshtoon_vert,fragmentShader:ic.meshtoon_frag},matcap:{uniforms:jo([K.common,K.bumpmap,K.normalmap,K.displacementmap,K.fog,{matcap:{value:null}}]),vertexShader:ic.meshmatcap_vert,fragmentShader:ic.meshmatcap_frag},points:{uniforms:jo([K.points,K.fog]),vertexShader:ic.points_vert,fragmentShader:ic.points_frag},dashed:{uniforms:jo([K.common,K.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ic.linedashed_vert,fragmentShader:ic.linedashed_frag},depth:{uniforms:jo([K.common,K.displacementmap]),vertexShader:ic.depth_vert,fragmentShader:ic.depth_frag},normal:{uniforms:jo([K.common,K.bumpmap,K.normalmap,K.displacementmap,{opacity:{value:1}}]),vertexShader:ic.meshnormal_vert,fragmentShader:ic.meshnormal_frag},sprite:{uniforms:jo([K.sprite,K.fog]),vertexShader:ic.sprite_vert,fragmentShader:ic.sprite_frag},background:{uniforms:{uvTransform:{value:new Mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ic.background_vert,fragmentShader:ic.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Mt}},vertexShader:ic.backgroundCube_vert,fragmentShader:ic.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ic.cube_vert,fragmentShader:ic.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ic.equirect_vert,fragmentShader:ic.equirect_frag},distance:{uniforms:jo([K.common,K.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ic.distance_vert,fragmentShader:ic.distance_frag},shadow:{uniforms:jo([K.lights,K.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:ic.shadow_vert,fragmentShader:ic.shadow_frag}};ac.physical={uniforms:jo([ac.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Mt},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Mt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Mt},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Mt},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Mt},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Mt},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Mt}}]),vertexShader:ic.meshphysical_vert,fragmentShader:ic.meshphysical_frag};var oc={r:0,b:0,g:0},sc=new $t,cc=new Mt;cc.set(-1,0,0,0,1,0,0,0,1);function lc(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new G(new $i(1,1,1),new Ro({name:`BackgroundCubeMaterial`,uniforms:Ao(ac.backgroundCube.uniforms),vertexShader:ac.backgroundCube.vertexShader,fragmentShader:ac.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(cc),l.material.toneMapped=Lt.getTransfer(i.colorSpace)!==ze,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new G(new Co(2,2),new Ro({name:`BackgroundMaterial`,uniforms:Ao(ac.background.uniforms),vertexShader:ac.background.vertexShader,fragmentShader:ac.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Lt.getTransfer(i.colorSpace)!==ze,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(oc,Po(e)),n.buffers.color.setClear(oc.r,oc.g,oc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function uc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function dc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function fc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(Xe(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&Xe(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function pc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ur,s=new Mt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var mc=4,hc=6,gc=20,_c=256,vc=new Es,yc=new W,bc=null,xc=0,Sc=0,Cc=!1,wc=new U,Tc=new U,Ec=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=wc}=i;bc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),Sc=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bc,xc,Sc),this._renderer.xr.enabled=Cc,e.scissorTest=!1,kc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),Sc=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:c,minFilter:c,generateMipmaps:!1,type:v,format:E,colorSpace:Le,depthBuffer:!1},r=Oc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Dc(r)),this._blurMaterial=jc(r,e,t),this._ggxMaterial=Ac(r,e,t)}return r}_compileMaterial(e){let t=new G(new Ir,e);this._renderer.compile(t,vc)}_sceneToCubeUV(e,t,n,r,i){let a=new Cs(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(yc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new $i,new pi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(yc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;kc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;kc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,vc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-mc?n-d+mc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,kc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,vc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,kc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,vc)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];kc(t,3*l*(r>this._lodMax-mc?r-this._lodMax+mc:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,vc)}};function Dc(e){let t=[],n=[],r=e,i=e-mc+1+hc;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Tc.set(1,r,n):e===1?Tc.set(-n,1,-r):e===2?Tc.set(-n,r,1):e===3?Tc.set(-1,r,-n):e===4?Tc.set(-n,-1,r):Tc.set(n,r,-1),Tc.toArray(l,(e*6+t)*3)}}let u=new Ir;u.setAttribute(`position`,new xr(c,3)),u.setAttribute(`outputDirection`,new xr(l,3)),n.push(new G(u,null)),r>mc&&r--}return{lodMeshes:n,sizeLods:t}}function Oc(e,t,n){let r=new Xt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function kc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ac(e,t,n){return new Ro({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:_c,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function jc(e,t,n){return new Ro({name:`SphericalGaussianBlur`,defines:{SAMPLES:gc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Pc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Mc(){return new Ro({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Nc(){return new Ro({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Pc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fc=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ji(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new $i(5,5,5),i=new Ro({name:`CubemapFromEquirect`,uniforms:Ao(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new G(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=c),new Ms(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Ic(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Fc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ec(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ec(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Lc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Qe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Rc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Cr:Sr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function zc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Bc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:Ze(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Vc(e,t,n){let r=new WeakMap,i=new Jt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zt(h,p,m,u);g.type=_,g.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function y(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Hc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Uc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Wc(e,t,n,r,i,a){let o=new Xt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ir;l.setAttribute(`position`,new wr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new wr([0,2,0,0,2,0],2));let u=new zo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new G(l,u),f=new Es(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Xt(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}),c=new Xt(t,n,{type:v,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Lt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Uc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Gc=new qt,Kc=new Xi(1,1),qc=new Zt,Jc=new Qt,Yc=new Ji,Xc=[],Zc=[],Qc=new Float32Array(16),$c=new Float32Array(9),el=new Float32Array(4);function tl(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Xc[i];if(a===void 0&&(a=new Float32Array(i),Xc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function nl(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function rl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function il(e,t){let n=Zc[t];n===void 0&&(n=new Int32Array(t),Zc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function al(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(nl(n,t))return;e.uniform2fv(this.addr,t),rl(n,t)}}function sl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(nl(n,t))return;e.uniform3fv(this.addr,t),rl(n,t)}}function cl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(nl(n,t))return;e.uniform4fv(this.addr,t),rl(n,t)}}function ll(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(nl(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),rl(n,t)}else{if(nl(n,r))return;el.set(r),e.uniformMatrix2fv(this.addr,!1,el),rl(n,r)}}function ul(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(nl(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),rl(n,t)}else{if(nl(n,r))return;$c.set(r),e.uniformMatrix3fv(this.addr,!1,$c),rl(n,r)}}function dl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(nl(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),rl(n,t)}else{if(nl(n,r))return;Qc.set(r),e.uniformMatrix4fv(this.addr,!1,Qc),rl(n,r)}}function fl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(nl(n,t))return;e.uniform2iv(this.addr,t),rl(n,t)}}function ml(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(nl(n,t))return;e.uniform3iv(this.addr,t),rl(n,t)}}function hl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(nl(n,t))return;e.uniform4iv(this.addr,t),rl(n,t)}}function gl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function _l(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(nl(n,t))return;e.uniform2uiv(this.addr,t),rl(n,t)}}function vl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(nl(n,t))return;e.uniform3uiv(this.addr,t),rl(n,t)}}function yl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(nl(n,t))return;e.uniform4uiv(this.addr,t),rl(n,t)}}function bl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Kc.compareFunction=n.isReversedDepthBuffer()?518:515,a=Kc):a=Gc,n.setTexture2D(t||a,i)}function xl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Jc,i)}function Sl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Yc,i)}function Cl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||qc,i)}function wl(e){switch(e){case 5126:return al;case 35664:return ol;case 35665:return sl;case 35666:return cl;case 35674:return ll;case 35675:return ul;case 35676:return dl;case 5124:case 35670:return fl;case 35667:case 35671:return pl;case 35668:case 35672:return ml;case 35669:case 35673:return hl;case 5125:return gl;case 36294:return _l;case 36295:return vl;case 36296:return yl;case 35678:case 36198:case 36298:case 36306:case 35682:return bl;case 35679:case 36299:case 36307:return xl;case 35680:case 36300:case 36308:case 36293:return Sl;case 36289:case 36303:case 36311:case 36292:return Cl}}function Tl(e,t){e.uniform1fv(this.addr,t)}function El(e,t){let n=tl(t,this.size,2);e.uniform2fv(this.addr,n)}function Dl(e,t){let n=tl(t,this.size,3);e.uniform3fv(this.addr,n)}function Ol(e,t){let n=tl(t,this.size,4);e.uniform4fv(this.addr,n)}function kl(e,t){let n=tl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Al(e,t){let n=tl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function jl(e,t){let n=tl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ml(e,t){e.uniform1iv(this.addr,t)}function Nl(e,t){e.uniform2iv(this.addr,t)}function Pl(e,t){e.uniform3iv(this.addr,t)}function Fl(e,t){e.uniform4iv(this.addr,t)}function Il(e,t){e.uniform1uiv(this.addr,t)}function Ll(e,t){e.uniform2uiv(this.addr,t)}function Rl(e,t){e.uniform3uiv(this.addr,t)}function zl(e,t){e.uniform4uiv(this.addr,t)}function Bl(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Kc:Gc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Vl(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Jc,a[e])}function Hl(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Yc,a[e])}function Ul(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||qc,a[e])}function Wl(e){switch(e){case 5126:return Tl;case 35664:return El;case 35665:return Dl;case 35666:return Ol;case 35674:return kl;case 35675:return Al;case 35676:return jl;case 5124:case 35670:return Ml;case 35667:case 35671:return Nl;case 35668:case 35672:return Pl;case 35669:case 35673:return Fl;case 5125:return Il;case 36294:return Ll;case 36295:return Rl;case 36296:return zl;case 35678:case 36198:case 36298:case 36306:case 35682:return Bl;case 35679:case 36299:case 36307:return Vl;case 35680:case 36300:case 36308:case 36293:return Hl;case 36289:case 36303:case 36311:case 36292:return Ul}}var Gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wl(t.type)}},Kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wl(t.type)}},ql=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Jl=/(\w+)(\])?(\[|\.)?/g;function Yl(e,t){e.seq.push(t),e.map[t.id]=t}function Xl(e,t,n){let r=e.name,i=r.length;for(Jl.lastIndex=0;;){let a=Jl.exec(r),o=Jl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Yl(n,l===void 0?new Gl(s,e,t):new Kl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ql(s),Yl(n,e)),n=e}}}var Zl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Xl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ql(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var $l=37297,eu=0;function tu(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var nu=new Mt;function ru(e){Lt._getMatrix(nu,Lt.workingColorSpace,e);let t=`mat3( ${nu.elements.map(e=>e.toFixed(4))} )`;switch(Lt.getTransfer(e)){case Re:return[t,`LinearTransferOETF`];case ze:return[t,`sRGBTransferOETF`];default:return Xe(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function iu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+tu(e.getShaderSource(t),r)}return i}function au(e,t){let n=ru(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var ou={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function su(e,t){let n=ou[t];return n===void 0?(Xe(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var cu=new U;function lu(){return Lt.getLuminanceCoefficients(cu),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${cu.x.toFixed(4)}, ${cu.y.toFixed(4)}, ${cu.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function uu(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(pu).join(`
`)}function du(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function fu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function pu(e){return e!==``}function mu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function hu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var gu=/^[ \t]*#include +<([\w\d./]+)>/gm;function _u(e){return e.replace(gu,yu)}var vu=new Map;function yu(e,t){let n=ic[t];if(n===void 0){let e=vu.get(t);if(e!==void 0)n=ic[e],Xe(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return _u(n)}var bu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xu(e){return e.replace(bu,Su)}function Su(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Cu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var wu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Tu(e){return wu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Eu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Du(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Eu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Ou={302:`ENVMAP_MODE_REFRACTION`};function ku(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Ou[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Au={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ju(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Au[e.combine]||`ENVMAP_BLENDING_NONE`}function Mu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Nu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Tu(n),l=Du(n),u=ku(n),d=ju(n),f=Mu(n),p=uu(n),m=du(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(pu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(pu).join(`
`),_.length>0&&(_+=`
`)):(g=[Cu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(pu).join(`
`),_=[Cu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ic.tonemapping_pars_fragment,n.toneMapping===0?``:su(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ic.colorspace_pars_fragment,au(`linearToOutputTexel`,n.outputColorSpace),lu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(pu).join(`
`)),o=_u(o),o=mu(o,n),o=hu(o,n),s=_u(s),s=mu(s,n),s=hu(s,n),o=xu(o),s=xu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ql(i,i.VERTEX_SHADER,y),S=Ql(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=iu(i,x,`vertex`),n=iu(i,S,`fragment`);Ze(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):Xe(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Zl(i,h),T=fu(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,$l)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=eu++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Pu=0,Fu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Iu(e),t.set(e,n)),n}},Iu=class{constructor(e){this.id=Pu++,this.code=e,this.usedTimes=0}};function Lu(e){return e===1030||e===37490||e===36285}function Ru(e,t,n,r,i,a){let o=new dn,s=new Fu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&Xe(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ac[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,R=!!i.aoMap,ee=!!i.lightMap,te=!!i.bumpMap&&i.wireframe===!1,ne=!!i.normalMap,re=!!i.displacementMap,ie=!!i.emissiveMap,z=!!i.metalnessMap,ae=!!i.roughnessMap,oe=i.anisotropy>0,se=i.clearcoat>0,ce=i.dispersion>0,le=i.retroreflectivity>0,ue=i.iridescence>0,de=i.sheen>0,fe=i.transmission>0,pe=oe&&!!i.anisotropyMap,me=se&&!!i.clearcoatMap,he=se&&!!i.clearcoatNormalMap,ge=se&&!!i.clearcoatRoughnessMap,_e=ue&&!!i.iridescenceMap,ve=ue&&!!i.iridescenceThicknessMap,ye=de&&!!i.sheenColorMap,be=de&&!!i.sheenRoughnessMap,xe=!!i.specularMap,Se=!!i.specularColorMap,Ce=!!i.specularIntensityMap,we=fe&&!!i.transmissionMap,Te=fe&&!!i.thicknessMap,Ee=!!i.gradientMap,De=!!i.alphaMap,Oe=i.alphaTest>0,B=!!i.alphaHash,ke=!!i.extensions,Ae=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ae=e.toneMapping);let je={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Lt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:R,lightMap:ee,bumpMap:te,normalMap:ne,displacementMap:re,emissiveMap:ie,normalMapObjectSpace:ne&&i.normalMapType===1,normalMapTangentSpace:ne&&i.normalMapType===0,packedNormalMap:ne&&i.normalMapType===0&&Lu(i.normalMap.format),metalnessMap:z,roughnessMap:ae,anisotropy:oe,anisotropyMap:pe,clearcoat:se,clearcoatMap:me,clearcoatNormalMap:he,clearcoatRoughnessMap:ge,dispersion:ce,retroreflection:le,iridescence:ue,iridescenceMap:_e,iridescenceThicknessMap:ve,sheen:de,sheenColorMap:ye,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:Ce,transmission:fe,transmissionMap:we,thicknessMap:Te,gradientMap:Ee,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:De,alphaTest:Oe,alphaHash:B,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:R&&m(i.aoMap.channel),lightMapUv:ee&&m(i.lightMap.channel),bumpMapUv:te&&m(i.bumpMap.channel),normalMapUv:ne&&m(i.normalMap.channel),displacementMapUv:re&&m(i.displacementMap.channel),emissiveMapUv:ie&&m(i.emissiveMap.channel),metalnessMapUv:z&&m(i.metalnessMap.channel),roughnessMapUv:ae&&m(i.roughnessMap.channel),anisotropyMapUv:pe&&m(i.anisotropyMap.channel),clearcoatMapUv:me&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(i.sheenRoughnessMap.channel),specularMapUv:xe&&m(i.specularMap.channel),specularColorMapUv:Se&&m(i.specularColorMap.channel),specularIntensityMapUv:Ce&&m(i.specularIntensityMap.channel),transmissionMapUv:we&&m(i.transmissionMap.channel),thicknessMapUv:Te&&m(i.thicknessMap.channel),alphaMapUv:De&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ne||oe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||De),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ne===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ae,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Lt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ie&&i.emissiveMap.isVideoTexture===!0&&Lt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:ke&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(ke&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ac[t];n=Fo.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Nu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function zu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Bu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Vu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Hu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Bu),r.length>1&&r.sort(t||Vu),i.length>1&&i.sort(t||Vu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Uu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Hu,e.set(t,[i])):n>=r.length?(i=new Hu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Wu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new W};break;case`SpotLight`:n={position:new U,direction:new U,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Gu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ku=0;function qu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ju(e){let t=new Wu,n=Gu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new $t,o=new $t;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(qu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=K.LTC_FLOAT_1,r.rectAreaLTC2=K.LTC_FLOAT_2):(r.rectAreaLTC1=K.LTC_HALF_1,r.rectAreaLTC2=K.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ku++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Yu(e){let t=new Ju(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Xu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Yu(e),t.set(n,[a])):r>=i.length?(a=new Yu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Zu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qu=`uniform sampler2D shadow_pass;
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
}`,$u=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],ed=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],td=new $t,nd=new U,rd=new U;function id(e,t,n){let r=new Bi,i=new H,o=new H,s=new Jt,l=new Uo,u=new Wo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Ro({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:Zu,fragmentShader:Qu}),h=m.clone();h.defines.HORIZONTAL_PASS=1;let y=new Ir;y.setAttribute(`position`,new xr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new G(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(Xe(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){Xe(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;i.copy(p.mapSize);let y=p.getFrameExtents();i.multiply(y),o.copy(p.mapSize),(i.x>f||i.y>f)&&(i.x>f&&(o.x=Math.floor(f/y.x),i.x=o.x*y.x,p.mapSize.x=o.x),i.y>f&&(o.y=Math.floor(f/y.y),i.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||h===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){Xe(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Xt(i.x,i.y,{format:j,type:v,minFilter:c,magFilter:c,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Xi(i.x,i.y,_),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=D,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=a,p.map.depthTexture.magFilter=a}else d.isPointLight?(p.map=new Fc(i.x),p.map.depthTexture=new Zi(i.x,g)):(p.map=new Xt(i.x,i.y),p.map.depthTexture=new Xi(i.x,i.y,g)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=D,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=c,p.map.depthTexture.magFilter=c):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=a,p.map.depthTexture.magFilter=a);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==i.x||p.map.height!==i.y)&&p.map.setSize(i.x,i.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let i=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),nd.setFromMatrixPosition(d.matrixWorld),e.position.copy(nd),rd.copy(e.position),rd.add($u[t]),e.up.copy(ed[t]),e.lookAt(rd),e.updateMatrixWorld(),n.makeTranslation(-nd.x,-nd.y,-nd.z),td.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(td,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);s.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(s)}r=p.getFrustum(t),T(n,l,i,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let a=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new Xt(i.x,i.y,{format:j,type:v}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,m,b,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ad(e,t){function n(){let t=!1,n=new Jt,r=null,i=new Jt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?z(e.DEPTH_TEST):ae(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=et[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?z(e.STENCIL_TEST):ae(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},R=e.getParameter(e.SCISSOR_BOX),ee=e.getParameter(e.VIEWPORT),te=new Jt().fromArray(R),ne=new Jt().fromArray(ee);function re(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ie={};ie[e.TEXTURE_2D]=re(e.TEXTURE_2D,e.TEXTURE_2D,1),ie[e.TEXTURE_CUBE_MAP]=re(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[e.TEXTURE_2D_ARRAY]=re(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ie[e.TEXTURE_3D]=re(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),z(e.DEPTH_TEST),o.setFunc(3),pe(!1),me(1),z(e.CULL_FACE),de(0);function z(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ae(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function oe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function se(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ce(t){return h!==t&&(e.useProgram(t),h=t,!0)}let le={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};le[103]=e.MIN,le[104]=e.MAX;let ue={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function de(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(ae(e.BLEND),g=!1);return}if(g===!1&&(z(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Ze(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:Ze(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:Ze(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:Ze(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(le[n],le[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ue[r],ue[i],ue[o],ue[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function fe(t,n){t.side===2?ae(e.CULL_FACE):z(e.CULL_FACE);let r=t.side===1;n&&(r=!r),pe(r),t.blending===1&&t.transparent===!1?de(0):de(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ge(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?z(e.SAMPLE_ALPHA_TO_COVERAGE):ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function pe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function me(t){t===0?ae(e.CULL_FACE):(z(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function he(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ge(t,n,r){t?(z(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ae(e.POLYGON_OFFSET_FILL)}function _e(t){t?z(e.SCISSOR_TEST):ae(e.SCISSOR_TEST)}function ve(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function ye(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||ie[t]),i.type=t,i.texture=n)}function be(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function we(){try{e.texSubImage3D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage2D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function B(){try{e.texImage2D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){Ze(`WebGLState:`,e)}}function Ae(t){return d[t]===void 0?e.getParameter(t):d[t]}function je(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function V(t){te.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),te.copy(t))}function Me(t){ne.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ne.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,te.set(0,0,e.canvas.width,e.canvas.height),ne.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:z,disable:ae,bindFramebuffer:oe,drawBuffers:se,useProgram:ce,setBlending:de,setMaterial:fe,setFlipSided:pe,setCullFace:me,setLineWidth:he,setPolygonOffset:ge,setScissorTest:_e,activeTexture:ve,bindTexture:ye,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:B,texImage3D:ke,pixelStorei:je,getParameter:Ae,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:De,texStorage3D:Oe,texSubImage2D:Ce,texSubImage3D:we,compressedTexSubImage2D:Te,compressedTexSubImage3D:Ee,scissor:V,viewport:Me,reset:Fe}}function od(e,t,d,f,p,m,h){let g=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new H,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ge(`canvas`)}function T(e,t,n){let r=1,i=Ae(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),Xe(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&Xe(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function E(e){return e.generateMipmaps}function D(t){e.generateMipmap(t)}function k(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];Xe(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||Xe(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Re:Lt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function j(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,Xe(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function M(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),F(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),L(t)}function F(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&I(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function I(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function L(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let R=0;function ee(){R=0}function te(){return R}function ne(e){R=e}function re(){let e=R;return e>=p.maxTextures&&Xe(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),R+=1,e}function ie(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function z(t,n){let r=f.get(t);if(t.isVideoTexture&&B(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)Xe(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)Xe(`WebGLRenderer: Texture marked for update but image is incomplete`);else{he(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function ae(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){he(r,t,n);return}t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null),d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n)}function oe(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){he(r,t,n);return}d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function se(t,n){let r=f.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version){ge(r,t,n);return}d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let ce={[n]:e.REPEAT,[r]:e.CLAMP_TO_EDGE,[i]:e.MIRRORED_REPEAT},le={[a]:e.NEAREST,[o]:e.NEAREST_MIPMAP_NEAREST,[s]:e.NEAREST_MIPMAP_LINEAR,[c]:e.LINEAR,[l]:e.LINEAR_MIPMAP_NEAREST,[u]:e.LINEAR_MIPMAP_LINEAR},ue={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function de(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&Xe(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ce[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ce[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ce[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,le[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,le[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ue[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||f.get(r).__currentAnisotropy){let i=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,i.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,p.getMaxAnisotropy())),f.get(r).__currentAnisotropy=r.anisotropy}}}function fe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,N));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=ie(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&I(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function pe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function me(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=pe(r.start,n.width,4),c=pe(t.start,n.width,4);r.start<=i+1&&s===c&&pe(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function he(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=fe(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=Lt.getPrimaries(Lt.workingColorSpace),r=n.colorSpace===``?null:Lt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=ke(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=A(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);de(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=M(n,t);if(n.isDepthTexture)u=j(n.format===O,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&me(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data)}else if(n.isCompressedTexture){if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023){if(c!==null){if(g){if(v){if(n.layerUpdates.size>0){let t=ec(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0)}else Xe(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data);n.layerUpdates.size>0&&n.clearLayerUpdates()}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?Xe(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}}else if(n.isDataArrayTexture){if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v){if(n.layerUpdates.size>0){let r=ec(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data)}else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_){if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Ae(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Ae(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&D(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function ge(t,n,r){if(n.image.length!==6)return;let i=fe(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Lt.getPrimaries(Lt.workingColorSpace),s=n.colorSpace===``?null:Lt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=ke(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=A(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=M(n,h);de(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?Xe(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Ae(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&D(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function _e(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=A(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Oe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,De(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=j(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Oe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,De(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,De(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=A(a.internalFormat,o,s,a.normalized,a.colorSpace);Oe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,De(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,De(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ye(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,(!a.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,N)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),de(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else z(n.depthTexture,0);let o=a.__webglTexture,s=De(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Oe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)Oe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function be(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer){if(r)for(let e=0;e<6;e++)ye(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ye(n.__webglFramebuffer[0],t,0):ye(n.__webglFramebuffer,t,0)}}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),ve(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),ve(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,r){let i=f.get(t);n!==void 0&&_e(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&be(t)}function Se(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,P);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Oe(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=A(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=De(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),ve(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),de(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)_e(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else _e(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&D(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),de(s,i),_e(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&D(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),de(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)_e(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else _e(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&D(a),d.unbindTexture()}t.depthBuffer&&be(t)}function Ce(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),D(t),d.unbindTexture()}}}let we=[],Te=[];function Ee(t){if(t.samples>0){if(Oe(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(we.length=0,Te.length=0,we.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(we.push(o),Te.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Te)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,we))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function De(e){return Math.min(p.maxSamples,e.samples)}function Oe(e){let n=f.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function B(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function ke(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Lt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&Xe(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):Ze(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ae(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=re,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=ne,this.setTexture2D=z,this.setTexture2DArray=ae,this.setTexture3D=oe,this.setTextureCube=se,this.rebindTextures=xe,this.setupRenderTarget=Se,this.updateRenderTargetMipmap=Ce,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function sd(e,t){function n(n,r=``){let i,a=Lt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var cd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ld=`
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

}`,ud=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ro({vertexShader:cd,fragmentShader:ld,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new Co(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},dd=class extends tt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,f=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,_=new ud,v={},y=t.getContextAttributes(),b=null,S=null,C=[],w=[],T=new H,k=null,A=null,j=new Cs;j.viewport=new Jt;let M=new Cs;M.viewport=new Jt;let N=[j,M],P=new Ns,F=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new An,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new An,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new An,C[e]=t),t.getHandSpace()};function L(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function R(){r.removeEventListener(`select`,L),r.removeEventListener(`selectstart`,L),r.removeEventListener(`selectend`,L),r.removeEventListener(`squeeze`,L),r.removeEventListener(`squeezestart`,L),r.removeEventListener(`squeezeend`,L),r.removeEventListener(`end`,R),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}F=null,I=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),p=null,f=null,u=null,r=null,S=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(T.width,T.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&Xe(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&Xe(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return u===null&&h&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,L),r.addEventListener(`selectstart`,L),r.addEventListener(`selectend`,L),r.addEventListener(`squeeze`,L),r.addEventListener(`squeezestart`,L),r.addEventListener(`squeezeend`,L),r.addEventListener(`end`,R),r.addEventListener(`inputsourceschange`,ee),y.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(T),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?O:D,a=y.stencil?x:g);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),f=u.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Xt(f.textureWidth,f.textureHeight,{format:E,type:d,depthTexture:new Xi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Xt(p.framebufferWidth,p.framebufferHeight,{format:E,type:d,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let te=new U,ne=new U;function re(e,t,n){te.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=te.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(F!==P.near||I!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,I=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;ie(P,i);for(let e=0;e<a.length;e++)ie(a[e],i);a.length===2?re(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),z(e,P,i)};function z(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=at*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let ae=null;function oe(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=u.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=N[n];o===void 0&&(o=new Cs,o.layers.enable(n),o.viewport=new Jt,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Qi,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ae&&ae(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let se=new nc;se.setAnimationLoop(oe),this.setAnimationLoop=function(e){ae=e},this.dispose=function(){}}},fd=new $t,pd=new Mt;pd.set(-1,0,0,0,1,0,0,0,1);function md(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Po(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(fd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(pd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function hd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return Ze(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?Xe(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):Xe(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var gd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_d=null;function vd(){return _d===null&&(_d=new Di(gd,16,16,j,v),_d.name=`DFG_LUT`,_d.minFilter=c,_d.magFilter=c,_d.wrapS=r,_d.wrapT=r,_d.generateMipmaps=!1,_d.needsUpdate=!0),_d}var yd=class{constructor(e={}){let{canvas:t=Ke(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:p=!1,outputBufferType:h=d}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);_=n.getContextAttributes().alpha}else _=a;let S=h,C=new Set([N,M,A]),w=new Set([d,g,m,x,y,b]),T=new Uint32Array(4),E=new Int32Array(4),D=new U,O=null,k=null,j=[],P=[],F=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,L=!1,R=null,ee=null,te=null,ne=null;this._outputColorSpace=Ie;let re=0,ie=0,z=null,ae=-1,oe=null,se=new Jt,ce=new Jt,le=null,ue=new W(0),de=0,fe=t.width,pe=t.height,me=1,he=null,ge=null,_e=new Jt(0,0,fe,pe),ve=new Jt(0,0,fe,pe),ye=!1,be=new Bi,xe=!1,Se=!1,Ce=new $t,we=new U,Te=new Jt,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},De=!1;function Oe(){return z===null?me:1}let B=n;function ke(e,n){return t.getContext(e,n)}let Ae,je,V,Me,Ne,Pe,Fe,Le,Re,ze,Be,Ve,Ue,We,Ge,qe,Ye,Qe,et,tt,nt,rt,it;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,st,!1),t.addEventListener(`webglcontextrestored`,ct,!1),t.addEventListener(`webglcontextcreationerror`,lt,!1),B===null){let t=`webgl2`;if(B=ke(t,e),B===null)throw ke(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}at()}catch(e){throw t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),Ze(`WebGLRenderer: `+e.message),e}function at(){Ae=new Lc(B),Ae.init(),nt=new sd(B,Ae),je=new fc(B,Ae,e,nt),V=new ad(B,Ae),je.reversedDepthBuffer&&p&&V.buffers.depth.setReversed(!0),ee=B.createFramebuffer(),te=B.createFramebuffer(),ne=B.createFramebuffer(),Me=new Bc(B),Ne=new zu,Pe=new od(B,Ae,V,Ne,je,nt,Me),Fe=new Ic(I),Le=new rc(B),rt=new uc(B,Le),Re=new Rc(B,Le,Me,rt),ze=new Hc(B,Re,Le,rt,Me),Qe=new Vc(B,je,Pe),Ge=new pc(Ne),Be=new Ru(I,Fe,Ae,je,rt,Ge),Ve=new md(I,Ne),Ue=new Uu,We=new Xu(Ae),Ye=new lc(I,Fe,V,ze,_,s),qe=new id(I,ze,je),it=new hd(B,Me,je,V),et=new dc(B,Ae,Me),tt=new zc(B,Ae,Me),Me.programs=Be.programs,I.capabilities=je,I.extensions=Ae,I.properties=Ne,I.renderLists=Ue,I.shadowMap=qe,I.state=V,I.info=Me}S!==1009&&(F=new Wc(S,t.width,t.height,o,r,i));let ot=new dd(I,B);this.xr=ot,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let e=Ae.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ae.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(e){e!==void 0&&(me=e,this.setSize(fe,pe,!1))},this.getSize=function(e){return e.set(fe,pe)},this.setSize=function(e,n,r=!0){if(ot.isPresenting){Xe(`WebGLRenderer: Can't change size while VR device is presenting.`);return}fe=e,pe=n,t.width=Math.floor(e*me),t.height=Math.floor(n*me),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),F!==null&&F.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(fe*me,pe*me).floor()},this.setDrawingBufferSize=function(e,n,r){fe=e,pe=n,me=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){Ze(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){Xe(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}F.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(se)},this.getViewport=function(e){return e.copy(_e)},this.setViewport=function(e,t,n,r){e.isVector4?_e.set(e.x,e.y,e.z,e.w):_e.set(e,t,n,r),V.viewport(se.copy(_e).multiplyScalar(me).round())},this.getScissor=function(e){return e.copy(ve)},this.setScissor=function(e,t,n,r){e.isVector4?ve.set(e.x,e.y,e.z,e.w):ve.set(e,t,n,r),V.scissor(ce.copy(ve).multiplyScalar(me).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(e){V.setScissorTest(ye=e)},this.setOpaqueSort=function(e){he=e},this.setTransparentSort=function(e){ge=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(z!==null){let t=z.texture.format;e=C.has(t)}if(e){let e=z.texture.type,t=w.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,B.clearBufferuiv(B.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,B.clearBufferiv(B.COLOR,0,E))}else r|=B.COLOR_BUFFER_BIT}t&&(r|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&B.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),R=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),Ye.dispose(),Ue.dispose(),We.dispose(),Ne.dispose(),Fe.dispose(),ze.dispose(),rt.dispose(),it.dispose(),Be.dispose(),ot.dispose(),ot.removeEventListener(`sessionstart`,gt),ot.removeEventListener(`sessionend`,_t),vt.stop()};function st(e){e.preventDefault(),Je(`WebGLRenderer: Context Lost.`),L=!0}function ct(){Je(`WebGLRenderer: Context Restored.`),L=!1;let e=Me.autoReset,t=qe.enabled,n=qe.autoUpdate,r=qe.needsUpdate,i=qe.type;at(),Me.autoReset=e,qe.enabled=t,qe.autoUpdate=n,qe.needsUpdate=r,qe.type=i}function lt(e){Ze(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ut(e){let t=e.target;t.removeEventListener(`dispose`,ut),dt(t)}function dt(e){ft(e),Ne.remove(e)}function ft(e){let t=Ne.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ee);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Ot(e,t,n,r,i);V.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Re.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=Le.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(V.setLineWidth(r.wireframeLinewidth*Oe()),g.setMode(B.LINES)):g.setMode(B.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),V.setLineWidth(e*Oe()),i.isLineSegments?g.setMode(B.LINES):i.isLineLoop?g.setMode(B.LINE_LOOP):g.setMode(B.LINE_STRIP)}else i.isPoints?g.setMode(B.POINTS):i.isSprite&&g.setMode(B.TRIANGLES);if(i.isBatchedMesh){if(Ae.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Le.get(c).bytesPerElement:1,o=Ne.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(B,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function pt(e,t,n,r){R!==null&&e.isNodeMaterial&&R.setObject(r,e),xe===!0&&Ge.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,r),e.side=0,e.needsUpdate=!0,wt(e,t,r),e.side=2):wt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),R!==null&&R.renderStart(e,t,n),k=We.get(n),k.init(t),P.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights(),R!==null&&R.updateLights(k.state.lightsArray),Se=this.localClippingEnabled,xe=Ge.init(this.clippingPlanes,Se),xe===!0&&Ge.setGlobalState(this.clippingPlanes,t),R!==null&&qe.render(k.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];pt(o,n,t,e),r.add(o)}else pt(i,n,t,e),r.add(i)}}),k=P.pop(),R!==null&&R.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=Ne.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ae.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let mt=null;function ht(e){mt&&mt(e)}function gt(){vt.stop()}function _t(){vt.start()}let vt=new nc;vt.setAnimationLoop(ht),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){mt=e,ot.setAnimationLoop(e),e===null?vt.stop():vt.start()},ot.addEventListener(`sessionstart`,gt),ot.addEventListener(`sessionend`,_t),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){Ze(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(L===!0)return;R!==null&&R.renderStart(e,t);let n=ot.enabled===!0&&ot.isPresenting===!0,r=F!==null&&(z===null||n)&&F.begin(I,z);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(F===null||F.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(t),t=ot.getCamera()),e.isScene===!0&&e.onBeforeRender(I,e,t,z),k=We.get(e,P.length),k.init(t),k.state.textureUnits=Pe.getTextureUnits(),P.push(k),Ce.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),be.setFromProjectionMatrix(Ce,He,t.reversedDepth),Se=this.localClippingEnabled,xe=Ge.init(this.clippingPlanes,Se),O=Ue.get(e,j.length),O.init(),j.push(O),ot.enabled===!0&&ot.isPresenting===!0){let e=I.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,I.sortObjects)}yt(e,t,0,I.sortObjects),O.finish(),R!==null&&R.updateLights(k.state.lightsArray),I.sortObjects===!0&&O.sort(he,ge),De=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,De&&Ye.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Ge.beginShadows();let i=k.state.shadowsArray;if(qe.render(i,e,t),xe===!0&&Ge.endShadows(),(r&&F.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}De&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(O,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),De&&Ye.render(e),bt(O,e,t)}z!==null&&ie===0&&(Pe.updateMultisampleRenderTarget(z),Pe.updateRenderTargetMipmap(z)),r&&F.end(I),e.isScene===!0&&e.onAfterRender(I,e,t),rt.resetDefaultState(),ae=-1,oe=null,P.pop(),P.length>0?(k=P[P.length-1],Pe.setTextureUnits(k.state.textureUnits),xe===!0&&Ge.setGlobalState(I.clippingPlanes,k.state.camera)):k=null,j.pop(),O=j.length>0?j[j.length-1]:null,R!==null&&R.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(be)){r&&Te.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ce);let i=ze.update(e),a=e.material;a.visible&&O.push(e,i,a,n,Te.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(be))){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Te.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Te.copy(e.boundingSphere.center)),Te.applyMatrix4(e.matrixWorld).applyMatrix4(Ce)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,Te.z,s,t)}}else a.visible&&O.push(e,i,a,n,Te.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),xe===!0&&Ge.setGlobalState(I.clippingPlanes,n),r&&V.viewport(se.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Ae.has(`EXT_color_buffer_half_float`)||Ae.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new Xt(1,1,{generateMipmaps:!0,type:e?v:d,minFilter:u,samples:Math.max(4,je.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Lt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||se;a.setSize(o.z*I.transmissionResolutionScale,o.w*I.transmissionResolutionScale);let s=I.getRenderTarget(),c=I.getActiveCubeFace(),l=I.getActiveMipmapLevel();I.setRenderTarget(a),I.getClearColor(ue),de=I.getClearAlpha(),de<1&&I.setClearColor(16777215,.5),I.clear(),De&&Ye.render(n);let f=I.toneMapping;I.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),xe===!0&&Ge.setGlobalState(I.clippingPlanes,r),St(e,n,r),Pe.updateMultisampleRenderTarget(a),Pe.updateRenderTargetMipmap(a),Ae.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Pe.updateMultisampleRenderTarget(a),Pe.updateRenderTargetMipmap(a))}I.setRenderTarget(s,c,l),I.setClearColor(ue,de),p!==void 0&&(r.viewport=p),I.toneMapping=f}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){R!==null&&i.isNodeMaterial&&R.setObject(e,i),e.onBeforeRender(I,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(I,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,I.renderBufferDirect(n,t,r,i,e,a),i.side=2):I.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(I,t,n,r,i,a)}function wt(e,t,n){t.isScene!==!0&&(t=Ee);let r=Ne.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Be.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Be.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Fe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ut),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=Be.getUniforms(e),R!==null&&e.isNodeMaterial&&R.build(e,n,s),e.onBeforeCompile(s,I),d=Be.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ge.uniform),Et(e,s),r.needsLights=kt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Zl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=Ne.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=Ee),Pe.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=z===null?I.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Lt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Fe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(h=I.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=Ne.get(r),y=k.state.lights;if(xe===!0&&(Se===!0||e!==oe)){let t=e===oe&&r.id===ae;Ge.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ge.numPlanes||v.numIntersection!==Ge.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=wt(r,t,i),R&&r.isNodeMaterial&&R.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(V.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ae&&(ae=r.id,C=!0),v.needsLights){let e=Dt(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||oe!==e){V.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(B,`projectionMatrix`,e.projectionMatrix),T.setValue(B,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(B,we.setFromMatrixPosition(e.matrixWorld)),je.logarithmicDepthBuffer&&T.setValue(B,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(B,`isOrthographic`,e.isOrthographicCamera===!0),oe!==e&&(oe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(B,`sunShadowMap`,y.state.sunShadowMap,Pe),y.state.directionalShadowMap.length>0&&T.setValue(B,`directionalShadowMap`,y.state.directionalShadowMap,Pe),y.state.spotShadowMap.length>0&&T.setValue(B,`spotShadowMap`,y.state.spotShadowMap,Pe),y.state.pointShadowMap.length>0&&T.setValue(B,`pointShadowMap`,y.state.pointShadowMap,Pe)),i.isSkinnedMesh){T.setOptional(B,i,`bindMatrix`),T.setOptional(B,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(B,`boneTexture`,e.boneTexture,Pe))}i.isBatchedMesh&&(T.setOptional(B,i,`batchingTexture`),T.setValue(B,`batchingTexture`,i._matricesTexture,Pe),T.setOptional(B,i,`batchingIdTexture`),T.setValue(B,`batchingIdTexture`,i._indirectTexture,Pe),T.setOptional(B,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(B,`batchingColorTexture`,i._colorsTexture,Pe));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Qe.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(B,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=vd()),C){if(T.setValue(B,`toneMappingExposure`,I.toneMappingExposure),v.needsLights&&H(E,w),a&&r.fog===!0&&Ve.refreshFogUniforms(E,a),Ve.refreshMaterialUniforms(E,r,me,pe,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}Zl.upload(B,Tt(v),E,Pe)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Zl.upload(B,Tt(v),E,Pe),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(B,`center`,i.center),T.setValue(B,`modelViewMatrix`,i.modelViewMatrix),T.setValue(B,`normalMatrix`,i.normalMatrix),T.setValue(B,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];it.update(n,x),it.bind(n,x)}}return x}function H(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function kt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return re},this.getActiveMipmapLevel=function(){return ie},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(e,t,n){let r=Ne.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),Ne.get(e.texture).__webglTexture=t,Ne.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=Ne.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){z=e,re=t,ie=n;let r=null,i=!1,a=!1;if(e){let o=Ne.get(e);if(o.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(B.FRAMEBUFFER,o.__webglFramebuffer),se.copy(e.viewport),ce.copy(e.scissor),le=e.scissorTest,V.viewport(se),V.scissor(ce),V.setScissorTest(le),ae=-1;return}if(o.__webglFramebuffer===void 0)Pe.setupRenderTarget(e);else if(o.__hasExternalTextures)Pe.rebindTextures(e,Ne.get(e.texture).__webglTexture,Ne.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&Ne.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Pe.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=Ne.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Pe.useMultisampledRTT(e)===!1?Ne.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,se.copy(e.viewport),ce.copy(e.scissor),le=e.scissorTest}else se.copy(_e).multiplyScalar(me).floor(),ce.copy(ve).multiplyScalar(me).floor(),le=ye;if(n!==0&&(r=ee),V.bindFramebuffer(B.FRAMEBUFFER,r)&&V.drawBuffers(e,r),V.viewport(se),V.scissor(ce),V.setScissorTest(le),i){let r=Ne.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=Ne.get(e.textures[t]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=Ne.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,t.__webglTexture,n)}ae=-1};function At(e){let t=Ne.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=je.textureFormatReadable(e.format),t.__typeReadable=je.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){Ze(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=Ne.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){V.bindFramebuffer(B.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s);let u=At(o);if(u.__formatReadable===!1){Ze(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){Ze(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&B.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=z===null?null:Ne.get(z).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=Ne.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){V.bindFramebuffer(B.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s);let d=At(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,f),B.bufferData(B.PIXEL_PACK_BUFFER,a.byteLength,B.STREAM_READ),B.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let p=z===null?null:Ne.get(z).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,p);let m=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await $e(B,m,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,f),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,a),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(f),B.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Pe.setTexture2D(e,0),B.copyTexSubImage2D(B.TEXTURE_2D,n,0,0,o,s,i,a),V.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Pe.setTexture3D(t,0),v=B.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Pe.setTexture2DArray(t,0),v=B.TEXTURE_2D_ARRAY):(Pe.setTexture2D(t,0),v=B.TEXTURE_2D),V.activeTexture(B.TEXTURE0),V.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,t.flipY),V.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),V.pixelStorei(B.UNPACK_ALIGNMENT,t.unpackAlignment);let y=V.getParameter(B.UNPACK_ROW_LENGTH),b=V.getParameter(B.UNPACK_IMAGE_HEIGHT),x=V.getParameter(B.UNPACK_SKIP_PIXELS),S=V.getParameter(B.UNPACK_SKIP_ROWS),C=V.getParameter(B.UNPACK_SKIP_IMAGES);V.pixelStorei(B.UNPACK_ROW_LENGTH,h.width),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,h.height),V.pixelStorei(B.UNPACK_SKIP_PIXELS,l),V.pixelStorei(B.UNPACK_SKIP_ROWS,u),V.pixelStorei(B.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=Ne.get(e),r=Ne.get(t),h=Ne.get(n.__renderTarget),g=Ne.get(r.__renderTarget);V.bindFramebuffer(B.READ_FRAMEBUFFER,h.__webglFramebuffer),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ne.get(e).__webglTexture,i,d+n),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ne.get(t).__webglTexture,a,m+n)),B.blitFramebuffer(l,u,o,s,f,p,o,s,B.DEPTH_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||Ne.has(e)){let n=Ne.get(e),r=Ne.get(t);V.bindFramebuffer(B.READ_FRAMEBUFFER,te),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,ne);for(let e=0;e<c;e++)w?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,n.__webglTexture,i),T?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,r.__webglTexture,a),i===0?T?B.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):B.copyTexSubImage2D(v,a,f,p,l,u,o,s):B.blitFramebuffer(l,u,o,s,f,p,o,s,B.COLOR_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?B.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h);V.pixelStorei(B.UNPACK_ROW_LENGTH,y),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,b),V.pixelStorei(B.UNPACK_SKIP_PIXELS,x),V.pixelStorei(B.UNPACK_SKIP_ROWS,S),V.pixelStorei(B.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&B.generateMipmap(v),V.unbindTexture()},this.initRenderTarget=function(e){Ne.get(e).__webglFramebuffer===void 0&&Pe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Pe.setTextureCube(e,0):e.isData3DTexture?Pe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Pe.setTexture2DArray(e,0):Pe.setTexture2D(e,0),V.unbindTexture()},this.resetState=function(){re=0,ie=0,z=null,V.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lt._getUnpackColorSpace()}},bd={type:`change`},xd={type:`start`},Sd={type:`end`},Cd=new fi,wd=new Ur,Td=Math.cos(70*Ot.DEG2RAD),Ed=new U,Dd=2*Math.PI,Od={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},kd=1e-6,Ad=class extends $s{constructor(n,r=null){super(n,r),this.state=Od.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:`ArrowLeft`,UP:`ArrowUp`,RIGHT:`ArrowRight`,BOTTOM:`ArrowDown`},this.mouseButtons={LEFT:e.ROTATE,MIDDLE:e.DOLLY,RIGHT:e.PAN},this.touches={ONE:t.ROTATE,TWO:t.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle=`auto`,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new kt,this._lastTargetPosition=new U,this._quat=new kt().setFromUnitVectors(n.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Qs,this._sphericalDelta=new Qs,this._scale=1,this._panOffset=new U,this._rotateStart=new H,this._rotateEnd=new H,this._rotateDelta=new H,this._panStart=new H,this._panEnd=new H,this._panDelta=new H,this._dollyStart=new H,this._dollyEnd=new H,this._dollyDelta=new H,this._dollyDirection=new U,this._mouse=new H,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Md.bind(this),this._onPointerDown=jd.bind(this),this._onPointerUp=Nd.bind(this),this._onContextMenu=Bd.bind(this),this._onMouseWheel=Id.bind(this),this._onKeyDown=Ld.bind(this),this._onTouchStart=Rd.bind(this),this._onTouchMove=zd.bind(this),this._onMouseDown=Pd.bind(this),this._onMouseMove=Fd.bind(this),this._interceptControlDown=Vd.bind(this),this._interceptControlUp=Hd.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e===`grab`?this.domElement.style.cursor=`grab`:this.domElement.style.cursor=`auto`}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener(`pointerdown`,this._onPointerDown),this.domElement.addEventListener(`pointercancel`,this._onPointerUp),this.domElement.addEventListener(`contextmenu`,this._onContextMenu),this.domElement.addEventListener(`wheel`,this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener(`keydown`,this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction=`none`}disconnect(){this.state=Od.NONE,this.domElement.removeEventListener(`pointerdown`,this._onPointerDown),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.domElement.removeEventListener(`pointercancel`,this._onPointerUp),this.domElement.removeEventListener(`wheel`,this._onMouseWheel),this.domElement.removeEventListener(`contextmenu`,this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener(`keydown`,this._interceptControlDown,{capture:!0}),e.removeEventListener(`keyup`,this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction=``,this.domElement.style.cursor=`auto`}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener(`keydown`,this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(bd),this.update(),this.state=Od.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ed.copy(t).sub(this.target),Ed.applyQuaternion(this._quat),this._spherical.setFromVector3(Ed),this.autoRotate&&this.state===Od.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Dd:n>Math.PI&&(n-=Dd),r<-Math.PI?r+=Dd:r>Math.PI&&(r-=Dd),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let e=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=e!=this._spherical.radius}if(Ed.setFromSpherical(this._spherical),Ed.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ed),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let e=null;if(this.object.isPerspectiveCamera){let t=Ed.length();e=this._clampDistance(t*this._scale);let n=t-e;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),i=!!n}else if(this.object.isOrthographicCamera){let t=new U(this._mouse.x,this._mouse.y,0);t.unproject(this.object);let n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=n!==this.object.zoom;let r=new U(this._mouse.x,this._mouse.y,0);r.unproject(this.object),this.object.position.sub(r).add(t),this.object.updateMatrixWorld(),e=Ed.length()}else console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.`),this.zoomToCursor=!1;e!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(e).add(this.object.position):(Cd.origin.copy(this.object.position),Cd.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cd.direction))<Td?this.object.lookAt(this.target):(wd.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cd.intersectPlane(wd,this.target))))}else if(this.object.isOrthographicCamera){let e=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),e!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>kd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>kd||this._lastTargetPosition.distanceToSquared(this.target)>kd?(this.dispatchEvent(bd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e===null?Dd/60/60*this.autoRotateSpeed:Dd/60*this.autoRotateSpeed*e}_getZoomScale(e){let t=Math.abs(e*.01);return .95**(this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ed.setFromMatrixColumn(t,0),Ed.multiplyScalar(-e),this._panOffset.add(Ed)}_panUp(e,t){this.screenSpacePanning===!0?Ed.setFromMatrixColumn(t,1):(Ed.setFromMatrixColumn(t,0),Ed.crossVectors(this.object.up,Ed)),Ed.multiplyScalar(e),this._panOffset.add(Ed)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Ed.copy(r).sub(this.target);let i=Ed.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/n.clientHeight,this.object.matrix),this._panUp(2*t*i/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.`),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn(`WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.`),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),r=e-n.left,i=t-n.top,a=n.width,o=n.height;this._mouse.x=r/a*2-1,this._mouse.y=-(i/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Dd*this._rotateDelta.x/t.clientHeight),this._rotateUp(Dd*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Dd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Dd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Dd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Dd*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(n,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Dd*this._rotateDelta.x/t.clientHeight),this._rotateUp(Dd*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,r=e.pageY-t.y,i=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,i),this._dollyDelta.set(0,(this._dollyEnd.y/this._dollyStart.y)**+this.zoomSpeed),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new H,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function jd(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.addEventListener(`pointerup`,this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType===`touch`?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grabbing`)))}function Md(e){this.enabled!==!1&&(e.pointerType===`touch`?this._onTouchMove(e):this._onMouseMove(e))}function Nd(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener(`pointermove`,this._onPointerMove),this.domElement.ownerDocument.removeEventListener(`pointerup`,this._onPointerUp),this.dispatchEvent(Sd),this.state=Od.NONE,this._cursorStyle===`grab`&&(this.domElement.style.cursor=`grab`);break;case 1:let t=this._pointers[0],n=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:n.x,pageY:n.y})}}function Pd(t){let n;switch(t.button){case 0:n=this.mouseButtons.LEFT;break;case 1:n=this.mouseButtons.MIDDLE;break;case 2:n=this.mouseButtons.RIGHT;break;default:n=-1}switch(n){case e.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=Od.DOLLY;break;case e.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=Od.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=Od.ROTATE}break;case e.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=Od.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=Od.PAN}break;default:this.state=Od.NONE}this.state!==Od.NONE&&this.dispatchEvent(xd)}function Fd(e){switch(this.state){case Od.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case Od.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case Od.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e)}}function Id(e){this.enabled!==!1&&this.enableZoom!==!1&&this.state===Od.NONE&&(e.preventDefault(),this.dispatchEvent(xd),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Sd))}function Ld(e){this.enabled!==!1&&this._handleKeyDown(e)}function Rd(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case t.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=Od.TOUCH_ROTATE;break;case t.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=Od.TOUCH_PAN;break;default:this.state=Od.NONE}break;case 2:switch(this.touches.TWO){case t.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=Od.TOUCH_DOLLY_PAN;break;case t.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=Od.TOUCH_DOLLY_ROTATE;break;default:this.state=Od.NONE}break;default:this.state=Od.NONE}this.state!==Od.NONE&&this.dispatchEvent(xd)}function zd(e){switch(this._trackPointer(e),this.state){case Od.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case Od.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case Od.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case Od.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=Od.NONE}}function Bd(e){this.enabled!==!1&&e.preventDefault()}function Vd(e){e.key===`Control`&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function Hd(e){e.key===`Control`&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener(`keyup`,this._interceptControlUp,{passive:!0,capture:!0}))}function q(e=1){let t=e>>>0,n=()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296};return n.range=(e,t)=>e+(t-e)*n(),n.int=(e,t)=>Math.floor(e+(t-e+1)*n()),n.pick=e=>e[Math.floor(n()*e.length)],n.chance=e=>n()<e,n.sign=()=>n()<.5?-1:1,n}var Ud=e=>{let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0},Wd=new Uint8Array(512);{let e=q(7331),t=[...Array(256).keys()];for(let n=255;n>0;n--){let r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}for(let e=0;e<512;e++)Wd[e]=t[e&255]}var Gd=e=>e*e*e*(e*(e*6-15)+10),Kd=(e,t,n)=>{let r=e&7,i=r<4?t:n,a=r<4?n:t;return(r&1?-i:i)+(r&2?-2*a:2*a)};function qd(e,t){let n=Math.floor(e)&255,r=Math.floor(t)&255;e-=Math.floor(e),t-=Math.floor(t);let i=Gd(e),a=Gd(t),o=Wd[n]+r,s=Wd[n+1]+r,c=Kd(Wd[o],e,t),l=Kd(Wd[s],e-1,t),u=Kd(Wd[o+1],e,t-1),d=Kd(Wd[s+1],e-1,t-1),f=c+i*(l-c);return(f+a*(u+i*(d-u)-f))*.35}function Jd(e,t,n=4,r=2,i=.5){let a=1,o=1,s=0,c=0;for(let l=0;l<n;l++)s+=a*qd(e*o,t*o),c+=a,a*=i,o*=r;return s/c}var Yd=(e,t,n)=>e<t?t:e>n?n:e,Xd=(e,t,n)=>e+(t-e)*n,Zd=(e,t,n)=>{let r=Yd((n-e)/(t-e),0,1);return r*r*(3-2*r)},Qd=8,$d=e=>Qd=e;function ef(e,t=e){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function tf(e,{srgb:t=!0,repeat:i=!0,aniso:a=Qd,mips:o=!0}={}){let s=new Yi(e);return t&&(s.colorSpace=Ie),s.wrapS=s.wrapT=i?n:r,s.anisotropy=a,s.generateMipmaps=o,o||(s.minFilter=c),s.needsUpdate=!0,s}var nf=new Uint8Array(512);{let e=q(90210),t=[...Array(256).keys()];for(let n=255;n>0;n--){let r=Math.floor(e()*(n+1));[t[n],t[r]]=[t[r],t[n]]}for(let e=0;e<512;e++)nf[e]=t[e&255]}var rf=Array.from({length:16},(e,t)=>[Math.cos(t/16*Math.PI*2),Math.sin(t/16*Math.PI*2)]),af=e=>e*e*e*(e*(e*6-15)+10);function of(e,t,n,r){let i=Math.floor(e),a=Math.floor(t),o=e-i,s=t-a,c=(i%n+n)%n,l=(a%r+r)%r,u=(c+1)%n,d=(l+1)%r,f=(e,t,n,r)=>{let i=rf[nf[nf[e&255]+(t&255)]&15];return i[0]*n+i[1]*r},p=af(o),m=af(s),h=f(c,l,o,s),g=f(u,l,o-1,s),_=f(c,d,o,s-1),v=f(u,d,o-1,s-1);return(h+p*(g-h)+m*(_+p*(v-_)-(h+p*(g-h))))*1.4}function sf(e,t,n,r=4){let i=1,a=1,o=0,s=0;for(let c=0;c<r;c++)o+=i*of(e*a,t*a,n*a,n*a),s+=i,i*=.5,a*=2;return o/s}function cf(e,t){let n=e.getContext(`2d`),r=n.createImageData(e.width,e.height),i=r.data,a=[0,0,0,255];for(let n=0;n<e.height;n++)for(let r=0;r<e.width;r++){t(r,n,a);let o=(n*e.width+r)*4;i[o]=a[0],i[o+1]=a[1],i[o+2]=a[2],i[o+3]=a[3]}return n.putImageData(r,0,0),n}function lf(e=256,{base:t=[202,197,187],blotch:n=16,speck:r=14,seed:i=1,pores:a=.004,lines:o=0}={}){let s=q(i),c=ef(e);cf(c,(i,a,c)=>{let l=i/e,u=a/e,d=sf(l*4,u*4,4,5),f=sf(l*4*4+7.3,u*4*4+1.1,16,3),p=d*n+f*n*.35+(s()-.5)*r;o&&u*o%1<.012&&(p-=18),c[0]=Yd(t[0]+p,0,255),c[1]=Yd(t[1]+p,0,255),c[2]=Yd(t[2]+p*.95,0,255),c[3]=255});let l=c.getContext(`2d`),u=Math.floor(e*e*a);for(let t=0;t<u;t++){let t=s()*e,n=s()*e,r=.4+s()*1.1;l.fillStyle=`rgba(60,55,48,${.25+s()*.35})`,l.beginPath(),l.arc(t,n,r,0,Math.PI*2),l.fill()}for(let t=0;t<6;t++){let t=s()*e,n=l.createLinearGradient(0,0,0,e);n.addColorStop(0,`rgba(80,72,60,0)`),n.addColorStop(.5,`rgba(80,72,60,${.04+s()*.05})`),n.addColorStop(1,`rgba(80,72,60,0)`),l.fillStyle=n,l.fillRect(t,0,2+s()*6,e)}return c}function uf(e=1024,t=5,n=4){let r=q(n),i=ef(e),a=i.getContext(`2d`),o=e/t;cf(i,(t,n,i)=>{let a=sf(t/e*6,n/e*6,6,4)*9+(r()-.5)*6;i[0]=128+a,i[1]=118+a,i[2]=104+a*.9,i[3]=255});for(let e=0;e<t;e++)for(let n=0;n<t;n++){let t=r(),i=.05+r()*.1;a.fillStyle=t<.4?`rgba(84,72,58,${i})`:t<.8?`rgba(150,138,118,${i})`:`rgba(104,96,86,${i+.04})`,a.fillRect(n*o+2,e*o+2,o-4,o-4)}a.fillStyle=`rgba(46,40,33,0.75)`;for(let n=0;n<=t;n++)a.fillRect(n*o-2,0,4,e),a.fillRect(0,n*o-2,e,4);return i}function df(e=512,t=5){let n=ef(e),r=e/t;return cf(n,(e,t,n)=>{let i=e%r/r,a=t%r/r,o=0,s=0,c=.035;i<c?o=-.6:i>.965&&(o=.6),a<c?s=.6:a>.965&&(s=-.6),n[0]=128+o*127,n[1]=128+s*127,n[2]=255,n[3]=255}),n}function ff(e=256,t=1024,n=12){let r=q(n),i=ef(e,t),a=[],o=0;for(;o<1;){let e=.006+r()*.04;a.push({y0:o,y1:o+e,k:(r()-.5)*12}),o+=e}let s=0;cf(i,(n,i,o)=>{let c=i/t,l=Yd(c+sf(n/e*3,c*2,3,3)*.01,0,.9999);for(;s<a.length-1&&a[s].y1<l;)s++;for(;s>0&&a[s].y0>l;)s--;let u=a[s].k,d=c**.45,f=[78-d*16,64-d*12,52-d*8],p=u*1.3+sf(n/e*8,c*30,8,3)*3+(r()-.5)*3;o[0]=Yd(f[0]+p,0,255),o[1]=Yd(f[1]+p*.85,0,255),o[2]=Yd(f[2]+p*.7,0,255),o[3]=255});let c=i.getContext(`2d`);for(let n=0;n<46;n++){let n=r()*t;c.strokeStyle=r()<.75?`rgba(160,136,106,${.1+r()*.12})`:`rgba(26,19,14,${.12+r()*.1})`,c.lineWidth=.8+r()*1.4;let i=1+Math.floor(r()*3),a=2+Math.floor(r()*4),o=1+r()*3.5,s=r()*1.5,l=r()*6.28,u=r()*6.28;c.beginPath();for(let t=0;t<=e;t+=4){let r=t/e*Math.PI*2,d=n+Math.sin(r*i+l)*o+Math.sin(r*a+u)*s;t===0?c.moveTo(t,d):c.lineTo(t,d)}c.stroke()}return i}function pf(e=512,t=23){let n=q(t),r=ef(e);return cf(r,(t,r,i)=>{let a=t/e,o=r/e,s=a+sf(a*3+1.7,o*3+9.2,3,3)*.06,c=o+sf(a*3+5.3,o*3+2.4,3,3)*.06,l=sf(s*4,c*4,4,3),u=sf(s*7+3.3,c*7+7.7,7,2),d=Yd(sf(a*2+4.1,o*2+.6,2,2)*1.6+.5,0,1),f=1-Yd(Math.abs(l)/.04,0,1),p=(1-Yd(Math.abs(u)/.03,0,1))*d,m=Math.max(f**1.4,p**1.4*.8),h=Yd((-l-.06)/.12,0,1)*9,g=sf(a*6,o*6,6,4)*12+sf(a*24,o*24,24,2)*5+(n()-.5)*6-h,_=[206,202,192],v=m*74;i[0]=Yd(_[0]+g-v,0,255),i[1]=Yd(_[1]+g-v*1.02,0,255),i[2]=Yd(_[2]+g*.95-v*1.04,0,255),i[3]=255}),r}function mf(e=256,t=3){let n=ef(e),r=new Float32Array(e*e);for(let t=0;t<e;t++)for(let n=0;n<e;n++)r[t*e+n]=sf(n/e*6,t/e*6,6,4);return cf(n,(t,n,i)=>{let a=(t,n)=>r[(n+e)%e*e+(t+e)%e],o=(a(t+1,n)-a(t-1,n))*3,s=(a(t,n+1)-a(t,n-1))*3,c=Math.hypot(o,s,1);i[0]=128+-o/c*127,i[1]=128+-s/c*127,i[2]=128+1/c*127,i[3]=255}),n}function hf(e=64,{core:t=0,noisy:n=!1,seed:r=5}={}){let i=ef(e);if(!n){let n=i.getContext(`2d`),r=n.createRadialGradient(e/2,e/2,e*t,e/2,e/2,e/2);return r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.35,`rgba(255,255,255,0.45)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(0,0,e,e),i}let a=q(r);return cf(i,(t,n,r)=>{let i=t/e-.5,o=n/e-.5,s=Math.hypot(i,o)*2,c=sf(t/e*4,n/e*4,4,4)*.5+.5,l=Yd(1-s,0,1)**1.6*(.55+c*.6);r[0]=r[1]=r[2]=255,r[3]=Yd(l*255+(a()-.5)*6,0,255)}),i}function gf(e=256){let t=ef(e),n=t.getContext(`2d`);n.clearRect(0,0,e,e),n.strokeStyle=`rgba(210,214,216,1)`,n.lineWidth=3;let r=e/8;for(let t=-8;t<=16;t++)n.beginPath(),n.moveTo(t*r,0),n.lineTo(t*r+e,e),n.stroke(),n.beginPath(),n.moveTo(t*r,e),n.lineTo(t*r+e,0),n.stroke();return t}var _f=`Inter, "Helvetica Neue", Helvetica, Arial, sans-serif`;function vf(e=147,t=16,n=128){let r=Math.ceil(e/t),i=ef(t*n,r*n),a=i.getContext(`2d`),o=q(144);a.textAlign=`center`,a.textBaseline=`middle`;for(let r=0;r<e;r++){let e=r+1,i=r%t*n+n/2,o=Math.floor(r/t)*n+n/2;a.font=`800 ${e>=100?n*.5:n*.62}px ${_f}`,a.fillStyle=`#f4f0e6`,a.fillText(String(e),i,o+2)}a.globalCompositeOperation=`destination-out`;for(let e=0;e<9e3;e++)a.fillStyle=`rgba(0,0,0,${.2+o()*.6})`,a.fillRect(o()*i.width,o()*i.height,1+o()*2,1+o()*2);a.globalCompositeOperation=`source-over`;let s=tf(i,{repeat:!1});return s.userData={cols:t,rows:r,count:e},s}var yf=class{constructor(e=2048,t=1024){this.c=ef(e,t),this.ctx=this.c.getContext(`2d`),this.x=0,this.y=0,this.rowH=0,this.pad=6,this.entries=[]}add(e,{style:t=`panel`,size:n=64,bg:r,fg:i,border:a,weight:o=800,spacing:s=.12,padX:c=.45,padY:l=.32,sub:u,font:d=_f,width:f}={}){let p=this.ctx;p.font=`${o} ${n}px ${d}`;let m=n*s,h=(e,t)=>{p.font=t;let n=0;for(let t of e)n+=p.measureText(t).width+m;return n-m},g=`${o} ${n}px ${d}`,_=`600 ${n*.42}px ${d}`,v=h(e,g);u&&(v=Math.max(v,h(u,_)));let y=Math.ceil(f??v+n*c*2),b=Math.ceil(n*(1+l*2)+(u?n*.62:0));this.x+y+this.pad>this.c.width&&(this.x=0,this.y+=this.rowH+this.pad,this.rowH=0),this.y+b>this.c.height&&console.warn(`SignAtlas full:`,e);let x=this.x,S=this.y,C={panel:{bg:`#1d2120`,fg:`#f1ece0`,border:`rgba(241,236,224,0.35)`},light:{bg:`#e9e4d6`,fg:`#26282a`,border:`rgba(0,0,0,0.25)`},red:{bg:`#8e2a22`,fg:`#f6e7d6`,border:`rgba(0,0,0,0.3)`},stencil:{bg:null,fg:`#2a2b2b`,border:null},paint:{bg:null,fg:`#efe9dc`,border:null},green:{bg:`#23402f`,fg:`#e6f1e4`,border:`rgba(230,241,228,0.35)`},amber:{bg:`#2b2418`,fg:`#ffd9a0`,border:`rgba(255,217,160,0.4)`}}[t]||{},w=r??C.bg,T=i??C.fg,E=a??C.border,D=this.ctx;D.clearRect(x,S,y,b),w&&(D.fillStyle=w,D.fillRect(x,S,y,b)),E&&(D.strokeStyle=E,D.lineWidth=Math.max(2,n*.05),D.strokeRect(x+n*.1,S+n*.1,y-n*.2,b-n*.2)),D.fillStyle=T,D.textBaseline=`middle`;let O=(e,t,n)=>{D.font=t;let r=h(e,t),i=x+(y-r)/2;D.font=t;for(let t of e)D.fillText(t,i,n),i+=D.measureText(t).width+m};return O(e,g,S+n*(.5+l)+0+n*.04),u&&(D.globalAlpha=.75,O(u,_,S+n*(1+l)+n*.34),D.globalAlpha=1),this.x+=y+this.pad,this.rowH=Math.max(this.rowH,b),this._entry(x,S,y,b)}_entry(e,t,n,r){let i=this.c.width,a=this.c.height,o={U0:e/i,U1:(e+n)/i,V0:1-(t+r)/a,V1:1-t/a,aspect:n/r};return this.entries.push(o),o}custom(e,t,n){this.x+e+this.pad>this.c.width&&(this.x=0,this.y+=this.rowH+this.pad,this.rowH=0);let r=this.x,i=this.y;return this.ctx.save(),n(this.ctx,r,i,e,t),this.ctx.restore(),this.x+=e+this.pad,this.rowH=Math.max(this.rowH,t),this._entry(r,i,e,t)}texture(){return this.tex||=tf(this.c,{repeat:!1}),this.tex}};function bf(e=1024,t=256,{seed:n=8,tint:r=[1,1,1],grain:i=10,scan:a=!0,tree:o=!0}={}){let s=q(n),c=ef(e,t),l=c.getContext(`2d`),u=l.createLinearGradient(0,0,0,t);u.addColorStop(0,`#a8a498`),u.addColorStop(.55,`#c9c3b4`),u.addColorStop(.72,`#bdb6a6`),u.addColorStop(1,`#8b8474`),l.fillStyle=u,l.fillRect(0,0,e,t);let d=(n,r,i,a,o=0)=>{l.fillStyle=a,l.beginPath(),l.moveTo(0,t);for(let t=0;t<=e;t+=4){let a=t/e,c=n-Math.sin(a*i+1.3)*r-Math.sin(a*i*2.7+.4)*r*.4-(s()-.5)*o;l.lineTo(t,c)}l.lineTo(e,t),l.closePath(),l.fill()};d(t*.66,t*.03,5,`rgba(150,143,128,0.9)`,1.5),d(t*.72,t*.035,3.2,`rgba(128,120,104,0.95)`,1),l.fillStyle=`#6f6757`,l.beginPath(),l.moveTo(0,t);let f=e*.62,p=t*.66;for(let n=0;n<=e;n+=3){let r=(n-f)/(e*.42),i=p+r*r*t*.2+Math.sin(n*.05)*.8;l.lineTo(n,Math.min(t,i))}l.lineTo(e,t),l.closePath(),l.fill();let m=l.createLinearGradient(0,t*.55,0,t*.8);if(m.addColorStop(0,`rgba(210,204,190,0)`),m.addColorStop(.5,`rgba(210,204,190,0.25)`),m.addColorStop(1,`rgba(210,204,190,0)`),l.fillStyle=m,l.fillRect(0,0,e,t),o){l.strokeStyle=`#2f2b25`,l.lineCap=`round`;let n=f+e*.02,r=p+1,i=(e,t,n,r,a,o)=>{let c=e+Math.cos(r)*n,u=t-Math.sin(r)*n;l.lineWidth=a,l.beginPath(),l.moveTo(e,t),l.lineTo(c,u),l.stroke(),o>0&&(i(c,u,n*.66,r+.5+s()*.2,a*.62,o-1),i(c,u,n*.62,r-.45-s()*.2,a*.62,o-1))};i(n,r,t*.12,Math.PI/2+.04,3.2,3)}let h=l.getImageData(0,0,e,t),g=h.data;for(let n=0;n<t;n++){let o=a&&n%3==0?.93:1;for(let a=0;a<e;a++){let c=(n*e+a)*4,l=a/e-.5,u=n/t-.5,d=1-Math.min(.45,(l*l*.8+u*u*2.2)*.9),f=(s()-.5)*i;g[c]=Yd((g[c]+f)*o*d*r[0],0,255),g[c+1]=Yd((g[c+1]+f)*o*d*r[1],0,255),g[c+2]=Yd((g[c+2]+f)*o*d*r[2],0,255)}}return l.putImageData(h,0,0),c}function xf(e=512,t=288,n=4,r=3){let i=ef(e,t),a=i.getContext(`2d`);a.fillStyle=`#0d0f0e`,a.fillRect(0,0,e,t);let o=e/n,s=t/r,c=30;for(let e=0;e<r;e++)for(let t=0;t<n;t++){let n=bf(Math.floor(o-10),Math.floor(s-10),{seed:c++,tint:[.86,1,.9],grain:26,tree:(t+e)%3==0});a.drawImage(n,t*o+5,e*s+5)}return i}function Sf(e,t=2048,n=128,{fg:r=`rgba(40,40,38,0.85)`,bg:i=`#dcd6c8`,size:a=30,spacing:o=.5}={}){let s=lf(256,{base:[220,214,200],blotch:10,speck:8,seed:77}),c=ef(t,n),l=c.getContext(`2d`);l.fillStyle=i,l.fillRect(0,0,t,n);for(let e=0;e<t;e+=256)for(let t=0;t<n;t+=256)l.drawImage(s,e,t);l.fillStyle=`rgba(0,0,0,0.06)`,l.fillRect(0,n*.18,t,2),l.fillRect(0,n*.82,t,2),l.font=`700 ${a}px "Courier New", Courier, monospace`,l.fillStyle=r,l.textBaseline=`middle`;let u=0;for(let t of e)u+=l.measureText(t).width+a*o;let d=(t-u)/2;for(let t of e)l.fillText(t,d,n/2+2),d+=l.measureText(t).width+a*o;return c}function Cf(e=`144`,t=512,n=256){let r=ef(t,n),i=r.getContext(`2d`),a=q(1440);i.clearRect(0,0,t,n),i.font=`900 ${n*.86}px ${_f}`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillStyle=`#e8c65a`,i.fillText(e,t/2,n/2+8),i.globalCompositeOperation=`destination-out`;for(let e=0;e<2600;e++){i.fillStyle=`rgba(0,0,0,${.3+a()*.7})`;let e=1+a()*5;i.fillRect(a()*t,a()*n,e,e*(.3+a()))}return r}function wf(e=384,t=256,n=17){let r=q(n),i=ef(e,t),a=i.getContext(`2d`);a.clearRect(0,0,e,t);for(let e=0;e<5;e++){let t=10+e%3*124+r()*10,n=12+Math.floor(e/3)*120+r()*8;a.save(),a.translate(t+50,n+50),a.rotate((r()-.5)*.25),a.fillStyle=r()<.5?`#efe9d8`:`#e6dcc4`,a.fillRect(-52,-50,104,100),a.lineWidth=3,a.lineCap=`round`;let i=[`#c0392b`,`#2e86c1`,`#27ae60`,`#e67e22`,`#7d3c98`,`#2c3e50`],o=e%4;if(a.strokeStyle=r.pick(i),o===0){a.beginPath(),a.arc(0,-10,18,0,Math.PI*2),a.stroke();for(let e=0;e<10;e++){let t=e/10*Math.PI*2;a.beginPath(),a.moveTo(Math.cos(t)*24,-10+Math.sin(t)*24),a.lineTo(Math.cos(t)*34,-10+Math.sin(t)*34),a.stroke()}}else if(o===1){a.beginPath();for(let e=0;e<90;e++){let t=e*.25,n=4+e*.42;a.lineTo(Math.cos(t)*n*.9,Math.sin(t)*n*.9)}a.stroke()}else if(o===2)for(let e=-1;e<=1;e++)a.strokeStyle=`#6e4b2a`,a.beginPath(),a.moveTo(e*30,38),a.lineTo(e*30,5),a.stroke(),a.fillStyle=r.pick([`#27ae60`,`#1e8449`,`#58d68d`]),a.beginPath(),a.arc(e*30,-8,16,0,Math.PI*2),a.fill();else a.strokeRect(-20,-30,40,64),a.beginPath(),a.arc(10,4,3,0,Math.PI*2),a.stroke(),a.strokeStyle=`#e67e22`,a.beginPath(),a.moveTo(-40,-40),a.lineTo(40,-40),a.stroke();a.restore()}return i}function Tf(e=128,t=64,n=9){let r=q(n),i=ef(e,t);return cf(i,(n,i,a)=>{let o=n/e,s=i/t,c=o<.78+sf(s*6,.5,6,3)*.25+(r()-.5)*.04?255:0;sf(o*5+3,s*5+7,5,3)>.42&&o>.35&&(c=0),a[0]=a[1]=a[2]=c,a[3]=255}),i}var Ef={},J={};function Df(){Ef.concrete=tf(lf(256,{base:[172,166,154],blotch:18,speck:12,seed:1})),Ef.wall=tf(lf(512,{base:[196,190,178],seed:2,lines:5,blotch:20})),Ef.section=tf(lf(256,{base:[216,210,197],blotch:7,speck:4,pores:6e-4,seed:3})),Ef.floor=tf(uf(1024)),Ef.floorN=tf(df(512),{srgb:!1}),Ef.earth=tf(ff(256,1024)),Ef.terrain=tf(pf(512)),Ef.waterN=tf(mf(256),{srgb:!1}),Ef.soft=tf(hf(64),{repeat:!1}),Ef.steam=tf(hf(128,{noisy:!0}),{repeat:!1}),Ef.chain=tf(gf(256)),Ef.column=tf(lf(256,{base:[200,195,184],seed:11,lines:2})),Ef.column.repeat.set(6,684);let e=e=>new Bo({vertexColors:!0,...e});return J.matte=e({name:`matte`,roughness:.88,metalness:0}),J.metal=e({name:`metal`,roughness:.42,metalness:.72}),J.wood=e({name:`wood`,roughness:.5,metalness:.02}),J.fabric=e({name:`fabric`,roughness:.95,metalness:0}),J.foliage=e({name:`foliage`,roughness:.92,metalness:0}),J.rock=e({name:`rock`,roughness:.97,metalness:0,flatShading:!0}),J.concrete=e({name:`shaftConcrete`,map:Ef.concrete,roughness:.88}),J.column=e({name:`shaftColumn`,map:Ef.column,roughness:.9,vertexColors:!1,color:12369330}),J.trim=e({name:`shaftTrim`,roughness:.72,metalness:.05}),J.glass=new Vo({name:`glass`,vertexColors:!0,roughness:.06,metalness:0,transparent:!0,opacity:.3,depthWrite:!1,side:2}),J.glow=new pi({name:`glow`,vertexColors:!0}),J.water=e({name:`water`,roughness:.14,metalness:.05,transparent:!0,opacity:.82,normalMap:Ef.waterN,normalScale:new H(.6,.6),depthWrite:!1}),J.sheen=new Vo({name:`sheen`,color:2767416,roughness:.12,metalness:0,transparent:!0,opacity:.5,normalMap:Ef.waterN,depthWrite:!1}),Ef.waterN.repeat.set(3,3),{TEX:Ef,MATS:J}}function Of(e,t=.55){return new Bo({map:e,emissiveMap:e,emissive:16777215,emissiveIntensity:t,roughness:.6,metalness:0,transparent:!0,alphaTest:.02})}function kf(e,t=1.5,n=1052688){return new Bo({color:n,map:e,emissiveMap:e,emissive:16777215,emissiveIntensity:t,roughness:.85,metalness:0})}var Af={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},jf=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Mf=new Es(-1,1,1,-1,0,1),Nf=new class extends Ir{constructor(){super(),this.setAttribute(`position`,new wr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new wr([0,2,0,0,2,0],2))}},Pf=class{constructor(e){this._mesh=new G(Nf,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Mf)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Ff=class extends jf{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ro?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Fo.clone(e.uniforms),this.material=new Ro({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pf(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},If=class extends jf{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Lf=class extends jf{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Rf=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new H);this._width=n.width,this._height=n.height,t=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:v}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ff(Af),this.copyPass.material.blending=0,this.timer=new Ps}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}If!==void 0&&(r instanceof If?n=!0:r instanceof Lf&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},zf=class extends jf{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new W}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Bf={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new W(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Vf=class e extends jf{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new H(256,256):new H(e.x,e.y),this.clearColor=new W(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Xt(i,a,{type:v,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Xt(i,a,{type:v,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Xt(i,a,{type:v,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Bf;this.highPassUniforms=Fo.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ro({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new H(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Fo.clone(Af.uniforms),this.blendMaterial=new Ro({uniforms:this.copyUniforms,vertexShader:Af.vertexShader,fragmentShader:Af.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new W,this._oldClearAlpha=1,this._basic=new pi,this._fsQuad=new Pf(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new H(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new Ro({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new H(.5,.5)},direction:{value:new H(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new Ro({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Vf.BlurDirectionX=new H(1,0),Vf.BlurDirectionY=new H(0,1);var Hf={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

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

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Uf=class extends jf{constructor(){super(),this.isOutputPass=!0,this.uniforms=Fo.clone(Hf.uniforms),this.material=new zo({name:Hf.name,uniforms:this.uniforms,vertexShader:Hf.vertexShader,fragmentShader:Hf.fragmentShader}),this._fsQuad=new Pf(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Lt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Wf=class extends Ln{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new $i;e.deleteAttribute(`uv`);let t=new Bo({side:1}),n=new Bo,r=new Ts(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new G(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new Ii(e,n,6),o=new Dn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new G(e,Gf(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new G(e,Gf(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new G(e,Gf(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new G(e,Gf(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new G(e,Gf(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new G(e,Gf(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Gf(e){return new Ho({color:0,emissive:16777215,emissiveIntensity:e})}var Kf={hemiSky:`#cdbfa8`,hemiGround:`#2a231c`,hemiI:.55,keyI:1.7,keyColor:`#fff0da`,fillI:.35,fillColor:`#9fb3c8`,fog:`#9c9a90`,fogDensity:22e-5,bloom:.42,bloomR:.38,bloomT:3,grade:.55,envI:.35},qf=new U(354,670,931),Jf=new U(-708.9,253.2,658.3),Yf={name:`SiloGrade`,uniforms:{tDiffuse:{value:null},uAmount:{value:Kf.grade}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uAmount;
    varying vec2 vUv;
    void main() {
      vec4 src = texture2D(tDiffuse, vUv);
      vec3 c = src.rgb;
      // soft contrast curve
      vec3 curved = c * c * (3.0 - 2.0 * c);
      c = mix(c, curved, 0.28 * uAmount);
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      // cool, slightly green shadows; warm highlights
      float sh = 1.0 - smoothstep(0.0, 0.45, l);
      float hi = smoothstep(0.55, 1.0, l);
      c *= mix(vec3(1.0), vec3(0.9, 1.0, 0.98), sh * 0.5 * uAmount);
      c *= mix(vec3(1.0), vec3(1.05, 1.0, 0.95), hi * 0.5 * uAmount);
      // vignette, a touch low of centre
      float d = distance(vUv, vec2(0.5, 0.48));
      c *= 1.0 - smoothstep(0.45, 0.95, d) * 0.32 * uAmount;
      gl_FragColor = vec4(c, src.a);
    }
  `};function Xf(){let e=new Ro({name:`sky`,side:1,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new W(`#b9b8b1`)},uHorizon:{value:new W(`#e9e6dc`)},uDeep:{value:new W(`#3b3631`)},uLobe:{value:new W(`#54524d`)},uLobeDir:{value:new H(Math.sin(.35),-Math.cos(.35))},uLift:{value:1},uDust:{value:new W().setRGB(.5,.36,.21)},uStorm:{value:0}},vertexShader:`
      varying vec3 vDir;
      void main() {
        // view direction from the camera, so the horizon stays level with the
        // eye even a kilometre down the shaft
        vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * p;
        gl_Position.z = gl_Position.w; // pin to the far plane
      }
    `,fragmentShader:`
      uniform vec3 uTop, uHorizon, uDeep, uLobe, uDust;
      uniform vec2 uLobeDir;
      uniform float uLift, uStorm;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 c = mix(uHorizon, uTop, pow(smoothstep(0.0, 0.65, h), 0.8));
        // dust in the air: a warm cast overhead, thickening to the horizon
        c = mix(c, uDust, uStorm * (0.45 + 0.45 * (1.0 - smoothstep(-0.02, 0.5, h))));
        // Below the horizon the void under the crust is near black, except
        // for a broad, dim glow a little east of north that fades out ~35°
        // down and ~55° round from its centre.
        vec2 d2 = normalize(vDir.xz + vec2(1e-5));
        float off = acos(clamp(dot(d2, uLobeDir), -1.0, 1.0));
        float g = 1.0 - smoothstep(0.21, 0.96, off);
        float el = asin(clamp(h, -1.0, 1.0));
        float a = smoothstep(-0.59, -0.07, el);
        float k = clamp(-cameraPosition.y / 800.0, 0.0, 1.0);
        vec3 below = uDeep + uLobe * g * a * mix(1.0, 0.6, k);
        // a crisp horizon from above ground; from far down the shaft it
        // softens and rides a little above eye level
        c = mix(c, below, smoothstep(mix(0.004, 0.06, k), mix(-0.03, -0.003, k), h));
        gl_FragColor = vec4(c * uLift, 1.0);
      }
    `}),t=new G(new Do(9e3,48,24),e);return t.name=`sky`,t.frustumCulled=!1,t.renderOrder=-10,t}var Zf=class{constructor(e,t=6){this.spots=[],this.lights=[],this.scale=1;for(let n=0;n<t;n++){let t=new Ts(16767400,0,0,2);t.name=`pool-${n}`,t.userData={want:0,spot:null},e.add(t),this.lights.push(t)}this._last=new U(1e9,0,0),this._t=0}add(e,t,n,r=16767400,i=24,a=null){this.spots.push({p:new U(e,t,n),color:new W(r),intensity:i,group:a})}update(e,t){if(this._t+=t,this._t>.25||this._last.distanceToSquared(e)>4){this._t=0,this._last.copy(e);let t=[];for(let n of this.spots){if(n.group&&!n.group.visible)continue;let r=n.p.distanceToSquared(e);r<12100&&t.push([r,n])}t.sort((e,t)=>e[0]-t[0]);let n=t.slice(0,this.lights.length).map(e=>e[1]),r=[];for(let e of this.lights){let t=n.indexOf(e.userData.spot);t>=0?n[t]=null:r.push(e)}for(let e of n){if(!e)continue;let t=r.shift();if(!t)break;t.userData.spot=e,t.position.copy(e.p),t.color.copy(e.color),t.intensity=0}for(let e of r)e.userData.spot=null}let n=Math.min(1,t*4);for(let e of this.lights){let t=e.userData.spot?e.userData.spot.intensity*this.scale:0;e.intensity+=(t-e.intensity)*n}}};function Qf({renderer:e,scene:t,camera:n,perf:r}){e.toneMapping=4,e.toneMappingExposure=1,e.outputColorSpace=Ie,e.shadowMap.enabled=r.shadows,e.shadowMap.type=1,e.shadowMap.autoUpdate=!1,t.fog=new In(Kf.fog,Kf.fogDensity);let i=new ds(Kf.hemiSky,Kf.hemiGround,Kf.hemiI);i.position.set(0,1,0),t.add(i);let a=new Os(Kf.keyColor,Kf.keyI);a.castShadow=r.shadows,a.shadow.mapSize.setScalar(r.shadowMapSize),a.shadow.camera.near=20,a.shadow.camera.far=2600,a.shadow.bias=-25e-5,a.shadow.normalBias=.035,a.shadow.radius=2,t.add(a,a.target);let o=new Os(Kf.fillColor,Kf.fillI);o.target.position.set(0,-560,0),o.position.copy(o.target.position).add(Jf),t.add(o,o.target);let s=Xf();t.add(s);let c=new Ec(e),l=new Wf;t.environment=c.fromScene(l,.04).texture,t.environmentIntensity=Kf.envI,l.dispose?.();let u=new Zf(t,6),d=e.getDrawingBufferSize(new H),f=new Rf(e,new Xt(d.x,d.y,{type:v,samples:r.msaa}));f.addPass(new zf(t,n));let p=new Vf(new H(d.x/2,d.y/2),Kf.bloom,Kf.bloomR,Kf.bloomT);p.enabled=r.bloom,f.addPass(p),f.addPass(new Uf);let m=new Ff(Yf);f.addPass(m);let h={hemi:i,key:a,fill:o,sky:s,pool:u,composer:f,bloom:p,grade:m,settings:Kf,glowScale:1,_shadowFrame:0,_lastTarget:new U(1e9,0,0),setGlow(e){h.glowScale=e,J.glow.color.setScalar(e)},resize(e,t,n){f.setPixelRatio(n),f.setSize(e,t),p.resolution.set(e*n/2,t*n/2)},update(t,n,r,i){a.target.position.copy(t),a.position.copy(t).add(qf);let o=Ot.clamp(n*1.1,24,800),s=a.shadow.camera;Math.abs(s.right-o)>o*.02&&(s.left=-o,s.right=o,s.top=o,s.bottom=-o,s.updateProjectionMatrix(),e.shadowMap.needsUpdate=!0),(h._lastTarget.distanceToSquared(t)>1e-4||i)&&(h._lastTarget.copy(t),e.shadowMap.needsUpdate=!0),++h._shadowFrame%8==0&&(e.shadowMap.needsUpdate=!0),u.update(t,r)}};return h}var $f=7.6,ep=.6,tp=144*$f,np=75.05,rp=19.2,ip=16.5,ap=1.5,op=5.9,sp=-1125,cp=-1134,lp=-1181,up=50/6,dp=12.85,Y=e=>-e*$f,fp=e=>e<=49?`top`:e<=119?`mids`:e<=144?`deep`:`below`,pp={silo:{label:`Whole silo`,position:[430,40,1320],target:[0,-560,0]},surface:{label:`Surface`,position:[-180,70,260],target:[0,6,-40]},top:{label:`Up Top`,position:[150,60,330],target:[0,-90,0]},below:{label:`Mechanical & below`,position:[150,-1024,360],target:[0,-1139.4,0]}},mp=[-300,-300],hp=[{id:`surface`,name:`The surface`,zone:`surface`,level:0,badge:`↑`,kind:`spot`,anchor:[-24,2.5,-2.5],cam:{position:[16,15,38],target:[-30,2,-12]},pick:{sphere:[-44,-5.2,-2.5],r:0},card:{level:`The surface`,title:`The surface`,sub:`Above level 1 — the view nobody inside gets first-hand`,body:`Flat, cracked ground under a colourless sky. The roof of the silo lies just beneath the dust; only a squat concrete hood and its steel door show where the ramp comes up. A worn path runs from the hood to a low hill with a single dead tree, and far off, the stumps of a city stand in the haze.`,facts:[`The hood is the only structure above ground — everything else is buried.`,`Two low mounds sit on the hill beside the bare tree.`,`Forty-nine more hoods dot the plain, each marking another silo.`,`Dust drifts across the rim of the shallow crater in slow sheets.`,`The skyline stands nearly five kilometres away, softened by fog.`],foot:`Shown on the wallscreens of levels 1, 75 and 144`}},{id:`cafeteria`,name:`Cafeteria · wallscreen`,zone:`top`,level:1,side:`east`,span:60,kind:`room`,anchor:[47,-3.75,0],cam:{position:[37,-2.7,35.2],target:[49,-5,-13]},card:{title:`Cafeteria & wallscreen`,sub:`Level 1 — the front room, and the only window`,body:`A broad hall of tables under a ring of frosted ceiling panels. The far wall is a single letterbox screen fed by the camera on the surface: the hill, the tree, the grey. Everyone eats facing it. At the east end a serving counter and a small galley sit beneath hanging lamps.`,facts:[`The wallscreen is 22 m wide and 4.4 m tall.`,`Sixty-five tables, each with its own set of chairs.`,`Round portholes in the east wall look into the galley.`,`Floor lamps stand in pairs along the screen wall.`,`Above the ceiling there is nothing but the roof slab and the dust.`],foot:`Props: tables · chairs · counter · pendant lamps · wallscreen`}},{id:`sheriff`,name:`Sheriff · Holding 3`,zone:`top`,level:1,side:`west`,span:45,kind:`room`,anchor:[-47,-3.75,0],cam:{position:[-37,-2.7,31.9],target:[-49,-5,-13]},card:{title:`Sheriff's office & Holding 3`,sub:`Level 1 — the law at the top of the stairs`,body:`Desks with green-screen terminals, filing cabinets, a whiteboard and a star on the wall. Past the office a small holding room sits hard against the airlock, the last room anyone passes before the ramp.`,facts:[`Six desks, each with its own terminal.`,`The holding room shares a wall with the airlock’s inner door.`,`A bank of lockers lines the corridor.`,`The roof slab is the ceiling here — the surface is directly above.`],foot:`Next door: the airlock · across the stairwell: the cafeteria`}},{id:`airlock`,name:`Airlock · the ramp`,zone:`top`,level:1,kind:`spot`,anchor:[-44,-5.2,-2.5],cam:{position:[-30,-.6,26],target:[-40,-4.6,-2.5]},pick:{sphere:[-44,-5.2,-2.5],r:14},card:{title:`The airlock & the ramp`,sub:`Level 1 — two round doors and a slope to the outside`,body:`A short chamber between two round pressure doors, its walls lined with spray nozzles. A figure in a white suit stands inside. Past the outer door a concrete ramp climbs twenty metres to the hood on the surface, lit by a row of wall lamps.`,facts:[`The ramp rises 7.6 m over 20 m — roughly twenty degrees.`,`It is 3.5 m wide with 3.4 m of headroom.`,`Spray nozzles line both walls of the chamber.`,`Keypads flank the outer door.`],foot:`Connects level 1 to the surface hood`}},{id:`judicial`,name:`Judicial`,zone:`top`,level:14,side:`west`,span:40,kind:`room`,anchor:[-47,-102.55,0],cam:{position:[-36,-102.2,20],target:[-42,-104,-10]},card:{title:`Judicial`,sub:`Level 14 — panelled wood, a red carpet, a room of records`,body:`The most formal room in the silo: dark wood panelling, brass sconces and a broad desk on a red carpet beneath a round emblem. Behind a heavy vault door on the west side, shelves of boxed and bagged relics wait in storage.`,facts:[`A red pipe runs along the slab edge beneath this level.`,`The relic store holds scores of labelled boxes and cloth bags.`,`Glass-fronted cabinets stand at both ends of the chamber.`,`Two clerks’ desks with terminals sit by the entrance.`],foot:`Props: desk · carpet · emblem · vault door · relic shelves`}},{id:`it`,name:`IT · the Vault`,zone:`top`,level:19,side:`east`,span:60,kind:`room`,anchor:[47,-140.55,0],cam:{position:[37,-139.5,35.2],target:[49,-141.8,-13]},card:{title:`IT & the Vault`,sub:`Level 19 — rows of terminals and a glass office`,body:`A long bullpen of desks, each with a humming terminal, under tall lamps. A glass-walled office looks out over the floor from the east. At the back, through a narrow doorway, server racks blink in the dark — the part of the level most people never see.`,facts:[`Thirty-nine desks, all facing the same way.`,`Twelve server racks studded with status lights.`,`The glass office has a clear view of every desk.`,`A cyan strip marks this level’s slab edge.`],foot:`Props: desks · terminals · server racks · glass office`}},{id:`watcher`,name:`Watcher Room`,zone:`top`,level:20,side:`west`,span:30,kind:`room`,anchor:[-47,-148.15,0],cam:{position:[-37,-147.1,28.6],target:[-49,-149.4,-13]},card:{title:`Watcher room & Recycling 20`,sub:`Level 20 — a dark room of screens beside the bins`,body:`A windowless room lit only by a bank of monitors, each carrying a grainy feed from outside. Next door, Recycling 20 sorts what the silo throws away: a chute from above, sorting bins, shelves of salvaged parts and a chalkboard of tallies.`,facts:[`Twelve monitors in a single bank.`,`The chute drops into a funnel above the sorting floor.`,`Seventeen bins line the recycling floor.`,`Parts shelves hold pipe fittings and boxed spares.`],foot:`Props: monitor bank · chute · bins · parts shelves`}},{id:`filtration`,name:`Water Filtration`,zone:`mids`,level:55,side:`west`,span:40,kind:`room`,anchor:[-47,-414.15,0],cam:{position:[-37,-413.1,30.8],target:[-49,-415.4,-13]},card:{title:`Water filtration`,sub:`Level 55 — tanks, gauges and a curved catwalk`,body:`Two banks of tall steel tanks stand on a wet floor, each with a gauge and a valve wheel. A curved, railed catwalk sweeps between them over glowing channels of treated water. Steam curls up from the drains near the entrance.`,facts:[`Seventeen tanks in two banks.`,`The water channels are lit from beneath.`,`Every tank carries its own pressure gauge and valve.`,`Drums of treatment chemicals stand by the door.`],foot:`Props: tanks · gauges · valves · catwalk · drums`}},{id:`medical`,name:`Medical`,zone:`mids`,level:62,side:`east`,span:40,kind:`room`,anchor:[47,-467.35,0],cam:{position:[37,-466.3,30.8],target:[49,-468.6,-13]},card:{title:`Medical`,sub:`Level 62 — beds, arches and oxygen`,body:`Pale mint walls, rows of iron beds, arched doorways between the wards and caged bulbs overhead. Oxygen cylinders and drip stands wait between the beds; a few armchairs sit near the entrance for visitors.`,facts:[`Twenty-nine beds and eight cots.`,`Seven oxygen cylinders and five drip stands.`,`Each bay has its own caged ceiling bulb.`,`Cabinets line the back wall of every ward.`],foot:`Props: beds · cots · O₂ cylinders · drip stands · cabinets`}},{id:`gardens`,name:`Gardens`,zone:`mids`,level:66,side:`west`,span:45,kind:`room`,anchor:[-47,-497.75,0],cam:{position:[-37,-496.7,31.9],target:[-49,-499,-13]},card:{title:`Gardens`,sub:`Level 66 — the silo’s park`,body:`Lawns, clipped hedges and round trees under strings of warm bulbs. A reflection pond with lily pads and a small fountain sits in the middle; at the west end a glasshouse is packed with potted seedlings.`,facts:[`Nearly a hundred string-light bulbs hang between the lamp posts.`,`The pond holds two dozen lily pads.`,`The glasshouse is crowded with ninety-odd pots.`,`Benches face the pond from every side.`],foot:`Props: trees · hedges · pond · fountain · glasshouse`}},{id:`market`,name:`Marketplace`,zone:`mids`,level:68,side:`east`,span:60,kind:`room`,anchor:[47,-512.95,0],cam:{position:[37,-511.9,35.2],target:[49,-514.2,-13]},card:{title:`Marketplace`,sub:`Level 68 — two storeys of stalls`,body:`Shopfronts stacked two high, their shelves crowded with coloured tins, sacks and jars. Awnings, lanterns and hand-painted signs mark the grocer, the baker and the stalls beyond. Steam drifts from the food counters.`,facts:[`Dozens of doorways across two storeys.`,`Sixty lanterns hang along the upper walkway.`,`Crates and sacks spill out onto the floor.`,`A painted arrow points the way to the bazaar.`],foot:`Props: shelving · awnings · lanterns · crates · signs`}},{id:`mines`,name:`Mines`,zone:`mids`,level:70,side:`west`,span:40,kind:`room`,anchor:[-47,-528.15,0],cam:{position:[-58,-526,30],target:[-63,-529.8,-10]},card:{title:`The mines`,sub:`Level 70 — the only room that leaves the silo`,body:`A timber-braced tunnel runs straight out through the silo wall into the earth. Rails and sleepers carry ore carts past heaps of spoil; an A-frame headframe with a pulley stands over the workings. Lamps hang from the props.`,facts:[`The tunnel pushes twenty metres beyond the outer wall.`,`Five ore carts sit on the rails.`,`Sixty-one sleepers under the track.`,`Miners eat at small round tables near the entrance.`],foot:`Props: carts · rails · headframe · timber props · spoil heaps`}},{id:`farms`,name:`Farms`,zone:`mids`,level:73,side:`east`,span:70,kind:`room`,anchor:[47,-550.95,0],cam:{position:[37,-549.9,37.4],target:[49,-552.2,-13]},card:{title:`Farms`,sub:`Level 73 — an orchard under pink light`,body:`Fruit trees in neat rows beneath bars of magenta grow-light, with crop beds between the columns. A curved seating area by the entrance serves as the break room. The levels above and below are given over entirely to crops.`,facts:[`Twenty-two fruit trees, most of them heavy with apples.`,`Ninety-odd grow-light bars cover the ceiling.`,`Eighteen concrete columns carry the slab above.`,`Surrounding levels hold row upon row of low crops.`],foot:`Props: fruit trees · grow-lights · beds · columns · tables`}},{id:`midscafe`,name:`Mids cafeteria`,zone:`mids`,level:75,side:`west`,span:45,kind:`room`,anchor:[-47,-566.15,0],cam:{position:[-38,-567.4,24],target:[-51,-564.6,-9]},card:{title:`Mids cafeteria`,sub:`Level 75 — the middle of the silo sits down to eat`,body:`A rounded hall with a spoked ring of light in the ceiling and its own wallscreen showing the same hill as level 1. Tables fill the floor; a barred alcove by the door and a serving counter along the west wall complete it.`,facts:[`Its wallscreen is smaller than the one Up Top.`,`Thirty-five tables and well over a hundred chairs.`,`The ceiling ring is split into radial panels.`,`A teal wainscot runs around the curved walls.`],foot:`Props: tables · chairs · wallscreen · ceiling ring`}},{id:`gap`,name:`The Gap`,zone:`mids`,level:91,kind:`spot`,anchor:[0,-685.6,0],cam:{position:[38,-670,52],target:[0,-687.6,0]},pick:{sphere:[0,-685.6,0],r:14},card:{title:`The Gap`,sub:`Level 91 — where the stair gives out`,body:`Around level 91 the Great Stair simply stops: a length of the helix is missing, its broken ends hanging over the drop. A scaffold tower climbs beside the central column, and a rope-and-pulley chair is the only way across.`,facts:[`About a level and a half of stair is gone.`,`Rubble from the collapse lies on the landing below.`,`The pulley chair rises and falls on a single rope.`,`The landing rings above and below are intact.`],foot:`Props: scaffold · pulley chair · rubble`}},{id:`supply`,name:`Supply`,zone:`mids`,level:110,side:`west`,span:40,kind:`room`,anchor:[-47,-832.15,0],cam:{position:[-37,-831.1,30.8],target:[-49,-833.4,-13]},card:{title:`Supply`,sub:`Level 110 — every spare part in the silo`,body:`Tall steel racks crammed with crates, cable spools and boxed stock stretch back into the dark. In the corner, a chain-link cage keeps the valuable parts — bolts, fittings, sealed cartons — under lock.`,facts:[`Over fifty racks on the main floor.`,`Eighty-odd cable spools.`,`The cage is chain-link on steel posts.`,`Levels 106–119 around it are storage too.`],foot:`Props: racks · spools · crates · cage`}},{id:`barricade`,name:`Barricade 130`,zone:`deep`,level:130,side:`east`,span:25,kind:`room`,anchor:[47,-984.15,0],cam:{position:[37,-983.1,27.5],target:[49,-985.4,-13]},card:{title:`Barricade 130`,sub:`Level 130 — welded shut`,body:`A wall of steel plates welded edge to edge seals off the corridor, banked with sandbags. One low door with a painted number is the only way through; a red lamp and a warning sign hang beside it. Tools and lengths of pipe lean where they were dropped.`,facts:[`More than a hundred plates make up the barricade.`,`Scores of sandbags are stacked along its base.`,`The corridor beyond has a teal wainscot and round wall fans.`,`Down Deep levels run hot with pipes and machinery.`],foot:`Props: plates · sandbags · warning lamp · tools`}},{id:`juliette`,name:`Juliette’s apartment`,zone:`deep`,level:140,side:`west`,span:25,kind:`room`,anchor:[-47,-1060.15,0],cam:{position:[-37,-1059.1,27.5],target:[-49,-1061.4,-13]},card:{title:`Juliette’s apartment`,sub:`Level 140 — a small home off a long corridor`,body:`A single room off a corridor of numbered doors: a bed, a table with two chairs, a desk lamp and a round mirror. A mezzanine shelf holds boxes and tools — the home of someone who fixes things.`,facts:[`The corridor has a teal wainscot and a string of bare bulbs.`,`Every door carries a small name plate.`,`Tools hang above the desk.`,`Pipes and catwalks crowd the levels above.`],foot:`Props: bed · table · lamp · shelf · tools`}},{id:`walker`,name:`Walker’s workshop`,zone:`deep`,level:144,side:`east`,span:45,kind:`room`,anchor:[47,-1090.55,0],cam:{position:[37,-1089.5,31.9],target:[49,-1091.8,-13]},card:{title:`Walker’s workshop`,sub:`Level 144 — radios, coils and spare parts`,body:`A workbench under a web of wires, walls of salvaged radios and coiled cable, bins of parts and hooks full of tools. It sits beside the mechanical cafeteria at the very bottom of the stair.`,facts:[`Forty-four radios on the shelves.`,`Fourteen coils of wire hang from hooks.`,`Over a hundred hooks line the back wall.`,`The foot of the Great Stair is painted with a big 144.`],foot:`Props: radios · coils · hooks · bins · workbench`}},{id:`mechcafe`,name:`Mechanical cafeteria`,zone:`deep`,level:144,kind:`spot`,anchor:[52,-1091.4,-6],cam:{position:[44,-1089,9],target:[56,-1091.8,-14]},pick:{sphere:[52,-1091.4,-6],r:14},card:{title:`Mechanical cafeteria`,sub:`Level 144 — the third wallscreen`,body:`Plain metal tables and chairs under strip lights, facing a letterbox screen that shows the same grey hill as the two above it. A heavy door at the back leads towards the machinery below.`,facts:[`Nine tables and thirty-six chairs.`,`Its screen is the smallest of the three.`,`It shares level 144 with the workshop.`,`The floor underneath is the roof of the generator hall.`],foot:`Props: tables · chairs · wallscreen · strip lights`}},{id:`generator`,name:`Generator`,zone:`below`,level:145,side:`west`,span:70,kind:`room`,anchor:[-47,-1121,0],cam:{position:[-40,-1103,78],target:[-45,-1113,-16]},pickBox:{center:[-47,-1110,-17.6],size:[56,30,35.24]},card:{title:`Generator`,sub:`Below 144 — the heart of the silo`,body:`A tall hall under the bottom slab. The generator stands in the middle of it: a dark steel drum with a glowing core, ringed by gantries, stairs and a control panel with a big dial. Pipes run in from the east, where the pump room keeps the floor wet.`,facts:[`The hall is thirty metres tall.`,`Steel stairs climb the west wall in switchbacks.`,`A flywheel turns at the generator’s side.`,`Steam vents from the pipework by the control panel.`],foot:`Props: generator · gantries · stairs · pumps · control panel`}},{id:`digger`,name:`The Digger`,zone:`below`,level:147,kind:`spot`,anchor:[0,-1161,0],cam:{position:[60,-1139,150],target:[0,-1163,-10]},pick:{sphere:[0,-1161,0],r:40},card:{title:`The Digger`,sub:`Deeper still — a machine in a flooded cave`,body:`Beneath the foundation cap a rough cavern opens in the rock. In a pool of dark water stands a boring machine: a studded dome on a steel tower, ringed by cutter arms. A bolted tunnel mouth in the west wall leads away into the dark.`,facts:[`The cavern floor lies nearly ninety metres below level 144.`,`Eight cutter arms carry forty-eight cutting heads.`,`The foundation cap is nine metres of solid concrete.`,`The pool reaches almost wall to wall.`],foot:`Props: boring machine · cutter arms · pool · tunnel mouth`}}],gp={surface:`The surface`,top:`Up Top`,mids:`The Mids`,deep:`Down Deep`,below:`Below`},_p=(()=>{let e=new Map;for(let t of hp){if(t.kind!==`room`||!t.side||t.level>144)continue;let n=e.get(t.level)||{};n[t.side]=t.id,e.set(t.level,n)}return e})(),vp=[`Every level is 7.6 m floor to floor — 144 of them add up to 1,094 m of concrete.`,`The Great Stair turns twice per level: 288 full turns from the top landing to the bottom.`,`Three bridges per level tie the stair to its landing ring — 432 in all.`,`The shell is 3 m thick and 156 m across; its cut face carries every level number.`,`Up Top is levels 1–49, the Mids 50–119, Down Deep 120–144.`,`Three wallscreens show the outside: on levels 1, 75 and 144.`,`The mines tunnel is the only room that goes through the outer wall.`,`Whole levels of the Mids and Down Deep are given over to crops under grow-lights.`,`The generator hall below level 144 is four levels tall.`,`Silo 17 lies about 420 m to the north-west — dark, and half-drowned.`,`Fifty hoods break the plain; from here, only a handful show through the haze.`,`The light strip on each slab edge takes its colour from what that level does.`,`Around level 91, about a level and a half of the stair is simply gone.`,`Every landing has a bench, a noticeboard and a stair up to the upper walkway.`];function yp(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ir,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=bp(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=bp(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function bp(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new xr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var xp=new U,Sp=new U,Cp=new U,wp=new U,Tp=new kt,Ep=new un,Dp=new $t,Op=new Mt,kp=new W,Ap=new U(0,1,0);function X(e,t=1){return e&&e.isColor?kp.copy(e):kp.set(e??16777215),t!==1&&kp.multiplyScalar(t),kp}var jp=new Map,Mp=(e,t)=>{let n=jp.get(e);return n||jp.set(e,n=Np(t())),n};function Np(e){if(!e.attributes.color){let t=e.attributes.position.count;e.setAttribute(`color`,new wr(new Float32Array(t*3).fill(1),3))}return e}var Z={box:()=>Mp(`box`,()=>new $i(1,1,1)),cyl:(e=12,t=1,n=!1)=>Mp(`cyl${e}:${t}:${n}`,()=>new ta(t,1,1,e,1,n)),sphere:(e=12,t=8)=>Mp(`sph${e}:${t}`,()=>new Do(1,e,t)),hemi:(e=16,t=6)=>Mp(`hemi${e}:${t}`,()=>new Do(1,e,t,0,Math.PI*2,0,Math.PI/2)),ico:(e=0)=>Mp(`ico${e}`,()=>new So(1,e)),torus:(e=.1,t=8,n=16,r=Math.PI*2)=>Mp(`tor${e}:${t}:${n}:${r}`,()=>new Oo(1,e,t,n,r)),plane:()=>Mp(`plane`,()=>new Co(1,1)),circle:(e=16)=>Mp(`circ${e}`,()=>new ea(1,e)),cone:(e=8)=>Mp(`cone${e}`,()=>new na(1,1,e))},Pp=class{constructor(){this.P=[],this.N=[],this.U=[],this.C=[],this.I=[],this.n=0}get empty(){return this.n===0}add(e,t,n){let r=e.attributes.position,i=e.attributes.normal,a=e.attributes.uv,o=e.attributes.color;Op.getNormalMatrix(t);let s=t.determinant()<0,c=this.n,l=n.r,u=n.g,d=n.b;for(let e=0;e<r.count;e++)xp.fromBufferAttribute(r,e).applyMatrix4(t),this.P.push(xp.x,xp.y,xp.z),i?(Sp.fromBufferAttribute(i,e).applyMatrix3(Op).normalize(),this.N.push(Sp.x,Sp.y,Sp.z)):this.N.push(0,1,0),a?this.U.push(a.getX(e),a.getY(e)):this.U.push(0,0),o?this.C.push(l*o.getX(e),u*o.getY(e),d*o.getZ(e)):this.C.push(l,u,d);let f=e.index,p=f?f.count:r.count;for(let e=0;e<p;e+=3){let t=f?f.getX(e):e,n=f?f.getX(e+1):e+1,r=f?f.getX(e+2):e+2;s?this.I.push(c+t,c+r,c+n):this.I.push(c+t,c+n,c+r)}this.n+=r.count}vert(e,t,n,r,i,a,o,s,c){return this.P.push(e,t,n),this.N.push(r,i,a),this.U.push(o,s),this.C.push(c.r,c.g,c.b),this.n++}tri(e,t,n){this.I.push(e,t,n)}build(){let e=new Ir;return e.setAttribute(`position`,new wr(this.P,3)),e.setAttribute(`normal`,new wr(this.N,3)),e.setAttribute(`uv`,new wr(this.U,2)),e.setAttribute(`color`,new wr(this.C,3)),e.setIndex(this.n>65535?new Cr(this.I,1):new Sr(this.I,1)),e.computeBoundingBox(),e.computeBoundingSphere(),e}},Fp=class{constructor(e=``){this.name=e,this.batches={},this.stack=[new $t],this.meshes=[]}get frame(){return this.stack[this.stack.length-1]}push(e=0,t=0,n=0,r=0,i=1){let a=new $t().compose(Cp.set(e,t,n),Tp.setFromEuler(Ep.set(0,r,0)),wp.setScalar(i));return this.stack.push(this.frame.clone().multiply(a)),this}pop(){return this.stack.length>1&&this.stack.pop(),this}at(e,t,n,r,i){return this.push(e,t,n,r),i(this),this.pop(),this}batch(e){return this.batches[e]||=new Pp}matrix(e,t,n,r,i,a,o=0,s=0,c=0){return Dp.compose(Cp.set(e,t,n),Tp.setFromEuler(Ep.set(o,s,c)),wp.set(r,i,a)),Dp.premultiply(this.frame)}geo(e,t,n,r,i,a,o=1,s=1,c=1,l=0,u=0,d=0){return this.batch(e).add(t,this.matrix(n,r,i,o,s,c,l,u,d),X(a)),this}geoMatrix(e,t,n,r){return Dp.copy(n).premultiply(this.frame),this.batch(e).add(t,Dp,X(r)),this}box(e,t,n,r,i,a,o,s,c=0,l=0,u=0){return this.geo(e,Z.box(),t,n,r,s,i,a,o,l,c,u)}bb(e,t,n,r,i,a,o,s){return this.box(e,(t+i)/2,(n+a)/2,(r+o)/2,Math.abs(i-t),Math.abs(a-n),Math.abs(o-r),s)}cyl(e,t,n,r,i,a,o,s=12,c=1){return this.geo(e,Z.cyl(s,c),t,n+a/2,r,o,i,a,i)}cylR(e,t,n,r,i,a,o,s=0,c=0,l=0,u=12){return this.geo(e,Z.cyl(u),t,n,r,o,i,a,i,s,c,l)}rod(e,t,n,r,i,a=8){let o=Sp.set(n[0]-t[0],n[1]-t[1],n[2]-t[2]),s=o.length();return s<1e-5?this:(o.divideScalar(s),Tp.setFromUnitVectors(Ap,o),Dp.compose(Cp.set((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),Tp,wp.set(r,s,r)),Dp.premultiply(this.frame),this.batch(e).add(Z.cyl(a),Dp,X(i)),this)}beam(e,t,n,r,i,a){let o=n[0]-t[0],s=n[1]-t[1],c=n[2]-t[2],l=Math.hypot(o,s,c);return l<1e-5?this:(Sp.set(o,s,c).divideScalar(l),Tp.setFromUnitVectors(Ap,Sp),Dp.compose(Cp.set((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),Tp,wp.set(r,l,i)),Dp.premultiply(this.frame),this.batch(e).add(Z.box(),Dp,X(a)),this)}sphere(e,t,n,r,i,a,o=12,s=8,c=1){return this.geo(e,Z.sphere(o,s),t,n,r,a,i,i*c,i)}ico(e,t,n,r,i,a,o=0,s=1,c=0){return this.geo(e,Z.ico(o),t,n,r,a,i,i*s,i,0,c,0)}quad(e,t,n,r,i,a,o,s=0,c=0){return this.geo(e,Z.plane(),t,n,r,o,i,a,1,c,s,0)}floorQuad(e,t,n,r,i,a,o,s=0){return this.geo(e,Z.plane(),t,n,r,o,i,a,1,-Math.PI/2,s,0)}mesh(e){return e.applyMatrix4(this.frame),this.meshes.push(e),e}finish(e,{shadows:t=!0}={}){let n=new On;n.name=this.name;for(let[r,i]of Object.entries(this.batches)){if(i.empty)continue;let a=e[r];if(!a){console.warn(`Kit: missing material`,r);continue}let o=new G(i.build(),a);o.name=`${this.name}/${r}`;let s=!(a.isMeshBasicMaterial||a.transparent);o.castShadow=t&&s,o.receiveShadow=s,o.matrixAutoUpdate=!1,n.add(o)}for(let e of this.meshes)n.add(e);return n}},Ip=class{constructor(e,t,n,{castShadow:r=!0,receiveShadow:i=!0}={}){this.name=e,this.geometry=t,this.material=n,this.mats=[],this.cols=[],this.ys=[],this.castShadow=r,this.receiveShadow=i}get count(){return this.ys.length}add(e,t,n,r,i,a,o,s=0,c=0,l=0){Dp.compose(Cp.set(e,t,n),Tp.setFromEuler(Ep.set(s,c,l)),wp.set(r,i,a)),this.mats.push(...Dp.elements);let u=X(o);return this.cols.push(u.r,u.g,u.b),this.ys.push(t),this}addMatrix(e,t){this.mats.push(...e.elements);let n=X(t);return this.cols.push(n.r,n.g,n.b),this.ys.push(e.elements[13]),this}build(e=12,t=0,n=-1130){let r=new On;if(r.name=this.name,!this.count)return r;let i=(t-n)/e,a=Array.from({length:e},()=>[]);for(let n=0;n<this.count;n++)a[Math.max(0,Math.min(e-1,Math.floor((t-this.ys[n])/i)))].push(n);return a.forEach((e,t)=>{if(!e.length)return;let n=new Ii(this.geometry,this.material,e.length);n.name=`${this.name}#${t}`;let i=new Float32Array(e.length*3);e.forEach((e,t)=>{n.instanceMatrix.array.set(this.mats.slice(e*16,e*16+16),t*16),i[t*3]=this.cols[e*3],i[t*3+1]=this.cols[e*3+1],i[t*3+2]=this.cols[e*3+2]}),n.instanceColor=new Oi(i,3),n.instanceMatrix.needsUpdate=!0,n.computeBoundingBox(),n.computeBoundingSphere(),n.castShadow=this.castShadow,n.receiveShadow=this.receiveShadow,n.matrixAutoUpdate=!1,r.add(n)}),r}};function Lp(e,t,n=!1,r=10){return new yo(e,{depth:t,bevelEnabled:n,bevelThickness:.02,bevelSize:.02,bevelSegments:1,curveSegments:r})}function Rp(e,t,n=0,r=0){let i=e/2,a=new Pa;return a.moveTo(n-i,r),a.lineTo(n+i,r),a.lineTo(n+i,r+t-i),a.absarc(n,r+t-i,i,0,Math.PI,!1),a.lineTo(n-i,r),a}function zp(e,t,n,r=0,i=0){let a=new Pa,o=r-e/2,s=i-t/2;return n=Math.min(n,e/2,t/2),a.moveTo(o+n,s),a.lineTo(o+e-n,s),a.quadraticCurveTo(o+e,s,o+e,s+n),a.lineTo(o+e,s+t-n),a.quadraticCurveTo(o+e,s+t,o+e-n,s+t),a.lineTo(o+n,s+t),a.quadraticCurveTo(o,s+t,o,s+t-n),a.lineTo(o,s+n),a.quadraticCurveTo(o,s,o+n,s),a}var Bp={teal:[`#437f77`,`#4b8983`,`#3f7871`,`#498a83`,`#3d6e68`,`#2e514f`,`#365a57`,`#3f6967`],grey:[`#848073`,`#7e7a6e`,`#8b8679`,`#77746a`],green:[`#5f7f55`,`#6b8a5c`,`#56744e`,`#6d8c64`],warm:[`#8a7b62`,`#7d6f58`,`#93846a`],partition:`#888376`,cap:`#a39d91`,blanket:[`#b5372e`,`#4f6a5a`,`#556a46`,`#784035`,`#4b6a69`,`#6a5a3c`,`#8c6b3a`,`#3e5c7a`,`#9b4b2f`],wood:[`#6a4b32`,`#7b5f3f`,`#5c4330`],dark:[`#3f4342`,`#414544`,`#393e3c`],crop:[`#1f6b23`,`#2a7d2c`,`#1a5e20`,`#34883a`,`#23752a`,`#2f6f2a`,`#3f8f3c`,`#27802e`],box:[`#b08f5e`,`#737a45`,`#a8a08a`,`#7a5c3c`,`#c49a4a`,`#8f8a78`,`#9c7a52`,`#6f7a43`,`#b98a4a`]};function Vp(e){return e>=125?`deep`:e>=106&&e<=119?`storage`:e>=71&&e<=79||e>=120&&e<=124||e===66?`farm`:e>=80&&e<=89?e%2==0?`farm`:`apart`:[30,50,52,54,70,105].includes(e)||e>=56&&e<=61?`office`:`apart`}var Hp={apart:`#d6b980`,office:`#dccfa8`,farm:`#c6e6b0`,storage:`#e2e6a4`,deep:`#e9b93c`},Up={1:`#d8b77a`,14:`#d24a3c`,19:`#6fd6ea`,20:`#6fd6ea`,55:`#79e3e0`,62:`#e2f4ea`,66:`#c9efb6`,68:`#ecc664`,70:`#e8d7a6`,73:`#f0a8d0`,75:`#c9efb6`,90:`#f0b020`,91:`#f0b020`,92:`#f0b020`,110:`#dde6a4`},Wp={apart:`#eaddc8`,office:`#e2dccd`,farm:`#d4cdb8`,storage:`#d8d6c6`,deep:`#5c5c5a`};function Gp(){let e=new Pp,t=new $t,n=new Pa;n.curves=Rp(1.42,2.46).curves,n.holes.push(Rp(1.12,2.3));let r=Lp(n,.08,!1,6);e.add(r,t.makeTranslation(0,0,0),X(`#ffffff`));let i=Lp(Rp(1.12,2.3),.04,!1,6);return e.add(i,t.makeTranslation(0,0,.01),X(`#6e6c66`)),e.add(Z.box(),t.compose(new U(.4,1.1,.07),new kt,new U(.08,.2,.06)),X(`#cfc9bc`)),e.build()}function Kp(){let e=new Pp,t=new $t,n=new Pa;n.absarc(0,0,.5,0,Math.PI*2,!1);let r=new Na;r.absarc(0,0,.38,0,Math.PI*2,!0),n.holes.push(r),e.add(Lp(n,.1,!1,12),t.identity(),X(`#ffffff`));let i=new ea(.39,16);return e.add(i,t.makeTranslation(0,0,.03),X(`#2b3432`)),e.build()}function qp(){let e=new Pp,t=new $t,n=new kt;return e.add(Z.cyl(6,.7),t.compose(new U(0,.6,0),n,new U(.09,1.2,.09)),X(`#6a4a30`)),e.add(Z.ico(0),t.compose(new U(0,1.5,0),n,new U(.7,.62,.7)),X(`#ffffff`)),e.add(Z.ico(0),t.compose(new U(.28,1.25,.1),n.setFromEuler(new un(.3,.8,0)),new U(.42,.4,.42)),X(`#e8f2e0`)),e.build()}var Jp={w:1.9,h:4.1,d:.62,shelves:[.14,.92,1.7,2.48,3.26,4.04]};function Yp(){let e=new Pp,t=new $t,n=new kt,r=Jp.w,i=Jp.h,a=Jp.d;for(let o of[-r/2,r/2])for(let r of[-a/2,a/2])e.add(Z.box(),t.compose(new U(o,i/2,r),n,new U(.05,i,.05)),X(`#ffffff`));for(let i of Jp.shelves)e.add(Z.box(),t.compose(new U(0,i,0),n,new U(r,.04,a)),X(`#e6e6e0`));return e.add(Z.box(),t.compose(new U(0,i/2,-a/2),n.setFromEuler(new un(0,0,-Math.atan2(r,i))),new U(.03,Math.hypot(r,i),.03)),X(`#d8d8d0`)),e.build()}function Xp(){let e=new Pp,t=new $t,n=new kt,r=1.4;e.add(Z.box(),t.compose(new U(0,0,0),n,new U(5,.08,r)),X(`#2f302f`));for(let i of[-2.4,0,5/2-.1])e.add(Z.box(),t.compose(new U(i,.55,r/2),n,new U(.05,1.1,.05)),X(`#3a3b3a`));return e.add(Z.box(),t.compose(new U(0,1.08,r/2),n,new U(5,.06,.06)),X(`#e3b53c`)),e.add(Z.box(),t.compose(new U(0,.55,r/2),n,new U(5,.035,.035)),X(`#3a3b3a`)),e.build()}function Zp(){let e=new Pp,t=new $t,n=new kt,r=1.9;e.add(Z.box(),t.compose(new U(0,.45,0),n,new U(.45,.07,r)),X(`#ffffff`)),e.add(Z.box(),t.compose(new U(-.2,.78,0),n,new U(.06,.4,r)),X(`#f0ece4`));for(let i of[-1.9/2+.15,r/2-.15])e.add(Z.box(),t.compose(new U(0,.22,i),n,new U(.4,.44,.06)),X(`#4a4a46`));return e.build()}function Qp(e,t,n=72){let r=new Pa;r.moveTo(t,0);for(let e=1;e<=n;e++){let i=e/n*Math.PI;r.lineTo(Math.cos(i)*t,Math.sin(i)*t)}if(e>0){r.lineTo(-e,0);for(let t=n-1;t>=0;t--){let i=t/n*Math.PI;r.lineTo(Math.cos(i)*e,Math.sin(i)*e)}}return r.closePath(),r}function $p(e,t,n,r,i){for(let[a,o,s,c]of t){let t=s-a,l=c-o,u=Math.hypot(t,l),d=l/u,f=-t/u,p=u/10,m=e.vert(a,n,o,d,0,f,0,n/10,i),h=e.vert(s,n,c,d,0,f,p,n/10,i),g=e.vert(s,r,c,d,0,f,p,r/10,i),_=e.vert(a,r,o,d,0,f,0,r/10,i);e.tri(m,g,h),e.tri(m,_,g)}}function em({rIn:e=rp,rOut:t=np,holes:n=[],seg:r=72}={}){let i=Qp(e,t,r);for(let e of n){let t=new Na;t.moveTo(e[0],-e[1]),t.lineTo(e[0],-e[3]),t.lineTo(e[2],-e[3]),t.lineTo(e[2],-e[1]),t.closePath(),i.holes.push(t)}let a=new To(i,1);a.rotateX(-Math.PI/2);let o=a.attributes.uv,s=a.attributes.position;for(let e=0;e<o.count;e++)o.setXY(e,s.getX(e)/10,s.getZ(e)/10);Np(a);let c=a.clone();c.translate(0,-ep,0);let l=c.attributes.normal;for(let e=0;e<l.count;e++)l.setXYZ(e,0,-1,0);let u=c.index.array;for(let e=0;e<u.length;e+=3){let t=u[e+1];u[e+1]=u[e+2],u[e+2]=t}let d=new Pp,f=new W(1,1,1),p=-ep,m=[];if(e>0?m.push([e,0,t,0],[-t,0,-e,0]):m.push([-t,0,t,0]),e>0)for(let t=0;t<r;t++){let n=Math.PI+t/r*Math.PI,i=Math.PI+(t+1)/r*Math.PI;m.push([Math.cos(n)*e,Math.sin(n)*e,Math.cos(i)*e,Math.sin(i)*e])}for(let e=0;e<r;e++){let n=Math.PI+e/r*Math.PI,i=Math.PI+(e+1)/r*Math.PI;m.push([Math.cos(i)*t,Math.sin(i)*t,Math.cos(n)*t,Math.sin(n)*t])}for(let e of n){let[t,n,r,i]=e;m.push([t,i,t,n],[t,n,r,n],[r,n,r,i],[r,i,t,i])}$p(d,m.map(([r,i,a,o])=>{let s=(r+a)/2,c=(i+o)/2,l=a-r,u=o-i,d=Math.hypot(l,u)||1,f=u/d,p=-l/d,m=s+f*.05,h=c+p*.05,g=Math.hypot(m,h),_=h<=0&&g>=e&&g<=t;for(let e of n)m>e[0]&&m<e[2]&&h>e[3]&&h<e[1]&&(_=!1);return _?[a,o,r,i]:[r,i,a,o]}),p,0,f);let h=yp([a,c,d.build()],!0);return h.computeBoundingSphere(),h}function tm(e){let t=new Pp,n=new Set([0,Y(144),sp]);for(let t of e)n.add(t.y0),n.add(t.y1);let r=[...n].sort((e,t)=>t-e),i=new W(1,1,1);for(let n=0;n<96;n++){let a=Math.PI+n/96*Math.PI,o=Math.PI+(n+1)/96*Math.PI;for(let n=0;n<r.length-1;n++){let s=r[n],c=r[n+1],l=(a+o)/2,u=(s+c)/2;if(e.some(e=>l>=e.a0&&l<=e.a1&&u<=e.y1&&u>=e.y0))continue;let d=[[a,c],[o,c],[o,s],[a,s]].map(([e,n])=>t.vert(Math.cos(e)*75,n,Math.sin(e)*75,-Math.cos(e),0,-Math.sin(e),e*75/24,n/24,i));t.tri(d[0],d[1],d[2]),t.tri(d[0],d[2],d[3])}}return t.build()}function nm(e){let t=new Pp,n=new W(1,1,1),r=(e,r,i,a)=>{let o=t.vert(e,i,0,0,0,1,e/12,i/12,n),s=t.vert(r,i,0,0,0,1,r/12,i/12,n),c=t.vert(r,a,0,0,0,1,r/12,a/12,n),l=t.vert(e,a,0,0,0,1,e/12,a/12,n);t.tri(o,s,c),t.tri(o,c,l)};for(let t of[1,-1]){let n=t>0?75:-78,i=t>0?78:-75,a=e.filter(e=>e.side===t).sort((e,t)=>t.y1-e.y1),o=0;for(let e of a)r(n,i,e.y1,o),o=e.y0;r(n,i,sp,o)}let i=new wo(75,78,64,1,0,Math.PI);return i.rotateX(-Math.PI/2),t.add(i,new $t().makeTranslation(0,-.02,0),n),t.build()}function rm(){let e=vf(147,16,128),{cols:t,rows:n}=e.userData,r=new Pp,i=new W(1,1,1),a=(e,a,o,s)=>{let c=e-1,l=c%t,u=Math.floor(c/t),d=l/t,f=(l+1)/t,p=1-u/n,m=1-(u+1)/n,h=s/2,g=r.vert(a-h,o-h,.03,0,0,1,d,m,i),_=r.vert(a+h,o-h,.03,0,0,1,f,m,i),v=r.vert(a+h,o+h,.03,0,0,1,f,p,i),y=r.vert(a-h,o+h,.03,0,0,1,d,p,i);r.tri(g,_,v),r.tri(g,v,y)};for(let e=1;e<=144;e++){let t=Y(e)+3.7,n=e%10==0?3:2.4;a(e,76.5,t,n),a(e,-76.5,t,n)}let o=new pi({map:e,transparent:!0,depthWrite:!1,color:new W(1.55,1.52,1.44),polygonOffset:!0,polygonOffsetFactor:-2}),s=new G(r.build(),o);return s.name=`shell-numerals`,s.renderOrder=2,s}function im({pool:e}){let t=new On;t.name=`shell`;let n=new Bo({name:`shell-wall`,map:Ef.wall,color:`#b4ae9f`,roughness:.9}),r=new Bo({name:`shell-section`,map:Ef.section,color:`#a8a19a`,roughness:.85}),i=new Bo({name:`slab-floor`,map:Ef.floor,color:`#d9dbdc`,normalMap:Ef.floorN,normalScale:new H(.5,.5),roughness:.82}),a=new Bo({name:`slab-ceiling`,map:Ef.section,color:`#c9c3b6`,roughness:.9}),o=new Bo({name:`slab-section`,map:Ef.section,color:`#ddd7c9`,roughness:.85}),s={side:-1,y0:Y(70)-.05,y1:Y(70)+7+.05,a0:Math.PI-.01,a1:Math.PI+Math.asin(9/75)},c=new G(tm([s]),n);c.name=`shell-wall`,c.receiveShadow=!0,c.castShadow=!0;let l=new G(nm([s]),r);l.name=`shell-wall-section`,l.receiveShadow=!0,t.add(c,l);let u=new Ii(em(),[i,a,o],144);u.name=`shell-slabs`;let d=new $t,f=new W;for(let e=1;e<=144;e++)d.makeTranslation(0,Y(e),0),u.setMatrixAt(e-1,d),f.set(Wp[Vp(e)]),u.setColorAt(e-1,f);u.castShadow=u.receiveShadow=!0,u.computeBoundingSphere(),t.add(u);let p=new G(em({rIn:0,holes:[[-34.6,-.7,-23.2,-4.3]]}),[a,a,o]);p.name=`shell-roofcap`,p.castShadow=p.receiveShadow=!0,t.add(p),t.add(rm());let m=new Ip(`shell-strip`,Z.box(),J.glow,{castShadow:!1,receiveShadow:!1});for(let e=0;e<=144;e++){let t=Y(e)-ep/2,n=e===0?`#d8c49a`:Up[e]||Hp[Vp(e)],r=e>=90&&e<=92?1.9:1.7;for(let e of[1,-1])m.add(e*47.25,t,.035,55.5,.14,.06,X(n,r))}let h={box:new Ip(`shell-box`,Z.box(),J.matte),cyl:new Ip(`shell-cyl`,Z.cyl(8),J.matte),column:new Ip(`shell-column`,Z.cyl(12),J.matte),pipe:new Ip(`shell-pipe`,Z.cyl(7),J.metal),bigPipe:new Ip(`shell-bigPipe`,Z.cyl(10),J.metal),door:new Ip(`shell-door`,Gp(),J.matte),porthole:new Ip(`shell-porthole`,Kp(),J.matte),blob:new Ip(`shell-blob`,Z.ico(0),J.foliage),tree:new Ip(`shell-tree`,qp(),J.foliage),rack:new Ip(`shell-rack`,Yp(),J.matte),catwalk:new Ip(`shell-catwalk`,Xp(),J.metal),bench:new Ip(`shell-bench`,Zp(),J.wood),lampBox:new Ip(`shell-lampBox`,Z.box(),J.glow,{castShadow:!1,receiveShadow:!1}),lampCyl:new Ip(`shell-lampCyl`,Z.cyl(8),J.glow,{castShadow:!1,receiveShadow:!1})};for(let t=1;t<=144;t++){let n=_p.get(t)||{};for(let r of[`east`,`west`]){let i=r===`east`?1:-1;am(h,t,i,n[r]),!n[r]&&om(h,t,i,e)}}t.add(m.build());for(let e of Object.values(h))t.add(e.build());return t}function am(e,t,n,r){let i=Y(t),a=q(t*31+(n>0?7:3)),o=Vp(t);if(t!==1&&(e.bench.add(n*21.8,i,-3.2-a()*1.4,1,1,1,`#886946`,0,n>0?Math.PI:0,0),e.lampBox.add(n*19.66,i+3.05,-.42,.3,.5,.4,X(`#fff0d6`,7)),!r&&(e.cyl.add(n*24.2,i+.45,-1.2,.3,.9,.3,Bp.dark[2]),e.box.add(n*24.83,i+1.8,-3.9-a()*.8,.04,.9,1.3,`#cabc97`),o===`apart`||o===`office`||o===`storage`))){e.box.add(n*22.9,i+1.65,-6.6,1.3,.22,5.9,Bp.partition,.636,0,0);for(let t=0;t<9;t++){let r=(t+.5)/9;e.box.add(n*22.9,i+.2+r*3.3,-3.9-r*5.4,1.3,.06,.34,`#9a9488`)}e.box.add(n*22.25,i+2.6,-6.6,.05,.05,6.4,`#26282c`,.636,0,0),e.box.add(n*25,i+1.63,-6.53,.3,3.25,12.95,Bp.partition),e.box.add(n*25,i+1.63,-.03,.32,3.26,.05,Bp.cap),e.box.add(n*25,i+4,-6.53,.2,1,12.95,Bp.partition),e.box.add(n*25,i+4,-.03,.22,1.01,.05,Bp.cap),e.box.add(n*25,i+4.62,-6.5,.07,.07,13,`#26282c`)}}function om(e,t,n,r){let i=Vp(t),a=Y(t),o=q(t*977+(n>0?13:29)),s=e=>n*e;if(i===`apart`||i===`office`?sm(e,t,n,i,o,r):i===`farm`?um(e,t,n,o,r):i===`storage`?dm(e,t,n,o,r):i===`deep`&&fm(e,t,n,o,r),i!==`deep`){let t=o()<.35;e.pipe.add(s(50),a+6.54,-.55,.14,50,.14,`#696965`,0,0,Math.PI/2),e.pipe.add(s(50),a+6.05,-1.15,.2,50,.2,t?`#7a4a2c`:`#696965`,0,0,Math.PI/2),e.pipe.add(s(50),a+6.51,-1.9,.11,50,.11,`#696965`,0,0,Math.PI/2),(i===`apart`||i===`office`||i===`storage`)&&e.pipe.add(s(50),a+3.05,-.6,.09,50,.09,`#696965`,0,0,Math.PI/2)}}function sm(e,t,n,r,i,a){let o=Y(t),s=e=>n*e,c=fp(t),l=c===`top`?[...Bp.teal,...Bp.teal,...Bp.grey]:c===`mids`?[...Bp.teal,...Bp.green,...Bp.grey]:[...Bp.grey,...Bp.warm,...Bp.teal];e.box.add(s(50),o+3.38,-6.53,50,.25,12.95,Bp.partition),e.box.add(s(50),o+3.38,-.03,50,.26,.05,Bp.cap);for(let t=1;t<6;t++){let n=25+t*up;e.box.add(s(n),o+3.5,-6.53,.3,7,12.95,Bp.partition),e.box.add(s(n),o+3.5,-.03,.32,7.01,.05,Bp.cap)}let u=[{base:0,h:3.25},{base:3.5,h:3.5}];for(let t=0;t<6;t++){let n=25+(t+.5)*up;for(let t of u){let a=o+t.base,c=i.pick(l);e.box.add(s(n),a+t.h/2,-12.85,up,t.h,.3,c);let u=i()<.5,d=n+(u?-1:1)*(1.6+i()*.9),f=n+(u?1:-1)*(1.8+i()*.7);e.door.add(s(d),a,-12.69,1,1,1,`#8b8679`),e.porthole.add(s(f),a+1.75,-12.69,1,1,1,`#8b8679`);let p=a+t.h;r===`office`?(lm(e,s,n,a,i),i()<.75&&e.lampBox.add(s(n),p-.06,-6.5,1.4,.08,.6,X(`#f4f2ea`,2.6))):(cm(e,s,n,a,i),i()<.82?e.lampCyl.add(s(n),p-.55,-6.5,.24,.28,.24,X(`#fff0d2`,4.2)):e.lampBox.add(s(n),p-.06,-6.5,1.4,.08,.6,X(`#f4f2ea`,2.4)))}t%3==1&&a.add(s(n),o+2.6,-6.5,16769720,10)}}function cm(e,t,n,r,i){let a=i()<.5?1:-1,o=n-a*(2.4+i()*.6);e.box.add(t(o),r+.28,-11.8,2,.55,1,i.pick(Bp.blanket)),e.box.add(t(o-a*.8),r+.62,-11.8,.35,.18,.8,`#e8e2d4`),e.box.add(t(n+a*(2.4+i()*.5)),r+.45,-12.2,1.6,.9,.6,i.pick(Bp.dark)),e.box.add(t(n+(i()-.5)*2),r+.37,-5-i()*1.4,1.2,.74,.8,i.pick(Bp.wood)),e.box.add(t(n-a*3.75),r+1,-4.3-i()*3.5,.4,2,1.5,`#7b5f3f`),i()<.45&&e.box.add(t(n+(i()-.5)*3),r+.36,-3.1-i()*1.8,1.8,.72,.85,i.pick(Bp.blanket)),i()<.25&&e.box.add(t(n+(i()-.5)*3),r+.02,-6-i()*2,2.2,.03,1.6,i.pick([`#8c3b2c`,`#3e5c7a`,`#6a5a3c`])),i()<.35&&e.blob.add(t(n+(i()-.5)*5),r+.5+(i()<.5?0:1.4),-12.1,.4,.35,.4,`#41883c`,0,i()*3,0),i()<.5&&e.cyl.add(t(n+(i()-.5)*3),r+.25,-6-i(),.22,.5,.22,i.pick(Bp.wood))}function lm(e,t,n,r,i){for(let a of[-1,1]){let o=n+a*(1.4+i()*.8),s=-5-i()*4.5;e.box.add(t(o),r+.37,s,1.6,.74,.8,`#414544`),e.box.add(t(o),r+.97,s-.3+i()*.2,.45,.42,.45,`#373d38`),i()<.6&&e.box.add(t(o+.2),r+.22,s+.9,.45,.45,.45,`#2f3432`)}e.box.add(t(n+(i()-.5)*6),r+.9,-12.3,.5,1.8,.6,`#393e3c`),i()<.5&&e.box.add(t(n+(i()-.5)*5),r+.9,-12.3,.5,1.8,.6,`#454a47`)}function um(e,t,n,r,i){let a=Y(t),o=e=>n*e;e.box.add(o(50),a+3.5,-12.85,50,7,.3,r.pick([`#4a5a44`,`#4f5e47`,`#475743`])),e.box.add(o(50),a+.18,-6.75,48,.36,11.3,`#3a2a1f`),e.box.add(o(50),a+.37,-6.75,48.1,.04,11.36,`#43301f`),[-1.75,-3.55,-5.35,-7.15,-8.95,-10.75].forEach((t,n)=>{let i=30+Math.floor(r()*4);for(let s=0;s<i;s++){let c=26.2+(s+.15+r()*.7)*(47.6/i),l=(n===0?.72:.62)+r()*.3;e.blob.add(o(c),a+.36+l*.5,t+(r()-.5)*.7,l,l*.8,l,r.pick(Bp.crop),r(),r()*6,0)}});for(let t of[-2.4,-4.9,-7.4,-9.8])e.lampBox.add(o(50),a+6.72,t,47,.06,.14,X(`#f2f5ff`,2.8));for(let t=0;t<5;t++){let t=28+r()*44,n=1.1+r()*.5;e.tree.add(o(t),a+.36,-10.8-r()*1.2,n,n*(1+r()*.25),n,`#86c47f`,0,r()*6,0)}for(let t of[33.3,50,66.7])e.column.add(o(t),a+3.5,-8.6,.85,7,.85,`#6f6c66`);for(let t=0;t<5;t++)e.lampCyl.add(o(28+r()*44),a+4.2+r()*1.6,-4.4-r()*3.1,.14,.14,.14,X(`#ffe2a8`,5));i.add(o(50),a+5,-6,15266016,14)}function dm(e,t,n,r,i){let a=Y(t),o=e=>n*e;e.box.add(o(50),a+3.5,-12.85,50,7,.3,r.pick([`#4d5d3f`,`#52613f`,`#4a5a3d`]));for(let[t,n]of[[-3,0],[-9.8,1.05]])for(let i=0;i<23;i++){let s=26.5+n+i*2.15+(r()-.5)*.1;s+Jp.w/2>Math.sqrt(5625-(Math.abs(t)+Jp.d/2)**2)-.1||(e.rack.add(o(s),a,t,1,1,1,`#eeeeea`,0,0,0),Jp.shelves.slice(0,-1).forEach(n=>{let i=s-Jp.w/2+.06;for(;;){let c=.44+r()*.2;if(i+c>s+Jp.w/2-.04)break;if(r()<.36){let s=Math.min(.56,c*(.8+r()*.3));e.box.add(o(i+c/2),a+n+s/2+.02,t+(r()-.5)*.1,c*.9,s,.46+r()*.1,r.pick(Bp.box))}i+=c+.05}}))}for(let t=0;t<7;t++)e.lampBox.add(o(28+t*7.2),a+6.94,-6.5,1.4,.08,.6,X(`#f4f2ea`,2.6));i.add(o(50),a+5,-6.5,15790312,10)}function fm(e,t,n,r,i){let a=Y(t),o=e=>n*e;e.box.add(o(50),a+3.5,-12.85,50,7,.3,r.pick([`#57544c`,`#5c5850`,`#524f48`]));for(let t=0;t<10;t++)e.catwalk.add(o(27.5+t*5),a+3.45,-4.5,1,1,1,`#ffffff`);e.bigPipe.add(o(50),a+6.25,-1.6,.42,50,.42,`#55565a`,0,0,Math.PI/2),e.bigPipe.add(o(50),a+5.45,-2.9,.28,50,.28,`#5d5d58`,0,0,Math.PI/2),e.bigPipe.add(o(50),a+1.1,-11.6,.32,50,.32,`#6a3a24`,0,0,Math.PI/2);for(let t=0;t<3;t++){let n=32+t*16+(r()-.5)*4;e.bigPipe.add(o(n),a+3.5,-7.4,.17,7,.17,`#5e3524`)}for(let t=0;t<4;t++){let n=29+t*12+r()*5,i=2.2+r()*1.2,s=1.1+r()*.5;e.box.add(o(n),a+s/2,-9.6,i,s,1.7,r.pick([`#3a3d3c`,`#434746`,`#353836`])),e.box.add(o(n+i*.3),a+s+.05,-9,.12,.08,.12,X(`#ff3b2e`,4))}for(let t=0;t<3;t++){let n=30+t*15+r()*6,i=.8+r()*.9;e.box.add(o(n),a+3.5+.35,-4.8,i,.7,.7,r.pick([`#3a3d3c`,`#4a3f35`,`#454846`])),r()<.6&&e.box.add(o(n),a+4.25,-4.5,.1,.08,.1,X(`#ff4a36`,4))}for(let t=0;t<6;t++){let n=29+t*8+r()*3,i=r()<.45;e.box.add(o(n),a+5.3+r()*.3,-12.62,1.2+r()*.8,1.1+r()*.5,.14,i?`#6b4a32`:`#2e3230`)}for(let t=0;t<8;t++)e.lampBox.add(o(28.5+t*6.3),a+6.72,-.95,1.1,.1,.36,X(`#f6f3ea`,5));i.add(o(50),a+4,-6.5,16771528,12)}var pm=$f/2,mm=$f/44,hm=Math.PI*.5,gm=-1,_m=e=>hm+e/pm*gm*Math.PI*2;function vm(e){let t=(e-hm)*gm/(Math.PI*2);return t-=Math.floor(t),t*pm}var ym=new W(1,1,1);function bm(e,t,n,r,i,a,o,s,c=!0){let l=(e,t,n)=>[Math.cos(t)*e,n,Math.sin(t)*e],u=(t,n)=>{let r=t.map((t,r)=>e.vert(t[0],t[1],t[2],n[0],n[1],n[2],+(r===1||r===2),+(r>=2),s));e.tri(r[0],r[1],r[2]),e.tri(r[0],r[2],r[3])},d=(r+i)/2;u([l(t,r,o),l(t,i,o),l(n,i,o),l(n,r,o)].reverse(),[0,1,0]),u([l(t,r,a),l(t,i,a),l(n,i,a),l(n,r,a)],[0,-1,0]),u([l(n,r,a),l(n,i,a),l(n,i,o),l(n,r,o)].reverse(),[Math.cos(d),0,Math.sin(d)]),u([l(t,r,a),l(t,i,a),l(t,i,o),l(t,r,o)],[-Math.cos(d),0,-Math.sin(d)]),c&&(u([l(t,r,a),l(t,r,o),l(n,r,o),l(n,r,a)].reverse(),[Math.sin(r),0,-Math.cos(r)]),u([l(t,i,a),l(t,i,o),l(n,i,o),l(n,i,a)],[-Math.sin(i),0,Math.cos(i)]))}function xm(e){let t=e.attributes.position,n=e.attributes.normal,r=e.index.array,i=new U,a=new U,o=new U,s=new U;for(let e=0;e<r.length;e+=3)if(i.fromBufferAttribute(t,r[e]),a.fromBufferAttribute(t,r[e+1]),o.fromBufferAttribute(t,r[e+2]),s.fromBufferAttribute(n,r[e]),a.sub(i).cross(o.sub(i)).dot(s)<0){let t=r[e+1];r[e+1]=r[e+2],r[e+2]=t}return e}function Sm(e,t,n,r,i,a){let o=null;for(let s=0;s<=r;s++){let c=t+(n-t)*s/r,l=_m(c),[[u,d],[f,p],m]=i(c,l),h=e.vert(Math.cos(l)*u,d,Math.sin(l)*u,m[0],m[1],m[2],s/4,0,a),g=e.vert(Math.cos(l)*f,p,Math.sin(l)*f,m[0],m[1],m[2],s/4,1,a);o&&(e.tri(o[0],o[1],g),e.tri(o[0],g,h)),o=[h,g]}}var Cm=3,wm=Math.asin(1.6/op)*pm/(Math.PI*2);function Tm(e,t,n){let r=n.map(([n,r])=>[Math.max(n,e),Math.min(r,t)]).filter(([e,t])=>t>e).sort((e,t)=>e[0]-t[0]),i=[],a=e;for(let[e,t]of r)e>a+.02&&i.push([a,e]),a=Math.max(a,t);return t>a+.02&&i.push([a,t]),i}function Em({h0:e=0,h1:t=$f,broken:n=!1,openings:r=[]}={}){let i=new Pp,a=new Pp,o=X(`#2a2c2e`).clone(),s=ym,c=q(Math.round(e*100)+5),l=Math.ceil(e/mm),u=Math.floor(t/mm);for(let e=l;e<u;e++){let t=(e+1)*mm,r=_m(e*mm),a=_m((e+1.08)*mm),o=Math.min(r,a),d=Math.max(r,a),f=5.5;n&&(e===l||e===u-1)&&(f=3.2+c()*1.5),bm(i,ap-.02,f,o,d,t-.22,t,s)}let d=Math.max(e,0),f=Math.min(t,$f),p=Math.max(2,Math.round((f-d)/$f*176));Sm(i,d,f,p,(e,t)=>[[ap,e-.52],[op,e-.52],[0,-1,0]],s);let m=r.map(e=>[e-wm,e+wm]);for(let[e,t]of Tm(d,f,m)){let n=Math.max(2,Math.round((t-e)/(f-d)*p));Sm(i,e,t,n,(e,t)=>[[op,e-.52],[op,e+1],[Math.cos(t),0,Math.sin(t)]],s),Sm(i,e,t,n,(e,t)=>[[5.52,e+1],[op,e+1],[0,1,0]],s),Sm(i,e,t,n,(e,t)=>[[5.52,e-.05],[5.52,e+1],[-Math.cos(t),0,-Math.sin(t)]],s);for(let[n,r]of[[e,-1],[t,1]]){if(r<0&&n<=d+.001||r>0&&n>=f-.001)continue;let e=_m(n),t=[-Math.sin(e)*gm*r,0,Math.cos(e)*gm*r],a=(t,n)=>[Math.cos(e)*t,n,Math.sin(e)*t],o=[a(5.52,n-.05),a(op,n-.52),a(op,n+1),a(5.52,n+1)].map((e,n)=>i.vert(e[0],e[1],e[2],t[0],t[1],t[2],+(n===1||n===2),+(n>=2),s));i.tri(o[0],o[1],o[2]),i.tri(o[0],o[2],o[3])}let r=null,c=Math.max(1,Math.round(n/2));for(let n=0;n<=c;n++){let i=e+(t-e)*n/c,s=_m(i),l=[Math.cos(s)*5.71,i+1+.1,Math.sin(s)*5.71];r&&jm(a,r,l,.03,o,5),r=l}}return{concrete:xm(i.build()),trim:a.build()}}var Dm=new $t,Om=new kt,km=new U,Am=new U(0,1,0);function jm(e,t,n,r,i,a=6){km.set(n[0]-t[0],n[1]-t[1],n[2]-t[2]);let o=km.length();o<1e-4||(Om.setFromUnitVectors(Am,km.divideScalar(o)),Dm.compose(new U((t[0]+n[0])/2,(t[1]+n[1])/2,(t[2]+n[2])/2),Om,new U(r,o,r)),e.add(Z.cyl(a),Dm,i))}function Mm(e,t,n,r,i,a,o,s,c=0){Dm.compose(new U(t,n,r),Om.setFromEuler(new un(0,c,0)),new U(i,a,o)),e.add(Z.box(),Dm,s)}var Nm=Array.from({length:9},(e,t)=>Math.PI+t/8*Math.PI),Pm=Nm.slice(1,-1),Fm=.5,Im=ip-.3+Fm,Lm=[[0,2*Math.PI/3,4*Math.PI/3],[Math.PI/3,Math.PI,5*Math.PI/3]],Rm=e=>vm(e),zm=Lm.map(e=>e.map(Rm));function Bm({bridges:e,half:t=!1}){let n=new Pp,r=new Pp,i=new Pp,a=new Pp,o=X(`#2a2c2e`).clone(),s=t?Math.PI:0,c=Math.PI*2,l=t?48:96,u=rp,d=Math.asin(1.62/15),f=t=>e.some(e=>Math.abs((t-e+Math.PI*3)%(Math.PI*2)-Math.PI)<d);for(let e=0;e<l;e++){let t=s+(c-s)*e/l,r=s+(c-s)*(e+1)/l;bm(n,15,u,t,r,-ep,0,ym,!1),t>=Math.PI-1e-6&&bm(n,18.5,19.45,t,r,-1.25,-ep-.002,Wm,!1)}if(!t)for(let e of[Math.PI,Math.PI*2])bm(n,18.5,19.45,e-.001,e,-1.25,-ep-.002,Wm);let p=t?72:144,m=null,h=e=>{if(m===null)return;let t=Math.max(1,Math.round((e-m)/(Math.PI*2/144)));for(let r=0;r<t;r++){let i=m+(e-m)*r/t,a=m+(e-m)*(r+1)/t;bm(n,15,15.34,i,a,0,1.02,ym,!1)}bm(n,15,15.34,m,m+.001,0,1.02,ym),bm(n,15,15.34,e-.001,e,0,1.02,ym);let i=null,a=Math.max(2,t);for(let t=0;t<=a;t++){let n=m+(e-m)*t/a,s=[Math.cos(n)*15.17,1.12,Math.sin(n)*15.17];i&&jm(r,i,s,.03,o,5),i=s}m=null};for(let e=0;e<=p;e++){let t=s+(c-s)*e/p,n=f(t)||e===p;!n&&m===null&&(m=t),n&&h(t)}if(t)for(let e of[Math.PI,Math.PI*2])bm(n,15,u,e-.001,e,-ep,0,ym);for(let e of Nm){let t=Math.cos(e)*Im,r=Math.sin(e)*Im;Dm.compose(new U(t,3.5,r),Om.identity(),new U(Fm,7,Fm)),n.add(Z.cyl(14),Dm,ym),Dm.compose(new U(t,6.82,r),Om.identity(),new U(.66,.36,.66)),n.add(Z.cyl(14),Dm,ym),Dm.compose(new U(t,.14,r),Om.identity(),new U(.62,.28,.62)),n.add(Z.cyl(14),Dm,ym)}let g=X(`#ffe0b4`,4.6).clone();for(let e of Pm){let t=-e+Math.PI/2,n=e=>Im-Fm-e,r=t=>[Math.cos(e)*n(t),Math.sin(e)*n(t)],[o,s]=r(-.05);Mm(i,o,Um,s,.78,.5,.3,ym,t),[o,s]=r(.1),Mm(a,o,Um,s,.64,.36,.02,g,t),[o,s]=r(.12);for(let e of[-.06,.06])Mm(i,o,Um+e,s,.66,.035,.03,ym,t)}return qm(n),{concrete:xm(n.build()),trim:r.build(),housing:i.build(),glow:a.build()}}var Vm=rp,Hm=rp+.3,Um=2.75,Wm=new W(.8,.8,.79),Gm=[Math.asin(.8/Vm),Math.asin(5.2/Vm)],Km=[[Math.PI+Gm[0],Math.PI+Gm[1],3],[1.5*Math.PI-.55-1.05/Vm,1.5*Math.PI-.55+1.05/Vm,2.7],[1.5*Math.PI+.55-1.05/Vm,1.5*Math.PI+.55+1.05/Vm,2.7],[2*Math.PI-Gm[1],2*Math.PI-Gm[0],3]];function qm(e){let t=[],n=Math.PI;for(let[e,r]of Km)t.push([n,e]),n=r;t.push([n,Math.PI*2]);let r=Math.PI/48,i=(t,n,i,a)=>{let o=Math.max(1,Math.round((n-t)/r));for(let r=0;r<o;r++)bm(e,Vm,Hm,t+(n-t)*r/o,t+(n-t)*(r+1)/o,i,a,Wm,!1)};for(let[n,r]of t)i(n,r,0,7),bm(e,Vm,Hm,n,n+8e-4,0,7,Wm),bm(e,Vm,Hm,r-8e-4,r,0,7,Wm);for(let[e,t,n]of Km)i(e,t,n,7)}function Jm(e,t=null){let n=new Pp,r=new Pp,i=X(`#2a2c2e`).clone(),a=Rm(e),o=5.45,s=15.45,c=Cm,l=.24,u=.7,d=t??o,f=new Pp,p=new Pp,m=(e,t,n)=>{let r=new yo(new Pa(e.map(([e,t])=>new H(e,t))),{depth:n,bevelEnabled:!1,curveSegments:1}),i=r.attributes.uv;for(let e=0;e<i.count;e++)i.setXY(e,i.getX(e)*.3,i.getY(e)*.3);Dm.makeTranslation(0,0,t),f.add(r,Dm,ym)},h=Math.max(1,Math.round(a/.17)),g=a/h,_=(10-2*u)/h,v=e=>-.45+a*Ym((14.75-e)/9.3),y=e=>1+a*Ym((14.75-e)/(s-2*u-o)),b=[[s,-.45],[s,0]],x=14.75,S=0;for(let e=1;e<=h&&x>d;e++)b.push([x,(e-1)*g],[x,e*g]),S=e*g,x-=_;b.push([d,S],[d,v(d)]),d<14.75&&b.push([14.75,-.45]),m(b,-1.38,2.76);for(let e of[-3/2,c/2-l]){let t=[[s,-.45],[s,1],[14.75,1]];d<6.15&&t.push([6.15,a+1]),t.push([d,y(d)],[d,v(d)]),d<14.75&&t.push([14.75,-.45]),m(t,e,l);let n=e+l/2,r=[s,14.75,Math.max(6.15,d),d].filter((e,t,n)=>t===0||e<n[t-1]-.001);for(let e=0;e<r.length-1;e++)jm(p,[r[e],y(r[e])+.1,n],[r[e+1],y(r[e+1])+.1,n],.03,i,5)}if(t!==null){let t=q(Math.round(e*1e3));for(let e=0;e<5;e++){let e=.18+t()*.22;Dm.compose(new U(d+(t()-.3)*.5,v(d)+t()*(S-v(d)),(t()-.5)*2.4),Om.setFromEuler(new un(t()*3,t()*3,0)),new U(e,e*.7,e)),f.add(Z.ico(0),Dm,X(`#b8b3a6`))}}let C=new $t().makeRotationY(-e);return n.add(f.build(),C,ym),r.add(p.build(),C,ym),{concrete:xm(n.build()),trim:r.build()}}var Ym=e=>Math.min(1,Math.max(0,e));function Xm(e,t,n,r,{cast:i=!0,receive:a=!0}={}){let o=new Ii(t,n,r.length);return o.name=e,r.forEach((e,t)=>o.setMatrixAt(t,Dm.makeTranslation(0,e,0))),o.instanceMatrix.needsUpdate=!0,o.computeBoundingBox(),o.computeBoundingSphere(),o.castShadow=i,o.receiveShadow=a,o.matrixAutoUpdate=!1,o}function Zm(e,t,n,r,i=6,a){let o=new On;o.name=e;let s=Math.ceil(r.length/i);for(let i=0;i<r.length;i+=s)o.add(Xm(`${e}#${i/s}`,t,n,r.slice(i,i+s),a));return o}var Qm=null;function $m({pool:e}){let t=new On;t.name=`shaft`,Qm=J.concrete.clone(),Qm.name=`shaftConcrete`,Qm.color.set(`#c2c2b6`);let n=J.trim,r=new Bo({name:`sconceHousing`,color:`#3a3c3d`,roughness:.6,metalness:.4}),i=tp+.4,a=new G(new ta(ap,ap,i,40,1,!0),J.column);a.position.y=-i/2-.2,a.name=`column`,a.castShadow=a.receiveShadow=!0,t.add(a);let o=new Set([91,92]);for(let e of[0,1]){let r=Em({openings:zm[e]}),i=[];for(let t=2;t<=144;t++)t%2===e&&!o.has(t)&&i.push(Y(t));t.add(Zm(`helix${e}`,r.concrete,Qm,i,4)),t.add(Zm(`helixRail${e}`,r.trim,n,i,4,{cast:!1}))}let s=Em({h1:$f-.64,openings:zm[1]}),c=new G(s.concrete,Qm),l=new G(s.trim,n);c.position.y=l.position.y=Y(1),c.castShadow=c.receiveShadow=!0,c.name=`helixL1`,t.add(c,l);let u=[[],[]];for(let e=1;e<144;e++)u[e%2].push(Y(e));for(let e of[0,1]){let i=Bm({bridges:Lm[e]}),a=u[e];t.add(Zm(`gallery${e}`,i.concrete,Qm,a)),t.add(Zm(`galleryRail${e}`,i.trim,n,a,6,{cast:!1})),t.add(Zm(`gallerySconceHousings${e}`,i.housing,r,a,6,{cast:!1})),t.add(Zm(`gallerySconces${e}`,i.glow,J.glow,a,6,{cast:!1,receive:!1}))}let d=Bm({bridges:Lm[0],half:!0});for(let[e,i,a]of[[d.concrete,Qm,`gallery144`],[d.trim,n,`galleryRail144`],[d.housing,r,`sconceHousing144`],[d.glow,J.glow,`sconce144`]]){let n=new G(e,i);n.position.y=Y(144),n.name=a,n.castShadow=n.receiveShadow=i!==J.glow,t.add(n)}let f=(e,t)=>e===91||e===92&&Rm(t)>1;for(let e of[0,1])Lm[e].forEach((r,i)=>{let a=Jm(r),o=[];for(let a=1;a<=144;a++){if(a%2!==e)continue;if(!f(a,r)){o.push(Y(a));continue}let s=Jm(r,7+(i*37+a)%5*.35);for(let[e,r]of[[s.concrete,Qm],[s.trim,n]]){let n=new G(e,r);n.position.y=Y(a),n.name=`gapBridge${a}-${i}`,n.castShadow=n.receiveShadow=r===Qm,t.add(n)}}t.add(Zm(`bridges${e}${i}`,a.concrete,Qm,o,4)),t.add(Zm(`bridgeRails${e}${i}`,a.trim,n,o,4,{cast:!1}))});t.add(eh());for(let t=1;t<=144;t+=1){let n=Pm[t*3%Pm.length],r=Im-Fm-1.6;e.add(Math.cos(n)*r,Y(t)+Um,Math.sin(n)*r,16769725,12)}return t.add(nh()),t.add(rh()),t}function eh(){let e=new On;e.name=`placards`;let t=new Pp,n=new Pp,r=new Pp,i=vf(147,16,128),{cols:a,rows:o}=i.userData,s=_m(3.2),c=Math.cos(s),l=Math.sin(s),u=-s+Math.PI/2;for(let e=1;e<=144;e++){let i=Y(e),s=ap+.08;Mm(t,c*s,i+1.6,l*s,1.3,1.34,.12,X(`#1e2021`),u);let d=e-1,f=d%a,p=Math.floor(d/a),m=f/a,h=(f+1)/a,g=1-p/o,_=1-(p+1)/o,v=c*(s+.07),y=l*(s+.07),b=l,x=-c,S=.55,C=(e,t)=>[v+b*e,i+1.6+t,y+x*e],w=C(-.55,-.55),T=C(S,-.55),E=C(S,S),D=C(-.55,S),O=r.vert(...w,c,0,l,m,_,ym),k=r.vert(...T,c,0,l,h,_,ym),A=r.vert(...E,c,0,l,h,g,ym),j=r.vert(...D,c,0,l,m,g,ym);r.tri(O,k,A),r.tri(O,A,j);for(let e of[0,1,2]){let t=_m(3.2+e*1.1)+.6+e*2.1,r=1.9+e*1.3,a=ap+.1;Dm.compose(new U(Math.cos(t)*a,i+r,Math.sin(t)*a),Om.identity(),new U(.15,.86,.15)),n.add(Z.cyl(10),Dm,X(`#f0e6d2`,3.4))}}let d=new G(th(t.build()),J.trim);d.name=`placardPlates`,d.castShadow=!0;let f=new G(n.build(),J.glow);f.name=`columnSconces`;let p=new G(r.build(),new pi({map:i,transparent:!0,depthWrite:!1,color:`#f2efe6`}));return p.name=`placardNumerals`,e.add(d,f,p),e}var th=e=>e;function nh(){let e=new Fp(`shaftBottom`),t=Y(144),n=e.batch(`concrete`);for(let e=0;e<120;e++){let r=e/120*Math.PI*2,i=(e+1)/120*Math.PI*2;bm(n,ap,19.35,r,i,t-.62,t+.02,ym,!1),bm(n,7.3,7.6,r,i,t,t+1.1,ym,!1),bm(n,7.25,7.65,r,i,t+1.1,t+1.18,ym,!1)}for(let n=0;n<48;n++){let r=n/48*Math.PI*2;e.rod(`trim`,[Math.cos(r)*18.9,t,Math.sin(r)*18.9],[Math.cos(r)*18.9,t+1.1,Math.sin(r)*18.9],.03,`#2a2c2e`,4);let i=(n+1)/48*Math.PI*2;e.rod(`trim`,[Math.cos(r)*18.9,t+1.1,Math.sin(r)*18.9],[Math.cos(i)*18.9,t+1.1,Math.sin(i)*18.9],.035,`#2a2c2e`,5)}for(let n=0;n<6;n++){let r=n/6*Math.PI*2+.3;e.box(`wood`,Math.cos(r)*10.5,t+.25,Math.sin(r)*10.5,1.9,.08,.5,`#886946`,-r+Math.PI/2),e.box(`trim`,Math.cos(r)*10.5,t+.12,Math.sin(r)*10.5,1.6,.24,.3,`#3a3c3d`,-r+Math.PI/2)}let r=e.finish({concrete:Qm,trim:J.trim,wood:J.wood});r.children.forEach(e=>{e.geometry.index&&xm(e.geometry)});let i=tf(Cf(`144`),{repeat:!1}),a=new G(new Co(7.2,3.6),new Bo({map:i,transparent:!0,roughness:.92,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));return a.rotation.x=-Math.PI/2,a.position.set(-6.2,t+.03,11.7),a.name=`paint144`,a.receiveShadow=!0,r.add(a),r}function rh(){let e=new On;e.name=`gap`;let t=Y(92),n=Y(90),r=Em({h0:0,h1:1,broken:!0}),i=Em({h0:$f-1,h1:$f,broken:!0});for(let[n,a,o]of[[r,t,`gapStubBottom`],[i,Y(91),`gapStubTop`]]){let t=new G(n.concrete,Qm),r=new G(n.trim,J.trim);t.position.y=r.position.y=a,t.name=o,t.castShadow=t.receiveShadow=!0,e.add(t,r)}let a=new Fp(`gapProps`),o=q(9191);for(let e=0;e<18;e++){let e=o()*(Math.PI/2-.12)+.06,n=2+o()*3.2,r=.18+o()*.34,i=t+Math.min(vm(e),1)+r*.35;a.ico(`concrete`,Math.cos(e)*n,i,Math.sin(e)*n,r,`#b3ad9f`,0,.55+o()*.4,o()*6)}{let e=t+1,n=_m(.9);for(let t=0;t<6;t++){let t=1.9+o()*3.4,r=.22+o()*.3,i=(o()-.5)*.18;a.ico(`concrete`,Math.cos(n+i)*t,e+r*(.3+o()*.3),Math.sin(n+i)*t,r,`#a9a396`,0,.7+o()*.4,o()*6)}}let s=4.1,c=2.3,l=4.4,u=`#2a2c2d`,d=n+1.2;for(let[e,n]of[[2,c],[s,c],[2,l],[s,l]])a.rod(`trim`,[e,t,n],[e,d,n],.055,u,6);for(let e=t+1;e<d+.1;e+=2.05)a.rod(`trim`,[2,e,c],[s,e,c],.04,u,5),a.rod(`trim`,[2,e,l],[s,e,l],.04,u,5),a.rod(`trim`,[2,e,c],[2,e,l],.04,u,5),a.rod(`trim`,[s,e,c],[s,e,l],.04,u,5);let f=!1;for(let e=t+1;e<d-2;e+=2.05){let t=Math.min(e+2.05,d);a.rod(`trim`,[2,f?e:t,c],[s,f?t:e,c],.028,u,4),a.rod(`trim`,[s,f?t:e,l],[s,f?e:t,c],.028,u,4),a.rod(`trim`,[2,f?t:e,l],[2,f?e:t,c],.028,u,4),f=!f}for(let e=0;e<3;e++){let n=t+3.85+e*4.1;for(let e=0;e<5;e++)a.box(`wood`,2.22+e*.46+.02,n,6.7/2,.42,.06,2.4000000000000004,e%2?`#7c5431`:`#8e5f35`)}for(let e=t+.35;e<d-.2;e+=.4)a.box(`trim`,1.78,e,3.35,.05,.05,.62,`#77776f`);a.rod(`trim`,[1.78,t,3.02],[1.78,d,3.02],.035,`#77776f`,4),a.rod(`trim`,[1.78,t,3.68],[1.78,d,3.68],.035,`#77776f`,4),a.rod(`trim`,[2,d,l],[2,d,4.6],.07,u,6),a.rod(`trim`,[s,d,l],[s,d,4.6],.07,u,6),a.rod(`trim`,[2,d,4.6],[5.5,d,4.6],.085,u,6),a.rod(`trim`,[s,d-1.4,l],[5.2,d,4.6],.04,u,5),a.geo(`trim`,Z.torus(.12,6,18),4.6,n+.9,4.6,`#4a4c4d`,.32,.32,.32,0,0,0);let p=a.finish({concrete:Qm,trim:J.trim,wood:J.wood});return e.add(p),e}var ih=new U(4.6,Y(90)+.9,4.6),ah=.32,oh=.38,sh=.13,ch=5.4,lh=Y(92)+3.85+8.2+.035,uh=new U(0,1,0),dh=new U(0,-1,0),fh=new U,ph=new U,mh=new U;function hh(e,t,n){fh.subVectors(n,t);let r=fh.length();return e.position.addVectors(t,n).multiplyScalar(.5),r>1e-6&&e.quaternion.setFromUnitVectors(uh,fh.divideScalar(r)),e.scale.set(1,r,1),e}function gh(){let e=new On;e.name=`shaft-dynamic`;let t=new Bo({name:`pulleySteel`,color:`#2b2d2e`,roughness:.5,metalness:.65}),n=new Bo({name:`pulleyWood`,color:`#8e5f35`,roughness:.7,metalness:0}),r=new Bo({name:`pulleyCord`,color:`#2f2a24`,roughness:.92,metalness:0}),i=(t,n,r=e)=>{let i=new G(t,n);return i.castShadow=!0,i.receiveShadow=!0,r.add(i),i},a=i(new ta(.022,.022,1,6,1,!0),r);a.name=`pulleyRope`;let o=i(new Oo(.332,.022,5,14,Math.PI),r);o.position.copy(ih),o.name=`pulleyGroove`;let s=new U(3.95,lh+.36,4.2),c=i(new ta(.02,.02,1,6,1,!0),r);c.name=`pulleyHaul`,hh(c,ph.set(ih.x-ah-.012,ih.y,ih.z),mh.set(s.x,s.y+sh,s.z));let l=new On;l.name=`pulleySpokes`,l.position.copy(ih),e.add(l);let u=i(new ta(.06,.06,.1,10),t,l);u.rotation.x=Math.PI/2;let d=new $i(ah*2-.04,.024,.02);for(let e=0;e<3;e++)i(d,t,l).rotation.z=e*Math.PI/3;let f=new On;f.name=`pulleyWinch`,e.add(f);for(let e of[-1,1])i(new $i(.05,.5,.42),t,f).position.set(s.x+e*.23,lh+.25,s.z);let p=new On;p.position.copy(s),f.add(p),i(new ta(sh,sh,.4,14),n,p).rotation.z=Math.PI/2,i(new $i(.03,.26,.04),t,p).position.set(.27,.11,0);let m=i(new ta(.018,.018,.14,6),n,p);m.rotation.z=Math.PI/2,m.position.set(.33,.22,0);let h=new On;h.name=`pulleyChair`,e.add(h);let g=i(new Oo(.055,.012,6,14),t,h);g.position.y=-.05;let _=i(new $i(.1,.04,.04),t,h);_.position.y=-.11;let v=new ta(.011,.011,1,5,1,!0),y=new ta(.014,.014,1,6),b=(e,t,n,r)=>hh(i(e,t,h),ph.set(...n),mh.set(...r));for(let e of[-1,1]){let n=e*.28;b(v,r,[0,-.12,0],[n,-.62,0]),b(y,t,[n,-.62,0],[n,-1.1,.02]),b(y,t,[n,-1.1,-.26],[n,-1.1,.26]),b(y,t,[n,-1.1,-.26],[n,-.64,-.32]),b(y,t,[n,-.86,-.29],[n,-.86,.02]),b(y,t,[n,-1.1,.26],[e*.25,-1.42,.3])}b(y,t,[-.26,-1.42,.3],[.26,-1.42,.3]),i(new $i(.6,.045,.52),n,h).position.set(0,-1.075,0);let x=i(new $i(.6,.36,.035),n,h);x.position.set(0,-.86,-.29),x.rotation.x=-.14;let S=new U(ih.x+ah,ih.y,ih.z),C=new U,w=new U,T=new kt,E=0,D=(e,t)=>{let n=ch+1.6*Math.sin(.22*t);E+=Math.min(e,.1)*Math.sqrt(9.81/n);let r=.05*Math.sin(E),i=Math.atan2(oh,n),o=Math.sin(i),s=Math.cos(i);C.set(S.x+n*o,S.y-n*s*Math.cos(r),S.z+n*s*Math.sin(r)),hh(a,S,C),h.position.copy(C),w.subVectors(C,S).normalize(),h.quaternion.setFromUnitVectors(dh,w).multiply(T.setFromAxisAngle(uh,.09*Math.sin(t*.31))),l.rotation.z=-n/ah,p.rotation.x=-(n-ch)/sh};return D(0,0),{group:e,update:D}}var _h=3200,vh=-1204,yh=(()=>{let e=q(5050),t=[{id:18,x:0,z:0},{id:17,x:mp[0],z:mp[1]}],n=[29,-329],r=Math.atan2(0-n[1],0-n[0]),i=1,a=()=>{for(;i===17||i===18;)i++;return i++};for(let e=1;e<6;e++){let i=r+e/6*Math.PI*2;e!==1&&t.push({id:a(),x:n[0]+Math.cos(i)*330,z:n[1]+Math.sin(i)*330})}t.push({id:a(),x:n[0],z:n[1]});for(let[n,r]of[[1250,-700],[-1500,-650],[2150,-1500],[-2250,-1450],[700,-1800],[-800,-1900]]){let i=e()*Math.PI;t.push({id:a(),x:n,z:r});for(let o=0;o<6;o++){let s=i+o/6*Math.PI*2;t.push({id:a(),x:n+Math.cos(s)*(360+e()*60),z:r+Math.sin(s)*(360+e()*60)})}}for(let e of t)e.face=Math.atan2(-e.z,-e.x);return t})();function bh(e,t,n,r,i,a=.12,o=82,s=116,c=230){let l=Math.hypot(e-n,t-r);if(l>c)return null;if(l<o)return{h:a,w:1};if(l<s){let e=Zd(o,s,l);return{h:a+(i-a)*e,w:1}}return{h:i,w:1-Zd(s,c,l)}}var xh=e=>e.id===18||e.id===17?{floor:.12,rIn:82,rRim:118,rOut:235,big:!0}:{floor:.6,rIn:60,rRim:92,rOut:180,big:!1};function Sh(e,t){let n=4.4+Jd(e/640,t/640,4)*5+Jd(e/170+9.1,t/170-3.3,3)*1.8;for(let r of yh){if(Math.abs(e-r.x)>240||Math.abs(t-r.z)>240)continue;let i=xh(r),a=r.id===18?11.2+Jd(e/60,t/60,3)*3.2:i.big?13.4+Jd(e/60+31,t/60,3)*2.4:9.4+Jd(e/80+r.id,t/80,2)*1.8,o=bh(e,t,r.x,r.z,a,i.floor,i.rIn,i.rRim,i.rOut);o&&(n=o.h*o.w+n*(1-o.w))}let r=Math.exp(-((e-110)**2+(t+9)**2)/968);return n+=r*3.2,n}function Ch(e,t){let n=0;for(let r of yh){let i=xh(r),a=e-r.x,o=t-r.z,s=i.rIn+12;if(Math.abs(a)>s||Math.abs(o)>s)continue;let c=Math.hypot(a,o);n=Math.max(n,1-Zd(i.rIn-16,i.rIn+8,c))}return n}function wh(e,t,n,r=1.6,i=12,a=2700){let o=[0],s=0;for(;s<e;){let c=Yd(r+s*t+(s/420)**2*n,r,70);s<a&&(c=Math.min(c,i)),s=Math.min(e,s+c),o.push(s)}return o}function Th(){let e=wh(_h,.011,5.5),t=[...e.slice(1).map(e=>-e).reverse(),...e],n=wh(_h,.012,5.5,1.6,12,2450).map(e=>-e),r=t.length,i=n.length,a=new Float32Array(r*i*3),o=new Float32Array(r*i*2),s=new Float32Array(r*i*3),c=new W(`#918e83`),l=new W(`#73716a`),u=new W(`#dcdad0`),d=new W(`#c3c3b6`),f=new W;for(let e=0;e<i;e++)for(let i=0;i<r;i++){let p=t[i],m=n[e],h=Sh(p,m),g=e*r+i;a[g*3]=p,a[g*3+1]=h,a[g*3+2]=m,o[g*2]=p/16,o[g*2+1]=m/16;let _=Jd(p/90+3,m/90-7,3);f.copy(c).lerp(l,Yd(.3+_*.8,0,1));let v=Ch(p,m);v>0&&f.lerp(u,v*.85),f.lerp(d,Zd(140,760,Math.hypot(p,m))*.82),s[g*3]=f.r,s[g*3+1]=f.g,s[g*3+2]=f.b}let p=[],m=(e,t)=>e>-34.3&&e<-22.9&&t>-5.2;for(let e=0;e<i-1;e++)for(let i=0;i<r-1;i++){let a=e*r+i,o=a+1,s=a+r,c=s+1;m((t[i]+t[i+1])/2,(n[e]+n[e+1])/2)||p.push(a,o,s,o,c,s)}let h=new Ir;h.setAttribute(`position`,new xr(a,3)),h.setAttribute(`uv`,new xr(o,2)),h.setAttribute(`color`,new xr(s,3)),h.setIndex(r*i>65535?new Cr(p,1):new Sr(p,1)),h.computeVertexNormals(),h.computeBoundingSphere();let g=new G(h,new Bo({name:`terrain`,map:Ef.terrain,vertexColors:!0,roughness:1,metalness:0}));return g.name=`terrain`,g.receiveShadow=!0,{mesh:g,xs:t}}var Eh=-60,Dh=140,Oh=e=>141+(e-vh)/1144*4;function kh(e){let t=new Pp,n=new W,r=(e,r,i,a,o,s,c,l,u)=>(n.setRGB(u,u*.96,u*.93),t.vert(e,r,i,a,o,s,c,l,n)),i=(e,n,r,i)=>{t.tri(e,n,r),t.tri(e,r,i)},a=e=>(e-vh)/1224,o=e=>.4+(1-Zd(-4,-40,e))*.05,s=e=>Eh+Jd(e/300,3.3,2)*4,c=[...new Set([...e.filter((e,t)=>t%2==0),-78,78])].sort((e,t)=>e-t);for(let e=0;e<c.length-1;e++){let t=c[e],n=c[e+1];if(Math.abs((t+n)/2)<78)continue;let l=Sh(t,0),u=Sh(n,0),d=Math.abs(t)<=Oh(Eh)?-62:s(t),f=Math.abs(n)<=Oh(Eh)?-62:s(n);for(let e=0;e<4;e++){let s=e/4,c=(e+1)/4,p=l+(d-l)*s,m=u+(f-u)*s,h=l+(d-l)*c,g=u+(f-u)*c;i(r(t,h,.02,0,0,1,t/180,a(h),o(h)),r(n,g,.02,0,0,1,n/180,a(g),o(g)),r(n,m,.02,0,0,1,n/180,a(m),o(m)),r(t,p,.02,0,0,1,t/180,a(p),o(p)))}Math.max(Math.abs(t),Math.abs(n))<=Oh(Eh)+1||i(r(t,d,-140,0,-1,0,t/180,0,.16),r(n,f,-140,0,-1,0,n/180,0,.16),r(n,f,.02,0,-1,0,n/180,.1,.2),r(t,d,.02,0,-1,0,t/180,.1,.2))}let l=Y(70)+7,u=Y(70),d=[];for(let e=Eh;e>vh;e-=36)d.push(e);d.push(vh,lp,l,u);let f=[...new Set(d)].sort((e,t)=>t-e),p=(e,t)=>Math.abs(e)<77.999&&t>-1181||e>-96&&e<-77.999&&t<l&&t>u,m=e=>.46+Jd(e/40,1.7,2)*.03;for(let e of[-1,1])for(let t=0;t<f.length-1;t++){let n=f[t],o=f[t+1],s=Oh(n),c=Oh(o),l=e<0?[-s,-96,-78,0]:[0,78,s];for(let e=0;e<l.length-1;e++){let t=l[e],u=l[e+1];if(p((t+u)/2,(n+o)/2))continue;let d=t===-s?-c:t,f=u===s?c:u;i(r(d,o,.02,0,0,1,d/180,a(o),m(o)),r(f,o,.02,0,0,1,f/180,a(o),m(o)),r(u,n,.02,0,0,1,u/180,a(n),m(n)),r(t,n,.02,0,0,1,t/180,a(n),m(n)))}let u=e*s,d=e*c,h=[e,0,0];i(r(d,o,.02,...h,0,a(o),.3),r(d,o,-140,...h,Dh/180,a(o),.3),r(u,n,-140,...h,Dh/180,a(n),.3),r(u,n,.02,...h,0,a(n),.3))}let h=Oh(vh);i(r(-h,vh,.02,0,-1,0,0,0,.2),r(h,vh,.02,0,-1,0,1,0,.2),r(h,vh,-140,0,-1,0,1,1,.2),r(-h,vh,-140,0,-1,0,0,1,.2));let g=t.build(),_=g.attributes.position,v=g.attributes.normal,y=g.index.array,b=new U,x=new U,S=new U,C=new U;for(let e=0;e<y.length;e+=3)b.fromBufferAttribute(_,y[e]),x.fromBufferAttribute(_,y[e+1]),S.fromBufferAttribute(_,y[e+2]),C.fromBufferAttribute(v,y[e]),x.sub(b).cross(S.sub(b)).dot(C)<0&&([y[e+1],y[e+2]]=[y[e+2],y[e+1]]);let w=new G(g,new Bo({name:`earth`,map:Ef.earth,vertexColors:!0,roughness:1,metalness:0}));return w.name=`earth`,w.receiveShadow=!0,w}function Ah(){let e=new Pp,t=q(33),n=new $t,r=new kt,i=new Ir;i.setAttribute(`position`,new wr([-.5,0,0,.5,0,0,0,1,.08,0,0,.12],3)),i.setIndex([0,1,2,1,3,2,3,0,2]),i.computeVertexNormals();for(let a=0;a<15;a++){let o=a/15*Math.PI*2+t()*.5,s=.12+t()*.55;r.setFromEuler(new un(s,o,0,`YXZ`));let c=.9+t()*1;n.compose(new U((t()-.5)*.12,0,(t()-.5)*.12),r,new U(.09+t()*.05,c,1)),e.add(i,n,X(`#ffffff`).clone().multiplyScalar(.8+t()*.35))}return e.build()}function jh(e,t,n,r,i=!0){e.push(t,0,n,-r+0,1),i?(e.box(`concrete`,-5.2,1.7,0,10.5,3.6,6.2,`#8a8578`),e.box(`concrete`,-5.2,3.65,0,10.9,.3,6.6,`#7f7a6e`),e.box(`steel`,.1,1.45,0,.25,2.9,3.4,`#3a3f3d`),e.box(`steel`,.2,1.45,0,.12,2.5,3,`#4a504d`),e.cylR(`steel`,.3,1.5,.9,.12,.25,`#6c706c`,0,0,Math.PI/2,10)):(e.box(`concrete`,-2.5,1.2,0,5,2.4,4,`#8a8578`),e.box(`steel`,.05,1,0,.15,1.9,2.2,`#3a3f3d`)),e.pop()}function Mh(e,t,n,r,i,a){let o=new yo(new Pa(n.map(([e,t])=>new H(e,t))),{depth:i-r,bevelEnabled:!1});e.geo(t,o,0,0,r,a)}function Nh({pool:e}){let t=new On;t.name=`surface`;let{mesh:n,xs:r}=Th();t.add(n);let i=new G(new Co(16e3,8e3),new Bo({name:`farPlain`,color:`#818072`,roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(0,-.6,-4e3),i.name=`farPlain`,t.add(i),t.add(kh(r));let a=new Fp(`surface/props`),o=Math.atan2(7.6,20.6),s=3.75;Mh(a,`concrete`,[[-24.2-s/Math.tan(o),-.3],[-23.4,-.3],[-23.4,3.9],[-24.2,3.9]],-5.35,-4.6,`#8c877a`),a.bb(`concrete`,-24.3,0,-5.35,-22.7,.9,-4.6,`#86817a`),a.bb(`concrete`,-24.3,0,-.75,-22.7,.9,-.05,`#86817a`),a.bb(`concrete`,-24.3,.9,-5.35,-23.4,s,-4.3,`#8a8578`),a.bb(`concrete`,-24.3,.9,-.75,-23.4,s,-.05,`#8a8578`),a.bb(`concrete`,-24.3,3.2,-5.35,-22.7,3.9,-.05,`#7f7a6e`),a.bb(`concrete`,-22.7,.02,-5.6,-16.8,.24,-.1,`#a19c8e`),a.box(`steel`,-23.1,1.55,-2.52,.22,3.1,3.5,`#2c302f`),a.box(`steel`,-22.96,1.55,-2.52,.08,2.7,3.1,`#3c413f`);for(let e=0;e<5;e++)a.box(`steel`,-22.9,.5+e*.52,-2.52,.05,.06,3,`#232625`);a.cylR(`steel`,-22.82,1.5,-1.3,.14,.25,`#6c706c`,0,0,Math.PI/2,10),a.cyl(`concrete`,-21.5,0,-6,.42,.4,`#8f8a7e`,12),a.cyl(`steel`,-21.5,.4,-6,.22,1.25,`#3a3f3d`,10,.6),a.sphere(`steel`,-21.5,1.72,-6,.2,`#2a2e2d`,12,8),a.box(`steel`,-21.5,1.45,-5.82,.16,.12,.06,`#1f2322`);let c=a.batch(`path`),l=new H(-17,-3.4),u=new H(104,-10.5),d=null,f=X(`#ffffff`).clone(),p=u.x-l.x,m=u.y-l.y,h=Math.hypot(p,m);for(let e=0;e<=120;e++){let t=e/120,n=l.x+p*t,r=l.y+m*t,i=.62+Math.sin(t*13)*.06,a=-m/h*i,o=p/h*i,s=c.vert(n+a,Sh(n+a,r+o)+.14,r+o,0,1,0,0,t*20,f),u=c.vert(n-a,Sh(n-a,r-o)+.14,r-o,0,1,0,1,t*20,f);d&&(c.tri(d[0],u,d[1]),c.tri(d[0],s,u)),d=[s,u]}for(let[e,t,n]of[[101,-14.5,.4],[98.5,-12,.25]])a.geo(`mound`,Z.sphere(14,8),e,Sh(e,t)-.05,t,`#a8a494`,1.15,.4,.62,0,n,0);let g=Sh(108,-10)-.25,_=`#4a423a`,v=(e,t,n)=>a.rod(`bark`,e,t,n,_,7);a.geo(`bark`,Z.cyl(8,.55),108,g+.35,-10,_,.5,.7,.5);let y=[108.15,g+4.7,-10.1];v([108,g,-10],[108.08,g+2.4,-10.04],.34),v([108.08,g+2.4,-10.04],y,.27);let b=[[106.2,g+7.2,-8.1],[111,g+6.7,-12.2],[108.6,g+7.8,-13.3],[107,g+7.4,-11.4]],x=q(108);b.forEach((e,t)=>{v(y,e,t===3?.12:.16);let n=[e[0]-y[0],e[1]-y[1],e[2]-y[2]];for(let t of[-1,1]){let r=.55+x()*.35,i=[e[0]+n[0]*.3+t*n[2]*r*.5,e[1]+.8+x()*.7,e[2]+n[2]*.3-t*n[0]*r*.5];v(e,i,.065),x()<.6&&v(i,[i[0]+(x()-.5)*.8,i[1]+.35,i[2]+(x()-.5)*.8],.03)}});for(let e of yh){if(e.id===18)continue;let t=e.x+Math.cos(e.face)*58,n=e.z+Math.sin(e.face)*58,r=Sh(t,n)-.2;a.push(0,r,0),jh(a,t,n,e.face,e.id===17),a.pop(),e.hood=[t,r,n]}let S={concrete:new Bo({vertexColors:!0,roughness:.95,metalness:0}),steel:new Bo({vertexColors:!0,roughness:.55,metalness:.65}),path:new Bo({name:`path`,color:`#968f7e`,roughness:1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),mound:new Bo({vertexColors:!0,roughness:1}),bark:new Bo({vertexColors:!0,roughness:1})},C=a.finish(S);C.name=`props`,t.add(C);let w=q(71),T=Ah(),E=[],D=(e,t,n=1)=>{if(t>-3||Math.hypot(e,t)<90&&t>-96||e>-36&&e<-14&&t>-9||Math.abs(e-108)<2.2&&Math.abs(t+10)<2.2)return;let r=Sh(e,t);E.push([e,r,t,n*(.75+w()*.85),w()*6])};for(let e=0;e<175;e++){let e=Math.PI+w()*Math.PI,t=114+w()**1.5*34;D(Math.cos(e)*t,Math.sin(e)*t)}for(let e=0;e<10;e++){let e=Math.PI*(1.5+w()*.45),t=4+w()*9;D(108+Math.cos(e)*t,-11+Math.sin(e)*t,1.15)}for(let e=0;e<64;e++){let e=w()*Math.PI*2,t=114+w()**1.5*36;D(mp[0]+Math.cos(e)*t,mp[1]+Math.sin(e)*t)}for(let e=0;e<28;e++)D(-430+w()*700,-w()*640-5);let O=new Ii(T,new Bo({name:`shrubs`,color:`#4a453c`,roughness:1,vertexColors:!0,side:2}),E.length),k=new $t,A=new kt,j=new un;E.forEach(([e,t,n,r,i],a)=>{k.compose(new U(e,t-.08,n),A.setFromEuler(j.set(0,i,0)),new U(r*1.25,r,r*1.25)),O.setMatrixAt(a,k)}),O.castShadow=!0,O.name=`shrubs`,O.computeBoundingSphere(),t.add(O);let M=q(404),N=[],P=()=>(M()+M()+M()-1.5)/1.5;for(let e=0;e<46;e++){let e=Yd(200+((M()*2-1)*.86+P()*.14)*1720,-1460,1860),t=-5250+(M()-.5)*1100,n=38+Math.exp(-(((e-450)/2400)**2))*(55+M()**.9*118)+M()*18,r=32+M()*55,i=30+M()*45;if(N.push([e,0,t,r,n,i]),M()<.55&&N.length<76){let a=.45+M()*.3,o=Math.min(n*(.12+M()*.22),250-n);N.push([e+(M()-.5)*r*(1-a)*.6,n,t,r*a,o,i*a]),M()<.2&&n+o<222&&N.length<76&&N.push([e,n+o,t,3.5,12+M()*20,3.5])}}for(let[e,t]of[[-2560,-5500],[-2250,-5150],[-1950,-5800],[2250,-5350],[2420,-4800]]){if(N.length>=81)break;N.push([e,0,t,150+M()*110,16+M()*26,70+M()*60])}for(;N.length<81;)N.push([-1500+M()*3500,0,-5600+M()*900,60+M()*80,22+M()*40,50+M()*40]);let F=new Ii(Z.box(),new Bo({name:`skyline`,color:`#7e807a`,roughness:1,vertexColors:!0}),N.length);return N.forEach(([e,t,n,r,i,a],o)=>{k.compose(new U(e,t+i/2-8,n),A.identity(),new U(r,i,a)),F.setMatrixAt(o,k),F.setColorAt(o,new W().setScalar(.88+M()*.24))}),F.name=`skyline`,F.computeBoundingSphere(),t.add(F),e.add(-19.2,3.6,-2.8,16770240,6),t}function Ph(){let e=new On;e.name=`surface-dynamic`;let t=-216.6,n=Sh(-216.6,t),r=new G(new ta(.06,.08,6.5,6),new Bo({color:`#3a3a36`,roughness:.6,metalness:.5}));r.position.set(-217.85,n+3.2,t),e.add(r);let i=new Co(2.4,1.3,14,6).translate(1.2,0,0),a=new G(i,new Bo({name:`flag17`,color:`#3d6b36`,roughness:.95,side:2,alphaMap:tf(Tf(),{srgb:!1,repeat:!1}),alphaTest:.5}));a.position.set(-217.79999999999998,n+5.8,t),a.rotation.y=Math.atan2(.32,1),a.name=`flag17`,a.castShadow=!0;let o=i.attributes.position.array.slice();return e.add(a),{group:e,update:(e,t)=>{let n=i.attributes.position;for(let e=0;e<n.count;e++){let r=o[e*3],i=o[e*3+1],a=r/2.4;n.setZ(e,Math.sin(t*4.5-r*2.6+i*.8)*.28*a+Math.sin(t*7-r*4)*.06*a)}n.needsUpdate=!0,i.computeVertexNormals()}}}var Fh=()=>({matte:J.matte,metal:J.metal,wood:J.wood,fabric:J.fabric,glass:J.glass,glow:J.glow,foliage:J.foliage,water:J.water,concrete:J.concrete,trim:J.trim,rock:J.rock}),Ih=`#a39d91`,Lh=class{constructor(e,t=.55){this.name=e,this.atlas=new yf(2048,2048),this.batch=new Pp,this.emissive=t}make(e,t){return this.atlas.add(e,t)}custom(e,t,n){return this.atlas.custom(e,t,n)}place(e,t,n,r,i,a=0,o=0){let s=i*e.aspect,c=new $t().compose(new U(t,n,r),new kt().setFromEuler(new un(o,a,0,`YXZ`)),new U(1,1,1)),l=new U(0,0,1).transformDirection(c),u=new W(1,1,1),d=(e,t)=>new U(e,t,0).applyMatrix4(c),f=d(-s/2,-i/2),p=d(s/2,-i/2),m=d(s/2,i/2),h=d(-s/2,i/2),g=this.batch.vert(f.x,f.y,f.z,l.x,l.y,l.z,e.U0,e.V0,u),_=this.batch.vert(p.x,p.y,p.z,l.x,l.y,l.z,e.U1,e.V0,u),v=this.batch.vert(m.x,m.y,m.z,l.x,l.y,l.z,e.U1,e.V1,u),y=this.batch.vert(h.x,h.y,h.z,l.x,l.y,l.z,e.U0,e.V1,u);return this.batch.tri(g,_,v),this.batch.tri(g,v,y),s}mesh(){if(this.batch.empty)return new On;let e=new G(this.batch.build(),Of(this.atlas.texture(),this.emissive));return e.name=`${this.name}/signs`,e.material.polygonOffset=!0,e.material.polygonOffsetFactor=-2,e.receiveShadow=!0,e}};function Rh(e,t,n,r,i,a,o=0,s=1.5,c=`screen`){let l=new G(new Co(i,a),kf(e,s));return l.position.set(t,n,r),l.rotation.y=o,l.name=c,l}var zh=null;function Bh(){return zh||=tf(bf(1024,256),{repeat:!1}),zh}var Q={table(e,t,n,r,i=0,{w:a=1.8,d:o=.9,h:s=.75,top:c=`#8a7e6a`,leg:l=`#393b3a`,mat:u=`matte`}={}){e.push(t,n,r,i),e.box(u,0,s-.03,0,a,.06,o,c);let d=a/2-.08,f=o/2-.08;for(let[t,n]of[[-d,-f],[d,-f],[-d,f],[d,f]])e.box(`metal`,t,(s-.06)/2,n,.05,s-.06,.05,l);e.pop()},roundTable(e,t,n,r,{r:i=.6,h:a=.75,top:o=`#8a7e6a`,leg:s=`#393b3a`,mat:c=`matte`}={}){e.cyl(c,t,n+a-.05,r,i,.05,o,16),e.cyl(`metal`,t,n,r,.05,a-.05,s,6),e.cyl(`metal`,t,n,r,i*.45,.04,s,10)},chair(e,t,n,r,i=0,{color:a=`#3b3f3e`,mat:o=`matte`,h:s=.45}={}){e.push(t,n,r,i),e.box(o,0,s,0,.44,.05,.42,a),e.box(o,0,s+.3,-.19,.44,.5,.05,a);for(let[t,n]of[[-.19,-.18],[.19,-.18],[-.19,.18],[.19,.18]])e.box(`metal`,t,s/2,n,.035,s,.035,`#2a2c2d`);e.pop()},stool(e,t,n,r,{color:i=`#6a4b32`,h:a=.5,r:o=.2}={}){e.cyl(`matte`,t,n+a-.05,r,o,.05,i,10),e.cyl(`metal`,t,n,r,.03,a-.05,`#2a2c2d`,5)},crtDesk(e,t,n,r,i=0,{desk:a=`#5c5f5b`,body:o=`#cfc8b4`,screen:s=`#86e39a`,w:c=1.5,d:l=.75,power:u=2.2,chair:d=!0}={}){e.push(t,n,r,i),e.box(`matte`,0,.73,0,c,.05,l,a),e.box(`matte`,-c/2+.05,.36,0,.05,.72,l-.05,a),e.box(`matte`,c/2-.05,.36,0,.05,.72,l-.05,a),e.box(`matte`,0,.99,-.12,.46,.42,.44,o),e.box(`matte`,0,.96,-.36,.34,.3,.2,o),e.box(`glow`,0,1,.105,.34,.26,.01,X(s,u)),e.box(`matte`,0,.77,.22,.42,.03,.15,`#bdb6a2`),e.pop(),d&&Q.chair(e,t+Math.sin(i)*.75,n,r+Math.cos(i)*.75,i+Math.PI,{color:`#34383a`})},cabinet(e,t,n,r,i=0,{w:a=.6,h:o=1.3,d:s=.6,color:c=`#6b6f6a`,drawers:l=3}={}){e.push(t,n,r,i),e.box(`metal`,0,o/2,0,a,o,s,c);for(let t=0;t<l;t++){let n=o/l*(t+.5);e.box(`metal`,0,n,s/2+.01,a*.86,o/l-.06,.02,X(c,1.08)),e.box(`metal`,0,n+.08,s/2+.03,a*.3,.03,.03,`#cfcfc8`)}e.pop()},locker(e,t,n,r,i=0,{w:a=.55,h:o=1.8,d:s=.5,color:c=`#56706c`}={}){e.push(t,n,r,i),e.box(`metal`,0,o/2,0,a,o,s,c);for(let t=0;t<4;t++)e.box(`metal`,0,o-.15-t*.05,s/2+.005,a*.6,.02,.01,`#2e3a38`);e.box(`metal`,a*.3,o*.55,s/2+.02,.04,.12,.03,`#c9c9c0`),e.pop()},bed(e,t,n,r,i=0,{blanket:a=`#b9c2bd`,frame:o=`#5b605c`,w:s=1,l:c=2,iron:l=!1}={}){e.push(t,n,r,i),e.box(l?`metal`:`matte`,0,.3,0,s,.12,c,o),e.box(`fabric`,0,.44,0,s-.06,.16,c-.06,`#e9e6de`),e.box(`fabric`,0,.53,.2,s-.02,.05,c*.62,a),e.box(`fabric`,0,.56,-c/2+.3,s*.7,.1,.34,`#f4f2ec`);for(let[t,n]of[[-s/2+.04,-c/2+.04],[s/2-.04,-c/2+.04],[-s/2+.04,c/2-.04],[s/2-.04,c/2-.04]])e.box(`metal`,t,.15,n,.05,.3,.05,`#2d2f2f`);l&&(e.box(`metal`,0,.7,-c/2,s,.05,.05,o),e.box(`metal`,-s/2,.45,-c/2,.05,.6,.05,o),e.box(`metal`,s/2,.45,-c/2,.05,.6,.05,o)),e.pop()},pendant(e,t,n,r,{drop:i=1.2,color:a=`#fff0d2`,power:o=5,shade:s=`#2e3130`,r:c=.28}={}){e.cyl(`metal`,t,n-i,r,.012,i,`#1e1f20`,4),e.geo(`metal`,Z.cone(12),t,n-i-.08,r,s,c,.26,c,Math.PI,0,0),e.sphere(`glow`,t,n-i-.2,r,.1,X(a,o),8,6)},floorLamp(e,t,n,r,{h:i=2.6,r:a=.22,color:o=`#fff4de`,power:s=6}={}){e.cyl(`metal`,t,n,r,.18,.08,`#2d2f2f`,10),e.cyl(`glow`,t,n+.5,r,a,i-.5,X(o,s),12),e.cyl(`metal`,t,n+i,r,a+.03,.06,`#2d2f2f`,12)},sconce(e,t,n,r,i=0,{color:a=`#ffdcae`,power:o=5}={}){e.push(t,n,r,i),e.box(`metal`,0,0,.05,.22,.34,.1,`#6d5a3a`),e.geo(`glow`,Z.cyl(10),0,.05,.16,X(a,o),.09,.22,.09),e.pop()},panelLight(e,t,n,r,i=1.4,a=.5,{color:o=`#f4f2ea`,power:s=2.8}={}){e.box(`metal`,t,n+.03,r,i+.1,.06,a+.1,`#58595a`),e.box(`glow`,t,n-.01,r,i,.02,a,X(o,s))},tube(e,t,n,r,i,a=0,{color:o=`#eef6ff`,power:s=3.2}={}){e.push(t,n,r,a),e.box(`metal`,0,.06,0,i+.1,.06,.2,`#58595a`),e.cylR(`glow`,0,0,0,.045,i,X(o,s),0,0,Math.PI/2,8),e.pop()},crate(e,t,n,r,i=.7,a=`#8b6a43`,o=0){e.box(`matte`,t,n+i/2,r,i,i,i,a,o),e.box(`matte`,t,n+i/2,r,i+.02,i*.16,i+.02,X(a,.8),o)},barrel(e,t,n,r,{r:i=.36,h:a=.95,color:o=`#5a6468`,mat:s=`metal`}={}){e.cyl(s,t,n,r,i,a,o,14),e.geo(s,Z.torus(.06,5,16),t,n+a*.28,r,X(o,.8),i,i,i,Math.PI/2,0,0),e.geo(s,Z.torus(.06,5,16),t,n+a*.72,r,X(o,.8),i,i,i,Math.PI/2,0,0)},sack(e,t,n,r,i=.45,a=`#b59a6a`){e.geo(`fabric`,Z.sphere(10,7),t,n+i*.55,r,a,i*.8,i*.6,i*.65)},plant(e,t,n,r,i=.5,{pot:a=`#8a5a3c`,leaf:o=`#4d8f46`}={}){e.cyl(`matte`,t,n,r,i*.45,i*.6,a,10,1.2),e.ico(`foliage`,t,n+i*.85,r,i*.55,o,0,.9,t+r)},tree(e,t,n,r,{h:i=2.6,r:a=1.2,trunk:o=`#6a4a30`,leaf:s=`#4f9a48`,fruit:c=null,seed:l=1}={}){if(e.cyl(`matte`,t,n,r,.12,i*.6,o,6,.7),[[0,i*.72,0,1],[a*.45,i*.62,a*.2,.7],[-a*.4,i*.66,-a*.25,.72],[a*.1,i*.86,-a*.3,.62]].forEach(([i,o,c,u],d)=>e.ico(`foliage`,t+i,n+o,r+c,a*u,X(s,.9+(l+d)%3*.08),1,.85,l+d)),c)for(let o=0;o<7;o++){let s=o/7*Math.PI*2+l;e.ico(`matte`,t+Math.cos(s)*a*.85,n+i*.6+o%3*.3,r+Math.sin(s)*a*.85,.09,c,0)}},figure(e,t,n,r,i=0,{suit:a=`#e7e4db`,visor:o=`#2b3336`,trim:s=`#b9b4a6`}={}){e.push(t,n,r,i);for(let t of[-1,1])e.cyl(`fabric`,t*.13,0,0,.11,.86,a,10),e.box(`fabric`,t*.13,.05,.04,.18,.1,.3,s),e.geo(`fabric`,Z.cyl(10),t*.36,1.2,0,a,.085,.62,.085,0,0,t*.12),e.sphere(`fabric`,t*.4,.88,.02,.09,s,8,6);e.geo(`fabric`,Z.cyl(14),0,1.22,0,a,.27,.72,.2),e.sphere(`fabric`,0,1.58,0,.27,a,14,10,.7),e.box(`fabric`,0,1.25,-.24,.34,.46,.14,s),e.sphere(`fabric`,0,1.86,0,.21,a,14,10),e.geo(`glass`,Z.sphere(12,8),0,1.87,.08,X(o),.17,.12,.13),e.geo(`matte`,Z.sphere(12,8),0,1.87,.1,X(o),.15,.1,.1),e.pop()},roundDoor(e,t,n,r,i=0,{r:a=1.65,color:o=`#23272a`}={}){e.push(t,n,r,i),e.geo(`metal`,Z.torus(.14,8,32),0,0,0,`#3a3f42`,a+.1,a+.1,a+.1,0,Math.PI/2,0),e.geo(`metal`,Z.cyl(32),0,0,0,o,a,.3,a,0,0,Math.PI/2);for(let t=0;t<8;t++){let n=t/8*Math.PI*2;e.geo(`metal`,Z.box(),.18,Math.sin(n)*a*.5,Math.cos(n)*a*.5,`#4d5357`,.08,.12,a*.95,n,0,0)}e.geo(`metal`,Z.cyl(16),.22,0,0,`#62686b`,.32,.1,.32,0,0,Math.PI/2),e.pop()},railing(e,t,n=1,{color:r=`#2a2c2e`,posts:i=1.2,r:a=.03}={}){for(let o=0;o<t.length-1;o++){let s=t[o],c=t[o+1];e.rod(`metal`,[s[0],s[1]+n,s[2]],[c[0],c[1]+n,c[2]],a,r,5),e.rod(`metal`,[s[0],s[1]+n*.5,s[2]],[c[0],c[1]+n*.5,c[2]],a*.7,r,4);let l=Math.hypot(c[0]-s[0],c[2]-s[2]),u=Math.max(1,Math.round(l/i));for(let t=0;t<=u;t++){let i=t/u,o=s[0]+(c[0]-s[0])*i,l=s[1]+(c[1]-s[1])*i,d=s[2]+(c[2]-s[2])*i;e.rod(`metal`,[o,l,d],[o,l+n,d],a*.8,r,4)}}},shelf(e,t,n,r,i=0,{w:a=1.6,h:o=2.2,d:s=.5,levels:c=4,color:l=`#4d4f4e`,items:u=null,rng:d=Math.random,fill:f=.8,palette:p=[`#b5372e`,`#4f8a4a`,`#d8b04a`,`#3e6a8a`,`#c9c3b2`]}={}){e.push(t,n,r,i);for(let t of[-1,1])e.box(`metal`,a/2*t,o/2,0,.05,o,s,l);for(let t=0;t<c;t++){let n=.12+t*(o-.2)/(c-1||1);if(e.box(`metal`,0,n,0,a,.04,s,l),t===c-1&&c>1)continue;let r=-a/2+.06;for(;r<a/2-.1;){let t=.12+d()*.22;if(d()<f){let i=.12+d()*.28,a=u?u(d):p[Math.floor(d()*p.length)];e.box(`matte`,r+t/2,n+.02+i/2,(d()-.5)*.1,t*.9,i,s*(.5+d()*.4),a)}r+=t+.02}}e.pop()},archFrame(e,t,n,r,i=0,{w:a=1.4,h:o=2.4,color:s=`#d8d4c8`,depth:c=.35,t:l=.14}={}){let u=new Pa;u.curves=Rp(a+l*2,o+l).curves,u.holes.push(Rp(a,o)),e.geo(`matte`,Lp(u,c,!1,12),t,n,r-c/2,s,1,1,1,0,i,0)},archDoor(e,t,n,r,i=0,{w:a=1.1,h:o=2.2,color:s=`#3a3d3c`,frame:c=`#cfc9bc`}={}){let l=new Pa;l.curves=Rp(a+.24,o+.12).curves,l.holes.push(Rp(a,o)),e.geo(`matte`,Lp(l,.1,!1,10),t,n,r,c,1,1,1,0,i,0),e.geo(`matte`,Lp(Rp(a,o),.05,!1,10),t,n,r+.01,s,1,1,1,0,i,0)},roundRect(e,t,n,r,i,a,o,s,c,l,u=0){e.geo(t,Lp(zp(a,o,s),c,!1,8),n,r,i,l,1,1,1,0,u,0)}};function Vh(e,{s:t,y0:n,x0:r=26,x1:i=75,back:a=13,h:o=7,wall:s=`#8f8a7e`,floor:c=null,ceiling:l=null,door:u=[-1.2,-4.4],wainscot:d=null,innerWall:f=!0,backWall:p=!0}){let m=e=>t*e,h=Math.sqrt(Math.max(0,5625-a*a)),g=Math.min(i,h+.2);if(p&&(e.bb(`matte`,m(r),n,-a-.3,m(g),n+o,-a,s),d&&e.bb(`matte`,m(r+.3),n,-a+.02,m(g),n+1.1,-a+.06,d)),f){let[t,i]=u;e.bb(`matte`,m(r-.3),n,i,m(r),n+o,-a-.3,s),e.bb(`matte`,m(r-.3),n+2.6,t,m(r),n+o,i,s),e.bb(`matte`,m(r-.3),n,t,m(r),n+o,0,s),e.bb(`matte`,m(r-.32),n,-.05,m(r+.02),n+o,0,Ih),d&&e.bb(`matte`,m(r+.02),n,i,m(r+.05),n+1.1,-a,d)}return c&&e.bb(`matte`,m(r),n,-a,m(g),n+.02,0,c),l&&e.bb(`matte`,m(r),n+o-.12,-a,m(g),n+o,0,l),{X:m,xEnd:g}}var Hh=`#686655`,Uh=`#282421`,Wh=[`#6b5238`,`#7a5f3e`,`#5e4630`,`#85643f`],Gh=[`#3e3126`,`#46382a`,`#352a20`],Kh=[`#7a5f3e`,`#6b5a3a`,`#5e6446`,`#8b6a43`,`#6f6a5c`,`#57604a`,`#454a47`,`#3d4240`],qh=[`#4d8f46`,`#5aa84e`,`#3f7f3a`,`#6aaa4f`],Jh=`#ffd9a0`,Yh=null,Xh=(e={})=>({...Fh(),glow:Yh,...e});function Zh({pool:e}){Yh=new pi({name:`silo17-glow`,vertexColors:!0});let t=new On;t.name=`silo17`;let n=new On;n.name=`silo17/dyn`,t.visible=n.visible=!1;let r=[],i={pool:e,group:t,dyn:n,updaters:r};t.add(ng(i),og(),cg(),lg(i),dg(i),bg(i),Sg()),yg(i);let a=!1;return{group:t,dyn:n,update(e,t){if(a)for(let n of r)n(e,t)},setActive(e){a=!!e,t.visible=n.visible=a}}}var Qh=(e,t,n,r)=>[Xd(e[0],t[0],r),Xd(e[1],t[1],r)-4*n*r*(1-r),Xd(e[2],t[2],r)];function $h(e,t,n,r,{r:i=.016,color:a=Uh,seg:o=8}={}){let s=t;for(let c=1;c<=o;c++){let l=Qh(t,n,r,c/o);e.rod(`matte`,s,l,i,a,4),s=l}}function eg(e,t,n,r,i=`matte`){for(let a=1;a<t.length;a++)e.rod(i,t[a-1],t[a],n,r,4)}function tg(e,t,n,r,i){let a=e.batch(`tarp`),o=X(i).clone(),s=[];for(let e=0;e<=r;e++)for(let i=0;i<=n;i++)s.push(new U(...t(i/n,e/r)));let c=(e,t)=>s[Math.min(r,Math.max(0,t))*(n+1)+Math.min(n,Math.max(0,e))],l=new U,u=new U,d=new U,f=a.n;for(let e=0;e<=r;e++)for(let t=0;t<=n;t++){l.subVectors(c(t+1,e),c(t-1,e)),u.subVectors(c(t,e+1),c(t,e-1)),d.crossVectors(l,u).normalize();let i=c(t,e);a.vert(i.x,i.y,i.z,d.x,d.y,d.z,t/n,e/r,o)}for(let e=0;e<r;e++)for(let t=0;t<n;t++){let r=f+e*(n+1)+t,i=r+n+1;a.tri(r,r+1,i+1),a.tri(r,i+1,i)}}function ng({dyn:e,updaters:t}){let n=new Fp(`silo17/camp`),r=Y(18),i=r+3.25,a=q(1718),o=-dp+.16,s=()=>X(Hh,.8+a()*.3).clone(),c=0,l=(e,t,i,a,o,s,l=0,u=r)=>(n.box(`matte`,e,u+a/2,t,i,a,o,s,l),c++,u+a),u=(e,t,i)=>{let o=a()<.3;return n.cyl(o?`metal`:`wood`,e,r,t,o?.035:.045,i,o?`#3a3d3c`:a.pick(Gh),6),n.box(`matte`,e,r+.05,t,.24,.1,.24,`#57534b`,a()*.6),n.box(`matte`,e,r+i-.1,t,.1,.12,.1,Uh),[e,r+i-.1,t]},d=(e,t,i,o,c,l)=>{let u=i/2+.03,d=o/2+.03,f=Math.min(c-r-.08,.28+a()*.3),p=Math.cos(l),m=Math.sin(l),h=a()*6;tg(n,(n,r)=>{let i=(n*2-1)*(u+f),a=(r*2-1)*(d+f),o=Math.max(0,Math.abs(i)-u),s=Math.max(0,Math.abs(a)-d),l=Math.max(o,s),g=Math.sign(i)*(Math.min(Math.abs(i),u)+o*.15),_=Math.sign(a)*(Math.min(Math.abs(a),d)+s*.15),v=c+.02-l+(l>0?.04*Math.sin(n*17+r*11+h):.015*Math.sin(n*9+h));return[e+g*p+_*m,v,t-g*m+_*p]},14,12,s())},f=(e,t,r,i)=>{n.rod(`matte`,[e,t,r],[e,i+.12,r],.006,`#1f1c1a`,3),n.geo(`metal`,Z.cyl(10,.35),e,i+.06,r,`#2f3130`,.2,.12,.2),n.cyl(`glow`,e,i-.006,r,.13,.012,X(Jh,1.25),10)},p=(e,t,i,a)=>{let o=r+1.45;for(let a=0;a<3;a++){let s=i+.4+a*Math.PI*2/3;n.rod(`metal`,[e+Math.cos(s)*.55,r,t+Math.sin(s)*.55],[e,o-.4,t],.02,`#2b2d2c`,5)}n.rod(`metal`,[e,o-.45,t],[e,o-.05,t],.028,`#2b2d2c`,6);let s=Math.sin(a),c=Math.cos(a);n.push(e,o+.18,t,i),n.box(`metal`,0,0,0,.46,.4,.26,`#3b3f3e`,0,a),n.box(`metal`,0,.02*c+.17*s,.02*s-.17*c,.38,.3,.1,`#2b2e2d`,0,a),n.box(`glow`,0,-.14*s,.14*c,.38,.32,.02,X(Jh,1.6),0,a);for(let e of[-1,1])n.rod(`metal`,[e*.27,-.22,0],[e*.27,.02,0],.018,`#2d2f2f`,4);n.rod(`metal`,[-.27,-.22,0],[.27,-.22,0],.018,`#2d2f2f`,4),n.pop()},m=(r,i,a)=>{let o=.6,s=.18,c=i+o/2,l=a+s/2;n.box(`metal`,r,c,a,o,o,s,`#3a3930`),n.box(`matte`,r,c,l+.002,.53,.53,.004,`#191916`),n.geo(`metal`,Z.torus(.05,4,28),r,c,l+.035,`#262621`,.26,.26,.26);for(let e of[-1,1])n.rod(`metal`,[r+e*.26,c,l+.035],[r,c,l+.035],.006,`#262621`,3);for(let e of[-1,1])n.box(`metal`,r+e*.2,i+.015,a,.07,.03,.3,`#262621`);let u=new Fp(`silo17/fanBlades`);for(let e=0;e<3;e++){let t=Math.PI/2+e*Math.PI*2/3;u.box(`matte`,Math.cos(t)*.115,Math.sin(t)*.115,0,.21,.08,.012,`#dcd9cd`,0,0,t)}u.sphere(`metal`,0,0,.008,.035,`#2a2a26`,8,6);let d=u.finish(Xh());d.position.set(r,c,l+.018),e.add(d),t.push(e=>{d.rotation.z-=Math.min(e,.1)*1.9})};{let e=-25.95,t=-9.1;p(e,t,-Math.PI/2+.28,.12);let i=-28.6,a=-10.7;n.box(`metal`,i,r+.35,a,.9,.7,.6,`#5b4a2e`),n.box(`metal`,i,r+.74,a,.6,.08,.4,`#2d2f2f`),n.box(`glow`,-28.8,r+.5,-10.389999999999999,.06,.06,.02,X(`#9dff8a`,1.6)),eg(n,[[-28.400000000000002,r+.3,-10.399999999999999],[-28.3,r+.02,-9.799999999999999],[-26.25,r+.02,-9.7],[e,r+.5,t]],.015,`#1c1c1c`),l(-28.2,-7.95,1.5,.95,1,`#8f5c38`,.04),l(-27.45,-10.92,.9,.42,.6,`#5a8480`,.08,l(-27.4,-10.9,1.1,.55,.7,`#4a7472`,-.03)),l(-25.9,-10.85,1.1,.9,.7,`#36383a`,.02)}l(-37.5,-4.95,2.6,1.1,.9,`#8f5c38`,.03),l(-40.78,-3.3,.85,.85,.85,`#9aad4a`,-.12),l(-37.85,-12.3,.6,.6,.6,`#36383a`,.1),m(-35.75,l(-35.75,-7.05,.75,.7,.55,`#7a5a3a`,.05),-7.05),l(-56.4,-9.6,1.75,1.2,.88,`#4a4c44`,.02);for(let e of[-1,1])l(-56.4+e*1.02,-9.6+e*.02,.3,1.28,.94,`#272923`,.02);n.cyl(`matte`,-52.62,l(-52.7,-5.4,.85,.95,.85,`#4f5a4f`,.06),-5.38,.09,.2,`#cfc9b4`,10);{let e=-64.1,t=[];for(;e<-61.3;){let n=.6+a()*.25;if(e+n>-60.95)break;let i=e+n/2,o=r;for(let e=0,t=1+Math.floor(a()*3);e<t;e++)o=l(i+(a()-.5)*.06,-12.1+(a()-.5)*.06,n*(1-e*.1),n*.8,n*(1-e*.1),a.pick(Kh),(a()-.5)*.2,o);t.push([i,o,n]),e+=n+.12}let[n,i,o]=t.reduce((e,t)=>t[1]<e[1]?t:e);d(n,-12.1,o,o,i,.05),d(-65.1,-10.3,.8,.7,l(-65.08,-10.3,.65,.5,.6,`#57604a`,-.05,l(-65.1,-10.3,.8,.6,.7,`#6f6a5c`,.1)),.1)}let h=[[[-32.4,-9.3],[-29.6,-9.1],[-27.55,-9.25]],[[-40.9,-9.15],[-37.6,-9.35],[-34,-9.2]],[[-49.05,-9.2],[-45.7,-9.35],[-42.6,-9.1]],[[-54.8,-9.2],[-51,-9.25]],[[-65.6,-9.2],[-62.5,-9.3],[-59.2,-9.1]]].map(e=>e.map(([e,t])=>u(e,t,2.4+a()*.3)));for(let e of h){for(let t=1;t<e.length;t++)$h(n,e[t-1],e[t],.14+a()*.12);for(let t of[e[0],e[e.length-1]])$h(n,t,[t[0]+(a()-.5)*.6,i-.02,o+.05],.06,{seg:5})}for(let[e,t,r,i]of[[-30.6,-3.2,0,1],[-37.5,-2.4,1,1],[-45.55,-5.65,2,1],[-53.9,-3.6,3,0],[-61.5,-3,4,1]])$h(n,u(e,t,2.3+a()*.3),h[r][i],.2+a()*.15);[[-37.5,1717],[-46,1718]].forEach(([e,t],i)=>{let s=tf(wf(384,256,t),{repeat:!1}),c=1.65,l=1.1,u=r+1.5,d=new G(new Co(c,l),new Bo({name:`silo17-drawings`,map:s,emissiveMap:s,emissive:16777215,emissiveIntensity:.22,roughness:.9,transparent:!0,alphaTest:.03}));d.position.set(e,u,o+.02),d.name=`silo17/drawings${i}`,d.receiveShadow=!0,n.mesh(d);for(let[t,r]of[[65,16],[189,18],[313,15],[65,136],[189,138]])n.sphere(`matte`,e-c/2+t/384*c,u+l/2-r/256*l,o+.04,.018,a.pick([`#c0392b`,`#e0b030`,`#2e86c1`]),6,4)});let g=(e,t,i,o)=>{let s=t-e,c=(e+t)/2;n.box(`wood`,c,r+.16,i,s,.32,.82,`#6b4a32`),n.box(`wood`,c,r+.33,i,s+.06,.03,.88,`#5e4630`),n.box(`matte`,c,r+.325,i,s-.1,.02,.72,`#2e2219`);for(let t=0;t<o;t++){let c=e+.35+(t+.5)/o*(s-.7)+(a()-.5)*.15,l=.2+a()*.1;n.ico(`foliage`,c,r+.36+l*.45,i+(a()-.5)*.3,l,a.pick(qh),0,.75,a()*6),a()<.6&&n.ico(`foliage`,c+(a()-.5)*.2,r+.38+l*.6,i+(a()-.5)*.3,l*.7,a.pick(qh),0,.9,a()*6)}};g(-49,-45.2,-7,5),g(-44.2,-42.7,-7,2),g(-54.2,-51.3,-7.1,5);for(let[e,t]of[[-48.3,-7],[-46.9,-7.05],[-43.45,-7],[-53.2,-7.1],[-51.8,-7.1]])f(e,i,t,r+2.1);{let e=-47.9,t=-8.6;n.cyl(`matte`,e,r,t,.22,.92,`#7a4226`,12,1.25),n.cyl(`matte`,e,r+.9,t,.3,.07,`#693820`,12),n.cyl(`matte`,e,r+.93,t,.26,.02,`#2e2219`,12),n.ico(`foliage`,e,r+1.18,t,.34,`#3f7f3a`,0,.8,1.3),n.ico(`foliage`,-47.78,r+1.36,-8.65,.22,`#4d8f46`,0,.9,2.1),l(-46.6,-8.5,.6,.55,.6,`#8f5c38`,.2)}let _=new Bo({name:`silo17-tarp`,vertexColors:!0,roughness:.96,metalness:0,side:2}),v=n.finish(Xh({tarp:_}));return v.userData.boxes=c,v}var rg=Math.PI*.5;function ig(e,t){let n=-(Math.atan2(t,e)-rg)/(Math.PI*2);return n-=Math.floor(n),n*pm+1}var ag=`#857657`;function og(){let e=new Fp(`silo17/ropeBridge`),t=q(1919),n=Y(20),r=1.5*Math.PI+.55,i=Math.cos(r)*15,a=Math.sin(r)*15,o=(e,t)=>[i-Math.cos(r)*e+Math.sin(r)*t,a-Math.sin(r)*e-Math.cos(r)*t],s=(e,t)=>ig(...o(e,t))+pm,c=15-op,l=1.05,u=s(c,0)+.03,d=e=>{let t=e/c;return l+(u-l)*t-1.6*t*(1-t)};e.push(i,n,a,Math.PI-r);let f=.06,p=(c-.12)/36;for(let n=0;n<36;n++){if(n===13||n===27)continue;let r=f+(n+.5)*p,i=Math.atan2(d(r+.05)-d(r-.05),.1),a=n===21;e.box(`wood`,r,d(r)-.025,a?-.28:(t()-.5)*.05,p-.05,.045,a?.6:1.12+(t()-.5)*.1,t.pick(Wh),(t()-.5)*.08,0,i)}for(let t of[-1,1]){let n=[[-1,.3,t*.8],[-.38,1.05,t*.66],[.04,1.05,t*.56]];for(let e=0;e<=24;e++){let r=.06+e/24*(c-.1);n.push([r,d(r)-.06,t*.52])}eg(e,n,.018,ag)}for(let t of[-1,1])e.cyl(`wood`,-1,0,t*.8,.07,2.1,Wh[0],7),e.box(`metal`,-1,.02,t*.8,.3,.04,.3,`#3a3d3c`),e.rod(`matte`,[-1,1.95,t*.8],[-3.7,.02,t*.7],.016,ag,4),e.box(`metal`,-3.7,.02,t*.7,.16,.04,.16,`#3a3d3c`);e.box(`wood`,-.7,.22,0,.45,.44,.9,`#6b5238`);for(let t of[-1,1]){let n=c+.45,r=s(n,t*.7)-1.05;e.cyl(`wood`,n,r,t*.7,.06,2.05,Wh[2],7),e.box(`fabric`,n-.25,s(c+.2,t*.7)+.07,t*.7,.34,.14,.28,`#7d6f55`);let i=[-1,2,t*.8],a=[n,r+1.95,t*.7];$h(e,i,a,.3,{seg:18,r:.02,color:ag});for(let n=2;n<36;n+=4){let r=f+(n+.5)*p,o=Qh(i,a,.3,(r-i[0])/(a[0]-i[0]));e.rod(`matte`,[r,o[1],o[2]],[r,d(r)-.02,t*.55],.01,ag,3)}}e.pop();let m=Y(19),h=4*Math.PI/3;e.push(Math.cos(h)*15,m,Math.sin(h)*15,Math.PI-h),e.box(`concrete`,.75,-.3,0,1.5,.48,3,`#bdb8ac`,0,0,-.04),e.box(`concrete`,1.72,-.4,-.75,.62,.42,1.2,`#b3ada1`,.12,.05,-.2),e.box(`concrete`,1.62,-.38,.85,.5,.4,.9,`#b8b2a6`,-.1,-.04,-.14),e.box(`concrete`,.42,.27,-1.38,.84,.66,.24,`#c4bfb3`,0,0,-.05),e.box(`concrete`,.3,.12,1.38,.6,.36,.24,`#c4bfb3`,.1);for(let n=0;n<9;n++){let r=-1.3+n*.32+(t()-.5)*.1,i=1.5+t()*.35,a=-.32+(t()-.5)*.2;e.rod(`metal`,[i-.3,a,r],[i+.4+t()*.7,a-.2-t()*.8,r+(t()-.5)*.4],.014,`#6b4a35`,4)}for(let n=0;n<4;n++){let r=-1.1+n*.75+(t()-.5)*.2,i=1.45+t()*.3,a=.9+t()*1.3,o=[i+.25+t()*.3,-.45-a,r+(t()-.5)*.3];e.rod(`metal`,[i,-.4,r],o,.016,`#6b4a35`,4),e.ico(`concrete`,o[0],o[1]-.12,o[2],.22+t()*.2,`#b3ada1`,0,.75,t()*6)}e.cyl(`matte`,-1.4,.004,0,1.3,.012,`#35302b`,20);for(let n=0;n<10;n++)e.ico(`concrete`,-.6-t()*2.5,.08,(t()-.5)*3,.08+t()*.14,`#aca79b`,0,.6,t()*6);return e.pop(),e.finish(Xh())}function sg(e,t=1280,n=256,r=1717){let i=q(r),a=ef(t,n),o=a.getContext(`2d`);o.fillStyle=`#1a1a18`,o.fillRect(0,0,t,n);for(let e=0;e<900;e++){let e=i()<.5?i()*.1:1-i()*.1,r=(i()<.5?e:i())*t,a=(i()<.5?i():e)*n;o.fillStyle=`rgba(150,145,130,${i()*.06})`,o.fillRect(r,a,2,2)}let s=[128,52,42],c=n*.84;o.font=`900 ${c}px Impact, "Arial Black", "Helvetica Neue", Arial, sans-serif`,o.textAlign=`center`,o.textBaseline=`alphabetic`;let l=[...e],u=c*.12,d=l.map(e=>o.measureText(e).width||c*.5),f=d.reduce((e,t)=>e+t,0)+u*(l.length-1),p=Math.min(1.3,Math.max(.75,t*.36/f)),m=n*.75,h=[],g=t*.518-f*p/2;l.forEach((e,t)=>{let n=d[t]*p,r=g+n/2,a=m+(i()-.5)*6;o.save(),o.translate(r,a),o.rotate((i()-.5)*.05),o.scale(p,1),o.shadowColor=`rgba(${s.join(`,`)},0.35)`,o.shadowBlur=5,o.fillStyle=`rgb(${s.join(`,`)})`,o.fillText(e,0,0),o.restore(),h.push([r,a,n]),g+=n+u*p});for(let[e,t,n]of h){for(let r=0;r<3;r++){let r=e+(i()-.5)*n*.8,a=t-4,c=12+i()*40,l=o.createLinearGradient(0,a,0,a+c);l.addColorStop(0,`rgba(${s.join(`,`)},0.8)`),l.addColorStop(1,`rgba(${s.join(`,`)},0)`),o.fillStyle=l,o.fillRect(r,a,2+i()*2,c)}for(let r=0;r<220;r++){let r=i()*Math.PI*2,a=Math.sqrt(i());o.fillStyle=`rgba(${s.join(`,`)},${i()*.12})`,o.fillRect(e+Math.cos(r)*a*n*.8,t-c*.36+Math.sin(r)*a*c*.5,1.6,1.6)}}return a}function cg(){let e=tf(sg(`WHY?`),{repeat:!1}),t=new G(new Co(22,4.4),new pi({name:`silo17-graffiti`,map:e}));return t.position.set(45,-4.6,-23.8),t.name=`silo17/graffiti`,t}function lg({pool:e,group:t,dyn:n,updaters:r}){let i=new Fp(`silo17/loneTree`),a=Y(73),o=a+7,s=q(7317),c=a+1,l=-20.2,u=83.6/2,d=-40.95/2,f=`#26282c`;i.bb(`wood`,39.75,a,-22.6,43.85,c-.04,-18.35,`#5e4630`);for(let e=1;e<4;e++)i.bb(`wood`,39.74,a+e*.24,-22.610000000000003,43.86,a+e*.24+.025,-18.34,`#4e3a28`);i.bb(`wood`,39.7,c-.06,-22.650000000000002,43.9,c,-18.3,`#6b5238`),i.bb(`matte`,39.83,c-.05,-22.520000000000003,43.77,c+.01,-18.43,`#2e2219`);for(let e=0;e<9;e++){let t=e/9*Math.PI*2+s()*.4;i.ico(`rock`,41+Math.cos(t)*.75,c+.04,l+Math.sin(t)*.75,.1+s()*.06,`#7d776b`,0,.7,s()*6)}let p=c+3.5;i.cyl(`wood`,41,c,l,.2,p-c,`#4d3523`,8,.55);for(let e=0;e<5;e++){let t=e/5*Math.PI*2+.4;i.rod(`wood`,[41,c+.3,l],[41+Math.cos(t)*.62,c+.02,l+Math.sin(t)*.62],.06,`#45301f`,5)}[[0,5.25,0,1.4],[1.1,4.95,.35,1.05],[-1.05,5,-.3,1.1],[.35,5.7,-.5,.9],[-.5,4.75,.65,.9],[.55,4.7,-.95,.85],[-.2,5.75,.6,.8]].forEach(([e,t,n,r],o)=>{o&&i.rod(`wood`,[41,c+2.6+o*.1,l],[41+e*.8,a+t-.4,l+n*.8],.06,`#4d3523`,5),i.ico(`leaf`,41+e,a+t,l+n,r,s.pick([`#2f6f2a`,`#357731`,`#3a7f34`]),1,.85,o*1.7)});let m=[[39.85,-22.5],[43.75,-22.5],[43.75,-18.450000000000003],[39.85,-18.450000000000003]];for(let[e,t]of m)i.cyl(`metal`,e,c,t,.05,o-.02-c,f,8),i.box(`metal`,e,o-.03,t,.26,.04,.26,f);let h=a+3.75;for(let e=0;e<4;e++){let[t,n]=m[e],[r,a]=m[(e+1)%4];i.rod(`metal`,[t,o-.3,n],[r,o-.3,a],.03,f,5),i.rod(`metal`,[t,h-.06,n],[r,h-.06,a],.03,f,5);let s=(t+r)/2,c=(n+a)/2,l=Math.atan2(r-t,a-n),p=Math.hypot(r-t,a-n)-1.3,g=u-s,_=d-c,v=Math.hypot(g,_),y=g/v*.32,b=_/v*.32;i.push(s+y,h,c+b,l);let x=(g*Math.cos(l)-_*Math.sin(l)>0?-1:1)*.55;i.box(`metal`,0,0,0,.55,.06,p,`#2c2e30`,0,0,x),i.box(`glow`,-Math.sin(x)*.035,Math.cos(x)*.035,0,.48,.02,p-.08,X(`#ff3f7a`,2.2),0,0,x),i.pop()}e.add(u,a+3.3,d,16735375,9,t);let g=`#5b5b57`,_=o-.2,v=40.3,y=-19.4,b=a+3.9,x=[[33.3,o,-15.6],[33.3,_,-15.6],[v,_,-15.6],[v,_,y],[v,b+.1,y]];for(let e=1;e<x.length;e++)i.rod(`metal`,x[e-1],x[e],.045,g,8),i.sphere(`metal`,...x[e],.065,g,8,6);i.box(`metal`,33.3,o-.02,-15.6,.3,.04,.3,`#3a3c3d`);for(let e of[35.6,38])i.rod(`metal`,[e,_,-15.6],[e,o-.01,-15.6],.012,`#2a2c2d`,4);i.geo(`metal`,Z.torus(.18,5,14),36.8,_,-15.6,`#a3342b`,.13,.13,.13,0,Math.PI/2,0),i.cyl(`metal`,v,b,y,.03,.1,`#3a3c3d`,6);let S=b-.01,C=c+.014,w=new G(new ea(.3,20),new Bo({name:`silo17-puddle`,color:`#1c2627`,roughness:.06,metalness:.4,transparent:!0,opacity:.85,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}));w.rotation.x=-Math.PI/2,w.position.set(v,C,y),w.name=`silo17/puddle`,i.mesh(w);let T=new oi(new Kr({map:Ef.soft,color:`#d8f2ff`,transparent:!0,depthWrite:!1,opacity:.95}));T.name=`silo17/drip`;let E=new G(new wo(.7,1,24),new pi({name:`silo17-ripple`,color:`#cfeeff`,transparent:!0,opacity:0,depthWrite:!1}));E.rotation.x=-Math.PI/2,E.position.set(v,C+.006,y),E.name=`silo17/ripple`,E.visible=T.visible=!1,n.add(T,E);let D=.9,O=.8,k=Math.sqrt(2*(S-.03-C)/9.81),A=D+k+O+.3;r.push((e,t)=>{let n=t%A;if(n<D){let e=n/D;T.visible=!0,T.position.set(v,S-.03*e,y),T.scale.set(.03+.035*e,.04+.05*e,1)}else if(n<D+k){let e=n-D;T.visible=!0,T.position.set(v,S-.03-4.905*e*e,y),T.scale.set(.055,.1+.06*e,1)}else T.visible=!1;let r=n-D-k;if(r>=0&&r<O){let e=r/O;E.visible=!0,E.scale.setScalar(.04+.25*e),E.material.opacity=.5*(1-e)}else E.visible=!1});let j=new Bo({name:`silo17-leaf`,vertexColors:!0,flatShading:!0,roughness:.9,metalness:0,emissive:`#3f9a3a`,emissiveIntensity:.66});return i.finish(Xh({leaf:j}))}function ug(e){let t=q(e),n=new ea(1,16),r=n.attributes.position;for(let e=1;e<r.count;e++){let n=.74+t()*.32;r.setXY(e,r.getX(e)*n,r.getY(e)*n)}return r.setXY(r.count-1,r.getX(1),r.getY(1)),n.computeBoundingSphere(),n}function dg({pool:e,group:t}){let n=new On;n.name=`silo17/decay`;let r=q(2217),i=[`#1c2112`,`#222815`,`#191d0f`,`#283018`],a=new Bo({name:`silo17-moss`,color:`#ffffff`,roughness:1,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),o=new Ip(`silo17-moss`,ug(5),a,{castShadow:!1,receiveShadow:!0});for(let e=0;e<64;e++){let t=1+e%22,n=r.sign(),a=.16+r()*.12,s=.38+r()*.24,c=n*(20+r()*53.5),l=Y(t)-.35+(r()-.5)*.3;o.add(c,l,.085,a,s,1,X(r.pick(i),.85+r()*.3),0,0,(r()-.5)*1.5)}for(let e=0;e<16;e++){let e=1+Math.floor(r()*21),t=r.sign(),n=.3+r()*.3,a=t*(75.2+n*.6+r()*(2.6-n*1.2)),s=Y(e)-1.4+r()*2.6;o.add(a,s,.05,n*.6,n*1.4,1,X(r.pick(i),.85+r()*.3),0,0,(r()-.5)*1.2)}n.add(o.build(4,0,-170));let s=new Ip(`silo17-emergency`,Z.box(),Yh,{castShadow:!1,receiveShadow:!1}),c=X(`#5f9a58`,.9).clone(),l=[1,2,3,4,5,6,7].map(e=>Math.PI+e/8*Math.PI);for(let e=1;e<=22;e++){let t=Y(e);for(let e=0;e<3;e++){let n=Math.PI*(1.12+(e+.5+(r()-.5)*.5)/3*.76),i=18.47;s.add(Math.cos(n)*i,t-.93,Math.sin(n)*i,.5,.07,.03,c,0,Math.PI/2-n,0)}for(let n=0;n<(e%2?2:3);n++){let i=l[(e*3+n*3)%l.length],a=ip-.31;s.add(Math.cos(i)*a,t+2+r()*.4,Math.sin(i)*a,.07,.3,.03,c,0,Math.PI/2-i,0)}}n.add(s.build(4,0,-170));for(let n=2;n<=22;n+=4)e.add(0,Y(n)+1.2,-15.5,8364154,7,t);return n}var fg=-1179.1,pg=19,mg=-1177.62,hg=74,gg=-141,_g=`
  vec2 h2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h2(i).x, h2(i + vec2(1.0, 0.0)).x, f.x), mix(h2(i + vec2(0.0, 1.0)).x, h2(i + vec2(1.0, 1.0)).x, f.x), f.y);
  }
`,vg=`
  #include <fog_pars_vertex>
  varying vec3 vW;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    vec4 mvPosition = viewMatrix * w;
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`;function yg({pool:e,group:t,dyn:n,updaters:r}){let i=new Ro({name:`silo17-flood`,fog:!0,uniforms:{...Fo.clone(K.fog),uTime:{value:0},uColor:{value:new W(`#7cf9eb`)},uDeep:{value:new W(`#34504e`)},uR:{value:pg}},vertexShader:vg,fragmentShader:`
      #include <fog_pars_fragment>
      uniform float uTime, uR;
      uniform vec3 uColor, uDeep;
      varying vec3 vW;
      ${_g}
      // distance between the two nearest moving cell points: small on cell borders
      float cells(vec2 p, float t) {
        vec2 i = floor(p), f = fract(p);
        float d1 = 9.0, d2 = 9.0;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            vec2 g = vec2(float(x), float(y));
            vec2 o = 0.5 + 0.42 * sin(t + 6.2831 * h2(i + g));
            float d = length(g + o - f);
            if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) { d2 = d; }
          }
        }
        return d2 - d1;
      }
      // rings spreading from where the drips land
      float ripples(vec2 p, float t) {
        float s = 0.0;
        for (int i = 0; i < 7; i++) {
          float fi = float(i);
          float period = 2.1 + fi * 0.37;
          float k = floor((t + fi * 1.3) / period);
          float age = fract((t + fi * 1.3) / period);
          vec2 c = (h2(vec2(k, fi * 7.1)) - 0.5) * 2.0 * uR * 0.8;
          c.y = abs(c.y);
          float d = length(p - c);
          s += smoothstep(0.3, 0.0, abs(d - age * 5.0)) * (1.0 - age);
        }
        return s;
      }
      void main() {
        float t = uTime;
        vec2 q = vW.xz;
        vec2 p = q * 0.3;
        float a = cells(p + vec2(t * 0.06, t * 0.035), t * 0.7);
        float b = cells(p * 1.7 - vec2(t * 0.05, -t * 0.03) + 3.1, t * 0.9 + 1.7);
        float c = pow(1.0 - smoothstep(0.0, 0.2, a), 3.0) * 0.8 + pow(1.0 - smoothstep(0.0, 0.16, b), 3.0) * 0.5;
        float rip = ripples(q, t);
        float n = vnoise(q * 0.12 + vec2(t * 0.02, 0.0));
        float r = length(q) / uR;
        float rim = smoothstep(0.93, 0.995, r);
        vec3 col = uDeep * (0.6 + 0.8 * n) + uColor * (0.06 + 0.14 * n + c * 1.4 + rip * 0.4);
        col = mix(col, uColor * 1.2, rim * 0.5);
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
      }
    `}),a=new ea(pg,48,Math.PI,Math.PI);a.rotateX(-Math.PI/2);let o=new G(a,i);o.position.y=fg,o.name=`silo17/flood`,n.add(o);let s=new Ro({name:`silo17-cavewater`,fog:!0,uniforms:{...Fo.clone(K.fog),uTime:{value:0},uDeep:{value:new W(`#1e2526`)},uSheen:{value:new W(`#353d3f`)},uGlow:{value:new W(`#3fe0c8`)},uR:{value:pg}},vertexShader:vg,fragmentShader:`
      #include <fog_pars_fragment>
      uniform float uTime, uR;
      uniform vec3 uDeep, uSheen, uGlow;
      varying vec3 vW;
      ${_g}
      void main() {
        float t = uTime;
        vec2 p = vW.xz;
        vec3 V = normalize(cameraPosition - vW);
        float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 3.0);
        float w = vnoise(p * 0.3 + vec2(t * 0.05, t * 0.03)) * 0.6 + vnoise(p * 0.8 - vec2(t * 0.04, -t * 0.06)) * 0.4;
        float glint = smoothstep(0.76, 0.9, w);
        vec3 col = uDeep * (0.8 + 0.4 * w) + uSheen * ((0.15 + fres) * (0.6 + 0.8 * w) + glint * 0.5);
        float g = exp(-dot(p, p) / (uR * uR * 0.6));
        col += uGlow * g * (0.03 + 0.07 * smoothstep(0.5, 0.9, w));
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
      }
    `}),c=new ea(hg,96,0,Math.PI);c.rotateX(-Math.PI/2);let l=new G(c,s);l.position.y=mg,l.name=`silo17/caveWater`,n.add(l);let u=new G(new Co(150,1),new Bo({name:`silo17-cavewater-edge`,color:`#161d1f`,roughness:.4,metalness:0}));u.position.set(0,-2356.24/2,.006),u.name=`silo17/caveWaterEdge`,n.add(u);let d=q(9117),f=1038.1,p=new Float32Array(450),m=new Float32Array(450);for(let e=0;e<150;e++){let t=d()*Math.PI*2,n=6.3+Math.sqrt(d())*8.3;p[e*3]=Math.cos(t)*n,p[e*3+1]=Math.sin(t)*n,p[e*3+2]=d()}let h=new Ir;h.setAttribute(`position`,new xr(m,3));let g=new Ki(h,new Vi({name:`silo17-drips`,map:Ef.soft,color:`#bfe9f5`,size:.16,sizeAttenuation:!0,transparent:!0,opacity:.55,depthWrite:!1}));g.name=`silo17/drips`,g.frustumCulled=!1,n.add(g);let _=e=>{for(let t=0;t<150;t++){let n=e*11/f+p[t*3+2];m[t*3]=p[t*3],m[t*3+1]=gg-(n-Math.floor(n))*f,m[t*3+2]=p[t*3+1]}h.attributes.position.needsUpdate=!0};_(0);let v=q(1177),y=new Float32Array(448),b=new Ii(Z.box(),new Bo({name:`silo17-debris`,color:`#4a4038`,roughness:.95,metalness:0}),56);b.name=`silo17/debris`;let x=new W,S=[[-8,-22,10.5],[18,-12,2.8],[32,-30,2.5],[-36,-44,3.1],[12,-46,2.4]];for(let e=0,t=0;e<56;t++){let n=Math.PI+.06+v()*(Math.PI-.12),r=16+Math.sqrt(v())*44,i=v()<.5,a=i?1.2+v()*1.6:.5+v()*.7,o=i?.1+v()*.08:.3+v()*.3,s=i?.22+v()*.2:.5+v()*.6,c=Math.cos(n)*r,l=Math.sin(n)*r,u=Math.hypot(a,s)/2+.45;if(t<4e3&&(l>-u-.3||S.some(([e,t,n])=>Math.hypot(c-e,l-t)<n+u)))continue;let d=e*8;y[d]=c,y[d+1]=l,y[d+2]=a,y[d+3]=o,y[d+4]=s,y[d+5]=v()*Math.PI*2,y[d+6]=v()*Math.PI*2,y[d+7]=.6+v()*.7,b.setColorAt(e,x.setScalar(.75+v()*.45)),e++}let C=new $t,w=new kt,T=new un,E=new U,D=new U,O=e=>{for(let t=0;t<56;t++){let n=t*8,r=y[n+6],i=y[n+7];E.set(y[n]+Math.sin(e*.03+r)*.4,mg+y[n+3]*.2+Math.sin(e*i+r)*.05,y[n+1]+Math.cos(e*.025+r)*.4),T.set(Math.sin(e*i*.8+r)*.05,y[n+5]+Math.sin(e*.05+r)*.1,Math.cos(e*i*.7+r*1.3)*.04),D.set(y[n+2],y[n+3],y[n+4]),b.setMatrixAt(t,C.compose(E,w.setFromEuler(T),D))}b.instanceMatrix.needsUpdate=!0};O(0),b.computeBoundingSphere(),b.boundingSphere.radius+=1,b.castShadow=!0,b.receiveShadow=!0,n.add(b),r.push((e,t)=>{i.uniforms.uTime.value=t,s.uniforms.uTime.value=t,O(t),_(t)}),e.add(0,-1177.6,4,5236944,6,t)}function bg({pool:e,group:t}){let n=new On;n.name=`silo17/pump`;let r=new Fp(`silo17/pumpRig`),i=Y(19),a=[-3,i-1.2,-12],o=Math.atan2(a[2],a[0]),s=Math.cos(o),c=Math.sin(o),l=s*16.4,u=c*16.4,d=i+2.3,f=.2,p=a[0]+s*f,m=a[2]+c*f,h=i+2,g=`#3b3e3d`;r.box(`metal`,l,i+.03,u,.7,.06,.7,`#2d2f2f`),r.cyl(`metal`,l,i,u,.09,d-i+.1,g,8),r.rod(`metal`,[l,d,u],[p,d,m],.07,g,6),r.rod(`metal`,[l,i+1.3,u],[Xd(l,p,.45),d,Xd(u,m,.45)],.04,g,5),r.rod(`metal`,[p,d,m],[p,h,m],.025,`#2d2f2f`,4),r.geo(`metal`,Z.torus(.25,6,16),p,h,m,`#4a4c4d`,f,f,f,0,-o,0);let _=s*17.3-c*.55,v=c*17.3+s*.55,y=-c*.3,b=s*.3;r.rod(`wood`,[_-y,i+.5,v-b],[_+y,i+.5,v+b],.18,`#6b5238`,12);for(let e of[-1,1])r.box(`metal`,_+e*y*1.15,i+.3,v+e*b*1.15,.05,.6,.5,`#2d2f2f`,-o+Math.PI/2);r.rod(`matte`,[p+s*f,h,m+c*f],[_,i+.68,v],.028,`#1f2122`,5);let[x,S,C]=[-11,-227,-19],w=Y(30);r.box(`metal`,x,w+.06,C,1.5,.12,1.1,`#2d2f2f`),r.cyl(`metal`,x,w+.12,C,.42,1.36,`#4d5b53`,16);for(let e of[.3,1.2])r.geo(`metal`,Z.torus(.12,5,20),x,w+.12+e,C,`#3a4640`,.44,.44,.44,Math.PI/2,0,0);r.cylR(`metal`,x,w+1.76,C,.28,.9,`#3a3f3d`,0,0,Math.PI/2,14),r.geo(`metal`,Z.torus(.25,5,14),x,w+2.18,C,`#2d2f2f`,.14,.14,.14,0,Math.PI/2,0),r.sphere(`glow`,x,S+.1,C+.43,.07,X(`#ffb070`,4.5),10,8),eg(r,[[x+.42,w+.4,C],[x+.9,w+.1,C-.4],[x+1.3,w+.08,C-2.4],[x+.8,w+.08,C-4.8],[x+1.1,w+.08,C-6.2]],.07,`#2a2c2b`,`metal`),r.box(`metal`,x+1.1,w+.01,C-6.5,.8,.02,.8,`#1f2020`),e.add(x,S+.6,C+.9,16756848,8,t),n.add(r.finish(Xh()));let T=new G(new ko(new pa([[a[0],h-.02,a[2]],a,[-3.5,-165,-12.1],[-4.6,-185,-12.3],[-5.9,-205,-12.4],[-7,-219.6,-12.2],[-7.4,-221.8,-12.7],[-8.4,-223.7,-14.3],[-9.9,-224.6,-16.9],[-10.7,-224.9,-18.5],[x,w+2.3,C]].map(e=>new U(...e)),!1,`centripetal`),260,.045,6,!1),new Bo({name:`silo17-cable`,color:`#1f2122`,roughness:.6,metalness:.3}));return T.name=`silo17/pumpCable`,T.castShadow=!0,n.add(T),n}function xg(){let e=new Fp(`skeleton`),t=`#ffffff`,n=`#4a4238`;e.geo(`bone`,Z.sphere(9,6),.8,.1,0,t,.12,.1,.1),e.geo(`bone`,Z.sphere(6,4),.9,.08,0,t,.06,.05,.07),e.box(`bone`,.9,.03,0,.1,.03,.09,t);for(let t of[-1,1])e.sphere(`bone`,.86,.165,t*.037,.026,n,5,3);e.sphere(`bone`,.925,.13,0,.012,n,4,3);for(let n=0;n<12;n++)e.box(`bone`,.66-n*.058,.04,0,.04,.04,.05,t);for(let[n,r,i]of[[.6,.1,.09],[.55,.13,.1],[.5,.145,.105],[.45,.15,.1],[.4,.145,.095],[.35,.135,.085],[.3,.115,.07]])e.geo(`bone`,Z.torus(.12,3,10),n,i*.85,0,t,r,i*.85,.12,0,Math.PI/2,0);e.box(`bone`,.47,.165,0,.2,.02,.04,t);for(let n of[-1,1])e.rod(`bone`,[.64,.12,n*.02],[.63,.06,n*.17],.012,t,4),e.box(`bone`,.56,.02,n*.12,.14,.015,.1,t);e.geo(`bone`,Z.torus(.3,4,9),.08,.07,0,t,.13,.08,.1,0,Math.PI/2,0),e.box(`bone`,.13,.03,0,.08,.03,.06,t),e.rod(`bone`,[.6,.05,.18],[.32,.04,.24],.02,t,4),e.rod(`bone`,[.31,.04,.245],[.07,.035,.27],.013,t,4),e.rod(`bone`,[.31,.03,.23],[.07,.03,.255],.012,t,4),e.box(`bone`,0,.02,.27,.09,.015,.07,t);for(let n=0;n<4;n++)e.rod(`bone`,[-.04,.02,.245+n*.017],[-.11,.015,.24+n*.022],.006,t,3);e.rod(`bone`,[.6,.05,-.18],[.33,.04,-.25],.02,t,4),e.rod(`bone`,[.32,.05,-.25],[.22,.12,-.04],.013,t,4),e.rod(`bone`,[.32,.04,-.23],[.21,.11,-.05],.012,t,4),e.box(`bone`,.2,.13,.02,.08,.015,.07,t,.4);for(let n of[-1,1]){let r=n*(n>0?.14:.11);e.rod(`bone`,[.05,.05,n*.09],[-.36,.05,r],.024,t,4),e.sphere(`bone`,-.37,.08,r,.025,t,5,3),e.rod(`bone`,[-.38,.045,r],[-.77,.04,r+n*.03],.018,t,4),e.rod(`bone`,[-.38,.03,r+n*.03],[-.76,.03,r+n*.05],.01,t,4),e.box(`bone`,-.82,.07,r+n*.07,.05,.16,.08,t,0,n*.9)}return e.batch(`bone`).build()}function Sg(){let e=q(1740),t=yh.find(e=>e.id===17)||{x:mp[0],z:mp[1]},n=Math.atan2(-t.z,-t.x),r=Math.cos(n),i=Math.sin(n),a=-i,o=r,s=t.x+r*58,c=t.z+i*58,l=[],u=(e,t)=>{if(e<-290||e>-27||t<-300||t>-6)return!1;let n=(e-s)*r+(t-c)*i,u=(e-s)*a+(t-c)*o;return n>-11.5&&n<1.2&&Math.abs(u)<4.2||Math.hypot(e+216.6,t+216.6)<3||e>-37&&t>-8?!1:l.every(([n,r])=>Math.hypot(n-e,r-t)>1.6)},d=0;for(;l.length<16&&d++<600;){let t=1.5+e()**1.4*16,n=(e()-.5)*20,d=s+r*t+a*n,f=c+i*t+o*n;u(d,f)&&l.push([d,f])}let f=Math.hypot(-34-s,-12-c),p=(-34-s)/f,m=(-12-c)/f;for(;l.length<40&&d++<2400;){let t=e()**1.3,n=(e()-.5)*2*(8+t*30),r=Xd(s,-34,t)-m*n,i=Xd(c,-12,t)+p*n;u(r,i)&&l.push([r,i])}let h=new Bo({name:`silo17-bone`,color:`#d8d2c0`,vertexColors:!0,roughness:.82,metalness:0}),g=new Ii(xg(),h,l.length);g.name=`silo17/remains`;let _=new $t,v=new kt,y=new kt,b=new U(0,1,0),x=new U,S=new U,C=new U,w=new W;return l.forEach(([t,n],r)=>{let i=Sh(t,n);x.set(Sh(t-.8,n)-Sh(t+.8,n),1.6,Sh(t,n-.8)-Sh(t,n+.8)).normalize(),v.setFromUnitVectors(b,x).multiply(y.setFromAxisAngle(b,e()*Math.PI*2));let a=.9+e()*.15;g.setMatrixAt(r,_.compose(S.set(t,i+.04,n),v,C.set(a,a,a))),g.setColorAt(r,w.setScalar(.8+e()*.25))}),g.instanceMatrix.needsUpdate=!0,g.computeBoundingSphere(),g.castShadow=!0,g.receiveShadow=!0,g}var Cg=`#273027`,wg={matte:`#cbc8bf`,metal:`#bcb8b1`,wood:`#bcb5aa`,fabric:`#b3ada6`},Tg={"top/cafeteria":{tint:wg,glow:Cg,screens:!0},"top/sheriff":{tint:wg,glow:Cg,screens:!0},"top/judicial":{tint:wg,glow:Cg,screens:!0},"top/watcher":{tint:wg,glow:Cg,screens:!0},"mids/farms":{tint:{matte:`#cecbc4`,foliage:`#ffadc4`,metal:`#c4bfb8`,wood:`#bcb5aa`,fabric:`#bcb5aa`},glow:`#000000`},"mids/filtration":{glass:`#aabcb8`},"mids/midscafe":{screens:!0},"deep/digger":{tint:{rock:`#c4c8bc`,metal:`#c4bfb8`,matte:`#d4d3ce`,fabric:`#bcb8ad`,wood:`#bcb5aa`},glow:`#000000`,screens:!0},"deep/hall":{glass:`#aabcb8`,sheen:!0,cap:!0},"deep/mechcafe":{screens:!0},"deep/supply":{cage:`#bcbcbc`}},Eg={shaftConcrete:`#bcc2b2`,shaftColumn:`#b3b8a8`,shaftTrim:`#b8bcb0`},Dg=`#b3b3b3`,Og=new W(`#0c1e22`),kg=new W(`#0a1416`),Ag=e=>e.isMeshStandardMaterial&&e.emissiveMap&&e.emissiveIntensity>0;function jg(e){let t=[],n=new Set,r=(e,r)=>{if(n.has(e))return;n.add(e);let i={};r.color&&(i.color=e.color.clone()),r.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),r.opacity!==void 0&&(i.opacity=e.opacity),t.push({mat:e,from:i,to:r})},i=(e,t)=>e.clone().multiply(new W(t)),a=new Set(Object.values(J)),o=e=>{let t=new Map;e.traverse(e=>{if(!e.isMesh)return;let n=e=>a.has(e)?(t.has(e)||t.set(e,e.clone()),t.get(e)):e;e.material=Array.isArray(e.material)?e.material.map(n):n(e.material)})};for(let[t,n]of Object.entries(Tg)){let a=e.getObjectByName(t);a&&(o(a),a.traverse(e=>{if(e.isMesh)for(let t of Array.isArray(e.material)?e.material:[e.material]){let e=t.name;n.screens&&Ag(t)?r(t,{emissiveIntensity:0}):e===`glow`&&n.glow?r(t,{color:i(t.color,n.glow)}):e===`glass`?r(t,{opacity:.5,...n.glass?{color:i(t.color,n.glass)}:{}}):e===`sheen`&&n.sheen?r(t,{color:kg.clone(),opacity:.8}):e===`deep/capSection`&&n.cap?r(t,{color:i(t.color,`#909090`),...t.emissiveIntensity?{emissiveIntensity:0}:{}}):e===`deep/chainlink`&&n.cage?r(t,{color:i(t.color,n.cage)}):n.tint?.[e]&&r(t,{color:i(t.color,n.tint[e])})}}))}for(let t of[`top/signs`,`mids/signs`,`deep/signs`]){let n=e.getObjectByName(t);n?.material&&r(n.material,{color:i(n.material.color,Dg),emissiveIntensity:0})}e.getObjectByName(`rooms/mids/dyn`)?.traverse(e=>{e.isMesh&&/filtration/.test(e.name)&&e.material?.name===`water`&&r(e.material,{color:Og.clone(),opacity:.95})}),e.getObjectByName(`shaft`)?.traverse(e=>{if(e.isMesh)for(let t of Array.isArray(e.material)?e.material:[e.material]){let n=Eg[t.name];n?r(t,{color:i(t.color,n)}):e.name===`placardNumerals`&&r(t,{color:i(t.color,`#c4c4c4`)})}});let s=0,c=0,l=e=>{for(let{mat:n,from:r,to:i}of t)i.color&&n.color.copy(r.color).lerp(i.color,e),i.emissiveIntensity!==void 0&&(n.emissiveIntensity=r.emissiveIntensity+(i.emissiveIntensity-r.emissiveIntensity)*e),i.opacity!==void 0&&(n.opacity=r.opacity+(i.opacity-r.opacity)*e)};return{count:t.length,set(e){s=+!!e},update(e){c!==s&&(c=s>c?Math.min(s,c+e/1.1):Math.max(s,c-e/1.1),l(c*c*(3-2*c)))}}}function Mg(e,t){let n=q(e),r=[],i=[],a=[],o=[],s=[],c=new W(`#9c7d50`),l=new W(`#8f8068`),u=new W,d=new U,f=new U,p=new U,m=new U,h=(e,t,n,c)=>{let l=r.length/3;for(let s=0;s<e.length;s++){let l=e[Math.max(0,s-1)],u=e[Math.min(e.length-1,s+1)];d.subVectors(u,l).normalize(),f.crossVectors(d,c).normalize(),p.crossVectors(d,f);let h=t*(1-.5*(s/(e.length-1)));for(let t=0;t<3;t++){let c=t/3*Math.PI*2;m.copy(f).multiplyScalar(Math.cos(c)).addScaledVector(p,Math.sin(c)),r.push(e[s].x+m.x*h,e[s].y+m.y*h,e[s].z+m.z*h),i.push(m.x,m.y,m.z),a.push(n.r,n.g,n.b),o.push(h)}}for(let t=0;t<e.length-1;t++)for(let e=0;e<3;e++){let n=l+t*3+e,r=l+t*3+(e+1)%3;s.push(n,r,n+3,r,r+3,n+3)}},g=()=>{let e=n()*2-1,t=n()*Math.PI*2,r=Math.sqrt(1-e*e);return new U(r*Math.cos(t),e,r*Math.sin(t))},_=e=>(u.copy(n()<.3?l:c).multiplyScalar(.75+n()*.4),u.clone().multiplyScalar(.5+.5*e)),v=[];for(let e=0;e<200;e++){let e=g(),r=new U().crossVectors(e,Math.abs(e.y)<.9?new U(0,1,0):new U(1,0,0)).normalize(),i=new U().crossVectors(e,r),a=1-.45*n()*n(),o=n()*Math.PI*2,s=1+n()*1.7,c=n()*10,l=[];for(let n=0;n<=10;n++){let u=o+n/10*s,d=t*a*(1+.07*Math.sin(n*1.3+c));l.push(new U().addScaledVector(r,Math.cos(u)*d).addScaledVector(i,Math.sin(u)*d).addScaledVector(e,Math.sin(n*.9+c)*.04*t))}l.forEach(e=>e.y*=.86),h(l,.006+n()*.006,_(a),e),v.push(l)}for(let e=0;e<220;e++){let e=v[Math.floor(n()*v.length)],r=e[1+Math.floor(n()*(e.length-2))],i=r.clone().normalize().add(g().multiplyScalar(.8)).normalize(),a=.06+n()*.18;h([r,r.clone().addScaledVector(i,a*.5).add(g().multiplyScalar(.015)),r.clone().addScaledVector(i,a)],.004,_(r.length()/t),g())}for(let e=0;e<7;e++){let e=g(),r=g().multiplyScalar(.25*t),i=[];for(let n=0;n<=6;n++){let a=n/6;i.push(e.clone().multiplyScalar(t*.92*a).addScaledVector(r,Math.sin(a*Math.PI)))}i.forEach(e=>e.y*=.86),h(i,.016+n()*.008,_(.7),g())}let y=new Ir;return y.setAttribute(`position`,new wr(r,3)),y.setAttribute(`normal`,new wr(i,3)),y.setAttribute(`color`,new wr(a,3)),y.setAttribute(`aThick`,new wr(o,1)),y.setIndex(s),y.computeBoundingSphere(),y}function Ng(){let e=ef(64),t=e.getContext(`2d`);t.fillStyle=`#000`,t.fillRect(0,0,64,64);let n=t.createRadialGradient(32,32,0,32,32,31);n.addColorStop(0,`#fff`),n.addColorStop(.5,`#b0b0b0`),n.addColorStop(1,`#000`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=q(7);t.fillStyle=`rgba(0,0,0,0.3)`;for(let e=0;e<70;e++)t.beginPath(),t.arc(8+r()*48,8+r()*48,1+r()*2.5,0,Math.PI*2),t.fill();let i=new Yi(e);return i.colorSpace=``,i}var Pg=new U(354,670,931).normalize(),Fg=-12,Ig=(e,t,n)=>e+Math.atan2(Math.sin(t-e),Math.cos(t-e))*n;function Lg(){let e=new On;e.name=`tumbleweeds`;let t=new Bo({name:`tumbleweed`,vertexColors:!0,roughness:1,metalness:0}),n=new pi({name:`tumbleweedShadow`,color:`#000000`,alphaMap:Ng(),transparent:!0,opacity:.6,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),r=new Co(1,1).rotateX(-Math.PI/2),i=[{seed:11,R:.7,x:-40,z:-45,cx:-30,cz:-50,range:70},{seed:29,R:.55,x:60,z:-150,cx:-10,cz:-175,range:130}].map((i,a)=>{let o=new G(Mg(i.seed,i.R),t);o.name=`tumbleweed`;let s=new G(r,n);return s.name=`tumbleweedShadow`,s.renderOrder=1,e.add(o,s),{...i,mesh:o,shadow:s,heading:-.2+a*2.4,speed:0,hop:0,q:new kt,phase:a*37.1}}),a=new U,o=new kt,s=new U(0,1,0),c=new U,l=new H(-Pg.x,-Pg.z).multiplyScalar(1/Pg.y);return{group:e,update:(e,t,n,r)=>{e=Math.min(e,.1);let u=Math.atan2(n.y,n.x);for(let n of i){let i=n.phase,d=u+Math.sin(t*.11+i)*1.7+Math.sin(t*.047+i*3.1)*1.3,f=n.cx-n.x,p=n.cz-n.z,m=Zd(n.range*.6,n.range,Math.hypot(f,p));d=Ig(d,Math.atan2(p,f),m),d=Ig(d,-Math.PI/2+Math.sign(Math.cos(n.heading))*.5,Zd(-20,Fg,n.z)),n.heading=Ig(n.heading,d,Math.min(1,e*.7));let h=Math.cos(n.heading),g=Math.sin(n.heading),_=.5+.5*Math.sin(t*.37+i)*Math.sin(t*.13+i*.7),v=.6,y=(Sh(n.x+h*v,n.z+g*v)-Sh(n.x-h*v,n.z-g*v))/(2*v)||0,b=Math.max(0,r*(.3+3.2*_*_)-y*9);n.speed+=(b-n.speed)*Math.min(1,e*1.2);let x=n.speed*e;n.x+=h*x,n.z=Math.min(Fg,n.z+g*x),a.set(g,0,-h),n.q.premultiply(o.setFromAxisAngle(a,x/n.R)).normalize(),n.hop+=x/2.4;let S=Math.abs(Math.sin(n.hop*Math.PI))*Yd(n.speed/2.5,0,1)*.35,C=Sh(n.x,n.z);n.mesh.position.set(n.x,C+n.R*.86+S,n.z),n.mesh.quaternion.copy(n.q);let w=n.R*.86+S,T=n.x+l.x*w,E=n.z+l.y*w,D=Sh(T,E);c.set(Sh(T-.5,E)-Sh(T+.5,E),1,Sh(T,E-.5)-Sh(T,E+.5)).normalize(),n.shadow.position.set(T,D+.04,E),n.shadow.quaternion.setFromUnitVectors(s,c),n.shadow.rotateY(-Math.atan2(l.y,l.x));let O=1/(1+S*1.5);n.shadow.scale.set(n.R*3.4*O,1,n.R*2*O)}},weedMat:t,shadowMat:n}}var Rg=new H(1,-.32).normalize(),zg=6,Bg=2e-4,Vg={x0:-1300,x1:1300,z0:-1600,z1:0,step:10};function Hg(){let e=Math.round((Vg.x1-Vg.x0)/Vg.step)+1,t=Math.round((Vg.z1-Vg.z0)/Vg.step)+1,n=new Float32Array(e*t);for(let r=0;r<t;r++)for(let t=0;t<e;t++)n[r*e+t]=Sh(Vg.x0+t*Vg.step,Vg.z0+r*Vg.step);let i=(r,i)=>{let a=Yd((r-Vg.x0)/Vg.step,0,e-1.001),o=Yd((i-Vg.z0)/Vg.step,0,t-1.001),s=Math.floor(a),c=Math.floor(o),l=a-s,u=o-c,d=n[c*e+s],f=n[c*e+s+1],p=n[(c+1)*e+s],m=n[(c+1)*e+s+1];return(d*(1-l)+f*l)*(1-u)+(p*(1-l)+m*l)*u},a=new Uint16Array(e*t*2),o=Rg.x,s=Rg.y;for(let r=0;r<t;r++)for(let t=0;t<e;t++){let c=Vg.x0+t*Vg.step,l=Vg.z0+r*Vg.step,u=n[r*e+t],d=i(c-o*12,l-s*12),f=i(c+o*12,l+s*12),p=(f-d)/24,m=Yd((u-.5*(d+f))/1.5,0,1),h=Math.max(Math.max(i(c-o*30,l-s*30),i(c-o*60,l-s*60))-u-3,0),g=Yd(1+3*p+.6*m,.2,1.8)*(1-.75*Zd(0,6,h));a[(r*e+t)*2]=_r.toHalfFloat(u),a[(r*e+t)*2+1]=_r.toHalfFloat(g)}let l=new Di(a,e,t,j,v);return l.minFilter=l.magFilter=c,l.wrapS=l.wrapT=r,l.needsUpdate=!0,{tex:l,nx:e,nz:t}}function Ug(e,t,n,r,i){let a=1,o=1,s=0,c=0;for(let l=0;l<i;l++)s+=a*of(e*n*o,t*r*o,n*o,r*o),c+=a,a*=.5,o*=2;return s/c}function Wg(e=256){let t=ef(e),n=t.getContext(`2d`),r=n.createImageData(e,e),i=r.data,a=(e,t=1)=>Math.max(0,Math.min(255,Math.round((.5+e*.5*t)*255)));for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=n/e,o=t/e,s=(t*e+n)*4;i[s]=a(Ug(r,o,3,24,3),1.5),i[s+1]=a(Ug(r+.37,o+.11,4,8,4),1.3),i[s+2]=a(Ug(r+.71,o+.53,2,2,3),1.2),i[s+3]=255}return n.putImageData(r,0,0),t}var Gg=`
  uniform float uTime;
  uniform float uStorm;
  uniform float uSpeed;
  uniform vec2 uWind;
  uniform sampler2D uSand;
  float gustAt(vec2 xz) {
    float a = dot(xz, uWind) - uTime * uSpeed * 0.75;
    float c = dot(xz, vec2(-uWind.y, uWind.x));
    return texture2D(uSand, vec2(a / 900.0, c / 520.0 + 0.6)).b;
  }
`,Kg=`
  uniform sampler2D uHeight;
  uniform vec4 uHM;
  uniform vec2 uHMSize;
  vec2 terrainAt(vec2 xz) {
    vec2 uv = ((xz - uHM.xy) * uHM.z + 0.5) / uHMSize;
    return texture2D(uHeight, uv).rg;
  }
  float groundAt(vec2 xz) { return terrainAt(xz).x; }
`,qg=`
  uniform float uHaze;
  uniform vec3 uHazeColor;
  float stormHazeAmount(vec3 P) {
    if (uHaze <= 0.0 || P.z >= 0.0) return 0.0;
    vec3 C = cameraPosition;
    vec3 A = C.z > 0.0 ? C + (P - C) * clamp(C.z / max(C.z - P.z, 1e-3), 0.0, 1.0) : C;
    float len = length(P - A);
    const float H = 60.0;
    float ya = max(A.y, 0.0), yp = max(P.y, 0.0);
    float dy = yp - ya;
    float avg = abs(dy) < 0.5 ? exp(-0.5 * (ya + yp) / H) : H * (exp(-ya / H) - exp(-yp / H)) / dy;
    return (1.0 - exp(-uHaze * len * avg)) * smoothstep(-3.0, -1.0, P.y);
  }
`,Jg=`
  float streakMask(vec2 xz) {
    vec2 q = vec2(dot(xz, uWind), dot(xz, vec2(-uWind.y, uWind.x)));
    float xs = q.x - uTime * uSpeed * 0.55;
    q.y += 0.6 * sin(xs / 6.0 + q.y * 0.5) + 2.0 * sin(q.x / 37.0 + uTime * 0.15);
    float f1 = texture2D(uSand, vec2(xs / 40.0, q.y / 18.0)).r;
    float f2 = texture2D(uSand, vec2((q.x - uTime * uSpeed * 0.45) / 400.0, q.y / 140.0 + 0.31)).g;
    return smoothstep(0.55, 0.85, f1) * smoothstep(0.35, 0.7, f2) * smoothstep(0.3, 0.7, gustAt(xz));
  }
`,Yg=`
  ${Gg}
  ${Kg}
  ${qg}
  attribute vec4 aA; // anchor x, anchor z, plume base y (veils: -1e4), phase
  attribute vec4 aB; // length, height at the upwind end, height downwind, lift
  attribute vec4 aC; // travel (0 = rim plume), life in s, opacity, sink per metre
  varying vec2 vLocal;
  varying float vAlong;
  varying float vAcross;
  varying float vA;
  varying float vPlume;
  varying float vH;
  varying float vAbove;
  varying float vHaze;
  #include <fog_pars_vertex>

  void main() {
    float u = position.x, v = position.y;
    bool plume = aC.x <= 0.0;
    float age = fract(uTime / aC.y + aA.w);
    vec2 W = uWind;
    vec2 Wp = vec2(-W.y, W.x);
    float L = aB.x;
    vec2 c = aA.xy + (plume ? vec2(0.0) : W * (age - 0.5) * aC.x);
    vec2 xz = c + W * (plume ? u : u - 0.5) * L;
    // a slow side-to-side meander that travels downwind (a plume stays
    // pinned at its lip)
    xz += Wp * sin((u * L - uTime * uSpeed * 0.7) / 40.0 + aA.w * 20.0) * min(L * 0.035, 6.0) * (plume ? smoothstep(0.0, 0.3, u) : 1.0);

    // Turn the sheet about the wind axis to face the camera: from low down it
    // stands up as a veil, from above it lies along the ground as a drift.
    vec3 toCam = cameraPosition - vec3(xz.x, groundAt(xz), xz.y);
    vec3 sRaw = cross(vec3(W.x, 0.0, W.y), toCam);
    float side = length(sRaw) / max(length(toCam), 1e-3);
    float upright = abs(sRaw.y) / max(length(sRaw), 1e-3);
    vec3 s = normalize(sRaw + vec3(0.0, 0.04 * length(toCam), 0.0) * sign(sRaw.y + 1e-6));
    if (s.y < 0.0) s = -s;

    float H = mix(aB.y, aB.z, u);
    vec3 off = s * v * H;
    vec2 pxz = xz + off.xz;
    float ground = groundAt(pxz);
    // plumes leave the crest level and sink downwind, never below the ground
    float base = plume ? max(aA.z - aC.w * u * L, ground + 0.2) : ground + aB.w;
    // the upper sheet heaves in slow waves that roll downwind
    float heave = sin((u * L - uTime * uSpeed * 0.9) / 14.0 + aA.w * 30.0) * 0.1 * H * v * upright;
    vec3 P = vec3(pxz.x, base + off.y + heave, pxz.y);
    // a sheet lying flat never dips into the dunes
    P.y = max(P.y, ground + 0.1 + 0.15 * v * H);

    vLocal = vec2(u, v);
    vAlong = dot(P.xz, W);
    // a fixed 7-12 fibres across each sheet, whatever its size, so the
    // streaks still read from far away
    vAcross = v * (0.3 + 0.2 * fract(aA.w * 13.0)) + aA.w * 3.0;
    vPlume = plume ? 1.0 : 0.0;
    vH = H;
    vAbove = P.y - ground;
    vHaze = stormHazeAmount(P);

    // plumes are densest at the crest lip and thin out within ~50 m
    float ends = plume
      ? smoothstep(0.0, 0.03, u) * exp(-u * L / 55.0) * (1.0 - smoothstep(0.8, 1.0, u))
      : smoothstep(0.0, 0.3, u) * (1.0 - smoothstep(0.62, 1.0, u));
    // plumes on one crest pulse together as a gust arrives; veils fade in,
    // cross and fade out, stronger in the gusts
    float gst = gustAt(plume ? aA.xy - W * 40.0 : xz);
    float env = plume
      ? 0.2 + 0.8 * smoothstep(0.35, 0.7, gst)
      : sin(3.14159 * age) * (0.45 + 0.75 * smoothstep(0.3, 0.7, gst));
    // sand lifts where the ground faces the wind, hardly at all in the lee
    float expo = plume ? 1.0 : clamp(terrainAt(c).y, 0.3, 1.4);
    float nearFade = smoothstep(5.0, 40.0, distance(cameraPosition, P));
    float cut = 1.0 - smoothstep(-16.0, -2.0, P.z);
    // Fade where a sheet would turn edge-on, or flip across its axis as the
    // camera passes over it, and soften sheets lying flat so they don't
    // double the ground streaks seen from high up.
    float facing = smoothstep(0.06, 0.25, side) * smoothstep(0.03, 0.18, upright) * mix(0.45, 1.0, smoothstep(0.15, 0.6, upright));
    vA = uStorm * aC.z * ends * env * expo * nearFade * cut * facing;

    vec4 mvPosition = viewMatrix * vec4(P, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    #include <fog_vertex>
  }
`,Xg=`
  ${Gg}
  uniform vec3 uHazeColor;
  uniform vec3 uColor;
  uniform vec3 uColorHi;
  varying vec2 vLocal;
  varying float vAlong;
  varying float vAcross;
  varying float vA;
  varying float vPlume;
  varying float vH;
  varying float vAbove;
  varying float vHaze;
  #include <fog_pars_fragment>

  void main() {
    if (vA < 0.002) discard;
    float v = vLocal.y;
    // fine fibres race through the sheet; the billows roll along more slowly
    float fib = texture2D(uSand, vec2((vAlong - uTime * uSpeed) / 140.0, vAcross)).r;
    float bil = texture2D(uSand, vec2((vAlong - uTime * uSpeed * 0.6) / 260.0, vAcross * 0.35)).g;
    float body = smoothstep(0.34, 0.8, bil);
    float strands = smoothstep(0.3, 0.9, fib);
    // most of the sand rides low and thins out with height (plumes spread
    // higher), fraying into fibres toward the top
    float z = v * vH;
    float dens = exp(-z / (1.0 + mix(0.45, 0.7, vPlume) * vH)) * (1.0 - smoothstep(0.75, 1.0, v));
    dens *= mix(1.0, strands, smoothstep(0.3, 0.9, v));
    // soft where it meets the ground; plumes have no hard underside
    float a = body * dens * (0.3 + 0.9 * strands) * smoothstep(0.0, mix(0.06, 0.35, vPlume), v) * smoothstep(0.0, 0.6, vAbove) * vA;
    if (a < 0.004) discard;
    vec3 col = mix(uColor, uColorHi, clamp(v * 0.5 + strands * 0.5, 0.0, 1.0));
    gl_FragColor = vec4(col, a);
    #include <fog_fragment>
    gl_FragColor.rgb = mix(gl_FragColor.rgb, uHazeColor, vHaze);
  }
`,Zg=`
  ${Gg}
  ${Kg}
  ${qg}
  ${Jg}
  uniform vec3 uCenter;
  uniform float uPx;
  uniform float uGrainA;
  attribute vec4 aSeed;
  varying float vA;
  varying float vHaze;
  // grains wrap on a fixed period around the orbit target, so zooming never
  // moves them
  const float PERIOD = 120.0;
  void main() {
    // the bouncing layer is the slowest sand of all
    float sp = uSpeed * (0.35 + aSeed.w * 0.45);
    vec2 p = aSeed.xy * PERIOD + uWind * uTime * sp;
    p += vec2(sin(uTime * 1.3 + aSeed.z * 40.0), cos(uTime * 1.1 + aSeed.x * 30.0)) * 0.1;
    vec2 o = uCenter.xz - 0.5 * PERIOD;
    vec2 xz = o + mod(p - o, PERIOD);
    // short ballistic hops: most stay under 0.2 m, the highest about 0.45 m
    float hMax = 0.02 - 0.12 * log(1.0 - 0.97 * aSeed.z);
    float T = 0.9 * sqrt(hMax) + 0.05;
    float ph = fract(uTime / T + aSeed.y * 7.0);
    float h = 0.01 + 4.0 * hMax * ph * (1.0 - ph);
    vec2 g = terrainAt(xz);
    vec3 P = vec3(xz.x, g.x + h, xz.y);
    vec4 mvPosition = viewMatrix * vec4(P, 1.0);
    float d = max(-mvPosition.z, 0.1);
    float px = 0.03 * uPx / d;
    gl_PointSize = clamp(px, 1.0, 3.0);
    vec2 e = abs(xz - uCenter.xz) / (0.5 * PERIOD);
    float edge = 1.0 - smoothstep(0.7, 1.0, max(e.x, e.y));
    float range = smoothstep(0.35, 1.0, px) * (1.0 - smoothstep(25.0, 60.0, d)) * smoothstep(1.5, 6.0, d);
    float cut = 1.0 - smoothstep(-4.0, -0.5, P.z);
    // they travel in the same snaking streams as the ground streaks
    vA = uGrainA * uStorm * edge * range * cut * (0.35 + 0.65 * streakMask(xz)) * clamp(g.y, 0.2, 1.5);
    vHaze = stormHazeAmount(P);
    gl_Position = projectionMatrix * mvPosition;
  }
`,Qg=`
  uniform vec3 uHazeColor;
  uniform vec3 uGrainColor;
  varying float vA;
  varying float vHaze;
  void main() {
    vec2 q = gl_PointCoord - 0.5;
    float a = (1.0 - dot(q, q) * 4.0) * vA;
    if (a <= 0.003) discard;
    gl_FragColor = vec4(mix(uGrainColor, uHazeColor, vHaze), a);
  }
`;function $g(){let e=q(9090),t=[],n=(n,r,i,a,o,s=e()*.1)=>{let c=30+e()*40,l=c*zg*(.65+e()*.15);t.push([n,r,-1e4,e(),i,a*(.75+e()*.3),a*(.9+e()*.4),s,l,c,o,0])};for(let t=0;t<18;t++)n(-60+e()*210,-24-e()*110,40+e()*70,1.5+e()*4,.6+e()*.3);for(let t=0;t<6;t++){let t=25+e()*35;n(-118-t/2+8,-30-e()*90,t,.6+e()*.9,.5+e()*.25,0)}for(let t=0;t<6;t++)n(60+e()*50,-25-e()*75,25+e()*35,.6+e()*.9,.5+e()*.25,0);for(let t=0;t<6;t++){let t=Ot.degToRad(200+e()*100),r=112+e()*10;n(Math.cos(t)*r,Math.min(-28,Math.sin(t)*r),25+e()*35,.6+e()*.9,.5+e()*.25,0)}let r=t=>t[Math.floor(e()*t.length)]+(e()-.5)*60;for(let t=0;t<30;t++)n(-400+e()*800,r([-70,-190,-330]),70+e()*150,4+e()*10,.6+e()*.3);for(let t=0;t<22;t++)n(-850+e()*1700,r([-430,-820,-1150]),180+e()*300,8+e()*16,.4+e()*.2);let i=(n,r,i,a,o,s,c)=>{let l=n+Math.cos(a)*i,u=r+Math.sin(a)*i;if(u>-22)return;let d=Sh(l,u),f=Math.cos(a)*Rg.x+Math.sin(a)*Rg.y,p=f<-.3?.06+e()*.05:.01+e()*.02,m=c*(.45+.55*Math.abs(f))*(f<0?1:.75);t.push([l,u,d+.2,e(),o,1+e()*1.5,s,0,0,1,m,p])},a=(t,n,r)=>{for(let a=0;a<r;a++)i(t,n,116,Math.PI+.19+a/(r-1)*.95+(e()-.5)*.08,60+e()*60,8+e()*8,1.1+e()*.3);for(let r=0;r<7;r++)i(t,n,117,Math.PI*(1.28+e()*.4),40+e()*40,4+e()*5,.9+e()*.3);for(let r=0;r<2;r++)i(t,n,117,Math.PI*(1.72+e()*.22),50+e()*40,4+e()*5,.5+e()*.2)};a(0,0,9),a(mp[0],mp[1],6);for(let t of yh)if(t.id!==18&&t.id!==17&&!(Math.abs(t.x)>950||t.z<-1350))for(let n=0;n<3;n++)i(t.x,t.z,90,Math.PI+.1+e()*1.1,45+e()*40,3+e()*4,.6+e()*.3);return t}function e_(e,t,{streaks:n=!1,sway:r=!1,thin:i=!1}={}){let a=`storm:${n?`s`:``}${r?`w`:``}${i?`t`:``}`;e.onBeforeCompile=e=>{Object.assign(e.uniforms,t);let a=i?`uniform float uPxWorld;
attribute float aThick;`:``,o=e.vertexShader.replace(`#include <common>`,`#include <common>\n${Gg}\nvarying vec3 vStormWorld;\n${a}`);i&&(o=o.replace(`#include <begin_vertex>`,`#include <begin_vertex>
        {
          // twigs never get thinner than about half a pixel, so a tumbleweed
          // stays a tangle at a distance instead of breaking into shimmer
          vec4 thinW = modelMatrix * vec4(transformed, 1.0);
          float thinD = distance(cameraPosition, thinW.xyz);
          transformed += normal * max(0.0, uPxWorld * 0.5 * thinD - aThick);
        }`)),r&&(o=o.replace(`#include <project_vertex>`,`
        vec4 mvPosition = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        vec4 swayWorld = modelMatrix * mvPosition;
        {
          // tufts lean with the wind, harder as a gust passes, and flutter;
          // capped so the (static) shadows still sit under them
          float hgt = max(transformed.y, 0.0);
          float ph = dot(swayWorld.xz, vec2(0.21, 0.13));
          float gust = 0.35 + 0.65 * smoothstep(0.3, 0.7, gustAt(swayWorld.xz));
          float flutter = sin(uTime * 4.3 + ph * 3.0) * 0.35 + sin(uTime * 7.1 + ph * 5.0) * 0.15;
          float bend = min((0.6 + flutter) * gust * hgt * hgt * 0.13 * uStorm, 0.25);
          swayWorld.xz += uWind * bend;
          swayWorld.y -= bend * bend * 0.3;
        }
        mvPosition = viewMatrix * swayWorld;
        gl_Position = projectionMatrix * mvPosition;
        `)),o=o.replace(`#include <fog_vertex>`,`#include <fog_vertex>
vStormWorld = (mvPosition.xyz - viewMatrix[3].xyz) * mat3(viewMatrix);`),e.vertexShader=o;let s=n?`${Kg}\n${Jg}\nuniform vec3 uSandAlbedo;`:``,c=e.fragmentShader.replace(`#include <common>`,`#include <common>\n${Gg}\n${qg}\n${s}\nvarying vec3 vStormWorld;`);n&&(c=c.replace(`#include <color_fragment>`,`#include <color_fragment>
        if (uStorm > 0.0) {
          // sand snaking across the ground where it faces the wind; far off
          // the threads would only blur into a tint, so they fade out
          float s = streakMask(vStormWorld.xz) * terrainAt(vStormWorld.xz).y;
          s *= 1.0 - smoothstep(350.0, 1400.0, distance(vStormWorld, cameraPosition));
          diffuseColor.rgb = mix(diffuseColor.rgb, uSandAlbedo, clamp(s, 0.0, 1.0) * 0.4 * uStorm);
          // slow, kilometre-wide shadows where thicker dust passes overhead
          vec2 q = vec2(dot(vStormWorld.xz, uWind), dot(vStormWorld.xz, vec2(-uWind.y, uWind.x)));
          float dim = texture2D(uSand, vec2((q.x - uTime * uSpeed * 0.4) / 1400.0, q.y / 900.0 + 0.2)).b;
          diffuseColor.rgb *= 1.0 - 0.07 * uStorm * smoothstep(0.45, 0.8, dim);
        }`)),c=c.replace(`#include <fog_fragment>`,`#include <fog_fragment>
gl_FragColor.rgb = mix(gl_FragColor.rgb, uHazeColor, stormHazeAmount(vStormWorld));`),e.fragmentShader=c},e.customProgramCacheKey=()=>a,e.needsUpdate=!0}function t_({scene:e,camera:t,controls:n,renderer:r}){let i=new On;i.name=`sandstorm`;let a=Hg(),o=tf(Wg(256),{srgb:!1}),s={uTime:{value:0},uStorm:{value:1},uSpeed:{value:zg},uWind:{value:Rg.clone()},uHaze:{value:Bg},uHazeColor:{value:new W().setRGB(.5,.36,.21)},uSand:{value:o},uSandAlbedo:{value:new W().setRGB(.42,.31,.18)},uHeight:{value:a.tex},uHM:{value:new Jt(Vg.x0,Vg.z0,1/Vg.step,0)},uHMSize:{value:new H(a.nx,a.nz)},uPxWorld:{value:.001}},c=()=>Fo.clone(K.fog),l=$g(),u=new Co(1,1,28,4).translate(.5,.5,0),d=new ks().copy(u),f=new Float32Array(l.length*4),p=new Float32Array(l.length*4),m=new Float32Array(l.length*4);l.forEach((e,t)=>{f.set(e.slice(0,4),t*4),p.set(e.slice(4,8),t*4),m.set(e.slice(8,12),t*4)}),d.setAttribute(`aA`,new Oi(f,4)),d.setAttribute(`aB`,new Oi(p,4)),d.setAttribute(`aC`,new Oi(m,4)),d.instanceCount=l.length,d.boundingSphere=new Or(new U(0,20,-760),1600);let h=new G(d,new Ro({name:`sandVeils`,uniforms:{...c(),...s,uColor:{value:new W().setRGB(.7,.53,.33)},uColorHi:{value:new W().setRGB(1.05,.8,.52)}},vertexShader:Yg,fragmentShader:Xg,transparent:!0,depthWrite:!1,side:2,forceSinglePass:!0,fog:!0}));h.name=`sandVeils`,h.renderOrder=2,i.add(h);let g=5e3,_=q(4242),v=new Ir,y=new Float32Array(g*4);for(let e=0;e<y.length;e++)y[e]=_();v.setAttribute(`position`,new xr(new Float32Array(g*3),3)),v.setAttribute(`aSeed`,new xr(y,4));let b=new Ro({name:`sandGrains`,uniforms:{...s,uCenter:{value:new U},uPx:{value:1e3},uGrainA:{value:0},uGrainColor:{value:new W().setRGB(.6,.46,.29)}},vertexShader:Zg,fragmentShader:Qg,transparent:!0,depthWrite:!1}),x=new Ki(v,b);x.name=`sandGrains`,x.frustumCulled=!1,x.renderOrder=3,i.add(x);let S=new Set,C=e=>{e?.traverse(e=>{e.isMesh&&e.material&&!S.has(e.material)&&(S.add(e.material),e_(e.material,s))})},w=e.getObjectByName(`surface`),T=w?.getObjectByName(`earth`);w?.traverse(e=>{e.isMesh&&e!==T&&!S.has(e.material)&&(S.add(e.material),e_(e.material,s,{streaks:e.name===`terrain`,sway:e.name===`shrubs`}))}),C(e.getObjectByName(`surface-dynamic`)),C(e.getObjectByName(`silo17/remains`));let E=Lg();i.add(E.group),e_(E.weedMat,s,{thin:!0}),e_(E.shadowMat,s);let D=e.getObjectByName(`sky`)?.material.uniforms;D?.uDust&&(D.uDust.value=s.uHazeColor.value);let O=new H,k=1;return{group:i,update:(e,i)=>{s.uTime.value=i;let a=s.uStorm.value;a!==k&&(s.uStorm.value=k>a?Math.min(k,a+e/2):Math.max(k,a-e/2));let o=s.uStorm.value;s.uHaze.value=Bg*o,D?.uStorm&&(D.uStorm.value=o),r.getDrawingBufferSize(O),s.uPxWorld.value=2*Math.tan(Ot.degToRad(t.fov)/2)/O.y,E.update(e,i,s.uWind.value,o);let c=n.target,l=t.position.distanceTo(c),u=1-Ot.smoothstep(l,60,140),d=Ot.smoothstep(c.y,-3,1)*Ot.smoothstep(t.position.y,0,6);b.uniforms.uGrainA.value=.5*u*d,x.visible=o>0&&u*d>.01,x.visible&&(b.uniforms.uCenter.value.copy(c),b.uniforms.uPx.value=1/s.uPxWorld.value),h.visible=o>0},set(e){k=Ot.clamp(e,0,1)},get strength(){return s.uStorm.value},uniforms:s}}function n_({pool:e}){let t=new On;t.name=`rooms/top`;let n=new Lh(`top`),r=[w_,T_,E_,D_,O_];for(let i of r)t.add(i({pool:e,signs:n}));return t.add(n.mesh()),t}var r_=74.7;function i_(e,t,n,r,i,a,o,s=.03){e.bb(`matte`,t,a,r,n,a+s,i,o)}function a_(e,t,n,r,i,a,o,{step:s=3,R:c=74.9,t:l=.03}={}){let u=Math.max(1,Math.ceil(Math.abs(i-r)/s));for(let s=0;s<u;s++){let d=r+(i-r)*s/u,f=r+(i-r)*(s+1)/u,p=Math.min(Math.abs(d),Math.abs(f)),m=Math.sqrt(c*c-p*p);m<=n||e.bb(`matte`,t*n,a,d,t*m,a+l,f,o)}}function o_(e,t,n,r,i,{h:a=7,color:o=`#8d8b85`,seam:s=null,step:c=2.4,R:l=r_}={}){let u=Math.max(1,Math.ceil(Math.abs(i-r)/c));for(let c=0;c<u;c++){let d=r+(i-r)*c/u,f=r+(i-r)*(c+1)/u,p=t*Math.sqrt(l*l-d*d),m=t*Math.sqrt(l*l-f*f),h=m-p,g=f-d,_=Math.hypot(h,g);if(e.box(`matte`,(p+m)/2,n+a/2,(d+f)/2,_+.04,a,.2,o,Math.atan2(-g,h)),s&&c>0){let t=(l-.11)/l;e.box(`matte`,p*t,n+a/2,d*t,.07,a,.07,s)}}}function s_(e,t=90){return new Aa(e.map(([e,t])=>new H(e,t))).getSpacedPoints(t).map(e=>[e.x,e.y])}var c_=[[0,0],[.1235,1.55],[.247,2.65],[.37,3.3],[.432,3.35],[.551,3.05],[.691,2.35],[.815,1.55],[.918,.65],[1,-.45]];function l_(e,t,n,r=1){return s_(c_.map(([i,a])=>[e+t*a*r,-i*n]))}function u_(e,t){for(let n=0;n<e.length-1;n++){let[r,i]=e[n],[a,o]=e[n+1];if((i-t)*(o-t)<=0&&i!==o){let e=(t-i)/(o-i),n=a-r,s=o-i,c=Math.hypot(n,s);return{x:r+n*e,tx:n/c,tz:s/c}}}let n=t>e[0][1]?0:e.length-1,[r,i]=e[Math.max(0,n-1)],[a,o]=e[Math.max(1,n)],s=Math.hypot(a-r,o-i)||1;return{x:e[n][0],tx:(a-r)/s,tz:(o-i)/s}}function d_(e,t,n,r){let i=u_(e,t),a=-i.tz*r,o=i.tx*r;return{x:i.x+a*n/2,z:t+o*n/2,nx:a,nz:o,ry:Math.atan2(a,o)}}function f_(e,t,n,r,i,a,o,s,c=`matte`){let l=[[u_(t,n).x,n],...t.filter(([,e])=>e<n-.05&&e>r+.05),[u_(t,r).x,r]],u=[],d=[];for(let e=0;e<l.length;e++){let[t,n]=l[e];if(e===0||e===l.length-1){u.push([t+i/2,n]),d.push([t-i/2,n]);continue}let r=l[e-1],a=l[e+1],o=a[0]-r[0],s=a[1]-r[1],c=Math.hypot(o,s);o/=c,s/=c,u.push([t-s*i/2,n+o*i/2]),d.push([t+s*i/2,n-o*i/2])}let f=new Pa;f.moveTo(u[0][0],-u[0][1]);for(let e=1;e<u.length;e++)f.lineTo(u[e][0],-u[e][1]);for(let e=d.length-1;e>=0;e--)f.lineTo(d[e][0],-d[e][1]);let p=new yo(f,{depth:o,bevelEnabled:!1,curveSegments:1});e.geo(c,p,0,a,0,s,1,1,1,-Math.PI/2,0,0)}function p_(e,t,n,r,i,a=.04){e.bb(`matte`,Math.min(t,n)-.02,r,-a,Math.max(t,n)+.02,i,.01,Ih)}function m_(e,t,n,r,i,{ry:a=0,drop:o=1.1,color:s=`#f3efe4`,power:c=1.6,body:l=`#2b2e30`}={}){e.push(t,n-o,r,a),e.box(`metal`,0,.06,0,i,.12,.3,l),e.box(`glow`,0,-.006,0,i-.14,.02,.18,X(s,c));for(let t of[-1,1])e.box(`metal`,t*(i/2-.35),(o+.12)/2,0,.018,o-.12,.018,`#1d1f20`);e.pop()}function h_(e,t,n,r,i=0,{color:a=`#fff1dc`,power:o=4,r:s=.17,plate:c=`#4a4a46`}={}){e.push(t,n,r,i),e.box(`metal`,0,0,.03,.16,.26,.06,c),e.sphere(`glow`,0,0,.21,s,X(a,o),10,8),e.pop()}function g_(e,t,n,r,{color:i=`#fff2dc`,power:a=4.2}={}){e.cyl(`metal`,t,n,r,.22,.05,`#3a3c3b`,12),e.cyl(`metal`,t,n,r,.04,.95,`#3a3c3b`,6),e.cyl(`glow`,t,n+.9,r,.2,1.55,X(i,a),14),e.cyl(`metal`,t,n+2.45,r,.22,.06,`#3a3c3b`,12)}function __(e,t,n,r,i,a,o,s){let c=new Pa;c.absellipse(0,0,i,a,0,Math.PI*2,!1,0),e.geo(`matte`,Lp(c,o,!1,48),t,n-o,r,s,1,1,1,-Math.PI/2,0,0);let l=new Pa;l.absellipse(0,0,i-.25,a-.25,0,Math.PI*2,!1,0),e.geo(`matte`,Lp(l,.12,!1,48),t,n-o-.1,r,X(s,.86),1,1,1,-Math.PI/2,0,0)}function v_(e,t,n,r,i=0){e.push(t,n,r,i),e.box(`matte`,0,.745,0,1.3,.05,.72,`#abb3a9`),e.box(`matte`,-.48,.36,0,.32,.72,.66,`#8e988e`),e.box(`matte`,.61,.36,0,.05,.72,.66,`#8e988e`),e.box(`matte`,.07,.42,-.31,1.12,.6,.04,`#88928a`),e.box(`matte`,.05,1,-.1,.46,.42,.42,`#e0dccb`),e.box(`matte`,.05,.97,-.34,.34,.3,.16,`#d6d2c0`),e.box(`glow`,.05,1.01,.113,.36,.28,.01,X(`#eef4e4`,1.9)),e.box(`matte`,.05,.785,.2,.44,.03,.15,`#c8c3b0`),e.pop(),Q.chair(e,t+Math.sin(i)*.72,n,r+Math.cos(i)*.72,i+Math.PI,{color:`#2f3335`})}function y_(e,t,n,{base:r=`#4a2921`,wain:i=`#6c4634`,batten:a=`#63392b`,rail:o=`#7b5139`,frieze:s=`#3e2219`,panel:c=3.3,battens:l=null,wainH:u=.95}={}){e.box(`wood`,0,n/2,-.15,t,n,.3,r),e.box(`wood`,0,u/2,.02,t,u,.04,i),e.box(`wood`,0,u+.03,.05,t,.08,.1,o),e.box(`wood`,0,n-.16,.04,t,.32,.08,s);let d=l;if(!d){let e=Math.max(1,Math.round(t/c));d=Array.from({length:e+1},(n,r)=>-t/2+r*t/e)}for(let t of d)e.box(`wood`,t,n/2,.05,.16,n,.1,a)}function b_(e,t,n,{w:r=1.6,h:i=2.4,base:a=.9,mounted:o=!1,color:s=`#3e2119`}={}){o||e.box(`wood`,t,a/2,.24,r+.1,a,.48,`#4a2a1f`),e.box(`wood`,t,a-.03,.26,r+.16,.06,.52,`#5c3526`),e.push(t,a,0,0);let c=new Pa;c.curves=Rp(r,i).curves,c.holes.push(Rp(r-.24,i-.2,0,.1)),e.geo(`wood`,Lp(c,.46,!1,12),0,0,0,s),e.geo(`wood`,Lp(Rp(r-.2,i-.15,0,.08),.04,!1,12),0,0,.01,`#2a1712`);for(let t of[.12,.72,1.32]){e.box(`wood`,0,t,.25,r-.26,.04,.4,`#4a2a20`);let i=-r/2+.2;for(;i<r/2-.25;){let r=.08+n()*.14,a=.2+n()*.26;e.box(`matte`,i+r/2,t+.02+a/2,.24,r,a,.26,n.pick([`#6a2a22`,`#2e4436`,`#7a5c34`,`#34384e`,`#a8966e`,`#b7ae9a`])),i+=r+.03}}e.box(`wood`,0,(i-.1)/2,.44,.05,i-.3,.04,s),e.box(`wood`,0,1.02,.44,r-.24,.05,.04,s),e.box(`glow`,0,i-r/2-.05,.12,r*.5,.03,.1,X(`#ffd6a0`,1.6)),e.pop()}function x_(e,t,n,r,i){e.cyl(`metal`,t,n,r,.42,1.05,i,14),e.geo(`metal`,Z.torus(.07,5,16),t,n+1.05,r,X(i,.72),.42,.42,.42,Math.PI/2,0,0),e.cyl(`matte`,t,n+.98,r,.36,.03,`#1c1e1e`,12)}var S_=null;function C_(){if(S_)return S_;let e=bf(1024,256,{tint:[1,1,1]});try{let t=e.getContext(`2d`),n=t.getImageData(0,0,e.width,e.height),r=n.data;if(r&&r.length){for(let e=0;e<r.length;e+=4){let t=(.3*r[e]+.59*r[e+1]+.11*r[e+2])/255,n=Math.min(1,Math.max(0,(t-.4)/.3));r[e]=Math.min(255,r[e]*(1.12+.06*n)),r[e+1]=Math.min(255,r[e+1]*(.98+.2*n)),r[e+2]=Math.min(255,r[e+2]*(.84+.36*n))}t.putImageData(n,0,0)}}catch{}return S_=tf(e,{repeat:!1}),S_}function w_({pool:e,signs:t}){let n=new Fp(`top/cafeteria`),r=Y(1),i=r+7,a=q(101),o=`#958a76`,s=`#625c50`,c=.6,l=l_(29.75,-1,24.3),u=l_(60.25,1,24.3);f_(n,l,0,-24.3,c,r,7,o),p_(n,29.45,30.05,r,i),f_(n,u,0,-3.4,c,r,7,o),f_(n,u,-5.4,-24.3,c,r,7,o),f_(n,u,-3.4,-5.4,c,r+2.8,4.2,o),p_(n,59.95,60.55,r,i),n.bb(`matte`,29.9,r,-24.6,64.2,i,-24,`#857a68`);for(let e=0;e>-24;e-=2){let t=u_(u,e).x,i=u_(u,e-2).x;i_(n,19.6,29.6,e,e-2,r,`#9b917f`),i_(n,29.6,Math.max(t,i,u_(u,e-1).x),e,e-2,r,`#a59989`),e>-18.3&&a_(n,1,Math.min(t,i),e,Math.max(e-2,-18.3),r,`#857f73`,{step:2})}i_(n,10,30.2,-24,-33.8,r,`#8f877a`),i_(n,10,19.6,-20.6,-24,r,`#8f877a`),n.bb(`matte`,10,r,-34.1,30.5,i,-33.8,`#6d6553`),n.bb(`matte`,29.9,r,-33.8,30.5,i,-24.3,`#6d6553`);let d=r+3,f=zp(24.7,6,2.4);f.holes.push(zp(22.9,5.3,1.5,0,-.3));let p=new yo(f,{depth:.35,bevelEnabled:!0,bevelThickness:.22,bevelSize:.25,bevelSegments:3,curveSegments:10});n.geo(`matte`,p,45,r+3.3,-23.93,`#857863`),n.bb(`matte`,33.7,r+.55,-24.02,56.3,r+5.45,-23.98,`#141515`),n.mesh(Rh(C_(),45,d,-23.95,22,4.4,0,1.15,`top/cafeteria/wallscreen`)),__(n,45.9,i,-12.5,10.25,7.2,.95,`#a0957f`);for(let[e,t]of[[30.75,-19],[34.6,-19],[59.3,-19],[59.45,-10]])m_(n,e,i,t,3.4,{color:`#f6ead4`});for(let e of[42.3,50.9])n.box(`metal`,e,i-1.15,-19.3,.55,.36,.42,`#2d3031`),n.box(`metal`,e,i-.5,-19.3,.03,1,.03,`#1d1f20`);for(let e of[-18.6,-22]){let t=d_(l,e,c,1);h_(n,t.x,r+4,t.z,t.ry)}for(let e of[-11,-15.8,-20.6]){let t=d_(u,e,c,-1);h_(n,t.x,r+4.1,t.z,t.ry)}let m=[[31.1,-7.2],[31.4,-12.2],[58.9,-7.4],[58.9,-16.2],[40.3,-23],[47.2,-23]];for(let[e,t]of m)g_(n,e,r,t);let h=0;for(let e=0;e<8;e++){let t=-1.4-e*3.04;for(let i=0;i<9;i++){let o=30.05+i*3.425;if(!(o-1.25<d_(l,t,c,1).x)&&!(i===0&&(e<2||e>5))&&!m.some(([e,n])=>Math.abs(e-o)<1.2&&Math.abs(n-t)<1)){h++,Q.table(n,o,r,t,0,{w:1.7,d:.85,top:`#d9d4c6`,leg:`#3a3d3d`});for(let e of[-.64,.64])for(let i of[-.45,.45])a()<.12||Q.chair(n,o+i,r,t+e,e>0?Math.PI:0,{color:`#34383a`})}}}let g=zp(1.75,2.1,.62);g.holes.push(zp(1.42,1.78,.48));let _=Lp(g,.12,!1,8),v=Lp(zp(1.44,1.8,.48),.02,!1,8);for(let e of[-11,-15.8]){let t=d_(u,e,c,-1);n.push(t.x,r+1.95,t.z,t.ry),n.geo(`metal`,_,0,0,0,`#6d6b66`),n.geo(`glow`,v,0,0,-.01,X(`#e3e8e4`,1.25)),n.pop()}{let e=d_(l,-10,c,1),n=t.make(`CAFETERIA`,{style:`panel`,size:56});t.place(n,e.x+e.nx*.03,r+4.25,e.z+e.nz*.03,.7,e.ry)}let y=-18.3;n.bb(`matte`,u_(u,y).x,r,-18.6,72.8,i,y,s),o_(n,1,r,0,y,{color:s}),n.bb(`matte`,63.6,r,-6.1,73.2,r+1.05,-5,`#b9b2a2`),n.bb(`matte`,63.5,r+1.05,-6.2,73.3,r+1.12,-4.9,`#cbc5b6`),n.bb(`matte`,63.6,r,-5.02,73.2,r+.12,-4.98,`#7a756a`),n.box(`matte`,69,r+1.35,-5.65,.95,.46,.5,`#5a5d5b`);for(let e=0;e<5;e++)n.box(`matte`,64.6+e*.9,r+1.14,-5.55,.62,.04,.42,`#a49d8c`);for(let e=0;e<3;e++)Q.cabinet(n,71.5+e*.6,r,-9.55,0,{w:.58,h:1.4,d:.5,color:`#7c7f79`,drawers:2});Q.shelf(n,67.4,r,-17.95,0,{w:5,h:2.2,levels:4,color:`#4f514f`,rng:a,palette:[`#b3ad9e`,`#8a867b`,`#9e947c`,`#6c7b78`]}),Q.pendant(n,66,i,-5.6,{drop:2.85,r:.16,power:1.6,color:`#ffd9a8`,shade:`#3a3c3b`});for(let e of[68.2,70.4,72.4])Q.pendant(n,e,i,-5.6,{drop:2.85,r:.16,power:4.2,color:`#ffcf96`,shade:`#3a3c3b`});return e.add(45,r+4.5,-11,16770756,30),e.add(37,r+3,-20,16768176,14),e.add(53,r+3,-20,16768176,14),e.add(68.5,r+3.8,-6,16765594,16),n.finish(Fh())}function T_({pool:e,signs:t}){let n=new Fp(`top/sheriff`),r=Y(1),i=r+7;q(202);let a=`#8f8d86`,o=`#958b7b`;i_(n,-74.9,-52,-13.3,0,r,`#a7a698`),n.bb(`matte`,-74.2,r,-13.3,-52.45,i,-13,a),n.bb(`matte`,-73.9,r,-12.98,-52.45,r+1,-12.94,`#2e6a66`),o_(n,-1,r,0,-13,{color:`#8e8d82`}),n.bb(`matte`,-74.9,i-.07,-13.3,-52,i-.01,-.04,`#45463f`);let s=-52.45,c=-4.3,l=-.7,u=r+.25,d=r+3.15;n.bb(`matte`,s,r,-13.3,-52,i,c,a),n.bb(`matte`,s,r,l,-52,i,0,a),n.bb(`matte`,s,r,c,-52,u,l,a),n.bb(`matte`,s,d,c,-52,i,l,a);{let e=3.5999999999999996,t=d-u,r=new Pa;r.moveTo(-3.5999999999999996/2,-t/2),r.lineTo(e/2,-t/2),r.lineTo(e/2,t/2),r.lineTo(-3.5999999999999996/2,t/2),r.lineTo(-3.5999999999999996/2,-t/2),r.holes.push(zp(3.3,t-.3,.55)),n.geo(`matte`,Lp(r,.4900000000000028,!1,8),-52.470000000000006,(u+d)/2,-5/2,`#2b2e2f`,1,1,1,0,Math.PI/2,0),n.geo(`glass`,Z.box(),-104.45/2,(u+d)/2,-5/2,`#b9cfcc`,.03,t-.32,3.28)}p_(n,s,-52,r,i),n.bb(`wood`,-52.5,r,-9.4,s,r+2.5,-8.1,`#6e5238`);for(let e=0;e<4;e++)Q.locker(n,-52.72,r,-12.3+e*.57,-Math.PI/2,{color:`#6c7c76`}),Q.locker(n,-52.72,r,-7.5+e*.57,-Math.PI/2,{color:`#6c7c76`});for(let[e,t]of[[-70.5,-3.6],[-64.6,-3.6],[-59.2,-3.6],[-54.5,-3.6],[-64,-9.4],[-58.6,-9.4]])Q.crtDesk(n,e,r,t,0,{desk:`#7e807b`,body:`#dcd7c7`,screen:`#e2eed8`,power:1.8});for(let e of[-72,-71.38,-70.76,-70.14,-62.1,-61.48])Q.cabinet(n,e,r,-12.6,0,{w:.6,h:1.4,color:`#7f8f86`});let f=t.make(`SHERIFF`,{style:`panel`,size:60,bg:`#2f6b68`,fg:`#f4f1e8`,border:`rgba(244,241,232,0.4)`});t.place(f,-63,r+4.95,-12.9,.95),n.geo(`matte`,Z.cyl(32),-63.1,r+3.7,-12.95,`#8f6d34`,.76,.05,.76,Math.PI/2,0,0),n.geo(`metal`,Z.torus(.06,6,32),-63.1,r+3.7,-12.9,`#c9a45a`,.74,.74,.74);let p=new Pa;for(let e=0;e<10;e++){let t=Math.PI/2+e/10*Math.PI*2,n=e%2?.21:.5;e===0?p.moveTo(Math.cos(t)*n,Math.sin(t)*n):p.lineTo(Math.cos(t)*n,Math.sin(t)*n)}n.geo(`metal`,Lp(p,.05),-63.1,r+3.7,-12.93,`#d8b25a`),n.bb(`matte`,-68.4,r+1.8,-12.98,-65.8,r+3,-12.92,`#e6e5df`);for(let e of[-71.7,-60.1])h_(n,e,r+4.5,-12.98,0);n.box(`metal`,-72.1,r+2.35,-12.95,.14,1.7,.08,`#6a6c6b`),n.box(`glow`,-72.1,r+2.35,-12.89,.1,1.6,.05,X(`#f1f5ff`,6));for(let e of[-72.2,-64.5,-57.3])m_(n,e,i,-6,3.2,{drop:.5});e.add(-63,r+4.5,-6.5,15921898,28);let m=-4.7;n.bb(`matte`,-52,r,m,-48.72,r+.03,0,`#56595a`),n.bb(`matte`,-48.72,r,m,-44.6,r+.03,0,`#3d4042`);for(let e=0;e<3;e++)for(let t=0;t<4;t++)n.box(`matte`,-47.95+e*1.17,r+.035,-.9-t*1,.36,.01,.08,`#d9d4c0`);n.bb(`matte`,-52,r+3.35,m,-44.6,r+3.6,0,`#bdb8ad`),p_(n,-52,-44.6,r+3.35,r+3.6);for(let[e,t]of[[-48.9,-48.55],[-45,-44.6]])n.bb(`matte`,e,r,-.45,t,r+3.35,0,`#b8b3a8`),p_(n,e,t,r,r+3.35);n.geo(`metal`,Z.torus(.1,8,32),-48.72,r+1.55,-2.25,`#2a2e30`,1.35,1.35,1.35,0,Math.PI/2,0),n.box(`metal`,-48.72,r+.08,-2.25,.3,.16,2.4,`#2a2e30`);{let e=2.95,t=-93.95/2;n.geo(`metal`,Lp(zp(3.75,e,.6),.4,!1,8),t,r+e/2,-4.1,`#141617`);for(let e of[.55,1.45,2.35])n.box(`metal`,t,r+e,-3.6599999999999997,3.25,.12,.08,`#4a4f52`);n.box(`metal`,-47.175000000000004,r+e/2,-3.67,.05,2.5500000000000003,.05,`#2c3032`),n.geo(`metal`,Z.torus(.1,6,20),-47.725,r+1.5,-3.5799999999999996,`#8d9396`,.32,.32,.32),n.geo(`metal`,Z.cyl(10),-47.725,r+1.5,-3.6199999999999997,`#6a7073`,.08,.14,.08,Math.PI/2,0,0)}let h=[-48.25,-46.78,-45.3],g=[.9,1.95,3];for(let e of[-1.3,-3.45]){for(let t of h)n.rod(`metal`,[t,r+.05,e],[t,r+3.35,e],.045,`#8e9396`,6);for(let t of g)n.rod(`metal`,[-48.4,r+t,e],[-45.15,r+t,e],.04,`#8e9396`,6);let t=e>-2.5?-1:1;for(let i of h)for(let a of g)n.cylR(`metal`,i,r+a,e+t*.1,.07,.16,`#b7bcbe`,Math.PI/2,0,0,8)}for(let e of[-50.45,-46.78])n.box(`glow`,e,r+3.33,-2.35,1.3,.03,.5,X(`#eef4ff`,2.6));n.bb(`wood`,-51.95,r+.45,-4.5,-51.35,r+.52,-2.3,`#6e5238`),Q.figure(n,-50.6,r,-2.4,.35),Q.figure(n,-50.85,r+.62,-4.2,.05),n.box(`metal`,-50.85,r+2.78,-4.55,.6,.05,.3,`#5b5e5d`),n.box(`metal`,-50.85,r+2.62,-4.42,.04,.3,.04,`#5b5e5d`),e.add(-50.4,r+2.8,-2.4,15660287,10),e.add(-46.8,r+2.8,-2.2,15267071,12);let _=-44.6,v=-22.4,y=-r,b=22.200000000000003,x=Math.atan2(y,b),S=Math.hypot(b,y),C=y/b,w=Math.cos(x),T=Math.sin(x),E=e=>r+(e-_)*C,D=3.6,O=.42,k=e=>E(e)+D+O/w,A=m/2,j=4.7,M=-67/2,N=r+y/2,P=`#b3aa98`;n.box(`matte`,M+T*.25,N-w*.25,A,S,.5,j,P,0,0,x),n.box(`matte`,M+T*.25,N-w*.25,-.01,S,.52,.04,Ih,0,0,x);let F=D*w+O/2,I=1.3,L=M-T*F+I/2*w,R=N+w*F+I/2*T;n.box(`matte`,L,R,A,S+I,O,j,P,0,0,x),n.box(`matte`,L,R,-.01,S+I,.44,.04,Ih,0,0,x),n.bb(`matte`,v,0,-5,-22.049999999999997,k(v),0,o),p_(n,v,-22.049999999999997,0,k(v)),n.bb(`metal`,-22.45,.05,-3.5,v,2.45,-1.2,`#3a3f41`),n.bb(`matte`,-52,r,-5,v,i,m,o);{let e=_+(i-.02-r-D-O/w)/C,t=new Pa;t.moveTo(e,i-.02),t.lineTo(v,i-.02),t.lineTo(v,k(v)),t.lineTo(e,i-.02),n.geo(`matte`,Lp(t,.3,!1,1),0,0,-5,o)}i_(n,_,v,m,0,r,`#9c968a`);for(let e of[-34.2,-26.9])n.box(`metal`,e,r+2.4,-4.680000000000001,.26,.26,.04,`#6a6b68`),n.sphere(`glow`,e,r+2.4,-4.63,.08,X(`#fff3de`,4),8,6);for(let e of[-43,-39.3,-35.6,-31.9,-28.2,-24.5])h_(n,e,E(e)+2.7,m,0,{power:4.5,color:`#ffe8c8`});let ee=[-44,E(-44)+.95,-4.54],te=[-23.2,E(-23.2)+.95,-4.54];n.rod(`metal`,ee,te,.03,`#b3aea3`,6);for(let e=-43.2;e<-23.2;e+=2.6)n.box(`metal`,e,E(e)+.9,-4.62,.04,.1,.16,`#8f8b82`);n.rod(`metal`,[-44.2,E(-44.2)+D-.22,-.55],[-22.799999999999997,E(-22.799999999999997)+D-.22,-.55],.12,`#6e6254`,8);for(let[e,t]of[[-41.9,0],[-40.8,.2]])n.box(`metal`,e,r+3+t,-4.66,.46,.62,.08,`#55585a`),n.box(`glow`,e,r+3.08+t,-4.61,.07,.3,.01,X(`#f2f2ea`,2.2));return e.add(-38,E(-38)+2.6,-2.4,16770240,14),e.add(-28,E(-28)+2.6,-2.4,16770240,14),n.finish(Fh())}function E_({pool:e,signs:t}){let n=new Fp(`top/judicial`),r=Y(14),i=r+7,a=q(1414),o=4.5,s=3.6,c=-30.3,l=-50.3;n.bb(`matte`,-74.95,r+s,-.3,l,i,.01,Ih),n.bb(`matte`,l,r+o,-.3,-21,i,.01,Ih),p_(n,l,-50,r,r+o,.3),p_(n,c,-30,r,r+o,.3),i_(n,-50,c,-15,0,r,`#40362f`),n.bb(`wood`,-50,r+o,-15,c,r+o+.2,-.3,`#3b261f`);let u=-80.3/2;n.at(u,r,-15,0,()=>y_(n,20.3,o,{battens:[-49.92,-49,-46.35,-43.7,-35,-32.4,-30.38].map(e=>e-u)})),n.at(-50,r,-15/2,Math.PI/2,()=>y_(n,15,o)),n.at(c,r,-15/2,-Math.PI/2,()=>y_(n,15,o));{let e=-39.3,t=r+3.02,i=`#e2d6b8`;n.geo(`matte`,Z.cyl(40),e,t,-14.84,i,1.1,.08,1.1,Math.PI/2,0,0),n.geo(`matte`,Z.cyl(40),e,t,-14.8,`#2c1c16`,.94,.04,.94,Math.PI/2,0,0);for(let r=0;r<16;r++){let a=r/16*Math.PI*2;n.box(`matte`,e+Math.cos(a)*.6,t+Math.sin(a)*.6,-14.77,.36,.1,.02,i,0,0,a)}}for(let e of[-47.6,-33.7])n.bb(`wood`,e-.5,r+2.1,-14.94,e+.5,r+3.1,-14.9,`#8c7452`),n.bb(`matte`,e-.4,r+2.2,-14.9,e+.4,r+3,-14.88,`#1d2626`);let d={color:`#ffd9a6`,power:4.5,plate:`#6d5a3a`};for(let e of[-45,-36.6])h_(n,e,r+3.6,-14.9,0,d);h_(n,-49.9,r+3.6,-12.3,Math.PI/2,d);for(let[e,t]of[[-12.8,3.6],[-2.4,3.55]])h_(n,-30.400000000000002,r+t,e,-Math.PI/2,d);n.at(-49.9,r,-7.5,Math.PI/2,()=>b_(n,0,a,{w:1.9,h:2.3,base:.95}));for(let[e,t]of[[-9.4,1.7],[-3.2,2]])n.at(-30.400000000000002,r,e,-Math.PI/2,()=>b_(n,0,a,{w:t,h:2.2,base:1.1,mounted:!0}));n.bb(`wood`,-49.9,r,-14.95,-48.3,r+.85,-14.3,`#4a2a1e`),n.bb(`wood`,-49.95,r+.85,-15,-48.25,r+.9,-14.25,`#5c3526`),n.cyl(`metal`,-48.8,r+.9,-14.6,.06,.26,`#b89a55`,8),n.at(-50,r,-4.9,Math.PI/2,()=>{n.box(`metal`,0,1.35,.08,1.5,2.7,.08,`#2a2c2d`),n.box(`metal`,0,1.3,.14,1.3,2.55,.06,`#141617`),n.geo(`metal`,Z.torus(.12,6,20),0,1.35,.2,`#c9a13b`,.2,.2,.2),n.geo(`metal`,Z.cyl(16),0,1.35,.19,`#8a6a2a`,.12,.04,.12,Math.PI/2,0,0),n.box(`matte`,0,1.85,.18,.5,.14,.01,`#d8d2c2`)});let f=t.make(`RELIC STORAGE`,{style:`panel`,size:40});t.place(f,-49.86,r+2.95,-4.9,.24,Math.PI/2),n.bb(`fabric`,-43.8,r+.02,-10.8,-36.3,r+.05,-4.8,`#7e261f`),n.bb(`fabric`,-43.45,r+.05,-10.45,-36.65,r+.06,-5.15,`#942f26`),n.bb(`wood`,-42.4,r,-10.7,-37.8,r+1,-9.75,`#4f2c20`),n.bb(`wood`,-42.55,r+1,-10.8,-37.65,r+1.08,-9.62,`#6a3f2d`);for(let e of[-41.55,-38.65])n.bb(`wood`,e-.55,r,-9.75,e+.55,r+1,-9.35,`#5a3325`);n.bb(`wood`,-40.55,r+.15,-9.76,-39.65,r+.85,-9.7,`#3e2219`);for(let e of[-41.9,-38.2])n.cyl(`metal`,e,r+1.08,-10.3,.09,.05,`#b89a55`,10),n.cyl(`metal`,e,r+1.1,-10.3,.02,.26,`#b89a55`,5),n.sphere(`glow`,e,r+1.42,-10.3,.09,X(`#ffcf8a`,4.5),8,6);n.box(`matte`,-39.6,r+1.1,-10.25,.5,.02,.34,`#d8d0bc`),n.push(-40.1,r,-11.35,0),n.box(`wood`,0,.25,0,.62,.5,.56,`#3d2016`),n.box(`fabric`,0,.52,0,.66,.08,.6,`#6b3a28`),n.box(`fabric`,0,1.2,-.27,.7,1.3,.12,`#6b3a28`),n.box(`wood`,0,1.88,-.27,.76,.08,.14,`#4a2a1f`),n.pop(),n.bb(`wood`,-31.15,r,-10.6,-30.4,r+.45,-8.2,`#4a281c`),n.bb(`fabric`,-31.2,r+.45,-10.65,-30.35,r+.55,-8.15,`#5e2c22`),n.bb(`fabric`,-30.6,r+.55,-10.65,-30.35,r+1,-8.15,`#5e2c22`),n.bb(`wood`,-32.6,r,-9.2,-31.5,r+.42,-7.8,`#35211a`),e.add(-40,r+3.4,-8,16764815,22),i_(n,-74.9,l,-15.3,0,r,`#595650`),n.bb(`matte`,-74.5,r+s,-15.3,l,r+s+.2,-.3,`#8e8b84`),n.bb(`matte`,-74.5,r,-15.3,l,r+s,-15,`#8a8780`),n.bb(`matte`,-50.33,r,-15,l,r+s,-.3,`#8a8780`),o_(n,-1,r,0,-15,{h:s,color:`#8a8780`});let p=(e,t,i)=>{n.push(e,r,t,0);for(let e of[-1,0,1])n.box(`metal`,e*i/2,1.6,0,.06,3.2,.7,`#222426`);for(let e of[.1,.85,1.6,2.35,3.1]){if(n.box(`metal`,0,e,0,i,.04,.7,`#2b2d2f`),e>3)continue;let t=-i/2+.12;for(;t<i/2-.3;){let r=.34+a()*.2;a()<.55?n.box(`matte`,t+r/2,e+.2,(a()-.5)*.1,r,.36,.5,a.pick([`#b8a27a`,`#a48b62`,`#c9b58a`,`#8f7a58`])):n.sphere(`fabric`,t+r/2,e+.21,0,r*.5,a.pick([`#e2dccb`,`#d6cdb6`,`#ece6d8`]),8,6,.8),t+=r+.05}}n.pop()};for(let e of[-61.6,-57.6,-53.6])p(e,-10.2,3.8);p(-61.6,-3,3.8),n.bb(`wood`,-56.3,r,-4.8,-54.7,r+.78,-4,`#5e3a28`),Q.chair(n,-55.5,r,-3.65,Math.PI,{color:`#2e2a28`}),Q.crtDesk(n,-71.1,r,-5.6,0),Q.crtDesk(n,-67.6,r,-5.6,0);for(let e=0;e<5;e++)Q.cabinet(n,-73+e*.6,r,-8.55,0,{w:.58,h:1.4,color:`#5e6360`});for(let e of[-62,-68])Q.panelLight(n,e,r+s-.02,-6);e.add(-58,r+3,-6,15790056,14);let m=-7.3;i_(n,-30,-21,m,0,r,`#5c5852`),n.bb(`matte`,-30,r,-7.6,-21.5,r+o,m,`#7a7465`),n.bb(`matte`,-30,r+1,m,-21.5,r+1.8,-7.26,`#6b4632`),n.bb(`matte`,-30,r,m,-21.5,r+1,-7.26,`#3f403e`),n.bb(`matte`,-30,r+o-.02,m,-21,r+o+.2,-.3,`#3c3a36`);let h=t.make(`JUDICIAL`,{style:`panel`,size:60,bg:`#5a3a2c`});return t.place(h,-26.6,r+3.9,-7.24,.6),n.finish(Fh())}function D_({pool:e,signs:t}){let n=new Fp(`top/it`),r=Y(19),i=r+7,a=q(1919),o=`#7d7b75`,s=`#76736b`,c=.6,l=s_([[0,0],[.1,1.3],[.22,2.2],[.38,2.7],[.6,2.8],[.8,2.6],[1,2.2]].map(([e,t])=>[34.25-t,-e*21.3])),u=l_(57.8,1,21.3);f_(n,l,0,-21.3,c,r,7,o),p_(n,33.95,34.55,r,i),f_(n,u,0,-21.3,c,r,7,o),p_(n,57.5,58.1,r,i),n.bb(`matte`,29.7,r,-21.6,43.9,i,-21,o),n.bb(`matte`,47.9,r,-21.6,62.7,i,-21,o),n.bb(`matte`,43.9,r+3.5,-21.6,47.9,i,-21,o);for(let e of[43.75,48.05])n.bb(`metal`,e-.15,r,-21.65,e+.15,r+3.6,-20.95,`#a3a7a9`);n.bb(`metal`,43.6,r+3.5,-21.65,48.2,r+3.65,-20.95,`#a3a7a9`);for(let e=0;e>-21;e-=2){let t=Math.max(e-2,-21.6),i=u_(u,e).x,a=u_(u,t).x,o=u_(u,(e+t)/2).x;i_(n,19.6,Math.max(i,a,o),e,t,r,`#858779`),a_(n,1,Math.min(i,a),e,t,r,`#83816f`,{step:2})}i_(n,10,30.3,-21,-33.8,r,`#807e6e`),n.bb(`matte`,10,r,-34.1,30.6,i,-33.8,`#5c584b`),n.bb(`matte`,29.7,r,-33.8,30.3,i,-21.3,`#5c584b`),o_(n,1,r,0,-21.6,{color:s,seam:`#6f6c64`}),n.bb(`matte`,60,r,-21.6,72.2,i,-21.3,s),__(n,47,i,-11,8.35,6,.95,`#8a8373`);for(let[e,t,r]of[[35.7,-17,3.4],[40.9,-17,2.4],[54.8,-17,2.4],[57.1,-8,3.4]])m_(n,e,i,t,r,{color:`#eef2ff`,drop:1.3});n.box(`metal`,47.6,i-1.2,-17,.5,.3,.4,`#2d3031`),n.box(`metal`,47.6,i-.52,-17,.03,1.05,.03,`#1d1f20`);let d=(e,t,i)=>{n.push(e,r,t,i),n.box(`metal`,0,1.27,.03,1.1,2.55,.06,`#3f4648`),n.box(`metal`,0,1.25,.07,.94,2.44,.04,`#5a6366`),n.box(`metal`,.34,1.15,.1,.06,.2,.05,`#c9c9c0`),n.pop()};for(let e of[34.3,38,42.1,51.9,56.4])d(e,-21,0),h_(n,e,r+3.2,-21,0,{color:`#f4f6ff`,power:4.5});{let e=d_(u,-3,c,-1);d(e.x,e.z,e.ry),h_(n,e.x,r+3.2,e.z,e.ry,{color:`#f4f6ff`,power:4.5});for(let e of[-10.8,-16]){let t=d_(u,e,c,-1);h_(n,t.x,r+3.2,t.z,t.ry,{color:`#f4f6ff`,power:4.5})}}let f=`#5f676e`;n.bb(`matte`,40.7,r,-46.3,41,i,-21.6,f),n.bb(`matte`,51,r,-46.3,51.3,i,-21.6,f),n.bb(`matte`,40.7,r,-46.6,51.3,i,-46.3,f),n.bb(`matte`,40.7,i-.1,-46.6,51.3,i-.02,-21.6,`#4a5055`),i_(n,41,51,-21.6,-46.3,r,`#3c4245`);for(let e of[-24.5,-29.5,-38.5])Q.panelLight(n,46,i-.12,e,3.2,.5,{color:`#e4f0ff`,power:3.4});let p=[`#58f07a`,`#58f07a`,`#58f07a`,`#ffb347`,`#ff4b3e`,`#6fd6ff`];for(let[e,t]of[[44.6,1],[47.4,-1]])for(let i=0;i<6;i++){let o=-24.4-i*1.44;n.box(`metal`,e,r+1.05,o,.95,2.1,1.36,`#2c3034`),n.box(`metal`,e+t*.48,r+1.05,o,.02,1.95,1.2,`#1c1e1f`);for(let i=0;i<6;i++)n.box(`glow`,e+t*.495,r+.35+a()*1.5,o-.5+a()*1,.01,.03,.06,X(a.pick(p),4))}n.geo(`glass`,Z.box(),46,r+1.6,-33.4,`#cfe0e6`,9.8,3.2,.05);for(let e=41.2;e<=50.9;e+=2.42)n.bb(`metal`,e-.04,r,-33.46,e+.04,r+3.2,-33.34,`#3b3e3e`);for(let e of[42.5,49.5])for(let t of[-37.5,-40.5])n.box(`metal`,e,r+1.05,t,1.3,2.1,1,`#26292b`);n.bb(`fabric`,45.2,r+.03,-45.1,46.8,r+.05,-44.1,`#34403f`),Q.tube(n,46,i-.3,-34,8,Math.PI/2,{color:`#cfe6ff`,power:2.2}),e.add(46,r+2.8,-26,13624575,16);for(let e=0;e<6;e++)for(let t=0;t<6;t++)v_(n,35.2+e*3.1,r,-2.6-t*3.3,0);v_(n,54.3,r,-3.2,0),v_(n,56.9,r,-3.2,0),v_(n,58.3,r,-8,-Math.PI/2);let m=53.5,h=59.4;n.bb(`metal`,m,r,-11,h,r+.06,-5,`#5b5e5c`);let g=(e,t,i,a)=>{let o=Math.abs(t-e),s=(e+t)/2;if(a){n.bb(`metal`,e,r,i-.06,t,r+.55,i+.06,`#34383a`),n.geo(`glass`,Z.box(),s,r+1.75,i,`#d7e6e6`,o,2.4,.04),n.bb(`metal`,e,r+2.95,i-.06,t,r+3.08,i+.06,`#34383a`);for(let t=0;t<=o+.01;t+=o/Math.max(1,Math.round(o/2)))n.bb(`metal`,e+t-.04,r,i-.05,e+t+.04,r+3,i+.05,`#34383a`)}else{n.bb(`metal`,i-.06,r,Math.min(e,t),i+.06,r+.55,Math.max(e,t),`#34383a`),n.geo(`glass`,Z.box(),i,r+1.75,s,`#d7e6e6`,.04,2.4,o),n.bb(`metal`,i-.06,r+2.95,Math.min(e,t),i+.06,r+3.08,Math.max(e,t),`#34383a`);for(let a=0;a<=o+.01;a+=o/Math.max(1,Math.round(o/2)))n.bb(`metal`,i-.05,r,Math.min(e,t)+a-.04,i+.05,r+3,Math.min(e,t)+a+.04,`#34383a`)}};g(m,h,-5,!0),g(m,h,-11,!0),g(-5,-11,m,!1),g(-5,-11,h,!1);for(let e of[-9,-9.6,-10.2])Q.cabinet(n,54,r,e,Math.PI/2,{w:.58,h:1.4,d:.5,color:`#6e726f`});n.bb(`matte`,53.44,r+3.08,-11.06,59.46,r+3.18,-4.94,`#5f6363`),Q.panelLight(n,56.45,r+3,-8,3.4,.6);{let e=d_(l,-8,c,1),n=t.make(`IT`,{style:`panel`,size:60,sub:`INFORMATION TECHNOLOGY`});t.place(n,e.x+e.nx*.03,r+4.1,e.z+e.nz*.03,.8,e.ry)}return e.add(46,r+4,-10,15791359,26),e.add(56.4,r+2.8,-8,16774368,14),n.finish(Fh())}function O_({pool:e,signs:t}){let n=new Fp(`top/watcher`),r=Y(20),i=r+7,a=q(2020),o=-63.9,s=-54.5,c=3.1,l=-64.4,u=3.3,d=-50.1,f=(e,t,i,a)=>n.bb(`matte`,e,r+i,-.3,t,r+a,.01,Ih);f(-74.95,d,u,7),f(-74.95,-73.2,0,u),f(l,o,0,u),f(o,s,c,u),f(s,d,0,u),n.bb(`matte`,s,r,-11.3,d,i,-.3,`#7f7b6d`),n.bb(`matte`,-74.5,r+u,-11.3,s,i,-.3,`#8f8c85`);let p=`#1f2428`,m=-9.6;n.bb(`matte`,l,r,-9.9,s,r+c,m,p),n.bb(`matte`,l,r,m,o,r+u,-.3,p),n.bb(`matte`,o,r+c,m,s,r+c+.2,-.3,`#181c1f`),i_(n,o,s,m,-.3,r,`#262b2e`);let h=tf(xf(512,288,4,3),{repeat:!1});for(let e=0;e<4;e++)for(let t=0;t<3;t++)n.box(`matte`,-59.95+e*.5,r+.9+.2+t*.4,-9.15,.54,.44,.9,`#2b302f`);n.mesh(Rh(h,-59.2,r+1.5,-8.68,2,1.2,0,1.6,`top/watcher/crtbank`)),n.bb(`matte`,-60.4,r,-8.6,-58,r+.78,-7.9,`#2a2f2e`),Q.chair(n,-59,r,-7.6,Math.PI,{color:`#2a2e2d`}),n.box(`matte`,-63.879999999999995,r+1.85,-6.3,.04,1.1,1.1,`#2c3236`);for(let[e,t]of[[-.3,.05],[.3,-.05],[.05,.3],[-.05,-.3]])n.box(`glow`,-63.85,r+1.85+t,-6.3+e,.01,.22,.24,X(`#eef2ea`,3));e.add(-59.2,r+2,-7.2,10481848,10);let g=-6.5;n.bb(`matte`,-74.5,r,-6.8,l,r+u,g,`#a9a69c`),n.bb(`matte`,-64.42,r,g,l,r+u,-.3,`#a9a69c`),i_(n,-74.9,l,g,-.3,r,`#9e9b93`);for(let[e,t]of[[-70.5,-3.6],[-69.4,-3.1],[-68.35,-3.5]])x_(n,e,r,t,`#1f2324`);let _=`#8f8b7e`,v=`#3d7c78`;n.bb(`matte`,d,r,-11.3,-20.5,i,-11,_),n.bb(`matte`,d,r+1.05,-10.98,-20.7,r+1.32,-10.94,v),n.bb(`matte`,d,r+1.05,-11,-50.06,r+1.32,-.3,v),n.bb(`matte`,-21,r,-11,-20.7,i,-3.2,_),n.bb(`matte`,-21,r+2.6,-3.2,-20.7,i,0,_),p_(n,-21,-20.7,r,i),i_(n,d,-20.7,-11,0,r,`#8a8276`),n.rod(`metal`,[-49.9,r+6,-10.75],[-21.2,r+6,-10.75],.08,`#6f7272`,8);let y=-43.5,b=-7.5;n.box(`metal`,y,(r+2.72+i)/2,b,1.1,i-r-2.72,1.1,`#6a6e72`),n.box(`metal`,y,r+2.74,b,1.34,.08,1.34,`#55595c`),n.geo(`metal`,Z.cyl(4,3),y,r+2.03,b,`#62666a`,.31,1.34,.31,0,Math.PI/4,0),n.cyl(`metal`,y,r+1.14,b,.16,.24,`#55595c`,10);for(let e of[-46,-38.6,-31.2])m_(n,e,i,-8,3.1,{drop:2.25});n.bb(`wood`,-42.6,r+1.58,-10.98,-38.9,r+3.03,-10.95,`#5a4a38`);let x=t.custom(420,170,(e,t,n,r,i)=>{e.fillStyle=`#1f2a24`,e.fillRect(t,n,r,i),e.strokeStyle=`rgba(232,234,224,0.8)`,e.lineWidth=3;let a=q(20);for(let i=0;i<7;i++){let o=t+22,s=n+20+i*21,c=t+r-30-a()*150;for(;o<c;){let t=12+a()*34;e.beginPath(),e.moveTo(o,s+(a()-.5)*2),e.lineTo(Math.min(c,o+t),s+(a()-.5)*2),e.stroke(),o+=t+8+a()*6}}});t.place(x,-40.75,r+2.3,-10.93,1.33);let S=t.make(`RECYCLING 20`,{style:`panel`,size:56,bg:`#3d4243`});t.place(S,-38.6,r+3.95,-10.97,.62);let C=[`#2c6662`,`#2c6662`,`#3a3e3f`,`#2a5a57`,`#45494a`],w=[[-48.1,-8.6],[-46.1,-8.6],[-41.7,-8.6],[-39.1,-8.6],[-37,-8.6],[-34.5,-8.6],[-31.9,-8.6],[-29.8,-8.6],[-27.6,-8.6],[y,b],[-47.6,-3],[-45.1,-3],[-42.7,-3],[-40.3,-3]];for(let[e,t]of w)x_(n,e,r,t,a.pick(C));for(let e=0;e<4;e++){let t=-32.9+e*2.6;Q.shelf(n,t,r,-10.35,0,{w:2.5,h:2.8,d:.8,levels:4,color:`#8e9290`,rng:a,fill:.7,palette:[`#8a8d8a`,`#6b6e6c`,`#a0a39f`,`#7a5a3a`,`#4f6a6a`]});for(let e=0;e<4;e++)n.cylR(`metal`,t-.8+e*.5,r+1.05,-10.35,.07,.6,`#9a9d9a`,Math.PI/2,0,0,8)}return n.bb(`wood`,-50.05,r,-5,-48.95,r+1.95,-3.6,`#3b2f27`),n.bb(`wood`,-49.95,r+.2,-3.6,-49.05,r+1.7,-3.57,`#4a3b30`),n.bb(`metal`,-49.75,r+1.95,-4.5,-49.2,r+2.2,-4.1,`#4a4d4c`),n.box(`glow`,-49.45,r+2.12,-4.09,.12,.05,.01,X(`#ffb347`,3)),n.bb(`matte`,-36.7,r,-10.95,-35.2,r+1.1,-10.15,`#d9d8d1`),n.bb(`matte`,-36.75,r+1.1,-11,-35.15,r+1.16,-10.1,`#c8c7bf`),n.bb(`metal`,-36.4,r+.85,-10.14,-35.5,r+.9,-10.1,`#8a8c8a`),Q.crtDesk(n,-27.2,r,-4.2,0,{desk:`#5e615c`}),e.add(-38.6,r+4,-6,16770239,22),e.add(-28,r+4,-6,16770239,14),n.finish(Fh())}var k_=class{constructor(e,{color:t=`#e8ece8`,opacity:n=.35,size:r=1.3,rise:i=1.4,life:a=4.5,seed:o=1}={}){this.group=new On,this.group.name=e,this.items=[],this.opts={color:t,opacity:n,size:r,rise:i,life:a},this.rng=q(o),this.mat=new Kr({map:Ef.steam,color:t,transparent:!0,depthWrite:!1,opacity:n})}add(e,t,n,r=1,i=.4){for(let a=0;a<r;a++){let r=new oi(this.mat.clone());r.name=this.group.name;let a=new U(e+(this.rng()-.5)*i,t,n+(this.rng()-.5)*i);r.position.copy(a),this.group.add(r),this.items.push({s:r,base:a,phase:this.rng()*this.opts.life,drift:(this.rng()-.5)*.4})}return this}update=(e,t)=>{let{life:n,rise:r,size:i,opacity:a}=this.opts;for(let e of this.items){let o=(t+e.phase)%n/n;e.s.position.set(e.base.x+e.drift*o,e.base.y+o*r,e.base.z);let s=i*(.55+o*.9);e.s.scale.set(s,s,s),e.s.material.opacity=a*Math.sin(o*Math.PI)}}};function A_({pool:e}){let t=new On;t.name=`rooms/mids`;let n=new On;n.name=`rooms/mids/dyn`;let r=[],i=new Lh(`mids`),a={pool:e,signs:i,dyn:n,updaters:r};for(let e of[K_,q_,J_,Y_,X_,Z_,Q_])t.add(e(a));return t.add(i.mesh()),{group:t,dyn:n,update:(e,t)=>r.forEach(n=>n(e,t))}}var j_=(e,t=75)=>Math.sqrt(Math.max(0,t*t-e*e)),M_=e=>e*e*(3-2*e),N_=(e,t,n)=>e+(t-e)*n,P_=()=>{let e=J.water.clone();return e.normalMap=J.water.normalMap.clone(),e.normalMap.needsUpdate=!0,e};function F_(e,t,n,r){let i=new Co(e,t),a=X(n),o=i.attributes.position.count,s=new Float32Array(o*3);for(let e=0;e<o;e++)s.set([a.r,a.g,a.b],e*3);i.setAttribute(`color`,new wr(s,3));let c=new G(i,r);return c.rotation.x=-Math.PI/2,c}function I_(e,t,n,r){let i=new Pa;e.forEach(([e,t],n)=>n?i.lineTo(e,-t):i.moveTo(e,-t));let a=new To(i),o=X(n),s=a.attributes.position.count,c=new Float32Array(s*3);for(let e=0;e<s;e++)c.set([o.r,o.g,o.b],e*3);a.setAttribute(`color`,new wr(c,3));let l=a.attributes.uv;for(let e=0;e<s;e++)l.setXY(e,a.attributes.position.getX(e)/8,a.attributes.position.getY(e)/8);let u=new G(a,r);return u.rotation.x=-Math.PI/2,u.position.y=t,u}function L_(e,t,n,r,i=24){let a=Math.asin(Math.min(1,-n/t)),o=Math.asin(Math.min(1,-r/t)),s=[];for(let n=0;n<=i;n++){let r=a+(o-a)*n/i;s.push([e*t*Math.cos(r),-t*Math.sin(r)])}return s}function R_(e,t,n,r,{t:i=.03,mat:a=`matte`}={}){let o=new Pa;t.forEach(([e,t],n)=>n?o.lineTo(e,t):o.moveTo(e,t)),o.closePath(),e.geo(a,Lp(o,i,!1,1),0,n,0,r,1,1,1,Math.PI/2,0,0)}function z_(e,t,n,r,i,a,o){R_(e,[[t*r,0],...L_(t,74.98,0,-i,28),[t*r,-i]],n+.02,a,o)}function B_(e,t,n,r,i,a,{h:o=7,y:s=0,dado:c=null,dadoH:l=1.1,cap:u=!0}={}){let d=74.93,f=Math.asin(-r/d)+.04/d,p=Math.asin(Math.min(1,-i/d)),m=Math.max(2,Math.ceil(d*(p-f)/2.4)),h=d*(p-f)/m;for(let r=0;r<m;r++){let i=f+(p-f)*(r+.5)/m,u=Math.atan2(Math.cos(i),-t*Math.sin(i));if(e.box(`matte`,t*d*Math.cos(i),n+s+o/2,-74.93*Math.sin(i),h+.06,o,.12,a,u),c){let r=74.85000000000001;e.box(`matte`,t*r*Math.cos(i),n+s+l/2,-74.85000000000001*Math.sin(i),h*r/d+.06,l,.04,c,u)}}u&&r===0&&e.bb(`matte`,t*74.8,n+s,-.05,t*75,n+s+o,.001,Ih)}function V_(e,t,n,r,i,a,o,s,{t:c=.3,doors:l=[],dado:u=null,dadoH:d=1.1,frame:f=null}={}){let p=[...l].sort((e,t)=>e.c-t.c),m=new Pa;m.moveTo(0,0);for(let e of p){let t=e.w/2;m.lineTo(e.c-t,0),m.lineTo(e.c-t,e.h-t),m.absarc(e.c,e.h-t,t,Math.PI,0,!0),m.lineTo(e.c+t,0)}if(m.lineTo(a,0),m.lineTo(a,o),m.lineTo(0,o),m.closePath(),e.push(t,n,r,i),e.geo(`matte`,Lp(m,c,!1,10),0,0,-c/2,s),u){let t=0,n=[];for(let e of p)n.push([t,e.c-e.w/2]),t=e.c+e.w/2;n.push([t,a]);for(let[t,r]of n)if(!(r-t<.02))for(let n of[-1,1])e.box(`matte`,(t+r)/2,d/2,n*(c/2+.015),r-t,d,.03,u)}if(f)for(let t of p)Q.archFrame(e,t.c,0,0,0,{w:t.w,h:t.h,color:f,depth:c+.08,t:.12});e.pop()}function H_(e,t,n,r,i,a,{h:o=7,t:s=.3,dado:c=null,dadoH:l=1.1}={}){if(e.bb(`matte`,t-s/2,i,r,t+s/2,i+o,n,a),c)for(let a of[-1,1])e.bb(`matte`,t+s/2*a,i,r,t+a*(s/2+.03),i+l,n-(n===0?.06:0),c);n===0&&e.bb(`matte`,t-s/2-.02,i,-.05,t+s/2+.02,i+o,.001,Ih)}function U_(e,t,n,r,i,{color:a=`#ffd9a0`,power:o=5,r:s=.07,wire:c=`#1a1a1a`}={}){let l=[];for(let e=0;e<=i;e++){let a=e/i;l.push([N_(t[0],n[0],a),N_(t[1],n[1],a)-4*r*a*(1-a),N_(t[2],n[2],a)])}for(let t=0;t<i;t++)e.rod(`metal`,l[t],l[t+1],.01,c,3);for(let t=1;t<i;t++)e.sphere(`glow`,l[t][0],l[t][1]-.06,l[t][2],s,X(a,o),6,4);return i-1}function W_(e,t,n,r,{drop:i=.45,color:a=`#fff6e6`,power:o=6}={}){e.cyl(`metal`,t,n-i+.15,r,.015,i-.15,`#2a2c2d`,4),e.cyl(`metal`,t,n-.04,r,.12,.04,`#6b706e`,10),e.geo(`glass`,Z.cyl(10),t,n-i,r,`#e8ecea`,.15,.3,.15);for(let a=0;a<4;a++){let o=a/4*Math.PI*2+.4;e.rod(`metal`,[t+Math.cos(o)*.15,n-i-.15,r+Math.sin(o)*.15],[t+Math.cos(o)*.15,n-i+.15,r+Math.sin(o)*.15],.008,`#3a3c3d`,3)}e.sphere(`glow`,t,n-i,r,.075,X(a,o),8,6)}function G_(e,t,n,r,{h:i=3.8,color:a=`#ffe0a8`,power:o=6}={}){e.cyl(`metal`,t,n,r,.16,.1,`#1f2122`,8),e.cyl(`metal`,t,n,r,.055,i,`#1f2122`,6),e.cyl(`metal`,t,n+i,r,.11,.05,`#1f2122`,8),e.sphere(`glow`,t,n+i+.14,r,.15,X(a,o),10,8)}function K_({pool:e,signs:t,dyn:n,updaters:r}){let i=new Fp(`mids/filtration`),a=Y(55),o=a+7,s=q(5555),c=`#6a716c`;Vh(i,{s:-1,y0:a,x0:20.8,back:40,wall:c,door:[-1.2,-4.4]}),z_(i,-1,a,20.8,40,`#52574f`),B_(i,-1,a,0,-40,c),i.bb(`matte`,-j_(40)-.2,a,-39.99,-21,a+.45,-39.93,`#3c4141`);let l=Fh();l.tank=J.metal.clone(),l.tank.name=`tank`,l.tank.metalness=.35,l.tank.roughness=.34;let u=P_(),d=new On;n.add(d),r.push((e,t)=>u.normalMap.offset.set(t*.03,t*.017));let f=X(`#5fd8d2`,1.9);{let e=-59.8,t=-56.5,n=1.05,r=`#7b807e`;for(let[o,s]of[[e,-59.449999999999996],[-56.85,t]])i.bb(`matte`,o,a,-21,s,a+n-.05,0,r),i.bb(`matte`,o,a+n-.05,-21,s,a+n,-.02,`#a3a9a6`);i.bb(`matte`,e,a,-21.35,t,a+n,-21,r),i.bb(`matte`,-59.449999999999996,a,-21,-56.85,a+.35,0,`#2c3435`),i.bb(`glow`,-59.449999999999996,a+n-.3,-21,-56.85,a+n-.28,-.03,f);let o=F_(2.599999999999997,21,`#8fe6e2`,u);o.position.set(-116.3/2,a+n-.22,-21/2),o.name=`filtration/water`,d.add(o),i.bb(`matte`,-59.809999999999995,a,-.05,-59.449999999999996,a+n,.001,Ih),i.bb(`matte`,-56.85,a,-.05,-56.49,a+n,.001,Ih),i.bb(`matte`,-59.449999999999996,a,-.05,-56.85,a+.35,.001,Ih),i.bb(`glow`,-59.449999999999996,a+.35,-.06,-56.85,a+n-.22,-.04,X(`#3f9c98`,1.2))}let p=e=>29.08-Math.sqrt(3317.76-(e+.62)**2);{let e=57.6,t=-21.3,n=-2.2,r=.8,o=.3,s=p,c=-.62-Math.sqrt(e*e-50.379999999999995**2),l=[];for(let e=0;e<=14;e++){let t=n+(c-n)*e/14;l.push([s(t),t])}let m=[...l,[t,n]],h=`#343a3a`,g=`#8a908e`;for(let e=0;e<14;e++){let[t,n]=l[e],[s,c]=l[e+1],u=s-t,d=c-n,f=Math.hypot(u,d),p=d/f,m=-u/f,_=(t+s)/2+p*o/2,v=(n+c)/2+m*o/2,y=-Math.atan2(d,u);i.box(`matte`,_,a+.74/2,v,f+.04,.74,o,h,y),i.box(`matte`,_,a+r-.03,v,f+.04,.06,.32,g,y)}i.bb(`matte`,s(n)-o,a,n,t,a+r-.06,-1.9000000000000001,h),i.bb(`matte`,s(n)-o,a+r-.06,-2.21,t,a+r,-1.8900000000000001,g),i.bb(`matte`,t,a,c-.2,-21,a+r,-1.9000000000000001,h),R_(i,m,a+.12,`#263031`,{t:.1}),R_(i,m,a+r-.3,f,{t:.02,mat:`glow`});let _=I_(m,a+r-.2,`#8fe6e2`,u);_.name=`filtration/pool`,d.add(_);for(let e=-5.800000000000001;e>c+2;e-=3.6)i.bb(`matte`,s(e)+.05,a+.1,e-.09,t,a+r-.14,e+.09,`#2d3435`)}let m=`#8c9597`,h=(e,t,n=1.7,r=4.55)=>{i.bb(`metal`,e-n-.25,a,t-n-.25,e+n+.25,a+.22,t+n+.25,`#3a3e3f`),i.cyl(`tank`,e,a+.22,t,n,r,m,28),i.geo(`tank`,Z.hemi(28,7),e,a+.22+r,t,m,n,n*.78,n);for(let o of[.2,.5,.8])i.geo(`tank`,Z.torus(.03,4,32),e,a+.22+r*o,t,`#aab2b4`,n+.03,n+.03,n+.03,Math.PI/2,0,0);i.cyl(`metal`,e,a+.22+r+n*.72,t,.12,.6,`#3a3f40`,10),i.push(e,a,t,-.55),i.cylR(`matte`,0,2.5,n+.03,.19,.06,`#e9e7df`,Math.PI/2,0,0,14),i.box(`matte`,0,2.53,n+.065,.02,.14,.01,`#2a2a2a`,0,0,.7),i.pop(),i.push(e,a,t,.45),i.cylR(`metal`,0,1.75,n+.06,.05,.16,`#3a3f40`,Math.PI/2,0,0,6),i.geo(`metal`,Z.torus(.12,6,18),0,1.75,n+.15,`#5a6264`,.26,.26,.26),i.pop()},g=[[-66.2,-9.5],[-65.2,-15.1],[-63.9,-20.9],[-62,-26.3]],_=[[-60.1,-35.2],[-56.1,-35],[-52.5,-35.2],[-48.9,-35.4],[-45.3,-35.6],[-41.7,-35.8]],v=[[-33.4,-7.8],[-31.6,-17.6],[-29.4,-25],[-26.4,-30.5]];for(let[e,t]of[...g,[-49.8,-6],[-58.5,-30.2],[-65.5,-31],..._,...v])h(e,t);let y=`#3a7a80`;for(let[e,t]of g.slice(0,3))i.rod(`metal`,[e+1.7,a+.5,t],[-59.8,a+.5,t],.11,y,8);i.rod(`metal`,[-61.8,a+.55,-33],[-37,a+.55,-33],.13,y,8);for(let[e]of _)i.rod(`metal`,[e,a+.55,-33],[e,a+.55,-33.4],.1,y,6);i.rod(`metal`,[-58.15,a+.55,-33],[-58.15,a+.55,-21.35],.12,y,8);for(let[e,t]of v.slice(1,3))i.rod(`metal`,[e+1.7,a+.45,t],[p(t)-.3,a+.45,t],.11,y,8);i.rod(`metal`,[-62,a+6.55,-35.4],[-39,a+6.55,-35.4],.2,`#343939`,10),i.rod(`metal`,[-67.2,a+6.55,-8],[-61.6,a+6.55,-28],.18,`#343939`,10);for(let[e,t]of[[-35.6,-25.5],[-23.5,-33.5]]){i.rod(`metal`,[e,a,t],[e,o,t],.16,`#3d4445`,10);for(let n of[.15,.6])i.cyl(`metal`,e,a+7*n,t,.24,.12,`#2f3536`,10)}let b=-63.9;i.cyl(`metal`,b,a,-36,1.75,.22,`#323637`,20),i.geo(`glass`,Z.cyl(20),b,a+3.2,-36,`#cfe6e2`,1.6,6,1.6),i.cyl(`metal`,b,o-.35,-36,1.75,.35,`#323637`,20),i.sphere(`glow`,b,a+2.7,-36,.13,X(`#e6fbff`,6),10,8);let x=-31.5,S=-1.5,C=2.6,w=Math.PI-.12,T=Math.PI*1.5,E=e=>w+(T-w)*e/22,D=e=>a+.12+.68*M_(Math.min(1,e/6.16)),O=(e,t)=>[x+Math.cos(E(e))*t,S+Math.sin(E(e))*t],k=12*(T-w)/22;for(let e=0;e<22;e++){let t=(E(e)+E(e+1))/2,n=Math.atan2(-Math.cos(t),-Math.sin(t)),r=D(e),o=D(e+1),s=(r+o)/2,c=Math.atan2(o-r,k),[l,u]=[x+Math.cos(t)*12,S+Math.sin(t)*12];i.box(`matte`,l,s,u,k+.06,.1,C,`#727978`,n,0,c);for(let e of[-1,1]){let r=12+C/2*e;i.box(`metal`,x+Math.cos(t)*r,s-.14,S+Math.sin(t)*r,k*r/12+.06,.28,.05,`#2c3030`,n,0,c)}if(e%4==2)for(let e of[-1,1]){let[n,r]=[x+Math.cos(t)*(12+e*(C/2-.15)),S+Math.sin(t)*(12+e*(C/2-.15))];i.cyl(`metal`,n,a,r,.06,s-a-.05,`#2c3030`,6)}}let A=`#1e2222`;for(let e of[-1,1]){let t=12+e*(C/2-.05);for(let e=0;e<22;e++){let[n,r]=O(e,t),[a,o]=O(e+1,t);i.rod(`metal`,[n,D(e)+1,r],[a,D(e+1)+1,o],.035,A,5),i.rod(`metal`,[n,D(e)+.5,r],[a,D(e+1)+.5,o],.022,A,4)}for(let e=0;e<=22;e+=2){let[n,r]=O(e,t);i.rod(`metal`,[n,D(e),r],[n,D(e)+1,r],.028,A,4)}}let[j,M]=O(22,12);i.cyl(`metal`,j+1.1,D(22),M,.04,1.3,`#2c3030`,6),i.sphere(`matte`,j+1.1,D(22)+1.4,M,.16,`#ecebe4`,10,8),i.geo(`matte`,Z.torus(.1,6,16),j+1.3,D(22)+.9,M+.1,`#a3342b`,.22,.22,.22);for(let e=0;e<18;e++)Q.barrel(i,-25.3+e%6*.62,a,-.5-Math.floor(e/6)*.65,{r:.28,h:.8,color:s.pick([`#3f6a8a`,`#8a3f2f`,`#5e6a3a`])});for(let e of[-69.6,-57.4,-45.6,-33.9,-22.4])for(let t=0;t<6;t++){let n=-3.2-t*8.1;n<-38||-e>j_(Math.abs(n)+1.6)-1.2||Q.tube(i,e,o-.5,n,3,Math.PI/2,{color:`#e2f6ff`,power:4.5})}for(let e of[-46.6,-39.2])i.rod(`metal`,[e,a+6.6,-30],[e,o,-30],.015,`#1e2222`,3);t.place(t.make(`WATER FILTRATION 55`,{style:`panel`,size:58,padY:1,bg:`#2f3a3c`}),-42.9,a+5.75,-30,1.75);for(let e of[-52.1,-50.1])i.rod(`metal`,[e,a+4.06,-4.02],[e,a+4.06,-5],.02,`#2a2e2e`,4);t.place(t.make(`OSMOSIS BANK B`,{style:`panel`,size:46,bg:`#2a3234`}),-51,a+4.06,-3.98,.46),t.place(t.make(`OSMOSIS BANK A`,{style:`panel`,size:46,bg:`#2a3234`}),-33.4,a+3.95,-6.04,.4);let N=-12.8,P=-j_(N,74.8);t.place(t.make(`RESERVOIR ←`,{style:`panel`,size:40,bg:`#2a3234`}),P,a+3.9,N,.62,Math.atan2(-P,12.8));let F=new k_(`filtration/wisp`,{size:1.6,opacity:.28,seed:55});return F.add(-23.6,a+1,-6,1).add(-23.2,a+1,-12,1).add(-22.6,a+1,-19,1).add(-58.15,a+1.2,-8,1),n.add(F.group),r.push(F.update),e.add(-44,a+4.5,-18,14218495,24),e.add(-30,a+4,-8,14218495,18),e.add(-60,a+4,-12,14218495,18),e.add(-50,a+4.5,-30,14218495,14),i.finish(l)}function q_({pool:e,signs:t}){let n=new Fp(`mids/medical`),r=Y(62),i=r+7,a=q(6262),o=`#86958b`,s=`#5f6b62`,c=`#646d64`,l=`#4a524c`,u=`#d3dad6`;Vh(n,{s:1,y0:r,x0:20.8,back:42,wall:o,door:[-1.2,-4.4],wainscot:s}),z_(n,1,r,20.8,42,`#929a90`),B_(n,1,r,0,-42,c,{dado:l}),R_(n,[[54.1,-.01],...L_(1,74.97,-.01,-15.8,6),[54.1,-15.8]],r+.035,`#747c70`,{t:.01}),H_(n,30.9,0,-3.2,r,o,{dado:s}),H_(n,34.4,0,-16.15,r,o,{dado:s}),V_(n,53.9,r,0,Math.PI/2,16.15,7,o,{doors:[{c:4.2,w:2.1,h:2.7}],dado:s,frame:u}),n.bb(`matte`,53.73,r,-.05,54.07,i,.001,Ih);let d=[28.7,30.3,31.9,33.5];V_(n,20.95,r,-16,0,13.3,7,`#6f7c74`,{doors:d.map(e=>({c:e-20.95,w:.95,h:2.8})),dado:`#4f5a53`,frame:`#8d9a92`});for(let e of d){n.bb(`matte`,e-.62,r,-17.05,e+.62,r+3.05,-16.95,`#48524d`);for(let t of[-.62,.62])n.bb(`matte`,e+t-.05,r,-16.95,e+t+.05,r+3.05,-16.2,`#56615b`);n.bb(`matte`,e-.62,r+2.95,-16.95,e+.62,r+3.05,-16.2,`#56615b`)}V_(n,34.55,r,-9.6,0,53.75-34.55,7,o,{doors:[{c:43.7-34.55,w:2.3,h:2.9}],dado:s,frame:u}),V_(n,54.05,r,-16,0,j_(16)-54.05,7,c,{doors:[{c:3,w:1.3,h:2.5}],dado:l}),V_(n,20.95,r,-30,0,32.95,7,o,{doors:[{c:6,w:1.4,h:2.5},{c:27,w:1.4,h:2.5}],dado:s}),H_(n,53.9,-16,-30,r,o,{dado:s});let f=[[37.2,-6.4,0],[40.6,-6.4,0],[47.2,-6.4,0],[50.3,-6.4,0],[36.6,-11,Math.PI],[39.3,-11,Math.PI],[44.4,-12.7,.35],[48.6,-11,Math.PI],[51.3,-11,Math.PI],[36.6,-19.8,0],[39.3,-19.8,0],[42,-19.8,0],[44.7,-19.8,0],[47.4,-19.8,0],[50.1,-19.8,0],[36.5,-28.8,0],[39.2,-28.8,0],[41.9,-28.8,0],[44.6,-28.8,0],[47.3,-28.8,0],[50,-28.8,0],[52.6,-28.8,0],[22.6,-28.8,0],[25.3,-28.8,0],[28,-28.8,0],[30.7,-28.8,0],[33.2,-28.8,0],[23.5,-20.5,Math.PI/2],[43.7,-4.8,0]],p=(e,t,i,a)=>{let o=`#2b2f2e`;n.push(e,r,t,i),n.box(`metal`,0,.3,0,1,.1,2,o);for(let[e,t]of[[-.46,-.96],[1/2-.04,-.96],[-.46,.96],[1/2-.04,.96]])n.box(`metal`,e,.15,t,.05,.3,.05,o);n.box(`fabric`,0,.43,0,.94,.16,1.94,`#ecebe6`),n.box(`fabric`,0,.52,.2,.98,.05,1.24,a),n.box(`fabric`,0,.56,-.7,.7,.1,.34,`#f4f2ec`),n.box(`metal`,0,.62,-.97,1,.64,.06,o),n.box(`metal`,0,.46,.97,1,.32,.05,o),n.pop()};f.forEach(([e,t,n])=>p(e,t,n,a.pick([`#dfe4df`,`#cdd8dc`,`#e3dccd`])));for(let[e,t]of[[39.9,-8.8],[45.3,-8.4],[38,-12.6],[43.4,-21.6],[49,-21.6],[40.5,-27.3],[26.7,-27.3]])n.cyl(`metal`,e,r,t,.16,1.3,`#3f7a4a`,12),n.sphere(`metal`,e,r+1.3,t,.16,`#3f7a4a`,10,6),n.cyl(`metal`,e,r+1.42,t,.04,.14,`#9aa09c`,6);for(let[e,t]of[[36,-7.4],[48.6,-7.4],[41,-18.5],[46,-27.5],[29.3,-27.4]])n.cyl(`metal`,e,r,t,.2,.04,`#9aa09c`,8),n.cyl(`metal`,e,r,t,.02,1.9,`#c9ccca`,5),n.box(`metal`,e,r+1.9,t,.4,.02,.02,`#c9ccca`),n.box(`glass`,e-.15,r+1.7,t,.12,.24,.06,`#e8f0f0`);let m=(e,t,i,a=`#a2aba7`,o=1.1,s=2)=>{n.push(e,r,t,i),n.box(`metal`,0,s/2,0,o,s,.6,a),n.box(`metal`,0,s/2,.305,.02,s-.1,.01,X(a,.7));for(let e of[-.12,.12])n.box(`metal`,e,s*.55,.31,.03,.14,.02,`#d8dcd9`);n.pop()};m(39,-9.1,0),m(46.1,-9.1,0),m(52.8,-9.1,0,`#4a514e`),m(69.2,-10.6,-.35,`#3d4341`,1,1.9),m(57.2,-4.6,-Math.PI/2,`#848b88`,.6,1.75),m(21.6,-1.3,Math.PI/2,`#7d8582`,.9,1.8),m(22,-15.5,0,`#c9cec9`,1.8,1.4);for(let e=0;e<15;e++){let t=22.2+e*2.1;Math.abs(t-26.95)<1.1||Math.abs(t-47.95)<1.1||(m(t,-30.5,Math.PI,`#dfe3df`,1.1,1.8),m(t,-41.2+(t>50?3:0),0,`#c9cfcb`,1.1,1.8))}for(let e=0;e<8;e++){let t=22.1+e%2*2.8,i=-5.4-Math.floor(e/2)*1.7;n.box(`fabric`,t+.95,r+.36,i,1.9,.08,.75,`#6f7f6a`),n.box(`metal`,t+.95,r+.17,i,1.8,.34,.05,`#5a5f5c`)}for(let e=0;e<6;e++){let t=22.8+e%3*2.8,i=-1.4-Math.floor(e/3)*2.6;n.box(`fabric`,t,r+.28,i,.9,.56,.8,`#8b5e3c`),n.box(`fabric`,t,r+.72,i-.33,.9,.62,.16,`#7d5334`);for(let e of[-.4,.4])n.box(`fabric`,t+e,r+.5,i,.12,.3,.8,`#7d5334`)}for(let[e,t]of[[32.6,-5.6],[32.6,-10.6],[29.2,-8.2],[29.4,-13.2],[24,-3],[24.5,-9.5],[38.5,-4.6],[44,-4.6],[49.5,-4.6],[61,-6],[66,-11],[38,-14.5],[44,-14.5],[50,-14.5],[38,-24.5],[44,-24.5],[50,-24.5],[25,-20],[30.5,-20],[25,-26.5],[30.5,-26.5]])W_(n,e,i,t);t.place(t.make(`MEDICAL 62`,{style:`panel`,size:60,bg:`#2c3b3d`,spacing:.2}),30.75,r+4.4,-15.83,.84),d.forEach((e,n)=>t.place(t.make(`BAY ${n+1}`,{style:`panel`,size:30,bg:`#2c3b3d`}),e,r+3.2,-15.8,.14)),t.place(t.make(`EXIT`,{style:`panel`,size:34,bg:`#23302e`}),53.72,r+3.2,-4.2,.26,-Math.PI/2),t.place(t.make(`WARD A`,{style:`light`,size:30}),43.7,r+3.3,-9.43,.2);for(let[t,n,i]of[[27,-7,12],[32.6,-9,14],[44,-5,18],[44,-18,12],[62,-8,8]])e.add(t,r+5.5,n,16056312,i);return n.finish(Fh())}function J_({pool:e,signs:t,dyn:n,updaters:r}){let i=new Fp(`mids/gardens`),a=Y(66),o=q(6666),s=`#5c5a53`,c=52.5;Vh(i,{s:-1,y0:a,x0:20.8,back:c,wall:s,door:[-1.2,-4.4]}),z_(i,-1,a,20.8,c,`#3c6a33`,{mat:`foliage`}),B_(i,-1,a,0,-52.5,s);let l=(e,t,n,r)=>i.bb(`matte`,e,a+.02,r,t,a+.07,n,`#9d9282`);l(-38.8,-35.9,0,-7.4),l(-50.4,-38,-7.4,-16.4),l(-59.3,-21.2,-20.4,-22.6),l(-45.4,-42.6,-16.4,-52.5),l(-23,-21.2,-4.6,-20.4),l(-35.9,-21.2,-2.6,-4.6);let u=(e,t,n,r,s=1.1)=>i.bb(`foliage`,e,a,r,t,a+s,n,X(`#2d5a2d`,.9+o()*.2));for(let[e,t,n,r,i]of[[-59.6,-57,-1.6,-2.8,1.25],[-56.2,-54.2,-2.9,-4.4],[-39.8,-38.9,-1.3,-7],[-35.8,-34.9,-2.3,-9.6],[-34.6,-33.8,-10.4,-17.6],[-36.4,-31,-18.8,-19.7],[-28.2,-24,-18.8,-19.7],[-60.2,-59.3,-11.8,-19.6],[-57.4,-56.6,-12.6,-19.6],[-59.2,-52.4,-23.5,-24.4],[-49.5,-46.2,-23.5,-24.4],[-41.8,-30.5,-23.5,-24.4],[-46.4,-45.6,-25.5,-34],[-42.4,-41.6,-25.5,-34],[-46.4,-45.6,-36,-46],[-42.4,-41.6,-36,-46],[-53.8,-51.2,-7.4,-8.3],[-29.4,-27.2,-2.2,-3.1]])u(e,t,n,r,i);let d=-39.4,f=-8.2,p=-15.6,m=`#bdb8ab`;i.bb(`matte`,-49.4,a,-16,-39,a+.45,p,m),i.bb(`matte`,-49.4,a,f,-39,a+.45,-7.799999999999999,m),i.bb(`matte`,-49.4,a,p,-49,a+.45,f,m),i.bb(`matte`,d,a,p,-39,a+.45,f,m),i.bb(`matte`,-49,a,p,d,a+.08,f,`#243d3c`);let h=P_(),g=F_(9.600000000000001,7.4,`#5e7a74`,h);g.position.set(-88.4/2,a+.34,-23.799999999999997/2),g.name=`gardens/water`,n.add(g),r.push((e,t)=>h.normalMap.offset.set(t*.02,t*.013));for(let e=0;e<26;e++){let e=-48.4+o()*8.400000000000002,t=-15+o()*6.2;Math.hypot(e+44.2,t+11.9)<1.5||i.cyl(`foliage`,e,a+.36,t,.26+o()*.18,.02,`#4f8a3c`,10)}let _=-44.2,v=-11.9,y=`#55595a`;i.cyl(`matte`,_,a,v,1,.5,y,16),i.cyl(`matte`,_,a+.5,v,.32,.8,y,10),i.cyl(`matte`,_,a+1.3,v,.75,.14,y,16),i.cyl(`matte`,_,a+1.44,v,.18,.4,y,8),i.sphere(`matte`,_,a+1.9,v,.2,y,10,8);for(let[e,t,n]of[[-60.6,-13.8,.85],[-47.2,-3.2,.95],[-40.8,-28.7,1.05],[-29,-8.2,1.15],[-24.4,-16.7,1.1],[-44.5,-41.5,.95]])Q.tree(i,e,a+.05,t,{h:3.6*n,r:1.75*n,leaf:`#4c9a45`,seed:Math.round(-e*7-t)});let b=(e,t,n)=>{i.push(e,a,t,n),i.box(`wood`,0,.45,0,1.6,.06,.45,`#8a6a46`),i.box(`wood`,0,.72,-.2,1.6,.4,.05,`#8a6a46`);for(let e of[-.7,.7])i.box(`metal`,e,.22,0,.06,.44,.4,`#2a2c2d`);i.pop()};for(let[e,t,n]of[[-29.4,-19.6,0],[-26,-7.8,-Math.PI/2],[-33.2,-12.6,-Math.PI/2],[-56.8,-30.5,Math.PI/2],[-52.5,-26,0],[-36.2,-26,0],[-48.4,-30,Math.PI/2],[-26.2,-31,-Math.PI/2],[-38.4,-36,-Math.PI/2],[-49.4,-38,Math.PI/2]])b(e,t,n);let x=3.8,S=[[-40.8,-3.4],[-34.3,-3.4],[-31.9,-14.4],[-38.2,-21.2],[-47.1,-19.3],[-27,-26],[-50.5,-30],[-55.2,-25.2]];for(let[e,t]of S)G_(i,e,a,t,{h:x});let C=([e,t])=>[e,a+x-.05,t],w=[[0,3],[3,1],[1,2],[0,4],[4,7],[3,5],[4,6],[2,5]],T=0;for(let[e,t]of w)T+=U_(i,C(S[e]),C(S[t]),.75,10);let E=-4.6,D=-49.6,O=e=>[N_(-65.9,-49,e),N_(E,D,e)],k=e=>[-j_(e,73.55),e],A=4.9,j=2.5,M=.9,N=`#2d3331`,P=`#cdc9bf`,F=[];for(let e=0;e<=15;e++)F.push(O(e/15));for(let e=15;e>=0;e--)F.push(k(O(e/15)[1]));R_(i,F,a+.06,`#5f5d55`);let I=`#a9bab4`,L=(e,t,n,r,a)=>{let o=new Ir;o.setAttribute(`position`,new wr([...e,...t,...n,...e,...n,...r],3)),o.computeVertexNormals(),i.geo(`glass`,o,0,0,0,a)};for(let e=0;e<=15;e++){let[t,n]=O(e/15),[r,o]=k(n);if(i.cyl(`metal`,t,a,n,.06,j,N,6),i.rod(`metal`,[t,a+j,n],[r,a+A,o],.06,N,5),i.cyl(`metal`,r,a,o,.06,A,N,6),e===15)continue;let[s,c]=O((e+1)/15),[l,u]=k(c),d=Math.hypot(s-t,c-n),f=-Math.atan2(c-n,s-t);i.box(`matte`,(t+s)/2,a+M/2,(n+c)/2,d+.05,M,.26,P,f),i.rod(`metal`,[t,a+M,n],[s,a+M,c],.04,N,4),i.rod(`metal`,[t,a+j,n],[s,a+j,c],.05,N,4),L([t,a+M,n],[s,a+M,c],[s,a+j,c],[t,a+j,n],I),L([t,a+j,n],[s,a+j,c],[l,a+A,u],[r,a+A,o],I);for(let e of[.18,.72]){let d=N_(t,r,e),f=N_(n,o,e),p=N_(s,l,e),m=N_(c,u,e),h=Math.hypot(p-d,m-f),g=-Math.atan2(m-f,p-d);i.box(`wood`,(d+p)/2,a+.82,(f+m)/2,h+.02,.06,1,`#7a5a3a`,g),i.box(`metal`,(d+p)/2,a+.4,(f+m)/2,.06,.8,.9,`#2a2c2d`,g)}}{let[e,t]=O(0),[n]=k(E);i.bb(`matte`,n,a,t-.13,e,a+M,t+.13,P),L([n,a+M,t],[e,a+M,t],[e,a+j,t],[n,a+A,t],`#ccd6d1`);let[r,o]=O(1),[s]=k(D);i.bb(`matte`,s,a,o-.13,r,a+M,o+.13,P),L([s,a+M,o],[r,a+M,o],[r,a+j,o],[s,a+A,o],I)}let R=0;for(let e of[.18,.72])for(let t=0;t<47&&R<93;t++){let[n,r]=O((t+.5)/47),[s,c]=k(r),l=(t%2?.28:-.28)/Math.max(1,Math.hypot(s-n,c-r)),u=N_(n,s,e+l),d=N_(r,c,e+l);i.cyl(`matte`,u,a+.85,d,.2,.26,`#9a5a3a`,8,1.2),i.ico(`foliage`,u,a+1.42,d,.42+o()*.12,o.pick([`#8cc47a`,`#7bb86a`,`#9fd08a`]),1,.85,t),R++}let ee=(e,t)=>{let[n,r]=O(e),[i,a]=k(O(e)[1]);return[N_(n,i,t),N_(r,a,t)]};for(let e=0;e<4;e++){let[t,n]=ee(e/4,.3),[r,o]=ee((e+1)/4,.3);U_(i,[t,a+4.45,n],[r,a+4.45,o],.45,7)}for(let e=0;e<=4;e++){let[t,n]=ee(e/4,.3);i.rod(`metal`,[t,a+4.45,n],[t,a+7,n],.01,`#1a1a1a`,3)}for(let e of[-46.4,-40.6])i.rod(`metal`,[e,a+6.1,-39],[e,a+7,-39],.015,`#1e2222`,3);t.place(t.make(`GARDENS 66`,{style:`panel`,size:60,bg:`#3b3a35`,border:`rgba(0,0,0,0)`,spacing:.34}),-43.5,a+5.64,-39,.93),t.place(t.make(`GLASS HOUSE`,{style:`green`,size:44}),-70.2,a+3.3,-4.4399999999999995,.4);let te=-33.6,ne=-j_(te,74.7);t.place(t.make(`THE GARDENS · REFLECTION POOL`,{style:`panel`,size:36,bg:`#3b3a35`,border:`rgba(0,0,0,0)`,spacing:.3}),ne,a+4,te,.6,Math.atan2(-ne,33.6));let re=new k_(`gardens/wisp`,{size:1.4,opacity:.2,seed:66,rise:.8});return re.add(-44.2,a+1.6,-11.9,3,1.2).add(-69,a+.8,-12,1).add(-64,a+.8,-30,1).add(-58,a+.8,-44,1),n.add(re.group),r.push(re.update),e.add(-44,a+3.6,-11,16767392,20),e.add(-30,a+3.6,-10,16767392,16),e.add(-62,a+3.5,-20,15925232,14),e.add(-40,a+3.6,-30,16767392,12),i.finish(Fh())}function Y_({pool:e,signs:t,dyn:n,updaters:r}){let i=new Fp(`mids/market`),a=Y(68),o=q(6868),s=6.1,c=`#56534e`,l=`#9a968c`,u=`#dcd7cc`;Vh(i,{s:1,y0:a,x0:20.8,back:62,wall:`#4a4843`,door:[-1.2,-4.4]}),z_(i,1,a,20.8,62,`#6f6a62`),B_(i,1,a,0,-62,`#4a4843`);let d=[`#c9b98f`,`#a9bb62`,`#bf4f3c`,`#d59a48`,`#8fb070`,`#d8c77a`,`#b8643c`,`#e0d6b8`,`#7f9a5a`],f=[[24.6,30.9],[34.4,44.9],[48.6,58.8],[62.5,80]],p=[[0,-13],[-16.5,-29.5],[-33,-46],[-49.5,-59]],m=(e,t,{awnings:n=!0,doorAt:r=null,awning:a=null}={})=>{let o=q(t),s=Math.max(1,Math.floor((e-.8)/3.3)),c=(e-.8)/s;for(let e=0;e<s;e++){let s=.4+c*(e+.5);if(r===null?(e+t)%2==0:Math.abs(s-r)<c/2){if(Q.archDoor(i,s,0,0,0,{w:1.1,h:2.25,color:`#27231f`,frame:`#bdb6a6`}),i.sphere(`glow`,s,2.62,.18,.09,X(`#ffd9a0`,5),6,4),a||n&&o()<.55){let e=a||o.pick([`#3d7f7a`,`#a3392f`,`#d9cfb5`,`#3f6f4a`]);i.box(`fabric`,s,2.85,.5,1.9,.05,1,e,0,.35,0),i.box(`fabric`,s,2.62,.98,1.9,.22,.02,X(e,.85))}}else{let e=o()<.6;i.box(`matte`,s,1.6,.03,1,1.1,.05,`#bdb6a6`),i.box(e?`glow`:`matte`,s,1.6,.06,.8,.9,.02,e?X(`#ffcf7a`,2.1):`#2a2a28`),i.box(`wood`,s,1.02,.25,1.4,.1,.45,`#6b4431`)}let l=o()<.55;i.box(`matte`,s,4.45,.03,.9,1,.05,`#bdb6a6`),i.box(l?`glow`:`matte`,s,4.45,.06,.72,.82,.02,l?X(`#ffd48a`,2):`#2a2a28`)}};p.forEach(([e,t],n)=>{f.forEach(([r,f],p)=>{let h=Math.min(f,j_(t)-.9);if(h-r<3.5)return;let g=100+n*10+p;if(n===0){let n=-5.6;i.bb(`matte`,r,a,t,r+.3,a+s,e,c),i.bb(`matte`,h-.3,a,t,h,a+s,e,c),i.bb(`matte`,r+.3,a,t,h-.3,a+s,n,`#a39d90`),i.bb(`matte`,r,a+s-.25,n,h,a+s,e,c),i.bb(`matte`,r+.3,a+3,n,h-.3,a+3.25,e,`#6a6660`);for(let t of[r,h-.3])i.bb(`matte`,t-.02,a,e-.05,t+.32,a+s+.02,e+.001,u);i.bb(`matte`,r,a+2.98,e-.05,h,a+3.27,e+.001,u),i.bb(`matte`,r,a+s-.27,e-.05,h,a+s+.02,e+.001,u);for(let[e,t]of[[0,[1.35,1.95,2.55]],[3.25,[.55,1.15,1.75]]]){for(let s of t){let t=a+e+s;i.bb(`matte`,r+.5,t-.05,n,h-.5,t,-5.1499999999999995,l);for(let e=r+.8;e<h-.8;e+=.62){if(o()<.15)continue;let n=.16+o()*.12;i.box(`matte`,e+(o()-.5)*.1,t+n/2,-5.359999999999999,.34,n,.26,o.pick(d))}}for(let t of[r+.5,h-.5])i.bb(`matte`,t-.04,a+e,n,t+.04,a+e+2.7,-5.1499999999999995,X(l,.85));let s=(r+h)/2;i.cyl(`metal`,s,a+e+2.25,-2.8,.01,(e?5.85:3)-e-2.25,`#1a1a1a`,3),i.sphere(`glow`,s,a+e+2.2,-2.8,.1,X(`#fff0d2`,5),8,6)}i.bb(`wood`,h-1.9,a+3.25,-5.55,h-.6,a+4.2,-4.6499999999999995,`#6b4431`),i.bb(`wood`,r+1,a,-2.2,h-1,a+.98,-1.45,`#6b4431`),i.bb(`wood`,r+.95,a+.98,-2.25,h-.95,a+1.04,-1.4,`#7d5540`);for(let e=0;e<5;e++)i.box(`matte`,r+1.4+o()*(h-r-2.8),a+1.14,-1.8,.3,.2,.3,o.pick(d));i.push(r,a,t,-Math.PI/2),m(-t-.4,g,{awnings:!1,doorAt:-t-2.6,awning:p===3?`#3d7f7a`:p===2?`#a3392f`:null}),i.pop(),i.push(h,a,e-.4,Math.PI/2),m(-t-.4,g+5,{awnings:!1}),i.pop(),i.push(h,a,t,Math.PI),m(h-r,g+7),i.pop()}else i.bb(`matte`,r,a,t,h,a+s,e,c),i.bb(`matte`,r-.05,a+s-.3,t-.05,h+.05,a+s,e+.05,`#65615a`),i.push(r,a,e,0),m(h-r,g),i.pop(),i.push(h,a,t,Math.PI),m(h-r,g+3),i.pop(),i.push(r,a,t,-Math.PI/2),m(e-t,g+5,{awnings:n!==3}),i.pop(),f<70&&(i.push(h,a,e,Math.PI/2),m(e-t,g+8),i.pop())})}),i.bb(`wood`,31.4,a,-15.6,33.9,a+1,-14.9,`#6b4431`);for(let e of[31.5,33.8])i.cyl(`metal`,e,a,-15.2,.04,2.4,`#2a2c2d`,5);i.box(`fabric`,32.65,a+2.45,-14.9,2.7,.05,1.4,`#a3392f`,0,.3,0);for(let e=0;e<6;e++)Q.sack(i,31.7+e*.4,a+.98,-15.25,.22,o.pick([`#d8b77a`,`#c9a15a`,`#e2cf9f`]));i.push(31,a,-7.2,0),i.box(`fabric`,.62,3.25,0,1.3,.05,10.4,`#a3392f`,0,0,-.32),i.box(`fabric`,1.25,2.98,0,.02,.25,10.4,`#8e2f27`);for(let e of[-5,-1.7,1.7,5])i.rod(`metal`,[1.25,3.08,e],[.02,3.45,e],.015,`#2a2c2d`,3);i.pop(),i.bb(`wood`,31.1,a,-10.4,32,a+.92,-7.6,`#6b4431`);for(let e=0;e<9;e++)Q.sack(i,31.35+e%2*.4,a+.92,-7.9-e*.28,.2,o.pick([`#a9bb62`,`#bf4f3c`,`#d59a48`,`#8fb070`]));Q.crate(i,33.3,a,-5.2,.7,`#8b6a43`,.3),i.rod(`metal`,[30.95,a+2.82,-2.4],[32.6,a+2.82,-2.4],.02,`#2a2c2d`,4);let h=(e,t,n)=>{let r=[];for(let i=0;i<=n;i++)r.push([N_(e[0],t[0],i/n),a+5.05-Math.sin(i/n*Math.PI*3)**2*.2,N_(e[1],t[1],i/n)]);for(let e=0;e<n;e++)i.rod(`metal`,r[e],r[e+1],.008,`#1a1a1a`,3);for(let e=1;e<n;e++){let[t,n,a]=r[e];i.cyl(`metal`,t,n-.12,a,.07,.06,`#2a2c2d`,6),i.sphere(`glow`,t,n-.22,a,.12,X(e%3?`#ffc86a`:`#ff8a5a`,4.5),8,6)}return n-1},g=0;g+=h([32.65,-.5],[32.65,-46],15),g+=h([46.75,-.5],[46.75,-46],15),g+=h([60.65,-.5],[60.65,-41],13),g+=h([24,-14.75],[72,-14.75],9),g+=h([24,-31.25],[66,-31.25],9);let _=[[31.2,34.1,-1.5,-46],[45.2,48.3,-1.5,-46],[59.1,62.2,-1.5,-40],[22,72,-13.6,-16],[22,64,-30,-32.5]];for(let e=0;e<50;e++){let[t,n,r,s]=_[e%_.length],c=N_(t,n,o()<.5?o()*.25:.75+o()*.25),l=N_(r,s,o());c>j_(l)-1.5||(o()<.65?Q.crate(i,c,a,l,.45+o()*.35,o.pick([`#8b6a43`,`#7a5a38`,`#9a7a50`]),o()*.6):Q.sack(i,c,a,l,.45+o()*.2,o.pick([`#b59a6a`,`#c9b58a`,`#a38a5a`])))}i.rod(`metal`,[30.9,a+5.05,-3],[34.4,a+5.05,-3],.03,`#2a2c2d`,5);for(let e of[31.7,33.6])i.rod(`metal`,[e,a+5.05,-3],[e,a+4.95,-3],.015,`#2a2c2d`,3);t.place(t.make(`MARKET 68`,{style:`panel`,size:60,bg:`#2c3b3d`}),32.65,a+4.6,-3,.68),t.place(t.make(`GROCERY`,{style:`panel`,size:44,bg:`#24403d`}),31.75,a+2.6,-2.36,.36),t.place(t.make(`BAKERY`,{style:`red`,size:44}),32.65,a+2.8,-14.85,.42),i.bb(`fabric`,31.5,a+2.42,-14.9,33.8,a+2.56,-14.84,`#3d7f7a`),t.place(t.make(`STALLS 1 – 140`,{style:`paint`,size:52,spacing:.8}),48.56,a+5.2,-6.7,.5,-Math.PI/2),t.place(t.make(`BAZAAR ↑`,{style:`paint`,size:52,spacing:.3}),62.44,a+4.95,-3.9,.46,-Math.PI/2);let v=new k_(`market/wisp`,{size:1.1,opacity:.24,seed:68});for(let[e,t]of[[32.2,-15.2],[33.2,-15.2],[40,-1.8],[53.5,-1.8],[67,-1.8]])v.add(e,a+1.2,t,1,.1);n.add(v.group),r.push(v.update);for(let[t,n,r]of[[29,-3,12],[40,-3,14],[53.5,-3,14],[67,-3,12],[32.6,-12,10],[46.7,-14,10]])e.add(t,a+4,n,16763274,r);return i.finish(Fh())}function X_({pool:e,signs:t,dyn:n,updaters:r}){let i=new Fp(`mids/mines`),a=Y(70),o=a+7,s=q(7070),c=`#e4e0d6`,l=-2.8,u=-95.5,d=-65.5,f=`#7c5234`;Vh(i,{s:-1,y0:a,x0:20.8,back:30,wall:`#625e57`,door:[-1.2,-4.4]}),z_(i,-1,a,20.8,30,`#545046`);let p=-7.2,m=-57.4;i.bb(`matte`,-65.8,a,-7.5,d,o,l,`#2f2a25`),i.bb(`matte`,-65.8,a,-7.5,m,o,p,`#5a5751`),i.bb(`matte`,-57.699999999999996,a,-30,m,o,p,`#5d5a54`),i.bb(`matte`,-65.8,a+4+.3,l,d,o,0,`#55524c`),i.bb(`matte`,-65.82,a+4+.3,-.05,-65.48,o,.001,Ih),i.bb(`matte`,u,a-.3,-3,d,a+.035,0,`#8a857b`),i.bb(`matte`,-75,a+4+.3,-3.0999999999999996,-65.8,o,l,`#574a3e`),i.bb(`matte`,u,a,-3.0999999999999996,d,a+4+.3,l,c),i.bb(`matte`,u,a+4,-3.0999999999999996,d,a+4+.3,0,c),i.bb(`matte`,-95.9,a,-3.0999999999999996,u,a+4+.3,0,c),i.bb(`matte`,u,a+4+.26,-.05,d,a+4+.3,.001,`#cfc9bc`),i.bb(`rock`,-96.2,a+4+.3,-9.2,-78,o+.05,.015,`#3a322c`),i.bb(`rock`,-96.2,a-.05,-9.2,-78,a+4+.3,-3.0999999999999996,`#3a322c`),i.bb(`concrete`,-78,a+4+.3,-9.2,-74.98,o+.05,.001,`#f3f0ea`),i.bb(`concrete`,-78,a-.05,-9.2,-74.98,a+4+.3,-3.0999999999999996,`#f3f0ea`);for(let e=-94.6;e<-66.5;e+=2.05)i.box(`wood`,e,a+2,-.35,.3,4,.3,f),i.box(`wood`,e,a+4-.35,-1.525,.36,.34,3.05,X(f,.95)),i.box(`wood`,e+.35,a+4-.2,-.35,.5,.14,.3,f),i.sphere(`glow`,e+.75,a+4-.1,-1.1,.12,X(`#ffd59a`,5.5),8,6);i.rod(`metal`,[-95,a+3.05,-.25],[d,a+3.05,-.25],.015,`#1a1a1a`,3);for(let e of[-.3,-2.65])i.box(`wood`,-65.2,a+4.3/2,e,.5,4.3,.45,f);i.box(`wood`,-65.2,a+4+.2,-2.9/2,.55,.45,3.3,X(f,.9)),t.place(t.make(`SHAFT 1`,{style:`panel`,size:40}),-65.47,a+2.6,-4.4,.24,Math.PI/2),i.box(`metal`,-64.88,a+3.5,-.3,.3,.04,.04,`#2a2c2d`),t.place(t.make(`GALLERY 1 · KEEP CLEAR`,{style:`panel`,size:36,bg:`#2a2e2d`}),-64.2,a+3.5,-.26,.36);for(let e=0;e<61;e++)i.box(`wood`,-94+e*.8,a+.05,-1.25,.22,.1,1.5,`#4f3b2a`);for(let e of[-.85,-1.65])i.box(`metal`,-70,a+.14,e,48.5,.08,.07,`#8a8d8e`);for(let e of[-84,-70.6,-60.5,-51.3,-48.8]){i.push(e,a+.2,-1.25,0),i.box(`metal`,0,.55,0,1.35,.7,.95,`#3c3f40`),i.box(`metal`,0,.92,0,1.45,.06,1.05,`#2e3031`);for(let[e,t]of[[-.45,-.45],[.45,-.45],[-.45,.45],[.45,.45]])i.cylR(`metal`,e,.14,t,.14,.08,`#222425`,Math.PI/2,0,0,10);for(let e=0;e<5;e++)i.ico(`rock`,(s()-.5)*.8,.97,(s()-.5)*.55,.2+s()*.12,`#262320`,0,.8,e);i.pop()}for(let[e,t,n]of[[-56.9,-3.6,1.2],[-53.2,-4.8,1.6],[-46.8,-5.6,1.5],[-45.8,-12.2,1.4]])i.geo(`rock`,Z.hemi(12,4),e,a-.02,t,`#242120`,n,n*.5,n*.8,0,s()*3,0);let h=-49.4,g=-7.8,_=a+6.1;i.beam(`wood`,[-49.519999999999996,a+.2,-7.45],[-51.4,_,-8.05],.42,.42,`#8a5a3a`),i.beam(`wood`,[-49.28,a+.2,-8.15],[-47.4,_,-7.55],.42,.42,`#8a5a3a`),i.rod(`metal`,[-51.3,_-.1,g],[-47.5,_-.1,g],.03,`#1a1a1a`,4),i.box(`metal`,h,_-.05,g,.34,.34,.22,`#5a4030`),i.cylR(`metal`,h,_-.05,g,.22,.26,`#2e3031`,Math.PI/2,0,0,12);for(let e of[-.72,.72])i.rod(`metal`,[h+e,_-.2,g],[h+e,a+4.25,g],.012,`#1a1a1a`,3),i.box(`wood`,h+e,a+4.1,g,.32,.3,.3,`#8a5a3a`);i.rod(`metal`,[h,_-.1,g],[h,a+2.5,g],.02,`#1a1a1a`,4),i.bb(`matte`,-51.199999999999996,a,-9.1,-47.6,a+.2,-6.5,`#c9c6bd`),i.geo(`glass`,Z.box(),h,a+1.35,g,`#4e5856`,2,2.3,2),i.bb(`matte`,-50.37,a+.2,-8.77,-48.43,a+1.1,-6.83,`#3d4140`);for(let[e,t]of[[-1,-1],[1,-1],[-1,1],[1,1]])i.box(`metal`,h+e,a+1.35,g+t,.06,2.3,.06,`#2e3031`);i.bb(`metal`,-50.43,a+2.47,-8.83,-48.37,a+2.55,-6.77,`#2e3031`);for(let e of[-2.9,-1.9])i.bb(`wood`,h+e-.06,a,-7.5,h+e+.06,a+1.1,-7.35,`#5e3e28`);i.bb(`wood`,-52.699999999999996,a+1.1,-7.7,-50.9,a+1.28,-7.2,`#8a5a3a`),i.bb(`wood`,-52.6,a+1.28,-7.6499999999999995,-51.1,a+1.46,-7.25,`#7a4f33`);let v=-57.1,y=-6.3;i.bb(`metal`,-58.2,a,-7.1,-56,a+1.6,-5.5,`#3b3e3f`),i.cylR(`metal`,v,a+2.15,y,.55,1.6,`#1e2021`,Math.PI/2,0,0,18);for(let e of[-.85,.85])i.cylR(`metal`,v,a+2.15,y+e,.62,.08,`#2e3031`,Math.PI/2,0,0,18);i.rod(`metal`,[-56.800000000000004,a+2.65,y],[-49.5,_+.05,g],.022,`#1a1a1a`,4),i.bb(`matte`,-40.1,a,-25.5,-36.1,a+3,-22.1,`#5a5044`),i.bb(`matte`,-40.25,a+3,-25.65,-35.95,a+3.14,-21.95,`#453d33`),i.bb(`wood`,-38.7,a,-22.14,-37.5,a+2.1,-22.08,`#3e3025`);for(let[e,t]of[[-55.8,-16.3],[-41.8,-13.2],[-43.7,-3.2],[-30,-22]])G_(i,e,a,t,{h:3.4});for(let[e,t]of[[-26.5,-2.4],[-24.4,-5.8],[-27,-7.6],[-24,-1.6]]){Q.roundTable(i,e,a,t,{r:.55,top:`#6a5a45`});for(let n=0;n<3;n++){let r=n/3*Math.PI*2+e;Q.stool(i,e+Math.cos(r)*.9,a,t+Math.sin(r)*.9,{color:`#3a3c3d`})}}for(let e=0;e<10;e++)i.box(`fabric`,-21.6+e%2*.35-.2,a+.4,-6.3-e%5*.55,.3,.8,.45,s.pick([`#5a4a2f`,`#4a5a3a`,`#6a4a30`]));for(let[e,t]of[[-61,-4],[-52,-3],[-42,-6],[-34,-4],[-26,-8],[-53,-18],[-44,-21],[-30,-20]])W_(i,e,o,t,{drop:.9,color:`#ffe2b0`});t.place(t.make(`MINES · SHAFT 1 →`,{style:`panel`,size:48,bg:`#2f3331`,spacing:.2}),-35.2,a+4.5,-29.94,1.2);let b=new k_(`mines/wisp`,{size:1,opacity:.22,seed:70});b.add(-22,a+1.2,-2.9,1,.1).add(-90,a+1.5,-1.4,1,.3),n.add(b.group),r.push(b.update);for(let t of[-90,-80,-70])e.add(t,a+3.4,-1.4,16766362,12);return e.add(-52,a+4.5,-8,16769712,16),e.add(-36,a+4,-16,16769712,12),e.add(-26,a+3,-5,16767400,10),i.finish(Fh())}function Z_({pool:e,signs:t}){let n=new Fp(`mids/farms`),r=Y(73),i=r+7;q(7373);let a=.95;Vh(n,{s:1,y0:r,x0:20.8,back:66,wall:`#7a7466`,door:[-1.2,-4.4]}),z_(n,1,r,20.8,66,`#4d7a3a`,{mat:`foliage`}),B_(n,1,r,0,-66,`#7b7263`);let o=e=>e>-25?36.2-7.6*M_(Math.min(1,-e/25)):28.6,s=74.85,c=[];for(let e=0;e<=26;e++){let t=-65.7*(e/26)**1.4;c.push([o(t),t])}R_(n,[...c,...L_(1,s,0,-65.7,28).reverse()],r+a,`#b0ab98`,{t:a}),R_(n,[[o(0)+.3,-.02],[s,-.02],...L_(1,74.83999999999999,-.02,-4.2,4).slice(1),[o(-4.2)+.3,-4.2]],r+a+.03,`#a39b85`,{t:.04});let l=[];for(let e=0;e<=26;e++){let t=-4.2-e/26*61.4;l.push([o(t)+.35,t])}R_(n,[...l,...L_(1,74.83,-65.6,-4.2,28)],r+a+.04,`#4f7e3b`,{t:.04,mat:`foliage`}),n.bb(`matte`,o(0)-.02,r,-.05,74.94999999999999,r+a+.07,.001,`#b3ae9b`);let u=1.2;R_(n,[[56,-4.2],...L_(1,74.82,-4.2,-26,8),[56,-26]],r+a+u,`#b3ae9b`,{t:1.22}),R_(n,[[56.25,-4.45],...L_(1,74.8,-4.45,-25.75,8),[56.25,-25.75]],r+a+u+.04,`#4f7e3b`,{t:.04,mat:`foliage`}),n.bb(`matte`,55.95,r+a+u,-26.05,56.25,r+a+u+.08,-4.15,`#c4bfad`),n.bb(`matte`,56.25,r+a+u,-4.45,74.64999999999999,r+a+u+.08,-4.15,`#c4bfad`);for(let e=0;e<3;e++){let t=.42*(e+1),i=a*(1-(e+1)/3)+.001;if(!(i<.01))for(let e=0;e<12;e++){let a=e/12*-25,s=-25*((e+1)/12),c=o(a)-t,l=o(s)-t,u=Math.hypot(l-c,s-a);n.box(`matte`,(c+l)/2+.21,r+i/2,(a+s)/2,.44,i,u+.03,`#aaa592`,Math.atan2(l-c,s-a))}}let d=r+a+.04;for(let e of[37.6,40.5,43.4,46.3,49.2])n.bb(`matte`,e-1,d,-11.6,e+1,d+.25,-4.6,`#2a2723`),n.bb(`foliage`,e-.95,d+.25,-11.5,e+.95,d+2.25,-4.7,`#647532`),n.bb(`foliage`,e-.97,d+2.25,-11.52,e+.97,d+2.45,-4.68,`#967f39`);let f=[[26.2,-4.8],[26.4,-22],[33,-41],[46.3,-15],[61.4,-6],[46.3,-30],[61.2,-30],[46.3,-47],[61.2,-47],[26.4,-58]].filter(([e,t])=>e<j_(t)-1.4);for(let[e,t]of f)n.cyl(`matte`,e,r,t,1.15,7,`#8e8b83`,20);let p=[];for(let e=0;e<7;e++)for(let t=-1;t<6;t++){let n=39+t*6.6+e%2*3.3,r=-15-e*7.4;n>j_(r)-3.2||n<o(r)+2.5||Math.abs(n-41.8)<4.2&&Math.abs(r+20.5)<4.6||n>55.2&&r>-26.8||f.some(([e,t])=>Math.hypot(n-e,r-t)<2.8)||p.push([n,r,d])}let m=r+a+u+.06;for(let[e,t]of[[57.6,-11],[58.8,-7.8],[59.2,-4.9],[64.6,-7.6],[68.6,-6.2],[64,-15.5],[60,-20.5],[67.2,-21.5]])p.unshift([e,t,m]);p.forEach(([e,t,r],i)=>Q.tree(n,e,r,t,{h:4.3,r:1.9,trunk:`#5e4430`,leaf:`#4c9642`,fruit:i%5==4?null:`#c0392b`,seed:i})),Q.tree(n,29.3,r,-3.6,{h:5,r:2.1,trunk:`#5e4430`,leaf:`#4c9642`,fruit:`#c0392b`,seed:31});for(let e=0;e<16;e++)for(let t=0;t<7;t++){let r=24+e*3.25,a=-2.5-t*9.2;if(!(r>j_(a)-1.5)){for(let e of[-.9,.9])n.rod(`metal`,[r+e,i-.95,a],[r+e,i,a],.008,`#1e1f20`,3);n.box(`matte`,r,i-.96,a,2.3,.08,.42,`#3a3c3d`),n.box(`glow`,r,i-1.05,a,2.1,.1,.32,X(`#ff6aa6`,12))}}for(let e=0;e<7;e++){let t=-7-e*9.2,r=Math.min(62.4,j_(t)-2);r<26||n.box(`glow`,(23+r)/2,i-.45,t,r-23,.05,.05,X(`#ffe6f0`,2.6))}for(let[e,t]of[[25.8,-2.4],[29.4,-6.8],[32.6,-3.2],[25.2,-7.6],[28.3,-10.4]]){n.cyl(`matte`,e,r,t,.6,.78,`#a8322a`,16),n.cyl(`matte`,e,r+.78,t,.62,.04,`#b8443a`,16);for(let i of[.4,.4+Math.PI]){let a=e+Math.cos(i)*1,o=t+Math.sin(i)*1;n.push(a,r,o,-i-Math.PI/2),n.box(`wood`,0,.45,0,.44,.05,.42,`#7a5234`),n.box(`wood`,0,.75,-.19,.44,.5,.04,`#7a5234`);for(let[e,t]of[[-.18,-.17],[.18,-.17],[-.18,.17],[.18,.17]])n.box(`wood`,e,.22,t,.04,.45,.04,`#6a4530`);n.pop()}}let h=0;h+=U_(n,[22,r+3.7,-1.2],[36.5,r+3.7,-2.4],.5,12),h+=U_(n,[36.5,r+3.7,-2.4],[33,r+3.7,-12.8],.45,10),h+=U_(n,[22,r+3.7,-1.2],[24.5,r+3.7,-12.8],.45,8),h+=U_(n,[24.5,r+3.7,-12.8],[33,r+3.7,-12.8],.4,8),t.place(t.make(`ARABLE · FRUIT TREES · GRAIN`,{style:`panel`,size:40,bg:`#2a302c`}),29.6,r+4.05,-1.3,.5);for(let e of[26.5,32.7])n.rod(`metal`,[e,r+4.3,-1.3],[e,i,-1.3],.012,`#2a2c2d`,3);for(let[t,n]of[[40,-8],[52,-14],[58,-30],[44,-40]])e.add(t,r+5,n,16743088,16);return e.add(29,r+3.2,-5,16767392,16),n.finish(Fh())}function Q_({pool:e,signs:t}){let n=new Fp(`mids/midscafe`),r=Y(75),i=r+7,a=q(7575),o=`#837864`,s=`#2e6d68`;Vh(n,{s:-1,y0:r,x0:20.8,back:24,wall:`#5c5a4d`,door:[-1.2,-4.4],wainscot:`#4a483e`}),z_(n,-1,r,20.8,24,`#837768`),B_(n,-1,r,0,-24,`#4f4b43`);let c=-9.5,l=14.5,u=Math.asin(9.5/l),d=Math.asin(-9.5/l),f=(e,t,n=l)=>[-52+e*Math.cos(t)*n,c+Math.sin(t)*n];for(let e of[-1,1]){for(let t=0;t<16;t++){let i=u+(d-u)*t/16,a=u+(d-u)*(t+1)/16,c=(i+a)/2,[p,m]=f(e,c),h=l*Math.abs(a-i)+.05,g=Math.atan2(-e*Math.sin(c),Math.cos(c));n.box(`matte`,p,r+7/2,m,.36,7,h,o,g);for(let t of[-1,1]){let[i,a]=f(e,c,l+t*.2);n.box(`matte`,i,r+.6,a,.03,1.2,h*((l+t*.2)/l),s,g)}}let[t]=f(e,u);n.bb(`matte`,t-.2,r,-.05,t+.2,i,.001,Ih)}let[p]=f(-1,d),[m]=f(1,d);n.bb(`matte`,p,r,-19.3,m,i,-19,o),n.bb(`matte`,p+.2,r,-19,m-.2,r+1.2,-18.97,s);let h=[];for(let e=0;e<=16;e++)h.push(f(1,u+(d-u)*e/16,14.32));for(let e=16;e>=0;e--)h.push(f(-1,u+(d-u)*e/16,14.32));R_(n,h,r+.04,`#8b7e6b`,{t:.02}),R_(n,h,i-.3,`#77705f`,{t:.12});let g=-9.2,_=8.6;for(let e=0;e<48;e++){let t=e/48*Math.PI*2,r=-52+Math.cos(t)*_,a=g+Math.sin(t)*_;n.box(`matte`,r,i-.75,a,_*Math.PI*2/48+.08,.5,.9,`#b3aa98`,-t+Math.PI/2)}for(let e=0;e<12;e++){let t=e/12*Math.PI*2;n.box(`matte`,-52+Math.cos(t)*_*.52,i-.62,g+Math.sin(t)*_*.52,_*.92,.16,.34,`#a8a08e`,-t);let r=t+Math.PI/12;n.box(`glow`,-52+Math.cos(r)*_*.6,i-.58,g+Math.sin(r)*_*.6,2.6,.03,1.1,X(`#fff3dc`,2.2),-r)}n.cyl(`matte`,-52,i-.95,g,1.4,.65,`#a8a08e`,24),n.cyl(`glow`,-52,i-.97,g,1.1,.03,X(`#fff3dc`,2),24);let v=-Math.atan2(-6.52+5.4,-61.92+64.75);for(let e of[-1.3,1.3])n.rod(`metal`,[-63.3+e*Math.cos(v),i-.3,-6-e*Math.sin(v)],[-63.3+e*Math.cos(v),i-1.25,-6-e*Math.sin(v)],.01,`#1a1a1a`,3);n.box(`metal`,-63.3,i-1.3,-6,3,.1,.22,`#2e3030`,v),n.box(`glow`,-63.3,i-1.36,-6,2.8,.02,.14,X(`#fff4e0`,3),v),n.rod(`metal`,[-58.6,i-.3,-7],[-58.6,r+5.35,-7],.02,`#1a1a1a`,4),n.cyl(`metal`,-58.6,r+5,-7,.42,.36,`#3a3c3d`,14),n.cyl(`glow`,-58.6,r+4.98,-7,.34,.02,X(`#fff4e0`,5),14);let y=r+2.9,b=zp(15.4,3.8,1.4);b.holes.push(zp(14.2,3,.9)),n.geo(`matte`,Lp(b,.45,!1,10),-52,y,-19,`#9f9684`),n.geo(`matte`,Lp(zp(14.2,3,.9),.06,!1,10),-52,y,-18.98,`#161717`);let x=tf(bf(512,128,{seed:9}),{repeat:!1});n.mesh(Rh(x,-52,y,-18.9,14,2.8,0,1.7,`midscafe/wallscreen`)).material.emissive.set(`#f0cfa2`);for(let[e,t]of[[-65,-7.2],[-63.5,-15.6],[-57,-18.2],[-47,-18.2],[-42.8,-15.6]])Q.floorLamp(n,e,r,t,{h:2.5,r:.24});for(let e of[.45,.33,-.29]){let[t,i]=f(-1,e,14.3);Q.sconce(n,t,r+3.6,i,Math.atan2(-(t- -52),-(i-c)),{color:`#fff0d6`,power:5})}for(let[e,t]of[[-38.4,-6],[-38.8,-12.4]]){let i=Math.atan2(-(e- -52),-(t-c));Q.sconce(n,e,r+3.6,t,i,{color:`#fff0d6`,power:5})}for(let e of[-60.5,-43.5])Q.sconce(n,e,r+4.6,-18.98,0,{color:`#fff0d6`,power:5});let[S,C]=f(-1,-.03,14.3);Q.archDoor(n,S,r,C,Math.atan2(-(S- -52),-(C-c)),{w:1.3,h:2.55,color:`#3a3833`,frame:`#9d9483`});let w=0;for(let e=0;e<7;e++)for(let t=0;t<5;t++){let i=-61.6+e*3.2,o=-3-t*3.6;Q.table(n,i,r,o,0,{w:1.2,d:.9,h:.78,top:`#e6e0d2`,leg:`#2e3030`});for(let[e,t,s]of[[-.3,-.72,0],[.3,-.72,0],[-.3,.72,Math.PI],[.3,.72,Math.PI]])a()<.12||(Q.chair(n,i+e,r,o+t,s,{color:`#3b3f3e`}),w++)}n.bb(`matte`,-40.6,i-.25,-24,-21,i-.1,0,`#1f2020`),n.box(`metal`,-36.2,i-.28,-6.8,3.1,.06,.24,`#2e3030`),n.box(`glow`,-36.2,i-.32,-6.8,3,.03,.14,X(`#f4f6ff`,3.5));for(let e=0;e<4;e++){let t=-28.2+e%2*3.4,i=-1.4-Math.floor(e/2)*2.2;n.box(`fabric`,t,r+.38,i,1.9,.1,.8,`#7a5a3a`),n.box(`metal`,t,r+.18,i,1.8,.36,.06,`#4a4d4c`)}Q.crate(n,-35,r,-4.2,.7,`#8a5a36`,.2);for(let e=0;e<Math.max(0,129-w);e++)Q.chair(n,-36.5+e*.62,r,-21.2,0,{color:`#3b3f3e`});for(let e=0;e<14;e++)n.rod(`metal`,[-24.6+e*.26,r,-5.2],[-24.6+e*.26,r+2.6,-5.2],.03,`#2a2c2d`,5);for(let e=0;e<14;e++)n.rod(`metal`,[-24.7,r,-5.4-e*.3],[-24.7,r+2.6,-5.4-e*.3],.03,`#2a2c2d`,5);for(let e=0;e<28;e++)n.rod(`metal`,[-24.7+e%14*.26,r+1.3*(1+Math.floor(e/14))-.02,-5.2],[-24.7+e%14*.26+.26,r+1.3*(1+Math.floor(e/14))-.02,-5.2],.02,`#2a2c2d`,4);n.bb(`metal`,-24.8,r+2.6,-9.7,-21,r+2.7,-5.1,`#3a3c3d`),n.box(`fabric`,-22.8,r+.4,-7.4,1.9,.12,.8,`#6f7f6a`);for(let[e,t]of[[-4,`#ffe9c8`],[-9,`#bfe8e0`],[-14,`#ffe9c8`]]){let i=-j_(e,74.8);n.box(`glow`,i,r+2.2,e,.05,.3,.5,X(t,2.5),Math.atan2(-i,-e))}for(let[e,t]of[[-70.1,-22.2],[-68.5,-8],[-71,-15]])W_(n,e,i,t,{drop:.5});let T=Math.hypot(-52-S,c-C);return t.place(t.make(`EXIT`,{style:`panel`,size:34,bg:`#2a2e2c`}),S+(-52-S)/T*.14,r+3.05,C+(c-C)/T*.14,.24,Math.atan2(-52-S,c-C)),e.add(-52,r+4.2,-9.5,16773338,26),e.add(-59,r+3,-15,16771528,14),e.add(-45,r+3,-15,16771528,14),e.add(-31,r+4,-8,15659775,10),n.finish(Fh())}var $_=Math.PI*2,$=Math.PI/2,ev=new W(`#ff7a2a`).multiplyScalar(3.4),tv=new W(`#ffe2b0`).multiplyScalar(3.2),nv=`"Helvetica Neue", Helvetica, Arial, sans-serif`;function rv({pool:e}){let t=new On;t.name=`rooms/deep`;let n=new On;n.name=`rooms/deep/dyn`;let r=[],i=new Lh(`deep`),a={on:!0,glow:1,spin:1,spots:[],hooks:[]},o={pool:e,signs:i,dyn:n,updaters:r,power:a};for(let e of[gv,_v,vv,yv,bv,xv,Sv])t.add(e(o));return t.add(i.mesh()),{group:t,dyn:n,update:(e,t)=>{let n=+!!a.on;a.glow+=(n-a.glow)*Math.min(1,e*3),a.spin+=(n-a.spin)*Math.min(1,e*.7),!a.on&&a.spin<.002&&(a.spin=0);for(let n of r)n(e,t)},setPower:e=>{a.on=!!e;for(let[e,t]of a.spots)e.intensity=a.on?t:0;for(let e of a.hooks)e(a.on)}}}function iv(e,t,n,r,i,a){return e.add(t,n,r,i,a),e.spots[e.spots.length-1]}var av=e=>{let t=J.water.clone();return t.vertexColors=!1,t.color.set(e),t.normalMap=J.water.normalMap.clone(),t.normalMap.needsUpdate=!0,t};function ov(e,t,n,r=8){let i=[];for(let a=0;a<=r;a++){let o=a/r;i.push([e[0]+(t[0]-e[0])*o,e[1]+(t[1]-e[1])*o-Math.sin(o*Math.PI)*n,e[2]+(t[2]-e[2])*o])}return i}function sv(e,t,n=.012,r=`#1b1b1b`,i=3){for(let a=0;a<t.length-1;a++)e.rod(`metal`,t[a],t[a+1],n,r,i)}function cv(e,t,n,r,{color:i=`#fff1d6`,power:a=5,stem:o=.25}={}){e.cyl(`metal`,t,n+.1,r,.05,.08,`#2a2c2d`,8),o&&e.cyl(`metal`,t,n+.18,r,.012,o,`#1e1f20`,4),e.sphere(`glow`,t,n,r,.075,X(i,a),8,6);for(let i=0;i<4;i++){let a=i/4*$_+.4;e.rod(`metal`,[t+Math.cos(a)*.12,n+.11,r+Math.sin(a)*.12],[t+Math.cos(a)*.1,n-.15,r+Math.sin(a)*.1],.007,`#2a2c2d`,3)}e.geo(`metal`,Z.torus(.08,4,12),t,n-.02,r,`#2a2c2d`,.13,.13,.13,$,0,0)}function lv(e,t,n,r){let i=[],a=[],o=[];for(let r=0;r<=t;r++)for(let o=0;o<=e;o++){let s=n(o/e,r/t);i.push(s[0],s[1],s[2]),a.push(s[3]??1,s[4]??s[3]??1,s[5]??s[3]??1)}let s=new U,c=new U,l=new U,u=new U,d=(t,n)=>n*(e+1)+t;for(let n=0;n<t;n++)for(let t=0;t<e;t++){let e=d(t,n),a=d(t+1,n),f=d(t+1,n+1),p=d(t,n+1);s.fromArray(i,e*3),c.fromArray(i,a*3),l.fromArray(i,f*3).sub(s),u.fromArray(i,p*3).sub(c);let m=l.cross(u),h=r(s.x,s.y,s.z);m.x*h[0]+m.y*h[1]+m.z*h[2]>=0?o.push(e,a,f,e,f,p):o.push(e,f,a,e,p,f)}let f=new Ir;return f.setAttribute(`position`,new wr(i,3)),f.setAttribute(`color`,new wr(a,3)),f.setIndex(o),f.computeVertexNormals(),f}function uv(e,t,n,r=74.95,i=32){let a=Math.asin(Math.min(1,n/r)),o=[new H(e*t,0)];for(let t=0;t<=i;t++){let n=t/i*a;o.push(new H(e*r*Math.cos(n),r*Math.sin(n)))}o.push(new H(e*t,n));let s=new To(new Pa(o));return s.rotateX(-$),s}function dv(e,t,n,r,i,{n:a=48,tile:o=1}={}){let s=[],c=[],l=[],u=[];for(let u=0;u<=a;u++){let d=t+(n-t)*u/a,f=Math.cos(d),p=Math.sin(d),m=e*Math.abs(d-t)/o;s.push(f*e,r,p*e,f*e,i,p*e),c.push(-f,0,-p,-f,0,-p),l.push(m,0,m,(i-r)/o)}let d=n>t;for(let e=0;e<a;e++){let t=e*2,n=t+1,r=t+2,i=t+3;d?u.push(t,r,n,n,r,i):u.push(t,n,r,n,i,r)}let f=new Ir;return f.setAttribute(`position`,new wr(s,3)),f.setAttribute(`normal`,new wr(c,3)),f.setAttribute(`uv`,new wr(l,2)),f.setIndex(u),f}function fv(e,t,n=.14,r=.26,i=.08){let a=zp(e+2*n,t+n,r+n*.6,0,(t+n)/2);return a.holes.push(zp(e,t-.02,r,0,t/2+.01)),Lp(a,i,!1,6)}function pv(e,t,n=.26,r=.04){return Lp(zp(e,t-.02,n,0,t/2+.01),r,!1,6)}function mv(e=256,t=5){let n=ef(e,e),r=n.getContext(`2d`),i=q(t);r.fillStyle=`#56524b`,r.fillRect(0,0,e,e);let a=e/8,o=e/4;for(let e=0;e<8;e++){let t=e%2*(o/2);for(let n=-1;n<5;n++){let s=104+Math.floor(i()*22);r.fillStyle=`rgb(${s+5},${s},${s-7})`,r.fillRect(n*o+t+2,e*a+2,o-4,a-4),r.fillStyle=`rgba(0,0,0,0.08)`,r.fillRect(n*o+t+2,e*a+a-6,o-4,4)}}return n}function hv(e,t,{bg:n=`#2d5a57`,fg:r=`#eef2ec`,w:i=440,h:a=132}={}){return e.custom(i,a,(e,o,s)=>{let c=a/2;e.fillStyle=n,e.beginPath(),e.moveTo(o+c,s),e.lineTo(o+i-c,s),e.arc(o+i-c,s+c,c,-$,$),e.lineTo(o+c,s+a),e.arc(o+c,s+c,c,$,3*$),e.closePath(),e.fill(),e.fillStyle=r,e.textAlign=`center`,e.textBaseline=`middle`,e.font=`800 ${Math.round(a*.3)}px ${nv}`,t.forEach((n,r)=>e.fillText(n,o+i/2,s+a*(.5+(r-(t.length-1)/2)*.34)))})}function gv({pool:e,signs:t}){let n=new Fp(`deep/supply`),r=Y(110),i=r+7,a=q(11010);Vh(n,{s:-1,y0:r,x0:20.8,back:48,wall:`#77736a`}),n.geo(`matte`,uv(-1,20.8,48),0,r+.02,0,`#5b5a55`),n.geo(`matte`,uv(1,20.8,48),0,i-.02,0,`#2c2c2a`,1,1,1,0,0,Math.PI),n.geo(`matte`,dv(74.85,-Math.PI+.002,Math.atan2(-48,-Math.sqrt(3321)),r,i,{n:32}),0,0,0,`#4a463e`);let o=[`#3f8f8f`,`#3f8f8f`,`#3f8f8f`,`#4a9a98`,`#b89a6a`,`#b89a6a`,`#c8a878`,`#8a4a32`,`#6a6c6a`,`#c8b690`],s=[`#d8d8d4`,`#d8d8d4`,`#e3dccb`,`#c9a13b`,`#d0b04a`],c=(e,t,r,i,a,o)=>{n.cyl(`matte`,e,t,r,i,.05,`#bdb6a4`,12),n.cyl(`matte`,e,t+.05,r,i*.78,a-.1,o,12),n.cyl(`matte`,e,t+a-.05,r,i,.05,`#bdb6a4`,12)},l=3.2,u=5.4,d=`#2a2c2d`,f=[.14,1.44,2.74,4.04,5.34],p=-.09,m=(e,t)=>{let n=e- -24,r=t- -3;return[-24+n*Math.cos(p)+r*Math.sin(p),-3-n*Math.sin(p)+r*Math.cos(p)]},h=(e,t)=>{let[i,h]=m(e,t);n.push(i,r,h,p);for(let e of[-1,1]){for(let t of[-1,1])n.box(`metal`,e*(l/2-.05),u/2,t*(1/2-.04),.07,u,.07,d);for(let t=0;t<3;t++){let r=.3+t*1.7,i=r+1.6;n.beam(`metal`,[e*(l/2-.05),r,(t%2?1:-1)*(1/2-.06)],[e*(l/2-.05),i,(t%2?-1:1)*(1/2-.06)],.025,.025,d)}}for(let e of f)n.box(`metal`,0,e,0,3.14,.03,1,`#3b3d3e`),n.box(`metal`,0,e+.02,1/2-.02,3.14,.08,.03,d),n.box(`metal`,0,e+.02,-.48,3.14,.08,.03,d);for(let e=0;e<f.length;e++){let t=f[e]+.02,r=e<f.length-1?f[e+1]-f[e]-.12:.4;if(e===0&&a()<.6){let e=1+Math.floor(a()*3),r=[-1.05,-.35,.35,1.05].sort(()=>a()-.5).slice(0,e);for(let e of r)c(e+(a()-.5)*.1,t,(a()-.5)*.2,.28+a()*.1,.5+a()*.25,a.pick(s));if(e<3&&a()<.7){let e=[-1.05,-.35,.35,1.05].find(e=>!r.includes(e)),i=.4+a()*.35;n.box(`matte`,e,t+i/2,0,.62,i,.7,X(a.pick(o),.8+a()*.3))}continue}if(e===f.length-1){if(a()<.35)for(let e of[0,.3])n.cyl(`matte`,-1.1+a()*1.6+e,t,-.15,.1,.36,`#2a2c2e`,8);continue}let i=-1.54+a()*.25;for(;i<l/2-.35;){let e=.45+a()*.45;if(i+e>l/2-.06)break;let s=a(),c=(a()-.5)*.2;if(s<.07&&r>.5){let o=Math.min(.28,r*.45);n.cylR(`matte`,i+e/2,t+o,c,o,.62,X(`#8a4a32`,.85+a()*.3),$,0,0,12)}else if(s<.13)n.box(`matte`,i+e/2,t+.14,c,Math.min(e,.34),.28,.3,X(`#c9a13b`,.9+a()*.2));else if(s<.8){let s=Math.min(r,.38+a()*.42),l=.5+a()*.35;n.box(`matte`,i+e/2,t+s/2,c,e*.92,s,l,X(a.pick(o),.8+a()*.3))}i+=e+.06+a()*.3}}n.pop()},g=-65.6,_=[[-3,13],[-9.8,13],[-16.6,8],[-23.4,8],[-29,10]];for(let[e,t]of _)for(let n=0;n<t;n++)h(-63.99999999999999+n*l,e);for(let[e,t]of[[-3.95,-24],[-8.85,-24],[-10.75,-24],[-15.65,-24],[-17.55,-40],[-22.45,-40],[-24.35,-33.6],[-28.05,-33.6]]){let[i,a]=m((-66+t)/2,e);n.box(`matte`,i,r+.03,a,t-g+.4,.01,.1,`#b59a3a`,p)}for(let e=-21.6;e>-72;e-=1.6)n.bb(`matte`,e-1,r+.025,-1.28,e,r+.035,-1.16,`#c9c3a8`);let[v,y]=m(-55.2,-6.4);n.push(v,r,y,.21);for(let e of[-1,1])n.beam(`metal`,[e*.28,0,.45],[e*.24,2.1,0],.05,.05,`#b8942e`),n.beam(`metal`,[e*.28,0,-.55],[e*.24,2.1,0],.04,.04,`#8a8d8e`);for(let e=1;e<=5;e++)n.box(`metal`,0,e*.38,.45-e*.38*.45/2.1,.52,.04,.16,`#8a8d8e`);n.pop();let b=-37.5,x=-21.7,S=-14.6,C=3.4,w=-25.5,T=[];for(let e=0;e<=6;e++)T.push([b+e/6*15.8,S]);T.splice(5,0,[w,S]);let E=[];for(let e=0;e<=6;e++)E.push([x-e/6*15.8,-27.7]);let D=e=>[[e,S-13.1/3],[e,S-26.2/3]],O=[...T,...D(x),...E,...D(b).reverse(),T[0]],k=new Pp,A=new W(1,1,1),j=(e,t,n,i,a,o)=>{let s=Math.hypot(n-e,i-t),c=-(i-t)/s,l=(n-e)/s,u=k.vert(e,a,t,c,0,l,0,a-r,A),d=k.vert(n,a,i,c,0,l,s,a-r,A),f=k.vert(n,o,i,c,0,l,s,o-r,A),p=k.vert(e,o,t,c,0,l,0,o-r,A);k.tri(u,d,f),k.tri(u,f,p)},M=`#6a6e70`,N=`#7a7e80`;for(let[e,t]of O.slice(0,-1))n.cyl(`metal`,e,r,t,.05,3.46,M,8),n.sphere(`metal`,e,r+C+.08,t,.06,M,6,4);for(let e=0;e<O.length-1;e++){let[t,i]=O[e],[a,o]=O[e+1],s=a===w&&i===S,c=s?.07:0;j(t+c,i,a-c,o,r+(s?.12:.06),r+C-(s?.14:.04));for(let e of s?[.1,1.7,3.28]:[.08,C])n.rod(`metal`,[t+c,r+e,i],[a-c,r+e,o],.022,N,5);if(s){for(let e of[t+c,a-c])n.rod(`metal`,[e,r+.1,i],[e,r+C-.12,i],.022,N,5);n.box(`metal`,a-.2,r+1.12,i+.07,.09,.12,.05,`#c9a13b`),n.geo(`metal`,Z.torus(.2,4,10,Math.PI),a-.2,r+1.18,i+.07,`#9a9d9e`,.035,.035,.035)}}let P=Ef.chain.clone();P.repeat.set(.9,.9),P.needsUpdate=!0;let F=new Bo({name:`deep/chainlink`,map:P,alphaTest:.5,side:2,metalness:.6,roughness:.5,color:`#aeb2b4`}),I=new G(k.build(),F);I.name=`deep/supply/cage`,I.castShadow=I.receiveShadow=!0,n.mesh(I);let L=(e,t,r,i,o,s,c=0,l=!0)=>{n.box(`matte`,e,t+o/2,r,i,o,s,X(`#b88d55`,.85+a()*.25),c),n.box(`matte`,e,t+o+.004,r,i*.18,.008,s+.01,`#d9cfa8`,c),l&&n.box(`matte`,e,t+o*.6,r+s/2+.003,i*.4,o*.25,.004,`#ece8dc`)},R=(e,t,i)=>{let o=2.7,s=.6,c=[.1,.8,1.5,2.2];n.push(e,r,t,i);for(let e of[-1,1])for(let t of[-1,1])n.box(`metal`,e*(o/2-.03),1.15,t*(s/2-.03),.05,2.3,.05,`#4a4d4e`);for(let e of c)n.box(`metal`,0,e,0,o,.035,s,`#4a4d4e`);for(let e of[1,2]){let t=e===1?`#9a9d9a`:`#b09050`;for(let r=0;r<4;r++){let i=-.98+r*.65;n.box(`metal`,i,c[e]+.05,0,.56,.07,.42,`#5f6462`);for(let r=0;r<6;r++){let a=i-.16+r%3*.16,o=-.08+Math.floor(r/3)*.16;n.cyl(`metal`,a,c[e]+.085,o,.013,.07,t,4),n.cyl(`metal`,a,c[e]+.155,o,.026,.02,t,6)}}}for(let e of[0,3]){let t=-1.25;for(;t<o/2-.5;){let n=.4+a()*.2;L(t+n/2,c[e]+.02,0,n,.3+a()*.25,.45),t+=n+.05}}n.pop()};for(let e of[-35.8,-32.9,-30,-27.1])R(e,-27.2,0);for(let e of[-24.2,-20.6])R(-37,e,$);for(let[e,t,n]of[[-33.4,-21.2,3],[-31.2,-22.8,2],[-34.2,-18.2,2],[-30.6,-19.4,3]])for(let i=0;i<n;i++)L(e+(a()-.5)*.1,r+i*.5,t,.7,.48,.55,(a()-.5)*.2,!1);Q.crtDesk(n,-27.4,r,-16.2,0,{desk:`#4a4d4e`});for(let e of[-62,-54,-46,-38,-30])for(let t of[-6.4,-13.2,-20,-26.2]){let[r,a]=m(e,t);n.cyl(`metal`,r,i-.16,a,.55,.14,`#2e2f30`,16),n.cyl(`glow`,r,i-.18,a,.45,.03,X(`#f4f6f2`,3.4),16)}return n.rod(`metal`,[-21,i-.35,-1.5],[-74.4,i-.35,-1.5],.12,`#4d4f4c`,8),n.rod(`metal`,[-21,i-.55,-2.2],[-74.3,i-.55,-2.2],.08,`#5d5f5c`,8),t.place(t.make(`SUPPLY 110`,{style:`panel`,size:60}),-42,r+4.7,-47.95,.8),_.forEach(([e,n],i)=>{let[a,o]=m(g+n*l+.03,e);t.place(t.make(`ROW ${`ABCDE`[i]}`,{style:`light`,size:40}),a,r+4.85,o,.32,$+p)}),t.place(t.make(`PARTS CAGE`,{style:`light`,size:44,sub:`SIGN FOR EVERY ITEM`}),-30.3,r+2.6,-14.54,.55),e.add(-50,r+5.6,-8,15133935,22),e.add(-30,r+5,-20,15133935,18),e.add(-58,r+5.6,-20,15133935,16),e.add(-34,r+4.5,-6,15659248,12),n.finish(Fh())}function _v({pool:e,signs:t,dyn:n,updaters:r}){let i=new Fp(`deep/barricade`),a=Y(130),o=a+7,s=q(13030),c=-6.2,l=19.4,u=46.1,{xEnd:d}=Vh(i,{s:1,y0:a,x0:l,back:6.2,wall:`#6e6a61`,floor:`#57534c`,innerWall:!1});i.geo(`matte`,uv(-1,l,6.2),0,o-.02,0,`#353431`,1,1,1,0,0,Math.PI);let f=[l,21.6,23.9,25.9,28.1,30.05,31.95,34.2,36.4,38.5,40.8,43.4,u],p=7/9,m=[`#3a3d41`,`#45474a`,`#4f5053`,`#34373a`,`#4a4b4d`,`#55504a`,`#5a4436`],h=f[5],g=f[6],_=(h+g)/2,v=3*p;for(let e=0;e<9;e++)for(let t=0;t<f.length-1;t++){if(t===5&&e<3)continue;let n=f[t+1]-f[t],r=(f[t]+f[t+1])/2,o=a+(e+.5)*p;i.box(`metal`,r+(s()-.5)*.06,o+(s()-.5)*.05,-6.1000000000000005+(s()-.5)*.04,n-.06,.7377777777777778,.08,X(s.pick(m),.85+s()*.3),(s()-.5)*.03,0,(s()-.5)*.03);for(let e of[-1,1])i.cylR(`metal`,r+e*(n/2-.14),o+p*.32,-6.050000000000001,.03,.03,`#2e2b28`,$,0,0,6)}let y=`#8c8b86`;for(let e=1;e<9;e++){let t=a+e*p,n=e<3?[[l,h],[g,u]]:[[l,u]];for(let[e,r]of n)i.rod(`metal`,[e,t,-6.055000000000001],[r,t,-6.055000000000001],.026,y,5)}for(let e=0;e<9;e++)for(let t=1;t<f.length-1;t++)(t===5||t===6)&&e<3||i.box(`metal`,f[t]+(s()-.5)*.05,a+(e+.5)*p,-6.055000000000001,.05,p,.05,y);for(let e=0;e<18;e++){let e=19.799999999999997+s()*25.900000000000002;if(e>h-.2&&e<g+.2)continue;let t=.3+s()*.9;i.box(`matte`,e,a+2.6+s()*3.6-t/2,-6.050000000000001,.05+s()*.05,t,.006,X(`#5a3a26`,.8+s()*.4))}for(let e of[4.95,2.3]){i.rod(`metal`,[l,a+e,-5.98],[u,a+e,-5.98],.05,`#2e3031`,6);for(let t=20.599999999999998;t<u;t+=3.1)i.box(`metal`,t,a+e,-6.000000000000001,.1,.16,.1,`#232526`)}i.bb(`metal`,h,a,-6.16,h+.28,a+v,-6.03,`#1f1d1b`),i.bb(`metal`,g-.12,a,-6.16,g,a+v,-6.03,`#2f2c29`),i.bb(`metal`,h,a+v-.12,-6.16,g,a+v,-6.03,`#2f2c29`),i.bb(`metal`,h+.28,a,-6.15,g-.12,a+v-.12,-6.0600000000000005,`#2a2826`);let b=h+.72*(g-h);i.geo(`metal`,Z.torus(.08,6,20),b,a+1.2,-6.03,`#b0b0a8`,.22,.22,.22);for(let e=0;e<2;e++)i.box(`metal`,b,a+1.2,-6.040000000000001,.42,.025,.02,`#b0b0a8`,0,0,e*$);i.box(`matte`,_+.05,a+2.05,-6.040000000000001,.92,.44,.02,`#b9b9b4`),t.place(t.make(`130`,{style:`light`,size:64,weight:900}),_+.05,a+2.05,-6.025,.36),i.box(`metal`,h+.8,a+3.8,-6.0200000000000005,.1,.1,.25,`#2a2c2d`),cv(i,h+.8,a+3.58,-5.800000000000001,{color:`#ffd9a0`,power:5,stem:0});let x=38.7,S=a+4.9;i.box(`metal`,x,S,-6.03,.34,.34,.06,`#2a2826`);for(let e=0;e<6;e++){let t=e/6*$_;i.rod(`metal`,[x+Math.cos(t)*.15,S+Math.sin(t)*.15,-6.000000000000001],[x+Math.cos(t)*.15,S+Math.sin(t)*.15,-5.66],.008,`#2a2c2d`,3)}i.geo(`metal`,Z.torus(.06,4,16),x,S,-5.66,`#2a2c2d`,.15,.15,.15);let C=new W(`#ff3b2e`),w=new pi({name:`deep/barricade/warnlamp`,color:C.clone().multiplyScalar(5)}),T=new G(new Do(.11,12,8),w);T.position.set(x,S,-5.840000000000001),T.name=`deep/barricade/warnlamp`,n.add(T);let E=iv(e,x,S+.2,-4.9,16726830,30);r.push((e,t)=>{let n=.35+.65*(.5+.5*Math.sin(t*3))**2;w.color.copy(C).multiplyScalar(5*n),E.intensity=30*(.55+.45*n)}),i.cyl(`metal`,34.85,a,-5.78,.04,3.7,`#2a2826`,6),t.place(t.make(`SEALED`,{style:`red`,size:52,sub:`NO WAY THROUGH`}),35.6,a+3.73,-5.73,.74);let D=t.custom(192,128,(e,t,n,r,i)=>{e.fillStyle=`#cfccc4`,e.fillRect(t,n,r,i),e.strokeStyle=`#2a2b2b`,e.lineWidth=4,e.strokeRect(t+6,n+6,r-12,i-12),e.lineWidth=7,e.beginPath(),e.arc(t+r/2,n+i/2,42,0,$_),e.stroke(),e.fillStyle=`#2a2b2b`;let a=t+r/2-15;e.fillRect(a,n+64,30,26);for(let t=0;t<4;t++)e.fillRect(a+t*8,n+38+(t===0||t===3?6:0),6,28);e.fillRect(a-10,n+68,12,8)});t.place(D,42.6,a+3.3,-6.0200000000000005,1);let O=(e,t,n)=>i.geo(`fabric`,Z.sphere(10,6),e,t,n,X(`#7e7050`,.8+s()*.3),.34,.15,.23,0,(s()-.5)*.3,0);for(let[e,t]of[[22.3,h-.1],[g+.1,40.3]]){let n=Math.floor((t-e)/.62),r=(t-e-.62)/(n-1);for(let t=0;t<n;t++){let i=t/(n-1),o=.55+.45*Math.sin(i*Math.PI*2.3+e);O(e+.31+t*r,a+.14,-5.760000000000001),O(e+.4+t*r,a+.14,-5.180000000000001),t<n-1&&o>.3&&O(e+.31+(t+.5)*r,a+.42,-5.48),t<n-1&&o>.75&&O(e+.31+t*r+(s()-.5)*.2,a+.7,-5.6000000000000005)}}let k=(e,t,n,r,o)=>i.rod(`metal`,[e,a,-5.3500000000000005+s()*.35],[t,a+n,-6.000000000000001+r],r,o,8);k(40.7,40.2,3.6,.055,`#6a3a2e`),k(41,40.45,3.5,.07,`#7a4232`),k(41.25,40.7,3.7,.05,`#5e3428`),k(41.5,40.9,3.3,.06,`#704030`),k(44.95,44.3,3.55,.06,`#6a5a50`),k(45.3,44.65,3.45,.05,`#5a5048`);for(let[e,t,n]of[[41.9,-5.1,`#3f5f4a`],[42.4,-5.35,`#6b3a2a`]])i.cyl(`metal`,e,a,t,.14,1.2,n,12),i.sphere(`metal`,e,a+1.2,t,.14,n,12,6),i.cyl(`metal`,e,a+1.3,t,.04,.12,`#8a8d8e`,6);sv(i,ov([41.9,a+1.4,-5.1],[40.8,a+.1,-4.2],.4,6),.012,`#1a1a1a`,4),Q.crate(i,38.3,a,-5.3,.95,`#6a4a38`,.05),i.box(`matte`,39.4,a+.25,-5.35,.7,.5,.6,`#565a5e`,-.08),i.box(`metal`,36.65,a+.22,-5.2,.5,.44,.4,`#2a2b2c`,.2),i.box(`metal`,25.2,a+.14,-3.8,.6,.28,.28,`#a3342b`,.3),Q.barrel(i,26,a,-2.5,{color:`#4a4d4e`}),i.bb(`matte`,u,a,c,d,a+1.6,-6.15,`#3a8683`),i.bb(`matte`,u,a+1.6,c,d,a+3,-6.17,`#a39c90`),i.bb(`matte`,u,a+3,c,d,a+3.75,-6.17,`#5c5852`),i.bb(`matte`,u,a+3.73,c,d,a+3.79,-6.15,`#2c2b28`),t.place(t.make(`LEVEL 130`,{style:`paint`,size:90}),50,a+4.8,-6.17,.5);let A=1.36,j=2.62,M=fv(A,j,.1,.26),N=pv(A,j,.26),P=Math.hypot(A,2.42);for(let e of[54.1,67.3]){i.geo(`matte`,M,e,a,-6.180000000000001,`#d4d0c6`),i.geo(`matte`,N,e,a,-6.140000000000001,`#232323`);for(let t of[-1,1])i.box(`metal`,e,a+j/2,-6.085,.08,P,.02,`#8a8a86`,0,0,t*Math.atan2(A,2.42));i.box(`metal`,e,a+j/2,-6.08,.07,2.52,.02,`#8a8a86`),i.box(`metal`,e,a+j*.55,-6.08,1.3,.07,.02,`#8a8a86`)}t.place(D,58.8,a+3.45,-6.16,.7);let F=61.1,I=a+2.3,L=.45;i.cylR(`metal`,F,I,-6.17,L,.06,`#1c1d1e`,$,0,0,20),i.geo(`metal`,Z.torus(.12,5,24),F,I,-6.08,`#232526`,L,L,L);for(let e=0;e<6;e++){let t=e/6*$_;i.rod(`metal`,[F,I,-5.92],[F+Math.cos(t)*L*.95,I+Math.sin(t)*L*.95,-5.96],.008,`#2a2c2d`,3)}let R=new On;R.name=`deep/barricade/fan`;let ee=new Fp(`deep/barricade/fan`),te=new $t,ne=new $t,re=new $t,ie=new $t;for(let e=0;e<4;e++)te.makeRotationZ(e/4*$_).multiply(ne.makeTranslation(0,L*.48,0)).multiply(re.makeRotationY(.35)).multiply(ie.makeScale(L*.3,L*.74,.02)),ee.geoMatrix(`metal`,Z.box(),te,`#4a4d4e`);ee.cylR(`metal`,0,0,.02,.08,.1,`#2a2c2d`,$,0,0,10),R.add(ee.finish(Fh())),R.position.set(F,I,-6.04),n.add(R),r.push(e=>R.rotation.z-=e*6),i.bb(`matte`,61.8,a+4.4,c,d-.3,a+5.8,-6.12,`#4d504b`),i.rod(`metal`,[l,o-.3,-5.8500000000000005],[74.3,o-.3,-5.8500000000000005],.09,`#4a4b4a`,8),i.rod(`metal`,[l,o-.22,-.9],[74.5,o-.22,-.9],.06,`#5a5b58`,6),i.rod(`metal`,[l,o-.5,-3],[74.3,o-.5,-3],.04,`#232425`,5);for(let e of[52,57,62,67,72])i.box(`metal`,e,o-.62,-3,.4,.26,.3,`#1e1f20`);for(let e of[30,48,65.5]){for(let t of[-1,1])i.cyl(`metal`,e+t*1.2,o-.72,-3,.01,.72,`#1e1f20`,3);Q.tube(i,e,o-.85,-3,3,0,{power:3.6})}return i.box(`matte`,49.05,a+.3,-5.7,1.3,.6,.6,`#55585a`,.04),i.box(`matte`,50.3,a+.28,-5.72,.95,.56,.55,`#6a5038`,-.06),e.add(31,a+3.2,-3.2,16773336,14),e.add(50,a+5,-3.5,15660799,20),e.add(65,a+5,-3.5,15660799,18),i.finish(Fh())}function vv({pool:e,signs:t}){let n=new Fp(`deep/apartment`),r=Y(140),i=r+7,a=q(14040),o=[`#1f4a47`,`#255652`,`#1d4543`,`#2a5c58`],s=-4.3,c=-8.6,l=-Math.sqrt(5625-s*s)-.2,u=-17.4;n.geo(`matte`,uv(-1,17.4,4.3),0,r+.02,0,`#57534c`),n.geo(`matte`,uv(1,17.4,4.3),0,i-.02,0,`#33322e`,1,1,1,0,0,Math.PI);let d=[[l,-54.15],[-41.85,u]];for(let[e,t]of d){n.bb(`matte`,e,r,-4.6,t,i,s,`#5f5c53`);let c=Math.max(e,l+.25);n.bb(`matte`,c,r+1.38,s,t,r+4,-4.28,`#7c7160`),n.bb(`matte`,c,r+1.3,s,t,r+1.38,-4.24,`#2a2c2a`);let u=c;for(;u<t-.2;){let e=Math.min(t-u,2.2+a()*1.6);n.bb(`matte`,u,r,s,u+e,r+1.3,-4.26,a.pick(o)),u+e<t-.05&&n.bb(`matte`,u+e-.03,r,s,u+e+.03,r+1.3,-4.24,`#8a8578`),u+=e}}let f=1.18,p=2.36,m=fv(f,p),h=pv(f,p),g=[`ARDEN`,`VOSS`,`KAMARA`,`LINDGREN`,`PRUETT`];[-66.1,-58.6,-37.5,-30.5,-23.5].forEach((e,i)=>{n.geo(`matte`,m,e,r,s,`#bdb8ac`),i===3?(n.push(e+f/2,r,-4.28,.5),n.geo(`matte`,h,-1.18/2,0,0,`#141515`),n.pop(),n.geo(`matte`,h,e,r,-4.296,`#060707`)):(n.geo(`matte`,h,e,r,-4.29,`#141515`),n.box(`metal`,e,r+2.02,-4.2299999999999995,.36,.12,.02,`#c9a85a`),t.place(t.make(g[i],{style:`light`,bg:`#c9a85a`,fg:`#2a2418`,size:30,weight:700}),e,r+2.02,-4.215,.08),n.sphere(`metal`,e+.42,r+1.05,-4.22,.035,`#b8a26a`,6,4))});let _=r+3.45,v=-3.8499999999999996;for(let[e,t]of[[l+.4,-54.2],[-41.8,u]])sv(n,ov([e,_,v],[t,_,v],.08,12),.016,`#1b1b1b`,4);for(let e of[-70,-64,-58,-40,-34,-28,-22])n.cyl(`metal`,e,_-.14,v,.045,.16,`#3a3530`,6),n.sphere(`glow`,e,_-.25,v,.09,X(`#ffd9a0`,6),8,6);for(let[e,t]of[[l+.4,-54.15],[-41.85,u]]){n.rod(`metal`,[e,i-.45,-3.9499999999999997],[t,i-.45,-3.9499999999999997],.12,`#3a3b3a`,8);for(let r=e+1.6;r<t;r+=4)n.box(`metal`,r,i-.25,-4.1,.06,.5,.4,`#2a2b2b`)}let y=-3.1,b=-1.6,x=`#5a5750`;n.bb(`matte`,-54.15,r,c,-53.85,i,0,x),n.bb(`matte`,-42.15,r,c,-41.85,i,y,x),n.bb(`matte`,-42.15,r,b,-41.85,i,0,x),n.bb(`matte`,-42.15,r+2.35,y,-41.85,i,b,x);for(let e of[-54,-42])n.bb(`matte`,e-.17,r,-.05,e+.17,i,0,Ih);n.geo(`matte`,fv(1.5,2.35,.12,.3),-41.85,r,-4.7/2,`#b0ab9f`,1,1,1,0,$,0);let S=-53.85,C=-42.15,w=r+.03;n.bb(`matte`,S,r,c,C,w,0,`#57534b`),n.bb(`matte`,S,i-.12,c,C,i,s,`#2e2d2a`),n.bb(`matte`,S,r,-8.9,C,i,c,`#57544d`),n.bb(`matte`,S,i-.55,c,C,i-.12,-8.56,`#8a867c`),n.bb(`matte`,-51.3,r,c,-44.4,r+1.25,-8.57,`#7a6a50`),n.bb(`matte`,-51.3,r+1.25,c,-44.4,r+1.3,-8.549999999999999,`#40372c`),n.bb(`fabric`,-49.6,w,-4.4,-47.4,w+.012,-2.2,`#4e3832`),n.push(-52.6,w,-7.95,$),n.box(`metal`,0,.3,0,1,.1,2.3,`#2a2724`);for(let e of[-1.12,1.12])n.box(`metal`,0,.42,e,1,.84,.05,`#2a2724`);for(let[e,t]of[[-.46,-1.1],[.46,-1.1],[-.46,1.1],[.46,1.1]])n.box(`metal`,e,.15,t,.05,.3,.05,`#2a2724`);n.box(`fabric`,0,.42,0,.94,.14,2.18,`#6a645a`),n.box(`fabric`,0,.5,.25,.97,.05,1.5,`#5a5048`),n.box(`fabric`,0,.53,-.82,.6,.09,.32,`#8a857a`),n.pop(),n.bb(`wood`,-53.5,r+2,c,-51.6,r+2.04,-8.299999999999999,`#4a3a2e`);for(let e of[-53.3,-51.8])n.box(`metal`,e,r+1.9,-8.5,.03,.2,.2,`#2a2826`);n.box(`matte`,-53.1,r+2.14,-8.45,.3,.2,.22,`#6a5a4a`),n.cyl(`glass`,-52.6,r+2.04,-8.45,.06,.16,`#cfe0dc`,8),n.box(`matte`,-52.1,r+2.1,-8.45,.34,.12,.2,`#3f5a6a`),n.geo(`metal`,Z.torus(.1,8,32),-50.2,r+2.3,-8.54,`#3a3026`,.44,.44,.44),n.cylR(`glow`,-50.2,r+2.3,-8.56,.42,.02,X(`#d8dcd6`,1.1),$,0,0,32),n.geo(`metal`,Z.torus(.12,6,24),-47.3,r+2.1,-8.549999999999999,`#3a3530`,.17,.17,.17),n.cylR(`matte`,-47.3,r+2.1,-8.57,.16,.02,`#d3ccbb`,$,0,0,20),n.box(`matte`,-46.4,r+2.1,-8.57,.26,.34,.01,`#c8c2b2`,0,0,.05),n.bb(`wood`,-49.3,w+.74,-8.549999999999999,-46.1,w+.79,-7.8,`#5a4432`);for(let e of[-49.22,-46.18])for(let t of[-8.48,-7.88])n.box(`wood`,e,w+.37,t,.06,.74,.06,`#3f3026`);n.bb(`wood`,-49.25,w+.18,-8.5,-46.15,w+.21,-7.85,`#4a3a2c`);let T=w+.79,E=-48.9,D=-8.25;n.cyl(`metal`,E,T,D,.12,.04,`#1e2021`,10),n.rod(`metal`,[E,T+.03,D],[-48.839999999999996,T+.55,-8.2],.02,`#1e2021`,5),n.rod(`metal`,[-48.839999999999996,T+.55,-8.2],[-48.54,T+.64,-8.05],.02,`#1e2021`,5),n.geo(`metal`,Z.cone(12),-48.5,T+.56,-8.03,`#1e2224`,.17,.22,.17),n.sphere(`glow`,-48.5,T+.48,-8.03,.05,X(`#ffd49a`,6),8,6);for(let e=0;e<12;e++){let t=-48.4+e%6*.26+(a()-.5)*.08,r=-8.35+Math.floor(e/6)*.3;e%3==0?n.box(`metal`,t,T+.01,r,.04,.02,.24,`#8a8d8e`,a()-.5):e%3==1?(n.box(`wood`,t,T+.015,r,.03,.03,.18,`#8a6a43`,a()-.5),n.box(`metal`,t,T+.02,r-.1,.1,.04,.05,`#3a3c3d`,a()-.5)):n.geo(`metal`,Z.torus(.25,4,10),t,T+.012,r,`#b86a3a`,.07,.07,.07,$,0,0)}n.box(`matte`,-46.6,T+.12,-8.3,.44,.24,.22,`#5a5044`),n.cylR(`matte`,-46.5,T+.14,-8.185,.05,.01,`#e3d7b3`,$,0,0,10),Q.roundTable(n,-48.5,w,-3.3,{r:.5,top:`#3a2e26`,leg:`#1e1c1a`,mat:`wood`});for(let[e,t]of[[-49.35,$],[-47.65,-$]])Q.chair(n,e,w,-3.3,t,{color:`#2a2622`,mat:`wood`}),n.push(e,w,-3.3,t),n.box(`wood`,0,1.02,-.19,.44,.44,.05,`#2a2622`),n.pop();n.cyl(`matte`,-48.65,w+.75,-3.35,.1,.02,`#d8d2c2`,16),n.cyl(`matte`,-48.3,w+.75,-3.2,.045,.1,`#3f6a8a`,10);let O=r+3.7;n.bb(`wood`,S,O-.14,-8.58,C,O,-5,`#4a4038`),n.bb(`wood`,S,O-.34,-5.1,C,O-.14,-5,`#3a3028`);for(let e of[-52.2,-47.6,-44.6])n.cyl(`metal`,e,O,-4.95,.012,i-O,`#2e2c2a`,4);Q.railing(n,[[S,O,-4.95],[-44,O,-4.95]],.85,{color:`#2e2c2a`,posts:1.5});for(let[e,t,r,i]of[[-52.7,`#6a4434`,1,.5],[-51.4,`#4a5664`,.85,.45],[-48.1,`#2f4450`,1.05,.5],[-45.3,`#7a4a32`,.9,.46]])n.box(`matte`,e,O+i/2,-7+(a()-.5)*.4,r,i,.75,t,(a()-.5)*.1);n.box(`matte`,-50.1,O+.15,-7.4,.45,.3,.45,`#6a5e48`,.2);for(let e of[-43.55,-43.05])n.box(`wood`,e,(w+O+.95)/2,-4.82,.05,O+.95-w,.05,`#5a4a3a`);for(let e=w+.3;e<O+.9;e+=.3)n.box(`wood`,-43.3,e,-4.82,.5,.035,.035,`#5a4a3a`);return n.box(`wood`,-43.3,w+1.18,-3.95,.7,2.36,1.1,`#141414`),n.box(`matte`,-42.93,w+2.05,-3.62,.02,.14,.22,`#b8b0a0`),n.box(`metal`,-42.93,w+1.2,-3.7,.03,.16,.03,`#8a7a5a`),n.box(`metal`,-44.3,r+2.9,-8.5,.1,.1,.16,`#2a2826`),n.sphere(`glow`,-44.3,r+2.75,-8.4,.08,X(`#ffd09a`,6),8,6),e.add(-48.5,r+3,-5.2,16764826,9),e.add(-44.3,r+2.6,-7.8,16761466,7),e.add(-64,r+3,-2.5,16767400,12),e.add(-31,r+3,-2.5,16767400,12),n.finish(Fh())}function yv({pool:e,signs:t}){let n=new Fp(`deep/workshop`),r=Y(144),i=r+7,a=q(14414),o=`#5f5c55`;Vh(n,{s:1,y0:r,x0:20.8,x1:39.85,back:12,wall:o,floor:`#4a4843`,door:[-5.4,-8.2]}),n.bb(`matte`,20.8,i-.05,-12,40,i-.02,0,`#302f2c`),n.bb(`matte`,20.8,r,-12,39.85,r+1.4,-11.96,`#2f6664`),n.bb(`matte`,20.8,r+1.4,-12,39.85,r+1.46,-11.93,`#26302e`),n.bb(`matte`,39.85,r,-12.3,40.15,i,-4.6,o),n.bb(`matte`,39.85,r,-3.2,40.15,i,0,o),n.bb(`matte`,39.85,r+2.3,-4.6,40.15,i,-3.2,o),n.bb(`matte`,39.83,r,-.05,40.17,i,0,Ih);let s=[`#6a5a4a`,`#3a3d3c`,`#8a7a5a`,`#4a5a5a`,`#2f3436`],c=0,l=(e,t,r,i,o,l,u,d=0,f=s)=>{n.push(e,t,r,d),n.box(`matte`,0,o/2,0,i,o,l,X(a.pick(f),.85+a()*.3));let p=l/2,m=Math.min(i,o)*.2;n.box(`matte`,-i*.24,o*.5,p+.004,i*.38,o*.62,.008,`#26231f`),u?n.box(`glow`,i*.2,o*.58,p+.006,i*.36,o*.34,.006,X(`#d8f0e0`,2.4)):n.cylR(`matte`,i*.2,o*.6,p+.008,m,.012,`#e3d7b3`,$,0,0,12);for(let e=0;e<2;e++)n.cylR(`matte`,i*(.1+e*.2),o*.2,p+.02,.025,.04,`#1c1c1c`,$,0,0,8);n.pop(),c++},u=29.6,d=39.4;for(let e of[3.6,4.5]){n.bb(`metal`,u,r+e-.04,-12,d,r+e,-11.5,`#2e3031`);let t=29.700000000000003;for(;t<38.9;){let n=.5+a()*.3,i=.3+a()*.22;if(t+n>39.35)break;l(t+n/2,r+e,-11.74,n,i,.34,a()<.2),t+=n+.12+a()*.2}}for(let e of[29.8,32.3,34.8,37.3,39.2])for(let t of[3.6,4.5])n.box(`metal`,e,r+t-.18,-11.8,.04,.3,.3,`#2e3031`);for(let e of[29.650000000000002,39.35])n.bb(`metal`,e-.05,r,-12,e+.05,i,-11.88,`#232526`);n.rod(`metal`,[26.75,i,-11.8],[26.75,r+2.6,-11.8],.06,`#232526`,6);for(let[e,t]of[[i-.3,.09],[i-.58,.06]])n.rod(`metal`,[20.8,e,-11.65],[39.85,e,-11.65],t,`#2a2c2d`,6);n.rod(`matte`,[20.8,r+3.35,-11.92],[u,r+3.35,-11.92],.04,`#2f6664`,6),n.bb(`matte`,u,r+1.1,-12,d,r+3.4,-11.96,`#6a5840`);for(let e=0;e<5;e++)for(let t=0;t<20;t++){let i=29.900000000000002+9.199999999999998/19*t,o=r+3.15-e*.46;n.rod(`metal`,[i,o,-11.96],[i,o+.03,-11.850000000000001],.006,`#8a8d8e`,3);let s=a();if(s<.18)n.box(`metal`,i,o-.12,-11.930000000000001,.035,.24,.012,`#9a9d9e`);else if(s<.32)n.cyl(`matte`,i,o-.12,-11.920000000000002,.018,.09,a.pick([`#a3342b`,`#c9a13b`,`#3f6a8a`]),6),n.cyl(`metal`,i,o-.27,-11.920000000000002,.005,.15,`#9a9d9e`,4);else if(s<.44)n.geo(`matte`,Z.torus(.25,5,12),i,o-.08,-11.920000000000002,a.pick([`#b86a3a`,`#a33a2e`,`#2b2b2b`]),.07,.07,.07);else if(s<.56)for(let e of[-1,1])n.box(`metal`,i,o-.1,-11.930000000000001,.02,.2,.012,`#6a6e70`,0,0,e*.15);else s<.8?n.box(`matte`,i,o-.12,-11.930000000000001,.18,.24,.02,a.pick([`#d8d0bc`,`#c9a13b`,`#c9a13b`,`#5a9a98`,`#e3dccb`])):s<.86&&n.cylR(`matte`,i,o-.06,-11.920000000000002,.05,.03,`#2b2b2b`,$,0,0,10)}n.bb(`matte`,29.8,r,-11.95,39.2,r+.8,-11.08,`#2c5261`),n.bb(`matte`,29.75,r+.8,-11.98,39.25,r+.86,-11.02,`#4a4d4a`);for(let e of[31.7,33.6,35.5,37.4])n.box(`matte`,e,r+.4,-11.075,.03,.7,.01,`#1f3a44`);let f=r+.86;for(let e of[30.5,32.2,34.1,37,38.6])l(e,f,-11.55,.6,.38,.36,!0);n.box(`metal`,35.6,f+.02,-11.45,.6,.03,.4,`#8a8d8e`),n.box(`metal`,35.6,f+.14,-11.63,.6,.25,.02,`#6a6e70`);for(let e=0;e<5;e++)n.cyl(`glass`,35.4+e%3*.16,f+.035,-11.5+Math.floor(e/3)*.14,.03,.1,`#d8dcd6`,8);n.rod(`matte`,[36.1,f+.05,-11.5],[36.4,f+.2,-11.3],.012,`#a3342b`,5);for(let e=0;e<14;e++){let e=30+a()*9,t=-11.8+a()*.7;a()<.5?n.box(`matte`,e,f+.02,t,.04+a()*.06,.03,.03+a()*.05,a.pick([`#2b2b2b`,`#b86a3a`,`#3f6a8a`,`#8a8d8e`]),a()*3):n.cyl(`metal`,e,f,t,.015+a()*.02,.04,a.pick([`#8a8d8e`,`#b09050`]),6)}Q.stool(n,35.4,r,-10.3,{color:`#3a3c3d`,h:.72}),Q.archFrame(n,28.55,r,-11.96,0,{w:1.3,h:2.6,color:`#8f8a80`,depth:.06,t:.1}),n.bb(`matte`,26,r,-12,27.2,r+2.4,-11.94,`#1b1c1c`);let p=26.2,m=2.9,h=[`#b8a47a`,`#c8b890`,`#8a7a5a`,`#4a8a8a`,`#d8d0bc`,`#6a5a4a`];for(let e of[-11.2,-8.5,-5.8])n.box(`metal`,26.45,r+m/2,e,.5,m,.05,`#5a5e60`);n.bb(`matte`,26.15,r,-11.2,p,r+m,-5.8,`#55585a`);for(let e of[.1,.8,1.5,2.2,2.9])n.bb(`metal`,p,r+e-.04,-11.2,26.7,r+e,-5.8,`#6a6e70`);for(let e of[.1,.8,1.5,2.2]){let t=-11.05;for(;t<-6.2&&c<44;){let n=.45+a()*.3;if(t+n>-5.9)break;l(26.45,r+e,t+n/2,n,.28+a()*.3,.32,a()<.25,$,h),t+=n+.06+a()*.12}}n.bb(`wood`,26.8,r+.8,-10.6,27.6,r+.86,-6.4,`#5a4630`);for(let e of[-10.5,-6.5])for(let t of[26.86,27.54])n.box(`metal`,t,r+.4,e,.05,.8,.05,`#2b2d2e`);let g=[`#b86a3a`,`#2b2b2b`,`#a33a2e`,`#8a8d8a`,`#c9a13b`,`#3a6a8a`];for(let e=0;e<14;e++){let t=.18+a()*.08,i=X(a.pick(g),.85+a()*.3);e<7?n.geo(`matte`,Z.torus(.22,6,16),30.4+e*1.3,r+1.5,-11.91,i,t,t,t*1.3):n.geo(`matte`,Z.torus(.3,6,16),26.48,r+2.9+t*.45,-10.8+(e-7)*.68,i,t,t,t*1.5,$,0,0)}let _=[`#3e6a8a`,`#a33a2e`,`#c9a13b`,`#6b7a3a`,`#8a8d8a`];for(let e=0;e<4;e++)for(let t=0;t<7;t++){let i=-1.4-e*.9,o=r+t*.62,s=X(a.pick(_),.85+a()*.25).clone();n.box(`matte`,21.16,o+.28,i,.62,.56,.84,s),n.box(`matte`,21.48,o+.16,i,.04,.3,.84,s.multiplyScalar(.8)),n.box(`matte`,21.505,o+.2,i,.005,.1,.3,`#e9e4d6`)}n.box(`metal`,21.2,r+1,-10.4,.7,2,1.2,`#4a5a5a`);for(let e=0;e<6;e++)n.cylR(`matte`,21.56,r+1.5-Math.floor(e/3)*.4,-10.8+e%3*.4,.1,.02,`#e3d7b3`,0,0,$,12);return n.box(`glow`,21.56,r+.6,-10.4,.01,.06,.5,X(`#ffb45a`,3)),Q.crate(n,24.6,r,-2.4,.7,`#7a5a38`,.2),n.box(`matte`,39.25,r+.85,-2.3,.9,1.7,1.1,`#7a6448`),n.box(`matte`,38.78,r+.95,-2.3,.02,1.5,.9,`#6a563c`),n.box(`matte`,38.1,r+.3,-3.1,.6,.6,.55,`#2e3032`,.1),n.box(`matte`,38.12,r+.85,-3.12,.5,.5,.48,`#3a3c3e`,-.1),[[[22.5,i-.15,-2],[31,r+1.3,-11.9]],[[26,i-.15,-1.5],[36.5,r+2.1,-11.9]],[[33,i-.15,-1],[24,r+3,-11.9]],[[38.5,i-.15,-2.5],[30,r+3.45,-11.9]],[[36,i-.15,-1.2],[39.5,r+1.2,-11.9]],[[29.5,i-.15,-3],[38,r+3.5,-11.9]],[[22,i-.2,-8],[34,i-1.2,-11.9]],[[39.5,i-.2,-6],[27,r+4.2,-11.9]]].forEach(([e,t],r)=>{let i=ov(e,t,.3,10);if(sv(n,i,.012,`#1b1b1b`,3),r%2==0){let e=i[4],t=.25;n.cyl(`metal`,e[0],e[1]-t,e[2],.006,t,`#1b1b1b`,3),n.sphere(`glow`,e[0],e[1]-t-.05,e[2],.06,X(`#ffc27a`,5),6,4)}}),Q.pendant(n,34,i,-6,{drop:1.1,color:`#fff4e0`,power:9,shade:`#2e3130`,r:.34}),Q.tube(n,31.2,i-1.3,-4.5,2.4,0,{color:`#eef6ff`,power:4}),n.cyl(`metal`,31.2,i-1.24,-4.5,.008,1.24,`#1b1b1b`,3),t.place(t.make(`144`,{style:`paint`,size:60,sub:`CAFETERIA  →`}),42,r+4.2,-11.95,.5),e.add(34,r+5.2,-6,16773336,24),e.add(27.5,r+3.2,-8.5,16761466,10),e.add(35,r+2.2,-10.8,16767392,10),n.finish(Fh())}function bv({pool:e,signs:t}){let n=new Fp(`deep/mechcafe`),r=Y(144),i=r+7,a=q(14444),o=`#6b675e`,s=-22.3,c=Math.sqrt(5625-s*s)+.2;n.geo(`matte`,uv(1,40.15,22.3),0,r+.02,0,`#46453f`),n.geo(`matte`,uv(-1,40.15,22.3),0,i-.02,0,`#2d2c29`,1,1,1,0,0,Math.PI),n.bb(`matte`,44,r,-22.6,c,i,s,o),n.bb(`matte`,43.7,r,-22.6,44,i,-12,o),n.bb(`matte`,40.15,r,-12.3,44,i,-12,o),n.bb(`matte`,40.15,r,-12,43.7,r+1.2,-11.96,`#2f6664`),n.bb(`matte`,40.15,r+1.2,-12,43.7,r+1.26,-11.93,`#26302e`);let l=Math.atan2(s,c-.2);n.geo(`matte`,dv(74.75,l,-.002,r,i,{n:24}),0,0,0,`#3a3935`);for(let e=0;e<=6;e++){let t=l+e/6*-l;n.box(`matte`,Math.cos(t)*74.7,r+7/2,Math.sin(t)*74.7,.06,7,.06,`#33322f`)}n.geo(`matte`,dv(74.7,l,-.002,r+.02,r+.4,{n:24}),0,0,0,`#23221f`);let u=r+4.4,d=zp(13.4,3.5,1.2);d.holes.push(zp(12.2,2.7,.8)),n.geo(`matte`,Lp(d,.45,!1,10),52,u,s,`#3a3833`),n.geo(`matte`,Lp(zp(12.2,2.7,.8),.04,!1,10),52,u,s,`#161717`),n.mesh(Rh(Bh(),52,u,-22.05,12,2.5,0,1.15,`deep/walker/wallscreen`)),n.bb(`matte`,46.4,r+1,s,57.6,r+2.8,-22.240000000000002,`#1d1d1c`);for(let e of[47.6,52.3,57])n.cyl(`metal`,e,r+2.5,-21.400000000000002,.008,4.5,`#1b1b1b`,3),n.cyl(`metal`,e,r+2.42,-21.400000000000002,.05,.1,`#2a2826`,6),n.sphere(`glow`,e,r+2.34,-21.400000000000002,.09,X(`#ffc98a`,6),8,6);n.bb(`matte`,46,r,-21.35,59,r+.95,-20.35,`#34332f`),n.bb(`matte`,45.95,r+.95,-21.4,59.05,r+1.02,-20.3,`#8e8b84`),n.cyl(`metal`,57.6,r+1.02,-20.85,.2,.55,`#8a8d8e`,12),n.cyl(`metal`,57.6,r+1.57,-20.85,.22,.05,`#5a5d5e`,12);for(let e=0;e<6;e++)n.box(`metal`,48.5+e*.05,r+1.03+e*.02,-20.85,.4,.015,.3,`#9aa09e`);for(let[e,t]of[[51,-12],[52.2,-6.4],[54.4,-17.4],[58.2,-10.6],[56.8,-3.4],[59.6,-16.8],[64.8,-14.2],[65,-8.6],[61.8,-4]]){n.cyl(`metal`,e,r,t,.36,.72,`#232424`,14,.22),n.cyl(`matte`,e,r+.72,t,.8,.05,`#6e6c68`,24);let i=a()*$_;for(let o=0;o<4;o++){let s=i+o*$+(a()-.5)*.35,c=1.05+a()*.15;Q.chair(n,e+Math.sin(s)*c,r,t+Math.cos(s)*c,s+Math.PI+(a()-.5)*.3,{color:`#2c2d2d`,mat:`metal`})}a()<.6&&n.box(`metal`,e+(a()-.5)*.6,r+.78,t+(a()-.5)*.6,.42,.02,.3,`#b5b8b6`,a()*3),a()<.5&&n.cyl(`matte`,e+(a()-.5)*.6,r+.77,t+(a()-.5)*.6,.045,.1,`#e8e2d2`,10)}let f=57.7,p=-9.9,m=r+6.3,h=new Pa;h.absarc(0,0,7.3,0,$_,!1);let g=new Na;g.absarc(0,0,6.1,0,$_,!0),h.holes.push(g),n.geo(`metal`,Lp(h,.5,!1,64),f,m,p,`#5e5c58`,1,1,1,-$,0,0);let _=X(`#f2f4f0`,1.7).clone();for(let e=0;e<26;e++){if([3,4,11,17,18,22].includes(e))continue;let t=(e+.5)/26*$_;n.box(`glow`,f+Math.cos(t)*6.6,m-.04,p+Math.sin(t)*6.6,1.45,.08,.6,_,$-t)}for(let e=0;e<4;e++){let t=e/4*$_+.4;n.cyl(`metal`,f+Math.cos(t)*6.7,m+.35,p+Math.sin(t)*6.7,.01,i-m-.35,`#1b1b1b`,3)}let v=67.5;n.bb(`metal`,66.4,r,s,68.6,r+2.95,-22.14,`#2a2a28`),n.bb(`metal`,66.58,r+.02,-22.2,68.42,r+2.72,-22.080000000000002,`#151515`),n.geo(`metal`,Z.torus(.14,6,24),v,r+1.75,-22.05,`#3a3d3e`,.28,.28,.28),n.cylR(`glass`,v,r+1.75,-22.060000000000002,.27,.02,`#8fa0a0`,$,0,0,16),n.box(`metal`,68.12,r+1.15,-22.05,.06,.3,.06,`#5a5d5e`),t.place(t.make(`AUTHORISED ONLY`,{style:`light`,size:36}),v,r+3.2,-22.27,.2),t.place(hv(t,[`MECHANICAL`,`CAFETERIA`]),62.6,r+4.5,-22.27,1),Q.crate(n,72.2,r,-6.4,1.05,`#6a4a38`,.2),Q.crate(n,72.6,r,-5.2,.8,`#7a5a42`,-.1),n.box(`matte`,70.8,r+.3,-5.6,.9,.6,.7,`#3a3c3e`,.4),n.rod(`metal`,[44,i-.5,-21.8],[71.2,i-.5,-21.8],.2,`#4d4e4b`,10);for(let e=46;e<71;e+=4)n.box(`metal`,e,i-.28,-21.95,.06,.44,.3,`#2a2b2b`);return e.add(f,r+5.2,p,15922943,14),e.add(52,r+2.2,-19.5,16763274,10),e.add(47,r+4,-15,15265522,10),n.finish(Fh())}function xv({pool:e,signs:t,dyn:n,updaters:r,power:i}){let a=new Fp(`deep/hall`),o=sp,s=Y(144)-ep,c=19.5,l=-Math.sqrt(5625-c*c),u=-1113.8,d=new ea(75.05,96,0,Math.PI);d.rotateX(-$),a.geo(`matte`,d,0,o,0,`#6a655b`);let f=tf(Sf(`FOUNDATION CAP · LOT 9 · NO ACCESS BELOW`,4096,256,{size:34,spacing:.42}),{repeat:!1}),p=new G(new Co(156,o-cp),new Bo({name:`deep/capSection`,map:f,roughness:.92}));p.position.set(0,(o+cp)/2,0),p.name=`deep/cap/section`,p.receiveShadow=!0,a.mesh(p);for(let e of[-1127.9,-1130.8])a.bb(`matte`,-78,e-.04,0,78,e+.04,.012,`#b3aa99`);let m=`#9a9587`,h=.0955,g=1.00912025,_=-2*c*h,v=(3.7245-Math.sqrt(_*_-4*g*-5244.75))/(2*g),y=-19.5+h*v;a.bb(`matte`,-19.5,o,-.4,c,s,0,m),a.bb(`matte`,c,o,l,19.2,s,-.4,`#5d5a55`);let b=Math.hypot(y+c,v);a.box(`matte`,(y-c)/2+.15,(o+s)/2,v/2,.3,s-o,b,`#5d5a55`,Math.atan2(-.0955,-1)+Math.PI);for(let e of[-12.75,-6.95,6.95,12.75])a.bb(`matte`,e-1.65,o+2.6,-.05,e+1.65,s-1,.012,`#1c1d1d`);a.bb(`matte`,c,u,-.4,75,s,0,m),a.geo(`matte`,uv(-1,c,-l),0,u,0,`#4a4843`,1,1,1,0,0,Math.PI),t.place(t.make(`P-2 · PUMPS`,{style:`light`,size:40}),47,-1109.1,.015,.42),a.geo(`matte`,dv(74.8,Math.atan2(l,19.8),0,o,u,{n:48}),0,0,0,`#3e3c38`);let x=new Bo({name:`deep/brick`,map:tf(mv(256,5)),color:`#98928a`,roughness:.95}),S=new G(dv(74.8,Math.PI,Math.atan2(v,y-.3)+$_,o,s,{n:64,tile:8}),x);S.name=`deep/generator/brick`,S.receiveShadow=!0,a.mesh(S),a.geo(`matte`,uv(1,c,-l),0,s-.03,0,`#3f3d39`,1,1,1,0,0,Math.PI);let C=-38.55,w=-25.05,T=`#1c1e1f`,E=`#3a3d3f`,D=`#34373a`,O=-1118.9,k=-1110.6,A=-1101,j=(e,t=D)=>Q.railing(a,e,1.05,{color:t,posts:1.6}),M=(e,t,n,r,i=36)=>{let a=[];for(let o=0;o<=i;o++){let s=n+(r-n)*o/i;a.push([C+Math.cos(s)*e,t,w+Math.sin(s)*e])}return a},N=new ea(11.2,64);N.rotateX(-$),a.geo(`matte`,N,C,o+.012,w,`#2d2b29`);for(let e=0;e<28;e++){let t=(e+.5)/28*$_;a.box(`matte`,C+Math.cos(t)*6.75,o+.02,w+Math.sin(t)*6.75,.85,.012,1.1,`#b9b4a9`,$-t)}a.cyl(`metal`,C,o,w,6.05,.35,`#141516`,48),a.cyl(`metal`,C,o+.35,w,5.65,O-o-.35,T,48);for(let e of[o+1,-1119.5])a.geo(`metal`,Z.torus(.03,6,64),C,e,w,`#101112`,5.66,5.66,5.66,$,0,0);a.geo(`metal`,Z.torus(.1,6,32),C,-1122.4,-19.330000000000002,`#2a2c2d`,1.75,1.75,1.75),t.place(t.make(`GEN-1`,{style:`paint`,size:44}),C,-1120.3,-19.37,.28);for(let e=0;e<36;e++){let t=(e+.5)/36*$_;a.box(`metal`,C+Math.cos(t)*7.05,-1118.96,w+Math.sin(t)*7.05,1.3,.1,2.75,E,$-t)}for(let e=0;e<12;e++){let t=e/12*$_+.13;a.rod(`metal`,[C+Math.cos(t)*5.65,-1121.2,w+Math.sin(t)*5.65],[C+Math.cos(t)*8.2,-1119.0500000000002,w+Math.sin(t)*8.2],.07,`#26282a`,6)}a.cyl(`metal`,C,O,w,4.3,8.300000000000182,`#232627`,40);for(let e=0;e<20;e++){let t=(e+.5)/20*$_;a.box(`metal`,C+Math.cos(t)*4.97,-1112.1,w+Math.sin(t)*4.97,.09,3.2,1.35,`#2c2f31`,$-t)}for(let e=0;e<36;e++){let t=(e+.5)/36*$_;a.box(`metal`,C+Math.cos(t)*7.1,-1110.6599999999999,w+Math.sin(t)*7.1,1.72,.12,5.4,E,$-t)}for(let e=0;e<12;e++){let t=e/12*$_;a.rod(`metal`,[C+Math.cos(t)*4.3,-1113.1999999999998,w+Math.sin(t)*4.3],[C+Math.cos(t)*9.4,-1110.75,w+Math.sin(t)*9.4],.07,`#26282a`,6)}let P=-1102.9;a.cyl(`metal`,C,k,w,6.95,7.699999999999818,T,48);for(let e=0;e<40;e++){let t=e/40*$_;a.box(`metal`,C+Math.cos(t)*6.97,-2213.5/2,w+Math.sin(t)*6.97,.05,7.5999999999998185,.05,`#101112`,$-t)}for(let e of[-1110.3,-1103.25])a.geo(`metal`,Z.torus(.03,6,64),C,e,w,`#101112`,6.98,6.98,6.98,$,0,0);a.cyl(`metal`,C,P,w,6.95,.7,`#222526`,48,6.1/6.95),a.cyl(`metal`,C,-1102.2,w,6.1,.1,T,48),a.cyl(`metal`,C,-1102.1000000000001,w,.75,s+.1-P-.8,`#2a2c2d`,20);for(let e of[-1101.5,-1097.5,s-.5])a.cyl(`metal`,C,e,w,.92,.2,`#1c1e1f`,20);let F=C/Math.hypot(C,w),I=w/Math.hypot(C,w),L=Math.hypot(C,w),R=[C+F*28.4,w+I*28.4];a.rod(`metal`,[C,-1098.8,w],[R[0],-1098.8,R[1]],.32,`#34373a`,10);for(let e of[6,14,22])a.cylR(`metal`,C+F*e,-1098.8,w+I*e,.42,.18,`#1f2122`,0,Math.atan2(-I,F),-$,12);let ee=new pi({name:`deep/generator/core`,color:ev.clone()}),te=new pi({name:`deep/generator/slots`,color:tv.clone()}),ne=new Fp(`deep/generator/core`);ne.geo(`core`,Z.circle(32),C,-1122.4,-19.37,`#ffffff`,1.62,1.62,1);for(let e=0;e<24;e++){let t=(e+.5)/24*$_;ne.box(`slot`,C+Math.cos(t)*6.98,-1109.6499999999999,w+Math.sin(t)*6.98,.16,.5,.04,`#ffffff`,$-t)}let re=ne.finish({core:ee,slot:te},{shadows:!1});re.name=`deep/generator/core`;let ie=new pi({name:`deep/generator/halo`,color:new W(`#ff7a2a`),transparent:!0,opacity:.32,blending:2,depthWrite:!1}),z=new G(new ea(3.6,32),ie);z.position.set(C,-1122.4,-19.15),z.name=`deep/generator/halo`,re.add(z),n.add(re);let ae=66.4,oe=3.19,se=4.33,ce=(e,t)=>[Math.cos(t)*e,Math.sin(t)*e],le=`#1f2122`,ue=Math.atan2(w,C)+$_;for(let e=0;e<14;e++){let t=oe+e/13*1.1400000000000001;{let[e,n]=ce(71,t);a.box(`metal`,e,(o+A+1.2)/2,n,.36,-1099.8-o,.36,le,$-t)}let[n,r]=ce(71,t),[i,s]=ce(ae,t);for(let e of[O,k,A])a.beam(`metal`,[n,e-.2,r],[i,e-.2,s],.16,.22,le);a.beam(`metal`,[n,o,r],[i,-1119.2,s],.07,.07,le)}for(let e of[O,k,A]){for(let t=0;t<40;t++){let n=oe+(t+.5)/40*1.1400000000000001,[r,i]=ce(137.4/2,n);a.box(`metal`,r,e-.06,i,1.9979500000000003,.1,4.899999999999994,E,$-n)}for(let t of[71,ae])for(let n=0;n<13;n++){let[r,i]=ce(t,oe+n/13*1.1400000000000001),[o,s]=ce(t,oe+(n+1)/13*1.1400000000000001);a.beam(`metal`,[r,e-.2,i],[o,e-.2,s],.14,.24,le)}let t=e===A?0:.012,n=(t,n)=>{let r=[],i=Math.max(2,Math.round((n-t)*30));for(let a=0;a<=i;a++){let[o,s]=ce(66.30000000000001,t+(n-t)*a/i);r.push([o,e,s])}return r};t?(j(n(oe,ue-t)),j(n(ue+t,se))):j(n(oe,se))}for(let[e,t]of[[O,8.35],[k,9.75]]){let n=66.30000000000001-L-t,r=t+n/2,i=Math.atan2(F,I),o=-I,s=F;a.box(`metal`,C+F*r,e-.06,w+I*r,1.4,.1,n,E,i);for(let c of[-1,1])a.box(`metal`,C+F*r+o*c*.72,e-.3,w+I*r+s*c*.72,.1,.4,n,le,i),j([[C+F*t+o*c*.7,e,w+I*t+s*c*.7],[C+F*(t+n)+o*c*.7,e,w+I*(t+n)+s*c*.7]]);let c=Math.atan2(I,F),l=.72/t;j(M(t-.05,e,c+l,c+$_-l))}let de=(A-o)/123,fe=e=>4.29-e/123*.927;for(let e=0;e<123;e++){let t=fe(e+.5),[n,r]=ce(72.35,t);a.box(`metal`,n,o+(e+1)*de-.03,r,.6,.06,2,`#34373a`,$-t)}for(let e of[71.3,73.4])for(let t=0;t<123;t+=6){let n=Math.min(123,t+6),[r,i]=ce(e,fe(t)),[s,c]=ce(e,fe(n));a.beam(`metal`,[r,o+t*de-.15,i],[s,o+n*de-.15,c],.08,.3,le)}let pe=[];for(let e=0;e<=123;e+=6){let[t,n]=ce(71.35,fe(e));pe.push([t,o+e*de,n])}Q.railing(a,pe,1,{color:D,posts:1.8});for(let e of[O,k,A]){let t=fe((e-o)/de),[n,r]=ce(72,t);a.box(`metal`,n,e-.06,r,1.6,.1,3,E,$-t)}let me=-1106.6,he=.47,[ge,_e]=ce(65.9,3.4);a.push(ge,me,_e,he);let ve=-1.4,ye=4.4;a.box(`metal`,ve,0,0,11.2,ye,1,`#8c8f8c`),a.box(`metal`,ve,2.24,0,11.299999999999999,.08,1.1,`#6d706d`),a.box(`matte`,-3.9,0,.51,5.6,3.5,.02,`#a2aaa4`);for(let e=0;e<60;e++){let t=e%10,n=Math.floor(e/10);a.box(`glow`,-6.300000000000001+t*.53,1.3-n*.52,.53,.2,.2,.02,X([`#6fe36a`,`#6fe36a`,`#9fe39a`,`#ffb45a`][e*7%4],2.6))}let be=1.5;a.geo(`metal`,Z.torus(.09,6,36),be,0,.52,`#e3e1da`,2.2,1.45,1.5),a.geo(`matte`,Z.circle(32),be,0,.515,`#141818`,2.15,1.4,1),a.geo(`glass`,Z.circle(32),be,0,.53,`#9fb0b0`,2.15,1.4,1),a.box(`matte`,2.05,-.05,.525,.05,1,.01,`#a3241c`,0,0,-.6),a.pop();let xe=(e,t)=>[ge+e*Math.cos(he)+t*Math.sin(he),_e-e*Math.sin(he)+t*Math.cos(he)],Se=xe(ve,.53);t.place(t.make(`MAIN POWER`,{style:`light`,size:40}),Se[0],-1104.05,Se[1],.34,he);let Ce=xe(-2.3,.1);a.rod(`metal`,[Ce[0],me-ye/2,Ce[1]],[Ce[0],o,Ce[1]],.4,`#2c2e30`,12),a.cyl(`metal`,Ce[0],o,Ce[1],.6,.3,`#1f2122`,12);let we=xe(-2.3,.55);a.cylR(`matte`,we[0],o+4.6,we[1],.22,.05,`#ece6d2`,0,he-$,-$,16),a.geo(`metal`,Z.torus(.12,6,18),we[0],o+1.7,we[1],`#b32a22`,.34,.34,.34,0,he,0);let Te=xe(-1.75,.45);t.place(t.make(`SHUT`,{style:`red`,size:36}),Te[0],o+2.4,Te[1],.2,he);let Ee=-1112.3,De=C-Ce[0],Oe=w-Ce[1],B=Math.hypot(De,Oe),ke=[C-De/B*4.35,w-Oe/B*4.35];a.sphere(`metal`,Ce[0],Ee,Ce[1],.5,`#2c2e30`,10,6),a.rod(`metal`,[Ce[0],Ee,Ce[1]],[ke[0],Ee,ke[1]],.36,`#3a3d40`,10);let Ae=Math.hypot(ke[0]-Ce[0],ke[1]-Ce[1]),je=Math.atan2(-Oe,De);for(let e=2.5;e<Ae-.5;e+=4){let t=e/Ae;a.cylR(`metal`,Ce[0]+(ke[0]-Ce[0])*t,Ee,Ce[1]+(ke[1]-Ce[1])*t,.48,.18,`#1c1e1f`,0,je,-$,12)}let V=new k_(`deep/generator/steam`,{size:1.7,opacity:.3,rise:2.4,life:4.2,seed:1451}),Me=xe(4.6,.3);V.add(Me[0],-1106.3999999999999,Me[1],2,.6),V.add(Ce[0]+(ke[0]-Ce[0])*.35,-1112,Ce[1]+(ke[1]-Ce[1])*.35,1,.3),n.add(V.group),r.push(V.update),i.hooks.push(e=>V.group.visible=e);let Ne=-28.5,Pe=o+2.3;a.bb(`matte`,-28.099999999999998,o,-30.4,-22.299999999999997,o+.35,-26.6,`#b3ada2`);for(let e of[-1,1])a.box(`metal`,-24.599999999999998,o+.65,Ne+e*1.2,3.8,.6,.5,`#1b1c1d`);a.cylR(`metal`,-24.599999999999998,Pe,Ne,1.85,4.4,`#1b1c1d`,0,0,$,28);for(let e=0;e<10;e++)a.geo(`metal`,Z.torus(.05,4,28),-26.5+e*.42,Pe,Ne,`#111213`,1.87,1.87,1.87,0,$,0);a.cylR(`metal`,-27.099999999999998,Pe,Ne,1.6,.6,`#232526`,0,0,$,28),a.box(`metal`,-24,Pe+2.15,Ne,1.3,.9,1.1,`#232526`),a.box(`matte`,-24,Pe+2.61,Ne,.8,.02,.5,`#e9e4d6`),a.cylR(`metal`,-27.65,Pe,Ne,.22,.5,`#8a8d8e`,0,0,$,10);let Fe=new On;Fe.name=`deep/generator/flywheel`,Fe.position.set(-28,Pe,Ne);let Ie=new Fp(`deep/generator/flywheel`);Ie.cylR(`metal`,0,0,0,1.15,.26,`#2b2d2e`,0,0,$,24);for(let e=0;e<4;e++)Ie.box(`matte`,-.14,Math.cos(e/4*$_)*.86,Math.sin(e/4*$_)*.86,.01,.34,.34,e%2?`#1d1d1c`:`#d8b43a`);Fe.add(Ie.finish(Fh())),n.add(Fe),[[27,-34],[35,-37],[43,-38.5],[51,-37.5],[59,-33]].forEach(([e,t],n)=>{let r=n%2?`#3d5e66`:`#46646b`;a.bb(`concrete`,e-2.6,o,t-1.3,e+2.6,o+.6,t+1.3,`#77726a`);let i=o+1.75;a.box(`metal`,e-1.1,o+.9,t,2.4,.6,1.5,`#2b2d2e`),a.cylR(`metal`,e-1.1,i,t,.95,2.6,`#56616a`,0,0,$,24);for(let n=0;n<7;n++)a.geo(`metal`,Z.torus(.05,4,24),e-2.2+n*.37,i,t,`#4a545c`,.97,.97,.97,0,$,0);a.cylR(`metal`,e-2.45,i,t,.7,.12,`#3a4046`,0,0,$,20),a.box(`metal`,e-1.1,i+1,t+.5,.5,.35,.35,`#56616a`),a.box(`metal`,e+.45,i,t,.55,.9,.9,`#c9a13b`),a.cylR(`metal`,e+1.45,i,t,1.3,.95,r,0,0,$,28);for(let n of[1,1.9])a.geo(`metal`,Z.torus(.05,5,28),e+n,i,t,`#2e3436`,1.3,1.3,1.3,0,$,0);a.cylR(`metal`,e+2.3,i,t,.5,.9,r,0,0,$,16),a.cylR(`metal`,e+2.55,i,t,.72,.1,`#2e3436`,0,0,$,16),a.sphere(`metal`,e+2.75,i,t,.52,r,12,8),a.cyl(`metal`,e+2.75,o,t,.5,i-o,r,16),a.cyl(`metal`,e+1.45,i+1.1,t,.42,1.4,r,16),a.cyl(`metal`,e+1.45,i+1.25,t,.6,.12,`#2e3436`,16),a.cylR(`matte`,e+1.45,i+2.2,t+.47,.15,.04,`#ece6d2`,$,0,0,16)});for(let[e,t]of[[30.6,-4.65],[42.05,-8.95],[52.5,-12.9]])a.cyl(`metal`,e,o,t,.16,u-o,`#1f2122`,10),a.cyl(`metal`,e,o+.35,t,.36,.45,`#2f6a52`,12),a.cyl(`metal`,e,-1114.1,t,.26,.3,`#1a1b1c`,10);let Le=[];for(let e=0;e<=24;e++){let t=-.97+e/24*.88;Le.push([Math.cos(t)*50,-1114.25,Math.sin(t)*50])}for(let e=0;e<Le.length-1;e++)a.rod(`metal`,Le[e],Le[e+1],.14,`#232526`,8);for(let e=2;e<Le.length;e+=5)a.box(`metal`,Le[e][0],-1114,Le[e][2],.08,.4,.08,`#1a1b1c`);let Re=[];for(let e=0;e<=20;e++){let t=-1.25+e/20*1.1;Re.push([Math.cos(t)*74.2,o+3.2,Math.sin(t)*74.2])}for(let e=0;e<Re.length-1;e++)a.rod(`metal`,Re[e],Re[e+1],.16,`#3a3c3d`,8);let ze=[[24.4,-34],[c,-34]];for(let e=0;e<ze.length-1;e++){let[t,n]=ze[e],[r,i]=ze[e+1];a.rod(`metal`,[t,o+.9,n],[r,o+.9,i],.55,`#4d5a4a`,14);let s=Math.hypot(r-t,i-n);for(let e=2;e<s;e+=5){let c=e/s,l=t+(r-t)*c;Math.abs(l)<20.3||a.box(`concrete`,l,o+.2,n+(i-n)*c,.9,.4,.9,`#77726a`)}}a.cylR(`metal`,19.6,o+.9,-34,.8,.3,`#2e3436`,0,0,$,16),a.cyl(`metal`,24.4,o,-34,.55,.9,`#4d5a4a`,14);let Be=new Pp,Ve=new W(1,1,1),He=(e,t,n,r)=>{let i=q(r),a=i()*6,s=i()*6,c=new Pa;for(let e=0;e<32;e++){let t=e/32*$_,r=n*(.82+.14*Math.sin(t*3+a)+.08*Math.sin(t*5+s));e===0?c.moveTo(Math.cos(t)*r,Math.sin(t)*r):c.lineTo(Math.cos(t)*r,Math.sin(t)*r)}let l=new To(c);l.rotateX(-$),Be.add(l,new $t().makeTranslation(e,o+.1,t),Ve)};He(31,-31,6,1),He(47,-33,7,2),He(58,-26,5,3),He(38,-22,4,4),He(26,-18,3.5,5);let Ue=new G(Be.build(),J.sheen);Ue.name=`deep/pumps/sheen`,a.mesh(Ue);let We=26.5,Ge=-8.5;Q.crate(a,25.95,o,Ge,.9,`#7a5a38`),Q.crate(a,27,o,-8.4,.9,`#8b6a43`,.1),Q.crate(a,We,o+.9,Ge,.6,`#9a7a50`),Q.crate(a,29.4,o,-8.1,.7,`#7a5a38`,.3);let Ke=new Co(4.6,3.6,18,14);Ke.rotateX(-$);let qe=Ke.attributes.position;for(let e=0;e<qe.count;e++){let t=qe.getX(e),n=qe.getZ(e),r=1-Zd(1.2,2.3,Math.abs(t)),i=1-Zd(.8,1.8,Math.abs(n));qe.setY(e,Math.max(.02,1.58*Math.min(r,i)+Jd(t*1.6+3,n*1.6,2)*.12))}Ke.computeVertexNormals(),a.geo(`fabric`,Ke,We,o,Ge,`#4f5d3f`);for(let e of[-.6,.6])a.rod(`fabric`,[We+e,o+.05,-6.75],[We+e,o+1.62,Ge],.015,`#c9b58a`,4);a.bb(`matte`,21,o,-8,70,o+.012,-7.7,`#b59a3a`);for(let e of[-1,1])a.cyl(`metal`,30+e*1.6,o,-12.5,.05,4.2,`#2a2c2d`,6);t.place(t.make(`PUMP ROOM`,{style:`panel`,size:52}),30,o+3.8,-12.46,.55);for(let[e,t]of[[44.8,-24],[66.9,-28.3],[72,-12.5],[48,-57.7]])a.cyl(`metal`,e,-1120.8,t,.012,7,`#1e1f20`,3),cv(a,e,-1121,t,{color:`#f4f0e6`,power:5,stem:0});let Je=iv(e,C,o+3,-17.55,16747066,80),Ye=iv(e,-36.55,-1101,-14.05,14674431,30);return i.spots.push([Je,80],[Ye,30]),e.add(-58,-1104,-24,14674431,24),e.add(-60,-1106,-12,14221280,10),e.add(-25,-1118,-31,16769720,14),e.add(42,-1117.5,-28,14216447,12),e.add(58,-1119,-16,14216447,9),e.add(26,-1121,-9,16767400,12),r.push((e,t)=>{let n=1+.05*Math.sin(t*9)+.03*Math.sin(t*23),r=.015+.985*i.glow;ee.color.copy(ev).multiplyScalar(r*n),te.color.copy(tv).multiplyScalar(r),ie.opacity=.32*r*n,Fe.rotation.x-=e*3.2*i.spin}),a.finish(Fh())}function Sv({pool:e,signs:t,dyn:n,updaters:r,power:i}){let a=new Fp(`deep/digger`),o=q(14747),s=cp,c=lp,l=-1177.8,u={x:-75.5,y:-1173,z:-13},d=Math.atan2(u.z,u.x)+$_,f=new W(`#3a342e`),p=new W(`#262b29`),m=new W(`#5e4c3c`),h=new W,g=(e,t)=>{let n=74+Jd(e*10,t/8,4)*6+Jd(e*3+4,t/20,2)*5,r=Math.min(e-Math.PI,$_-e)*74;n=Xd(Math.max(n,75.8),n,Zd(0,5,r));let i=Math.hypot((e-d)*74,t-u.y);return Math.max(n,Xd(77,n,Zd(5.6,8,i)))},_=(e,t)=>(h.copy(e).multiplyScalar(Math.max(.3,t)),[h.r,h.g,h.b]),v=lv(150,30,(e,t)=>{let n=Math.PI+e*Math.PI,r=c+1+t*(s-c-1),i=g(n,r),a=h.copy(f).lerp(p,Zd(-1175.5,-1178.5,r)).clone();return[Math.cos(n)*i,r,Math.sin(n)*i,..._(a,1.12-(i-73.5)*.07+Jd(n*30,r/3,2)*.4)]},(e,t,n)=>[-e,0,-n]);a.geo(`rock`,v,0,0,0,`#ffffff`);let y=(e,t)=>s-.05-Zd(0,7,-t)*(.5+(Jd(e/9,t/9,4)+.35)*2.6),b=lv(96,22,(e,t)=>{let n=Math.PI+e*Math.PI,r=t*78,i=Math.cos(n)*r,a=Math.sin(n)*r;return[i,y(i,a),a,..._(f,.8+Jd(i/4,a/4,2)*.5)]},()=>[0,-1,0]);a.geo(`rock`,b,0,0,0,`#ffffff`);let x=(e,t)=>{let n=Math.hypot(e,t);return-1179+Zd(0,6,-t)*(-.8+Jd(e/7,t/7,4)*2.2+Zd(64,74,n)*3.4)},S=lv(96,24,(e,t)=>{let n=Math.PI+e*Math.PI,r=t*78,i=Math.cos(n)*r,a=Math.sin(n)*r,o=x(i,a);return[i,o,a,..._(o<l?p:m,.8+Jd(i/3,a/3,2)*.5)]},()=>[0,1,0]);a.geo(`rock`,S,0,0,0,`#ffffff`);for(let e=0;e<18;e++){let e=Math.PI+.1+o()*(Math.PI-.2),t=62+o()*10,n=Math.cos(e)*t,r=Math.sin(e)*t;if(r>-4)continue;let i=.8+o()*2.2;a.ico(`rock`,n,x(n,r)+i*.2,r,i,X(`#3e3831`,.75+o()*.35),0,.6+o()*.4,o()*6)}for(let[e,t,n,r]of[[-46,-33,6,3.5],[10.5,-14.5,8,5.5],[38,-44.3,4.5,3],[57,-11,2.4,1.6]])a.geo(`rock`,Z.sphere(18,6),e,-1178.22,t,X(`#6e5a48`,.9+o()*.15),n,.7,r,0,o()*.4,0);let[C,w]=[7.8,-17.2];a.cyl(`wood`,C,-1177.7,w,.05,1.1,`#5a4a36`,6),a.box(`metal`,C,-1176.5,w,.26,.04,.26,`#2a2c2d`),a.box(`glass`,C,-1176.6499999999999,w,.22,.26,.22,`#e8e2c8`),a.sphere(`glow`,C,-1176.6499999999999,w,.08,X(`#ffc27a`,6),8,6),Q.sack(a,13.4,-1177.68,-17.4,.6,`#8a7a5a`),e.add(C,-1176.2,w,16761466,14);let T=`#6a5846`;a.bb(`matte`,-78,c,-.6,-75,s,0,T),a.bb(`matte`,75,c,-.6,78,s,0,T),a.bb(`matte`,-78,c-.5,-.6,78,-1179,0,T),a.bb(`matte`,-75,-1178.6,-.05,75,l,.003,`#24484e`),a.bb(`matte`,-75,-1179,-.05,75,-1178.6,.002,`#1a1c1b`);let E=av(`#34504f`);E.normalMap.repeat.set(24,24);let D=new G(new ea(74,72,0,Math.PI),E);D.rotation.x=-$,D.position.y=l,D.name=`deep/digger/water`,n.add(D),r.push((e,t)=>E.normalMap.offset.set(t*.012,t*.008));let O=y(0,-3.6)-.08;a.cyl(`metal`,0,O-.05,-3.6,2.75,.15,`#3a3c3d`,32),a.cyl(`metal`,0,O-.12,-3.6,2.35,.08,`#4a4d4e`,32);for(let e=0;e<16;e++){let t=e/16*$_;a.cyl(`metal`,Math.cos(t)*2.55,O-.12,-3.6+Math.sin(t)*2.55,.07,.08,`#8a8d8e`,6)}a.geo(`metal`,Z.torus(.15,6,18),0,O-.22,-3.6,`#6a2a22`,.4,.4,.4,$,0,0);let k=`#2c2e30`,A=[];for(let e=0;e<4;e++){let t=Math.PI/4+e*$,n=[-8+Math.cos(t)*6.4,-1179.3,-22+Math.sin(t)*6.4];A.push(n),a.cyl(`metal`,n[0],-1179.8,n[2],.9,.45,`#232526`,12),a.beam(`metal`,n,[-8+Math.cos(t)*4,-1175.7,-22+Math.sin(t)*4],.42,.42,`#232526`)}for(let e=0;e<4;e++)a.rod(`metal`,A[e],A[(e+2)%4],.12,`#1c1d1e`,6);a.cyl(`metal`,-8,-1176,-22,5,4.7,`#7a4a2e`,40);for(let e of[-1175.6,-1171.8])a.geo(`metal`,Z.torus(.04,5,48),-8,e,-22,`#4a2a1a`,5.02,5.02,5.02,$,0,0);a.cyl(`metal`,-8,-1171.3,-22,4.1,18.6,k,40);for(let e=0;e<16;e++){let t=e/16*$_+.1;a.box(`metal`,-8+Math.cos(t)*4.12,-1162,-22+Math.sin(t)*4.12,.05,18.5,.05,`#1c1e1f`,$-t)}for(let e of[-1170.8,-1165.9,-1159.6,-1153.3])a.geo(`metal`,Z.torus(.04,5,48),-8,e,-22,`#1c1e1f`,4.14,4.14,4.14,$,0,0);t.place(t.make(`BR-02`,{style:`paint`,size:70}),-8,-1162.4,-17.88,.7);let j=-17.7;for(let e of[-1,1])a.rod(`metal`,[-8+e*.26,l,j],[-8+e*.26,-1153.4,j],.03,`#8a8d8e`,5);for(let e=0;e<20;e++)a.rod(`metal`,[-8.26,-1170.8+e*.9,j],[-7.74,-1170.8+e*.9,j],.02,`#8a8d8e`,4);for(let e of[-1170,-1164,-1158])for(let t of[-1,1])a.rod(`metal`,[-8+t*.26,e,-17.95],[-8+t*.26,e,j],.025,`#8a8d8e`,4);let M=-1165.5;for(let e=0;e<36;e++){let t=(e+.5)/36*$_;a.box(`metal`,-8+Math.cos(t)*12.45,-1165.56,-22+Math.sin(t)*12.45,2.2,.1,1.2,`#2e3032`,$-t)}for(let e=0;e<36;e++){let t=e/36*$_,n=(e+1)/36*$_,r=[-8+Math.cos(t)*13,M,-22+Math.sin(t)*13];a.rod(`metal`,r,[r[0],-1164.4,r[2]],.025,`#3a3c3d`,4);for(let e of[.55,1.1])a.rod(`metal`,[r[0],M+e,r[2]],[-8+Math.cos(n)*13,M+e,-22+Math.sin(n)*13],.03,`#3a3c3d`,4)}for(let e=0;e<8;e++){let t=e/8*$_+.2;a.beam(`metal`,[-8+Math.cos(t)*4.1,-1165.75,-22+Math.sin(t)*4.1],[-8+Math.cos(t)*12,-1165.75,-22+Math.sin(t)*12],.22,.3,k),a.rod(`metal`,[-8+Math.cos(t)*4.1,-1169.7,-22+Math.sin(t)*4.1],[-8+Math.cos(t)*11.2,-1165.85,-22+Math.sin(t)*11.2],.08,k,6)}let N=$-.5,P=-8+Math.cos(N)*13.05,F=-22+Math.sin(N)*13.05;a.box(`metal`,P,-1164.88,F,2.5,.5,.04,`#c9bf9f`,$-N),t.place(t.make(`BORE RIG 02 · STANDBY`,{style:`stencil`,size:48}),P+Math.cos(N)*.03,-1164.88,F+Math.sin(N)*.03,.36,$-N);for(let e of[$+.9,-.4]){let t=-8+Math.cos(e)*13,n=-22+Math.sin(e)*13;a.box(`metal`,t,-1164.2,n,.4,.3,.3,`#2a2c2d`,$-e),a.box(`glow`,t+Math.cos(e)*.16,-1164.2,n+Math.sin(e)*.16,.32,.22,.02,X(`#fff0d8`,4),$-e)}let I=new On;I.name=`deep/digger/head`,I.position.set(-8,0,-22);let L=new Fp(`deep/digger/head`),R=4.1,ee=-1152.7;L.cyl(`metal`,0,-1159.6,0,4.4,1.6,`#232526`,40);for(let e=0;e<8;e++){L.push(0,0,0,-e/8*$_),L.beam(`metal`,[R,-1158.4,0],[18.3,-1154.3,0],.7,.7,`#303234`),L.rod(`metal`,[R,-1159.5,0],[12.62,-1156.24,0],.12,`#1f2122`,6);let t=Math.atan2(4.100000000000136,14.200000000000001);L.geo(`metal`,Z.cyl(16),18.900000000000002,-1154.25,0,`#8e8c86`,.75,1.3,.75,0,0,-$+t),L.geo(`metal`,Z.cone(16),19.7,-1154.2,0,`#c8c5bc`,.6,.5,.6,0,0,-$+t);for(let e=0;e<6;e++){let t=e/6*$_;L.box(`metal`,18.900000000000002,-1154.25+Math.cos(t)*.8,Math.sin(t)*.8,.3,.18,.18,`#b0ada6`,0,t,0)}L.pop()}L.cyl(`metal`,0,-1153.2,0,8.1,.5,`#232526`,48),L.cyl(`metal`,0,ee,0,7.8,5.6,`#2a2c2e`,48,2.3/7.8),L.cyl(`metal`,0,-1147.1000000000001,0,2.3,.6,`#232526`,24),L.cyl(`metal`,0,-1146.5,0,.9,.9,`#2a2c2e`,16,.6);for(let e of[.33,.66])L.geo(`metal`,Z.torus(.04,5,48),0,ee+e*5.6,0,`#1c1e1f`,7.8-e*5.5,7.8-e*5.5,7.8-e*5.5,$,0,0);let te=new U(0,1,0),ne=new U,re=new U,ie=new U,z=new kt,ae=new $t,oe=Math.hypot(5.6,5.5),se=5.6/oe,ce=5.5/oe;[[22,.16],[16,.5],[10,.82]].forEach(([e,t],n)=>{let r=7.8-t*5.5,i=ee+t*5.6;for(let t=0;t<e;t++){let a=t/e*$_+n*.2;ne.set(se*Math.cos(a),ce,se*Math.sin(a)),z.setFromUnitVectors(te,ne),re.set(r*Math.cos(a),i,r*Math.sin(a)).addScaledVector(ne,.22),L.geoMatrix(`metal`,Z.cyl(8),ae.compose(re,z,ie.set(.26,.45,.26)),`#3a3c3d`),re.addScaledVector(ne,.32),L.geoMatrix(`metal`,Z.sphere(8,6),ae.compose(re,z,ie.set(.26,.2,.26)),`#d2cec5`)}}),I.add(L.finish(Fh())),n.add(I),r.push(e=>I.rotation.y+=e*.35*i.spin);let le=Math.cos(d),ue=Math.sin(d),de=le*73.3,fe=ue*73.3,pe=Math.atan2(-le,-ue),me=(e,t)=>[de+e*Math.cos(pe)+t*Math.sin(pe),fe-e*Math.sin(pe)+t*Math.cos(pe)];a.push(de,0,fe,pe);let he=lv(24,3,(e,t)=>{let n=e*$_;return[Math.cos(n)*3,u.y+Math.sin(n)*3,-t*3.6,.35,.34,.32]},(e,t)=>[-e,u.y-t,0]);a.geo(`matte`,he,0,0,0,`#5a5650`),a.geo(`matte`,Z.cyl(24,1,!0),0,u.y,-1.8,`#4a4640`,3.12,3.6,3.12,$,0,0),a.geo(`matte`,Z.circle(24),0,u.y,-3.5,`#080909`,3.02,3.02,1);let ge=new Pa;ge.absarc(0,0,5.3,0,$_,!1);let _e=new Na;_e.absarc(0,0,3,0,$_,!0),ge.holes.push(_e),a.geo(`concrete`,Lp(ge,.7,!1,40),0,u.y,-.2,`#8e8a82`),a.geo(`metal`,Z.torus(.03,5,40),0,u.y,.52,`#3a3c3d`,3.05,3.05,3.05);for(let e=0;e<16;e++){let t=e/16*$_;a.cylR(`metal`,Math.cos(t)*3.5,u.y+Math.sin(t)*3.5,.55,.09,.14,`#9a9d9e`,$,0,0,6)}a.box(`rock`,0,u.y-4.9,1.2,7.5,1.2,3.2,`#3a342e`),a.box(`metal`,0,u.y+3.75,.62,.1,.1,.25,`#2a2c2d`),cv(a,0,u.y+3.6,.85,{color:`#ffcf8a`,power:5,stem:0}),a.pop();let ve=me(0,1.4),ye=me(-6.2,.12);return t.place(t.make(`NO ENTRY BEYOND THIS POINT`,{style:`red`,size:34}),ye[0],u.y+1.2,ye[1],.28,pe),e.add(ve[0],u.y+2.2,ve[1],16764810,14),e.add(0,-1164,-10,13625087,60),e.add(-8,-1160,-7,16773336,22),e.add(-40,-1168,-35,13625087,26),e.add(40,-1168,-35,13625087,26),a.finish(Fh())}var Cv=`Drag to orbit · Scroll to zoom · Right-drag to pan · ← → next place · Esc whole silo`,wv=[{id:`camp`,name:`Survivors’ camp`,zone:`top`,level:18,side:`west`,span:45,kind:`room`,only:`17`,after:`watcher`,anchor:[-47,Y(18)+3.85,0],cam:{position:[-36,Y(18)+4.9,30],target:[-46,Y(18)+2.6,-13]},card:{title:`Survivors’ camp`,sub:`Level 18, Silo 17 — a camp pitched in the dark`,body:`With the lights gone, the last of Silo 17 moved out of the apartments and into the corridor in front of them. Tarps hang from roped posts, bedrolls line the floor underneath, and a floodlight on a tripod runs off a small generator. Crates, cartons and barrels are stacked along the back wall.`,facts:[`Canopies and tents fill five bays between the apartment walls.`,`Children’s drawings are pinned up beside a barrel stove.`,`Lanterns hang from the ropes; the floodlight is the only strong light on the level.`,`Old tyres and buckets of sand hold the posts upright.`],foot:`Silo 17 only · Props: tarps · bedrolls · floodlight · stove · stores`}}],Tv=(e,t)=>!e.only||e.only===String(t);function Ev(e,t=wv){let n=e.slice();for(let e of t){let t=n.findIndex(t=>t.id===e.after);n.splice(t<0?n.length:t+1,0,e)}return n}var Dv=`http://www.w3.org/2000/svg`,Ov=650,kv=[`surface`,`top`,`mids`,`deep`,`below`],Av=[`silo`,`surface`,`top`,`below`],jv=9,Mv=.9,Nv=1.2,Pv=10,Fv=[{title:`UP TOP`,s17:`UP TOP · DARK`,sub:`Levels 1–49`,at:[97,-6,0]},{title:`THE MIDS`,sub:`Levels 50–119`,at:[97,Y(50)+2,0]},{title:`DOWN DEEP`,sub:`Levels 120–144`,at:[97,Y(120)+2,0]},{title:`BELOW`,sub:`Generator · the Digger`,at:[97,-1104,0]},{title:`THE GREAT STAIR`,sub:`288 turns · 432 bridges`,at:[17,-224,24],center:!0}],Iv={18:[`SILO 18`,`144 levels · over a kilometre deep · one stair`],17:[`SILO 17`,`No power · lower levels flooded`]};function Lv(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!=null&&(r.textContent=n),r}function Rv(e,t,n={}){let r=Lv(`button`,e,t);r.type=`button`;for(let e in n)r.setAttribute(e,n[e]);return r}function zv(e){let t=e.places||hp,n=t.length,r=document.documentElement,i=document.getElementById(`ui`),a=document.getElementById(`leaders`);i.textContent=``,a.textContent=``;let o={},s=(e,t)=>((o[e]||=[]).push(t),()=>o[e].splice(o[e].indexOf(t)>>>0,1)),c=(e,t)=>{let n=o[e];if(n)for(let e of n)e(t)},l=Lv(`div`,`ui-top-left`),u=Lv(`div`,`brand`);u.append(Lv(`div`,`brand-title`,`SILO`));let d=Lv(`div`,`row`),f=Lv(`div`,`seg`);f.id=`mode`,f.setAttribute(`role`,`group`),f.setAttribute(`aria-label`,`Silo`);let p={18:Rv(null,`Silo 18`,{title:`Home`,"data-mode":`18`}),17:Rv(null,`Silo 17`,{title:`No power, lower levels flooded`,"data-mode":`17`})};f.append(p[18],p[17]),f.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-mode]`);t&&c(`mode`,t.dataset.mode)});let m=Lv(`div`,`seg`);m.id=`views`,m.setAttribute(`role`,`group`),m.setAttribute(`aria-label`,`Views`);let h={};for(let e of Av)h[e]=Rv(null,pp[e].label,{"data-view":e,"aria-pressed":`false`}),m.append(h[e]);m.addEventListener(`click`,e=>{let t=e.target.closest(`button[data-view]`);t&&c(`view`,t.dataset.view)}),d.append(f,m);let g=Lv(`nav`);g.id=`legend`,g.setAttribute(`aria-label`,`Places`);let _=Array(n).fill(null),v=new Map;for(let n of kv){let r=t.filter(e=>e.zone===n);if(r.length){g.append(Lv(`div`,`legend-zone`,gp[n]||n));for(let n of r){let r=Rv(`legend-item`,null,{"data-id":n.id});r.append(Lv(`span`,`lvl`,String(n.badge??n.level)),Lv(`span`,`name`,n.name)),r.addEventListener(`pointerenter`,()=>c(`legend-hover`,n.id)),r.addEventListener(`pointerleave`,()=>c(`legend-hover`,null)),r.addEventListener(`focus`,()=>c(`legend-hover`,n.id)),r.addEventListener(`blur`,()=>c(`legend-hover`,null)),n.only&&(r.hidden=!Tv(n,e.silo?.mode===`17`?`17`:`18`)),g.append(r),_[t.indexOf(n)]=r,v.set(n.id,r)}}}g.addEventListener(`click`,e=>{let t=e.target.closest(`.legend-item`);t&&c(`legend`,t.dataset.id)}),l.append(u,d,g);let y=Lv(`div`,`ui-top-right`),b=Lv(`div`,`stats`);b.id=`stats`;let x=Lv(`span`,null,`-- fps`),S=Lv(`span`,null,`0.00M tris`),C=Lv(`span`,null,`0.00M in scene`),w=Lv(`span`,null,`0 calls`);b.append(x,S,C,w),y.append(b,Lv(`div`,`hint`,Cv)),new URLSearchParams(location.search).has(`stats`)&&r.classList.add(`stats`);let T=Lv(`div`);T.id=`zones`;let E=Fv.map(e=>{let t=Lv(`div`,e.center?`zone-marker center`:`zone-marker`),n=Lv(`b`,null,e.title);return t.append(n,Lv(`i`,null,e.sub)),T.append(t),{el:t,b:n,def:e,x:e.at[0],y:e.at[1],z:e.at[2],sx:NaN,sy:NaN,vis:!1,center:!!e.center}}),D=Lv(`div`,`chip`);D.id=`chip`,D.setAttribute(`aria-hidden`,`true`);let O=Lv(`span`),k=Lv(`small`);D.append(O,k);let A=Lv(`div`,`dyk`);A.id=`dyk`,A.setAttribute(`aria-live`,`polite`);let j=Lv(`div`,`intro`);j.id=`intro`;let M=Lv(`div`,`intro-a`),N=Lv(`div`,`intro-b`);j.append(M,N);let P=Lv(`aside`,`card`);P.id=`card`,P.setAttribute(`aria-labelledby`,`card-title`),P.setAttribute(`aria-hidden`,`true`),P.inert=!0;let F=Rv(`card-close`,`×`,{"aria-label":`Close`}),I=Lv(`div`,`card-level`),L=Lv(`h2`,`card-title`);L.id=`card-title`;let R=Lv(`div`,`card-sub`),ee=Lv(`p`,`card-body`),te=Lv(`ul`,`card-facts`),ne=Lv(`div`,`card-eps`),re=Lv(`div`,`card-nav`),ie=Rv(null,`‹ prev`,{id:`card-prev`}),z=Lv(`span`);z.id=`card-index`;let ae=Rv(null,`next ›`,{id:`card-next`});re.append(ie,z,ae),P.append(F,I,L,R,ee,te,ne,re),F.addEventListener(`click`,()=>c(`close`)),ie.addEventListener(`click`,()=>c(`prev`)),ae.addEventListener(`click`,()=>c(`next`));let oe=Lv(`div`,`toast`);oe.id=`toast`,oe.setAttribute(`role`,`status`),oe.setAttribute(`aria-live`,`polite`),i.append(l,y,T,D,A,j,P,oe);let se=t.map(e=>{let t=document.createElementNS(Dv,`g`);t.dataset.id=e.id,t.style.display=`none`;let n=document.createElementNS(Dv,`path`);n.setAttribute(`class`,`leader`);let r=document.createElementNS(Dv,`circle`);r.setAttribute(`class`,`leader-dot`),r.setAttribute(`r`,`3.2`),t.append(n,r),a.append(t);let i=e.anchor||[0,0,0];return{g:t,path:n,dot:r,ax:i[0],ay:i[1],az:i[2],shown:!1,hot:!1,sx:NaN,sy:NaN,dx:NaN,dy:NaN}}),ce=innerWidth,le=innerHeight,ue=!1,de=null,fe=null,pe=e.silo?.mode===`17`?`17`:`18`,me=new Float32Array(n),he=new Uint8Array(n),ge=!1,_e=0,ve=!0,ye=0,be=()=>{ce=innerWidth,le=innerHeight,a.setAttribute(`viewBox`,`0 0 ${ce} ${le}`),a.setAttribute(`width`,String(ce)),a.setAttribute(`height`,String(le)),ve=!0};addEventListener(`resize`,be),be(),g.addEventListener(`scroll`,()=>ve=!0,{passive:!0}),document.fonts?.ready?.then(()=>ve=!0);function xe(){ve=!1,ye=0;let e=g.getBoundingClientRect();if(ge=e.width>0&&e.height>0,ge){_e=e.right+2;for(let e=0;e<n;e++){let t=_[e];if(!t||t.hidden){he[e]=0;continue}let n=t.getBoundingClientRect();me[e]=(n.top+n.bottom)*.5,he[e]=+(n.height>0)}}}let Se=new U,Ce={x:0,y:0};function we(t,n,r){return Se.set(t,n,r).project(e.camera),Ce.x=Math.max(-1e4,Math.min(1e4,(Se.x*.5+.5)*ce)),Ce.y=Math.max(-1e4,Math.min(1e4,(.5-Se.y*.5)*le)),Se.z>-1&&Se.z<1?Se.x>=-1&&Se.x<=1&&Se.y>=-1&&Se.y<=1?2:1:0}function Te(e){for(let t=0;t<E.length;t++){let n=E[t],r=e&&we(n.x,n.y,n.z)===2;if(r){let e=Math.round(Ce.x),t=Math.round(Ce.y);(e!==n.sx||t!==n.sy)&&(n.sx=e,n.sy=t,n.el.style.transform=n.center?`translate(${e}px, ${t}px) translateX(-50%)`:`translate(${e}px, ${t}px)`)}r!==n.vis&&(n.vis=r,n.el.classList.toggle(`on`,r))}}function Ee(e,r){ye+=r,(ve||ye>1)&&xe();for(let r=0;r<n;r++){let n=se[r],i=!1,a=!1;if(ge&&he[r]){let o=t[r].id,s=we(n.ax,n.ay,n.az);if(i=o===fe?a=s>0:ue?a=o===de&&s>0:e&&s===2,i){let e=Math.round(_e),t=Math.round(me[r]),i=Math.round(Ce.x),a=Math.round(Ce.y);if(e!==n.sx||t!==n.sy||i!==n.dx||a!==n.dy){n.sx=e,n.sy=t,n.dx=i,n.dy=a;let r=Math.round(e+.75*(i-e));n.path.setAttribute(`d`,`M${e} ${t}L${r} ${t}L${i} ${a}`),n.dot.setAttribute(`cx`,String(i)),n.dot.setAttribute(`cy`,String(a))}}}i!==n.shown&&(n.shown=i,n.g.style.display=i?``:`none`),a!==n.hot&&(n.hot=a,n.g.classList.toggle(`hot`,a))}}let De=0,Oe=performance.now();function B(){De++;let t=performance.now(),n=t-Oe;if(!(n<500)){if(r.classList.contains(`stats`)){let t=e.renderer.info.render;x.textContent=`${Math.round(De*1e3/n)} fps`,S.textContent=`${(t.triangles/1e6).toFixed(2)}M tris`,C.textContent=`${((e.sceneTriangles||0)/1e6).toFixed(2)}M in scene`,w.textContent=`${t.calls} calls`}De=0,Oe=t}}let ke=e=>r.classList.toggle(`stats`,e),Ae=vp.slice();{let e=q(Ud(`did-you-know`));for(let t=Ae.length-1;t>0;t--){let n=Math.floor(e()*(t+1));[Ae[t],Ae[n]]=[Ae[n],Ae[t]]}}let je=-1,V=`hidden`,Me=0,Ne=0,Pe=()=>{Ae.length&&(je=(je+1)%Ae.length,A.textContent=Ae[je],A.classList.add(`show`),V=`in`,Me=0)};function Fe(e){if(ue||Ie){V!==`hidden`&&(A.classList.remove(`show`),V=`hidden`),Me=0;return}Me+=e,V===`hidden`?Me>=Nv+Ne&&(Ne=0,Pe()):V===`in`?Me>=jv&&(A.classList.remove(`show`),V=`out`,Me=0):Me>=Mv&&Pe()}let Ie=!1,Le=0,Re=0,ze=()=>{let[e,t]=Iv[pe]||Iv[18];M.textContent=e,N.textContent=t};function Be(e=4e3){ze(),clearTimeout(Le),j.offsetWidth,j.classList.add(`show`),Ie=!0,Re=performance.now(),Le=setTimeout(Ve,e)}function Ve(){clearTimeout(Le),Ie&&(Ie=!1,j.classList.remove(`show`))}let He=()=>{Ie&&performance.now()-Re>300&&Ve()};for(let e of[`pointerdown`,`wheel`,`keydown`])addEventListener(e,He,{capture:!0,passive:!0});function Ue(e,n,r){if(n==null||r==null){let i=t.filter(e=>Tv(e,pe));n??=i.indexOf(e),r??=i.length}let i=e.card||{};I.textContent=i.level??`LEVEL ${e.level} · ${gp[e.zone]||``}`.toUpperCase(),L.textContent=i.title??e.name,R.textContent=i.sub??``,R.hidden=!i.sub,ee.textContent=i.body??``,ee.hidden=!i.body,te.replaceChildren(...(i.facts||[]).map(e=>Lv(`li`,null,e))),te.hidden=!(i.facts&&i.facts.length),ne.textContent=i.foot??``,ne.hidden=!i.foot,z.textContent=`${n+1} / ${r}`,P.scrollTop=0,P.inert=!1,P.setAttribute(`aria-hidden`,`false`),P.classList.add(`show`),ue=!0}function We(){P.contains(document.activeElement)&&document.activeElement.blur(),P.classList.remove(`show`),P.setAttribute(`aria-hidden`,`true`),P.inert=!0,ue=!1}let Ge=0;function Ke(e,t=2600){oe.textContent=e,oe.classList.add(`show`),clearTimeout(Ge),Ge=setTimeout(()=>oe.classList.remove(`show`),t)}let qe=!1,Je=null,Ye=null,Xe=0,Ze=0,Qe=NaN,$e=NaN;function et(e,t,n,r=``){(e!==Je||r!==Ye)&&(Je=e,Ye=r,O.textContent=e,k.textContent=r,k.hidden=!r,Xe=D.offsetWidth,Ze=D.offsetHeight,Qe=NaN);let i=t+14,a=n+18;i+Xe>ce-8&&(i=t-Xe-12),a+Ze>le-8&&(a=n-Ze-10),i=Math.round(Math.max(4,i)),a=Math.round(Math.max(4,a)),(i!==Qe||a!==$e)&&(Qe=i,$e=a,D.style.transform=`translate(${i}px, ${a}px)`),qe||(qe=!0,D.classList.add(`show`))}function tt(){qe&&(qe=!1,D.classList.remove(`show`))}function nt(e){let t=g.getBoundingClientRect();if(!t.height)return;let n=e.getBoundingClientRect();n.top<t.top+6?g.scrollTop-=t.top+6-n.top:n.bottom>t.bottom-6&&(g.scrollTop+=n.bottom-(t.bottom-6))}function rt(e){if(e===de)return;let t=v.get(de);t&&(t.classList.remove(`active`),t.removeAttribute(`aria-current`)),de=e??null;let n=v.get(de);n&&(n.classList.add(`active`),n.setAttribute(`aria-current`,`true`),nt(n))}function it(e){e??=null,e!==fe&&(v.get(fe)?.classList.remove(`hover`),fe=e,v.get(fe)?.classList.add(`hover`))}function at(e){for(let t of Av){let n=t===e;h[t].classList.toggle(`active`,n),h[t].setAttribute(`aria-pressed`,String(n))}}function ot(e){let n=pe;pe=e===`17`?`17`:`18`,pe!==n&&(A.classList.remove(`show`),V=`hidden`,Me=0,Ne=Pv);for(let e of[`18`,`17`])p[e].classList.toggle(`active`,e===pe),p[e].setAttribute(`aria-pressed`,String(e===pe));r.classList.toggle(`silo17`,pe===`17`);for(let e of E)e.b.textContent=pe===`17`&&e.def.s17||e.def.title;t.forEach((e,t)=>{e.only&&_[t]&&(_[t].hidden=!Tv(e,pe))}),de&&!Tv(t.find(e=>e.id===de)||{},pe)&&rt(null),fe&&!Tv(t.find(e=>e.id===fe)||{},pe)&&it(null),ve=!0,ze()}ot(pe);function st(t){let n=e.camera.position.distanceTo(e.controls.target)>Ov&&!ue;Te(n),Ee(n,t),B(),Fe(t)}return Be(6500),{update:st,showCard:Ue,hideCard:We,setActive:rt,setHover:it,setView:at,setMode:ot,toast:Ke,chip:et,hideChip:tt,showIntro:Be,hideIntro:Ve,toggleStats:ke,on:s,onLegend:e=>s(`legend`,e),legendEl:g,cardEl:P,get cardOpen(){return ue},get mode(){return pe}}}var Bv=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,Vv=class{constructor(){this.active=!1,this.t=0,this.duration=1,this.arc=0,this.ease=Bv,this.onDone=null,this.p0=new U,this.p1=new U,this.q0=new U,this.q1=new U,this.d0=new U,this.d1=new U,this._d=new U}start(e,t,n,r,{duration:i=1.6,arc:a=0,ease:o=Bv,onDone:s=null}={}){return this.p0.copy(e),this.q0.copy(t),this.p1.copy(n),this.q1.copy(r),this.d0.subVectors(this.p0,this.q0),this.d1.subVectors(this.p1,this.q1),this.d0.lengthSq()<1e-9&&this.d0.set(0,0,1),this.d1.lengthSq()<1e-9&&this.d1.copy(this.d0),this.d0.normalize(),this.d1.normalize(),this.duration=Math.max(.01,i),this.arc=Math.max(0,a),this.ease=o,this.onDone=s,this.t=0,this.active=!0,this}step(e,t,n){if(!this.active)return!1;this.t+=e;let r=Math.min(1,this.t/this.duration),i=this.ease(r);if(t.lerpVectors(this.p0,this.p1,i),n.lerpVectors(this.q0,this.q1,i),this.arc>0){let e=this._d.lerpVectors(this.d0,this.d1,i);e.lengthSq()<1e-6&&e.copy(this.d0),t.addScaledVector(e.normalize(),Math.sin(Math.PI*i)*this.arc)}if(r>=1){t.copy(this.p1),n.copy(this.q1),this.active=!1;let e=this.onDone;this.onDone=null,e&&e()}return!0}cancel(){this.active=!1,this.onDone=null}get progress(){return this.active?Math.min(1,this.t/this.duration):1}},Hv=5,Uv=400,Wv=Math.PI/180,Gv={18:`Silo 18 — lights on, pumps running`,17:`Silo 17 — dark, and the deep levels are under water`},Kv=e=>!!e&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.tagName===`SELECT`||e.isContentEditable),qv=(e,t)=>Array.isArray(t)?e.fromArray(t):e.copy(t);function Jv(e){let t=new On;t.name=`pick`;let n=new pi({visible:!1,side:2}),r=new $i(1,1,1),i=new Do(1,16,12),a=(r,i,a,o,s,c,l,u,d)=>{let f=new G(i,n);f.name=`pick/${e[r].id}`,f.position.set(a,o,s),f.scale.set(c,l,u),f.userData={index:r,center:new U(a,o,s),radius:d},f.updateMatrix(),f.matrixAutoUpdate=!1,t.add(f)},o=(e,[t,n,r],o)=>a(e,i,t,n,r,o,o,o,o),s=(e,[t,n,i],[o,s,c])=>a(e,r,t,n,i,o,s,c,.5*Math.hypot(o,s,c));return e.forEach((e,t)=>{if(e.id===`surface`)o(t,[-24,2,-2.5],10);else if(e.kind===`room`){if(e.pickBox)s(t,e.pickBox.center,e.pickBox.size);else{let n=e.side===`west`?-1:1,r=37.5*Math.sin((e.span||45)*Wv);s(t,[n*47,Y(e.level)+3.5,-r/2],[56,7,r])}}else o(t,e.pick?.sphere||e.anchor,e.pick?.r||14)}),t.updateMatrixWorld(!0),t}function Yv(e,t){let{camera:n,controls:r,scene:i}=e,a=e.renderer.domElement,o=e.places||hp,s=new Map(o.map((e,t)=>[e.id,t])),c=null,l=()=>(e.silo?.mode??t.mode)===`17`?`17`:`18`,u=e=>Tv(e,l()),d=()=>o.filter(u),f=new Vv,p=new U,m=new U;function h(e,t,{duration:i,arc:a,onDone:o}={}){qv(p,e),qv(m,t);let s=Math.max(n.position.distanceTo(p),r.target.distanceTo(m));if(s<.001){f.cancel(),o?.();return}let c=i??1.2+1.4*Math.min(1,Math.sqrt(s/1100));if(a==null){let e=Math.max(n.position.distanceTo(r.target),p.distanceTo(m));a=.35*s*Zd(80,600,s)*Ot.clamp(1-e/(.8*s),0,1)}f.start(n.position,r.target,p,m,{duration:c,arc:a,onDone:o})}r.addEventListener(`start`,()=>f.cancel());function g(e){let n=s.get(e);if(n===void 0)return;let r=o[n];if(!u(r))return;c=r.id,h(r.cam.position,r.cam.target);let i=d();t.showCard(r,i.indexOf(r),i.length),t.setActive(r.id),t.setView(null),t.hideIntro()}function _(e){let n=pp[e];n&&(c=null,h(n.position,n.target),t.hideCard(),t.setActive(null),t.setView(e))}let v=()=>_(`silo`);function y(e){let t=d(),n=t.length;if(!n)return;let r=c==null?-1:t.findIndex(e=>e.id===c);g(t[r<0?e>0?0:n-1:(r+e+n)%n].id)}let b=()=>y(1),x=()=>y(-1);function S(n){(n===`17`||n===`18`)&&(e.silo?.mode??t.mode)!==n&&(e.silo?.set(n),t.setMode(n),te(-1),R=I,c!=null&&!u(o[s.get(c)])&&v(),t.toast(Gv[n]),t.showIntro(4e3))}let C=Jv(o);i.add(C);let w=new Ys,T=new H,E=[],D=0,O=0,k=1,A=1,j=()=>{let e=a.getBoundingClientRect();D=e.left,O=e.top,k=e.width||1,A=e.height||1};j(),addEventListener(`resize`,j);function M(e,t){T.set((e-D)/k*2-1,-((t-O)/A)*2+1),n.updateMatrixWorld(),w.setFromCamera(T,n),E.length=0,w.intersectObjects(C.children,!1,E);let r=-1,i=1/0;for(let e=0;e<E.length;e++){let t=E[e].object.userData;if(!u(o[t.index]))continue;let n=w.ray.distanceToPoint(t.center)/t.radius;n<i&&(i=n,r=t.index)}return E.length=0,r}let N=-1,P=0,F=0,I=!1,L=!1,R=!1,ee=o.map(e=>e.level>0?`L${e.level}`:``);function te(e){if(e<0){if(N<0)return;N=-1,t.hideChip(),t.setHover(null),a.style.cursor=``;return}let n=o[e];e!==N&&(N=e,t.setHover(n.id),a.style.cursor=`pointer`),t.chip(n.name,P,F,ee[e])}a.addEventListener(`pointermove`,e=>{e.pointerType!==`touch`&&(P=e.clientX,F=e.clientY,I=!0,L=e.buttons!==0,R=!0)}),a.addEventListener(`pointerleave`,e=>{e.pointerType!==`touch`&&(I=!1,R=!1,te(-1))}),a.addEventListener(`wheel`,()=>R=I,{passive:!0}),r.addEventListener(`change`,()=>{I&&(R=!0)});let ne=new Set,re=-1,ie=0,z=0,ae=0;a.addEventListener(`pointerdown`,e=>{if(e.isPrimary&&ne.clear(),ne.add(e.pointerId),e.pointerType!==`touch`&&(L=!0),te(-1),e.button!==0||ne.size>1){re=-1;return}re=e.pointerId,ie=e.clientX,z=e.clientY,ae=performance.now()});let oe=e=>{ne.delete(e.pointerId),e.pointerType!==`touch`&&(L=e.buttons!==0,R=I)};a.addEventListener(`pointerup`,e=>{if(oe(e),e.pointerId!==re||e.button!==0||(re=-1,Math.hypot(e.clientX-ie,e.clientY-z)>Hv||performance.now()-ae>Uv))return;let t=M(e.clientX,e.clientY);t>=0&&g(o[t].id)}),a.addEventListener(`pointercancel`,e=>{oe(e),e.pointerId===re&&(re=-1)}),addEventListener(`keydown`,e=>{e.defaultPrevented||e.repeat||e.ctrlKey||e.metaKey||e.altKey||Kv(e.target)||Kv(document.activeElement)||(e.key===`ArrowRight`?(e.preventDefault(),b()):e.key===`ArrowLeft`?(e.preventDefault(),x()):e.key===`Escape`?v():(e.code===`Backquote`||e.key==="`")&&t.toggleStats())}),t.onLegend(g),t.on(`legend-hover`,e=>t.setHover(e)),t.on(`prev`,x),t.on(`next`,b),t.on(`close`,v),t.on(`mode`,S),t.on(`view`,_),t.setMode(l()),t.setView(null);function se(e){f.active&&(f.step(e,n.position,r.target),r.update()),R&&I&&!L&&(f.active?te(-1):(R=!1,te(M(P,F))))}return{go:g,view:_,home:v,next:b,prev:x,fly:h,setMode:S,update:se,pickGroup:C,get current(){return c},get flying(){return f.active}}}var Xv=()=>new Promise(e=>requestAnimationFrame(()=>setTimeout(e,0))),Zv={el:document.getElementById(`loader`),fill:document.getElementById(`loader-fill`),text:document.getElementById(`loader-text`),set(e,t){this.fill.style.width=`${Math.round(e*100)}%`,t&&(this.text.textContent=t)},done(){this.set(1,`Opening the doors…`),this.el.classList.add(`done`),setTimeout(()=>this.el.remove(),900)}};function Qv(){let e=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&Math.min(innerWidth,innerHeight)<820,t=Math.min(window.devicePixelRatio||1,e?1.5:2);return document.documentElement.classList.toggle(`mobile`,e),{mobile:e,dpr:t,shadows:!0,shadowMapSize:e?2048:4096,bloom:!0,msaa:t>=2?0:4}}function $v(e){let t=0;return e.traverseVisible(e=>{if(!e.isMesh||!e.geometry)return;let n=e.geometry,r=n.index?n.index.count/3:n.attributes.position.count/3;t+=r*(e.isInstancedMesh?e.count:n.isInstancedBufferGeometry?n.instanceCount:1)}),t}async function ey(){let e=Qv(),t=document.getElementById(`c`),n=new yd({canvas:t,antialias:!1,powerPreference:`high-performance`,stencil:!1});n.setPixelRatio(e.dpr),n.setSize(innerWidth,innerHeight,!1),n.info.autoReset=!1,$d(Math.min(8,n.capabilities.getMaxAnisotropy()));let r=new Ln,i=new Cs(48,innerWidth/innerHeight,1,14e3);i.position.set(...pp.silo.position);let a=new Ad(i,t);a.target.set(...pp.silo.target),a.enableDamping=!0,a.dampingFactor=.08,a.screenSpacePanning=!0,a.minDistance=2,a.maxDistance=4e3,a.zoomSpeed=1.2,a.minPolarAngle=.05,a.maxPolarAngle=Math.PI-.05,a.minAzimuthAngle=-1.5393804,a.maxAzimuthAngle=1.5393804,a.update(),Zv.set(.04,`Pouring concrete…`),await Xv(),Df();let o=Qf({renderer:n,scene:r,camera:i,perf:e}),s=o.pool,c=new On;c.name=`world`;let l=new On;l.name=`dynamic`,r.add(c,l);let u=[],d=e=>{e&&(e.dyn&&l.add(e.dyn),e.update&&u.push(e.update))},f=[[.1,`Shaping the surface…`,()=>{c.add(Nh({pool:s}));let e=Ph();l.add(e.group),u.push(e.update)}],[.3,`Casting 144 floors…`,()=>c.add(im({pool:s}))],[.46,`Building the stair…`,()=>{c.add($m({pool:s}));let e=gh();l.add(e.group),u.push(e.update)}],[.58,`Furnishing Up Top…`,()=>c.add(n_({pool:s}))],[.68,`Planting the Mids…`,()=>{let e=A_({pool:s});c.add(e.group),d(e)}],[.78,`Wiring Down Deep…`,()=>{p.deep=rv({pool:s}),c.add(p.deep.group),d(p.deep)}],[.86,`Flooding the neighbour…`,()=>{p.silo17=Zh({pool:s}),c.add(p.silo17.group),d(p.silo17)}]],p={renderer:n,scene:r,camera:i,controls:a,env:o,perf:e,world:c,dynamic:l,updaters:u,places:Ev(hp)};window.app=p;for(let[e,t,n]of f)Zv.set(e,t),await Xv(),await n();let m=t_({scene:r,camera:i,controls:a,renderer:n});l.add(m.group),u.push(m.update),p.storm=m;let h=jg(r);u.push(e=>h.update(e)),p.silo={mode:`18`,set(e){if(e===this.mode)return;this.mode=e;let t=e===`17`;p.silo17?.setActive(t),p.deep?.setPower(!t),h.set(t),document.documentElement.classList.toggle(`silo17`,t),p.sceneTriangles=$v(r),n.shadowMap.needsUpdate=!0}};let g=()=>{i.aspect=innerWidth/innerHeight,i.updateProjectionMatrix(),n.setSize(innerWidth,innerHeight,!1),o.resize(innerWidth,innerHeight,e.dpr)};addEventListener(`resize`,g),g(),Zv.set(.93,`Compiling shaders…`),await Xv();try{await n.compileAsync(r,i)}catch{}n.shadowMap.needsUpdate=!0,p.sceneTriangles=$v(r);let _=zv(p),v=Yv(p,_);p.ui=_,p.tour=v;let y=new Ps;y.connect(document);let b=0;n.setAnimationLoop(()=>{y.update();let e=Math.min(.1,y.getDelta()),t=y.getElapsed();n.info.reset(),v.update(e),a.update();let r=i.position.distanceTo(a.target),s=Ot.clamp(r*.0042,.05,6);Math.abs(s-i.near)/i.near>.05&&(i.near=s,i.updateProjectionMatrix());for(let n of u)n(e,t);let c=v.flying||Math.abs(r-b)>.001;b=r,o.update(a.target,r,e,c),o.composer.render(e),_.update(e)}),Zv.done(),_.showIntro?.(6500)}ey().catch(e=>{console.error(e);let t=document.getElementById(`loader-text`);t&&(t.textContent=`Something went wrong while building the silo — see the console.`)});