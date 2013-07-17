(function(){function c(b){if(d[b])return d[b];throw"Not found: "+b;}function e(b,a){a=c(b);a.__z||(a.__g=1,a.__gi().forEach(function(a){if("@"!=a[0]){if(c(a).__g)throw"Cycle: "+b+", "+a;c(a).__z||e(a)}}),a.__in(),a.init&&a.init(),a.__z=1,delete a.__g)}var d={},f="u"!=(typeof window)[0]&&window||GLOBAL;f.__m=function(b,a){if(a)d[b]=a();else{for(a in d)b=c(a),b.__si.apply(b,b.__gi().map(function(a){return c("@"==a[0]?a.slice(1):a)}));for(a in d)e(a);delete f.__m}}})();
Object.extend=function(a,b){var result={};for(n in a)result[n]=a[n];for(n in b)result[n]=b[n];return result};

!function(st){function pp(params,args){for(var r,i=0;i<params.length;i++)params[i]=null!=(r=paramph.exec(params[i]))?args[Number(r[1])]:params[i].replace(/\0/g,",");return params}function fl(s,len){if(len=Number(len),isNaN(len))return s;s=""+s;var nl=Math.abs(len)-s.length;if(0>=nl)return s;for(;sp.length<nl;)sp+=sp;return 0>len?s+sp.substring(0,nl):sp.substring(0,nl)+s}st.format=function(){if(0==arguments.length)return this;var placeholder=/\{(\d+)(?:,([-+]?\d+))?(?:\:([^(^}]+)(?:\(((?:\\\)|[^)])+)\)){0,1}){0,1}\}/g,args=arguments;return this.replace(placeholder,function(m,num,len,f,params){return m=args[Number(num)],f=formatters[f],fl(null==f?m:f(m,pp((params||"").replace(/\\\)/g,")").replace(/\\,/g,"\0").split(","),args)),len)})},String.format=function(format){return arguments.length<=1?format:st.format.apply(format,Array.prototype.slice.call(arguments,1))},st.format.add=function(name,func,replace){if(null!=formatters[name]&&!replace)throw"Format "+name+" exist, use replace=true for replace";formatters[name]=func},String.format.init=st.format.init=function(param){var f;for(n in param)f=formatters[n],null!=f&&null!=f.init&&f.init(param[n])},st.format.get=function(name){return formatters[name]};var paramph=/^\{(\d+)\}$/,formatters={},sp="    ";st.format.add("arr",function arr(va,params){if(null==va)return"null";var v=[],j=params.shift()||"",f=formatters[params.shift()];if(null==f)v=va;else for(var i=0;i<va.length;i++)v.push(f(va[i],params));return v.join(j)})}(String.prototype);

__m ("Node", function (){
var optimist, argv;
var fs, cp, path;
function fatalError (msg){
for (var i = 0; 
i < arguments.length; i++)
console.error (arguments [i]);
process.exit (1);
}
function safeAccess (what,purpose){
var cache;
return function (arg){
try{
return cache || (cache = require (what));
}catch (e){
fatalError ("Please, install \"{0}\" for {1}.".format (what, purpose || "work"), "> npm install -g {0}.".format (what));
}
};
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
return {get fs (){return fs;},get cp (){return cp;},get path (){return path;},"fatalError":fatalError,"safeAccess":safeAccess,"args":args,"showHelp":showHelp,"readFile":readFile,"writeFile":writeFile,"resolve":resolve,"__gi":function (){
return [];
},"__si":function (){

},"__in":function (){
optimist = safeAccess ("optimist", "correct interact in shell");
fs = safeAccess ("fs");
cp = safeAccess ("child_process");
path = safeAccess ("path");
}};
});
__m ("Prework", function (){
function work (code){
if (code.substr (0, 2) == "#!")
return {"code":code.substr (code.indexOf ("\n") + 1),"node":true};
else
return {"code":code};
}
return {"work":work,"__gi":function (){
return [];
},"__si":function (){

},"__in":function (){

}};
});
__m ("Parser", function (){
var Node, JsCompress;
var source, builded, loaded;
var peg;
function getNearFile (file){
return Node.path ().resolve (__dirname, file);
}
function rebuildParser (){
if (! Node.fs ().existsSync (source))
Node.fatalError ("Parser source not found.");
try{
var tobuild = Node.readFile (source, "utf8"), result = "exports.parser=" + peg ().buildParser (tobuild, {"cache":true,"trackLineAndColumn":false}).toSource ();
result = result.replace ("return \"Expected \" + expectedHumanized", "return \"[\" + line + \": \" + column + \"] \" + \"Expected \" + expectedHumanized");
try{
result = JsCompress.work (result);
}catch (e){}
Node.writeFile (builded, result, "utf8");
}catch (e){
Node.fatalError ("Error while building parser:", e.stack);
}
}
function init (){
source = getNearFile ("js-ext.pegjs");
builded = getNearFile ("js-ext.cache");
}
function getReady (){
if (Node.args ().r || ! Node.fs ().existsSync (builded))
rebuildParser ();
loaded = require (builded).parser;
}
function work (code,filename){
try{
return loaded.parse (code);
}catch (e){
Node.fatalError ("Error while parsing \"" + filename + "\":", e.stack);
}
}
return {"init":init,"getReady":getReady,"work":work,"__gi":function (){
return ["Node","JsCompress"];
},"__si":function (){
Node = arguments [0];
JsCompress = arguments [1];
},"__in":function (){
peg = Node.safeAccess ("pegjs", "build parser");
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
var f, types;
function work (arg){
reset ();
return {"code":f (arg).trim (),"additional":additional,"jsx":jsx};
}
return {"work":work,"__gi":function (){
return ["Node"];
},"__si":function (){
Node = arguments [0];
},"__in":function (){
eol = "\n";
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
},"ForInStatement":function (arg){
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
__m ("Converter", function (){
var Node;
var moduleName, minimize, minimizeInstance, modules;
function jsonFunction (name,content){
return {"type":"PropertyAssignment","name":name,"value":{"type":"Function","name":null,"params":[],"elements":content}};
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
return {"tree":clone (parsed),"modules":! ! modules};
}
return {"work":work,"__gi":function (){
return ["Node"];
},"__si":function (){
Node = arguments [0];
},"__in":function (){
moduleName = "__m";
minimize = Node.safeAccess ("minimize", "compress html");
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
},"StringLiteral":function (arg){
var result;
switch (arg.special){
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
default:result = arg.value;
}
return {"type":"StringLiteral","value":result};
},"Module":function (arg){
modules = true;
var getImports = [], setupImports = [], exported = [], variableInitialize = [], newElements = [];
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
setupImports.push ({"type":"ExpressionStatement","value":{"type":"AssignmentExpression","operator":"=","left":{"type":"Variable","name":clear},"right":{"type":"PropertyAccess","base":{"type":"Variable","name":"arguments"},"name":{"type":"NumericLiteral","value":setupImports.length}}}});
arg [k] = {"type":"VariableDeclaration","name":clear,"value":null};
}
return arg;
}) (clone (e.declarations))});
}
else
{
var newE = clone (e);
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
exported.push (jsonFunction ("__gi", [{"type":"ReturnStatement","value":{"type":"ArrayLiteral","elements":getImports}}]), jsonFunction ("__si", setupImports), jsonFunction ("__in", variableInitialize));
newElements.push ({"type":"ReturnStatement","value":{"type":"ObjectLiteral","properties":exported}});
return {"type":"ExpressionStatement","value":{"type":"FunctionCall","name":{"type":"Variable","name":moduleName},"arguments":[{"type":"StringLiteral","value":clone (arg.identifier)},{"type":"Function","name":null,"params":[],"elements":newElements}]}};
}};
}};
});
__m ("JsCompress", function (){
var Node;
var jsCompressor;
function work (code,filename){
var str = jsCompressor ().OutputStream ({"comments":/^!<\?/}), prs = jsCompressor ().parse (code, {"filename":filename}), cmp = jsCompressor ().Compressor ({"unused":false,"warnings":Node.args ().o}), trn = prs.transform (cmp);
prs.print (str);
return str.toString ();
}
return {"work":work,"__gi":function (){
return ["Node"];
},"__si":function (){
Node = arguments [0];
},"__in":function (){
jsCompressor = Node.safeAccess ("uglify-js", "compress js");
}};
});
__m ("App", function (){
var Node, Prework, Parser, Converter, Format, JsCompress;
var moduleSystem;
var inputFile, outputFile, cacheFolder, argRebuildParser, argJsCompress, argPhpHeader, includesFolder;
var loadedFiles;
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
if (Node.fs ().existsSync (path))
return {"file":path,"top":top};
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
if (/^(on|true|1|yes)$/i.test (value))
return true;
if (/^(off|false|0|no)$/i.test (value))
return false;
Node.fatalError ("Wrong parameter value: \"" + value + "\".");
}
function loadAndParse (file,top){
var topMode = top === undefined;
if (topMode)
top = Node.path ().resolve (file, "..");
if (! Node.fs ().existsSync (file))
Node.fatalError ("Divided by zero.");
var content = Node.readFile (file), prework = Prework.work (content), parsed = Parser.work (prework.code, file), converted = Converter.work (parsed), formatted = Format.work (converted.tree);
function join (a,b){
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
if (typeof a.substr === "function")
{
return b + "\n\n" + a;
}
else
if (typeof a === "object")
{
for (n in a)
a [n] = join (a [n], b [n]);
for (n in b)
if (a [n] === undefined)
a [n] = join (a [n], b [n]);
}
else
Node.fatalError ("Not implemented: \"{0}\".".format (typeof a));
}
var result = {"code":formatted.code,"additional":formatted.additional,"modules":converted.modules,"apply":function (other){
return join (this, other);
}}, childs = [], flags = {};
for (var i = 0; 
i < formatted.jsx.length; i++)
switch (formatted.jsx [i].key){
case "include":
var name = formatted.jsx [i].value + ".jsxi", other = findIncluded (name, Node.path ().resolve (file, ".."), top);
if (! other)
Node.fatalError ("Couldn'n found included file: \"{0}\".".format (name));
if (loadedFiles.indexOf (other.file) == - 1)
{
loadedFiles.push (other.file);
childs.push (loadAndParse (other.file, other.top));
}
break;
case "compress":
flags.compress = checkOn (formatted.jsx [i].value);
break;
case "args":
break;
case "target":
break;
default:Node.fatalError ("Undefined instruction: \"{0}\".".format (formatted.jsx [i].key));
}
if (flags.compress)
result.code = JsCompress.work (result.code, file);
for (var i = childs.length - 1; 
i >= 0; i--)
result.apply (childs [i]);
return result;
}
function finalStrokes (data){
var result = [];
if (data.additional.php && argPhpHeader)
result.push ("<? header('Content-Type: application/javascript') ?>");
if (data.additional.userscript)
result.push ("// ==UserScript==\n" + data.additional.userscript.map (function (arg){
return "// @" + arg.key + " " + arg.value + "\n";
}).join ("") + "// ==/UserScript==\n");
if (data.modules)
result.push (moduleSystem.begin);
result.push (argJsCompress ? JsCompress.work (data.code) : data.code);
if (data.modules)
result.push (moduleSystem.end);
return result.join ("\n");
}
function init (){
Node.args ("Usage: js-ext file [flags]", {"r":{"alias":"rebuild","description":"Rebuild parser."},"l":{"alias":"js-compress","description":"Use compressor for all."},"p":{"alias":"php-header","description":"Use php header if nessesary."},"o":{"alias":"output","description":"Output file (else put result to stdout)."},"c":{"alias":"cache","description":"Cache folder (for compiled js files; enter \"none\" for disable)."},"u":{"alias":"usage","description":"This text."}});
if (Node.args ().u)
return Node.showHelp ();
inputFile = Node.args ()._ [0];
outputFile = Node.args ().o;
includesFolder = asFolder (Node.resolve ("includes"));
cacheFolder = Node.args ().c == "none" ? null : asFolder (Node.args ().c || Node.resolve ("cache"));
argRebuildParser = Node.args ().r;
argPhpHeader = Node.args ().p;
argJsCompress = Node.args ().l;
Parser.getReady ();
if (! inputFile || ! Node.fs ().existsSync (inputFile))
{
if (! argRebuildParser)
Node.fatalError ("Wrong input file: \"" + inputFile + "\".");
return;
}
var result = finalStrokes (loadAndParse (inputFile));
if (outputFile)
Node.writeFile (outputFile, result);
else
console.log (result);
}
return {"init":init,"__gi":function (){
return ["Node","Prework","Parser","Converter","Format","JsCompress"];
},"__si":function (){
Node = arguments [0];
Prework = arguments [1];
Parser = arguments [2];
Converter = arguments [3];
Format = arguments [4];
JsCompress = arguments [5];
},"__in":function (){
moduleSystem = {"begin":"(function(){function c(b){if(d[b])return d[b];throw\"Not found: \"+b;}function e(b,a){a=c(b);a.__z||(a.__g=1,a.__gi().forEach(function(a){if(\"@\"!=a[0]){if(c(a).__g)throw\"Cycle: \"+b+\", \"+a;c(a).__z||e(a)}}),a.__in(),a.init&&a.init(),a.__z=1,delete a.__g)}var d={},f=\"u\"!=(typeof window)[0]&&window||GLOBAL;f.__m=function(b,a){if(a)d[b]=a();else{for(a in d)b=c(a),b.__si.apply(b,b.__gi().map(function(a){return c(\"@\"==a[0]?a.slice(1):a)}));for(a in d)e(a);delete f.__m}}})();","endDelay":"'u'!=(typeof window)[0]&&'u'!=(typeof document)[0]&&!/loaded|complete/.test(document.readyState)?window.addEventListener('load',__m):__m()","end":"__m()"};
loadedFiles = [];
}};
});
__m()