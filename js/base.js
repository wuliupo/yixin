(function($){
'use strict';
function safe_add(x,y){
var lsw=(x&0xFFFF)+(y&0xFFFF),
msw=(x>>16)+(y>>16)+(lsw>>16);
return(msw<<16)|(lsw&0xFFFF);
}
function bit_rol(num,cnt){
return(num<<cnt)|(num>>>(32-cnt));
}
function md5_cmn(q,a,b,x,s,t){
return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);
}
function md5_ff(a,b,c,d,x,s,t){
return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);
}
function md5_gg(a,b,c,d,x,s,t){
return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);
}
function md5_hh(a,b,c,d,x,s,t){
return md5_cmn(b^c^d,a,b,x,s,t);
}
function md5_ii(a,b,c,d,x,s,t){
return md5_cmn(c^(b|(~d)),a,b,x,s,t);
}
function binl_md5(x,len){
x[len>>5]|=0x80<<((len)%32);
x[(((len+64)>>>9)<<4)+14]=len;
var i,olda,oldb,oldc,oldd,
a=1732584193,
b=-271733879,
c=-1732584194,
d=271733878;
for(i=0;i<x.length;i+=16){
olda=a;
oldb=b;
oldc=c;
oldd=d;
a=md5_ff(a,b,c,d,x[i],7,-680876936);
d=md5_ff(d,a,b,c,x[i+1],12,-389564586);
c=md5_ff(c,d,a,b,x[i+2],17,606105819);
b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);
a=md5_ff(a,b,c,d,x[i+4],7,-176418897);
d=md5_ff(d,a,b,c,x[i+5],12,1200080426);
c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);
b=md5_ff(b,c,d,a,x[i+7],22,-45705983);
a=md5_ff(a,b,c,d,x[i+8],7,1770035416);
d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);
c=md5_ff(c,d,a,b,x[i+10],17,-42063);
b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);
a=md5_ff(a,b,c,d,x[i+12],7,1804603682);
d=md5_ff(d,a,b,c,x[i+13],12,-40341101);
c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);
b=md5_ff(b,c,d,a,x[i+15],22,1236535329);
a=md5_gg(a,b,c,d,x[i+1],5,-165796510);
d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);
c=md5_gg(c,d,a,b,x[i+11],14,643717713);
b=md5_gg(b,c,d,a,x[i],20,-373897302);
a=md5_gg(a,b,c,d,x[i+5],5,-701558691);
d=md5_gg(d,a,b,c,x[i+10],9,38016083);
c=md5_gg(c,d,a,b,x[i+15],14,-660478335);
b=md5_gg(b,c,d,a,x[i+4],20,-405537848);
a=md5_gg(a,b,c,d,x[i+9],5,568446438);
d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);
c=md5_gg(c,d,a,b,x[i+3],14,-187363961);
b=md5_gg(b,c,d,a,x[i+8],20,1163531501);
a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);
d=md5_gg(d,a,b,c,x[i+2],9,-51403784);
c=md5_gg(c,d,a,b,x[i+7],14,1735328473);
b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);
a=md5_hh(a,b,c,d,x[i+5],4,-378558);
d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);
c=md5_hh(c,d,a,b,x[i+11],16,1839030562);
b=md5_hh(b,c,d,a,x[i+14],23,-35309556);
a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);
d=md5_hh(d,a,b,c,x[i+4],11,1272893353);
c=md5_hh(c,d,a,b,x[i+7],16,-155497632);
b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);
a=md5_hh(a,b,c,d,x[i+13],4,681279174);
d=md5_hh(d,a,b,c,x[i],11,-358537222);
c=md5_hh(c,d,a,b,x[i+3],16,-722521979);
b=md5_hh(b,c,d,a,x[i+6],23,76029189);
a=md5_hh(a,b,c,d,x[i+9],4,-640364487);
d=md5_hh(d,a,b,c,x[i+12],11,-421815835);
c=md5_hh(c,d,a,b,x[i+15],16,530742520);
b=md5_hh(b,c,d,a,x[i+2],23,-995338651);
a=md5_ii(a,b,c,d,x[i],6,-198630844);
d=md5_ii(d,a,b,c,x[i+7],10,1126891415);
c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);
b=md5_ii(b,c,d,a,x[i+5],21,-57434055);
a=md5_ii(a,b,c,d,x[i+12],6,1700485571);
d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);
c=md5_ii(c,d,a,b,x[i+10],15,-1051523);
b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);
a=md5_ii(a,b,c,d,x[i+8],6,1873313359);
d=md5_ii(d,a,b,c,x[i+15],10,-30611744);
c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);
b=md5_ii(b,c,d,a,x[i+13],21,1309151649);
a=md5_ii(a,b,c,d,x[i+4],6,-145523070);
d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);
c=md5_ii(c,d,a,b,x[i+2],15,718787259);
b=md5_ii(b,c,d,a,x[i+9],21,-343485551);
a=safe_add(a,olda);
b=safe_add(b,oldb);
c=safe_add(c,oldc);
d=safe_add(d,oldd);
}
return[a,b,c,d];
}
function binl2rstr(input){
var i,
output='';
for(i=0;i<input.length*32;i+=8){
output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);
}
return output;
}
function rstr2binl(input){
var i,
output=[];
output[(input.length>>2)-1]=undefined;
for(i=0;i<output.length;i+=1){
output[i]=0;
}
for(i=0;i<input.length*8;i+=8){
output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);
}
return output;
}
function rstr_md5(s){
return binl2rstr(binl_md5(rstr2binl(s),s.length*8));
}
function rstr_hmac_md5(key,data){
var i,
bkey=rstr2binl(key),
ipad=[],
opad=[],
hash;
ipad[15]=opad[15]=undefined;
if(bkey.length>16){
bkey=binl_md5(bkey,key.length*8);
}
for(i=0;i<16;i+=1){
ipad[i]=bkey[i]^0x36363636;
opad[i]=bkey[i]^0x5C5C5C5C;
}
hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);
return binl2rstr(binl_md5(opad.concat(hash),512+128));
}
function rstr2hex(input){
var hex_tab='0123456789abcdef',
output='',
x,
i;
for(i=0;i<input.length;i+=1){
x=input.charCodeAt(i);
output+=hex_tab.charAt((x>>>4)&0x0F)+
hex_tab.charAt(x&0x0F);
}
return output;
}
function str2rstr_utf8(input){
return unescape(encodeURIComponent(input));
}
function raw_md5(s){
return rstr_md5(str2rstr_utf8(s));
}
function hex_md5(s){
return rstr2hex(raw_md5(s));
}
function raw_hmac_md5(k,d){
return rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d));
}
function hex_hmac_md5(k,d){
return rstr2hex(raw_hmac_md5(k,d));
}
$.md5=function(string,key,raw){
if(!key){
if(!raw){
return hex_md5(string);
}else{
return raw_md5(string);
}
}
if(!raw){
return hex_hmac_md5(key,string);
}else{
return raw_hmac_md5(key,string);
}
};
}(typeof jQuery==='function'?jQuery:this));
(function(factory){
if(typeof define==='function'&&define.amd){
define(['jquery'],factory);
}else{
factory(jQuery);
}
}(function($){
var pluses=/\+/g;
function encode(s){
return config.raw?s:encodeURIComponent(s);
}
function decode(s){
return config.raw?s:decodeURIComponent(s);
}
function stringifyCookieValue(value){
return encode(config.json?JSON.stringify(value):String(value));
}
function parseCookieValue(s){
if(s.indexOf('"')===0){
s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');
}
try{
s=decodeURIComponent(s.replace(pluses,' '));
}catch(e){
return;
}
try{
return config.json?JSON.parse(s):s;
}catch(e){}
}
function read(s,converter){
var value=config.raw?s:parseCookieValue(s);
return $.isFunction(converter)?converter(value):value;
}
var config=$.cookie=function(key,value,options){
if(value!==undefined&&!$.isFunction(value)){
options=$.extend({},config.defaults,options);
if(typeof options.expires==='number'){
var days=options.expires,t=options.expires=new Date();
t.setDate(t.getDate()+days);
}
return(document.cookie=[
encode(key),'=',stringifyCookieValue(value),
options.expires?'; expires='+options.expires.toUTCString():'',
options.path?'; path='+options.path:'',
options.domain?'; domain='+options.domain:'',
options.secure?'; secure':''
].join(''));
}
var result=key?undefined:{};
var cookies=document.cookie?document.cookie.split('; '):[];
for(var i=0,l=cookies.length;i<l;i++){
var parts=cookies[i].split('=');
var name=decode(parts.shift());
var cookie=parts.join('=');
if(key&&key===name){
result=read(cookie,value);
break;
}
if(!key&&(cookie=read(cookie))!==undefined){
result[name]=cookie;
}
}
return result;
};
config.defaults={};
$.removeCookie=function(key,options){
if($.cookie(key)!==undefined){
$.cookie(key,'',$.extend({},options,{expires:-1}));
return true;
}
return false;
};
}));

var JSON;
if(!JSON){
JSON={};
}
(function(){
'use strict';
function f(n){
return n<10?'0'+n:n;
}
if(typeof Date.prototype.toJSON!=='function'){
Date.prototype.toJSON=function(key){
return isFinite(this.valueOf())
?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z'
:null;
};
String.prototype.toJSON=
Number.prototype.toJSON=
Boolean.prototype.toJSON=function(key){
return this.valueOf();
};
}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
gap,
indent,
meta={
'\b':'\\b',
'\t':'\\t',
'\n':'\\n',
'\f':'\\f',
'\r':'\\r',
'"':'\\"',
'\\':'\\\\'
},
rep;
function quote(string){
escapable.lastIndex=0;
return escapable.test(string)?'"'+string.replace(escapable,function(a){
var c=meta[a];
return typeof c==='string'
?c
:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);
})+'"':'"'+string+'"';
}
function str(key,holder){
var i,
k,
v,
length,
mind=gap,
partial,
value=holder[key];
if(value&&typeof value==='object'&&
typeof value.toJSON==='function'){
value=value.toJSON(key);
}
if(typeof rep==='function'){
value=rep.call(holder,key,value);
}
switch(typeof value){
case'string':
return quote(value);
case'number':
return isFinite(value)?String(value):'null';
case'boolean':
case'null':
return String(value);
case'object':
if(!value){
return'null';
}
gap+=indent;
partial=[];
if(Object.prototype.toString.apply(value)==='[object Array]'){
length=value.length;
for(i=0;i<length;i+=1){
partial[i]=str(i,value)||'null';
}
v=partial.length===0
?'[]'
:gap
?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']'
:'['+partial.join(',')+']';
gap=mind;
return v;
}
if(rep&&typeof rep==='object'){
length=rep.length;
for(i=0;i<length;i+=1){
if(typeof rep[i]==='string'){
k=rep[i];
v=str(k,value);
if(v){
partial.push(quote(k)+(gap?': ':':')+v);
}
}
}
}else{
for(k in value){
if(Object.prototype.hasOwnProperty.call(value,k)){
v=str(k,value);
if(v){
partial.push(quote(k)+(gap?': ':':')+v);
}
}
}
}
v=partial.length===0
?'{}'
:gap
?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}'
:'{'+partial.join(',')+'}';
gap=mind;
return v;
}
}
if(typeof JSON.stringify!=='function'){
JSON.stringify=function(value,replacer,space){
var i;
gap='';
indent='';
if(typeof space==='number'){
for(i=0;i<space;i+=1){
indent+=' ';
}
}else if(typeof space==='string'){
indent=space;
}
rep=replacer;
if(replacer&&typeof replacer!=='function'&&
(typeof replacer!=='object'||
typeof replacer.length!=='number')){
throw new Error('JSON.stringify');
}
return str('',{'':value});
};
}
if(typeof JSON.parse!=='function'){
JSON.parse=function(text,reviver){
var j;
function walk(holder,key){
var k,v,value=holder[key];
if(value&&typeof value==='object'){
for(k in value){
if(Object.prototype.hasOwnProperty.call(value,k)){
v=walk(value,k);
if(v!==undefined){
value[k]=v;
}else{
delete value[k];
}
}
}
}
return reviver.call(holder,key,value);
}
text=String(text);
cx.lastIndex=0;
if(cx.test(text)){
text=text.replace(cx,function(a){
return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);
});
}
if(/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']')
.replace(/(?:^|:|,)(?:\s*\[)+/g,''))){
j=eval('('+text+')');
return typeof reviver==='function'
?walk({'':j},'')
:j;
}
throw new SyntaxError('JSON.parse');
};
}
}());

function RSAKeyPair(encryptionExponent,decryptionExponent,modulus)
{
this.e=biFromHex(encryptionExponent);
this.d=biFromHex(decryptionExponent);
this.m=biFromHex(modulus);
this.chunkSize=2*biHighIndex(this.m);
this.radix=16;
this.barrett=new BarrettMu(this.m);
}
function twoDigit(n)
{
return(n<10?"0":"")+String(n);
}
function encryptedString(key,s)
{
var a=new Array();
var sl=s.length;
var i=0;
while(i<sl){
a[i]=s.charCodeAt(i);
i++;
}
while(a.length%key.chunkSize!=0){
a[i++]=0;
}
var al=a.length;
var result="";
var j,k,block;
for(i=0;i<al;i+=key.chunkSize){
block=new BigInt();
j=0;
for(k=i;k<i+key.chunkSize;++j){
block.digits[j]=a[k++];
block.digits[j]+=a[k++]<<8;
}
var crypt=key.barrett.powMod(block,key.e);
var text=key.radix==16?biToHex(crypt):biToString(crypt,key.radix);
result+=text+" ";
}
return result.substring(0,result.length-1);
}
function decryptedString(key,s)
{
var blocks=s.split(" ");
var result="";
var i,j,block;
for(i=0;i<blocks.length;++i){
var bi;
if(key.radix==16){
bi=biFromHex(blocks[i]);
}
else{
bi=biFromString(blocks[i],key.radix);
}
block=key.barrett.powMod(bi,key.d);
for(j=0;j<=biHighIndex(block);++j){
result+=String.fromCharCode(block.digits[j]&255,
block.digits[j]>>8);
}
}
if(result.charCodeAt(result.length-1)==0){
result=result.substring(0,result.length-1);
}
return result;
}
var biRadixBase=2;
var biRadixBits=16;
var bitsPerDigit=biRadixBits;
var biRadix=1<<16;
var biHalfRadix=biRadix>>>1;
var biRadixSquared=biRadix*biRadix;
var maxDigitVal=biRadix-1;
var maxInteger=9999999999999998;
var maxDigits;
var ZERO_ARRAY;
var bigZero,bigOne;
function setMaxDigits(value)
{
maxDigits=value;
ZERO_ARRAY=new Array(maxDigits);
for(var iza=0;iza<ZERO_ARRAY.length;iza++)ZERO_ARRAY[iza]=0;
bigZero=new BigInt();
bigOne=new BigInt();
bigOne.digits[0]=1;
}
setMaxDigits(20);
var dpl10=15;
var lr10=biFromNumber(1000000000000000);
function BigInt(flag)
{
if(typeof flag=="boolean"&&flag==true){
this.digits=null;
}
else{
this.digits=ZERO_ARRAY.slice(0);
}
this.isNeg=false;
}
function biFromDecimal(s)
{
var isNeg=s.charAt(0)=='-';
var i=isNeg?1:0;
var result;
while(i<s.length&&s.charAt(i)=='0')++i;
if(i==s.length){
result=new BigInt();
}
else{
var digitCount=s.length-i;
var fgl=digitCount%dpl10;
if(fgl==0)fgl=dpl10;
result=biFromNumber(Number(s.substr(i,fgl)));
i+=fgl;
while(i<s.length){
result=biAdd(biMultiply(result,lr10),
biFromNumber(Number(s.substr(i,dpl10))));
i+=dpl10;
}
result.isNeg=isNeg;
}
return result;
}
function biCopy(bi)
{
var result=new BigInt(true);
result.digits=bi.digits.slice(0);
result.isNeg=bi.isNeg;
return result;
}
function biFromNumber(i)
{
var result=new BigInt();
result.isNeg=i<0;
i=Math.abs(i);
var j=0;
while(i>0){
result.digits[j++]=i&maxDigitVal;
i>>=biRadixBits;
}
return result;
}
function reverseStr(s)
{
var result="";
for(var i=s.length-1;i>-1;--i){
result+=s.charAt(i);
}
return result;
}
var hexatrigesimalToChar=new Array(
'0','1','2','3','4','5','6','7','8','9',
'a','b','c','d','e','f','g','h','i','j',
'k','l','m','n','o','p','q','r','s','t',
'u','v','w','x','y','z'
);
function biToString(x,radix)
{
var b=new BigInt();
b.digits[0]=radix;
var qr=biDivideModulo(x,b);
var result=hexatrigesimalToChar[qr[1].digits[0]];
while(biCompare(qr[0],bigZero)==1){
qr=biDivideModulo(qr[0],b);
digit=qr[1].digits[0];
result+=hexatrigesimalToChar[qr[1].digits[0]];
}
return(x.isNeg?"-":"")+reverseStr(result);
}
function biToDecimal(x)
{
var b=new BigInt();
b.digits[0]=10;
var qr=biDivideModulo(x,b);
var result=String(qr[1].digits[0]);
while(biCompare(qr[0],bigZero)==1){
qr=biDivideModulo(qr[0],b);
result+=String(qr[1].digits[0]);
}
return(x.isNeg?"-":"")+reverseStr(result);
}
var hexToChar=new Array('0','1','2','3','4','5','6','7','8','9',
'a','b','c','d','e','f');
function digitToHex(n)
{
var mask=0xf;
var result="";
for(i=0;i<4;++i){
result+=hexToChar[n&mask];
n>>>=4;
}
return reverseStr(result);
}
function biToHex(x)
{
var result="";
var n=biHighIndex(x);
for(var i=biHighIndex(x);i>-1;--i){
result+=digitToHex(x.digits[i]);
}
return result;
}
function charToHex(c)
{
var ZERO=48;
var NINE=ZERO+9;
var littleA=97;
var littleZ=littleA+25;
var bigA=65;
var bigZ=65+25;
var result;
if(c>=ZERO&&c<=NINE){
result=c-ZERO;
}else if(c>=bigA&&c<=bigZ){
result=10+c-bigA;
}else if(c>=littleA&&c<=littleZ){
result=10+c-littleA;
}else{
result=0;
}
return result;
}
function hexToDigit(s)
{
var result=0;
var sl=Math.min(s.length,4);
for(var i=0;i<sl;++i){
result<<=4;
result|=charToHex(s.charCodeAt(i))
}
return result;
}
function biFromHex(s)
{
var result=new BigInt();
var sl=s.length;
for(var i=sl,j=0;i>0;i-=4,++j){
result.digits[j]=hexToDigit(s.substr(Math.max(i-4,0),Math.min(i,4)));
}
return result;
}
function biFromString(s,radix)
{
var isNeg=s.charAt(0)=='-';
var istop=isNeg?1:0;
var result=new BigInt();
var place=new BigInt();
place.digits[0]=1;
for(var i=s.length-1;i>=istop;i--){
var c=s.charCodeAt(i);
var digit=charToHex(c);
var biDigit=biMultiplyDigit(place,digit);
result=biAdd(result,biDigit);
place=biMultiplyDigit(place,radix);
}
result.isNeg=isNeg;
return result;
}
function biDump(b)
{
return(b.isNeg?"-":"")+b.digits.join(" ");
}
function biAdd(x,y)
{
var result;
if(x.isNeg!=y.isNeg){
y.isNeg=!y.isNeg;
result=biSubtract(x,y);
y.isNeg=!y.isNeg;
}
else{
result=new BigInt();
var c=0;
var n;
for(var i=0;i<x.digits.length;++i){
n=x.digits[i]+y.digits[i]+c;
result.digits[i]=n&0xffff;
c=Number(n>=biRadix);
}
result.isNeg=x.isNeg;
}
return result;
}
function biSubtract(x,y)
{
var result;
if(x.isNeg!=y.isNeg){
y.isNeg=!y.isNeg;
result=biAdd(x,y);
y.isNeg=!y.isNeg;
}else{
result=new BigInt();
var n,c;
c=0;
for(var i=0;i<x.digits.length;++i){
n=x.digits[i]-y.digits[i]+c;
result.digits[i]=n&0xffff;
if(result.digits[i]<0)result.digits[i]+=biRadix;
c=0-Number(n<0);
}
if(c==-1){
c=0;
for(var i=0;i<x.digits.length;++i){
n=0-result.digits[i]+c;
result.digits[i]=n&0xffff;
if(result.digits[i]<0)result.digits[i]+=biRadix;
c=0-Number(n<0);
}
result.isNeg=!x.isNeg;
}else{
result.isNeg=x.isNeg;
}
}
return result;
}
function biHighIndex(x)
{
var result=x.digits.length-1;
while(result>0&&x.digits[result]==0)--result;
return result;
}
function biNumBits(x)
{
var n=biHighIndex(x);
var d=x.digits[n];
var m=(n+1)*bitsPerDigit;
var result;
for(result=m;result>m-bitsPerDigit;--result){
if((d&0x8000)!=0)break;
d<<=1;
}
return result;
}
function biMultiply(x,y)
{
var result=new BigInt();
var c;
var n=biHighIndex(x);
var t=biHighIndex(y);
var u,uv,k;
for(var i=0;i<=t;++i){
c=0;
k=i;
for(j=0;j<=n;++j,++k){
uv=result.digits[k]+x.digits[j]*y.digits[i]+c;
result.digits[k]=uv&maxDigitVal;
c=uv>>>biRadixBits;
}
result.digits[i+n+1]=c;
}
result.isNeg=x.isNeg!=y.isNeg;
return result;
}
function biMultiplyDigit(x,y)
{
var n,c,uv;
result=new BigInt();
n=biHighIndex(x);
c=0;
for(var j=0;j<=n;++j){
uv=result.digits[j]+x.digits[j]*y+c;
result.digits[j]=uv&maxDigitVal;
c=uv>>>biRadixBits;
}
result.digits[1+n]=c;
return result;
}
function arrayCopy(src,srcStart,dest,destStart,n)
{
var m=Math.min(srcStart+n,src.length);
for(var i=srcStart,j=destStart;i<m;++i,++j){
dest[j]=src[i];
}
}
var highBitMasks=new Array(0x0000,0x8000,0xC000,0xE000,0xF000,0xF800,
0xFC00,0xFE00,0xFF00,0xFF80,0xFFC0,0xFFE0,
0xFFF0,0xFFF8,0xFFFC,0xFFFE,0xFFFF);
function biShiftLeft(x,n)
{
var digitCount=Math.floor(n/bitsPerDigit);
var result=new BigInt();
arrayCopy(x.digits,0,result.digits,digitCount,
result.digits.length-digitCount);
var bits=n%bitsPerDigit;
var rightBits=bitsPerDigit-bits;
for(var i=result.digits.length-1,i1=i-1;i>0;--i,--i1){
result.digits[i]=((result.digits[i]<<bits)&maxDigitVal)|
((result.digits[i1]&highBitMasks[bits])>>>
(rightBits));
}
result.digits[0]=((result.digits[i]<<bits)&maxDigitVal);
result.isNeg=x.isNeg;
return result;
}
var lowBitMasks=new Array(0x0000,0x0001,0x0003,0x0007,0x000F,0x001F,
0x003F,0x007F,0x00FF,0x01FF,0x03FF,0x07FF,
0x0FFF,0x1FFF,0x3FFF,0x7FFF,0xFFFF);
function biShiftRight(x,n)
{
var digitCount=Math.floor(n/bitsPerDigit);
var result=new BigInt();
arrayCopy(x.digits,digitCount,result.digits,0,
x.digits.length-digitCount);
var bits=n%bitsPerDigit;
var leftBits=bitsPerDigit-bits;
for(var i=0,i1=i+1;i<result.digits.length-1;++i,++i1){
result.digits[i]=(result.digits[i]>>>bits)|
((result.digits[i1]&lowBitMasks[bits])<<leftBits);
}
result.digits[result.digits.length-1]>>>=bits;
result.isNeg=x.isNeg;
return result;
}
function biMultiplyByRadixPower(x,n)
{
var result=new BigInt();
arrayCopy(x.digits,0,result.digits,n,result.digits.length-n);
return result;
}
function biDivideByRadixPower(x,n)
{
var result=new BigInt();
arrayCopy(x.digits,n,result.digits,0,result.digits.length-n);
return result;
}
function biModuloByRadixPower(x,n)
{
var result=new BigInt();
arrayCopy(x.digits,0,result.digits,0,n);
return result;
}
function biCompare(x,y)
{
if(x.isNeg!=y.isNeg){
return 1-2*Number(x.isNeg);
}
for(var i=x.digits.length-1;i>=0;--i){
if(x.digits[i]!=y.digits[i]){
if(x.isNeg){
return 1-2*Number(x.digits[i]>y.digits[i]);
}else{
return 1-2*Number(x.digits[i]<y.digits[i]);
}
}
}
return 0;
}
function biDivideModulo(x,y)
{
var nb=biNumBits(x);
var tb=biNumBits(y);
var origYIsNeg=y.isNeg;
var q,r;
if(nb<tb){
if(x.isNeg){
q=biCopy(bigOne);
q.isNeg=!y.isNeg;
x.isNeg=false;
y.isNeg=false;
r=biSubtract(y,x);
x.isNeg=true;
y.isNeg=origYIsNeg;
}else{
q=new BigInt();
r=biCopy(x);
}
return new Array(q,r);
}
q=new BigInt();
r=x;
var t=Math.ceil(tb/bitsPerDigit)-1;
var lambda=0;
while(y.digits[t]<biHalfRadix){
y=biShiftLeft(y,1);
++lambda;
++tb;
t=Math.ceil(tb/bitsPerDigit)-1;
}
r=biShiftLeft(r,lambda);
nb+=lambda;
var n=Math.ceil(nb/bitsPerDigit)-1;
var b=biMultiplyByRadixPower(y,n-t);
while(biCompare(r,b)!=-1){
++q.digits[n-t];
r=biSubtract(r,b);
}
for(var i=n;i>t;--i){
var ri=(i>=r.digits.length)?0:r.digits[i];
var ri1=(i-1>=r.digits.length)?0:r.digits[i-1];
var ri2=(i-2>=r.digits.length)?0:r.digits[i-2];
var yt=(t>=y.digits.length)?0:y.digits[t];
var yt1=(t-1>=y.digits.length)?0:y.digits[t-1];
if(ri==yt){
q.digits[i-t-1]=maxDigitVal;
}else{
q.digits[i-t-1]=Math.floor((ri*biRadix+ri1)/yt);
}
var c1=q.digits[i-t-1]*((yt*biRadix)+yt1);
var c2=(ri*biRadixSquared)+((ri1*biRadix)+ri2);
while(c1>c2){
--q.digits[i-t-1];
c1=q.digits[i-t-1]*((yt*biRadix)|yt1);
c2=(ri*biRadix*biRadix)+((ri1*biRadix)+ri2);
}
b=biMultiplyByRadixPower(y,i-t-1);
r=biSubtract(r,biMultiplyDigit(b,q.digits[i-t-1]));
if(r.isNeg){
r=biAdd(r,b);
--q.digits[i-t-1];
}
}
r=biShiftRight(r,lambda);
q.isNeg=x.isNeg!=origYIsNeg;
if(x.isNeg){
if(origYIsNeg){
q=biAdd(q,bigOne);
}else{
q=biSubtract(q,bigOne);
}
y=biShiftRight(y,lambda);
r=biSubtract(y,r);
}
if(r.digits[0]==0&&biHighIndex(r)==0)r.isNeg=false;
return new Array(q,r);
}
function biDivide(x,y)
{
return biDivideModulo(x,y)[0];
}
function biModulo(x,y)
{
return biDivideModulo(x,y)[1];
}
function biMultiplyMod(x,y,m)
{
return biModulo(biMultiply(x,y),m);
}
function biPow(x,y)
{
var result=bigOne;
var a=x;
while(true){
if((y&1)!=0)result=biMultiply(result,a);
y>>=1;
if(y==0)break;
a=biMultiply(a,a);
}
return result;
}
function biPowMod(x,y,m)
{
var result=bigOne;
var a=x;
var k=y;
while(true){
if((k.digits[0]&1)!=0)result=biMultiplyMod(result,a,m);
k=biShiftRight(k,1);
if(k.digits[0]==0&&biHighIndex(k)==0)break;
a=biMultiplyMod(a,a,m);
}
return result;
}
function BarrettMu(m)
{
this.modulus=biCopy(m);
this.k=biHighIndex(this.modulus)+1;
var b2k=new BigInt();
b2k.digits[2*this.k]=1;
this.mu=biDivide(b2k,this.modulus);
this.bkplus1=new BigInt();
this.bkplus1.digits[this.k+1]=1;
this.modulo=BarrettMu_modulo;
this.multiplyMod=BarrettMu_multiplyMod;
this.powMod=BarrettMu_powMod;
}
function BarrettMu_modulo(x)
{
var q1=biDivideByRadixPower(x,this.k-1);
var q2=biMultiply(q1,this.mu);
var q3=biDivideByRadixPower(q2,this.k+1);
var r1=biModuloByRadixPower(x,this.k+1);
var r2term=biMultiply(q3,this.modulus);
var r2=biModuloByRadixPower(r2term,this.k+1);
var r=biSubtract(r1,r2);
if(r.isNeg){
r=biAdd(r,this.bkplus1);
}
var rgtem=biCompare(r,this.modulus)>=0;
while(rgtem){
r=biSubtract(r,this.modulus);
rgtem=biCompare(r,this.modulus)>=0;
}
return r;
}
function BarrettMu_multiplyMod(x,y)
{
var xy=biMultiply(x,y);
return this.modulo(xy);
}
function BarrettMu_powMod(x,y)
{
var result=new BigInt();
result.digits[0]=1;
var a=x;
var k=y;
while(true){
if((k.digits[0]&1)!=0)result=this.multiplyMod(result,a);
k=biShiftRight(k,1);
if(k.digits[0]==0&&biHighIndex(k)==0)break;
a=this.multiplyMod(a,a);
}
return result;
}

var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
_doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

(function(){
function createSecretKey(size){
var keys="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var key="";
for(var i=0;i<size;i=i+1){
var pos=Math.random()*keys.length;
pos=Math.floor(pos);
key=key+keys.charAt(pos);
}
return key;
}
function aesEncrypt(text,secKey){
var key=CryptoJS.enc.Utf8.parse(secKey);
var iv=CryptoJS.enc.Utf8.parse('0102030405060708');
var srcs=CryptoJS.enc.Utf8.parse(text);
var encrypted=CryptoJS.AES.encrypt(srcs,key,{iv:iv,mode:CryptoJS.mode.CBC});
return encrypted.toString();
}
function rsaEncrypt(text,pubKey,modulus){
setMaxDigits(131);
var keys=new RSAKeyPair(pubKey,"",modulus);
var encText=encryptedString(keys,text);
return encText;
}
function aesRsaEncrypt(text,pubKey,modulus,nonce){
var result={};
var secKey=createSecretKey(16);
result.encText=aesEncrypt(text,nonce);
result.encText=aesEncrypt(result.encText,secKey);
result.encSecKey=rsaEncrypt(secKey,pubKey,modulus);
return result;
}
function rsaNonceEncrypt(text,pubKey,modulus,nonce){
var result={};
result.encText=rsaEncrypt(text+nonce,pubKey,modulus);
return result;
}
window.aesRsaEncrypt=aesRsaEncrypt;
window.rsaNonceEncrypt=rsaNonceEncrypt;
})();
