@buildTo ('./temp/tests.js')

@macro output:raw-nm (args:raw){
	return 'log ([ %0 ])' (args);
}

@macro test:raw-nm (name:string, args:raw, code:raw){
	return `(function (result){
		var missed = false;
		(function (log)` + code + `)(function (args){
			var expected = JSON.stringify (result.shift ()),
				got = JSON.stringify (args);
			if (expected === undefined){
				if (!missed){
					console.log ('Missing entry:');
					missed = true;
				}

				var temp = [];
				console.log ('\t' + got
					.replace (/"((?:\\"|[^"])+)"/g, lambda (m, s) '\'' + temp.push (s) + '\'')
					.replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2')
					.replace (/'(\d+)'/g, lambda (m, s) '\'' + temp [+s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\''));
			} else if (expected !== got)
				throw new Error ('Expected and got:\n\t%0\n\t%1' (expected, got));
		});
		console.log ('[Testing] Test "` + name + `" has been passed');
	})([` + args.slice (1, -1).trim ().replace (/\n/g, ',') + `])`;
}

@test ('Priorities', {
	[ 5, -5, 3, 5, 9, 7, 8 ]
}, {
	var a = 1, b = 2, c = 3, d = 4;
	@output {
		b + c || d,
		b - c - d,
		b - (c - d),
		a + (c, d),
		(a | b + c) + d,
		a + b | c + d,
		a + (b | c) + d
	};
});

@test ('Fancy arrays, loops and stuff', {
	[ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ]
	[ '0', 0 ], [ '1', 1 ], [ '2', 2 ], [ '3', 3 ], [ '4', 4 ], [ '5', 5 ], [ '6', 6 ], [ '7', 7 ], [ '8', 8 ], [ '9', 9 ], [ '10', 10 ]
	[ '0' ], [ '1' ], [ '2' ], [ '3' ], [ '4' ], [ '5' ], [ '6' ], [ '7' ], [ '8' ], [ '9' ], [ '10' ]
	[ '11' ], [ '12' ], [ '13' ], [ '14' ], [ '15' ], [ '16' ], [ '17' ], [ '18' ], [ '19' ], [ '20' ]
	[ [ 5, 4, 3, 2, 1 ], [ 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ] ]
	[ [ 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107 ], [ 'd', 'c', 'b', 'a' ], [ 107, 106, 105, 104, 103, 102, 101, 100, 99, 98, 97 ] ]
}, {
	for (var index, value in-array [ 'a' .. 'c' ])
		@output { index, value };

	for (var key, value in [ 0 .. 10 ])
		@output { key, value };

	for (var key in [ 0 .. 20 ])
		@output { key };

	@output { [ 5 .. 1 ], [ 15 .. 1 ] };
	@output { [ 'a' .. 'k' ], [ 'd' .. 'a' ], [ 'k' .. 'a' ] };
});

@test ('Another test for loops', {
	[ 'a' ], [ 'b' ], [ 'c' ], [ 'a' ], [ 'b' ], [ 'c' ], [ 'a' ], [ 'b' ], [ 'c' ], [ 'a' ], [ 'b' ], [ 'c' ], [ 1 ]
	[ 2 ], [ 3 ], [ 4 ], [ 'a' ], [ 'b' ], [ 'c' ], [ 0 ], [ 1 ], [ 2 ], [ 3 ], [ 0 ], [ 1 ], [ 2 ], [ 'a9' ], [ 'a9' ]
	[ 'n-0' ], [ 'a' ], [ 'b' ], [ 'c' ], [ 'd' ], [ 'n-1' ], [ 'a', 100 ], [ 'b', 102 ], [ 'c', 104 ], [ 'd', 106 ]
	[ 'n-2' ], [ 0, 100 ], [ 1, 102 ], [ 2, 104 ], [ 3, 106 ], [ 'n-3' ], [ 100 ], [ 102 ], [ 104 ], [ 106 ], [ 'q' ]
	[ 'w' ], [ 'e' ], [ 'r' ], [ 't' ], [ 'y' ], [ 0, 'q' ], [ 1, 'w' ], [ 2, 'e' ], [ 3, 'r' ], [ 4, 't' ], [ 5, 'y' ]
}, {
	var a1 = { a: 1, b: 2, c: 3 },
		a2 = { a: 'a', b: 'b', c: 'c' },
		a3 = [ 1, 2, 3, 4 ],
		a4 = [ 'a', 'b', 'c' ];

	for (var n in a1) @output { n };
	for (n in a2) @output { n };

	for (var n, v in a1) @output { n };
	for (n, v in a2) @output { n };

	for (var n in-array a3) @output { n };
	for (n in-array a4) @output { n };

	for (var n, v in-array a3) @output { n };
	for (n, v in-array a4) @output { n };

	for (n, v in { a9: 7 }) @output { n };
	for (v in { a10: 7 }) @output { n };

	for (var n in {
		a: 100,
		b: 102,
		c: 104,
		d: @output { 'n-0' } || 106
	})
		@output { n };

	for (var i, k in {
		a: 100,
		b: 102,
		c: 104,
		d: @output { 'n-1' } || 106
	})
		@output { i, k };

	for (var i, k in-array [ 100, 102, 104, @output { 'n-2' } || 106 ])
		@output { i, k };

	for (var k in-array [ 100, 102, 104, @output { 'n-3' } || 106 ])
		@output { k };

	for (var n in-array 'qwerty')
		@output { n };

	for (var n, e in-array 'qwerty')
		@output { n, e } 
});

@test ('Comma-free', {
	[ 'string', 187, null, null, {'a': 20, 'b': 25, 'c': [ null, null ]} ]
}, {
	@output {
		'string' 
		187 
		lambda 15
		lambda 18 
		{ 
			a: 20 
			b: 25 
			c: [ 
				lambda 14 
				lambda 'hi' 
			] 
		}
	};
});

@test ('Lambdas', {
	[ 'number', 1, 1, -1, 'functionfunction', {'a':'a', 'b':'NaN'}, {'a':'b'}, 'undefined', 2 ]
}, {
	var a = lambda (test){ return typeof test },
		b = lambda { return arg },
		c = lambda arg,
		d = lambda if (a && b ()) arg else -arg,
		e = lambda typeof a + a (b);

	var f = lambda {
		a: 'a',
		b: String (d ())
	};

	var g = [ lambda { a: 'b' }, lambda b ];

	[ lambda if (t){ a } else b, lambda if (q) return b ];

	@output {
		a (1),
		b (1),
		c (1),
		d (1),
		e (),
		f (),
		g [0](),
		String (g [1]()()),
		g.length
	};
});

@test ('Functions', {
	[ 18, null ]
}, {
	function a (arg = 18)
		arg;

	function b (arg)
		arg;

	@output { a (), b () };
});

@test ('Classes', {
	[ 'Here come "First"!' ]
	[ '.', '"First" says "Hi!"' ]
	[ '.', '.', 'What do dogs say? (Meow?)' ]
	[ 'And now — "Second"!' ]
	[ '.', '"Second" is too tired: Trying to instantiate abstract class Second' ]
	[ 'Next is "Third"!' ]
	[ '.', '"First" says "Hi!"' ]
	[ '.', '.', 'What do dogs say? Last try! (Meow?)' ]
	[ '"Third" has something to eat!' ]
	[ '.', 'Wow, yammy!' ]
	[ '. .', 'And chew-chew-chew!' ]
	[ 'Now he wants to sleep!' ]
	[ '.', 'Z-z-z-z...' ]
	[ '. .', 'Now with 20% more snoring!' ]
	[ 'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!' ]
	[ '.', 'E-e-e-w.' ]
	[ 'And now "Third" has something to tell us! "Third", who is it?' ]
	[ '.', 'Michael Jackson, for example' ]
	[ '.', 'Or cat:', 'Meow!' ]
	[ '.', 'Or dog:', 'WOOF! WOOF! WOOF!' ]
	[ '.', 'Or horse:', 'Horse, tazshemta' ]
	[ 'And, finally, "Fourth".' ]
	[ '.', '"First" says "Hi!"' ]
	[ '.', '.', 'Dogs don\'t say "KRAKOZYABRA" (Meow?)' ]
	[ '.', '"Fourth" in da house.' ]
	[ 'Okay, give us some your regular crap.' ]
	[ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]
}, {
	class First {
		static var cat = 'Meow?';

		dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';
		private var horse = 'IGOGO, MOTHERFUCKERS!';

		(dog){
			@output { '.', '"First" says "Hi!"' };
			this.dog = dog + ' (' + cat + ')';
			@output { '.', '.', this.dog };
		}

		public cow (){
			@output { '.', 'Mo-o-o-o from "First".' };
		}
	}

	public class Second extends First {
		private static var cat = 'Meow!';
		protected static dog = 'WOOF! WOOF! WOOF!';
		var horse = 'Horse, tazshemta';

		whoIsIt (){
			@output { '.', 'Michael Jackson, for example' };
			@output { '.', 'Or cat:', cat };
			@output { '.', 'Or dog:', dog };
			@output { '.', 'Or horse:', horse };
		}

		eat (){
			@output { '.', 'Wow, yammy!' };
		}

		protected sleep (){
			@output { '.', 'Z-z-z-z...' };
		}

		abstract protected poop ();
	}

	public class Third extends Second {
		eat (){
			super;
			@output { '. .', 'And chew-chew-chew!' };
		}

		sleep (){
			super;
			@output { '. .', 'Now with 20% more snoring!' };
		}

		poop (){
			@output { '.', 'E-e-e-w.' };
		}
	}

	protected class Fourth extends Third {
		(){
			super ('Dogs don\'t say "KRAKOZYABRA"');
			@output { '.', '"Fourth" in da house.' };
		}

		public poop ()
			@output { '.', 'I won\'t do it, I\'m hungry and it is disgusting!' };
	}

	var c;

	@output { 'Here come "First"!' };
	new First ('What do dogs say?');

	@output { 'And now — "Second"!' };
	try
		new Second ('Nothing here.');
	catch
		@output { '.', '"Second" is too tired: ' + e.message };

	@output { 'Next is "Third"!' };
	c = new Third ('What do dogs say? Last try!');

	@output { '"Third" has something to eat!' };
	c.eat ();

	@output { 'Now he wants to sleep!' };
	c.sleep ();

	@output { 'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!' };
	c.poop ();

	@output { 'And now "Third" has something to tell us! "Third", who is it?' };
	c.whoIsIt ();

	@output { 'And, finally, "Fourth".' };
	c = new Fourth ();

	@output { 'Okay, give us some your regular crap.' };
	c.poop ();
});

@test ('Constructors', {
	[ 'A:' ], [ 'A' ]
	[ 'B:' ], [ 'A' ], [ 'B' ]
	[ 'C:' ], [ 'A' ], [ 'B' ]
	[ 'D:' ], [ 'A' ], [ 'B' ], [ 'D' ]
	[ 'E:' ], [ 'A' ], [ 'B' ], [ 'D' ], [ 'E(4)' ]
	[ 'F:' ], [ 'A' ], [ 'B' ], [ 'D' ], [ 'E(5)' ], [ 'F(5)' ]
	[ 'G:' ], [ 'A' ], [ 'B' ], [ 'D' ], [ 'E(6)' ], [ 'F(6)' ]
}, {
	class A {
		(){
			@output { 'A' };
		}
	}

	class B extends A {
		(){
			@output { 'B' };
		}
	}

	class C extends B {
	}

	class D extends C {
		(){
			@output { 'D' };
		}
	}

	class E extends D {
		(arg){
			@output { 'E(' + arg + ')' };
		}
	}

	class F extends E {
		(arg){
			super (arg);
			@output { 'F(' + arg + ')' };
		}
	}

	class G extends F {}

	for (var i, c in-array [ A, B, C, D, E, F, G ]){
		@output { c.name + ':' } 
		new c (i);
	}
});

@test ('Hardcore test for classes', {
	[ '[getA]' ]
	[ { '0': 1, '1': 2 } ]
	[ '[getB]' ]
	[ true, 'success3' ]
	[ 'first', 'second-changed', 'success-changed', 'WOOHOO!' ]
	[ '[getA]' ]
	[ '[getA][get]' ]
	[ '[getB]' ]
	[ '[getB][get]' ]
	[ 'second-changed', 'success-changed' ]
	[ 'ok' ]
	[ '[getA]' ]
	[ '[getA][get]' ]
	[ '[getB]' ]
	[ '[getB][get]' ]
	[ 'second-changed', 'success-changed' ]
	[ '[getA]' ]
	[ '[getB]' ]
	[ 'default-changed', 'qwerty-changed' ]
	[ 'default-changed', 'qwerty-changed' ]
	[ 'deep!' ]
	[ 'arg', 'done' ]
}, {
	class A {
		protected parent = 'WOOHOO!';
	}

	class B extends A {
		static var privateStatic = 'done';
		var variable;

		public var qwerty;

		(variable){
			this.variable = variable;
			qwerty = 'default';
		}

		public test (a, b){
			a.variable += '-changed';
			b.variable += '-changed';
			@output { variable, a.variable, b.variable, new A ().parent };
		}

		public other (a, b){
			function getA (){
				@output { '[getA]' };
				return {
					get: function (){
						@output { '[getA][get]' };
						return a;
					}
				};
			}

			function getB (){
				@output { '[getB]' };
				return {
					get: function (){
						@output { '[getB][get]' };
						return b;
					}
				};
			}

			@output { getA ().get ().variable += '-changed', getB ().get ().variable += '-changed' };
			@output { 'ok' };
			@output { getA ().get ().variable, getB ().get ().variable };
		}

		public final (a, b){
			function getA (){
				@output { '[getA]' };
				return a;
			}

			function getB (){
				@output { '[getB]' };
				return b;
			}

			@output { getA ().qwerty += '-changed', getB ().qwerty += '-changed' };
			@output { a.qwerty, b.qwerty };
		}

		public method (a, b){
			function getA (){
				@output { '[getA]' };
				return a;
			}

			function getB (){
				@output { '[getB]' };
				return b;
			}

			@output { getA ().testMethod (1, 2), getB ().testMethod (3) };
		}

		testMethod (){
			@output { arguments };
			return this instanceof B;
		}

		var testObj = {
			find: function (){
				return [
					{
						variable: 'deep!'
					}
				]
			}
		}

		public awful (){
			@output { testObj.find ()[0].variable };
		}

		public staticTest (obj){
			@output { obj.privateStatic, B.privateStatic };
		}
	}

	new B ('first').method (new B ('second'), { testMethod: lambda this.result + arg, result: 'success' });
	new B ('first').test (new B ('second'), { variable: 'success' });
	new B ('first').other (new B ('second'), { variable: 'success' });
	new B ('first').final (new B ('second'), { qwerty: 'qwerty' });
	new B ().awful ();
	new B ('first').staticTest ({ privateStatic: 'arg' });
});

@test ('For parser and generator', {
	[ 'hi' ]
	[ 134, 'test', '\n\r\t', 'multiline\tstring', 'qqq\'qqq', 'a', '%~' ]
	[ 'begin [object Object] end', '[object Object]', 'be\ngin \'[object Object] middle [object JSON] end', '', 'attaching test', 'here goes hardcore test', 'really hardcore te\'st', 'really hardcore te"st' ]
	[ '5', '58', 'test58', 'begin insert middle test end', '5-%0-8', '5-5-8' ]
}, {
	[ 0 .. 5 ];
	[ 9 .. 5 ];

	var a = function (){
			@output {
				'%0' (5),
				'%0%1' (5, 8),
				'test%0%1' (5, 8),
				'begin %0 middle %1 end' ('insert', 'test'),
				'%0-\%0-%1' (5, 8),
				'%0-%0-%1' (5, 8)
			};
		}, 
		b = function (variable5 = 1, variable8 = 'K'){
			function q (){}

			@output {
				'%0' (variable5),
				'%0%1' (variable5, variable8),
				'test%0%1' (variable5, variable8)
			}

			function a (){ ... }

			function b (){}

			if (a)
				function s (){}
		}

	@output { 'hi' };

	while (0);

	@output { 
		0x86,

		'test',
		'\n\r\t',
		'multiline\
		string',
		'qqq\'qqq',
		'\u0061',
		'\%\~'
	};

	@output { 
		'begin %0 end' (console),
		'%0' (console),

		'be\ngin \'%0 middle %1 end' (console, JSON),

		'' (hi),

		'attaching %0' ('test'),
		'here goes hardcore %0' ("test"),
		'really hardcore %0' ("te'st"),
		"really hardcore %0" ('te"st'),
	};

	a ();
});

@test ('Multiline', {
	[ 'first line\nsecond line\n\ttabbed line\n\tanother one\nlast line\n' ]
	[ 'first line\nsecond line\n    tabbed line\n    another one\n\tcheck one\nlast line\n' ]
	[ 'first line\n\t\t\tsecond line\n\t\t\t\ttabbed line\n\t\t\t\tanother one\n\t\t\tlast line\n' ]
	[ '\'"`' ]
}, {
	var test = `first line
				second line
					tabbed line
					another one
				last line`,
		withSpaces = 
		   `first line
			second line
	            tabbed line
		        another one
				check one
	    	last line`,
		disabled = 
	`first line
			second line
				tabbed line
				another one
			last line`,
		symbols = `'"\``;

	@output { test + '\n' };
	@output { withSpaces + '\n' };
	@output { disabled + '\n' };
	@output { symbols };
});
