var extenders = `String.prototype.format=function(){function e(a){return-1!==(a+="").indexOf("%")?a.replace(/%/g,d||(d="_RND_"+Math.random())):a}var a=""+this,d,c,b;for(c=0;c<arguments.length;c++)if((b=arguments[c])&&!b.substring&&-1==a.indexOf("%%"))for(var f in b)a=a.split("%"+f.toUpperCase()+"%").join(e(b[f]));else a=a.replace("%%",e(b));return d?a.split(d).join("%"):a};
Array.prototype.remove=function(a,b){var c=this.slice((b||a)+1||this.length);this.length=0>a?this.length+a:a;return this.push.apply(this,c)};`,
	module_system = `(function(){function c(b){if(d[b])return d[b];throw"Not found: "+b;}function e(b,a){a=c(b);a.__z||(a.__g=1,a.__gi().forEach(function(a){if("@"!=a[0]){if(c(a).__g)throw"Cycle: "+b+", "+a;c(a).__z||e(a)}}),a.__in(),a.init&&a.init(),a.__z=1,delete a.__g)}var d={},f="u"!=(typeof window)[0]&&window||GLOBAL;f.__m=function(b,a){if(a)d[b]=a();else{for(a in d)b=c(a),b.__si.apply(b,b.__gi().map(function(a){return c("@"==a[0]?a.slice(1):a)}));for(a in d)e(a);delete f.__m}}})();`,
	module_system_autorun = `'u'!=(typeof window)[0]&&'u'!=(typeof document)[0]&&!/loaded|complete/.test(document.readyState)?window.addEventListener('load',__m):__m()`,
	module_system_autorun_immediately = `__m()`;
	
/*
	(function(){
		var ms = {}, go = (typeof window)[0] != 'u' && window || GLOBAL;
		function gm (a){
			if (ms [a]) return ms [a];
			throw 'Not found: ' + a
		}
		function im (nm, m){
			m = gm (nm);
			if (!m.__z){
				m.__g = 1;
				m.__gi ().forEach (function (s){
					if (s[0] != '@'){
						if (gm (s).__g) throw 'Cycle: ' + nm + ', ' + s;
						if (!gm (s).__z) im (s);
					}
				});
				m.__in ();
				if (m.init) m.init ();
				m.__z = 1;
				delete m.__g;
			}
		}
		go.__m = function (a, b){
			if (!b){
				for (b in ms){
					a = gm (b);
					a.__si.apply (a, a.__gi ().map (function (s){
						return gm (s[0] == '@' ? s.slice (1) : s)
					}));
				}
				for (b in ms) im (b);
				delete go.__m;
			} else 
				ms [a] = b ()
		}
	})();`;
*/

eval (extenders);

var format = (function (){
	var php = false, user_script = null, eol = '\n';
	
	var f = lambda
		if (!f [arg.type]){
			console.error (arg);
			throw 'No formatter for type: ' + arg.type
		} else 
			return f [arg.type](arg);

	f.Program                  = lambda arg.elements.map (f).join (eol);

	f.Raw                      = lambda arg.value;
	f.UserScript               = lambda (user_script = arg.value) && '';
	
	f.NumericLiteral           = lambda arg.value;
	f.UnaryExpression          = lambda arg.operator + (['!', '+', '-'].indexOf (arg.operator) != -1 ? '' : ' ') + f (arg.expression);
	f.BinaryExpression         = lambda f (arg.left) + (/[a-z\+]/i.test (arg.operator) ? ' ' + arg.operator + ' ' : arg.operator) + f (arg.right);
	f.ConditionalExpression    = lambda f (arg.condition) + '?' + f (arg.trueExpression) + ':' + f (arg.falseExpression);
	f.ParenthesizedExpression  = lambda '(' + f (arg.value) + ')';
	
	f.VariableStatement        = lambda 'var ' + arg.declarations.map (f).join (',') + ';';
	f.VariableDeclarations     = lambda 'var ' + arg.declarations.map (f).join (',');
	f.VariableDeclaration      = lambda arg.value ? arg.name + '=' + f (arg.value) : arg.name;
	f.FunctionCall             = lambda f (arg.name) + '(' + arg.arguments.map (f).join (',') + ')';

	f.Function                 = lambda 'function' + (arg.name ? ' ' + arg.name : '') + '(' + arg.params.join (',') + '){' + eol 
		+ arg.elements.map (f).join (eol) + eol + '}';

	f.StringLiteral            = lambda JSON.stringify (arg.value);
	f.BooleanLiteral           = lambda arg.value ? 'true' : 'false';
	f.NullLiteral              = lambda 'null';
	f.Variable                 = lambda arg.name;
	f.PropertyAccess           = lambda f (arg.base) + (arg.name.type ? '[' + f (arg.name) + ']' : '.' + arg.name);

	f.IfStatement              = lambda 'if(' + f (arg.condition) + ')' + eol + f (arg.ifStatement) 
		+ (arg.elseStatement ? eol + 'else' + eol + f (arg.elseStatement) : '');

	f.Block                    = lambda '{' + eol + arg.statements.map (f).join (eol) + eol + '}';
	f.ReturnStatement          = lambda arg.value ? 'return ' + f (arg.value) + ';' : 'return;';
	f.EmptyStatement           = lambda ';';
	f.ExpressionStatement      = lambda f (arg.value) + ';';
	f.AssignmentExpression     = lambda f (arg.left) + arg.operator + f (arg.right);
	f.PostfixExpression        = lambda f (arg.expression) + arg.operator;
	f.ArrayLiteral             = lambda '[' + arg.elements.map (f).join (',') + ']';
	f.ObjectLiteral            = lambda '{' + arg.properties.map (f).join (',') + '}';
	f.RegularExpressionLiteral = lambda '/' + arg.body + '/' + arg.flags;
	f.This                     = lambda 'this';
	f.ThrowStatement           = lambda 'throw ' + f (arg.exception) + ';';

	f.ForStatement             = lambda 'for(' + (arg.initializer ? f (arg.initializer) : '') + ';' + eol 
		+ (arg.test ? f (arg.test) : '') + ';' + (arg.counter ? f (arg.counter) : '') + ')' + eol + f (arg.statement);

	f.ForInStatement           = lambda 'for(' + f (arg.iterator) + ' in ' + f (arg.collection) + ')' + eol + f (arg.statement);
	f.WhileStatement           = lambda 'while(' + f (arg.condition) + ')' + eol + f (arg.statement);
	f.DoWhileStatement         = lambda 'do' + eol + f (arg.statement) + ' while(' + f (arg.condition) + ');';
	f.SwitchStatement          = lambda 'switch(' + f (arg.expression) + '){' + eol + arg.clauses.map (f).join (eol) + eol + '}';
	f.CaseClause               = lambda 'case ' + f (arg.selector) + ':' + eol + arg.statements.map (f).join (eol);
	f.DefaultClause            = lambda 'default:' + arg.statements.map (lambda f (arg)).join (' ');
	f.BreakStatement           = lambda arg.label ? 'break ' + arg.label + ';' : 'break;';
	f.ContinueStatement        = lambda arg.label ? 'continue ' + arg.label + ';' : 'continue;';

	f.TryStatement             = lambda 'try' + (arg.block.type == 'Block' ? f (arg.block) : '{' + eol + f (arg.block) + eol + '}') 
		+ (arg ['catch'] ? f (arg ['catch']) : '') + (arg ['finally'] ? f (arg ['finally']) : '')
		+ (!arg ['catch'] && !arg ['finally'] ? 'catch(e){}' : '');

	f.Catch                    = lambda 'catch(' + arg.identifier + ')' 
		+ (arg.block.type == 'Block' ? f (arg.block) : '{' + eol + f (arg.block) + eol + '}');
	f.Finally                  = lambda 'finally' 
		+ (arg.block.type == 'Block' ? f (arg.block) : '{' + eol + f (arg.block) + eol + '}');
	f.PropertyAssignment       = lambda JSON.stringify (arg.name) + ':' + f (arg.value);
	f.NewOperator              = lambda 'new ' + f (arg.constructor) + '(' + arg.arguments.map (f).join (', ') + ')';
	f.GetterDefinition         = lambda 'get ' + arg.name + '(){' + arg.body.map (f).join (eol) + '}';
	f.SetterDefinition         = lambda 'set ' + arg.name + '(' + arg.param + '){' + arg.body.map (f).join (eol) + '}';
	f.LabelledStatement        = lambda arg.label + ':' + f (arg.statement);
	f.WithStatement            = lambda 'with(' + f (arg.environment) + '){' + eol + f (arg.statement) + eol + '}';

	f.PhpLiteral               = lambda {
			php = true;
			return '/*!<? echo "*"."/"; include "' + arg.value + '"; echo "||/*" ?>*/ null';
		};
	
	return lambda { code: f [arg.type](arg, ''), php: php, user_script: user_script };
})();

(function (){
	function fatal_error (msg){
		for (var i = 0; i < arguments.length; i ++)
			console.error (arguments [i]);
		process.exit (1);
	}
	
	function safe_access (a, b, m)
		return lambda {
			if (!m)
				try 
					m = require (a);
				catch (e)
					fatal_error ('Please, install `%%` for %%.'.format (a, b), 
						'> npm install -g `%%`.'.format (a));
			return m;
		}
	
	var optimist    		= require ('optimist'),
		fs          		= require ('fs'),
		cp          		= require ('child_process'),
		path         		= require ('path'),
		js_compressor      	= safe_access ('uglify-js2', 'compress js'),
		html_compressor		= safe_access ('minimize', 'compress html'),
		peg                 = safe_access ('pegjs', 'build parser'),
		php                 = false;
	
	var argv = optimist.usage ('Usage: js-ext file [file file ...] [flags]')
		.options ('r', { alias: 'rebuild',         description: 'Rebuild parser.' })
		.options ('m', { alias: 'modules-control', description: 'Include modules linker.' })
		.options ('i', { alias: 'modules-immd',    description: 'Run modules linker immediately.' })
		.options ('g', { alias: 'useful-stuff',    description: 'Include some useful stuff.' })
		.options ('a', { alias: 'autoinclude',     description: 'Include something automatically if needed.' })
		.options ('q', { alias: 'quick-mode',      description: 'Check for header comment.' })
		.options ('c', { alias: 'js-compress',     description: 'Use compressor for js.'})
		.options ('h', { alias: 'html-compress',   description: 'Use compressor for html (special strings).'})
		.options ('p', { alias: 'php-mode',        description: 'Able to change file extension to php if needed.'})
		.options ('o', { alias: 'output',          description: 'Output file (else put result to stdout).'})
		.options ('n', { alias: 'node',            description: 'Run result with NodeJS.'})
		.options ('t', { alias: 'measure-time',    description: 'Measure time of executing.'})
		.options ('e', { alias: 'cache',           description: 'Cache folder (for compiled js files).'})
		.options ('u', { alias: 'usage',           description: 'This text.'})
		.argv;
		
	if (argv.u || (!argv._[0] && !argv.r))
		return optimist.showHelp ();
	
	var source = path.resolve (__dirname, 'js-ext.pegjs'),
		parser = path.resolve (__dirname, 'js-ext.cache');
	
	var cache_path = argv.e && path.resolve (argv.e) + '\\';
	if (cache_path)
		try fs.mkdirSync (cache_path);
	
	if (argv.r || !fs.existsSync (parser))
		try {
			var source = fs.readFileSync (source, 'utf8');
			var result = 'exports.parser = ' + peg ().buildParser (source, {cache: true}).toSource ();
			
			result = result.replace ('return "Expected " + expectedHumanized', 
				'return "[" + line + ": " + column + "] " + "Expected " + expectedHumanized');
			
			try {
				var js_compressor_local = require ('uglify-js2'),
					ast = js_compressor ().parse (result),
					cmp = js_compressor ().Compressor ({ 
						sequences:      true,  // join consecutive statemets with the “comma operator”
						properties:     true,  // optimize property access: a["foo"] → a.foo
						dead_code:      true,  // discard unreachable code
						drop_debugger:  true,  // discard “debugger” statements
						unsafe:         false, // some unsafe optimizations (see below)
						conditionals:   true,  // optimize if-s and conditional expressions
						comparisons:    true,  // optimize comparisons
						evaluate:       true,  // evaluate constant expressions
						booleans:       true,  // optimize boolean expressions
						loops:          true,  // optimize loops
						unused:         false, // drop unused variables/functions
						hoist_funs:     true,  // hoist function declarations
						hoist_vars:     false, // hoist variable declarations
						if_return:      true,  // optimize if-s followed by return/continue
						join_vars:      true,  // join var declarations
						cascade:        true,  // try to cascade `right` into `left` in sequences
						side_effects:   true,  // drop side-effect-free statements
						global_defs:    {}     // global definitions
					}),
					str = js_compressor ().OutputStream ();
				ast.transform (cmp).print (str);
				result = str.toString ();
			}
			
			fs.writeFileSync (parser, result, 'utf8');
			
			if (!argv._[0])
				return;
		} catch
			fatal_error ('Error while building parser:', e.stack);
	
	var loaded = require (parser).parser;
	
	function parse_and_convert (file, code){
		if (argv.o)
			console.log ('> ' + file);
	
		var parsed, start = argv.o && +new Date, parse;
		try {
			parsed = loaded.parse (code);
			if (start)
				parse = +new Date;
		} catch {
			if (argv.d)
				fs.writeFileSync ('error.debug.js', code, 'utf8');
			fatal_error ('Error while parsing: ' + e, e.stack);
		}
		
		function make_default (obj){
			var m_name = "__m";
			var html_compressor_instance;
				
			function json_function (name, content)
				return { type: 'PropertyAssignment', name: name, value: { type: 'Function', name: null, params: [], elements: content }}
			
			function clone_function (obj){		
				var initialize = [];
				
				var params = obj.params.map (function (e)
					if (e && e.type == 'IdentifierWithDefault'){
						initialize.push ({
							type: 'IfStatement',
							condition: {
								type: 'BinaryExpression',
								operator: '===',
								left:  { type: 'Variable', name: e.identifier },
								right: { type: 'Variable', name: 'undefined' }
							},
							ifStatement: {
								type: 'ExpressionStatement',
								value: {
									type: 'AssignmentExpression',
									operator: '=',
									left: { type: 'Variable', name: e.identifier },
									right: clone (e.value)
								}
							},
							elseStatement: null
						});
						return e.identifier;
					} else
						return e;
				);
				
				return {
					type: 'Function',
					name: obj.name,
					export_flag: obj.export_flag,
					params: params,
					elements: initialize.length ? initialize.concat (clone (obj.elements)) : clone (obj.elements)
				}
			}
			
			function clone_lambda (obj)
				return clone_function ({
					type: 'Function',
					name: null,
					params: obj.params.length == 0 ? ["arg"] : obj.params,
					elements: obj.element.type == 'Block' 
						? obj.element.statements 
						: [ obj.element.type == 'ExpressionStatement' 
							? { type: 'ReturnStatement', value: clone (obj.element.value) } 
							: obj.element ]
				});
			
			function clone_string (obj){
				var result;
				switch (obj.special){
					case 'h':
						if (argv.h){
							var a = obj.value.replace (/<([a-z]+)(\s[^>]+?)?\s*\/>/g, '<$1$2></$1>');
							if (!html_compressor_instance)
								html_compressor_instance = new (html_compressor ())({
									empty: true, cdata: true, comments: false, spare: true, quotes: true 
								});
							html_compressor_instance.parse (a, lambda (error, data) result = data);
						} else
							result = clone (obj.value);
						break;
					case 'c':
						result = clone (obj.value).replace (/\s+/g, ' ').replace (/\s*([{};:])\s*/g, '$1').trim ();
						break;
					default:
						result = clone (obj.value);
				}
				
				return { type: "StringLiteral", value: result }
			}
			
			function clone_module (obj){
				var get_imports 		= [], 
					setup_imports 		= [],
					exported 			= [], 
					variable_initialize = [],
					new_elements 		= [];
				
				for (var i = 0; i < obj.elements.length; i ++){
					var e = obj.elements [i];
					
					if (e.type === 'ImportStatement'){
						new_elements.push ({
							type: 'VariableStatement',
							declarations: (function (d){
								for (var k = 0; k < d.length; k ++){
									var clear = d [k][0] === '@' ? d [k].slice (1) : d [k];
									
									get_imports.push ({ type: 'StringLiteral', value: d [k] });
									
									setup_imports.push ({
										type: 'ExpressionStatement',
										value: {
											type: 'AssignmentExpression',
											operator: '=',
											left: { type: 'Variable', name: clear },
											right: { 
												type: 'PropertyAccess',
												base: { type: 'Variable', name: "arguments" },
												name: { type: 'NumericLiteral', value: setup_imports.length }
											}
										}
									});
									
									d [k] = { type: 'VariableDeclaration', name: clear, value: null }
								}
								
								return d;
							})(clone (e.declarations))
						});
					} else {
						var new_e = clone (e);
						
						if (new_e.type === 'Function' && new_e.export_flag)
							exported.push ({
								type: 'PropertyAssignment',
								name: new_e.name,
								value: { type: 'Variable', name: new_e.name }
							});
						else if (new_e.type === 'VariableStatement')
							for (var k = 0; k < new_e.declarations.length; k ++){
								if (new_e.export_flag)
									exported.push ({
										type: 'GetterDefinition',
										name: new_e.declarations [k].name,
										body: [{ type: 'ReturnStatement', value: { type: 'Variable', name: new_e.declarations [k].name }}]
									});
								if (new_e.declarations [k].value !== null){
									variable_initialize.push ({
										type: 'ExpressionStatement',
										value: {
											type: 'AssignmentExpression',
											operator: '=',
											left: { type: 'Variable', name: new_e.declarations [k].name },
											right: clone (new_e.declarations [k].value)
										}
									});
									
									new_e.declarations [k].value = null;
								}
							}
						
						new_elements.push (new_e);
					}
				}
				
				exported.push (json_function ('__gi', [{ 
					type: 'ReturnStatement', 
					value: { type: 'ArrayLiteral', elements: get_imports }
				}]),
					json_function ('__si', setup_imports),
					json_function ('__in', variable_initialize));		
				new_elements.push ({ type: 'ReturnStatement', value: { type: 'ObjectLiteral', properties: exported }});
				
				return {
					type: 'ExpressionStatement',
					value: {
						type: 'FunctionCall',
						name: { type: 'Variable', name: m_name },
						arguments: [
							{ type: 'StringLiteral', value: clone (obj.identifier) },
							{ type: 'Function', name: null, params: [], elements: new_elements }
						]
					}
				}
			}
			
			function clone (obj)	
				if (typeof obj !== 'object' || !obj){
					return obj;
				} else if (obj.indexOf){
					var r = [];
					for (var i = 0; i < obj.length; i ++)
						r.push (clone (obj [i]));
					return r;
				} else if (obj.type === 'Module'){
					return clone_module (obj);
				} else if (obj.type === 'Lambda'){
					return clone_lambda (obj);
				} else if (obj.type === 'Function'){
					return clone_function (obj);
				} else if (obj.type === 'StringLiteral' && obj.special){
					return clone_string (obj);
				} else {
					var r = {};
					for (var n in obj)
						r [n] = clone (obj [n]);
					return r;
				}
			
			return clone (obj);
		}
		
		try {
			var defaulted = make_default (parsed), convert = start && +new Date;
			var result = format (defaulted);
			if (start && argv.t)
				console.log (['\tTime: parse - ', parse - start, 
					' ms, convert - ', convert - parse, 
					' ms, format - ', new Date - convert,' ms.'].join (''));
			if (argv.crash)
				throw 0;
			return result;
		} catch
			fatal_error ('Error while converted: ' + e, e.stack);
	}
	
	function path_fix (arg)
		return arg [0] == '"' && arg [arg.length - 1] == '"' ? arg.slice (1, -1) : arg;
	
	var code = [];
	for (var i = 0; i < argv._.length; i ++){
		var path_fixed = path_fix (argv._[i]);
		var cached = cache_path && cache_path + path.basename (path_fixed);
		var result = null, result_php = false, stats = null, loaded_from_cache = false;
		
		if (cached){
			stats = fs.statSync (path_fixed);
		
			if (fs.existsSync (cached)){
				var tmp = fs.readFileSync (cached, 'utf8');
				
				try {
					var index = tmp.indexOf ('\n'), saved = tmp.substr (0, index).split ('; ');
					if (saved [0] == stats.size && saved [1] == stats.mtime){
						result = tmp.slice (index + 1);
						loaded_from_cache = true;
						result_php = saved [2] === 'true';
					}
				}
			}
		}
		
		if (!result){
			result = fs.readFileSync (path_fixed, 'utf8');
			
			if (!argv.q || result.match (/\/\/\s*@js-ext/)){
				var result_temp = parse_and_convert (argv._[i], result);
				result = result_temp.code;
				result_php = result_temp.php;
			}
		}
		
		php = php || result_php;
		code.push (result);
		
		if (cached && !loaded_from_cache)
			fs.writeFileSync (cached, stats.size + '; ' + stats.mtime + '; ' + result_php + '\n' + result);
	}
	var file = code.join ('\n\n');
	
	try {
		if (argv.g)
			file = extenders + ' ' + file;
		if (argv.m)
			file = module_system + ' ' + file + ' ' + (argv.i ? module_system_autorun_immediately : module_system_autorun);
		
		if (argv.c){
			var ast = js_compressor ().parse (file);
			var cmp = js_compressor ().Compressor ({ unused: false });
			var str = js_compressor ().OutputStream ({ comments: /^!<\?/ });
			ast.transform (cmp).print (str);
			file = str.toString ();
		}
		
		if (argv.o){
			var temp = path_fix (argv.o), pathes = [temp, temp.replace (/\.[^\.]+$/, '.php')], n = +(php && argv.p);
			try fs.unlinkSync (pathes [1 - n]);
			fs.writeFileSync (pathes [n], n ? '<? header(\'Content-Type: application/javascript\'); ?>' + file : file);
			console.log (php ? 'Done (some PHP-includes was found).' : 'Done.');
		} else if (argv.n){
			var node = cp.spawn ('node', []);
			node.stdout.pipe (process.stdout);
			node.stderr.pipe (process.stderr);
			
			node.stdin.write (file);
			node.stdin.write ('\nprocess.exit ()');
			node.stdin.end ();
			
			node.on ('close', lambda process.exit (arg));
		} else
			console.log (file);
	} catch
		fatal_error ('Error while saving: ' + e.stack || e);
})();