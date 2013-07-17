var extenders = `String.prototype.format=function(){function e(a){return-1!==(a+="").indexOf("%")?a.replace(/%/g,d||(d="_RND_"+Math.random())):a}var a=""+this,d,c,b;for(c=0;c<arguments.length;c++)if((b=arguments[c])&&!b.substring&&-1==a.indexOf("%%"))for(var f in b)a=a.split("%"+f.toUpperCase()+"%").join(e(b[f]));else a=a.replace("%%",e(b));return d?a.split(d).join("%"):a};
Array.prototype.remove=function(a,b){var c=this.slice((b||a)+1||this.length);this.length=0>a?this.length+a:a;return this.push.apply(this,c)};`;

eval (extenders);

module Node {
	var optimist = safeAccess ('optimist', 'correct interact in shell'),
		argv;
	
	export var fs   = safeAccess ('fs'),
	           cp   = safeAccess ('child_process'),
	           path = safeAccess ('path');
	
	export function fatalError (msg){
		for (var i = 0; i < arguments.length; i ++)
			console.error (arguments [i]);
		process.exit (1);
	}
	
	export function safeAccess (what, purpose){
		var cache;
		
		return lambda 
			try 
				return cache || (cache = require (what));
			catch
				fatalError ('Please, install `%%` for %%.'.format (what, purpose || 'work'), 
					'> npm install -g `%%`.'.format (what));
	}
	
	export function args (usage, args){
		if (usage && args){
			var result = optimist ().usage (usage);
			for (var n in args)
				result = result.options (n, args [n]);
			argv = result.argv;
		}
		
		return argv;
	}
	
	export function showHelp ()
		optimist ().showHelp ();
		
	export function readFile (file)
		return fs ().readFileSync (file, 'utf-8');
		
	export function writeFile (file, content)
		return fs ().writeFileSync (file, content, 'utf-8');
		
	export function resolve (name)
		return path ().resolve (__dirname, name)
}

module Format {
	import Node;
		
	var eol = '\n';
	
	var additional, jsx;
		
	function reset (){
		additional = {
			userscript: [],
			php: false
		};
		
		jsx = [];
	}
	
	function commentParse (target, comment){
		comment.replace (/\/\/\s*@([^\s]+)\s+([^\n]+?)\s*\n/g, lambda (a, key, value)
			target.push ({ key: key, value: value }));
		return target;
	}
	
	var f = lambda
			if (!types [arg.type])
				Node.fatalError ('No formatter for type: ' + arg.type, arg)
			else 
				return types [arg.type](arg),
		types = {
			Program:                  lambda arg.elements.map (f).join (eol),
			Raw:                      lambda arg.value,
			UserScript:               lambda commentParse (additional.userscript, arg.value) && '',
			Jsx:                      lambda commentParse (jsx, arg.value) && '',
			NumericLiteral:           lambda arg.value,
			UnaryExpression:          lambda arg.operator + ' ' + f (arg.expression),
			BinaryExpression:         lambda f (arg.left) + ' ' + arg.operator + ' ' + f (arg.right),
			ConditionalExpression:    lambda f (arg.condition) + ' ? ' + f (arg.trueExpression) + ' : ' + f (arg.falseExpression),
			ParenthesizedExpression:  lambda '(' + f (arg.value) + ')',
			VariableStatement:        lambda 'var ' + arg.declarations.map (f).join (', ') + ';',
			VariableDeclarations:     lambda 'var ' + arg.declarations.map (f).join (', '),
			VariableDeclaration:      lambda arg.value ? arg.name + ' = ' + f (arg.value) : arg.name,
			FunctionCall:             lambda f (arg.name) + ' (' + arg.arguments.map (f).join (', ') + ')',
			Function:                 lambda 'function' + (arg.name ? ' ' + arg.name : '') + ' (' + arg.params.join (',') + '){' + eol 
				+ arg.elements.map (f).join (eol) + eol + '}',
			StringLiteral:            lambda JSON.stringify (arg.value),
			BooleanLiteral:           lambda arg.value ? 'true' : 'false',
			NullLiteral:              lambda 'null',
			Variable:                 lambda arg.name,
			PropertyAccess:           lambda f (arg.base) + (arg.name.type ? ' [' + f (arg.name) + ']' : '.' + arg.name),
			IfStatement:              lambda 'if (' + f (arg.condition) + ')' + eol + f (arg.ifStatement) 
				+ (arg.elseStatement ? eol + 'else' + eol + f (arg.elseStatement) : ''),
			Block:                    lambda '{' + eol + arg.statements.map (f).join (eol) + eol + '}',
			ReturnStatement:          lambda arg.value ? 'return ' + f (arg.value) + ';' : 'return;',
			EmptyStatement:           lambda ';',
			ExpressionStatement:      lambda f (arg.value) + ';',
			AssignmentExpression:     lambda f (arg.left) + ' ' + arg.operator + ' ' + f (arg.right),
			PostfixExpression:        lambda f (arg.expression) + arg.operator,
			ArrayLiteral:             lambda '[' + arg.elements.map (f).join (',') + ']',
			ObjectLiteral:            lambda '{' + arg.properties.map (f).join (',') + '}',
			RegularExpressionLiteral: lambda '/' + arg.body + '/' + arg.flags,
			This:                     lambda 'this',
			ThrowStatement:           lambda 'throw ' + f (arg.exception) + ';',
			ForStatement:             lambda 'for (' + (arg.initializer ? f (arg.initializer) : '') + '; ' + eol 
				+ (arg.test ? f (arg.test) : '') + '; ' + (arg.counter ? f (arg.counter) : '') + ')' + eol + f (arg.statement),
			ForInStatement:           lambda 'for (' + f (arg.iterator) + ' in ' + f (arg.collection) + ')' + eol + f (arg.statement),
			WhileStatement:           lambda 'while (' + f (arg.condition) + ')' + eol + f (arg.statement),
			DoWhileStatement:         lambda 'do' + eol + f (arg.statement) + eol + ' while (' + f (arg.condition) + ');',
			SwitchStatement:          lambda 'switch (' + f (arg.expression) + '){' + eol + arg.clauses.map (f).join (eol) + eol + '}',
			CaseClause:               lambda 'case ' + f (arg.selector) + ':' + eol + arg.statements.map (f).join (eol),
			DefaultClause:            lambda 'default:' + arg.statements.map (lambda f (arg)).join (' '),
			BreakStatement:           lambda arg.label ? 'break ' + arg.label + ';' : 'break;',
			ContinueStatement:        lambda arg.label ? 'continue ' + arg.label + ';' : 'continue;',
			TryStatement:             lambda 'try' + (arg.block.type == 'Block' ? f (arg.block) : '{' + eol + f (arg.block) + eol + '}') 
				+ (arg ['catch'] ? f (arg ['catch']) : '') + (arg ['finally'] ? f (arg ['finally']) : '')
				+ (!arg ['catch'] && !arg ['finally'] ? 'catch (e){}' : ''),
			Catch:                    lambda 'catch (' + arg.identifier + ')' 
				+ (arg.block.type == 'Block' ? f (arg.block) : '{' + eol + f (arg.block) + eol + '}'),
			Finally:                  lambda 'finally' 
				+ (arg.block.type == 'Block' ? f (arg.block) : '{' + eol + f (arg.block) + eol + '}'),
			PropertyAssignment:       lambda JSON.stringify (arg.name) + ':' + f (arg.value),
			NewOperator:              lambda 'new ' + f (arg.constructor) + '(' + arg.arguments.map (f).join (', ') + ')',
			GetterDefinition:         lambda 'get ' + arg.name + ' (){' + arg.body.map (f).join (eol) + '}',
			SetterDefinition:         lambda 'set ' + arg.name + ' (' + arg.param + '){' + arg.body.map (f).join (eol) + '}',
			LabelledStatement:        lambda arg.label + ':' + f (arg.statement),
			WithStatement:            lambda 'with (' + f (arg.environment) + '){' + eol + f (arg.statement) + eol + '}',
			PhpLiteral:               lambda {
				additional.php = true;
				return '/*!<? echo "*"."/"; include "' + arg.value + '"; echo "||/*" ?>*/ null'
			}
		};
		
	export function work (arg){
		reset ();
	
		return {
			code: f (arg).trim (), 
			additional: additional,
			jsx: jsx
		}
	}
}

module Parser {
	import Node, JsCompress;
	
	var source, 
		builded, 
		loaded;
	
	var peg = Node.safeAccess ('pegjs', 'build parser');
			
	function getNearFile (file)
		return Node.path ().resolve (__dirname, file);
		
	function rebuildParser (){
		if (!Node.fs ().existsSync (source))
			Node.fatalError ('Parser source not found.');
	
		try {
			var tobuild = Node.readFile (source, 'utf8'),
				result  = 'exports.parser=' + peg ().buildParser (tobuild, { cache: true, trackLineAndColumn: false }).toSource ();
			
			result = result.replace ('return "Expected " + expectedHumanized', 
				'return "[" + line + ": " + column + "] " + "Expected " + expectedHumanized');
			
			try result = JsCompress.work (result);
			Node.writeFile (builded, result, 'utf8');
		} catch
			Node.fatalError ('Error while building parser:', e.stack);
	}
	
	export function init (){
		source  = getNearFile ('js-ext.pegjs');
		builded = getNearFile ('js-ext.cache');
	}
	
	export function getReady (){
		if (Node.args ().r || !Node.fs ().existsSync (builded))
			rebuildParser ();
		loaded = require (builded).parser;
	}
	
	export function work (code)	
		try 
			return loaded.parse (code);
		catch 
			Node.fatalError ('Error while parsing: ' + e, e.stack);
}

module Converter {
	import Node;
	
	var moduleName = '__m',
		minimize = Node.safeAccess ('minimize', 'compress html'),
		minimizeInstance,
		modules;
			
	function jsonFunction (name, content)
		return { type: 'PropertyAssignment', name: name, value: { type: 'Function', name: null, params: [], elements: content }};
		
	var types = {
		Function: 
			lambda {		
				var initialize = [];
				return {
					type: 'Function',
					name: arg.name,
					exportFlag: arg.exportFlag,
					params: arg.params.map (lambda
							if (arg && arg.type == 'IdentifierWithDefault'){
								initialize.push ({
									type: 'IfStatement',
									condition: {
										type: 'BinaryExpression', operator: '===',
										left:  { type: 'Variable', name: arg.identifier },
										right: { type: 'Variable', name: 'undefined' }
									},
									ifStatement: {
										type: 'ExpressionStatement',
										value: {
											type: 'AssignmentExpression', operator: '=',
											left: { type: 'Variable', name: arg.identifier },
											right: clone (arg.value)
										}
									},
									elseStatement: null
								});
								return arg.identifier;
							} else
								return arg;
						),
					elements: initialize.length ? initialize.concat (clone (arg.elements)) : clone (arg.elements)
				}
			},
		
		Lambda:
			lambda types.Function ({
				type: 'Function',
				name: null,
				params: arg.params.length == 0 ? ['arg'] : arg.params,
				elements: arg.element.type == 'Block' 
					? arg.element.statements 
					: [ arg.element.type == 'ExpressionStatement' 
						? { type: 'ReturnStatement', value: clone (arg.element.value) } 
						: arg.element ]
			}),
		
		StringLiteral: 
			lambda {
				var result;
				
				switch (arg.special){
					case 'h':
						var a = arg.value.replace (/<([a-z]+)(\s[^>]+?)?\s*\/>/g, '<$1$2></$1>');
						if (!minimizeInstance)
							minimizeInstance = new (minimize ())({
								empty: true, cdata: true, comments: false, spare: true, quotes: true 
							});
						minimizeInstance.parse (a, lambda (error, data) result = data);
						break;
					case 'c':
						result = arg.value.replace (/\s+/g, ' ').replace (/\s*([{};:])\s*/g, '$1').trim ();
						break;
					default:
						result = arg.value;
				}
				
				return { type: "StringLiteral", value: result };
			},
			
		Module:
			lambda {
				modules = true;
				
				var getImports 		   = [], 
					setupImports 	   = [],
					exported 		   = [], 
					variableInitialize = [],
					newElements 	   = [];
		
					for (var i = 0; i < arg.elements.length; i ++){
						var e = arg.elements [i];
						
						if (e.type === 'ImportStatement'){
							newElements.push ({
								type: 'VariableStatement',
								declarations: (lambda {
									for (var k = 0; k < arg.length; k ++){
										var clear = arg [k][0] === '@' ? arg [k].slice (1) : arg [k];
										getImports.push ({ type: 'StringLiteral', value: arg [k] });
										setupImports.push ({
											type: 'ExpressionStatement',
											value: {
												type: 'AssignmentExpression', operator: '=',
												left: { type: 'Variable', name: clear },
												right: { 
													type: 'PropertyAccess', 
													base: { type: 'Variable', name: "arguments" },
													name: { type: 'NumericLiteral', value: setupImports.length }
												}
											}
										});
										
										arg [k] = { type: 'VariableDeclaration', name: clear, value: null }
									}
									
									return arg;
								})(clone (e.declarations))
							});
						} else {
							var newE = clone (e);
							
							if (newE.type === 'Function' && newE.exportFlag)
								exported.push ({
									type: 'PropertyAssignment',
									name: newE.name,
									value: { type: 'Variable', name: newE.name }
								});
							else if (newE.type === 'VariableStatement')
								for (var k = 0; k < newE.declarations.length; k ++){
									if (newE.exportFlag)
										exported.push ({
											type: 'GetterDefinition',
											name: newE.declarations [k].name,
											body: [{ type: 'ReturnStatement', value: { type: 'Variable', name: newE.declarations [k].name }}]
										});
									if (newE.declarations [k].value !== null){
										variableInitialize.push ({
											type: 'ExpressionStatement',
											value: {
												type: 'AssignmentExpression', operator: '=',
												left: { type: 'Variable', name: newE.declarations [k].name },
												right: clone (newE.declarations [k].value)
											}
										});
										
										newE.declarations [k].value = null;
									}
								}
							
							newElements.push (newE);
						}
					}
					
					exported.push (jsonFunction ('__gi', [{ 
							type: 'ReturnStatement', 
							value: { type: 'ArrayLiteral', elements: getImports }
						}]),
						jsonFunction ('__si', setupImports),
						jsonFunction ('__in', variableInitialize));		
					newElements.push ({ type: 'ReturnStatement', value: { type: 'ObjectLiteral', properties: exported }});
					
					return {
						type: 'ExpressionStatement',
						value: {
							type: 'FunctionCall', name: { type: 'Variable', name: moduleName },
							arguments: [
								{ type: 'StringLiteral', value: clone (arg.identifier) },
								{ type: 'Function', name: null, params: [], elements: newElements }
							]
						}
					}
				}
	};
	
	function clone (obj)	
		if (typeof obj !== 'object' || !obj){
			return obj;
		} else if (obj.indexOf){
			var r = [];
			for (var i = 0; i < obj.length; i ++)
				r.push (clone (obj [i]));
			return r;
		} else if (types [obj.type]){
			return types [obj.type](obj);
		} else {
			var r = {};
			for (var n in obj)
				r [n] = clone (obj [n]);
			return r;
		}
	
	export function work (parsed){
		modules = false;
	
		return {
			tree: clone (parsed),
			modules: modules
		};
	}
}

module JsCompress {
	import Node;
	
	var jsCompressor = Node.safeAccess ('uglify-js', 'compress js');
	
	export function work (code, filename){
		var str = jsCompressor ().OutputStream ({ comments: /^!<\?/ }),
			prs = jsCompressor ().parse (code, { filename: filename }),
			cmp = jsCompressor ().Compressor ({ 
				unused: false,
				warnings: Node.args ().o
			}),
			trn = prs.transform (cmp);
		prs.print (str);
		return str.toString ();
	}
}

module App {
	import Format, Node, Parser, Converter, JsCompress;
	
	var moduleSystem = {
			begin: 
				`(function(){function c(b){if(d[b])return d[b];throw"Not found: "+b;}function e(b,a){a=c(b);a.__z||(a.__g=1,a.__gi().forEach(function(a){if("@"!=a[0]){if(c(a).__g)throw"Cycle: "+b+", "+a;c(a).__z||e(a)}}),a.__in(),a.init&&a.init(),a.__z=1,delete a.__g)}var d={},f="u"!=(typeof window)[0]&&window||GLOBAL;f.__m=function(b,a){if(a)d[b]=a();else{for(a in d)b=c(a),b.__si.apply(b,b.__gi().map(function(a){return c("@"==a[0]?a.slice(1):a)}));for(a in d)e(a);delete f.__m}}})();`,
			endDelay:
				`'u'!=(typeof window)[0]&&'u'!=(typeof document)[0]&&!/loaded|complete/.test(document.readyState)?window.addEventListener('load',__m):__m()`,
			end:
				`__m()`
		};
	
	var inputFile,
		outputFile,
		cacheFolder,
		argRebuildParser,
		argJsCompress,
		argPhpHeader,
		includesFolder;
		
	var loadedFiles = [];
		
	function asFolder (path){
		if (!path)
			return null;
		
		var folder = Node.path ().resolve (path);
		try Node.fs ().mkdirSync (folder);
		return Node.fs ().existsSync (folder) ? folder : null;
	}
	
	function findIncluded (name, current, top){
		if (current.indexOf (top) == 0)
			while (true){
				var path = Node.path ().resolve (current, name);
				if (Node.fs ().existsSync (path))
					return { file: path, top: top };
				
				var newPow = Node.path ().resolve (current, '..');
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
		Node.fatalError ('Wrong parameter value: "' + value + '".');
	}
	
	function loadAndParse (file, top){
		var topMode = top === undefined;
		
		if (topMode)
			top = Node.path ().resolve (file, '..');
		
		if (!Node.fs ().existsSync (file))
			Node.fatalError ('Divided by zero.');
		
		var content   = Node.readFile (file),
			parsed    = Parser.work (content),
			converted = Converter.work (parsed),
			formatted = Format.work (converted.tree);
			
		var result = {
				code:       formatted.code,
				additional: formatted.additional,
				modules:    converted.modules,
				apply:      lambda (other){
					this.modules = this.modules || other.modules;
					this.code = other.code + '\n\n' + this.code;
					this.additional.userscript = other.additional.userscript.concat (this.additional.userscript);
					this.additional.php = this.additional.php || other.additional.php;
				}
			}, 
			childs = [],
			flags = {};
		
		for (var i = 0; i < formatted.jsx.length; i ++)
			switch (formatted.jsx [i].key){
				case 'include':
					var name = formatted.jsx [i].value + '.jsxi',
						other = findIncluded (name, Node.path ().resolve (file, '..'), top);
					if (!other)
						Node.fatalError ('Couldn\'n found included file: "%%"'.format (name));
					if (loadedFiles.indexOf (other.file) == -1){
						loadedFiles.push (other.file);
						childs.push (loadAndParse (other.file, other.top));
					}
					break;
				case 'target':
					result.additional.target = formatted.jsx [i].value;
					break;
				case 'compress':
					flags.compress = checkOn (formatted.jsx [i].value);
					break;
				default:
					Node.fatalError ('Undefined instruction: "%%"'.format (formatted.jsx [i].key));
			}
			
		if (flags.compress)
			result.code = JsCompress.work (result.code, file);
			
		for (var i = childs.length - 1; i >= 0; i --)
			result.apply (childs [i]);
			
		return result;
	}
	
	function finalStrokes (data){
		var result = [];
		
		if (data.additional.php && argPhpHeader)
			result.push ('<? header(\'Content-Type: application/javascript\') ?>');
		
		if (data.additional.userscript.length)
			result.push ('// ==UserScript==\n' + data.additional.userscript.map (lambda '// @' + arg.key + ' ' + arg.value + '\n').join ('') 
				+ '// ==/UserScript==\n');
		
		if (data.modules)
			result.push (moduleSystem.begin);
		result.push (argJsCompress ? JsCompress.work (data.code) : data.code);
		if (data.modules)
			result.push (moduleSystem.end);
		return result.join ('\n');
	}
	
	export function init (){				
		Node.args ('Usage: js-ext file [flags]', { 
				r: { alias: 'rebuild',         description: 'Rebuild parser.' },
				l: { alias: 'js-compress',     description: 'Use compressor for all.' },
				p: { alias: 'php-header',      description: 'Use php header if nessesary.' },
				o: { alias: 'output',          description: 'Output file (else put result to stdout).' },
				c: { alias: 'cache',           description: 'Cache folder (for compiled js files; enter "none" for disable).' },
				u: { alias: 'usage',           description: 'This text.' },
			});
			
		if (Node.args ().u)
			return Node.showHelp ();
				
		inputFile         = Node.args ()._[0];
		outputFile        = Node.args ().o;
		includesFolder    = asFolder (Node.resolve ('includes'));
		cacheFolder       = Node.args ().c == 'none' ? null : asFolder (Node.args ().c || Node.resolve ('cache'));
		argRebuildParser  = Node.args ().r;
		argPhpHeader      = Node.args ().p;
		argJsCompress     = Node.args ().l;
		
		Parser.getReady ();
		
		if (!inputFile || !Node.fs ().existsSync (inputFile)){
			if (!argRebuildParser)
				Node.fatalError ('Wrong input file: "' + inputFile + '".');
			return;
		}
		
		var result = finalStrokes (loadAndParse (inputFile));
		
		if (outputFile)
			Node.writeFile (outputFile, result);
		else
			console.log (result);
	}
}