function __bindOnce (obj, 
	name){
	if (!obj.hasOwnProperty ('__bindTable'))
		obj.__bt = {};
	
	if (!obj.__bt.hasOwnProperty (name))
		obj.__bt [name] = obj [name].bind (obj);
	return obj.__bt [name];
}

/* Class "File" declaration */
function File (root, fullpath){                                                    // file.jsxi:1
	this.state = File.STATE_INITIAL;
	this.imports = [];
	this.weightCalculating = false;
	console.assert (!fileStorage.exists (fullpath), 'File already processed');     // file.jsxi:69
	
	if (fullpath === undefined){                                                   // file.jsxi:71
		this.fullpath = path.resolve (root);                                       // file.jsxi:72
		this.root = path.dirname (this.fullpath);                                  // file.jsxi:73
	} else {
		this.fullpath = fullpath;                                                  // file.jsxi:75
		this.root = root;                                                          // file.jsxi:76
	}
	
	this.dirname = path.dirname (this.fullpath);                                   // file.jsxi:79
	this.filename = path.basename (this.fullpath);                                 // file.jsxi:80
	fileStorage.add (this);                                                        // file.jsxi:82
}
File.prototype.findChild = function (child){                                       // file.jsxi:85
	return File.find (this, child);                                                // file.jsxi:86
};
File.prototype.weight = function (){                                               // file.jsxi:88
	if (this.weightCalculating)
		return 0;
	
	this.weightCalculating = true;
	
	var result = this.imports.reduce (function (a, b){                             // file.jsxi:93
		return a + b.weight ();                                                    // file.jsxi:93
	}, 
	1);
	
	this.weightCalculating = false;
	return result;                                                                 // file.jsxi:96
};
File.prototype.load = function (callback){                                         // file.jsxi:99
	var __that = this;
	
	console.assert (this.state == File.STATE_INITIAL,                              // file.jsxi:100
		'Wrong state (' + this.state + ')');                                       // file.jsxi:100
	this.state = File.STATE_MACRO_WAITING;
	fs.readFile (this.fullpath,                                                    // file.jsxi:103
		function (error, data){                                                    // file.jsxi:103
			if (error)                                                             // file.jsxi:104
				console.fatal (error);                                             // file.jsxi:105
			
			__that.state = File.STATE_LOADED;
			__that.content = String (data);                                        // file.jsxi:108
			callback ();                                                           // file.jsxi:112
		});
};
File.prototype.macros = function (callback){                                       // file.jsxi:116
	var __that = this;
	
	console.assert (this.state == File.STATE_LOADED,                               // file.jsxi:117
		'Wrong state (' + this.state + ')');                                       // file.jsxi:117
	this.state = File.STATE_WAITING;
	macrosProcess (this.content,                                                   // file.jsxi:120
		new Context (this),                                                        // file.jsxi:120
		function (arg){                                                            // file.jsxi:120
			__that.state = File.STATE_MACROS;
			__that.content = String (arg);                                         // file.jsxi:124
			callback ();                                                           // file.jsxi:126
		});
};
File.prototype.parsing = function (callback){                                      // file.jsxi:130
	var __that = this;
	
	console.assert (this.state == File.STATE_MACROS,                               // file.jsxi:131
		'Wrong state (' + this.state + ')');                                       // file.jsxi:131
	this.state = File.STATE_WAITING;
	jsxParse (this.content,                                                        // file.jsxi:134
		{ filename: this.filename, initializationAllowed: true }, 
		function (parsed, helpers){                                                // file.jsxi:134
			__that.state = File.STATE_FINISHED;
			__that.parsed = parsed;                                                // file.jsxi:138
			__that.helpers = helpers;                                              // file.jsxi:139
			callback ();                                                           // file.jsxi:141
		});
};
File.prototype.process = function (callback){                                      // file.jsxi:145
	var __that = this;
	
	new Queue (this, Queue.MODE_SEQUENT).description ('file process').add (__bindOnce (this, 'load')).add (__bindOnce (this, 'macros')).add (__bindOnce (this, 'parsing')).run (function (arg){
		console.assert (__that.state == File.STATE_FINISHED,                       // file.jsxi:152
			'Wrong state (' + __that.state + ')');                                 // file.jsxi:152
		
		if (callback !== undefined)                                                // file.jsxi:153
			callback (this);                                                       // file.jsxi:154
	});
};
File.STATE_WAITING = - 1;                                                          // file.jsxi:2
File.STATE_MACRO_WAITING = - 2;                                                    // file.jsxi:3
File.STATE_INITIAL = 0;                                                            // file.jsxi:4
File.STATE_LOADED = 1;                                                             // file.jsxi:5
File.STATE_MACROS = 2;                                                             // file.jsxi:6
File.STATE_FINISHED = 3;                                                           // file.jsxi:7
File.lookingAt = undefined;                                                        // file.jsxi:9
File.find = function (from, child){                                                // file.jsxi:11
	if (!File.lookingAt)
		File.lookingAt = [ { root: path.resolve (__dirname, 'library') } ];
	
	function getByMask (temp){                                                     // file.jsxi:15
		var dirname = path.dirname (temp),                                         // file.jsxi:18
			regExp = new RegExp ('^' + path.basename (temp).replace (/\*/g, '.*').replace (/\?/g, '.') + '$', 
				'i'),                                                              // file.jsxi:19
			files = fs.readdirSync (dirname),                                      // file.jsxi:20
			filtered = files.filter (RegExp.prototype.test.bind (regExp)).map (function (arg){
				return path.resolve (dirname, arg);                                // file.jsxi:21
			});
		return filtered;                                                           // file.jsxi:23
	}
	
	function findInFolder (root, current, child){                                  // file.jsxi:26
		if (current === undefined)                                                 // file.jsxi:26
			current = root;                                                        // file.jsxi:26
	
		console.assert (current.indexOf (root) === 0, 'Invalid state');            // file.jsxi:27
		
		while (current.indexOf (root) === 0){                                      // file.jsxi:29
			var temp = path.resolve (current, child + '.jsxi'),                    // file.jsxi:30
				match = temp.search (/[\*\?]/);                                    // file.jsxi:31
			
			if (match !== - 1){                                                    // file.jsxi:33
				var filtered = getByMask (temp);
				
				if (filtered.length)                                               // file.jsxi:35
					return filtered;                                               // file.jsxi:36
			} else if (fs.existsSync (temp))                                       // file.jsxi:37
				return [ temp ];
			
			current = path.dirname (current);                                      // file.jsxi:40
		}
	}
	
	if (typeof from === 'string'){                                                 // file.jsxi:44
		child = from;                                                              // file.jsxi:45
		from = null;                                                               // file.jsxi:46
	}
	
	{
		var __16 = from ? [ { root: from.root, dirname: from.dirname } ].concat (File.lookingAt) : File.lookingAt;
		
		for (var __15 = 0; __15 < __16.length; __15 ++){
			var entry = __16 [__15];
			
			var temp = findInFolder (entry.root, entry.dirname, child);
			
			if (temp)                                                              // file.jsxi:52
				return temp.map (function (arg){                                   // file.jsxi:53
					return fileStorage.get (arg) || new File (entry.root, arg);    // file.jsxi:53
				});
		}
		
		__16 = undefined;
	}
};

var ch0 = '0'.charCodeAt (0),                                                      // utils.jsxi:1
	ch1 = '1'.charCodeAt (0),                                                      // utils.jsxi:2
	ch7 = '7'.charCodeAt (0),                                                      // utils.jsxi:3
	ch9 = '9'.charCodeAt (0),                                                      // utils.jsxi:4
	cha = 'a'.charCodeAt (0),                                                      // utils.jsxi:5
	chf = 'f'.charCodeAt (0),                                                      // utils.jsxi:6
	chz = 'z'.charCodeAt (0),                                                      // utils.jsxi:7
	chA = 'A'.charCodeAt (0),                                                      // utils.jsxi:8
	chF = 'F'.charCodeAt (0),                                                      // utils.jsxi:9
	chZ = 'Z'.charCodeAt (0);                                                      // utils.jsxi:10

function decimalDigit (c){                                                         // utils.jsxi:12
	c = c.charCodeAt (0);                                                          // utils.jsxi:13
	return ch0 <= c && c <= ch9;                                                   // utils.jsxi:14
}

function hexDigit (c){                                                             // utils.jsxi:17
	c = c.charCodeAt (0);                                                          // utils.jsxi:18
	return ch0 <= c && c <= ch9 || cha <= c && c <= chf || chA <= c && c <= chF;   // utils.jsxi:19
}

function identifierStart (c){                                                      // utils.jsxi:22
	var v = c.charCodeAt (0);
	return cha <= v && v <= chz || chA <= v && v <= chZ || c === '$' || c === '_';
}

function identifierPart (c){                                                       // utils.jsxi:27
	var v = c.charCodeAt (0);
	return cha <= v && v <= chz || chA <= v && v <= chZ || ch0 <= v && v <= ch9 || c === '$' || c === '_';
}

var lastIdentifier = 0;

function newIdentifier (){                                                         // utils.jsxi:34
	return '__' + (lastIdentifier ++).toString (32);                               // utils.jsxi:35
}

function saveAll (){                                                               // utils.jsxi:39
	return { index: index, lineNumber: lineNumber, buffer: buffer };
}

function restoreAll (obj){                                                         // utils.jsxi:42
	index = obj.index;                                                             // utils.jsxi:43
	lineNumber = obj.lineNumber;                                                   // utils.jsxi:44
	buffer = obj.buffer;                                                           // utils.jsxi:45
}

function attemptTo (firstFn, secondFn, forceSecond){                               // utils.jsxi:48
	if (forceSecond){                                                              // utils.jsxi:49
		return typeof secondFn === 'function' ? secondFn () : secondFn;            // utils.jsxi:50
	} else {
		saved = saveAll ();                                                        // utils.jsxi:52
		
		try {
			return typeof firstFn === 'function' ? firstFn () : firstFn;           // utils.jsxi:55
		} catch (e){
			if (e instanceof Error && /^Unexpected .+? \[.+?\:\d+\]$/.test (e.message)){
				restoreAll (saved);                                                // utils.jsxi:58
				return typeof secondFn === 'function' ? secondFn () : secondFn;    // utils.jsxi:59
			} else
				throw e;                                                           // utils.jsxi:61
		} 
	}
}

function advance (){                                                               // utils.jsxi:64
	skipComments ();                                                               // utils.jsxi:65
	
	if (index >= length)                                                           // utils.jsxi:67
		return {
			type: Token.EOF,                                                       // utils.jsxi:68
			lineNumber: lineNumber,                                                // utils.jsxi:68
			range: [ index, index ]
		};
	
	var token = readPunctuator ();
	
	if (token !== undefined)                                                       // utils.jsxi:71
		return token;                                                              // utils.jsxi:72
	
	var character = source [index];
	
	if (character === '\'' || character === '"')                                   // utils.jsxi:75
		return readStringLiteral ();                                               // utils.jsxi:76
	
	if (character === '`')                                                         // utils.jsxi:78
		return readMultilineString ();                                             // utils.jsxi:79
	
	if (character === '.' || decimalDigit (character))                             // utils.jsxi:81
		return readNumericLiteral ();                                              // utils.jsxi:82
	
	token = readIdentifier ();                                                     // utils.jsxi:84
	
	if (token !== undefined)                                                       // utils.jsxi:85
		return token;                                                              // utils.jsxi:86
	
	unexpected ();                                                                 // utils.jsxi:88
}

function lex (){                                                                   // utils.jsxi:91
	if (buffer){                                                                   // utils.jsxi:92
		index = buffer.range [1];                                                  // utils.jsxi:93
		lineNumber = buffer.lineNumber;                                            // utils.jsxi:94
		
		var token = buffer;
		
		buffer = null;                                                             // utils.jsxi:97
		return token;                                                              // utils.jsxi:98
	} else {
		buffer = null;                                                             // utils.jsxi:100
		return advance ();                                                         // utils.jsxi:101
	}
}

function lookahead (){                                                             // utils.jsxi:104
	if (buffer === null){                                                          // utils.jsxi:105
		var currentIndex = index, currentLineNumber = lineNumber;
		
		buffer = advance ();                                                       // utils.jsxi:109
		index = currentIndex;                                                      // utils.jsxi:111
		lineNumber = currentLineNumber;                                            // utils.jsxi:112
	}
	return buffer;                                                                 // utils.jsxi:115
}

function peekLineTerminator (){                                                    // utils.jsxi:118
	var pos = index, line = lineNumber, found;
	
	skipComments ();                                                               // utils.jsxi:123
	found = lineNumber !== line;                                                   // utils.jsxi:125
	index = pos;                                                                   // utils.jsxi:126
	lineNumber = line;                                                             // utils.jsxi:127
	return found;                                                                  // utils.jsxi:129
}

function expect (value){                                                           // utils.jsxi:132
	var token = lex ();
	
	if (token.type !== Token.Punctuator || token.value !== value)                  // utils.jsxi:134
		unexpected (token);                                                        // utils.jsxi:135
}

function expectKeyword (keyword){                                                  // utils.jsxi:138
	var token = lex ();
	
	if (token.type !== Token.Keyword || token.value !== keyword)                   // utils.jsxi:140
		unexpected (token);                                                        // utils.jsxi:141
}

function match (value){                                                            // utils.jsxi:144
	var token = lookahead ();
	return token.type === Token.Punctuator && token.value === value;               // utils.jsxi:146
}

function matchKeyword (keyword){                                                   // utils.jsxi:149
	var token = lookahead ();
	return token.type === Token.Keyword && token.value === keyword;                // utils.jsxi:151
}

function matchLex (value){                                                         // utils.jsxi:154
	var token = lookahead ();
	
	if (token.type === Token.Punctuator && token.value === value)                  // utils.jsxi:156
		return lex ();                                                             // utils.jsxi:157
	else
		return false;
}

function matchKeywordLex (keyword){                                                // utils.jsxi:162
	var token = lookahead ();
	
	if (token.type === Token.Keyword && token.value === keyword)                   // utils.jsxi:164
		return lex ();                                                             // utils.jsxi:165
	else
		return false;
}

function consumeSemicolon (){                                                      // utils.jsxi:170
	if (source [index] === ';'){                                                   // utils.jsxi:171
		lex ();                                                                    // utils.jsxi:172
		return;
	}
	
	var line = lineNumber;
	
	skipComments ();                                                               // utils.jsxi:177
	
	if (lineNumber !== line)                                                       // utils.jsxi:179
		return;
	
	if (matchLex (';'))                                                            // utils.jsxi:182
		return;
	
	if (!state.preventSequence && !match ('}') && lookahead ().type !== Token.EOF)
		unexpected (buffer);                                                       // utils.jsxi:186
}

function leftSideOnly (expression){                                                // utils.jsxi:189
	if (!expression || expression.type !== Syntax.Identifier && expression.type !== Syntax.MemberExpression)
		throw new SyntaxError ('Invalid left-hand side', expression);              // utils.jsxi:191
	else
		return expression;                                                         // utils.jsxi:193
}

function makeAsynchronous (body){                                                  // asynchronous_functions.jsxi:4
	function each (node, callback, result){                                        // asynchronous_functions.jsxi:5
		if (result === undefined)                                                  // asynchronous_functions.jsxi:5
			result = [];                                                           // asynchronous_functions.jsxi:5
	
		if (typeof node.type === 'string'){                                        // asynchronous_functions.jsxi:6
			var temp = callback (node);
			
			if (temp !== undefined)                                                // asynchronous_functions.jsxi:9
				result.push (temp);                                                // asynchronous_functions.jsxi:10
		}
		
		for (var key in node){                                                     // asynchronous_functions.jsxi:13
			var child = node [key];
			
			if (child && (typeof child.type === 'string' || child instanceof Array))
				each (child, callback, result);                                    // asynchronous_functions.jsxi:15
		}
		return result;                                                             // asynchronous_functions.jsxi:17
	}
	
	function asynchronousConvert (statement, asynchronous){                        // asynchronous_functions.jsxi:20
		var next = identifier ('__block_' + blocks.length);
		
		if (statement.type === Syntax.ExpressionStatement){                        // asynchronous_functions.jsxi:23
			var expression = statement.expression;
			
			if (expression.type === Syntax.CallExpression){                        // asynchronous_functions.jsxi:26
				if (expression === asynchronous [0] && asynchronous.length === 1){
					expression.arguments.push (next);                              // asynchronous_functions.jsxi:28
					return expression;                                             // asynchronous_functions.jsxi:29
				}
			} else if (expression.type === Syntax.AssignmentExpression){           // asynchronous_functions.jsxi:31
				if (expression.right === asynchronous [0] && asynchronous.length === 1){
					expression.right.arguments.push (functionExpression (null,     // asynchronous_functions.jsxi:33
						[ identifier ('__result') ], 
						blockStatement ([                                          // asynchronous_functions.jsxi:35
							assignmentStatement (expression.left, identifier ('__result')), 
							callExpression (next)
						])));
					return expression.right;                                       // asynchronous_functions.jsxi:39
				}
			}
		}
		
		throw new JsExtError ('NotImplementedError',                               // asynchronous_functions.jsxi:44
			'Not supported asynchronous type' + '\n' + JSON.stringify (statement, false, 
				4));                                                               // asynchronous_functions.jsxi:44
	}
	
	function synchronousConvert (statement){                                       // asynchronous_functions.jsxi:47
		each (statement,                                                           // asynchronous_functions.jsxi:48
			function (arg){                                                        // asynchronous_functions.jsxi:48
				if (arg.type === Syntax.ReturnStatement)                           // asynchronous_functions.jsxi:49
					arg.argument = callExpression (identifier ('__callback'), [ arg.argument ]);
			});
		return statement;                                                          // asynchronous_functions.jsxi:53
	}
	
	var variables = [];
	
	each (body,                                                                    // asynchronous_functions.jsxi:58
		function (arg){                                                            // asynchronous_functions.jsxi:58
			if (arg.type === Syntax.VariableDeclaration){                          // asynchronous_functions.jsxi:58
				arg.declarations.forEach (function (arg){                          // asynchronous_functions.jsxi:59
					return variables.push (variableDeclarator (arg.id));           // asynchronous_functions.jsxi:59
				});
				
				var inits = arg.declarations.filter (function (arg){               // asynchronous_functions.jsxi:61
						return arg.init !== null;                                  // asynchronous_functions.jsxi:61
					}), 
					expression = sequenceExpression (inits.map (function (arg){    // asynchronous_functions.jsxi:62
						return assignmentExpression (arg.id, arg.init);            // asynchronous_functions.jsxi:62
					})), 
					temp;                                                          // asynchronous_functions.jsxi:63
				
				if (expression.length === 0)                                       // asynchronous_functions.jsxi:65
					temp = { type: Syntax.EmptyStatement };                        // asynchronous_functions.jsxi:66
				else if (expression.expressions.length === 1)                      // asynchronous_functions.jsxi:67
					temp = expressionStatement (expression.expressions [0]);       // asynchronous_functions.jsxi:68
				else
					temp = expressionStatement (expression);                       // asynchronous_functions.jsxi:70
				
				set (arg, temp);                                                   // asynchronous_functions.jsxi:72
			}
		});
	
	var current = [], blocks = [ current ];
	
	for (var __0 = 0; __0 < body.length; __0 ++){                                  // asynchronous_functions.jsxi:78
		var statement = body [__0];
		
		var asynchronous = each (statement,                                        // asynchronous_functions.jsxi:79
			function (arg){                                                        // asynchronous_functions.jsxi:79
				if (arg.asynchronous)                                              // asynchronous_functions.jsxi:79
					return arg;                                                    // asynchronous_functions.jsxi:79
			});
		
		if (asynchronous.length > 0){                                              // asynchronous_functions.jsxi:81
			current.push (asynchronousConvert (statement, asynchronous));          // asynchronous_functions.jsxi:82
			blocks.push (current = []);                                            // asynchronous_functions.jsxi:83
		} else {
			current.push (synchronousConvert (statement));                         // asynchronous_functions.jsxi:85
		}
	}
	
	body = blocks.map (function (arg, index){                                      // asynchronous_functions.jsxi:89
		return functionDeclaration (identifier ('__block_' + index),               // asynchronous_functions.jsxi:90
			[], 
			blockStatement (arg));                                                 // asynchronous_functions.jsxi:90
	}).concat (expressionStatement (callExpression ('__block_0', [])));            // asynchronous_functions.jsxi:91
	
	if (variables.length)                                                          // asynchronous_functions.jsxi:93
		body.unshift (variableDeclaration (variables));                            // asynchronous_functions.jsxi:94
	return body;                                                                   // asynchronous_functions.jsxi:96
}

function doClasses (statements, callback){                                         // do_classes.jsxi:1
	var classes = [],                                                              // do_classes.jsxi:2
		helpers = new HelpersManager (),                                           // do_classes.jsxi:3
		thatVariable = '__that';                                                   // do_classes.jsxi:4
	
	var OutputMode = {                                                             // do_classes.jsxi:6
		Default: 'Default',                                                        // do_classes.jsxi:6
		Static: 'Static',                                                          // do_classes.jsxi:8
		InitializerOnly: 'InitializerOnly',                                        // do_classes.jsxi:9
		Empty: 'Empty'
	};
	
	function filter (classEntry, filter){                                          // do_classes.jsxi:13
		var result = [];
		
		{
			var __1 = classEntry.members;
			
			for (var key in __1){
				var value = __1 [key];
				
				if (filter (value, key))                                           // do_classes.jsxi:16
					result.push (value);                                           // do_classes.jsxi:17
			}
			
			__1 = undefined;
		}
		return result;                                                             // do_classes.jsxi:18
	}
	
	function byName (name, path){                                                  // do_classes.jsxi:21
		console.assert (typeof name === 'string' && typeof path === 'string',      // do_classes.jsxi:22
			'Wrong args');                                                         // do_classes.jsxi:22
		
		var length, min = - 1, result;
		
		for (var __2 = 0; __2 < classes.length; __2 ++){                           // do_classes.jsxi:26
			var classEntry = classes [__2];
			
			length = classEntry.path.length;                                       // do_classes.jsxi:27
			
			if (classEntry.id.name === name && path.substr (0, length) === classEntry.path && min < length){
				min = length;                                                      // do_classes.jsxi:30
				result = classEntry;                                               // do_classes.jsxi:31
			}
		}
		return result;                                                             // do_classes.jsxi:35
	}
	
	function collectRawClasses (statements){                                       // do_classes.jsxi:38
		var array = [], rootId = 0;
		
		(function fromObj (obj, location){                                         // do_classes.jsxi:41
			if (obj instanceof Array){                                             // do_classes.jsxi:42
				set (obj,                                                          // do_classes.jsxi:43
					obj.filter (function (child){                                  // do_classes.jsxi:43
						fromObj (child, location);                                 // do_classes.jsxi:44
						
						if (child.type === Syntax.RawClassDeclaration){            // do_classes.jsxi:46
							array.push ($.extend (child, location));               // do_classes.jsxi:47
							return false;
						} else
							return true;
					}));
			} else if (obj && typeof obj === 'object'){                            // do_classes.jsxi:52
				if (obj.type === Syntax.FunctionDeclaration || obj.type === Syntax.FunctionExpression){
					if (obj.body)                                                  // do_classes.jsxi:54
						fromObj (obj.body.body,                                    // do_classes.jsxi:55
							{ root: obj.body.body, path: location.path + '/' + ++ rootId });
				} else
					for (var key in obj){                                          // do_classes.jsxi:57
						var child = obj [key];
						
						fromObj (child, location);                                 // do_classes.jsxi:58
						
						if (child && child.type === Syntax.RawClassDeclaration){   // do_classes.jsxi:60
							array.push ($.extend (child, location));               // do_classes.jsxi:61
							obj [key] = { type: Syntax.EmptyStatement };           // do_classes.jsxi:62
						}
					}
			}
		})(statements, { root: statements, path: '' });
		return array;                                                              // do_classes.jsxi:68
	}
	
	function addClass (current){                                                   // do_classes.jsxi:71
		var previous = byName (current.id.name, current.path);
		
		function equals (a, b){                                                    // do_classes.jsxi:74
			for (var n in a)                                                       // do_classes.jsxi:75
				if (a [n] !== b [n])                                               // do_classes.jsxi:76
					return false;
			
			for (var n in b)                                                       // do_classes.jsxi:78
				if (a [n] !== b [n])                                               // do_classes.jsxi:79
					return false;
			return true;
		}
		
		if (previous){                                                             // do_classes.jsxi:84
			if (!current.params.partial)                                           // do_classes.jsxi:85
				throw new TypeError ('Class "' + current.id.name + '" already declared', 
					current.id);                                                   // do_classes.jsxi:86
			
			if (!equals (current.params, previous.params))                         // do_classes.jsxi:88
				throw new TypeError ('Params of classes are different', id);       // do_classes.jsxi:89
			
			if ((current.dependsOn.parent && current.dependsOn.parent.name) !== (previous.dependsOn.parent && previous.dependsOn.parent.name))
				throw new TypeError ('Params "extends" of classes are different', id);
			
			if (current.dependsOn.implements.map (function (arg){                  // do_classes.jsxi:94
				return arg.name;                                                   // do_classes.jsxi:94
			}).join () !== previous.dependsOn.implements.map (function (arg){      // do_classes.jsxi:94
				return arg.name;                                                   // do_classes.jsxi:94
			}).join ())                                                            // do_classes.jsxi:94
				throw new TypeError ('Params "implements" of classes are different', id);
			
			{
				var __4 = current.dependsOn.uses;
				
				for (var __3 = 0; __3 < __4.length; __3 ++){
					var entry = __4 [__3];
					
					if (previous.dependsOn.uses.filter (function (arg){            // do_classes.jsxi:98
						return arg.name === entry.name;                            // do_classes.jsxi:98
					}).length === 0)                                               // do_classes.jsxi:98
						previous.dependsOn.uses.push (entry);                      // do_classes.jsxi:99
				}
				
				__4 = undefined;
			}
			
			$.extend (previous.members, current.members);                          // do_classes.jsxi:101
		} else
			classes.push (current);                                                // do_classes.jsxi:103
	}
	
	function preprocessClasses (){                                                 // do_classes.jsxi:106
		function preprocessClass (classEntry){                                     // do_classes.jsxi:107
			function updateMember (member){                                        // do_classes.jsxi:109
				if (!classEntry.members.hasOwnProperty (member.id.name))           // do_classes.jsxi:111
					classEntry.members [member.id.name] = member;                  // do_classes.jsxi:112
				
				member.className = classEntry.id;                                  // do_classes.jsxi:115
				member.method = member.type === Syntax.FunctionExpression;         // do_classes.jsxi:116
				member.processed = false;                                          // do_classes.jsxi:117
				return member;                                                     // do_classes.jsxi:119
			}
			
			classEntry.classObject = true;                                         // do_classes.jsxi:123
			
			{
				var __5 = classEntry.members;
				
				for (var name in __5){
					var value = __5 [name];
					
					value.className = classEntry.id;                               // do_classes.jsxi:127
				}
				
				__5 = undefined;
			}
			
			var constructor = classEntry.members ['@constructor'];
			
			if (constructor === undefined){                                        // do_classes.jsxi:131
				constructor = updateMember (functionExpression ('@constructor', [], 
					blockStatement ([])));                                         // do_classes.jsxi:132
				constructor.autocreated = true;                                    // do_classes.jsxi:133
			}
			
			var initializer = classEntry.members ['@initializer'];
			
			if (initializer === undefined){                                        // do_classes.jsxi:138
				initializer = updateMember (functionExpression ('@initializer', [], 
					blockStatement ([])));                                         // do_classes.jsxi:139
				initializer.static = true;                                         // do_classes.jsxi:140
				initializer.autocreated = true;                                    // do_classes.jsxi:141
			}
			
			{
				var __6 = classEntry.members;
				
				for (var name in __6){
					var member = __6 [name];
					
					updateMember (member);                                         // do_classes.jsxi:146
				}
				
				__6 = undefined;
			}
			
			var fields = filter (classEntry,                                       // do_classes.jsxi:149
				function (arg){                                                    // do_classes.jsxi:149
					return !arg.method && !arg.static && arg.init;                 // do_classes.jsxi:149
				});
			
			var initialization = fields.map (function (arg){                       // do_classes.jsxi:152
				return $.extend (expressionStatement (assignmentExpression (memberExpression (thisExpression (), arg.id.name), arg.init)), 
					{ autocreated: true });
			});
			
			Array.prototype.unshift.apply (constructor.body.body, initialization);
			classEntry.childs = [];                                                // do_classes.jsxi:159
			classEntry.probablyUseOther = 0;                                       // do_classes.jsxi:160
		}
		
		for (var __7 = 0; __7 < classes.length; __7 ++){                           // do_classes.jsxi:163
			var classEntry = classes [__7];
			
			preprocessClass (classEntry);                                          // do_classes.jsxi:164
		}
	}
	
	function connectClasses (){                                                    // do_classes.jsxi:167
		var active = {};
		
		function searchSuperExpression (obj){                                      // do_classes.jsxi:170
			if (obj.type === Syntax.CallExpression && 'super' in obj && obj.callee === null){
				return true;
			} else if (obj && obj.body && obj.body.body){                          // do_classes.jsxi:173
				{
					var __9 = obj.body.body;
					
					for (var __8 = 0; __8 < __9.length; __8 ++){
						var child = __9 [__8];
						
						if (searchSuperExpression (child))                         // do_classes.jsxi:175
							return true;
					}
					
					__9 = undefined;
				}
			} else {
				for (var key in obj){                                              // do_classes.jsxi:179
					var child = obj [key];
					
					if (child && typeof child.type === 'string' && searchSuperExpression (child))
						return true;
				}
			}
		}
		
		function connectClass (current, from){                                     // do_classes.jsxi:185
			if (active [current.id.name] === true)                                 // do_classes.jsxi:186
				throw new TypeError ('Circular dependency', current.id);           // do_classes.jsxi:187
			
			if (from)                                                              // do_classes.jsxi:189
				current.childs.push (from);                                        // do_classes.jsxi:190
			
			if (current.weight)                                                    // do_classes.jsxi:192
				return;
			
			active [current.id.name] = true;                                       // do_classes.jsxi:195
			current.weight = 1;                                                    // do_classes.jsxi:196
			
			if (current.dependsOn.parent){                                         // do_classes.jsxi:198
				var parent = byName (current.dependsOn.parent.name, current.path);
				
				if (!parent)                                                       // do_classes.jsxi:201
					throw new TypeError ('Parent class "' + current.dependsOn.parent.name + '" not found', 
						current.dependsOn.parent);                                 // do_classes.jsxi:202
				
				current.dependsOn.parent = parent;                                 // do_classes.jsxi:204
				connectClass (parent, current);                                    // do_classes.jsxi:206
				current.weight += parent.weight;                                   // do_classes.jsxi:207
				
				{
					var __a = parent.members;
					
					for (var id in __a){
						var member = __a [id];
						
						if (!current.members.hasOwnProperty (id))                  // do_classes.jsxi:210
							current.members [id] = $.extend (true,                 // do_classes.jsxi:211
								{}, 
								member,                                            // do_classes.jsxi:211
								{
									publicMode: member.publicMode === 'private' ? 'locked' : member.publicMode
								});
					}
					
					__a = undefined;
				}
				
				var parentConstructor = parent.members ['@constructor'],           // do_classes.jsxi:213
					constructor = current.members ['@constructor'];                // do_classes.jsxi:214
				
				if (parentConstructor.body.body.length > 0 && !searchSuperExpression (constructor)){
					if (constructor.autocreated || parentConstructor.params.length === 0){
						{
							var __b = constructor.body.body;
							
							for (var autocreated = 0; autocreated < __b.length; autocreated ++){
								var statement = __b [autocreated];
								
								if (!statement.autocreated)                        // do_classes.jsxi:219
									break;
							}
							
							__b = undefined;
						}
						
						constructor.body.body.splice (autocreated,                 // do_classes.jsxi:223
							0, 
							expressionStatement (superExpression (null)));         // do_classes.jsxi:223
					} else
						throw new TypeError ('Super constructor call is required', constructor);
				}
			}
			
			{
				var __c = current.dependsOn.uses;
				
				for (var index = 0; index < __c.length; index ++){                 // do_classes.jsxi:229
					var usedName = __c [index];
					
					var used = byName (usedName.name, current.path);
					
					if (!used)                                                     // do_classes.jsxi:232
						throw new TypeError ('Used class "' + usedName.name + '" not found', usedName);
					
					current.dependsOn.uses [index] = used;                         // do_classes.jsxi:235
					connectClass (used);                                           // do_classes.jsxi:237
					current.weight += used.weight;                                 // do_classes.jsxi:238
				}
				
				__c = undefined;
			}
			
			delete active [current.id.name];                                       // do_classes.jsxi:241
		}
		
		for (var __d = 0; __d < classes.length; __d ++){                           // do_classes.jsxi:244
			var current = classes [__d];
			
			connectClass (current);                                                // do_classes.jsxi:245
		}
	}
	
	function processClassesMembers (){                                             // do_classes.jsxi:248
		function rename (name, member, publicMode){                                // do_classes.jsxi:250
			if (publicMode === 'locked' || member.static && publicMode === 'private')
				return name;                                                       // do_classes.jsxi:253
			
			switch (publicMode){                                                   // do_classes.jsxi:255
				case 'protected':                                                  // do_classes.jsxi:256
					return '__' + name;                                            // do_classes.jsxi:257
				case 'private':                                                    // do_classes.jsxi:259
					return '__' + member.className.name + '_' + name;              // do_classes.jsxi:260
				case 'public':                                                     // do_classes.jsxi:262
					return name;                                                   // do_classes.jsxi:263
				default:
					console.assert (false, 'Bad publicMode value');                // do_classes.jsxi:266
			}
		}
		
		function badOverride (parentMember, childMember){                          // do_classes.jsxi:271
			switch (childMember.publicMode){                                       // do_classes.jsxi:272
				case 'public':                                                     // do_classes.jsxi:273
					return false;
				case 'protected':                                                  // do_classes.jsxi:276
					return parentMember.publicMode === 'public';                   // do_classes.jsxi:277
				case 'private':                                                    // do_classes.jsxi:279
					return true;
				default:
					console.assert (false, 'Bad publicMode value: ' + childMember.publicMode);
			}
		}
		
		function morePublicMode (firstMode, secondMode){                           // do_classes.jsxi:286
			var modes = [ 'locked', 'private', 'protected', 'public' ],            // do_classes.jsxi:287
				firstId = modes.indexOf (firstMode),                               // do_classes.jsxi:288
				secondId = modes.indexOf (secondMode),                             // do_classes.jsxi:289
				maxId = Math.max (firstId, secondId);                              // do_classes.jsxi:290
			return modes [maxId];                                                  // do_classes.jsxi:292
		}
		
		function processClassMember (current, name, member){                       // do_classes.jsxi:295
			var publicMode = member.publicMode,                                    // do_classes.jsxi:296
				members = [ member ],                                              // do_classes.jsxi:297
				updated;                                                           // do_classes.jsxi:298
			
			function testChilds (current){                                         // do_classes.jsxi:300
				{
					var __f = current.childs;
					
					for (var __e = 0; __e < __f.length; __e ++){
						var child = __f [__e];
						
						if (child.members.hasOwnProperty (name)){                  // do_classes.jsxi:302
							var childMember = child.members [name];
							
							if (badOverride (member, childMember))                 // do_classes.jsxi:305
								throw new TypeError ('Invalid public mode', childMember.id);
							
							if (member.method !== childMember.method)              // do_classes.jsxi:308
								throw new TypeError ('Invalid override (' + (member.method ? 'method' : 'field') + ' required)', 
									childMember.id);                               // do_classes.jsxi:309
							
							publicMode = morePublicMode (publicMode, childMember.publicMode);
							members.push (childMember);                            // do_classes.jsxi:312
						}
						
						testChilds (child);                                        // do_classes.jsxi:315
					}
					
					__f = undefined;
				}
			}
			
			if (publicMode === 'protected' || publicMode === 'public')             // do_classes.jsxi:318
				testChilds (current);                                              // do_classes.jsxi:319
			
			updated = rename (name, member, publicMode);                           // do_classes.jsxi:321
			
			for (var __g = 0; __g < members.length; __g ++){                       // do_classes.jsxi:323
				var targetMember = members [__g];
				
				targetMember.id.name = updated;                                    // do_classes.jsxi:324
				targetMember.processed = true;                                     // do_classes.jsxi:325
			}
		}
		
		function processClassMembers (current){                                    // do_classes.jsxi:329
			if (current.dependsOn.parent)                                          // do_classes.jsxi:330
				processClassMembers (current.dependsOn.parent);                    // do_classes.jsxi:331
			
			{
				var __h = current.members;
				
				for (var name in __h){
					var member = __h [name];
					
					if (name [0] !== '@' && !member.processed)                     // do_classes.jsxi:335
						processClassMember (current, name, member);                // do_classes.jsxi:336
				}
				
				__h = undefined;
			}
		}
		
		for (var __i = 0; __i < classes.length; __i ++){                           // do_classes.jsxi:339
			var current = classes [__i];
			
			processClassMembers (current);                                         // do_classes.jsxi:340
		}
	}
	
	function processClassesMethods (){                                             // do_classes.jsxi:343
		function processClassMethod (classEntry, methodEntry){                     // do_classes.jsxi:344
			console.assert (classEntry && methodEntry, 'Wrong arguments');         // do_classes.jsxi:345
			
			var exclusions = {};
			
			var currentFunction;
			
			var usingThat = false;
			
			function getThis (){                                                   // do_classes.jsxi:359
				var childFunction = currentFunction !== methodEntry;
				
				if (childFunction)                                                 // do_classes.jsxi:364
					usingThat = true;                                              // do_classes.jsxi:365
				return childFunction ? identifier (thatVariable) : thisExpression ();
			}
			
			function lookForExclusions (obj, target){                              // do_classes.jsxi:371
				if (typeof obj === 'object' && obj !== null){                      // do_classes.jsxi:372
					if (obj instanceof Array){                                     // do_classes.jsxi:373
						for (var __j = 0; __j < obj.length; __j ++){               // do_classes.jsxi:375
							var child = obj [__j];
							
							lookForExclusions (child, target);                     // do_classes.jsxi:376
						}
					} else if ('type' in obj){                                     // do_classes.jsxi:378
						if (obj.type === Syntax.VariableDeclarator || obj.type === Syntax.FunctionDeclaration){
							target [obj.id.name] = true;                           // do_classes.jsxi:381
						} else if (obj.type !== Syntax.FunctionExpression){        // do_classes.jsxi:383
							for (var key in obj){                                  // do_classes.jsxi:385
								var value = obj [key];
								
								lookForExclusions (value, target);                 // do_classes.jsxi:386
							}
						}
					}
				}
			}
			
			function processFunction (obj, parent){                                // do_classes.jsxi:392
				console.assert (typeof obj === 'object' && (obj.type === Syntax.FunctionDeclaration || obj.type === Syntax.FunctionExpression), 
					'Wrong argument');                                             // do_classes.jsxi:394
				
				var oldExclusions = $.extend (true, {}, 
						exclusions),                                               // do_classes.jsxi:397
					oldCurrentFunction = currentFunction;                          // do_classes.jsxi:398
				
				currentFunction = obj;                                             // do_classes.jsxi:400
				obj.params.forEach (function (arg){                                // do_classes.jsxi:403
					return exclusions [arg.name] = true;                           // do_classes.jsxi:403
				});
				lookForExclusions (obj.body.body, exclusions);                     // do_classes.jsxi:406
				process (obj.body.body, obj);                                      // do_classes.jsxi:409
				
				if (usingThat && methodEntry === obj){                             // do_classes.jsxi:412
					var temp = variableDeclarator (thatVariable, thisExpression ());
					
					if (obj.body.body [0] && obj.body.body [0].type === Syntax.VariableDeclaration)
						obj.body.body [0].declarations.unshift (temp);             // do_classes.jsxi:417
					else
						obj.body.body.unshift (variableDeclaration ([ temp ]));    // do_classes.jsxi:420
				}
				
				exclusions = oldExclusions;                                        // do_classes.jsxi:424
				currentFunction = oldCurrentFunction;                              // do_classes.jsxi:425
			}
			
			function processProperty (obj, parent){                                // do_classes.jsxi:428
				process (obj.value, parent);                                       // do_classes.jsxi:429
			}
			
			function processIdentifier (obj, parent){                              // do_classes.jsxi:432
				function replaceObject (member){                                   // do_classes.jsxi:435
					if (methodEntry.static)                                        // do_classes.jsxi:439
						throw new TypeError ('Member "' + obj.name + '" is static', obj);
					
					var that = getThis ();
					
					var result;
					
					if (member.method && parent.type !== Syntax.CallExpression){   // do_classes.jsxi:449
						helpers.set ('bindOnce', obj);                             // do_classes.jsxi:450
						result = callExpression ('__bindOnce',                     // do_classes.jsxi:451
							[ that, stringLiteralWithQuotes (member.id.name) ]);
					} else {
						result = memberExpression (that, member.id.name);          // do_classes.jsxi:453
					}
					return result;                                                 // do_classes.jsxi:456
				}
				
				function replaceStatic (member){                                   // do_classes.jsxi:459
					var className = member.className;
					return memberExpression (className.name, member.id.name);      // do_classes.jsxi:467
				}
				
				if (!(obj.name in exclusions)){                                    // do_classes.jsxi:471
					var result = null, member;
					
					if (obj.name in classEntry.members){                           // do_classes.jsxi:475
						member = classEntry.members [obj.name];                    // do_classes.jsxi:479
						
						if (member.publicMode === 'locked')                        // do_classes.jsxi:482
							throw new TypeError ('Member "' + obj.name + '" has private access', obj);
						
						if (!member.static)                                        // do_classes.jsxi:485
							result = replaceObject (member);                       // do_classes.jsxi:486
						else if (member.publicMode !== 'private')                  // do_classes.jsxi:487
							result = replaceStatic (member);                       // do_classes.jsxi:488
					} else if (byName (obj.name, classEntry.path)){                // do_classes.jsxi:490
						classEntry.weight += 0.0001;                               // do_classes.jsxi:493
					}
					
					if (result)                                                    // do_classes.jsxi:497
						set (obj, result);                                         // do_classes.jsxi:498
				}
			}
			
			function processAssignmentExpression (obj, parent){                    // do_classes.jsxi:502
				process (obj.right, obj);                                          // do_classes.jsxi:503
				process (obj.left, obj);                                           // do_classes.jsxi:504
			}
			
			function processMemberExpression (obj, parent, preparent){             // do_classes.jsxi:507
				var member, propertyNameGetter, second, temp;
				
				if (!obj.computed){                                                // do_classes.jsxi:513
					member = classEntry.members.hasOwnProperty (obj.property.name) ? classEntry.members [obj.property.name] : null;
					
					if (member){                                                   // do_classes.jsxi:516
						if (member.static){                                        // do_classes.jsxi:517
							if (member.publicMode === 'private' && obj.object.type === Syntax.Identifier && obj.object.name === member.className.name){
								set (obj, identifier (member.id.name));            // do_classes.jsxi:519
								return;
							}
						} else if (obj.object.type === Syntax.ThisExpression){     // do_classes.jsxi:522
							obj.property.name = member.id.name;                    // do_classes.jsxi:523
							
							if (currentFunction !== methodEntry)                   // do_classes.jsxi:524
								obj.object = getThis ();                           // do_classes.jsxi:525
						} else if (member.publicMode !== 'public'){                // do_classes.jsxi:526
							if (parent instanceof Array && preparent)              // do_classes.jsxi:527
								parent = preparent;                                // do_classes.jsxi:528
							
							if (obj.object.type === Syntax.Identifier){            // do_classes.jsxi:530
								obj.computed = true;                               // do_classes.jsxi:531
								obj.property = conditionalExpression (binaryExpression (obj.object, 'instanceof', member.className.name), 
									stringLiteralWithQuotes (member.id.name),      // do_classes.jsxi:534
									stringLiteralWithQuotes (obj.property.name));
								process (obj.object, obj);                         // do_classes.jsxi:537
							} else if (parent.type === Syntax.AssignmentExpression){
								second = $.extend (true, {}, 
									parent);                                       // do_classes.jsxi:539
								
								for (var key in parent){                           // do_classes.jsxi:540
									var value = parent [key];
									
									if (value === obj)                             // do_classes.jsxi:541
										second [key] = memberExpression ('__',     // do_classes.jsxi:542
											conditionalExpression (binaryExpression ('__', 'instanceof', member.className.name), 
												stringLiteralWithQuotes (member.id.name), 
												stringLiteralWithQuotes (obj.property.name)), 
											true);
								}
								
								set (parent,                                       // do_classes.jsxi:547
									sequenceExpression ([ assignmentExpression ('__', obj.object), second ]));
								process (obj.object, obj);                         // do_classes.jsxi:552
								temp = true;                                       // do_classes.jsxi:554
							} else {
								set (obj,                                          // do_classes.jsxi:556
									sequenceExpression ([                          // do_classes.jsxi:556
										assignmentExpression ('__', obj.object), 
										memberExpression ('__',                    // do_classes.jsxi:558
											conditionalExpression (binaryExpression ('__', 'instanceof', member.className.name), 
												stringLiteralWithQuotes (member.id.name), 
												stringLiteralWithQuotes (obj.property.name)), 
											true)
									]));
								process (obj);                                     // do_classes.jsxi:564
								
								if (parent.type === Syntax.CallExpression && obj === parent.callee){
									parent.callee = memberExpression (parent.callee, 'call');
									parent.arguments.unshift (identifier ('__'));
								}
								
								temp = true;                                       // do_classes.jsxi:571
							}
							
							if (temp && !currentFunction.hasTempVariable){         // do_classes.jsxi:574
								currentFunction.body.body.unshift (oneVariableDeclaration ('__'));
								currentFunction.hasTempVariable = true;            // do_classes.jsxi:576
							}
							return;
						}
					}
				}
				
				process (obj.object, obj);                                         // do_classes.jsxi:585
				
				if (obj.computed)                                                  // do_classes.jsxi:588
					process (obj.property, obj);                                   // do_classes.jsxi:589
			}
			
			function processSuperExpression (obj, parent){                         // do_classes.jsxi:592
				if (currentFunction !== methodEntry && obj.callee === null)        // do_classes.jsxi:597
					throw new Error ('Not implemented');                           // do_classes.jsxi:598
				
				var currentClass = classEntry;
				
				for (var i = 0; i < obj ['super']; i ++){                          // do_classes.jsxi:604
					currentClass = currentClass.dependsOn.parent;                  // do_classes.jsxi:605
					
					if (!currentClass)                                             // do_classes.jsxi:608
						throw new TypeError ('Super method is not available', obj);
				}
				
				var method = obj.callee ? currentClass.members [obj.callee.name] : methodEntry;
				
				if (!method)                                                       // do_classes.jsxi:615
					throw new TypeError ('Super method not found', obj);           // do_classes.jsxi:616
				
				if (method.static)                                                 // do_classes.jsxi:618
					throw new TypeError ('This method is static', obj);            // do_classes.jsxi:619
				
				var target;
				
				if (method.id.name [0] !== '@'){                                   // do_classes.jsxi:624
					target = memberExpression (memberExpression (currentClass.id, 'prototype'), 
						method.id.name);                                           // do_classes.jsxi:626
				} else {
					target = currentClass.id.name;                                 // do_classes.jsxi:629
				}
				
				if (obj.arguments === null){                                       // do_classes.jsxi:633
					obj.callee = memberExpression (target, 'apply');               // do_classes.jsxi:634
					obj.arguments = [ identifier ('arguments') ];                  // do_classes.jsxi:635
				} else
					obj.callee = memberExpression (target, 'call');                // do_classes.jsxi:637
				
				obj.arguments.unshift (getThis ());                                // do_classes.jsxi:640
			}
			
			function process (obj, parent, preparent){                             // do_classes.jsxi:643
				if (typeof obj === 'object' && obj !== null){                      // do_classes.jsxi:644
					if (obj instanceof Array){                                     // do_classes.jsxi:647
						for (var __k = 0; __k < obj.length; __k ++){               // do_classes.jsxi:649
							var child = obj [__k];
							
							process (child, obj, parent);                          // do_classes.jsxi:650
						}
					} else if ('type' in obj){                                     // do_classes.jsxi:652
						switch (obj.type){                                         // do_classes.jsxi:655
							case Syntax.FunctionDeclaration:                       // do_classes.jsxi:656
								
							case Syntax.FunctionExpression:                        // do_classes.jsxi:657
								processFunction (obj, parent);                     // do_classes.jsxi:658
								
								break;
							case Syntax.Property:                                  // do_classes.jsxi:661
								processProperty (obj, parent);                     // do_classes.jsxi:662
								
								break;
							case Syntax.Identifier:                                // do_classes.jsxi:665
								processIdentifier (obj, parent);                   // do_classes.jsxi:666
								
								break;
							case Syntax.AssignmentExpression:                      // do_classes.jsxi:669
								processAssignmentExpression (obj, parent);         // do_classes.jsxi:670
								
								break;
							case Syntax.MemberExpression:                          // do_classes.jsxi:673
								processMemberExpression (obj, parent, preparent);
								
								break;
							case Syntax.CallExpression:                            // do_classes.jsxi:677
								if ('super' in obj)                                // do_classes.jsxi:678
									processSuperExpression (obj, parent);          // do_classes.jsxi:679
							default:
								for (var key in obj){                              // do_classes.jsxi:683
									var value = obj [key];
									
									process (value, obj);                          // do_classes.jsxi:685
								}
						}
					}
				}
			}
			
			process (methodEntry);                                                 // do_classes.jsxi:692
		}
		
		function processClassMethods (classEntry){                                 // do_classes.jsxi:695
			var replace, childMember;
			
			{
				var __l = classEntry.members;
				
				for (var name in __l){
					var member = __l [name];
					
					if (member.method && !member.abstract && member.className === classEntry.id)
						processClassMethod (classEntry, member);                   // do_classes.jsxi:702
				}
				
				__l = undefined;
			}
		}
		
		for (var __m = 0; __m < classes.length; __m ++){                           // do_classes.jsxi:706
			var classEntry = classes [__m];
			
			processClassMethods (classEntry);                                      // do_classes.jsxi:707
		}
	}
	
	function processClasses (){                                                    // do_classes.jsxi:710
		function processClass (classEntry){                                        // do_classes.jsxi:712
			function classMode (){                                                 // do_classes.jsxi:714
				if (classEntry.childs.length === 0 && !classEntry.dependsOn.parent && objectMembers.length === 0 && constructor.body.body.length === 0){
					if (staticFields.length > 0 || staticMethods.length > 0)       // do_classes.jsxi:720
						return OutputMode.Static;                                  // do_classes.jsxi:721
					
					if (initializer.body.body.length > 0)                          // do_classes.jsxi:724
						return OutputMode.InitializerOnly;                         // do_classes.jsxi:725
					return OutputMode.Empty;                                       // do_classes.jsxi:727
				}
				return OutputMode.Default;                                         // do_classes.jsxi:730
			}
			
			console.assert (!classEntry.elements, 'Already processed');            // do_classes.jsxi:734
			
			var constructor = classEntry.members ['@constructor'],                 // do_classes.jsxi:737
				initializer = classEntry.members ['@initializer'];                 // do_classes.jsxi:738
			
			var filtered = filter (classEntry,                                     // do_classes.jsxi:741
					function (arg){                                                // do_classes.jsxi:741
						return arg.className === classEntry.id && arg.id.name [0] !== '@';
					}), 
				objectMembers = filtered.filter (function (arg){                   // do_classes.jsxi:742
					return !arg.static;                                            // do_classes.jsxi:742
				}), 
				staticMembers = filtered.filter (function (arg){                   // do_classes.jsxi:743
					return arg.static;                                             // do_classes.jsxi:743
				});
			
			var objectMethods = objectMembers.filter (function (arg){              // do_classes.jsxi:746
					return arg.method;                                             // do_classes.jsxi:746
				}), 
				objectFields = objectMembers.filter (function (arg){               // do_classes.jsxi:747
					return !arg.method;                                            // do_classes.jsxi:747
				}), 
				staticMethods = staticMembers.filter (function (arg){              // do_classes.jsxi:748
					return arg.method;                                             // do_classes.jsxi:748
				}), 
				staticFields = staticMembers.filter (function (arg){               // do_classes.jsxi:749
					return !arg.method;                                            // do_classes.jsxi:749
				});
			
			constructor.id = null;                                                 // do_classes.jsxi:752
			initializer.id = null;                                                 // do_classes.jsxi:753
			
			if (!classEntry.params.abstract && filter (classEntry,                 // do_classes.jsxi:756
				function (arg){                                                    // do_classes.jsxi:756
					return arg.abstract;                                           // do_classes.jsxi:756
				}).length > 0)                                                     // do_classes.jsxi:756
				classEntry.params.abstract = true;                                 // do_classes.jsxi:757
			
			if (classEntry.params.abstract)                                        // do_classes.jsxi:760
				constructor.body.body.unshift (ifStatement (binaryExpression (memberExpression (thisExpression (), identifier ('constructor')), 
					'===',                                                         // do_classes.jsxi:763
					classEntry.id.name),                                           // do_classes.jsxi:763
				throwStatement (newExpression ('Error',                            // do_classes.jsxi:764
					[
						stringLiteralWithQuotes ('Trying to instantiate abstract class ' + classEntry.id.name)
					]))));
			
			var mode = classMode ();
			
			if (mode === OutputMode.Empty)                                         // do_classes.jsxi:772
				return [
					oneVariableDeclaration (classEntry.id.name, objectExpression ([]))
				];
			
			if (mode === OutputMode.InitializerOnly)                               // do_classes.jsxi:776
				return [
					oneVariableDeclaration (classEntry.id.name, callExpression (initializer))
				];
			
			var anonymousFunction = staticMembers.filter (function (arg){          // do_classes.jsxi:780
					return arg.publicMode === 'private';                           // do_classes.jsxi:780
				}).length > 0,                                                     // do_classes.jsxi:780
				result,                                                            // do_classes.jsxi:781
				mainObj;                                                           // do_classes.jsxi:782
			
			if (mode === OutputMode.Default){                                      // do_classes.jsxi:784
				result = [                                                         // do_classes.jsxi:786
					anonymousFunction ? oneVariableDeclaration (classEntry.id, constructor) : functionDeclaration (classEntry.id, constructor.params, constructor.body)
				];
				
				if (classEntry.dependsOn.parent)                                   // do_classes.jsxi:791
					result.push (expressionStatement (callExpression ('__prototypeExtend', 
						[ classEntry.id.name, classEntry.dependsOn.parent.id.name ])));
				
				for (var __n = 0; __n < objectFields.length; __n ++){              // do_classes.jsxi:795
					var field = objectFields [__n];
					
					{};
				}
				
				for (var __o = 0; __o < objectMethods.length; __o ++){             // do_classes.jsxi:798
					var method = objectMethods [__o];
					
					if (!method.abstract)                                          // do_classes.jsxi:799
						result.push (assignmentStatement (memberExpression (memberExpression (classEntry.id.name, 'prototype'), 
							method.id),                                            // do_classes.jsxi:801
						functionExpression (null, method.params, method.body)));   // do_classes.jsxi:802
				}
				
				for (var __p = 0; __p < staticFields.length; __p ++){              // do_classes.jsxi:806
					var field = staticFields [__p];
					
					if (field.publicMode === 'private')                            // do_classes.jsxi:807
						result [0].declarations.push (field);                      // do_classes.jsxi:808
					else
						result.push (assignmentStatement (memberExpression (classEntry.id.name, field.id), 
							field.init || 'undefined'));                           // do_classes.jsxi:810
				}
				
				for (var __q = 0; __q < staticMethods.length; __q ++){             // do_classes.jsxi:814
					var method = staticMethods [__q];
					
					if (method.publicMode === 'private')                           // do_classes.jsxi:815
						result.push (method);                                      // do_classes.jsxi:816
					else
						result.push (expressionStatement (assignmentExpression (memberExpression (classEntry.id.name, method.id), 
							functionExpression (null, method.params, method.body))));
				}
			} else {
				var properties = [];
				
				result = [                                                         // do_classes.jsxi:824
					oneVariableDeclaration (classEntry.id, objectExpression (properties))
				];
				
				for (var __r = 0; __r < staticFields.length; __r ++){              // do_classes.jsxi:827
					var field = staticFields [__r];
					
					if (field.publicMode === 'private')                            // do_classes.jsxi:828
						result [0].declarations.push (field);                      // do_classes.jsxi:829
					else
						properties.push (property (field.id, field.init || 'undefined'));
				}
				
				for (var __s = 0; __s < staticMethods.length; __s ++){             // do_classes.jsxi:835
					var method = staticMethods [__s];
					
					if (method.publicMode === 'private')                           // do_classes.jsxi:836
						result.push (method);                                      // do_classes.jsxi:837
					else
						properties.push (property (method.id,                      // do_classes.jsxi:839
							functionExpression (null, method.params, method.body)));
				}
			}
			
			if (initializer.body.body.length > 0)                                  // do_classes.jsxi:844
				result.push (expressionStatement (callExpression (initializer)));
			
			if (anonymousFunction){                                                // do_classes.jsxi:848
				result.push (returnStatement (classEntry.id.name));                // do_classes.jsxi:849
				return [
					oneVariableDeclaration (classEntry.id, callFunctionExpression (result))
				];
			}
			return result;                                                         // do_classes.jsxi:853
		}
		
		for (var __t = 0; __t < classes.length; __t ++){                           // do_classes.jsxi:856
			var classEntry = classes [__t];
			
			classEntry.statements = processClass (classEntry);                     // do_classes.jsxi:857
		}
	}
	
	function sortAndInsertClasses (){                                              // do_classes.jsxi:860
		var sorted = classes.sort (function (a, b){                                // do_classes.jsxi:861
			return b.weight - a.weight;                                            // do_classes.jsxi:861
		});
		
		for (var __u = 0; __u < sorted.length; __u ++){                            // do_classes.jsxi:862
			var current = sorted [__u];
			
			current.root.unshift ({                                                // do_classes.jsxi:863
				type: Syntax.ClassDeclaration,                                     // do_classes.jsxi:863
				name: current.id.name,                                             // do_classes.jsxi:865
				statements: current.statements
			});
		}
	}
	
	{
		var __10 = collectRawClasses (statements);
		
		for (var __v = 0; __v < __10.length; __v ++){
			var found = __10 [__v];
			
			addClass (found);                                                      // do_classes.jsxi:871
		}
		
		__10 = undefined;
	}
	
	if (classes.length > 0){                                                       // do_classes.jsxi:873
		preprocessClasses ();                                                      // do_classes.jsxi:874
		connectClasses ();                                                         // do_classes.jsxi:875
		processClassesMembers ();                                                  // do_classes.jsxi:876
		processClassesMethods ();                                                  // do_classes.jsxi:877
		processClasses ();                                                         // do_classes.jsxi:878
		sortAndInsertClasses ();                                                   // do_classes.jsxi:879
		callback (helpers.helpers);                                                // do_classes.jsxi:881
	} else
		callback ();                                                               // do_classes.jsxi:883
}

function HelpersManager (){                                                        // helpers.jsxi:1
	this.helpers = {};                                                             // helpers.jsxi:2
}

HelpersManager.prototype.set = function (key, arg){                                // helpers.jsxi:5
	if (!this.helpers.hasOwnProperty (key))                                        // helpers.jsxi:6
		this.helpers [key] = true;                                                 // helpers.jsxi:7
};
HelpersManager.prototype.get = function (key, arg){                                // helpers.jsxi:10
	return this.helpers;                                                           // helpers.jsxi:11
};

function helperById (id, mark){                                                    // helpers.jsxi:14
	switch (id){                                                                   // helpers.jsxi:15
		case 'prototypeExtend':                                                    // helpers.jsxi:16
			return functionDeclaration ('__prototypeExtend',                       // helpers.jsxi:17
				[ 'c', 'p', 't' ], 
				blockStatement ([                                                  // helpers.jsxi:17
					expressionStatement (assignmentExpression ('t',                // helpers.jsxi:17
						functionExpression (null, [], 
							blockStatement ([])))),                                // helpers.jsxi:18
					expressionStatement (assignmentExpression (memberExpression ('t', 'prototype'), 
						memberExpression ('p', 'prototype'))),                     // helpers.jsxi:20
					expressionStatement (assignmentExpression (memberExpression ('c', 'prototype'), newExpression ('t'))), 
					expressionStatement (assignmentExpression (memberExpression (memberExpression ('c', 'prototype'), 'constructor'), 
						'c'))
				]));
		case 'createArray':                                                        // helpers.jsxi:27
			return functionDeclaration ('__createArray',                           // helpers.jsxi:29
				[ 'from', 'to', 'result' ], 
				blockStatement ([                                                  // helpers.jsxi:29
					ifStatement (binaryExpression (unaryExpression ('from', 'typeof', true), 
						'===',                                                     // helpers.jsxi:31
						stringLiteralWithQuotes ('string')),                       // helpers.jsxi:31
					expressionStatement (assignmentExpression ('from',             // helpers.jsxi:32
						callExpression (memberExpression ('from', 'charCodeAt'), 
							[ numericLiteral (0) ])))), 
					ifStatement (binaryExpression (unaryExpression ('to', 'typeof', true), 
						'===',                                                     // helpers.jsxi:35
						stringLiteralWithQuotes ('string')),                       // helpers.jsxi:35
					expressionStatement (assignmentExpression ('to',               // helpers.jsxi:36
						callExpression (memberExpression ('to', 'charCodeAt'),     // helpers.jsxi:36
							[ numericLiteral (0) ])))), 
					expressionStatement (assignmentExpression ('result',           // helpers.jsxi:38
						newExpression ('Array',                                    // helpers.jsxi:38
							[
								binaryExpression (callExpression (memberExpression ('Math', 'abs'), 
									[ binaryExpression ('to', '-', 'from') ]), 
								'+',                                               // helpers.jsxi:39
								numericLiteral (1))
							]))), 
					ifStatement (binaryExpression ('from', '<', 'to'),             // helpers.jsxi:40
						forStatement (variableDeclaration ([ variableDeclarator ('i', numericLiteral (0)) ]), 
							binaryExpression ('i', '<', memberExpression ('result', 'length')), 
							unaryExpression ('i', '++'),                           // helpers.jsxi:45
							expressionStatement (assignmentExpression (memberExpression ('result', 'i', true), 
								binaryExpression ('i', '+', 'from')))),            // helpers.jsxi:46
						forStatement (variableDeclaration ([                       // helpers.jsxi:48
							variableDeclarator ('i',                               // helpers.jsxi:48
								binaryExpression (memberExpression ('result', 'length'), 
									'-',                                           // helpers.jsxi:49
									numericLiteral (1)))
						]), 
						binaryExpression ('i', '>=', numericLiteral (0)),          // helpers.jsxi:50
						unaryExpression ('i', '--'),                               // helpers.jsxi:51
						expressionStatement (assignmentExpression (memberExpression ('result', 'i', true), 
							binaryExpression ('from', '-', 'i'))))),               // helpers.jsxi:52
					returnStatement ('result')
				]));
		case 'bindOnce':                                                           // helpers.jsxi:58
			var bindedTable = memberExpression ('obj', '__bt'),                    // helpers.jsxi:59
				objectFunction = memberExpression ('obj', 'name', true),           // helpers.jsxi:60
				placeInTable = memberExpression (bindedTable, 'name', true);       // helpers.jsxi:61
			return functionDeclaration ('__bindOnce',                              // helpers.jsxi:63
				[ 'obj', 'name' ], 
				blockStatement ([                                                  // helpers.jsxi:63
					ifStatement (unaryExpression (callExpression (memberExpression ('obj', 'hasOwnProperty'), 
						[ stringLiteralWithQuotes ('__bindTable') ]), 
					'!',                                                           // helpers.jsxi:65
					true), 
					expressionStatement (assignmentExpression (bindedTable, objectExpression ([])))), 
					ifStatement (unaryExpression (callExpression (memberExpression (bindedTable, 'hasOwnProperty'), [ 'name' ]), 
						'!',                                                       // helpers.jsxi:69
						true), 
					expressionStatement (assignmentExpression (placeInTable,       // helpers.jsxi:70
						callExpression (memberExpression (objectFunction, 'bind'), [ 'obj' ])))), 
					returnStatement (placeInTable)
				]));
		default:
			console.assert (false, 'Wrong helper id: ' + id);                      // helpers.jsxi:76
	}
}

function doHelpers (helpers){                                                      // helpers.jsxi:79
	var result = [], temp;
	
	for (var id in helpers){                                                       // helpers.jsxi:83
		var value = helpers [id];
		
		if (value && typeof value !== 'function'){                                 // helpers.jsxi:84
			temp = helperById (id, value);                                         // helpers.jsxi:85
			result.push (temp);                                                    // helpers.jsxi:88
		}
	}
	return result;                                                                 // helpers.jsxi:91
}

var source;

var length;

var index;

var lineNumber;

var buffer;

var state;

var options;

var helpers;

function jsxParse (code, args, callback){                                          // jsx_parse.jsxi:29
	source = String (code).replace (/\r\n?/g, '\n') + '\n';                        // jsx_parse.jsxi:30
	length = source.length;                                                        // jsx_parse.jsxi:31
	index = 0;                                                                     // jsx_parse.jsxi:32
	lineNumber = source.length ? 1 : 0;                                            // jsx_parse.jsxi:33
	buffer = null;                                                                 // jsx_parse.jsxi:34
	state = {                                                                      // jsx_parse.jsxi:35
		allowIn: true,                                                             // jsx_parse.jsxi:35
		inClass: false,                                                            // jsx_parse.jsxi:35
		parsingComplete: false,                                                    // jsx_parse.jsxi:35
		preventSequence: false,                                                    // jsx_parse.jsxi:35
		asynchronous: false
	};
	options = args || {                                                            // jsx_parse.jsxi:36
		filename: '[ not a file ]',                                                // jsx_parse.jsxi:36
		insertReturn: false,                                                       // jsx_parse.jsxi:36
		initializationAllowed: false
	};
	helpers = new HelpersManager ();                                               // jsx_parse.jsxi:37
	
	var result = parseProgram ();
	
	source = (length = (index = (lineNumber = (buffer = (state = (options = null))))));
	
	if (typeof callback === 'function')                                            // jsx_parse.jsxi:49
		callback (result, helpers.helpers);                                        // jsx_parse.jsxi:50
	else
		return result;                                                             // jsx_parse.jsxi:52
}

var Token = {                                                                      // library.jsxi:6
		Punctuator: 0,                                                             // library.jsxi:6
		Identifier: 1,                                                             // library.jsxi:8
		Keyword: 2,                                                                // library.jsxi:9
		BooleanLiteral: 3,                                                         // library.jsxi:10
		NullLiteral: 4,                                                            // library.jsxi:11
		NumericLiteral: 5,                                                         // library.jsxi:12
		StringLiteral: 6,                                                          // library.jsxi:13
		UndefinedLiteral: 7,                                                       // library.jsxi:14
		EOF: 8
	}, 
	TokenName = [                                                                  // library.jsxi:17
		'Punctuator',                                                              // library.jsxi:17
		'Identifier',                                                              // library.jsxi:19
		'Keyword',                                                                 // library.jsxi:20
		'Boolean',                                                                 // library.jsxi:21
		'Null',                                                                    // library.jsxi:22
		'Numeric',                                                                 // library.jsxi:23
		'String',                                                                  // library.jsxi:24
		'Undefined',                                                               // library.jsxi:25
		'<end>'
	], 
	Syntax = {                                                                     // library.jsxi:28
		AssignmentExpression: 'AssignmentExpression',                              // library.jsxi:28
		ArrayExpression: 'ArrayExpression',                                        // library.jsxi:30
		BlockStatement: 'BlockStatement',                                          // library.jsxi:31
		BinaryExpression: 'BinaryExpression',                                      // library.jsxi:32
		BreakStatement: 'BreakStatement',                                          // library.jsxi:33
		CallExpression: 'CallExpression',                                          // library.jsxi:34
		CatchClause: 'CatchClause',                                                // library.jsxi:35
		ConditionalExpression: 'ConditionalExpression',                            // library.jsxi:36
		ContinueStatement: 'ContinueStatement',                                    // library.jsxi:37
		DoWhileStatement: 'DoWhileStatement',                                      // library.jsxi:38
		DebuggerStatement: 'DebuggerStatement',                                    // library.jsxi:39
		EmptyStatement: 'EmptyStatement',                                          // library.jsxi:40
		ExpressionStatement: 'ExpressionStatement',                                // library.jsxi:41
		ForStatement: 'ForStatement',                                              // library.jsxi:42
		ForInStatement: 'ForInStatement',                                          // library.jsxi:43
		FunctionDeclaration: 'FunctionDeclaration',                                // library.jsxi:44
		FunctionExpression: 'FunctionExpression',                                  // library.jsxi:45
		Identifier: 'Identifier',                                                  // library.jsxi:46
		IfStatement: 'IfStatement',                                                // library.jsxi:47
		LabeledStatement: 'LabeledStatement',                                      // library.jsxi:48
		LogicalExpression: 'LogicalExpression',                                    // library.jsxi:49
		MemberExpression: 'MemberExpression',                                      // library.jsxi:50
		NewExpression: 'NewExpression',                                            // library.jsxi:51
		ObjectExpression: 'ObjectExpression',                                      // library.jsxi:52
		Program: 'Program',                                                        // library.jsxi:53
		Property: 'Property',                                                      // library.jsxi:54
		ReturnStatement: 'ReturnStatement',                                        // library.jsxi:55
		SequenceExpression: 'SequenceExpression',                                  // library.jsxi:56
		SwitchStatement: 'SwitchStatement',                                        // library.jsxi:57
		SwitchCase: 'SwitchCase',                                                  // library.jsxi:58
		ThisExpression: 'ThisExpression',                                          // library.jsxi:59
		ThrowStatement: 'ThrowStatement',                                          // library.jsxi:60
		TryStatement: 'TryStatement',                                              // library.jsxi:61
		UnaryExpression: 'UnaryExpression',                                        // library.jsxi:62
		VariableDeclaration: 'VariableDeclaration',                                // library.jsxi:63
		VariableDeclarator: 'VariableDeclarator',                                  // library.jsxi:64
		WhileStatement: 'WhileStatement',                                          // library.jsxi:65
		WithStatement: 'WithStatement',                                            // library.jsxi:66
		BooleanLiteral: 'BooleanLiteral',                                          // library.jsxi:68
		NullLiteral: 'NullLiteral',                                                // library.jsxi:69
		NumericLiteral: 'NumericLiteral',                                          // library.jsxi:70
		RegexpLiteral: 'RegexpLiteral',                                            // library.jsxi:71
		StringLiteral: 'StringLiteral',                                            // library.jsxi:72
		UndefinedLiteral: 'UndefinedLiteral',                                      // library.jsxi:73
		NotImplementedStatement: 'NotImplementedStatement',                        // library.jsxi:75
		ClassDeclaration: 'ClassDeclaration',                                      // library.jsxi:76
		RawClassDeclaration: 'RawClassDeclaration'
	};

function identifier (arg){                                                         // objects.jsxi:1
	return typeof arg === 'string' ? { type: Syntax.Identifier, name: arg } : arg || null;
}

function booleanLiteral (value){                                                   // objects.jsxi:8
	console.assert (value === 'true' || value === 'false', 'bad boolean literal');
	return { type: Syntax.BooleanLiteral, value: value };
}

function nullLiteral (){                                                           // objects.jsxi:17
	return { type: Syntax.NullLiteral, value: 'null' };
}

function numericLiteral (value){                                                   // objects.jsxi:24
	if (typeof value === 'number')                                                 // objects.jsxi:25
		value = String (value);                                                    // objects.jsxi:26
	
	console.assert (typeof value === 'string', 'bad numeric literal');             // objects.jsxi:28
	return { type: Syntax.NumericLiteral, value: value };
}

function regexpLiteral (value){                                                    // objects.jsxi:36
	console.assert (typeof value === 'string', 'bad regexp literal');              // objects.jsxi:37
	return { type: Syntax.RegexpLiteral, value: value };
}

function stringLiteral (value){                                                    // objects.jsxi:45
	console.assert (typeof value === 'string' && value.length > 1 && (value [0] === '\'' || value [0] === '"') && value [0] === value [value.length - 1], 
		'bad string literal');                                                     // objects.jsxi:46
	return { type: Syntax.StringLiteral, value: value };
}

function stringLiteralWithQuotes (value){                                          // objects.jsxi:54
	return stringLiteral ('\'' + value.replace (/(^|[^\\])'/g, '$1\\\'') + '\'');
}

function stringLiteralValue (literal){                                             // objects.jsxi:59
	console.assert (literal.value.length >= 2, 'Bad literal');                     // objects.jsxi:61
	return literal.value.slice (1, - 1);                                           // objects.jsxi:62
}

function stringLiteralEmpty (literal){                                             // objects.jsxi:65
	console.assert (literal.value.length >= 2, 'Bad literal');                     // objects.jsxi:67
	return literal.value.length === 2;                                             // objects.jsxi:68
}

function undefinedLiteral (){                                                      // objects.jsxi:71
	return { type: Syntax.UndefinedLiteral, value: 'undefined' };
}

function property (key, value, kind){                                              // objects.jsxi:78
	if (kind === undefined)                                                        // objects.jsxi:78
		kind = 'init';                                                             // objects.jsxi:78

	return {
		type: Syntax.Property,                                                     // objects.jsxi:80
		key: identifier (key),                                                     // objects.jsxi:81
		value: identifier (value),                                                 // objects.jsxi:82
		kind: kind
	};
}

function objectExpression (properties){                                            // objects.jsxi:87
	return { type: Syntax.ObjectExpression, properties: properties };
}

function memberExpression (obj, property, computed){                               // objects.jsxi:94
	if (computed === undefined)                                                    // objects.jsxi:94
		computed = false;                                                          // objects.jsxi:94

	return {
		type: Syntax.MemberExpression,                                             // objects.jsxi:96
		computed: computed,                                                        // objects.jsxi:97
		object: identifier (obj),                                                  // objects.jsxi:98
		property: identifier (property)
	};
}

function callExpression (name, arguments){                                         // objects.jsxi:103
	if (arguments === undefined)                                                   // objects.jsxi:103
		arguments = [];                                                            // objects.jsxi:103

	if (name && name.type === Syntax.MemberExpression && name.property.type === Syntax.Identifier && name.object.type === Syntax.MemberExpression && name.object.property.type === Syntax.Identifier && (name.property.name === 'call' || name.property.name === 'apply')){
		var obj = name.object.object;
		
		if (obj.type === Syntax.ArrayExpression && obj.elements.length === 0)      // objects.jsxi:113
			name.object.object = memberExpression ('Array', 'prototype');          // objects.jsxi:114
		else if (obj.type === Syntax.ObjectExpression && obj.properties.length === 0)
			name.object.object = memberExpression ('Object', 'prototype');         // objects.jsxi:117
	}
	return {
		type: Syntax.CallExpression,                                               // objects.jsxi:121
		callee: identifier (name),                                                 // objects.jsxi:122
		arguments: arguments.map (identifier)
	};
}

function superExpression (name, args, level){                                      // objects.jsxi:127
	return {
		type: Syntax.CallExpression,                                               // objects.jsxi:129
		callee: identifier (name),                                                 // objects.jsxi:130
		arguments: args || null,                                                   // objects.jsxi:131
		'super': level || 1
	};
}

function thisExpression (){                                                        // objects.jsxi:136
	return { type: Syntax.ThisExpression };
}

function arrayExpression (elements){                                               // objects.jsxi:142
	return { type: Syntax.ArrayExpression, elements: elements };
}

function assignmentExpression (left, operator, right){                             // objects.jsxi:149
	return typeof operator !== 'string' || operator [operator.length - 1] !== '=' ? {
		type: Syntax.AssignmentExpression,                                         // objects.jsxi:150
		operator: '=',                                                             // objects.jsxi:152
		left: identifier (left),                                                   // objects.jsxi:153
		right: identifier (operator)
	} : {
		type: Syntax.AssignmentExpression,                                         // objects.jsxi:156
		operator: operator,                                                        // objects.jsxi:157
		left: identifier (left),                                                   // objects.jsxi:158
		right: identifier (right)
	};
}

function newExpression (callee, args){                                             // objects.jsxi:163
	if (args === undefined)                                                        // objects.jsxi:163
		args = [];                                                                 // objects.jsxi:163

	return {
		type: Syntax.NewExpression,                                                // objects.jsxi:165
		callee: identifier (callee),                                               // objects.jsxi:166
		arguments: args.map (identifier)
	};
}

function sequenceExpression (expressions){                                         // objects.jsxi:171
	return { type: Syntax.SequenceExpression, expressions: expressions };
}

function conditionalExpression (test, trueExpression, falseExpression){            // objects.jsxi:178
	return {
		type: Syntax.ConditionalExpression,                                        // objects.jsxi:180
		test: test,                                                                // objects.jsxi:181
		consequent: identifier (trueExpression),                                   // objects.jsxi:182
		alternate: identifier (falseExpression)
	};
}

function logicalExpression (left, operator, right){                                // objects.jsxi:187
	return {
		type: Syntax.LogicalExpression,                                            // objects.jsxi:189
		operator: operator,                                                        // objects.jsxi:190
		left: identifier (left),                                                   // objects.jsxi:191
		right: identifier (right)
	};
}

function binaryExpression (left, operator, right){                                 // objects.jsxi:196
	return {
		type: Syntax.BinaryExpression,                                             // objects.jsxi:198
		operator: operator,                                                        // objects.jsxi:199
		left: identifier (left),                                                   // objects.jsxi:200
		right: identifier (right)
	};
}

function unaryExpression (argument, operator, prefix){                             // objects.jsxi:205
	if (prefix === undefined)                                                      // objects.jsxi:205
		prefix = false;                                                            // objects.jsxi:205

	return {
		type: Syntax.UnaryExpression,                                              // objects.jsxi:207
		operator: operator,                                                        // objects.jsxi:208
		argument: identifier (argument),                                           // objects.jsxi:209
		prefix: prefix
	};
}

function blockStatement (body, single){                                            // objects.jsxi:214
	if (body === undefined)                                                        // objects.jsxi:214
		body = [];                                                                 // objects.jsxi:214

	return body instanceof Array ? { type: Syntax.BlockStatement, body: body, single: single } : body;
}

function expressionStatement (expression){                                         // objects.jsxi:223
	return { type: Syntax.ExpressionStatement, expression: expression };
}

function ifStatement (test, consequent, alternate){                                // objects.jsxi:230
	if (alternate === undefined)                                                   // objects.jsxi:230
		alternate = null;                                                          // objects.jsxi:230

	return {
		type: Syntax.IfStatement,                                                  // objects.jsxi:232
		test: identifier (test),                                                   // objects.jsxi:233
		consequent: consequent,                                                    // objects.jsxi:234
		alternate: alternate
	};
}

function whileStatement (test, body){                                              // objects.jsxi:239
	return { type: Syntax.WhileStatement, test: test, body: body };
}

function doWhileStatement (body, test){                                            // objects.jsxi:247
	return { type: Syntax.DoWhileStatement, body: body, test: test };
}

function doWhileStatement (body, test){                                            // objects.jsxi:255
	return { type: Syntax.DoWhileStatement, body: body, test: test };
}

function forStatement (left, test, update, body){                                  // objects.jsxi:263
	return {
		type: Syntax.ForStatement,                                                 // objects.jsxi:265
		init: left,                                                                // objects.jsxi:266
		test: test,                                                                // objects.jsxi:267
		update: update,                                                            // objects.jsxi:268
		body: blockStatement (body)
	};
}

function forInStatement (left, right, body){                                       // objects.jsxi:273
	return {
		type: Syntax.ForInStatement,                                               // objects.jsxi:275
		left: left,                                                                // objects.jsxi:276
		right: right,                                                              // objects.jsxi:277
		body: body,                                                                // objects.jsxi:278
		each: false
	};
}

function labeledStatement (label, statement){                                      // objects.jsxi:283
	return {
		type: Syntax.LabeledStatement,                                             // objects.jsxi:285
		label: identifier (label),                                                 // objects.jsxi:286
		body: statement
	};
}

function catchClause (param, body){                                                // objects.jsxi:291
	return {
		type: Syntax.CatchClause,                                                  // objects.jsxi:293
		param: identifier (param),                                                 // objects.jsxi:294
		body: body
	};
}

function tryStatement (block, handlers, finalizer){                                // objects.jsxi:299
	return {
		type: Syntax.TryStatement,                                                 // objects.jsxi:301
		block: block,                                                              // objects.jsxi:302
		guardedHandlers: [],                                                       // objects.jsxi:303
		handlers: handlers,                                                        // objects.jsxi:304
		finalizer: finalizer
	};
}

function returnStatement (arg){                                                    // objects.jsxi:309
	return { type: Syntax.ReturnStatement, argument: identifier (arg) };
}

function throwStatement (arg){                                                     // objects.jsxi:316
	return { type: Syntax.ThrowStatement, argument: identifier (arg) };
}

function breakStatement (arg){                                                     // objects.jsxi:323
	return { type: Syntax.BreakStatement, label: identifier (arg) };
}

function continueStatement (arg){                                                  // objects.jsxi:330
	return { type: Syntax.ContinueStatement, label: identifier (arg) };
}

function debuggerStatement (){                                                     // objects.jsxi:337
	return { type: Syntax.DebuggerStatement };
}

function functionExpression (name, params, body){                                  // objects.jsxi:343
	return {
		type: Syntax.FunctionExpression,                                           // objects.jsxi:345
		id: identifier (name),                                                     // objects.jsxi:346
		params: params.map (identifier),                                           // objects.jsxi:347
		body: body
	};
}

function functionDeclaration (name, params, body){                                 // objects.jsxi:352
	return {
		type: Syntax.FunctionDeclaration,                                          // objects.jsxi:354
		id: identifier (name),                                                     // objects.jsxi:355
		params: params.map (identifier),                                           // objects.jsxi:356
		body: body
	};
}

function variableDeclarator (id, value){                                           // objects.jsxi:361
	return {
		type: Syntax.VariableDeclarator,                                           // objects.jsxi:363
		id: identifier (id),                                                       // objects.jsxi:364
		init: identifier (value)
	};
}

function variableDeclaration (variables){                                          // objects.jsxi:369
	return {
		type: Syntax.VariableDeclaration,                                          // objects.jsxi:371
		declarations: identifier (variables)
	};
}

function callFunctionExpression (body){                                            // objects.jsxi:376
	return callExpression (functionExpression (null,                               // objects.jsxi:377
		[], 
		body instanceof Array ? blockStatement (body) : body),                     // objects.jsxi:377
	[]);
}

function oneVariableDeclaration (id, init){                                        // objects.jsxi:380
	return variableDeclaration ([ variableDeclarator (id, init) ]);                // objects.jsxi:381
}

function assignmentStatement (left, right){                                        // objects.jsxi:384
	return expressionStatement (assignmentExpression (left, right));               // objects.jsxi:385
}

function parseClassParams (){                                                      // parse_class.jsxi:1
	var token,                                                                     // parse_class.jsxi:7
		result = {                                                                 // parse_class.jsxi:8
			publicMode: null,                                                      // parse_class.jsxi:8
			abstract: false,                                                       // parse_class.jsxi:10
			static: false,                                                         // parse_class.jsxi:11
			interface: false,                                                      // parse_class.jsxi:12
			partial: false
		};
	
	loop: do {                                                                     // parse_class.jsxi:16
		token = lex ();                                                            // parse_class.jsxi:17
		
		switch (token.value){                                                      // parse_class.jsxi:19
			case 'public':                                                         // parse_class.jsxi:20
				
			case 'private':                                                        // parse_class.jsxi:21
				
			case 'protected':                                                      // parse_class.jsxi:22
				if (result.publicMode !== null)                                    // parse_class.jsxi:23
					unexpected (token);                                            // parse_class.jsxi:24
				
				result.publicMode = token.value;                                   // parse_class.jsxi:25
				
				break;
			case 'partial':                                                        // parse_class.jsxi:28
				if (result.partial)                                                // parse_class.jsxi:29
					unexpected (token);                                            // parse_class.jsxi:30
				
				result.partial = true;                                             // parse_class.jsxi:31
				
				break;
			case 'abstract':                                                       // parse_class.jsxi:34
				
			case 'static':                                                         // parse_class.jsxi:35
				if (result.static || result.abstract)                              // parse_class.jsxi:36
					unexpected (token);                                            // parse_class.jsxi:37
				
				result [token.value] = true;                                       // parse_class.jsxi:38
				
				break;
			case 'interface':                                                      // parse_class.jsxi:41
				if (result.abstract)                                               // parse_class.jsxi:42
					unexpected (token);                                            // parse_class.jsxi:43
				
				result.interface = token.value;                                    // parse_class.jsxi:44
			case 'class':                                                          // parse_class.jsxi:46
				break loop;                                                        // parse_class.jsxi:47
			default:
				unexpected (token);                                                // parse_class.jsxi:50
		}
	} while (index < length);                                                      // parse_class.jsxi:52
	
	if (result.publicMode === null)                                                // parse_class.jsxi:54
		result.publicMode = 'private';                                             // parse_class.jsxi:55
	return result;                                                                 // parse_class.jsxi:57
}

function parseExtendsImplementsAndUses (mode){                                     // parse_class.jsxi:60
	function collect (list){                                                       // parse_class.jsxi:64
		if (list === undefined)                                                    // parse_class.jsxi:64
			list = [];                                                             // parse_class.jsxi:64
	
		do
			list.push (parseIdentifier ());                                        // parse_class.jsxi:66
		while (index < length && matchLex (','));                                  // parse_class.jsxi:67
		return list;                                                               // parse_class.jsxi:68
	}
	
	var result = { parent: null, implements: [], uses: [] };
	
	while (!match ('{')){                                                          // parse_class.jsxi:73
		if (!result.parent && !mode.interface && !mode.static && matchKeywordLex ('extends')){
			helpers.set ('prototypeExtend');                                       // parse_class.jsxi:75
			result.parent = parseIdentifier ();                                    // parse_class.jsxi:76
		} else if (matchKeywordLex ('implements')){                                // parse_class.jsxi:77
			collect (result.implements);                                           // parse_class.jsxi:78
		} else if (matchKeywordLex ('uses')){                                      // parse_class.jsxi:79
			collect (result.uses);                                                 // parse_class.jsxi:80
		} else
			unexpected ();                                                         // parse_class.jsxi:82
	}
	return result;                                                                 // parse_class.jsxi:85
}

function parseClassMembers (params, dependsOn){                                    // parse_class.jsxi:88
	var oldInClass = state.inClass, token, current, result = {};
	
	function refresh (){                                                           // parse_class.jsxi:94
		return current = { publicMode: null, static: params.static };              // parse_class.jsxi:95
	}
	
	function set (obj){                                                            // parse_class.jsxi:97
		if (result.hasOwnProperty (obj.id.name))                                   // parse_class.jsxi:98
			throw new SyntaxError ('Member "' + obj.id.name + '" already declared', token);
		
		obj.publicMode = current.publicMode || params.publicMode;                  // parse_class.jsxi:101
		obj.static = current.static;                                               // parse_class.jsxi:102
		obj.abstract = current.abstract;                                           // parse_class.jsxi:103
		result [obj.id.name] = obj;                                                // parse_class.jsxi:105
	}
	
	function parseField (){                                                        // parse_class.jsxi:108
		if (params.interface && !current.static)                                   // parse_class.jsxi:109
			throw new TypeError ('Interface cannot have object fields');           // parse_class.jsxi:110
		
		if (current.abstract && (current.publicMode || params.publicMode) === 'private')
			throw new TypeError ('Abstract member cannot be private');             // parse_class.jsxi:113
		
		{
			var __12 = parseVariableDeclarators ();
			
			for (var __11 = 0; __11 < __12.length; __11 ++){
				var entry = __12 [__11];
				
				set (entry);                                                       // parse_class.jsxi:116
			}
			
			__12 = undefined;
		}
		
		refresh ();                                                                // parse_class.jsxi:118
	}
	
	function parseMethod (){                                                       // parse_class.jsxi:121
		if (current.abstract && (current.publicMode || params.publicMode) === 'private')
			throw new TypeError ('Abstract member cannot be private');             // parse_class.jsxi:123
		
		state.superAvailable = !current.static && dependsOn.parent;                // parse_class.jsxi:125
		set (parseFunction ({                                                      // parse_class.jsxi:126
			keyword: null,                                                         // parse_class.jsxi:126
			empty: params.interface && !current.static || current.abstract
		}));
		state.superAvailable = false;                                              // parse_class.jsxi:127
		refresh ();                                                                // parse_class.jsxi:129
	}
	
	function parseInitializerOrConstructor (){                                     // parse_class.jsxi:132
		if (current.publicMode)                                                    // parse_class.jsxi:133
			throw new TypeError ('Constructor or initializer cannot have overrided visibility');
		
		if (current.abstract)                                                      // parse_class.jsxi:136
			throw new TypeError ('Constructor or initializer cannot be abstract');
		
		state.superAvailable = !current.static && dependsOn.parent;                // parse_class.jsxi:139
		state.noReturn = true;                                                     // parse_class.jsxi:140
		
		var result = parseFunction ({ keyword: null, id: false, optionalParams: true });
		
		result.id = identifier (current.static ? '@initializer' : '@constructor');
		state.superAvailable = false;                                              // parse_class.jsxi:145
		state.noReturn = false;                                                    // parse_class.jsxi:146
		set (result);                                                              // parse_class.jsxi:148
		refresh ();                                                                // parse_class.jsxi:149
	}
	
	state.inClass = true;                                                          // parse_class.jsxi:152
	expect ('{');                                                                  // parse_class.jsxi:153
	refresh ();                                                                    // parse_class.jsxi:154
	
	while (!matchLex ('}')){                                                       // parse_class.jsxi:156
		token = lookahead ();                                                      // parse_class.jsxi:157
		
		switch (token.value){                                                      // parse_class.jsxi:159
			case 'private':                                                        // parse_class.jsxi:160
				
			case 'public':                                                         // parse_class.jsxi:161
				
			case 'protected':                                                      // parse_class.jsxi:162
				if (current.publicMode !== null)                                   // parse_class.jsxi:163
					unexpected (token);                                            // parse_class.jsxi:164
				
				lex ();                                                            // parse_class.jsxi:165
				current.publicMode = token.value;                                  // parse_class.jsxi:166
				
				break;
			case 'abstract':                                                       // parse_class.jsxi:169
				if (params.interface)                                              // parse_class.jsxi:170
					unexpected (token);                                            // parse_class.jsxi:171
			case 'static':                                                         // parse_class.jsxi:173
				if (current.abstract || current.static)                            // parse_class.jsxi:174
					unexpected (token);                                            // parse_class.jsxi:175
				
				lex ();                                                            // parse_class.jsxi:176
				current [token.value] = true;                                      // parse_class.jsxi:177
				
				break;
			case 'var':                                                            // parse_class.jsxi:180
				lex ();                                                            // parse_class.jsxi:181
				parseField ();                                                     // parse_class.jsxi:182
				
				break;
			case 'function':                                                       // parse_class.jsxi:185
				lex ();                                                            // parse_class.jsxi:186
				parseMethod ();                                                    // parse_class.jsxi:187
				
				break;
			case '(':                                                              // parse_class.jsxi:190
				
			case '{':                                                              // parse_class.jsxi:191
				parseInitializerOrConstructor ();                                  // parse_class.jsxi:192
				
				break;
			default:
				if (token.type === Token.Identifier){                              // parse_class.jsxi:196
					var saved = saveAll (), method;
					
					lex ();                                                        // parse_class.jsxi:200
					method = match ('(');                                          // parse_class.jsxi:201
					restoreAll (saved);                                            // parse_class.jsxi:202
					
					if (method)                                                    // parse_class.jsxi:204
						parseMethod ();                                            // parse_class.jsxi:205
					else
						parseField ();                                             // parse_class.jsxi:207
				} else
					unexpected (token);                                            // parse_class.jsxi:209
		}
	}
	
	state.inClass = oldInClass;                                                    // parse_class.jsxi:213
	return result;                                                                 // parse_class.jsxi:214
}

function parseClassDeclaration (){                                                 // parse_class.jsxi:217
	var params = parseClassParams (),                                              // parse_class.jsxi:218
		id = parseIdentifier (),                                                   // parse_class.jsxi:219
		dependsOn = parseExtendsImplementsAndUses (params),                        // parse_class.jsxi:220
		members = parseClassMembers (params, dependsOn);                           // parse_class.jsxi:221
	return {
		type: Syntax.RawClassDeclaration,                                          // parse_class.jsxi:224
		id: id,                                                                    // parse_class.jsxi:225
		params: params,                                                            // parse_class.jsxi:226
		dependsOn: dependsOn,                                                      // parse_class.jsxi:227
		members: members
	};
}

function parseArrayPerlInitializer (elements){                                     // parse_expressions.jsxi:1
	var maxCountForInline = 10,                                                    // parse_expressions.jsxi:2
		firstElement = elements [0],                                               // parse_expressions.jsxi:3
		secondElement = parseAssignmentExpression (),                              // parse_expressions.jsxi:4
		from,                                                                      // parse_expressions.jsxi:5
		to,                                                                        // parse_expressions.jsxi:5
		delta,                                                                     // parse_expressions.jsxi:5
		chars;                                                                     // parse_expressions.jsxi:5
	
	expect (']');                                                                  // parse_expressions.jsxi:7
	
	if (firstElement.type === Syntax.NumericLiteral && secondElement.type === Syntax.NumericLiteral){
		from = + firstElement.value;                                               // parse_expressions.jsxi:10
		to = + secondElement.value;                                                // parse_expressions.jsxi:11
	} else if (firstElement.type === Syntax.StringLiteral && secondElement.type === Syntax.StringLiteral){
		from = stringLiteralValue (firstElement);                                  // parse_expressions.jsxi:14
		to = stringLiteralValue (secondElement);                                   // parse_expressions.jsxi:15
		
		if (from === null || from.length > 1)                                      // parse_expressions.jsxi:17
			unexpected (firstElement);                                             // parse_expressions.jsxi:18
		
		if (to === null || to.length > 1)                                          // parse_expressions.jsxi:20
			unexpected (secondElement);                                            // parse_expressions.jsxi:21
		
		from = from.charCodeAt (0);                                                // parse_expressions.jsxi:23
		to = to.charCodeAt (0);                                                    // parse_expressions.jsxi:24
		chars = true;                                                              // parse_expressions.jsxi:25
	}
	
	if (from !== undefined && Math.abs (from - to) < maxCountForInline){           // parse_expressions.jsxi:28
		delta = from < to ? 1 : - 1;                                               // parse_expressions.jsxi:29
		
		while (from !== to){                                                       // parse_expressions.jsxi:31
			from += delta;                                                         // parse_expressions.jsxi:32
			elements.push (chars ? stringLiteralWithQuotes (String.fromCharCode (from)) : numericLiteral (from));
		}
		return arrayExpression (elements);                                         // parse_expressions.jsxi:36
	} else {
		helpers.set ('createArray', firstElement);                                 // parse_expressions.jsxi:38
		return callExpression ('__createArray', [ firstElement, secondElement ]);
	}
}

function parseArrayInitialiser (){                                                 // parse_expressions.jsxi:43
	var elements = [], comma = {};
	
	expect ('[');                                                                  // parse_expressions.jsxi:46
	
	while (!matchLex (']'))                                                        // parse_expressions.jsxi:48
		if (match (',')){                                                          // parse_expressions.jsxi:49
			parseOptionalComma (comma);                                            // parse_expressions.jsxi:50
			elements.push (null);                                                  // parse_expressions.jsxi:51
		} else {
			elements.push (parseAssignmentExpression ());                          // parse_expressions.jsxi:53
			
			if (elements.length === 1 && matchLex ('..'))                          // parse_expressions.jsxi:55
				return parseArrayPerlInitializer (elements);                       // parse_expressions.jsxi:56
			
			if (!match (']'))                                                      // parse_expressions.jsxi:58
				parseOptionalComma (comma);                                        // parse_expressions.jsxi:59
		}
	return arrayExpression (elements);                                             // parse_expressions.jsxi:62
}

function parsePropertyFunction (param, first){                                     // parse_expressions.jsxi:65
	return {
		type: Syntax.FunctionExpression,                                           // parse_expressions.jsxi:67
		id: null,                                                                  // parse_expressions.jsxi:68
		params: param,                                                             // parse_expressions.jsxi:69
		body: parseFunctionElements ()
	};
}

function parseObjectPropertyKey (){                                                // parse_expressions.jsxi:73
	var token = lex ();
	return mark (token.type === Token.StringLiteral ? { type: Syntax.StringLiteral, value: token.value } : { type: Syntax.Identifier, name: token.value }, 
		token);                                                                    // parse_expressions.jsxi:76
}

function parseObjectProperty (){                                                   // parse_expressions.jsxi:79
	var token = lookahead (), key;
	
	if (token.type === Token.EOF || token.type === Token.Punctuator){              // parse_expressions.jsxi:82
		unexpected (token);                                                        // parse_expressions.jsxi:83
	} else {
		key = parseObjectPropertyKey ();                                           // parse_expressions.jsxi:85
		expect (':');                                                              // parse_expressions.jsxi:86
		return {
			type: Syntax.Property,                                                 // parse_expressions.jsxi:88
			key: key,                                                              // parse_expressions.jsxi:89
			value: parseAssignmentExpression ()
		};
	}
}

function parseObjectContent (){                                                    // parse_expressions.jsxi:95
	var properties = [], property, name, kind, map = {}, comma = {};
	
	while (!match ('}')){                                                          // parse_expressions.jsxi:98
		if (properties.length){                                                    // parse_expressions.jsxi:99
			parseOptionalComma (comma);                                            // parse_expressions.jsxi:100
			
			if (match ('}'))                                                       // parse_expressions.jsxi:102
				break;
		}
		
		properties.push (parseObjectProperty ());                                  // parse_expressions.jsxi:106
	}
	return properties;                                                             // parse_expressions.jsxi:109
}

function parseObjectInitialiser (){                                                // parse_expressions.jsxi:112
	expect ('{');                                                                  // parse_expressions.jsxi:113
	
	var result = parseObjectContent ();
	
	expect ('}');                                                                  // parse_expressions.jsxi:115
	return objectExpression (result);                                              // parse_expressions.jsxi:116
}

function parseNonComputedProperty (){                                              // parse_expressions.jsxi:119
	var token = lex ();
	
	if (token.type !== Token.Identifier && token.type !== Token.Keyword && token.type !== Token.BooleanLiteral && token.type !== Token.NullLiteral)
		unexpected (token);                                                        // parse_expressions.jsxi:122
	return mark ({ type: Syntax.Identifier, name: token.value }, token);           // parse_expressions.jsxi:123
}

function parseNonComputedMember (){                                                // parse_expressions.jsxi:126
	expect ('.');                                                                  // parse_expressions.jsxi:127
	return parseNonComputedProperty ();                                            // parse_expressions.jsxi:128
}

function parseComputedMember (){                                                   // parse_expressions.jsxi:131
	expect ('[');                                                                  // parse_expressions.jsxi:132
	
	var temp = parseExpression ();
	
	expect (']');                                                                  // parse_expressions.jsxi:134
	return temp;                                                                   // parse_expressions.jsxi:135
}

function parseNewExpression (){                                                    // parse_expressions.jsxi:138
	expectKeyword ('new');                                                         // parse_expressions.jsxi:139
	
	var result = newExpression (parseLeftHandSideExpression (),                    // parse_expressions.jsxi:140
		match ('(') ? parseArguments () : []);                                     // parse_expressions.jsxi:140
	return result;                                                                 // parse_expressions.jsxi:146
}

function parseSuperExpression (){                                                  // parse_expressions.jsxi:149
	var level = 1, name = null;
	
	expectKeyword ('super');                                                       // parse_expressions.jsxi:152
	
	if (!state.superAvailable)                                                     // parse_expressions.jsxi:154
		throw new TypeError ('Super can be used in class functions only');         // parse_expressions.jsxi:155
	
	while (matchLex ('.')){                                                        // parse_expressions.jsxi:157
		if (matchKeywordLex ('super')){                                            // parse_expressions.jsxi:158
			level ++;                                                              // parse_expressions.jsxi:159
		} else {
			name = parseIdentifier ();                                             // parse_expressions.jsxi:161
			
			break;
		}
	}
	return superExpression (name, match ('(') ? parseArguments () : null, level);
}

function parseLeftHandSideExpressionTemp (){                                       // parse_expressions.jsxi:169
	return matchKeyword ('new') ? parseNewExpression () : matchKeyword ('super') ? parseSuperExpression () : parsePrimaryExpression ();
}

function parseLeftHandSideExpressionAllowCall (){                                  // parse_expressions.jsxi:172
	var expression = parseLeftHandSideExpressionTemp (), token;
	
	while (index < length){                                                        // parse_expressions.jsxi:175
		token = lookahead ();                                                      // parse_expressions.jsxi:176
		
		if (token.value === '('){                                                  // parse_expressions.jsxi:178
			expression = callExpression (expression, parseArguments ());           // parse_expressions.jsxi:179
		} else if (token.value === '['){                                           // parse_expressions.jsxi:180
			expression = memberExpression (expression, parseComputedMember (), true);
		} else if (token.value === '.' && source [token.range [0] + 1] !== '.'){   // parse_expressions.jsxi:182
			expression = memberExpression (expression, parseNonComputedMember (), false);
		} else
			break;
	}
	return expression;                                                             // parse_expressions.jsxi:188
}

function parseLeftHandSideExpression (){                                           // parse_expressions.jsxi:191
	var expression = parseLeftHandSideExpressionTemp ();
	
	while (match ('.') || match ('['))                                             // parse_expressions.jsxi:194
		if (match ('['))                                                           // parse_expressions.jsxi:195
			expression = memberExpression (expression, parseComputedMember (), true);
		else
			expression = memberExpression (expression, parseNonComputedMember (), false);
	return expression;                                                             // parse_expressions.jsxi:200
}

function parseMultiplicativeExpression (){                                         // parse_expressions.jsxi:203
	var expression = parseUnaryExpression ();
	
	while (match ('*') || match ('/') || match ('%'))                              // parse_expressions.jsxi:206
		expression = binaryExpression (expression, lex ().value, parseUnaryExpression ());
	return expression;                                                             // parse_expressions.jsxi:209
}

function parseAdditiveExpression (){                                               // parse_expressions.jsxi:212
	var expression = parseMultiplicativeExpression ();
	
	while (match ('+') || match ('-'))                                             // parse_expressions.jsxi:215
		expression = binaryExpression (expression, lex ().value, parseMultiplicativeExpression ());
	return expression;                                                             // parse_expressions.jsxi:218
}

function parseShiftExpression (){                                                  // parse_expressions.jsxi:221
	var expression = parseAdditiveExpression ();
	
	while (match ('<<') || match ('>>') || match ('>>>'))                          // parse_expressions.jsxi:224
		expression = binaryExpression (expression, lex ().value, parseAdditiveExpression ());
	return expression;                                                             // parse_expressions.jsxi:227
}

function parseRelationalExpression (){                                             // parse_expressions.jsxi:230
	var inverse, expression, previousAllowIn;
	
	previousAllowIn = state.allowIn;                                               // parse_expressions.jsxi:233
	state.allowIn = true;                                                          // parse_expressions.jsxi:234
	expression = parseShiftExpression ();                                          // parse_expressions.jsxi:235
	
	while (index < length){                                                        // parse_expressions.jsxi:237
		if (match ('!') && source [lookahead ().range [0] + 1] === 'i'){           // parse_expressions.jsxi:238
			inverse = saveAll ();                                                  // parse_expressions.jsxi:239
			lex ();                                                                // parse_expressions.jsxi:240
		}
		
		if (match ('<') || match ('>') || match ('<=') || match ('>=') || previousAllowIn && matchKeyword ('in') || matchKeyword ('instanceof')){
			expression = binaryExpression (expression, lex ().value, parseShiftExpression ());
		} else if (previousAllowIn && (matchKeyword ('in-object') || matchKeyword ('in-array'))){
			lex ();                                                                // parse_expressions.jsxi:246
			expression = callExpression (memberExpression (parseShiftExpression (), 'hasOwnProperty'), 
				[ expression ]);
		} else {
			if (inverse)                                                           // parse_expressions.jsxi:249
				restoreAll (inverse);                                              // parse_expressions.jsxi:250
			
			break;
		}
		
		if (inverse){                                                              // parse_expressions.jsxi:254
			expression = unaryExpression (expression, '!', true);                  // parse_expressions.jsxi:255
			inverse = false;                                                       // parse_expressions.jsxi:256
		}
	}
	
	state.allowIn = previousAllowIn;                                               // parse_expressions.jsxi:260
	return expression;                                                             // parse_expressions.jsxi:261
}

function parseEqualityExpression (){                                               // parse_expressions.jsxi:264
	var expression = parseRelationalExpression ();
	
	while (match ('==') || match ('!=') || match ('===') || match ('!=='))         // parse_expressions.jsxi:267
		expression = binaryExpression (expression, lex ().value, parseRelationalExpression ());
	return expression;                                                             // parse_expressions.jsxi:270
}

function parseBitwiseANDExpression (){                                             // parse_expressions.jsxi:273
	var expression = parseEqualityExpression ();
	
	while (match ('&')){                                                           // parse_expressions.jsxi:276
		lex ();                                                                    // parse_expressions.jsxi:277
		expression = binaryExpression (expression, '&', parseEqualityExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:281
}

function parseBitwiseXORExpression (){                                             // parse_expressions.jsxi:284
	var expression = parseBitwiseANDExpression ();
	
	while (match ('^')){                                                           // parse_expressions.jsxi:287
		lex ();                                                                    // parse_expressions.jsxi:288
		expression = binaryExpression (expression, '^', parseBitwiseANDExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:292
}

function parseBitwiseORExpression (){                                              // parse_expressions.jsxi:295
	var expression = parseBitwiseXORExpression ();
	
	while (match ('|')){                                                           // parse_expressions.jsxi:298
		lex ();                                                                    // parse_expressions.jsxi:299
		expression = binaryExpression (expression, '|', parseBitwiseXORExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:303
}

function parseLogicalANDExpression (){                                             // parse_expressions.jsxi:306
	var expression = parseBitwiseORExpression ();
	
	while (match ('&&')){                                                          // parse_expressions.jsxi:309
		lex ();                                                                    // parse_expressions.jsxi:310
		expression = logicalExpression (expression, '&&', parseBitwiseORExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:314
}

function parseLogicalORExpression (){                                              // parse_expressions.jsxi:317
	var expression = parseLogicalANDExpression ();
	
	while (match ('||')){                                                          // parse_expressions.jsxi:320
		lex ();                                                                    // parse_expressions.jsxi:321
		expression = logicalExpression (expression, '||', parseLogicalANDExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:325
}

function parseConditionalExpression (){                                            // parse_expressions.jsxi:328
	var expression, previousAllowIn, consequent;
	
	expression = parseLogicalORExpression ();                                      // parse_expressions.jsxi:331
	
	if (match ('?')){                                                              // parse_expressions.jsxi:333
		lex ();                                                                    // parse_expressions.jsxi:334
		previousAllowIn = state.allowIn;                                           // parse_expressions.jsxi:335
		state.allowIn = true;                                                      // parse_expressions.jsxi:336
		consequent = parseAssignmentExpression ();                                 // parse_expressions.jsxi:337
		state.allowIn = previousAllowIn;                                           // parse_expressions.jsxi:338
		expect (':');                                                              // parse_expressions.jsxi:339
		expression = conditionalExpression (expression, consequent, parseAssignmentExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:344
}

function parseAssignmentExpression (){                                             // parse_expressions.jsxi:347
	var expression = parseConditionalExpression (),                                // parse_expressions.jsxi:348
		token = lookahead ();                                                      // parse_expressions.jsxi:349
	
	if (token.type === Token.Punctuator){                                          // parse_expressions.jsxi:351
		var value = token.value;
		
		if (value === '=' || value === '*=' || value === '/=' || value === '%=' || value === '+=' || value === '-=' || value === '<<=' || value === '>>=' || value === '>>>=' || value === '&=' || value === '^=' || value === '|='){
			leftSideOnly (expression);                                             // parse_expressions.jsxi:356
			expression = assignmentExpression (expression, lex ().value, parseAssignmentExpression ());
		}
	}
	return expression;                                                             // parse_expressions.jsxi:361
}

function parseExpression (){                                                       // parse_expressions.jsxi:364
	var expression = parseAssignmentExpression ();
	
	if (!state.preventSequence && match (',')){                                    // parse_expressions.jsxi:367
		expression = sequenceExpression ([ expression ]);                          // parse_expressions.jsxi:368
		
		while (index < length){                                                    // parse_expressions.jsxi:370
			if (!match (','))                                                      // parse_expressions.jsxi:371
				break;
			
			lex ();                                                                // parse_expressions.jsxi:373
			expression.expressions.push (parseAssignmentExpression ());            // parse_expressions.jsxi:374
		}
	}
	return expression;                                                             // parse_expressions.jsxi:378
}

function parseUnaryExpression (){                                                  // parse_expressions.jsxi:396
	var token = lookahead ();
	
	if (token.type === Token.Punctuator){                                          // parse_expressions.jsxi:399
		if (token.value === '++' || token.value === '--'){                         // parse_expressions.jsxi:400
			lex ();                                                                // parse_expressions.jsxi:401
			return unaryExpression (leftSideOnly (parseUnaryExpression ()), token.value, true);
		}
		
		if (token.value === '+' || token.value === '-' || token.value === '~' || token.value === '!'){
			lex ();                                                                // parse_expressions.jsxi:406
			return unaryExpression (parseUnaryExpression (), token.value, true);   // parse_expressions.jsxi:407
		}
	} else if (token.type === Token.Keyword && (token.value === 'typeof' || token.value === 'delete' || token.value === 'void')){
		lex ();                                                                    // parse_expressions.jsxi:411
		return unaryExpression (parseUnaryExpression (), token.value, true);       // parse_expressions.jsxi:412
	}
	return parsePostfixExpression ();                                              // parse_expressions.jsxi:415
}

function parsePostfixExpression (){                                                // parse_expressions.jsxi:418
	var expression = parseLeftHandSideExpressionAllowCall (), token;
	
	token = lookahead ();                                                          // parse_expressions.jsxi:421
	
	if (token.type !== Token.Punctuator)                                           // parse_expressions.jsxi:423
		return expression;                                                         // parse_expressions.jsxi:424
	
	if ((token.value === '++' || token.value === '--') && token.lineNumber === lineNumber){
		leftSideOnly (expression);                                                 // parse_expressions.jsxi:427
		expression = unaryExpression (expression, lex ().value, false);            // parse_expressions.jsxi:428
	}
	return expression;                                                             // parse_expressions.jsxi:431
}

function parseGroupExpression (){                                                  // parse_expressions.jsxi:434
	expect ('(');                                                                  // parse_expressions.jsxi:435
	
	var result = parseExpression ();
	
	expect (')');                                                                  // parse_expressions.jsxi:437
	return result;                                                                 // parse_expressions.jsxi:438
}

function parseComplexString (token){                                               // parse_expressions.jsxi:445
	function split (string, max){                                                  // parse_expressions.jsxi:454
		var length = string.length,                                                // parse_expressions.jsxi:456
			index = 0,                                                             // parse_expressions.jsxi:457
			previous = 0,                                                          // parse_expressions.jsxi:458
			character,                                                             // parse_expressions.jsxi:459
			temp,                                                                  // parse_expressions.jsxi:460
			result = [];                                                           // parse_expressions.jsxi:461
		
		while (index < length)                                                     // parse_expressions.jsxi:463
			switch (string [index]){                                               // parse_expressions.jsxi:464
				case '\\':                                                         // parse_expressions.jsxi:465
					if (string [index + 1] === '%'){                               // parse_expressions.jsxi:466
						if (previous < index)                                      // parse_expressions.jsxi:467
							result.push (string.substring (previous, index));      // parse_expressions.jsxi:468
						
						previous = index + 1;                                      // parse_expressions.jsxi:469
					}
					
					index += 2;                                                    // parse_expressions.jsxi:472
					
					break;
				case '%':                                                          // parse_expressions.jsxi:475
					if (index + 1 === length){                                     // parse_expressions.jsxi:477
						index ++;                                                  // parse_expressions.jsxi:478
						
						break;
					}
					
					if (string [index + 1] === '0' && index + 2 < length && decimalDigit (string [index + 2])){
						index += 2;                                                // parse_expressions.jsxi:484
						
						break;
					}
					
					if (previous < index){                                         // parse_expressions.jsxi:489
						result.push (string.substring (previous, index));          // parse_expressions.jsxi:490
						previous = index;                                          // parse_expressions.jsxi:491
					}
					
					index += 2;                                                    // parse_expressions.jsxi:494
					
					while (index < length && decimalDigit (string [index]))        // parse_expressions.jsxi:496
						index ++;                                                  // parse_expressions.jsxi:497
					
					temp = + string.substring (previous + 1, index);               // parse_expressions.jsxi:499
					
					if (temp < max)                                                // parse_expressions.jsxi:501
						result.push (temp);                                        // parse_expressions.jsxi:502
					
					previous = index;                                              // parse_expressions.jsxi:504
					
					break;
				default:
					index ++;                                                      // parse_expressions.jsxi:508
			}
		
		if (previous < length)                                                     // parse_expressions.jsxi:511
			result.push (string.substring (previous, length));                     // parse_expressions.jsxi:512
		return result;                                                             // parse_expressions.jsxi:514
	}
	
	var string = stringLiteralValue (token),                                       // parse_expressions.jsxi:517
		args = parseArguments (),                                                  // parse_expressions.jsxi:518
		splitted,                                                                  // parse_expressions.jsxi:519
		result;                                                                    // parse_expressions.jsxi:520
	
	if (string.length <= 1)                                                        // parse_expressions.jsxi:523
		return stringLiteral (token.value);                                        // parse_expressions.jsxi:524
	
	splitted = split (string, args.length).map (function (arg){                    // parse_expressions.jsxi:526
		if (typeof arg === 'number'){                                              // parse_expressions.jsxi:529
			var temp = args [arg];
			
			if (temp.type === Syntax.StringLiteral)                                // parse_expressions.jsxi:532
				return stringLiteral (temp.value);                                 // parse_expressions.jsxi:533
			
			if (temp.type === Syntax.BooleanLiteral || temp.type === Syntax.NullLiteral || temp.type === Syntax.NumericLiteral || temp.type === Syntax.RegexpLiteral || temp.type === Syntax.UndefinedLiteral)
				return stringLiteralWithQuotes (temp.value);                       // parse_expressions.jsxi:538
			return temp;                                                           // parse_expressions.jsxi:540
		} else
			return stringLiteralWithQuotes (arg);                                  // parse_expressions.jsxi:542
	}).filter (function (arg, index, array){                                       // parse_expressions.jsxi:544
		if (arg.type !== Syntax.StringLiteral)                                     // parse_expressions.jsxi:546
			return true;
		
		for (var i = index - 1, previous; i >= 0 && array [i].type === Syntax.StringLiteral; i --)
			previous = array [i];                                                  // parse_expressions.jsxi:551
		
		if (previous){                                                             // parse_expressions.jsxi:553
			previous.value = stringLiteralWithQuotes (stringLiteralValue (previous) + stringLiteralValue (arg)).value;
			return false;
		} else
			return true;
	}).filter (function (arg, index, array){                                       // parse_expressions.jsxi:560
		return arg.type !== Syntax.StringLiteral || index === 0 || !stringLiteralEmpty (arg);
	});
	
	if (splitted [0].type !== Syntax.StringLiteral && (splitted.length === 1 || splitted [1].type !== Syntax.StringLiteral))
		splitted.unshift (stringLiteral ('\'\''));                                 // parse_expressions.jsxi:565
	
	result = splitted [0];                                                         // parse_expressions.jsxi:567
	
	for (var i = 1; i < splitted.length; i ++)                                     // parse_expressions.jsxi:569
		result = binaryExpression (result, '+', splitted [i]);                     // parse_expressions.jsxi:570
	return result;                                                                 // parse_expressions.jsxi:572
}

function parsePrimaryExpression (){                                                // parse_expressions.jsxi:575
	var token = lookahead ();
	
	switch (token.type){                                                           // parse_expressions.jsxi:578
		case Token.Identifier:                                                     // parse_expressions.jsxi:579
			lex ();                                                                // parse_expressions.jsxi:580
			
			if (state.asynchronous && token.value === 'asynchronous'){             // parse_expressions.jsxi:581
				var next = parseExpression ();
				
				if (next.type === Syntax.CallExpression){                          // parse_expressions.jsxi:584
					next.asynchronous = true;                                      // parse_expressions.jsxi:585
					return next;                                                   // parse_expressions.jsxi:586
				} else
					unexpected (token);                                            // parse_expressions.jsxi:588
			} else
				return mark ({ type: Syntax.Identifier, name: token.value }, token);
		case Token.Keyword:                                                        // parse_expressions.jsxi:592
			if (token.value === 'this'){                                           // parse_expressions.jsxi:593
				lex ();                                                            // parse_expressions.jsxi:594
				return mark ({ type: Syntax.ThisExpression }, token);              // parse_expressions.jsxi:595
			}
			
			if (token.value === 'function')                                        // parse_expressions.jsxi:598
				return parseFunctionExpression ();                                 // parse_expressions.jsxi:599
			
			if (token.value === 'lambda')                                          // parse_expressions.jsxi:601
				return parseLambdaExpression ();                                   // parse_expressions.jsxi:602
			
			break;
		case Token.StringLiteral:                                                  // parse_expressions.jsxi:606
			lex ();                                                                // parse_expressions.jsxi:607
			
			if (lookahead ().value === '(')                                        // parse_expressions.jsxi:608
				return parseComplexString (token);                                 // parse_expressions.jsxi:609
			else
				return mark ({ type: Syntax.StringLiteral, value: token.value }, token);
		case Token.NumericLiteral:                                                 // parse_expressions.jsxi:613
			lex ();                                                                // parse_expressions.jsxi:614
			return numericLiteral (token.value);                                   // parse_expressions.jsxi:615
		case Token.BooleanLiteral:                                                 // parse_expressions.jsxi:617
			lex ();                                                                // parse_expressions.jsxi:618
			return booleanLiteral (token.value);                                   // parse_expressions.jsxi:619
		case Token.NullLiteral:                                                    // parse_expressions.jsxi:621
			lex ();                                                                // parse_expressions.jsxi:622
			return nullLiteral ();                                                 // parse_expressions.jsxi:623
		case Token.UndefinedLiteral:                                               // parse_expressions.jsxi:625
			lex ();                                                                // parse_expressions.jsxi:626
			return undefinedLiteral ();                                            // parse_expressions.jsxi:627
		case Token.Punctuator:                                                     // parse_expressions.jsxi:629
			switch (token.value){                                                  // parse_expressions.jsxi:630
				case '[':                                                          // parse_expressions.jsxi:631
					return parseArrayInitialiser ();                               // parse_expressions.jsxi:632
				case '{':                                                          // parse_expressions.jsxi:634
					return parseObjectInitialiser ();                              // parse_expressions.jsxi:635
				case '(':                                                          // parse_expressions.jsxi:637
					return parseGroupExpression ();                                // parse_expressions.jsxi:638
				case '/':                                                          // parse_expressions.jsxi:640
					lex ();                                                        // parse_expressions.jsxi:641
					return readRegexp ();                                          // parse_expressions.jsxi:642
			}
		default:
			unexpected (token);                                                    // parse_expressions.jsxi:646
	}
}

function parseFunction (options){                                                  // parse_function.jsxi:10
	if (options === undefined)                                                     // parse_function.jsxi:10
		options = {};                                                              // parse_function.jsxi:10

	var id, params, body, asynchronous = false, token = lookahead ();
	
	if (options.keyword !== null)                                                  // parse_function.jsxi:13
		expectKeyword (options.keyword || 'function');                             // parse_function.jsxi:14
	
	if (options.id === true || options.id !== false && lookahead ().type === Token.Identifier)
		id = parseIdentifier ();                                                   // parse_function.jsxi:17
	else
		id = null;                                                                 // parse_function.jsxi:19
	
	if (options.optionalParams){                                                   // parse_function.jsxi:21
		params = parseOptionalFunctionArguments () || (options.optionalParams === true ? [] : options.optionalParams);
	} else {
		params = parseFunctionArguments ();                                        // parse_function.jsxi:24
		
		if (lookahead ().value === 'asynchronous'){                                // parse_function.jsxi:26
			lex ();                                                                // parse_function.jsxi:27
			asynchronous = true;                                                   // parse_function.jsxi:28
		}
	}
	
	if (!options.empty){                                                           // parse_function.jsxi:32
		var oldAsynchronous = state.asynchronous;
		
		state.asynchronous = asynchronous;                                         // parse_function.jsxi:34
		body = parseFunctionElements (options.noSemicolon);                        // parse_function.jsxi:36
		
		if (asynchronous){                                                         // parse_function.jsxi:38
			params.push (identifier ('__callback'));                               // parse_function.jsxi:39
			body = blockStatement (makeAsynchronous (body.body));                  // parse_function.jsxi:40
		}
		
		state.asynchronous = oldAsynchronous;                                      // parse_function.jsxi:43
	} else {
		body = null;                                                               // parse_function.jsxi:45
		consumeSemicolon ();                                                       // parse_function.jsxi:46
	}
	return mark ((options.declaration ? functionDeclaration : functionExpression)(id, params, body), 
		token);                                                                    // parse_function.jsxi:49
}

function parseFunctionExpression (){                                               // parse_function.jsxi:52
	var oldNoReturn = state.noReturn, result;
	
	state.noReturn = false;                                                        // parse_function.jsxi:54
	result = parseFunction ();                                                     // parse_function.jsxi:55
	state.noReturn = oldNoReturn;                                                  // parse_function.jsxi:56
	return result;                                                                 // parse_function.jsxi:57
}

function parseFunctionDeclaration (){                                              // parse_function.jsxi:60
	var oldNoReturn = state.noReturn, result;
	
	state.noReturn = false;                                                        // parse_function.jsxi:62
	result = parseFunction ({ id: true, declaration: true });                      // parse_function.jsxi:63
	state.noReturn = oldNoReturn;                                                  // parse_function.jsxi:64
	return result;                                                                 // parse_function.jsxi:65
}

function parseLambdaExpression (){                                                 // parse_function.jsxi:68
	var oldNoReturn = state.noReturn, result;
	
	state.noReturn = false;                                                        // parse_function.jsxi:70
	result = parseFunction ({                                                      // parse_function.jsxi:71
		id: false,                                                                 // parse_function.jsxi:71
		keyword: 'lambda',                                                         // parse_function.jsxi:71
		optionalParams: [ identifier ('arg') ],                                    // parse_function.jsxi:71
		noSemicolon: true
	});
	state.noReturn = oldNoReturn;                                                  // parse_function.jsxi:72
	return result;                                                                 // parse_function.jsxi:73
}

function parseFunctionArguments (){                                                // parse_function.jsxi:76
	var name, params = [], comma = {};
	
	expect ('(');                                                                  // parse_function.jsxi:79
	
	while (!match (')')){                                                          // parse_function.jsxi:81
		if (params.length)                                                         // parse_function.jsxi:82
			parseOptionalComma (comma);                                            // parse_function.jsxi:83
		
		name = parseIdentifier ();                                                 // parse_function.jsxi:85
		
		if (matchLex ('='))                                                        // parse_function.jsxi:86
			name.defaultValue = parseAssignmentExpression ();                      // parse_function.jsxi:87
		
		params.push (name);                                                        // parse_function.jsxi:89
	}
	
	expect (')');                                                                  // parse_function.jsxi:92
	return params;                                                                 // parse_function.jsxi:93
}

function parseOptionalFunctionArguments (){                                        // parse_function.jsxi:96
	return attemptTo (parseFunctionArguments, null, 
		!match ('('));                                                             // parse_function.jsxi:97
}

function parseFunctionElements (noSemicolon){                                      // parse_function.jsxi:99
	var oldPreventSequence = state.preventSequence, result;
	
	if (match ('{')){                                                              // parse_function.jsxi:102
		expect ('{');                                                              // parse_function.jsxi:103
		attemptTo (function (arg){                                                 // parse_function.jsxi:105
			result = [ returnStatement (objectExpression (parseObjectContent ())) ];
			consumeSemicolon ();                                                   // parse_function.jsxi:108
		}, 
		function (arg){                                                            // parse_function.jsxi:110
			state.preventSequence = false;                                         // parse_function.jsxi:111
			result = [];                                                           // parse_function.jsxi:112
			
			while (!match ('}'))                                                   // parse_function.jsxi:114
				result.push (parseStatement ());                                   // parse_function.jsxi:115
		}, 
		lookahead ().type !== Token.Literal && lookahead ().type !== Token.Identifier);
		expect ('}');                                                              // parse_function.jsxi:119
	} else if (matchLex (';')){                                                    // parse_function.jsxi:120
		result = [];                                                               // parse_function.jsxi:121
	} else if (!match (']') && !match (')') && !match ('}') && !match (',')){      // parse_function.jsxi:122
		state.preventSequence = true;                                              // parse_function.jsxi:123
		result = [ setReturnStatement (parseStatement ()) ];                       // parse_function.jsxi:124
	}
	
	if (!noSemicolon)                                                              // parse_function.jsxi:127
		matchLex (';');                                                            // parse_function.jsxi:128
	
	state.preventSequence = oldPreventSequence;                                    // parse_function.jsxi:130
	return blockStatement (result);                                                // parse_function.jsxi:131
}

function setReturnStatement (data){                                                // parse_function.jsxi:134
	if (data)                                                                      // parse_function.jsxi:135
		if (data.type === Syntax.ExpressionStatement){                             // parse_function.jsxi:136
			data.type = Syntax.ReturnStatement;                                    // parse_function.jsxi:137
			data.argument = data.expression;                                       // parse_function.jsxi:138
			delete data.expression;                                                // parse_function.jsxi:139
		} else if (data.type === Syntax.IfStatement){                              // parse_function.jsxi:140
			setReturnStatement (data.consequent);                                  // parse_function.jsxi:141
			setReturnStatement (data.alternate);                                   // parse_function.jsxi:142
		} else if (data.type === Syntax.LabelledStatement){                        // parse_function.jsxi:143
			setReturnStatement (data.body);                                        // parse_function.jsxi:144
		} else if (data.type === Syntax.BlockStatement && data.single){            // parse_function.jsxi:145
			setReturnStatement (data.body [0]);                                    // parse_function.jsxi:146
		} else if (data.type === Syntax.TryStatement){                             // parse_function.jsxi:147
			setReturnStatement (data.block);                                       // parse_function.jsxi:148
			
			if (data.handlers && data.handlers [0])                                // parse_function.jsxi:149
				setReturnStatement (data.handlers [0].body);                       // parse_function.jsxi:150
			
			if (data.finalizer)                                                    // parse_function.jsxi:151
				setReturnStatement (data.finalizer);                               // parse_function.jsxi:152
		}
	return data;                                                                   // parse_function.jsxi:155
}

function mark (obj, token){                                                        // parse_other.jsxi:1
	obj.filename = options.filename;                                               // parse_other.jsxi:2
	obj.lineNumber = token.lineNumber;                                             // parse_other.jsxi:3
	return obj;                                                                    // parse_other.jsxi:4
}

function parseIdentifier (){                                                       // parse_other.jsxi:7
	var token = lex ();
	
	if (token.type !== Token.Identifier)                                           // parse_other.jsxi:9
		unexpected (token);                                                        // parse_other.jsxi:10
	return mark ({ type: Syntax.Identifier, name: token.value }, token);           // parse_other.jsxi:11
}

function parseOptionalComma (state){                                               // parse_other.jsxi:14
	var token = lookahead ();
	
	if (state.comma === undefined)                                                 // parse_other.jsxi:17
		state.comma = token.value === ',';                                         // parse_other.jsxi:18
	else if (state.comma !== (token.value === ','))                                // parse_other.jsxi:19
		unexpected (token);                                                        // parse_other.jsxi:20
	
	if (token.value === ',')                                                       // parse_other.jsxi:22
		lex ();                                                                    // parse_other.jsxi:23
}

function parseArguments (){                                                        // parse_other.jsxi:26
	var args = [], comma = {};
	
	expect ('(');                                                                  // parse_other.jsxi:28
	
	while (!matchLex (')')){                                                       // parse_other.jsxi:30
		if (args.length)                                                           // parse_other.jsxi:31
			parseOptionalComma (comma);                                            // parse_other.jsxi:32
		
		args.push (parseAssignmentExpression ());                                  // parse_other.jsxi:33
	}
	return args;                                                                   // parse_other.jsxi:36
}

function parseStatementList (){                                                    // parse_other.jsxi:39
	var list = [];
	
	while (index < length && !match ('}'))                                         // parse_other.jsxi:41
		list.push (parseStatement ());                                             // parse_other.jsxi:42
	return list;                                                                   // parse_other.jsxi:43
}

function parseBlock (){                                                            // parse_other.jsxi:46
	var block, oldPreventSequence = state.preventSequence;
	
	state.preventSequence = false;                                                 // parse_other.jsxi:48
	expect ('{');                                                                  // parse_other.jsxi:50
	block = parseStatementList ();                                                 // parse_other.jsxi:51
	expect ('}');                                                                  // parse_other.jsxi:52
	state.preventSequence = oldPreventSequence;                                    // parse_other.jsxi:54
	return blockStatement (block);                                                 // parse_other.jsxi:55
}

function parseBlockOrNotBlock (){                                                  // parse_other.jsxi:58
	if (match ('{'))                                                               // parse_other.jsxi:59
		return parseBlock ();                                                      // parse_other.jsxi:60
	else
		return blockStatement ([ parseStatement () ], true);                       // parse_other.jsxi:62
}

function parseProgram (){                                                          // parse_other.jsxi:65
	var elements = [];
	
	while (lookahead ().type !== Token.EOF)                                        // parse_other.jsxi:68
		elements.push (parseStatement ());                                         // parse_other.jsxi:69
	
	if (options.insertReturn && elements.length === 1)                             // parse_other.jsxi:71
		setReturnStatement (elements [0]);                                         // parse_other.jsxi:72
	return { type: Syntax.Program, body: elements };
}

function parseStatement (){                                                        // parse_statements.jsxi:1
	var token = lookahead ();
	
	if (token.type === Token.EOF)                                                  // parse_statements.jsxi:4
		unexpected (token);                                                        // parse_statements.jsxi:5
	
	if (token.type === Token.Punctuator)                                           // parse_statements.jsxi:7
		switch (token.value){                                                      // parse_statements.jsxi:8
			case ';':                                                              // parse_statements.jsxi:9
				lex ();                                                            // parse_statements.jsxi:10
				return { type: Syntax.EmptyStatement };
			case '{':                                                              // parse_statements.jsxi:12
				return attemptTo (function (arg){                                  // parse_statements.jsxi:13
					var expression = parseObjectInitialiser ();
					
					consumeSemicolon ();                                           // parse_statements.jsxi:15
					return expressionStatement (expression);                       // parse_statements.jsxi:16
				}, 
				parseBlock);                                                       // parse_statements.jsxi:17
			case '(':                                                              // parse_statements.jsxi:18
				var expression = parseExpression ();
				
				consumeSemicolon ();                                               // parse_statements.jsxi:20
				return { type: Syntax.ExpressionStatement, expression: expression };
			case '...':                                                            // parse_statements.jsxi:26
				lex ();                                                            // parse_statements.jsxi:27
				return {
					type: Syntax.NotImplementedStatement,                          // parse_statements.jsxi:28
					lineNumber: lineNumber,                                        // parse_statements.jsxi:28
					filename: options.filename
				};
		}
	
	if (token.type === Token.Keyword)                                              // parse_statements.jsxi:31
		switch (token.value){                                                      // parse_statements.jsxi:32
			case 'public':                                                         // parse_statements.jsxi:33
				
			case 'protected':                                                      // parse_statements.jsxi:34
				
			case 'private':                                                        // parse_statements.jsxi:35
				
			case 'static':                                                         // parse_statements.jsxi:36
				
			case 'abstract':                                                       // parse_statements.jsxi:37
				
			case 'class':                                                          // parse_statements.jsxi:38
				
			case 'interface':                                                      // parse_statements.jsxi:39
				
			case 'partial':                                                        // parse_statements.jsxi:40
				return parseClassDeclaration ();                                   // parse_statements.jsxi:40
			case 'function':                                                       // parse_statements.jsxi:41
				return parseFunctionDeclaration ();                                // parse_statements.jsxi:41
			case 'if':                                                             // parse_statements.jsxi:42
				return parseIfStatement ();                                        // parse_statements.jsxi:42
			case 'var':                                                            // parse_statements.jsxi:43
				return parseVariableDeclaration ();                                // parse_statements.jsxi:43
			case 'do':                                                             // parse_statements.jsxi:44
				return parseDoWhileStatement ();                                   // parse_statements.jsxi:44
			case 'for':                                                            // parse_statements.jsxi:45
				return parseForStatement ();                                       // parse_statements.jsxi:45
			case 'switch':                                                         // parse_statements.jsxi:46
				return parseSwitchStatement ();                                    // parse_statements.jsxi:46
			case 'try':                                                            // parse_statements.jsxi:47
				return parseTryStatement ();                                       // parse_statements.jsxi:47
			case 'while':                                                          // parse_statements.jsxi:48
				return parseWhileStatement ();                                     // parse_statements.jsxi:48
			case 'with':                                                           // parse_statements.jsxi:49
				return parseWithStatement ();                                      // parse_statements.jsxi:49
			case 'break':                                                          // parse_statements.jsxi:50
				return parseBreakStatement ();                                     // parse_statements.jsxi:50
			case 'continue':                                                       // parse_statements.jsxi:51
				return parseContinueStatement ();                                  // parse_statements.jsxi:51
			case 'return':                                                         // parse_statements.jsxi:52
				return parseReturnStatement ();                                    // parse_statements.jsxi:52
			case 'throw':                                                          // parse_statements.jsxi:53
				return parseThrowStatement ();                                     // parse_statements.jsxi:53
			case 'debugger':                                                       // parse_statements.jsxi:54
				return parseDebuggerStatement ();                                  // parse_statements.jsxi:54
		}
	
	var expression = parseExpression ();
	
	if (expression.type === Syntax.Identifier && matchLex (':')){                  // parse_statements.jsxi:59
		return labeledStatement (expression, parseStatement ());                   // parse_statements.jsxi:60
	} else {
		consumeSemicolon ();                                                       // parse_statements.jsxi:62
		return expressionStatement (expression);                                   // parse_statements.jsxi:63
	}
}

function parseVariableDeclarators (semicolon){                                     // parse_statements.jsxi:67
	var result = [];
	
	do {
		result.push (variableDeclarator (parseIdentifier (),                       // parse_statements.jsxi:70
			matchLex ('=') ? parseAssignmentExpression () : null));                // parse_statements.jsxi:70
	} while (index < length && matchLex (','));                                    // parse_statements.jsxi:71
	
	if (semicolon !== false)                                                       // parse_statements.jsxi:73
		consumeSemicolon ();                                                       // parse_statements.jsxi:74
	return result;                                                                 // parse_statements.jsxi:76
}

function parseVariableDeclaration (){                                              // parse_statements.jsxi:79
	expectKeyword ('var');                                                         // parse_statements.jsxi:80
	return variableDeclaration (parseVariableDeclarators ());                      // parse_statements.jsxi:81
}

function parseContinueStatement (){                                                // parse_statements.jsxi:84
	var label = null;
	
	expectKeyword ('continue');                                                    // parse_statements.jsxi:87
	
	if (source [index] === ';'){                                                   // parse_statements.jsxi:89
		lex ();                                                                    // parse_statements.jsxi:90
		return continueStatement ();                                               // parse_statements.jsxi:91
	}
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:94
		return continueStatement ();                                               // parse_statements.jsxi:95
	
	if (lookahead ().type === Token.Identifier)                                    // parse_statements.jsxi:97
		label = parseIdentifier ();                                                // parse_statements.jsxi:98
	
	consumeSemicolon ();                                                           // parse_statements.jsxi:100
	return continueStatement (label);                                              // parse_statements.jsxi:101
}

function parseBreakStatement (){                                                   // parse_statements.jsxi:104
	var label = null;
	
	expectKeyword ('break');                                                       // parse_statements.jsxi:107
	
	if (source [index] === ';'){                                                   // parse_statements.jsxi:109
		lex ();                                                                    // parse_statements.jsxi:110
		return breakStatement ();                                                  // parse_statements.jsxi:111
	}
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:114
		return breakStatement ();                                                  // parse_statements.jsxi:115
	
	if (lookahead ().type === Token.Identifier)                                    // parse_statements.jsxi:117
		label = parseIdentifier ();                                                // parse_statements.jsxi:118
	
	consumeSemicolon ();                                                           // parse_statements.jsxi:120
	return breakStatement (label);                                                 // parse_statements.jsxi:121
}

function parseReturnStatement (){                                                  // parse_statements.jsxi:124
	var argument = null;
	
	if (state.noReturn)                                                            // parse_statements.jsxi:127
		unexpected (lookahead ());                                                 // parse_statements.jsxi:128
	
	expectKeyword ('return');                                                      // parse_statements.jsxi:130
	
	if (source [index] === ' ' && identifierStart (source [index + 1])){           // parse_statements.jsxi:132
		argument = parseExpression ();                                             // parse_statements.jsxi:133
		consumeSemicolon ();                                                       // parse_statements.jsxi:134
		return returnStatement (argument);                                         // parse_statements.jsxi:135
	}
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:138
		return returnStatement ();                                                 // parse_statements.jsxi:139
	
	if (!match (';') && !match ('}') && lookahead ().type !== Token.EOF)           // parse_statements.jsxi:141
		argument = parseExpression ();                                             // parse_statements.jsxi:142
	
	if (!state.preventSequence)                                                    // parse_statements.jsxi:144
		consumeSemicolon ();                                                       // parse_statements.jsxi:145
	return returnStatement (argument);                                             // parse_statements.jsxi:147
}

function parseThrowStatement (){                                                   // parse_statements.jsxi:150
	expectKeyword ('throw');                                                       // parse_statements.jsxi:151
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:153
		throwError ({}, Messages.NewlineAfterThrow);                               // parse_statements.jsxi:154
	
	var argument = parseExpression ();
	
	consumeSemicolon ();                                                           // parse_statements.jsxi:157
	return throwStatement (argument);                                              // parse_statements.jsxi:159
}

function parseDebuggerStatement (){                                                // parse_statements.jsxi:162
	expectKeyword ('debugger');                                                    // parse_statements.jsxi:163
	consumeSemicolon ();                                                           // parse_statements.jsxi:164
	return debuggerStatement ();                                                   // parse_statements.jsxi:165
}

function parseIfStatement (){                                                      // parse_statements.jsxi:168
	expectKeyword ('if');                                                          // parse_statements.jsxi:169
	expect ('(');                                                                  // parse_statements.jsxi:170
	
	var test = parseExpression (), consequent, alternate;
	
	expect (')');                                                                  // parse_statements.jsxi:176
	consequent = parseStatement ();                                                // parse_statements.jsxi:178
	
	if (matchKeyword ('else')){                                                    // parse_statements.jsxi:180
		lex ();                                                                    // parse_statements.jsxi:181
		alternate = parseStatement ();                                             // parse_statements.jsxi:182
	} else
		alternate = null;                                                          // parse_statements.jsxi:184
	return ifStatement (test, consequent, alternate);                              // parse_statements.jsxi:186
}

function parseDoWhileStatement (){                                                 // parse_statements.jsxi:189
	expectKeyword ('do');                                                          // parse_statements.jsxi:190
	
	var body = parseStatement ();
	
	expectKeyword ('while');                                                       // parse_statements.jsxi:194
	expect ('(');                                                                  // parse_statements.jsxi:195
	
	var test = parseExpression ();
	
	expect (')');                                                                  // parse_statements.jsxi:199
	matchLex (';');                                                                // parse_statements.jsxi:200
	return doWhileStatement (body, test);                                          // parse_statements.jsxi:202
}

function parseWhileStatement (){                                                   // parse_statements.jsxi:205
	expectKeyword ('while');                                                       // parse_statements.jsxi:206
	expect ('(');                                                                  // parse_statements.jsxi:207
	
	var test = parseExpression ();
	
	expect (')');                                                                  // parse_statements.jsxi:211
	return whileStatement (test, parseStatement ());                               // parse_statements.jsxi:213
}

function parseForStatement (){                                                     // parse_statements.jsxi:216
	var init = null,                                                               // parse_statements.jsxi:217
		test = null,                                                               // parse_statements.jsxi:217
		update = null,                                                             // parse_statements.jsxi:217
		left,                                                                      // parse_statements.jsxi:218
		right,                                                                     // parse_statements.jsxi:218
		body,                                                                      // parse_statements.jsxi:218
		temp,                                                                      // parse_statements.jsxi:218
		result,                                                                    // parse_statements.jsxi:218
		arrayMode,                                                                 // parse_statements.jsxi:218
		identifierMode,                                                            // parse_statements.jsxi:219
		propertyName;                                                              // parse_statements.jsxi:219
	
	expectKeyword ('for');                                                         // parse_statements.jsxi:221
	expect ('(');                                                                  // parse_statements.jsxi:222
	
	if (!matchLex (';')){                                                          // parse_statements.jsxi:224
		if (matchKeywordLex ('var')){                                              // parse_statements.jsxi:225
			state.allowIn = false;                                                 // parse_statements.jsxi:226
			init = variableDeclaration (parseVariableDeclarators (false));         // parse_statements.jsxi:227
			state.allowIn = true;                                                  // parse_statements.jsxi:228
			
			if (init.declarations.length <= 2 && (matchKeyword ('in-array') || matchKeyword ('in-object') || matchKeyword ('in'))){
				arrayMode = lex ().value;                                          // parse_statements.jsxi:231
				left = init;                                                       // parse_statements.jsxi:232
				right = parseExpression ();                                        // parse_statements.jsxi:233
				init = null;                                                       // parse_statements.jsxi:234
			}
		} else {
			state.allowIn = false;                                                 // parse_statements.jsxi:237
			init = parseExpression ();                                             // parse_statements.jsxi:238
			state.allowIn = true;                                                  // parse_statements.jsxi:239
			
			if (matchKeyword ('in-array') || matchKeyword ('in-object') || matchKeyword ('in')){
				if (init.type !== Syntax.SequenceExpression)                       // parse_statements.jsxi:242
					leftSideOnly (init);                                           // parse_statements.jsxi:243
				else if (init.expressions.length !== 2)                            // parse_statements.jsxi:244
					leftSideOnly ();                                               // parse_statements.jsxi:245
				
				arrayMode = lex ().value;                                          // parse_statements.jsxi:247
				left = init;                                                       // parse_statements.jsxi:248
				right = parseExpression ();                                        // parse_statements.jsxi:249
				init = null;                                                       // parse_statements.jsxi:250
			}
		}
		
		if (left === undefined)                                                    // parse_statements.jsxi:254
			expect (';');                                                          // parse_statements.jsxi:255
	}
	
	if (left === undefined){                                                       // parse_statements.jsxi:258
		if (!match (';'))                                                          // parse_statements.jsxi:259
			test = parseExpression ();                                             // parse_statements.jsxi:260
		
		expect (';');                                                              // parse_statements.jsxi:262
		
		if (!match (')'))                                                          // parse_statements.jsxi:264
			update = parseExpression ();                                           // parse_statements.jsxi:265
	}
	
	expect (')');                                                                  // parse_statements.jsxi:268
	body = parseStatement ();                                                      // parse_statements.jsxi:269
	
	if (arrayMode === 'in-array')                                                  // parse_statements.jsxi:271
		if (left.type === Syntax.VariableDeclaration && left.declarations.length === 1){
			left.declarations = [ variableDeclarator (newIdentifier ()), left.declarations [0] ];
		} else if (left.type === Syntax.Identifier){                               // parse_statements.jsxi:274
			left = variableDeclaration ([                                          // parse_statements.jsxi:275
				variableDeclarator (newIdentifier ()),                             // parse_statements.jsxi:275
				variableDeclarator (left)
			]);
			identifierMode = true;                                                 // parse_statements.jsxi:276
		}
	
	if (left === undefined){                                                       // parse_statements.jsxi:279
		return forStatement (init, test, update, body);                            // parse_statements.jsxi:280
	} else if (left.type === Syntax.SequenceExpression && left.expressions.length === 2 || identifierMode){
		temp = body;                                                               // parse_statements.jsxi:282
		body = blockStatement ([                                                   // parse_statements.jsxi:284
			expressionStatement (assignmentExpression (identifierMode ? left.declarations [1].id : left.expressions [1], 
				memberExpression (right,                                           // parse_statements.jsxi:287
					identifierMode ? left.declarations [0].id : left.expressions [0], 
					true)))
		]);
		
		if (temp.type === Syntax.BlockStatement)                                   // parse_statements.jsxi:289
			Array.prototype.push.apply (body.body, temp.body);                     // parse_statements.jsxi:290
		else
			body.body.push (temp);                                                 // parse_statements.jsxi:292
		
		if (identifierMode)                                                        // parse_statements.jsxi:294
			left.declarations.length = 1;                                          // parse_statements.jsxi:295
		else
			left = left.expressions [0];                                           // parse_statements.jsxi:297
	} else if (left.type === Syntax.VariableDeclaration && left.declarations.length === 2){
		temp = body;                                                               // parse_statements.jsxi:299
		body = blockStatement ([ variableDeclaration ([ left.declarations [1] ]) ]);
		body.body [0].declarations [0].init = memberExpression (right, left.declarations [0].id, true);
		
		if (temp.type === Syntax.BlockStatement)                                   // parse_statements.jsxi:303
			Array.prototype.push.apply (body.body, temp.body);                     // parse_statements.jsxi:304
		else
			body.body.push (temp);                                                 // parse_statements.jsxi:306
		
		left.declarations.length = 1;                                              // parse_statements.jsxi:308
	}
	
	if (arrayMode === 'in-array'){                                                 // parse_statements.jsxi:311
		if (left.type === Syntax.VariableDeclaration && !left.declarations [0].init)
			left.declarations [0].init = numericLiteral (0);                       // parse_statements.jsxi:313
		
		temp = left.type === Syntax.VariableDeclaration ? left.declarations [0].id : left.type === Syntax.SequenceExpression ? left.expressions [0] : left;
		
		if (left.type === Syntax.Identifier)                                       // parse_statements.jsxi:321
			left = assignmentExpression (left, numericLiteral (0));                // parse_statements.jsxi:322
		
		result = forStatement (left,                                               // parse_statements.jsxi:324
			binaryExpression (temp, '<', memberExpression (right, 'length')),      // parse_statements.jsxi:326
			unaryExpression (temp, '++', false),                                   // parse_statements.jsxi:327
			body);                                                                 // parse_statements.jsxi:328
	} else {
		if (arrayMode === 'in-object'){                                            // parse_statements.jsxi:330
			propertyName = left.type === Syntax.VariableDeclaration ? left.declarations [0].id.name : left.name;
			body = ifStatement (callExpression (memberExpression (right, 'hasOwnProperty'), [ propertyName ]), 
				body);                                                             // parse_statements.jsxi:332
		}
		
		result = forInStatement (left, right, body);                               // parse_statements.jsxi:335
	}
	
	if ((temp !== undefined || arrayMode === 'in-object') && right.type !== Syntax.Identifier){
		var identifier = newIdentifier ();
		
		temp = $.extend (true, {}, 
			right);                                                                // parse_statements.jsxi:341
		
		for (var n in right)                                                       // parse_statements.jsxi:343
			delete right [n];                                                      // parse_statements.jsxi:344
		
		right.type = Syntax.Identifier;                                            // parse_statements.jsxi:346
		right.name = identifier;                                                   // parse_statements.jsxi:347
		return blockStatement ([                                                   // parse_statements.jsxi:349
			variableDeclaration ([ variableDeclarator (right, temp) ]),            // parse_statements.jsxi:349
			result,                                                                // parse_statements.jsxi:351
			expressionStatement (assignmentExpression (right, 'undefined'))
		]);
	}
	return result;                                                                 // parse_statements.jsxi:356
}

function parseSwitchCase (){                                                       // parse_statements.jsxi:360
	var test, consequent = [], statement;
	
	if (matchKeywordLex ('default')){                                              // parse_statements.jsxi:365
		test = null;                                                               // parse_statements.jsxi:366
	} else {
		expectKeyword ('case');                                                    // parse_statements.jsxi:368
		test = parseExpression ();                                                 // parse_statements.jsxi:369
	}
	
	expect (':');                                                                  // parse_statements.jsxi:372
	
	while (!match ('}') && !matchKeyword ('default') && !matchKeyword ('case'))    // parse_statements.jsxi:374
		consequent.push (parseStatement ());                                       // parse_statements.jsxi:375
	return { type: Syntax.SwitchCase, test: test, consequent: consequent };
}

function parseSwitchStatement (){                                                  // parse_statements.jsxi:384
	expectKeyword ('switch');                                                      // parse_statements.jsxi:385
	expect ('(');                                                                  // parse_statements.jsxi:386
	
	var discriminant = parseExpression (), cases = [];
	
	expect (')');                                                                  // parse_statements.jsxi:390
	expect ('{');                                                                  // parse_statements.jsxi:391
	
	while (!matchLex ('}'))                                                        // parse_statements.jsxi:393
		cases.push (parseSwitchCase ());                                           // parse_statements.jsxi:394
	return {
		type: Syntax.SwitchStatement,                                              // parse_statements.jsxi:397
		discriminant: discriminant,                                                // parse_statements.jsxi:398
		cases: cases
	};
}

function parseCatchClause (){                                                      // parse_statements.jsxi:403
	expectKeyword ('catch');                                                       // parse_statements.jsxi:404
	
	var param;
	
	if (matchLex ('(')){                                                           // parse_statements.jsxi:408
		param = parseIdentifier ();                                                // parse_statements.jsxi:409
		expect (')');                                                              // parse_statements.jsxi:410
	} else
		param = identifier ('e');                                                  // parse_statements.jsxi:412
	return catchClause (param, parseBlockOrNotBlock ());                           // parse_statements.jsxi:414
}

function parseTryStatement (){                                                     // parse_statements.jsxi:417
	expectKeyword ('try');                                                         // parse_statements.jsxi:418
	
	var block = parseBlockOrNotBlock (),                                           // parse_statements.jsxi:420
		handlers = matchKeyword ('catch') ? [ parseCatchClause () ] : [],          // parse_statements.jsxi:421
		finalizer = matchKeywordLex ('finally') ? parseBlockOrNotBlock () : null;
	
	if (finalizer === null && handlers.length === 0)                               // parse_statements.jsxi:424
		handlers.push (catchClause ('e', blockStatement ([])));                    // parse_statements.jsxi:425
	return tryStatement (block, handlers, finalizer);                              // parse_statements.jsxi:427
}

function parseWithStatement (){                                                    // parse_statements.jsxi:430
	expectKeyword ('with');                                                        // parse_statements.jsxi:431
	expect ('(');                                                                  // parse_statements.jsxi:432
	
	var object = parseExpression ();
	
	expect (')');                                                                  // parse_statements.jsxi:436
	return {
		type: Syntax.WithStatement,                                                // parse_statements.jsxi:439
		object: object,                                                            // parse_statements.jsxi:440
		body: parseStatement ()
	};
}

function keyword (id){                                                             // reads.jsxi:1
	switch (id.length){                                                            // reads.jsxi:2
		case 2:
			return id === 'if' || id === 'in' || id === 'do';                      // reads.jsxi:3
		case 3:
			return id === 'var' || id === 'for' || id === 'new' || id === 'try';   // reads.jsxi:4
		case 4:
			return id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum' || id === 'uses';
		case 5:
			return id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'class' || id === 'super';
		case 6:
			return id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'lambda' || id === 'static' || id === 'public';
		case 7:
			return id === 'default' || id === 'finally' || id === 'private' || id === 'extends' || id === 'partial';
		case 8:
			return id === 'function' || id === 'continue' || id === 'debugger' || id === 'abstract';
		case 9:
			return id === 'protected' || id === 'interface';                       // reads.jsxi:10
		case 10:
			return id === 'instanceof' || id === 'implements';                     // reads.jsxi:11
	}
}

function readIdentifier (){                                                        // reads.jsxi:15
	var start = index, identifier;
	
	if (identifierStart (source [index])){                                         // reads.jsxi:19
		do
			index ++;                                                              // reads.jsxi:21
		while (identifierPart (source [index]));                                   // reads.jsxi:22
		
		if (index - start === 1)                                                   // reads.jsxi:24
			return {
				type: Token.Identifier,                                            // reads.jsxi:26
				value: source [start],                                             // reads.jsxi:27
				lineNumber: lineNumber,                                            // reads.jsxi:28
				range: [ start, index ]
			};
		
		identifier = source.substring (start, index);                              // reads.jsxi:32
		
		if (keyword (identifier)){                                                 // reads.jsxi:34
			if (identifier === 'in' && source [index] === '-'){                    // reads.jsxi:35
				while (identifierPart (source [++ index]));                        // reads.jsxi:36
				
				identifier = source.substring (start, index);                      // reads.jsxi:37
				
				if (identifier !== 'in-object' && identifier !== 'in-array')       // reads.jsxi:39
					unexpected ();                                                 // reads.jsxi:40
			}
			return {
				type: Token.Keyword,                                               // reads.jsxi:44
				value: identifier,                                                 // reads.jsxi:45
				lineNumber: lineNumber,                                            // reads.jsxi:46
				range: [ start, index ]
			};
		}
		
		if (identifier === 'null')                                                 // reads.jsxi:51
			return {
				type: Token.NullLiteral,                                           // reads.jsxi:53
				value: identifier,                                                 // reads.jsxi:54
				lineNumber: lineNumber,                                            // reads.jsxi:55
				range: [ start, index ]
			};
		
		if (identifier === 'true' || identifier === 'false')                       // reads.jsxi:59
			return {
				type: Token.BooleanLiteral,                                        // reads.jsxi:61
				value: identifier,                                                 // reads.jsxi:62
				lineNumber: lineNumber,                                            // reads.jsxi:63
				range: [ start, index ]
			};
		
		if (identifier === 'undefined')                                            // reads.jsxi:67
			return {
				type: Token.UndefinedLiteral,                                      // reads.jsxi:69
				value: identifier,                                                 // reads.jsxi:70
				lineNumber: lineNumber,                                            // reads.jsxi:71
				range: [ start, index ]
			};
		return {
			type: Token.Identifier,                                                // reads.jsxi:76
			value: identifier,                                                     // reads.jsxi:77
			lineNumber: lineNumber,                                                // reads.jsxi:78
			range: [ start, index ]
		};
	} else if (source [index] === '@')                                             // reads.jsxi:81
		throw new Error ('Unexpected macro');                                      // reads.jsxi:82
}

function readNumericLiteral (){                                                    // reads.jsxi:85
	var start = index;
	
	if (source [index] === '0' && (source [index + 1] === 'x' || source [index + 1] === 'X')){
		index += 2;                                                                // reads.jsxi:89
		
		while (index < length && hexDigit (source [index]))                        // reads.jsxi:91
			index ++;                                                              // reads.jsxi:92
		
		if (index === start + 2)                                                   // reads.jsxi:94
			unexpected ();                                                         // reads.jsxi:95
	} else {
		if (source [index] !== '.')                                                // reads.jsxi:97
			while (index < length && decimalDigit (source [index]))                // reads.jsxi:98
				index ++;                                                          // reads.jsxi:99
		
		if (source [index] === '.' && source [index + 1] !== '.'){                 // reads.jsxi:101
			index ++;                                                              // reads.jsxi:102
			
			while (index < length && decimalDigit (source [index]))                // reads.jsxi:104
				index ++;                                                          // reads.jsxi:105
		}
		
		if (source [index] === 'e' || source [index] === 'E'){                     // reads.jsxi:108
			index ++;                                                              // reads.jsxi:109
			
			if (source [index] === '+' || source [index] === '-')                  // reads.jsxi:111
				index ++;                                                          // reads.jsxi:112
			
			if (!decimalDigit (source [index]))                                    // reads.jsxi:114
				unexpected ();                                                     // reads.jsxi:115
			
			index ++;                                                              // reads.jsxi:117
			
			while (index < length && decimalDigit (source [index]))                // reads.jsxi:118
				index ++;                                                          // reads.jsxi:119
		}
	}
	
	if (index < length && identifierStart (source [index]))                        // reads.jsxi:123
		unexpected ();                                                             // reads.jsxi:124
	return {
		type: Token.NumericLiteral,                                                // reads.jsxi:127
		value: source.substring (start, index),                                    // reads.jsxi:128
		lineNumber: lineNumber,                                                    // reads.jsxi:129
		range: [ start, index ]
	};
}

function readPunctuator (){                                                        // reads.jsxi:134
	var start = index, ch1 = source [index], ch2, ch3, ch4;
	
	if (ch1 === ';' || ch1 === '{' || ch1 === '}' || ch1 === ',' || ch1 === '(' || ch1 === ')')
		return {
			type: Token.Punctuator,                                                // reads.jsxi:143
			value: ch1,                                                            // reads.jsxi:144
			lineNumber: lineNumber,                                                // reads.jsxi:145
			range: [ start, ++ index ]
		};
	
	ch2 = source [index + 1];                                                      // reads.jsxi:149
	ch3 = source [index + 2];                                                      // reads.jsxi:150
	
	if (ch1 === '.')                                                               // reads.jsxi:153
		if (ch2 === '.')                                                           // reads.jsxi:154
			return {
				type: Token.Punctuator,                                            // reads.jsxi:156
				value: ch3 === '.' ? '...' : '..',                                 // reads.jsxi:157
				lineNumber: lineNumber,                                            // reads.jsxi:158
				range: [ start, index += ch3 === '.' ? 3 : 2 ]
			};
		else if (!decimalDigit (ch2))                                              // reads.jsxi:161
			return {
				type: Token.Punctuator,                                            // reads.jsxi:163
				value: '.',                                                        // reads.jsxi:164
				lineNumber: lineNumber,                                            // reads.jsxi:165
				range: [ start, ++ index ]
			};
	
	ch4 = source [index + 3];                                                      // reads.jsxi:169
	
	if (ch1 === '>' && ch2 === '>' && ch3 === '>' && ch4 === '=')                  // reads.jsxi:172
		return {
			type: Token.Punctuator,                                                // reads.jsxi:174
			value: '>>>=',                                                         // reads.jsxi:175
			lineNumber: lineNumber,                                                // reads.jsxi:176
			range: [ start, index += 4 ]
		};
	
	if ((ch1 === '=' || ch1 === '!') && ch2 === '=' && ch3 === '=' || ch1 === '<' && ch2 === '<' && ch3 === '=' || ch1 === '>' && ch2 === '>' && (ch3 === '>' || ch3 === '='))
		return {
			type: Token.Punctuator,                                                // reads.jsxi:185
			value: ch1 + ch2 + ch3,                                                // reads.jsxi:186
			lineNumber: lineNumber,                                                // reads.jsxi:187
			range: [ start, index += 3 ]
		};
	
	if (ch2 === '=' && '<>=!+-*%&|^/'.indexOf (ch1) >= 0 || ch1 === ch2 && '+-<>&|'.indexOf (ch1) >= 0)
		return {
			type: Token.Punctuator,                                                // reads.jsxi:195
			value: ch1 + ch2,                                                      // reads.jsxi:196
			lineNumber: lineNumber,                                                // reads.jsxi:197
			range: [ start, index += 2 ]
		};
	
	if (ch1 === '[' || ch1 === ']' || ch1 === '<' || ch1 === '>' || ch1 === '+' || ch1 === '-' || ch1 === '*' || ch1 === '%' || ch1 === '&' || ch1 === '|' || ch1 === '^' || ch1 === '!' || ch1 === '~' || ch1 === '?' || ch1 === ':' || ch1 === '=' || ch1 === '/')
		return {
			type: Token.Punctuator,                                                // reads.jsxi:209
			value: ch1,                                                            // reads.jsxi:210
			lineNumber: lineNumber,                                                // reads.jsxi:211
			range: [ start, ++ index ]
		};
}

function readRegexp (){                                                            // reads.jsxi:216
	var start = index - 1, end = null, classMarker = false;
	
	loop: while (index < length){                                                  // reads.jsxi:221
		switch (source [index ++]){                                                // reads.jsxi:222
			case '\\':                                                             // reads.jsxi:223
				if (source [index ++] !== '\n')                                    // reads.jsxi:224
					break;
			case '\n':                                                             // reads.jsxi:227
				break loop;                                                        // reads.jsxi:228
			case '/':                                                              // reads.jsxi:230
				if (classMarker){                                                  // reads.jsxi:231
					continue loop;                                                 // reads.jsxi:232
				} else {
					end = index;                                                   // reads.jsxi:234
					
					break loop;                                                    // reads.jsxi:235
				}
			case '[':                                                              // reads.jsxi:238
				classMarker = true;                                                // reads.jsxi:239
				
				break;
			case ']':                                                              // reads.jsxi:242
				classMarker = false;                                               // reads.jsxi:243
				
				break;
		}
	}
	
	if (end === null)                                                              // reads.jsxi:248
		unexpected ('Invalid regular expression: missing /');                      // reads.jsxi:249
	
	while (index < length && identifierPart (source [index]))                      // reads.jsxi:251
		index ++;                                                                  // reads.jsxi:252
	
	try {
		new RegExp (source.substring (start + 1, end - 1),                         // reads.jsxi:256
			source.substring (end, index));                                        // reads.jsxi:256
	} catch (e){
		throw new Error ('Invalid regular expression');                            // reads.jsxi:258
	} 
	return regexpLiteral (source.substring (start, index));                        // reads.jsxi:260
}

function readStringLiteral (){                                                     // reads.jsxi:263
	var quote = source [index], start = index ++;
	
	while (index < length && source [index] !== quote)                             // reads.jsxi:268
		index += source [index] === '\\' ? 2 : 1;                                  // reads.jsxi:269
	
	if (source [index ++] !== quote)                                               // reads.jsxi:271
		unexpected ();                                                             // reads.jsxi:272
	return {
		type: Token.StringLiteral,                                                 // reads.jsxi:275
		value: source.substring (start, index),                                    // reads.jsxi:276
		lineNumber: lineNumber,                                                    // reads.jsxi:277
		range: [ start, index ]
	};
}

function readMultilineString (){                                                   // reads.jsxi:282
	var start = index ++;
	
	while (index < length && source [index] !== '`')                               // reads.jsxi:286
		index += source [index] === '\\' ? 2 : 1;                                  // reads.jsxi:287
	
	if (source [index ++] !== '`')                                                 // reads.jsxi:289
		unexpected ();                                                             // reads.jsxi:290
	
	var result = source.substring (start + 1, index - 1),                          // reads.jsxi:292
		spaces = result.match (/\n([\t ]*)/g);                                     // reads.jsxi:293
	
	if (spaces){                                                                   // reads.jsxi:295
		var tabSize = 4, tabSpaces = new Array (tabSize + 1).join (' ');
		
		spaces = spaces.concat (source.substring (source.lastIndexOf ('\n', start), start + 1).replace (/[^\n\t ]/g, ' ')).map (function (arg){
			return Array.prototype.reduce.call (arg.replace (/^\n/, ''),           // reads.jsxi:301
				function (a, b){                                                   // reads.jsxi:301
					return a += b === '\t' ? tabSize : 1;                          // reads.jsxi:301
				}, 
				0);
		}).reduce (function (a, b){                                                // reads.jsxi:302
			return a < b ? a : b;                                                  // reads.jsxi:302
		});
		
		var regExp = new RegExp ('\\n(?:\\t|' + tabSpaces + '){' + Math.floor (spaces / tabSize) + '}' + tabSpaces.substr (0, spaces % tabSize), 
			'g');                                                                  // reads.jsxi:304
		
		result = result.replace (regExp, '\n');                                    // reads.jsxi:305
	}
	return {
		type: Token.StringLiteral,                                                 // reads.jsxi:309
		value: JSON.stringify (result.replace (/\\`/g, '`')),                      // reads.jsxi:310
		lineNumber: lineNumber,                                                    // reads.jsxi:311
		range: [ start, index ]
	};
}

function skipComments (){                                                          // reads.jsxi:316
	var blockComment = false, lineComment = false;
	
	while (index < length){                                                        // reads.jsxi:320
		var character = source [index];
		
		if (character === ' ' || character === '\t' || character === '\u00A0'){    // reads.jsxi:323
			index ++;                                                              // reads.jsxi:324
		} else if (character === '\n'){                                            // reads.jsxi:325
			index ++;                                                              // reads.jsxi:326
			lineNumber ++;                                                         // reads.jsxi:327
			
			if (lineComment)                                                       // reads.jsxi:328
				lineComment = false;                                               // reads.jsxi:329
		} else if (lineComment){                                                   // reads.jsxi:330
			index ++;                                                              // reads.jsxi:331
		} else if (blockComment){                                                  // reads.jsxi:332
			if (character === '*' && source [index + 1] === '/'){                  // reads.jsxi:333
				index += 2;                                                        // reads.jsxi:334
				blockComment = false;                                              // reads.jsxi:335
			} else
				index ++;                                                          // reads.jsxi:337
		} else if (character === '/'){                                             // reads.jsxi:338
			character = source [index + 1];                                        // reads.jsxi:339
			
			if (character === '/'){                                                // reads.jsxi:341
				index += 2;                                                        // reads.jsxi:342
				lineComment = true;                                                // reads.jsxi:343
			} else if (character === '*'){                                         // reads.jsxi:344
				index += 2;                                                        // reads.jsxi:345
				blockComment = true;                                               // reads.jsxi:346
			} else
				break;
		} else
			break;
	}
	
	if (index === length && blockComment)                                          // reads.jsxi:353
		unexpected ();                                                             // reads.jsxi:354
}

function JsExtError (name, message, location){                                     // throws.jsxi:1
	var filename = location && location.filename || options && options.filename || '<unknown file>', 
		line = location && location.lineNumber || lineNumber || '<unknown line>', 
		result = new Error (message + ' [' + filename + ':' + line + ']');         // throws.jsxi:4
	
	result.name = name;                                                            // throws.jsxi:6
	return result;                                                                 // throws.jsxi:7
}

var SyntaxError = JsExtError.bind (null, 'SyntaxError'),                           // throws.jsxi:10
	TypeError = JsExtError.bind (null, 'TypeError'),                               // throws.jsxi:11
	ReferenceError = JsExtError.bind (null, 'ReferenceError');                     // throws.jsxi:12

function unexpected (what){                                                        // throws.jsxi:14
	var message;
	
	if (!what){                                                                    // throws.jsxi:17
		message = 'Illegal token';                                                 // throws.jsxi:18
	} else if (what.value){                                                        // throws.jsxi:19
		message = 'Unexpected ' + (what.value [0] === '"' || what.value [0] === '\'' ? what.value : '"' + what.value + '"');
	} else if (TokenName [what.type]){                                             // throws.jsxi:21
		message = 'Unexpected ' + TokenName [what.type].toLowerCase ();            // throws.jsxi:22
	} else
		message = 'Unexpected token';                                              // throws.jsxi:24
	
	throw new SyntaxError (message, what);                                         // throws.jsxi:26
}

process.on ('uncaughtException',                                                   // utils.jsxi:1
	function (arg){                                                                // utils.jsxi:1
		return console.fatal ('    [    UNCAUGHT    ]\n\n' + (arg && arg.stack ? arg.stack : String (arg)));
	});
console.fatal = function (){                                                       // utils.jsxi:3
	console.log ('\n    [  FATAL  ERROR  ]\n');                                    // utils.jsxi:4
	console.log.apply (console, arguments);                                        // utils.jsxi:5
	console.log ('');                                                              // utils.jsxi:6
	console.log = function (arg){};
	setTimeout (function (arg){                                                    // utils.jsxi:8
		return process.exit (1);                                                   // utils.jsxi:8
	}, 
	500);
};
console.json = function (obj){                                                     // utils.jsxi:11
	console.log (JSON.stringify (obj, false, 
		4));                                                                       // utils.jsxi:12
};

function set (to, from){                                                           // utils.jsxi:15
	if (to instanceof Array && from instanceof Array){                             // utils.jsxi:16
		to.length = from.length;                                                   // utils.jsxi:17
		
		for (var index = 0; index < from.length; index ++){                        // utils.jsxi:18
			var element = from [index];
			
			to [index] = element;                                                  // utils.jsxi:19
		}
	} else {
		for (var n in to)                                                          // utils.jsxi:21
			delete to [n];                                                         // utils.jsxi:22
		
		for (var n in from)                                                        // utils.jsxi:23
			to [n] = from [n];                                                     // utils.jsxi:24
	}
}

function convert (jsxCode, options){                                               // utils.jsxi:28
	var parsed;
	
	if (typeof jsxCode === 'string'){                                              // utils.jsxi:31
		try {
			parsed = jsxParse (jsxCode, options);                                  // utils.jsxi:33
		} catch (e){
			console.fatal ('Parsing failed (' + options.filename + ')' + ('\n' + jsxCode.trim ()).replace (/\n/g, '\n> ') + '\n\n' + e.stack);
		} 
	} else
		parsed = jsxCode;                                                          // utils.jsxi:39
	
	try {
		if (options.filename === 'result')                                         // utils.jsxi:42
			badMode = 1;                                                           // utils.jsxi:43
		return generate (parsed);                                                  // utils.jsxi:44
	} catch (e){
		console.fatal ('Generating failed (' + options.filename + ')\n' + e.stack);
	} 
}

var previousT = (function (arg){                                                   // utils.jsxi:50
	return arg [0] * 1e9 + arg [1];                                                // utils.jsxi:50
})(process.hrtime ());

function addLog (p, key, fn){                                                      // utils.jsxi:52
	if (!p || !p.prototype){                                                       // utils.jsxi:53
		fn = key;                                                                  // utils.jsxi:54
		key = p;                                                                   // utils.jsxi:55
		p = null;                                                                  // utils.jsxi:56
	}
	
	if (typeof key === 'number')                                                   // utils.jsxi:59
		key = new Array (key + 1).join ('  ');                                     // utils.jsxi:60
	else
		key = key + 1;                                                             // utils.jsxi:62
	
	function tstr (n){                                                             // utils.jsxi:64
		var s = String (n / 1e9 | 0), ms = String (n % 1e9 / 1e6 | 0);
		
		while (s.length < 2)                                                       // utils.jsxi:68
			s = '0' + s;                                                           // utils.jsxi:69
		
		while (ms.length < 3)                                                      // utils.jsxi:71
			ms = '0' + ms;                                                         // utils.jsxi:72
		return '[' + s + '.' + ms + ']';                                           // utils.jsxi:74
	}
	
	var size = 32,                                                                 // utils.jsxi:77
		r = function (arg){                                                        // utils.jsxi:78
			var f = [ key + (typeof fn === 'function' ? fn.call (this) : fn) + ':' ], 
				h = process.hrtime (),                                             // utils.jsxi:80
				t = h [0] * 1e9 + h [1];                                           // utils.jsxi:81
			
			if (f [0].length > size)                                               // utils.jsxi:83
				f [0] = f [0].substr (0, size - 4) + '...:';                       // utils.jsxi:84
			
			f [0] += new Array (1 + size - f [0].length).join (' ');               // utils.jsxi:85
			f.push.apply (f, arguments);                                           // utils.jsxi:86
			f.unshift (tstr (t - previousT));                                      // utils.jsxi:87
		};
	return p ? (p.prototype.log = r) : r;                                          // utils.jsxi:92
}

function isEmpty (obj){                                                            // utils.jsxi:95
	for (var n in obj)                                                             // utils.jsxi:96
		return false;
	return true;
}

var $ = {                                                                          // utils.jsxi:101
	extend: (function (){                                                          // utils.jsxi:101
		function extend (target, source, deep){                                    // utils.jsxi:105
			for (var key in source){                                               // utils.jsxi:106
				var value = source [key];
				
				if (deep && (typeof value === 'object' || value instanceof Array)){
					if (value instanceof Array && !(target [key] instanceof Array))
						target [key] = [];                                         // utils.jsxi:109
					else if (typeof value === 'object' && typeof target [key] !== 'object')
						target [key] = {};                                         // utils.jsxi:111
					
					extend (target [key], value, deep);                            // utils.jsxi:113
				} else if (value !== undefined)                                    // utils.jsxi:114
					target [key] = value;                                          // utils.jsxi:115
			}
		}
		return (function (target){                                                 // utils.jsxi:117
			var deep, args = Array.prototype.slice.call (arguments, 1);
			
			if (typeof target == 'boolean'){                                       // utils.jsxi:121
				deep = target;                                                     // utils.jsxi:122
				target = args.shift ();                                            // utils.jsxi:123
			}
			
			args.forEach (function (arg){                                          // utils.jsxi:126
				return extend (target, arg, deep);                                 // utils.jsxi:126
			});
			return target;                                                         // utils.jsxi:127
		});
	})()
};

var fs = require ('fs'), path = require ('path');

function benchmark (input, output, count){                                         // app.jsxi:4
	if (count === undefined)                                                       // app.jsxi:4
		count = 1;                                                                 // app.jsxi:4

	var data, result, from, total = 0;
	
	console.time ('ast loaded');                                                   // app.jsxi:10
	data = JSON.parse (fs.readFileSync (input));                                   // app.jsxi:11
	console.timeEnd ('ast loaded');                                                // app.jsxi:12
	
	for (var i = 0; i < count; i ++){                                              // app.jsxi:14
		from = + new Date ();                                                      // app.jsxi:15
		console.time ('generate');                                                 // app.jsxi:16
		result = generate (data);                                                  // app.jsxi:17
		console.timeEnd ('generate');                                              // app.jsxi:18
		total += + new Date () - from;                                             // app.jsxi:19
	}
	
	if (i > 1)                                                                     // app.jsxi:22
		console.log ('average time: ' + total / count + 'ms');                     // app.jsxi:23
	
	if (result)                                                                    // app.jsxi:25
		fs.writeFileSync (output, result);                                         // app.jsxi:26
}

process.nextTick (function (arg){                                                  // app.jsxi:29
	args = parseArgs (process.argv.slice (2),                                      // app.jsxi:30
		[
			{ s: 'i', l: 'include', p: 2 }, 
			{ s: 'o', l: 'output', p: 1 }, 
			{ s: 'h', l: 'usage' }
		]);
	new Worker (args.data [0].replace (/^"|"$/g, '')).process ();                  // app.jsxi:45
});

function parseArgs (data, args){                                                   // application_args.jsxi:1
	var result = {                                                                 // application_args.jsxi:2
		data: [],                                                                  // application_args.jsxi:2
		put: (function (info, value){                                              // application_args.jsxi:4
			if (info.p == 2){                                                      // application_args.jsxi:5
				if (!this [info.s])                                                // application_args.jsxi:6
					this [info.s] = [];                                            // application_args.jsxi:7
				
				this [info.s].push (value);                                        // application_args.jsxi:8
			} else
				this [info.s] = info.p ? value : true;                             // application_args.jsxi:10
		})
	};
	
	for (var i = 0; i < data.length; i ++){                                        // application_args.jsxi:14
		var s = data [i];
		
		function put (fn, info){                                                   // application_args.jsxi:15
			if (info = args.filter (fn)[0]){                                       // application_args.jsxi:16
				result.put (info, data [i + 1]);                                   // application_args.jsxi:17
				
				if (info.p)                                                        // application_args.jsxi:18
					++ i;                                                          // application_args.jsxi:19
			} else
				return console.fatal (1, 'Invalid arguments. Use "--usage" for view help.');
		}
		
		if (s [0] == '-'){                                                         // application_args.jsxi:23
			if (s [1] == '-')                                                      // application_args.jsxi:24
				put (function (arg){                                               // application_args.jsxi:25
					return arg.l == s.slice (2);                                   // application_args.jsxi:25
				});
			else {
				var __14 = s.slice (1);
				
				for (var __13 = 0; __13 < __14.length; __13 ++){
					var k = __14 [__13];
					
					put (function (arg){                                           // application_args.jsxi:28
						return arg.s == k;                                         // application_args.jsxi:28
					});
				}
				
				__14 = undefined;
			}
		} else
			result.data.push (s);                                                  // application_args.jsxi:30
	}
	
	if (result.h){                                                                 // application_args.jsxi:33
		console.log ('Available args:');                                           // application_args.jsxi:34
		args.forEach (function (arg){                                              // application_args.jsxi:35
			return console.log (' -' + arg.s + ' (--' + arg.l + ')');              // application_args.jsxi:35
		});
		process.exit (0);                                                          // application_args.jsxi:36
	} else
		return result;                                                             // application_args.jsxi:38
}

function Context (file){                                                           // context.jsxi:1
	console.assert (file instanceof File, 'File required');                        // context.jsxi:2
	this.id = Context.ids.indexOf (file.fullpath);                                 // context.jsxi:4
	
	if (this.id === - 1)                                                           // context.jsxi:5
		this.id = Context.ids.push (file.fullpath) - 1;                            // context.jsxi:6
	
	this.file = file;                                                              // context.jsxi:8
}

Context.ids = [];                                                                  // context.jsxi:11

function paramsManager (){                                                         // defaults.jsxi:1
	var that = this;
	return {
		add: (function (key, value){                                               // defaults.jsxi:5
			switch (key){                                                          // defaults.jsxi:6
				case 'import':                                                     // defaults.jsxi:7
					var other = that.context.file.findChild (value);
					
					if (other)                                                     // defaults.jsxi:9
						other.forEach (function (arg){                             // defaults.jsxi:10
							that.context.file.imports.push (arg);                  // defaults.jsxi:11
							
							if (arg.state === File.STATE_INITIAL)                  // defaults.jsxi:12
								arg.process ();                                    // defaults.jsxi:13
						});
					else
						throw new MacroError (that.name, 'Importing file "' + value + '" not found');
					
					break;
				case 'build-to':                                                   // defaults.jsxi:18
					Worker.params.buildTo = path.resolve (that.context.file.dirname, value);
					
					break;
				default:
					throw new MacroError (that.name, 'Wrong param key ("' + key + '")');
			}
		})
	};
}

addLog (File,                                                                      // file.jsxi:159
	1, 
	function (arg){                                                                // file.jsxi:159
		return filename;                                                           // file.jsxi:159
	});

var fileStorage = new FileStorage ();

function FileStorage (){                                                           // file_storage.jsxi:3
	this.files = [];                                                               // file_storage.jsxi:4
}

FileStorage.prototype.sort = function (){                                          // file_storage.jsxi:7
	this.files.sort (function (a, b){                                              // file_storage.jsxi:8
		return a.weight () > b.weight ();                                          // file_storage.jsxi:8
	});
};
FileStorage.prototype.get = function (arg){                                        // file_storage.jsxi:11
	var fullpath = arg instanceof File ? arg.fullpath : arg;
	return this.files.filter (function (arg){                                      // file_storage.jsxi:13
		return arg.fullpath === fullpath;                                          // file_storage.jsxi:13
	})[0];
};
FileStorage.prototype.exists = function (arg){                                     // file_storage.jsxi:16
	return !!this.get (arg);                                                       // file_storage.jsxi:17
};
FileStorage.prototype.add = function (file){                                       // file_storage.jsxi:20
	console.assert (!this.exists (file), 'File already added');                    // file_storage.jsxi:21
	this.files.push (file);                                                        // file_storage.jsxi:22
};
FileStorage.prototype.has = function (fn){                                         // file_storage.jsxi:25
	{
		var __18 = this.files;
		
		for (var __17 = 0; __17 < __18.length; __17 ++){
			var file = __18 [__17];
			
			if (fn (file.state))                                                   // file_storage.jsxi:27
				return true;
		}
		
		__18 = undefined;
	}
	return false;
};
FileStorage.prototype.everythingFinished = function (){                            // file_storage.jsxi:32
	return !this.has (function (arg){                                              // file_storage.jsxi:33
		return arg !== File.STATE_FINISHED;                                        // file_storage.jsxi:33
	});
};

function niceGeneratorMode (value){                                                // generator.jsxi:8
	return niceMode = value;                                                       // generator.jsxi:9
}

var niceMode = true,                                                               // generator.jsxi:12
	generate = (function (){                                                       // generator.jsxi:13
		var priorities = [                                                         // generator.jsxi:14
				Syntax.MemberExpression,                                           // generator.jsxi:14
				Syntax.NewExpression,                                              // generator.jsxi:16
				Syntax.CallExpression,                                             // generator.jsxi:17
				[ '++', '--' ], 
				Syntax.UnaryExpression,                                            // generator.jsxi:20
				[ '*', '/', '%' ], 
				[ '+', '-' ], 
				[ '<<', '>>', '>>>' ], 
				[ '<', '<=', '>', '>=', 'in', 'instanceof' ], 
				[ '==', '!=', '===', '!==' ], 
				[ '&' ], 
				[ '^' ], 
				[ '|' ], 
				[ '&&' ], 
				[ '||' ], 
				Syntax.ConditionalExpression,                                      // generator.jsxi:34
				Syntax.AssignmentExpression,                                       // generator.jsxi:35
				Syntax.SequenceExpression
			], 
			spaces = new Array (300).join (' '),                                   // generator.jsxi:38
			badMode = 0,                                                           // generator.jsxi:39
			comment = null,                                                        // generator.jsxi:40
			comments = [];                                                         // generator.jsxi:41
		
		function findPriority (type, operator){                                    // generator.jsxi:43
			for (var priority = 0; priority < priorities.length; priority ++){     // generator.jsxi:44
				var group = priorities [priority];
				
				if (typeof group === 'string'){                                    // generator.jsxi:45
					if (group === type)                                            // generator.jsxi:46
						return priority;                                           // generator.jsxi:47
				} else if (group.indexOf (operator) !== - 1)                       // generator.jsxi:48
					return priority;                                               // generator.jsxi:49
			}
		}
		
		function generate (node, tabs, parent){                                    // generator.jsxi:52
			function end (){                                                       // generator.jsxi:53
				if (comment !== null){                                             // generator.jsxi:54
					var result = '//' + (comments.push (comment) - 1) + '\n' + tabs;
					
					comment = null;                                                // generator.jsxi:56
					return result;                                                 // generator.jsxi:57
				} else
					return '\n' + tabs;                                            // generator.jsxi:59
			}
			
			function brackets (arg){                                               // generator.jsxi:61
				if (parent instanceof Array){                                      // generator.jsxi:65
					if (node.type === Syntax.SequenceExpression)                   // generator.jsxi:66
						return '(' + arg + ')';                                    // generator.jsxi:67
				} else if (parent.type !== Syntax.MemberExpression || node === parent.object){
					var nodePriority = findPriority (node.type, node.operator),    // generator.jsxi:69
						parentPriority = findPriority (parent.type, parent.operator);
					
					if (parentPriority !== undefined && nodePriority > parentPriority || nodePriority === parentPriority && node === parent.right)
						return '(' + arg + ')';                                    // generator.jsxi:73
				}
				return arg;                                                        // generator.jsxi:76
			}
			
			function child (obj){                                                  // generator.jsxi:79
				return generate (obj, tabs, node);                                 // generator.jsxi:80
			}
			
			function indent (obj){                                                 // generator.jsxi:82
				return end () + '\t' + generate (obj, tabs + '\t', node);          // generator.jsxi:83
			}
			
			function mapArray (array, joinString, forceWrap, insertSpaces){        // generator.jsxi:85
				if (array.length === 0)                                            // generator.jsxi:86
					return '';                                                     // generator.jsxi:87
				
				function join (array, fn, joinString){                             // generator.jsxi:89
					var result = fn (array [0], 0);
					
					for (var i = 1; i < array.length; i ++)                        // generator.jsxi:94
						result += joinString + end () + '\t' + fn (array [i], i);
					return result;                                                 // generator.jsxi:97
				}
				
				var oneline,                                                       // generator.jsxi:100
					temp = comment,                                                // generator.jsxi:101
					localTabs = tabs + '\t',                                       // generator.jsxi:102
					previous,                                                      // generator.jsxi:103
					result = join (array,                                          // generator.jsxi:104
						forceWrap ? (function (arg, index){                        // generator.jsxi:104
							var indented = generate (arg, localTabs, array);
							
							if ((previous !== arg.type || arg.type !== Syntax.ExpressionStatement) && arg.type !== Syntax.ReturnStatement){
								previous = arg.type;                               // generator.jsxi:107
								
								if (index > 0)                                     // generator.jsxi:108
									return '\n' + localTabs + indented;            // generator.jsxi:109
							}
							return indented;                                       // generator.jsxi:111
						}) : (function (arg){                                      // generator.jsxi:112
							var indented = generate (arg, localTabs, array);
							
							if (!forceWrap && indented.indexOf ('\n') !== - 1)     // generator.jsxi:114
								forceWrap = true;                                  // generator.jsxi:115
							return indented;                                       // generator.jsxi:116
						}), 
						joinString);                                               // generator.jsxi:117
				
				if (!forceWrap)                                                    // generator.jsxi:120
					oneline = result.replace (/\/\/\d+\n\t*/g, '');                // generator.jsxi:121
				
				if (forceWrap || !oneline || oneline.length > 60){                 // generator.jsxi:125
					if (insertSpaces){                                             // generator.jsxi:128
						comment = temp;                                            // generator.jsxi:129
						return end () + '\t' + result + end ();                    // generator.jsxi:130
					} else
						return result;                                             // generator.jsxi:132
				} else {
					comment = temp;                                                // generator.jsxi:135
					
					if (insertSpaces)                                              // generator.jsxi:138
						return ' ' + oneline + ' ';                                // generator.jsxi:139
					else
						return oneline;                                            // generator.jsxi:141
				}
			}
			
			function sub (obj){                                                    // generator.jsxi:145
				return obj.type === Syntax.BlockStatement ? child (obj) : obj.type === Syntax.EmptyStatement ? ';' : indent (obj);
			}
			
			if (!node || !node.type){                                              // generator.jsxi:148
				console.json (parent);                                             // generator.jsxi:149
				
				throw new Error ('Node = ' + JSON.stringify (node, false, 
					4));                                                           // generator.jsxi:150
			}
			
			if (niceMode && comment === null && node.filename)                     // generator.jsxi:153
				comment = node.filename + ':' + node.lineNumber;                   // generator.jsxi:154
			
			var result, temp;
			
			switch (node.type){                                                    // generator.jsxi:158
				case Syntax.BooleanLiteral:                                        // generator.jsxi:160
					
				case Syntax.NullLiteral:                                           // generator.jsxi:161
					
				case Syntax.NumericLiteral:                                        // generator.jsxi:162
					
				case Syntax.RegexpLiteral:                                         // generator.jsxi:163
					
				case Syntax.StringLiteral:                                         // generator.jsxi:164
					
				case Syntax.UndefinedLiteral:                                      // generator.jsxi:165
					return node.value;                                             // generator.jsxi:166
				case Syntax.Identifier:                                            // generator.jsxi:168
					return node.name;                                              // generator.jsxi:169
				case Syntax.Property:                                              // generator.jsxi:171
					return child (node.key) + ': ' + child (node.value);           // generator.jsxi:172
				case Syntax.ThisExpression:                                        // generator.jsxi:174
					return 'this';                                                 // generator.jsxi:175
				case Syntax.MemberExpression:                                      // generator.jsxi:179
					result = child (node.object);                                  // generator.jsxi:180
					
					if (node.computed){                                            // generator.jsxi:181
						if (/\w$/.test (result))                                   // generator.jsxi:182
							result += ' ';                                         // generator.jsxi:183
						
						result += '[' + child (node.property) + ']';               // generator.jsxi:184
					} else
						result += '.' + child (node.property);                     // generator.jsxi:186
					return result;                                                 // generator.jsxi:187
				case Syntax.NewExpression:                                         // generator.jsxi:191
					result = 'new ';                                               // generator.jsxi:192
				case Syntax.CallExpression:                                        // generator.jsxi:194
					result = (result || '') + child (node.callee);                 // generator.jsxi:195
					result += /\w$/.test (result) ? ' (' : '(';                    // generator.jsxi:196
					temp = mapArray (node.arguments, ', ', false, 
						false);                                                    // generator.jsxi:197
					
					if (temp.match (/\n(\t*)/) && RegExp.$1.length > tabs.length + 1)
						temp = temp.replace (/\n\t/g, '\n');                       // generator.jsxi:199
					return result + temp + ')';                                    // generator.jsxi:200
				case Syntax.UnaryExpression:                                       // generator.jsxi:204
					if (node.prefix){                                              // generator.jsxi:205
						result = node.operator;                                    // generator.jsxi:206
						
						if (node.operator !== '!')                                 // generator.jsxi:207
							result += ' ';                                         // generator.jsxi:208
						
						result += child (node.argument);                           // generator.jsxi:209
					} else
						result = child (node.argument) + ' ' + node.operator;      // generator.jsxi:211
					return brackets (result);                                      // generator.jsxi:212
				case Syntax.AssignmentExpression:                                  // generator.jsxi:214
					
				case Syntax.BinaryExpression:                                      // generator.jsxi:215
					
				case Syntax.LogicalExpression:                                     // generator.jsxi:216
					return brackets (child (node.left) + ' ' + node.operator + ' ' + child (node.right));
				case Syntax.SequenceExpression:                                    // generator.jsxi:219
					return brackets (mapArray (node.expressions, ', '));           // generator.jsxi:220
				case Syntax.ConditionalExpression:                                 // generator.jsxi:222
					return brackets (child (node.test) + ' ? ' + child (node.consequent) + ' : ' + child (node.alternate));
				case Syntax.ArrayExpression:                                       // generator.jsxi:227
					return '[' + mapArray (node.elements, ', ', false, 
						true) + ']';                                               // generator.jsxi:228
				case Syntax.ObjectExpression:                                      // generator.jsxi:230
					return '{' + mapArray (node.properties, ', ', false, 
						true) + '}';                                               // generator.jsxi:231
				case Syntax.FunctionExpression:                                    // generator.jsxi:233
					if (node.id)                                                   // generator.jsxi:234
						result = 'function ' + child (node.id) + ' (';             // generator.jsxi:235
					else
						result = 'function (';                                     // generator.jsxi:237
					
					result += mapArray (node.params, ', ') + ')' + child (node.body);
					
					if (parent.type === Syntax.VariableDeclarator || parent.type === Syntax.AssignmentExpression || parent instanceof Array)
						return result;                                             // generator.jsxi:241
					else
						return '(' + result + ')';                                 // generator.jsxi:243
				case Syntax.ClassDeclaration:                                      // generator.jsxi:247
					result = '/* Class "' + node.name + '" declaration */';        // generator.jsxi:248
					
					{
						var __1a = node.statements;
						
						for (var __19 = 0; __19 < __1a.length; __19 ++){
							var statement = __1a [__19];
							
							result += end () + generate (statement, tabs, parent);
						}
						
						__1a = undefined;
					}
					return result;                                                 // generator.jsxi:251
				case Syntax.FunctionDeclaration:                                   // generator.jsxi:253
					return 'function ' + child (node.id) + ' (' + mapArray (node.params, ', ') + ')' + child (node.body);
				case Syntax.VariableDeclaration:                                   // generator.jsxi:256
					temp = mapArray (node.declarations, ', ');                     // generator.jsxi:257
					
					if (node.declarations.length === 1 && temp.match (/\n(\t*)/) && RegExp.$1.length > tabs.length + 1)
						temp = temp.replace (/\n\t/g, '\n');                       // generator.jsxi:259
					
					if (parent.type === Syntax.ForStatement || parent.type === Syntax.ForInStatement)
						return 'var ' + temp;                                      // generator.jsxi:261
					else
						return 'var ' + temp + ';';                                // generator.jsxi:263
				case Syntax.VariableDeclarator:                                    // generator.jsxi:265
					return node.init ? child (node.id) + ' = ' + child (node.init) : child (node.id);
				case Syntax.BlockStatement:                                        // generator.jsxi:270
					temp = node.body.length > 0;                                   // generator.jsxi:271
					result = '{' + end () + '\t';                                  // generator.jsxi:273
					
					if (parent.type === Syntax.FunctionDeclaration || parent.type === Syntax.FunctionExpression){
						var __1c = parent.params;
						
						for (var __1b = 0; __1b < __1c.length; __1b ++){
							var param = __1c [__1b];
							
							if (param.defaultValue){                               // generator.jsxi:277
								result += 'if (' + child (param) + ' === undefined)' + end () + '\t\t' + child (param) + ' = ' + child (param.defaultValue) + ';' + end () + '\n\t' + tabs;
								temp = true;                                       // generator.jsxi:279
							}
						}
						
						__1c = undefined;
					}
					
					result += mapArray (node.body, '', true);                      // generator.jsxi:282
					result += end () + '}';                                        // generator.jsxi:283
					
					if (temp){                                                     // generator.jsxi:285
						return result;                                             // generator.jsxi:286
					} else
						return '{}';                                               // generator.jsxi:288
				case Syntax.ExpressionStatement:                                   // generator.jsxi:290
					result = child (node.expression);                              // generator.jsxi:291
					
					if (/^function\s*\(/.test (result))                            // generator.jsxi:292
						return '(' + result + ');';                                // generator.jsxi:293
					else
						return result + ';';                                       // generator.jsxi:295
				case Syntax.EmptyStatement:                                        // generator.jsxi:297
					return ';';                                                    // generator.jsxi:298
				case Syntax.LabeledStatement:                                      // generator.jsxi:300
					return child (node.label) + ': ' + child (node.body);          // generator.jsxi:301
				case Syntax.NotImplementedStatement:                               // generator.jsxi:303
					return 'console.warn (\'Not implemented at ' + node.lineNumber + ' line of ' + node.filename + '\');';
				case Syntax.ReturnStatement:                                       // generator.jsxi:307
					return 'return' + (node.argument ? ' ' + child (node.argument) : '') + ';';
				case Syntax.BreakStatement:                                        // generator.jsxi:310
					if (node.label)                                                // generator.jsxi:311
						return 'break ' + child (node.label) + ';';                // generator.jsxi:312
					else
						return 'break;';                                           // generator.jsxi:314
				case Syntax.ContinueStatement:                                     // generator.jsxi:316
					if (node.label)                                                // generator.jsxi:317
						return 'continue ' + child (node.label) + ';';             // generator.jsxi:318
					else
						return 'continue;';                                        // generator.jsxi:320
				case Syntax.IfStatement:                                           // generator.jsxi:323
					result = 'if (' + child (node.test) + ')' + sub (node.consequent);
					
					if (node.alternate){                                           // generator.jsxi:326
						if (node.consequent.type !== Syntax.BlockStatement)        // generator.jsxi:327
							result += end ();                                      // generator.jsxi:328
						else
							result += ' ';                                         // generator.jsxi:330
						
						result += 'else';                                          // generator.jsxi:332
						
						if (node.alternate.type === Syntax.IfStatement){           // generator.jsxi:334
							result += ' ' + child (node.alternate);                // generator.jsxi:335
						} else {
							if (node.alternate.type === Syntax.BlockStatement)     // generator.jsxi:337
								result += ' ';                                     // generator.jsxi:338
							
							result += sub (node.alternate);                        // generator.jsxi:339
						}
					}
					return result;                                                 // generator.jsxi:343
				case Syntax.SwitchStatement:                                       // generator.jsxi:345
					result = 'switch (' + child (node.discriminant) + '){';        // generator.jsxi:346
					
					{
						var __1e = node.cases;
						
						for (var __1d = 0; __1d < __1e.length; __1d ++){
							var obj = __1e [__1d];
							
							result += indent (obj);                                // generator.jsxi:348
						}
						
						__1e = undefined;
					}
					return result + end () + '}';                                  // generator.jsxi:349
				case Syntax.SwitchCase:                                            // generator.jsxi:351
					result = (node.test ? 'case ' + child (node.test) : 'default') + ':' + end ();
					return result + '\t' + mapArray (node.consequent, '', true);   // generator.jsxi:353
				case Syntax.WhileStatement:                                        // generator.jsxi:356
					return 'while (' + child (node.test) + ')' + sub (node.body);
				case Syntax.DoWhileStatement:                                      // generator.jsxi:359
					result = 'do';                                                 // generator.jsxi:360
					
					if (node.body.type !== Syntax.BlockStatement)                  // generator.jsxi:361
						result += sub (node.body) + end ();                        // generator.jsxi:362
					else
						result += ' ' + sub (node.body) + ' ';                     // generator.jsxi:364
					return result + 'while (' + child (node.test) + ');';          // generator.jsxi:365
				case Syntax.ForStatement:                                          // generator.jsxi:367
					result = 'for (';                                              // generator.jsxi:368
					
					if (node.init)                                                 // generator.jsxi:370
						result += child (node.init) + ';';                         // generator.jsxi:371
					else
						result += ';';                                             // generator.jsxi:373
					
					if (node.test)                                                 // generator.jsxi:375
						result += ' ' + child (node.test) + ';';                   // generator.jsxi:376
					else
						result += ';';                                             // generator.jsxi:378
					
					if (node.update)                                               // generator.jsxi:380
						result += ' ' + child (node.update);                       // generator.jsxi:381
					return result + ')' + sub (node.body);                         // generator.jsxi:383
				case Syntax.ForInStatement:                                        // generator.jsxi:385
					return 'for (' + child (node.left) + ' in ' + child (node.right) + ')' + sub (node.body);
				case Syntax.TryStatement:                                          // generator.jsxi:389
					result = 'try ' + sub (node.block) + ' ';                      // generator.jsxi:390
					
					{
						var __1g = node.handlers;
						
						for (var __1f = 0; __1f < __1g.length; __1f ++){
							var handler = __1g [__1f];
							
							result += child (handler) + ' ';                       // generator.jsxi:392
						}
						
						__1g = undefined;
					}
					
					if (node.finalizer)                                            // generator.jsxi:393
						result += 'finally ' + sub (node.finalizer);               // generator.jsxi:394
					return result;                                                 // generator.jsxi:395
				case Syntax.CatchClause:                                           // generator.jsxi:397
					return 'catch (' + child (node.param) + ')' + sub (node.body);
				case Syntax.ThrowStatement:                                        // generator.jsxi:400
					return 'throw ' + child (node.argument) + ';';                 // generator.jsxi:401
				case Syntax.DebuggerStatement:                                     // generator.jsxi:403
					return 'debugger;';                                            // generator.jsxi:404
				case Syntax.Program:                                               // generator.jsxi:407
					if (node.body.length === 0)                                    // generator.jsxi:408
						return '';                                                 // generator.jsxi:409
					
					result = '';                                                   // generator.jsxi:411
					temp = node.body [0].type;                                     // generator.jsxi:412
					
					{
						var __1h = node.body;
						
						for (var index = 0; index < __1h.length; index ++){        // generator.jsxi:414
							var childNode = __1h [index];
							
							if (index > 0){                                        // generator.jsxi:415
								if (temp !== childNode.type || childNode.type !== Syntax.ExpressionStatement || childNode.headerComment){
									temp = childNode.type;                         // generator.jsxi:417
									result += end () + '\n';                       // generator.jsxi:418
								} else
									result += end ();                              // generator.jsxi:420
							}
							
							result += child (childNode);                           // generator.jsxi:423
						}
						
						__1h = undefined;
					}
					return result + end ();                                        // generator.jsxi:426
				default:
					throw new Error ('Unsupported type: ' + node.type);            // generator.jsxi:429
			}
		}
		return (function (arg){                                                    // generator.jsxi:433
			comments = [];                                                         // generator.jsxi:434
			
			var max = - 1,                                                         // generator.jsxi:436
				maxAllowed = 80,                                                   // generator.jsxi:437
				indent,                                                            // generator.jsxi:438
				begins = [],                                                       // generator.jsxi:439
				previous,                                                          // generator.jsxi:440
				index = 0,                                                         // generator.jsxi:441
				result = generate (arg, '');                                       // generator.jsxi:442
			
			if (niceMode){                                                         // generator.jsxi:444
				result = result.replace (/([^\n]*?)\/\/(\d+)\n/g,                  // generator.jsxi:445
					function (match, begin, found){                                // generator.jsxi:446
						var length = begin.replace (/\t/g, '    ').length;
						
						if (length > maxAllowed){                                  // generator.jsxi:449
							return begin + '\n';                                   // generator.jsxi:450
						} else {
							if (previous !== found)                                // generator.jsxi:452
								previous = found;                                  // generator.jsxi:453
							else
								found = '...';                                     // generator.jsxi:455
							
							begins.push (length);                                  // generator.jsxi:457
							
							if (length > max)                                      // generator.jsxi:458
								max = length;                                      // generator.jsxi:459
							return begin + '//' + found + '\n';                    // generator.jsxi:460
						}
					}).replace (/\/\/(\d+)\n/g,                                    // generator.jsxi:463
					function (match, comment){                                     // generator.jsxi:463
						return spaces.substr (0, max - begins [index ++]) + '   // ' + comments [+ comment] + '\n';
					});
			}
			return result;                                                         // generator.jsxi:467
		});
	})();

function LiteParser (data, index){                                                 // lite_parser.jsxi:1
	if (index === undefined)                                                       // lite_parser.jsxi:1
		index = 0;                                                                 // lite_parser.jsxi:1

	this.data = data;                                                              // lite_parser.jsxi:2
	this.index = index;                                                            // lite_parser.jsxi:3
	this.debugMode = false;                                                        // lite_parser.jsxi:4
	this.binded = [];                                                              // lite_parser.jsxi:5
}

LiteParser.EOF = 1;                                                                // lite_parser.jsxi:8
Object.defineProperty (LiteParser.prototype,                                       // lite_parser.jsxi:10
	'lineNumber',                                                                  // lite_parser.jsxi:10
	{
		get: (function (){                                                         // lite_parser.jsxi:11
			var result = 1;
			
			for (var i = 0, d = this.data, n = Math.min (d.length, this.index); i < n; i ++)
				if (d [i] === '\n')                                                // lite_parser.jsxi:16
					result ++;                                                     // lite_parser.jsxi:17
			return result;                                                         // lite_parser.jsxi:19
		})
	});
Object.defineProperty (LiteParser.prototype,                                       // lite_parser.jsxi:23
	'current',                                                                     // lite_parser.jsxi:23
	{
		get: (function (arg){                                                      // lite_parser.jsxi:23
			return this.data [this.index];                                         // lite_parser.jsxi:23
		})
	});
LiteParser.prototype.replace = function (from, to, replacement){                   // lite_parser.jsxi:25
	if (replacement === undefined)                                                 // lite_parser.jsxi:25
		replacement = '';                                                          // lite_parser.jsxi:25

	console.assert (from <= to, 'Invalid args');                                   // lite_parser.jsxi:26
	
	var delta = String (replacement).length - to + from;
	
	if (this.index >= to)                                                          // lite_parser.jsxi:30
		this.index += delta;                                                       // lite_parser.jsxi:31
	else if (this.index > from)                                                    // lite_parser.jsxi:32
		this.update (from);                                                        // lite_parser.jsxi:33
	
	this.update (this.data = this.data.substr (0, from) + replacement + this.data.substr (to));
	return delta;                                                                  // lite_parser.jsxi:37
};
LiteParser.prototype.substring = function (from, to){                              // lite_parser.jsxi:40
	return this.data.substring (from, to);                                         // lite_parser.jsxi:41
};
LiteParser.prototype.getPosition = function (data, delta){                         // lite_parser.jsxi:44
	return { index: this.index, lineNumber: this.lineNumber };
};
LiteParser.prototype.update = function (data, index){                              // lite_parser.jsxi:50
	if (typeof data === 'string')                                                  // lite_parser.jsxi:51
		this.data = data;                                                          // lite_parser.jsxi:52
	
	if (typeof index === 'number')                                                 // lite_parser.jsxi:54
		this.index = index;                                                        // lite_parser.jsxi:55
	else if (typeof data === 'number')                                             // lite_parser.jsxi:56
		this.index = data;                                                         // lite_parser.jsxi:57
	return this;                                                                   // lite_parser.jsxi:59
};
LiteParser.prototype.on = function (){                                             // lite_parser.jsxi:62
	var args = Array.prototype.slice.call (arguments),                             // lite_parser.jsxi:63
		comment,                                                                   // lite_parser.jsxi:64
		handler;                                                                   // lite_parser.jsxi:65
	
	if (typeof args [args.length - 2] === 'function')                              // lite_parser.jsxi:67
		comment = args.pop ();                                                     // lite_parser.jsxi:68
	
	handler = args.pop ();                                                         // lite_parser.jsxi:70
	
	for (var __1i = 0; __1i < args.length; __1i ++){                               // lite_parser.jsxi:72
		var entry = args [__1i];
		
		this.binded.push ({ match: entry, handler: handler, comment: comment });   // lite_parser.jsxi:73
	}
	return this;                                                                   // lite_parser.jsxi:75
};
LiteParser.prototype.debug = function (from, to){                                  // lite_parser.jsxi:78
	this.debugMode = true;                                                         // lite_parser.jsxi:79
	return this;                                                                   // lite_parser.jsxi:80
};
LiteParser.prototype.findSimple = function (){                                     // lite_parser.jsxi:83
	var value = { index: Number.POSITIVE_INFINITY };
	
	for (var id = 0; id < arguments.length; id ++){                                // lite_parser.jsxi:86
		var arg = arguments [id];
		
		if (arg === LiteParser.EOF){                                               // lite_parser.jsxi:87
			if (value.index === Number.POSITIVE_INFINITY)                          // lite_parser.jsxi:88
				value = { id: id, index: this.data.length, value: '' };            // lite_parser.jsxi:89
		} else {
			var index = this.data.indexOf (arg, this.index);
			
			if (index !== - 1 && index < value.index)                              // lite_parser.jsxi:97
				value = { id: id, index: index, value: arg };                      // lite_parser.jsxi:98
		}
	}
	
	if (value.index === Number.POSITIVE_INFINITY){                                 // lite_parser.jsxi:105
		return null;
	} else {
		this.index = value.index + value.value.length;                             // lite_parser.jsxi:108
		return value;                                                              // lite_parser.jsxi:109
	}
};
LiteParser.prototype.findNext = function (){                                       // lite_parser.jsxi:113
	return this.innerFindNext (arguments);                                         // lite_parser.jsxi:114
};
LiteParser.prototype.whatNext = function (){                                       // lite_parser.jsxi:117
	return this.innerFindNext (arguments, true);                                   // lite_parser.jsxi:118
};
LiteParser.prototype.innerFindNext = function (args, fixedMode){                   // lite_parser.jsxi:121
	if (fixedMode === undefined)                                                   // lite_parser.jsxi:121
		fixedMode = false;                                                         // lite_parser.jsxi:121

	console.assert (args && typeof args.length === 'number',                       // lite_parser.jsxi:122
		'Invalid argument type');                                                  // lite_parser.jsxi:122
	
	function indexOfExt (str, what, pos, id){                                      // lite_parser.jsxi:124
		if (what === LiteParser.EOF){                                              // lite_parser.jsxi:125
			return { id: id, index: str.length, value: what };
		} else if (what instanceof RegExp){                                        // lite_parser.jsxi:131
			var temp = str.substring (pos).match (what);
			return {
				id: id,                                                            // lite_parser.jsxi:134
				index: temp ? temp.index + pos : - 1,                              // lite_parser.jsxi:135
				value: temp ? temp [0] : null,                                     // lite_parser.jsxi:136
				raw: temp
			};
		} else if (typeof what === 'string'){                                      // lite_parser.jsxi:139
			return { id: id, index: str.indexOf (what, pos), value: what };
		} else
			return console.assert (true, 'Invalid argument type');                 // lite_parser.jsxi:146
	}
	
	var value = { index: Number.POSITIVE_INFINITY },                               // lite_parser.jsxi:148
		oldIndex = this.index,                                                     // lite_parser.jsxi:149
		bindedObj,                                                                 // lite_parser.jsxi:150
		result,                                                                    // lite_parser.jsxi:151
		temp;                                                                      // lite_parser.jsxi:152
	
	{
		var __1j = this.binded;
		
		for (var i = 0; i < __1j.length; i ++){                                    // lite_parser.jsxi:154
			var arg = __1j [i];
			
			temp = indexOfExt (this.data, arg.match, this.index, i);               // lite_parser.jsxi:155
			
			if (temp.index !== - 1 && temp.index < value.index){                   // lite_parser.jsxi:157
				value = temp;                                                      // lite_parser.jsxi:158
				bindedObj = arg;                                                   // lite_parser.jsxi:159
			}
		}
		
		__1j = undefined;
	}
	
	for (var i = 0; i < args.length; i ++){                                        // lite_parser.jsxi:163
		var arg = args [i];
		
		temp = indexOfExt (this.data, arg, this.index, i);                         // lite_parser.jsxi:164
		
		if (temp.index !== - 1 && temp.index < value.index){                       // lite_parser.jsxi:166
			value = temp;                                                          // lite_parser.jsxi:167
			bindedObj = null;                                                      // lite_parser.jsxi:168
		}
	}
	
	if (value.index === Number.POSITIVE_INFINITY)                                  // lite_parser.jsxi:172
		return null;
	
	this.moveTo (value);                                                           // lite_parser.jsxi:175
	
	if (!bindedObj){                                                               // lite_parser.jsxi:177
		result = value;                                                            // lite_parser.jsxi:178
	} else if (this.debugMode){                                                    // lite_parser.jsxi:179
		var from = this.lineNumber,                                                // lite_parser.jsxi:180
			fromIndex = this.index,                                                // lite_parser.jsxi:181
			temp = bindedObj.handler.call (this, value),                           // lite_parser.jsxi:182
			to = this.lineNumber,                                                  // lite_parser.jsxi:183
			toIndex = this.index,                                                  // lite_parser.jsxi:184
			log;                                                                   // lite_parser.jsxi:185
		
		if (bindedObj.comment){                                                    // lite_parser.jsxi:187
			log = '[LiteParser] ' + (typeof bindedObj.comment === 'string' ? bindedObj.comment : bindedObj.comment.name) + ' at ' + from + ' (' + fromIndex + ':' + toIndex + '): ' + (typeof bindedObj.comment === 'string' ? this.data.substring (fromIndex, toIndex) : bindedObj.comment.call (this, fromIndex, toIndex, value)).replace (/[\n\r]+/g, '\\n');
			
			if (log.length > 100)                                                  // lite_parser.jsxi:201
				log = log.substr (0, 48) + '...' + log.slice (- 49);               // lite_parser.jsxi:202
			
			console.log (log);                                                     // lite_parser.jsxi:204
		}
		
		result = temp ? this.innerFindNext (args, fixedMode) : null;               // lite_parser.jsxi:207
	} else
		result = bindedObj.handler.call (this, value) ? this.innerFindNext (args, fixedMode) : null;
	
	if (fixedMode)                                                                 // lite_parser.jsxi:212
		this.index = oldIndex;                                                     // lite_parser.jsxi:213
	return result;                                                                 // lite_parser.jsxi:215
};
LiteParser.prototype.moveTo = function (arg){                                      // lite_parser.jsxi:218
	this.index = arg.index + arg.value.length;                                     // lite_parser.jsxi:219
};
LiteParser.prototype.findHere = function (arg){                                    // lite_parser.jsxi:222
	var args = Array.prototype.slice.call (arguments, arg instanceof Array ? 1 : 0), 
		operators = arg instanceof Array ? arg : [ '(', '{', '[' ],                // lite_parser.jsxi:224
		others = { '(': ')', '{': '}', '[': ']' },                                 // lite_parser.jsxi:225
		found,                                                                     // lite_parser.jsxi:226
		temp;                                                                      // lite_parser.jsxi:227
	
	while (found = this.innerFindNext (args.concat (operators))){                  // lite_parser.jsxi:229
		temp = operators.indexOf (found.value);                                    // lite_parser.jsxi:230
		
		if (operators.indexOf (found.value) !== - 1){                              // lite_parser.jsxi:231
			console.assert (others [found.value],                                  // lite_parser.jsxi:232
				'Pair for ' + found.value + ' not found');                         // lite_parser.jsxi:232
			this.findHere (others [found.value]);                                  // lite_parser.jsxi:233
		} else if (args.indexOf (found.value) !== - 1)                             // lite_parser.jsxi:234
			return found;                                                          // lite_parser.jsxi:235
	}
	return null;
};

function Macro (name, level, context, macroArgs, macroBody){                       // macro.jsxi:1
	var splitted = name.split (':');
	
	this.name = splitted [0];                                                      // macro.jsxi:3
	this.type = splitted [1] || null;                                              // macro.jsxi:4
	
	if (!macroBody){                                                               // macro.jsxi:6
		macroBody = macroArgs;                                                     // macro.jsxi:7
		macroArgs = null;                                                          // macro.jsxi:8
	}
	
	this.level = level;                                                            // macro.jsxi:11
	this.context = context;                                                        // macro.jsxi:12
	this.rawBody = macroBody;                                                      // macro.jsxi:13
	this.localStorage = {};                                                        // macro.jsxi:14
	this.arguments = macroArgs === null ? [ { name: 'arg', type: null } ] : macroArgs.map (function (arg){
		return arg.match (/^(.+)\:([^\:]+)$/) ? { name: RegExp.$1, type: RegExp.$2 } : { name: arg, type: null };
	});
	
	if (this.arguments.length > 0){                                                // macro.jsxi:22
		var last = this.arguments [this.arguments.length - 1];
		
		this.asyncMode = last.name === 'callback' && last.type === null || last.type === 'callback';
	} else
		this.asyncMode = false;                                                    // macro.jsxi:26
}

addLog (Macro,                                                                     // macro.jsxi:29
	3, 
	function (arg){                                                                // macro.jsxi:29
		return '@' + this.name;                                                    // macro.jsxi:29
	});
Macro.ReturnType = {                                                               // macro.jsxi:31
	Void: 'void',                                                                  // macro.jsxi:31
	Raw: 'raw',                                                                    // macro.jsxi:33
	RawNoMacros: 'raw-nm',                                                         // macro.jsxi:34
	Boolean: 'boolean',                                                            // macro.jsxi:35
	Number: 'number',                                                              // macro.jsxi:36
	String: 'string',                                                              // macro.jsxi:37
	Object: 'object'
};
Macro.Defaults = {                                                                 // macro.jsxi:41
	fs: fs,                                                                        // macro.jsxi:41
	path: path,                                                                    // macro.jsxi:43
	params: paramsManager,                                                         // macro.jsxi:44
	ReturnType: Macro.ReturnType
};
Macro.globalStorage = {};                                                          // macro.jsxi:48
Macro.prototype.defaults = function (context){                                     // macro.jsxi:50
	var result = {},                                                               // macro.jsxi:51
		obj = {                                                                    // macro.jsxi:52
			name: this.name,                                                       // macro.jsxi:52
			context: context,                                                      // macro.jsxi:54
			macroContext: this.context
		};
	
	{
		var __1l = Macro.Defaults;
		
		for (var key in __1l){
			var value = __1l [key];
			
			if (typeof value === 'function')                                       // macro.jsxi:59
				result [key] = value.call (obj);                                   // macro.jsxi:60
			else
				result [key] = value;                                              // macro.jsxi:62
		}
		
		__1l = undefined;
	}
	return result;                                                                 // macro.jsxi:65
};
Macro.prototype.initialize = function (callback){                                  // macro.jsxi:68
	function macroCalls (macroBody){                                               // macro.jsxi:69
		var used = [], lastIdentifier, liteParser, name, found, temp;
		
		if (macroBody.search (/@[_$a-zA-Z]/) !== - 1){                             // macro.jsxi:77
			lastIdentifier = 0;                                                    // macro.jsxi:78
			liteParser = new LiteParser (macroBody).on ('//',                      // macro.jsxi:79
				function (arg){                                                    // macro.jsxi:80
					return this.findSimple ('\n', '\r', LiteParser.EOF);           // macro.jsxi:80
				}).on ('/*',                                                       // macro.jsxi:81
				function (arg){                                                    // macro.jsxi:81
					return this.findSimple ('*/');                                 // macro.jsxi:81
				}).on ('\'',                                                       // macro.jsxi:82
				'"',                                                               // macro.jsxi:82
				'`',                                                               // macro.jsxi:82
				function (arg){                                                    // macro.jsxi:82
					while (temp = liteParser.findSimple ('\\' + arg.value, arg.value))
						if (temp.value === arg.value)                              // macro.jsxi:84
							return true;
					return false;
				});
			
			while (found = liteParser.findNext (/@([_$a-zA-Z][_$a-zA-Z0-9\.\-]*)/)){
				while (macroBody.indexOf (name = '_' + (lastIdentifier ++).toString (32)) !== - 1);
				
				used.push ({ name: name, macro: found.raw [1] });                  // macro.jsxi:91
				temp = liteParser.whatNext (/[^\s]/);                              // macro.jsxi:93
				
				if (!temp || temp.value !== '(')                                   // macro.jsxi:94
					name = name + ' ()';                                           // macro.jsxi:95
				
				liteParser.update (macroBody = macroBody.substr (0, found.index) + name + macroBody.substr (liteParser.index), 
					liteParser.index + name.length - found.value.length);          // macro.jsxi:97
			}
		}
		return { used: used, body: macroBody };
	}
	
	if (this.callee){                                                              // macro.jsxi:107
		callback ();                                                               // macro.jsxi:108
		return;
	}
	
	var phase = macroCalls (this.rawBody),                                         // macro.jsxi:112
		converted = convert (phase.body, { filename: 'macro', insertReturn: true }), 
		variables = [],                                                            // macro.jsxi:114
		queue = new Queue (macroStorage, Queue.MODE_PARALLEL).description ('macros inside other macro');
	
	variables.push ('context = this.context');                                     // macro.jsxi:117
	variables.push ('macroContext = this.macroContext');                           // macro.jsxi:118
	variables.push ('global = this.global');                                       // macro.jsxi:119
	variables.push ('local = this.local');                                         // macro.jsxi:120
	variables.push ('require = this.require');                                     // macro.jsxi:121
	variables.push ('defineMacro = this.defineMacro.bind (this)');                 // macro.jsxi:122
	
	for (var key in Macro.Defaults)                                                // macro.jsxi:124
		variables.push (key + ' = this.defaults.' + key);                          // macro.jsxi:125
	
	{
		var __1n = phase.used;
		
		for (var __1m = 0; __1m < __1n.length; __1m ++){
			var entry = __1n [__1m];
			
			queue.add (macroStorage.get, entry.macro, this.level);                 // macro.jsxi:128
			variables.push (entry.name + ' = function (){ return this.macros.' + entry.macro + '.call (this.context, [].slice.call (arguments)) }.bind (this)');
		}
		
		__1n = undefined;
	}
	
	this.macros = {};                                                              // macro.jsxi:132
	this.debug = (variables.length ? 'var ' + variables.join (', ') + ';\n' : '') + converted;
	this.callee = new Function (this.arguments.map (function (arg){                // macro.jsxi:134
		return arg.name;                                                           // macro.jsxi:134
	}).join (','),                                                                 // macro.jsxi:134
	this.debug);                                                                   // macro.jsxi:134
	queue.run ((function (arg){                                                    // macro.jsxi:136
		arg.map (function (arg){                                                   // macro.jsxi:137
			return arg.result [0];                                                 // macro.jsxi:137
		}).forEach ((function (other){                                             // macro.jsxi:137
			this.log ('found @' + other.name + ' for using inside');               // macro.jsxi:138
			this.macros [other.name] = other;                                      // macro.jsxi:139
		}).bind (this));                                                           // macro.jsxi:140
		this.log ('initialized');                                                  // macro.jsxi:142
		callback ();                                                               // macro.jsxi:143
	}).bind (this));                                                               // macro.jsxi:144
};
Macro.prototype.call = function (context, args){                                   // macro.jsxi:147
	console.assert (this.callee, 'Macro is not initialized');                      // macro.jsxi:148
	console.assert (args instanceof Array, 'Wrong argument');                      // macro.jsxi:149
	console.assert (context instanceof Context, 'Context required');               // macro.jsxi:150
	
	var that = this,                                                               // macro.jsxi:152
		object = {                                                                 // macro.jsxi:153
			defaults: this.defaults (context),                                     // macro.jsxi:153
			macros: this.macros,                                                   // macro.jsxi:155
			macroContext: this.context,                                            // macro.jsxi:156
			context: context,                                                      // macro.jsxi:157
			global: Macro.globalStorage,                                           // macro.jsxi:158
			local: this.localStorage,                                              // macro.jsxi:159
			require: (function (arg){                                              // macro.jsxi:161
				return require (path.resolve (that.context.file.dirname, 'node_modules', arg));
			}), 
			defineMacro: (function (name, arguments, body){                        // macro.jsxi:162
				if (body === undefined){                                           // macro.jsxi:163
					body = arguments;                                              // macro.jsxi:164
					arguments = [];                                                // macro.jsxi:165
				}
				
				macroStorage.add (new Macro (name,                                 // macro.jsxi:168
					that.level,                                                    // macro.jsxi:170
					that.context,                                                  // macro.jsxi:171
					typeof arguments === 'string' ? arguments.split (',').map (Function.prototype.call.bind (String.prototype.trim)) : arguments, 
					body));                                                        // macro.jsxi:175
			})
		};
	
	try {
		{
			var __1o = this.arguments;
			
			for (var id = 0; id < __1o.length; id ++){                             // macro.jsxi:180
				var arg = __1o [id];
				
				if (arg.type === 'callback' && typeof args [id] !== 'function')    // macro.jsxi:181
					throw new MacroError (this.name, args, 'Callback requested');
			}
			
			__1o = undefined;
		}
		return this.callee.apply (object,                                          // macro.jsxi:184
			args.map ((function (value, pos){                                      // macro.jsxi:186
				switch (this.arguments [pos] && this.arguments [pos].type){        // macro.jsxi:188
					case 'boolean':                                                // macro.jsxi:189
						return !!value;                                            // macro.jsxi:190
					case 'string':                                                 // macro.jsxi:191
						return String (value);                                     // macro.jsxi:192
					case 'number':                                                 // macro.jsxi:193
						return + value;                                            // macro.jsxi:194
					case 'object':                                                 // macro.jsxi:195
						return typeof value === 'object' ? value : null;           // macro.jsxi:196
					default:
						return value;                                              // macro.jsxi:198
				}
			}).bind (this)));                                                      // macro.jsxi:200
	} catch (e){
		if (e.name === 'MacroError')                                               // macro.jsxi:204
			throw e;                                                               // macro.jsxi:205
		else
			throw new MacroError (this.name, args, e);                             // macro.jsxi:207
	} 
};

function MacroError (name, args, parent, message){                                 // macro.jsxi:211
	if (typeof args === 'string'){                                                 // macro.jsxi:212
		message = args;                                                            // macro.jsxi:213
		args = undefined;                                                          // macro.jsxi:214
		parent = undefined;                                                        // macro.jsxi:215
	}
	
	var result = new Error ('@' + name + (args ? ' (' + Array.prototype.map.call (args, 
		function (arg){                                                            // macro.jsxi:219
			return JSON.stringify (arg);                                           // macro.jsxi:219
		}).join (', ') + ')' : '') + (parent ? ':\n' + parent.stack : message ? ': ' + message : ''));
	
	result.name = 'MacroError';                                                    // macro.jsxi:221
	return result;                                                                 // macro.jsxi:222
}

function MacroCall (name, arguments, level, context, replacement){                 // macro_call.jsxi:1
	this.name = name;                                                              // macro_call.jsxi:2
	this.arguments = arguments;                                                    // macro_call.jsxi:3
	this.level = level;                                                            // macro_call.jsxi:4
	this.context = context;                                                        // macro_call.jsxi:5
	this.state = MacroCall.STATE_INITIAL;                                          // macro_call.jsxi:6
	this.replacement = replacement;                                                // macro_call.jsxi:7
	this.macro = undefined;                                                        // macro_call.jsxi:8
	this.result = undefined;                                                       // macro_call.jsxi:9
}

MacroCall.STATE_WAITING = - 1;                                                     // macro_call.jsxi:12
MacroCall.STATE_INITIAL = 0;                                                       // macro_call.jsxi:13
MacroCall.STATE_CONNECTED = 1;                                                     // macro_call.jsxi:14
MacroCall.STATE_READY = 2;                                                         // macro_call.jsxi:15
MacroCall.STATE_CALLED = 3;                                                        // macro_call.jsxi:16
MacroCall.STATE_FINISHED = 4;                                                      // macro_call.jsxi:17
MacroCall.waitingForCallback = 0;                                                  // macro_call.jsxi:19
MacroCall.waitingForMacro = 0;                                                     // macro_call.jsxi:20
addLog (MacroCall,                                                                 // macro_call.jsxi:22
	2, 
	function (arg){                                                                // macro_call.jsxi:22
		return 'call (@' + this.name + ')';                                        // macro_call.jsxi:22
	});
MacroCall.prototype.findMacro = function (callback){                               // macro_call.jsxi:24
	console.assert (this.state == MacroCall.STATE_INITIAL,                         // macro_call.jsxi:25
		'Wrong state (' + this.state + ')');                                       // macro_call.jsxi:25
	this.state = MacroCall.STATE_WAITING;                                          // macro_call.jsxi:26
	MacroCall.waitingForMacro ++;                                                  // macro_call.jsxi:28
	macroStorage.get (this.name,                                                   // macro_call.jsxi:30
		this.level,                                                                // macro_call.jsxi:30
		(function (arg){                                                           // macro_call.jsxi:30
			if (arg == null)                                                       // macro_call.jsxi:31
				throw new MacroNotFoundError (this.name);                          // macro_call.jsxi:32
			
			this.log ('macro @' + this.name + ' found');                           // macro_call.jsxi:34
			this.state = MacroCall.STATE_CONNECTED;                                // macro_call.jsxi:36
			this.macro = arg;                                                      // macro_call.jsxi:37
			MacroCall.waitingForMacro --;                                          // macro_call.jsxi:39
			callback ();                                                           // macro_call.jsxi:40
		}).bind (this));                                                           // macro_call.jsxi:41
};
MacroCall.prototype.prepareArguments = function (callback){                        // macro_call.jsxi:44
	console.assert (this.state == MacroCall.STATE_CONNECTED,                       // macro_call.jsxi:45
		'Wrong state (' + this.state + ')');                                       // macro_call.jsxi:45
	this.state = MacroCall.STATE_WAITING;                                          // macro_call.jsxi:46
	
	function cast (argument, value, callback){                                     // macro_call.jsxi:48
		function nextStep (){                                                      // macro_call.jsxi:49
			var data;
			
			try {
				eval ('data = ' + convert (arg, { filename: 'macro arg' }));       // macro_call.jsxi:53
				callback (data);                                                   // macro_call.jsxi:54
			} catch (e){
				console.fatal (2,                                                  // macro_call.jsxi:56
					'Error at argument preparing:\n' + (value || '< empty string >') + ' ⇒ ' + (arg || '< empty string >') + '\n\n' + e.stack);
			} 
		}
		
		switch (argument && argument.type){                                        // macro_call.jsxi:59
			case 'raw-nm':                                                         // macro_call.jsxi:60
				callback (value);                                                  // macro_call.jsxi:61
				
				break;
			case 'raw':                                                            // macro_call.jsxi:63
				macrosProcess (value, this.level, this.context, callback);         // macro_call.jsxi:64
				
				break;
			default:
				macrosProcess (value, this.level, this.context, nextStep);         // macro_call.jsxi:67
		}
	}
	
	var queue = new Queue (this, Queue.MODE_PARALLEL).description ('macro call arguments prepare');
	
	{
		var __1k = this.arguments;
		
		for (var i = 0; i < __1k.length; i ++){                                    // macro_call.jsxi:73
			var arg = __1k [i];
			
			queue.add (cast, this.macro.arguments [i], arg);                       // macro_call.jsxi:74
		}
		
		__1k = undefined;
	}
	
	queue.run (function (arg){                                                     // macro_call.jsxi:76
		this.log ('arguments ready');                                              // macro_call.jsxi:77
		this.state = MacroCall.STATE_READY;                                        // macro_call.jsxi:79
		this.arguments = arg.map (function (arg){                                  // macro_call.jsxi:80
			return arg.result [0];                                                 // macro_call.jsxi:80
		});
		callback ();                                                               // macro_call.jsxi:82
	});
};
MacroCall.prototype.realMacroCall = function (callback){                           // macro_call.jsxi:86
	console.assert (this.state == MacroCall.STATE_READY,                           // macro_call.jsxi:87
		'Wrong state (' + this.state + ')');                                       // macro_call.jsxi:87
	this.state = MacroCall.STATE_WAITING;                                          // macro_call.jsxi:88
	MacroCall.waitingForCallback ++;                                               // macro_call.jsxi:90
	
	var resultHandler = (function (answer){                                        // macro_call.jsxi:92
		if (this.result !== undefined)                                             // macro_call.jsxi:93
			throw new Error ('Callback already called');                           // macro_call.jsxi:94
		
		this.log ('call complete');                                                // macro_call.jsxi:95
		
		if (answer === undefined)                                                  // macro_call.jsxi:97
			answer = '';                                                           // macro_call.jsxi:98
		
		this.state = MacroCall.STATE_CALLED;                                       // macro_call.jsxi:100
		this.result = answer;                                                      // macro_call.jsxi:101
		MacroCall.waitingForCallback --;                                           // macro_call.jsxi:103
		callback ();                                                               // macro_call.jsxi:104
	}).bind (this);                                                                // macro_call.jsxi:105
	
	if (this.macro.asyncMode){                                                     // macro_call.jsxi:107
		var temp = this.arguments,                                                 // macro_call.jsxi:108
			delta = this.macro.arguments.length - (temp.length + 1);               // macro_call.jsxi:109
		
		if (delta < 0)                                                             // macro_call.jsxi:111
			temp = temp.slice (0, delta);                                          // macro_call.jsxi:112
		else if (delta > 0)                                                        // macro_call.jsxi:113
			temp = temp.concat (new Array (delta));                                // macro_call.jsxi:114
		
		temp.push (resultHandler);                                                 // macro_call.jsxi:116
		this.macro.call (this.context, temp);                                      // macro_call.jsxi:117
	} else
		resultHandler (this.macro.call (this.context, this.arguments));            // macro_call.jsxi:119
};
MacroCall.prototype.processResult = function (callback){                           // macro_call.jsxi:122
	console.assert (this.state == MacroCall.STATE_CALLED,                          // macro_call.jsxi:123
		'Wrong state (' + this.state + ')');                                       // macro_call.jsxi:123
	this.state = MacroCall.STATE_WAITING;                                          // macro_call.jsxi:124
	
	var doMacros = false,                                                          // macro_call.jsxi:126
		result = this.result,                                                      // macro_call.jsxi:127
		type = this.macro.type;                                                    // macro_call.jsxi:128
	
	if (type === null && result && typeof result.type === 'string'){               // macro_call.jsxi:130
		type = result.type;                                                        // macro_call.jsxi:131
		result = result.value;                                                     // macro_call.jsxi:132
	}
	
	if (type !== null){                                                            // macro_call.jsxi:135
		switch (type){                                                             // macro_call.jsxi:136
			case 'void':                                                           // macro_call.jsxi:137
				result = '';                                                       // macro_call.jsxi:138
				
				break;
			case 'raw':                                                            // macro_call.jsxi:140
				doMacros = true;                                                   // macro_call.jsxi:141
				result = String (result);                                          // macro_call.jsxi:142
				
				break;
			case 'raw-nm':                                                         // macro_call.jsxi:144
				result = String (result);                                          // macro_call.jsxi:145
				
				break;
			case 'boolean':                                                        // macro_call.jsxi:147
				result = result ? 'true' : 'false';                                // macro_call.jsxi:148
				
				break;
			case 'number':                                                         // macro_call.jsxi:150
				result = + result;                                                 // macro_call.jsxi:151
				
				break;
			case 'object':                                                         // macro_call.jsxi:153
				if (typeof result !== 'object')                                    // macro_call.jsxi:154
					throw new Error ('Type mismatch (waiting for object, but get ' + typeof result + ')');
				
				doMacros = true;                                                   // macro_call.jsxi:156
				result = JSON.stringify (result);                                  // macro_call.jsxi:157
				
				break;
			case 'string':                                                         // macro_call.jsxi:159
				doMacros = true;                                                   // macro_call.jsxi:160
				result = JSON.stringify (String (result));                         // macro_call.jsxi:161
				
				break;
			default:
				throw new Error ('Invalid macro type (' + this.name + ', ' + this.macro.type + ')');
		}
	} else if (result !== undefined){                                              // macro_call.jsxi:166
		doMacros = true;                                                           // macro_call.jsxi:167
		result = String (result);                                                  // macro_call.jsxi:168
	} else
		result = '';                                                               // macro_call.jsxi:170
	
	var resultHandler = (function (result){                                        // macro_call.jsxi:172
		this.log ('result processed');                                             // macro_call.jsxi:173
		this.state = MacroCall.STATE_FINISHED;                                     // macro_call.jsxi:174
		this.result = result;                                                      // macro_call.jsxi:175
		callback ();                                                               // macro_call.jsxi:177
	}).bind (this);                                                                // macro_call.jsxi:178
	
	if (doMacros)                                                                  // macro_call.jsxi:180
		macrosProcess (result, this.level, this.context, resultHandler);           // macro_call.jsxi:181
	else
		resultHandler (result);                                                    // macro_call.jsxi:183
};
MacroCall.prototype.process = function (callback){                                 // macro_call.jsxi:186
	new Queue (this, Queue.MODE_SEQUENT).description ('macro call process').add (this.findMacro).add (this.prepareArguments).add (this.realMacroCall).add (this.processResult).run (function (arg){
		console.assert (this.state == MacroCall.STATE_FINISHED,                    // macro_call.jsxi:194
			'Wrong state (' + this.state + ')');                                   // macro_call.jsxi:194
		
		if (callback !== undefined)                                                // macro_call.jsxi:195
			callback (this.result);                                                // macro_call.jsxi:196
	});
};

function MacroNotFoundError (name, args, parent){                                  // macro_call.jsxi:200
	this.name = 'MacroNotFoundError';                                              // macro_call.jsxi:201
	this.macroName = name;                                                         // macro_call.jsxi:202
	this.message = 'Macro @' + name + ' not found';                                // macro_call.jsxi:203
}

MacroNotFoundError.prototype = Error.prototype;                                    // macro_call.jsxi:206

var anonymousMacroId = + new Date ();

function macrosParse (source, level, context){                                     // macro_process.jsxi:3
	console.assert (context instanceof Context, 'Context required');               // macro_process.jsxi:4
	
	function throwError (message){                                                 // macro_process.jsxi:6
		throw new Error ([                                                         // macro_process.jsxi:8
			'MacroParseError',                                                     // macro_process.jsxi:8
			context.file.filename,                                                 // macro_process.jsxi:8
			liteParser.lineNumber,                                                 // macro_process.jsxi:8
			message
		]);
	}
	
	function parseMacroDefine (){                                                  // macro_process.jsxi:11
		var name = found.raw [1],                                                  // macro_process.jsxi:12
			splitted = name.split (':'),                                           // macro_process.jsxi:13
			position,                                                              // macro_process.jsxi:14
			argument,                                                              // macro_process.jsxi:15
			arguments,                                                             // macro_process.jsxi:16
			blockMode,                                                             // macro_process.jsxi:17
			temp,                                                                  // macro_process.jsxi:18
			body,                                                                  // macro_process.jsxi:19
			converted,                                                             // macro_process.jsxi:20
			insertCall = false,                                                    // macro_process.jsxi:21
			from;                                                                  // macro_process.jsxi:22
		
		if (splitted [0] === 'macro')                                              // macro_process.jsxi:24
			throwError ('Unexpected reserved word');                               // macro_process.jsxi:25
		
		temp = liteParser.whatNext (/[^\s]/);                                      // macro_process.jsxi:27
		from = liteParser.index;                                                   // macro_process.jsxi:28
		
		if (temp.value === '('){                                                   // macro_process.jsxi:30
			liteParser.moveTo (temp);                                              // macro_process.jsxi:31
			position = liteParser.index;                                           // macro_process.jsxi:33
			arguments = [];                                                        // macro_process.jsxi:34
			
			while (temp = liteParser.findHere (',', ')')){                         // macro_process.jsxi:36
				argument = liteParser.substring (position, liteParser.index - 1).trim ();
				
				if (argument.length){                                              // macro_process.jsxi:39
					arguments.push (argument);                                     // macro_process.jsxi:40
					
					if (!/^[a-z$_][a-z$_\d]*(\:[a-z\-]+)?$/i.test (argument)){     // macro_process.jsxi:42
						arguments = null;                                          // macro_process.jsxi:43
						liteParser.index = from;                                   // macro_process.jsxi:44
						
						break;
					}
				} else if (arguments.length || temp.value === ',')                 // macro_process.jsxi:47
					throwError ('Unexpected token ' + temp.value);                 // macro_process.jsxi:48
				
				position = liteParser.index;                                       // macro_process.jsxi:50
				
				if (temp.value === ')')                                            // macro_process.jsxi:52
					break;
			}
			
			if (!temp)                                                             // macro_process.jsxi:56
				throwError ('Unexpected end of file');                             // macro_process.jsxi:57
			
			temp = liteParser.whatNext (/[^\s]/);                                  // macro_process.jsxi:59
		} else
			arguments = null;                                                      // macro_process.jsxi:61
		
		blockMode = temp && temp.value === '{';                                    // macro_process.jsxi:63
		position = liteParser.index;                                               // macro_process.jsxi:64
		
		if (blockMode){                                                            // macro_process.jsxi:66
			liteParser.moveTo (temp);                                              // macro_process.jsxi:67
			temp = liteParser.findHere ('}');                                      // macro_process.jsxi:68
		} else
			temp = liteParser.findHere (';', LiteParser.EOF);                      // macro_process.jsxi:70
		
		if (!temp || temp.value === LiteParser.EOF){                               // macro_process.jsxi:72
			throwError ('Unexpected end of file');                                 // macro_process.jsxi:73
		} else if (temp.value === '}'){                                            // macro_process.jsxi:74
			temp = liteParser.whatNext (/[^\s]/);                                  // macro_process.jsxi:75
			
			if (temp && temp.value === '(')                                        // macro_process.jsxi:76
				insertCall = true;                                                 // macro_process.jsxi:77
		}
		
		body = liteParser.substring (position, liteParser.index).trim ();          // macro_process.jsxi:80
		temp = liteParser.whatNext (/[^\s]/);                                      // macro_process.jsxi:82
		
		if (temp && temp.value === ';')                                            // macro_process.jsxi:83
			liteParser.moveTo (temp);                                              // macro_process.jsxi:84
		
		if (!splitted [0])                                                         // macro_process.jsxi:86
			insertCall = true;                                                     // macro_process.jsxi:87
		
		if (insertCall){                                                           // macro_process.jsxi:89
			name = '__anonymous_macro_' + ++ anonymousMacroId;                     // macro_process.jsxi:90
			liteParser.replace (found.index, liteParser.index, '@' + name);        // macro_process.jsxi:91
			liteParser.index = found.index;                                        // macro_process.jsxi:92
			
			if (splitted [1])                                                      // macro_process.jsxi:94
				name += ':' + splitted [1];                                        // macro_process.jsxi:95
		} else
			liteParser.replace (found.index,                                       // macro_process.jsxi:97
				liteParser.index,                                                  // macro_process.jsxi:97
				'/* There was definition of @' + name + ' */');                    // macro_process.jsxi:97
		
		var macro = new Macro (name, level, context, arguments, body);
		
		macroStorage.add (macro);                                                  // macro_process.jsxi:100
	}
	
	function parseMacroCall (){                                                    // macro_process.jsxi:103
		var name = found.raw [1],                                                  // macro_process.jsxi:104
			arguments = [],                                                        // macro_process.jsxi:105
			position,                                                              // macro_process.jsxi:106
			argument,                                                              // macro_process.jsxi:107
			quotesCount,                                                           // macro_process.jsxi:108
			temp;                                                                  // macro_process.jsxi:109
		
		if (name === 'macro')                                                      // macro_process.jsxi:111
			throwError ('Unexpected reserved word');                               // macro_process.jsxi:112
		
		temp = liteParser.whatNext (/[^\s]/);                                      // macro_process.jsxi:114
		
		if (temp && (temp.value === '{' || temp.value === '(')){                   // macro_process.jsxi:115
			liteParser.moveTo (temp);                                              // macro_process.jsxi:116
			
			if (temp.value === '{'){                                               // macro_process.jsxi:118
				quotesCount = 1;                                                   // macro_process.jsxi:119
				
				while (liteParser.current === '{'){                                // macro_process.jsxi:121
					liteParser.index ++;                                           // macro_process.jsxi:122
					quotesCount ++;                                                // macro_process.jsxi:123
				}
				
				position = liteParser.index;                                       // macro_process.jsxi:126
				
				if (quotesCount > 1)                                               // macro_process.jsxi:128
					temp = liteParser.findSimple (new Array (quotesCount + 1).join ('}'));
				else
					temp = liteParser.findHere ([ '{' ], '}');                     // macro_process.jsxi:131
				
				if (!temp)                                                         // macro_process.jsxi:133
					throwError ('Unexpected end of file');                         // macro_process.jsxi:134
				
				argument = liteParser.substring (position, liteParser.index - 1);
				arguments.push (argument);                                         // macro_process.jsxi:137
			} else {
				position = liteParser.index;                                       // macro_process.jsxi:139
				
				while (temp = liteParser.findHere (',', ')')){                     // macro_process.jsxi:141
					argument = liteParser.substring (position, liteParser.index - 1).trim ();
					
					if (argument.length)                                           // macro_process.jsxi:144
						arguments.push (argument);                                 // macro_process.jsxi:145
					else if (arguments.length || temp.value === ',')               // macro_process.jsxi:146
						throwError ('Unexpected token ' + temp.value);             // macro_process.jsxi:147
					
					if (temp.value === ')')                                        // macro_process.jsxi:149
						break;
					else
						position = liteParser.index;                               // macro_process.jsxi:152
				}
				
				if (!temp)                                                         // macro_process.jsxi:155
					throwError ('Unexpected end of file');                         // macro_process.jsxi:156
			}
		}
		
		var replacement = '@__call(' + calls.length + ')';
		
		calls.push (new MacroCall (name, arguments, level, context, replacement));
		liteParser.replace (found.index, liteParser.index, replacement);           // macro_process.jsxi:163
	}
	
	function levelDown (){                                                         // macro_process.jsxi:166
		return level += '.' + context.id + '_' + found.index;                      // macro_process.jsxi:167
	}
	
	function levelUp (){                                                           // macro_process.jsxi:169
		return level = level.replace (/\.[\d_]+$/, '');                            // macro_process.jsxi:170
	}
	
	var calls = [],                                                                // macro_process.jsxi:172
		liteParser = new LiteParser (source).on ('//',                             // macro_process.jsxi:173
			function (arg){                                                        // macro_process.jsxi:175
				return this.findSimple ('\n', '\r', LiteParser.EOF);               // macro_process.jsxi:175
			}, 
			'comment').on ('/*',                                                   // macro_process.jsxi:175
			function (arg){                                                        // macro_process.jsxi:176
				return this.findSimple ('*/');                                     // macro_process.jsxi:176
			}, 
			'multiline comment').on ('\'',                                         // macro_process.jsxi:176
			'"',                                                                   // macro_process.jsxi:177
			'`',                                                                   // macro_process.jsxi:177
			function (arg){                                                        // macro_process.jsxi:177
				var from = liteParser.index;
				
				for (var temp; temp = liteParser.findSimple ('\\' + arg.value, arg.value);)
					if (temp.value === arg.value)                                  // macro_process.jsxi:180
						return true;
				return false;
			}, 
			'string').on (/(^|function|lambda|return|[=,\(\[\{\:;])\s*\/[^\/\*]/, 
			function (arg){                                                        // macro_process.jsxi:184
				for (var temp; temp = liteParser.findSimple ('\\\\', '\\/', '/');)
					if (temp.value === '/')                                        // macro_process.jsxi:186
						return true;
				return false;
			}, 
			function regExp (from, to, found){                                     // macro_process.jsxi:189
				return this.data.substring (from - 1, to - 1);                     // macro_process.jsxi:189
			}), 
		found;                                                                     // macro_process.jsxi:190
	
	while (found = liteParser.findNext (/@macro\s+((?:[_$a-zA-Z][_$a-zA-Z0-9\.\-]*)?(?:\:[a-z\-]+)?)/, 
		/@([_$a-zA-Z][_$a-zA-Z0-9\.\-]*)/, 
		'{',                                                                       // macro_process.jsxi:195
		'}')){                                                                     // macro_process.jsxi:196
		switch (found.id){                                                         // macro_process.jsxi:197
			case 0:
				parseMacroDefine ();                                               // macro_process.jsxi:199
				
				break;
			case 1:
				parseMacroCall ();                                                 // macro_process.jsxi:202
				
				break;
			case 2:
				levelDown ();                                                      // macro_process.jsxi:205
				
				break;
			case 3:
				levelUp ();                                                        // macro_process.jsxi:208
				
				break;
		}
	}
	return { data: liteParser.data, calls: calls };
}

function macrosProcess (data, level, context, callback){                           // macro_process.jsxi:219
	if (level instanceof Context){                                                 // macro_process.jsxi:220
		callback = context;                                                        // macro_process.jsxi:221
		context = level;                                                           // macro_process.jsxi:222
		level = '';                                                                // macro_process.jsxi:223
	}
	
	console.assert (context instanceof Context, 'Context required');               // macro_process.jsxi:226
	console.assert (typeof callback === 'function', 'Function required');          // macro_process.jsxi:227
	
	var temp = macrosParse (data, level, context),                                 // macro_process.jsxi:229
		queue = new Queue (Queue.MODE_PARALLEL).description ('macros process');    // macro_process.jsxi:230
	
	{
		var __1q = temp.calls;
		
		for (var __1p = 0; __1p < __1q.length; __1p ++){
			var call = __1q [__1p];
			
			queue.add (call, call.process.bind (call));                            // macro_process.jsxi:233
		}
		
		__1q = undefined;
	}
	
	queue.run (function (arg){                                                     // macro_process.jsxi:235
		for (var __1r = 0; __1r < arg.length; __1r ++){                            // macro_process.jsxi:236
			var entry = arg [__1r];
			
			temp.data = temp.data.split (entry.data.replacement).join (entry.result [0]);
		}
		
		callback (temp.data);                                                      // macro_process.jsxi:238
	});
}

var macroStorage = new MacroStorage ();

function MacroStorage (){                                                          // macro_storage.jsxi:3
	this.macros = {};                                                              // macro_storage.jsxi:4
	this.requests = [];                                                            // macro_storage.jsxi:5
}

addLog (MacroStorage, 2, 
	'storage');                                                                    // macro_storage.jsxi:8
MacroStorage.prototype.add = function (macro){                                     // macro_storage.jsxi:10
	this.log ('@' + macro.name + (macro.level ? ' (at ' + macro.level + ')' : '') + ' added');
	
	if (!this.macros [macro.name])                                                 // macro_storage.jsxi:13
		this.macros [macro.name] = [ macro ];                                      // macro_storage.jsxi:14
	else
		this.macros [macro.name].push (macro);                                     // macro_storage.jsxi:16
	
	{
		var __1s = this.requests;
		
		for (var pos = 0; pos < __1s.length; pos ++){                              // macro_storage.jsxi:18
			var request = __1s [pos];
			
			if (request [0] === macro.name && this.get (request))                  // macro_storage.jsxi:19
				this.requests.splice (pos --, 1);                                  // macro_storage.jsxi:20
		}
		
		__1s = undefined;
	}
};
MacroStorage.prototype.get = function (name, level, callback){                     // macro_storage.jsxi:23
	var result = undefined,                                                        // macro_storage.jsxi:24
		max = - 1,                                                                 // macro_storage.jsxi:25
		requestMode = typeof name !== 'string',                                    // macro_storage.jsxi:26
		temp;                                                                      // macro_storage.jsxi:27
	
	if (requestMode){                                                              // macro_storage.jsxi:29
		callback = name [2];                                                       // macro_storage.jsxi:30
		level = name [1];                                                          // macro_storage.jsxi:31
		name = name [0];                                                           // macro_storage.jsxi:32
	} else
		this.log ('requested @' + name + (level ? ' (at ' + level + ')' : '') + '');
	
	if (this.macros [name]){                                                       // macro_storage.jsxi:36
		var __1u = this.macros [name];
		
		for (var __1t = 0; __1t < __1u.length; __1t ++){
			var macro = __1u [__1t];
			
			if (macro.level.length >= max && macro.level.length <= level.length && level.substring (0, macro.level.length) === macro.level){
				result = macro;                                                    // macro_storage.jsxi:42
				max = macro.level.length;                                          // macro_storage.jsxi:43
			}
		}
		
		__1u = undefined;
	}
	
	if (result !== undefined){                                                     // macro_storage.jsxi:46
		result.initialize (function (arg){                                         // macro_storage.jsxi:47
			return callback (result);                                              // macro_storage.jsxi:47
		});
		
		if (requestMode)                                                           // macro_storage.jsxi:49
			return true;
	} else if (!requestMode)                                                       // macro_storage.jsxi:51
		this.requests.push (arguments);                                            // macro_storage.jsxi:52
};

function Queue (object, mode){                                                     // queue.jsxi:1
	if (object === undefined)                                                      // queue.jsxi:1
		object = null;                                                             // queue.jsxi:1

	if (mode === undefined)                                                        // queue.jsxi:1
		mode = Queue.MODE_SEQUENT;                                                 // queue.jsxi:1

	if (typeof object === 'string'){                                               // queue.jsxi:2
		mode = object;                                                             // queue.jsxi:3
		object = null;                                                             // queue.jsxi:4
	}
	
	console.assert (mode, 'Wrong mode');                                           // queue.jsxi:7
	this.total = 0;                                                                // queue.jsxi:9
	this.finished = 0;                                                             // queue.jsxi:10
	this.results = [];                                                             // queue.jsxi:11
	this.mode = mode;                                                              // queue.jsxi:12
	this.object = object;                                                          // queue.jsxi:13
	this.delayed = [];                                                             // queue.jsxi:14
	this._description = '[ unnamed ]';                                             // queue.jsxi:15
}

Queue.MODE_SEQUENT = 'MODE_SEQUENT';                                               // queue.jsxi:18
Queue.MODE_PARALLEL = 'MODE_PARALLEL';                                             // queue.jsxi:19
Queue.prototype.description = function (description){                              // queue.jsxi:21
	this._description = description;                                               // queue.jsxi:22
	return this;                                                                   // queue.jsxi:23
};
Queue.prototype.complete = function (id, args, data){                              // queue.jsxi:26
	if (id !== undefined){                                                         // queue.jsxi:27
		console.assert (!this.results [id],                                        // queue.jsxi:28
			'Already returned (at ' + this._description + ')');                    // queue.jsxi:28
		this.finished ++;                                                          // queue.jsxi:30
		this.results [id] = {                                                      // queue.jsxi:31
			result: args instanceof Array ? args : Array.prototype.slice.call (args), 
			data: data
		};
	}
	
	if (this.finished === this.total && this.callback){                            // queue.jsxi:37
		console.assert (!this.done,                                                // queue.jsxi:38
			'Already finished (at ' + this._description + ')');                    // queue.jsxi:38
		this.callback.call (this.object, this.results);                            // queue.jsxi:40
		this.done = true;                                                          // queue.jsxi:41
	}
	
	if (this.mode === Queue.MODE_SEQUENT && this.finished < this.total && this.finished == this.results.length){
		console.assert (typeof this.delayed [this.finished] === 'function',        // queue.jsxi:45
			'Delayed call missing');                                               // queue.jsxi:45
		this.delayed [this.finished]();                                            // queue.jsxi:46
	}
};
Queue.prototype.makeCall = function (fn, args, data){                              // queue.jsxi:50
	var id = this.total ++, done = false;
	
	args.push ((function (arg){                                                    // queue.jsxi:54
		console.assert (!done, 'Already returned (at ' + this._description + ')');
		done = true;                                                               // queue.jsxi:56
		this.complete (id, arguments, data);                                       // queue.jsxi:58
	}).bind (this));                                                               // queue.jsxi:59
	return (function (arg){                                                        // queue.jsxi:61
		this.results [id] = undefined;                                             // queue.jsxi:62
		
		var result = fn.apply (this.object, args);
		
		if (result !== undefined){                                                 // queue.jsxi:65
			console.assert (!done,                                                 // queue.jsxi:66
				'Already returned in callback (at ' + this._description + ')');    // queue.jsxi:66
			done = true;                                                           // queue.jsxi:67
			this.complete (id, [ result ], 
				data);                                                             // queue.jsxi:69
		}
	}).bind (this);                                                                // queue.jsxi:71
};
Queue.prototype.add = function (data, fn){                                         // queue.jsxi:74
	var args;
	
	if (typeof data === 'function'){                                               // queue.jsxi:77
		args = Array.prototype.slice.call (arguments, 1);                          // queue.jsxi:78
		fn = data;                                                                 // queue.jsxi:79
		data = undefined;                                                          // queue.jsxi:80
	} else
		args = Array.prototype.slice.call (arguments, 2);                          // queue.jsxi:82
	
	console.assert (typeof fn === 'function',                                      // queue.jsxi:84
		'Invalid argument (at ' + this._description + ')');                        // queue.jsxi:84
	
	var call = this.makeCall (fn, args, data);
	
	if (this.mode === Queue.MODE_PARALLEL || this.mode === Queue.MODE_SEQUENT && this.finished == this.results.length){
		call ();                                                                   // queue.jsxi:89
	} else {
		this.delayed [this.total - 1] = call;                                      // queue.jsxi:91
	}
	return this;                                                                   // queue.jsxi:94
};
Queue.prototype.run = function (callback){                                         // queue.jsxi:97
	console.assert (!this.callback,                                                // queue.jsxi:98
		'Already runned (at ' + this._description + ')');                          // queue.jsxi:98
	console.assert (typeof callback === 'function',                                // queue.jsxi:99
		'Invalid argument (at ' + this._description + ')');                        // queue.jsxi:99
	this.callback = callback;                                                      // queue.jsxi:101
	this.complete ();                                                              // queue.jsxi:102
	return this;                                                                   // queue.jsxi:104
};

function Worker (path){                                                            // worker.jsxi:1
	this.path = path;                                                              // worker.jsxi:2
	this.mainFile = undefined;                                                     // worker.jsxi:3
	this.state = Worker.STATE_INITIAL;                                             // worker.jsxi:4
	this.data = {                                                                  // worker.jsxi:5
		statements: [],                                                            // worker.jsxi:5
		classes: [],                                                               // worker.jsxi:5
		initializations: [],                                                       // worker.jsxi:5
		helpers: {}
	};
}

Worker.STATE_WAITING = - 1;                                                        // worker.jsxi:8
Worker.STATE_INITIAL = 0;                                                          // worker.jsxi:9
Worker.STATE_STARTED = 1;                                                          // worker.jsxi:10
Worker.STATE_COLLECTED = 2;                                                        // worker.jsxi:11
Worker.STATE_CLASSES = 3;                                                          // worker.jsxi:12
Worker.STATE_GENERATED = 4;                                                        // worker.jsxi:13
Worker.STATE_FINISHED = 5;                                                         // worker.jsxi:14
addLog (Worker, 0, 
	'app');                                                                        // worker.jsxi:16
Worker.params = {};                                                                // worker.jsxi:18
Worker.storage = { macros: {} };                                                   // worker.jsxi:19
Worker.prototype.waitForFinish = function (callback){                              // worker.jsxi:21
	var interval = setInterval (function (arg){                                    // worker.jsxi:22
		if (fileStorage.everythingFinished ()){                                    // worker.jsxi:23
			clearInterval (interval);                                              // worker.jsxi:24
			callback ();                                                           // worker.jsxi:25
		} else if (fileStorage.has (function (arg){                                // worker.jsxi:27
			return arg.state !== File.STATE_FINISHED && arg.state !== File.STATE_MACRO_WAITING;
		}) && MacroCall.waitingForCallback === 0 && MacroCall.waitingForMacro > 0){
			console.fatal ('Macro initialization failed: ' + macroStorage.requests.map (function (arg){
				return '@' + arg [0];                                              // worker.jsxi:31
			}).join (', '));                                                       // worker.jsxi:31
		}
	}, 
	100);
};
Worker.prototype.start = function (callback){                                      // worker.jsxi:36
	console.assert (this.state == Worker.STATE_INITIAL,                            // worker.jsxi:37
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:37
	this.state = Worker.STATE_WAITING;                                             // worker.jsxi:38
	this.log ('started');                                                          // worker.jsxi:40
	
	{
		var __20 = File.find ('default/*') || [];
		
		for (var __1v = 0; __1v < __20.length; __1v ++){
			var file = __20 [__1v];
			
			file.process ();                                                       // worker.jsxi:43
		}
		
		__20 = undefined;
	}
	
	this.mainFile = new File (this.path);                                          // worker.jsxi:45
	this.mainFile.process ();                                                      // worker.jsxi:46
	this.waitForFinish ((function (arg){                                           // worker.jsxi:48
		fileStorage.sort ();                                                       // worker.jsxi:49
		this.log ('files processed and sorted');                                   // worker.jsxi:51
		this.state = Worker.STATE_STARTED;                                         // worker.jsxi:52
		callback ();                                                               // worker.jsxi:53
	}).bind (this));                                                               // worker.jsxi:54
};
Worker.prototype.collect = function (callback){                                    // worker.jsxi:57
	console.assert (this.state == Worker.STATE_STARTED,                            // worker.jsxi:58
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:58
	this.state = Worker.STATE_WAITING;                                             // worker.jsxi:59
	
	{
		var __22 = fileStorage.files;
		
		for (var __21 = 0; __21 < __22.length; __21 ++){
			var file = __22 [__21];
			
			$.extend (this.data.helpers, file.helpers);                            // worker.jsxi:62
			Array.prototype.push.apply (this.data.statements, file.parsed.body);   // worker.jsxi:63
		}
		
		__22 = undefined;
	}
	
	this.log ('parsed stuff collected');                                           // worker.jsxi:66
	this.state = Worker.STATE_COLLECTED;                                           // worker.jsxi:67
	callback ();                                                                   // worker.jsxi:69
};
Worker.prototype.classes = function (callback){                                    // worker.jsxi:72
	console.assert (this.state == Worker.STATE_COLLECTED,                          // worker.jsxi:73
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:73
	this.state = Worker.STATE_WAITING;                                             // worker.jsxi:74
	doClasses (this.data.statements,                                               // worker.jsxi:76
		(function (helpers){                                                       // worker.jsxi:76
			this.log ('classes processed');                                        // worker.jsxi:77
			this.state = Worker.STATE_CLASSES;                                     // worker.jsxi:78
			$.extend (this.data.helpers, helpers);                                 // worker.jsxi:79
			callback ();                                                           // worker.jsxi:81
		}).bind (this));                                                           // worker.jsxi:82
};
Worker.prototype.generate = function (callback){                                   // worker.jsxi:85
	console.assert (this.state == Worker.STATE_CLASSES,                            // worker.jsxi:86
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:86
	this.state = Worker.STATE_WAITING;                                             // worker.jsxi:87
	
	var elements = doHelpers (this.data.helpers).concat (this.data.statements),    // worker.jsxi:89
		ast = { type: Syntax.Program, body: elements },                            // worker.jsxi:90
		temp = path.resolve (__dirname, '../tests/ast-debug.json');                // worker.jsxi:91
	
	if (!fs.existsSync (temp))                                                     // worker.jsxi:92
		fs.writeFileSync (temp,                                                    // worker.jsxi:93
			JSON.stringify (ast, false, 
				4));                                                               // worker.jsxi:93
	
	var result = convert (ast, { filename: 'result' });
	
	this.log ('js generated');                                                     // worker.jsxi:97
	this.state = Worker.STATE_GENERATED;                                           // worker.jsxi:98
	this.result = result;                                                          // worker.jsxi:99
	callback ();                                                                   // worker.jsxi:101
};
Worker.prototype.save = function (callback){                                       // worker.jsxi:104
	console.assert (this.state == Worker.STATE_GENERATED,                          // worker.jsxi:105
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:105
	this.state = Worker.STATE_WAITING;                                             // worker.jsxi:106
	
	var saveTo = Worker.params.buildTo || this.mainFile.fullpath.replace (/(\.[^\/\\\.]+)?$/, 
		function (arg){                                                            // worker.jsxi:108
			return arg === '.js' ? arg : '';                                       // worker.jsxi:108
		}) + '.js';                                                                // worker.jsxi:108
	
	fs.writeFile (saveTo,                                                          // worker.jsxi:109
		this.result,                                                               // worker.jsxi:109
		(function (arg){                                                           // worker.jsxi:109
			this.log ('saved');                                                    // worker.jsxi:110
			this.state = Worker.STATE_FINISHED;                                    // worker.jsxi:111
			callback ();                                                           // worker.jsxi:112
		}).bind (this));                                                           // worker.jsxi:113
};
Worker.prototype.process = function (callback){                                    // worker.jsxi:116
	new Queue (this, Queue.MODE_SEQUENT).description ('worker').add (this.start).add (this.collect).add (this.classes).add (this.generate).add (this.save).run (function (arg){
		console.assert (this.state == Worker.STATE_FINISHED,                       // worker.jsxi:125
			'Wrong state (' + this.state + ')');                                   // worker.jsxi:125
		
		if (callback !== undefined)                                                // worker.jsxi:126
			callback (this);                                                       // worker.jsxi:127
	});
};
