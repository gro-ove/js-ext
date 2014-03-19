# TODO
	* classes
		V arguments to exclusions list
		V classes extends
		V initialization order
		V static classes
		V private and protected variables
		V static variables
		V initialization statement
		V 'super' requested in constuctors
		V check for changing of static field of parent class
		V names fix
		V 'this' support
		V renaming private and protected variables
		V abstract classes
		V short syntax
		V binded functions fixed 
			/*
				private example (){
					$ ('body')
					.on ('click', click)
					.off ('click', click);
				}
				
				private click (event){ ... }
			*/
		V static private and object locked conflict
		V function expression without args
		V new operator instead of 'in'
		V fix 'this.privatefield' access
		V convert member expression for static private to identifier
		V add check if static method is processing to processsuperexpression
		V "super;" => "ParentClass.prototype.method.apply (this, arguments)"
		V add access like 'other.privateMethod'
		V default arguments to constuctor
		V improve search for 'super' in contructor
		V fix bug with 'super'
		V throw error if 'return' found in contructor
		V not use functionexpression unnecessarily
		V partial classes
		V change abstract members to java-style
		V initialize object fields before automatically super call
		V abstract fields
		V local classes
		F change error "member 'field' has private access" to warning (what if 'field' is global variable?)
		F not allow to use same classes in 'uses' and 'extends' or only 'uses'
		C if default fields initializations
		- improve private members
		- when possible, use "className.prototype = { methog: ... }"
		- classes from other ".jsx" for 'extends' or 'implement' (instead of 'implemented' take data from others ".jsxo"; see "caching")
		L interfaces
		L inner classes
		L anonymous classes
		? creating new instance with something like constructor (depends on realization of anonymous classes)
			/*
				var value = 'something',
					instance = new ObjectClassWithProtectedFieldContentAndPublicMethodIncreaseSize (){
						content = value;
						for (var i = 0; i < 10; i ++)
							increaseSize ();
					};
			*/
		? getters and setters
		? kind of multiple inheritance
		? initialize class only when first access (getters needed)
		? private methods to variables
		. support for access like "['field' + name]"
		. implementeds
			. implementeds generator
			. set marks for already existings helpers
				. with cool macros

	* macros
		V macros as macros arguments
		V macros arguments
		V source code as macros arguments
			V crazy source code support
		V macros in macros result
		V one macro can call another
		V macros asynchronous
		V macros à la functions syntax
			V one-line
			V blocks
			L default arguments values
		V fix strange numbers
		V add types to arguments
		V add types to macro's result
		V liteparser: regexp support
		V arguments with callback bug
		V anonynous macros
		V macros definion in macros
		F remove "{ ... }" from macros bodies after parsing
		- macros order
		- instruction for get how many characters are argument
			/*
				@macro python:raw-nm (code:raw){

				}

				@python:file

				// and the whole file will be used as argument for macro
			*/
		L fix macro parsing errors (filename, linenumber, etc.)
		? parsing with awesome parser

	* parser and generator
		V notimplemented operator
		V strings format
		V fix lambdas
		V array initializer operator
			V with helper function
		V search for expressions that would be worth to remove by prototype methods
			/*
				before:
					[].forEach.call (data, fn);
				after:
					Array.prototype.call (data, fn);
			*/
		V new generator 
			V with line number comments support
		V fix "object [(condition ? 'true' : 'false')]" priorities and check others
		V optimize for "string = '%0%1' ('', '');"
		V check "[ from .. to ]" (with variables)
		V one-line functions with automatically return insert
		X functions without arguments
			V remove it
		V replace "\r" and other shit from source files
		V replace one-type-literal by multiple literals with raw data
			V stringliteral
			V numericliteral
			V booleanliteral
			V nullliteral
			V regexpliteral
		V save chars like "\u2020" in string literals
		V not convert octal and hex number literals to decimal ones
		V convert "[ 'a' .. 'c' ]" to "[ 'a', 'b', 'c' ]"
		V retrieve multiline strings support
			V skiping of spaces
		V generating code for "a - (b - c)"
		F fix for getting value of stringliteral
		F regular expressions like "/=something/"
		C constructions like "a < b < c < d"
		C state (restorations of old values are missing in some places)
		- new 'for-in-object' loop
			/*
				before:
					for (var key, value in-object object)
						console.log (key, value);
				after:
					for (var key in object)
						if (object.hasOwnProperty (key)){
							var value = object [key];
							console.log (key, value);
						}
			*/
		- something like uniqueidentifier
		- optional compression
			- convert multiline strings to regular ones
			- 'undefined' => 'void' 0
			- identifiers
				- replace local
				? replace global
				? replace properties
		- move creating of 'switch' to "src/parser/objects.jsxi"
		- somehow save special comments to result file
		L optional transforming '==' to '===' and '!=' to '!=='
		L partial functions
		L 'enum'
		L 'const'
		L option to set size of tabs (for multiline strings and etc.) 
		? make function 'identifier' more simple
		? "for (var i, obj in-array array) console.log (i, obj);" => "for (var i, obj; obj = array [i], i < array.length; i ++) console.log (i, obj);"
		? for compatible with regular js disable detection of new keywords if they are using, but using wrong
			/*
				var lambda = 'value';
			*/
		? 'if', 'try' or 'switch' as expressions
		? return value for loops
		? arrow functions (binded to 'this' by default)
		? unicode characters like analog for keywords and punctuators
			? support for unicode in identifiers
			? 'Λ' or 'λ' instead of 'lambda'
			? 'Ƒ' of 'ƒ' instead of 'function'
			? '×' instead of '*'
			? '→' instead of '=>' (if there will be arrow functions)
			? '←' instead of 'return'
		? comments and linebreaks to regexps
		? syntax like "function name (){ ... }()"
		? new feature: "while (...){ ... } else { ... }"
		? move functions to the begin of their block

	* other
		V replace names of helpers by nice and long ones
		- getters and setters for objects
		- params:
			- target
			- debug mode
			- disable warnings
		L saving order for import
		L fullpath for param 'import'
		L regular code to asynchronous
			V write theoretical examples
				/*
					using node.js style - last argument of calls is callback, first argument of callback is error
					just look at this awesomeness:

					simple, before: 
						function readFileIfExists (path) async {
							try 
								var exists = async fs.exists (path);
							catch
								throw new Error ('can\'t check if file exists: ' + e);

							console.log ('checked: ' + exists);
							return exists ? async fs.readFile (path) : null;
						}

					simple, after:
						function readFileIfExists (path, __callback){
							var exists, __0;

							function __block_0 (){
								fs.exists (path, function (__error, __value){
									try {
										if (__error)
											throw __error;
										exists = __value;
									} catch (e){
										__callback (new Error ('can\'t check if file exists: ' + e));
										return;
									}
									
									__block_1 ();
								});
							}

							function __block_1 (){
								console.log ('checked: ' + exists);

								if (exists){
									fs.readFile (path, function (__error, __value){
										if (__error){
											__callback (__error);
										} else {
											__0 = __value;
											__block_2 ();
										}
									});
								} else {
									__0 = null;
									__block_2 ();
								}
							}

							function __block_2 (){
								__callback (__0);
							}

							__block_0 ();
						}

					loop, before:
						function readFiles (files) async {
							var result = [];
							for (var i = 0; i < files.length; i ++)
								try
									result.push (async fs.readFile (files [i]));
								catch
									result.push (null);
							console.log ('readed %0 files' (files.length));
							return result;
						}

					loop, after (obsolete):
						function readFiles (files, __0){
							var result = [];

							function __block_0 (){
								var i = 0;

								function __loop_0 (){
									if (i < files.length){
										fs.readFile (files [i], function (e, __2){
											if (e)
												result.push (null);
											else
												result.push (__2);
											__1 ();
										});

										i ++;
									} else {
										console.log ('readed ' + files.length + ' files');
										__0 (result);
									}
								}

								__loop_0 ();
							}

							// first iteration
							__block_0 ();

							// function instead of loop body
							function __1 (){
							}
						}

					hardcore analog, before:
						function readFiles (files) async {
							var result = [];

							files.forEach (lambda result.push (async fs.readFile (arg)));
							// questionable place #2 - see below

							console.log ('readed %0 files' (files.length));
							return result;
						}

					hardcore analog, after (obsolete):
						function readFiles (files, __0){
							var result = [], 
								__1 = 0, // can't use something like "__1 = files.length", because converted doesn't know how this "forEach" work
								__2;

							files.forEach (function (){
								// increase count of async calls
								__1 ++;

								fs.readFile (arg, function (__3, __4){
									result.push (__4);

									// if all async calls have been done and "files.forEach" has been finished too, call "__2"
									if (-- __1 === 0 && __2)
										__2 ();
								})
							});

							// if all async calls have been done immediately, call "__2"
							if (__1 === 0)
								__2 ();

							// function for statements after "files.forEach"
							function __2 (){
								console.log ('readed ' + files.length + ' files');
								__0 (result);
							}
						}

					chain of async, before:
						function readFirstFileInDir (dir) async 
							async fs.readFile (path.resolve (dir, async fs.readdir (dir)[0]));

					chain of async, after (obsolete):
						function readFirstFileInDir (dir, __0){
							fs.readdir (dir, function (__1, __2){
								fs.readFile (path.resolve (dir, __2 [0]), function (__3, __4){
									__0 (__4);
								});
							});
						}

					parallel and sequent mode, before:
						function doSomething () async {
							var a = async asyncFirst (),
								b = async asyncSecond ();

							console.log (a, b);

							var c = async asyncFirst (),
								d = async asyncSecond (c);

							return [ a, b, c, d ];
						}

					parallel and sequent mode, after (obsolete):
						function doSomething (__0){
							// as mentioned, all local variables to begin
							var a, b, c, d, __1 = 2;

							asyncFirst (function (__2, __3){
								a = __3;
								if (-- __1 === 0)
									__6 ();
							});

							asyncSecond (function (__4, __5){
								b = __5;
								if (-- __1 === 0)
									__6 ();
							});

							// function for statements after first block
							function __6 (){
								console.log (a, b);

								asyncFirst (function (__7, __8){
									c = __8;
									
									asyncSecond (c, function (__9, __10){
										d = __10;
										return [ a, b, c, d ];
									});
								});
							}
						}

					// if you asked me, it's really something nice
				*/
			V something about algorithm
				/*
					1. place all local variables in beginning of converted function
						- get list of variables ids
						- add variabledeclaration with this ids to begging of converted function
						- replace init from old variabledeclarations by expressionstatements with assignexpressions inside
						- remove old variabledeclarations
					2. cut function body to blocks without async and blocks with async
					3. convert async blocks to regular-js ones by using one of ready schemes
						- catch all "gotos" to next block and replace their by temporary statements
						- for every autoinserted callback get nearest "try" and insert handlers from it
					4. place regular-blocks
						- if block have more that one "goto" from async-blocks, transform it to function
					5. replace "return" or "throw" (without "try") by call of main callback
					?. how about child blocks?

					statement conversions:
						1. 
							return exists ? async fs.readFile (path) : null;

						2. 
							var __temp;
							if (exists)
								__temp = async fs.readFile (path);
							else
								__temp = null;
							return __temp;

						3.
							block0:
								var __0;

								if (exists){
									fs.readFile (path, function (__error, __value){ __0 = __value; __block_1 (); });
								} else {
									__0 = null;
									__block_1 ();
								}

								function __block_1 (){
									callback (__0);
								}
				*/
			L short conversion result
			? #1: looks like there is no way to call outside functions like 'map'
				/*
					or, more precisely, functions with callback in arguments, which has to return something
					anyway, imho, even with this restriction async-feature seems unbelievably cool
				*/
			? #2: what if 'asyncFirst' isn't clear function and has influence to 'asyncSecond'?
		? ie8 compilation mode
		? uglifyjs
		? something like junit
		. override js-ext functions
			. override functions of js-ext parser (add new or change existing elements from macros and stuff)
		. instuctions to parser or something in comments (developer will generate them with macros)
			. macro for override instruction

	* application
		V including
		V saving result and stuff
		F import with dot in name
		F import folders
		- sort and clear up working folder
		- caching
			- ".jsxo" next to ".jsx"
				- use data from others ".jsxo"
			- available for macros
			- for files without macros
			- for files without macro calls
			- global function for check if file updated
			. for everything
		- use full paths to files for "import" and add ".jsxi" from macro 
		L rewrite js-ext in updated js-ext
			L remove scary old js-ext
		L impove errors handling
		L command line arguments
		L tests
		? version for browsers

	* static analyzer (warnings)
		- existing everythere
			- assignment in conditional expression without additional brackets around
			- dead code
		- take something 20 from pvs-studio or others
			- two identical tests: "if (a === 'a' || a === 'a') ..."
			- looks like broken copy-paste: "if (a.left === 'left' && a.left === 'right')"
			- something like this: "if (a === '7' && a === '8')"
			- or this: "if (a || !a)"
		- types
			- type conversion: "var a:boolean = JSON.parse (string)" => "var a = !!JSON.parse (string)"
			- realtime type check (for debug mode)
				/*
					before:
						var a:String = fn ();

					after:
						function __tc (obj, classObj){
							if (!(obj instanceof classObj))
								throw new Error ('...');
							return obj;
						}

						var a = __tc (fn (), String);
				*/
			- automatic calculation
				- for return value or arguments of functions and methods
				- for statements
			? functions with same name but different sets of arguments
		- special for js
			- variable or argument already exists
			- variable or argument doesn't exists (in whole area of visibility, of course)
			- not used variables
			- using variable before definion
			- without "with"
			- two fields with same names in object
			- "in" instead of "hasOwnAttribute"
			- without ";" after "var"
			- access to "arguments.callee"
			? warning if 'undefined' used in left or right side of assignment
		- special for js-ext
			- assignment to 'const' (without new js features)
			- arguments in arrow functions
			- access for private or protected members outside
			- complex string: arg or mark is missed
			- creating instance of abstract class
			- unused private class members
			? operator in one-line array is missed: "var array = [ 'string' something ]"

	* opensource, support
		V update readme
		V fix syntax highlight: "options.filename = functionEntry.filename;"
		- sublime text
			V syntax highlight
			V highlight for default values of function arguments
			- folding for classes and macros
			? publish package
		L npm
			L push sublime text file with rules for syntax highlight and stuff on github
		? documentation
		? find some ide like eclipse and make it js-ext compatible
		? post to habrahabr :)

# What sort of file is this ".todo"?
	- i made a cool highlight plugin for sublime text
	- and with it .todo-files became cool
	- if you suddenly want to get it, just ask me :)

# What do these letters?
	* category
		/*
			in order of priority except the first one, it is at the top to maintain enthusiasm :3
		*/
		V done
		F fixme
		C check if it is broken
		- something to do
		L do it later
		? questionable
		. useless (but, maybe, one day...)
		X done, but removed after (and remains for history)
