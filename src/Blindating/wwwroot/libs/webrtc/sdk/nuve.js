/*
 * Intel WebRTC SDK version 3.0.0
 * Copyright (c) 2016 Intel <http://webrtc.intel.com>
 * Homepage: http://webrtc.intel.com
 */


var Url=require("url"),spawn=require("child_process").spawn,fs=require("fs"),XMLHttpRequest=function(){var a,b,c,d=this,e=require("http"),f=require("https"),g={};"object"==typeof arguments[0]&&null!==arguments[0]&&"boolean"==typeof arguments[0].rejectUnauthorized&&(c=arguments[0].rejectUnauthorized);var h={"User-Agent":"node.js",Accept:"*/*"},i=!1,j=!1,k=h;this.UNSENT=0,this.OPENED=1,this.HEADERS_RECEIVED=2,this.LOADING=3,this.DONE=4,this.readyState=this.UNSENT,this.onreadystatechange=null,this.responseText="",this.responseXML="",this.status=null,this.statusText=null,this.open=function(a,b,c,d,e){g={method:a,url:b.toString(),async:"boolean"!=typeof c?!0:c,user:d||null,password:e||null},this.abort(),m(this.OPENED)},this.setRequestHeader=function(a,b){if(this.readyState!=this.OPENED)throw"INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN";if(i)throw"INVALID_STATE_ERR: send flag is true";k[a]=b},this.getResponseHeader=function(a){return this.readyState>this.OPENED&&b.headers[a]&&!j?b.headers[a]:null},this.getAllResponseHeaders=function(){if(this.readyState<this.HEADERS_RECEIVED||j)return"";var a="";for(var c in b.headers)a+=c+": "+b.headers[c]+"\r\n";return a.substr(0,a.length-2)},this.send=function(h){if(this.readyState!=this.OPENED)throw"INVALID_STATE_ERR: connection must be opened before send() is called";if(i)throw"INVALID_STATE_ERR: send has already been called";var l=!1,n=Url.parse(g.url);switch(n.protocol){case"https:":l=!0;case"http:":var o=n.hostname;break;case void 0:case"":var o="localhost";break;default:throw"Protocol not supported."}var p=n.port||(l?443:80),q=n.pathname+(n.search?n.search:"");if(this.setRequestHeader("Host",o),g.user){"undefined"==typeof g.password&&(g.password="");var r=new Buffer(g.user+":"+g.password);k.Authorization="Basic "+r.toString("base64")}"GET"==g.method||"HEAD"==g.method?h=null:h&&(this.setRequestHeader("Content-Length",Buffer.byteLength(h)),k["Content-Type"]||this.setRequestHeader("Content-Type","text/plain;charset=UTF-8"));var s={host:o,port:p,path:q,method:g.method,headers:k};if(l&&void 0!==c&&(s.rejectUnauthorized=c),j=!1,!g.hasOwnProperty("async")||g.async){var t=l?f.request:e.request;i=!0,"function"==typeof d.onreadystatechange&&d.onreadystatechange(),a=t(s,function(a){b=a,b.setEncoding("utf8"),m(d.HEADERS_RECEIVED),d.status=b.statusCode,b.on("data",function(a){a&&(d.responseText+=a),i&&m(d.LOADING)}),b.on("end",function(){i&&(m(d.DONE),i=!1)}),b.on("error",function(a){d.handleError(a)})}).on("error",function(a){d.handleError(a)}),h&&a.write(h),a.end()}else{var u=".node-xmlhttprequest-sync-"+process.pid;fs.writeFileSync(u,"","utf8");var v="var http = require('http'), https = require('https'), fs = require('fs');var doRequest = http"+(l?"s":"")+".request;var options = "+JSON.stringify(s)+";var responseText = '';var req = doRequest(options, function(response) {response.setEncoding('utf8');response.on('data', function(chunk) {responseText += chunk;});response.on('end', function() {fs.writeFileSync('"+u+"', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');});response.on('error', function(error) {fs.writeFileSync('"+u+"', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');});}).on('error', function(error) {fs.writeFileSync('"+u+"', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');});"+(h?"req.write('"+h.replace(/'/g,"\\'")+"');":"")+"req.end();";for(syncProc=spawn(process.argv[0],["-e",v]);""==(d.responseText=fs.readFileSync(u,"utf8")););if(syncProc.stdin.end(),fs.unlinkSync(u),d.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)){var w=d.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/,"");d.handleError(w)}else d.status=d.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/,"$1"),d.responseText=d.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/,"$1"),m(d.DONE)}},this.handleError=function(a){this.status=503,this.statusText=a,this.responseText=a.stack,j=!0,m(this.DONE)},this.abort=function(){a&&(a.abort(),a=null),k=h,this.responseText="",this.responseXML="",j=!0,this.readyState===this.UNSENT||this.readyState===this.OPENED&&!i||this.readyState===this.DONE||(i=!1,m(this.DONE)),this.readyState=this.UNSENT};var l={};this.addEventListener=function(a,b){a in l||(l[a]=[]),l[a].push(b)};var m=function(a){if(d.readyState=a,"function"==typeof d.onreadystatechange&&d.onreadystatechange(),"readystatechange"in l)for(var b=l.readystatechange.length,c=0;b>c;c++)l.readystatechange[c].call(d)}},CryptoJS=CryptoJS||function(a,b){var c={},d=c.lib={},e=d.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;return b&&c.mixIn(b),c.$super=this,c},create:function(){var a=this.extend();return a.init.apply(a,arguments),a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),f=d.WordArray=e.extend({init:function(a,c){a=this.words=a||[],this.sigBytes=c!=b?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,a=a.sigBytes;if(this.clamp(),d%4)for(var e=0;a>e;e++)b[d+e>>>2]|=(c[e>>>2]>>>24-8*(e%4)&255)<<24-8*((d+e)%4);else if(65535<c.length)for(e=0;a>e;e+=4)b[d+e>>>2]=c[e>>>2];else b.push.apply(b,c);return this.sigBytes+=a,this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<32-8*(c%4),b.length=a.ceil(c/4)},clone:function(){var a=e.clone.call(this);return a.words=this.words.slice(0),a},random:function(b){for(var c=[],d=0;b>d;d+=4)c.push(4294967296*a.random()|0);return f.create(c,b)}}),g=c.enc={},h=g.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;a>d;d++){var e=b[d>>>2]>>>24-8*(d%4)&255;c.push((e>>>4).toString(16)),c.push((15&e).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return f.create(c,b/2)}},i=g.Latin1={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;a>d;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;b>d;d++)c[d>>>2]|=(255&a.charCodeAt(d))<<24-8*(d%4);return f.create(c,b)}},j=g.Utf8={stringify:function(a){try{return decodeURIComponent(escape(i.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data")}},parse:function(a){return i.parse(unescape(encodeURIComponent(a)))}},k=d.BufferedBlockAlgorithm=e.extend({reset:function(){this._data=f.create(),this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a)),this._data.concat(a),this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,e=c.sigBytes,g=this.blockSize,h=e/(4*g),h=b?a.ceil(h):a.max((0|h)-this._minBufferSize,0),b=h*g,e=a.min(4*b,e);if(b){for(var i=0;b>i;i+=g)this._doProcessBlock(d,i);i=d.splice(0,b),c.sigBytes-=e}return f.create(i,e)},clone:function(){var a=e.clone.call(this);return a._data=this._data.clone(),a},_minBufferSize:0});d.Hasher=k.extend({init:function(){this.reset()},reset:function(){k.reset.call(this),this._doReset()},update:function(a){return this._append(a),this._process(),this},finalize:function(a){return a&&this._append(a),this._doFinalize(),this._hash},clone:function(){var a=k.clone.call(this);return a._hash=this._hash.clone(),a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return l.HMAC.create(a,c).finalize(b)}}});var l=c.algo={};return c}(Math);!function(a){var b=CryptoJS,c=b.lib,d=c.WordArray,c=c.Hasher,e=b.algo,f=[],g=[];!function(){function b(b){for(var c=a.sqrt(b),d=2;c>=d;d++)if(!(b%d))return!1;return!0}function c(a){return 4294967296*(a-(0|a))|0}for(var d=2,e=0;64>e;)b(d)&&(8>e&&(f[e]=c(a.pow(d,.5))),g[e]=c(a.pow(d,1/3)),e++),d++}();var h=[],e=e.SHA256=c.extend({_doReset:function(){this._hash=d.create(f.slice(0))},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],f=c[2],i=c[3],j=c[4],k=c[5],l=c[6],m=c[7],n=0;64>n;n++){if(16>n)h[n]=0|a[b+n];else{var o=h[n-15],p=h[n-2];h[n]=((o<<25|o>>>7)^(o<<14|o>>>18)^o>>>3)+h[n-7]+((p<<15|p>>>17)^(p<<13|p>>>19)^p>>>10)+h[n-16]}o=m+((j<<26|j>>>6)^(j<<21|j>>>11)^(j<<7|j>>>25))+(j&k^~j&l)+g[n]+h[n],p=((d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22))+(d&e^d&f^e&f),m=l,l=k,k=j,j=i+o|0,i=f,f=e,e=d,d=o+p|0}c[0]=c[0]+d|0,c[1]=c[1]+e|0,c[2]=c[2]+f|0,c[3]=c[3]+i|0,c[4]=c[4]+j|0,c[5]=c[5]+k|0,c[6]=c[6]+l|0,c[7]=c[7]+m|0},_doFinalize:function(){var a=this._data,b=a.words,c=8*this._nDataBytes,d=8*a.sigBytes;b[d>>>5]|=128<<24-d%32,b[(d+64>>>9<<4)+15]=c,a.sigBytes=4*b.length,this._process()}});b.SHA256=c._createHelper(e),b.HmacSHA256=c._createHmacHelper(e)}(Math),function(){var a=CryptoJS,b=a.enc.Utf8;a.algo.HMAC=a.lib.Base.extend({init:function(a,c){a=this._hasher=a.create(),"string"==typeof c&&(c=b.parse(c));var d=a.blockSize,e=4*d;c.sigBytes>e&&(c=a.finalize(c));for(var f=this._oKey=c.clone(),g=this._iKey=c.clone(),h=f.words,i=g.words,j=0;d>j;j++)h[j]^=1549556828,i[j]^=909522486;f.sigBytes=g.sigBytes=e,this.reset()},reset:function(){var a=this._hasher;a.reset(),a.update(this._iKey)},update:function(a){return this._hasher.update(a),this},finalize:function(a){var b=this._hasher,a=b.finalize(a);return b.reset(),b.finalize(this._oKey.clone().concat(a))}})}();var N=N||{};N.authors=["aalonsog@dit.upm.es","prodriguez@dit.upm.es","jcervino@dit.upm.es"],N.version=.1;var N=N||{};N.Base64=function(a){"use strict";var b,c,d,e,f,g,h,i,j,k,l,m;for(b=-1,c=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"],d=[],g=0;g<c.length;g+=1)d[c[g]]=g;return h=function(a){e=a,f=0},i=function(){var a;return e?f>=e.length?b:(a=255&e.charCodeAt(f),f+=1,a):b},j=function(a){var d,e,f;for(h(a),d="",e=new Array(3),f=!1;!f&&(e[0]=i())!==b;)e[1]=i(),e[2]=i(),d+=c[e[0]>>2],e[1]!==b?(d+=c[e[0]<<4&48|e[1]>>4],e[2]!==b?(d+=c[e[1]<<2&60|e[2]>>6],d+=c[63&e[2]]):(d+=c[e[1]<<2&60],d+="=",f=!0)):(d+=c[e[0]<<4&48],d+="=",d+="=",f=!0);return d},k=function(){if(!e)return b;for(;;){if(f>=e.length)return b;var a=e.charAt(f);if(f+=1,d[a])return d[a];if("A"===a)return 0}},l=function(a){return a=a.toString(16),1===a.length&&(a="0"+a),a="%"+a,unescape(a)},m=function(a){var c,d,e;for(h(a),c="",d=new Array(4),e=!1;!e&&(d[0]=k())!==b&&(d[1]=k())!==b;)d[2]=k(),d[3]=k(),c+=l(d[0]<<2&255|d[1]>>4),d[2]!==b?(c+=l(d[1]<<4&255|d[2]>>2),d[3]!==b?c+=l(d[2]<<6&255|d[3]):e=!0):e=!0;return c},{encodeBase64:j,decodeBase64:m}}(N);var N=N||{};N.API=function(a){"use strict";function b(b){return"boolean"==typeof b&&(a.API.params.rejectUnauthorizedCert=b),a.API.params.rejectUnauthorizedCert}function c(a){return new Buffer(a,"utf8").toString("base64")}var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t;return q={service:void 0,key:void 0,url:void 0,rejectUnauthorizedCert:void 0},t=function(b,c,d){a.API.params.service=b,a.API.params.key=c,a.API.params.url=d},d=function(a,b,c,d,e){d||(d={}),r(function(a){var c=JSON.parse(a);b(c)},c,"POST",{name:a,options:d},"rooms",e)},e=function(a,b,c){r(a,b,"GET",void 0,"rooms",c)},f=function(a,b,c,d){r(b,c,"GET",void 0,"rooms/"+a,d)},g=function(a,b,c,d){r(b,c,"DELETE",void 0,"rooms/"+a,d)},h=function(a,b,c,d,e){r(c,d,"PUT",b||{},"rooms/"+a,e)},i=function(a,b,c,d,e,f){r(d,e,"POST",void 0,"rooms/"+a+"/tokens",f,b,c)},j=function(a,b,c,d,e){r(c,d,"POST",{name:a,key:b},"services/",e)},k=function(a,b,c){r(a,b,"GET",void 0,"services/",c)},l=function(a,b,c,d){r(b,c,"GET",void 0,"services/"+a,d)},m=function(a,b,c,d){r(b,c,"DELETE",void 0,"services/"+a,d)},n=function(a,b,c,d){r(b,c,"GET",void 0,"rooms/"+a+"/users/",d)},o=function(a,b,c,d,e){r(c,d,"GET",void 0,"rooms/"+a+"/users/"+b,e)},p=function(a,b,c,d,e){r(c,d,"DELETE",void 0,"rooms/"+a+"/users/"+b,e)},r=function(b,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r;return void 0===h?(k=a.API.params.service,l=a.API.params.key,g=a.API.params.url+g):(k=h.service,l=h.key,g=h.url+g),""===k||""===l?void("function"==typeof d&&d(401,"ServiceID and Key are required!!")):(m=(new Date).getTime(),n=require("crypto").randomBytes(8).toString("hex"),o=m+","+n,p="MAuth realm=http://marte3.dit.upm.es,mauth_signature_method=HMAC_SHA256",i&&j&&(i=c(i),p+=",mauth_username=",p+=i,p+=",mauth_role=",p+=j,o+=","+i+","+j),q=s(o,l),p+=",mauth_serviceid=",p+=k,p+=",mauth_cnonce=",p+=n,p+=",mauth_timestamp=",p+=m,p+=",mauth_signature=",p+=q,r=new XMLHttpRequest({rejectUnauthorized:a.API.params.rejectUnauthorizedCert}),r.onreadystatechange=function(){if(4===r.readyState)switch(r.status){case 100:case 200:case 201:case 202:case 203:case 204:case 205:"function"==typeof b&&b(r.responseText);break;default:"function"==typeof d&&d(r.status,r.responseText)}},r.open(e,g,!0),r.setRequestHeader("Authorization",p),void(void 0!==f?(r.setRequestHeader("Content-Type","application/json"),r.send(JSON.stringify(f))):r.send()))},s=function(b,c){var d,e,f;return d=CryptoJS.HmacSHA256(b,c),e=d.toString(CryptoJS.enc.Hex),f=a.Base64.encodeBase64(e)},{params:q,rejectUnauthorizedCert:b,init:t,createRoom:d,getRooms:e,getRoom:f,deleteRoom:g,updateRoom:h,createToken:i,createService:j,getServices:k,getService:l,deleteService:m,getUsers:n,getUser:o,deleteUser:p}}(N),module.exports=N;