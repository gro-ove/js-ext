#!/usr/bin/env node
function HelpersManager (){
this.helpers = {};
}
HelpersManager.prototype.set = function (key,arg){
if (! this.helpers.hasOwnProperty (key))
this.helpers [key] = true;
};
HelpersManager.prototype.get = function (key,arg){
return this.helpers;
};
function helperById (id,mark){
switch (id){
case "prototypeExtend":
return functionDeclaration ("__prototypeExtend", ["c","p","t"], blockStatement ([expressionStatement (assignmentExpression ("t", functionExpression (null, [], blockStatement ([])))),expressionStatement (assignmentExpression (memberExpression ("t", "prototype"), memberExpression ("p", "prototype"))),expressionStatement (assignmentExpression (memberExpression ("c", "prototype"), newExpression ("t"))),expressionStatement (assignmentExpression (memberExpression (memberExpression ("c", "prototype"), "constructor"), "c"))]));
case "createArray":
return functionDeclaration ("__createArray", ["from","to","result"], blockStatement ([ifStatement (binaryExpression (unaryExpression ("from", "typeof", true), "===", stringLiteralWithQuotes ("string")), expressionStatement (assignmentExpression ("from", callExpression (memberExpression ("from", "charCodeAt"), [numericLiteral (0)])))),ifStatement (binaryExpression (unaryExpression ("to", "typeof", true), "===", stringLiteralWithQuotes ("string")), expressionStatement (assignmentExpression ("to", callExpression (memberExpression ("to", "charCodeAt"), [numericLiteral (0)])))),expressionStatement (assignmentExpression ("result", newExpression ("Array", [binaryExpression (callExpression (memberExpression ("Math", "abs"), [binaryExpression ("to", "-", "from")]), "+", numericLiteral (1))]))),ifStatement (binaryExpression ("from", "<", "to"), forStatement (variableDeclaration ([variableDeclarator ("i", numericLiteral (0))]), binaryExpression ("i", "<", memberExpression ("result", "length")), unaryExpression ("i", "++"), expressionStatement (assignmentExpression (memberExpression ("result", "i", true), binaryExpression ("i", "+", "from")))), forStatement (variableDeclaration ([variableDeclarator ("i", binaryExpression (memberExpression ("result", "length"), "-", numericLiteral (1)))]), binaryExpression ("i", ">=", numericLiteral (0)), unaryExpression ("i", "--"), expressionStatement (assignmentExpression (memberExpression ("result", "i", true), binaryExpression ("from", "-", "i"))))),returnStatement ("result")]));
case "bindOnce":
var bindedTable = memberExpression ("obj", "__bt"), objectFunction = memberExpression ("obj", "name", true), placeInTable = memberExpression (bindedTable, "name", true);
return functionDeclaration ("__bindOnce", ["obj","name"], blockStatement ([ifStatement (unaryExpression (callExpression (memberExpression ("obj", "hasOwnProperty"), [stringLiteralWithQuotes ("__bindTable")]), "!", true), expressionStatement (assignmentExpression (bindedTable, objectExpression ([])))),ifStatement (unaryExpression (callExpression (memberExpression (bindedTable, "hasOwnProperty"), ["name"]), "!", true), expressionStatement (assignmentExpression (placeInTable, callExpression (memberExpression (objectFunction, "bind"), ["obj"])))),returnStatement (placeInTable)]));
default:console.assert (false, "Wrong helper id: " + id);
}
}
function doHelpers (helpers){
var result = [], temp;
for (var id in helpers){
var value = helpers[id];
if (value && typeof value !== "function")
{
temp = helperById (id, value);
result.push (temp);
}
}
return result;
}
var source;
var length;
var index;
var lineNumber;
var buffer;
var state;
var options;
var helpers;
function jsxParse (code,args,callback){
source = String (code).replace (/\r\n?/g, "\n") + "\n";
length = source.length;
index = 0;
lineNumber = source.length ? 1 : 0;
buffer = null;
state = {"allowIn":true,"inClass":false,"parsingComplete":false,"preventSequence":false,"classes":[]};
options = args || {"filename":"[ not a file ]","insertReturn":false,"initializationAllowed":false};
helpers = new HelpersManager();
var result = parseProgram ();
source = length = index = lineNumber = buffer = state = options = null;
if (typeof callback === "function")
callback (result, helpers.helpers);
else
return result;
}
var Token = {"Punctuator":0,"Identifier":1,"Keyword":2,"BooleanLiteral":3,"NullLiteral":4,"NumericLiteral":5,"StringLiteral":6,"UndefinedLiteral":7,"EOF":8}, TokenName = ["Punctuator","Identifier","Keyword","Boolean","Null","Numeric","String","Undefined","<end>"], Syntax = {"AssignmentExpression":"AssignmentExpression","ArrayExpression":"ArrayExpression","BlockStatement":"BlockStatement","BinaryExpression":"BinaryExpression","BreakStatement":"BreakStatement","CallExpression":"CallExpression","CatchClause":"CatchClause","ConditionalExpression":"ConditionalExpression","ContinueStatement":"ContinueStatement","DoWhileStatement":"DoWhileStatement","DebuggerStatement":"DebuggerStatement","EmptyStatement":"EmptyStatement","ExpressionStatement":"ExpressionStatement","ForStatement":"ForStatement","ForInStatement":"ForInStatement","FunctionDeclaration":"FunctionDeclaration","FunctionExpression":"FunctionExpression","Identifier":"Identifier","IfStatement":"IfStatement","LabeledStatement":"LabeledStatement","LogicalExpression":"LogicalExpression","MemberExpression":"MemberExpression","NewExpression":"NewExpression","ObjectExpression":"ObjectExpression","Program":"Program","Property":"Property","ReturnStatement":"ReturnStatement","SequenceExpression":"SequenceExpression","SwitchStatement":"SwitchStatement","SwitchCase":"SwitchCase","ThisExpression":"ThisExpression","ThrowStatement":"ThrowStatement","TryStatement":"TryStatement","UnaryExpression":"UnaryExpression","VariableDeclaration":"VariableDeclaration","VariableDeclarator":"VariableDeclarator","WhileStatement":"WhileStatement","WithStatement":"WithStatement","BooleanLiteral":"BooleanLiteral","NullLiteral":"NullLiteral","NumericLiteral":"NumericLiteral","RegexpLiteral":"RegexpLiteral","StringLiteral":"StringLiteral","UndefinedLiteral":"UndefinedLiteral","NotImplementedStatement":"NotImplementedStatement"}, PropertyKind = {"Data":1,"Get":2,"Set":4};
function identifier (arg){
return typeof arg === "string" ? {"type":Syntax.Identifier,"name":arg} : arg || null;
}
function booleanLiteral (value){
console.assert (value === "true" || value === "false", "bad boolean literal");
return {"type":Syntax.BooleanLiteral,"value":value};
}
function nullLiteral (){
return {"type":Syntax.NullLiteral,"value":"null"};
}
function numericLiteral (value){
if (typeof value === "number")
value = String (value);
console.assert (typeof value === "string", "bad numeric literal");
return {"type":Syntax.NumericLiteral,"value":value};
}
function regexpLiteral (value){
console.assert (typeof value === "string", "bad regexp literal");
return {"type":Syntax.RegexpLiteral,"value":value};
}
function stringLiteral (value){
console.assert (typeof value === "string" && value.length > 1 && (value [0] === "'" || value [0] === "\"") && value [0] === value [value.length - 1], "bad string literal");
return {"type":Syntax.StringLiteral,"value":value};
}
function stringLiteralWithQuotes (value){
return stringLiteral ("'" + value.replace (/(^|[^\\])'/g, "$1\\'") + "'");
}
function stringLiteralValue (literal){
console.assert (literal.value.length >= 2, "Bad literal");
return literal.value.slice (1, - 1);
}
function stringLiteralEmpty (literal){
console.assert (literal.value.length >= 2, "Bad literal");
return literal.value.length === 2;
}
function undefinedLiteral (){
return {"type":Syntax.UndefinedLiteral,"value":"undefined"};
}
function property (key,value,kind){
if (kind === undefined)
kind = "init";
return {"type":Syntax.Property,"key":identifier (key),"value":identifier (value),"kind":kind};
}
function objectExpression (properties){
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
if (name && name.type === Syntax.MemberExpression && name.property.type === Syntax.Identifier && name.object.type === Syntax.MemberExpression && name.object.property.type === Syntax.Identifier && (name.property.name === "call" || name.property.name === "apply"))
{
var obj = name.object.object;
if (obj.type === Syntax.ArrayExpression && obj.elements.length === 0)
name.object.object = memberExpression ("Array", "prototype");
else
if (obj.type === Syntax.ObjectExpression && obj.properties.length === 0)
name.object.object = memberExpression ("Object", "prototype");
}
return {"type":Syntax.CallExpression,"callee":identifier (name),"arguments":arguments.map (identifier)};
}
function superExpression (name,args,level){
return {"type":Syntax.CallExpression,"callee":identifier (name),"arguments":args || null,"super":level || 1};
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
function newExpression (callee,args){
if (args === undefined)
args = [];
return {"type":Syntax.NewExpression,"callee":identifier (callee),"arguments":args.map (identifier)};
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
return body instanceof Array ? {"type":Syntax.BlockStatement,"body":body,"single":single} : body;
}
function expressionStatement (expression){
return {"type":Syntax.ExpressionStatement,"expression":expression};
}
function ifStatement (test,consequent,alternate){
if (alternate === undefined)
alternate = null;
return {"type":Syntax.IfStatement,"test":identifier (test),"consequent":consequent,"alternate":alternate};
}
function whileStatement (test,body){
return {"type":Syntax.WhileStatement,"test":test,"body":body};
}
function doWhileStatement (body,test){
return {"type":Syntax.DoWhileStatement,"body":body,"test":test};
}
function doWhileStatement (body,test){
return {"type":Syntax.DoWhileStatement,"body":body,"test":test};
}
function forStatement (left,test,update,body){
return {"type":Syntax.ForStatement,"init":left,"test":test,"update":update,"body":blockStatement (body)};
}
function forInStatement (left,right,body){
return {"type":Syntax.ForInStatement,"left":left,"right":right,"body":body,"each":false};
}
function labeledStatement (label,statement){
return {"type":Syntax.LabeledStatement,"label":identifier (label),"body":statement};
}
function catchClause (param,body){
return {"type":Syntax.CatchClause,"param":identifier (param),"body":body};
}
function tryStatement (block,handlers,finalizer){
return {"type":Syntax.TryStatement,"block":block,"guardedHandlers":[],"handlers":handlers,"finalizer":finalizer};
}
function returnStatement (arg){
return {"type":Syntax.ReturnStatement,"argument":identifier (arg)};
}
function throwStatement (arg){
return {"type":Syntax.ThrowStatement,"argument":identifier (arg)};
}
function breakStatement (arg){
return {"type":Syntax.BreakStatement,"label":identifier (arg)};
}
function continueStatement (arg){
return {"type":Syntax.ContinueStatement,"label":identifier (arg)};
}
function debuggerStatement (){
return {"type":Syntax.DebuggerStatement};
}
function functionExpression (name,params,body){
return {"type":Syntax.FunctionExpression,"id":identifier (name),"params":params.map (identifier),"body":body};
}
function functionDeclaration (name,params,body){
return {"type":Syntax.FunctionDeclaration,"id":identifier (name),"params":params.map (identifier),"body":body};
}
function variableDeclarator (id,value){
return {"type":Syntax.VariableDeclarator,"id":identifier (id),"init":identifier (value)};
}
function variableDeclaration (variables){
return {"type":Syntax.VariableDeclaration,"declarations":identifier (variables)};
}
function program (elements,classes,initializations){
return {"type":Syntax.Program,"body":elements,"classes":classes,"initializations":initializations};
}
function callFunctionExpression (body){
return callExpression (functionExpression (null, [], body instanceof Array ? blockStatement (body) : body), []);
}
function oneVariableDeclaration (id,init){
return variableDeclaration ([variableDeclarator (id, init)]);
}
function assignmentStatement (left,right){
return expressionStatement (assignmentExpression (left, right));
}
function identifierFromToken (token){
return {"type":Syntax.Identifier,"name":token.value,"filename":options.filename,"lineNumber":token.lineNumber};
}
function stringLiteralFromToken (token){
return {"type":Syntax.StringLiteral,"value":token.value,"filename":options.filename,"lineNumber":token.lineNumber};
}
function thisExpressionFromToken (token){
return {"type":Syntax.ThisExpression,"filename":options.filename,"lineNumber":token.lineNumber};
}
function functionExpressionFromToken (token,name,params,body){
return {"type":Syntax.FunctionExpression,"id":name,"params":params,"body":body,"filename":options.filename,"lineNumber":token.lineNumber};
}
function functionDeclarationFromToken (token,name,params,body){
return {"type":Syntax.FunctionDeclaration,"id":name,"params":params,"body":body,"filename":options.filename,"lineNumber":token.lineNumber};
}
function parseArguments (){
var args = [], comma = {};
expect ("(");
while (! match (")"))
{
if (args.length)
parseOptionalComma (comma);
args.push (parseAssignmentExpression ());
}
expect (")");
return args;
}
function parseOptionalComma (state){
var token = lookahead ();
if (state.comma === undefined)
state.comma = token.value === ",";
else
if (state.comma !== (token.value === ","))
unexpected (token);
if (token.value === ",")
lex ();
}
var maxCountForInline = 10;
function parseArrayPerlInitializer (elements){
var firstElement = elements [0], secondElement = parseAssignmentExpression (), from, to, delta, chars;
expect ("]");
if (firstElement.type === Syntax.NumericLiteral && secondElement.type === Syntax.NumericLiteral)
{
from = + firstElement.value;
to = + secondElement.value;
}
else
if (firstElement.type === Syntax.StringLiteral && secondElement.type === Syntax.StringLiteral)
{
from = stringLiteralValue (firstElement);
to = stringLiteralValue (secondElement);
if (from === null || from.length > 1)
unexpected (firstElement);
if (to === null || to.length > 1)
unexpected (secondElement);
from = from.charCodeAt (0);
to = to.charCodeAt (0);
chars = true;
}
if (from !== undefined && Math.abs (from - to) < 10)
{
delta = from < to ? 1 : - 1;
while (from !== to)
{
from += delta;
elements.push (chars ? stringLiteralWithQuotes (String.fromCharCode (from)) : numericLiteral (from));
}
return arrayExpression (elements);
}
else
{
helpers.set ("createArray", firstElement);
return callExpression ("__createArray", [firstElement,secondElement]);
}
}
function parseArrayInitialiser (){
var elements = [], comma = {};
expect ("[");
while (! match ("]"))
if (match (","))
{
parseOptionalComma (comma);
elements.push (null);
}
else
{
elements.push (parseAssignmentExpression ());
if (elements.length === 1 && match (".."))
{
lex ();
return parseArrayPerlInitializer (elements);
}
if (! match ("]"))
parseOptionalComma (comma);
}
expect ("]");
return arrayExpression (elements);
}
function parseStatementList (){
var list = [];
while (index < length && ! match ("}"))
list.push (parseStatement ());
return list;
}
function parseBlock (){
var block, oldPreventSequence = state.preventSequence, token = lookahead ();
state.preventSequence = false;
expect ("{");
block = parseStatementList ();
expect ("}");
state.preventSequence = oldPreventSequence;
return blockStatement (block);
}
function parseBlockOrNotBlock (){
var token = lookahead ();
if (token.value === "{")
return parseBlock ();
else
return blockStatement ([parseStatement ()], true);
}
function parseClassParams (){
var token, result = {"publicMode":null,"abstract":false,"static":false,"interface":false,"partial":false};
loop:do
{
token = lex ();
switch (token.value){
case "public":

case "private":

case "protected":
if (result.publicMode !== null)
unexpected (token);
result.publicMode = token.value;
break;
case "partial":
if (result.partial)
unexpected (token);
result.partial = true;
break;
case "abstract":

case "static":
if (result.static || result.abstract)
unexpected (token);
result [token.value] = true;
break;
case "interface":
if (result.abstract)
unexpected (token);
result.interface = token.value;
case "class":
break loop;
default:unexpected (token);
}
}
 while (index < length);
if (result.publicMode === null)
result.publicMode = "private";
return result;
}
function parseExtendsImplementsAndUses (mode){
function collect (list){
if (list === undefined)
list = [];
do
list.push (parseIdentifier ());
 while (index < length && matchLex (","));
return list;
}
var result = {"parent":null,"implements":[],"uses":[]};
while (! match ("{"))
{
if (! result.parent && ! mode.interface && ! mode.static && matchKeywordLex ("extends"))
{
helpers.set ("prototypeExtend");
result.parent = parseIdentifier ();
}
else
if (matchKeywordLex ("implements"))
{
collect (result.implements);
}
else
if (matchKeywordLex ("uses"))
{
collect (result.uses);
}
else
unexpected ();
}
return result;
}
function parseClassMembers (params,dependsOn,result){
if (result === undefined)
result = {};
var oldInClass = state.inClass, token, current;
function refresh (){
current = {"publicMode":null,"static":params.static};
}
function set (obj){
console.assert (! ((result.hasOwnProperty (obj.id.name) ? result [obj.id.name] : null) instanceof Array), "ARRAY!");
if (result.hasOwnProperty (obj.id.name))
throw new SyntaxError("Member \"" + obj.id.name + "\" already declared", token);
obj.publicMode = current.publicMode || params.publicMode;
obj.static = current.static;
obj.abstract = current.abstract;
result [obj.id.name] = obj;
}
function parseField (){
if (params.interface && ! current.static)
throw new TypeError("Interface cannot have object fields");
{ var _74t2fd4_68 = parseVariableDeclarators (); for (var _15bnvkt_69 = 0; _15bnvkt_69 < _74t2fd4_68.length; _15bnvkt_69 ++){
var entry = _74t2fd4_68[_15bnvkt_69];
set (entry);
}}
refresh ();
}
function parseMethod (){
if (current.abstract)
{
if ((current.publicMode || params.publicMode) === "private")
throw new TypeError("Abstract method cannot be private");
}
state.superAvailable = ! current.static && dependsOn.parent;
var empty = params.interface && ! current.static || current.abstract, result = parseFunction ({"keyword":null,"empty":empty});
set (result);
state.superAvailable = false;
refresh ();
}
function parseInitializerOrConstructor (){
if (current.publicMode)
throw new TypeError("Constructor or initializer cannot have overrided visibility");
if (current.abstract)
throw new TypeError("Constructor or initializer cannot be abstract");
state.superAvailable = ! current.static && dependsOn.parent;
state.noReturn = true;
var result = parseFunction ({"keyword":null,"id":false,"optionalParams":true});
result.id = identifier (current.static ? "@initializer" : "@constructor");
state.superAvailable = false;
state.noReturn = false;
set (result);
refresh ();
}
state.inClass = true;
expect ("{");
refresh ();
while (! match ("}"))
{
token = lookahead ();
switch (token.value){
case "private":

case "public":

case "protected":
if (current.publicMode !== null)
unexpected (token);
lex ();
current.publicMode = token.value;
break;
case "abstract":
if (params.interface)
unexpected (token);
case "static":
if (current.abstract || current.static)
unexpected (token);
lex ();
current [token.value] = true;
break;
case "var":
lex ();
parseField ();
break;
case "function":
lex ();
parseMethod ();
break;
case "(":

case "{":
parseInitializerOrConstructor ();
break;
default:if (token.type === Token.Identifier)
{
var saved = saveAll (), method;
lex ();
method = match ("(");
restoreAll (saved);
if (method)
parseMethod ();
else
parseField ();
}
else
unexpected (token);
}
}
expect ("}");
state.inClass = oldInClass;
return result;
}
function verbose (id,params,dependsOn,members){
var membersStrings = [], dependsOnStrings = [], beforeString = "";
for (var key in members){
var member = members[key];
var temp = [];
if (member instanceof Array)
{
member = member [0];
if (! member)
continue;
}
for (var attribute in member){
var setted = member[attribute];
if (setted === true)
temp.push (attribute);
}
if (member.publicMode)
temp.push (member.publicMode);
temp.push ({"FunctionExpression":"method","VariableDeclarator":"field"} [member.type] || "<something wrong: " + member.type + ">");
if (members [key] instanceof Array)
temp.push (", total count: " + members [key].length);
membersStrings.push ("\t* " + member.id.name + " (" + temp.join (" ").replace (/ ,/g, ",") + ")");
}
var paramsString = [];
for (var attribute in params){
var setted = params[attribute];
if (setted === true)
paramsString.push (attribute);
}
if (params.publicMode)
paramsString.push (params.publicMode);
if (paramsString.length)
dependsOnStrings.push (paramsString.join (" "));
if (dependsOn.parent)
dependsOnStrings.push ("child of " + dependsOn.parent.name);
if (dependsOn.implements.length)
dependsOnStrings.push ("implements " + dependsOn.implements.map (function (arg){
return arg.name;
}).join (", "));
if (dependsOn.uses.length)
dependsOnStrings.push ("using " + dependsOn.uses.map (function (arg){
return arg.name;
}).join (", "));
if (dependsOnStrings.length)
beforeString = " (" + dependsOnStrings.join ("; ") + ")";
console.info (id.name + beforeString + ":\n" + membersStrings.join ("\n"));
}
function parseClassDeclaration (){
var params = parseClassParams ();
var id = parseIdentifier ();
var dependsOn = parseExtendsImplementsAndUses (params);
var previous = state.classes.filter (function (arg){
return arg.id.name === id.name;
}) [0];
if (previous)
{
if (! params.partial)
throw new TypeError("Class \"" + id.name + "\" already declared", id);
else
if (JSON.stringify (params) !== JSON.stringify (previous.params))
throw new TypeError("Different class params", id);
else
if (JSON.stringify (dependsOn.parent) !== JSON.stringify (previous.dependsOn.parent))
throw new TypeError("Different \"extends\" param", id);
else
if (JSON.stringify (dependsOn.implements) !== JSON.stringify (previous.dependsOn.implements))
throw new TypeError("Different \"implements\" param", id);
{ var _6bc35u0_70 = dependsOn.uses; for (var _8ss7fhi_71 = 0; _8ss7fhi_71 < _6bc35u0_70.length; _8ss7fhi_71 ++){
var temp = _6bc35u0_70[_8ss7fhi_71];
if (previous.dependsOn.uses.indexOf (temp) === - 1)
previous.dependsOn.uses.push (temp);
}}
}
var members = parseClassMembers (params, dependsOn, previous ? previous.members : {});
if (! previous)
state.classes.push ({"id":id,"params":params,"dependsOn":dependsOn,"members":members});
return null;
}

function parseFunction (options){
if (options === undefined)
options = {};
var id, params, body, token = lookahead ();
if (options.keyword !== null)
expectKeyword (options.keyword || "function");
if (options.id === true || options.id !== false && lookahead ().type === Token.Identifier)
id = parseIdentifier ();
else
id = null;
if (options.optionalParams)
params = parseOptionalFunctionArguments () || (options.optionalParams === true ? [] : options.optionalParams);
else
params = parseFunctionArguments ();
if (! options.empty)
{
body = parseFunctionElements ();
}
else
{
body = null;
consumeSemicolon ();
}
return (options.declaration ? functionDeclarationFromToken : functionExpressionFromToken) (token, id, params, body);
}
function parseFunctionExpression (){
var oldNoReturn = state.noReturn, result;
state.noReturn = false;
result = parseFunction ();
state.noReturn = oldNoReturn;
return result;
}
function parseFunctionDeclaration (){
var oldNoReturn = state.noReturn, result;
state.noReturn = false;
result = parseFunction ({"id":true,"declaration":true});
state.noReturn = oldNoReturn;
return result;
}
function parseLambdaExpression (){
var oldNoReturn = state.noReturn, result;
state.noReturn = false;
result = parseFunction ({"id":false,"keyword":"lambda","optionalParams":[identifier ("arg")]});
state.noReturn = oldNoReturn;
return result;
}
function parseFunctionArguments (){
var name, params = [], comma = {};
expect ("(");
while (! match (")"))
{
if (params.length)
parseOptionalComma (comma);
name = parseIdentifier ();
if (matchLex ("="))
name.defaultValue = parseAssignmentExpression ();
params.push (name);
}
expect (")");
return params;
}
function parseOptionalFunctionArguments (){
return attemptTo (parseFunctionArguments, null, ! match ("("));
}
function parseFunctionElements (){
var oldPreventSequence = state.preventSequence, result;
if (match ("{"))
{
expect ("{");
attemptTo (function (arg){
result = [returnStatement (objectExpression (parseObjectContent ()))];
consumeSemicolon ();
}, function (arg){
state.preventSequence = false;
result = [];
while (! match ("}"))
result.push (parseStatement ());
}, lookahead ().type !== Token.Literal && lookahead ().type !== Token.Identifier);
expect ("}");
}
else
if (match (";"))
{
lex ();
result = [];
}
else
if (! match ("]") && ! match (")") && ! match ("}") && ! match (","))
{
state.preventSequence = true;
result = [setReturnStatement (parseStatement ())];
}
state.preventSequence = oldPreventSequence;
return blockStatement (result);
}
function setReturnStatement (data){
if (data)
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
if (data.type === Syntax.LabelledStatement)
{
setReturnStatement (data.body);
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
return data;
}
function parseGroupExpression (){
expect ("(");
var result = parseExpression ();
expect (")");
return result;
}
function parseIdentifier (){
var token = lex ();
if (token.type !== Token.Identifier)
unexpected (token);
return identifierFromToken (token);
}
function parseIfStatement (){
expectKeyword ("if");
expect ("(");
var test = parseExpression (), consequent, alternate;
expect (")");
consequent = parseStatement ();
if (matchKeyword ("else"))
{
lex ();
alternate = parseStatement ();
}
else
alternate = null;
return ifStatement (test, consequent, alternate);
}
function parseDoWhileStatement (){
expectKeyword ("do");
var body = parseStatement ();
expectKeyword ("while");
expect ("(");
var test = parseExpression ();
expect (")");
matchLex (";");
return doWhileStatement (body, test);
}
function parseWhileStatement (){
expectKeyword ("while");
expect ("(");
var test = parseExpression ();
expect (")");
return whileStatement (test, parseStatement ());
}
function parseForStatement (){
var init = null, test = null, update = null, left, right, body, temp, result, arrayMode, identifierMode, propertyName;
expectKeyword ("for");
expect ("(");
if (! matchLex (";"))
{
if (matchKeywordLex ("var"))
{
state.allowIn = false;
init = variableDeclaration (parseVariableDeclarators (false));
state.allowIn = true;
if (init.declarations.length <= 2 && (matchKeyword ("in-array") || matchKeyword ("in-object") || matchKeyword ("in")))
{
arrayMode = lex ().value;
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
if (matchKeyword ("in-array") || matchKeyword ("in-object") || matchKeyword ("in"))
{
if (init.type !== Syntax.SequenceExpression)
leftSideOnly (init);
else
if (init.expressions.length !== 2)
leftSideOnly ();
arrayMode = lex ().value;
left = init;
right = parseExpression ();
init = null;
}
}
if (left === undefined)
expect (";");
}
if (left === undefined)
{
if (! match (";"))
test = parseExpression ();
expect (";");
if (! match (")"))
update = parseExpression ();
}
expect (")");
body = parseStatement ();
if (arrayMode === "in-array")
if (left.type === Syntax.VariableDeclaration && left.declarations.length === 1)
{
left.declarations = [variableDeclarator (newIdentifier ()),left.declarations [0]];
}
else
if (left.type === Syntax.Identifier)
{
left = variableDeclaration ([variableDeclarator (newIdentifier ()),variableDeclarator (left)]);
identifierMode = true;
}
if (left === undefined)
{
return forStatement (init, test, update, body);
}
else
if (left.type === Syntax.SequenceExpression && left.expressions.length === 2 || identifierMode)
{
temp = body;
body = blockStatement ([expressionStatement (assignmentExpression (identifierMode ? left.declarations [1].id : left.expressions [1], memberExpression (right, identifierMode ? left.declarations [0].id : left.expressions [0], true)))]);
if (temp.type === Syntax.BlockStatement)
body.body = body.body.concat (temp.body);
else
body.body.push (temp);
if (identifierMode)
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
if (arrayMode === "in-array")
{
if (left.type === Syntax.VariableDeclaration && ! left.declarations [0].init)
left.declarations [0].init = numericLiteral (0);
temp = left.type === Syntax.VariableDeclaration ? left.declarations [0].id : left.type === Syntax.SequenceExpression ? left.expressions [0] : left;
if (left.type === Syntax.Identifier)
left = assignmentExpression (left, numericLiteral (0));
result = forStatement (left, binaryExpression (temp, "<", memberExpression (right, "length")), unaryExpression (temp, "++", false), body);
}
else
{
if (arrayMode === "in-object")
{
propertyName = left.type === Syntax.VariableDeclaration ? left.declarations [0].id.name : left.name;
body = ifStatement (callExpression (memberExpression (right, "hasOwnProperty"), [propertyName]), body);
}
result = forInStatement (left, right, body);
}
if ((temp !== undefined || arrayMode === "in-object") && right.type !== Syntax.Identifier)
{
var identifier = newIdentifier ();
temp = $.extend (true, {}, right);
for (var n in right)
delete right [n];
right.type = Syntax.Identifier;
right.name = identifier;
return blockStatement ([variableDeclaration ([variableDeclarator (right, temp)]),result,expressionStatement (assignmentExpression (right, "undefined"))]);
}
return result;
}
function parsePropertyFunction (param,first){
return {"type":Syntax.FunctionExpression,"id":null,"params":param,"body":parseFunctionElements ()};
}
function parseObjectPropertyKey (){
var token = lex ();
if (token.type === Token.StringLiteral)
return stringLiteralFromToken (token);
else
return identifierFromToken (token);
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
unexpected (token);
return property (key, parsePropertyFunction ([]), "set");
}
else
{
param = [parseIdentifier ()];
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
unexpected (token);
}
else
{
key = parseObjectPropertyKey ();
expect (":");
return property (key, parseAssignmentExpression ());
}
}
function parseObjectContent (){
var properties = [], property, name, kind, map = {}, comma = {};
while (! match ("}"))
{
if (properties.length)
{
parseOptionalComma (comma);
if (match ("}"))
break;
}
property = parseObjectProperty ();
name = property.key.type === Syntax.Identifier ? property.key.name : String (property.key.value);
kind = property.kind === "init" ? PropertyKind.Data : property.kind === "get" ? PropertyKind.Get : PropertyKind.Set;
if (Object.prototype.hasOwnProperty.call (map, name))
{
throw new JsExtError("NotImplementedError", "Getters and setters", lookahead ());
map [name] |= kind;
}
else
map [name] = kind;
properties.push (property);
}
return properties;
}
function parseObjectInitialiser (){
expect ("{");
var result = parseObjectContent ();
expect ("}");
return objectExpression (result);
}
function parseNonComputedProperty (){
var token = lex ();
if (token.type !== Token.Identifier && token.type !== Token.Keyword && token.type !== Token.BooleanLiteral && token.type !== Token.NullLiteral)
unexpected (token);
return identifierFromToken (token);
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
function parseLeftHandSideExpressionTemp (){
return matchKeyword ("new") ? parseNewExpression () : matchKeyword ("super") ? parseSuperExpression () : parsePrimaryExpression ();
}
function parseLeftHandSideExpressionAllowCall (){
var expression = parseLeftHandSideExpressionTemp (), token;
while (index < length)
{
token = lookahead ();
if (token.value === "(")
{
expression = callExpression (expression, parseArguments ());
}
else
if (token.value === "[")
{
expression = memberExpression (expression, parseComputedMember (), true);
}
else
if (token.value === "." && source [token.range [0] + 1] !== ".")
{
expression = memberExpression (expression, parseNonComputedMember (), false);
}
else
break;
}
return expression;
}
function parseLeftHandSideExpression (){
var expression = parseLeftHandSideExpressionTemp ();
while (match (".") || match ("["))
if (match ("["))
expression = memberExpression (expression, parseComputedMember (), true);
else
expression = memberExpression (expression, parseNonComputedMember (), false);
return expression;
}
function parseMultiplicativeExpression (){
var expression = parseUnaryExpression ();
while (match ("*") || match ("/") || match ("%"))
expression = binaryExpression (expression, lex ().value, parseUnaryExpression ());
return expression;
}
function parseAdditiveExpression (){
var expression = parseMultiplicativeExpression ();
while (match ("+") || match ("-"))
expression = binaryExpression (expression, lex ().value, parseMultiplicativeExpression ());
return expression;
}
function parseShiftExpression (){
var expression = parseAdditiveExpression ();
while (match ("<<") || match (">>") || match (">>>"))
expression = binaryExpression (expression, lex ().value, parseAdditiveExpression ());
return expression;
}
function parseRelationalExpression (){
var inverse, expression, previousAllowIn;
previousAllowIn = state.allowIn;
state.allowIn = true;
expression = parseShiftExpression ();
while (index < length)
{
if (match ("!") && source [lookahead ().range [0] + 1] === "i")
{
inverse = saveAll ();
lex ();
}
if (match ("<") || match (">") || match ("<=") || match (">=") || previousAllowIn && matchKeyword ("in") || matchKeyword ("instanceof"))
{
expression = binaryExpression (expression, lex ().value, parseShiftExpression ());
}
else
if (previousAllowIn && (matchKeyword ("in-object") || matchKeyword ("in-array")))
{
lex ();
expression = callExpression (memberExpression (parseShiftExpression (), "hasOwnProperty"), [expression]);
}
else
{
if (inverse)
restoreAll (inverse);
break;
}
if (inverse)
{
expression = unaryExpression (expression, "!", true);
inverse = false;
}
}
state.allowIn = previousAllowIn;
return expression;
}
function parseEqualityExpression (){
var expression = parseRelationalExpression ();
while (match ("==") || match ("!=") || match ("===") || match ("!=="))
expression = binaryExpression (expression, lex ().value, parseRelationalExpression ());
return expression;
}
function parseBitwiseANDExpression (){
var expression = parseEqualityExpression ();
while (match ("&"))
{
lex ();
expression = binaryExpression (expression, "&", parseEqualityExpression ());
}
return expression;
}
function parseBitwiseXORExpression (){
var expression = parseBitwiseANDExpression ();
while (match ("^"))
{
lex ();
expression = binaryExpression (expression, "^", parseBitwiseANDExpression ());
}
return expression;
}
function parseBitwiseORExpression (){
var expression = parseBitwiseXORExpression ();
while (match ("|"))
{
lex ();
expression = binaryExpression (expression, "|", parseBitwiseXORExpression ());
}
return expression;
}
function parseLogicalANDExpression (){
var expression = parseBitwiseORExpression ();
while (match ("&&"))
{
lex ();
expression = logicalExpression (expression, "&&", parseBitwiseORExpression ());
}
return expression;
}
function parseLogicalORExpression (){
var expression = parseLogicalANDExpression ();
while (match ("||"))
{
lex ();
expression = logicalExpression (expression, "||", parseLogicalANDExpression ());
}
return expression;
}
function parseConditionalExpression (){
var expression, previousAllowIn, consequent;
expression = parseLogicalORExpression ();
if (match ("?"))
{
lex ();
previousAllowIn = state.allowIn;
state.allowIn = true;
consequent = parseAssignmentExpression ();
state.allowIn = previousAllowIn;
expect (":");
expression = conditionalExpression (expression, consequent, parseAssignmentExpression ());
}
return expression;
}
function parseAssignmentExpression (){
var expression = parseConditionalExpression (), token = lookahead ();
if (token.type === Token.Punctuator && (token.value === "=" || token.value === "*=" || token.value === "/=" || token.value === "%=" || token.value === "+=" || token.value === "-=" || token.value === "<<=" || token.value === ">>=" || token.value === ">>>=" || token.value === "&=" || token.value === "^=" || token.value === "|="))
{
leftSideOnly (expression);
expression = assignmentExpression (expression, lex ().value, parseAssignmentExpression ());
}
return expression;
}
function parseExpression (){
var expression = parseAssignmentExpression ();
if (! state.preventSequence && match (","))
{
expression = sequenceExpression ([expression]);
while (index < length)
{
if (! match (","))
break;
lex ();
expression.expressions.push (parseAssignmentExpression ());
}
}
return expression;
}
function parsePostfixExpression (){
var expression = parseLeftHandSideExpressionAllowCall (), token;
token = lookahead ();
if (token.type !== Token.Punctuator)
return expression;
if ((match ("++") || match ("--")) && ! peekLineTerminator ())
{
leftSideOnly (expression);
expression = unaryExpression (expression, lex ().value, false);
}
return expression;
}
function parseComplexString (token){
function split (string,max){
var length = string.length, index = 0, previous = 0, character, temp, result = [];
while (index < length)
switch (string [index]){
case "\\":
if (string [index + 1] === "%")
{
if (previous < index)
result.push (string.substring (previous, index));
previous = index + 1;
}
index += 2;
break;
case "%":
if (index + 1 === length)
{
index++;
break;
}
if (string [index + 1] === "0" && index + 2 < length && decimalDigit (string [index + 2]))
{
index += 2;
break;
}
if (previous < index)
{
result.push (string.substring (previous, index));
previous = index;
}
index += 2;
while (index < length && decimalDigit (string [index]))
index++;
temp = + string.substring (previous + 1, index);
if (temp < max)
result.push (temp);
previous = index;
break;
default:index++;
}
if (previous < length)
result.push (string.substring (previous, length));
return result;
}
var string = stringLiteralValue (token), args = parseArguments (), splitted, result;
if (string.length <= 1)
return stringLiteral (token.value);
splitted = split (string, args.length).map (function (arg){
if (typeof arg === "number")
{
var temp = args [arg];
if (temp.type === Syntax.StringLiteral)
return stringLiteral (temp.value);
if (temp.type === Syntax.BooleanLiteral || temp.type === Syntax.NullLiteral || temp.type === Syntax.NumericLiteral || temp.type === Syntax.RegexpLiteral || temp.type === Syntax.UndefinedLiteral)
return stringLiteralWithQuotes (temp.value);
return temp;
}
else
return stringLiteralWithQuotes (arg);
}).filter (function (arg,index,array){
if (arg.type !== Syntax.StringLiteral)
return true;
for (var i = index - 1, previous; 
i >= 0 && array [i].type === Syntax.StringLiteral; i--)
previous = array [i];
if (previous)
{
previous.value = stringLiteralWithQuotes (stringLiteralValue (previous) + stringLiteralValue (arg)).value;
return false;
}
else
return true;
}).filter (function (arg,index,array){
return arg.type !== Syntax.StringLiteral || index === 0 || ! stringLiteralEmpty (arg);
});
if (splitted [0].type !== Syntax.StringLiteral && (splitted.length === 1 || splitted [1].type !== Syntax.StringLiteral))
splitted = [stringLiteral ("''")].concat (splitted);
result = splitted [0];
for (var i = 1; 
i < splitted.length; i++)
result = binaryExpression (result, "+", splitted [i]);
return result;
}
function parsePrimaryExpression (){
var token = lookahead ();
switch (token.type){
case Token.Identifier:
lex ();
return identifierFromToken (token);
case Token.Keyword:
if (token.value === "this")
{
lex ();
return thisExpressionFromToken (token);
}
if (token.value === "function")
return parseFunctionExpression ();
if (token.value === "lambda")
return parseLambdaExpression ();
break;
case Token.StringLiteral:
lex ();
if (lookahead ().value === "(")
return parseComplexString (token);
else
return stringLiteralFromToken (token);
case Token.NumericLiteral:
lex ();
return numericLiteral (token.value);
case Token.BooleanLiteral:
lex ();
return booleanLiteral (token.value);
case Token.NullLiteral:
lex ();
return nullLiteral ();
case Token.UndefinedLiteral:
lex ();
return undefinedLiteral ();
case Token.Punctuator:
switch (token.value){
case "[":
return parseArrayInitialiser ();
case "{":
return parseObjectInitialiser ();
case "(":
return parseGroupExpression ();
case "/":
lex ();
return readRegexp ();
}
default:unexpected (token);
}
}
function parseProgramElement (){
var token = lookahead (), temp, result;
switch (token.value){
case "public":

case "protected":

case "private":

case "static":

case "abstract":

case "class":

case "interface":

case "partial":
return parseClassDeclaration ();
case "(":

case "{":
if (options.initializationAllowed)
{
saved = saveAll ();
try{
temp = token.value === "(" ? parseFunctionArguments () : [];
result = expressionStatement (callExpression (functionExpression (null, temp, parseBlock ())));
result.after = true;
result.headerComment = "/* Global initializer */";
return result;
}catch (e){
restoreAll (saved);
}
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
if (temp === undefined)
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
var token = lookahead ();
if (token.type === Token.EOF)
unexpected (token);
if (token.type === Token.Punctuator)
switch (token.value){
case ";":
lex ();
return {"type":Syntax.EmptyStatement};
case "{":
return attemptTo (function (arg){
var expression = parseObjectInitialiser ();
consumeSemicolon ();
return expressionStatement (expression);
}, parseBlock);
case "(":
var expression = parseExpression ();
consumeSemicolon ();
return {"type":Syntax.ExpressionStatement,"expression":expression};
case "...":
lex ();
return {"type":Syntax.NotImplementedStatement,"lineNumber":lineNumber,"filename":options.filename};
}
if (token.type === Token.Keyword)
switch (token.value){
case "function":
return parseFunctionDeclaration ();
case "if":
return parseIfStatement ();
case "var":
return parseVariableDeclaration ();
case "do":
return parseDoWhileStatement ();
case "for":
return parseForStatement ();
case "switch":
return parseSwitchStatement ();
case "try":
return parseTryStatement ();
case "while":
return parseWhileStatement ();
case "with":
return parseWithStatement ();
case "break":
return parseBreakStatement ();
case "continue":
return parseContinueStatement ();
case "return":
return parseReturnStatement ();
case "throw":
return parseThrowStatement ();
case "debugger":
return parseDebuggerStatement ();
}
var expression = parseExpression ();
if (expression.type === Syntax.Identifier && matchLex (":"))
{
return labeledStatement (expression, parseStatement ());
}
else
{
consumeSemicolon ();
return expressionStatement (expression);
}
}
function parseVariableDeclarators (semicolon){
var result = [];
do
{
result.push (variableDeclarator (parseIdentifier (), matchLex ("=") ? parseAssignmentExpression () : null));
}
 while (index < length && matchLex (","));
if (semicolon !== false)
consumeSemicolon ();
return result;
}
function parseVariableDeclaration (){
expectKeyword ("var");
return variableDeclaration (parseVariableDeclarators ());
}
function parseContinueStatement (){
var label = null;
expectKeyword ("continue");
if (source [index] === ";")
{
lex ();
return continueStatement ();
}
if (peekLineTerminator ())
return continueStatement ();
if (lookahead ().type === Token.Identifier)
label = parseVariableIdentifier ();
consumeSemicolon ();
return continueStatement (label);
}
function parseBreakStatement (){
var label = null;
expectKeyword ("break");
if (source [index] === ";")
{
lex ();
return breakStatement ();
}
if (peekLineTerminator ())
return breakStatement ();
if (lookahead ().type === Token.Identifier)
label = parseVariableIdentifier ();
consumeSemicolon ();
return breakStatement (label);
}
function parseReturnStatement (){
var argument = null;
if (state.noReturn)
unexpected (lookahead ());
expectKeyword ("return");
if (source [index] === " " && identifierStart (source [index + 1]))
{
argument = parseExpression ();
consumeSemicolon ();
return returnStatement (argument);
}
if (peekLineTerminator ())
return returnStatement ();
if (! match (";") && ! match ("}") && lookahead ().type !== Token.EOF)
argument = parseExpression ();
consumeSemicolon ();
return returnStatement (argument);
}
function parseThrowStatement (){
expectKeyword ("throw");
if (peekLineTerminator ())
throwError ({}, Messages.NewlineAfterThrow);
var argument = parseExpression ();
consumeSemicolon ();
return throwStatement (argument);
}
function parseDebuggerStatement (){
expectKeyword ("debugger");
consumeSemicolon ();
return debuggerStatement ();
}
function parseSuperExpression (){
var level = 1, name = null, temp, token = lookahead ();
expectKeyword ("super");
if (! state.superAvailable)
throw new TypeError("Super can be used in class functions only", token);
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
name = parseIdentifier ();
break;
}
}
return superExpression (name, match ("(") ? parseArguments () : null, level);
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
if (statement === undefined)
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
unexpected (lookahead ());
param = parseIdentifier ();
expect (")");
}
else
param = identifier ("e");
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
handlers.push (catchClause ("e", blockStatement ([])));
return tryStatement (block, handlers, finalizer);
}
function parseUnaryExpression (){
var token = lookahead ();
if (token.type === Token.Punctuator)
{
if (token.value === "++" || token.value === "--")
{
lex ();
return unaryExpression (leftSideOnly (parseUnaryExpression ()), token.value, true);
}
if (token.value === "+" || token.value === "-" || token.value === "~" || token.value === "!")
{
lex ();
return unaryExpression (parseUnaryExpression (), token.value, true);
}
}
else
if (token.type === Token.Keyword && (token.value === "typeof" || token.value === "delete" || token.value === "void"))
{
lex ();
return unaryExpression (parseUnaryExpression (), token.value, true);
}
return parsePostfixExpression ();
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
function keyword (id){
switch (id.length){
case 2:
return id === "if" || id === "in" || id === "do";
case 3:
return id === "var" || id === "for" || id === "new" || id === "try";
case 4:
return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum" || id === "uses";
case 5:
return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "class" || id === "super";
case 6:
return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "lambda" || id === "static" || id === "public";
case 7:
return id === "default" || id === "finally" || id === "private" || id === "extends" || id === "partial";
case 8:
return id === "function" || id === "continue" || id === "debugger" || id === "abstract";
case 9:
return id === "protected" || id === "interface";
case 10:
return id === "instanceof" || id === "implements";
}
}
function readIdentifier (){
var start = index, identifier;
if (identifierStart (source [index]))
{
do
index++;
 while (identifierPart (source [index]));
if (index - start === 1)
return {"type":Token.Identifier,"value":source [start],"lineNumber":lineNumber,"range":[start,index]};
identifier = source.substring (start, index);
if (keyword (identifier))
{
if (identifier === "in" && source [index] === "-")
{
while (identifierPart (source [++ index]))
;
identifier = source.substring (start, index);
if (identifier !== "in-object" && identifier !== "in-array")
unexpected ();
}
return {"type":Token.Keyword,"value":identifier,"lineNumber":lineNumber,"range":[start,index]};
}
if (identifier === "null")
return {"type":Token.NullLiteral,"value":identifier,"lineNumber":lineNumber,"range":[start,index]};
if (identifier === "true" || identifier === "false")
return {"type":Token.BooleanLiteral,"value":identifier,"lineNumber":lineNumber,"range":[start,index]};
if (identifier === "undefined")
return {"type":Token.UndefinedLiteral,"value":identifier,"lineNumber":lineNumber,"range":[start,index]};
return {"type":Token.Identifier,"value":identifier,"lineNumber":lineNumber,"range":[start,index]};
}
else
if (source [index] === "@")
throw new Error("Unexpected macro");
}
function readNumericLiteral (){
var start = index;
if (source [index] === "0" && (source [index + 1] === "x" || source [index + 1] === "X"))
{
index += 2;
while (index < length && hexDigit (source [index]))
index++;
if (index === start + 2)
unexpected ();
}
else
{
if (source [index] !== ".")
while (index < length && decimalDigit (source [index]))
index++;
if (source [index] === "." && source [index + 1] !== ".")
{
index++;
while (index < length && decimalDigit (source [index]))
index++;
}
if (source [index] === "e" || source [index] === "E")
{
index++;
if (source [index] === "+" || source [index] === "-")
index++;
if (! decimalDigit (source [index]))
unexpected ();
index++;
while (index < length && decimalDigit (source [index]))
index++;
}
}
if (index < length && identifierStart (source [index]))
unexpected ();
return {"type":Token.NumericLiteral,"value":source.substring (start, index),"lineNumber":lineNumber,"range":[start,index]};
}
function readPunctuator (){
var start = index, ch1 = source [index], ch2, ch3, ch4;
if (ch1 === ";" || ch1 === "{" || ch1 === "}" || ch1 === "," || ch1 === "(" || ch1 === ")")
return {"type":Token.Punctuator,"value":ch1,"lineNumber":lineNumber,"range":[start,++ index]};
ch2 = source [index + 1];
ch3 = source [index + 2];
if (ch1 === ".")
if (ch2 === ".")
return {"type":Token.Punctuator,"value":ch3 === "." ? "..." : "..","lineNumber":lineNumber,"range":[start,index += ch3 === "." ? 3 : 2]};
else
if (! decimalDigit (ch2))
return {"type":Token.Punctuator,"value":".","lineNumber":lineNumber,"range":[start,++ index]};
ch4 = source [index + 3];
if (ch1 === ">" && ch2 === ">" && ch3 === ">" && ch4 === "=")
return {"type":Token.Punctuator,"value":">>>=","lineNumber":lineNumber,"range":[start,index += 4]};
if ((ch1 === "=" || ch1 === "!") && ch2 === "=" && ch3 === "=" || ch1 === "<" && ch2 === "<" && ch3 === "=" || ch1 === ">" && ch2 === ">" && (ch3 === ">" || ch3 === "="))
return {"type":Token.Punctuator,"value":ch1 + ch2 + ch3,"lineNumber":lineNumber,"range":[start,index += 3]};
if (ch2 === "=" && "<>=!+-*%&|^/".indexOf (ch1) >= 0 || ch1 === ch2 && "+-<>&|".indexOf (ch1) >= 0)
return {"type":Token.Punctuator,"value":ch1 + ch2,"lineNumber":lineNumber,"range":[start,index += 2]};
if (ch1 === "[" || ch1 === "]" || ch1 === "<" || ch1 === ">" || ch1 === "+" || ch1 === "-" || ch1 === "*" || ch1 === "%" || ch1 === "&" || ch1 === "|" || ch1 === "^" || ch1 === "!" || ch1 === "~" || ch1 === "?" || ch1 === ":" || ch1 === "=" || ch1 === "/")
return {"type":Token.Punctuator,"value":ch1,"lineNumber":lineNumber,"range":[start,++ index]};
}
function readRegexp (){
var start = index - 1, end = null, classMarker = false;
loop:while (index < length)
{
switch (source [index++]){
case "\\":
if (source [index++] !== "\n")
break;
case "\n":
break loop;
case "/":
if (classMarker)
{
continue loop;
}
else
{
end = index;
break loop;
}
case "[":
classMarker = true;
break;
case "]":
classMarker = false;
break;
}
}
if (end === null)
unexpected ("Invalid regular expression: missing /");
while (index < length && identifierPart (source [index]))
index++;
try{
new RegExp(source.substring (start + 1, end - 1), source.substring (end, index));
}catch (e){
throw new Error("Invalid regular expression");
}
return regexpLiteral (source.substring (start, index));
}
function readStringLiteral (){
var quote = source [index], start = index++;
while (index < length && source [index] !== quote)
index += source [index] === "\\" ? 2 : 1;
if (source [index++] !== quote)
unexpected ();
return {"type":Token.StringLiteral,"value":source.substring (start, index),"lineNumber":lineNumber,"range":[start,index]};
}
var tabSize = 4, tabSpaces = new Array(tabSize + 1).join (" ");
function readMultilineString (){
var start = index++;
while (index < length && source [index] !== "`")
index += source [index] === "\\" ? 2 : 1;
if (source [index++] !== "`")
unexpected ();
var result = source.substring (start + 1, index - 1), spaces = result.match (/\n([\t ]*)/g);
if (spaces)
{
spaces = spaces.concat (source.substring (source.lastIndexOf ("\n", start), start + 1).replace (/[^\n\t ]/g, " ")).map (function (arg){
return [].reduce.call (arg.replace (/^\n/, ""), function (a,b){
return a += b === "\t" ? tabSize : 1;
}, 0);
}).reduce (function (a,b){
return a < b ? a : b;
});
var regExp = new RegExp("\\n(?:\\t|" + tabSpaces + "){" + Math.floor (spaces / tabSize) + "}" + tabSpaces.substr (0, spaces % tabSize), "g");
result = result.replace (regExp, "\n");
}
return {"type":Token.StringLiteral,"value":JSON.stringify (result.replace (/\\`/g, "`")),"lineNumber":lineNumber,"range":[start,index]};
}
function skipComments (){
var blockComment = false, lineComment = false;
while (index < length)
{
var character = source [index];
if (character === " " || character === "\t" || character === " ")
{
index++;
}
else
if (character === "\n")
{
index++;
lineNumber++;
if (lineComment)
lineComment = false;
}
else
if (lineComment)
{
index++;
}
else
if (blockComment)
{
if (character === "*" && source [index + 1] === "/")
{
index += 2;
blockComment = false;
}
else
index++;
}
else
if (character === "/")
{
character = source [index + 1];
if (character === "/")
{
index += 2;
lineComment = true;
}
else
if (character === "*")
{
index += 2;
blockComment = true;
}
else
break;
}
else
break;
}
if (index === length && blockComment)
unexpected ();
}
function JsExtError (name,message,location){
var filename = location && location.filename || options && options.filename || "<unknown file>", line = location && location.lineNumber || lineNumber || "<unknown line>", result = new Error(message + " [" + filename + ":" + line + "]");
result.name = name;
return result;
}
;
var SyntaxError = JsExtError.bind (null, "SyntaxError"), TypeError = JsExtError.bind (null, "TypeError"), ReferenceError = JsExtError.bind (null, "ReferenceError");
function unexpected (what){
var message;
if (! what)
{
message = "Illegal token";
}
else
if (what.value)
{
message = "Unexpected " + (what.value [0] === "\"" || what.value [0] === "'" ? what.value : "\"" + what.value + "\"");
}
else
if (TokenName [what.type])
{
message = "Unexpected " + TokenName [what.type].toLowerCase ();
}
else
message = "Unexpected token";
throw new SyntaxError(message, what);
}
var ch0 = "0".charCodeAt (0), ch1 = "1".charCodeAt (0), ch7 = "7".charCodeAt (0), ch9 = "9".charCodeAt (0), cha = "a".charCodeAt (0), chf = "f".charCodeAt (0), chz = "z".charCodeAt (0), chA = "A".charCodeAt (0), chF = "F".charCodeAt (0), chZ = "Z".charCodeAt (0);
function decimalDigit (c){
c = c.charCodeAt (0);
return ch0 <= c && c <= ch9;
}
function hexDigit (c){
c = c.charCodeAt (0);
return ch0 <= c && c <= ch9 || cha <= c && c <= chf || chA <= c && c <= chF;
}
function identifierStart (c){
var v = c.charCodeAt (0);
return cha <= v && v <= chz || chA <= v && v <= chZ || c === "$" || c === "_";
}
function identifierPart (c){
var v = c.charCodeAt (0);
return cha <= v && v <= chz || chA <= v && v <= chZ || ch0 <= v && v <= ch9 || c === "$" || c === "_";
}
var lastIdentifier = 0;
function newIdentifier (){
return "__" + (lastIdentifier++).toString (32);
}
function saveAll (){
return {"index":index,"lineNumber":lineNumber,"buffer":buffer};
}
function restoreAll (obj){
index = obj.index;
lineNumber = obj.lineNumber;
buffer = obj.buffer;
}
function attemptTo (firstFn,secondFn,forceSecond){
if (forceSecond)
{
return typeof secondFn === "function" ? secondFn () : secondFn;
}
else
{
saved = saveAll ();
try{
return typeof firstFn === "function" ? firstFn () : firstFn;
}catch (e){
if (e instanceof Error && /^Unexpected .+? \[.+?\:\d+\]$/.test (e.message))
{
restoreAll (saved);
return typeof secondFn === "function" ? secondFn () : secondFn;
}
else
throw e;
}
}
}
function advance (){
skipComments ();
if (index >= length)
return {"type":Token.EOF,"lineNumber":lineNumber,"range":[index,index]};
var token = readPunctuator ();
if (token !== undefined)
return token;
var character = source [index];
if (character === "'" || character === "\"")
return readStringLiteral ();
if (character === "`")
return readMultilineString ();
if (character === "." || decimalDigit (character))
return readNumericLiteral ();
token = readIdentifier ();
if (token !== undefined)
return token;
unexpected ();
}
function lex (){
if (buffer)
{
index = buffer.range [1];
lineNumber = buffer.lineNumber;
var token = buffer;
buffer = null;
return token;
}
else
{
buffer = null;
return advance ();
}
}
function lookahead (){
if (buffer === null)
{
var currentIndex = index, currentLineNumber = lineNumber;
buffer = advance ();
index = currentIndex;
lineNumber = currentLineNumber;
}
return buffer;
}
function peekLineTerminator (){
var pos = index, line = lineNumber, found;
skipComments ();
found = lineNumber !== line;
index = pos;
lineNumber = line;
return found;
}
function expect (value){
var token = lex ();
if (token.type !== Token.Punctuator || token.value !== value)
unexpected (token);
}
function expectKeyword (keyword){
var token = lex ();
if (token.type !== Token.Keyword || token.value !== keyword)
unexpected (token);
}
function match (value){
var token = lookahead ();
return token.type === Token.Punctuator && token.value === value;
}
function matchKeyword (keyword){
var token = lookahead ();
return token.type === Token.Keyword && token.value === keyword;
}
function matchLex (value){
var token = lookahead ();
if (token.type === Token.Punctuator && token.value === value)
return lex ();
else
return false;
}
function matchKeywordLex (keyword){
var token = lookahead ();
if (token.type === Token.Keyword && token.value === keyword)
return lex ();
else
return false;
}
function consumeSemicolon (){
if (source [index] === ";")
{
lex ();
return;
}
var line = lineNumber;
skipComments ();
if (lineNumber !== line)
return;
if (matchLex (";"))
return;
if (! state.preventSequence && ! match ("}") && lookahead ().type !== Token.EOF)
unexpected (buffer);
}
function leftSideOnly (expression){
if (! expression || expression.type !== Syntax.Identifier && expression.type !== Syntax.MemberExpression)
throw new SyntaxError("Invalid left-hand side", expression);
else
return expression;
}
function addClass (classEntry){
console.assert (! byName (classEntry.id.name), "Already declared");
classEntry.classObject = true;
{ var _8k48gap_29 = classEntry.members; for (var name in _8k48gap_29){
var value = _8k48gap_29[name];
value.className = classEntry.id;
}}
var constructor = classEntry.members ["@constructor"];
if (constructor === undefined)
{
constructor = updateMember (functionExpression ("@constructor", [], blockStatement ([])), classEntry);
constructor.autocreated = true;
}
var initializer = classEntry.members ["@initializer"];
if (initializer === undefined)
{
initializer = updateMember (functionExpression ("@initializer", [], blockStatement ([])), classEntry);
initializer.static = true;
initializer.autocreated = true;
}
{ var _933g976_30 = classEntry.members; for (var name in _933g976_30){
var member = _933g976_30[name];
updateMember (member, classEntry);
}}
var fields = filter (classEntry.members, function (arg){
return ! arg.method && ! arg.static && arg.init;
});
var initialization = fields.map (function (arg){
return $.extend (expressionStatement (assignmentExpression (memberExpression (thisExpression (), arg.id.name), arg.init || "undefined")), {"comment":arg.id.name,"autocreated":true});
});
constructor.body.body = initialization.concat (constructor.body.body);
classesByNames [classEntry.id.name] = $.extend (classEntry, {"childs":[],"probablyUseOther":0});
classes.push (classesByNames [classEntry.id.name]);
}
function updateMember (member,classEntry){
if (! classEntry.members.hasOwnProperty (member.id.name))
classEntry.members [member.id.name] = member;
member.className = classEntry.id;
member.method = member.type === Syntax.FunctionExpression;
member.processed = false;
return member;
}
function checkClassesForCircular (){
var current = {};
function checkClassForCircular (current){
if (typeof current === "string")
current = byName (current);
if (current)
{
if (current.id.name in current)
throw new TypeError("Circular dependency", id);
current [current.id.name] = true;
if (current.dependsOn.parent)
checkClassForCircular (current.dependsOn.parent.name);
{ var _c4q5b2_32 = current.dependsOn.uses; for (var _863nv0_33 = 0; _863nv0_33 < _c4q5b2_32.length; _863nv0_33 ++){
var use = _c4q5b2_32[_863nv0_33];
if (! current.parent || use.name !== current.parent.name)
checkClassForCircular (use.name);
}}
delete current [current.id.name];
}
}
for (var _8v9rmhj_34 = 0; _8v9rmhj_34 < classes.length; _8v9rmhj_34 ++){
var classEntry = classes[_8v9rmhj_34];
checkClassForCircular (classEntry);
}
}
function searchSuperExpression (obj){
if (obj.type === Syntax.CallExpression && "super" in obj && obj.callee === null)
{
return true;
}
else
if (obj && obj.body && obj.body.body)
{
{ var _48i0s5t_22 = obj.body.body; for (var _38hvdn9_23 = 0; _38hvdn9_23 < _48i0s5t_22.length; _38hvdn9_23 ++){
var child = _48i0s5t_22[_38hvdn9_23];
if (searchSuperExpression (child))
return true;
}}
}
else
{
for (var key in obj){
var child = obj[key];
if (child && typeof child.type === "string" && searchSuperExpression (child))
return true;
}
}
}
function connectClass (current,from){
if (from !== undefined)
current.childs.push (from);
if (current.connected)
return;
if (current.dependsOn.parent !== null)
{
var parent = byName (current.dependsOn.parent.name);
if (! parent)
throw new TypeError("Parent class not found", current.dependsOn.parent);
connectClass (parent, current);
{ var _66aiktc_24 = parent.members; for (var id in _66aiktc_24){
var member = _66aiktc_24[id];
if (! current.members.hasOwnProperty (id))
current.members [id] = $.extend (true, {}, member, {"publicMode":member.publicMode === "private" ? "locked" : member.publicMode});
}}
var parentConstructor = parent.members ["@constructor"], constructor = current.members ["@constructor"];
if (parentConstructor.body.body.length > 0 && ! searchSuperExpression (constructor))
{
if (constructor.autocreated || parentConstructor.params.length === 0)
constructor.body.body = [expressionStatement (superExpression (null))].concat (constructor.body.body);
else
throw new TypeError("Super constructor call is required", constructor);
}
}
{ var _7favqj5_25 = current.dependsOn.uses; for (var _1atvg34_26 = 0; _1atvg34_26 < _7favqj5_25.length; _1atvg34_26 ++){
var use = _7favqj5_25[_1atvg34_26];
var used = byName (use.name);
if (! used)
throw new TypeError("Used class \"" + use.name + "\" not found", use);
}}
current.connected = true;
}
function connectClasses (){
for (var _7o9qut7_27 = 0; _7o9qut7_27 < classes.length; _7o9qut7_27 ++){
var classEntry = classes[_7o9qut7_27];
connectClass (classEntry);
}
}
var classes, classesByNames, probablyUseOtherMaxValue, thatVariable;
function byName (name){
return classesByNames [name];
}
function doClasses (rawClasses,callback){
helpers = new HelpersManager();
classes = [];
classesByNames = {};
options = {};
probablyUseOtherMaxValue = 100;
thatVariable = "__that";
for (var _u96bol_37 = 0; _u96bol_37 < rawClasses.length; _u96bol_37 ++){
var rawClass = rawClasses[_u96bol_37];
addClass (rawClass);
}
if (classes.length > 0)
{
checkClassesForCircular ();
connectClasses ();
sortClasses ();
processClassesMembers ();
processClassesMethods ();
processClasses ();
var result = [];
for (var _7uvtdc_38 = 0; _7uvtdc_38 < classes.length; _7uvtdc_38 ++){
var classEntry = classes[_7uvtdc_38];
result.push.apply (result, classEntry.elements);
}
callback (result, helpers.helpers);
}
else
callback ();
options = null;
}
var OutputMode = {"Default":"Default","Static":"Static","InitializerOnly":"InitializerOnly","Empty":"Empty"};
function processClass (classEntry){
function classMode (){
if (classEntry.childs.length === 0 && ! classEntry.dependsOn.parent && objectMembers.length === 0 && constructor.body.body.length === 0)
{
if (staticFields.length > 0 || staticMethods.length > 0)
return OutputMode.Static;
if (initializer.body.body.length > 0)
return OutputMode.InitializerOnly;
return OutputMode.Empty;
}
return OutputMode.Default;
}
console.assert (! classEntry.elements, "Already processed");
var constructor = classEntry.members ["@constructor"], initializer = classEntry.members ["@initializer"];
var filtered = filter (classEntry, function (arg){
return arg.className === classEntry.id && arg.id.name [0] !== "@";
}), objectMembers = filtered.filter (function (arg){
return ! arg.static;
}), staticMembers = filtered.filter (function (arg){
return arg.static;
});
var objectMethods = objectMembers.filter (function (arg){
return arg.method;
}), objectFields = objectMembers.filter (function (arg){
return ! arg.method;
}), staticMethods = staticMembers.filter (function (arg){
return arg.method;
}), staticFields = staticMembers.filter (function (arg){
return ! arg.method;
});
constructor.id = null;
initializer.id = null;
if (! classEntry.params.abstract && filter (classEntry, function (arg){
return arg.abstract;
}).length > 0)
classEntry.params.abstract = true;
if (classEntry.params.abstract)
constructor.body.body = [ifStatement (binaryExpression (memberExpression (thisExpression (), identifier ("constructor")), "===", classEntry.id.name), throwStatement (newExpression ("Error", [stringLiteralWithQuotes ("Trying to instantiate abstract class " + classEntry.id.name)])))].concat (constructor.body.body);
var mode = classMode ();
if (mode === OutputMode.Empty)
return [oneVariableDeclaration (classEntry.id.name, objectExpression ([]))];
if (mode === OutputMode.InitializerOnly)
return [oneVariableDeclaration (classEntry.id.name, callExpression (initializer))];
var anonymousFunction = staticMembers.filter (function (arg){
return arg.publicMode === "private";
}).length > 0, result, mainObj;
if (mode === OutputMode.Default)
{
result = [anonymousFunction ? oneVariableDeclaration (classEntry.id, constructor) : functionDeclaration (classEntry.id, constructor.params, constructor.body)];
if (classEntry.dependsOn.parent)
result.push (expressionStatement (callExpression ("__prototypeExtend", [classEntry.id.name,classEntry.dependsOn.parent.name])));
for (var _5b85gpu_41 = 0; _5b85gpu_41 < objectFields.length; _5b85gpu_41 ++){
var field = objectFields[_5b85gpu_41];

}
for (var _8odo5ot_42 = 0; _8odo5ot_42 < objectMethods.length; _8odo5ot_42 ++){
var method = objectMethods[_8odo5ot_42];
if (! method.abstract)
result.push (assignmentStatement (memberExpression (memberExpression (classEntry.id.name, "prototype"), method.id), functionExpression (null, method.params, method.body)));
}
for (var _7fm772f_43 = 0; _7fm772f_43 < staticFields.length; _7fm772f_43 ++){
var field = staticFields[_7fm772f_43];
if (field.publicMode === "private")
result [0].declarations.push (field);
else
result.push (assignmentStatement (memberExpression (classEntry.id.name, field.id), field.init || "undefined"));
}
for (var _35r8932_44 = 0; _35r8932_44 < staticMethods.length; _35r8932_44 ++){
var method = staticMethods[_35r8932_44];
if (method.publicMode === "private")
result.push (method);
else
result.push (expressionStatement (assignmentExpression (memberExpression (classEntry.id.name, method.id), functionExpression (null, method.params, method.body))));
}
}
else
{
var properties = [];
result = [oneVariableDeclaration (classEntry.id, objectExpression (properties))];
for (var _2qkdjrs_45 = 0; _2qkdjrs_45 < staticFields.length; _2qkdjrs_45 ++){
var field = staticFields[_2qkdjrs_45];
if (field.publicMode === "private")
result [0].declarations.push (field);
else
properties.push (property (field.id, field.init || "undefined"));
}
for (var _ose0ra_46 = 0; _ose0ra_46 < staticMethods.length; _ose0ra_46 ++){
var method = staticMethods[_ose0ra_46];
if (method.publicMode === "private")
result.push (method);
else
properties.push (property (method.id, functionExpression (null, method.params, method.body)));
}
}
if (initializer.body.body.length > 0)
result.push (expressionStatement (callExpression (initializer)));
if (anonymousFunction)
{
result.push (returnStatement (classEntry.id.name));
return [oneVariableDeclaration (classEntry.id, callFunctionExpression (result))];
}
return result;
}
function processClasses (){
for (var _5io6lo0_47 = 0; _5io6lo0_47 < classes.length; _5io6lo0_47 ++){
var classEntry = classes[_5io6lo0_47];
classEntry.elements = processClass (classEntry);
classEntry.elements [0].headerComment = "/* Definition of class \"" + classEntry.id.name + "\" */";
}
}
function processClassesMembers (){
function rename (name,member,publicMode){
if (publicMode === "locked" || member.static && publicMode === "private")
return name;
switch (publicMode){
case "protected":
return "__" + name;
case "private":
return "__" + member.className.name + "_" + name;
case "public":
return name;
default:console.assert (false, "Bad publicMode value");
}
}
function badOverride (parentMember,childMember){
switch (childMember.publicMode){
case "public":
return false;
case "protected":
return parentMember.publicMode === "public";
case "private":
return true;
default:console.assert (false, "Bad publicMode value: " + childMember.publicMode);
}
}
function morePublicMode (firstMode,secondMode){
var modes = ["locked","private","protected","public"], firstId = modes.indexOf (firstMode), secondId = modes.indexOf (secondMode), maxId = Math.max (firstId, secondId);
return modes [maxId];
}
function processClassMember (classEntry,name,member){
var publicMode = member.publicMode, members = [member], updated;
function testChilds (current){
var childMember;
{ var _7isrs84_45 = current.childs; for (var _335kss_46 = 0; _335kss_46 < _7isrs84_45.length; _335kss_46 ++){
var child = _7isrs84_45[_335kss_46];
if (child.members.hasOwnProperty (name))
{
childMember = child.members [name];
if (badOverride (member, childMember))
throw new TypeError("Invalid public mode", childMember.id);
if (member.method !== childMember.method)
throw new TypeError("Invalid override (" + (member.method ? "method" : "field") + " required)", childMember.id);
publicMode = morePublicMode (publicMode, childMember.publicMode);
members.push (childMember);
}
testChilds (child);
}}
}
if (publicMode === "protected" || publicMode === "public")
testChilds (classEntry);
updated = rename (name, member, publicMode);
for (var _at4c96_47 = 0; _at4c96_47 < members.length; _at4c96_47 ++){
var targetMember = members[_at4c96_47];
targetMember.id.name = updated;
targetMember.processed = true;
}
}
function processClassMembers (classEntry){
{ var _4fveu00_48 = classEntry.members; for (var name in _4fveu00_48){
var member = _4fveu00_48[name];
if (name [0] !== "@" && ! member.processed)
processClassMember (classEntry, name, member);
}}
}
for (var _1mqj98b_49 = 0; _1mqj98b_49 < classes.length; _1mqj98b_49 ++){
var classEntry = classes[_1mqj98b_49];
processClassMembers (classEntry);
}
}
function processClassMethod (classEntry,methodEntry){
console.assert (classEntry && methodEntry, "Wrong arguments");
options.filename = methodEntry.filename;
var exclusions = {};
var currentFunction;
var usingThat = false;
function set (to,from){
for (var n in to)
delete to [n];
for (var n in from)
to [n] = from [n];
}
function getThis (){
var childFunction = currentFunction !== methodEntry;
if (childFunction)
usingThat = true;
return childFunction ? identifier (thatVariable) : thisExpression ();
}
function lookForExclusions (obj,target){
if (typeof obj === "object" && obj !== null)
{
if (obj instanceof Array)
{
for (var _4jn3v13_50 = 0; _4jn3v13_50 < obj.length; _4jn3v13_50 ++){
var child = obj[_4jn3v13_50];
lookForExclusions (child, target);
}
}
else
if ("type" in obj)
{
if (obj.type === Syntax.VariableDeclarator || obj.type === Syntax.FunctionDeclaration)
{
target [obj.id.name] = true;
}
else
if (obj.type !== Syntax.FunctionExpression)
{
for (var key in obj){
var value = obj[key];
lookForExclusions (value, target);
}
}
}
}
}
function processFunction (obj,parent){
console.assert (typeof obj === "object" && (obj.type === Syntax.FunctionDeclaration || obj.type === Syntax.FunctionExpression), "Wrong argument");
var oldExclusions = $.extend (true, {}, exclusions), oldCurrentFunction = currentFunction;
currentFunction = obj;
obj.params.forEach (function (arg){
return exclusions [arg.name] = true;
});
lookForExclusions (obj.body.body, exclusions);
process (obj.body.body, obj);
if (usingThat && methodEntry === obj)
{
var temp = [variableDeclarator (thatVariable, thisExpression ())];
if (obj.body.body [0] && obj.body.body [0].type === Syntax.VariableDeclaration)
obj.body.body [0].declarations = temp.concat (obj.body.body [0].declarations);
else
obj.body.body = [variableDeclaration (temp)].concat (obj.body.body);
}
exclusions = oldExclusions;
currentFunction = oldCurrentFunction;
}
function processProperty (obj,parent){
process (obj.value, parent);
}
function processIdentifier (obj,parent){
function replaceObject (member){
if (methodEntry.static)
throw new TypeError("Member \"" + obj.name + "\" is static", obj);
var that = getThis ();
var result;
if (member.method && parent.type !== Syntax.CallExpression)
{
helpers.set ("bindOnce", obj);
result = callExpression ("__bindOnce", [that,stringLiteralWithQuotes (member.id.name)]);
}
else
{
result = memberExpression (that, member.id.name);
}
return result;
}
function replaceStatic (member){
var className = member.className;
return memberExpression (className.name, member.id.name);
}
if (! (obj.name in exclusions))
{
var result = null, member;
if (obj.name in classEntry.members)
{
member = classEntry.members [obj.name];
if (member.publicMode === "locked")
throw new TypeError("Member \"" + obj.name + "\" has private access", obj);
if (! member.static)
result = replaceObject (member);
else
if (member.publicMode !== "private")
result = replaceStatic (member);
}
else
if (classesByNames [obj.name])
classEntry.probablyUseOther++;
if (result)
set (obj, result);
}
}
function processAssignmentExpression (obj,parent){
process (obj.right, obj);
process (obj.left, obj);
}
function processMemberExpression (obj,parent,preparent){
var member, propertyNameGetter, second, temp;
if (! obj.computed)
{
member = classEntry.members.hasOwnProperty (obj.property.name) ? classEntry.members [obj.property.name] : null;
if (member)
{
if (member.static)
{
if (member.publicMode === "private" && obj.object.type === Syntax.Identifier && obj.object.name === member.className.name)
{
set (obj, identifier (member.id.name));
return;
}
}
else
if (obj.object.type === Syntax.ThisExpression)
{
obj.property.name = member.id.name;
}
else
if (0 && member.publicMode !== "public")
{
if (parent instanceof Array && preparent)
parent = preparent;
if (obj.object.type === Syntax.Identifier)
{
obj.computed = true;
obj.property = conditionalExpression (binaryExpression (obj.object, "instanceof", member.className.name), stringLiteralWithQuotes (member.id.name), stringLiteralWithQuotes (obj.property.name));
process (obj.object, obj);
}
else
if (parent.type === Syntax.AssignmentExpression)
{
second = $.extend (true, {}, parent);
for (var key in parent){
var value = parent[key];
if (value === obj)
second [key] = memberExpression ("__", conditionalExpression (binaryExpression ("__", "instanceof", member.className.name), stringLiteralWithQuotes (member.id.name), stringLiteralWithQuotes (obj.property.name)), true);
}
set (parent, sequenceExpression ([assignmentExpression ("__", obj.object),second]));
process (obj.object, obj);
temp = true;
}
else
{
set (obj, sequenceExpression ([assignmentExpression ("__", obj.object),memberExpression ("__", conditionalExpression (binaryExpression ("__", "instanceof", member.className.name), stringLiteralWithQuotes (member.id.name), stringLiteralWithQuotes (obj.property.name)), true)]));
process (obj);
if (parent.type === Syntax.CallExpression && obj === parent.callee)
{
parent.callee = memberExpression (parent.callee, "call");
parent.arguments = [identifier ("__")].concat (parent.arguments);
}
temp = true;
}
if (temp && ! currentFunction.hasTempVariable)
{
currentFunction.body.body = [variableDeclaration ([variableDeclarator ("__")])].concat (currentFunction.body.body);
currentFunction.hasTempVariable = true;
}
return;
}
}
}
process (obj.object, obj);
if (obj.computed)
process (obj.property, obj);
}
function processSuperExpression (obj,parent){
if (currentFunction !== methodEntry && obj.callee === null)
throw new Error("Not implemented");
var currentClass = classEntry;
for (var i = 0; 
i < obj ["super"]; i++)
{
currentClass = byName (currentClass.dependsOn.parent.name);
if (! currentClass)
throw new TypeError("Super method isn't available", obj);
}
var method = obj.callee ? currentClass.members [obj.callee.name] : findByReplacement (currentClass, methodEntry.id.name);
if (! method)
throw new TypeError("Super method not found", obj);
if (method.static)
throw new TypeError("This method is static", obj);
var target;
if (method.id.name [0] !== "@")
{
target = memberExpression (memberExpression (currentClass.id, "prototype"), method.id.name);
}
else
{
target = currentClass.id;
}
if (obj.arguments === null)
{
obj.callee = memberExpression (target, "apply");
obj.arguments = identifier ("arguments");
}
else
obj.callee = memberExpression (target, "call");
var that = getThis ();
obj.arguments = [that].concat (obj.arguments);
}
function process (obj,parent,preparent){
if (typeof obj === "object" && obj !== null)
{
if (obj instanceof Array)
{
for (var _74gngjc_51 = 0; _74gngjc_51 < obj.length; _74gngjc_51 ++){
var child = obj[_74gngjc_51];
process (child, obj, parent);
}
}
else
if ("type" in obj)
{
switch (obj.type){
case Syntax.FunctionDeclaration:

case Syntax.FunctionExpression:
processFunction (obj, parent);
break;
case Syntax.Property:
processProperty (obj, parent);
break;
case Syntax.Identifier:
processIdentifier (obj, parent);
break;
case Syntax.AssignmentExpression:
processAssignmentExpression (obj, parent);
break;
case Syntax.MemberExpression:
processMemberExpression (obj, parent, preparent);
break;
case Syntax.CallExpression:
if ("super" in obj)
processSuperExpression (obj, parent);
default:for (var key in obj){
var value = obj[key];
process (value, obj);
}
}
}
}
}
process (methodEntry);
}
function processClassMethods (classEntry){
var replace, childMember;
{ var _76ss5vj_52 = classEntry.members; for (var name in _76ss5vj_52){
var member = _76ss5vj_52[name];
if (member.method && ! member.abstract && member.className === classEntry.id)
processClassMethod (classEntry, member);
}}
}
function processClassesMethods (){
for (var _8enlq5a_53 = 0; _8enlq5a_53 < classes.length; _8enlq5a_53 ++){
var classEntry = classes[_8enlq5a_53];
processClassMethods (classEntry);
}
}
function sortClasses (){
function getWeight (current){
if (typeof current === "string")
{
current = byName (current);
console.assert (current, "Class not found");
}
if (current.weight)
return current.weight;
current.weight = current.probablyUseOther ? 1 + Math.min (current.probablyUseOther, probablyUseOtherMaxValue) / (probablyUseOtherMaxValue + 1) : 1;
if (current.dependsOn.parent)
current.weight += getWeight (current.dependsOn.parent.name);
{ var _8ck4vb_58 = current.dependsOn.uses; for (var _6ocevk6_59 = 0; _6ocevk6_59 < _8ck4vb_58.length; _6ocevk6_59 ++){
var use = _8ck4vb_58[_6ocevk6_59];
current.weight += getWeight (use.name);
}}
return current.weight;
}
for (var _5b3168m_60 = 0; _5b3168m_60 < classes.length; _5b3168m_60 ++){
var current = classes[_5b3168m_60];
getWeight (current);
}
classes.sort (function (a,b){
return a.weight - b.weight;
});
}
var EachMode = {"FILTER_MODE":"filterMode","MAP_MODE":"mapMode","FIRST_HIT_MODE":"firstHitMode"};
function each (members,filter,callback,mode){
if (members.classObject)
members = members.members;
var result = mode === EachMode.MAP_MODE || mode === EachMode.FILTER_MODE ? [] : undefined, temp;
if (typeof filter !== "function")
filter = null;
if (typeof callback !== "function")
{
if (typeof callback === "string")
mode = callback;
callback = null;
}
for (var key in members){
var value = members[key];
if (filter === null || filter (value, key))
{
temp = callback === null ? value : callback (value, key);
if (mode === EachMode.FIRST_HIT_MODE)
return temp;
if (mode === EachMode.MAP_MODE)
result.push (temp);
if (mode === EachMode.FILTER_MODE)
result.push (value);
}
}
return result;
}
function map (members,callback,filter){
return each (members, filter, callback, EachMode.MAP_MODE);
}
function filter (members,filter,callback){
return each (members, filter, callback, EachMode.FILTER_MODE);
}
function findByReplacement (members,replacement){
return each (members, function (arg){
return arg.id && arg.id.name === replacement;
}, EachMode.FIRST_HIT_MODE);
}
function membersOut (classObject){
var arg = [];
{ var _41fverb_102 = classObject.members; for (var key in _41fverb_102){
var value = _41fverb_102[key];
arg.push (key + ":" + value.id);
}}
console.log (classObject.id.name + ": " + arg.join (", "));
}
var fs = require ("fs"), path = require ("path");
function benchmark (input,output,count){
if (count === undefined)
count = 1;
var data, result, from, total = 0;
console.time ("ast loaded");
data = JSON.parse (fs.readFileSync (input));
console.timeEnd ("ast loaded");
for (var i = 0; 
i < count; i++)
{
from = + new Date();
console.time ("generate");
result = generate (data);
console.timeEnd ("generate");
total += + new Date() - from;
}
if (i > 1)
console.log ("average time: " + total / count + "ms");
if (result)
fs.writeFileSync (output, result);
}
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
{ var _cue7pu_103 = s.slice (1); for (var _8lus2ef_104 = 0; _8lus2ef_104 < _cue7pu_103.length; _8lus2ef_104 ++){
var k = _cue7pu_103[_8lus2ef_104];
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
return console.log (" -" + arg.s + " (--" + arg.l + ")");
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
case "build-to":
Worker.params.buildTo = path.resolve (that.context.file.dirname, value);
break;
default:throw new MacroError(that.name, "Wrong param key (\"" + key + "\")");
}
}};
}
File.DEBUG_MODE = true;
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
{ var _8nfbont_68 = this instanceof File ? [{"root":this.root,"dirname":this.dirname}].concat (lookingAt) : lookingAt; for (var _2bkn7v8_69 = 0; _2bkn7v8_69 < _8nfbont_68.length; _2bkn7v8_69 ++){
var entry = _8nfbont_68[_2bkn7v8_69];
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
jsxParse (this.content, {"filename":this.filename,"initializationAllowed":true}, function (parsed,helpers){
this.log ("parsing processed");
this.state = File.STATE_FINISHED;
this.parsed = parsed;
this.helpers = helpers;
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
{ var _1sejb85_107 = this.files; for (var _5mr1kib_108 = 0; _5mr1kib_108 < _1sejb85_107.length; _5mr1kib_108 ++){
var file = _1sejb85_107[_5mr1kib_108];
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
function niceGeneratorMode (value){
niceMode = value;
}
var niceMode = true, generate = function (){
var priorities = [Syntax.MemberExpression,Syntax.NewExpression,Syntax.CallExpression,["++","--"],Syntax.UnaryExpression,["*","/","%"],["+","-"],["<<",">>",">>>"],["<","<=",">",">=","in","instanceof"],["==","!=","===","!=="],["&"],["^"],["|"],["&&"],["||"],Syntax.ConditionalExpression,Syntax.AssignmentExpression,Syntax.SequenceExpression], spaces = new Array(300).join (" "), badMode = 0, comment = null;
function findPriority (type,operator){
for (var priority = 0; priority < priorities.length; priority ++){
var group = priorities[priority];
if (typeof group === "string")
{
if (group === type)
return priority;
}
else
if (group.indexOf (operator) !== - 1)
return priority;
}
}
function generate (node,tabs,parent){
function end (){
if (comment !== null)
{
var result = " //__ " + comment + "\n" + tabs;
comment = null;
return result;
}
else
return "\n" + tabs;
}
function brackets (arg){
if (parent instanceof Array)
{
if (node.type === Syntax.SequenceExpression)
return "(" + arg + ")";
}
else
if (parent.type !== Syntax.MemberExpression || node === parent.object)
{
var nodePriority = findPriority (node.type, node.operator), parentPriority = findPriority (parent.type, parent.operator);
if (parentPriority !== undefined && nodePriority > parentPriority)
{
return "(" + arg + ")";
}
}
return arg;
}
function child (obj){
return generate (obj, tabs, node);
}
function indent (obj){
return end () + "\t" + generate (obj, tabs + "\t", node);
}
function mapArray (array,joinString,forceWrap,insertSpaces){
if (array.length === 0)
return "";
function join (array,fn,joinString){
var result = fn (array [0], 0);
for (var i = 1; 
i < array.length; i++)
result += joinString + end () + "\t" + fn (array [i], i);
return result;
}
var oneline, temp = comment, localTabs = tabs + "\t", previous, result = join (array, forceWrap ? function (arg,index){
var indented = generate (arg, localTabs, array);
if ((previous !== arg.type || arg.type !== Syntax.ExpressionStatement) && arg.type !== Syntax.ReturnStatement)
{
previous = arg.type;
if (index > 0)
return "\n" + localTabs + indented;
}
return indented;
} : function (arg){
var indented = generate (arg, localTabs, array);
if (! indented)
console.log ("fail", arg);
if (! forceWrap && indented.indexOf ("\n") !== - 1)
forceWrap = true;
return indented;
}, joinString);
if (! forceWrap)
oneline = result.replace (/(?: *\/\/__ [^\n]+)?\n\t*/g, "");
if (forceWrap || ! oneline || oneline.length > 60)
{
if (insertSpaces)
{
comment = temp;
return end () + "\t" + result + end ();
}
else
return result;
}
else
{
comment = temp;
if (insertSpaces)
return " " + oneline + " ";
else
return oneline;
}
}
function sub (obj){
return obj.type === Syntax.BlockStatement ? child (obj) : obj.type === Syntax.EmptyStatement ? ";" : indent (obj);
}
if (! node)
{
console.json (parent);
throw new Error("Node = " + node);
}
var result, temp;
if (niceMode)
{
if (comment === null && node.filename)
{
comment = node.filename + ":" + node.lineNumber;
}
else
if (node.headerComment)
{
result = node.headerComment;
node.headerComment = false;
return result + "\n\n" + tabs + generate (node, tabs, parent);
}
}
switch (node.type){
case Syntax.BooleanLiteral:

case Syntax.NullLiteral:

case Syntax.NumericLiteral:

case Syntax.RegexpLiteral:

case Syntax.StringLiteral:

case Syntax.UndefinedLiteral:
return node.value;
case Syntax.Identifier:
return node.name;
case Syntax.Property:
return child (node.key) + ": " + child (node.value);
case Syntax.ThisExpression:
return "this";
case Syntax.MemberExpression:
result = child (node.object);
if (node.computed)
{
if (/\w$/.test (result))
result += " ";
result += "[" + child (node.property) + "]";
}
else
result += "." + child (node.property);
return result;
case Syntax.NewExpression:
result = "new ";
case Syntax.CallExpression:
result = (result || "") + child (node.callee);
result += /\w$/.test (result) ? " (" : "(";
temp = mapArray (node.arguments, ", ", false, false);
if (temp.match (/\n(\t*)/) && RegExp.$1.length > tabs.length + 1)
temp = temp.replace (/\n\t/g, "\n");
return result + temp + ")";
case Syntax.UnaryExpression:
if (node.prefix)
{
result = node.operator;
if (node.operator !== "!")
result += " ";
result += child (node.argument);
}
else
result = child (node.argument) + " " + node.operator;
return brackets (result);
case Syntax.AssignmentExpression:

case Syntax.BinaryExpression:

case Syntax.LogicalExpression:
return brackets (child (node.left) + " " + node.operator + " " + child (node.right));
case Syntax.SequenceExpression:
return brackets (mapArray (node.expressions, ", "));
case Syntax.ConditionalExpression:
return brackets (child (node.test) + " ? " + child (node.consequent) + " : " + child (node.alternate));
case Syntax.ArrayExpression:
return "[" + mapArray (node.elements, ", ", false, true) + "]";
case Syntax.ObjectExpression:
return "{" + mapArray (node.properties, ", ", false, true) + "}";
case Syntax.FunctionExpression:
if (node.id)
result = "function " + child (node.id) + " (";
else
result = "function (";
return result + mapArray (node.params, ", ") + ")" + child (node.body);
case Syntax.FunctionDeclaration:
return "function " + child (node.id) + " (" + mapArray (node.params, ", ") + ")" + child (node.body);
case Syntax.VariableDeclaration:
temp = mapArray (node.declarations, ", ");
if (node.declarations.length === 1 && temp.match (/\n(\t*)/) && RegExp.$1.length > tabs.length + 1)
temp = temp.replace (/\n\t/g, "\n");
if (parent.type === Syntax.ForStatement || parent.type === Syntax.ForInStatement)
return "var " + temp;
else
return "var " + temp + ";";
case Syntax.VariableDeclarator:
return node.init ? child (node.id) + " = " + child (node.init) : child (node.id);
case Syntax.BlockStatement:
temp = node.body.length > 0;
result = "{" + end () + "\t";
if (parent.type === Syntax.FunctionDeclaration || parent.type === Syntax.FunctionExpression)
{ var _4inl008_21 = parent.params; for (var _j0c7pr_22 = 0; _j0c7pr_22 < _4inl008_21.length; _j0c7pr_22 ++){
var param = _4inl008_21[_j0c7pr_22];
if (param.defaultValue)
{
result += "if (" + child (param) + " === undefined)" + end () + "\t\t" + child (param) + " = " + child (param.defaultValue) + ";" + end () + "\n\t" + tabs;
temp = true;
}
}}
result += mapArray (node.body, "", true);
result += end () + "}";
if (temp)
{
return result;
}
else
return "{}";
case Syntax.ExpressionStatement:
result = child (node.expression);
if (/^function\s*\(/.test (result))
return "(" + result + ");";
else
return result + ";";
case Syntax.EmptyStatement:
return ";";
case Syntax.LabeledStatement:
return child (node.label) + ": " + child (node.body);
case Syntax.NotImplementedStatement:
return "console.warn ('Not implemented at " + node.lineNumber + " line of " + node.filename + "');";
case Syntax.ReturnStatement:
return "return" + (node.argument ? " " + child (node.argument) : "") + ";";
case Syntax.BreakStatement:
if (node.label)
return "break " + child (node.label) + ";";
else
return "break;";
case Syntax.ContinueStatement:
if (node.label)
return "continue " + child (node.label) + ";";
else
return "continue;";
case Syntax.IfStatement:
result = "if (" + child (node.test) + ")" + sub (node.consequent);
if (node.alternate)
{
if (node.consequent.type !== Syntax.BlockStatement)
result += end ();
else
result += " ";
result += "else";
if (node.alternate.type === Syntax.IfStatement)
{
result += " " + child (node.alternate);
}
else
{
if (node.alternate.type === Syntax.BlockStatement)
result += " ";
result += sub (node.alternate);
}
}
return result;
case Syntax.SwitchStatement:
result = "switch (" + child (node.discriminant) + "){";
{ var _isf2k9_23 = node.cases; for (var _1th2jk9_24 = 0; _1th2jk9_24 < _isf2k9_23.length; _1th2jk9_24 ++){
var obj = _isf2k9_23[_1th2jk9_24];
result += indent (obj);
}}
return result + end () + "}";
case Syntax.SwitchCase:
result = (node.test ? "case " + child (node.test) : "default") + ":" + end ();
return result + "\t" + mapArray (node.consequent, "", true);
case Syntax.WhileStatement:
return "while (" + child (node.test) + ")" + sub (node.body);
case Syntax.DoWhileStatement:
result = "do";
if (node.body.type !== Syntax.BlockStatement)
result += sub (node.body) + end ();
else
result += " " + sub (node.body) + " ";
return result + "while (" + child (node.test) + ");";
case Syntax.ForStatement:
result = "for (";
if (node.init)
result += child (node.init) + ";";
else
result += ";";
if (node.test)
result += " " + child (node.test) + ";";
else
result += ";";
if (node.update)
result += " " + child (node.update);
return result + ")" + sub (node.body);
case Syntax.ForInStatement:
return "for (" + child (node.left) + " in " + child (node.right) + ")" + sub (node.body);
case Syntax.TryStatement:
result = "try " + sub (node.block) + " ";
{ var _7u6e05g_25 = node.handlers; for (var _4pj0s9l_26 = 0; _4pj0s9l_26 < _7u6e05g_25.length; _4pj0s9l_26 ++){
var handler = _7u6e05g_25[_4pj0s9l_26];
result += child (handler) + " ";
}}
if (node.finalizer)
result += "finally " + sub (node.finalizer);
return result;
case Syntax.CatchClause:
return "catch (" + child (node.param) + ")" + sub (node.body);
case Syntax.ThrowStatement:
return "throw " + child (node.argument) + ";";
case Syntax.DebuggerStatement:
return "debugger;";
case Syntax.Program:
result = "";
temp = node.body [0].type;
{ var _29gnqo2_27 = node.body; for (var index = 0; index < _29gnqo2_27.length; index ++){
var childNode = _29gnqo2_27[index];
if (index > 0)
{
if (temp !== childNode.type || childNode.type !== Syntax.ExpressionStatement || childNode.headerComment)
{
temp = childNode.type;
result += end () + "\n";
}
else
result += end ();
}
result += child (childNode);
}}
return result + end ();
default:throw new Error("Unsupported type: " + node.type);
}
}
return function (arg){
var max = - 1, maxAllowed = 80, indent, begins = [], previous, index = 0, result = generate (arg, "");
if (niceMode)
{
result = result.replace (/([^\n]*?)[ \t]*( \/\/__ )([^\n]+)/g, function (match,begin,keyword,found){
var length = begin.replace (/\t/g, "    ").length;
if (length > maxAllowed)
{
return begin;
}
else
{
if (previous !== found)
previous = found;
else
found = "...";
begins.push (length);
if (length > max)
max = length;
return begin + keyword + found;
}
});
}
return result.replace (/ \/\/__ /g, function (arg){
return spaces.substr (0, max - begins [index++]) + "   // ";
});
};
} ();
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
this.debugMode = false;
this.binded = [];
}
LiteParser.EOF = 1;
Object.defineProperty (LiteParser.prototype, "lineNumber", {"get":function (){
var result = 1;
for (var i = 0, d = this.data, n = Math.min (d.length, this.index); 
i < n; i++)
if (d [i] === "\n")
result++;
return result;
}});
Object.defineProperty (LiteParser.prototype, "current", {"get":function (arg){
return this.data [this.index];
}});
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
return {"index":this.index,"lineNumber":this.lineNumber};
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
var args = [].slice.call (arguments), comment, handler;
if (typeof args [args.length - 2] === "function")
comment = args.pop ();
handler = args.pop ();
for (var _3a91uio_72 = 0; _3a91uio_72 < args.length; _3a91uio_72 ++){
var entry = args[_3a91uio_72];
this.binded.push ({"match":entry,"handler":handler,"comment":comment});
}
return this;
};
LiteParser.prototype.debug = function (from,to){
this.debugMode = true;
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
var value = {"index":Number.POSITIVE_INFINITY}, oldIndex = this.index, bindedObj, result, temp;
{ var _3n9qjfc_73 = this.binded; for (var i = 0; i < _3n9qjfc_73.length; i ++){
var arg = _3n9qjfc_73[i];
temp = indexOfExt (this.data, arg.match, this.index, i);
if (temp.index !== - 1 && temp.index < value.index)
{
value = temp;
bindedObj = arg;
}
}}
for (var i = 0; i < args.length; i ++){
var arg = args[i];
temp = indexOfExt (this.data, arg, this.index, i);
if (temp.index !== - 1 && temp.index < value.index)
{
value = temp;
bindedObj = null;
}
}
if (value.index === Number.POSITIVE_INFINITY)
return null;
this.moveTo (value);
if (! bindedObj)
{
result = value;
}
else
if (this.debugMode)
{
var from = this.lineNumber, fromIndex = this.index, temp = bindedObj.handler.call (this, value), to = this.lineNumber, toIndex = this.index, log;
if (bindedObj.comment)
{
log = "[LiteParser] " + (typeof bindedObj.comment === "string" ? bindedObj.comment : bindedObj.comment.name) + " at " + from + " (" + fromIndex + ":" + toIndex + "): " + (typeof bindedObj.comment === "string" ? this.data.substring (fromIndex, toIndex) : bindedObj.comment.call (this, fromIndex, toIndex, value)).replace (/[\n\r]+/g, "\\n");
if (log.length > 100)
log = log.substr (0, 48) + "..." + log.slice (- 49);
console.log (log);
}
result = temp ? this.innerFindNext (args, fixedMode) : null;
}
else
result = bindedObj.handler.call (this, value) ? this.innerFindNext (args, fixedMode) : null;
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
var splitted = name.split (":");
this.name = splitted [0];
this.type = splitted [1] || null;
if (! macroBody)
{
macroBody = macroArgs;
macroArgs = null;
}
this.level = level;
this.context = context;
this.rawBody = macroBody;
this.localStorage = {};
this.arguments = macroArgs === null ? [{"name":"arg","type":null}] : macroArgs.map (function (arg){
return arg.match (/^(.+)\:([^\:]+)$/) ? {"name":RegExp.$1,"type":RegExp.$2} : {"name":arg,"type":null};
});
if (this.arguments.length > 0)
{
var last = this.arguments [this.arguments.length - 1];
this.asyncMode = last.name === "callback" && last.type === null || last.type === "callback";
}
else
this.asyncMode = false;
}
;
addLog (Macro, 3, function (arg){
return "@" + this.name;
});
Macro.ReturnType = {"Void":"void","Raw":"raw","RawNoMacros":"raw-nm","Boolean":"boolean","Number":"number","String":"string","Object":"object"};
Macro.Defaults = {"fs":fs,"path":path,"params":paramsManager,"ReturnType":Macro.ReturnType};
Macro.globalStorage = {};
Macro.prototype.defaults = function (context){
var result = {}, obj = {"name":this.name,"context":context,"macroContext":this.context};
{ var _4867aed_116 = Macro.Defaults; for (var key in _4867aed_116){
var value = _4867aed_116[key];
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
while (found = liteParser.findNext (/@([_$a-zA-Z][_$a-zA-Z0-9\.\-]*)/))
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
variables.push ("defineMacro = this.defineMacro.bind (this)");
for (var key in Macro.Defaults)
variables.push (key + " = this.defaults." + key);
{ var _70smvsp_117 = phase.used; for (var _330dsjk_118 = 0; _330dsjk_118 < _70smvsp_117.length; _330dsjk_118 ++){
var entry = _70smvsp_117[_330dsjk_118];
queue.add (macroStorage.get, entry.macro, this.level);
variables.push (entry.name + " = function (){ return this.macros." + entry.macro + ".call (this.context, [].slice.call (arguments)) }.bind (this)");
}}
this.macros = {};
this.debug = (variables.length ? "var " + variables.join (", ") + ";\n" : "") + converted;
this.callee = new Function(this.arguments.map (function (arg){
return arg.name;
}).join (","), this.debug);
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
console.assert (args instanceof Array, "Wrong argument");
console.assert (context instanceof Context, "Context required");
var that = this, object = {"defaults":this.defaults (context),"macros":this.macros,"macroContext":this.context,"context":context,"global":Macro.globalStorage,"local":this.localStorage,"require":function (arg){
return require (path.resolve (that.context.file.dirname, "node_modules", arg));
},"defineMacro":function (name,arguments,body){
if (body === undefined)
{
body = arguments;
arguments = [];
}
macroStorage.add (new Macro(name, that.level, that.context, typeof arguments === "string" ? arguments.split (",").map (Function.prototype.call.bind (String.prototype.trim)) : arguments, body));
}};
try{
{ var _2qlkdkp_119 = this.arguments; for (var id = 0; id < _2qlkdkp_119.length; id ++){
var arg = _2qlkdkp_119[id];
if (arg.type === "callback" && typeof args [id] !== "function")
throw new MacroError(this.name, args, "Callback requested");
}}
return this.callee.apply (object, args.map (function (value,pos){
switch (this.arguments [pos] && this.arguments [pos].type){
case "boolean":
return ! ! value;
case "string":
return String (value);
case "number":
return + value;
case "object":
return typeof value === "object" ? value : null;
default:return value;
}
}.bind (this)));
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
var result = new Error("@" + name + (args ? " (" + Array.prototype.map.call (args, function (arg){
return JSON.stringify (arg);
}).join (", ") + ")" : "") + (parent ? ":\n" + parent.stack : message ? ": " + message : ""));
result.name = "MacroError";
return result;
}
;
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
this.log ("macro @" + this.name + " found");
this.state = MacroCall.STATE_CONNECTED;
this.macro = arg;
MacroCall.waitingForMacro--;
callback ();
}.bind (this));
};
MacroCall.prototype.prepareArguments = function (callback){
console.assert (this.state == MacroCall.STATE_CONNECTED, "Wrong state (" + this.state + ")");
this.state = MacroCall.STATE_WAITING;
function cast (argument,value,callback){
function nextStep (){
var data;
try{
eval ("data = " + convert (arg, {"filename":"macro arg"}));
callback (data);
}catch (e){
console.fatal (2, "Error at argument preparing:\n" + (value || "< empty string >") + " ⇒ " + (arg || "< empty string >") + "\n\n" + e.stack);
}
}
switch (argument && argument.type){
case "raw-nm":
callback (value);
break;
case "raw":
macrosProcess (value, this.level, this.context, callback);
break;
default:macrosProcess (value, this.level, this.context, nextStep);
}
}
var queue = new Queue(this, Queue.MODE_PARALLEL).description ("macro call arguments prepare");
{ var _4dhh93b_120 = this.arguments; for (var i = 0; i < _4dhh93b_120.length; i ++){
var arg = _4dhh93b_120[i];
queue.add (cast, this.macro.arguments [i], arg);
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
this.log ("call complete");
if (answer === undefined)
answer = "";
this.state = MacroCall.STATE_CALLED;
this.result = answer;
MacroCall.waitingForCallback--;
callback ();
}.bind (this);
if (this.macro.asyncMode)
{
var temp = this.arguments, delta = this.macro.arguments.length - (temp.length + 1);
if (delta < 0)
temp = temp.slice (0, delta);
else
if (delta > 0)
temp = temp.concat (new Array(delta));
temp.push (resultHandler);
this.macro.call (this.context, temp);
}
else
resultHandler (this.macro.call (this.context, this.arguments));
};
MacroCall.prototype.processResult = function (callback){
console.assert (this.state == MacroCall.STATE_CALLED, "Wrong state (" + this.state + ")");
this.state = MacroCall.STATE_WAITING;
var doMacros = false, result = this.result, type = this.macro.type;
if (type === null && result && typeof result.type === "string")
{
type = result.type;
result = result.value;
}
if (type !== null)
{
switch (type){
case "void":
result = "";
break;
case "raw":
doMacros = true;
result = String (result);
break;
case "raw-nm":
result = String (result);
break;
case "boolean":
result = result ? "true" : "false";
break;
case "number":
result = + result;
break;
case "object":
if (typeof result !== "object")
throw new Error("Type mismatch (waiting for object, but get " + typeof result + ")");
doMacros = true;
result = JSON.stringify (result);
break;
case "string":
doMacros = true;
result = JSON.stringify (String (result));
break;
default:throw new Error("Invalid macro type (" + this.name + ", " + this.macro.type + ")");
}
}
else
if (result !== undefined)
{
doMacros = true;
result = String (result);
}
else
result = "";
var resultHandler = function (result){
this.log ("result processed");
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
var anonymousMacroId = + new Date();
function macrosParse (source,level,context){
console.assert (context instanceof Context, "Context required");
function throwError (message){
throw new Error(["MacroParseError",context.file.filename,liteParser.lineNumber,message]);
}
function parseMacroDefine (){
var name = found.raw [1], splitted = name.split (":"), position, argument, arguments, blockMode, temp, body, converted, insertCall = false, from;
if (splitted [0] === "macro")
throwError ("Unexpected reserved word");
temp = liteParser.whatNext (/[^\s]/);
from = liteParser.index;
if (temp.value === "(")
{
liteParser.moveTo (temp);
position = liteParser.index;
arguments = [];
while (temp = liteParser.findHere (",", ")"))
{
argument = liteParser.substring (position, liteParser.index - 1).trim ();
if (argument.length)
{
arguments.push (argument);
if (! /^[a-z$_][a-z$_\d]*(\:[a-z\-]+)?$/i.test (argument))
{
arguments = null;
liteParser.index = from;
break;
}
}
else
if (arguments.length || temp.value === ",")
throwError ("Unexpected token " + temp.value);
position = liteParser.index;
if (temp.value === ")")
break;
}
if (! temp)
throwError ("Unexpected end of file");
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
if (! temp || temp.value === LiteParser.EOF)
{
throwError ("Unexpected end of file");
}
else
if (temp.value === "}")
{
temp = liteParser.whatNext (/[^\s]/);
if (temp && temp.value === "(")
insertCall = true;
}
body = liteParser.substring (position, liteParser.index).trim ();
temp = liteParser.whatNext (/[^\s]/);
if (temp && temp.value === ";")
liteParser.moveTo (temp);
if (! splitted [0])
insertCall = true;
if (insertCall)
{
name = "__anonymous_macro_" + ++ anonymousMacroId;
liteParser.replace (found.index, liteParser.index, "@" + name);
liteParser.index = found.index;
if (splitted [1])
name += ":" + splitted [1];
}
else
liteParser.replace (found.index, liteParser.index, "/* There was definition of @" + name + " */");
var macro = new Macro(name, level, context, arguments, body);
macroStorage.add (macro);
}
function parseMacroCall (){
var name = found.raw [1], arguments = [], position, argument, quotesCount, temp;
if (name === "macro")
throwError ("Unexpected reserved word");
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
throwError ("Unexpected end of file");
argument = liteParser.substring (position, liteParser.index - 1);
arguments.push (argument);
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
throwError ("Unexpected token " + temp.value);
if (temp.value === ")")
break;
else
position = liteParser.index;
}
if (! temp)
throwError ("Unexpected end of file");
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
}, "comment").on ("/*", function (arg){
return this.findSimple ("*/");
}, "multiline comment").on ("'", "\"", "`", function (arg){
var from = liteParser.index;
for (var temp; 
temp = liteParser.findSimple ("\\" + arg.value, arg.value); )
if (temp.value === arg.value)
return true;
return false;
}, "string").on (/(^|function|lambda|return|[=,\(\[\{\:;])\s*\/[^\/\*]/, function (arg){
for (var temp; 
temp = liteParser.findSimple ("\\\\", "\\/", "/"); )
if (temp.value === "/")
return true;
return false;
}, function regExp (from,to,found){
return this.data.substring (from - 1, to - 1);
}), found;
while (found = liteParser.findNext (/@macro\s+((?:[_$a-zA-Z][_$a-zA-Z0-9\.\-]*)?(?:\:[a-z\-]+)?)/, /@([_$a-zA-Z][_$a-zA-Z0-9\.\-]*)/, "{", "}"))
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
{ var _6nk431s_74 = temp.calls; for (var _d9mfe2_75 = 0; _d9mfe2_75 < _6nk431s_74.length; _d9mfe2_75 ++){
var call = _6nk431s_74[_d9mfe2_75];
queue.add (call, call.process.bind (call));
}}
queue.run (function (arg){
for (var _6lblova_76 = 0; _6lblova_76 < arg.length; _6lblova_76 ++){
var entry = arg[_6lblova_76];
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
{ var _8vjij1o_124 = this.requests; for (var pos = 0; pos < _8vjij1o_124.length; pos ++){
var request = _8vjij1o_124[pos];
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
{ var _67og10a_125 = this.macros [name]; for (var _90a6mn6_126 = 0; _90a6mn6_126 < _67og10a_125.length; _90a6mn6_126 ++){
var macro = _67og10a_125[_90a6mn6_126];
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
process.on ("uncaughtException", function (arg){
return console.fatal ("    [    UNCAUGHT    ]\n\n" + (arg && arg.stack ? arg.stack : String (arg)));
});
console.fatal = function (){
console.log ("\n    [  FATAL  ERROR  ]\n");
console.log.apply (console, arguments);
console.log ("");
console.log = function (arg){
;
};
setTimeout (function (arg){
return process.exit (1);
}, 500);
};
console.json = function (obj){
console.log (JSON.stringify (obj, false, 4));
};
function convert (jsxCode,options){
var parsed;
if (typeof jsxCode === "string")
{
try{
parsed = jsxParse (jsxCode, options);
}catch (e){
console.fatal ("Parsing failed (" + options.filename + ")" + ("\n" + jsxCode.trim ()).replace (/\n/g, "\n> ") + "\n\n" + e.stack);
}
}
else
parsed = jsxCode;
try{
if (options.filename === "result")
badMode = 1;
return generate (parsed);
}catch (e){
console.fatal ("Generating failed (" + options.filename + ")\n" + e.stack);
}
}
var previousT = (function (arg){
return arg [0] * 1000000000 + arg [1];
}) (process.hrtime ());
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
function tstr (n){
var s = String (n / 1000000000 | 0), ms = String ((n % 1000000000) / 1000000 | 0);
while (s.length < 2)
s = "0" + s;
while (ms.length < 3)
ms = "0" + ms;
return "[" + s + "." + ms + "]";
}
var size = 32, r = function (arg){
var f = [key + (typeof fn === "function" ? fn.call (this) : fn) + ":"], h = process.hrtime (), t = h [0] * 1000000000 + h [1];
if (f [0].length > size)
f [0] = f [0].substr (0, size - 4) + "...:";
f [0] += new Array(1 + size - f [0].length).join (" ");
f.push.apply (f, arguments);
f = [tstr (t - previousT)].concat (f);
};
return p ? (p.prototype.log = r) : r;
}
function isEmpty (obj){
for (var n in obj)
return false;
return true;
}
var $ = {"extend":(function (){
function extend (target,source,deep){
for (var key in source){
var value = source[key];
if (deep && (typeof value === "object" || value instanceof Array))
{
if (value instanceof Array && ! (target [key] instanceof Array))
target [key] = [];
else
if (typeof value === "object" && typeof target [key] !== "object")
target [key] = {};
extend (target [key], value, deep);
}
else
if (value !== undefined)
target [key] = value;
}
}
return function (target){
var deep, args = Array.prototype.slice.call (arguments, 1);
if (typeof target == "boolean")
{
deep = target;
target = args.shift ();
}
args.forEach (function (arg){
return extend (target, arg, deep);
});
return target;
};
}) ()};
function Worker (path){
this.path = path;
this.mainFile = undefined;
this.state = Worker.STATE_INITIAL;
this.data = {"statements":[],"classes":[],"initializations":[],"helpers":{}};
}
Worker.STATE_WAITING = - 1;
Worker.STATE_INITIAL = 0;
Worker.STATE_STARTED = 1;
Worker.STATE_COLLECTED = 2;
Worker.STATE_CLASSES = 3;
Worker.STATE_GENERATED = 4;
Worker.STATE_FINISHED = 5;
addLog (Worker, 0, "app");
Worker.params = {};
Worker.storage = {"macros":{}};
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
console.fatal ("Macro initialization failed: " + macroStorage.requests.map (function (arg){
return "@" + arg [0];
}).join (", "));
}
}, 100);
};
Worker.prototype.start = function (callback){
console.assert (this.state == Worker.STATE_INITIAL, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
this.log ("started");
{ var _94pjnpn_75 = File.find ("default/*") || []; for (var _8bb8ttu_76 = 0; _8bb8ttu_76 < _94pjnpn_75.length; _8bb8ttu_76 ++){
var file = _94pjnpn_75[_8bb8ttu_76];
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
{ var _6t1vsc4_77 = fileStorage.files; for (var _5erfki6_78 = 0; _5erfki6_78 < _6t1vsc4_77.length; _5erfki6_78 ++){
var file = _6t1vsc4_77[_5erfki6_78];
$.extend (this.data.helpers, file.helpers);
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
doClasses (this.data.classes, function (classes,helpers){
if (classes === undefined)
classes = [];
this.log ("classes processed");
$.extend (this.data.helpers, helpers);
this.state = Worker.STATE_CLASSES;
this.data.classes = classes;
callback ();
}.bind (this));
};
Worker.prototype.generate = function (callback){
console.assert (this.state == Worker.STATE_CLASSES, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
var elements = doHelpers (this.data.helpers).concat (this.data.statements).concat (this.data.classes).concat (this.data.initializations), ast = program (elements), temp = path.resolve (__dirname, "../tests/ast-debug.json");
if (! fs.existsSync (temp))
fs.writeFileSync (temp, JSON.stringify (ast, false, 4));
var result = convert (ast, {"filename":"result"});
this.log ("js generated");
this.state = Worker.STATE_GENERATED;
this.result = result;
callback ();
};
Worker.prototype.save = function (callback){
console.assert (this.state == Worker.STATE_GENERATED, "Wrong state (" + this.state + ")");
this.state = Worker.STATE_WAITING;
var saveTo = Worker.params.buildTo || this.mainFile.fullpath.replace (/(\.[^\/\\\.]+)?$/, function (arg){
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
