#!/usr/bin/env node
!function(){function G(i){if(s[i])return s[i];throw"Not found: "+i}function I(i){var m=G(i);m._d||(m._a=1,m.g&&m.g().forEach(function(other){if("@"!=other[0]){if(G(other)._a)throw"Cycle: "+i+", "+other;G(other)._d||I(other)}}),m.v&&m.v(),m.i&&m.i(),m._d=1,delete m._a)}var s={},root=GLOBAL;root.__m=function(i,m){if(m)s[i]=m();else{for(i in s)G(i).g&&G(i).s(G(i).g().map(function(i){return G("@"==i[0]?i.slice(1):i).e||{}}));for(i in s)I(i);delete root.__m}}}();
Object.extend=function(){for(var result={},i=0;i<arguments.length;i++)for(n in arguments[i]){(result.__lookupGetter__(n)||result.__lookupSetter__(n))&&delete result[n],result[n]=arguments[i][n];var getter=arguments[i].__lookupGetter__(n);getter&&result.__defineGetter__(n,getter);var setter=arguments[i].__lookupSetter__(n);setter&&result.__defineSetter__(n,setter)}return result};
!function(st){function pp(params,args){for(var r,i=0;i<params.length;i++)params[i]=null!=(r=paramph.exec(params[i]))?args[Number(r[1])]:params[i].replace(/\0/g,",");return params}function fl(s,len){if(len=Number(len),isNaN(len))return s;s=""+s;var nl=Math.abs(len)-s.length;if(0>=nl)return s;for(;sp.length<nl;)sp+=sp;return 0>len?s+sp.substring(0,nl):sp.substring(0,nl)+s}st.format=function(){if(0==arguments.length)return this;var placeholder=/\{(\d+)(?:,([-+]?\d+))?(?:\:([^(^}]+)(?:\(((?:\\\)|[^)])+)\)){0,1}){0,1}\}/g,args=arguments;return this.replace(placeholder,function(m,num,len,f,params){return m=args[Number(num)],f=formatters[f],fl(null==f?m:f(m,pp((params||"").replace(/\\\)/g,")").replace(/\\,/g,"\0").split(","),args)),len)})},String.format=function(format){return arguments.length<=1?format:st.format.apply(format,Array.prototype.slice.call(arguments,1))},st.format.add=function(name,func,replace){if(null!=formatters[name]&&!replace)throw"Format "+name+" exist, use replace=true for replace";formatters[name]=func},String.format.init=st.format.init=function(param){var f;for(n in param)f=formatters[n],null!=f&&null!=f.init&&f.init(param[n])},st.format.get=function(name){return formatters[name]};var paramph=/^\{(\d+)\}$/,formatters={},sp="    ";st.format.add("arr",function arr(va,params){if(null==va)return"null";var v=[],j=params.shift()||"",f=formatters[params.shift()];if(null==f)v=va;else for(var i=0;i<va.length;i++)v.push(f(va[i],params));return v.join(j)}),st.format.add("obj",function(v,params){return v[params]})}(String.prototype);
__m("Node",function(){function fatalError(msg){for(var temp=[],i=0;i<arguments.length;i++)i&&temp.push("\n"),temp.push(arguments[i]);console.error.call(console,temp),process.exit(1)}function safeAccess(what,purpose){purpose===undefined&&(purpose="work");var cache;return function(arg){try{return cache||(cache=require(what))}catch(e){fatalError('Please, install "{0}" for {1}.'.format(what,purpose),'> cd "{0}" && npm install {1}'.format(__dirname,what))}}}function args(usage,args){if(usage&&args){var result=optimist().usage(usage);for(n in args)result=result.options(n,args[n]);argv=result.argv}return argv}function showHelp(){optimist().showHelp()}function readFile(file){return fs().readFileSync(file,"utf-8")}function writeFile(file,content){return fs().writeFileSync(file,content,"utf-8")}function resolve(name){return path().resolve(__dirname,name)}var optimist,argv,fs,cp,path;return{e:{get fs(){return fs},get cp(){return cp},get path(){return path},fatalError:fatalError,safeAccess:safeAccess,args:args,showHelp:showHelp,readFile:readFile,writeFile:writeFile,resolve:resolve},v:function(){optimist=safeAccess("optimist","correct interact in shell"),fs=safeAccess("fs"),cp=safeAccess("child_process"),path=safeAccess("path")}}});
__m ("App", function (){
var Node, Prework, Parser, Converter, Format, Compressor, ModulesCode, Cacher;
var inputFile, outputFile, cacheFolder, argPhpHeader, includesFolder, silenceMode;
var loadedFiles, glob, fibers;
function asFolder (path){
if (! path)
return null;
var folder = Node.path ().resolve (path);
try{
Node.fs ().mkdirSync (folder);
}catch (e){}
return Node.fs ().existsSync (folder) ? folder : null;
}
function findIncluded (name,current,top){
if (current.indexOf (top) == 0)
while (true)
{
var path = Node.path ().resolve (current, name);
if (path.indexOf ("*") !== - 1)
{
var result = [];
glob ().sync (path).forEach (function (arg){
return result.push ({"file":arg,"top":top});
});
if (result.length)
return result;
}
else
if (Node.fs ().existsSync (path))
return [{"file":path,"top":top}];
var newPow = Node.path ().resolve (current, "..");
if (newPow.length < top.length || newPow == current)
break;
current = newPow;
}
if (top != includesFolder)
return findIncluded (name, includesFolder, includesFolder);
return null;
}
function checkOn (value){
if (/^(on|true|1|yes|enabled?)$/i.test (value))
return true;
if (/^(off|false|0|no|disabled?)$/i.test (value))
return false;
Node.fatalError ("Wrong parameter value: \"{0}\".".format (value));
}
function join (a,b){
function pairCompare (a,b,c,d){
return a == c && b == d || a == d && b == c;
}
var joiners = {"target":function (a,b){
var av = a.value, bv = b.value;
if (av == bv)
return a;
if (pairCompare (av, bv, "web", "web:onload"))
return {"type":"target","value":"web:onload"};
if (pairCompare (av, bv, "web", "local"))
return {"type":"target","value":"local"};
Node.fatalError ("Incompatibile target: \"{0}\" and \"{1}\".".format (av, bv));
},"buildTo":function (arg){
return Node.fatalError ("Only one build-target instruction allowed.");
}};
if ((a !== undefined || b !== undefined) && typeof a !== "function")
if (a === undefined)
{
return b;
}
else
if (b === undefined)
{
return a;
}
else
if (typeof a === "boolean")
{
return a || b;
}
else
if (typeof a === "number")
{
return a + b;
}
else
if (typeof a.concat === "function" && typeof a.push === "function")
{
return b.concat (a [n]);
}
else
if (joiners [a.type])
{
return joiners [a.type] (b, a);
}
else
if (typeof a.substr === "function")
{
return b + "\n" + a;
}
else
if (typeof a === "object")
{
for (n in a)
a [n] = join (a [n], b [n]);
for (n in b)
if (a [n] === undefined)
a [n] = join (a [n], b [n]);
return a;
}
else
Node.fatalError ("Not implemented: \"{0}\".".format (typeof a));
}
function work (file,top){
silenceMode || console.log (file);
var content = Node.readFile (file);
silenceMode || console.log (".. Readed");
var prework = Prework.work (content);
silenceMode || console.log (".. Preworked");
var parsed = Parser.work (prework.code, file);
silenceMode || console.log (".. Parsed");
var converted = Converter.work (parsed);
silenceMode || console.log (".. Converted");
var formatted = Format.work (converted.tree);
silenceMode || console.log (".. Formatted");
var childs = [], result = {"code":formatted.code,"additional":formatted.additional,"modules":converted.modules,"lessParams":converted.lessParams}, compress = true;
if (prework.node)
result.additional.target = {"type":"target","value":"node"};
for (var i = 0; 
i < formatted.jsx.length; i++)
{
var key = formatted.jsx [i].key, value = formatted.jsx [i].value;
if (key === null)
{
if (! silenceMode)
console.log ("Warning: found unparcable Jsx comment ({0}).".format (file));
continue;
}
switch (key){
case "import":
childs.push ({"name":value + (/(\/|\\)$/.test (value) ? "*" : "") + ".jsxi"});
break;
case "include":
childs.push ({"name":value + (/(\/|\\)$/.test (value) ? "*" : ""),"raw":true});
break;
case "compress":
compress = checkOn (value);
break;
case "isolate":
result.additional.isolate = checkOn (value);
break;
case "modules-public":
result.additional.modulesPublic = checkOn (value);
break;
case "target":
var n = ["default","auto","node","web","web:onload","local"].indexOf (value);
if (n == - 1)
Node.fatalError ("Undefined target value: \"{0}\" (at {1}).".format (value, file));
if (n > 1)
result.additional.target = {"type":"target","value":value};
break;
case "build-to":
result.additional.buildTo = {"type":"buildTo","value":value};
break;
case "define":
if (! result.additional.defines)
result.additional.defines = [];
var matched = value.match (/^([^\s]+)\s+([\s\S]+)$/);
if (! matched)
Node.fatalError ("Wrong define value: \"{0}\" (at {1}).".format (value, file));
result.additional.defines.push ({"what":matched [1].trim (),"by":matched [2].trim ()});
break;
default:Node.fatalError ("Undefined instruction: \"{0}\" (at {1}).".format (key, file));
}
}
if (compress)
result.code = Compressor.work (result.code, file);
return {"result":result,"childs":childs};
}
function load (file,top,options){
if (options === undefined)
options = {};
var topMode = top === undefined;
if (topMode)
top = Node.path ().resolve (file, "..");
if (! Node.fs ().existsSync (file))
Node.fatalError ("Divided by zero.");
if (options.raw)
return {"code":Node.readFile (file)};
var data = Cacher.load (file);
if (! data)
{
data = work (file, top);
Cacher.save (file, data);
}
var childs = [];
data.childs.forEach (function (arg){
var other = findIncluded (arg.name, Node.path ().resolve (file, ".."), top);
if (! other)
Node.fatalError ("Couldn'n found included file: \"{0}\" ({1}).".format (arg.name, file));
for (var i = 0; 
i < other.length; i++)
if (loadedFiles.indexOf (other [i].file) == - 1)
{
loadedFiles.push (other [i].file);
childs.push (load (other [i].file, other [i].top, {"raw":arg.raw}));
}
});
for (var i = childs.length - 1; 
i >= 0; i--)
data.result = join (data.result, childs [i]);
return data.result;
}
function getOutputFile (file,buildTo,phpMode){
var result = Node.path ().resolve (file, "..");
if (buildTo)
result = Node.path ().resolve (result, buildTo);
if (! buildTo || /[\/\\]$/.test (buildTo))
result = Node.path ().resolve (result, Node.path ().basename (file, ".jsx") + (phpMode ? ".php" : ".js"));
return result;
}
function finalStrokes (data){
var result = [], modules = data.modules && ModulesCode.get (data.additional);
if (data.additional.target && data.additional.target.value == "node")
result.push ("#!/usr/bin/env node");
if (data.additional.php && argPhpHeader)
{
result.push ("<? header('Content-Type: application/javascript') ?>");
if (! silenceMode)
console.log ("PHP mode.");
}
if (data.additional.userscript)
result.push ("// ==UserScript==\n" + data.additional.userscript.map (function (arg){
return "// @" + arg.key + " " + arg.value + "\n";
}).join ("") + "// ==/UserScript==\n");
if (data.additional.isolate)
result.push ("(function (){\n");
if (modules)
result.push (modules.begin);
if (data.lessParams)
result.push ("String.prototype.less=function (a,r){r=this;for(var n in a)r=r.replace(new RegExp('@'+n.replace(/([a-z])([A-Z])/g,'$1_$2').toUpperCase(),'g'),a[n]);return r}");
result.push (data.code);
if (modules)
result.push (modules.end);
if (data.additional.isolate)
result.push ("\n})()");
var code = result.join ("\n");
if (data.additional.defines)
for (i in data.additional.defines){
var v = data.additional.defines[i];
code = code.split (v.what).join (v.by);
}
return {"file":outputFile || getOutputFile (inputFile, data.additional.buildTo && data.additional.buildTo.value, data.additional.php && argPhpHeader),"code":code};
}
function init (){
fibers () (function (arg){
Node.args ("Usage: js-ext file [flags]", {"p":{"alias":"php-header","description":"Use php header if nessesary."},"o":{"alias":"output","description":"Output file (else automode) or \":stdout\"."},"c":{"alias":"cache","description":"Cache folder (else by default) or \":no\"."},"u":{"alias":"usage","description":"This text."}});
if (Node.args ().u || ! (inputFile = Node.path ().resolve (Node.args ()._ [0])))
{
Node.showHelp ();
}
else
if (! Node.fs ().existsSync (inputFile))
{
Node.fatalError ("Input file \"{0}\" not found.".format (inputFile));
}
else
{
var argCache = Node.args ().c ? Node.args ().c.trim () : "";
cacheFolder = /^:no(ne|t)?$/i.test (argCache) ? null : asFolder (argCache || Node.resolve ("cache"));
includesFolder = asFolder (Node.resolve ("includes"));
outputFile = Node.args ().o;
argPhpHeader = Node.args ().p;
silenceMode = /^:(stdout|console)$/.test (outputFile);
var result = finalStrokes (load (inputFile));
if (silenceMode)
console.log (result.code);
else
Node.writeFile (result.file, result.code);
}
}).run ();
}
return {"e":{get inputFile (){return inputFile;},get outputFile (){return outputFile;},get cacheFolder (){return cacheFolder;},get argPhpHeader (){return argPhpHeader;},get includesFolder (){return includesFolder;},get silenceMode (){return silenceMode;}},"i":init,"g":function (){
return ["Node","Prework","Parser","Converter","Format","Compressor","ModulesCode","Cacher"];
},"s":function (__){
Node = __ [0];
Prework = __ [1];
Parser = __ [2];
Converter = __ [3];
Format = __ [4];
Compressor = __ [5];
ModulesCode = __ [6];
Cacher = __ [7];
},"v":function (){
loadedFiles = [];
glob = Node.safeAccess ("glob", "usings masks");
fibers = Node.safeAccess ("fibers");
}};
});
__m("Md5",function(){function hex(s){return hex_md5(s)}function b64(s){return b64_md5(s)}function any(s){return any_md5(s)}function hex_md5(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)))}function b64_md5(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)))}function any_md5(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e)}function hex_hmac_md5(k,d){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)))}function b64_hmac_md5(k,d){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)))}function any_hmac_md5(k,d,e){return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e)}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc").toLowerCase()}function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),8*s.length))}function rstr_hmac_md5(key,data){var bkey=rstr2binl(key);bkey.length>16&&(bkey=binl_md5(bkey,8*key.length));for(var ipad=Array(16),opad=Array(16),i=0;16>i;i++)ipad[i]=909522486^bkey[i],opad[i]=1549556828^bkey[i];var hash=binl_md5(ipad.concat(rstr2binl(data)),512+8*data.length);return binl2rstr(binl_md5(opad.concat(hash),640))}function rstr2hex(input){try{}catch(e){hexcase=0}for(var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef",output="",x,i=0;i<input.length;i++)x=input.charCodeAt(i),output+=hex_tab.charAt(15&x>>>4)+hex_tab.charAt(15&x);return output}function rstr2b64(input){try{}catch(e){b64pad=""}for(var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",output="",len=input.length,i=0;len>i;i+=3)for(var triplet=input.charCodeAt(i)<<16|(len>i+1?input.charCodeAt(i+1)<<8:0)|(len>i+2?input.charCodeAt(i+2):0),j=0;4>j;j++)output+=8*i+6*j>8*input.length?b64pad:tab.charAt(63&triplet>>>6*(3-j));return output}function rstr2any(input,encoding){var divisor=encoding.length,i,j,q,x,quotient,dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++)dividend[i]=input.charCodeAt(2*i)<<8|input.charCodeAt(2*i+1);var full_length=Math.ceil(8*input.length/(Math.log(encoding.length)/Math.log(2))),remainders=Array(full_length);for(j=0;full_length>j;j++){for(quotient=Array(),x=0,i=0;i<dividend.length;i++)x=(x<<16)+dividend[i],q=Math.floor(x/divisor),x-=q*divisor,(quotient.length>0||q>0)&&(quotient[quotient.length]=q);remainders[j]=x,dividend=quotient}var output="";for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);return output}function str2rstr_utf8(input){for(var output="",i=-1,x,y;++i<input.length;)x=input.charCodeAt(i),y=i+1<input.length?input.charCodeAt(i+1):0,x>=55296&&56319>=x&&y>=56320&&57343>=y&&(x=65536+((1023&x)<<10)+(1023&y),i++),127>=x?output+=String.fromCharCode(x):2047>=x?output+=String.fromCharCode(192|31&x>>>6,128|63&x):65535>=x?output+=String.fromCharCode(224|15&x>>>12,128|63&x>>>6,128|63&x):2097151>=x&&(output+=String.fromCharCode(240|7&x>>>18,128|63&x>>>12,128|63&x>>>6,128|63&x));return output}function str2rstr_utf16le(input){for(var output="",i=0;i<input.length;i++)output+=String.fromCharCode(255&input.charCodeAt(i),255&input.charCodeAt(i)>>>8);return output}function str2rstr_utf16be(input){for(var output="",i=0;i<input.length;i++)output+=String.fromCharCode(255&input.charCodeAt(i)>>>8,255&input.charCodeAt(i));return output}function rstr2binl(input){for(var output=Array(input.length>>2),i=0;i<output.length;i++)output[i]=0;for(var i=0;i<8*input.length;i+=8)output[i>>5]|=(255&input.charCodeAt(i/8))<<i%32;return output}function binl2rstr(input){for(var output="",i=0;i<32*input.length;i+=8)output+=String.fromCharCode(255&input[i>>5]>>>i%32);return output}function binl_md5(x,len){x[len>>5]|=128<<len%32,x[(len+64>>>9<<4)+14]=len;for(var a=1732584193,b=-271733879,c=-1732584194,d=271733878,i=0;i<x.length;i+=16){var olda=a,oldb=b,oldc=c,oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936),d=md5_ff(d,a,b,c,x[i+1],12,-389564586),c=md5_ff(c,d,a,b,x[i+2],17,606105819),b=md5_ff(b,c,d,a,x[i+3],22,-1044525330),a=md5_ff(a,b,c,d,x[i+4],7,-176418897),d=md5_ff(d,a,b,c,x[i+5],12,1200080426),c=md5_ff(c,d,a,b,x[i+6],17,-1473231341),b=md5_ff(b,c,d,a,x[i+7],22,-45705983),a=md5_ff(a,b,c,d,x[i+8],7,1770035416),d=md5_ff(d,a,b,c,x[i+9],12,-1958414417),c=md5_ff(c,d,a,b,x[i+10],17,-42063),b=md5_ff(b,c,d,a,x[i+11],22,-1990404162),a=md5_ff(a,b,c,d,x[i+12],7,1804603682),d=md5_ff(d,a,b,c,x[i+13],12,-40341101),c=md5_ff(c,d,a,b,x[i+14],17,-1502002290),b=md5_ff(b,c,d,a,x[i+15],22,1236535329),a=md5_gg(a,b,c,d,x[i+1],5,-165796510),d=md5_gg(d,a,b,c,x[i+6],9,-1069501632),c=md5_gg(c,d,a,b,x[i+11],14,643717713),b=md5_gg(b,c,d,a,x[i+0],20,-373897302),a=md5_gg(a,b,c,d,x[i+5],5,-701558691),d=md5_gg(d,a,b,c,x[i+10],9,38016083),c=md5_gg(c,d,a,b,x[i+15],14,-660478335),b=md5_gg(b,c,d,a,x[i+4],20,-405537848),a=md5_gg(a,b,c,d,x[i+9],5,568446438),d=md5_gg(d,a,b,c,x[i+14],9,-1019803690),c=md5_gg(c,d,a,b,x[i+3],14,-187363961),b=md5_gg(b,c,d,a,x[i+8],20,1163531501),a=md5_gg(a,b,c,d,x[i+13],5,-1444681467),d=md5_gg(d,a,b,c,x[i+2],9,-51403784),c=md5_gg(c,d,a,b,x[i+7],14,1735328473),b=md5_gg(b,c,d,a,x[i+12],20,-1926607734),a=md5_hh(a,b,c,d,x[i+5],4,-378558),d=md5_hh(d,a,b,c,x[i+8],11,-2022574463),c=md5_hh(c,d,a,b,x[i+11],16,1839030562),b=md5_hh(b,c,d,a,x[i+14],23,-35309556),a=md5_hh(a,b,c,d,x[i+1],4,-1530992060),d=md5_hh(d,a,b,c,x[i+4],11,1272893353),c=md5_hh(c,d,a,b,x[i+7],16,-155497632),b=md5_hh(b,c,d,a,x[i+10],23,-1094730640),a=md5_hh(a,b,c,d,x[i+13],4,681279174),d=md5_hh(d,a,b,c,x[i+0],11,-358537222),c=md5_hh(c,d,a,b,x[i+3],16,-722521979),b=md5_hh(b,c,d,a,x[i+6],23,76029189),a=md5_hh(a,b,c,d,x[i+9],4,-640364487),d=md5_hh(d,a,b,c,x[i+12],11,-421815835),c=md5_hh(c,d,a,b,x[i+15],16,530742520),b=md5_hh(b,c,d,a,x[i+2],23,-995338651),a=md5_ii(a,b,c,d,x[i+0],6,-198630844),d=md5_ii(d,a,b,c,x[i+7],10,1126891415),c=md5_ii(c,d,a,b,x[i+14],15,-1416354905),b=md5_ii(b,c,d,a,x[i+5],21,-57434055),a=md5_ii(a,b,c,d,x[i+12],6,1700485571),d=md5_ii(d,a,b,c,x[i+3],10,-1894986606),c=md5_ii(c,d,a,b,x[i+10],15,-1051523),b=md5_ii(b,c,d,a,x[i+1],21,-2054922799),a=md5_ii(a,b,c,d,x[i+8],6,1873313359),d=md5_ii(d,a,b,c,x[i+15],10,-30611744),c=md5_ii(c,d,a,b,x[i+6],15,-1560198380),b=md5_ii(b,c,d,a,x[i+13],21,1309151649),a=md5_ii(a,b,c,d,x[i+4],6,-145523070),d=md5_ii(d,a,b,c,x[i+11],10,-1120210379),c=md5_ii(c,d,a,b,x[i+2],15,718787259),b=md5_ii(b,c,d,a,x[i+9],21,-343485551),a=safe_add(a,olda),b=safe_add(b,oldb),c=safe_add(c,oldc),d=safe_add(d,oldd)}return Array(a,b,c,d)}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b)}function md5_ff(a,b,c,d,x,s,t){return md5_cmn(b&c|~b&d,a,b,x,s,t)}function md5_gg(a,b,c,d,x,s,t){return md5_cmn(b&d|c&~d,a,b,x,s,t)}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t)}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|~d),a,b,x,s,t)}function safe_add(x,y){var lsw=(65535&x)+(65535&y),msw=(x>>16)+(y>>16)+(lsw>>16);return msw<<16|65535&lsw}function bit_rol(num,cnt){return num<<cnt|num>>>32-cnt}var hexcase,b64pad;return{e:{hex:hex,b64:b64,any:any},v:function(){hexcase=0,b64pad=""}}});
__m("Cacher",function(){function getCacheFile(file){return Node.path().resolve(App.cacheFolder,Md5.hex(file))}function getFileMark(file){var stats=Node.fs().statSync(file);return[jsextMark||"",+stats.mtime,stats.size].join("")}function load(file){if(App.cacheFolder)try{var cacheFile=getCacheFile(file);if(Node.fs().existsSync(cacheFile)){var data=JSON.parse(Node.readFile(cacheFile));if(data.mark==getFileMark(file))return data.content}}catch(e){}}function save(file,data){App.cacheFolder&&Node.writeFile(getCacheFile(file),JSON.stringify({mark:getFileMark(file),content:data}))}var App,Node,Md5,jsextMark;return{e:{load:load,save:save},g:function(){return["@App","Node","Md5"]},s:function(__){App=__[0],Node=__[1],Md5=__[2]},v:function(){jsextMark=getFileMark(__filename)}}});
__m("Compressor",function(){function work(code,filename,max){if(!enabled)return code;try{var str=jsCompressor().OutputStream({comments:/^!<\?/}),prs=jsCompressor().parse(code,{filename:filename}),cmp=jsCompressor().Compressor(max?{sequences:!0,properties:!0,dead_code:!0,drop_debugger:!0,unsafe:!0,conditionals:!0,comparisons:!0,evaluate:!0,booleans:!0,loops:!0,unused:!1,hoist_funs:!0,hoist_vars:!0,if_return:!0,join_vars:!0,cascade:!0,side_effects:!0,warnings:!App.silenceMode}:{unused:!1,warnings:!App.silenceMode}),trn=prs.transform(cmp);return prs.print(str),str.toString()}catch(e){Node.fatalError("Compress error: "+e,code)}}function max(code,filename){return work(code,filename,!0)}function init(){}var Node,App,jsCompressor,enabled;return{e:{work:work,max:max},i:init,g:function(){return["Node","@App"]},s:function(__){Node=__[0],App=__[1]},v:function(){jsCompressor=Node.safeAccess("uglify-js","compress js"),enabled=!0}}});
__m("Converter",function(){function jsonFunction(name,content,params){return params===undefined&&(params=[]),{type:"PropertyAssignment",name:name,value:{type:"Function",name:null,params:params,elements:content}}}function clone(obj){if("object"==typeof obj&&obj){if(obj.indexOf){for(var r=[],i=0;i<obj.length;i++)r.push(clone(obj[i]));return r}if(types[obj.type])return types[obj.type](obj);var r={};for(n in obj)r[n]=clone(obj[n]);return r}return obj}function work(parsed){return modules=!1,lessParams=!1,{tree:clone(parsed),modules:!!modules,lessParams:!!lessParams}}function finish(file){for(key in shameOnMeDogNail){var value=shameOnMeDogNail[key],valueString=value();if(!valueString)return null;file=file.replace(key,valueString)}return file}var Node,moduleName,minimize,less,fibers,minimizeInstance,modules,lessParams,types;return{e:{work:work,finish:finish},g:function(){return["Node"]},s:function(__){Node=__[0]},v:function(){moduleName="__m",minimize=Node.safeAccess("minimize","compress html"),less=Node.safeAccess("less","converting less to css"),fibers=Node.safeAccess("fibers","converting less to css"),types={Function:function(arg){var initialize=[];return{type:"Function",name:arg.name,exportFlag:arg.exportFlag,params:arg.params.map(function(arg){return arg&&"IdentifierWithDefault"==arg.type?(initialize.push({type:"IfStatement",condition:{type:"BinaryExpression",operator:"===",left:{type:"Variable",name:arg.identifier},right:{type:"Variable",name:"undefined"}},ifStatement:{type:"ExpressionStatement",value:{type:"AssignmentExpression",operator:"=",left:{type:"Variable",name:arg.identifier},right:clone(arg.value)}},elseStatement:null}),arg.identifier):arg}),elements:initialize.length?initialize.concat(clone(arg.elements)):clone(arg.elements)}},Lambda:function(arg){return types.Function({type:"Function",name:null,params:0==arg.params.length?["arg"]:arg.params,elements:"Block"==arg.element.type?arg.element.statements:["ExpressionStatement"==arg.element.type?{type:"ReturnStatement",value:clone(arg.element.value)}:arg.element]})},StringLiteral:function(arg,file){function parseLess(data){var fiber=fibers().current,result;try{new(less().Parser)({paths:[Node.path().dirname(file),Node.resolve("includes")],filename:file}).parse('@import "__js_ext_utils.less";\n'+data,function(e,tree){e&&Node.fatalError("Error at LESS parsing:",e),result=tree.toCSS({compress:!0}),fiber.run()})}catch(e){Node.fatalError("Error at LESS parsing: "+e)}return fibers().yield(),result}var result;switch(arg.special){case"h":var a=arg.value.replace(/<([a-z]+)(\s[^>]+?)?\s*\/>/g,"<$1$2></$1>");minimizeInstance||(minimizeInstance=new(minimize())({empty:!0,cdata:!0,comments:!1,spare:!0,quotes:!0})),minimizeInstance.parse(a,function(error,data){return result=data});break;case"c":result=arg.value.replace(/\s+/g," ").replace(/\s*([{};:])\s*/g,"$1").trim();break;case"s":result=arg.value.replace(/\s+/g," ").trim();break;case"l":result=parseLess(arg.value);break;case"lp":var variables={},raw=arg.value;lessParams=!0;var generators={def:function(arg){return 0|1e4*(1+Math.random())},size:function(arg){return this.def()+"px"},radius:function(arg){return this.size()},per:function(arg){return this.def()+"%"},time:function(arg){return this.def()+"s"},color:function(arg){return"#"+(0|15728639*Math.random()+1048576).toString(16)},text:function(arg){return'"'+(1e18*Math.random()).toString(32)+'"'},font:function(arg){return this.text()}};result=parseLess(raw.replace(/@([A-Z0-9_]+?)(?:_([A-Z]+))?([^A-Z0-9_])/g,function(match,name,type,postfix){var key="@"+name+(type?"_"+type:""),value=variables[key];if(!value){var generator=generators[type]||generators.def;do value=generator();while(-1!=raw.indexOf(value));variables[key]=value}return value+postfix}));for(name in variables){var value=variables[name];result=result.split(value).join(name)}break;default:result=arg.value}return{type:"StringLiteral",value:result}},Module:function(arg){modules=!0;for(var getImports=[],setupImports=[],exported=[],variableInitialize=[],newElements=[],hasInit=!1,i=0;i<arg.elements.length;i++){var e=arg.elements[i];if("ImportStatement"===e.type)newElements.push({type:"VariableStatement",declarations:function(arg){for(var k=0;k<arg.length;k++){var clear="@"===arg[k][0]?arg[k].slice(1):arg[k];getImports.push({type:"StringLiteral",value:arg[k]}),setupImports.push({type:"ExpressionStatement",value:{type:"AssignmentExpression",operator:"=",left:{type:"Variable",name:clear},right:{type:"PropertyAccess",base:{type:"Variable",name:"__"},name:{type:"NumericLiteral",value:setupImports.length}}}}),arg[k]={type:"VariableDeclaration",name:clear,value:null}}return arg}(clone(e.declarations))});else{var newE=clone(e);if("Function"==newE.type&&"init"==newE.name)hasInit=!0;else if("Function"===newE.type&&newE.exportFlag)exported.push({type:"PropertyAssignment",name:newE.name,value:{type:"Variable",name:newE.name}});else if("VariableStatement"===newE.type)for(var k=0;k<newE.declarations.length;k++)newE.exportFlag&&exported.push({type:"GetterDefinition",name:newE.declarations[k].name,body:[{type:"ReturnStatement",value:{type:"Variable",name:newE.declarations[k].name}}]}),null!==newE.declarations[k].value&&(variableInitialize.push({type:"ExpressionStatement",value:{type:"AssignmentExpression",operator:"=",left:{type:"Variable",name:newE.declarations[k].name},right:clone(newE.declarations[k].value)}}),newE.declarations[k].value=null);newElements.push(newE)}}return exported=exported.length?[{type:"PropertyAssignment",name:"e",value:{type:"ObjectLiteral",properties:exported}}]:[],hasInit&&exported.push({type:"PropertyAssignment",name:"i",value:{type:"Variable",name:"init"}}),getImports.length&&exported.push(jsonFunction("g",[{type:"ReturnStatement",value:{type:"ArrayLiteral",elements:getImports}}]),jsonFunction("s",setupImports,["__"])),variableInitialize.length&&exported.push(jsonFunction("v",variableInitialize)),newElements.push({type:"ReturnStatement",value:{type:"ObjectLiteral",properties:exported}}),{type:"ExpressionStatement",value:{type:"FunctionCall",name:{type:"Variable",name:moduleName},arguments:[{type:"StringLiteral",value:clone(arg.identifier)},{type:"Function",name:null,params:[],elements:newElements}]}}}}}}});
__m("Format",function(){function reset(){additional={},jsx=[]}function commentParse(tag,data){"jsx"==tag||additional[tag]?[].push.apply(additional[tag]||jsx,data):additional[tag]=data}function work(arg){return reset(),{code:f(arg).trim(),additional:additional,jsx:jsx}}var Node,eol,additional,jsx,f,types;return{e:{work:work},g:function(){return["Node"]},s:function(__){Node=__[0]},v:function(){eol="\n",f=function(arg){return types[arg.type]?types[arg.type](arg):(Node.fatalError("No formatter for type: "+arg.type,arg),void 0)},types={Program:function(arg){return arg.elements.map(f).join(eol)},Raw:function(arg){return arg.value},SpecialComment:function(arg){return commentParse(arg.tag,arg.value)||""},NumericLiteral:function(arg){return arg.value},UnaryExpression:function(arg){return arg.operator+" "+f(arg.expression)},BinaryExpression:function(arg){return f(arg.left)+" "+arg.operator+" "+f(arg.right)},ConditionalExpression:function(arg){return f(arg.condition)+" ? "+f(arg.trueExpression)+" : "+f(arg.falseExpression)},ParenthesizedExpression:function(arg){return"("+f(arg.value)+")"},VariableStatement:function(arg){return"var "+arg.declarations.map(f).join(", ")+";"},VariableDeclarations:function(arg){return"var "+arg.declarations.map(f).join(", ")},VariableDeclaration:function(arg){return arg.value?arg.name+" = "+f(arg.value):arg.name},FunctionCall:function(arg){return f(arg.name)+" ("+arg.arguments.map(f).join(", ")+")"},Function:function(arg){return"function"+(arg.name?" "+arg.name:"")+" ("+arg.params.join(",")+"){"+eol+arg.elements.map(f).join(eol)+eol+"}"},StringLiteral:function(arg){return JSON.stringify(arg.value)},BooleanLiteral:function(arg){return arg.value?"true":"false"},NullLiteral:function(arg){return"null"},Variable:function(arg){return arg.name},PropertyAccess:function(arg){return f(arg.base)+(arg.name.type?" ["+f(arg.name)+"]":"."+arg.name)},IfStatement:function(arg){return"if ("+f(arg.condition)+")"+eol+f(arg.ifStatement)+(arg.elseStatement?eol+"else"+eol+f(arg.elseStatement):"")},Block:function(arg){return"{"+eol+arg.statements.map(f).join(eol)+eol+"}"},ReturnStatement:function(arg){return arg.value?"return "+f(arg.value)+";":"return;"},EmptyStatement:function(arg){return";"},ExpressionStatement:function(arg){return f(arg.value)+";"},AssignmentExpression:function(arg){return f(arg.left)+" "+arg.operator+" "+f(arg.right)},PostfixExpression:function(arg){return f(arg.expression)+arg.operator},ArrayLiteral:function(arg){return"["+arg.elements.map(f).join(",")+"]"},ObjectLiteral:function(arg){return"{"+arg.properties.map(f).join(",")+"}"},RegularExpressionLiteral:function(arg){return"/"+arg.body+"/"+arg.flags},This:function(arg){return"this"},ThrowStatement:function(arg){return"throw "+f(arg.exception)+";"},ForStatement:function(arg){return"for ("+(arg.initializer?f(arg.initializer):"")+"; "+eol+(arg.test?f(arg.test):"")+"; "+(arg.counter?f(arg.counter):"")+")"+eol+f(arg.statement)},ForInStatement:function(arg){return"for ("+f(arg.iterator)+" in "+f(arg.collection)+")"+eol+f(arg.statement)},ForInStatementExt:function(arg){return"for ("+f(arg.iterator)+" in "+f(arg.collection)+"){"+eol+"var "+f(arg.value)+" = "+f(arg.collection)+"["+f(arg.iterator)+"];"+eol+("Block"==arg.statement.type?f(arg.statement).slice(1,-1).trim():f(arg.statement))+eol+"}"},WhileStatement:function(arg){return"while ("+f(arg.condition)+")"+eol+f(arg.statement)},DoWhileStatement:function(arg){return"do"+eol+f(arg.statement)+eol+" while ("+f(arg.condition)+");"},SwitchStatement:function(arg){return"switch ("+f(arg.expression)+"){"+eol+arg.clauses.map(f).join(eol)+eol+"}"},CaseClause:function(arg){return"case "+f(arg.selector)+":"+eol+arg.statements.map(f).join(eol)},DefaultClause:function(arg){return"default:"+arg.statements.map(function(arg){return f(arg)}).join(" ")},BreakStatement:function(arg){return arg.label?"break "+arg.label+";":"break;"},ContinueStatement:function(arg){return arg.label?"continue "+arg.label+";":"continue;"},TryStatement:function(arg){return"try"+("Block"==arg.block.type?f(arg.block):"{"+eol+f(arg.block)+eol+"}")+(arg["catch"]?f(arg["catch"]):"")+(arg["finally"]?f(arg["finally"]):"")+(arg["catch"]||arg["finally"]?"":"catch (e){}")},Catch:function(arg){return"catch ("+arg.identifier+")"+("Block"==arg.block.type?f(arg.block):"{"+eol+f(arg.block)+eol+"}")},Finally:function(arg){return"finally"+("Block"==arg.block.type?f(arg.block):"{"+eol+f(arg.block)+eol+"}")},PropertyAssignment:function(arg){return JSON.stringify(arg.name)+":"+f(arg.value)},NewOperator:function(arg){return"new "+f(arg.constructor)+"("+arg.arguments.map(f).join(", ")+")"},GetterDefinition:function(arg){return"get "+arg.name+" (){"+arg.body.map(f).join(eol)+"}"},SetterDefinition:function(arg){return"set "+arg.name+" ("+arg.param+"){"+arg.body.map(f).join(eol)+"}"},LabelledStatement:function(arg){return arg.label+":"+f(arg.statement)},WithStatement:function(arg){return"with ("+f(arg.environment)+"){"+eol+f(arg.statement)+eol+"}"},PhpLiteral:function(arg){return additional.php=!0,'/*!<? echo "*"."/"; include "'+arg.value+'"; echo "||/*" ?>*/ null'}}}}});
String.prototype.format.add("@",function(v,p){return v[p[0].toLowerCase().replace(/_[a-z]/g,function(arg){return arg[1].toUpperCase()})]}),String.prototype.format.add("$",function(v,p){return v[p[0]]});
__m("ModulesCode",function(){function get(additional){var target=additional.target&&additional.target.value,parts={root:/^web/.test(target)?"window":/^node$/.test(target)?"GLOBAL":/^local$/.test(target)?"0":'"u" != (typeof window)[0] && window || GLOBAL',end:"web:onload"==target?"'u' != (typeof window)[0] && 'u' != (typeof document)[0] && !/loaded|complete/.test(document.readyState) ? window.addEventListener('load', __m) : __m()":"__m()",main:additional.modulesPublic?'if (m){ s [i] = m (); } else if (typeof i == \'string\'){ if (!w) throw "Not initialized yet!"; return s [i].e; } else if (!w){ for (i in s) if (G (i).g) G (i).s (G (i).g ().map (function (i){ return G ("@" == i [0] ? i.slice (1) : i).e || {} })); for (i in s) I (i); w = true; }':'if (m){ s [i] = m (); } else { for (i in s) if (G (i).g) G (i).s (G (i).g ().map (function (i){ return G ("@" == i [0] ? i.slice (1) : i).e || {} })); for (i in s) I (i); {0} }',mainHelper:additional.modulesPublic?", w = 0":""};return parts.rootExists="0"!=parts.root?"root.":"",parts.local="0"!=parts.root?"":"var __m;",parts.main=parts.main.format("0"!=parts.root?"delete root.__m":""),{begin:Compressor.max('{0:@(LOCAL)}!function () { var s = {}, root = {0:@(ROOT)}{0:@(MAIN_HELPER)}; function G (i) { if (s [i]) return s [i]; throw "Not found: " + i; } function I (i) { var m = G (i); if (!m._d){ m._a = 1; if (m.g) m.g ().forEach (function (other){ if ("@" != other [0]) { if (G (other)._a) throw "Cycle: " + i + ", " + other; if (!G (other)._d) I (other); } }); if (m.v) m.v (); if (m.i) m.i (); m._d = 1; delete m._a; } } {0:@(ROOT_EXISTS)}__m = function (i, m) { {0:@(MAIN)} } }();'.format(parts)),end:Compressor.max("{0:@(END)}".format(parts))}}var Compressor;return{e:{get:get},g:function(){return["Compressor"]},s:function(__){Compressor=__[0]}}});
__m("Parser",function(){function work(code,filename){try{return parser.parse(code)}catch(e){Node.fatalError('Error while parsing "{0}": {1}'.format(filename,e),e.stack)}}function init(){Node.fs().existsSync(builded)||Node.fatalError("Parser not found.");try{parser=require(builded)}catch(e){}parser&&"function"==typeof parser.parse||Node.fatalError("Parser is broken.")}var Node,Compressor,builded,parser;return{e:{work:work},i:init,g:function(){return["Node","Compressor"]},s:function(__){Node=__[0],Compressor=__[1]},v:function(){builded=Node.resolve("js-ext.parser")}}});
__m("Prework",function(){function work(code){return"#!"==code.substr(0,2)?{code:code.substr(code.indexOf("\n")+1),node:!0}:{code:code}}return{e:{work:work}}});

__m();