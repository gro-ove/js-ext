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
function skipComment (){
var ch, start, blockComment, lineComment, lineCommentFrom;
blockComment = false;
lineComment = false;
while (index < length)
{
ch = source [index];
if (lineComment)
{
ch = source [index++];
if (isLineTerminator (ch))
{
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
{
ch = source [index];
if (ch === "/")
{
++ index;
blockComment = false;
}
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
function helperById (id,value){
switch (id){
case "propertyAccess":
return functionDeclaration ("__pa", ["c","o","r","u"], [expressionStatement (assignmentExpression ("u", callExpression (memberExpression ("r", "slice"), ["u"]))),returnStatement (memberExpression ("o", conditionalExpression (binaryExpression ("o", "instanceof", "c"), "r", "u"), true))]);
case "propertyName":
return functionDeclaration ("__pn", ["c","o","r","u"], [expressionStatement (assignmentExpression ("u", callExpression (memberExpression ("r", "slice"), ["u"]))),returnStatement (conditionalExpression (binaryExpression ("o", "instanceof", "c"), "r", "u"))]);
case "prototypeExtend":
return functionDeclaration ("__pe", ["c","p","t"], [expressionStatement (assignmentExpression ("t", functionExpression ())),expressionStatement (assignmentExpression (memberExpression ("t", "prototype"), memberExpression ("p", "prototype"))),expressionStatement (assignmentExpression (memberExpression ("c", "prototype"), newExpression ("t"))),expressionStatement (assignmentExpression (memberExpression (memberExpression ("c", "prototype"), "constructor"), "c"))]);
case "createArray":
return functionDeclaration ("__ca", ["from","to","result"], [ifStatement (binaryExpression (unaryExpression ("from", "typeof", true), "===", literal ("string")), expressionStatement (assignmentExpression ("from", callExpression (memberExpression ("from", "charCodeAt"), [literal (0)])))),ifStatement (binaryExpression (unaryExpression ("to", "typeof", true), "===", literal ("string")), expressionStatement (assignmentExpression ("to", callExpression (memberExpression ("to", "charCodeAt"), [literal (0)])))),expressionStatement (assignmentExpression ("result", newExpression ("Array", [binaryExpression (callExpression (memberExpression ("Math", "abs"), [binaryExpression ("to", "-", "from")]), "+", literal (1))]))),ifStatement (binaryExpression ("from", "<", "to"), forStatement (variableDeclaration ([variableDeclarator ("i", literal (0))]), binaryExpression ("i", "<", memberExpression ("result", "length")), unaryExpression ("i", "++"), expressionStatement (assignmentExpression (memberExpression ("result", "i", true), binaryExpression ("i", "+", "from")))), forStatement (variableDeclaration ([variableDeclarator ("i", binaryExpression (memberExpression ("result", "length"), "-", literal (1)))]), binaryExpression ("i", ">=", literal (0)), unaryExpression ("i", "--"), expressionStatement (assignmentExpression (memberExpression ("result", "i", true), binaryExpression ("from", "-", "i"))))),returnStatement ("result")]);
case "bindOnce":
var bindedTable = memberExpression ("obj", "__bt"), objectFunction = memberExpression ("obj", "name", true), placeInTable = memberExpression (bindedTable, "name", true);
return functionDeclaration ("__bo", ["obj","name"], [ifStatement (unaryExpression (callExpression (memberExpression ("obj", "hasOwnProperty"), [literal ("__bt")]), "!", true), expressionStatement (assignmentExpression (bindedTable, objectExpression ()))),ifStatement (unaryExpression (callExpression (memberExpression (bindedTable, "hasOwnProperty"), ["name"]), "!", true), expressionStatement (assignmentExpression (placeInTable, callExpression (memberExpression (objectFunction, "bind"), ["obj"])))),returnStatement (placeInTable)]);
case "findReplaced":
return functionDeclaration ("__fr", ["obj","name"], [returnStatement ("undefined")]);
default:console.assert (false, "Wrong helper id: " + id);
}
}
function doHelpers (helpers){
var result = [];
for (var id in helpers){
var value = helpers[id];
if (value)
result.push (helperById (id, value));
}
return result;
}
function isIdentifierStart (ch){
return ch === "$" || ch === "_" || ch === "\\" || ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch.charCodeAt (0) >= 128 && Regex.NonAsciiIdentifierStart.test (ch);
}
function isIdentifierPart (ch){
return ch === "$" || ch === "_" || ch === "\\" || ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z" || ch >= "0" && ch <= "9" || ch.charCodeAt (0) >= 128 && Regex.NonAsciiIdentifierPart.test (ch);
}
var source, index, lineNumber, lineStart, length, buffer, state, information, options, helpers;
function jsxParse (code,args,callback){
source = String (code);
index = 0;
lineNumber = source.length ? 1 : 0;
lineStart = 0;
length = source.length;
buffer = null;
state = {"allowIn":true,"inClass":false,"parsingComplete":false,"preventSequence":false,"classes":[]};
options = args || {"filename":"[ not a file ]","insertReturn":false,"initializationAllowed":false};
helpers = {};
var result = parseProgram ();
if (typeof callback === "function")
callback (result, helpers);
else
return result;
}
function isKeyword (id){
var keyword = false;
switch (id.length){
case 2:
keyword = (id === "if") || (id === "in") || (id === "do");
break;
case 3:
keyword = (id === "var") || (id === "for") || (id === "new") || (id === "try") || (id === "uses");
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
keyword = (id === "function") || (id === "continue") || (id === "debugger") || (id === "abstract");
break;
case 9:
keyword = (id === "protected") || (id === "interface");
break;
case 10:
keyword = (id === "instanceof") || (id === "implements");
break;
case 11:
keyword = (id === "implemented");
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
var Token, PropertyKind, TokenName, Syntax, Messages, Regex;
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
Messages = {"UnexpectedToken":"Unexpected token %0","UnexpectedNumber":"Unexpected number","UnexpectedString":"Unexpected string","UnexpectedIdentifier":"Unexpected identifier","UnexpectedReserved":"Unexpected reserved word","UnexpectedEOS":"Unexpected end of input","NewlineAfterThrow":"Illegal newline after throw","InvalidRegExp":"Invalid regular expression","InvalidIdentifier":"Invalid identifier","UnterminatedRegExp":"Invalid regular expression: missing /","InvalidLHSInAssignment":"Invalid left-hand side in assignment","InvalidLHSInForIn":"Invalid left-hand side in for-in","MultipleDefaultsInSwitch":"More than one default clause in switch statement","NoCatchOrFinally":"Missing catch or finally after try","IllegalContinue":"Illegal continue statement","IllegalBreak":"Illegal break statement","IllegalReturn":"Illegal return statement","AccessorDataProperty":"Object literal may not have data and accessor property with the same name","AccessorGetSet":"Object literal may not have multiple get/set accessors with the same name","CyclicDependencyDetected":"Cyclic dependency detected (%0)","PrivateAccessError":"Attempt to access to private %0","ObjectAccessError":"Attempt to access to object field %0 from static method","SuperMethodIsNotAvailable":"Super methods are not available for this class","ClassAlreadyDefined":"Class with name %0 already defined","ClassMemberAlreadyDefined":"Class member with name %0 already defined","ParentClassNotFound":"Parent class %0 not found","UsingClassNotFound":"Using class %0 not found","SuperConstructorCallNeeded":"Super constructor call is required","WtfMan":"WTF, MAN"};
Regex = {"NonAsciiIdentifierStart":new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠࢢ-ࢬऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꪀ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]"),"NonAsciiIdentifierPart":new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]")};
function setMark (obj,mark){
return $.extend (obj, mark);
}
function mark (obj){
return $.extend (obj || {}, {"lineNumber":lineNumber,"lineStart":lineStart,"filename":options.filename,"index":index});
}
function markIf (obj){
return obj && (state.inClass || ! state.parsingComplete) ? mark (obj) : obj;
}
function literal (value){
return typeof value === "object" && value !== null ? {"type":Syntax.Literal,"value":value.value} : {"type":Syntax.Literal,"value":value};
}
function identifier (arg){
return typeof arg === "string" ? markIf ({"type":Syntax.Identifier,"name":arg}) : arg || null;
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
function superExpression (name,arguments,level){
return {"type":Syntax.CallExpression,"callee":identifier (name instanceof Array ? null : name),"arguments":(name instanceof Array ? name : arguments) || [],"super":(name instanceof Array ? arguments : level) || 1};
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
return {"type":Syntax.NewExpression,"callee":identifier (callee),"arguments":arguments.map (identifier)};
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
return mark ({"type":Syntax.IfStatement,"test":identifier (test),"consequent":trueStatement,"alternate":falseStatement});
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
return mark ({"type":Syntax.ForStatement,"init":left,"test":test,"update":update,"body":blockStatement (body)});
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
var tempId = 0;
function functionExpression (name,params,body){
if (name instanceof Array)
{
body = params;
params = name;
name = null;
}
return {"type":Syntax.FunctionExpression,"id":identifier (name),"params":params ? params.map (identifier) : [],"defaults":[],"body":blockStatement (body),"rest":null,"generator":false,"expression":false,"number":name + tempId++};
}
function functionDeclaration (name,params,body){
if (params === undefined)
params = [];
return mark ({"type":Syntax.FunctionDeclaration,"id":identifier (name),"params":params.map (identifier),"defaults":[],"body":blockStatement (body),"rest":null,"generator":false,"expression":false,"number":name + tempId++});
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
throwUnexpected (token);
if (token.value === ",")
lex ();
}
function parseArrayPerlInitializer (elements){
expect (".");
expect (".");
var from = elements [0], to = parseAssignmentExpression ();
expect ("]");
if (from.type === Syntax.Literal && to.type === Syntax.Literal)
{
var nfrom = + from.value, nto = + to.value;
if (Number.isNaN (nfrom))
nfrom = String (from.value).charCodeAt (0);
if (Number.isNaN (nto))
nto = String (to.value).charCodeAt (0);
if (Math.abs (nto - nfrom) < 20)
{
from.value = nfrom;
if (nto > nfrom)
for (nfrom++; 
nfrom <= nto; nfrom++)
elements.push (literal (nfrom));
else
for (nfrom++; 
nfrom >= nto; nfrom--)
elements.push (literal (nfrom));
return arrayExpression (elements);
}
}
helpers.createArray = true;
return callExpression ("__ca", [from,to]);
}
function parseArrayInitialiser (){
var elements = [], token, comma = {};
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
token = lookahead ();
if (elements.length === 1 && token.value === "." && source [token.range [0] + 1] === ".")
return parseArrayPerlInitializer (elements);
if (token.value !== "]")
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
var block, oldPreventSequence = state.preventSequence;
state.preventSequence = false;
expect ("{");
block = parseStatementList ();
expect ("}");
state.preventSequence = oldPreventSequence;
return blockStatement (block);
}
function parseBlockOrNotBlock (){
var block, oldPreventSequence;
if (match ("{"))
return parseBlock ();
else
return blockStatement ([parseStatement ()], true);
}
function parseClassIdentifier (){
return mark (parseVariableIdentifier ());
}
function parseClassParams (){
var token, result = {"publicMode":null,"abstract":false,"implemented":false,"static":false,"interface":false};
do
{
token = lookahead ();
switch (token.value){
case "public":

case "private":

case "protected":
if (result.publicMode !== null)
throwUnexpected (token);
lex ();
result.publicMode = token.value;
break;
case "abstract":

case "static":
if (result.static || result.abstract)
throwUnexpected (token);
case "implemented":
if (result [token.value])
throwUnexpected (token);
lex ();
result [token.value] = true;
break;
case "interface":
if (result.abstract)
throwUnexpected (token);
lex ();
result.interface = token.value;
return result;
case "class":
lex ();
return result;
default:throwUnexpected (token);
}
}
 while (index < length);
}
function parseExtendsImplementsAndUses (mode){
function collect (list){
if (list === undefined)
list = [];
do
list.push (parseClassIdentifier ());
 while (index < length && match (",") && lex ());
return list;
}
var token, result = {"parent":null,"implements":[],"uses":[]};
do
{
token = lookahead ();
switch (token.value){
case "extends":
if (result.parent || mode.interface || mode.static)
throwUnexpected (token);
lex ();
result.parent = parseClassIdentifier ();
helpers.prototypeExtend = true;
break;
case "implements":

case "uses":
lex ();
collect (result [token.value]);
break;
default:return result;
}
}
 while (index < length);
}
function parseClassMembers (params,dependsOn){
var oldInClass = state.inClass, token, result = {}, current;
function refresh (){
current = {"publicMode":null,"abstract":params.abstract,"static":params.static};
}
function set (obj){
var name = obj.id.name, has = result.hasOwnProperty (name), temp = has ? result [name] : null;
$.extend (obj, current, {"publicMode":current.publicMode || params.publicMode});
if (temp instanceof Array)
{
temp.push (obj);
}
else
if (has)
{
throwError (token, "Name \"" + name + "\" is already used by an another " + (result [name].type === Syntax.VariableDeclarator ? "field" : "method"));
}
else
result [name] = obj;
}
function parseField (){
if (matchKeyword ("var"))
lex ();
var token = lookahead (), data = parseVariableDeclarationList ();
consumeSemicolon ();
for (var _8vblc3c_79 = 0; _8vblc3c_79 < data.length; _8vblc3c_79 ++){
var entry = data[_8vblc3c_79];
if (params.interface && ! current.static)
throwError (token, "Interface couldn't have object fields.");
if (params.implemented && entry.init)
throwError (token, "Implemented couldn't have initialized fields.");
if (current.abstract)
throwError (token, "Field could't be abstract.");
set (entry);
}
refresh ();
}
function parseMethod (){
if (matchKeyword ("function"))
lex ();
state.superAvailable = ! current.static && dependsOn.parent;
if (current.publicMode === "private" && current.abstract)
throwError (token, "Private method could't be abstract.");
var result = parseFunction ({"keyword":null,"declaration":true,"empty":params.interface && ! current.static || params.implemented});
if (result.id === null)
result.id = identifier (current.static ? "@initializer" : "@constructor");
set (result);
state.superAvailable = false;
refresh ();
if (match (";"))
lex ();
}
state.inClass = true;
expect ("{");
refresh ();
do
{
token = lookahead ();
if (token.value === "}")
break;
switch (token.value){
case "private":
if (current.abstract)
throwUnexpected (token);
case "public":

case "protected":
if (current.publicMode !== null)
throwUnexpected (token);
lex ();
current.publicMode = token.value;
break;
case "abstract":
if (params.interface || current.publicMode === "private")
throwUnexpected (token);
case "static":
if (current.abstract || current.static)
throwUnexpected (token);
lex ();
current [token.value] = true;
break;
case "var":
parseField ();
break;
case "function":
parseMethod ();
break;
default:if (token.type === Token.Identifier || token.value === "(" || token.value === "{")
{
attemptTo (parseField, parseMethod);
}
else
throwUnexpected (token);
}
}
 while (index < length);
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
temp.push ({"FunctionDeclaration":"method","VariableDeclarator":"field"} [member.type] || member.type);
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
console.log (id.name + beforeString + ":\n" + membersStrings.join ("\n"));
}
function parseClassDeclaration (){
var params = parseClassParams ();
var id = parseClassIdentifier ();
var dependsOn = parseExtendsImplementsAndUses (params);
var members = parseClassMembers (params, dependsOn);
state.classes.push ({"id":id,"params":params,"dependsOn":dependsOn,"members":members});
return null;
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
function parseFunctionArguments (defaults,noargs){
return attemptTo (function (arg){
var name, params = [], comma = {};
expect ("(");
while (! match (")"))
{
if (params.length)
parseOptionalComma (comma);
name = parseVariableIdentifier ();
if (defaults && match ("="))
{
lex ();
defaults.push (ifStatement (binaryExpression (name.name, "===", "undefined"), expressionStatement (assignmentExpression (name.name, parseAssignmentExpression ()))));
}
params.push (name);
}
expect (")");
return params;
}, function (arg){
return noargs ? [] : [identifier ("arg")];
}, ! match ("("));
}
function parseFunctionSourceElements (defaults){
var oldPreventSequence = state.preventSequence, sourceElements = defaults || [], token;
if (match ("{"))
{
expect ("{");
token = lookahead ();
attemptTo (function (arg){
var object = objectExpression (parseObjectContent ()), statement = returnStatement (object);
sourceElements.push (statement);
consumeSemicolon ();
}, function (arg){
state.preventSequence = false;
while (! match ("}"))
sourceElements.push (parseStatement ());
}, token.type !== Token.Literal && token.type !== Token.Identifier);
expect ("}");
}
else
if (! match ("]") && ! match (")") && ! match ("}") && ! match (",") && ! match (";"))
{
state.preventSequence = true;
sourceElements.push (setReturnStatement (parseStatement ()));
}
state.preventSequence = oldPreventSequence;
return blockStatement (sourceElements);
}
function parseFunction (options){
if (options === undefined)
options = {};
var id = null, params, defaults = [], body = null;
if (options.keyword !== null)
expectKeyword (options.keyword || "function");
if (options.name === true || options.name !== false && lookahead ().type === Token.Identifier)
id = parseVariableIdentifier ();
params = parseFunctionArguments (defaults);
if (options.empty)
consumeSemicolon ();
else
body = parseFunctionSourceElements (defaults);
return (options.declaration ? functionDeclaration : functionExpression) (id, params, body);
}
function parseFunctionExpression (){
return parseFunction ();
}
function parseFunctionDeclaration (){
return parseFunction ({"name":true,"declaration":true});
}
function parseLambdaExpression (){
return parseFunction ({"name":false,"keyword":"lambda"});
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
var init, test, update, left, right, body, temp, result, arrayMode, identifierMode, propertyName;
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
if (! isLeftHandSide (init) && (init.type !== Syntax.SequenceExpression || init.expressions.length !== 2))
throwError ({}, Messages.InvalidLHSInForIn);
arrayMode = lex ().value;
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
left.declarations [0].init = literal (0);
temp = left.type === Syntax.VariableDeclaration ? left.declarations [0].id : left.type === Syntax.SequenceExpression ? left.expressions [0] : left;
if (left.type === Syntax.Identifier)
left = assignmentExpression (left, literal (0));
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
function parseObjectContent (){
var properties = [], property, name, kind, map = {}, comma = {};
while (! match ("}"))
{
if (properties.length)
parseOptionalComma (comma);
if (match ("}"))
break;
property = parseObjectProperty ();
name = property.key.type === Syntax.Identifier ? property.key.name : String (property.key.value);
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
function parseLeftHandSideExpressionTemp (){
return matchKeyword ("new") ? parseNewExpression () : matchKeyword ("super") ? parseSuperExpression () : parsePrimaryExpression ();
}
function parseLeftHandSideExpressionAllowCall (){
var temp = parseLeftHandSideExpressionTemp (), token;
while (match (".") || match ("[") || match ("("))
if (match ("("))
{
temp = callExpression (temp, parseArguments ());
}
else
if (match ("["))
{
temp = memberExpression (temp, parseComputedMember (), true);
}
else
{
token = lookahead ();
if (source [token.range [0] + 1] !== ".")
temp = memberExpression (temp, parseNonComputedMember (), false);
else
break;
}
return temp;
}
function parseLeftHandSideExpression (){
var temp = parseLeftHandSideExpressionTemp ();
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
var inverse, temp, previousAllowIn;
previousAllowIn = state.allowIn;
state.allowIn = true;
temp = parseShiftExpression ();
while (index < length)
{
if (match ("!") && source [lookahead ().range [0] + 1] === "i")
{
inverse = saveAll ();
lex ();
}
if (match ("<") || match (">") || match ("<=") || match (">=") || previousAllowIn && matchKeyword ("in") || matchKeyword ("instanceof"))
{
temp = binaryExpression (temp, lex ().value, parseShiftExpression ());
}
else
if (previousAllowIn && (matchKeyword ("in-object") || matchKeyword ("in-array")))
{
lex ();
temp = callExpression (memberExpression (parseShiftExpression (), "hasOwnProperty"), [temp]);
}
else
{
if (inverse)
restoreAll (inverse);
break;
}
if (inverse)
{
temp = unaryExpression (temp, "!", true);
inverse = false;
}
}
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
function matchAssign (){
var token = lookahead (), op = token.value;
if (token.type !== Token.Punctuator)
return false;
return op === "=" || op === "*=" || op === "/=" || op === "%=" || op === "+=" || op === "-=" || op === "<<=" || op === ">>=" || op === ">>>=" || op === "&=" || op === "^=" || op === "|=";
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
switch (token.value){
case "public":

case "protected":

case "private":

case "static":

case "abstract":

case "implemented":

case "class":

case "interface":
return parseClassDeclaration ();
case "function":
return parseFunctionDeclaration ();
default:if (token.type === Token.Keyword)
return parseStatement ();
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
case "function":
return parseFunctionDeclaration ();
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
function parseSuperExpression (){
var level = 1, name, temp, arguments;
expectKeyword ("super");
if (! state.superAvailable)
throwError (lookahead (), "Super can be used in class functions only");
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
name = parseClassIdentifier ();
break;
}
}
return superExpression (name, match ("(") ? parseArguments () : [], level);
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
return unaryExpression (expr, token.value, true);
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
var start, id, restore, special, temp;
if (source [index] === "@")
{
try{
temp = " " + source.substr (index).match (/@([_$a-zA-Z][_$a-zA-Z0-9\.\-]*)/) [0].toUpperCase ();
}catch (e){}
throwError ({}, Messages.UnexpectedToken, "AND IT LOOKS LIKE MACROS" + temp);
}
if (! isIdentifierStart (source [index]))
return;
start = index;
id = source [index++];
if (id === "i")
{
if (source.substr (index, 7) === "n-array")
special = "in-array";
else
if (source.substr (index, 8) === "n-object")
special = "in-object";
if (special)
{
index += special.length - 1;
return {"type":Token.Keyword,"value":special,"lineNumber":lineNumber,"lineStart":lineStart,"range":[start,index]};
}
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
console.assert (isDecimalDigit (ch) || ch === ".", "Numeric literal must start with a decimal digit or a decimal point");
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
console.assert (quote === "'" || quote === "\"" || quote === "`", "String literal must starts with a quote");
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
console.assert (ch === "/", "Regular expression literal must start with a slash");
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
function ParseError (filename,lineNumber,message){
var result, name = "ParseError";
if (arguments [3])
{
name = filename;
filename = lineNumber;
lineNumber = message;
message = arguments [3];
}
if (typeof filename === "object")
{
message = lineNumber;
this.lineNumber = filename.lineNumber;
this.filename = filename.filename;
}
else
{
this.lineNumber = lineNumber;
this.filename = filename;
}
result = new Error(message + " [" + filename + ":" + lineNumber + "]");
result.name = name;
return result;
}
;
function throwError (token,messageFormat){
var args = Array.prototype.slice.call (arguments, 2), msg = messageFormat.replace (/%(\d)/g, function (whole,index){
return args [index] || "";
}), filename = options.filename;
if (typeof token.filename === "string")
filename = token.filename;
throw new ParseError(token && token.filename || options.filename, token ? token.lineNumber : lineNumber, msg);
}
function throwUnexpected (token){
throwError (token, token.type === Token.EOF ? Messages.UnexpectedEOS : token.type === Token.NumericLiteral ? Messages.UnexpectedNumber : token.type === Token.StringLiteral ? Messages.UnexpectedString : token.type === Token.Identifier ? Messages.UnexpectedIdentifier : token.type === Token.Keyword && isFutureReservedWord (token.value) ? Messages.UnexpectedReserved : Messages.UnexpectedToken, token.value);
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
function saveAll (){
return $.extend ({}, {"source":source,"index":index,"lineNumber":lineNumber,"lineStart":lineStart,"length":length,"buffer":buffer,"state":state,"options":options,"helpers":helpers});
}
function restoreAll (obj){
source = obj.source;
index = obj.index;
lineNumber = obj.lineNumber;
lineStart = obj.lineStart;
length = obj.length;
buffer = obj.buffer;
state = obj.state;
options = obj.options;
helpers = obj.helpers;
}
function attemptTo (firstFn,secondFn,forceSecond){
if (forceSecond)
{
return secondFn ();
}
else
{
saved = saveAll ();
try{
return firstFn ();
}catch (e){
if (e instanceof Error && /^Unexpected .+? \[.+?\:\d+\]$/.test (e.message))
{
restoreAll (saved);
return secondFn ();
}
else
throw e;
}
}
}
function advance (){
var ch, token;
skipComment ();
if (index >= length)
return {"type":Token.EOF,"lineNumber":lineNumber,"lineStart":lineStart,"range":[index,index]};
token = scanPunctuator ();
if (token !== undefined)
return token;
ch = source [index];
if (ch === "'" || ch === "\"" || ch === "`")
return scanStringLiteral ();
if (ch === "." || isDecimalDigit (ch))
return scanNumericLiteral ();
token = scanIdentifier ();
if (token !== undefined)
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
function matchKeywordAndLex (keyword){
var token = lookahead (), result = token.type === Token.Keyword && token.value === keyword;
if (result)
lex ();
return result;
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
function isWhiteSpace (ch){
return ch === " " || ch === "\t" || ch === "\u000b" || ch === "\f" || ch === " " || ch.charCodeAt (0) >= 5760 && " ᠎             　﻿".indexOf (ch) >= 0;
}
function isLineTerminator (ch){
return ch === "\n" || ch === "\r";
}
function addClass (classEntry){
if (byName (classEntry.id.name))
throwError (classEntry.id, Messages.ClassAlreadyDefined, classEntry.id.name);
classEntry.classObject = true;
{ var _4s1in55_53 = classEntry.members; for (var name in _4s1in55_53){
var value = _4s1in55_53[name];
value.className = classEntry.id;
}}
var constructor = classEntry.members ["@constructor"];
if (constructor === undefined)
{
constructor = updateMember (functionDeclaration ("@constructor"), classEntry);
constructor.autocreated = true;
}
var initializer = classEntry.members ["@initializer"];
if (initializer === undefined)
{
initializer = updateMember (functionDeclaration ("@initializer"), classEntry);
initializer.static = true;
initializer.autocreated = true;
}
{ var _414pddo_54 = classEntry.members; for (var name in _414pddo_54){
var member = _414pddo_54[name];
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
if (! member.hasOwnProperty ("publicMode") || member.publicMode === null)
member.publicMode = classEntry.publicMode || "private";
member.className = classEntry.id;
member.method = member.type === Syntax.FunctionDeclaration;
member.processed = false;
return member;
}
function checkClassesForCircular (){
var current = {};
function checkClassForCircular (id){
var entry = byName (id.name);
if (entry)
{
if (id.name in current)
throwError (id, Messages.CyclicDependencyDetected, id.name);
current [id.name] = true;
if (entry.dependsOn.parent)
checkClassForCircular (entry.dependsOn.parent);
{ var _8rvsqjm_28 = entry.dependsOn.uses; for (var _7qticov_29 = 0; _7qticov_29 < _8rvsqjm_28.length; _7qticov_29 ++){
var use = _8rvsqjm_28[_7qticov_29];
if (! entry.parent || use.name !== entry.parent.name)
checkClassForCircular (use);
}}
delete current [id.name];
}
}
for (var _1lfcoq0_30 = 0; _1lfcoq0_30 < classes.length; _1lfcoq0_30 ++){
var c = classes[_1lfcoq0_30];
checkClassForCircular (c.id);
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
throwError (current.dependsOn.parent, Messages.ParentClassNotFound, current.dependsOn.parent.name);
connectClass (parent, current);
{ var _118gdb0_29 = parent.members; for (var id in _118gdb0_29){
var member = _118gdb0_29[id];
if (! current.members.hasOwnProperty (id))
current.members [id] = $.extend (true, {}, member, {"publicMode":member.publicMode === "private" ? "locked" : member.publicMode});
}}
var parentConstructor = parent.members ["@constructor"], currentConstructor = current.members ["@constructor"];
if (! parentConstructor)
return;
if (! currentConstructor)
{
addMember (current, functionExpression (parentConstructor.params, [expressionStatement (superExpression (parentConstructor.params))]));
}
else
if (! currentConstructor.body.body.filter (function (arg){
return arg.type === Syntax.ExpressionStatement && "super" in arg.expression;
}).length)
{
if (currentConstructor.autocreated || parentConstructor.params.length === 0)
{
if (currentConstructor.autocreated)
currentConstructor.params = parentConstructor.params;
currentConstructor.body.body = [expressionStatement (superExpression (null, parentConstructor.params))].concat (currentConstructor.body.body);
}
else
throwError (currentConstructor, Messages.SuperConstructorCallNeeded);
}
}
{ var _49hot59_30 = current.dependsOn.uses; for (var _79ov39o_31 = 0; _79ov39o_31 < _49hot59_30.length; _79ov39o_31 ++){
var use = _49hot59_30[_79ov39o_31];
var used = byName (use.name);
if (! used)
throwError (use, Messages.UsingClassNotFound, use.name);
}}
current.connected = true;
}
function connectClasses (){
for (var _4nsd0l_32 = 0; _4nsd0l_32 < classes.length; _4nsd0l_32 ++){
var classEntry = classes[_4nsd0l_32];
connectClass (classEntry);
}
}
var classes, classesByNames, probablyUseOtherMaxValue, thatVariable;
function byName (name){
return classesByNames [name];
}
function doClasses (rawClasses,callback){
helpers = {};
classes = [];
classesByNames = {};
probablyUseOtherMaxValue = 100;
thatVariable = newIdentifier ("__that");
for (var _2nag38d_44 = 0; _2nag38d_44 < rawClasses.length; _2nag38d_44 ++){
var rawClass = rawClasses[_2nag38d_44];
addClass (rawClass);
}
if (classes.length > 0)
{
checkClassesForCircular ();
connectClasses ();
sortClasses ();
processClassesMembers ();
processClasses ();
callback ([variableDeclaration (classes.map (function (arg){
return arg.element;
}))], helpers);
}
else
callback ();
}
function processClass (classEntry){
if (typeof classEntry === "string")
{
classEntry = byName (classEntry);
console.assert (classEntry, "Class not found");
}
console.assert (! ("element" in classEntry), "Already processed");
var processClassFunctionBinded = processClassFunction.bind (null, classEntry), filterBinded = filter.bind (null, classEntry);
var constructor = classEntry.members ["@constructor"], initializer = classEntry.members ["@initializer"];
var filtered = filterBinded (function (arg){
return arg.className === classEntry.id && arg.id.name [0] !== "@";
}), objectMethods = filtered.filter (function (arg){
return arg.method && ! arg.static;
}), staticMethods = filtered.filter (function (arg){
return arg.method && arg.static;
}), objectFields = filtered.filter (function (arg){
return ! arg.method && ! arg.static;
}), staticFields = filtered.filter (function (arg){
return ! arg.method && arg.static;
});
if (! classEntry.params.abstract && filterBinded (function (arg){
return arg.abstract;
}) [0])
classEntry.params.abstract = true;
processClassFunctionBinded (constructor);
processClassFunctionBinded (initializer);
objectMethods.forEach (processClassFunctionBinded);
staticMethods.forEach (processClassFunctionBinded);
$.extend (constructor, {"id":null,"type":Syntax.FunctionExpression});
$.extend (initializer, {"id":null,"type":Syntax.FunctionExpression});
var mode = "default";
if (! classEntry.childs.length && ! classEntry.dependsOn.parent && ! objectMethods.length && ! objectFields.length && ! constructor.body.body.length)
{
classEntry.mode = "static";
if (! staticFields.length && ! staticMethods.length)
classEntry.mode = initializer.body.body.length > 0 ? "initializer-only" : "empty";
}
if (mode === "empty")
{
classEntry.element = variableDeclarator (classEntry.id.name, objectExpression ());
classEntry.uses = [];
}
else
if (mode === "initializer-only")
{
classEntry.element = variableDeclarator (classEntry.id.name, sequenceExpression ([callExpression (classEntry.staticInitialization),objectExpression ()]));
}
else
{
var variables = [], resultFunction = [variableDeclaration (variables)];
if (mode === "default")
{
variables.push (variableDeclarator (classEntry.id, constructor));
if (classEntry.dependsOn.parent)
resultFunction.push (expressionStatement (callExpression ("__pe", [classEntry.id.name,classEntry.dependsOn.parent.name])));
for (var _3s8gr8m_4 = 0; _3s8gr8m_4 < objectMethods.length; _3s8gr8m_4 ++){
var method = objectMethods[_3s8gr8m_4];
if (! method.abstract || method.body.body.length > 0)
{
var target = memberExpression (memberExpression (classEntry.id, "prototype"), method.id.name), value = functionExpression (method.params, method.body);
resultFunction.push (expressionStatement (assignmentExpression (target, value)));
}
else
abstract = true;
}
if (classEntry.params.abstract)
constructor.body.body = [ifStatement (binaryExpression (memberExpression (thisExpression (), "constructor"), "===", classEntry.id.name), throwStatement (newExpression ("Error", [literal ("Trying to instantiate abstract class " + classEntry.id.name)])))].concat (constructor.body.body);
}
else
if (mode === "static")
variables.push (variableDeclarator (classEntry.id, objectExpression ()));
for (var _5j78vp_5 = 0; _5j78vp_5 < staticFields.length; _5j78vp_5 ++){
var field = staticFields[_5j78vp_5];
if (field.publicMode !== "private")
{
var temp = expressionStatement (assignmentExpression (memberExpression (classEntry.id, field.id), field.init || "undefined"));
if (findByReplacement (classEntry, field.id.name).publicMode === "protected")
temp.comment = field.id.name;
resultFunction.push (temp);
}
else
variables.push (field);
}
for (var _2j2ailv_6 = 0; _2j2ailv_6 < staticMethods.length; _2j2ailv_6 ++){
var method = staticMethods[_2j2ailv_6];
if (method.publicMode !== "private")
{
var temp = expressionStatement (assignmentExpression (memberExpression (classEntry.id, method.id), functionExpression (method.params, method.body)));
resultFunction.push (temp);
}
else
resultFunction.push (method);
}
if (initializer && initializer.body.body.length > 0)
resultFunction.push (expressionStatement (callExpression (initializer)));
resultFunction.push (returnStatement (classEntry.id));
classEntry.element = variableDeclarator (classEntry.id.name, callExpression (functionExpression ([], resultFunction)));
}
}
function processClasses (){
for (var _4cuclbg_7 = 0; _4cuclbg_7 < classes.length; _4cuclbg_7 ++){
var classEntry = classes[_4cuclbg_7];
processClass (classEntry);
}
}
function processClassFunction (classEntry,functionEntry){
console.assert (classEntry && functionEntry, "Wrong arguments: " + classEntry + ", " + functionEntry);
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
var childFunction = currentFunction !== functionEntry;
if (childFunction)
usingThat = true;
return childFunction ? identifier (thatVariable) : thisExpression ();
}
function lookForExclusions (obj,target){
if (typeof obj === "object" && obj !== null)
{
if (obj instanceof Array)
{
for (var _63m84bc_39 = 0; _63m84bc_39 < obj.length; _63m84bc_39 ++){
var child = obj[_63m84bc_39];
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
console.assert (typeof obj === "object" && (obj.type === Syntax.FunctionDeclaration || obj.type === Syntax.FunctionExpression), "Wrong argument: " + obj);
var oldExclusions = $.extend (true, {}, exclusions), oldCurrentFunction = currentFunction;
currentFunction = obj;
obj.params.forEach (function (arg){
return exclusions [arg.name] = true;
});
lookForExclusions (obj.body.body, exclusions);
process (obj.body.body);
if (usingThat && functionEntry === obj)
{
var temp = [variableDeclarator (thatVariable, thisExpression ())];
if (0 in obj.body && obj.body.body [0].type === Syntax.VariableDeclaration)
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
if (functionEntry.static)
throwError (obj, Messages.ObjectAccessError, obj.name);
if (member.publicMode === "locked")
throwError (obj, Messages.PrivateAccessError, obj.name);
var that = getThis ();
var result;
if (member.method && parent.type !== Syntax.CallExpression)
{
helpers.bindOnce = true;
result = callExpression ("__bo", [that,literal (member.id.name)]);
}
else
{
result = memberExpression (that, member.id.name);
}
return result;
}
function replaceStatic (member){
if (member.publicMode === "locked")
throwError (obj, Messages.PrivateAccessError, obj.name);
var className = member.className;
return memberExpression (className.name, member.id.name);
}
if (! (obj.name in exclusions))
{
var result = null, member;
if (obj.name in classEntry.members)
{
member = classEntry.members [obj.name];
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
function processMemberExpression (obj,parent){
var propertyProcess = obj.computed;
if (obj.computed)
{
if (obj.object.type === Syntax.ThisExpression && obj.property.type !== Syntax.Literal)
{

}
}
else
{
var name = obj.property.type === Syntax.Identifier ? obj.property.name : obj.property.value, member = classEntry.members.hasOwnProperty (name) ? classEntry.members [name] : null;
if (member)
{
if (member.static)
{
if (obj.object.type === Syntax.Identifier && obj.object.name === member.className.name && member.publicMode === "private")
{
set (obj, identifier (member.id.name));
return;
}
}
else
if (obj.object.type === Syntax.ThisExpression)
{
obj.property.name = member.id.name;
if (obj.property.type === Syntax.Literal)
{
obj.computed = false;
obj.property.type = Syntax.Identifier;
delete obj.property.value;
}
}
else
if (parent.type !== Syntax.AssignmentExpression)
{
obj.computed = true;
set (obj, callExpression ("__pa", [member.className.name,obj.object,literal (member.id.name),literal (member.id.name.indexOf (obj.property.name))]));
helpers.propertyAccess = true;
return;
}
else
{
obj.property = callExpression ("__pn", [member.className.name,obj.object.type === Syntax.Identifier ? obj.object : "__arg",literal (member.id.name),literal (member.id.name.indexOf (obj.property.name))]);
helpers.propertyName = true;
if (obj.object.type === Syntax.Identifier)
{
obj.computed = true;
}
else
{
var assignment = $.extend (true, {}, parent, {"left":memberExpression ("__arg", obj.property, true)});
set (parent, callExpression (functionExpression (["__arg"], [returnStatement (assignment)]), [obj.object]));
}
return;
}
}
}
process (obj.object, obj);
if (propertyProcess)
process (obj.property, obj);
}
function processThisExpression (obj,parent){

}
function processSuperExpression (obj,parent){
if (currentFunction !== functionEntry && obj.callee === null)
throwError (obj, Messages.WtfMan);
var currentClass = classEntry;
for (var i = 0; 
i < obj ["super"]; i++)
{
currentClass = byName (currentClass.dependsOn.parent.name);
if (! currentClass)
throwError (obj, Messages.SuperMethodIsNotAvailable);
}
var callee = obj.callee ? obj.callee.name : functionEntry.id.name;
var target;
if (currentClass.members [callee].static)
throwError (obj.callee, "Attempt to call static method");
if (callee && callee [0] !== "@")
{
target = memberExpression (memberExpression (currentClass.id, "prototype"), currentClass.members [callee].id.name);
}
else
{
target = currentClass.id;
}
obj.callee = memberExpression (target, "call");
var that = getThis ();
obj.arguments = [that].concat (obj.arguments);
}
function process (obj,parent){
if (typeof obj === "object" && obj !== null)
{
if (obj instanceof Array)
{
for (var _3h44f1u_40 = 0; _3h44f1u_40 < obj.length; _3h44f1u_40 ++){
var child = obj[_3h44f1u_40];
process (child, obj);
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
processMemberExpression (obj, parent);
break;
case Syntax.ThisExpression:
processThisExpression (obj, parent);
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
process (functionEntry);
}
function rename (name,member){
if (member.static && member.publicMode === "private" || member.publicMode === "locked")
return name;
switch (member.publicMode){
case "protected":
return "__" + name;
case "private":
return "__" + member.className.name + "_" + name;
case "public":
return name;
default:console.assert (false, "Unsupported publicMode (" + member.publicMode + ")");
}
}
function testBadOverride (parentMember,childMember){
switch (childMember.publicMode){
case "public":
return false;
case "protected":
return parentMember.publicMode === "public";
case "private":
return parentMember.publicMode !== "private";
case "locked":
return false;
default:console.assert (false, "Wrong value\n" + JSON.stringify (childMember, false, 4));
}
}
function morePublicMode (firstMode,secondMode){
var modes = ["locked","private","protected","public"], firstId = modes.indexOf (firstMode), secondId = modes.indexOf (secondMode), maxId = Math.max (firstId, secondId);
return modes [maxId];
}
function processClassMember (classEntry,name,parentMember){
var newPublicMode = parentMember.publicMode, targetMembers = [parentMember], argument, updatedName;
function testChilds (currentClass){
var childMember;
{ var _1lcs1c5_90 = currentClass.childs; for (var _7bmpn57_91 = 0; _7bmpn57_91 < _1lcs1c5_90.length; _7bmpn57_91 ++){
var childClass = _1lcs1c5_90[_7bmpn57_91];
if (childClass.members.hasOwnProperty (name))
{
childMember = childClass.members [name];
if (testBadOverride (parentMember, childMember))
throwError (childMember.id, "Invalid public mode (\"" + childMember.publicMode + "\" instead of \"" + parentMember.publicMode + "\" for member \"" + name + "\" of class \"" + childClass.id.name + "\" which extends \"" + currentClass.id.name + "\")");
if (parentMember.method !== childMember.method)
throwError (childMember.id, "Invalid override (" + (childMember.method ? "method" : "field") + " instead of " + (parentMember.method ? "method" : "field") + " for member \"" + name + "\" of class \"" + childClass.id.name + "\" which extends \"" + currentClass.id.name + "\")");
newPublicMode = morePublicMode (newPublicMode, childMember.publicMode);
targetMembers.push (childMember);
}
testChilds (childClass);
}}
}
testChilds (classEntry);
if (newPublicMode !== parentMember.publicMode)
argument = $.extend ({}, parentMember, {"publicMode":newPublicMode});
else
argument = parentMember;
updatedName = rename (name, argument);
for (var _7hcfjjl_92 = 0; _7hcfjjl_92 < targetMembers.length; _7hcfjjl_92 ++){
var targetMember = targetMembers[_7hcfjjl_92];
targetMember.id.name = updatedName;
targetMember.processed = true;
}
}
function processClassMembers (classEntry){
var replace, childMember;
{ var _24vpl2o_93 = classEntry.members; for (var name in _24vpl2o_93){
var member = _24vpl2o_93[name];
if (name [0] !== "@" && ! member.processed)
processClassMember (classEntry, name, member);
}}
}
function processClassesMembers (){
for (var _955bfsa_94 = 0; _955bfsa_94 < classes.length; _955bfsa_94 ++){
var classEntry = classes[_955bfsa_94];
processClassMembers (classEntry);
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
{ var _3ds5kin_42 = current.dependsOn.uses; for (var _36p2lqp_43 = 0; _36p2lqp_43 < _3ds5kin_42.length; _36p2lqp_43 ++){
var use = _3ds5kin_42[_36p2lqp_43];
current.weight += getWeight (use.name);
}}
return current.weight;
}
for (var _8j5n143_44 = 0; _8j5n143_44 < classes.length; _8j5n143_44 ++){
var current = classes[_8j5n143_44];
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
{ var _3o8q67u_61 = this instanceof File ? [{"root":this.root,"dirname":this.dirname}].concat (lookingAt) : lookingAt; for (var _okotl8_62 = 0; _okotl8_62 < _3o8q67u_61.length; _okotl8_62 ++){
var entry = _3o8q67u_61[_okotl8_62];
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
try{
jsxParse (this.content, {"filename":this.filename,"initializationAllowed":true}, function (parsed,helpers){
this.log ("parsing processed");
this.state = File.STATE_FINISHED;
this.parsed = parsed;
this.helpers = helpers;
callback ();
}.bind (this));
}catch (e){
console.fatal ("Parsing failed (" + this.filename + ")" + (File.DEBUG_MODE ? ("\n" + this.content.trim ()).replace (/\n/g, "\n> ") + "\n" : "") + "\n" + e.stack);
}
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
this.debugMode = false;
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
Object.defineProperty (LiteParser.prototype, "lineNumber", {"get":function (){
var result = 1;
for (var i = 0, d = this.data, n = Math.min (d.length, this.index); 
i < n; i++)
if (d [i] === "\n")
result++;
return result;
}});
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
for (var _4qclqnq_89 = 0; _4qclqnq_89 < args.length; _4qclqnq_89 ++){
var entry = args[_4qclqnq_89];
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
{ var _rsfrnh_90 = this.binded; for (var i = 0; i < _rsfrnh_90.length; i ++){
var arg = _rsfrnh_90[i];
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
{ var _1tq4kdc_94 = Macro.Defaults; for (var key in _1tq4kdc_94){
var value = _1tq4kdc_94[key];
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
{ var _1880cjo_95 = phase.used; for (var _1fvf0jb_96 = 0; _1fvf0jb_96 < _1880cjo_95.length; _1fvf0jb_96 ++){
var entry = _1880cjo_95[_1fvf0jb_96];
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
{ var _6ga9r4q_97 = this.arguments; for (var id = 0; id < _6ga9r4q_97.length; id ++){
var arg = _6ga9r4q_97[id];
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
{ var _181gjl9_68 = this.arguments; for (var i = 0; i < _181gjl9_68.length; i ++){
var arg = _181gjl9_68[i];
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
function throwError (position,messageFormat){
var args = Array.prototype.slice.call (arguments, 2), msg = messageFormat.replace (/%(\d)/g, function (whole,index){
return args [index] || "";
});
throw new ParseError("MacroParseError", context.file.filename, position.lineNumber ? position.lineNumber : liteParser.lineNumber, msg);
}
function parseMacroDefine (){
var name = found.raw [1], splitted = name.split (":"), position, argument, arguments, blockMode, temp, body, converted, insertCall = false, from;
if (splitted [0] === "macro")
throwError ({}, Messages.UnexpectedReserved);
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
throwError ({}, Messages.UnexpectedToken, temp.value);
position = liteParser.index;
if (temp.value === ")")
break;
}
if (! temp)
throwError ({}, Messages.UnexpectedEOS);
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
throwError ({}, Messages.UnexpectedEOS);
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
throwError ({}, Messages.UnexpectedReserved);
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
throwError ({}, Messages.UnexpectedEOS);
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
throwError ({}, Messages.UnexpectedToken, temp.value);
if (temp.value === ")")
break;
else
position = liteParser.index;
}
if (! temp)
throwError ({}, Messages.UnexpectedEOS);
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
{ var _63i0aj5_40 = temp.calls; for (var _5mvlscj_41 = 0; _5mvlscj_41 < _63i0aj5_40.length; _5mvlscj_41 ++){
var call = _63i0aj5_40[_5mvlscj_41];
queue.add (call, call.process.bind (call));
}}
queue.run (function (arg){
for (var _4no8mm4_42 = 0; _4no8mm4_42 < arg.length; _4no8mm4_42 ++){
var entry = arg[_4no8mm4_42];
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
process.on ("uncaughtException", function (error){
console.fatal (error && error.stack ? error.stack : String (error));
});
console.fatal = function (){
console.log ("\n    [ FATAL ERROR ]\n");
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
console.log (JSON.stringify (obj, false, 2));
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
return require ("escodegen").generate (parsed);
}catch (e){
console.fatal ("Generating failed (" + options.filename + ")" + e.stack);
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
{ var _rqt43_23 = File.find ("default/*") || []; for (var _4b0iqlk_24 = 0; _4b0iqlk_24 < _rqt43_23.length; _4b0iqlk_24 ++){
var file = _rqt43_23[_4b0iqlk_24];
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
{ var _7pqs8ee_25 = fileStorage.files; for (var _8urerce_26 = 0; _8urerce_26 < _7pqs8ee_25.length; _8urerce_26 ++){
var file = _7pqs8ee_25[_8urerce_26];
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
var elements = doHelpers (this.data.helpers).concat (this.data.statements).concat (this.data.classes).concat (this.data.initializations), ast = program (elements), result = convert (ast, {"filename":"result"});
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

__m()