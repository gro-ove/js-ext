Function.prototype.argumentsCount = function (arg){
return (this.toString ().match (/^[^(){}]+\((.+?)\)/) [1].match (/[^\s,]+/g) || 0).length || 0;
};
var fs = require ("fs"), path = require ("path"), child = require ("child_process"), compiler = require ("closure-compiler");
function run (){
var c = typeof arguments [arguments.length - 1] === "function" ? arguments [arguments.length - 1] : null, a = [].slice.call (arguments, 0, - (+ ! ! c));
var cmd = child.spawn ("cmd", ["/C"].concat (a));
if (! c || c.argumentsCount () <= 1)
{
cmd.stdout.on ("data", function (arg){
return process.stdout.write (arg.toString ());
});
cmd.stderr.on ("data", function (arg){
return process.stderr.write (arg.toString ());
});
if (c)
cmd.on ("close", c);
}
else
{
var stdout = "", stderr = "";
cmd.stdout.on ("data", function (arg){
return stdout += arg.toString ();
});
cmd.stderr.on ("data", function (arg){
return stderr += arg.toString ();
});
cmd.on ("close", function (arg){
return c (arg, stdout, stderr);
});
}
}
var position, tempJsExt = path.resolve (__dirname, "build", "js-ext.temp.js"), tempJsParser = path.resolve (__dirname, "build", "js-ext.temp.parser"), query = [". Started",". Converter:",function (arg){
return run ("js-ext.cmd", path.resolve (__dirname, "src", "js-ext.jsx"), "-o", tempJsExt, function (arg){
if (arg)
{
console.log (".. Error.");
}
else
{
console.log (".. Ok.");
next ();
}
});
},". Parser building:",function (arg){
return run ("node", "-e", "fs=require('fs');console.log (fs.readdirSync('parser').map(function(a){return fs.readFileSync('parser/'+a)}).join('\\n\\n'))", "|", "pegjs", "--cache", function (exitCode,stdout,stderr){
if (exitCode)
{
console.log (".. Error: " + exitCode + ".");
}
else
{
console.log (".. Ok.");
next (stdout);
}
});
},". Parser compressing:",function (arg){
try{
compiler.compile ("Array.prototype.__defineGetter__(\"$\",function (){return this.map(function(a){return a instanceof Array?a.$:a}).join(\"\")});\n" + arg, {}, function (error,data,extra){
if (error)
{
console.log (".. Error.");
}
else
{
console.log (".. Ok.");
fs.writeFileSync (tempJsParser, data.trim ());
}
});
}catch (e){
console.error ("Compress error: " + e) , ". Getting tests list..." , function (arg){
var tests = path.resolve (__dirname, "tests");
fs.readdir (tests, function (err,files){
files.filter (function (arg){
return arg.substr (- 4) == ".jsx";
}).sort (function (a,b){
return a < b;
}).forEach (function (file){
return insert (function (arg){
console.log (".. Found: " + file);
var fullPath = path.resolve (tests, file), content = fs.readFileSync (fullPath), result = (content.toString ().match (/\*{Result-Begin}([\s\S]+?){Result-End}\*/) || 0) [1] || "";
run ("node", tempJsExt, fullPath, "-o:stdout", "-e", "|", "node", function (exitCode,stdout,stderr){
if (exitCode || result && result.replace (/\r/g, "").trim () != stdout.replace (/\r/g, "").trim ())
{
console.log ("... Error: " + (exitCode ? "exit code = " + exitCode : "bad stdout"));
}
else
{
if (! result)
{
fs.writeFileSync (fullPath, content + "\n\n/*{Result-Begin}\n" + stdout.trim () + "\n{Result-End}*/\n");
console.log ("... Writed.");
}
else
console.log ("... Passed.");
next ();
}
});
});
});
next ();
});
} , ". Applying new versions..." , function (arg){
var build = path.resolve (__dirname, "build"), js = path.resolve (build, "js-ext.js"), pr = path.resolve (build, "js-ext.parser"), jt = path.resolve (build, "js-ext.temp.js"), pt = path.resolve (build, "js-ext.temp.parser");
try{
fs.unlinkSynk (js);
}catch (e){}
try{
fs.unlinkSynk (pr);
}catch (e){}
try{
fs.renameSync (jt, js);
fs.renameSync (pt, pr);
console.log (".. Ok.");
}catch (e){
console.log (".. Error: " + e.toString () + ".");
}
} , ". Finished";
}
}];
function next (){
position = position !== undefined ? position + 1 : 0;
if (position < query.length)
{
if (typeof query [position] === "string")
{
console.log (query [position]);
next.apply (null, arguments);
}
else
{
query [position].apply (null, arguments);
}
}
else
{
try{
fs.unlinkSynk (path.resolve (__dirname, "build", "js-ext.temp.js"));
}catch (e){}
try{
fs.unlinkSynk (path.resolve (__dirname, "build", "js-ext.temp.parser"));
}catch (e){}
}
}
function insert (fn){
query.splice (position + 1, 0, fn);
}
next ();