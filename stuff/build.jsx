// ==Jsx==
// @import utils/function.arguments_count
// @build-to ../build.js
// ==/Jsx==

var fs     = require ('fs'),
	path   = require ('path'),
	child  = require ('child_process');

function run (){
	var c = typeof arguments [arguments.length - 1] === 'function' ? arguments [arguments.length - 1] : null,
		a = [].slice.call (arguments, 0, -(+!!c));

	var cmd = child.spawn ('cmd', [ '/C' ].concat (a));
	if (!c || c.argumentsCount () <= 1){
		cmd.stdout.on ('data', lambda process.stdout.write (arg.toString ()));
		cmd.stderr.on ('data', lambda process.stderr.write (arg.toString ()));
		if (c)
			cmd.on ('close', c);
	} else {
		var stdout = '', stderr = '';
		cmd.stdout.on ('data', lambda stdout += arg.toString ());
		cmd.stderr.on ('data', lambda stderr += arg.toString ());
		cmd.on ('close', lambda c (arg, stdout, stderr));
	}
}

var position,
	tempJsExt = path.resolve (__dirname, 'build', 'js-ext.temp.js'),
	tempJsParser = path.resolve (__dirname, 'build', 'js-ext.temp.parser'),
	query = [
		'. Started',

		'. Converter:',
		lambda run ('js-ext.cmd', path.resolve (__dirname, 'src', 'js-ext.jsx'), '-o', tempJsExt, '-e', lambda if (arg){
			console.log ('.. Error.');
		} else {
			console.log ('.. Ok.');
			next ();
		}),

		'. Parser:',
		lambda run ('pegjs.cmd', '--cache', '<', path.resolve (__dirname, 'src', 'js-ext.pegjs'), '|', 'node', '-e', s`
			i='',q=String.fromCharCode(34),s=process.stdin;
			s.on('data',function(a){i+=a});
			s.on('end',function(){
				console.log('exports.parser='+i.replace ('return '+q+'Expected '+q+' + expectedHumanized',
					'return '+q+'['+q+' + line + '+q+': '+q+' + column + '+q+'] '+q+' + '+q+'Expected '+q+' + expectedHumanized'))})`, '>', tempJsParser, lambda if (arg){
			console.log ('.. Error.');
		} else {
			console.log ('.. Ok.');
			next ();
		}),

		'. Getting tests list...',
		lambda {
			var tests = path.resolve (__dirname, 'tests');

			fs.readdir (tests, lambda (err, files){
				files.filter (lambda arg.substr (-4) == '.jsx').sort (lambda (a, b) a < b).forEach (lambda (file) insert (lambda {
					console.log ('.. Found: ' + file);

					var fullPath = path.resolve (tests, file),
						content = fs.readFileSync (fullPath),
						result = (content.toString ().match (/\*{Result-Begin}([\s\S]+?){Result-End}\*/) || 0)[1] || '';
					run ('node', tempJsExt, fullPath, '-o:stdout', '-e', '|', 'node', lambda (exitCode, stdout, stderr)
						if (exitCode || result && result.replace (/\r/g, '').trim () != stdout.replace (/\r/g, '').trim ()){
							console.log ('... Error: ' + (exitCode ? 'exit code = ' + exitCode : 'bad stdout'));
						} else {
							if (!result){
								fs.writeFileSync (fullPath, content + '\n\n/*{Result-Begin}\n' + stdout.trim () + '\n{Result-End}*/\n');
								console.log ('... Writed.');
							} else 
								console.log ('... Passed.');
							next ();
						});
				}));

				next ();
			});
		},

		'. Applying new versions...',
		lambda {
			var build = path.resolve (__dirname, 'build'),
				js = path.resolve (build, 'js-ext.js'),
				pr = path.resolve (build, 'js-ext.parser'),
				jt = path.resolve (build, 'js-ext.temp.js'),
				pt = path.resolve (build, 'js-ext.temp.parser');

			try fs.unlinkSynk (js);
			try fs.unlinkSynk (pr);
			
			try {
				fs.renameSync (jt, js);
				fs.renameSync (pt, pr);
				console.log ('.. Ok.');
			} catch 
				console.log ('.. Error: ' + e.toString () + '.');
		},

		'. Finished'
	];

function next (){
	position = position !== undefined ? position + 1 : 0;
	if (position < query.length){
		if (typeof query [position] === 'string'){
			console.log (query [position]);
			next ();
		} else {
			query [position]();
		}
	} else {
		try fs.unlinkSynk (path.resolve (__dirname, 'build', 'js-ext.temp.js'));
		try fs.unlinkSynk (path.resolve (__dirname, 'build', 'js-ext.temp.parser'));
	}
}

function insert (fn){
	query.splice (position + 1, 0, fn);
}

next ();
