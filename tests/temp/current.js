var first = " first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
	scnd = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line",    // current.jsx:6
	third = "first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line", 
	fourth = "first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line", 
	fifth = "         first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line", 
	symbols = "'\"`";                                                             // current.jsx:30

console.log ('FIRST:\n' + first + '\n');                                          // current.jsx:32
console.log ('SECOND:\n' + scnd + '\n');                                          // current.jsx:33
console.log ('THIRD:\n' + third + '\n');                                          // current.jsx:34
console.log ('FOURTH:\n' + fourth + '\n');                                        // current.jsx:35
console.log ('FIFTH:\n' + fifth + '\n');                                          // current.jsx:36
console.log ('SYMBOLS:\n' + symbols + '\n');                                      // current.jsx:37

var code = '<CODE>',                                                              // current.jsx:39
	name = '<NAME>',                                                              // current.jsx:40
	args = '<ARGS>',                                                              // current.jsx:41
	temp = '(function (result){\n\tvar missed = false;\n\t(function (log) ' + code + ')(function (args){\n\t\tvar expected = JSON.stringify (result.shift ()),\n\t\t\tgot = JSON.stringify (args);\n\t\tif (expected === undefined){\n\t\t\tif (!missed){\n\t\t\t\tconsole.log (\'Missing entry:\');\n\t\t\t\tmissed = true;\n\t\t\t}\n\n\t\t\tvar temp = [];\n\t\t\tconsole.log (\'\\t\' + got\n\t\t\t\t.replace (/\"((?:\\\\\"|[^\"])+)\"/g, lambda (m, s) \'\\\'\' + temp.push (s) + \'\\\'\')\n\t\t\t\t.replace (/(,|\\[|\\{|\\:)|(\\]|\\})/g, \'$1 $2\')\n\t\t\t\t.replace (/\'(\\d+)\'/g, lambda (m, s) \'\\\'\' + temp [+s - 1].replace (/\\\\\"/g, \'\"\').replace (/\'/g, \'\\\\\\\'\') + \'\\\'\'));\n\t\t} else if (expected !== got)\n\t\t\tthrow new Error (\'Expected and got:\\n\\t' + code + '\\n\\t' + name + '\' (expected, got));\n\t});\n\tconsole.log (\'[Testing] Test \"' + name + '\" has been passed\');\n})([' + args.slice (1, - 1).trim ().replace (/\n/g, ',') + '])', 
	fuck = '(function (result){\
		var missed = false;\
		(function (log) ' + code + ')(function (args){\
			var expected = JSON.stringify (result.shift ()),\
				got = JSON.stringify (args);\
			if (expected === undefined){\
				if (!missed){\
					console.log (\'Missing entry:\');\
					missed = true;\
				}\
\
				var temp = [];\
				console.log (\'\t\' + got\
					.replace (/"((?:\\"|[^"])+)"/g, lambda (m, s) \'\'\' + temp.push (s) + \'\'\')\
					.replace (/(,|\\[|\\{|\\:)|(\\]|\\})/g, \'$1 $2\')\
					.replace (/\'(\\d+)\'/g, lambda (m, s) \'\'\' + temp [+s - 1].replace (/\\"/g, \'"\').replace (/\'/g, \'\'\') + \'\'\'));\
			} else if (expected !== got)\
				throw new Error (\'Expected and got:\n\t' + code + '\n\t' + name + '\' (expected, got));\
		});\
		console.log (\'[Testing] Test "' + name + '" has been passed\');\
	})([' + args.slice (1, - 1).trim ().replace (/\n/g, ',') + '])';              // current.jsx:64

console.log (temp);                                                               // current.jsx:87
