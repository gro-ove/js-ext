function __bindOnce (obj, 
	name){
	if (!obj.hasOwnProperty ('__bindTable'))
		obj.__bindTable = {};
	
	if (!obj.__bindTable.hasOwnProperty (name))
		obj.__bindTable [name] = obj [name].bind (obj);
	return obj.__bindTable [name];
}

/* Class "Analyzer" declaration */
var Analyzer = (function (){                                                       // warnings.jsxi:13
	var Analyzer = function (){};
	
	function variables (ast){}
	
	Analyzer.finalAst = function (ast){                                            // warnings.jsxi:18
		variables (ast);                                                           // warnings.jsxi:19
	};
	return Analyzer;
})();

/* Class "Warnings" declaration */
var Warnings = (function (){                                                       // warnings.jsxi:1
	var Warnings = function (){};
	
	function output (type, message, location){                                     // warnings.jsxi:2
		if (location === undefined)                                                // warnings.jsxi:2
			location = {};                                                         // warnings.jsxi:2
	
		console.warn (type + ': ' + message + ' [' + (location.filename || '<unknown file>') + ':' + (location.lineNumber || '<unknown line>') + ']');
	}
	
	Warnings.hint = function (message, location){                                  // warnings.jsxi:6
		return output ('Hint', message, location);                                 // warnings.jsxi:7
	};
	Warnings.warn = function (message, location){                                  // warnings.jsxi:9
		return output ('Warning', message, location);                              // warnings.jsxi:10
	};
	return Warnings;
})();

/* Class "Generator" declaration */
function Generator (niceMode){                                                     // generator.jsxi:8
	this.__Generator_priorities = [
		Syntax.MemberExpression,                                                   // generator.jsxi:10
		Syntax.NewExpression,                                                      // generator.jsxi:11
		Syntax.CallExpression,                                                     // generator.jsxi:12
		[ '++', '--' ], 
		Syntax.UnaryExpression,                                                    // generator.jsxi:15
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
		Syntax.ConditionalExpression,                                              // generator.jsxi:29
		Syntax.AssignmentExpression,                                               // generator.jsxi:30
		Syntax.SequenceExpression
	];
	this.__Generator_niceMode = !!niceMode;                                        // generator.jsxi:47
}
Generator.prototype.__Generator_findPriority = function (type, operator){          // generator.jsxi:34
	for (var priority = 0; priority < this.__Generator_priorities.length; priority ++){
		var group = this.__Generator_priorities [priority];
		
		if (typeof group === 'string'){                                            // generator.jsxi:36
			if (group === type)                                                    // generator.jsxi:37
				return priority;                                                   // generator.jsxi:38
		} else if (group.indexOf (operator) !== - 1)                               // generator.jsxi:39
			return priority;                                                       // generator.jsxi:40
	}
};
Generator.prototype.__Generator_generateFromNode = function (node, tabs, parent){
	var __that = this;
	
	function end (){                                                               // generator.jsxi:51
		if (__that.__Generator_comment !== null){
			var result = '//' + (__that.__Generator_comments.push (__that.__Generator_comment) - 1) + '\n' + tabs;
			
			__that.__Generator_comment = null;
			return result;                                                         // generator.jsxi:55
		} else
			return '\n' + tabs;                                                    // generator.jsxi:57
	}
	
	;
	
	function brackets (arg){                                                       // generator.jsxi:59
		if (parent instanceof Array || parent.type === Syntax.VariableDeclarator){
			if (node.type === Syntax.SequenceExpression)                           // generator.jsxi:64
				return '(' + arg + ')';                                            // generator.jsxi:65
		} else if (parent.type !== Syntax.MemberExpression || node === parent.object){
			var nodePriority = __that.__Generator_findPriority (node.type, node.operator), 
				parentPriority = __that.__Generator_findPriority (parent.type, parent.operator);
			
			if (parentPriority !== undefined && nodePriority > parentPriority || nodePriority === parentPriority && node === parent.right)
				return '(' + arg + ')';                                            // generator.jsxi:71
		}
		return arg;                                                                // generator.jsxi:74
	}
	
	function child (obj){                                                          // generator.jsxi:77
		return __that.__Generator_generateFromNode (obj, tabs, node);
	}
	
	function indent (obj){                                                         // generator.jsxi:80
		return end () + '\t' + __that.__Generator_generateFromNode (obj, tabs + '\t', node);
	}
	
	function mapArray (array, joinString, forceWrap, insertSpaces){                // generator.jsxi:83
		if (array.length === 0)                                                    // generator.jsxi:84
			return '';                                                             // generator.jsxi:85
		
		function join (array, fn, joinString){                                     // generator.jsxi:87
			var result = fn (array [0], 0);
			
			for (var i = 1; i < array.length; i ++)                                // generator.jsxi:92
				result += joinString + end () + '\t' + fn (array [i], i);          // generator.jsxi:93
			return result;                                                         // generator.jsxi:95
		}
		
		var oneline,                                                               // generator.jsxi:98
			temp = __that.__Generator_comment,                                     // generator.jsxi:99
			localTabs = tabs + '\t',                                               // generator.jsxi:100
			previous,                                                              // generator.jsxi:101
			result = join (array,                                                  // generator.jsxi:102
				forceWrap ? (function (arg, index){                                // generator.jsxi:102
					var indented = __that.__Generator_generateFromNode (arg, localTabs, array);
					
					if ((previous !== arg.type || arg.type !== Syntax.ExpressionStatement) && arg.type !== Syntax.ReturnStatement){
						previous = arg.type;                                       // generator.jsxi:105
						
						if (index > 0)                                             // generator.jsxi:106
							return '\n' + localTabs + indented;                    // generator.jsxi:107
					}
					return indented;                                               // generator.jsxi:109
				}) : (function (arg){                                              // generator.jsxi:110
					var indented = __that.__Generator_generateFromNode (arg, localTabs, array);
					
					if (!forceWrap && indented.indexOf ('\n') !== - 1)             // generator.jsxi:112
						forceWrap = true;                                          // generator.jsxi:113
					return indented;                                               // generator.jsxi:114
				}), 
				joinString);                                                       // generator.jsxi:115
		
		if (!forceWrap)                                                            // generator.jsxi:118
			oneline = result.replace (/\/\/\d+\n\t*/g, '');                        // generator.jsxi:119
		
		if (forceWrap || !oneline || oneline.length > 60){                         // generator.jsxi:123
			if (insertSpaces){                                                     // generator.jsxi:126
				__that.__Generator_comment = temp;                                 // generator.jsxi:127
				return end () + '\t' + result + end ();                            // generator.jsxi:128
			} else
				return result;                                                     // generator.jsxi:130
		} else {
			__that.__Generator_comment = temp;                                     // generator.jsxi:133
			
			if (insertSpaces)                                                      // generator.jsxi:136
				return ' ' + oneline + ' ';                                        // generator.jsxi:137
			else
				return oneline;                                                    // generator.jsxi:139
		}
	}
	
	function sub (obj){                                                            // generator.jsxi:143
		return obj.type === Syntax.BlockStatement ? child (obj) : obj.type === Syntax.EmptyStatement ? ';' : indent (obj);
	}
	
	if (!node || !node.type){                                                      // generator.jsxi:146
		console.json (parent);                                                     // generator.jsxi:147
		
		throw new Error ('Node = ' + JSON.stringify (node, false, 
			4));                                                                   // generator.jsxi:148
	}
	
	if (this.__Generator_niceMode && this.__Generator_comment === null && node.filename)
		this.__Generator_comment = node.filename + ':' + node.lineNumber;          // generator.jsxi:152
	
	var result, temp;
	
	switch (node.type){                                                            // generator.jsxi:156
		case Syntax.BooleanLiteral:                                                // generator.jsxi:158
			
		case Syntax.NullLiteral:                                                   // generator.jsxi:159
			
		case Syntax.NumericLiteral:                                                // generator.jsxi:160
			
		case Syntax.RegexpLiteral:                                                 // generator.jsxi:161
			
		case Syntax.StringLiteral:                                                 // generator.jsxi:162
			
		case Syntax.UndefinedLiteral:                                              // generator.jsxi:163
			return node.value;                                                     // generator.jsxi:164
		case Syntax.Identifier:                                                    // generator.jsxi:166
			return node.name;                                                      // generator.jsxi:167
		case Syntax.Property:                                                      // generator.jsxi:169
			return child (node.key) + ': ' + child (node.value);                   // generator.jsxi:170
		case Syntax.PropertyGetter:                                                // generator.jsxi:172
			return 'get ' + child (node.key) + ' (' + mapArray (node.value.params, ', ') + ')' + child (node.value.body);
		case Syntax.PropertySetter:                                                // generator.jsxi:176
			return 'set ' + child (node.key) + ' (' + mapArray (node.value.params, ', ') + ')' + child (node.value.body);
		case Syntax.ThisExpression:                                                // generator.jsxi:180
			return 'this';                                                         // generator.jsxi:181
		case Syntax.MemberExpression:                                              // generator.jsxi:185
			result = child (node.object);                                          // generator.jsxi:186
			
			if (node.computed){                                                    // generator.jsxi:187
				if (/\w$/.test (result))                                           // generator.jsxi:188
					result += ' ';                                                 // generator.jsxi:189
				
				result += '[' + child (node.property) + ']';                       // generator.jsxi:190
			} else
				result += '.' + child (node.property);                             // generator.jsxi:192
			return result;                                                         // generator.jsxi:193
		case Syntax.NewExpression:                                                 // generator.jsxi:197
			result = 'new ';                                                       // generator.jsxi:198
		case Syntax.CallExpression:                                                // generator.jsxi:200
			result = (result || '') + child (node.callee);                         // generator.jsxi:201
			result += /\w$/.test (result) ? ' (' : '(';                            // generator.jsxi:202
			temp = mapArray (node.arguments, ', ', false, 
				false);                                                            // generator.jsxi:203
			
			if (temp.match (/\n(\t*)/) && RegExp.$1.length > tabs.length + 1)      // generator.jsxi:204
				temp = temp.replace (/\n\t/g, '\n');                               // generator.jsxi:205
			return result + temp + ')';                                            // generator.jsxi:206
		case Syntax.UnaryExpression:                                               // generator.jsxi:210
			if (node.prefix){                                                      // generator.jsxi:211
				result = node.operator;                                            // generator.jsxi:212
				
				if (node.operator !== '!')                                         // generator.jsxi:213
					result += ' ';                                                 // generator.jsxi:214
				
				result += child (node.argument);                                   // generator.jsxi:215
			} else
				result = child (node.argument) + ' ' + node.operator;              // generator.jsxi:217
			return brackets (result);                                              // generator.jsxi:218
		case Syntax.AssignmentExpression:                                          // generator.jsxi:220
			
		case Syntax.BinaryExpression:                                              // generator.jsxi:221
			
		case Syntax.LogicalExpression:                                             // generator.jsxi:222
			return brackets (child (node.left) + ' ' + node.operator + ' ' + child (node.right));
		case Syntax.SequenceExpression:                                            // generator.jsxi:225
			return brackets (mapArray (node.expressions, ', '));                   // generator.jsxi:226
		case Syntax.ConditionalExpression:                                         // generator.jsxi:228
			return brackets (child (node.test) + ' ? ' + child (node.consequent) + ' : ' + child (node.alternate));
		case Syntax.ArrayExpression:                                               // generator.jsxi:233
			return '[' + mapArray (node.elements, ', ', false, 
				true) + ']';                                                       // generator.jsxi:234
		case Syntax.ObjectExpression:                                              // generator.jsxi:236
			return '{' + mapArray (node.properties, ', ', false, 
				true) + '}';                                                       // generator.jsxi:237
		case Syntax.FunctionExpression:                                            // generator.jsxi:239
			if (node.id)                                                           // generator.jsxi:240
				result = 'function ' + child (node.id) + ' (';                     // generator.jsxi:241
			else
				result = 'function (';                                             // generator.jsxi:243
			
			result += mapArray (node.params, ', ') + ')' + child (node.body);      // generator.jsxi:244
			
			if (parent.type === Syntax.VariableDeclarator || parent.type === Syntax.AssignmentExpression || parent instanceof Array)
				return result;                                                     // generator.jsxi:247
			else
				return '(' + result + ')';                                         // generator.jsxi:249
		case Syntax.ClassDeclaration:                                              // generator.jsxi:253
			result = '/* Class "' + node.name + '" declaration */';                // generator.jsxi:254
			
			{
				var __1h = node.statements;
				
				for (var __1g = 0; __1g < __1h.length; __1g ++){
					var statement = __1h [__1g];
					
					result += end () + this.__Generator_generateFromNode (statement, tabs, parent);
				}
				
				__1h = undefined;
			}
			return result;                                                         // generator.jsxi:257
		case Syntax.FunctionDeclaration:                                           // generator.jsxi:259
			return 'function ' + child (node.id) + ' (' + mapArray (node.params, ', ') + ')' + child (node.body);
		case Syntax.VariableDeclaration:                                           // generator.jsxi:262
			temp = mapArray (node.declarations, ', ');                             // generator.jsxi:263
			
			if (node.declarations.length === 1 && temp.match (/\n(\t*)/) && RegExp.$1.length > tabs.length + 1)
				temp = temp.replace (/\n\t/g, '\n');                               // generator.jsxi:265
			
			if (parent.type === Syntax.ForStatement || parent.type === Syntax.ForInStatement)
				return 'var ' + temp;                                              // generator.jsxi:267
			else
				return 'var ' + temp + ';';                                        // generator.jsxi:269
		case Syntax.VariableDeclarator:                                            // generator.jsxi:271
			return node.init ? child (node.id) + ' = ' + child (node.init) : child (node.id);
		case Syntax.BlockStatement:                                                // generator.jsxi:276
			temp = node.body.length > 0;                                           // generator.jsxi:277
			result = '{' + end () + '\t';                                          // generator.jsxi:279
			
			if (parent.type === Syntax.FunctionDeclaration || parent.type === Syntax.FunctionExpression){
				var __1j = parent.params;
				
				for (var __1i = 0; __1i < __1j.length; __1i ++){
					var param = __1j [__1i];
					
					if (param.defaultValue){                                       // generator.jsxi:283
						result += 'if (' + child (param) + ' === undefined)' + end () + '\t\t' + child (param) + ' = ' + child (param.defaultValue) + ';' + end () + '\n\t' + tabs;
						temp = true;                                               // generator.jsxi:285
					}
				}
				
				__1j = undefined;
			}
			
			result += mapArray (node.body, '', true);                              // generator.jsxi:288
			result += end () + '}';                                                // generator.jsxi:289
			
			if (temp){                                                             // generator.jsxi:291
				return result;                                                     // generator.jsxi:292
			} else
				return '{}';                                                       // generator.jsxi:294
		case Syntax.ExpressionStatement:                                           // generator.jsxi:296
			result = child (node.expression);                                      // generator.jsxi:297
			
			if (/^function\s*\(/.test (result))                                    // generator.jsxi:298
				return '(' + result + ');';                                        // generator.jsxi:299
			else
				return result + ';';                                               // generator.jsxi:301
		case Syntax.EmptyStatement:                                                // generator.jsxi:303
			return ';';                                                            // generator.jsxi:304
		case Syntax.LabeledStatement:                                              // generator.jsxi:306
			return child (node.label) + ': ' + child (node.body);                  // generator.jsxi:307
		case Syntax.NotImplementedStatement:                                       // generator.jsxi:309
			return 'console.warn (\'Not implemented at ' + node.lineNumber + ' line of ' + node.filename + '\');';
		case Syntax.ReturnStatement:                                               // generator.jsxi:313
			return 'return' + (node.argument ? ' ' + child (node.argument) : '') + ';';
		case Syntax.BreakStatement:                                                // generator.jsxi:316
			if (node.label)                                                        // generator.jsxi:317
				return 'break ' + child (node.label) + ';';                        // generator.jsxi:318
			else
				return 'break;';                                                   // generator.jsxi:320
		case Syntax.ContinueStatement:                                             // generator.jsxi:322
			if (node.label)                                                        // generator.jsxi:323
				return 'continue ' + child (node.label) + ';';                     // generator.jsxi:324
			else
				return 'continue;';                                                // generator.jsxi:326
		case Syntax.IfStatement:                                                   // generator.jsxi:329
			result = 'if (' + child (node.test) + ')' + sub (node.consequent);     // generator.jsxi:330
			
			if (node.alternate){                                                   // generator.jsxi:332
				if (node.consequent.type !== Syntax.BlockStatement)                // generator.jsxi:333
					result += end ();                                              // generator.jsxi:334
				else
					result += ' ';                                                 // generator.jsxi:336
				
				result += 'else';                                                  // generator.jsxi:338
				
				if (node.alternate.type === Syntax.IfStatement){                   // generator.jsxi:340
					result += ' ' + child (node.alternate);                        // generator.jsxi:341
				} else {
					if (node.alternate.type === Syntax.BlockStatement)             // generator.jsxi:343
						result += ' ';                                             // generator.jsxi:344
					
					result += sub (node.alternate);                                // generator.jsxi:345
				}
			}
			return result;                                                         // generator.jsxi:349
		case Syntax.SwitchStatement:                                               // generator.jsxi:351
			result = 'switch (' + child (node.discriminant) + '){';                // generator.jsxi:352
			
			{
				var __1l = node.cases;
				
				for (var __1k = 0; __1k < __1l.length; __1k ++){
					var obj = __1l [__1k];
					
					result += indent (obj);                                        // generator.jsxi:354
				}
				
				__1l = undefined;
			}
			return result + end () + '}';                                          // generator.jsxi:355
		case Syntax.SwitchCase:                                                    // generator.jsxi:357
			result = (node.test ? 'case ' + child (node.test) : 'default') + ':' + end ();
			return result + '\t' + mapArray (node.consequent, '', true);           // generator.jsxi:359
		case Syntax.WhileStatement:                                                // generator.jsxi:362
			return 'while (' + child (node.test) + ')' + sub (node.body);          // generator.jsxi:363
		case Syntax.DoWhileStatement:                                              // generator.jsxi:365
			result = 'do';                                                         // generator.jsxi:366
			
			if (node.body.type !== Syntax.BlockStatement)                          // generator.jsxi:367
				result += sub (node.body) + end ();                                // generator.jsxi:368
			else
				result += ' ' + sub (node.body) + ' ';                             // generator.jsxi:370
			return result + 'while (' + child (node.test) + ');';                  // generator.jsxi:371
		case Syntax.ForStatement:                                                  // generator.jsxi:373
			result = 'for (';                                                      // generator.jsxi:374
			
			if (node.init)                                                         // generator.jsxi:376
				result += child (node.init) + ';';                                 // generator.jsxi:377
			else
				result += ';';                                                     // generator.jsxi:379
			
			if (node.test)                                                         // generator.jsxi:381
				result += ' ' + child (node.test) + ';';                           // generator.jsxi:382
			else
				result += ';';                                                     // generator.jsxi:384
			
			if (node.update)                                                       // generator.jsxi:386
				result += ' ' + child (node.update);                               // generator.jsxi:387
			return result + ')' + sub (node.body);                                 // generator.jsxi:389
		case Syntax.ForInStatement:                                                // generator.jsxi:391
			return 'for (' + child (node.left) + ' in ' + child (node.right) + ')' + sub (node.body);
		case Syntax.TryStatement:                                                  // generator.jsxi:395
			result = 'try ' + sub (node.block) + ' ';                              // generator.jsxi:396
			
			{
				var __1n = node.handlers;
				
				for (var __1m = 0; __1m < __1n.length; __1m ++){
					var handler = __1n [__1m];
					
					result += child (handler) + ' ';                               // generator.jsxi:398
				}
				
				__1n = undefined;
			}
			
			if (node.finalizer)                                                    // generator.jsxi:399
				result += 'finally ' + sub (node.finalizer);                       // generator.jsxi:400
			return result;                                                         // generator.jsxi:401
		case Syntax.CatchClause:                                                   // generator.jsxi:403
			return 'catch (' + child (node.param) + ')' + sub (node.body);         // generator.jsxi:404
		case Syntax.ThrowStatement:                                                // generator.jsxi:406
			return 'throw ' + child (node.argument) + ';';                         // generator.jsxi:407
		case Syntax.DebuggerStatement:                                             // generator.jsxi:409
			return 'debugger;';                                                    // generator.jsxi:410
		case Syntax.Program:                                                       // generator.jsxi:413
			if (node.body.length === 0)                                            // generator.jsxi:414
				return '';                                                         // generator.jsxi:415
			
			result = '';                                                           // generator.jsxi:417
			temp = node.body [0].type;                                             // generator.jsxi:418
			
			{
				var __1o = node.body;
				
				for (var index = 0; index < __1o.length; index ++){                // generator.jsxi:420
					var childNode = __1o [index];
					
					if (index > 0){                                                // generator.jsxi:421
						if (temp !== childNode.type || childNode.type !== Syntax.ExpressionStatement || childNode.headerComment){
							temp = childNode.type;                                 // generator.jsxi:423
							result += end () + '\n';                               // generator.jsxi:424
						} else
							result += end ();                                      // generator.jsxi:426
					}
					
					result += child (childNode);                                   // generator.jsxi:429
				}
				
				__1o = undefined;
			}
			return result + end ();                                                // generator.jsxi:432
		default:
			throw new Error ('Unsupported type: ' + node.type);                    // generator.jsxi:435
	}
};
Generator.prototype.generate = function (ast){                                     // generator.jsxi:439
	var __that = this;
	
	this.__Generator_comment = null;
	this.__Generator_comments = [];
	
	var result = this.__Generator_generateFromNode (ast, '', null);
	
	if (this.__Generator_niceMode){
		var max = - 1, maxAllowed = 80, begins = [], previous, index = 0;
		
		result = result.replace (/([^\n]*?)\/\/(\d+)\n/g,                          // generator.jsxi:452
			function (match, begin, found){                                        // generator.jsxi:453
				var length = begin.replace (/\t/g, '    ').length;
				
				if (length > maxAllowed){                                          // generator.jsxi:456
					return begin + '\n';                                           // generator.jsxi:457
				} else {
					if (previous !== found)                                        // generator.jsxi:459
						previous = found;                                          // generator.jsxi:460
					else
						found = '...';                                             // generator.jsxi:462
					
					begins.push (length);                                          // generator.jsxi:464
					
					if (length > max)                                              // generator.jsxi:465
						max = length;                                              // generator.jsxi:466
					return begin + '//' + found + '\n';                            // generator.jsxi:467
				}
			}).replace (/\/\/(\d+)\n/g,                                            // generator.jsxi:470
			function (match, comment){                                             // generator.jsxi:470
				return repeatString (' ', max - begins [index ++]) + '   // ' + __that.__Generator_comments [+ comment] + '\n';
			});
	}
	return result;                                                                 // generator.jsxi:474
};

/* Class "Context" declaration */
var Context = (function (){                                                        // context.jsxi:1
	var Context = function (file){                                                 // context.jsxi:1
			console.assert (file instanceof File, 'File required');                // context.jsxi:6
			this.id = ids.indexOf (file.fullpath);                                 // context.jsxi:8
			
			if (this.id < 0)
				this.id = ids.push (file.fullpath) - 1;                            // context.jsxi:10
			
			this.file = file;                                                      // context.jsxi:11
		}, 
		ids = [];                                                                  // context.jsxi:2
	
	Context.prototype.toString = function (){                                      // context.jsxi:14
		return this.file.filename;                                                 // context.jsxi:15
	};
	return Context;
})();

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
File.prototype.replacedExtension = function (arg){                                 // file.jsxi:85
	console.assert (typeof arg === 'string' && arg.length > 0, 'Wrong arg');       // file.jsxi:86
	return this.fullpath.replace (/(\.[^\/\\\.]+)?$/,                              // file.jsxi:87
		function (arg){                                                            // file.jsxi:87
			return arg && arg === '.' + arg ? arg : '';                            // file.jsxi:87
		}) + '.' + arg;                                                            // file.jsxi:87
};
File.prototype.findChild = function (child){                                       // file.jsxi:90
	return File.find (this, child);                                                // file.jsxi:91
};
File.prototype.weight = function (){                                               // file.jsxi:93
	if (this.weightCalculating)
		return 0;
	
	this.weightCalculating = true;
	
	var result = this.imports.reduce (function (a, b){                             // file.jsxi:98
		return a + b.weight ();                                                    // file.jsxi:98
	}, 
	1);
	
	this.weightCalculating = false;
	return result;                                                                 // file.jsxi:101
};
File.prototype.load = function (callback){                                         // file.jsxi:104
	console.assert (this.state == File.STATE_INITIAL,                              // file.jsxi:105
		'Wrong state (' + this.state + ')');                                       // file.jsxi:105
	this.state = File.STATE_MACRO_WAITING;
	this.content = String (fs.readFileSync (this.fullpath));                       // file.jsxi:108
	this.state = File.STATE_LOADED;
	callback ();                                                                   // file.jsxi:110
};
File.prototype.macros = function (callback){                                       // file.jsxi:125
	var __that = this;
	
	console.assert (this.state == File.STATE_LOADED,                               // file.jsxi:126
		'Wrong state (' + this.state + ')');                                       // file.jsxi:126
	this.state = File.STATE_WAITING;
	macrosProcess (this.content,                                                   // file.jsxi:129
		new Context (this),                                                        // file.jsxi:129
		function (arg){                                                            // file.jsxi:129
			__that.state = File.STATE_MACROS;
			__that.content = String (arg);                                         // file.jsxi:133
			callback ();                                                           // file.jsxi:135
		});
};
File.prototype.parsing = function (callback){                                      // file.jsxi:139
	var __that = this;
	
	console.assert (this.state == File.STATE_MACROS,                               // file.jsxi:140
		'Wrong state (' + this.state + ')');                                       // file.jsxi:140
	this.state = File.STATE_WAITING;
	jsxParse (this.content,                                                        // file.jsxi:143
		{ filename: this.filename, initializationAllowed: true }, 
		function (error, parsed, helpers){                                         // file.jsxi:143
			if (error){                                                            // file.jsxi:146
				var reportPath = Worker.instance.mainFile.replacedExtension ('jsxr'), 
					reportContent = '===================================[   ERROR REPORT   ]===================================\n\tError while parsing ' + __that.filename + ' (' + __that.fullpath + ').\n\n===================================[   STACK  TRACE   ]===================================\n\t' + error.stack.replace (/\n/g, '\n\t') + '\n\n===================================[   SOURCE  CODE   ]===================================\n' + __that.content.split ('\n').map (function (string, number, array){
						return repeatString (' ', 5 - String (number + 1).length) + (number + 1) + '   ' + string;
					}).join ('\n');                                                // file.jsxi:158
				
				throw error;                                                       // file.jsxi:161
			}
			
			__that.state = File.STATE_FINISHED;
			__that.parsed = parsed;                                                // file.jsxi:165
			__that.helpers = helpers;                                              // file.jsxi:166
			callback ();                                                           // file.jsxi:168
		});
};
File.prototype.process = function (callback){                                      // file.jsxi:172
	var __that = this;
	
	new Queue (this, Queue.MODE_SEQUENT).description ('file process').add (__bindOnce (this, 'load')).add (__bindOnce (this, 'macros')).add (__bindOnce (this, 'parsing')).run (function (arg){
		console.assert (__that.state == File.STATE_FINISHED,                       // file.jsxi:179
			'Wrong state (' + __that.state + ')');                                 // file.jsxi:179
		
		if (callback !== undefined)                                                // file.jsxi:180
			callback (this);                                                       // file.jsxi:181
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
		var __1d = from ? [ { root: from.root, dirname: from.dirname } ].concat (File.lookingAt) : File.lookingAt;
		
		for (var __1c = 0; __1c < __1d.length; __1c ++){
			var entry = __1d [__1c];
			
			var temp = findInFolder (entry.root, entry.dirname, child);
			
			if (temp)                                                              // file.jsxi:52
				return temp.map (function (arg){                                   // file.jsxi:53
					return fileStorage.get (arg) || new File (entry.root, arg);    // file.jsxi:53
				});
		}
		
		__1d = undefined;
	}
};

/* Class "Worker" declaration */
function Worker (path){                                                            // worker.jsxi:1
	this.mainFile = undefined;
	this.state = Worker.STATE_INITIAL;
	this.data = {
		statements: [],                                                            // worker.jsxi:17
		classes: [],                                                               // worker.jsxi:17
		initializations: [],                                                       // worker.jsxi:17
		helpers: {}
	};
	this.mainFile = new File (path);                                               // worker.jsxi:21
	Worker.instance = this;                                                        // worker.jsxi:22
}
Worker.prototype.waitForFinish = function (callback){                              // worker.jsxi:25
	var interval = setInterval (function (arg){                                    // worker.jsxi:26
		if (fileStorage.everythingFinished ()){                                    // worker.jsxi:27
			clearInterval (interval);                                              // worker.jsxi:28
			callback ();                                                           // worker.jsxi:29
		} else if (fileStorage.has (function (arg){                                // worker.jsxi:30
			return arg.state !== File.STATE_FINISHED && arg.state !== File.STATE_MACRO_WAITING;
		}) && MacroCall.waitingForCallback === 0 && MacroCall.waitingForMacro > 0){
			console.fatal ('Macro initialization failed: ' + macroStorage.requests.map (function (arg){
				return '@' + arg [0] + ' (' + arg [2] + ')';                       // worker.jsxi:32
			}).join (', '));                                                       // worker.jsxi:32
		}
	}, 
	300);
};
Worker.prototype.start = function (callback){                                      // worker.jsxi:37
	var __that = this;
	
	console.assert (this.state == Worker.STATE_INITIAL,                            // worker.jsxi:38
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:38
	this.state = Worker.STATE_WAITING;
	
	{
		var __27 = File.find ('default/*') || [];
		
		for (var __26 = 0; __26 < __27.length; __26 ++){
			var file = __27 [__26];
			
			file.process ();                                                       // worker.jsxi:44
		}
		
		__27 = undefined;
	}
	
	this.mainFile.process ();                                                      // worker.jsxi:46
	this.waitForFinish (function (arg){                                            // worker.jsxi:48
		fileStorage.sort ();                                                       // worker.jsxi:49
		__that.state = Worker.STATE_STARTED;
		callback ();                                                               // worker.jsxi:53
	});
};
Worker.prototype.collect = function (callback){                                    // worker.jsxi:57
	console.assert (this.state == Worker.STATE_STARTED,                            // worker.jsxi:58
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:58
	this.state = Worker.STATE_WAITING;
	
	{
		var __29 = fileStorage.files;
		
		for (var __28 = 0; __28 < __29.length; __28 ++){
			var file = __29 [__28];
			
			$.extend (this.data.helpers, file.helpers);                            // worker.jsxi:62
			Array.prototype.push.apply (this.data.statements, file.parsed.body);   // worker.jsxi:63
		}
		
		__29 = undefined;
	}
	
	this.state = Worker.STATE_COLLECTED;
	callback ();                                                                   // worker.jsxi:69
};
Worker.prototype.classes = function (callback){                                    // worker.jsxi:72
	var __that = this;
	
	console.assert (this.state == Worker.STATE_COLLECTED,                          // worker.jsxi:73
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:73
	this.state = Worker.STATE_WAITING;
	doClasses (this.data.statements,                                               // worker.jsxi:76
		function (helpers){                                                        // worker.jsxi:76
			__that.state = Worker.STATE_CLASSES;
			$.extend (__that.data.helpers, helpers);                               // worker.jsxi:79
			callback ();                                                           // worker.jsxi:81
		});
};
Worker.prototype.generate = function (callback){                                   // worker.jsxi:85
	console.assert (this.state == Worker.STATE_CLASSES,                            // worker.jsxi:86
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:86
	this.state = Worker.STATE_WAITING;
	
	var elements = doHelpers (this.data.helpers).concat (this.data.statements),    // worker.jsxi:89
		ast = { type: Syntax.Program, body: elements };                            // worker.jsxi:90
	
	Analyzer.finalAst (ast);                                                       // worker.jsxi:92
	this.state = Worker.STATE_GENERATED;                                           // worker.jsxi:95
	this.result = new Generator (true).generate (ast);                             // worker.jsxi:96
	callback ();                                                                   // worker.jsxi:98
};
Worker.prototype.save = function (callback){                                       // worker.jsxi:101
	var __that = this;
	
	console.assert (this.state == Worker.STATE_GENERATED,                          // worker.jsxi:102
		'Wrong state (' + this.state + ')');                                       // worker.jsxi:102
	this.state = Worker.STATE_WAITING;
	
	if (Worker.params.buildTo == null){                                            // worker.jsxi:105
		console.log (this.result);                                                 // worker.jsxi:107
	} else {
		var saveTo = Worker.params.buildTo || this.mainFile.replacedExtension ('js');
		
		fs.writeFile (saveTo,                                                      // worker.jsxi:111
			this.result, 
			function (arg){                                                        // worker.jsxi:111
				__that.state = Worker.STATE_FINISHED;
				callback ();                                                       // worker.jsxi:114
			});
	}
};
Worker.prototype.process = function (callback){                                    // worker.jsxi:119
	var __that = this;
	
	new Queue (this, Queue.MODE_SEQUENT).description ('worker').add (__bindOnce (this, 'start')).add (__bindOnce (this, 'collect')).add (__bindOnce (this, 'classes')).add (__bindOnce (this, 'generate')).add (__bindOnce (this, 'save')).run (function (arg){
		console.assert (__that.state == Worker.STATE_FINISHED,                     // worker.jsxi:128
			'Wrong state (' + __that.state + ')');                                 // worker.jsxi:128
		
		if (callback !== undefined)                                                // worker.jsxi:129
			callback (this);                                                       // worker.jsxi:130
	});
};
Worker.STATE_WAITING = - 1;                                                        // worker.jsxi:2
Worker.STATE_INITIAL = 0;                                                          // worker.jsxi:3
Worker.STATE_STARTED = 1;                                                          // worker.jsxi:4
Worker.STATE_COLLECTED = 2;                                                        // worker.jsxi:5
Worker.STATE_CLASSES = 3;                                                          // worker.jsxi:6
Worker.STATE_GENERATED = 4;                                                        // worker.jsxi:7
Worker.STATE_FINISHED = 5;                                                         // worker.jsxi:8
Worker.params = {};                                                                // worker.jsxi:11
Worker.storage = { macros: {} };                                                   // worker.jsxi:12
Worker.instance = undefined;                                                       // worker.jsxi:13

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

function makeAsynchronous (body){                                                  // asynchronous_functions.jsxi:1
	function asynchronousConvert (statement, asynchronous){                        // asynchronous_functions.jsxi:2
		var next = identifier ('__block_' + blocks.length);
		
		if (statement.type === Syntax.ExpressionStatement){                        // asynchronous_functions.jsxi:5
			var expression = statement.expression;
			
			if (expression.type === Syntax.CallExpression){                        // asynchronous_functions.jsxi:8
				if (expression === asynchronous [0] && asynchronous.length === 1){
					expression.arguments.push (next);                              // asynchronous_functions.jsxi:10
					return expression;                                             // asynchronous_functions.jsxi:11
				}
			} else if (expression.type === Syntax.AssignmentExpression){           // asynchronous_functions.jsxi:13
				if (expression.right === asynchronous [0] && asynchronous.length === 1){
					expression.right.arguments.push (functionExpression (null,     // asynchronous_functions.jsxi:15
						[ identifier ('__result') ], 
						blockStatement ([                                          // asynchronous_functions.jsxi:17
							assignmentStatement (expression.left, identifier ('__result')), 
							callExpression (next)
						])));
					return expression.right;                                       // asynchronous_functions.jsxi:21
				}
			}
		}
		
		throw new JsExtError ('NotImplementedError',                               // asynchronous_functions.jsxi:26
			'Not supported asynchronous type' + '\n' + JSON.stringify (statement, false, 
				4));                                                               // asynchronous_functions.jsxi:26
	}
	
	function synchronousConvert (statement){                                       // asynchronous_functions.jsxi:29
		astEach (statement,                                                        // asynchronous_functions.jsxi:30
			function (arg){                                                        // asynchronous_functions.jsxi:30
				if (arg.type === Syntax.ReturnStatement)                           // asynchronous_functions.jsxi:31
					arg.argument = callExpression (identifier ('__callback'), [ arg.argument ]);
			});
		return statement;                                                          // asynchronous_functions.jsxi:35
	}
	
	var variables = [];
	
	astEach (body,                                                                 // asynchronous_functions.jsxi:40
		function (arg){                                                            // asynchronous_functions.jsxi:40
			if (arg.type === Syntax.VariableDeclaration){                          // asynchronous_functions.jsxi:40
				arg.declarations.forEach (function (arg){                          // asynchronous_functions.jsxi:41
					return variables.push (variableDeclarator (arg.id));           // asynchronous_functions.jsxi:41
				});
				
				var inits = arg.declarations.filter (function (arg){               // asynchronous_functions.jsxi:43
						return arg.init !== null;                                  // asynchronous_functions.jsxi:43
					}), 
					expression = sequenceExpression (inits.map (function (arg){    // asynchronous_functions.jsxi:44
						return assignmentExpression (arg.id, arg.init);            // asynchronous_functions.jsxi:44
					})), 
					temp;                                                          // asynchronous_functions.jsxi:45
				
				if (expression.length === 0)                                       // asynchronous_functions.jsxi:47
					temp = { type: Syntax.EmptyStatement };                        // asynchronous_functions.jsxi:48
				else if (expression.expressions.length === 1)                      // asynchronous_functions.jsxi:49
					temp = expressionStatement (expression.expressions [0]);       // asynchronous_functions.jsxi:50
				else
					temp = expressionStatement (expression);                       // asynchronous_functions.jsxi:52
				
				set (arg, temp);                                                   // asynchronous_functions.jsxi:54
			}
		});
	
	var current = [], blocks = [ current ];
	
	for (var __0 = 0; __0 < body.length; __0 ++){                                  // asynchronous_functions.jsxi:60
		var statement = body [__0];
		
		var asynchronous = astEach (statement,                                     // asynchronous_functions.jsxi:61
			function (arg){                                                        // asynchronous_functions.jsxi:61
				if (arg.asynchronous)                                              // asynchronous_functions.jsxi:61
					return arg;                                                    // asynchronous_functions.jsxi:61
			});
		
		if (asynchronous.length > 0){                                              // asynchronous_functions.jsxi:63
			current.push (asynchronousConvert (statement, asynchronous));          // asynchronous_functions.jsxi:64
			blocks.push (current = []);                                            // asynchronous_functions.jsxi:65
		} else {
			current.push (synchronousConvert (statement));                         // asynchronous_functions.jsxi:67
		}
	}
	
	body = blocks.map (function (arg, index){                                      // asynchronous_functions.jsxi:71
		return functionDeclaration (identifier ('__block_' + index),               // asynchronous_functions.jsxi:72
			[], 
			blockStatement (arg));                                                 // asynchronous_functions.jsxi:72
	}).concat (expressionStatement (callExpression ('__block_0', [])));            // asynchronous_functions.jsxi:73
	
	if (variables.length)                                                          // asynchronous_functions.jsxi:75
		body.unshift (variableDeclaration (variables));                            // asynchronous_functions.jsxi:76
	return body;                                                                   // asynchronous_functions.jsxi:78
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
			function createObjectPropertyMember (member){                          // do_classes.jsxi:109
				var name = member.id.originalName;
				
				var prop;
				
				if (!classEntry.members.hasOwnProperty (name)){                    // do_classes.jsxi:113
					classEntry.members [name] = (prop = { id: identifier (name) });
					prop.property = true;                                          // do_classes.jsxi:115
					prop.publicMode = member.publicMode;                           // do_classes.jsxi:117
					prop.static = member.static;                                   // do_classes.jsxi:118
					prop.abstract = member.abstract;                               // do_classes.jsxi:119
				} else {
					prop = classEntry.members [name];                              // do_classes.jsxi:121
				}
				
				if (member.type === Syntax.GetterDeclarator){                      // do_classes.jsxi:124
					console.assert (prop.get == null);                             // do_classes.jsxi:125
					prop.get = member.body;                                        // do_classes.jsxi:126
				} else if (member.type === Syntax.SetterDeclarator){               // do_classes.jsxi:127
					console.assert (prop.set == null);                             // do_classes.jsxi:128
					prop.set = member.body;                                        // do_classes.jsxi:129
				} else {
					console.assert (member.type);                                  // do_classes.jsxi:131
				}
			}
			
			function updateMember (member){                                        // do_classes.jsxi:136
				if (!classEntry.members.hasOwnProperty (member.id.name))           // do_classes.jsxi:138
					classEntry.members [member.id.name] = member;                  // do_classes.jsxi:139
				
				member.className = classEntry.id;                                  // do_classes.jsxi:142
				member.method = member.type === Syntax.FunctionExpression;         // do_classes.jsxi:143
				member.field = member.type === Syntax.VariableDeclarator;          // do_classes.jsxi:144
				console.assert (member.method || member.field || member.property);
				member.processed = false;                                          // do_classes.jsxi:147
				return member;                                                     // do_classes.jsxi:149
			}
			
			classEntry.classObject = true;                                         // do_classes.jsxi:153
			
			{
				var __5 = classEntry.members;
				
				for (var name in __5){
					var value = __5 [name];
					
					value.className = classEntry.id;                               // do_classes.jsxi:157
				}
				
				__5 = undefined;
			}
			
			var constructor = classEntry.members ['@constructor'];
			
			if (constructor === undefined){                                        // do_classes.jsxi:161
				constructor = updateMember (functionExpression ('@constructor', [], 
					blockStatement ([])));                                         // do_classes.jsxi:162
				constructor.autocreated = true;                                    // do_classes.jsxi:163
			}
			
			var initializer = classEntry.members ['@initializer'];
			
			if (initializer === undefined){                                        // do_classes.jsxi:168
				initializer = updateMember (functionExpression ('@initializer', [], 
					blockStatement ([])));                                         // do_classes.jsxi:169
				initializer.static = true;                                         // do_classes.jsxi:170
				initializer.autocreated = true;                                    // do_classes.jsxi:171
			}
			
			{
				var __6 = classEntry.members;
				
				for (var name in __6){
					var member = __6 [name];
					
					if (member.type === Syntax.GetterDeclarator || member.type === Syntax.SetterDeclarator){
						createObjectPropertyMember (member);                       // do_classes.jsxi:177
						delete classEntry.members [name];                          // do_classes.jsxi:178
					}
				}
				
				__6 = undefined;
			}
			
			{
				var __7 = classEntry.members;
				
				for (var name in __7){
					var member = __7 [name];
					
					updateMember (member);                                         // do_classes.jsxi:183
				}
				
				__7 = undefined;
			}
			
			var fields = filter (classEntry,                                       // do_classes.jsxi:186
				function (arg){                                                    // do_classes.jsxi:186
					return !arg.method && !arg.static && arg.init;                 // do_classes.jsxi:186
				});
			
			var initialization = fields.map (function (arg){                       // do_classes.jsxi:189
				return $.extend (expressionStatement (assignmentExpression (memberExpression (thisExpression (), arg.id.name), arg.init)), 
					{ autocreated: true });
			});
			
			Array.prototype.unshift.apply (constructor.body.body, initialization);
			classEntry.childs = [];                                                // do_classes.jsxi:196
			classEntry.probablyUseOther = 0;                                       // do_classes.jsxi:197
		}
		
		for (var __8 = 0; __8 < classes.length; __8 ++){                           // do_classes.jsxi:200
			var classEntry = classes [__8];
			
			preprocessClass (classEntry);                                          // do_classes.jsxi:201
		}
	}
	
	function connectClasses (){                                                    // do_classes.jsxi:204
		var active = {};
		
		function searchSuperExpression (obj){                                      // do_classes.jsxi:207
			if (obj.type === Syntax.CallExpression && 'super' in obj && obj.callee === null){
				return true;
			} else if (obj && obj.body && obj.body.body){                          // do_classes.jsxi:210
				{
					var __a = obj.body.body;
					
					for (var __9 = 0; __9 < __a.length; __9 ++){
						var child = __a [__9];
						
						if (searchSuperExpression (child))                         // do_classes.jsxi:212
							return true;
					}
					
					__a = undefined;
				}
			} else {
				for (var key in obj){                                              // do_classes.jsxi:216
					var child = obj [key];
					
					if (child && typeof child.type === 'string' && searchSuperExpression (child))
						return true;
				}
			}
		}
		
		function connectClass (current, from){                                     // do_classes.jsxi:222
			if (active [current.id.name] === true)                                 // do_classes.jsxi:223
				throw new TypeError ('Circular dependency', current.id);           // do_classes.jsxi:224
			
			if (from)                                                              // do_classes.jsxi:226
				current.childs.push (from);                                        // do_classes.jsxi:227
			
			if (current.weight)                                                    // do_classes.jsxi:229
				return;
			
			active [current.id.name] = true;                                       // do_classes.jsxi:232
			current.weight = 1;                                                    // do_classes.jsxi:233
			
			if (current.dependsOn.parent){                                         // do_classes.jsxi:235
				var parent = byName (current.dependsOn.parent.name, current.path);
				
				if (!parent)                                                       // do_classes.jsxi:238
					throw new TypeError ('Parent class "' + current.dependsOn.parent.name + '" not found', 
						current.dependsOn.parent);                                 // do_classes.jsxi:239
				
				current.dependsOn.parent = parent;                                 // do_classes.jsxi:241
				connectClass (parent, current);                                    // do_classes.jsxi:243
				current.weight += parent.weight;                                   // do_classes.jsxi:244
				
				{
					var __b = parent.members;
					
					for (var id in __b){
						var member = __b [id];
						
						if (!current.members.hasOwnProperty (id))                  // do_classes.jsxi:247
							current.members [id] = $.extend (true,                 // do_classes.jsxi:248
								{}, 
								member,                                            // do_classes.jsxi:248
								{
									publicMode: member.publicMode === 'private' ? 'locked' : member.publicMode
								});
					}
					
					__b = undefined;
				}
				
				var parentConstructor = parent.members ['@constructor'],           // do_classes.jsxi:250
					constructor = current.members ['@constructor'];                // do_classes.jsxi:251
				
				if (parentConstructor.body.body.length > 0 && !searchSuperExpression (constructor)){
					if (constructor.autocreated || parentConstructor.params.length === 0){
						{
							var __c = constructor.body.body;
							
							for (var autocreated = 0; autocreated < __c.length; autocreated ++){
								var statement = __c [autocreated];
								
								if (!statement.autocreated)                        // do_classes.jsxi:256
									break;
							}
							
							__c = undefined;
						}
						
						constructor.body.body.splice (autocreated,                 // do_classes.jsxi:260
							0, 
							expressionStatement (superExpression (null)));         // do_classes.jsxi:260
					} else
						throw new TypeError ('Super constructor call is required', constructor);
				}
			}
			
			{
				var __d = current.dependsOn.uses;
				
				for (var index = 0; index < __d.length; index ++){                 // do_classes.jsxi:266
					var usedName = __d [index];
					
					var used = byName (usedName.name, current.path);
					
					if (!used)                                                     // do_classes.jsxi:269
						throw new TypeError ('Used class "' + usedName.name + '" not found', usedName);
					
					current.dependsOn.uses [index] = used;                         // do_classes.jsxi:272
					connectClass (used);                                           // do_classes.jsxi:274
					current.weight += used.weight;                                 // do_classes.jsxi:275
				}
				
				__d = undefined;
			}
			
			delete active [current.id.name];                                       // do_classes.jsxi:278
		}
		
		for (var __e = 0; __e < classes.length; __e ++){                           // do_classes.jsxi:281
			var current = classes [__e];
			
			connectClass (current);                                                // do_classes.jsxi:282
		}
	}
	
	function processClassesMembers (){                                             // do_classes.jsxi:285
		function rename (name, member, publicMode){                                // do_classes.jsxi:287
			if (publicMode === 'locked' || member.static && publicMode === 'private')
				return name;                                                       // do_classes.jsxi:290
			
			switch (publicMode){                                                   // do_classes.jsxi:292
				case 'protected':                                                  // do_classes.jsxi:293
					return '__' + name;                                            // do_classes.jsxi:294
				case 'private':                                                    // do_classes.jsxi:296
					return '__' + member.className.name + '_' + name;              // do_classes.jsxi:297
				case 'public':                                                     // do_classes.jsxi:299
					return name;                                                   // do_classes.jsxi:300
				default:
					console.assert (false, 'Bad publicMode value');                // do_classes.jsxi:303
			}
		}
		
		function badOverride (parentMember, childMember){                          // do_classes.jsxi:308
			switch (childMember.publicMode){                                       // do_classes.jsxi:309
				case 'public':                                                     // do_classes.jsxi:310
					return false;
				case 'protected':                                                  // do_classes.jsxi:313
					return parentMember.publicMode === 'public';                   // do_classes.jsxi:314
				case 'private':                                                    // do_classes.jsxi:316
					return true;
				default:
					console.assert (false, 'Bad publicMode value: ' + childMember.publicMode);
			}
		}
		
		function morePublicMode (firstMode, secondMode){                           // do_classes.jsxi:323
			var modes = [ 'locked', 'private', 'protected', 'public' ],            // do_classes.jsxi:324
				firstId = modes.indexOf (firstMode),                               // do_classes.jsxi:325
				secondId = modes.indexOf (secondMode),                             // do_classes.jsxi:326
				maxId = Math.max (firstId, secondId);                              // do_classes.jsxi:327
			return modes [maxId];                                                  // do_classes.jsxi:329
		}
		
		function processClassMember (current, name, member){                       // do_classes.jsxi:332
			var publicMode = member.publicMode,                                    // do_classes.jsxi:333
				members = [ member ],                                              // do_classes.jsxi:334
				updated;                                                           // do_classes.jsxi:335
			
			function testChilds (current){                                         // do_classes.jsxi:337
				{
					var __g = current.childs;
					
					for (var __f = 0; __f < __g.length; __f ++){
						var child = __g [__f];
						
						if (child.members.hasOwnProperty (name)){                  // do_classes.jsxi:339
							var childMember = child.members [name];
							
							if (badOverride (member, childMember))                 // do_classes.jsxi:342
								throw new TypeError ('Invalid public mode', childMember.id);
							
							if (member.method && !childMember.method)              // do_classes.jsxi:345
								throw new TypeError ('Invalid override (method required)', childMember.id);
							
							if (member.field && !childMember.field)                // do_classes.jsxi:348
								throw new TypeError ('Invalid override (field required)', childMember.id);
							
							if (member.property && !childMember.property)          // do_classes.jsxi:351
								throw new TypeError ('Invalid override (property required)', childMember.id);
							
							publicMode = morePublicMode (publicMode, childMember.publicMode);
							members.push (childMember);                            // do_classes.jsxi:356
						}
						
						testChilds (child);                                        // do_classes.jsxi:359
					}
					
					__g = undefined;
				}
			}
			
			if (publicMode === 'protected' || publicMode === 'public')             // do_classes.jsxi:362
				testChilds (current);                                              // do_classes.jsxi:363
			
			updated = rename (name, member, publicMode);                           // do_classes.jsxi:365
			
			for (var __h = 0; __h < members.length; __h ++){                       // do_classes.jsxi:367
				var targetMember = members [__h];
				
				targetMember.id.name = updated;                                    // do_classes.jsxi:368
				targetMember.processed = true;                                     // do_classes.jsxi:369
			}
		}
		
		function processClassMembers (current){                                    // do_classes.jsxi:373
			if (current.dependsOn.parent)                                          // do_classes.jsxi:374
				processClassMembers (current.dependsOn.parent);                    // do_classes.jsxi:375
			
			{
				var __i = current.members;
				
				for (var name in __i){
					var member = __i [name];
					
					if (name [0] !== '@' && !member.processed)                     // do_classes.jsxi:379
						processClassMember (current, name, member);                // do_classes.jsxi:380
				}
				
				__i = undefined;
			}
		}
		
		for (var __j = 0; __j < classes.length; __j ++){                           // do_classes.jsxi:383
			var current = classes [__j];
			
			processClassMembers (current);                                         // do_classes.jsxi:384
		}
	}
	
	function processClassesMethods (){                                             // do_classes.jsxi:387
		function processClassMethod (classEntry, methodEntry){                     // do_classes.jsxi:388
			console.assert (classEntry && methodEntry, 'Wrong arguments');         // do_classes.jsxi:389
			
			var exclusions = {};
			
			var currentFunction;
			
			var usingThat = false;
			
			function getThis (){                                                   // do_classes.jsxi:403
				var childFunction = currentFunction !== methodEntry;
				
				if (childFunction)                                                 // do_classes.jsxi:408
					usingThat = true;                                              // do_classes.jsxi:409
				return childFunction ? identifier (thatVariable) : thisExpression ();
			}
			
			function lookForExclusions (obj, target){                              // do_classes.jsxi:415
				if (typeof obj === 'object' && obj !== null){                      // do_classes.jsxi:416
					if (obj instanceof Array){                                     // do_classes.jsxi:417
						for (var __k = 0; __k < obj.length; __k ++){               // do_classes.jsxi:419
							var child = obj [__k];
							
							lookForExclusions (child, target);                     // do_classes.jsxi:420
						}
					} else if ('type' in obj){                                     // do_classes.jsxi:422
						if (obj.type === Syntax.VariableDeclarator || obj.type === Syntax.FunctionDeclaration){
							target [obj.id.name] = true;                           // do_classes.jsxi:425
						} else if (obj.type !== Syntax.FunctionExpression){        // do_classes.jsxi:427
							for (var key in obj){                                  // do_classes.jsxi:429
								var value = obj [key];
								
								lookForExclusions (value, target);                 // do_classes.jsxi:430
							}
						}
					}
				}
			}
			
			function processFunction (obj, parent){                                // do_classes.jsxi:436
				console.assert (typeof obj === 'object' && (obj.type === Syntax.FunctionDeclaration || obj.type === Syntax.FunctionExpression), 
					'Wrong argument');                                             // do_classes.jsxi:438
				
				var oldExclusions = $.extend (true, {}, 
						exclusions),                                               // do_classes.jsxi:441
					oldCurrentFunction = currentFunction;                          // do_classes.jsxi:442
				
				currentFunction = obj;                                             // do_classes.jsxi:444
				obj.params.forEach (function (arg){                                // do_classes.jsxi:447
					return exclusions [arg.name] = true;                           // do_classes.jsxi:447
				});
				lookForExclusions (obj.body.body, exclusions);                     // do_classes.jsxi:450
				process (obj.body.body, obj);                                      // do_classes.jsxi:453
				
				if (usingThat && methodEntry === obj){                             // do_classes.jsxi:456
					var temp = variableDeclarator (thatVariable, thisExpression ());
					
					if (obj.body.body [0] && obj.body.body [0].type === Syntax.VariableDeclaration)
						obj.body.body [0].declarations.unshift (temp);             // do_classes.jsxi:461
					else
						obj.body.body.unshift (variableDeclaration ([ temp ]));    // do_classes.jsxi:464
				}
				
				exclusions = oldExclusions;                                        // do_classes.jsxi:468
				currentFunction = oldCurrentFunction;                              // do_classes.jsxi:469
			}
			
			function processProperty (obj, parent){                                // do_classes.jsxi:472
				process (obj.value, parent);                                       // do_classes.jsxi:473
			}
			
			function processIdentifier (obj, parent){                              // do_classes.jsxi:476
				function replaceObject (member){                                   // do_classes.jsxi:479
					if (methodEntry.static)                                        // do_classes.jsxi:483
						throw new TypeError ('Member "' + obj.name + '" is static', obj);
					
					var that = getThis ();
					
					var result;
					
					if (member.method && parent.type !== Syntax.CallExpression){   // do_classes.jsxi:493
						helpers.set ('bindOnce', obj);                             // do_classes.jsxi:494
						result = callExpression ('__bindOnce',                     // do_classes.jsxi:495
							[ that, stringLiteralWithQuotes (member.id.name) ]);
					} else {
						result = memberExpression (that, member.id.name);          // do_classes.jsxi:497
					}
					return result;                                                 // do_classes.jsxi:500
				}
				
				function replaceStatic (member){                                   // do_classes.jsxi:503
					var className = member.className;
					return memberExpression (className.name, member.id.name);      // do_classes.jsxi:511
				}
				
				if (!(obj.name in exclusions)){                                    // do_classes.jsxi:515
					var result = null, member;
					
					if (obj.name in classEntry.members){                           // do_classes.jsxi:519
						member = classEntry.members [obj.name];                    // do_classes.jsxi:523
						
						if (member.publicMode === 'locked')                        // do_classes.jsxi:526
							throw new TypeError ('Member "' + obj.name + '" has private access', obj);
						
						if (!member.static)                                        // do_classes.jsxi:529
							result = replaceObject (member);                       // do_classes.jsxi:530
						else if (member.publicMode !== 'private')                  // do_classes.jsxi:531
							result = replaceStatic (member);                       // do_classes.jsxi:532
					} else if (byName (obj.name, classEntry.path)){                // do_classes.jsxi:534
						classEntry.weight += 0.0001;                               // do_classes.jsxi:537
					}
					
					if (result)                                                    // do_classes.jsxi:541
						set (obj, result);                                         // do_classes.jsxi:542
				}
			}
			
			function processAssignmentExpression (obj, parent){                    // do_classes.jsxi:546
				process (obj.right, obj);                                          // do_classes.jsxi:547
				process (obj.left, obj);                                           // do_classes.jsxi:548
			}
			
			function processMemberExpression (obj, parent, preparent){             // do_classes.jsxi:551
				var member, propertyNameGetter, second, temp;
				
				if (!obj.computed){                                                // do_classes.jsxi:557
					member = classEntry.members.hasOwnProperty (obj.property.name) ? classEntry.members [obj.property.name] : null;
					
					if (member){                                                   // do_classes.jsxi:560
						if (member.static){                                        // do_classes.jsxi:561
							if (member.publicMode === 'private' && obj.object.type === Syntax.Identifier && obj.object.name === member.className.name){
								set (obj, identifier (member.id.name));            // do_classes.jsxi:563
								return;
							}
						} else if (obj.object.type === Syntax.ThisExpression){     // do_classes.jsxi:566
							obj.property.name = member.id.name;                    // do_classes.jsxi:567
							
							if (currentFunction !== methodEntry)                   // do_classes.jsxi:568
								obj.object = getThis ();                           // do_classes.jsxi:569
						} else if (member.publicMode !== 'public'){                // do_classes.jsxi:570
							if (parent instanceof Array && preparent)              // do_classes.jsxi:571
								parent = preparent;                                // do_classes.jsxi:572
							
							if (obj.object.type === Syntax.Identifier){            // do_classes.jsxi:574
								obj.computed = true;                               // do_classes.jsxi:575
								obj.property = conditionalExpression (binaryExpression (obj.object, 'instanceof', member.className.name), 
									stringLiteralWithQuotes (member.id.name),      // do_classes.jsxi:578
									stringLiteralWithQuotes (obj.property.name));
								process (obj.object, obj);                         // do_classes.jsxi:581
							} else if (parent.type === Syntax.AssignmentExpression){
								second = $.extend (true, {}, 
									parent);                                       // do_classes.jsxi:583
								
								for (var key in parent){                           // do_classes.jsxi:584
									var value = parent [key];
									
									if (value === obj)                             // do_classes.jsxi:585
										second [key] = memberExpression ('__',     // do_classes.jsxi:586
											conditionalExpression (binaryExpression ('__', 'instanceof', member.className.name), 
												stringLiteralWithQuotes (member.id.name), 
												stringLiteralWithQuotes (obj.property.name)), 
											true);
								}
								
								set (parent,                                       // do_classes.jsxi:591
									sequenceExpression ([ assignmentExpression ('__', obj.object), second ]));
								process (obj.object, obj);                         // do_classes.jsxi:596
								temp = true;                                       // do_classes.jsxi:598
							} else {
								set (obj,                                          // do_classes.jsxi:600
									sequenceExpression ([                          // do_classes.jsxi:600
										assignmentExpression ('__', obj.object), 
										memberExpression ('__',                    // do_classes.jsxi:602
											conditionalExpression (binaryExpression ('__', 'instanceof', member.className.name), 
												stringLiteralWithQuotes (member.id.name), 
												stringLiteralWithQuotes (obj.property.name)), 
											true)
									]));
								process (obj);                                     // do_classes.jsxi:608
								
								if (parent.type === Syntax.CallExpression && obj === parent.callee){
									parent.callee = memberExpression (parent.callee, 'call');
									parent.arguments.unshift (identifier ('__'));
								}
								
								temp = true;                                       // do_classes.jsxi:615
							}
							
							if (temp && !currentFunction.hasTempVariable){         // do_classes.jsxi:618
								currentFunction.body.body.unshift (oneVariableDeclaration ('__'));
								currentFunction.hasTempVariable = true;            // do_classes.jsxi:620
							}
							return;
						}
					}
				}
				
				process (obj.object, obj);                                         // do_classes.jsxi:629
				
				if (obj.computed)                                                  // do_classes.jsxi:632
					process (obj.property, obj);                                   // do_classes.jsxi:633
			}
			
			function processSuperExpression (obj, parent){                         // do_classes.jsxi:636
				if (currentFunction !== methodEntry && obj.callee === null)        // do_classes.jsxi:641
					throw new Error ('Not implemented');                           // do_classes.jsxi:642
				
				var currentClass = classEntry;
				
				for (var i = 0; i < obj ['super']; i ++){                          // do_classes.jsxi:648
					currentClass = currentClass.dependsOn.parent;                  // do_classes.jsxi:649
					
					if (!currentClass)                                             // do_classes.jsxi:652
						throw new TypeError ('Super method is not available', obj);
				}
				
				var method = obj.callee ? currentClass.members [obj.callee.name] : methodEntry;
				
				if (!method)                                                       // do_classes.jsxi:659
					throw new TypeError ('Super method not found', obj);           // do_classes.jsxi:660
				
				if (method.static)                                                 // do_classes.jsxi:662
					throw new TypeError ('This method is static', obj);            // do_classes.jsxi:663
				
				var target;
				
				if (method.id.name [0] !== '@'){                                   // do_classes.jsxi:668
					target = memberExpression (memberExpression (currentClass.id, 'prototype'), 
						method.id.name);                                           // do_classes.jsxi:670
				} else {
					target = currentClass.id.name;                                 // do_classes.jsxi:673
				}
				
				if (obj.arguments === null){                                       // do_classes.jsxi:677
					obj.callee = memberExpression (target, 'apply');               // do_classes.jsxi:678
					obj.arguments = [ identifier ('arguments') ];                  // do_classes.jsxi:679
				} else
					obj.callee = memberExpression (target, 'call');                // do_classes.jsxi:681
				
				obj.arguments.unshift (getThis ());                                // do_classes.jsxi:684
			}
			
			function process (obj, parent, preparent){                             // do_classes.jsxi:687
				if (typeof obj === 'object' && obj !== null){                      // do_classes.jsxi:688
					if (obj instanceof Array){                                     // do_classes.jsxi:691
						for (var __l = 0; __l < obj.length; __l ++){               // do_classes.jsxi:693
							var child = obj [__l];
							
							process (child, obj, parent);                          // do_classes.jsxi:694
						}
					} else if ('type' in obj){                                     // do_classes.jsxi:696
						switch (obj.type){                                         // do_classes.jsxi:699
							case Syntax.FunctionDeclaration:                       // do_classes.jsxi:700
								
							case Syntax.FunctionExpression:                        // do_classes.jsxi:701
								processFunction (obj, parent);                     // do_classes.jsxi:702
								
								break;
							case Syntax.Property:                                  // do_classes.jsxi:705
								processProperty (obj, parent);                     // do_classes.jsxi:706
								
								break;
							case Syntax.Identifier:                                // do_classes.jsxi:709
								processIdentifier (obj, parent);                   // do_classes.jsxi:710
								
								break;
							case Syntax.AssignmentExpression:                      // do_classes.jsxi:713
								processAssignmentExpression (obj, parent);         // do_classes.jsxi:714
								
								break;
							case Syntax.MemberExpression:                          // do_classes.jsxi:717
								processMemberExpression (obj, parent, preparent);
								
								break;
							case Syntax.CallExpression:                            // do_classes.jsxi:721
								if ('super' in obj)                                // do_classes.jsxi:722
									processSuperExpression (obj, parent);          // do_classes.jsxi:723
							default:
								for (var key in obj){                              // do_classes.jsxi:727
									var value = obj [key];
									
									process (value, obj);                          // do_classes.jsxi:729
								}
						}
					}
				}
			}
			
			process (methodEntry);                                                 // do_classes.jsxi:736
		}
		
		function processClassMethods (classEntry){                                 // do_classes.jsxi:739
			var replace, childMember;
			
			{
				var __m = classEntry.members;
				
				for (var name in __m){
					var member = __m [name];
					
					if (member.method && !member.abstract && member.className === classEntry.id){
						processClassMethod (classEntry, member);                   // do_classes.jsxi:746
					}
					
					if (member.field && member.static && member.init){             // do_classes.jsxi:749
						processClassMethod (classEntry, member.init);              // do_classes.jsxi:750
					}
					
					if (member.property && !member.abstract && member.className === classEntry.id){
						if (member.get)                                            // do_classes.jsxi:754
							processClassMethod (classEntry, member.get);           // do_classes.jsxi:755
						
						if (member.set)                                            // do_classes.jsxi:756
							processClassMethod (classEntry, member.set);           // do_classes.jsxi:757
					}
				}
				
				__m = undefined;
			}
		}
		
		for (var __n = 0; __n < classes.length; __n ++){                           // do_classes.jsxi:762
			var classEntry = classes [__n];
			
			processClassMethods (classEntry);                                      // do_classes.jsxi:763
		}
	}
	
	function processClasses (){                                                    // do_classes.jsxi:766
		function processClass (classEntry){                                        // do_classes.jsxi:768
			function classMode (){                                                 // do_classes.jsxi:770
				if (classEntry.childs.length === 0 && !classEntry.dependsOn.parent && objectMembers.length === 0 && constructor.body.body.length === 0 && objectProperties.length === 0){
					if (staticFields.length > 0 || staticMethods.length > 0)       // do_classes.jsxi:777
						return OutputMode.Default;                                 // do_classes.jsxi:778
					
					if (initializer.body.body.length > 0)                          // do_classes.jsxi:781
						return OutputMode.InitializerOnly;                         // do_classes.jsxi:782
					return OutputMode.Empty;                                       // do_classes.jsxi:784
				}
				return OutputMode.Default;                                         // do_classes.jsxi:787
			}
			
			console.assert (!classEntry.elements, 'Already processed');            // do_classes.jsxi:791
			
			var constructor = classEntry.members ['@constructor'],                 // do_classes.jsxi:794
				initializer = classEntry.members ['@initializer'];                 // do_classes.jsxi:795
			
			var filtered = filter (classEntry,                                     // do_classes.jsxi:798
					function (arg){                                                // do_classes.jsxi:798
						return arg.className === classEntry.id && arg.id.name [0] !== '@';
					}), 
				objectMembers = filtered.filter (function (arg){                   // do_classes.jsxi:799
					return !arg.static;                                            // do_classes.jsxi:799
				}), 
				staticMembers = filtered.filter (function (arg){                   // do_classes.jsxi:800
					return arg.static;                                             // do_classes.jsxi:800
				});
			
			var objectMethods = objectMembers.filter (function (arg){              // do_classes.jsxi:803
					return arg.method;                                             // do_classes.jsxi:803
				}), 
				objectFields = objectMembers.filter (function (arg){               // do_classes.jsxi:804
					return arg.field;                                              // do_classes.jsxi:804
				}), 
				objectProperties = objectMembers.filter (function (arg){           // do_classes.jsxi:805
					return arg.property;                                           // do_classes.jsxi:805
				}), 
				staticMethods = staticMembers.filter (function (arg){              // do_classes.jsxi:806
					return arg.method;                                             // do_classes.jsxi:806
				}), 
				staticFields = staticMembers.filter (function (arg){               // do_classes.jsxi:807
					return arg.field;                                              // do_classes.jsxi:807
				}), 
				staticProperties = staticMembers.filter (function (arg){           // do_classes.jsxi:808
					return arg.property;                                           // do_classes.jsxi:808
				});
			
			constructor.id = null;                                                 // do_classes.jsxi:811
			initializer.id = null;                                                 // do_classes.jsxi:812
			
			if (!classEntry.params.abstract && filter (classEntry,                 // do_classes.jsxi:815
				function (arg){                                                    // do_classes.jsxi:815
					return arg.abstract;                                           // do_classes.jsxi:815
				}).length > 0)                                                     // do_classes.jsxi:815
				classEntry.params.abstract = true;                                 // do_classes.jsxi:816
			
			if (classEntry.params.abstract)                                        // do_classes.jsxi:819
				constructor.body.body.unshift (ifStatement (binaryExpression (memberExpression (thisExpression (), identifier ('constructor')), 
					'===',                                                         // do_classes.jsxi:822
					classEntry.id.name),                                           // do_classes.jsxi:822
				throwStatement (newExpression ('Error',                            // do_classes.jsxi:823
					[
						stringLiteralWithQuotes ('Trying to instantiate abstract class ' + classEntry.id.name)
					]))));
			
			var mode = classMode ();
			
			if (mode === OutputMode.Empty)                                         // do_classes.jsxi:831
				return [
					oneVariableDeclaration (classEntry.id.name, objectExpression ([]))
				];
			
			if (mode === OutputMode.InitializerOnly)                               // do_classes.jsxi:835
				return [
					oneVariableDeclaration (classEntry.id.name, callExpression (initializer))
				];
			
			var anonymousFunction = staticMembers.filter (function (arg){          // do_classes.jsxi:839
					return arg.publicMode === 'private';                           // do_classes.jsxi:839
				}).length > 0,                                                     // do_classes.jsxi:839
				result,                                                            // do_classes.jsxi:840
				mainObj;                                                           // do_classes.jsxi:841
			
			if (mode === OutputMode.Default){                                      // do_classes.jsxi:843
				result = [                                                         // do_classes.jsxi:845
					anonymousFunction ? oneVariableDeclaration (classEntry.id, constructor) : functionDeclaration (classEntry.id, constructor.params, constructor.body)
				];
				
				if (classEntry.dependsOn.parent)                                   // do_classes.jsxi:850
					result.push (expressionStatement (callExpression ('__prototypeExtend', 
						[ classEntry.id.name, classEntry.dependsOn.parent.id.name ])));
				
				for (var __o = 0; __o < objectFields.length; __o ++){              // do_classes.jsxi:854
					var field = objectFields [__o];
					
					{};
				}
				
				for (var __p = 0; __p < objectMethods.length; __p ++){             // do_classes.jsxi:857
					var method = objectMethods [__p];
					
					if (method.abstract)                                           // do_classes.jsxi:858
						continue;
					
					result.push (assignmentStatement (memberExpression (memberExpression (classEntry.id.name, 'prototype'), 
						method.id),                                                // do_classes.jsxi:860
					functionExpression (null, method.params, method.body)));       // do_classes.jsxi:861
				}
				
				for (var __q = 0; __q < objectProperties.length; __q ++){          // do_classes.jsxi:865
					var prop = objectProperties [__q];
					
					if (prop.abstract)                                             // do_classes.jsxi:866
						continue;
					
					var definedProperties = [];
					
					if (prop.get){                                                 // do_classes.jsxi:870
						definedProperties.push (property (identifier ('get'),      // do_classes.jsxi:871
							functionExpression (null, prop.get.params, prop.get.body)));
					}
					
					if (prop.set){                                                 // do_classes.jsxi:877
						definedProperties.push (property (identifier ('set'),      // do_classes.jsxi:878
							functionExpression (null, prop.set.params, prop.set.body)));
					}
					
					result.push (callExpression (memberExpression (identifier ('Object'), identifier ('defineProperty')), 
						[
							memberExpression (classEntry.id.name, 'prototype'),    // do_classes.jsxi:886
							stringLiteralWithQuotes (prop.id.name),                // do_classes.jsxi:887
							objectExpression (definedProperties)
						]));
				}
				
				for (var __r = 0; __r < staticFields.length; __r ++){              // do_classes.jsxi:893
					var field = staticFields [__r];
					
					if (field.publicMode === 'private')                            // do_classes.jsxi:894
						result [0].declarations.push (field);                      // do_classes.jsxi:895
					else
						result.push (assignmentStatement (memberExpression (classEntry.id.name, field.id), 
							field.init || 'undefined'));                           // do_classes.jsxi:897
				}
				
				for (var __s = 0; __s < staticMethods.length; __s ++){             // do_classes.jsxi:903
					var method = staticMethods [__s];
					
					if (method.publicMode === 'private')                           // do_classes.jsxi:904
						result.push (method);                                      // do_classes.jsxi:905
					else
						result.push (expressionStatement (assignmentExpression (memberExpression (classEntry.id.name, method.id), 
							functionExpression (null, method.params, method.body))));
				}
				
				for (var __t = 0; __t < staticProperties.length; __t ++){          // do_classes.jsxi:913
					var prop = staticProperties [__t];
					
					var definedProperties = [];
					
					if (prop.get){                                                 // do_classes.jsxi:916
						definedProperties.push (property (identifier ('get'),      // do_classes.jsxi:917
							functionExpression (null, prop.get.params, prop.get.body)));
					}
					
					if (prop.set){                                                 // do_classes.jsxi:923
						definedProperties.push (property (identifier ('set'),      // do_classes.jsxi:924
							functionExpression (null, prop.set.params, prop.set.body)));
					}
					
					result.push (callExpression (memberExpression (identifier ('Object'), identifier ('defineProperty')), 
						[
							classEntry.id,                                         // do_classes.jsxi:932
							stringLiteralWithQuotes (prop.id.name),                // do_classes.jsxi:933
							objectExpression (definedProperties)
						]));
				}
			} else {
				var properties = [];
				
				result = [                                                         // do_classes.jsxi:939
					oneVariableDeclaration (classEntry.id, objectExpression (properties))
				];
				
				for (var __u = 0; __u < staticFields.length; __u ++){              // do_classes.jsxi:942
					var field = staticFields [__u];
					
					if (field.publicMode === 'private')                            // do_classes.jsxi:949
						result [0].declarations.push (field);                      // do_classes.jsxi:950
					else
						properties.push (property (field.id, field.init || 'undefined'));
				}
				
				for (var __v = 0; __v < staticMethods.length; __v ++){             // do_classes.jsxi:956
					var method = staticMethods [__v];
					
					if (method.publicMode === 'private')                           // do_classes.jsxi:957
						result.push (method);                                      // do_classes.jsxi:958
					else
						properties.push (property (method.id,                      // do_classes.jsxi:960
							functionExpression (null, method.params, method.body)));
				}
			}
			
			if (initializer.body.body.length > 0)                                  // do_classes.jsxi:965
				result.push (expressionStatement (callExpression (initializer)));
			
			if (anonymousFunction){                                                // do_classes.jsxi:969
				result.push (returnStatement (classEntry.id.name));                // do_classes.jsxi:970
				return [
					oneVariableDeclaration (classEntry.id, callFunctionExpression (result))
				];
			}
			return result;                                                         // do_classes.jsxi:974
		}
		
		for (var __10 = 0; __10 < classes.length; __10 ++){                        // do_classes.jsxi:977
			var classEntry = classes [__10];
			
			classEntry.statements = processClass (classEntry);                     // do_classes.jsxi:978
		}
	}
	
	function sortAndInsertClasses (){                                              // do_classes.jsxi:981
		var sorted = classes.sort (function (a, b){                                // do_classes.jsxi:982
			return b.weight - a.weight;                                            // do_classes.jsxi:982
		});
		
		for (var __11 = 0; __11 < sorted.length; __11 ++){                         // do_classes.jsxi:983
			var current = sorted [__11];
			
			current.root.unshift ({                                                // do_classes.jsxi:984
				type: Syntax.ClassDeclaration,                                     // do_classes.jsxi:984
				name: current.id.name,                                             // do_classes.jsxi:986
				statements: current.statements
			});
		}
	}
	
	{
		var __13 = collectRawClasses (statements);
		
		for (var __12 = 0; __12 < __13.length; __12 ++){
			var found = __13 [__12];
			
			addClass (found);                                                      // do_classes.jsxi:992
		}
		
		__13 = undefined;
	}
	
	if (classes.length > 0){                                                       // do_classes.jsxi:994
		preprocessClasses ();                                                      // do_classes.jsxi:995
		connectClasses ();                                                         // do_classes.jsxi:996
		processClassesMembers ();                                                  // do_classes.jsxi:997
		processClassesMethods ();                                                  // do_classes.jsxi:998
		processClasses ();                                                         // do_classes.jsxi:999
		sortAndInsertClasses ();                                                   // do_classes.jsxi:1000
		callback (helpers.helpers);                                                // do_classes.jsxi:1002
	} else
		callback ();                                                               // do_classes.jsxi:1004
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
			var bindedTable = memberExpression ('obj', '__bindTable'),             // helpers.jsxi:59
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
	var error, result;
	
	try {
		source = String (code).replace (/(\r\n|\r)/g, '\n') + '\n';                // jsx_parse.jsxi:33
		length = source.length;                                                    // jsx_parse.jsxi:34
		index = 0;                                                                 // jsx_parse.jsxi:35
		lineNumber = source.length ? 1 : 0;                                        // jsx_parse.jsxi:36
		buffer = null;                                                             // jsx_parse.jsxi:37
		state = {                                                                  // jsx_parse.jsxi:38
			allowIn: true,                                                         // jsx_parse.jsxi:38
			inClass: false,                                                        // jsx_parse.jsxi:38
			parsingComplete: false,                                                // jsx_parse.jsxi:38
			preventSequence: false,                                                // jsx_parse.jsxi:38
			asynchronous: false
		};
		options = args || {                                                        // jsx_parse.jsxi:39
			filename: '[ not a file ]',                                            // jsx_parse.jsxi:39
			insertReturn: false,                                                   // jsx_parse.jsxi:39
			initializationAllowed: false
		};
		helpers = new HelpersManager ();                                           // jsx_parse.jsxi:40
		result = parseProgram ();                                                  // jsx_parse.jsxi:41
	} catch (e){
		error = e;                                                                 // jsx_parse.jsxi:43
	} finally {
		source = (length = (index = (lineNumber = (buffer = (state = (options = null))))));
		
		if (typeof callback === 'function')                                        // jsx_parse.jsxi:53
			callback (error, result, helpers.helpers);                             // jsx_parse.jsxi:54
		else if (error)                                                            // jsx_parse.jsxi:55
			throw error;                                                           // jsx_parse.jsxi:56
		else
			return result;                                                         // jsx_parse.jsxi:58
	}
}

function warning (what, location){                                                 // jsx_parse.jsxi:62
	return Warnings.warn (what,                                                    // jsx_parse.jsxi:63
		{
			filename: location && location.filename || options && options.filename, 
			lineNumber: location && location.lineNumber || lineNumber
		});
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
		ReturnStatement: 'ReturnStatement',                                        // library.jsxi:54
		SequenceExpression: 'SequenceExpression',                                  // library.jsxi:55
		SwitchStatement: 'SwitchStatement',                                        // library.jsxi:56
		SwitchCase: 'SwitchCase',                                                  // library.jsxi:57
		ThisExpression: 'ThisExpression',                                          // library.jsxi:58
		ThrowStatement: 'ThrowStatement',                                          // library.jsxi:59
		TryStatement: 'TryStatement',                                              // library.jsxi:60
		UnaryExpression: 'UnaryExpression',                                        // library.jsxi:61
		VariableDeclaration: 'VariableDeclaration',                                // library.jsxi:62
		VariableDeclarator: 'VariableDeclarator',                                  // library.jsxi:63
		WhileStatement: 'WhileStatement',                                          // library.jsxi:64
		WithStatement: 'WithStatement',                                            // library.jsxi:65
		Property: 'Property',                                                      // library.jsxi:67
		PropertyGetter: 'PropertyGetter',                                          // library.jsxi:68
		PropertySetter: 'PropertySetter',                                          // library.jsxi:69
		GetterDeclarator: 'GetterDeclarator',                                      // library.jsxi:71
		SetterDeclarator: 'SetterDeclarator',                                      // library.jsxi:72
		BooleanLiteral: 'BooleanLiteral',                                          // library.jsxi:74
		NullLiteral: 'NullLiteral',                                                // library.jsxi:75
		NumericLiteral: 'NumericLiteral',                                          // library.jsxi:76
		RegexpLiteral: 'RegexpLiteral',                                            // library.jsxi:77
		StringLiteral: 'StringLiteral',                                            // library.jsxi:78
		UndefinedLiteral: 'UndefinedLiteral',                                      // library.jsxi:79
		NotImplementedStatement: 'NotImplementedStatement',                        // library.jsxi:81
		ClassDeclaration: 'ClassDeclaration',                                      // library.jsxi:82
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
	return stringLiteral ('\'' + value.replace (/'/g, '\\\'').replace (/(^|[^\\])(\\\\)+(?=')/g, 
		function (all, begin, found){                                              // objects.jsxi:56
			return begin + found.slice (0, - 1);                                   // objects.jsxi:56
		}) + '\'');                                                                // objects.jsxi:56
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

function getterDeclarator (id, value){                                             // objects.jsxi:376
	return {
		type: Syntax.GetterDeclarator,                                             // objects.jsxi:378
		id: identifier (id),                                                       // objects.jsxi:379
		body: identifier (value)
	};
}

function setterDeclarator (id, value){                                             // objects.jsxi:384
	return {
		type: Syntax.SetterDeclarator,                                             // objects.jsxi:386
		id: identifier (id),                                                       // objects.jsxi:387
		body: identifier (value)
	};
}

function callFunctionExpression (body){                                            // objects.jsxi:392
	return callExpression (functionExpression (null,                               // objects.jsxi:393
		[], 
		body instanceof Array ? blockStatement (body) : body),                     // objects.jsxi:393
	[]);
}

function oneVariableDeclaration (id, init){                                        // objects.jsxi:396
	return variableDeclaration ([ variableDeclarator (id, init) ]);                // objects.jsxi:397
}

function assignmentStatement (left, right){                                        // objects.jsxi:400
	return expressionStatement (assignmentExpression (left, right));               // objects.jsxi:401
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
		if (obj.type === Syntax.GetterDeclarator){                                 // parse_class.jsxi:98
			obj.id.originalName = obj.id.name;                                     // parse_class.jsxi:99
			obj.id.name += '__get_';                                               // parse_class.jsxi:100
		} else if (obj.type === Syntax.SetterDeclarator){                          // parse_class.jsxi:101
			obj.id.originalName = obj.id.name;                                     // parse_class.jsxi:102
			obj.id.name += '__set_';                                               // parse_class.jsxi:103
		}
		
		if (result.hasOwnProperty (obj.id.name))                                   // parse_class.jsxi:106
			throw new SyntaxError ('Member "' + obj.id.name + '" already declared', token);
		
		obj.publicMode = current.publicMode || params.publicMode;                  // parse_class.jsxi:109
		obj.static = current.static;                                               // parse_class.jsxi:110
		obj.abstract = current.abstract;                                           // parse_class.jsxi:111
		result [obj.id.name] = obj;                                                // parse_class.jsxi:113
	}
	
	function parseField (){                                                        // parse_class.jsxi:116
		if (params.interface && !current.static)                                   // parse_class.jsxi:117
			throw new TypeError ('Interface cannot have object fields');           // parse_class.jsxi:118
		
		if (current.abstract && (current.publicMode || params.publicMode) === 'private')
			throw new TypeError ('Abstract member cannot be private');             // parse_class.jsxi:121
		
		{
			var __15 = parseVariableDeclarators ();
			
			for (var __14 = 0; __14 < __15.length; __14 ++){
				var entry = __15 [__14];
				
				set (entry);                                                       // parse_class.jsxi:124
			}
			
			__15 = undefined;
		}
		
		refresh ();                                                                // parse_class.jsxi:126
	}
	
	function parseGetterDeclarators (semicolon){                                   // parse_class.jsxi:129
		var result = [];
		
		do {
			result.push (getterDeclarator (parseIdentifier (), parsePropertyGetter ()));
		} while (index < length && matchLex (','));                                // parse_class.jsxi:134
		
		if (semicolon !== false){                                                  // parse_class.jsxi:136
			consumeSemicolon ();                                                   // parse_class.jsxi:137
		}
		return result;                                                             // parse_class.jsxi:140
	}
	
	function parseGetter (){                                                       // parse_class.jsxi:143
		if (params.interface && !current.static)                                   // parse_class.jsxi:144
			throw new TypeError ('Interface cannot have object getters');          // parse_class.jsxi:145
		
		{
			var __17 = parseGetterDeclarators ();
			
			for (var __16 = 0; __16 < __17.length; __16 ++){
				var entry = __17 [__16];
				
				set (entry);                                                       // parse_class.jsxi:148
			}
			
			__17 = undefined;
		}
		
		refresh ();                                                                // parse_class.jsxi:150
	}
	
	function parseSetterDeclarators (semicolon){                                   // parse_class.jsxi:153
		var result = [];
		
		do {
			result.push (setterDeclarator (parseIdentifier (), parsePropertySetter ()));
		} while (index < length && matchLex (','));                                // parse_class.jsxi:158
		
		if (semicolon !== false){                                                  // parse_class.jsxi:160
			consumeSemicolon ();                                                   // parse_class.jsxi:161
		}
		return result;                                                             // parse_class.jsxi:164
	}
	
	function parseSetter (){                                                       // parse_class.jsxi:167
		if (params.interface && !current.static)                                   // parse_class.jsxi:168
			throw new TypeError ('Interface cannot have object getters');          // parse_class.jsxi:169
		
		{
			var __19 = parseSetterDeclarators ();
			
			for (var __18 = 0; __18 < __19.length; __18 ++){
				var entry = __19 [__18];
				
				set (entry);                                                       // parse_class.jsxi:172
			}
			
			__19 = undefined;
		}
		
		refresh ();                                                                // parse_class.jsxi:174
	}
	
	function parseMethod (){                                                       // parse_class.jsxi:177
		if (current.abstract && (current.publicMode || params.publicMode) === 'private')
			throw new TypeError ('Abstract member cannot be private');             // parse_class.jsxi:179
		
		state.superAvailable = !current.static && dependsOn.parent;                // parse_class.jsxi:181
		set (parseFunction ({                                                      // parse_class.jsxi:182
			keyword: null,                                                         // parse_class.jsxi:182
			empty: params.interface && !current.static || current.abstract
		}));
		state.superAvailable = false;                                              // parse_class.jsxi:183
		refresh ();                                                                // parse_class.jsxi:185
	}
	
	function parseInitializerOrConstructor (){                                     // parse_class.jsxi:188
		if (current.publicMode)                                                    // parse_class.jsxi:189
			throw new TypeError ('Constructor or initializer cannot have overrided visibility');
		
		if (current.abstract)                                                      // parse_class.jsxi:192
			throw new TypeError ('Constructor or initializer cannot be abstract');
		
		state.superAvailable = !current.static && dependsOn.parent;                // parse_class.jsxi:195
		state.noReturn = true;                                                     // parse_class.jsxi:196
		
		var result = parseFunction ({ keyword: null, id: false, optionalParams: true });
		
		result.id = identifier (current.static ? '@initializer' : '@constructor');
		state.superAvailable = false;                                              // parse_class.jsxi:201
		state.noReturn = false;                                                    // parse_class.jsxi:202
		set (result);                                                              // parse_class.jsxi:204
		refresh ();                                                                // parse_class.jsxi:205
	}
	
	state.inClass = true;                                                          // parse_class.jsxi:208
	expect ('{');                                                                  // parse_class.jsxi:209
	refresh ();                                                                    // parse_class.jsxi:210
	
	while (!matchLex ('}')){                                                       // parse_class.jsxi:212
		token = lookahead ();                                                      // parse_class.jsxi:213
		
		switch (token.value){                                                      // parse_class.jsxi:215
			case 'private':                                                        // parse_class.jsxi:216
				
			case 'public':                                                         // parse_class.jsxi:217
				
			case 'protected':                                                      // parse_class.jsxi:218
				if (current.publicMode !== null)                                   // parse_class.jsxi:219
					unexpected (token);                                            // parse_class.jsxi:220
				
				lex ();                                                            // parse_class.jsxi:221
				current.publicMode = token.value;                                  // parse_class.jsxi:222
				
				break;
			case 'abstract':                                                       // parse_class.jsxi:225
				if (params.interface)                                              // parse_class.jsxi:226
					unexpected (token);                                            // parse_class.jsxi:227
			case 'static':                                                         // parse_class.jsxi:229
				if (current.abstract || current.static)                            // parse_class.jsxi:230
					unexpected (token);                                            // parse_class.jsxi:231
				
				lex ();                                                            // parse_class.jsxi:232
				current [token.value] = true;                                      // parse_class.jsxi:233
				
				break;
			case 'var':                                                            // parse_class.jsxi:236
				lex ();                                                            // parse_class.jsxi:237
				parseField ();                                                     // parse_class.jsxi:238
				
				break;
			case 'get':                                                            // parse_class.jsxi:241
				lex ();                                                            // parse_class.jsxi:242
				parseGetter ();                                                    // parse_class.jsxi:243
				
				break;
			case 'set':                                                            // parse_class.jsxi:246
				lex ();                                                            // parse_class.jsxi:247
				parseSetter ();                                                    // parse_class.jsxi:248
				
				break;
			case 'function':                                                       // parse_class.jsxi:251
				lex ();                                                            // parse_class.jsxi:252
				parseMethod ();                                                    // parse_class.jsxi:253
				
				break;
			case '(':                                                              // parse_class.jsxi:256
				
			case '{':                                                              // parse_class.jsxi:257
				parseInitializerOrConstructor ();                                  // parse_class.jsxi:258
				
				break;
			default:
				if (token.type === Token.Identifier){                              // parse_class.jsxi:262
					var saved = saveAll (), method;
					
					lex ();                                                        // parse_class.jsxi:266
					method = match ('(');                                          // parse_class.jsxi:267
					restoreAll (saved);                                            // parse_class.jsxi:268
					
					if (method)                                                    // parse_class.jsxi:270
						parseMethod ();                                            // parse_class.jsxi:271
					else
						parseField ();                                             // parse_class.jsxi:273
				} else
					unexpected (token);                                            // parse_class.jsxi:275
		}
	}
	
	state.inClass = oldInClass;                                                    // parse_class.jsxi:279
	return result;                                                                 // parse_class.jsxi:280
}

function parseClassDeclaration (){                                                 // parse_class.jsxi:283
	var params = parseClassParams (),                                              // parse_class.jsxi:284
		id = parseIdentifier (),                                                   // parse_class.jsxi:285
		dependsOn = parseExtendsImplementsAndUses (params),                        // parse_class.jsxi:286
		members = parseClassMembers (params, dependsOn);                           // parse_class.jsxi:287
	return {
		type: Syntax.RawClassDeclaration,                                          // parse_class.jsxi:290
		id: id,                                                                    // parse_class.jsxi:291
		params: params,                                                            // parse_class.jsxi:292
		dependsOn: dependsOn,                                                      // parse_class.jsxi:293
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

;

function parseObjectPropertyKey (){                                                // parse_expressions.jsxi:73
	var token = lex ();
	return mark (token.type === Token.StringLiteral ? { type: Syntax.StringLiteral, value: token.value } : { type: Syntax.Identifier, name: token.value }, 
		token);                                                                    // parse_expressions.jsxi:76
}

function parsePropertyGetter (){                                                   // parse_expressions.jsxi:79
	return parseFunction ({                                                        // parse_expressions.jsxi:80
		id: false,                                                                 // parse_expressions.jsxi:80
		keyword: null,                                                             // parse_expressions.jsxi:80
		optionalParams: false,                                                     // parse_expressions.jsxi:80
		noSemicolon: true
	});
}

function parsePropertySetter (){                                                   // parse_expressions.jsxi:83
	return parseFunction ({                                                        // parse_expressions.jsxi:84
		id: false,                                                                 // parse_expressions.jsxi:84
		keyword: null,                                                             // parse_expressions.jsxi:84
		optionalParams: [ identifier ('arg') ],                                    // parse_expressions.jsxi:84
		noSemicolon: true
	});
}

function parseObjectProperty (){                                                   // parse_expressions.jsxi:87
	var token = lookahead (), key;
	
	if (token.type === Token.EOF || token.type === Token.Punctuator){              // parse_expressions.jsxi:90
		unexpected (token);                                                        // parse_expressions.jsxi:91
	} else {
		key = parseObjectPropertyKey ();                                           // parse_expressions.jsxi:93
		
		var token = lex ();
		
		if (token.value == ':'){                                                   // parse_expressions.jsxi:96
			return {
				type: Syntax.Property,                                             // parse_expressions.jsxi:98
				key: key,                                                          // parse_expressions.jsxi:99
				value: parseAssignmentExpression ()
			};
		} else if (key.name === 'get'){                                            // parse_expressions.jsxi:102
			return {
				type: Syntax.PropertyGetter,                                       // parse_expressions.jsxi:104
				key: { type: Syntax.Identifier, name: token.value },               // parse_expressions.jsxi:105
				value: parsePropertyGetter ()
			};
		} else if (key.name === 'set'){                                            // parse_expressions.jsxi:108
			return {
				type: Syntax.PropertySetter,                                       // parse_expressions.jsxi:110
				key: { type: Syntax.Identifier, name: token.value },               // parse_expressions.jsxi:111
				value: parsePropertySetter ()
			};
		} else {
			unexpected (token);                                                    // parse_expressions.jsxi:115
		}
	}
}

function parseObjectContent (){                                                    // parse_expressions.jsxi:120
	var properties = [], property, name, kind, map = {}, comma = {};
	
	while (!match ('}')){                                                          // parse_expressions.jsxi:123
		if (properties.length){                                                    // parse_expressions.jsxi:124
			parseOptionalComma (comma);                                            // parse_expressions.jsxi:125
			
			if (match ('}'))                                                       // parse_expressions.jsxi:127
				break;
		}
		
		properties.push (parseObjectProperty ());                                  // parse_expressions.jsxi:131
	}
	return properties;                                                             // parse_expressions.jsxi:134
}

function parseObjectInitialiser (){                                                // parse_expressions.jsxi:137
	expect ('{');                                                                  // parse_expressions.jsxi:138
	
	var result = parseObjectContent ();
	
	expect ('}');                                                                  // parse_expressions.jsxi:140
	return objectExpression (result);                                              // parse_expressions.jsxi:141
}

function parseNonComputedProperty (){                                              // parse_expressions.jsxi:144
	var token = lex ();
	
	if (token.type !== Token.Identifier && token.type !== Token.Keyword && token.type !== Token.BooleanLiteral && token.type !== Token.NullLiteral)
		unexpected (token);                                                        // parse_expressions.jsxi:147
	return mark ({ type: Syntax.Identifier, name: token.value }, token);           // parse_expressions.jsxi:148
}

function parseNonComputedMember (){                                                // parse_expressions.jsxi:151
	expect ('.');                                                                  // parse_expressions.jsxi:152
	return parseNonComputedProperty ();                                            // parse_expressions.jsxi:153
}

function parseComputedMember (){                                                   // parse_expressions.jsxi:156
	expect ('[');                                                                  // parse_expressions.jsxi:157
	
	var temp = parseExpression ();
	
	expect (']');                                                                  // parse_expressions.jsxi:159
	return temp;                                                                   // parse_expressions.jsxi:160
}

function parseNewExpression (){                                                    // parse_expressions.jsxi:163
	expectKeyword ('new');                                                         // parse_expressions.jsxi:164
	
	var result = newExpression (parseLeftHandSideExpression (),                    // parse_expressions.jsxi:165
		match ('(') ? parseArguments () : []);                                     // parse_expressions.jsxi:165
	return result;                                                                 // parse_expressions.jsxi:171
}

function parseSuperExpression (){                                                  // parse_expressions.jsxi:174
	var level = 1, name = null;
	
	expectKeyword ('super');                                                       // parse_expressions.jsxi:177
	
	if (!state.superAvailable)                                                     // parse_expressions.jsxi:179
		throw new TypeError ('Super can be used in class functions only');         // parse_expressions.jsxi:180
	
	while (matchLex ('.')){                                                        // parse_expressions.jsxi:182
		if (matchKeywordLex ('super')){                                            // parse_expressions.jsxi:183
			level ++;                                                              // parse_expressions.jsxi:184
		} else {
			name = parseIdentifier ();                                             // parse_expressions.jsxi:186
			
			break;
		}
	}
	return superExpression (name, match ('(') ? parseArguments () : null, level);
}

function parseLeftHandSideExpressionTemp (){                                       // parse_expressions.jsxi:194
	return matchKeyword ('new') ? parseNewExpression () : matchKeyword ('super') ? parseSuperExpression () : parsePrimaryExpression ();
}

function parseLeftHandSideExpressionAllowCall (){                                  // parse_expressions.jsxi:197
	var expression = parseLeftHandSideExpressionTemp (), token;
	
	while (index < length){                                                        // parse_expressions.jsxi:200
		token = lookahead ();                                                      // parse_expressions.jsxi:201
		
		if (token.value === '('){                                                  // parse_expressions.jsxi:203
			expression = callExpression (expression, parseArguments ());           // parse_expressions.jsxi:204
		} else if (token.value === '['){                                           // parse_expressions.jsxi:205
			expression = memberExpression (expression, parseComputedMember (), true);
		} else if (token.value === '.' && source [token.range [0] + 1] !== '.'){   // parse_expressions.jsxi:207
			expression = memberExpression (expression, parseNonComputedMember (), false);
		} else
			break;
	}
	return expression;                                                             // parse_expressions.jsxi:213
}

function parseLeftHandSideExpression (){                                           // parse_expressions.jsxi:216
	var expression = parseLeftHandSideExpressionTemp ();
	
	while (match ('.') || match ('['))                                             // parse_expressions.jsxi:219
		if (match ('['))                                                           // parse_expressions.jsxi:220
			expression = memberExpression (expression, parseComputedMember (), true);
		else
			expression = memberExpression (expression, parseNonComputedMember (), false);
	return expression;                                                             // parse_expressions.jsxi:225
}

function parseMultiplicativeExpression (){                                         // parse_expressions.jsxi:228
	var expression = parseUnaryExpression ();
	
	while (match ('*') || match ('/') || match ('%'))                              // parse_expressions.jsxi:231
		expression = binaryExpression (expression, lex ().value, parseUnaryExpression ());
	return expression;                                                             // parse_expressions.jsxi:234
}

function parseAdditiveExpression (){                                               // parse_expressions.jsxi:237
	var expression = parseMultiplicativeExpression ();
	
	while (match ('+') || match ('-'))                                             // parse_expressions.jsxi:240
		expression = binaryExpression (expression, lex ().value, parseMultiplicativeExpression ());
	return expression;                                                             // parse_expressions.jsxi:243
}

function parseShiftExpression (){                                                  // parse_expressions.jsxi:246
	var expression = parseAdditiveExpression ();
	
	while (match ('<<') || match ('>>') || match ('>>>'))                          // parse_expressions.jsxi:249
		expression = binaryExpression (expression, lex ().value, parseAdditiveExpression ());
	return expression;                                                             // parse_expressions.jsxi:252
}

function parseRelationalExpression (){                                             // parse_expressions.jsxi:255
	var inverse, expression, previousAllowIn;
	
	previousAllowIn = state.allowIn;                                               // parse_expressions.jsxi:258
	state.allowIn = true;                                                          // parse_expressions.jsxi:259
	expression = parseShiftExpression ();                                          // parse_expressions.jsxi:260
	
	while (index < length){                                                        // parse_expressions.jsxi:262
		if (match ('!') && source [lookahead ().range [0] + 1] === 'i'){           // parse_expressions.jsxi:263
			inverse = saveAll ();                                                  // parse_expressions.jsxi:264
			lex ();                                                                // parse_expressions.jsxi:265
		}
		
		if (match ('<') || match ('>') || match ('<=') || match ('>=') || previousAllowIn && matchKeyword ('in') || matchKeyword ('instanceof')){
			expression = binaryExpression (expression, lex ().value, parseShiftExpression ());
		} else if (previousAllowIn && (matchKeyword ('in-object') || matchKeyword ('in-array'))){
			lex ();                                                                // parse_expressions.jsxi:271
			expression = callExpression (memberExpression (parseShiftExpression (), 'hasOwnProperty'), 
				[ expression ]);
		} else {
			if (inverse)                                                           // parse_expressions.jsxi:274
				restoreAll (inverse);                                              // parse_expressions.jsxi:275
			
			break;
		}
		
		if (inverse){                                                              // parse_expressions.jsxi:279
			expression = unaryExpression (expression, '!', true);                  // parse_expressions.jsxi:280
			inverse = false;                                                       // parse_expressions.jsxi:281
		}
	}
	
	state.allowIn = previousAllowIn;                                               // parse_expressions.jsxi:285
	return expression;                                                             // parse_expressions.jsxi:286
}

function parseEqualityExpression (){                                               // parse_expressions.jsxi:289
	var expression = parseRelationalExpression ();
	
	while (match ('==') || match ('!=') || match ('===') || match ('!=='))         // parse_expressions.jsxi:292
		expression = binaryExpression (expression, lex ().value, parseRelationalExpression ());
	return expression;                                                             // parse_expressions.jsxi:295
}

function parseBitwiseANDExpression (){                                             // parse_expressions.jsxi:298
	var expression = parseEqualityExpression ();
	
	while (match ('&')){                                                           // parse_expressions.jsxi:301
		lex ();                                                                    // parse_expressions.jsxi:302
		expression = binaryExpression (expression, '&', parseEqualityExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:306
}

function parseBitwiseXORExpression (){                                             // parse_expressions.jsxi:309
	var expression = parseBitwiseANDExpression ();
	
	while (match ('^')){                                                           // parse_expressions.jsxi:312
		lex ();                                                                    // parse_expressions.jsxi:313
		expression = binaryExpression (expression, '^', parseBitwiseANDExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:317
}

function parseBitwiseORExpression (){                                              // parse_expressions.jsxi:320
	var expression = parseBitwiseXORExpression ();
	
	while (match ('|')){                                                           // parse_expressions.jsxi:323
		lex ();                                                                    // parse_expressions.jsxi:324
		expression = binaryExpression (expression, '|', parseBitwiseXORExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:328
}

function parseLogicalANDExpression (){                                             // parse_expressions.jsxi:331
	var expression = parseBitwiseORExpression ();
	
	while (match ('&&')){                                                          // parse_expressions.jsxi:334
		lex ();                                                                    // parse_expressions.jsxi:335
		expression = logicalExpression (expression, '&&', parseBitwiseORExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:339
}

function parseLogicalORExpression (){                                              // parse_expressions.jsxi:342
	var expression = parseLogicalANDExpression ();
	
	while (match ('||')){                                                          // parse_expressions.jsxi:345
		lex ();                                                                    // parse_expressions.jsxi:346
		expression = logicalExpression (expression, '||', parseLogicalANDExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:350
}

function parseConditionalExpression (){                                            // parse_expressions.jsxi:353
	var expression, previousAllowIn, consequent;
	
	expression = parseLogicalORExpression ();                                      // parse_expressions.jsxi:356
	
	if (match ('?')){                                                              // parse_expressions.jsxi:358
		lex ();                                                                    // parse_expressions.jsxi:359
		previousAllowIn = state.allowIn;                                           // parse_expressions.jsxi:360
		state.allowIn = true;                                                      // parse_expressions.jsxi:361
		consequent = parseAssignmentExpression ();                                 // parse_expressions.jsxi:362
		state.allowIn = previousAllowIn;                                           // parse_expressions.jsxi:363
		expect (':');                                                              // parse_expressions.jsxi:364
		expression = conditionalExpression (expression, consequent, parseAssignmentExpression ());
	}
	return expression;                                                             // parse_expressions.jsxi:369
}

function parseAssignmentExpression (){                                             // parse_expressions.jsxi:372
	var expression = parseConditionalExpression (),                                // parse_expressions.jsxi:373
		token = lookahead ();                                                      // parse_expressions.jsxi:374
	
	if (token.type === Token.Punctuator){                                          // parse_expressions.jsxi:376
		var value = token.value;
		
		if (value === '=' || value === '*=' || value === '/=' || value === '%=' || value === '+=' || value === '-=' || value === '<<=' || value === '>>=' || value === '>>>=' || value === '&=' || value === '^=' || value === '|='){
			leftSideOnly (expression);                                             // parse_expressions.jsxi:381
			expression = assignmentExpression (expression, lex ().value, parseAssignmentExpression ());
		}
	}
	return expression;                                                             // parse_expressions.jsxi:386
}

function parseExpression (){                                                       // parse_expressions.jsxi:389
	var expression = parseAssignmentExpression ();
	
	if (!state.preventSequence && match (',')){                                    // parse_expressions.jsxi:392
		expression = sequenceExpression ([ expression ]);                          // parse_expressions.jsxi:393
		
		while (matchLex (','))                                                     // parse_expressions.jsxi:395
			expression.expressions.push (parseAssignmentExpression ());            // parse_expressions.jsxi:396
	}
	return expression;                                                             // parse_expressions.jsxi:399
}

function parseUnaryExpression (){                                                  // parse_expressions.jsxi:402
	var token = lookahead ();
	
	if (token.type === Token.Punctuator){                                          // parse_expressions.jsxi:405
		if (token.value === '++' || token.value === '--'){                         // parse_expressions.jsxi:406
			lex ();                                                                // parse_expressions.jsxi:407
			return unaryExpression (leftSideOnly (parseUnaryExpression ()), token.value, true);
		}
		
		if (token.value === '+' || token.value === '-' || token.value === '~' || token.value === '!'){
			lex ();                                                                // parse_expressions.jsxi:412
			return unaryExpression (parseUnaryExpression (), token.value, true);   // parse_expressions.jsxi:413
		}
	} else if (token.type === Token.Keyword && (token.value === 'typeof' || token.value === 'delete' || token.value === 'void')){
		lex ();                                                                    // parse_expressions.jsxi:417
		return unaryExpression (parseUnaryExpression (), token.value, true);       // parse_expressions.jsxi:418
	}
	return parsePostfixExpression ();                                              // parse_expressions.jsxi:421
}

function parsePostfixExpression (){                                                // parse_expressions.jsxi:424
	var expression = parseLeftHandSideExpressionAllowCall (), token;
	
	token = lookahead ();                                                          // parse_expressions.jsxi:427
	
	if (token.type !== Token.Punctuator)                                           // parse_expressions.jsxi:429
		return expression;                                                         // parse_expressions.jsxi:430
	
	if ((token.value === '++' || token.value === '--') && token.lineNumber === lineNumber){
		leftSideOnly (expression);                                                 // parse_expressions.jsxi:433
		expression = unaryExpression (expression, lex ().value, false);            // parse_expressions.jsxi:434
	}
	return expression;                                                             // parse_expressions.jsxi:437
}

function parseGroupExpression (){                                                  // parse_expressions.jsxi:440
	var oldPreventSequence = state.preventSequence;
	
	state.preventSequence = false;                                                 // parse_expressions.jsxi:442
	expect ('(');                                                                  // parse_expressions.jsxi:444
	
	var result = parseExpression ();
	
	expect (')');                                                                  // parse_expressions.jsxi:446
	state.preventSequence = oldPreventSequence;                                    // parse_expressions.jsxi:448
	return result;                                                                 // parse_expressions.jsxi:449
}

function parseComplexString (token){                                               // parse_expressions.jsxi:456
	function split (string, max){                                                  // parse_expressions.jsxi:465
		var length = string.length,                                                // parse_expressions.jsxi:467
			index = 0,                                                             // parse_expressions.jsxi:468
			previous = 0,                                                          // parse_expressions.jsxi:469
			character,                                                             // parse_expressions.jsxi:470
			temp,                                                                  // parse_expressions.jsxi:471
			result = [];                                                           // parse_expressions.jsxi:472
		
		while (index < length)                                                     // parse_expressions.jsxi:474
			switch (string [index]){                                               // parse_expressions.jsxi:475
				case '\\':                                                         // parse_expressions.jsxi:476
					if (string [index + 1] === '%'){                               // parse_expressions.jsxi:477
						if (previous < index)                                      // parse_expressions.jsxi:478
							result.push (string.substring (previous, index));      // parse_expressions.jsxi:479
						
						previous = index + 1;                                      // parse_expressions.jsxi:480
					}
					
					index += 2;                                                    // parse_expressions.jsxi:483
					
					break;
				case '%':                                                          // parse_expressions.jsxi:486
					if (index + 1 === length){                                     // parse_expressions.jsxi:488
						index ++;                                                  // parse_expressions.jsxi:489
						
						break;
					}
					
					if (string [index + 1] === '0' && index + 2 < length && decimalDigit (string [index + 2])){
						index += 2;                                                // parse_expressions.jsxi:495
						
						break;
					}
					
					if (previous < index){                                         // parse_expressions.jsxi:500
						result.push (string.substring (previous, index));          // parse_expressions.jsxi:501
						previous = index;                                          // parse_expressions.jsxi:502
					}
					
					index += 2;                                                    // parse_expressions.jsxi:505
					
					while (index < length && decimalDigit (string [index]))        // parse_expressions.jsxi:507
						index ++;                                                  // parse_expressions.jsxi:508
					
					temp = + string.substring (previous + 1, index);               // parse_expressions.jsxi:510
					
					if (temp < max)                                                // parse_expressions.jsxi:512
						result.push (temp);                                        // parse_expressions.jsxi:513
					
					previous = index;                                              // parse_expressions.jsxi:515
					
					break;
				default:
					index ++;                                                      // parse_expressions.jsxi:519
			}
		
		if (previous < length)                                                     // parse_expressions.jsxi:522
			result.push (string.substring (previous, length));                     // parse_expressions.jsxi:523
		return result;                                                             // parse_expressions.jsxi:525
	}
	
	var string = stringLiteralValue (token),                                       // parse_expressions.jsxi:528
		args = parseArguments (),                                                  // parse_expressions.jsxi:529
		splitted,                                                                  // parse_expressions.jsxi:530
		result;                                                                    // parse_expressions.jsxi:531
	
	if (string.length <= 1)                                                        // parse_expressions.jsxi:534
		return stringLiteral (token.value);                                        // parse_expressions.jsxi:535
	
	splitted = split (string, args.length).map (function (arg){                    // parse_expressions.jsxi:537
		if (typeof arg === 'number'){                                              // parse_expressions.jsxi:540
			var temp = args [arg];
			
			if (temp.type === Syntax.StringLiteral)                                // parse_expressions.jsxi:543
				return stringLiteral (temp.value);                                 // parse_expressions.jsxi:544
			
			if (temp.type === Syntax.BooleanLiteral || temp.type === Syntax.NullLiteral || temp.type === Syntax.NumericLiteral || temp.type === Syntax.RegexpLiteral || temp.type === Syntax.UndefinedLiteral)
				return stringLiteralWithQuotes (temp.value);                       // parse_expressions.jsxi:549
			return temp;                                                           // parse_expressions.jsxi:551
		} else
			return stringLiteralWithQuotes (arg);                                  // parse_expressions.jsxi:553
	}).filter (function (arg, index, array){                                       // parse_expressions.jsxi:555
		if (arg.type !== Syntax.StringLiteral)                                     // parse_expressions.jsxi:557
			return true;
		
		for (var i = index - 1, previous; i >= 0 && array [i].type === Syntax.StringLiteral; i --)
			previous = array [i];                                                  // parse_expressions.jsxi:562
		
		if (previous){                                                             // parse_expressions.jsxi:564
			previous.value = stringLiteralWithQuotes (stringLiteralValue (previous) + stringLiteralValue (arg)).value;
			return false;
		} else
			return true;
	}).filter (function (arg, index, array){                                       // parse_expressions.jsxi:571
		return arg.type !== Syntax.StringLiteral || index === 0 || !stringLiteralEmpty (arg);
	});
	
	if (splitted [0].type !== Syntax.StringLiteral && (splitted.length === 1 || splitted [1].type !== Syntax.StringLiteral))
		splitted.unshift (stringLiteral ('\'\''));                                 // parse_expressions.jsxi:576
	
	result = splitted [0];                                                         // parse_expressions.jsxi:578
	
	for (var i = 1; i < splitted.length; i ++)                                     // parse_expressions.jsxi:580
		result = binaryExpression (result, '+', splitted [i]);                     // parse_expressions.jsxi:581
	return result;                                                                 // parse_expressions.jsxi:583
}

function parsePrimaryExpression (){                                                // parse_expressions.jsxi:586
	var token = lookahead ();
	
	switch (token.type){                                                           // parse_expressions.jsxi:589
		case Token.Identifier:                                                     // parse_expressions.jsxi:590
			lex ();                                                                // parse_expressions.jsxi:591
			
			if (state.asynchronous && token.value === 'asynchronous'){             // parse_expressions.jsxi:592
				var next = parseExpression ();
				
				if (next.type === Syntax.CallExpression){                          // parse_expressions.jsxi:595
					next.asynchronous = true;                                      // parse_expressions.jsxi:596
					return next;                                                   // parse_expressions.jsxi:597
				} else
					unexpected (token);                                            // parse_expressions.jsxi:599
			} else
				return mark ({ type: Syntax.Identifier, name: token.value }, token);
		case Token.Keyword:                                                        // parse_expressions.jsxi:603
			if (token.value === 'this'){                                           // parse_expressions.jsxi:604
				lex ();                                                            // parse_expressions.jsxi:605
				return mark ({ type: Syntax.ThisExpression }, token);              // parse_expressions.jsxi:606
			}
			
			if (token.value === 'function')                                        // parse_expressions.jsxi:609
				return parseFunctionExpression ();                                 // parse_expressions.jsxi:610
			
			if (token.value === 'lambda')                                          // parse_expressions.jsxi:612
				return parseLambdaExpression ();                                   // parse_expressions.jsxi:613
			
			break;
		case Token.StringLiteral:                                                  // parse_expressions.jsxi:617
			lex ();                                                                // parse_expressions.jsxi:618
			
			if (lookahead ().value === '(')                                        // parse_expressions.jsxi:619
				return parseComplexString (token);                                 // parse_expressions.jsxi:620
			else
				return mark ({ type: Syntax.StringLiteral, value: token.value }, token);
		case Token.NumericLiteral:                                                 // parse_expressions.jsxi:624
			lex ();                                                                // parse_expressions.jsxi:625
			return numericLiteral (token.value);                                   // parse_expressions.jsxi:626
		case Token.BooleanLiteral:                                                 // parse_expressions.jsxi:628
			lex ();                                                                // parse_expressions.jsxi:629
			return booleanLiteral (token.value);                                   // parse_expressions.jsxi:630
		case Token.NullLiteral:                                                    // parse_expressions.jsxi:632
			lex ();                                                                // parse_expressions.jsxi:633
			return nullLiteral ();                                                 // parse_expressions.jsxi:634
		case Token.UndefinedLiteral:                                               // parse_expressions.jsxi:636
			lex ();                                                                // parse_expressions.jsxi:637
			return undefinedLiteral ();                                            // parse_expressions.jsxi:638
		case Token.Punctuator:                                                     // parse_expressions.jsxi:640
			switch (token.value){                                                  // parse_expressions.jsxi:641
				case '[':                                                          // parse_expressions.jsxi:642
					return parseArrayInitialiser ();                               // parse_expressions.jsxi:643
				case '{':                                                          // parse_expressions.jsxi:645
					return parseObjectInitialiser ();                              // parse_expressions.jsxi:646
				case '(':                                                          // parse_expressions.jsxi:648
					return parseGroupExpression ();                                // parse_expressions.jsxi:649
				case '/':                                                          // parse_expressions.jsxi:651
					lex ();                                                        // parse_expressions.jsxi:652
					return readRegexp ();                                          // parse_expressions.jsxi:653
			}
		default:
			unexpected (token);                                                    // parse_expressions.jsxi:657
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
	
	if (options.optionalParams == null){                                           // parse_function.jsxi:21
		params = parseFunctionArguments ();                                        // parse_function.jsxi:22
		
		if (lookahead ().value === 'asynchronous'){                                // parse_function.jsxi:24
			lex ();                                                                // parse_function.jsxi:25
			asynchronous = true;                                                   // parse_function.jsxi:26
		}
	} else if (options.optionalParams){                                            // parse_function.jsxi:28
		params = parseOptionalFunctionArguments () || (options.optionalParams === true ? [] : options.optionalParams);
	} else {
		parseEmptyFunctionArguments ();                                            // parse_function.jsxi:31
		params = [];                                                               // parse_function.jsxi:32
	}
	
	if (!options.empty){                                                           // parse_function.jsxi:35
		var oldAsynchronous = state.asynchronous;
		
		state.asynchronous = asynchronous;                                         // parse_function.jsxi:37
		body = parseFunctionElements (options.noSemicolon);                        // parse_function.jsxi:39
		
		if (asynchronous){                                                         // parse_function.jsxi:41
			params.push (identifier ('__callback'));                               // parse_function.jsxi:42
			body = blockStatement (makeAsynchronous (body.body));                  // parse_function.jsxi:43
		}
		
		state.asynchronous = oldAsynchronous;                                      // parse_function.jsxi:46
	} else {
		body = null;                                                               // parse_function.jsxi:48
		consumeSemicolon ();                                                       // parse_function.jsxi:49
	}
	return mark ((options.declaration ? functionDeclaration : functionExpression)(id, params, body), 
		token);                                                                    // parse_function.jsxi:52
}

function parseFunctionExpression (){                                               // parse_function.jsxi:55
	var oldNoReturn = state.noReturn, result;
	
	state.noReturn = false;                                                        // parse_function.jsxi:57
	result = parseFunction ({ noSemicolon: true });                                // parse_function.jsxi:58
	state.noReturn = oldNoReturn;                                                  // parse_function.jsxi:59
	return result;                                                                 // parse_function.jsxi:60
}

function parseFunctionDeclaration (){                                              // parse_function.jsxi:63
	var oldNoReturn = state.noReturn, result;
	
	state.noReturn = false;                                                        // parse_function.jsxi:65
	result = parseFunction ({ id: true, declaration: true, noSemicolon: true });   // parse_function.jsxi:66
	state.noReturn = oldNoReturn;                                                  // parse_function.jsxi:67
	return result;                                                                 // parse_function.jsxi:68
}

function parseLambdaExpression (){                                                 // parse_function.jsxi:71
	var oldNoReturn = state.noReturn, result;
	
	state.noReturn = false;                                                        // parse_function.jsxi:73
	result = parseFunction ({                                                      // parse_function.jsxi:74
		id: false,                                                                 // parse_function.jsxi:74
		keyword: 'lambda',                                                         // parse_function.jsxi:74
		optionalParams: [ identifier ('arg') ],                                    // parse_function.jsxi:74
		noSemicolon: true
	});
	state.noReturn = oldNoReturn;                                                  // parse_function.jsxi:75
	return result;                                                                 // parse_function.jsxi:76
}

function parseFunctionArguments (maxLength){                                       // parse_function.jsxi:79
	if (maxLength === undefined)                                                   // parse_function.jsxi:79
		maxLength = Number.POSITIVE_INFINITY;                                      // parse_function.jsxi:79

	var name, params = [], comma = {};
	
	expect ('(');                                                                  // parse_function.jsxi:82
	
	while (!match (')') && maxLength -- > 0){                                      // parse_function.jsxi:84
		if (params.length)                                                         // parse_function.jsxi:85
			parseOptionalComma (comma);                                            // parse_function.jsxi:86
		
		name = parseIdentifier ();                                                 // parse_function.jsxi:88
		
		if (matchLex ('='))                                                        // parse_function.jsxi:89
			name.defaultValue = parseAssignmentExpression ();                      // parse_function.jsxi:90
		
		params.push (name);                                                        // parse_function.jsxi:92
	}
	
	expect (')');                                                                  // parse_function.jsxi:95
	return params;                                                                 // parse_function.jsxi:96
}

function parseOptionalFunctionArguments (){                                        // parse_function.jsxi:99
	return attemptTo (parseFunctionArguments, null, 
		!match ('('));                                                             // parse_function.jsxi:100
}

function parseEmptyFunctionArguments (){                                           // parse_function.jsxi:102
	return attemptTo (parseFunctionArguments.bind (null, 0), null, 
		!match ('('));                                                             // parse_function.jsxi:103
}

function parseFunctionElements (noSemicolon){                                      // parse_function.jsxi:105
	var oldPreventSequence = state.preventSequence, result;
	
	if (match ('{')){                                                              // parse_function.jsxi:108
		expect ('{');                                                              // parse_function.jsxi:109
		attemptTo (function (arg){                                                 // parse_function.jsxi:111
			result = [ returnStatement (objectExpression (parseObjectContent ())) ];
			consumeSemicolon ();                                                   // parse_function.jsxi:114
		}, 
		function (arg){                                                            // parse_function.jsxi:116
			state.preventSequence = false;                                         // parse_function.jsxi:117
			result = [];                                                           // parse_function.jsxi:118
			
			while (!match ('}'))                                                   // parse_function.jsxi:120
				result.push (parseStatement ());                                   // parse_function.jsxi:121
		}, 
		lookahead ().type !== Token.Literal && lookahead ().type !== Token.Identifier);
		expect ('}');                                                              // parse_function.jsxi:125
	} else if (matchLex (';')){                                                    // parse_function.jsxi:126
		result = [];                                                               // parse_function.jsxi:127
	} else if (!match (']') && !match (')') && !match ('}') && !match (',')){      // parse_function.jsxi:128
		state.preventSequence = true;                                              // parse_function.jsxi:129
		result = [ setReturnStatement (parseStatement ()) ];                       // parse_function.jsxi:130
	}
	
	if (!noSemicolon)                                                              // parse_function.jsxi:133
		matchLex (';');                                                            // parse_function.jsxi:134
	
	state.preventSequence = oldPreventSequence;                                    // parse_function.jsxi:136
	return blockStatement (result);                                                // parse_function.jsxi:137
}

function setReturnStatement (data){                                                // parse_function.jsxi:140
	if (data)                                                                      // parse_function.jsxi:141
		if (data.type === Syntax.ExpressionStatement){                             // parse_function.jsxi:142
			data.type = Syntax.ReturnStatement;                                    // parse_function.jsxi:143
			data.argument = data.expression;                                       // parse_function.jsxi:144
			delete data.expression;                                                // parse_function.jsxi:145
		} else if (data.type === Syntax.IfStatement){                              // parse_function.jsxi:146
			setReturnStatement (data.consequent);                                  // parse_function.jsxi:147
			setReturnStatement (data.alternate);                                   // parse_function.jsxi:148
		} else if (data.type === Syntax.LabelledStatement){                        // parse_function.jsxi:149
			setReturnStatement (data.body);                                        // parse_function.jsxi:150
		} else if (data.type === Syntax.BlockStatement && data.single){            // parse_function.jsxi:151
			setReturnStatement (data.body [0]);                                    // parse_function.jsxi:152
		} else if (data.type === Syntax.TryStatement){                             // parse_function.jsxi:153
			setReturnStatement (data.block);                                       // parse_function.jsxi:154
			
			if (data.handlers && data.handlers [0])                                // parse_function.jsxi:155
				setReturnStatement (data.handlers [0].body);                       // parse_function.jsxi:156
			
			if (data.finalizer)                                                    // parse_function.jsxi:157
				setReturnStatement (data.finalizer);                               // parse_function.jsxi:158
		}
	return data;                                                                   // parse_function.jsxi:161
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
	
	if (!expression)                                                               // parse_statements.jsxi:59
		unexpected (token);                                                        // parse_statements.jsxi:60
	
	if (expression.type === Syntax.Identifier && matchLex (':')){                  // parse_statements.jsxi:62
		return labeledStatement (expression, parseStatement ());                   // parse_statements.jsxi:63
	} else {
		consumeSemicolon ();                                                       // parse_statements.jsxi:65
		return expressionStatement (expression);                                   // parse_statements.jsxi:66
	}
}

function parseVariableDeclarators (semicolon){                                     // parse_statements.jsxi:70
	var result = [];
	
	do {
		result.push (variableDeclarator (parseIdentifier (),                       // parse_statements.jsxi:74
			matchLex ('=') ? parseAssignmentExpression () : null));                // parse_statements.jsxi:74
	} while (index < length && matchLex (','));                                    // parse_statements.jsxi:75
	
	if (semicolon !== false){                                                      // parse_statements.jsxi:77
		if (!match (';'))                                                          // parse_statements.jsxi:78
			warning ('Variables declaration without semicolon');                   // parse_statements.jsxi:79
		
		consumeSemicolon ();                                                       // parse_statements.jsxi:80
	}
	return result;                                                                 // parse_statements.jsxi:83
}

function parseVariableDeclaration (){                                              // parse_statements.jsxi:86
	expectKeyword ('var');                                                         // parse_statements.jsxi:87
	return variableDeclaration (parseVariableDeclarators ());                      // parse_statements.jsxi:88
}

function parseContinueStatement (){                                                // parse_statements.jsxi:91
	var label = null;
	
	expectKeyword ('continue');                                                    // parse_statements.jsxi:94
	
	if (source [index] === ';'){                                                   // parse_statements.jsxi:96
		lex ();                                                                    // parse_statements.jsxi:97
		return continueStatement ();                                               // parse_statements.jsxi:98
	}
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:101
		return continueStatement ();                                               // parse_statements.jsxi:102
	
	if (lookahead ().type === Token.Identifier)                                    // parse_statements.jsxi:104
		label = parseIdentifier ();                                                // parse_statements.jsxi:105
	
	consumeSemicolon ();                                                           // parse_statements.jsxi:107
	return continueStatement (label);                                              // parse_statements.jsxi:108
}

function parseBreakStatement (){                                                   // parse_statements.jsxi:111
	var label = null;
	
	expectKeyword ('break');                                                       // parse_statements.jsxi:114
	
	if (source [index] === ';'){                                                   // parse_statements.jsxi:116
		lex ();                                                                    // parse_statements.jsxi:117
		return breakStatement ();                                                  // parse_statements.jsxi:118
	}
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:121
		return breakStatement ();                                                  // parse_statements.jsxi:122
	
	if (lookahead ().type === Token.Identifier)                                    // parse_statements.jsxi:124
		label = parseIdentifier ();                                                // parse_statements.jsxi:125
	
	consumeSemicolon ();                                                           // parse_statements.jsxi:127
	return breakStatement (label);                                                 // parse_statements.jsxi:128
}

function parseReturnStatement (){                                                  // parse_statements.jsxi:131
	var argument = null;
	
	if (state.noReturn)                                                            // parse_statements.jsxi:134
		unexpected (lookahead ());                                                 // parse_statements.jsxi:135
	
	expectKeyword ('return');                                                      // parse_statements.jsxi:137
	
	if (source [index] === ' ' && identifierStart (source [index + 1])){           // parse_statements.jsxi:139
		argument = parseExpression ();                                             // parse_statements.jsxi:140
		consumeSemicolon ();                                                       // parse_statements.jsxi:141
		return returnStatement (argument);                                         // parse_statements.jsxi:142
	}
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:145
		return returnStatement ();                                                 // parse_statements.jsxi:146
	
	if (!match (';') && !match ('}') && lookahead ().type !== Token.EOF)           // parse_statements.jsxi:148
		argument = parseExpression ();                                             // parse_statements.jsxi:149
	
	if (!state.preventSequence)                                                    // parse_statements.jsxi:151
		consumeSemicolon ();                                                       // parse_statements.jsxi:152
	return returnStatement (argument);                                             // parse_statements.jsxi:154
}

function parseThrowStatement (){                                                   // parse_statements.jsxi:157
	expectKeyword ('throw');                                                       // parse_statements.jsxi:158
	
	if (peekLineTerminator ())                                                     // parse_statements.jsxi:160
		throwError ({}, Messages.NewlineAfterThrow);                               // parse_statements.jsxi:161
	
	var argument = parseExpression ();
	
	consumeSemicolon ();                                                           // parse_statements.jsxi:164
	return throwStatement (argument);                                              // parse_statements.jsxi:166
}

function parseDebuggerStatement (){                                                // parse_statements.jsxi:169
	expectKeyword ('debugger');                                                    // parse_statements.jsxi:170
	consumeSemicolon ();                                                           // parse_statements.jsxi:171
	return debuggerStatement ();                                                   // parse_statements.jsxi:172
}

function parseIfStatement (){                                                      // parse_statements.jsxi:175
	expectKeyword ('if');                                                          // parse_statements.jsxi:176
	expect ('(');                                                                  // parse_statements.jsxi:177
	
	var test = parseExpression (), consequent, alternate;
	
	expect (')');                                                                  // parse_statements.jsxi:183
	consequent = parseStatement ();                                                // parse_statements.jsxi:185
	
	if (matchKeyword ('else')){                                                    // parse_statements.jsxi:187
		lex ();                                                                    // parse_statements.jsxi:188
		alternate = parseStatement ();                                             // parse_statements.jsxi:189
	} else
		alternate = null;                                                          // parse_statements.jsxi:191
	return ifStatement (test, consequent, alternate);                              // parse_statements.jsxi:193
}

function parseDoWhileStatement (){                                                 // parse_statements.jsxi:196
	expectKeyword ('do');                                                          // parse_statements.jsxi:197
	
	var body = parseStatement ();
	
	expectKeyword ('while');                                                       // parse_statements.jsxi:201
	expect ('(');                                                                  // parse_statements.jsxi:202
	
	var test = parseExpression ();
	
	expect (')');                                                                  // parse_statements.jsxi:206
	matchLex (';');                                                                // parse_statements.jsxi:207
	return doWhileStatement (body, test);                                          // parse_statements.jsxi:209
}

function parseWhileStatement (){                                                   // parse_statements.jsxi:212
	expectKeyword ('while');                                                       // parse_statements.jsxi:213
	expect ('(');                                                                  // parse_statements.jsxi:214
	
	var test = parseExpression ();
	
	expect (')');                                                                  // parse_statements.jsxi:218
	return whileStatement (test, parseStatement ());                               // parse_statements.jsxi:220
}

function parseForStatement (){                                                     // parse_statements.jsxi:223
	var init = null,                                                               // parse_statements.jsxi:224
		test = null,                                                               // parse_statements.jsxi:224
		update = null,                                                             // parse_statements.jsxi:224
		left,                                                                      // parse_statements.jsxi:225
		right,                                                                     // parse_statements.jsxi:225
		body,                                                                      // parse_statements.jsxi:225
		temp,                                                                      // parse_statements.jsxi:225
		result,                                                                    // parse_statements.jsxi:225
		arrayMode,                                                                 // parse_statements.jsxi:225
		identifierMode,                                                            // parse_statements.jsxi:226
		propertyName;                                                              // parse_statements.jsxi:226
	
	expectKeyword ('for');                                                         // parse_statements.jsxi:228
	expect ('(');                                                                  // parse_statements.jsxi:229
	
	if (!matchLex (';')){                                                          // parse_statements.jsxi:231
		if (matchKeywordLex ('var')){                                              // parse_statements.jsxi:232
			state.allowIn = false;                                                 // parse_statements.jsxi:233
			init = variableDeclaration (parseVariableDeclarators (false));         // parse_statements.jsxi:234
			state.allowIn = true;                                                  // parse_statements.jsxi:235
			
			if (init.declarations.length <= 2 && (matchKeyword ('in-array') || matchKeyword ('in-object') || matchKeyword ('in'))){
				arrayMode = lex ().value;                                          // parse_statements.jsxi:238
				left = init;                                                       // parse_statements.jsxi:239
				right = parseExpression ();                                        // parse_statements.jsxi:240
				init = null;                                                       // parse_statements.jsxi:241
			}
		} else {
			state.allowIn = false;                                                 // parse_statements.jsxi:244
			init = parseExpression ();                                             // parse_statements.jsxi:245
			state.allowIn = true;                                                  // parse_statements.jsxi:246
			
			if (matchKeyword ('in-array') || matchKeyword ('in-object') || matchKeyword ('in')){
				if (init.type !== Syntax.SequenceExpression)                       // parse_statements.jsxi:249
					leftSideOnly (init);                                           // parse_statements.jsxi:250
				else if (init.expressions.length !== 2)                            // parse_statements.jsxi:251
					leftSideOnly ();                                               // parse_statements.jsxi:252
				
				arrayMode = lex ().value;                                          // parse_statements.jsxi:254
				left = init;                                                       // parse_statements.jsxi:255
				right = parseExpression ();                                        // parse_statements.jsxi:256
				init = null;                                                       // parse_statements.jsxi:257
			}
		}
		
		if (left === undefined)                                                    // parse_statements.jsxi:261
			expect (';');                                                          // parse_statements.jsxi:262
	}
	
	if (left === undefined){                                                       // parse_statements.jsxi:265
		if (!match (';'))                                                          // parse_statements.jsxi:266
			test = parseExpression ();                                             // parse_statements.jsxi:267
		
		expect (';');                                                              // parse_statements.jsxi:269
		
		if (!match (')'))                                                          // parse_statements.jsxi:271
			update = parseExpression ();                                           // parse_statements.jsxi:272
	}
	
	expect (')');                                                                  // parse_statements.jsxi:275
	body = parseStatement ();                                                      // parse_statements.jsxi:276
	
	if (arrayMode === 'in-array')                                                  // parse_statements.jsxi:278
		if (left.type === Syntax.VariableDeclaration && left.declarations.length === 1){
			left.declarations = [ variableDeclarator (newIdentifier ()), left.declarations [0] ];
		} else if (left.type === Syntax.Identifier){                               // parse_statements.jsxi:281
			left = variableDeclaration ([                                          // parse_statements.jsxi:282
				variableDeclarator (newIdentifier ()),                             // parse_statements.jsxi:282
				variableDeclarator (left)
			]);
			identifierMode = true;                                                 // parse_statements.jsxi:283
		}
	
	if (left === undefined){                                                       // parse_statements.jsxi:286
		return forStatement (init, test, update, body);                            // parse_statements.jsxi:287
	} else if (left.type === Syntax.SequenceExpression && left.expressions.length === 2 || identifierMode){
		temp = body;                                                               // parse_statements.jsxi:289
		body = blockStatement ([                                                   // parse_statements.jsxi:291
			expressionStatement (assignmentExpression (identifierMode ? left.declarations [1].id : left.expressions [1], 
				memberExpression (right,                                           // parse_statements.jsxi:294
					identifierMode ? left.declarations [0].id : left.expressions [0], 
					true)))
		]);
		
		if (temp.type === Syntax.BlockStatement)                                   // parse_statements.jsxi:296
			Array.prototype.push.apply (body.body, temp.body);                     // parse_statements.jsxi:297
		else
			body.body.push (temp);                                                 // parse_statements.jsxi:299
		
		if (identifierMode)                                                        // parse_statements.jsxi:301
			left.declarations.length = 1;                                          // parse_statements.jsxi:302
		else
			left = left.expressions [0];                                           // parse_statements.jsxi:304
	} else if (left.type === Syntax.VariableDeclaration && left.declarations.length === 2){
		temp = body;                                                               // parse_statements.jsxi:306
		body = blockStatement ([ variableDeclaration ([ left.declarations [1] ]) ]);
		body.body [0].declarations [0].init = memberExpression (right, left.declarations [0].id, true);
		
		if (temp.type === Syntax.BlockStatement)                                   // parse_statements.jsxi:310
			Array.prototype.push.apply (body.body, temp.body);                     // parse_statements.jsxi:311
		else
			body.body.push (temp);                                                 // parse_statements.jsxi:313
		
		left.declarations.length = 1;                                              // parse_statements.jsxi:315
	}
	
	if (arrayMode === 'in-array'){                                                 // parse_statements.jsxi:318
		if (left.type === Syntax.VariableDeclaration && !left.declarations [0].init)
			left.declarations [0].init = numericLiteral (0);                       // parse_statements.jsxi:320
		
		temp = left.type === Syntax.VariableDeclaration ? left.declarations [0].id : left.type === Syntax.SequenceExpression ? left.expressions [0] : left;
		
		if (left.type === Syntax.Identifier)                                       // parse_statements.jsxi:328
			left = assignmentExpression (left, numericLiteral (0));                // parse_statements.jsxi:329
		
		result = forStatement (left,                                               // parse_statements.jsxi:331
			binaryExpression (temp, '<', memberExpression (right, 'length')),      // parse_statements.jsxi:333
			unaryExpression (temp, '++', false),                                   // parse_statements.jsxi:334
			body);                                                                 // parse_statements.jsxi:335
	} else {
		if (arrayMode === 'in-object'){                                            // parse_statements.jsxi:337
			propertyName = left.type === Syntax.VariableDeclaration ? left.declarations [0].id.name : left.name;
			body = ifStatement (callExpression (memberExpression (right, 'hasOwnProperty'), [ propertyName ]), 
				body);                                                             // parse_statements.jsxi:339
		}
		
		result = forInStatement (left, right, body);                               // parse_statements.jsxi:342
	}
	
	if ((temp !== undefined || arrayMode === 'in-object') && right.type !== Syntax.Identifier){
		var identifier = newIdentifier ();
		
		temp = $.extend (true, {}, 
			right);                                                                // parse_statements.jsxi:348
		
		for (var n in right)                                                       // parse_statements.jsxi:350
			delete right [n];                                                      // parse_statements.jsxi:351
		
		right.type = Syntax.Identifier;                                            // parse_statements.jsxi:353
		right.name = identifier;                                                   // parse_statements.jsxi:354
		return blockStatement ([                                                   // parse_statements.jsxi:356
			variableDeclaration ([ variableDeclarator (right, temp) ]),            // parse_statements.jsxi:356
			result,                                                                // parse_statements.jsxi:358
			expressionStatement (assignmentExpression (right, 'undefined'))
		]);
	}
	return result;                                                                 // parse_statements.jsxi:363
}

function parseSwitchCase (){                                                       // parse_statements.jsxi:367
	var test, consequent = [], statement;
	
	if (matchKeywordLex ('default')){                                              // parse_statements.jsxi:372
		test = null;                                                               // parse_statements.jsxi:373
	} else {
		expectKeyword ('case');                                                    // parse_statements.jsxi:375
		test = parseExpression ();                                                 // parse_statements.jsxi:376
	}
	
	expect (':');                                                                  // parse_statements.jsxi:379
	
	while (!match ('}') && !matchKeyword ('default') && !matchKeyword ('case'))    // parse_statements.jsxi:381
		consequent.push (parseStatement ());                                       // parse_statements.jsxi:382
	return { type: Syntax.SwitchCase, test: test, consequent: consequent };
}

function parseSwitchStatement (){                                                  // parse_statements.jsxi:391
	expectKeyword ('switch');                                                      // parse_statements.jsxi:392
	expect ('(');                                                                  // parse_statements.jsxi:393
	
	var discriminant = parseExpression (), cases = [];
	
	expect (')');                                                                  // parse_statements.jsxi:397
	expect ('{');                                                                  // parse_statements.jsxi:398
	
	while (!matchLex ('}'))                                                        // parse_statements.jsxi:400
		cases.push (parseSwitchCase ());                                           // parse_statements.jsxi:401
	return {
		type: Syntax.SwitchStatement,                                              // parse_statements.jsxi:404
		discriminant: discriminant,                                                // parse_statements.jsxi:405
		cases: cases
	};
}

function parseCatchClause (){                                                      // parse_statements.jsxi:410
	expectKeyword ('catch');                                                       // parse_statements.jsxi:411
	
	var param;
	
	if (matchLex ('(')){                                                           // parse_statements.jsxi:415
		param = parseIdentifier ();                                                // parse_statements.jsxi:416
		expect (')');                                                              // parse_statements.jsxi:417
	} else
		param = identifier ('e');                                                  // parse_statements.jsxi:419
	return catchClause (param, parseBlockOrNotBlock ());                           // parse_statements.jsxi:421
}

function parseTryStatement (){                                                     // parse_statements.jsxi:424
	expectKeyword ('try');                                                         // parse_statements.jsxi:425
	
	var block = parseBlockOrNotBlock (),                                           // parse_statements.jsxi:427
		handlers = matchKeyword ('catch') ? [ parseCatchClause () ] : [],          // parse_statements.jsxi:428
		finalizer = matchKeywordLex ('finally') ? parseBlockOrNotBlock () : null;
	
	if (finalizer === null && handlers.length === 0)                               // parse_statements.jsxi:431
		handlers.push (catchClause ('e', blockStatement ([])));                    // parse_statements.jsxi:432
	return tryStatement (block, handlers, finalizer);                              // parse_statements.jsxi:434
}

function parseWithStatement (){                                                    // parse_statements.jsxi:437
	expectKeyword ('with');                                                        // parse_statements.jsxi:438
	expect ('(');                                                                  // parse_statements.jsxi:439
	
	var object = parseExpression ();
	
	expect (')');                                                                  // parse_statements.jsxi:443
	return {
		type: Syntax.WithStatement,                                                // parse_statements.jsxi:446
		object: object,                                                            // parse_statements.jsxi:447
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
	
	loop: while (index < length && source [index] !== quote)                       // reads.jsxi:267
		switch (source [index]){                                                   // reads.jsxi:268
			case quote:                                                            // reads.jsxi:269
				break loop;                                                        // reads.jsxi:270
			case '\n':                                                             // reads.jsxi:272
				throw new SyntaxError ('Unterminated string literal');             // reads.jsxi:273
			case '\\':                                                             // reads.jsxi:275
				if (source [++ index] === '\n')                                    // reads.jsxi:276
					lineNumber ++;                                                 // reads.jsxi:277
			default:
				index ++;                                                          // reads.jsxi:280
		}
	
	if (source [index ++] !== quote)                                               // reads.jsxi:283
		throw new SyntaxError ('Unterminated string literal');                     // reads.jsxi:284
	return {
		type: Token.StringLiteral,                                                 // reads.jsxi:287
		value: source.substring (start, index),                                    // reads.jsxi:288
		lineNumber: lineNumber,                                                    // reads.jsxi:289
		range: [ start, index ]
	};
}

function readMultilineString (){                                                   // reads.jsxi:294
	function lengthWithTabs (string, from, to){                                    // reads.jsxi:295
		if (from === undefined)                                                    // reads.jsxi:295
			from = 0;                                                              // reads.jsxi:295
	
		if (to === undefined)                                                      // reads.jsxi:295
			to = string.length;                                                    // reads.jsxi:295
	
		for (var index = from, result = 0; index < to; index ++)                   // reads.jsxi:296
			if (string [index] === '\t')                                           // reads.jsxi:297
				result += result % tabSize ? tabSize - result % tabSize : tabSize;
			else
				result ++;                                                         // reads.jsxi:300
		return result;                                                             // reads.jsxi:301
	}
	
	function indent (length){                                                      // reads.jsxi:304
		return length > 0 ? repeatString ('\t', Math.floor (length / tabSize)) + repeatString (' ', length % tabSize) : '';
	}
	
	var tabSize = 4,                                                               // reads.jsxi:307
		tabSpaces = repeatString (' ', tabSize),                                   // reads.jsxi:308
		tabRegExp = new RegExp ('^(?:' + tabSpaces + ')+'),                        // reads.jsxi:309
		start = index ++,                                                          // reads.jsxi:310
		minSpaces = Number.POSITIVE_INFINITY,                                      // reads.jsxi:311
		spaces = Number.POSITIVE_INFINITY,                                         // reads.jsxi:312
		startSpaces = lengthWithTabs (source, source.lastIndexOf ('\n', start) + 1, index), 
		spacesMode = false;                                                        // reads.jsxi:314
	
	loop: while (index < length)                                                   // reads.jsxi:316
		switch (source [index]){                                                   // reads.jsxi:317
			case '`':                                                              // reads.jsxi:318
				if (!spacesMode && spaces < minSpaces)                             // reads.jsxi:319
					minSpaces = spaces;                                            // reads.jsxi:320
				
				break loop;                                                        // reads.jsxi:321
			case '\t':                                                             // reads.jsxi:323
				if (spacesMode)                                                    // reads.jsxi:324
					spaces += tabSize;                                             // reads.jsxi:325
				
				index ++;                                                          // reads.jsxi:326
				
				break;
			case ' ':                                                              // reads.jsxi:329
				if (spacesMode)                                                    // reads.jsxi:330
					spaces ++;                                                     // reads.jsxi:331
				
				index ++;                                                          // reads.jsxi:332
				
				break;
			case '\n':                                                             // reads.jsxi:335
				lineNumber ++;                                                     // reads.jsxi:336
				index ++;                                                          // reads.jsxi:337
				
				if (!spacesMode){                                                  // reads.jsxi:339
					spacesMode = true;                                             // reads.jsxi:340
					
					if (spaces < minSpaces)                                        // reads.jsxi:341
						minSpaces = spaces;                                        // reads.jsxi:342
				}
				
				spaces = 0;                                                        // reads.jsxi:345
				
				break;
			case '\\':                                                             // reads.jsxi:348
				index ++;                                                          // reads.jsxi:349
			default:
				spacesMode = false;                                                // reads.jsxi:352
				index ++;                                                          // reads.jsxi:353
		}
	
	if (source [index ++] !== '`')                                                 // reads.jsxi:356
		throw new SyntaxError ('Unterminated string literal');                     // reads.jsxi:357
	
	var result = source.substring (start + 1, index - 1);
	
	if (minSpaces !== Number.POSITIVE_INFINITY){                                   // reads.jsxi:361
		if (startSpaces < minSpaces)                                               // reads.jsxi:362
			minSpaces = startSpaces;                                               // reads.jsxi:363
		
		result = indent (startSpaces - minSpaces) + result.replace (/\n[ \t]+/g, 
			function (arg){                                                        // reads.jsxi:364
				return '\n' + indent (lengthWithTabs (arg, 1) - minSpaces);        // reads.jsxi:364
			});
	}
	return {
		type: Token.StringLiteral,                                                 // reads.jsxi:368
		value: JSON.stringify (result.replace (/\\`/g, '`')),                      // reads.jsxi:369
		lineNumber: lineNumber,                                                    // reads.jsxi:370
		range: [ start, index ]
	};
}

nnnu = 0;                                                                          // reads.jsxi:375

function skipComments (){                                                          // reads.jsxi:377
	var blockComment = false, lineComment = false;
	
	while (index < length){                                                        // reads.jsxi:381
		var character = source [index];
		
		if (character === ' ' || character === '\t' || character === '\u00A0'){    // reads.jsxi:384
			index ++;                                                              // reads.jsxi:385
		} else if (character === '\n'){                                            // reads.jsxi:386
			index ++;                                                              // reads.jsxi:387
			lineNumber ++;                                                         // reads.jsxi:388
			
			if (lineComment)                                                       // reads.jsxi:389
				lineComment = false;                                               // reads.jsxi:390
		} else if (lineComment){                                                   // reads.jsxi:391
			index ++;                                                              // reads.jsxi:392
		} else if (blockComment){                                                  // reads.jsxi:393
			if (character === '*' && source [index + 1] === '/'){                  // reads.jsxi:394
				index += 2;                                                        // reads.jsxi:395
				blockComment = false;                                              // reads.jsxi:396
			} else
				index ++;                                                          // reads.jsxi:398
		} else if (character === '/'){                                             // reads.jsxi:399
			character = source [index + 1];                                        // reads.jsxi:400
			
			if (character === '/'){                                                // reads.jsxi:402
				index += 2;                                                        // reads.jsxi:403
				lineComment = true;                                                // reads.jsxi:404
			} else if (character === '*'){                                         // reads.jsxi:405
				index += 2;                                                        // reads.jsxi:406
				blockComment = true;                                               // reads.jsxi:407
			} else
				break;
		} else
			break;
	}
	
	if (index === length && blockComment)                                          // reads.jsxi:414
		unexpected ();                                                             // reads.jsxi:415
}

function JsExtError (name, message, location){                                     // throws.jsxi:1
	var filename = location && location.filename || options && options.filename || '<unknown file>', 
		line = location && location.lineNumber || lineNumber || '<unknown line>', 
		result = new Error (message + ' [' + filename + ':' + line + ']');         // throws.jsxi:4
	
	result.name = name;                                                            // throws.jsxi:6
	return result;                                                                 // throws.jsxi:7
}

;

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

var ch0 = '0'.charCodeAt (0),                                                      // utils.jsxi:1
	ch1 = '1'.charCodeAt (0),                                                      // utils.jsxi:2
	ch7 = '7'.charCodeAt (0),                                                      // utils.jsxi:3
	ch9 = '9'.charCodeAt (0),                                                      // utils.jsxi:4
	cha = 'a'.charCodeAt (0),                                                      // utils.jsxi:5
	chf = 'f'.charCodeAt (0),                                                      // utils.jsxi:6
	chz = 'z'.charCodeAt (0),                                                      // utils.jsxi:7
	chA = 'A'.charCodeAt (0),                                                      // utils.jsxi:8
	chF = 'F'.charCodeAt (0),                                                      // utils.jsxi:9
	chZ = 'Z'.charCodeAt (0),                                                      // utils.jsxi:10
	ch$ = '$'.charCodeAt (0),                                                      // utils.jsxi:11
	ch_ = '_'.charCodeAt (0),                                                      // utils.jsxi:12
	ciA = '\xAA'.charCodeAt (0),                                                   // utils.jsxi:13
	ciS = new RegExp ('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'), 
	ciP = new RegExp ('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]');

function decimalDigit (c){                                                         // utils.jsxi:17
	c = c.charCodeAt (0);                                                          // utils.jsxi:18
	return ch0 <= c && c <= ch9;                                                   // utils.jsxi:19
}

function hexDigit (c){                                                             // utils.jsxi:22
	c = c.charCodeAt (0);                                                          // utils.jsxi:23
	return ch0 <= c && c <= ch9 || cha <= c && c <= chf || chA <= c && c <= chF;   // utils.jsxi:24
}

function identifierStart (c){                                                      // utils.jsxi:27
	var d = c.charCodeAt (0);
	return cha <= d && d <= chz || chA <= d && d <= chZ || d === ch$ || d === ch_ || ciA <= d && ciS.test (c);
}

function identifierPart (c){                                                       // utils.jsxi:32
	var d = c.charCodeAt (0);
	return cha <= d && d <= chz || chA <= d && d <= chZ || ch0 <= d && d <= ch9 || d === ch$ || d === ch_ || ciA <= d && ciP.test (c);
}

var lastIdentifier = 0;

function newIdentifier (){                                                         // utils.jsxi:39
	return '__' + (lastIdentifier ++).toString (32);                               // utils.jsxi:40
}

function saveAll (){                                                               // utils.jsxi:44
	return { index: index, lineNumber: lineNumber, buffer: buffer };
}

;

function restoreAll (obj){                                                         // utils.jsxi:47
	index = obj.index;                                                             // utils.jsxi:48
	lineNumber = obj.lineNumber;                                                   // utils.jsxi:49
	buffer = obj.buffer;                                                           // utils.jsxi:50
}

function attemptTo (firstFn, secondFn, forceSecond){                               // utils.jsxi:53
	if (forceSecond){                                                              // utils.jsxi:54
		return typeof secondFn === 'function' ? secondFn () : secondFn;            // utils.jsxi:55
	} else {
		saved = saveAll ();                                                        // utils.jsxi:57
		
		try {
			return typeof firstFn === 'function' ? firstFn () : firstFn;           // utils.jsxi:60
		} catch (e){
			if (e instanceof Error && /^Unexpected .+? \[.+?\:\d+\]$/.test (e.message)){
				restoreAll (saved);                                                // utils.jsxi:63
				return typeof secondFn === 'function' ? secondFn () : secondFn;    // utils.jsxi:64
			} else
				throw e;                                                           // utils.jsxi:66
		} 
	}
}

function advance (){                                                               // utils.jsxi:69
	skipComments ();                                                               // utils.jsxi:70
	
	if (index >= length)                                                           // utils.jsxi:72
		return {
			type: Token.EOF,                                                       // utils.jsxi:73
			lineNumber: lineNumber,                                                // utils.jsxi:73
			range: [ index, index ]
		};
	
	var token = readPunctuator ();
	
	if (token !== undefined)                                                       // utils.jsxi:76
		return token;                                                              // utils.jsxi:77
	
	var character = source [index];
	
	if (character === '\'' || character === '"')                                   // utils.jsxi:80
		return readStringLiteral ();                                               // utils.jsxi:81
	
	if (character === '`')                                                         // utils.jsxi:83
		return readMultilineString ();                                             // utils.jsxi:84
	
	if (character === '.' || decimalDigit (character))                             // utils.jsxi:86
		return readNumericLiteral ();                                              // utils.jsxi:87
	
	token = readIdentifier ();                                                     // utils.jsxi:89
	
	if (token !== undefined)                                                       // utils.jsxi:90
		return token;                                                              // utils.jsxi:91
	
	unexpected ();                                                                 // utils.jsxi:93
}

function lex (){                                                                   // utils.jsxi:96
	if (buffer){                                                                   // utils.jsxi:97
		index = buffer.range [1];                                                  // utils.jsxi:98
		lineNumber = buffer.lineNumber;                                            // utils.jsxi:99
		
		var token = buffer;
		
		buffer = null;                                                             // utils.jsxi:102
		return token;                                                              // utils.jsxi:103
	} else {
		buffer = null;                                                             // utils.jsxi:105
		return advance ();                                                         // utils.jsxi:106
	}
}

function lookahead (){                                                             // utils.jsxi:109
	if (buffer === null){                                                          // utils.jsxi:110
		var currentIndex = index, currentLineNumber = lineNumber;
		
		buffer = advance ();                                                       // utils.jsxi:114
		index = currentIndex;                                                      // utils.jsxi:116
		lineNumber = currentLineNumber;                                            // utils.jsxi:117
	}
	return buffer;                                                                 // utils.jsxi:120
}

function peekLineTerminator (){                                                    // utils.jsxi:123
	var pos = index, line = lineNumber, found;
	
	skipComments ();                                                               // utils.jsxi:128
	found = lineNumber !== line;                                                   // utils.jsxi:130
	index = pos;                                                                   // utils.jsxi:131
	lineNumber = line;                                                             // utils.jsxi:132
	return found;                                                                  // utils.jsxi:134
}

function expect (value){                                                           // utils.jsxi:137
	var token = lex ();
	
	if (token.type !== Token.Punctuator || token.value !== value)                  // utils.jsxi:139
		unexpected (token);                                                        // utils.jsxi:140
}

function expectKeyword (keyword){                                                  // utils.jsxi:143
	var token = lex ();
	
	if (token.type !== Token.Keyword || token.value !== keyword)                   // utils.jsxi:145
		unexpected (token);                                                        // utils.jsxi:146
}

function match (value){                                                            // utils.jsxi:149
	var token = lookahead ();
	return token.type === Token.Punctuator && token.value === value;               // utils.jsxi:151
}

function matchKeyword (keyword){                                                   // utils.jsxi:154
	var token = lookahead ();
	return token.type === Token.Keyword && token.value === keyword;                // utils.jsxi:156
}

function matchLex (value){                                                         // utils.jsxi:159
	var token = lookahead ();
	
	if (token.type === Token.Punctuator && token.value === value)                  // utils.jsxi:161
		return lex ();                                                             // utils.jsxi:162
	else
		return false;
}

function matchKeywordLex (keyword){                                                // utils.jsxi:167
	var token = lookahead ();
	
	if (token.type === Token.Keyword && token.value === keyword)                   // utils.jsxi:169
		return lex ();                                                             // utils.jsxi:170
	else
		return false;
}

function consumeSemicolon (){                                                      // utils.jsxi:175
	if (source [index] === ';'){                                                   // utils.jsxi:176
		lex ();                                                                    // utils.jsxi:177
		return;
	}
	
	var line = lineNumber;
	
	skipComments ();                                                               // utils.jsxi:182
	
	if (lineNumber !== line)                                                       // utils.jsxi:184
		return;
	
	if (matchLex (';'))                                                            // utils.jsxi:187
		return;
	
	if (!state.preventSequence && !match ('}') && lookahead ().type !== Token.EOF)
		unexpected (buffer);                                                       // utils.jsxi:191
}

function leftSideOnly (expression){                                                // utils.jsxi:194
	if (!expression || expression.type !== Syntax.Identifier && expression.type !== Syntax.MemberExpression)
		throw new SyntaxError ('Invalid left-hand side', expression);              // utils.jsxi:196
	else
		return expression;                                                         // utils.jsxi:198
}

function astEach (node, callback, result){                                         // utils.jsxi:200
	if (result === undefined)                                                      // utils.jsxi:200
		result = [];                                                               // utils.jsxi:200

	if (typeof node.type === 'string'){                                            // utils.jsxi:201
		var temp = callback (node);
		
		if (temp !== undefined)                                                    // utils.jsxi:204
			result.push (temp);                                                    // utils.jsxi:205
	}
	
	for (var key in node){                                                         // utils.jsxi:208
		var child = node [key];
		
		if (child && (typeof child.type === 'string' || child instanceof Array))   // utils.jsxi:209
			each (child, callback, result);                                        // utils.jsxi:210
	}
	return result;                                                                 // utils.jsxi:212
}

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
				var __1b = s.slice (1);
				
				for (var __1a = 0; __1a < __1b.length; __1a ++){
					var k = __1b [__1a];
					
					put (function (arg){                                           // application_args.jsxi:28
						return arg.s == k;                                         // application_args.jsxi:28
					});
				}
				
				__1b = undefined;
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
						throw new Error ('Importing file "' + value + '" not found');
					
					break;
				case 'build-to':                                                   // defaults.jsxi:19
					Worker.params.buildTo = path.resolve (that.context.file.dirname, value);
					
					break;
				default:
					throw new Error ('Wrong param key ("' + key + '")');           // defaults.jsxi:24
			}
		})
	};
}

addLog (File,                                                                      // file.jsxi:186
	1, 
	function (arg){                                                                // file.jsxi:186
		return filename;                                                           // file.jsxi:186
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
		var __1f = this.files;
		
		for (var __1e = 0; __1e < __1f.length; __1e ++){
			var file = __1f [__1e];
			
			if (fn (file.state))                                                   // file_storage.jsxi:27
				return true;
		}
		
		__1f = undefined;
	}
	return false;
};
FileStorage.prototype.everythingFinished = function (){                            // file_storage.jsxi:32
	return !this.has (function (arg){                                              // file_storage.jsxi:33
		return arg !== File.STATE_FINISHED;                                        // file_storage.jsxi:33
	});
};

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
		get: (function (arg){                                                      // lite_parser.jsxi:11
			return this.lineNumberAt (this.index);                                 // lite_parser.jsxi:11
		})
	});
Object.defineProperty (LiteParser.prototype,                                       // lite_parser.jsxi:14
	'current',                                                                     // lite_parser.jsxi:14
	{
		get: (function (arg){                                                      // lite_parser.jsxi:14
			return this.data [this.index];                                         // lite_parser.jsxi:14
		})
	});
LiteParser.prototype.replace = function (from, to, replacement){                   // lite_parser.jsxi:16
	if (replacement === undefined)                                                 // lite_parser.jsxi:16
		replacement = '';                                                          // lite_parser.jsxi:16

	console.assert (from <= to, 'Invalid args');                                   // lite_parser.jsxi:17
	
	var delta = String (replacement).length - to + from;
	
	if (this.index >= to)                                                          // lite_parser.jsxi:21
		this.index += delta;                                                       // lite_parser.jsxi:22
	else if (this.index > from)                                                    // lite_parser.jsxi:23
		this.update (from);                                                        // lite_parser.jsxi:24
	
	this.update (this.data = this.data.substr (0, from) + replacement + this.data.substr (to));
	return delta;                                                                  // lite_parser.jsxi:28
};
LiteParser.prototype.lineNumberAt = function (index){                              // lite_parser.jsxi:31
	var result = 1;
	
	for (var i = 0, d = this.data, n = Math.min (d.length, index); i < n; i ++)    // lite_parser.jsxi:33
		if (d [i] === '\n')                                                        // lite_parser.jsxi:34
			result ++;                                                             // lite_parser.jsxi:35
	return result;                                                                 // lite_parser.jsxi:36
};
LiteParser.prototype.substring = function (from, to){                              // lite_parser.jsxi:39
	return this.data.substring (from, to);                                         // lite_parser.jsxi:40
};
LiteParser.prototype.getPosition = function (data, delta){                         // lite_parser.jsxi:43
	return { index: this.index, lineNumber: this.lineNumber };
};
LiteParser.prototype.update = function (data, index){                              // lite_parser.jsxi:49
	if (typeof data === 'string')                                                  // lite_parser.jsxi:50
		this.data = data;                                                          // lite_parser.jsxi:51
	
	if (typeof index === 'number')                                                 // lite_parser.jsxi:53
		this.index = index;                                                        // lite_parser.jsxi:54
	else if (typeof data === 'number')                                             // lite_parser.jsxi:55
		this.index = data;                                                         // lite_parser.jsxi:56
	return this;                                                                   // lite_parser.jsxi:58
};
LiteParser.prototype.on = function (){                                             // lite_parser.jsxi:61
	var args = Array.prototype.slice.call (arguments),                             // lite_parser.jsxi:62
		comment,                                                                   // lite_parser.jsxi:63
		handler;                                                                   // lite_parser.jsxi:64
	
	if (typeof args [args.length - 2] === 'function')                              // lite_parser.jsxi:66
		comment = args.pop ();                                                     // lite_parser.jsxi:67
	
	handler = args.pop ();                                                         // lite_parser.jsxi:69
	
	for (var __1p = 0; __1p < args.length; __1p ++){                               // lite_parser.jsxi:71
		var entry = args [__1p];
		
		this.binded.push ({ match: entry, handler: handler, comment: comment });   // lite_parser.jsxi:72
	}
	return this;                                                                   // lite_parser.jsxi:74
};
LiteParser.prototype.debug = function (from, to){                                  // lite_parser.jsxi:77
	this.debugMode = true;                                                         // lite_parser.jsxi:78
	return this;                                                                   // lite_parser.jsxi:79
};
LiteParser.prototype.findSimple = function (){                                     // lite_parser.jsxi:82
	var value = { index: Number.POSITIVE_INFINITY };
	
	for (var id = 0; id < arguments.length; id ++){                                // lite_parser.jsxi:85
		var arg = arguments [id];
		
		if (arg === LiteParser.EOF){                                               // lite_parser.jsxi:86
			if (value.index === Number.POSITIVE_INFINITY)                          // lite_parser.jsxi:87
				value = { id: id, index: this.data.length, value: '' };            // lite_parser.jsxi:88
		} else {
			var index = this.data.indexOf (arg, this.index);
			
			if (index !== - 1 && index < value.index)                              // lite_parser.jsxi:96
				value = { id: id, index: index, value: arg };                      // lite_parser.jsxi:97
		}
	}
	
	if (value.index === Number.POSITIVE_INFINITY){                                 // lite_parser.jsxi:104
		return null;
	} else {
		this.index = value.index + value.value.length;                             // lite_parser.jsxi:107
		return value;                                                              // lite_parser.jsxi:108
	}
};
LiteParser.prototype.findNext = function (){                                       // lite_parser.jsxi:112
	return this.innerFindNext (arguments);                                         // lite_parser.jsxi:113
};
LiteParser.prototype.whatNext = function (){                                       // lite_parser.jsxi:116
	return this.innerFindNext (arguments, true);                                   // lite_parser.jsxi:117
};
LiteParser.prototype.innerFindNext = function (args, fixedMode){                   // lite_parser.jsxi:120
	if (fixedMode === undefined)                                                   // lite_parser.jsxi:120
		fixedMode = false;                                                         // lite_parser.jsxi:120

	console.assert (args && typeof args.length === 'number',                       // lite_parser.jsxi:121
		'Invalid argument type');                                                  // lite_parser.jsxi:121
	
	function indexOfExt (str, what, pos, id){                                      // lite_parser.jsxi:123
		if (what === LiteParser.EOF){                                              // lite_parser.jsxi:124
			return { id: id, index: str.length, value: what };
		} else if (what instanceof RegExp){                                        // lite_parser.jsxi:130
			var temp = str.substring (pos).match (what);
			return {
				id: id,                                                            // lite_parser.jsxi:133
				index: temp ? temp.index + pos : - 1,                              // lite_parser.jsxi:134
				value: temp ? temp [0] : null,                                     // lite_parser.jsxi:135
				raw: temp
			};
		} else if (typeof what === 'string'){                                      // lite_parser.jsxi:138
			return { id: id, index: str.indexOf (what, pos), value: what };
		} else
			return console.assert (true, 'Invalid argument type');                 // lite_parser.jsxi:145
	}
	
	var value = { index: Number.POSITIVE_INFINITY },                               // lite_parser.jsxi:147
		oldIndex = this.index,                                                     // lite_parser.jsxi:148
		bindedObj,                                                                 // lite_parser.jsxi:149
		result,                                                                    // lite_parser.jsxi:150
		temp;                                                                      // lite_parser.jsxi:151
	
	{
		var __1q = this.binded;
		
		for (var i = 0; i < __1q.length; i ++){                                    // lite_parser.jsxi:153
			var arg = __1q [i];
			
			temp = indexOfExt (this.data, arg.match, this.index, i);               // lite_parser.jsxi:154
			
			if (temp.index !== - 1 && temp.index < value.index){                   // lite_parser.jsxi:156
				value = temp;                                                      // lite_parser.jsxi:157
				bindedObj = arg;                                                   // lite_parser.jsxi:158
			}
		}
		
		__1q = undefined;
	}
	
	for (var i = 0; i < args.length; i ++){                                        // lite_parser.jsxi:162
		var arg = args [i];
		
		temp = indexOfExt (this.data, arg, this.index, i);                         // lite_parser.jsxi:163
		
		if (temp.index !== - 1 && temp.index < value.index){                       // lite_parser.jsxi:165
			value = temp;                                                          // lite_parser.jsxi:166
			bindedObj = null;                                                      // lite_parser.jsxi:167
		}
	}
	
	if (value.index === Number.POSITIVE_INFINITY)                                  // lite_parser.jsxi:171
		return null;
	
	this.moveTo (value);                                                           // lite_parser.jsxi:174
	
	if (!bindedObj){                                                               // lite_parser.jsxi:176
		result = value;                                                            // lite_parser.jsxi:177
	} else if (this.debugMode){                                                    // lite_parser.jsxi:178
		var from = this.lineNumber,                                                // lite_parser.jsxi:179
			fromIndex = this.index,                                                // lite_parser.jsxi:180
			temp = bindedObj.handler.call (this, value),                           // lite_parser.jsxi:181
			to = this.lineNumber,                                                  // lite_parser.jsxi:182
			toIndex = this.index,                                                  // lite_parser.jsxi:183
			log;                                                                   // lite_parser.jsxi:184
		
		if (bindedObj.comment){                                                    // lite_parser.jsxi:186
			log = '[LiteParser] ' + (typeof bindedObj.comment === 'string' ? bindedObj.comment : bindedObj.comment.name) + ' at ' + from + ' (' + fromIndex + ':' + toIndex + '): ' + (typeof bindedObj.comment === 'string' ? this.data.substring (fromIndex, toIndex) : bindedObj.comment.call (this, fromIndex, toIndex, value)).replace (/[\n\r]+/g, '\\n');
			
			if (log.length > 100)                                                  // lite_parser.jsxi:200
				log = log.substr (0, 48) + '...' + log.slice (- 49);               // lite_parser.jsxi:201
			
			console.warn (log);                                                    // lite_parser.jsxi:203
		}
		
		result = temp ? this.innerFindNext (args, fixedMode) : null;               // lite_parser.jsxi:206
	} else
		result = bindedObj.handler.call (this, value) ? this.innerFindNext (args, fixedMode) : null;
	
	if (fixedMode)                                                                 // lite_parser.jsxi:211
		this.index = oldIndex;                                                     // lite_parser.jsxi:212
	return result;                                                                 // lite_parser.jsxi:214
};
LiteParser.prototype.moveTo = function (arg){                                      // lite_parser.jsxi:217
	this.index = arg.index + arg.value.length;                                     // lite_parser.jsxi:218
};
LiteParser.prototype.findHere = function (arg){                                    // lite_parser.jsxi:221
	var args = Array.prototype.slice.call (arguments, arg instanceof Array ? 1 : 0), 
		operators = arg instanceof Array ? arg : [ '(', '{', '[' ],                // lite_parser.jsxi:223
		others = { '(': ')', '{': '}', '[': ']' },                                 // lite_parser.jsxi:224
		found,                                                                     // lite_parser.jsxi:225
		temp;                                                                      // lite_parser.jsxi:226
	
	while (found = this.innerFindNext (args.concat (operators))){                  // lite_parser.jsxi:228
		temp = operators.indexOf (found.value);                                    // lite_parser.jsxi:229
		
		if (operators.indexOf (found.value) !== - 1){                              // lite_parser.jsxi:230
			console.assert (others [found.value],                                  // lite_parser.jsxi:231
				'Pair for ' + found.value + ' not found');                         // lite_parser.jsxi:231
			this.findHere (others [found.value]);                                  // lite_parser.jsxi:232
		} else if (args.indexOf (found.value) !== - 1)                             // lite_parser.jsxi:233
			return found;                                                          // lite_parser.jsxi:234
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
	this.rawBody = String (macroBody);                                             // macro.jsxi:13
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

;

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
		var __1r = Macro.Defaults;
		
		for (var key in __1r){
			var value = __1r [key];
			
			if (typeof value === 'function')                                       // macro.jsxi:59
				result [key] = value.call (obj);                                   // macro.jsxi:60
			else
				result [key] = value;                                              // macro.jsxi:62
		}
		
		__1r = undefined;
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
		var __1t = phase.used;
		
		for (var __1s = 0; __1s < __1t.length; __1s ++){
			var entry = __1t [__1s];
			
			queue.add (macroStorage.get, entry.macro, this.level, this.context);   // macro.jsxi:128
			variables.push (entry.name + ' = function (){ return this.macros.' + entry.macro + '.call (this.context, [].slice.call (arguments)) }.bind (this)');
		}
		
		__1t = undefined;
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
			require: (function (arg, from){                                        // macro.jsxi:161
				return require (path.resolve (that.context.file.dirname, from || '.', 'node_modules', arg));
			}), 
			defineMacro: (function (name, arguments, body){                        // macro.jsxi:164
				if (body === undefined){                                           // macro.jsxi:165
					body = arguments;                                              // macro.jsxi:166
					arguments = [];                                                // macro.jsxi:167
				}
				
				macroStorage.add (new Macro (name,                                 // macro.jsxi:170
					that.level,                                                    // macro.jsxi:172
					that.context,                                                  // macro.jsxi:173
					typeof arguments === 'string' ? arguments.split (',').map (Function.prototype.call.bind (String.prototype.trim)) : arguments, 
					body));                                                        // macro.jsxi:177
			})
		};
	
	try {
		{
			var __1u = this.arguments;
			
			for (var id = 0; id < __1u.length; id ++){                             // macro.jsxi:182
				var arg = __1u [id];
				
				if (arg.type === 'callback' && typeof args [id] !== 'function')    // macro.jsxi:183
					throw new Error ('Wrong arg');                                 // macro.jsxi:184
			}
			
			__1u = undefined;
		}
		return this.callee.apply (object,                                          // macro.jsxi:186
			args.map ((function (value, pos){                                      // macro.jsxi:187
				switch (this.arguments [pos] && this.arguments [pos].type){        // macro.jsxi:188
					case 'boolean':                                                // macro.jsxi:189
						return !!value;                                            // macro.jsxi:189
					case 'string':                                                 // macro.jsxi:190
						return String (value);                                     // macro.jsxi:190
					case 'number':                                                 // macro.jsxi:191
						return + value;                                            // macro.jsxi:191
					case 'object':                                                 // macro.jsxi:192
						return typeof value === 'object' ? value : null;           // macro.jsxi:192
					default:
						return value;                                              // macro.jsxi:193
				}
			}).bind (this)));                                                      // macro.jsxi:195
	} catch (e){
		if (e.name === 'MacroError')                                               // macro.jsxi:197
			throw e;                                                               // macro.jsxi:198
		else
			throw new MacroError (this.name, args, context, e);                    // macro.jsxi:200
	} 
};

function MacroError (macroName, callArgs, context, originalError, message){        // macro.jsxi:204
	var result = new Error ('@' + macroName + (callArgs ? '(' + Array.prototype.map.call (callArgs, 
		function (arg){                                                            // macro.jsxi:206
			var j = JSON.stringify (arg) || '' + arg;
			return j.length > 10 ? j.slice (0, 7) + '...' : j;                     // macro.jsxi:208
		}).join (', ') + ')' : '(?)') + ' [' + context + ']:\n\t' + (originalError && originalError.stack ? originalError.stack.replace (/\n/g, '\n\t') : originalError || '<unknown error>'));
	
	result.name = 'MacroError';                                                    // macro.jsxi:211
	return result;                                                                 // macro.jsxi:212
}

;

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
		this.context,                                                              // macro_call.jsxi:30
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
		var __1v = this.arguments;
		
		for (var i = 0; i < __1v.length; i ++){                                    // macro_call.jsxi:73
			var arg = __1v [i];
			
			queue.add (cast, this.macro.arguments [i], arg);                       // macro_call.jsxi:74
		}
		
		__1v = undefined;
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
		
		this.log ('call complete');                                                // macro_call.jsxi:96
		
		if (answer === undefined)                                                  // macro_call.jsxi:98
			answer = '';                                                           // macro_call.jsxi:99
		
		this.state = MacroCall.STATE_CALLED;                                       // macro_call.jsxi:101
		this.result = answer;                                                      // macro_call.jsxi:102
		MacroCall.waitingForCallback --;                                           // macro_call.jsxi:104
		callback ();                                                               // macro_call.jsxi:105
	}).bind (this);                                                                // macro_call.jsxi:106
	
	if (this.macro.asyncMode){                                                     // macro_call.jsxi:108
		var temp = this.arguments,                                                 // macro_call.jsxi:109
			delta = this.macro.arguments.length - (temp.length + 1);               // macro_call.jsxi:110
		
		if (delta < 0)                                                             // macro_call.jsxi:112
			temp = temp.slice (0, delta);                                          // macro_call.jsxi:113
		else if (delta > 0)                                                        // macro_call.jsxi:114
			temp = temp.concat (new Array (delta));                                // macro_call.jsxi:115
		
		temp.push (resultHandler);                                                 // macro_call.jsxi:117
		this.macro.call (this.context, temp);                                      // macro_call.jsxi:118
	} else
		resultHandler (this.macro.call (this.context, this.arguments));            // macro_call.jsxi:120
};
MacroCall.prototype.processResult = function (callback){                           // macro_call.jsxi:123
	console.assert (this.state == MacroCall.STATE_CALLED,                          // macro_call.jsxi:124
		'Wrong state (' + this.state + ')');                                       // macro_call.jsxi:124
	this.state = MacroCall.STATE_WAITING;                                          // macro_call.jsxi:125
	
	var doMacros = false,                                                          // macro_call.jsxi:127
		result = this.result,                                                      // macro_call.jsxi:128
		type = this.macro.type;                                                    // macro_call.jsxi:129
	
	if (type === null && result && typeof result.type === 'string'){               // macro_call.jsxi:131
		type = result.type;                                                        // macro_call.jsxi:132
		result = result.value;                                                     // macro_call.jsxi:133
	}
	
	if (type !== null){                                                            // macro_call.jsxi:136
		switch (type){                                                             // macro_call.jsxi:137
			case 'void':                                                           // macro_call.jsxi:138
				result = '';                                                       // macro_call.jsxi:139
				
				break;
			case 'raw':                                                            // macro_call.jsxi:141
				doMacros = true;                                                   // macro_call.jsxi:142
				result = String (result);                                          // macro_call.jsxi:143
				
				break;
			case 'raw-nm':                                                         // macro_call.jsxi:145
				result = String (result);                                          // macro_call.jsxi:146
				
				break;
			case 'boolean':                                                        // macro_call.jsxi:148
				result = result ? 'true' : 'false';                                // macro_call.jsxi:149
				
				break;
			case 'number':                                                         // macro_call.jsxi:151
				result = + result;                                                 // macro_call.jsxi:152
				
				break;
			case 'object':                                                         // macro_call.jsxi:154
				if (typeof result !== 'object')                                    // macro_call.jsxi:155
					throw new Error ('Type mismatch (waiting for object, but get ' + typeof result + ')');
				
				doMacros = true;                                                   // macro_call.jsxi:157
				result = JSON.stringify (result);                                  // macro_call.jsxi:158
				
				break;
			case 'string':                                                         // macro_call.jsxi:160
				doMacros = true;                                                   // macro_call.jsxi:161
				result = JSON.stringify (String (result));                         // macro_call.jsxi:162
				
				break;
			default:
				throw new Error ('Invalid macro type (' + this.name + ', ' + this.macro.type + ')');
		}
	} else if (result !== undefined){                                              // macro_call.jsxi:167
		doMacros = true;                                                           // macro_call.jsxi:168
		result = String (result);                                                  // macro_call.jsxi:169
	} else
		result = '';                                                               // macro_call.jsxi:171
	
	var resultHandler = (function (result){                                        // macro_call.jsxi:173
		this.log ('result processed');                                             // macro_call.jsxi:174
		this.state = MacroCall.STATE_FINISHED;                                     // macro_call.jsxi:175
		this.result = result;                                                      // macro_call.jsxi:176
		callback ();                                                               // macro_call.jsxi:178
	}).bind (this);                                                                // macro_call.jsxi:179
	
	if (doMacros)                                                                  // macro_call.jsxi:181
		macrosProcess (result, this.level, this.context, resultHandler);           // macro_call.jsxi:182
	else
		resultHandler (result);                                                    // macro_call.jsxi:184
};
MacroCall.prototype.process = function (callback){                                 // macro_call.jsxi:187
	new Queue (this, Queue.MODE_SEQUENT).description ('macro call process').add (this.findMacro).add (this.prepareArguments).add (this.realMacroCall).add (this.processResult).run (function (arg){
		console.assert (this.state == MacroCall.STATE_FINISHED,                    // macro_call.jsxi:195
			'Wrong state (' + this.state + ')');                                   // macro_call.jsxi:195
		
		if (callback !== undefined)                                                // macro_call.jsxi:196
			callback (this.result);                                                // macro_call.jsxi:197
	});
};

function MacroNotFoundError (name, args, parent){                                  // macro_call.jsxi:201
	this.name = 'MacroNotFoundError';                                              // macro_call.jsxi:202
	this.macroName = name;                                                         // macro_call.jsxi:203
	this.message = 'Macro @' + name + ' not found';                                // macro_call.jsxi:204
}

;

MacroNotFoundError.prototype = Error.prototype;                                    // macro_call.jsxi:207

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
		
		if (temp && (temp.value === '{' || temp.value === '(') && liteParser.lineNumberAt (temp.index) === liteParser.lineNumber){
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
		var __21 = temp.calls;
		
		for (var __20 = 0; __20 < __21.length; __20 ++){
			var call = __21 [__20];
			
			queue.add (call, call.process.bind (call));                            // macro_process.jsxi:233
		}
		
		__21 = undefined;
	}
	
	queue.run (function (arg){                                                     // macro_process.jsxi:235
		for (var __22 = 0; __22 < arg.length; __22 ++){                            // macro_process.jsxi:236
			var entry = arg [__22];
			
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
		var __23 = this.requests;
		
		for (var pos = 0; pos < __23.length; pos ++){                              // macro_storage.jsxi:18
			var request = __23 [pos];
			
			if (request [0] === macro.name && this.get (request))                  // macro_storage.jsxi:19
				this.requests.splice (pos --, 1);                                  // macro_storage.jsxi:20
		}
		
		__23 = undefined;
	}
};
MacroStorage.prototype.get = function (name, level, context, callback){            // macro_storage.jsxi:23
	var result = undefined,                                                        // macro_storage.jsxi:24
		max = - 1,                                                                 // macro_storage.jsxi:25
		requestMode = typeof name !== 'string',                                    // macro_storage.jsxi:26
		temp;                                                                      // macro_storage.jsxi:27
	
	if (requestMode){                                                              // macro_storage.jsxi:29
		callback = name [3];                                                       // macro_storage.jsxi:30
		context = name [2];                                                        // macro_storage.jsxi:31
		level = name [1];                                                          // macro_storage.jsxi:32
		name = name [0];                                                           // macro_storage.jsxi:33
	} else
		this.log ('requested @' + name + (level ? ' (at ' + level + ')' : '') + '');
	
	if (this.macros [name]){                                                       // macro_storage.jsxi:37
		var __25 = this.macros [name];
		
		for (var __24 = 0; __24 < __25.length; __24 ++){
			var macro = __25 [__24];
			
			if (macro.level.length >= max && macro.level.length <= level.length && level.substring (0, macro.level.length) === macro.level){
				result = macro;                                                    // macro_storage.jsxi:43
				max = macro.level.length;                                          // macro_storage.jsxi:44
			}
		}
		
		__25 = undefined;
	}
	
	if (result !== undefined){                                                     // macro_storage.jsxi:47
		result.initialize (function (arg){                                         // macro_storage.jsxi:48
			return callback (result);                                              // macro_storage.jsxi:48
		});
		
		if (requestMode)                                                           // macro_storage.jsxi:50
			return true;
	} else if (!requestMode)                                                       // macro_storage.jsxi:52
		this.requests.push (arguments);                                            // macro_storage.jsxi:53
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

var repeatStrings = {}, repeatStringPre = {};

function repeatString (char, count){                                               // utils.jsxi:4
	if (count <= 0){                                                               // utils.jsxi:5
		return '';                                                                 // utils.jsxi:6
	} else if (count < 10){                                                        // utils.jsxi:7
		if (!repeatStringPre [char])                                               // utils.jsxi:8
			repeatStringPre [char] = [                                             // utils.jsxi:9
				1,                                                                 // utils.jsxi:9
				2, 
				3, 
				4, 
				5, 
				6, 
				7, 
				8, 
				9, 
				10
			].map (function (arg){                                                 // utils.jsxi:9
				return new Array (arg + 1).join (char);                            // utils.jsxi:9
			});
		return repeatStringPre [char][count - 1];                                  // utils.jsxi:11
	} else {
		if (!repeatStrings [char])                                                 // utils.jsxi:13
			repeatStrings [char] = {};                                             // utils.jsxi:14
		
		var temp = Math.ceil (count / 10);
		
		if (!repeatStrings [char].hasOwnProperty (temp))                           // utils.jsxi:17
			repeatStrings [char][temp] = new Array (temp * 10 + 1).join (' ');     // utils.jsxi:18
		return repeatStrings [char][temp].substring (0, count);                    // utils.jsxi:19
	}
}

process.on ('uncaughtException',                                                   // utils.jsxi:23
	function (arg){                                                                // utils.jsxi:23
		return console.fatal ('Uncaught exception!\n' + (arg && arg.stack ? arg.stack : String (arg)));
	});
console.fatal = function (){                                                       // utils.jsxi:25
	console.warn ('Fatal error!');                                                 // utils.jsxi:26
	console.warn.apply (console, arguments);                                       // utils.jsxi:27
	console.warn = function (arg){};
	setTimeout (function (arg){                                                    // utils.jsxi:29
		return process.exit (1);                                                   // utils.jsxi:29
	}, 
	500);
};
console.json = function (obj){                                                     // utils.jsxi:32
	console.log (JSON.stringify (obj, false, 
		4));                                                                       // utils.jsxi:33
};

function set (to, from){                                                           // utils.jsxi:36
	if (to instanceof Array && from instanceof Array){                             // utils.jsxi:37
		to.length = from.length;                                                   // utils.jsxi:38
		
		for (var index = 0; index < from.length; index ++){                        // utils.jsxi:39
			var element = from [index];
			
			to [index] = element;                                                  // utils.jsxi:40
		}
	} else {
		for (var n in to)                                                          // utils.jsxi:42
			delete to [n];                                                         // utils.jsxi:43
		
		for (var n in from)                                                        // utils.jsxi:44
			to [n] = from [n];                                                     // utils.jsxi:45
	}
}

function convert (jsxCode, options){                                               // utils.jsxi:49
	var parsed;
	
	if (typeof jsxCode === 'string'){                                              // utils.jsxi:52
		try {
			parsed = jsxParse (jsxCode, options);                                  // utils.jsxi:54
		} catch (e){
			console.fatal ('Parsing failed (' + options.filename + ')' + ('\n' + jsxCode.trim ()).replace (/\n/g, '\n> ') + '\n\n' + e.stack);
		} 
	} else
		parsed = jsxCode;                                                          // utils.jsxi:60
	
	try {
		if (options.filename === 'result')                                         // utils.jsxi:63
			badMode = 1;                                                           // utils.jsxi:64
		return new Generator ().generate (parsed);                                 // utils.jsxi:65
	} catch (e){
		console.fatal ('Generating failed (' + options.filename + ')\n' + e.stack);
	} 
}

var previousT = (function (arg){                                                   // utils.jsxi:71
	return arg [0] * 1e9 + arg [1];                                                // utils.jsxi:71
})(process.hrtime ());

function addLog (p, key, fn){                                                      // utils.jsxi:73
	if (!p || !p.prototype){                                                       // utils.jsxi:74
		fn = key;                                                                  // utils.jsxi:75
		key = p;                                                                   // utils.jsxi:76
		p = null;                                                                  // utils.jsxi:77
	}
	
	if (typeof key === 'number')                                                   // utils.jsxi:80
		key = new Array (key + 1).join ('  ');                                     // utils.jsxi:81
	else
		key = key + 1;                                                             // utils.jsxi:83
	
	function tstr (n){                                                             // utils.jsxi:85
		var s = String (n / 1e9 | 0), ms = String (n % 1e9 / 1e6 | 0);
		
		while (s.length < 2)                                                       // utils.jsxi:89
			s = '0' + s;                                                           // utils.jsxi:90
		
		while (ms.length < 3)                                                      // utils.jsxi:92
			ms = '0' + ms;                                                         // utils.jsxi:93
		return '[' + s + '.' + ms + ']';                                           // utils.jsxi:95
	}
	
	var size = 32,                                                                 // utils.jsxi:98
		r = function (arg){                                                        // utils.jsxi:99
			var f = [ key + (typeof fn === 'function' ? fn.call (this) : fn) + ':' ], 
				h = process.hrtime (),                                             // utils.jsxi:101
				t = h [0] * 1e9 + h [1];                                           // utils.jsxi:102
			
			if (f [0].length > size)                                               // utils.jsxi:104
				f [0] = f [0].substr (0, size - 4) + '...:';                       // utils.jsxi:105
			
			f [0] += new Array (1 + size - f [0].length).join (' ');               // utils.jsxi:106
			f.push.apply (f, arguments);                                           // utils.jsxi:107
			f.unshift (tstr (t - previousT));                                      // utils.jsxi:108
		};
	return p ? (p.prototype.log = r) : r;                                          // utils.jsxi:113
}

function isEmpty (obj){                                                            // utils.jsxi:116
	for (var n in obj)                                                             // utils.jsxi:117
		return false;
	return true;
}

var $ = {                                                                          // utils.jsxi:122
	extend: (function (){                                                          // utils.jsxi:122
		function extend (target, source, deep){                                    // utils.jsxi:126
			for (var key in source){                                               // utils.jsxi:127
				var value = source [key];
				
				if (deep && (typeof value === 'object' || value instanceof Array)){
					if (value instanceof Array && !(target [key] instanceof Array))
						target [key] = [];                                         // utils.jsxi:130
					else if (typeof value === 'object' && typeof target [key] !== 'object')
						target [key] = {};                                         // utils.jsxi:132
					
					extend (target [key], value, deep);                            // utils.jsxi:134
				} else if (value !== undefined)                                    // utils.jsxi:135
					target [key] = value;                                          // utils.jsxi:136
			}
		}
		return (function (target){                                                 // utils.jsxi:138
			var deep, args = Array.prototype.slice.call (arguments, 1);
			
			if (typeof target == 'boolean'){                                       // utils.jsxi:142
				deep = target;                                                     // utils.jsxi:143
				target = args.shift ();                                            // utils.jsxi:144
			}
			
			args.forEach (function (arg){                                          // utils.jsxi:147
				return extend (target, arg, deep);                                 // utils.jsxi:147
			});
			return target;                                                         // utils.jsxi:148
		});
	})()
};
