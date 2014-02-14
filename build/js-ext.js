#!/usr/bin/env node
(function (){ var s = {}, root = GLOBAL; function G (i) { if (s [i]) return s [i]; throw "Not found: " + i; } function I (i) { var m = G (i); if (!m._d){ m._a = 1; if (m.g) m.g ().forEach (function (other){ if ("@" != other [0]) { if (G (other)._a) throw "Cycle: " + i + ", " + other; if (!G (other)._d) I (other); } }); if (m.v) m.v (); if (m.i) m.i (); m._d = 1; delete m._a; } } root.__m = function (i, m) { if (m){ s [i] = m (); } else { for (i in s) if (G (i).g) G (i).s (G (i).g ().map (function (i){ return G ("@" == i [0] ? i.slice (1) : i).e || {} })); for (i in s) I (i); delete root.__m } } })();
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
for (var n in param)
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
var fs = require ("fs"), path = require ("path");
process.nextTick (function (arg){
args = parseArgs (process.argv.slice (2), [{"s":"i","l":"include","p":2},{"s":"o","l":"output","p":1},{"s":"h","l":"usage"}]);
new Worker(args.data [0].replace (/^"|"$/g, "")).process ();
});
function parseArgs (data,args){
var result = {"data":[],"put":function (info,value){
if (info.p == 2)
{
if (! this [info.s])
this [info.s] = [];
this [info.s].push (value);
}
else
this [info.s] = info.p ? value : true;
}};
for (var i = 0; i < data.length; i ++){
var s = data[i];
function put (fn,info){
if (info = args.filter (fn) [0])
{
result.put (info, data [i + 1]);
if (info.p)
++ i;
}
else
console.fatal (1, "Invalid arguments. Use \"--usage\" for view help.");
}
if (s [0] == "-")
{
if (s [1] == "-")
put (function (arg){
return arg.l == s.slice (2);
});
else
{ var _28f975o_99 = s.slice (1); for (var _934c9j2_100 = 0; _934c9j2_100 < _28f975o_99.length; _934c9j2_100 ++){
var k = _28f975o_99[_934c9j2_100];
put (function (arg){
return arg.s == k;
});
}}
}
else
result.data.push (s);
}
if (result.h)
{
console.log ("Available args:");
args.forEach (function (arg){
return console.log (" -{0} (--{1})".format (arg.s, arg.l));
});
process.exit (0);
}
else
return result;
}
function Context (file){
console.assert (file instanceof File, "File required");
this.id = Context.ids.indexOf (file.fullpath);
if (this.id === - 1)
this.id = Context.ids.push (file.fullpath) - 1;
this.file = file;
}
Context.ids = [];
function paramsManager (){
var that = this;
return {"add":function (key,value){
switch (key){
case "import":
var other = that.context.file.find (value);
if (other)
other.forEach (function (arg){
that.context.file.imports.push (arg);
if (arg.state === File.STATE_INITIAL)
arg.process ();
});
else
throw new MacroError(that.name, "Importing file \"" + value + "\" not found");
break;
default:throw new MacroError(that.name, "Wrong param key (\"" + key + "\")");
}
}};
}
function File (root,fullpath){
console.assert (! fileStorage.exists (fullpath), "File already processed");
if (fullpath === undefined)
{
this.fullpath = path.resolve (root);
this.root = path.dirname (this.fullpath);
}
else
{
this.fullpath = fullpath;
this.root = root;
}
this.dirname = path.dirname (this.fullpath);
this.filename = path.basename (this.fullpath);
this.state = File.STATE_INITIAL;
this.imports = [];
this.weightCalculating = false;
fileStorage.add (this);
}
File.STATE_WAITING = - 1;
File.STATE_MACRO_WAITING = - 2;
File.STATE_INITIAL = 0;
File.STATE_LOADED = 1;
File.STATE_MACROS = 2;
File.STATE_FINISHED = 3;
addLog (File, 1, function (arg){
return this.filename;
});
var lookingAt = [{"root":path.resolve (__dirname, "library")}];
File.find = function (child){
return File.prototype.find (child);
};
File.prototype.find = function (child){
function getByMask (temp){
var dirname = path.dirname (temp), regExp = new RegExp("^" + path.basename (temp).replace (/\*/g, ".*").replace (/\?/g, ".") + "$", "i"), files = fs.readdirSync (dirname), filtered = files.filter (RegExp.prototype.test.bind (regExp)).map (function (arg){
return path.resolve (dirname, arg);
});
return filtered;
}
function findInFolder (root,current,child){
if (current === undefined)
current = root;
console.assert (current.indexOf (root) === 0, "Invalid state");
while (current.indexOf (root) === 0)
{
var temp = path.resolve (current, child + ".jsxi"), match = temp.search (/[\*\?]/);
if (match !== - 1)
{
var filtered = getByMask (temp);
if (filtered.length)
return filtered;
}
else
if (fs.existsSync (temp))
return [temp];
current = path.dirname (current);
}
}
{ var _7sou5tj_7 = this instanceof File ? [{"root":this.root,"dirname":this.dirname}].concat (lookingAt) : lookingAt; for (var _1u3gmun_8 = 0; _1u3gmun_8 < _7sou5tj_7.length; _1u3gmun_8 ++){
var entry = _7sou5tj_7[_1u3gmun_8];
var temp = findInFolder (entry.root, entry.dirname, child);
if (temp)
return temp.map (function (arg){
return fileStorage.get (arg) || new File(entry.root, arg);
});
}}
};
File.prototype.weight = function (){
if (this.weightCalculating)
return 0;
this.weightCalculating = true;
var result = this.imports.reduce (function (a,b){
return a + b.weight ();
}, 1);
this.weightCalculating = false;
return result;
};
File.prototype.load = function (callback){
console.assert (this.state == File.STATE_INITIAL, "Wrong state (" + this.state + ")");
this.state = File.STATE_MACRO_WAITING;
fs.readFile (this.fullpath, function (error,data){
if (error)
console.fatal (error);
this.state = File.STATE_LOADED;
this.content = String (data);
this.log ("loaded", this.content.length ? "(" + this.content.length + " bytes)" : "(empty)");
callback ();
}.bind (this));
};
File.prototype.macros = function (callback){
console.assert (this.state == File.STATE_LOADED, "Wrong state (" + this.state + ")");
this.state = File.STATE_WAITING;
macrosProcess (this.content, new Context(this), function (arg){
this.log ("macro calls processed");
this.state = File.STATE_MACROS;
this.content = String (arg);
callback ();
}.bind (this));
};
File.prototype.parsing = function (callback){
console.assert (this.state == File.STATE_MACROS, "Wrong state (" + this.state + ")");
this.state = File.STATE_WAITING;
jsxParse (this.content, {"filename":this.filename,"initializationAllowed":true}, function (arg){
this.log ("parsing processed");
this.state = File.STATE_FINISHED;
this.parsed = arg;
callback ();
}.bind (this));
};
File.prototype.process = function (callback){
new Queue(this, Queue.MODE_SEQUENT).description ("file process").add (this.load).add (this.macros).add (this.parsing).run (function (arg){
console.assert (this.state == File.STATE_FINISHED, "Wrong state (" + this.state + ")");
if (callback !== undefined)
callback (this);
});
};
var fileStorage = new FileStorage();
function FileStorage (){
this.files = [];
}
FileStorage.prototype.sort = function (){
this.files.sort (function (a,b){
return a.weight () > b.weight ();
});
};
FileStorage.prototype.get = function (arg){
var fullpath = arg instanceof File ? arg.fullpath : arg;
return this.files.filter (function (arg){
return arg.fullpath === fullpath;
}) [0];
};
FileStorage.prototype.exists = function (arg){
return ! ! this.get (arg);
};
FileStorage.prototype.add = function (file){
console.assert (! this.exists (file), "File already added");
this.files.push (file);
};
FileStorage.prototype.has = function (fn){
{ var _7t4src5_39 = this.files; for (var _8hsia7n_40 = 0; _8hsia7n_40 < _7t4src5_39.length; _8hsia7n_40 ++){
var file = _7t4src5_39[_8hsia7n_40];
if (fn (file.state))
return true;
}}
return false;
};
FileStorage.prototype.everythingFinished = function (){
return ! this.has (function (arg){
return arg !== File.STATE_FINISHED;
});
};
__m ("Generator", function (){
var currentFileName, tabs, tab;
function _ (s){
return s [s.length - 1] === "\n" ? s.slice (0, - 1) : s.slice (- tab.length) === tab ? s.slice (0, - tab.length) : s;
}
function t (s,full){
return s.replace (full ? (/(\/\/[\s\S]+)?[\n\s]+$/g) : (/[\n\s]+$/g), "");
}
function n (n,s){
if (n === 1)
{
tabs += tab;
}
else
if (n === - 1)
{
tabs = _ (tabs);
console.assert (tabs.length, "Too much tabs have been removed!");
}
return tabs;
}
function x (b,s){
return b.type === "BlockStatement" ? f (b, s) : n (1) + t (f (b)) + n (- 1);
}
function $ (arg,mn){
if (mn)
n (- 1);
if (! arg.comment && ! arg.lineNumber)
return ";" + tabs;
var result = "; // ";
if (arg.lineNumber)
result += currentFileName + " [" + arg.lineNumber + ":" + (arg.index - arg.lineStart) + "]";
if (arg.comment)
if (arg.lineNumber)
result += " (" + arg.comment + ")";
else
result += arg.comment;
return result + tabs;
}
function c (a,j,b){
if (j === undefined)
j = "";
return a.map (function (arg){
return f (arg, b);
}).join (j);
}
function f (element,arg){
if (! fn [element.type])
{
console.log (element);
return "[ " + element.type.toUpperCase () + " ]" + $ (element);
}
else
{
var oldTabs = tabs, result = fn [element.type] (element, arg);
tabs = oldTabs;
return result;
}
}
var fn;
function work (element,fileName){
currentFileName = fileName;
tabs = "\n";
return f (element);
}
return {"e":{"work":work},"v":function (){
tab = "    ";
fn = {"Identifier":function (arg){
return arg.name;
},"Literal":function (arg){
return typeof arg.value === "string" ? "\"" + arg.value + "\"" : "" + arg.value;
},"Property":function (arg){
return f (arg.key) + ": " + f (arg.value);
},"BlockStatement":function (arg){
return arg.body.length ? "{" + n (1) + _ (c (arg.body)) + "}" + (arguments [1] ? " " : n (- 1)) : "{}";
},"ExpressionStatement":function (arg){
return f (arg.expression) + $ (arg);
},"ReturnStatement":function (arg){
return "return" + (arg.argument ? " " + f (arg.argument) : "") + $ (arg);
},"IfStatement":function (arg){
return "if (" + f (arg.test) + ")" + x (arg.consequent, arg.alternate) + (arg.alternate ? "else " + x (arg.alternate) : "");
},"WhileStatement":function (arg){
return "while (" + f (arg.test) + ")" + x (arg.body);
},"DoWhileStatement":function (arg){
return "do " + x (arg.body, true) + "while (" + f (arg.test) + ")" + $ (arg);
},"ForStatement":function (arg){
return "for (" + (arg.init ? f (arg.init, true) : "") + ";" + (arg.test ? " " + f (arg.test) : "") + ";" + (arg.update ? " " + f (arg.update) : "") + ")" + x (arg.body);
},"ForInStatement":function (arg){
return "for (" + f (arg.left, true) + " in " + f (arg.right) + ")" + x (arg.body);
},"TryStatement":function (arg){
return "try " + f (arg.block, true) + c (arg.handlers, "", arg.finalizer) + (arg.finalizer ? "finally " + f (arg.finalizer) : "") + tabs;
},"CatchClause":function (arg){
return "catch (" + f (arg.param) + ")" + f (arg.body, arguments [1]);
},"LabeledStatement":function (arg){
return f (arg.label) + ": " + f (arg.body);
},"BreakStatement":function (arg){
return "break" + (arg.label ? " " + f (arg.label) : "") + $ (arg);
},"ContinueStatement":function (arg){
return "continue" + (arg.label ? " " + f (arg.label) : "") + $ (arg);
},"ThrowStatement":function (arg){
return "throw " + f (arg.argument) + $ (arg);
},"DebuggerStatement":function (arg){
return "debugger" + $ (arg);
},"SwitchStatement":function (arg){
return "switch (" + f (arg.discriminant) + "){" + n (1) + _ (c (arg.cases)) + "}";
},"SwitchCase":function (arg){
return (arg.test ? "case " + f (arg.test) : "default") + ":" + n (1) + _ (c (arg.consequent));
},"NewExpression":function (arg){
return "new " + f (arg.callee) + " (" + c (arg.arguments, ", ") + ")";
},"ThisExpression":function (arg){
return "this";
},"CallExpression":function (arg){
return f (arg.callee) + " (" + c (arg.arguments, ", ") + ")";
},"ArrayExpression":function (arg){
return arg.elements.length ? "[" + n (1) + c (arg.elements, "," + tabs) + n (- 1) + "]" : "[]";
},"ObjectExpression":function (arg){
return arg.properties.length ? "{" + n (1) + c (arg.properties, "," + tabs) + n (- 1) + "}" : "{}";
},"MemberExpression":function (arg){
return f (arg.object) + (arg.computed ? "[" + f (arg.property) + "]" : "." + f (arg.property));
},"FunctionExpression":function (arg){
return "(function " + (arg.id ? f (arg.id) + " " : "") + "(" + c (arg.params, ", ") + ")" + f (arg.body) + ")";
},"BinaryExpression":function (arg){
return f (arg.left) + " " + arg.operator + " " + f (arg.right);
},"LogicalExpression":function (arg){
return f (arg.left) + " " + arg.operator + " " + f (arg.right);
},"AssignmentExpression":function (arg){
return "(" + (f (arg.left) + " " + arg.operator + " " + f (arg.right)) + ")";
},"UnaryExpression":function (arg){
return "(" + (arg.prefix ? (arg.operator.length == 1 ? arg.operator : arg.operator + " ") + f (arg.argument) : f (arg.argument) + " " + arg.operator) + ")";
},"SequenceExpression":function (arg){
return "(" + (n (1) && c (arg.expressions, "," + tabs)) + ")";
},"ConditionalExpression":function (arg){
return f (arg.test) + " ? " + f (arg.consequent) + " : " + f (arg.alternate);
},"VariableDeclaration":function (arg){
return n (1) && arg.kind + " " + arg.declarations.map (f).join ("," + tabs) + (arguments [1] ? "" : $ (arg, true));
},"VariableDeclarator":function (arg){
return arg.init ? f (arg.id) + " = " + f (arg.init) : f (arg.id);
},"FunctionDeclaration":function (arg){
return "function " + f (arg.id) + " (" + c (arg.params, ", ") + ")" + f (arg.body) + tabs;
},"Program":function (arg){
return c (arg.body);
}};
}};
});
function getParams (data){
var all = data.match (/(?:^|[\r\n])[ \t]*\/\/[ \t]*==([a-zA-Z]+)==[\s\S]+?[\r\n][ \t]*\/\/[ \t]*==\/\1==/g), result = {"jsx":{}};
if (all)
all.forEach (function (arg){
var temp = {};
arg.replace (/[\r\n][ \t]*\/\/[ \t]*@[ \t]*([^\s]+)(?:[ \t]+([^\n\r]+))?/g, function (s,k,v){
k = k.trim ();
if (! temp [k])
temp [k] = [];
temp [k].push (v ? v.trim () : true);
});
result [arg.match (/==([a-zA-Z]+)==/) [1].toLowerCase ()] = temp;
});
return result;
}
function LiteParser (data,index){
if (index === undefined)
index = 0;
this.data = data;
this.index = index;
this.binded = [];
}
LiteParser.EOF = 1;
LiteParser.prototype.__defineGetter__ ("current", function (arg){
return this.data [this.index];
});
LiteParser.prototype.replace = function (from,to,by){
if (by === undefined)
by = "";
console.assert (from <= to, "Invalid args");
if (typeof by !== "string")
by = "" + by;
var delta = by.length - (to - from);
if (this.index >= to)
this.index += delta;
else
if (this.index > from)
this.update (from);
this.update (this.data = this.data.substr (0, from) + by + this.data.substr (to));
return delta;
};
LiteParser.prototype.substring = function (from,to){
return this.data.substring (from, to);
};
LiteParser.prototype.getPosition = function (data,delta){
var lines = this.data.substr (0, this.index).split ("\n");
return {"index":this.index,"lineNumber":lines.length,"lineStart":lines.slice (0, - 1).join ("\n").length};
};
LiteParser.prototype.update = function (data,index){
if (typeof data === "string")
this.data = data;
if (typeof index === "number")
this.index = index;
else
if (typeof data === "number")
this.index = data;
return this;
};
LiteParser.prototype.on = function (){
for (var i = 0; 
i < arguments.length - 1; i++)
this.binded.push ({"match":arguments [i],"react":arguments [arguments.length - 1]});
return this;
};
LiteParser.prototype.findSimple = function (){
var value = {"index":Number.POSITIVE_INFINITY};
for (var id = 0; id < arguments.length; id ++){
var arg = arguments[id];
if (arg === LiteParser.EOF)
{
if (value.index === Number.POSITIVE_INFINITY)
value = {"id":id,"index":this.data.length,"value":""};
}
else
{
var index = this.data.indexOf (arg, this.index);
if (index !== - 1 && index < value.index)
value = {"id":id,"index":index,"value":arg};
}
}
if (value.index === Number.POSITIVE_INFINITY)
{
return null;
}
else
{
this.index = value.index + value.value.length;
return value;
}
};
LiteParser.prototype.findNext = function (){
return this.innerFindNext (arguments);
};
LiteParser.prototype.whatNext = function (){
return this.innerFindNext (arguments, true);
};
LiteParser.prototype.innerFindNext = function (args,fixedMode){
if (fixedMode === undefined)
fixedMode = false;
console.assert (args && typeof args.length === "number", "Invalid argument type");
function indexOfExt (str,what,pos,id){
if (what === LiteParser.EOF)
{
return {"id":id,"index":str.length,"value":what};
}
else
if (what instanceof RegExp)
{
var temp = str.substring (pos).match (what);
return {"id":id,"index":temp ? temp.index + pos : - 1,"value":temp ? temp [0] : null,"raw":temp};
}
else
if (typeof what === "string")
{
return {"id":id,"index":str.indexOf (what, pos),"value":what};
}
else
console.assert (true, "Invalid argument type");
}
var value = {"index":Number.POSITIVE_INFINITY}, oldIndex = this.index, react, result;
{ var _6afsgcg_24 = this.binded; for (var i = 0; i < _6afsgcg_24.length; i ++){
var arg = _6afsgcg_24[i];
var temp = indexOfExt (this.data, arg.match, this.index, i);
if (temp.index !== - 1 && temp.index < value.index)
{
value = temp;
react = arg.react;
}
}}
for (var i = 0; i < args.length; i ++){
var arg = args[i];
var temp = indexOfExt (this.data, arg, this.index, i);
if (temp.index !== - 1 && temp.index < value.index)
{
value = temp;
react = null;
}
}
if (value.index === Number.POSITIVE_INFINITY)
return null;
this.moveTo (value);
if (react)
result = react.call (this, value) ? this.innerFindNext (args, fixedMode) : null;
else
result = value;
if (fixedMode)
this.index = oldIndex;
return result;
};
LiteParser.prototype.moveTo = function (arg){
this.index = arg.index + arg.value.length;
};
LiteParser.prototype.findHere = function (arg){
var args = [].slice.call (arguments, arg instanceof Array ? 1 : 0), operators = arg instanceof Array ? arg : ["(","{","["], others = {"(":")","{":"}","[":"]"}, found, temp;
while (found = this.innerFindNext (args.concat (operators)))
{
temp = operators.indexOf (found.value);
if (operators.indexOf (found.value) !== - 1)
{
console.assert (others [found.value], "Pair for " + found.value + " not found");
this.findHere (others [found.value]);
}
else
if (args.indexOf (found.value) !== - 1)
return found;
}
return null;
};
function Macro (name,level,context,macroArgs,macroBody){
this.name = name;
if (! macroBody)
{
macroBody = macroArgs;
macroArgs = null;
}
this.level = level;
this.arguments = macroArgs === null ? ["arg"] : macroArgs;
this.context = context;
this.rawBody = macroBody;
this.asyncMode = this.arguments [this.arguments.length - 1] === "callback";
this.localStorage = {};
}
;
addLog (Macro, 3, function (arg){
return "@" + this.name;
});
Macro.ReturnType = {"Object":"MacroReturnTypeObject","String":"MacroReturnTypeString","Raw":"MacroReturnTypeRaw","RawWithMacros":"MacroRawWithMacros","SourceTree":"MacroReturnTypeSourceTree"};
Macro.Defaults = {"fs":fs,"path":path,"params":paramsManager,"ReturnType":Macro.ReturnType};
Macro.globalStorage = {};
Macro.prototype.defaults = function (context){
var result = {}, obj = {"name":this.name,"context":context,"macroContext":this.context};
{ var _6oi5les_93 = Macro.Defaults; for (var key in _6oi5les_93){
var value = _6oi5les_93[key];
if (typeof value === "function")
result [key] = value.call (obj);
else
result [key] = value;
}}
return result;
};
Macro.prototype.initialize = function (callback){
function macroCalls (macroBody){
var used = [], lastIdentifier, liteParser, name, found, temp;
if (macroBody.search (/@[_$a-zA-Z]/) !== - 1)
{
lastIdentifier = 0;
liteParser = new LiteParser(macroBody).on ("//", function (arg){
return this.findSimple ("\n", "\r", LiteParser.EOF);
}).on ("/*", function (arg){
return this.findSimple ("*/");
}).on ("'", "\"", "`", function (arg){
while (temp = liteParser.findSimple ("\\" + arg.value, arg.value))
if (temp.value === arg.value)
return true;
return false;
});
while (found = liteParser.findNext (/@([_$a-zA-Z][_$a-zA-Z0-9]*)/))
{
while (macroBody.indexOf (name = "_" + (lastIdentifier++).toString (32)) !== - 1)
;
used.push ({"name":name,"macro":found.raw [1]});
temp = liteParser.whatNext (/[^\s]/);
if (! temp || temp.value !== "(")
name = name + " ()";
liteParser.update (macroBody = macroBody.substr (0, found.index) + name + macroBody.substr (liteParser.index), liteParser.index + name.length - found.value.length);
}
}
return {"used":used,"body":macroBody};
}
if (this.callee)
{
callback ();
return;
}
var phase = macroCalls (this.rawBody), converted = convert (phase.body, {"filename":"macro","insertReturn":true}), variables = [], queue = new Queue(macroStorage, Queue.MODE_PARALLEL).description ("macros inside other macro");
variables.push ("context = this.context");
variables.push ("macroContext = this.macroContext");
variables.push ("global = this.global");
variables.push ("local = this.local");
variables.push ("require = this.require");
for (var key in Macro.Defaults)
variables.push (key + " = this.defaults." + key);
{ var _67vfupf_94 = phase.used; for (var _2djb1ro_95 = 0; _2djb1ro_95 < _67vfupf_94.length; _2djb1ro_95 ++){
var entry = _67vfupf_94[_2djb1ro_95];
queue.add (macroStorage.get, entry.macro, this.level);
variables.push (entry.name + " = function (){ return this.macros." + entry.macro + ".call (this.context, arguments) }.bind (this)");
}}
this.macros = {};
this.debug = (variables.length ? "var " + variables.join (", ") + ";\n" : "") + converted;
this.callee = new Function(this.arguments.join (","), this.debug);
queue.run (function (arg){
arg.map (function (arg){
return arg.result [0];
}).forEach (function (other){
this.log ("found @" + other.name + " for using inside");
this.macros [other.name] = other;
}.bind (this));
this.log ("initialized");
callback ();
}.bind (this));
};
Macro.prototype.call = function (context,args){
console.assert (this.callee, "Macro is not initialized");
console.assert (args && typeof args.length === "number", "Wrong argument");
console.assert (context instanceof Context, "Context required");
var dirname = this.context.file.dirname, object = {"defaults":this.defaults (context),"macros":this.macros,"macroContext":this.context,"context":context,"global":Macro.globalStorage,"local":this.localStorage,"require":function (arg){
return require (path.resolve (dirname, "node_modules", arg));
}};
try{
return this.callee.apply (object, args);
}catch (e){
if (e.name === "MacroError")
throw e;
else
throw new MacroError(this.name, args, e);
}
};
function MacroError (name,args,parent,message){
if (typeof args === "string")
{
message = args;
args = undefined;
parent = undefined;
}
this.name = "MacroError";
this.message = "Error at @" + name + (args ? " (" + Array.prototype.map.call (args, function (arg){
return JSON.stringify (arg);
}).join (", ") + ")" : "") + (parent ? "\n" + parent.stack : message ? ": " + message : "");
}
;
MacroError.prototype = Error.prototype;
function MacroCall (name,arguments,level,context,replacement){
this.name = name;
this.arguments = arguments;
this.level = level;
this.context = context;
this.state = MacroCall.STATE_INITIAL;
this.replacement = replacement;
this.macro = undefined;
this.result = undefined;
}
MacroCall.STATE_WAITING = - 1;
MacroCall.STATE_INITIAL = 0;
MacroCall.STATE_CONNECTED = 1;
MacroCall.STATE_READY = 2;
MacroCall.STATE_CALLED = 3;
MacroCall.STATE_FINISHED = 4;
MacroCall.waitingForCallback = 0;
MacroCall.waitingForMacro = 0;
addLog (MacroCall, 2, function (arg){
return "call (@" + this.name + ")";
});
MacroCall.prototype.findMacro = function (callback){
console.assert (this.state == MacroCall.STATE_INITIAL, "Wrong state (" + this.state + ")");
this.state = MacroCall.STATE_WAITING;
MacroCall.waitingForMacro++;
macroStorage.get (this.name, this.level, function (arg){
if (arg == null)
throw new MacroNotFoundError(this.name);
this.log ("macro found");
this.state = MacroCall.STATE_CONNECTED;
this.macro = arg;
MacroCall.waitingForMacro--;
callback ();
}.bind (this));
};
MacroCall.prototype.prepareArguments = function (callback){
console.assert (this.state == MacroCall.STATE_CONNECTED, "Wrong state (" + this.state + ")");
this.state = MacroCall.STATE_WAITING;
function cast (value,callback){
if (value.match (/^((\d+|\d*\.\d+)(e[+-]?\d+)?|0x[\da-f]+)$/i))
return + value;
macrosProcess (value, this.level, this.context, function (arg){
var data;
try{
eval ("data = " + convert (arg, "macro arg"));
callback (data);
}catch (e){
console.log ("FAILED AT:\n" + (value || "< EMPTY STRING >") + "\nWHAT HAS BEEN TRANSFORMED INTO:\n" + (arg || "< EMPTY STRING >"));
throw e;
}
});
}
var queue = new Queue(this, Queue.MODE_PARALLEL).description ("macro call arguments prepare");
{ var _1sl6bhf_9 = this.arguments; for (var _2m8t0j7_10 = 0; _2m8t0j7_10 < _1sl6bhf_9.length; _2m8t0j7_10 ++){
var arg = _1sl6bhf_9[_2m8t0j7_10];
queue.add (cast, arg);
}}
queue.run (function (arg){
this.log ("arguments ready");
this.state = MacroCall.STATE_READY;
this.arguments = arg.map (function (arg){
return arg.result [0];
});
callback ();
});
};
MacroCall.prototype.realMacroCall = function (callback){
console.assert (this.state == MacroCall.STATE_READY, "Wrong state (" + this.state + ")");
this.state = MacroCall.STATE_WAITING;
MacroCall.waitingForCallback++;
var resultHandler = function (answer){
if (this.result !== undefined)
throw new Error("Callback already called");
if (answer === undefined)
answer = "";
this.state = MacroCall.STATE_CALLED;
this.result = answer;
MacroCall.waitingForCallback--;
callback ();
}.bind (this);
if (this.macro.asyncMode)
this.macro.call (this.context, this.arguments.concat ([resultHandler]));
else
resultHandler (this.macro.call (this.context, this.arguments));
};
MacroCall.prototype.processResult = function (callback){
console.assert (this.state == MacroCall.STATE_CALLED, "Wrong state (" + this.state + ")");
this.state = MacroCall.STATE_WAITING;
var doMacros = true, result = this.result;
if (result === null)
{
result = "";
}
else
if (typeof result !== "object")
{
result = "" + result;
}
else
if (result instanceof String)
{
result = JSON.stringify ("" + result);
}
else
switch (result && result.type){
case Macro.ReturnType.Raw:
doMacros = false;
result = result.value;
break;
case Macro.ReturnType.RawWithMacros:
result = result.value;
break;
case Macro.ReturnType.Object:

case Macro.ReturnType.String:
if (! result.value)
throw new Error("Empty macro @" + this.name + " result (use \"null\" or \"undefined\" for this)");
result = JSON.stringify (result.value);
break;
case Macro.ReturnType.SourceTree:

default:throw new Error("Not implemented (" + this.name + ")");
}
var resultHandler = function (result){
this.state = MacroCall.STATE_FINISHED;
this.result = result;
callback ();
}.bind (this);
if (doMacros)
macrosProcess (result, this.level, this.context, resultHandler);
else
resultHandler (result);
};
MacroCall.prototype.process = function (callback){
new Queue(this, Queue.MODE_SEQUENT).description ("macro call process").add (this.findMacro).add (this.prepareArguments).add (this.realMacroCall).add (this.processResult).run (function (arg){
console.assert (this.state == MacroCall.STATE_FINISHED, "Wrong state (" + this.state + ")");
if (callback !== undefined)
callback (this.result);
});
};
function MacroNotFoundError (name,args,parent){
this.name = "MacroNotFoundError";
this.macroName = name;
this.message = "Macro @" + name + " not found";
}
;
MacroNotFoundError.prototype = Error.prototype;
function macrosParse (source,level,context){
console.assert (context instanceof Context, "Context required");
function parseMacroDefine (){
var name = found.raw [1], position, argument, arguments, blockMode, temp, body, converted;
temp = liteParser.whatNext (/[^\s]/);
if (temp.value === "(")
{
liteParser.moveTo (temp);
position = liteParser.index;
arguments = [];
while (temp = liteParser.findHere (",", ")"))
{
argument = liteParser.substring (position, liteParser.index - 1).trim ();
if (argument.length)
arguments.push (argument);
else
if (arguments.length || temp.value === ",")
throwError (liteParser.getPosition (), "Missing argument");
position = liteParser.index;
if (temp.value === ")")
break;
}
temp = liteParser.whatNext (/[^\s]/);
}
else
arguments = null;
blockMode = temp && temp.value === "{";
position = liteParser.index;
if (blockMode)
{
liteParser.moveTo (temp);
temp = liteParser.findHere ("}");
}
else
temp = liteParser.findHere (";", LiteParser.EOF);
if (! temp)
throwError (liteParser.getPosition (), "End of macro's body not found");
body = liteParser.substring (position, liteParser.index).trim ();
temp = liteParser.whatNext (/[^\s]/);
if (temp && temp.value === ";")
liteParser.moveTo (temp);
liteParser.replace (found.index, liteParser.index, "/* There was definition of @" + name + " */");
macroStorage.add (new Macro(name, level, context, arguments, body));
}
function parseMacroCall (){
var name = found.raw [1], arguments = [], position, argument, quotesCount, temp;
temp = liteParser.whatNext (/[^\s]/);
if (temp && (temp.value === "{" || temp.value === "("))
{
liteParser.moveTo (temp);
if (temp.value === "{")
{
quotesCount = 1;
while (liteParser.current === "{")
{
liteParser.index++;
quotesCount++;
}
position = liteParser.index;
if (quotesCount > 1)
temp = liteParser.findSimple (new Array(quotesCount + 1).join ("}"));
else
temp = liteParser.findHere (["{"], "}");
if (! temp)
throwError (liteParser.getPosition (), "End of argument not found");
argument = liteParser.substring (position, liteParser.index - 1);
arguments.push (JSON.stringify (argument));
}
else
{
position = liteParser.index;
while (temp = liteParser.findHere (",", ")"))
{
argument = liteParser.substring (position, liteParser.index - 1).trim ();
if (argument.length)
arguments.push (argument);
else
if (arguments.length || temp.value === ",")
throwError (liteParser.getPosition (), "Missing argument");
if (temp.value === ")")
break;
else
position = liteParser.index;
}
if (! temp)
throwError (liteParser.getPosition (), "Invalid arguments list");
}
}
var replacement = "@__call(" + calls.length + ")";
calls.push (new MacroCall(name, arguments, level, context, replacement));
liteParser.replace (found.index, liteParser.index, replacement);
}
function levelDown (){
level += "." + context.id + "_" + found.index;
}
function levelUp (){
level = level.replace (/\.[\d_]+$/, "");
}
var calls = [], liteParser = new LiteParser(source).on ("//", function (arg){
return this.findSimple ("\n", "\r", LiteParser.EOF);
}).on ("/*", function (arg){
return this.findSimple ("*/");
}).on ("'", "\"", "`", function (arg){
for (var temp; 
temp = liteParser.findSimple ("\\" + arg.value, arg.value); )
if (temp.value === arg.value)
return true;
return false;
}), found;
while (found = liteParser.findNext (/@macro\s+([_$a-zA-Z][_$a-zA-Z0-9]*)/, /@([_$a-zA-Z][_$a-zA-Z0-9]*)/, "{", "}"))
{
switch (found.id){
case 0:
parseMacroDefine ();
break;
case 1:
parseMacroCall ();
break;
case 2:
levelDown ();
break;
case 3:
levelUp ();
break;
}
}
return {"data":liteParser.data,"calls":calls};
}
function macrosProcess (data,level,context,callback){
if (level instanceof Context)
{
callback = context;
context = level;
level = "";
}
console.assert (context instanceof Context, "Context required");
console.assert (typeof callback === "function", "Function required");
var temp = macrosParse (data, level, context), queue = new Queue(Queue.MODE_PARALLEL).description ("macros process");
{ var _60hojus_37 = temp.calls; for (var _7ui66fc_38 = 0; _7ui66fc_38 < _60hojus_37.length; _7ui66fc_38 ++){
var call = _60hojus_37[_7ui66fc_38];
queue.add (call, call.process.bind (call));
}}
queue.run (function (arg){
for (var _78hvohh_39 = 0; _78hvohh_39 < arg.length; _78hvohh_39 ++){
var entry = arg[_78hvohh_39];
temp.data = temp.data.split (entry.data.replacement).join (entry.result [0]);
}
callback (temp.data);
});
}
var macroStorage = new MacroStorage();
function MacroStorage (){
this.macros = {};
this.requests = [];
}
addLog (MacroStorage, 2, "storage");
MacroStorage.prototype.add = function (macro){
this.log ("@" + macro.name + (macro.level ? " (at " + macro.level + ")" : "") + " added");
if (! this.macros [macro.name])
this.macros [macro.name] = [macro];
else
this.macros [macro.name].push (macro);
{ var _5m6ll5b_24 = this.requests; for (var pos = 0; pos < _5m6ll5b_24.length; pos ++){
var request = _5m6ll5b_24[pos];
if (request [0] === macro.name && this.get (request))
this.requests.splice (pos--, 1);
}}
};
MacroStorage.prototype.get = function (name,level,callback){
var result = undefined, max = - 1, requestMode = typeof name !== "string", temp;
if (requestMode)
{
callback = name [2];
level = name [1];
name = name [0];
}
else
this.log ("requested @" + name + (level ? " (at " + level + ")" : "") + "");
if (this.macros [name])
{ var _4nh6821_25 = this.macros [name]; for (var _3e08m5_26 = 0; _3e08m5_26 < _4nh6821_25.length; _3e08m5_26 ++){
var macro = _4nh6821_25[_3e08m5_26];
if (macro.level.length >= max && macro.level.length <= level.length && level.substring (0, macro.level.length) === macro.level)
{
result = macro;
max = macro.level.length;
}
}}
if (result !== undefined)
{
result.initialize (function (arg){
return callback (result);
});
if (requestMode)
return true;
}
else
if (! requestMode)
this.requests.push (arguments);
};
function saveComment (mode,key,value){
if (! information [mode])
information [mode] = [];
information [mode].push ({"key":key,"value":value === undefined ? true : value});
}
function skipComment (){
var ch, start, blockComment, lineComment, lineCommentFrom, temp, matched;
blockComment = false;
lineComment = false;
specialMode = false;
while (index < length)
{
ch = source [index];
if (lineComment)
{
ch = source [index++];
if (isLineTerminator (ch))
{
temp = source.substring (lineCommentFrom, index - 1).trim ();
if (! specialMode)
{
matched = temp.match (/^==([^=]+)==$/);
if (matched)
specialMode = matched [1];
}
else
if (temp [0] == "@")
{
temp = temp.match (/@([^\s]+)(?:\s+([\s\S]+))?/);
saveComment (specialMode, temp [1], temp [2]);
}
else
if (temp === "==/" + specialMode + "==")
{
specialMode = false;
}
lineComment = false;
if (ch === "\r" && source [index] === "\n")
++ index;
++ lineNumber;
lineStart = index;
}
}
else
if (blockComment)
{
if (isLineTerminator (ch))
{
if (ch === "\r" && source [index + 1] === "\n")
++ index;
++ lineNumber;
++ index;
lineStart = index;
if (index >= length)
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
else
{
ch = source [index++];
if (index >= length)
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
if (ch === "*")
ch = source [index];
if (ch === "/")
{
++ index;
blockComment = false;
}
}
}
else
if (ch === "/")
{
ch = source [index + 1];
if (ch === "/")
{
index += 2;
lineCommentFrom = index;
lineComment = true;
}
else
if (ch === "*")
{
index += 2;
blockComment = true;
if (index >= length)
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
else
break;
}
else
if (isWhiteSpace (ch))
{
++ index;
}
else
if (isLineTerminator (ch))
{
++ index;
if (ch === "\r" && source [index] === "\n")
++ index;
++ lineNumber;
lineStart = index;
}
else
break;
}
}
function isIdentifierStart (ch){
return ch === "$" || ch === "_" || ch === "\\" || ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch.charCodeAt (0) >= 128 && Regex.NonAsciiIdentifierStart.test (ch);
}
function isIdentifierPart (ch){
return ch === "$" || ch === "_" || ch === "\\" || ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || ch.charCodeAt (0) >= 128 && Regex.NonAsciiIdentifierPart.test (ch);
}
function isKeyword (id){
var keyword = false;
switch (id.length){
case 2:
keyword = (id === "if") || (id === "in") || (id === "do");
break;
case 3:
keyword = (id === "var") || (id === "for") || (id === "new") || (id === "try") || (id === "use");
break;
case 4:
keyword = (id === "this") || (id === "else") || (id === "case") || (id === "void") || (id === "with");
break;
case 5:
keyword = (id === "while") || (id === "break") || (id === "catch") || (id === "throw") || (id === "class") || (id === "super");
break;
case 6:
keyword = (id === "return") || (id === "typeof") || (id === "delete") || (id === "switch") || (id === "lambda") || (id === "static") || (id === "public");
break;
case 7:
keyword = (id === "default") || (id === "finally") || (id === "private") || (id === "extends");
break;
case 8:
keyword = (id === "function") || (id === "continue") || (id === "debugger");
break;
case 9:
keyword = (id === "protected");
break;
case 10:
keyword = (id === "instanceof");
break;
}
if (keyword)
return true;
return isFutureReservedWord (id);
}
function isFutureReservedWord (id){
switch (id){
case "enum":

case "export":

case "import":
return true;
default:return false;
}
}
var Token, PropertyKind, TokenName, Syntax, Messages, Regex, source, index, lineNumber, lineStart, length, buffer, state, information, options;
Token = {"BooleanLiteral":1,"EOF":2,"Identifier":3,"Keyword":4,"NullLiteral":5,"NumericLiteral":6,"Punctuator":7,"StringLiteral":8};
PropertyKind = {"Data":1,"Get":2,"Set":4};
TokenName = {};
TokenName [Token.BooleanLiteral] = "Boolean";
TokenName [Token.EOF] = "<end>";
TokenName [Token.Identifier] = "Identifier";
TokenName [Token.Keyword] = "Keyword";
TokenName [Token.NullLiteral] = "Null";
TokenName [Token.NumericLiteral] = "Numeric";
TokenName [Token.Punctuator] = "Punctuator";
TokenName [Token.StringLiteral] = "String";
Syntax = {"AssignmentExpression":"AssignmentExpression","ArrayExpression":"ArrayExpression","BlockStatement":"BlockStatement","BinaryExpression":"BinaryExpression","BreakStatement":"BreakStatement","CallExpression":"CallExpression","CatchClause":"CatchClause","ConditionalExpression":"ConditionalExpression","ContinueStatement":"ContinueStatement","DoWhileStatement":"DoWhileStatement","DebuggerStatement":"DebuggerStatement","EmptyStatement":"EmptyStatement","ExpressionStatement":"ExpressionStatement","ForStatement":"ForStatement","ForInStatement":"ForInStatement","FunctionDeclaration":"FunctionDeclaration","FunctionExpression":"FunctionExpression","Identifier":"Identifier","IfStatement":"IfStatement","Literal":"Literal","LabeledStatement":"LabeledStatement","LogicalExpression":"LogicalExpression","MemberExpression":"MemberExpression","NewExpression":"NewExpression","ObjectExpression":"ObjectExpression","Program":"Program","Property":"Property","ReturnStatement":"ReturnStatement","SequenceExpression":"SequenceExpression","SwitchStatement":"SwitchStatement","SwitchCase":"SwitchCase","ThisExpression":"ThisExpression","ThrowStatement":"ThrowStatement","TryStatement":"TryStatement","UnaryExpression":"UnaryExpression","VariableDeclaration":"VariableDeclaration","VariableDeclarator":"VariableDeclarator","WhileStatement":"WhileStatement","WithStatement":"WithStatement"};
Messages = {"UnexpectedToken":"Unexpected token %0","UnexpectedNumber":"Unexpected number","UnexpectedString":"Unexpected string","UnexpectedIdentifier":"Unexpected identifier","UnexpectedReserved":"Unexpected reserved word","UnexpectedEOS":"Unexpected end of input","NewlineAfterThrow":"Illegal newline after throw","InvalidRegExp":"Invalid regular expression","InvalidIdentifier":"Invalid identifier","UnterminatedRegExp":"Invalid regular expression: missing /","InvalidLHSInAssignment":"Invalid left-hand side in assignment","InvalidLHSInForIn":"Invalid left-hand side in for-in","MultipleDefaultsInSwitch":"More than one default clause in switch statement","NoCatchOrFinally":"Missing catch or finally after try","IllegalContinue":"Illegal continue statement","IllegalBreak":"Illegal break statement","IllegalReturn":"Illegal return statement","AccessorDataProperty":"Object literal may not have data and accessor property with the same name","AccessorGetSet":"Object literal may not have multiple get/set accessors with the same name","CyclicDependencyDetected":"Cyclic dependency detected (%0)","PrivateAccessError":"Attempt to access to private %0","ObjectAccessError":"Attempt to access to object field %0 from static method","SuperMethodsAreNotAvailable":"Super methods are not available for this class","ClassAlreadyDefined":"Class with name %0 already defined","ParentClassNotFound":"Parent class %0 not found","UsingClassNotFound":"Using class %0 not found","SuperConstructorCallNeeded":"Super constructor call is needed","WtfMan":"WTF, MAN"};
Regex = {"NonAsciiIdentifierStart":new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),"NonAsciiIdentifierPart":new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")};
function setMark (obj,mark){
obj.lineNumber = mark.lineNumber;
obj.lineStart = mark.lineStart;
obj.filename = mark.filename;
obj.index = mark.index;
return obj;
}
function mark (obj){
if (state.parsingComplete && obj)
return obj;
if (obj === undefined)
obj = {};
obj.lineNumber = lineNumber;
obj.lineStart = lineStart;
obj.filename = options.filename;
obj.index = index;
return obj;
}
function literal (value){
return typeof value === "object" && value !== null ? {"type":Syntax.Literal,"value":value.value} : {"type":Syntax.Literal,"value":value};
}
function identifier (arg){
return typeof arg !== "string" ? arg || null : mark ({"type":Syntax.Identifier,"name":arg});
}
function property (key,value,kind){
if (kind === undefined)
kind = "init";
return {"type":Syntax.Property,"key":identifier (key),"value":identifier (value),"kind":kind};
}
function objectExpression (properties){
if (properties === undefined)
properties = [];
return {"type":Syntax.ObjectExpression,"properties":properties};
}
function memberExpression (obj,property,computed){
if (computed === undefined)
computed = false;
return {"type":Syntax.MemberExpression,"computed":computed,"object":identifier (obj),"property":identifier (property)};
}
function callExpression (name,arguments){
if (arguments === undefined)
arguments = [];
return {"type":Syntax.CallExpression,"callee":identifier (name),"arguments":arguments};
}
function superExpression (name,arguments,level){
if (arguments === undefined)
arguments = [];
if (level === undefined)
level = 1;
return {"type":Syntax.CallExpression,"callee":identifier (name),"arguments":arguments,"super":level};
}
function thisExpression (){
return {"type":Syntax.ThisExpression};
}
function arrayExpression (elements){
return {"type":Syntax.ArrayExpression,"elements":elements};
}
function assignmentExpression (left,operator,right){
return typeof operator !== "string" || operator [operator.length - 1] !== "=" ? {"type":Syntax.AssignmentExpression,"operator":"=","left":identifier (left),"right":identifier (operator)} : {"type":Syntax.AssignmentExpression,"operator":operator,"left":identifier (left),"right":identifier (right)};
}
function newExpression (callee,arguments){
if (arguments === undefined)
arguments = [];
return {"type":Syntax.NewExpression,"callee":identifier (callee),"arguments":arguments};
}
function sequenceExpression (expressions){
return {"type":Syntax.SequenceExpression,"expressions":expressions};
}
function conditionalExpression (test,trueExpression,falseExpression){
return {"type":Syntax.ConditionalExpression,"test":test,"consequent":identifier (trueExpression),"alternate":identifier (falseExpression)};
}
function logicalExpression (left,operator,right){
return {"type":Syntax.LogicalExpression,"operator":operator,"left":identifier (left),"right":identifier (right)};
}
function binaryExpression (left,operator,right){
return {"type":Syntax.BinaryExpression,"operator":operator,"left":identifier (left),"right":identifier (right)};
}
function unaryExpression (argument,operator,prefix){
if (prefix === undefined)
prefix = false;
return {"type":Syntax.UnaryExpression,"operator":operator,"argument":identifier (argument),"prefix":prefix};
}
function blockStatement (body,single){
if (body === undefined)
body = [];
return body instanceof Array ? mark ({"type":Syntax.BlockStatement,"body":body,"single":single}) : body;
}
function expressionStatement (expression){
return mark ({"type":Syntax.ExpressionStatement,"expression":expression});
}
function ifStatement (test,trueStatement,falseStatement){
if (falseStatement === undefined)
falseStatement = null;
return mark ({"type":Syntax.IfStatement,"test":test,"consequent":trueStatement,"alternate":falseStatement});
}
function whileStatement (test,body){
return mark ({"type":Syntax.WhileStatement,"test":test,"body":body});
}
function doWhileStatement (body,test){
return mark ({"type":Syntax.DoWhileStatement,"body":body,"test":test});
}
function doWhileStatement (body,test){
return mark ({"type":Syntax.DoWhileStatement,"body":body,"test":test});
}
function forStatement (left,test,update,body){
return mark ({"type":Syntax.ForStatement,"init":left,"test":test,"update":update,"body":body});
}
function forInStatement (left,right,body){
return mark ({"type":Syntax.ForInStatement,"left":left,"right":right,"body":body,"each":false});
}
function labeledStatement (label,statement){
return mark ({"type":Syntax.LabeledStatement,"label":identifier (label),"body":statement});
}
function catchClause (param,body){
return {"type":Syntax.CatchClause,"param":identifier (param),"body":body};
}
function tryStatement (block,handlers,finalizer){
return mark ({"type":Syntax.TryStatement,"block":block,"guardedHandlers":[],"handlers":handlers,"finalizer":finalizer});
}
function returnStatement (arg){
return mark ({"type":Syntax.ReturnStatement,"argument":identifier (arg)});
}
function throwStatement (arg){
return mark ({"type":Syntax.ThrowStatement,"argument":identifier (arg)});
}
function breakStatement (arg){
return mark ({"type":Syntax.BreakStatement,"label":identifier (arg)});
}
function continueStatement (arg){
return mark ({"type":Syntax.ContinueStatement,"label":identifier (arg)});
}
function debuggerStatement (){
return mark ({"type":Syntax.DebuggerStatement});
}
function functionExpression (name,params,body){
if (params === undefined)
params = [];
return {"type":Syntax.FunctionExpression,"id":identifier (name),"params":params,"defaults":[],"body":blockStatement (body),"rest":null,"generator":false,"expression":false};
}
function functionDeclaration (name,params,body){
if (params === undefined)
params = [];
return mark ({"type":Syntax.FunctionDeclaration,"id":identifier (name),"params":params,"defaults":[],"body":blockStatement (body),"rest":null,"generator":false,"expression":false});
}
function variableDeclarator (name,value){
return {"type":Syntax.VariableDeclarator,"id":identifier (name),"init":identifier (value)};
}
function variableDeclaration (variables){
return mark ({"type":Syntax.VariableDeclaration,"declarations":variables,"kind":"var"});
}
function program (elements,classes,initializations){
return {"type":Syntax.Program,"body":elements,"classes":classes,"initializations":initializations};
}
function parseArguments (){
var args = [];
expect ("(");
if (! match (")"))
while (index < length)
{
args.push (parseAssignmentExpression ());
if (match (")"))
break;
expect (",");
}
expect (")");
return args;
}
function parseArrayInitialiser (){
var elements = [];
expect ("[");
while (! match ("]"))
if (match (","))
{
lex ();
elements.push (null);
}
else
{
elements.push (parseAssignmentExpression ());
if (! match ("]"))
expect (",");
}
expect ("]");
return arrayExpression (elements);
}
function parseStatementList (){
var list = [], statement;
while (index < length)
{
if (match ("}"))
break;
statement = parseSourceElement ();
if (typeof statement === "undefined")
break;
list.push (statement);
}
return list;
}
function parseBlock (){
var block, oldPreventSequence;
expect ("{");
oldPreventSequence = state.preventSequence;
state.preventSequence = false;
block = parseStatementList ();
state.preventSequence = oldPreventSequence;
expect ("}");
return blockStatement (block);
}
function parseBlockOrNotBlock (){
var block, oldPreventSequence;
if (match ("{"))
return parseBlock ();
else
return blockStatement ([parseSourceElement ()], true);
}
function parseModuleSourceElements (){
var sourceElement, usedClasses = [], variableDeclarations = [], functionDeclarations = [];
expect ("{");
while (index < length)
{
if (match ("}"))
break;
var token = lookahead ();
if (token.type === Token.Keyword)
switch (token.value){
case "function":
functionDeclarations.push (parseFunctionDeclaration ());
continue;
case "var":
variableDeclarations.push (parseStatement ());
continue;
}
throwError ({}, "Module can contain variabled and functions only");
}
expect ("}");
return {"type":Syntax.BlockStatement,"body":variableDeclarations.concat (functionDeclarations)};
}
function parseUseStatement (){
var list = [];
expectKeyword ("use");
do
{
list.push (parseVariableIdentifier ());
if (! match (","))
break;
lex ();
}
 while (index < length);
consumeSemicolon ();
return list;
}
function parseClassDeclaration (){
var id, parent, token, temp, tempMark, staticMode, staticModeOnly, publicMode, usedClasses = [], variableDeclarations = [], functionDeclarations = [], oldInClass;
if (matchKeyword ("static"))
{
lex ();
staticModeOnly = true;
}
expectKeyword ("class");
id = mark (parseVariableIdentifier ());
if (matchKeyword ("extends"))
{
lex ();
parent = mark (parseVariableIdentifier ());
}
expect ("{");
oldInClass = state.inClass;
state.inClass = true;
while (index < length)
{
if (match ("}"))
break;
publicMode = undefined;
staticMode = staticModeOnly || false;
if (matchKeyword ("static"))
{
staticMode = true;
lex ();
}
if (matchKeyword ("public"))
publicMode = "public";
else
if (matchKeyword ("protected"))
publicMode = "protected";
else
if (matchKeyword ("private"))
publicMode = "private";
if (publicMode)
lex ();
if (! staticMode && matchKeyword ("static"))
{
staticMode = true;
lex ();
}
token = lookahead ();
temp = null;
if (token.type === Token.Keyword)
{
switch (token.value){
case "use":
if (staticMode && ! staticModeOnly || publicMode)
throwError ({}, Messages.WtfMan);
temp = true;
usedClasses = usedClasses.concat (parseUseStatement ());
continue;
case "function":
if (! staticMode)
state.superAvailable = true;
temp = parseFunctionDeclaration ();
state.superAvailable = false;
functionDeclarations.push (temp);
break;
case "var":
temp = parseVariableStatement ();
variableDeclarations.push (temp);
break;
}
}
else
if (token.type === Token.Punctuator && token.value === "(" || token.value === "{")
{
tempMark = mark ();
temp = token.value === "(" ? parseFunctionArguments () : [];
if (! staticMode)
state.superAvailable = true;
temp = setMark (functionExpression ("@", temp, parseFunctionSourceElements ()), tempMark);
state.superAvailable = false;
functionDeclarations.push (temp);
}
if (temp)
{
temp.staticMode = ! ! staticMode;
temp.publicMode = publicMode || "private";
}
else
{
console.log (token, temp);
throwError ({}, "Class can contain variabled and functions only");
}
}
expect ("}");
state.classes.push ({"id":id,"parent":parent || null,"uses":usedClasses,"variables":variableDeclarations,"functions":functionDeclarations});
state.inClass = oldInClass;
return null;
}
function parseSuperStatement (){
var level = 1, name, temp, arguments;
expectKeyword ("super");
if (! state.superAvailable)
throwError ({}, "Super can be used in class functions only");
while (match ("."))
{
lex ();
if (matchKeyword ("super"))
{
level++;
lex ();
}
else
{
name = parseVariableIdentifier ();
break;
}
}
arguments = parseArguments ();
consumeSemicolon ();
return expressionStatement (superExpression (name, arguments, level));
}
function parseContinueStatement (){
var token, label = null;
expectKeyword ("continue");
if (source [index] === ";")
{
lex ();
return continueStatement ();
}
if (peekLineTerminator ())
return continueStatement ();
token = lookahead ();
if (token.type === Token.Identifier)
label = parseVariableIdentifier ();
consumeSemicolon ();
return continueStatement (label);
}
function parseBreakStatement (){
var token, label = null;
expectKeyword ("break");
if (source [index] === ";")
{
lex ();
return breakStatement ();
}
if (peekLineTerminator ())
return breakStatement ();
token = lookahead ();
if (token.type === Token.Identifier)
label = parseVariableIdentifier ();
consumeSemicolon ();
return breakStatement (label);
}
function parseReturnStatement (){
var token, argument = null;
expectKeyword ("return");
if (source [index] === " " && isIdentifierStart (source [index + 1]))
{
argument = parseExpression ();
consumeSemicolon ();
return returnStatement (argument);
}
if (peekLineTerminator ())
return returnStatement ();
if (! match (";"))
{
token = lookahead ();
if (! match ("}") && token.type !== Token.EOF)
argument = parseExpression ();
}
consumeSemicolon ();
return returnStatement (argument);
}
function parseThrowStatement (){
var argument;
expectKeyword ("throw");
if (peekLineTerminator ())
throwError ({}, Messages.NewlineAfterThrow);
argument = parseExpression ();
consumeSemicolon ();
return throwStatement (argument);
}
function parseDebuggerStatement (){
expectKeyword ("debugger");
consumeSemicolon ();
return debuggerStatement ();
}
function parseEmptyStatement (){
expect (";");
return {"type":Syntax.EmptyStatement};
}
function parseExpressionStatement (){
var expr = parseExpression ();
consumeSemicolon ();
return {"type":Syntax.ExpressionStatement,"expression":expr};
}
function parseFunctionArguments (defaults){
var token, temp, params = [];
expect ("(");
if (! match (")"))
while (index < length)
{
token = lookahead ();
temp = parseVariableIdentifier ();
if (defaults && match ("="))
{
lex ();
defaults.push (ifStatement (binaryExpression (temp.name, "===", "undefined"), expressionStatement (assignmentExpression (temp.name, parseAssignmentExpression ()))));
}
params.push (temp);
if (match (")"))
break;
expect (",");
}
expect (")");
return params;
}
function parseSourceElement (){
var token = lookahead ();
if (token.type === Token.Keyword)
switch (token.value){
case "function":
return parseFunctionDeclaration ();
default:return parseStatement ();
}
if (token.type !== Token.EOF)
return parseStatement ();
}
function parseFunctionSourceElements (){
var sourceElement, oldPreventSequence, sourceElements = [];
if (match ("{"))
{
expect ("{");
oldPreventSequence = state.preventSequence;
state.preventSequence = false;
while (index < length)
{
if (match ("}"))
break;
sourceElement = parseSourceElement ();
if (typeof sourceElement === "undefined")
break;
sourceElements.push (sourceElement);
}
state.preventSequence = oldPreventSequence;
expect ("}");
}
else
sourceElements.push (setReturnStatement (parseSourceElement ()));
return blockStatement (sourceElements);
}
function parseFunctionDeclarationOrExpression (){
var result = parseFunctionExpression ();
if (match ("("))
{
result = callExpression (result, parseArguments ());
}
else
if (result.id !== null)
result.type = Syntax.FunctionDeclaration;
if (result.type !== Syntax.FunctionDeclaration)
result = expressionStatement (result);
return result;
}
function parseFunctionDeclaration (){
var token, id, params, defaults = [], body;
expectKeyword ("function");
token = lookahead ();
id = parseVariableIdentifier ();
params = match ("(") ? parseFunctionArguments (defaults) : [identifier ("arg")];
body = parseFunctionSourceElements ();
if (defaults.length)
body.body = defaults.concat (body.body);
return functionDeclaration (id, params, body);
}
function parseFunctionExpression (){
var token, id = null, params, defaults = [], body;
expectKeyword ("function");
if (! match ("("))
{
token = lookahead ();
id = parseVariableIdentifier ();
}
params = match ("(") ? parseFunctionArguments (defaults) : [identifier ("arg")];
body = parseFunctionSourceElements (defaults);
if (defaults.length)
body.body = defaults.concat (body.body);
return functionExpression (id, params, body);
}
function setReturnStatement (data){
if (data)
{
if (data.type === Syntax.ExpressionStatement)
{
data.type = Syntax.ReturnStatement;
data.argument = data.expression;
delete data.expression;
}
else
if (data.type === Syntax.IfStatement)
{
setReturnStatement (data.consequent);
setReturnStatement (data.alternate);
}
else
if (data.type === Syntax.BlockStatement && data.single)
{
setReturnStatement (data.body [0]);
}
else
if (data.type === Syntax.TryStatement)
{
setReturnStatement (data.block);
if (data.handlers && data.handlers [0])
setReturnStatement (data.handlers [0].body);
if (data.finalizer)
setReturnStatement (data.finalizer);
}
}
return data;
}
function parseLambdaSourceElements (){
var sourceElements, oldPreventSequence, temp, saved;
oldPreventSequence = state.preventSequence;
state.preventSequence = true;
if (match ("{"))
{
saved = saveAll ();
try{
temp = parseObjectInitialiser ();
consumeSemicolon ();
sourceElements = [setReturnStatement (expressionStatement (temp))];
}catch (e){
restoreAll (saved);
sourceElements = parseFunctionSourceElements ();
}
}
else
sourceElements = [setReturnStatement (parseSourceElement ())];
state.preventSequence = oldPreventSequence;
return blockStatement (sourceElements);
}
function parseLambdaExpression (){
var token, param, defaults = [], params = [], body;
expectKeyword ("lambda");
params = match ("(") ? parseFunctionArguments (defaults) : [identifier ("arg")];
body = parseLambdaSourceElements ();
if (defaults.length)
body.body = defaults.concat (body.body);
return functionExpression (null, params, body);
}
function parseGroupExpression (){
expect ("(");
var result = parseExpression ();
expect (")");
return result;
}
function parseIfStatement (){
var test, consequent, alternate;
expectKeyword ("if");
expect ("(");
test = parseExpression ();
expect (")");
consequent = parseStatement ();
if (matchKeyword ("else"))
{
lex ();
alternate = parseStatement ();
}
else
alternate = null;
return {"type":Syntax.IfStatement,"test":test,"consequent":consequent,"alternate":alternate};
}
function parseDoWhileStatement (){
var body, test;
expectKeyword ("do");
body = parseStatement ();
expectKeyword ("while");
expect ("(");
test = parseExpression ();
expect (")");
if (match (";"))
lex ();
return doWhileStatement (body, test);
}
function parseWhileStatement (){
var test;
expectKeyword ("while");
expect ("(");
test = parseExpression ();
expect (")");
return whileStatement (test, parseStatement ());
}
function parseForVariableDeclaration (){
lex ();
return variableDeclaration (parseVariableDeclarationList ());
}
function parseForStatement (){
var init, test, update, left, right, body, temp, result, arrayMode;
init = test = update = null;
expectKeyword ("for");
expect ("(");
if (match (";"))
{
lex ();
}
else
{
if (matchKeyword ("var"))
{
state.allowIn = false;
init = parseForVariableDeclaration ();
state.allowIn = true;
if (init.declarations.length <= 2 && (matchKeyword ("in-array") && (arrayMode = 1) || matchKeyword ("in")))
{
lex ();
left = init;
right = parseExpression ();
init = null;
}
}
else
{
state.allowIn = false;
init = parseExpression ();
state.allowIn = true;
if (matchKeyword ("in-array") && (arrayMode = 1) || matchKeyword ("in"))
{
if (! isLeftHandSide (init) && (init.type != "SequenceExpression" || init.expressions.length != 2))
throwError ({}, Messages.InvalidLHSInForIn);
lex ();
left = init;
right = parseExpression ();
init = null;
}
}
if (typeof left === "undefined")
expect (";");
}
if (typeof left === "undefined")
{
if (! match (";"))
test = parseExpression ();
expect (";");
if (! match (")"))
update = parseExpression ();
}
expect (")");
body = parseStatement ();
if (arrayMode)
if (left.type === Syntax.VariableDeclaration && left.declarations.length === 1)
{
left.declarations = [variableDeclarator (newIdentifier ()),left.declarations [0]];
}
else
if (left.type === Syntax.Identifier)
{
left = variableDeclaration ([variableDeclarator (newIdentifier ()),variableDeclarator (left)]);
arrayMode = 2;
}
if (typeof left === "undefined")
{
return forStatement (init, test, update, body);
}
else
if (left.type === Syntax.SequenceExpression && left.expressions.length === 2 || arrayMode === 2)
{
temp = body;
body = blockStatement ([expressionStatement (assignmentExpression (arrayMode === 2 ? left.declarations [1].id : left.expressions [1], memberExpression (right, arrayMode === 2 ? left.declarations [0].id : left.expressions [0], true)))]);
if (temp.type === Syntax.BlockStatement)
body.body = body.body.concat (temp.body);
else
body.body.push (temp);
if (arrayMode === 2)
left.declarations.length = 1;
else
left = left.expressions [0];
}
else
if (left.type === Syntax.VariableDeclaration && left.declarations.length === 2)
{
temp = body;
body = blockStatement ([variableDeclaration ([left.declarations [1]])]);
body.body [0].declarations [0].init = memberExpression (right, left.declarations [0].id, true);
if (temp.type === Syntax.BlockStatement)
body.body = body.body.concat (temp.body);
else
body.body.push (temp);
left.declarations.length = 1;
}
if (arrayMode)
{
if (left.type === Syntax.VariableDeclaration && ! left.declarations [0].init)
left.declarations [0].init = literal (0);
temp = left.type === Syntax.VariableDeclaration ? left.declarations [0].id : left.type === Syntax.SequenceExpression ? left.expressions [0] : left;
if (left.type === Syntax.Identifier)
left = assignmentExpression (left, literal (0));
result = forStatement (left, binaryExpression (temp, "<", memberExpression (right, "length")), unaryExpression (temp, "++", false), body);
}
else
result = forInStatement (left, right, body);
if (typeof temp !== "undefined" && right.type !== Syntax.Identifier)
{
var identifier = newIdentifier ();
temp = clone (right);
for (var n in right)
delete right [n];
right.type = Syntax.Identifier;
right.name = identifier;
return blockStatement ([variableDeclaration ([variableDeclarator (right, temp)]),result,expressionStatement (assignmentExpression (right, "undefined"))]);
}
return result;
}
function parsePropertyFunction (param,first){
return {"type":Syntax.FunctionExpression,"id":null,"params":param,"defaults":[],"body":parseFunctionSourceElements (),"rest":null,"generator":false,"expression":false};
}
function parseObjectPropertyKey (){
var token = lex ();
if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral)
return literal (token);
return identifier (token.value);
}
function parseObjectProperty (){
var token, key, id, param;
token = lookahead ();
if (token.type === Token.Identifier)
{
id = parseObjectPropertyKey ();
if (token.value === "get" && ! match (":"))
{
key = parseObjectPropertyKey ();
expect ("(");
expect (")");
return property (key, parsePropertyFunction ([]), "get");
}
else
if (token.value === "set" && ! match (":"))
{
key = parseObjectPropertyKey ();
expect ("(");
token = lookahead ();
if (token.type !== Token.Identifier)
{
expect (")");
throwError (token, Messages.UnexpectedToken, token.value);
return property (key, parsePropertyFunction ([]), "set");
}
else
{
param = [parseVariableIdentifier ()];
expect (")");
return property (key, parsePropertyFunction (param, token), "set");
}
}
else
{
expect (":");
return property (id, parseAssignmentExpression ());
}
}
else
if (token.type === Token.EOF || token.type === Token.Punctuator)
{
throwUnexpected (token);
}
else
{
key = parseObjectPropertyKey ();
expect (":");
return property (key, parseAssignmentExpression ());
}
}
function parseObjectInitialiser (){
var properties = [], property, name, kind, map = {}, toString = String;
expect ("{");
while (! match ("}"))
{
property = parseObjectProperty ();
if (property.key.type === Syntax.Identifier)
name = property.key.name;
else
name = toString (property.key.value);
kind = property.kind === "init" ? PropertyKind.Data : property.kind === "get" ? PropertyKind.Get : PropertyKind.Set;
if (Object.prototype.hasOwnProperty.call (map, name))
{
if (map [name] === PropertyKind.Data)
{
if (kind !== PropertyKind.Data)
throwError ({}, Messages.AccessorDataProperty);
}
else
{
if (kind === PropertyKind.Data)
throwError ({}, Messages.AccessorDataProperty);
else
if (map [name] & kind)
throwError ({}, Messages.AccessorGetSet);
}
map [name] |= kind;
}
else
map [name] = kind;
properties.push (property);
if (! match ("}"))
expect (",");
}
expect ("}");
return objectExpression (properties);
}
function parseNonComputedProperty (){
var token = lex ();
if (! isIdentifierName (token))
throwUnexpected (token);
return identifier (token.value);
}
function parseNonComputedMember (){
expect (".");
return parseNonComputedProperty ();
}
function parseComputedMember (){
expect ("[");
var temp = parseExpression ();
expect ("]");
return temp;
}
function parseNewExpression (){
expectKeyword ("new");
return newExpression (parseLeftHandSideExpression (), match ("(") ? parseArguments () : []);
}
function parseLeftHandSideExpressionAllowCall (){
var temp = matchKeyword ("new") ? parseNewExpression () : parsePrimaryExpression ();
while (match (".") || match ("[") || match ("("))
if (match ("("))
temp = callExpression (temp, parseArguments ());
else
if (match ("["))
temp = memberExpression (temp, parseComputedMember (), true);
else
temp = memberExpression (temp, parseNonComputedMember (), false);
return temp;
}
function parseLeftHandSideExpression (){
var temp = matchKeyword ("new") ? parseNewExpression () : parsePrimaryExpression ();
while (match (".") || match ("["))
if (match ("["))
temp = memberExpression (temp, parseComputedMember (), true);
else
temp = memberExpression (temp, parseNonComputedMember (), false);
return temp;
}
function parseMultiplicativeExpression (){
var temp = parseUnaryExpression ();
while (match ("*") || match ("/") || match ("%"))
temp = binaryExpression (temp, lex ().value, parseUnaryExpression ());
return temp;
}
function parseAdditiveExpression (){
var temp = parseMultiplicativeExpression ();
while (match ("+") || match ("-"))
temp = binaryExpression (temp, lex ().value, parseMultiplicativeExpression ());
return temp;
}
function parseShiftExpression (){
var temp = parseAdditiveExpression ();
while (match ("<<") || match (">>") || match (">>>"))
temp = binaryExpression (temp, lex ().value, parseAdditiveExpression ());
return temp;
}
function parseRelationalExpression (){
var temp, previousAllowIn;
previousAllowIn = state.allowIn;
state.allowIn = true;
temp = parseShiftExpression ();
while (match ("<") || match (">") || match ("<=") || match (">=") || previousAllowIn && matchKeyword ("in") || matchKeyword ("instanceof"))
temp = binaryExpression (temp, lex ().value, parseShiftExpression ());
state.allowIn = previousAllowIn;
return temp;
}
function parseEqualityExpression (){
var temp = parseRelationalExpression ();
while (match ("==") || match ("!=") || match ("===") || match ("!=="))
temp = binaryExpression (temp, lex ().value, parseRelationalExpression ());
return temp;
}
function parseBitwiseANDExpression (){
var temp = parseEqualityExpression ();
while (match ("&"))
{
lex ();
temp = binaryExpression (temp, "&", parseEqualityExpression ());
}
return temp;
}
function parseBitwiseXORExpression (){
var temp = parseBitwiseANDExpression ();
while (match ("^"))
{
lex ();
temp = binaryExpression (temp, "^", parseBitwiseANDExpression ());
}
return temp;
}
function parseBitwiseORExpression (){
var temp = parseBitwiseXORExpression ();
while (match ("|"))
{
lex ();
temp = binaryExpression (temp, "|", parseBitwiseXORExpression ());
}
return temp;
}
function parseLogicalANDExpression (){
var temp = parseBitwiseORExpression ();
while (match ("&&"))
{
lex ();
temp = logicalExpression (temp, "&&", parseBitwiseORExpression ());
}
return temp;
}
function parseLogicalORExpression (){
var temp = parseLogicalANDExpression ();
while (match ("||"))
{
lex ();
temp = logicalExpression (temp, "||", parseLogicalANDExpression ());
}
return temp;
}
function parseConditionalExpression (){
var temp, previousAllowIn, consequent;
temp = parseLogicalORExpression ();
if (match ("?"))
{
lex ();
previousAllowIn = state.allowIn;
state.allowIn = true;
consequent = parseAssignmentExpression ();
state.allowIn = previousAllowIn;
expect (":");
temp = conditionalExpression (temp, consequent, parseAssignmentExpression ());
}
return temp;
}
function parseAssignmentExpression (){
var token, temp;
token = lookahead ();
temp = parseConditionalExpression ();
if (matchAssign ())
{
if (! isLeftHandSide (temp))
throwError ({}, Messages.InvalidLHSInAssignment);
temp = assignmentExpression (temp, lex ().value, parseAssignmentExpression ());
}
return temp;
}
function parseExpression (){
var temp = parseAssignmentExpression ();
if (! state.preventSequence && match (","))
{
temp = sequenceExpression ([temp]);
while (index < length)
{
if (! match (","))
break;
lex ();
temp.expressions.push (parseAssignmentExpression ());
}
}
return temp;
}
function parsePostfixExpression (){
var expr = parseLeftHandSideExpressionAllowCall (), token;
token = lookahead ();
if (token.type !== Token.Punctuator)
return expr;
if ((match ("++") || match ("--")) && ! peekLineTerminator ())
{
if (! isLeftHandSide (expr))
throwError ({}, Messages.InvalidLHSInAssignment);
expr = unaryExpression (expr, lex ().value, false);
}
return expr;
}
function parseComplexString (str){
var args = parseArguments (), splitted, result, temp;
if (args.length === 0 || str.length === 0)
return literal (str);
splitted = str.split (new RegExp("%(" + args.map (function (a,i){
return i;
}).join ("|") + ")", "g")).map (function (a,i){
return i % 2 ? args [+ a] : a && literal (a);
}).filter (function (arg){
return arg;
});
result = splitted [0];
for (var i = 1; 
i < splitted.length; i++)
result = binaryExpression (result, "+", splitted [i]);
return result;
}
function parsePrimaryExpression (){
var token = lookahead (), type = token.type, temp;
if (type === Token.Identifier)
return identifier (lex ().value);
if (type === Token.StringLiteral || type === Token.NumericLiteral)
{
temp = lex ().value;
return match ("(") ? parseComplexString (temp) : literal (temp);
}
if (type === Token.Keyword)
{
if (matchKeyword ("this"))
{
lex ();
return {"type":Syntax.ThisExpression};
}
if (matchKeyword ("function"))
return parseFunctionExpression ();
if (matchKeyword ("lambda"))
return parseLambdaExpression ();
}
if (type === Token.BooleanLiteral)
{
lex ();
token.value = token.value === "true";
return literal (token);
}
if (type === Token.NullLiteral)
{
lex ();
token.value = null;
return literal (token);
}
if (match ("["))
return parseArrayInitialiser ();
if (match ("{"))
return parseObjectInitialiser ();
if (match ("("))
return parseGroupExpression ();
if (match ("/") || match ("/="))
return literal (scanRegExp ());
return throwUnexpected (lex ());
}
function parseProgramElement (){
var token = lookahead (), temp, result;
if (token.type === Token.Keyword)
switch (token.value){
case "static":

case "class":
return parseClassDeclaration ();
case "function":
return parseFunctionDeclarationOrExpression ();
default:return parseStatement ();
}
if (options.initializationAllowed && token.type === Token.Punctuator && (token.value === "(" || token.value === "{"))
{
saved = saveAll ();
try{
temp = token.value === "(" ? parseFunctionArguments () : [];
result = expressionStatement (callExpression (functionExpression (null, temp, parseBlock ())));
result.after = true;
return result;
}catch (e){
restoreAll (saved);
}
}
if (token.type !== Token.EOF)
return parseStatement ();
}
function parseProgram (){
var sourceElements = [], initializations = [], temp;
while (index < length)
{
temp = parseProgramElement ();
if (temp === null)
continue;
if (typeof temp === "undefined")
break;
sourceElements.push (temp);
}
state.parsingComplete = true;
if (options.insertReturn && sourceElements.length === 1)
setReturnStatement (sourceElements [0]);
sourceElements = sourceElements.filter (function (arg){
if (arg.after)
{
initializations.push (arg);
return false;
}
else
return true;
});
return program (sourceElements, state.classes, initializations);
}
function parseStatement (){
var token = lookahead (), expr, saved;
if (token.type === Token.EOF)
throwUnexpected (token);
if (token.type === Token.Punctuator)
switch (token.value){
case ";":
return parseEmptyStatement ();
case "{":
try{
saved = saveAll ();
expr = parseObjectInitialiser ();
consumeSemicolon ();
return expressionStatement (expr);
}catch (e){
restoreAll (saved);
return parseBlock ();
}
case "(":
return parseExpressionStatement ();
case ".":
if (source [token.range [0] + 1] === "." && source [token.range [0] + 2] === ".")
{
lex ();
lex ();
lex ();
return expressionStatement (callExpression (memberExpression ("console", "warn"), [literal ("Not implemented at " + lineNumber + " line of " + options.filename)]));
}
}
if (token.type === Token.Keyword)
switch (token.value){
case "break":
return parseBreakStatement ();
case "continue":
return parseContinueStatement ();
case "debugger":
return parseDebuggerStatement ();
case "do":
return parseDoWhileStatement ();
case "for":
return parseForStatement ();
case "function":
return parseFunctionDeclarationOrExpression ();
case "if":
return parseIfStatement ();
case "return":
return parseReturnStatement ();
case "switch":
return parseSwitchStatement ();
case "throw":
return parseThrowStatement ();
case "try":
return parseTryStatement ();
case "var":
return parseVariableStatement ();
case "while":
return parseWhileStatement ();
case "with":
return parseWithStatement ();
case "super":
return parseSuperStatement ();
default:break;
}
expr = parseExpression ();
if (expr.type === Syntax.Identifier && match (":"))
{
lex ();
return labeledStatement (expr, parseStatement ());
}
consumeSemicolon ();
return expressionStatement (expr);
}
function parseSwitchCase (){
var test, consequent = [], statement;
if (matchKeyword ("default"))
{
lex ();
test = null;
}
else
{
expectKeyword ("case");
test = parseExpression ();
}
expect (":");
while (index < length)
{
if (match ("}") || matchKeyword ("default") || matchKeyword ("case"))
break;
statement = parseStatement ();
if (typeof statement === "undefined")
break;
consequent.push (statement);
}
return {"type":Syntax.SwitchCase,"test":test,"consequent":consequent};
}
function parseSwitchStatement (){
var discriminant, cases;
expectKeyword ("switch");
expect ("(");
discriminant = parseExpression ();
expect (")");
expect ("{");
cases = [];
if (match ("}"))
{
lex ();
return {"type":Syntax.SwitchStatement,"discriminant":discriminant,"cases":cases};
}
while (index < length)
{
if (match ("}"))
break;
cases.push (parseSwitchCase ());
}
expect ("}");
return {"type":Syntax.SwitchStatement,"discriminant":discriminant,"cases":cases};
}
function parseCatchClause (){
var param;
expectKeyword ("catch");
if (match ("("))
{
expect ("(");
if (match (")"))
throwUnexpected (lookahead ());
param = parseVariableIdentifier ();
expect (")");
}
else
param = {"type":"Identifier","name":"e"};
return catchClause (param, parseBlockOrNotBlock ());
}
function parseTryStatement (){
var block, handlers = [], finalizer = null;
expectKeyword ("try");
block = parseBlockOrNotBlock ();
if (matchKeyword ("catch"))
handlers.push (parseCatchClause ());
if (matchKeyword ("finally"))
{
lex ();
finalizer = parseBlockOrNotBlock ();
}
if (finalizer === null && handlers.length === 0)
handlers.push (catchClause ("e", blockStatement ()));
return tryStatement (block, handlers, finalizer);
}
function parseUnaryExpression (){
var token, expr, temp;
token = lookahead ();
if (token.type !== Token.Punctuator && token.type !== Token.Keyword)
return parsePostfixExpression ();
if (match ("++") || match ("--"))
{
token = lex ();
expr = parseUnaryExpression ();
if (! isLeftHandSide (expr))
throwError ({}, Messages.InvalidLHSInAssignment);
return unaryExpression (expr, token.value);
}
if (match ("+") || match ("-") || match ("~") || match ("!"))
{
temp = lex ();
return unaryExpression (parseUnaryExpression (), temp.value, true);
}
if (matchKeyword ("delete") || matchKeyword ("void") || matchKeyword ("typeof"))
{
temp = lex ();
return unaryExpression (parseUnaryExpression (), temp.value, true);
}
return parsePostfixExpression ();
}
function parseVariableIdentifier (){
var token = lex ();
if (token.type !== Token.Identifier)
throwUnexpected (token);
return identifier (token.value);
}
function parseVariableDeclaration (kind){
var id = parseVariableIdentifier (), init = null;
if (match ("="))
{
lex ();
init = parseAssignmentExpression ();
}
return variableDeclarator (id, init);
}
function parseVariableDeclarationList (kind){
var list = [];
do
{
list.push (parseVariableDeclaration (kind));
if (! match (","))
break;
lex ();
}
 while (index < length);
return list;
}
function parseVariableStatement (){
var declarations;
expectKeyword ("var");
declarations = parseVariableDeclarationList ();
consumeSemicolon ();
return variableDeclaration (declarations);
}
function parseWithStatement (){
var object, body;
expectKeyword ("with");
expect ("(");
object = parseExpression ();
expect (")");
body = parseStatement ();
return {"type":Syntax.WithStatement,"object":object,"body":body};
}
function scanHexEscape (prefix){
var i, len, ch, code = 0;
len = prefix === "u" ? 4 : 2;
for (i = 0; 
i < len; ++ i)
{
if (index < length && isHexDigit (source [index]))
{
ch = source [index++];
code = code * 16 + "0123456789abcdef".indexOf (ch.toLowerCase ());
}
else
return "";
}
return String.fromCharCode (code);
}
function scanIdentifier (){
var start, id, restore;
if (! isIdentifierStart (source [index]))
return;
start = index;
id = source [index++];
if (id === "i" && source.substr (index, 7) === "n-array")
{
index += 7;
return {"type":Token.Keyword,"value":"in-array","lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
while (index < length)
{
if (! isIdentifierPart (source [index]))
break;
id += source [index++];
}
if (id.length === 1)
return {"type":Token.Identifier,"value":id,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
if (isKeyword (id))
return {"type":Token.Keyword,"value":id,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
if (id === "null")
return {"type":Token.NullLiteral,"value":id,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
if (id === "true" || id === "false")
return {"type":Token.BooleanLiteral,"value":id,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
return {"type":Token.Identifier,"value":id,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
function scanPunctuator (){
var start = index, ch1 = source [index], ch2, ch3, ch4;
if (ch1 === ";" || ch1 === "{" || ch1 === "}" || ch1 === "," || ch1 === "(" || ch1 === ")")
{
++ index;
return {"type":Token.Punctuator,"value":ch1,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
ch2 = source [index + 1];
if (ch1 === "." && ! isDecimalDigit (ch2))
return {"type":Token.Punctuator,"value":source [index++],"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
ch3 = source [index + 2];
ch4 = source [index + 3];
if (ch1 === ">" && ch2 === ">" && ch3 === ">" && ch4 === "=")
{
index += 4;
return {"type":Token.Punctuator,"value":">>>=","lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
if (ch1 === "=" && ch2 === "=" && ch3 === "=" || ch1 === "!" && ch2 === "=" && ch3 === "=" || ch1 === ">" && ch2 === ">" && ch3 === ">" || ch1 === "<" && ch2 === "<" && ch3 === "=" || ch1 === ">" && ch2 === ">" && ch3 === "=")
{
index += 3;
return {"type":Token.Punctuator,"value":ch1 + ch2 + ch3,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
if (ch2 === "=" && "<>=!+-*%&|^/".indexOf (ch1) >= 0 || ch1 === ch2 && "+-<>&|".indexOf (ch1) >= 0)
{
index += 2;
return {"type":Token.Punctuator,"value":ch1 + ch2,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
if ("[]<>+-*%&|^!~?:=/".indexOf (ch1) >= 0)
return {"type":Token.Punctuator,"value":source [index++],"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
function scanNumericLiteral (){
var number, start, ch;
ch = source [index];
assert (isDecimalDigit (ch) || ch === ".", "Numeric literal must start with a decimal digit or a decimal point");
start = index;
number = "";
if (ch !== ".")
{
number = source [index++];
ch = source [index];
if (number === "0")
{
if (ch === "x" || ch === "X")
{
number += source [index++];
while (index < length)
{
ch = source [index];
if (! isHexDigit (ch))
break;
number += source [index++];
}
if (number.length <= 2)
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
if (index < length)
{
ch = source [index];
if (isIdentifierStart (ch))
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
return {"type":Token.NumericLiteral,"value":parseInt (number, 16),"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
else
if (isOctalDigit (ch))
{
number += source [index++];
while (index < length)
{
ch = source [index];
if (! isOctalDigit (ch))
break;
number += source [index++];
}
if (index < length)
{
ch = source [index];
if (isIdentifierStart (ch) || isDecimalDigit (ch))
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
return {"type":Token.NumericLiteral,"value":parseInt (number, 8),"octal":true,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
if (isDecimalDigit (ch))
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
while (index < length)
{
ch = source [index];
if (! isDecimalDigit (ch))
break;
number += source [index++];
}
}
if (ch === ".")
{
number += source [index++];
while (index < length)
{
ch = source [index];
if (! isDecimalDigit (ch))
break;
number += source [index++];
}
}
if (ch === "e" || ch === "E")
{
number += source [index++];
ch = source [index];
if (ch === "+" || ch === "-")
number += source [index++];
ch = source [index];
if (isDecimalDigit (ch))
{
number += source [index++];
while (index < length)
{
ch = source [index];
if (! isDecimalDigit (ch))
break;
number += source [index++];
}
}
else
{
ch = "character " + ch;
if (index >= length)
ch = "<end>";
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
}
if (index < length)
{
ch = source [index];
if (isIdentifierStart (ch))
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
return {"type":Token.NumericLiteral,"value":parseFloat (number),"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
function scanStringLiteral (){
var str = "", quote, start, ch, code, unescaped, restore, octal = false;
quote = source [index];
assert (quote === "'" || quote === "\"" || quote === "`", "String literal must starts with a quote");
start = index;
++ index;
if (quote === "`")
{
while (index < length)
{
ch = source [index++];
if (ch === quote)
{
quote = "";
break;
}
else
if (ch === "\\" && source [index] === "`")
{
index++;
str += "`";
}
else
str += ch;
}
}
else
{
while (index < length)
{
ch = source [index++];
if (ch === quote)
{
quote = "";
break;
}
else
if (ch === "\\")
{
ch = source [index++];
if (! isLineTerminator (ch))
{
switch (ch){
case "n":
str += "\n";
break;
case "r":
str += "\r";
break;
case "t":
str += "\t";
break;
case "u":

case "x":
restore = index;
unescaped = scanHexEscape (ch);
if (unescaped)
{
str += unescaped;
}
else
{
index = restore;
str += ch;
}
break;
case "b":
str += "\b";
break;
case "f":
str += "\f";
break;
case "v":
str += "\u000b";
break;
default:if (isOctalDigit (ch))
{
code = "01234567".indexOf (ch);
if (code !== 0)
octal = true;
if (index < length && isOctalDigit (source [index]))
{
octal = true;
code = code * 8 + "01234567".indexOf (source [index++]);
if ("0123".indexOf (ch) >= 0 && index < length && isOctalDigit (source [index]))
code = code * 8 + "01234567".indexOf (source [index++]);
}
str += String.fromCharCode (code);
}
else
str += ch; break;
}
}
else
{
++ lineNumber;
if (ch === "\r" && source [index] === "\n")
++ index;
}
}
else
if (isLineTerminator (ch))
{
break;
}
else
str += ch;
}
}
if (quote !== "")
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
return {"type":Token.StringLiteral,"value":str,"octal":octal,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
function scanRegExp (){
var str, ch, start, pattern, flags, value, classMarker = false, restore, terminated = false;
buffer = null;
skipComment ();
start = index;
ch = source [index];
assert (ch === "/", "Regular expression literal must start with a slash");
str = source [index++];
while (index < length)
{
ch = source [index++];
str += ch;
if (ch === "\\")
{
ch = source [index++];
if (isLineTerminator (ch))
throwError ({}, Messages.UnterminatedRegExp);
str += ch;
}
else
if (classMarker)
{
if (ch === "]")
classMarker = false;
}
else
if (ch === "/")
{
terminated = true;
break;
}
else
if (ch === "[")
{
classMarker = true;
}
else
if (isLineTerminator (ch))
throwError ({}, Messages.UnterminatedRegExp);
}
if (! terminated)
throwError ({}, Messages.UnterminatedRegExp);
pattern = str.substr (1, str.length - 2);
flags = "";
while (index < length)
{
ch = source [index];
if (! isIdentifierPart (ch))
break;
++ index;
if (ch === "\\" && index < length)
{
ch = source [index];
if (ch === "u")
{
++ index;
restore = index;
ch = scanHexEscape ("u");
if (ch)
{
flags += ch;
str += "\\u";
for (; 
restore < index; ++ restore)
str += source [restore];
}
else
{
index = restore;
flags += "u";
str += "\\u";
}
}
else
str += "\\";
}
else
{
flags += ch;
str += ch;
}
}
try{
value = new RegExp(pattern, flags);
}catch (e){
throwError ({}, Messages.InvalidRegExp);
}
return {"literal":str,"value":value,"range":[start,index]};
}
function throwError (token,messageFormat){
var error, args = Array.prototype.slice.call (arguments, 2), msg = messageFormat.replace (/%(\d)/g, function (whole,index){
return args [index] || "";
});
if (typeof token.index === "number")
{
error = new Error("Line " + token.lineNumber + " (" + options.filename + "): " + msg);
error.index = token.index;
error.lineNumber = token.lineNumber;
error.column = token.index - token.lineStart + 1;
}
else
if (typeof token.lineNumber === "number")
{
error = new Error("Line " + token.lineNumber + " (" + options.filename + "): " + msg);
error.index = token.range [0];
error.lineNumber = token.lineNumber;
error.column = token.range [0] - lineStart + 1;
}
else
{
error = new Error("Line " + lineNumber + " (" + options.filename + "): " + msg);
error.index = index;
error.lineNumber = lineNumber;
error.column = index - lineStart + 1;
}
throw error;
}
function throwUnexpected (token){
if (token.type === Token.EOF)
throwError (token, Messages.UnexpectedEOS);
if (token.type === Token.NumericLiteral)
throwError (token, Messages.UnexpectedNumber);
if (token.type === Token.StringLiteral)
throwError (token, Messages.UnexpectedString);
if (token.type === Token.Identifier)
throwError (token, Messages.UnexpectedIdentifier);
if (token.type === Token.Keyword)
{
if (isFutureReservedWord (token.value))
throwError (token, Messages.UnexpectedReserved);
throwError (token, Messages.UnexpectedToken, token.value);
}
throwError (token, Messages.UnexpectedToken, token.value);
}
function assert (condition,message){
if (! condition)
throw new Error("ASSERT: " + message);
}
function sliceSource (from,to){
return source.slice (from, to);
}
function isDecimalDigit (ch){
return "0123456789".indexOf (ch) >= 0;
}
function isHexDigit (ch){
return "0123456789abcdefABCDEF".indexOf (ch) >= 0;
}
function isOctalDigit (ch){
return "01234567".indexOf (ch) >= 0;
}
function isIdentifierName (token){
return token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
}
var newIdentifier = (function (arg){
function busy (str){
return source.indexOf (str) !== - 1;
}
var lastIdentifier = 0;
return function (arg){
var str;
if (arg)
{
if (busy (arg))
for (var i = 0; 
busy (str = arg + (lastIdentifier++).toString (32)); i++)
;
else
str = arg;
}
else
while (busy (str = "_" + (lastIdentifier++).toString (32)))
;
return str;
};
}) ();
function clone (obj){
if (obj instanceof Array)
{
return obj.slice ();
}
else
if (typeof obj === "object")
{
var result = {};
for (var n in obj){
var v = obj[n];
result [n] = clone (v);
}
return result;
}
else
return obj;
}
function saveAll (){
return clone ({"index":index,"lineNumber":lineNumber,"lineStart":lineStart,"buffer":buffer});
}
function restoreAll (obj){
index = obj.index;
lineNumber = obj.lineNumber;
lineStart = obj.lineStart;
buffer = obj.buffer;
}
function advance (){
var ch, token;
skipComment ();
if (index >= length)
return {"type":Token.EOF,"lineNumber":lineNumber,"lineStart":lineStart,"range":[index,index]};
token = scanPunctuator ();
if (typeof token !== "undefined")
return token;
ch = source [index];
if (ch === "'" || ch === "\"" || ch === "`")
return scanStringLiteral ();
if (ch === "." || isDecimalDigit (ch))
return scanNumericLiteral ();
token = scanIdentifier ();
if (typeof token !== "undefined")
return token;
throwError ({}, Messages.UnexpectedToken, "ILLEGAL");
}
function lex (){
var token;
if (buffer)
{
index = buffer.range [1];
lineNumber = buffer.lineNumber;
lineStart = buffer.lineStart;
token = buffer;
buffer = null;
return token;
}
buffer = null;
return advance ();
}
function lookahead (){
var pos, line, start;
if (buffer !== null)
return buffer;
pos = index;
line = lineNumber;
start = lineStart;
buffer = advance ();
index = pos;
lineNumber = line;
lineStart = start;
return buffer;
}
function peekLineTerminator (){
var pos, line, start, found;
pos = index;
line = lineNumber;
start = lineStart;
skipComment ();
found = lineNumber !== line;
index = pos;
lineNumber = line;
lineStart = start;
return found;
}
function expect (value){
var token = lex ();
if (token.type !== Token.Punctuator || token.value !== value)
throwUnexpected (token);
}
function expectKeyword (keyword){
var token = lex ();
if (token.type !== Token.Keyword || token.value !== keyword)
throwUnexpected (token);
}
function match (value){
var token = lookahead ();
return token.type === Token.Punctuator && token.value === value;
}
function matchKeyword (keyword){
var token = lookahead ();
return token.type === Token.Keyword && token.value === keyword;
}
function matchAssign (){
var token = lookahead (), op = token.value;
if (token.type !== Token.Punctuator)
return false;
return op === "=" || op === "*=" || op === "/=" || op === "%=" || op === "+=" || op === "-=" || op === "<<=" || op === ">>=" || op === ">>>=" || op === "&=" || op === "^=" || op === "|=";
}
function consumeSemicolon (){
var token, line;
if (source [index] === ";")
{
lex ();
return;
}
line = lineNumber;
skipComment ();
if (lineNumber !== line)
return;
if (match (";"))
{
lex ();
return;
}
if (! state.preventSequence)
{
token = lookahead ();
if (token.type !== Token.EOF && ! match ("}"))
throwUnexpected (token);
}
}
function isLeftHandSide (expr){
return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
}
function doClasses (rawClasses,callback){
function getPosByName (name){
return classes.indexOf (classesByNames [name]);
}
function getByName (name){
return classesByNames [name];
}
function addClass (name,parent,uses,variables,functions){
var objectVariables = [], staticVariables = [], objectFunctions = [], staticFunctions = [], objectFields = {}, staticFields = {}, objectConstructor, staticInitialization, objectVariablesInitialization = [], staticVariablesInitialization = [], temp;
if (getByName (name.name))
throwError (name, Messages.ClassAlreadyDefined, name.name);
function getName (publicMode,id){
return publicMode !== "protected" ? id.name : publicMode === "protected" ? "_" + id.name : newIdentifier ();
}
for (var _8rcd828_85 = 0; _8rcd828_85 < variables.length; _8rcd828_85 ++){
var entry = variables[_8rcd828_85];
if (entry.staticMode)
{
entry.declarations.forEach (function (arg){
arg.publicMode = entry.publicMode;
staticVariables.push (arg);
staticFields [arg.id.name] = {"className":name,"publicMode":entry.publicMode,"name":getName (entry.publicMode, arg.id)};
});
}
else
entry.declarations.forEach (function (arg){
arg.publicMode = entry.publicMode;
objectVariables.push (arg);
objectFields [arg.id.name] = {"publicMode":entry.publicMode,"name":getName (entry.publicMode, arg.id),"type":"variable"};
temp = expressionStatement (assignmentExpression (memberExpression (thisExpression (), objectFields [arg.id.name].name), arg.init || "undefined"));
temp.comment = arg.id.name;
temp.autocreated = true;
objectVariablesInitialization.push (temp);
});
}
for (var _t8218d_86 = 0; _t8218d_86 < functions.length; _t8218d_86 ++){
var entry = functions[_t8218d_86];
if (entry.staticMode)
{
if (entry.id.name === "@")
{
staticInitialization = entry;
}
else
{
staticFunctions.push (entry);
staticFields [entry.id.name] = {"className":name,"publicMode":entry.publicMode,"name":getName (entry.publicMode, entry.id)};
entry.id.name = staticFields [entry.id.name].name;
}
}
else
{
if (entry.id.name === "@")
{
objectConstructor = entry;
}
else
{
objectFunctions.push (entry);
objectFields [entry.id.name] = {"publicMode":entry.publicMode,"name":getName (entry.publicMode, entry.id),"type":"function"};
entry.id.name = objectFields [entry.id.name].name;
}
}
}
if (objectVariablesInitialization.length)
{
if (! objectConstructor)
{
objectConstructor = functionExpression ();
objectConstructor.autocreated = true;
}
objectConstructor.body.body = objectVariablesInitialization.concat (objectConstructor.body.body);
}
if (staticVariablesInitialization.length)
{
if (! staticInitialization)
staticInitialization = functionExpression ();
staticInitialization.body.body = staticVariablesInitialization.concat (staticInitialization.body.body);
}
if (objectConstructor && objectConstructor.id)
objectConstructor.id = null;
if (staticInitialization && staticInitialization.id)
staticInitialization.id = null;
classes.push (classesByNames [name.name] = {"name":name,"parent":parent,"childs":[],"uses":uses,"objectVariables":objectVariables,"staticVariables":staticVariables,"objectFunctions":objectFunctions,"staticFunctions":staticFunctions,"objectConstructor":objectConstructor,"staticInitialization":staticInitialization,"objectFields":objectFields,"staticFields":staticFields});
}
function processClass (entry){
if (typeof entry === "string")
assert (entry = getByName (entry), "Class " + entry + " not found");
var variable = newIdentifier (), exclusions = {}, staticMode, createThat, mode, body, functions, variables, temp, extendsStatements, publicStaticFunctions, resultFunction;
assert (! entry.element, "Already processed");
function updateExclusions (obj,second){
if (obj instanceof Array)
{
for (var i = 0; 
i < obj.length; i++)
updateExclusions (obj [i], true);
}
else
if (obj && obj.type)
{
if (obj.type === "FunctionDeclaration" || obj.type === "FunctionExpression")
{
if (! second)
{
exclusions = clone (exclusions);
updateExclusions (obj.body, true);
obj.params.forEach (function (arg){
return exclusions [arg.name] = true;
});
}
}
else
if (obj.type === "VariableDeclarator")
{
exclusions [obj.id.name] = true;
}
else
{
for (var n in obj)
updateExclusions (obj [n], true);
}
}
}
function update (obj,name,second,parent){
if (obj instanceof Array)
{
for (var i = 0; 
i < obj.length; i++)
obj [i] = update (obj [i], name, true, obj) || obj [i];
}
else
if (obj && obj.type)
{
var oldExclusions = undefined, oldStaticMode, temp;
if (obj.type === Syntax.FunctionDeclaration || obj.type === Syntax.FunctionExpression)
{
oldExclusions = exclusions;
oldStaticMode = staticMode;
updateExclusions (obj);
staticMode = obj.staticMode;
if (! second)
createThat = false;
update (obj.body.body, second ? null : name, true, obj);
if (createThat && ! second)
{
temp = [variableDeclarator (thatVariable, thisExpression ())];
if (obj.body.body [0] && obj.body.body [0].type === Syntax.VariableDeclaration)
obj.body.body [0].declarations = temp.concat (obj.body.body [0].declarations);
else
obj.body.body = [variableDeclaration (temp)].concat (obj.body.body);
}
exclusions = oldExclusions;
staticMode = oldStaticMode;
}
else
if (obj.type === Syntax.Property)
{
obj.value = update (obj.value, name, true, obj) || obj.value;
}
else
if (obj.type === Syntax.Identifier)
{
if (! exclusions [obj.name])
{
if (entry.objectFields [obj.name])
{
if (staticMode)
throwError (obj, Messages.ObjectAccessError, obj.name);
if (entry.objectFields [obj.name].publicMode === "locked")
throwError (obj, Messages.PrivateAccessError, obj.name);
if (! name)
createThat = true;
temp = memberExpression (name ? thisExpression () : thatVariable, entry.objectFields [obj.name].name);
if (entry.objectFields [obj.name].type === "function" && parent.type !== Syntax.CallExpression)
temp = callExpression (memberExpression (temp, "bind"), [name ? thisExpression () : thatVariable]);
return temp;
}
else
if (entry.staticFields [obj.name] && entry.staticFields [obj.name].publicMode !== "private")
{
if (entry.staticFields [obj.name].publicMode === "locked")
throwError (obj, Messages.PrivateAccessError, obj.name);
return memberExpression (entry.staticFields [obj.name].className === entry.name ? variable : entry.staticFields [obj.name].className.name, entry.staticFields [obj.name].name);
}
else
if (classesByNames [obj.name])
entry.probablyUseOther = (entry.probablyUseOther || 0) + 1;
}
}
else
if (obj.type === Syntax.MemberExpression)
{
obj.object = update (obj.object, name, true, obj) || obj.object;
if (obj.computed)
obj.property = update (obj.property, name, true, obj) || obj.property;
}
else
{
if (obj.type === Syntax.CallExpression && obj ["super"])
{
if (name === null && obj.callee === null)
throwError (obj, Messages.WtfMan);
var parent = entry, callee = obj.callee ? obj.callee.name : name;
for (var i = 0; 
i < obj ["super"]; i++)
{
parent = getByName (parent.parent.name);
if (! parent)
throwError (obj, Messages.SuperMethodsAreNotAvailable);
}
obj.callee = memberExpression (callee === "@" ? parent.name : memberExpression (memberExpression (parent.name, "prototype"), callee), "call");
obj.arguments = [thisExpression ()].concat (obj.arguments);
}
for (var n in obj)
if (n !== "type")
obj [n] = update (obj [n], name, true, obj) || obj [n];
}
}
}
if (entry.objectConstructor)
{
update (entry.objectConstructor, "@");
entry.objectConstructor.body.body = entry.objectConstructor.body.body.filter (function (arg,i,array){
if (arg.autocreated && arg.type === Syntax.ExpressionStatement && arg.expression.right.name === "undefined")
for (var _70mn49i_87 = 0; _70mn49i_87 < array.length; _70mn49i_87 ++){
var e = array[_70mn49i_87];
if (e !== arg && e.type === Syntax.ExpressionStatement && e.expression.type === Syntax.AssignmentExpression && e.expression.left.type === Syntax.MemberExpression && e.expression.left.object.type === Syntax.ThisExpression && e.expression.left.property.name === arg.expression.left.property.name)
return false;
}
return true;
});
}
entry.objectFunctions.forEach (function (arg){
return update (arg, arg.id.name);
});
if (entry.staticInitialization)
update (entry.staticInitialization, "@");
entry.staticFunctions.forEach (function (arg){
return update (arg, arg.id.name);
});
entry.mode = "default";
if (! entry.childs.length && ! entry.objectConstructor && ! entry.parent && ! entry.objectFunctions.length && ! entry.objectVariables.length)
{
entry.mode = "static";
if (! entry.staticVariables.length && ! entry.staticFunctions.length)
entry.mode = ! entry.staticInitialization ? "empty" : "static-initialize-only";
}
if (entry.mode === "empty")
{
entry.element = variableDeclarator (entry.name.name, objectExpression ());
entry.uses = [];
}
else
if (entry.mode === "static-initialize-only")
{
entry.element = variableDeclarator (entry.name.name, sequenceExpression ([callExpression (entry.staticInitialization),objectExpression ()]));
}
else
{
var resultFunction = [variableDeclaration (variables = [])];
if (entry.mode === "default")
{
variables.push (variableDeclarator (variable, entry.objectConstructor || functionExpression ()));
if (entry.parent)
{
temp = newIdentifier ();
variables.push (variableDeclarator (temp, functionExpression ()));
resultFunction.push (expressionStatement (assignmentExpression (memberExpression (temp, "prototype"), memberExpression (entry.parent.name, "prototype"))), expressionStatement (assignmentExpression (memberExpression (variable, "prototype"), newExpression (temp))), expressionStatement (assignmentExpression (memberExpression (memberExpression (variable, "prototype"), "constructor"), variable)), expressionStatement (assignmentExpression (temp, "undefined")));
}
{ var _3hsmpu7_88 = entry.objectFunctions; for (var _6c8ensd_89 = 0; _6c8ensd_89 < _3hsmpu7_88.length; _6c8ensd_89 ++){
var f = _3hsmpu7_88[_6c8ensd_89];
resultFunction.push (expressionStatement (assignmentExpression (memberExpression (memberExpression (variable, "prototype"), f.id.name), functionExpression (null, f.params, f.body))));
}}
}
else
if (entry.mode === "static")
{
variables.push (variableDeclarator (variable, objectExpression ()));
}
{ var _31sctbo_90 = entry.staticVariables; for (var _8kdbmpl_91 = 0; _8kdbmpl_91 < _31sctbo_90.length; _8kdbmpl_91 ++){
var v = _31sctbo_90[_8kdbmpl_91];
if (v.publicMode !== "private")
{
var temp = expressionStatement (assignmentExpression (memberExpression (variable, entry.staticFields [v.id.name].name), v.init || "undefined"));
if (entry.staticFields [v.id.name].publicMode === "protected")
temp.comment = v.id.name;
resultFunction.push (temp);
}
else
{
variables.push (v);
}
}}
{ var _7i9e2b4_92 = entry.staticFunctions; for (var _715cabj_93 = 0; _715cabj_93 < _7i9e2b4_92.length; _715cabj_93 ++){
var f = _7i9e2b4_92[_715cabj_93];
if (f.publicMode !== "private")
resultFunction.push (expressionStatement (assignmentExpression (memberExpression (variable, f.id.name), functionExpression (null, f.params, f.body))));
else
resultFunction.push (f);
}}
if (entry.staticInitialization)
resultFunction.push (expressionStatement (callExpression (entry.staticInitialization)));
resultFunction.push (returnStatement (variable));
entry.element = variableDeclarator (entry.name.name, callExpression (functionExpression (null, [], resultFunction)));
}
}
function checkForCircular (){
var current;
function check (identifier){
var entry = getByName (identifier.name);
assert (entry, "Class not found: " + identifier.name);
if (current [identifier.name])
throwError (identifier, Messages.CyclicDependencyDetected, identifier.name);
current [identifier.name] = true;
if (entry.parent)
check (entry.parent, entry.name);
{ var _86se3kn_94 = entry.uses; for (var _5upj3uf_95 = 0; _5upj3uf_95 < _86se3kn_94.length; _5upj3uf_95 ++){
var use = _86se3kn_94[_5upj3uf_95];
if (! entry.parent || use.name !== entry.parent.name)
check (use, entry.name);
}}
}
for (var _217rgos_96 = 0; _217rgos_96 < classes.length; _217rgos_96 ++){
var entry = classes[_217rgos_96];
current = {};
check (entry.name);
}
}
function connectClass (entry,from){
var parent;
if (typeof entry === "string")
assert (entry = getByName (entry), "Class " + entry + " not found");
if (from !== undefined)
entry.childs.push (from);
if (entry.connected)
return;
if (entry.parent !== null)
{
parent = getByName (entry.parent.name);
if (! parent)
{
throwError (entry.parent, Messages.ParentClassNotFound, entry.parent.name);
}
else
{
connectClass (entry.parent.name, entry.name);
{ var _2c1qnoi_97 = parent.objectFields; for (var n in _2c1qnoi_97){
var v = _2c1qnoi_97[n];
if (! entry.objectFields [n])
entry.objectFields [n] = {"publicMode":v.publicMode === "private" ? "locked" : v.publicMode,"name":v.name};
}}
{ var _kulq30_98 = parent.staticFields; for (var n in _kulq30_98){
var v = _kulq30_98[n];
if (! entry.staticFields [n])
entry.staticFields [n] = {"publicMode":v.publicMode === "private" ? "locked" : v.publicMode,"name":v.name,"className":v.className};
}}
if (parent.objectConstructor)
{
if (! entry.objectConstructor)
{
entry.objectConstructor = functionExpression (null, parent.objectConstructor.params, [expressionStatement (superExpression (null, parent.objectConstructor.params))]);
}
else
if (! entry.objectConstructor.body.body.filter (function (arg){
return arg.type === Syntax.ExpressionStatement && arg.expression ["super"];
}).length)
{
if (entry.objectConstructor.autocreated || parent.objectConstructor.params.length === 0)
{
if (entry.objectConstructor.autocreated)
entry.objectConstructor.params = parent.objectConstructor.params;
entry.objectConstructor.body.body = [expressionStatement (superExpression (null, parent.objectConstructor.params))].concat (entry.objectConstructor.body.body);
}
else
{
throwError (entry.objectConstructor, Messages.SuperConstructorCallNeeded);
}
}
}
}
}
{ var _95kott5_99 = entry.uses; for (var _4g2fp0r_100 = 0; _4g2fp0r_100 < _95kott5_99.length; _4g2fp0r_100 ++){
var use = _95kott5_99[_4g2fp0r_100];
if (! getByName (use.name))
throwError (use, Messages.UsingClassNotFound, use.name);
}}
entry.connected = true;
}
function connectClasses (){
for (var _87th6vj_101 = 0; _87th6vj_101 < classes.length; _87th6vj_101 ++){
var entry = classes[_87th6vj_101];
connectClass (entry);
}
}
function processClasses (){
for (var _7vgeqkk_102 = 0; _7vgeqkk_102 < classes.length; _7vgeqkk_102 ++){
var entry = classes[_7vgeqkk_102];
processClass (entry);
}
}
function sortClasses (){
function getWeight (entry){
if (typeof entry === "string")
assert (entry = getByName (entry), "Class not found: " + entry);
if (entry.weight)
return entry.weight;
entry.weight = entry.probablyUseOther ? 1 + Math.min (entry.probablyUseOther, probablyUseOtherMaxValue) / (probablyUseOtherMaxValue + 1) : 1;
if (entry.parent)
entry.weight += getWeight (entry.parent.name);
{ var _769bkul_103 = entry.uses; for (var _hlg22c_104 = 0; _hlg22c_104 < _769bkul_103.length; _hlg22c_104 ++){
var use = _769bkul_103[_hlg22c_104];
entry.weight += getWeight (use.name);
}}
return entry.weight;
}
for (var _4c52b2a_105 = 0; _4c52b2a_105 < classes.length; _4c52b2a_105 ++){
var entry = classes[_4c52b2a_105];
getWeight (entry);
}
classes.sort (function (a,b){
return a.weight - b.weight;
});
}
var classes = [], classesByNames = {}, probablyUseOtherMaxValue = 100, thatVariable = newIdentifier ();
for (var _38ilokg_106 = 0; _38ilokg_106 < rawClasses.length; _38ilokg_106 ++){
var entry = rawClasses[_38ilokg_106];
addClass (entry.id, entry.parent, entry.uses, entry.variables, entry.functions);
}
if (classes.length !== 0)
{
checkForCircular ();
connectClasses ();
sortClasses ();
processClasses ();
callback ([variableDeclaration (classes.map (function (arg){
return arg.element;
}))]);
}
else
callback ([]);
}
function isWhiteSpace (ch){
return ch === " " || ch === "\t" || ch === "\u000b" || ch === "\f" || ch === " " || ch.charCodeAt (0) >= 5760 && " ᠎             　﻿".indexOf (ch) >= 0;
}
function isLineTerminator (ch){
return ch === "\n" || ch === "\r";
}
function jsxParse (code,args,callback){
source = String (code);
index = 0;
lineNumber = source.length ? 1 : 0;
lineStart = 0;
length = source.length;
buffer = null;
state = {"allowIn":true,"inClass":false,"parsingComplete":false,"preventSequence":false,"classes":[]};
options = args || {"filename":"[ not a file ]","insertReturn":false,"initializationAllowed":false};
var result = parseProgram ();
if (typeof callback === "function")
callback (result);
else
return result;
}
function Queue (object,mode){
if (object === undefined)
object = null;
if (mode === undefined)
mode = Queue.MODE_SEQUENT;
if (typeof object === "string")
{
mode = object;
object = null;
}
console.assert (mode, "Wrong mode");
this.total = 0;
this.finished = 0;
this.results = [];
this.mode = mode;
this.object = object;
this.delayed = [];
this._description = "[ unnamed ]";
}
Queue.MODE_SEQUENT = "MODE_SEQUENT";
Queue.MODE_PARALLEL = "MODE_PARALLEL";
Queue.prototype.description = function (description){
this._description = description;
return this;
};
Queue.prototype.complete = function (id,args,data){
if (id !== undefined)
{
console.assert (! this.results [id], "Already returned (at " + this._description + ")");
this.finished++;
this.results [id] = {"result":args instanceof Array ? args : [].slice.call (args),"data":data};
}
if (this.finished === this.total && this.callback)
{
console.assert (! this.done, "Already finished (at " + this._description + ")");
this.callback.call (this.object, this.results);
this.done = true;
}
if (this.mode === Queue.MODE_SEQUENT && this.finished < this.total && this.finished == this.results.length)
{
console.assert (typeof this.delayed [this.finished] === "function", "Delayed call missing");
this.delayed [this.finished] ();
}
};
Queue.prototype.makeCall = function (fn,args,data){
var id = this.total++, done = false;
args.push (function (arg){
console.assert (! done, "Already returned (at " + this._description + ")");
done = true;
this.complete (id, arguments, data);
}.bind (this));
return function (arg){
this.results [id] = undefined;
var result = fn.apply (this.object, args);
if (result !== undefined)
{
console.assert (! done, "Already returned in callback (at " + this._description + ")");
done = true;
this.complete (id, [result], data);
}
}.bind (this);
};
Queue.prototype.add = function (data,fn){
var args;
if (typeof data === "function")
{
args = [].slice.call (arguments, 1);
fn = data;
data = undefined;
}
else
args = [].slice.call (arguments, 2);
console.assert (typeof fn === "function", "Invalid argument (at " + this._description + ")");
var call = this.makeCall (fn, args, data);
if (this.mode === Queue.MODE_PARALLEL || this.mode === Queue.MODE_SEQUENT && this.finished == this.results.length)
{
call ();
}
else
{
this.delayed [this.total - 1] = call;
}
return this;
};
Queue.prototype.run = function (callback){
console.assert (! this.callback, "Already runned (at " + this._description + ")");
console.assert (typeof callback === "function", "Invalid argument (at " + this._description + ")");
this.callback = callback;
this.complete ();
return this;
};
console.fatal = function (code){
console.error.apply (console, Array.prototype.slice.call (arguments, typeof code === "number" ? 1 : 0));
process.exit (typeof code === "number" ? code : 0);
};
console.json = function (obj){
console.log (JSON.stringify (obj, false, 2));
};
function convert (jsxCode,options){
try{
return require ("escodegen").generate (typeof jsxCode === "string" ? jsxParse (jsxCode, typeof options === "string" ? {"filename":options} : options) : jsxCode);
}catch (e){
console.log ("ERROR AT PARSING:\n" + jsxCode);
throw e;
}
}
function addLog (p,key,fn){
if (! p || ! p.prototype)
{
fn = key;
key = p;
p = null;
}
if (typeof key === "number")
key = new Array(key + 1).join ("  ");
else
key = key + 1;
var size = 32, r = function (arg){
var f = [key + (typeof fn === "function" ? fn.call (this) : fn) + ":"];
if (f [0].length > size)
f [0] = f [0].substr (0, size - 4) + "...:";
f [0] += new Array(1 + size - f [0].length).join (" ");
f.push.apply (f, arguments);
console.log.apply (console, f);
};
return p ? (p.prototype.log = r) : r;
}
function Worker (path){
this.path = path;
this.mainFile = undefined;
this.state = Worker.STATE_INITIAL;
this.data = {"statements":[],"classes":[],"initializations":[]};
}
Worker.STATE_WAITING = - 1;
Worker.STATE_INITIAL = 0;
Worker.STATE_STARTED = 1;
Worker.STATE_COLLECTED = 2;
Worker.STATE_CLASSES = 3;
Worker.STATE_GENERATED = 4;
Worker.STATE_FINISHED = 5;
addLog (Worker, 0, "app");
Worker.prototype.waitForFinish = function (callback){
var interval = setInterval (function (arg){
if (fileStorage.everythingFinished ())
{
clearInterval (interval);
callback ();
}
else
if (fileStorage.has (function (arg){
return arg.state !== File.STATE_FINISHED && arg.state !== File.STATE_MACRO_WAITING;
}) && MacroCall.waitingForCallback === 0 && MacroCall.waitingForMacro > 0)
{
console.fatal ("Macro initialization error");
}
}, 100);
};
Worker.prototype.start = function (callback){
console.assert (this.state == Worker.STATE_INITIAL, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
this.log ("started");
{ var _4hfgn6o_14 = File.find ("default/*") || []; for (var _7elijnb_15 = 0; _7elijnb_15 < _4hfgn6o_14.length; _7elijnb_15 ++){
var file = _4hfgn6o_14[_7elijnb_15];
file.process ();
}}
this.mainFile = new File(this.path);
this.mainFile.process ();
this.waitForFinish (function (arg){
fileStorage.sort ();
this.log ("files processed and sorted");
this.state = Worker.STATE_STARTED;
callback ();
}.bind (this));
};
Worker.prototype.collect = function (callback){
console.assert (this.state == Worker.STATE_STARTED, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
{ var _726ej13_16 = fileStorage.files; for (var _527ehnc_17 = 0; _527ehnc_17 < _726ej13_16.length; _527ehnc_17 ++){
var file = _726ej13_16[_527ehnc_17];
Array.prototype.push.apply (this.data.statements, file.parsed.body);
Array.prototype.push.apply (this.data.classes, file.parsed.classes);
Array.prototype.push.apply (this.data.initializations, file.parsed.initializations);
}}
this.log ("parsed stuff collected");
this.state = Worker.STATE_COLLECTED;
callback ();
};
Worker.prototype.classes = function (callback){
console.assert (this.state == Worker.STATE_COLLECTED, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
doClasses (this.data.classes, function (arg){
this.log ("classes processed");
this.state = Worker.STATE_CLASSES;
this.data.classes = arg;
callback ();
}.bind (this));
};
Worker.prototype.generate = function (callback){
console.assert (this.state == Worker.STATE_CLASSES, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
var elements = this.data.statements.concat (this.data.classes).concat (this.data.initializations), ast = program (elements), result = convert (ast);
this.log ("js generated");
this.state = Worker.STATE_GENERATED;
this.result = result;
callback ();
};
Worker.prototype.save = function (callback){
console.assert (this.state == Worker.STATE_GENERATED, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
var saveTo = this.mainFile.fullpath.replace (/(\.[^\/\\\.]+)?$/, function (arg){
return arg === ".js" ? arg : "";
}) + ".js";
fs.writeFile (saveTo, this.result, function (arg){
this.log ("saved");
this.state = Worker.STATE_FINISHED;
callback ();
}.bind (this));
};
Worker.prototype.process = function (callback){
new Queue(this, Queue.MODE_SEQUENT).description ("worker").add (this.start).add (this.collect).add (this.classes).add (this.generate).add (this.save).run (function (arg){
console.assert (this.state == Worker.STATE_FINISHED, "Wrong state (" + this.state + ")");
if (callback !== undefined)
callback (this);
});
};

__m()