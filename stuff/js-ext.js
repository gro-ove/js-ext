#!/usr/bin/env node
(function (){ var s = {}, root = GLOBAL; function G (i) { if (s [i]) return s [i]; throw "Not found: " + i; } function I (i) { var m = G (i); if (!m._d){ m._a = 1; if (m.g) m.g ().forEach (function (other){ if ("@" != other [0]) { if (G (other)._a) throw "Cycle: " + i + ", " + other; if (!G (other)._d) I (other); } }); if (m.v) m.v (); if (m.i) m.i (); m._d = 1; delete m._a; } } root.__m = function (i, m) { if (m){ s [i] = m (); } else { for (i in s) if (G (i).g) G (i).s (G (i).g ().map (function (i){ return G ("@" == i [0] ? i.slice (1) : i).e || {} })); for (i in s) I (i); delete root.__m } } })();
Object.extend = function (){
var result = {};
for (var i = 0; 
i < arguments.length; i++)
for (n in arguments [i])
{
if (result.__lookupGetter__ (n) || result.__lookupSetter__ (n))
delete result [n];
result [n] = arguments [i] [n];
var getter = arguments [i].__lookupGetter__ (n);
if (getter)
result.__defineGetter__ (n, getter);
var setter = arguments [i].__lookupSetter__ (n);
if (setter)
result.__defineSetter__ (n, setter);
}
return result;
};
(function (st){
st.format = function (){
if (arguments.length == 0)
return this;
var placeholder = /\{(\d+)(?:,([-+]?\d+))?(?:\:([^(^}]+)(?:\(((?:\\\)|[^)])+)\)){0,1}){0,1}\}/g;
var args = arguments;
return this.replace (placeholder, function (m,num,len,f,params){
m = args [Number (num)];
f = formatters [f];
return fl (f == null ? m : f (m, pp ((params || "").replace (/\\\)/g, ")").replace (/\\,/g, "\u0000").split (","), args)), len);
});
};
String.format = function (format){
return arguments.length <= 1 ? format : st.format.apply (format, Array.prototype.slice.call (arguments, 1));
};
st.format.add = function (name,func,replace){
if (formatters [name] != null && ! replace)
throw "Format " + name + " exist, use replace=true for replace";
formatters [name] = func;
};
String.format.init = st.format.init = function (param){
var f;
for (n in param)
{
f = formatters [n];
if (f != null && f.init != null)
f.init (param [n]);
}
};
st.format.get = function (name){
return formatters [name];
};
var paramph = /^\{(\d+)\}$/;
var formatters = {};
var sp = "    ";
function pp (params,args){
var r;
for (var i = 0; 
i < params.length; i++)
{
if ((r = paramph.exec (params [i])) != null)
params [i] = args [Number (r [1])];
else
params [i] = params [i].replace (/\0/g, ",");
}
return params;
}
function fl (s,len){
len = Number (len);
if (isNaN (len))
return s;
s = "" + s;
var nl = Math.abs (len) - s.length;
if (nl <= 0)
return s;
while (sp.length < nl)
sp += sp;
return len < 0 ? (s + sp.substring (0, nl)) : (sp.substring (0, nl) + s);
}
st.format.add ("arr", function arr (va,params){
if (va == null)
return "null";
var v = [];
var j = params.shift () || "";
var f = formatters [params.shift ()];
if (f == null)
v = va;
else
for (var i = 0; 
i < va.length; i++)
v.push (f (va [i], params));
return v.join (j);
});
st.format.add ("obj", function (v,params){
return v [params];
});
}) (String.prototype);
String.prototype.format.add ("@", function (v,p){
return v [p [0].toLowerCase ().replace (/_[a-z]/g, function (arg){
return arg [1].toUpperCase ();
})];
});
String.prototype.format.add ("$", function (v,p){
return v [p [0]];
});
__m ("Node", function (){
var optimist, argv, installCmd;
var fs, cp, path;
function fatalError (msg){
var temp = [];
for (var i = 0; 
i < arguments.length; i++)
{
if (i)
temp.push ("\n");
temp.push (arguments [i]);
}
console.error.apply (console, temp);
process.exit (1);
}
function safeAccess (what,purpose){
if (purpose === undefined)
purpose = "work";
var cache;
return function (arg){
try{
return cache || (cache = require (what));
}catch (e){
fatalError ("Please, install \"{0}\" for {1}.".format (what, purpose), "> " + installCmd.format ({"dirname":__dirname,"name":what}));
}
};
}
function setInstallCmd (cmd){
installCmd = cmd;
}
function args (usage,args){
if (usage && args)
{
var result = optimist ().usage (usage);
for (n in args)
result = result.options (n, args [n]);
argv = result.argv;
}
return argv;
}
function showHelp (){
optimist ().showHelp ();
}
function readFile (file){
return fs ().readFileSync (file, "utf-8");
}
function writeFile (file,content){
return fs ().writeFileSync (file, content, "utf-8");
}
function resolve (name){
return path ().resolve (__dirname, name);
}
return {"e":{get fs (){return fs;},get cp (){return cp;},get path (){return path;},"fatalError":fatalError,"safeAccess":safeAccess,"setInstallCmd":setInstallCmd,"args":args,"showHelp":showHelp,"readFile":readFile,"writeFile":writeFile,"resolve":resolve},"v":function (){
optimist = safeAccess ("optimist", "correct interact in shell");
installCmd = "cd \"{0:@(DIRNAME)}\" && npm install {0:@(NAME)}";
fs = safeAccess ("fs");
cp = safeAccess ("child_process");
path = safeAccess ("path");
}};
});
__m ("App", function (){
var Node, Prework, Parser, Converter, Format, Compressor, ModulesCode, Cacher;
var inputFile, outputFile, cacheFolder, argPhpHeader, includesFolder, debugFolder, silenceMode;
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
var childs = [], result = {"code":formatted.code,"additional":formatted.additional,"modules":converted.modules,"lessParams":converted.lessParams,"hypParams":converted.hypParams}, compress = true;
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
result.push ("String.prototype.less=function (a,r){r=this;for(var n in a)r=r.replace(new RegExp('@'+n.replace(/([a-z])([A-Z])/g,'$1_$2').toUpperCase()+'([^A-Z0-9_])','g'),a[n]+'$1');return r}");
result.push (data.code);
if (modules)
result.push (modules.end);
if (data.additional.isolate)
result.push ("\n})()");
var code = result.join ("\n");
if (data.additional.defines)
{ var _7psgot0_35 = data.additional.defines; for (i in _7psgot0_35){
var v = _7psgot0_35[i];
code = code.split (v.what).join (v.by);
}}
return {"file":outputFile || getOutputFile (inputFile, data.additional.buildTo && data.additional.buildTo.value, data.additional.php && argPhpHeader),"code":code};
}
function init (){
Node.setInstallCmd ("js-ext -i {0:@(NAME)}");
fibers () (function (arg){
Node.args ("Usage: js-ext file [flags]", {"p":{"alias":"php-header","description":"Use php header if nessesary."},"o":{"alias":"output","description":"Output file (else automode) or \":stdout\"."},"c":{"alias":"cache","description":"Cache folder (else default) or \":no\"."},"i":{"alias":"install","description":"Install missing part."},"g":{"alias":"gcc","description":"Use Google Closure Compiler for better compression and perfomance."},"e":{"alias":"expanded","description":"Prevent any compressing."},"u":{"alias":"usage","description":"This text."}});
try{
var arg = Node.args ()._ [0];
inputFile = Node.path ().resolve (arg [0] == "\"" ? arg.slice (1, - 1) : arg);
}catch (e){}
if (Node.args ().e)
Compressor.disable ();
else
if (Node.args ().g)
Compressor.useClosure ();
if (Node.args ().i)
{
var cmd = Node.cp ().spawn ("cmd", ["/C","cd","/d",__dirname,"&&","npm","install","2>&1",Node.args ().i]);
cmd.stdout.on ("data", function (arg){
return process.stdout.write (arg.toString ());
});
cmd.on ("close", function (arg){
return console.log ("NPM's job done" + (arg ? "(with {0} as result).".format (arg) : "."));
});
}
else
if (Node.args ().u || ! inputFile)
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
debugFolder = asFolder (Node.resolve ("debug"));
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
return {"e":{get inputFile (){return inputFile;},get outputFile (){return outputFile;},get cacheFolder (){return cacheFolder;},get argPhpHeader (){return argPhpHeader;},get includesFolder (){return includesFolder;},get debugFolder (){return debugFolder;},get silenceMode (){return silenceMode;}},"i":init,"g":function (){
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
__m ("Md5", function (){
function hex (s){
return hex_md5 (s);
}
function b64 (s){
return b64_md5 (s);
}
function any (s){
return any_md5 (s);
}
var hexcase;
var b64pad;
function hex_md5 (s){
return rstr2hex (rstr_md5 (str2rstr_utf8 (s)));
}
function b64_md5 (s){
return rstr2b64 (rstr_md5 (str2rstr_utf8 (s)));
}
function any_md5 (s,e){
return rstr2any (rstr_md5 (str2rstr_utf8 (s)), e);
}
function hex_hmac_md5 (k,d){
return rstr2hex (rstr_hmac_md5 (str2rstr_utf8 (k), str2rstr_utf8 (d)));
}
function b64_hmac_md5 (k,d){
return rstr2b64 (rstr_hmac_md5 (str2rstr_utf8 (k), str2rstr_utf8 (d)));
}
function any_hmac_md5 (k,d,e){
return rstr2any (rstr_hmac_md5 (str2rstr_utf8 (k), str2rstr_utf8 (d)), e);
}
function md5_vm_test (){
return hex_md5 ("abc").toLowerCase () == "900150983cd24fb0d6963f7d28e17f72";
}
function rstr_md5 (s){
return binl2rstr (binl_md5 (rstr2binl (s), s.length * 8));
}
function rstr_hmac_md5 (key,data){
var bkey = rstr2binl (key);
if (bkey.length > 16)
bkey = binl_md5 (bkey, key.length * 8);
var ipad = Array (16), opad = Array (16);
for (var i = 0; 
i < 16; i++)
{
ipad [i] = bkey [i] ^ 909522486;
opad [i] = bkey [i] ^ 1549556828;
}
var hash = binl_md5 (ipad.concat (rstr2binl (data)), 512 + data.length * 8);
return binl2rstr (binl_md5 (opad.concat (hash), 512 + 128));
}
function rstr2hex (input){
try{
hexcase;
}catch (e){
hexcase = 0;
}
var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
var output = "";
var x;
for (var i = 0; 
i < input.length; i++)
{
x = input.charCodeAt (i);
output += hex_tab.charAt ((x >>> 4) & 15) + hex_tab.charAt (x & 15);
}
return output;
}
function rstr2b64 (input){
try{
b64pad;
}catch (e){
b64pad = "";
}
var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var output = "";
var len = input.length;
for (var i = 0; 
i < len; i += 3)
{
var triplet = (input.charCodeAt (i) << 16) | (i + 1 < len ? input.charCodeAt (i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt (i + 2) : 0);
for (var j = 0; 
j < 4; j++)
{
if (i * 8 + j * 6 > input.length * 8)
output += b64pad;
else
output += tab.charAt ((triplet >>> 6 * (3 - j)) & 63);
}
}
return output;
}
function rstr2any (input,encoding){
var divisor = encoding.length;
var i, j, q, x, quotient;
var dividend = Array (Math.ceil (input.length / 2));
for (i = 0; 
i < dividend.length; i++)
{
dividend [i] = (input.charCodeAt (i * 2) << 8) | input.charCodeAt (i * 2 + 1);
}
var full_length = Math.ceil (input.length * 8 / (Math.log (encoding.length) / Math.log (2)));
var remainders = Array (full_length);
for (j = 0; 
j < full_length; j++)
{
quotient = Array ();
x = 0;
for (i = 0; 
i < dividend.length; i++)
{
x = (x << 16) + dividend [i];
q = Math.floor (x / divisor);
x -= q * divisor;
if (quotient.length > 0 || q > 0)
quotient [quotient.length] = q;
}
remainders [j] = x;
dividend = quotient;
}
var output = "";
for (i = remainders.length - 1; 
i >= 0; i--)
output += encoding.charAt (remainders [i]);
return output;
}
function str2rstr_utf8 (input){
var output = "";
var i = - 1;
var x, y;
while (++ i < input.length)
{
x = input.charCodeAt (i);
y = i + 1 < input.length ? input.charCodeAt (i + 1) : 0;
if (55296 <= x && x <= 56319 && 56320 <= y && y <= 57343)
{
x = 65536 + ((x & 1023) << 10) + (y & 1023);
i++;
}
if (x <= 127)
output += String.fromCharCode (x);
else
if (x <= 2047)
output += String.fromCharCode (192 | ((x >>> 6) & 31), 128 | (x & 63));
else
if (x <= 65535)
output += String.fromCharCode (224 | ((x >>> 12) & 15), 128 | ((x >>> 6) & 63), 128 | (x & 63));
else
if (x <= 2097151)
output += String.fromCharCode (240 | ((x >>> 18) & 7), 128 | ((x >>> 12) & 63), 128 | ((x >>> 6) & 63), 128 | (x & 63));
}
return output;
}
function str2rstr_utf16le (input){
var output = "";
for (var i = 0; 
i < input.length; i++)
output += String.fromCharCode (input.charCodeAt (i) & 255, (input.charCodeAt (i) >>> 8) & 255);
return output;
}
function str2rstr_utf16be (input){
var output = "";
for (var i = 0; 
i < input.length; i++)
output += String.fromCharCode ((input.charCodeAt (i) >>> 8) & 255, input.charCodeAt (i) & 255);
return output;
}
function rstr2binl (input){
var output = Array (input.length >> 2);
for (var i = 0; 
i < output.length; i++)
output [i] = 0;
for (var i = 0; 
i < input.length * 8; i += 8)
output [i >> 5] |= (input.charCodeAt (i / 8) & 255) << (i % 32);
return output;
}
function binl2rstr (input){
var output = "";
for (var i = 0; 
i < input.length * 32; i += 8)
output += String.fromCharCode ((input [i >> 5] >>> (i % 32)) & 255);
return output;
}
function binl_md5 (x,len){
x [len >> 5] |= 128 << ((len) % 32);
x [(((len + 64) >>> 9) << 4) + 14] = len;
var a = 1732584193;
var b = - 271733879;
var c = - 1732584194;
var d = 271733878;
for (var i = 0; 
i < x.length; i += 16)
{
var olda = a;
var oldb = b;
var oldc = c;
var oldd = d;
a = md5_ff (a, b, c, d, x [i + 0], 7, - 680876936);
d = md5_ff (d, a, b, c, x [i + 1], 12, - 389564586);
c = md5_ff (c, d, a, b, x [i + 2], 17, 606105819);
b = md5_ff (b, c, d, a, x [i + 3], 22, - 1044525330);
a = md5_ff (a, b, c, d, x [i + 4], 7, - 176418897);
d = md5_ff (d, a, b, c, x [i + 5], 12, 1200080426);
c = md5_ff (c, d, a, b, x [i + 6], 17, - 1473231341);
b = md5_ff (b, c, d, a, x [i + 7], 22, - 45705983);
a = md5_ff (a, b, c, d, x [i + 8], 7, 1770035416);
d = md5_ff (d, a, b, c, x [i + 9], 12, - 1958414417);
c = md5_ff (c, d, a, b, x [i + 10], 17, - 42063);
b = md5_ff (b, c, d, a, x [i + 11], 22, - 1990404162);
a = md5_ff (a, b, c, d, x [i + 12], 7, 1804603682);
d = md5_ff (d, a, b, c, x [i + 13], 12, - 40341101);
c = md5_ff (c, d, a, b, x [i + 14], 17, - 1502002290);
b = md5_ff (b, c, d, a, x [i + 15], 22, 1236535329);
a = md5_gg (a, b, c, d, x [i + 1], 5, - 165796510);
d = md5_gg (d, a, b, c, x [i + 6], 9, - 1069501632);
c = md5_gg (c, d, a, b, x [i + 11], 14, 643717713);
b = md5_gg (b, c, d, a, x [i + 0], 20, - 373897302);
a = md5_gg (a, b, c, d, x [i + 5], 5, - 701558691);
d = md5_gg (d, a, b, c, x [i + 10], 9, 38016083);
c = md5_gg (c, d, a, b, x [i + 15], 14, - 660478335);
b = md5_gg (b, c, d, a, x [i + 4], 20, - 405537848);
a = md5_gg (a, b, c, d, x [i + 9], 5, 568446438);
d = md5_gg (d, a, b, c, x [i + 14], 9, - 1019803690);
c = md5_gg (c, d, a, b, x [i + 3], 14, - 187363961);
b = md5_gg (b, c, d, a, x [i + 8], 20, 1163531501);
a = md5_gg (a, b, c, d, x [i + 13], 5, - 1444681467);
d = md5_gg (d, a, b, c, x [i + 2], 9, - 51403784);
c = md5_gg (c, d, a, b, x [i + 7], 14, 1735328473);
b = md5_gg (b, c, d, a, x [i + 12], 20, - 1926607734);
a = md5_hh (a, b, c, d, x [i + 5], 4, - 378558);
d = md5_hh (d, a, b, c, x [i + 8], 11, - 2022574463);
c = md5_hh (c, d, a, b, x [i + 11], 16, 1839030562);
b = md5_hh (b, c, d, a, x [i + 14], 23, - 35309556);
a = md5_hh (a, b, c, d, x [i + 1], 4, - 1530992060);
d = md5_hh (d, a, b, c, x [i + 4], 11, 1272893353);
c = md5_hh (c, d, a, b, x [i + 7], 16, - 155497632);
b = md5_hh (b, c, d, a, x [i + 10], 23, - 1094730640);
a = md5_hh (a, b, c, d, x [i + 13], 4, 681279174);
d = md5_hh (d, a, b, c, x [i + 0], 11, - 358537222);
c = md5_hh (c, d, a, b, x [i + 3], 16, - 722521979);
b = md5_hh (b, c, d, a, x [i + 6], 23, 76029189);
a = md5_hh (a, b, c, d, x [i + 9], 4, - 640364487);
d = md5_hh (d, a, b, c, x [i + 12], 11, - 421815835);
c = md5_hh (c, d, a, b, x [i + 15], 16, 530742520);
b = md5_hh (b, c, d, a, x [i + 2], 23, - 995338651);
a = md5_ii (a, b, c, d, x [i + 0], 6, - 198630844);
d = md5_ii (d, a, b, c, x [i + 7], 10, 1126891415);
c = md5_ii (c, d, a, b, x [i + 14], 15, - 1416354905);
b = md5_ii (b, c, d, a, x [i + 5], 21, - 57434055);
a = md5_ii (a, b, c, d, x [i + 12], 6, 1700485571);
d = md5_ii (d, a, b, c, x [i + 3], 10, - 1894986606);
c = md5_ii (c, d, a, b, x [i + 10], 15, - 1051523);
b = md5_ii (b, c, d, a, x [i + 1], 21, - 2054922799);
a = md5_ii (a, b, c, d, x [i + 8], 6, 1873313359);
d = md5_ii (d, a, b, c, x [i + 15], 10, - 30611744);
c = md5_ii (c, d, a, b, x [i + 6], 15, - 1560198380);
b = md5_ii (b, c, d, a, x [i + 13], 21, 1309151649);
a = md5_ii (a, b, c, d, x [i + 4], 6, - 145523070);
d = md5_ii (d, a, b, c, x [i + 11], 10, - 1120210379);
c = md5_ii (c, d, a, b, x [i + 2], 15, 718787259);
b = md5_ii (b, c, d, a, x [i + 9], 21, - 343485551);
a = safe_add (a, olda);
b = safe_add (b, oldb);
c = safe_add (c, oldc);
d = safe_add (d, oldd);
}
return Array (a, b, c, d);
}
function md5_cmn (q,a,b,x,s,t){
return safe_add (bit_rol (safe_add (safe_add (a, q), safe_add (x, t)), s), b);
}
function md5_ff (a,b,c,d,x,s,t){
return md5_cmn ((b & c) | ((~ b) & d), a, b, x, s, t);
}
function md5_gg (a,b,c,d,x,s,t){
return md5_cmn ((b & d) | (c & (~ d)), a, b, x, s, t);
}
function md5_hh (a,b,c,d,x,s,t){
return md5_cmn (b ^ c ^ d, a, b, x, s, t);
}
function md5_ii (a,b,c,d,x,s,t){
return md5_cmn (c ^ (b | (~ d)), a, b, x, s, t);
}
function safe_add (x,y){
var lsw = (x & 65535) + (y & 65535);
var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
return (msw << 16) | (lsw & 65535);
}
function bit_rol (num,cnt){
return (num << cnt) | (num >>> (32 - cnt));
}
return {"e":{"hex":hex,"b64":b64,"any":any},"v":function (){
hexcase = 0;
b64pad = "";
}};
});
__m ("Cacher", function (){
var App, Node, Md5;
var jsextMark;
function getCacheFile (file){
return Node.path ().resolve (App.cacheFolder, Md5.hex (file));
}
function getFileMark (file){
var stats = Node.fs ().statSync (file);
return [jsextMark || "",+ stats.mtime,stats.size].join ("");
}
function load (file){
if (App.cacheFolder)
try{
var cacheFile = getCacheFile (file);
if (Node.fs ().existsSync (cacheFile))
{
var data = JSON.parse (Node.readFile (cacheFile));
if (data.mark == getFileMark (file))
return data.content;
}
}catch (e){}
}
function save (file,data){
if (App.cacheFolder)
Node.writeFile (getCacheFile (file), JSON.stringify ({"mark":getFileMark (file),"content":data}));
}
return {"e":{"load":load,"save":save},"g":function (){
return ["@App","Node","Md5"];
},"s":function (__){
App = __ [0];
Node = __ [1];
Md5 = __ [2];
},"v":function (){
jsextMark = getFileMark (__filename);
}};
});
__m ("Compressor", function (){
var Node, App;
var yui, closure, fibers, disabled, closured, debug;
function compressError (e){
if (debug)
{
Node.writeFile (Node.path ().resolve (App.debugFolder, "compress-error.js"), code);
console.error ("Saved at: \"" + Node.path ().resolve (App.cacheFolder, "compress-error.js") + "\".");
}
else
console.error (code);
Node.fatalError ("Compress error: {0}.".format (e), code);
}
function closureWork (code,filename){
var fiber = fibers ().current, result = code;
try{
closure ().compile (code, {}, function (error,data,extra){
if (error)
{
compressError (error, code);
}
else
{
if (! App.silenceMode && extra)
console.log (extra);
result = data.trim ();
}
fiber.run ();
});
fibers ().yield ();
}catch (e){
Node.fatalError ("Compress error: {0} (please, check your JRE).".format (e));
}
return result;
}
function yuiWork (code,filename){
var fiber = fibers ().current, result = code;
try{
yui ().compress (code, {"charset":"utf8","type":"js","line-break":200}, function (error,data,extra){
if (error)
{
compressError (error, code);
}
else
{
if (! App.silenceMode && extra)
console.log (extra);
result = data.trim ();
}
fiber.run ();
});
fibers ().yield ();
}catch (e){
Node.fatalError ("Compress error: {0} (please, check your JRE).".format (e));
}
return result;
}
function work (code,filename){
if (disabled)
return code;
else
if (closured)
return closureWork (code, filename);
else
return yuiWork (code, filename);
}
function disable (){
disabled = true;
}
function useClosure (){
closured = true;
}
return {"e":{"work":work,"disable":disable,"useClosure":useClosure},"g":function (){
return ["Node","@App"];
},"s":function (__){
Node = __ [0];
App = __ [1];
},"v":function (){
yui = Node.safeAccess ("yuicompressor", "js compression");
closure = Node.safeAccess ("closure-compiler", "deep js compression");
fibers = Node.safeAccess ("fibers", "js compression");
disabled = false;
closured = false;
debug = true;
}};
});
__m ("Converter", function (){
var Node;
var moduleName, minimize, less, fibers, hypher, minimizeInstance, modules, lessParams, hypParams;
function jsonFunction (name,content,params){
if (params === undefined)
params = [];
return {"type":"PropertyAssignment","name":name,"value":{"type":"Function","name":null,"params":params,"elements":content}};
}
var types;
function clone (obj){
if (typeof obj !== "object" || ! obj)
{
return obj;
}
else
if (obj.indexOf)
{
var r = [];
for (var i = 0; 
i < obj.length; i++)
r.push (clone (obj [i]));
return r;
}
else
if (types [obj.type])
{
return types [obj.type] (obj);
}
else
{
var r = {};
for (n in obj)
r [n] = clone (obj [n]);
return r;
}
}
function work (parsed){
modules = false;
lessParams = false;
hypParams = false;
return {"tree":clone (parsed),"modules":! ! modules,"lessParams":! ! lessParams,"hypParams":! ! hypParams};
}
function finish (file){
for (key in shameOnMeDogNail){
var value = shameOnMeDogNail[key];
var valueString = value ();
if (! valueString)
return null;
file = file.replace (key, valueString);
}
return file;
}
return {"e":{"work":work,"finish":finish},"g":function (){
return ["Node"];
},"s":function (__){
Node = __ [0];
},"v":function (){
moduleName = "__m";
minimize = Node.safeAccess ("minimize", "compress html");
less = Node.safeAccess ("less", "converting less to css");
fibers = Node.safeAccess ("fibers", "converting less to css");
hypher = Node.safeAccess ("hypher");
types = {"Function":function (arg){
var initialize = [];
return {"type":"Function","name":arg.name,"exportFlag":arg.exportFlag,"params":arg.params.map (function (arg){
if (arg && arg.type == "IdentifierWithDefault")
{
initialize.push ({"type":"IfStatement","condition":{"type":"BinaryExpression","operator":"===","left":{"type":"Variable","name":arg.identifier},"right":{"type":"Variable","name":"undefined"}},"ifStatement":{"type":"ExpressionStatement","value":{"type":"AssignmentExpression","operator":"=","left":{"type":"Variable","name":arg.identifier},"right":clone (arg.value)}},"elseStatement":null});
return arg.identifier;
}
else
return arg;
}),"elements":initialize.length ? initialize.concat (clone (arg.elements)) : clone (arg.elements)};
},"Lambda":function (arg){
return types.Function ({"type":"Function","name":null,"params":arg.params.length == 0 ? ["arg"] : arg.params,"elements":arg.element.type == "Block" ? arg.element.statements : [arg.element.type == "ExpressionStatement" ? {"type":"ReturnStatement","value":clone (arg.element.value)} : arg.element]});
},"StringLiteral":function (arg,file){
var result;
function parseLess (data){
var fiber = fibers ().current, result;
try{
new (less ().Parser)({"paths":[Node.path ().dirname (file),Node.resolve ("includes")],"filename":file}).parse ("@import \"__js_ext_utils.less\";\n" + data, function (e,tree){
if (e)
Node.fatalError ("Error at LESS parsing:", e);
result = tree.toCSS ({"compress":true});
fiber.run ();
});
}catch (e){
Node.fatalError ("Error at LESS parsing: ", e);
}
fibers ().yield ();
return result;
}
switch ((arg.special || "").match (/^[a-z]*/) [0]){
case "h":
var a = arg.value.replace (/<([a-z]+)(\s[^>]+?)?\s*\/>/g, "<$1$2></$1>");
if (! minimizeInstance)
minimizeInstance = new (minimize ())({"empty":true,"cdata":true,"comments":false,"spare":true,"quotes":true});
minimizeInstance.parse (a, function (error,data){
return result = data;
});
break;
case "c":
result = arg.value.replace (/\s+/g, " ").replace (/\s*([{};:])\s*/g, "$1").trim ();
break;
case "s":
result = arg.value.replace (/\s+/g, " ").trim ();
break;
case "l":
result = parseLess (arg.value);
break;
case "lp":
var variables = {}, raw = arg.value;
lessParams = true;
var generators = {"def":function (arg){
return (1 + Math.random ()) * 10000 | 0;
},"size":function (arg){
return this.def () + "px";
},"radius":function (arg){
return this.size ();
},"per":function (arg){
return this.def () + "%";
},"time":function (arg){
return this.def () + "s";
},"color":function (arg){
return "#" + (Math.random () * 15728639 + 1048576 | 0).toString (16);
},"text":function (arg){
return "\"" + (Math.random () * 1000000000000000000).toString (32) + "\"";
},"font":function (arg){
return this.text ();
}};
result = parseLess (raw.replace (/@([A-Z0-9_]+?)(?:_([A-Z]+))?([^A-Z0-9_])/g, function (match,name,type,postfix){
var key = "@" + name + (type ? "_" + type : ""), value = variables [key];
if (! value)
{
var generator = generators [type] || generators.def;
do
{
value = generator ();
}
 while (raw.indexOf (value) != - 1);
variables [key] = value;
}
return value + postfix;
}));
for (name in variables){
var value = variables[name];
result = result.split (value).join (name);
}
break;
case "hyp":
result = new (hypher ())(Node.safeAccess ("hyphenation." + ((arg.special.match (/-[a-z]+/) || "") [0] || "en-us")) ()).hyphenateText (arg.value.replace (/(\|+)/g, "|$1"));
hypParams = true;
break;
default:result = arg.value;
}
return {"type":"StringLiteral","value":result};
},"Module":function (arg){
modules = true;
var getImports = [], setupImports = [], exported = [], variableInitialize = [], newElements = [], hasInit = false;
for (var i = 0; 
i < arg.elements.length; i++)
{
var e = arg.elements [i];
if (e.type === "ImportStatement")
{
newElements.push ({"type":"VariableStatement","declarations":(function (arg){
for (var k = 0; 
k < arg.length; k++)
{
var clear = arg [k] [0] === "@" ? arg [k].slice (1) : arg [k];
getImports.push ({"type":"StringLiteral","value":arg [k]});
setupImports.push ({"type":"ExpressionStatement","value":{"type":"AssignmentExpression","operator":"=","left":{"type":"Variable","name":clear},"right":{"type":"PropertyAccess","base":{"type":"Variable","name":"__"},"name":{"type":"NumericLiteral","value":setupImports.length}}}});
arg [k] = {"type":"VariableDeclaration","name":clear,"value":null};
}
return arg;
}) (clone (e.declarations))});
}
else
{
var newE = clone (e);
if (newE.type == "Function" && newE.name == "init")
hasInit = true;
else
if (newE.type === "Function" && newE.exportFlag)
exported.push ({"type":"PropertyAssignment","name":newE.name,"value":{"type":"Variable","name":newE.name}});
else
if (newE.type === "VariableStatement")
for (var k = 0; 
k < newE.declarations.length; k++)
{
if (newE.exportFlag)
exported.push ({"type":"GetterDefinition","name":newE.declarations [k].name,"body":[{"type":"ReturnStatement","value":{"type":"Variable","name":newE.declarations [k].name}}]});
if (newE.declarations [k].value !== null)
{
variableInitialize.push ({"type":"ExpressionStatement","value":{"type":"AssignmentExpression","operator":"=","left":{"type":"Variable","name":newE.declarations [k].name},"right":clone (newE.declarations [k].value)}});
newE.declarations [k].value = null;
}
}
newElements.push (newE);
}
}
exported = exported.length ? [{"type":"PropertyAssignment","name":"e","value":{"type":"ObjectLiteral","properties":exported}}] : [];
if (hasInit)
exported.push ({"type":"PropertyAssignment","name":"i","value":{"type":"Variable","name":"init"}});
if (getImports.length)
exported.push (jsonFunction ("g", [{"type":"ReturnStatement","value":{"type":"ArrayLiteral","elements":getImports}}]), jsonFunction ("s", setupImports, ["__"]));
if (variableInitialize.length)
exported.push (jsonFunction ("v", variableInitialize));
newElements.push ({"type":"ReturnStatement","value":{"type":"ObjectLiteral","properties":exported}});
return {"type":"ExpressionStatement","value":{"type":"FunctionCall","name":{"type":"Variable","name":moduleName},"arguments":[{"type":"StringLiteral","value":clone (arg.identifier)},{"type":"Function","name":null,"params":[],"elements":newElements}]}};
}};
}};
});
__m ("Format", function (){
var Node;
var eol;
var additional, jsx;
function reset (){
additional = {};
jsx = [];
}
function commentParse (tag,data){
if (tag == "jsx" || additional [tag])
{
[].push.apply (additional [tag] || jsx, data);
}
else
additional [tag] = data;
}
var previous, randomName;
var f;
var types;
function work (arg){
reset ();
return {"code":f (arg).trim (),"additional":additional,"jsx":jsx};
}
return {"e":{"work":work},"g":function (){
return ["Node"];
},"s":function (__){
Node = __ [0];
},"v":function (){
eol = "\n";
previous = + new Date() % 100;
randomName = function (arg){
return "_" + Math.round (Math.random () * 10000000000).toString (32) + "_" + previous++;
};
f = function (arg){
if (! types [arg.type])
Node.fatalError ("No formatter for type: " + arg.type, arg);
else
return types [arg.type] (arg);
};
types = {"Program":function (arg){
return arg.elements.map (f).join (eol);
},"Raw":function (arg){
return arg.value;
},"SpecialComment":function (arg){
return commentParse (arg.tag, arg.value) || "";
},"NumericLiteral":function (arg){
return arg.value;
},"UnaryExpression":function (arg){
return arg.operator + " " + f (arg.expression);
},"BinaryExpression":function (arg){
return f (arg.left) + " " + arg.operator + " " + f (arg.right);
},"ConditionalExpression":function (arg){
return f (arg.condition) + " ? " + f (arg.trueExpression) + " : " + f (arg.falseExpression);
},"ParenthesizedExpression":function (arg){
return "(" + f (arg.value) + ")";
},"VariableStatement":function (arg){
return "var " + arg.declarations.map (f).join (", ") + ";";
},"VariableDeclarations":function (arg){
return "var " + arg.declarations.map (f).join (", ");
},"VariableDeclaration":function (arg){
return arg.value ? arg.name + " = " + f (arg.value) : arg.name;
},"FunctionCall":function (arg){
return f (arg.name) + " (" + arg.arguments.map (f).join (", ") + ")";
},"Function":function (arg){
return "function" + (arg.name ? " " + arg.name : "") + " (" + arg.params.join (",") + "){" + eol + arg.elements.map (f).join (eol) + eol + "}";
},"StringLiteral":function (arg){
return JSON.stringify (arg.value);
},"BooleanLiteral":function (arg){
return arg.value ? "true" : "false";
},"NullLiteral":function (arg){
return "null";
},"Variable":function (arg){
return arg.name;
},"PropertyAccess":function (arg){
return f (arg.base) + (arg.name.type ? " [" + f (arg.name) + "]" : "." + arg.name);
},"IfStatement":function (arg){
return "if (" + f (arg.condition) + ")" + eol + f (arg.ifStatement) + (arg.elseStatement ? eol + "else" + eol + f (arg.elseStatement) : "");
},"Block":function (arg){
return "{" + eol + arg.statements.map (f).join (eol) + eol + "}";
},"ReturnStatement":function (arg){
return arg.value ? "return " + f (arg.value) + ";" : "return;";
},"EmptyStatement":function (arg){
return ";";
},"ExpressionStatement":function (arg){
return f (arg.value) + ";";
},"AssignmentExpression":function (arg){
return f (arg.left) + " " + arg.operator + " " + f (arg.right);
},"PostfixExpression":function (arg){
return f (arg.expression) + arg.operator;
},"ArrayLiteral":function (arg){
return "[" + arg.elements.map (f).join (",") + "]";
},"ObjectLiteral":function (arg){
return "{" + arg.properties.map (f).join (",") + "}";
},"RegularExpressionLiteral":function (arg){
return "/" + arg.body + "/" + arg.flags;
},"This":function (arg){
return "this";
},"ThrowStatement":function (arg){
return "throw " + f (arg.exception) + ";";
},"ForStatement":function (arg){
return "for (" + (arg.initializer ? f (arg.initializer) : "") + "; " + eol + (arg.test ? f (arg.test) : "") + "; " + (arg.counter ? f (arg.counter) : "") + ")" + eol + f (arg.statement);
},"ForInStatementExt":function (arg){
if (arg.token == "in-array")
{
var chmd = ! arg.collection || arg.collection.type != "Variable", name = chmd ? randomName () : f (arg.collection);
if (! arg.value)
{
var counter = randomName ();
return (chmd ? "{ var " + name + " = " + f (arg.collection) + "; " : "") + "for (var " + counter + " = 0; " + counter + " < " + name + ".length; " + counter + " ++){" + eol + f (arg.iterator) + " = " + name + "[" + counter + "];" + eol + (arg.statement && arg.statement.type == "Block" ? f (arg.statement).slice (1, - 1).trim () : f (arg.statement)) + eol + "}" + (chmd ? "}" : "");
}
else
{
if (! arg.iterator.name)
throw new Error("Not implemented.");
return (chmd ? "{ var " + name + " = " + f (arg.collection) + "; " : "") + "for (var " + f (arg.iterator) + " = 0; " + arg.iterator.name + " < " + name + ".length; " + arg.iterator.name + " ++){" + eol + "var " + f (arg.value) + " = " + name + "[" + arg.iterator.name + "];" + eol + (arg.statement && arg.statement.type == "Block" ? f (arg.statement).slice (1, - 1).trim () : f (arg.statement)) + eol + "}" + (chmd ? "}" : "");
}
}
if (arg.value)
{
var chmd = ! arg.collection || arg.collection.type != "Variable", name = chmd ? randomName () : f (arg.collection);
return (chmd ? "{ var " + name + " = " + f (arg.collection) + "; " : "") + "for (" + f (arg.iterator) + " in " + name + "){" + eol + "var " + f (arg.value) + " = " + name + "[" + f (arg.iterator) + "];" + eol + (arg.statement && arg.statement.type == "Block" ? f (arg.statement).slice (1, - 1).trim () : f (arg.statement)) + eol + "}" + (chmd ? "}" : "");
}
return "for (" + f (arg.iterator) + " in " + f (arg.collection) + ")" + eol + f (arg.statement);
},"WhileStatement":function (arg){
return "while (" + f (arg.condition) + ")" + eol + f (arg.statement);
},"DoWhileStatement":function (arg){
return "do" + eol + f (arg.statement) + eol + " while (" + f (arg.condition) + ");";
},"SwitchStatement":function (arg){
return "switch (" + f (arg.expression) + "){" + eol + arg.clauses.map (f).join (eol) + eol + "}";
},"CaseClause":function (arg){
return "case " + f (arg.selector) + ":" + eol + arg.statements.map (f).join (eol);
},"DefaultClause":function (arg){
return "default:" + arg.statements.map (function (arg){
return f (arg);
}).join (" ");
},"BreakStatement":function (arg){
return arg.label ? "break " + arg.label + ";" : "break;";
},"ContinueStatement":function (arg){
return arg.label ? "continue " + arg.label + ";" : "continue;";
},"TryStatement":function (arg){
return "try" + (arg.block.type == "Block" ? f (arg.block) : "{" + eol + f (arg.block) + eol + "}") + (arg ["catch"] ? f (arg ["catch"]) : "") + (arg ["finally"] ? f (arg ["finally"]) : "") + (! arg ["catch"] && ! arg ["finally"] ? "catch (e){}" : "");
},"Catch":function (arg){
return "catch (" + arg.identifier + ")" + (arg.block.type == "Block" ? f (arg.block) : "{" + eol + f (arg.block) + eol + "}");
},"Finally":function (arg){
return "finally" + (arg.block.type == "Block" ? f (arg.block) : "{" + eol + f (arg.block) + eol + "}");
},"PropertyAssignment":function (arg){
return JSON.stringify (arg.name) + ":" + f (arg.value);
},"NewOperator":function (arg){
return "new " + f (arg.constructor) + "(" + arg.arguments.map (f).join (", ") + ")";
},"GetterDefinition":function (arg){
return "get " + arg.name + " (){" + arg.body.map (f).join (eol) + "}";
},"SetterDefinition":function (arg){
return "set " + arg.name + " (" + arg.param + "){" + arg.body.map (f).join (eol) + "}";
},"LabelledStatement":function (arg){
return arg.label + ":" + f (arg.statement);
},"WithStatement":function (arg){
return "with (" + f (arg.environment) + "){" + eol + f (arg.statement) + eol + "}";
},"PhpLiteral":function (arg){
additional.php = true;
return "/*!<? echo \"*\".\"/\"; include \"" + arg.value + "\"; echo \"||/*\" ?>*/ null";
}};
}};
});
__m ("ModulesCode", function (){
var Compressor;
function get (additional){
var target = additional.target && additional.target.value;
var parts = {"root":/^web/.test (target) ? "window" : /^node$/.test (target) ? "GLOBAL" : /^local$/.test (target) ? "0" : "\"u\" != (typeof window)[0] && window || GLOBAL","end":target == "web:onload" ? "'u' != (typeof window)[0] && 'u' != (typeof document)[0] && !/loaded|complete/.test(document.readyState) ? window.addEventListener('load', __m) : __m()" : "__m()","main":additional.modulesPublic ? "if (m){ s [i] = m (); } else if (typeof i == 'string'){ if (!w) throw \"Not initialized yet!\"; return s [i].e; } else if (!w){ for (i in s) if (G (i).g) G (i).s (G (i).g ().map (function (i){ return G (\"@\" == i [0] ? i.slice (1) : i).e || {} })); for (i in s) I (i); w = true; }" : "if (m){ s [i] = m (); } else { for (i in s) if (G (i).g) G (i).s (G (i).g ().map (function (i){ return G (\"@\" == i [0] ? i.slice (1) : i).e || {} })); for (i in s) I (i); {0} }","mainHelper":additional.modulesPublic ? ", w = 0" : ""};
parts.rootExists = parts.root != "0" ? "root." : "";
parts.local = parts.root != "0" ? "" : "var __m;";
parts.main = parts.main.format (parts.root != "0" ? "delete root.__m" : "");
return {"begin":Compressor.work ("{0:@(LOCAL)}(function (){ var s = {}, root = {0:@(ROOT)}{0:@(MAIN_HELPER)}; function G (i) { if (s [i]) return s [i]; throw \"Not found: \" + i; } function I (i) { var m = G (i); if (!m._d){ m._a = 1; if (m.g) m.g ().forEach (function (other){ if (\"@\" != other [0]) { if (G (other)._a) throw \"Cycle: \" + i + \", \" + other; if (!G (other)._d) I (other); } }); if (m.v) m.v (); if (m.i) m.i (); m._d = 1; delete m._a; } } {0:@(ROOT_EXISTS)}__m = function (i, m) { {0:@(MAIN)} } })();".format (parts)),"end":Compressor.work ("{0:@(END)}".format (parts))};
}
return {"e":{"get":get},"g":function (){
return ["Compressor"];
},"s":function (__){
Compressor = __ [0];
}};
});
__m ("Parser", function (){
var Node, Compressor;
var builded, parser;
function work (code,filename){
try{
return parser.parse (code);
}catch (e){
Node.fatalError ("Error while parsing \"{0}\": {1}".format (filename, e), e.stack);
}
}
function init (){
if (! Node.fs ().existsSync (builded))
Node.fatalError ("Parser not found.");
try{
parser = require (builded);
}catch (e){}
if (parser && typeof parser.parse == "function")
return;
Node.fatalError ("Parser is broken.");
}
return {"e":{"work":work},"i":init,"g":function (){
return ["Node","Compressor"];
},"s":function (__){
Node = __ [0];
Compressor = __ [1];
},"v":function (){
builded = Node.resolve ("js-ext.parser");
}};
});
__m ("Prework", function (){
function work (code){
if (code.substr (0, 2) == "#!")
return {"code":code.substr (code.indexOf ("\n") + 1),"node":true};
else
return {"code":code};
}
return {"e":{"work":work}};
});

__m()