function __createArray (from, 
	to, 
	result){
	if (typeof from === 'string')
		from = from.charCodeAt (0);
	
	if (typeof to === 'string')
		to = to.charCodeAt (0);
	
	result = new Array (Math.abs (to - from) + 1);
	
	if (from < to)
		for (var i = 0; i < result.length; i ++)
			result [i] = i + from;
	else
		for (var i = result.length - 1; i >= 0; i --)
			result [i] = from - i;
	return result;
}

function __prototypeExtend (c, 
	p, 
	t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t ();
	c.prototype.constructor = c;
}

(function (result){                                                                // tests.jsx:7
	var missed = false;
	
	(function test_priorities (log){                                               // tests.jsx:9
		var a = 1, b = 2, c = 3, d = 4;
		
		log ([                                                                     // tests.jsx:11
			b + c || d,                                                            // tests.jsx:11
			b - c - d,                                                             // tests.jsx:13
			b - (c - d),                                                           // tests.jsx:14
			a + (c, d),                                                            // tests.jsx:15
			(a | b + c) + d,                                                       // tests.jsx:16
			a + b | c + d,                                                         // tests.jsx:17
			a + (b | c) + d
		]);
	})(function (args){                                                            // tests.jsx:20
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:21
			got = JSON.stringify (args);                                           // tests.jsx:22
		
		if (expected === undefined){                                               // tests.jsx:23
			if (!missed){                                                          // tests.jsx:24
				console.log ('Missing entry:');                                    // tests.jsx:25
				missed = true;                                                     // tests.jsx:26
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:30
				function (m, s){                                                   // tests.jsx:31
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:31
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:33
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:34
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:35
	});
	console.log ('[Testing] Test "Priorities" has been passed');                   // tests.jsx:37
})([
	[ 5, 
		- 5, 
		3, 
		5, 
		9, 
		7, 
		8 ]
]);
(function (result){                                                                // tests.jsx:40
	var missed = false;
	
	(function test_fancy_arrays_loops_and_stuff (log){                             // tests.jsx:42
		{
			var __0 = [ 'a', 'b', 
				'c' ];
			
			for (var index = 0; index < __0.length; index ++){                     // tests.jsx:43
				var value = __0 [index];
				
				log ([ index, value ]);                                            // tests.jsx:44
			}
			
			__0 = undefined;
		}
		
		{
			var __1 = __createArray (0, 
				10);
			
			for (var key in __1){
				var value = __1 [key];
				
				log ([ key, value ]);                                              // tests.jsx:47
			}
			
			__1 = undefined;
		}
		
		for (var key in __createArray (0, 
			20))
			log ([ key ]);                                                         // tests.jsx:50
		
		log ([                                                                     // tests.jsx:52
			[ 5, 4, 
				3, 
				2, 
				1 ],                                                               // tests.jsx:52
			__createArray (15, 
				1)
		]);
		log ([                                                                     // tests.jsx:53
			__createArray ('a', 'k'),                                              // tests.jsx:53
			[ 'd', 'c', 
				'b', 
				'a' ], 
			__createArray ('k', 'a')
		]);
	})(function (args){                                                            // tests.jsx:54
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:55
			got = JSON.stringify (args);                                           // tests.jsx:56
		
		if (expected === undefined){                                               // tests.jsx:57
			if (!missed){                                                          // tests.jsx:58
				console.log ('Missing entry:');                                    // tests.jsx:59
				missed = true;                                                     // tests.jsx:60
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:64
				function (m, s){                                                   // tests.jsx:65
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:65
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:67
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:68
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:69
	});
	console.log ('[Testing] Test "Fancy arrays, loops and stuff" has been passed');
})([
	[ 0, 
		'a' ], 
	[ 1, 
		'b' ], 
	[ 2, 
		'c' ], 
	[ '0', 0 ], 
	[ '1', 1 ], 
	[ '2', 2 ], 
	[ '3', 3 ], 
	[ '4', 4 ], 
	[ '5', 5 ], 
	[ '6', 6 ], 
	[ '7', 7 ], 
	[ '8', 8 ], 
	[ '9', 9 ], 
	[ '10', 10 ], 
	[ '0' ], 
	[ '1' ], 
	[ '2' ], 
	[ '3' ], 
	[ '4' ], 
	[ '5' ], 
	[ '6' ], 
	[ '7' ], 
	[ '8' ], 
	[ '9' ], 
	[ '10' ], 
	[ '11' ], 
	[ '12' ], 
	[ '13' ], 
	[ '14' ], 
	[ '15' ], 
	[ '16' ], 
	[ '17' ], 
	[ '18' ], 
	[ '19' ], 
	[ '20' ], 
	[
		[ 5, 
			4, 
			3, 
			2, 
			1 ], 
		[
			15, 
			14, 
			13, 
			12, 
			11, 
			10, 
			9, 
			8, 
			7, 
			6, 
			5, 
			4, 
			3, 
			2, 
			1
		]
	], 
	[
		[
			97, 
			98, 
			99, 
			100, 
			101, 
			102, 
			103, 
			104, 
			105, 
			106, 
			107
		], 
		[ 'd', 'c', 'b', 'a' ], 
		[
			107, 
			106, 
			105, 
			104, 
			103, 
			102, 
			101, 
			100, 
			99, 
			98, 
			97
		]
	]
]);
(function (result){                                                                // tests.jsx:74
	var missed = false;
	
	(function test_another_test_for_loops (log){                                   // tests.jsx:76
		var a1 = { a: 1, b: 2, c: 3 },                                             // tests.jsx:77
			a2 = { a: 'a', b: 'b', c: 'c' },                                       // tests.jsx:78
			a3 = [ 1, 2, 
				3, 
				4 ],                                                               // tests.jsx:79
			a4 = [ 'a', 'b', 'c' ];                                                // tests.jsx:80
		
		for (var n in a1)                                                          // tests.jsx:82
			log ([ n ]);                                                           // tests.jsx:82
		
		for (n in a2)                                                              // tests.jsx:83
			log ([ n ]);                                                           // tests.jsx:83
		
		for (var n in a1){                                                         // tests.jsx:85
			var v = a1 [n];
			
			log ([ n ]);                                                           // tests.jsx:85
		}
		
		for (n in a2){                                                             // tests.jsx:86
			v = a2 [n];                                                            // tests.jsx:86
			log ([ n ]);                                                           // tests.jsx:86
		}
		
		for (var __2 = 0; __2 < a3.length; __2 ++){                                // tests.jsx:88
			var n = a3 [__2];
			
			log ([ n ]);                                                           // tests.jsx:88
		}
		
		for (var __3 = 0; __3 < a4.length; __3 ++){                                // tests.jsx:89
			n = a4 [__3];                                                          // tests.jsx:89
			log ([ n ]);                                                           // tests.jsx:89
		}
		
		for (var n = 0; n < a3.length; n ++){                                      // tests.jsx:91
			var v = a3 [n];
			
			log ([ n ]);                                                           // tests.jsx:91
		}
		
		for (n = 0; n < a4.length; n ++){                                          // tests.jsx:92
			v = a4 [n];                                                            // tests.jsx:92
			log ([ n ]);                                                           // tests.jsx:92
		}
		
		{
			var __4 = { a9: 7 };
			
			for (n in __4){                                                        // tests.jsx:94
				v = __4 [n];                                                       // tests.jsx:94
				log ([ n ]);                                                       // tests.jsx:94
			}
			
			__4 = undefined;
		}
		
		for (v in { a10: 7 })                                                      // tests.jsx:95
			log ([ n ]);                                                           // tests.jsx:95
		
		for (var n in { a: 100, b: 102, c: 104, d: log ([ 'n-0' ]) || 106 })
			log ([ n ]);                                                           // tests.jsx:103
		
		{
			var __5 = { a: 100, b: 102, c: 104, d: log ([ 'n-1' ]) || 106 };
			
			for (var i in __5){
				var k = __5 [i];
				
				log ([ i, k ]);                                                    // tests.jsx:111
			}
			
			__5 = undefined;
		}
		
		{
			var __6 = [ 100, 
				102, 
				104, 
				log ([ 'n-2' ]) || 106 ];
			
			for (var i = 0; i < __6.length; i ++){                                 // tests.jsx:113
				var k = __6 [i];
				
				log ([ i, k ]);                                                    // tests.jsx:114
			}
			
			__6 = undefined;
		}
		
		{
			var __8 = [ 100, 
				102, 
				104, 
				log ([ 'n-3' ]) || 106 ];
			
			for (var __7 = 0; __7 < __8.length; __7 ++){
				var k = __8 [__7];
				
				log ([ k ]);                                                       // tests.jsx:117
			}
			
			__8 = undefined;
		}
		
		{
			var __a = 'qwerty';
			
			for (var __9 = 0; __9 < __a.length; __9 ++){
				var n = __a [__9];
				
				log ([ n ]);                                                       // tests.jsx:120
			}
			
			__a = undefined;
		}
		
		{
			var __b = 'qwerty';
			
			for (var n = 0; n < __b.length; n ++){                                 // tests.jsx:122
				var e = __b [n];
				
				log ([ n, e ]);                                                    // tests.jsx:123
			}
			
			__b = undefined;
		}
	})(function (args){                                                            // tests.jsx:124
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:125
			got = JSON.stringify (args);                                           // tests.jsx:126
		
		if (expected === undefined){                                               // tests.jsx:127
			if (!missed){                                                          // tests.jsx:128
				console.log ('Missing entry:');                                    // tests.jsx:129
				missed = true;                                                     // tests.jsx:130
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:134
				function (m, s){                                                   // tests.jsx:135
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:135
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:137
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:138
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:139
	});
	console.log ('[Testing] Test "Another test for loops" has been passed');       // tests.jsx:141
})([
	[ 'a' ], 
	[ 'b' ], 
	[ 'c' ], 
	[ 'a' ], 
	[ 'b' ], 
	[ 'c' ], 
	[ 'a' ], 
	[ 'b' ], 
	[ 'c' ], 
	[ 'a' ], 
	[ 'b' ], 
	[ 'c' ], 
	[ 1 ], 
	[ 2 ], 
	[ 3 ], 
	[ 4 ], 
	[ 'a' ], 
	[ 'b' ], 
	[ 'c' ], 
	[ 0 ], 
	[ 1 ], 
	[ 2 ], 
	[ 3 ], 
	[ 0 ], 
	[ 1 ], 
	[ 2 ], 
	[ 'a9' ], 
	[ 'a9' ], 
	[ 'n-0' ], 
	[ 'a' ], 
	[ 'b' ], 
	[ 'c' ], 
	[ 'd' ], 
	[ 'n-1' ], 
	[ 'a', 100 ], 
	[ 'b', 102 ], 
	[ 'c', 104 ], 
	[ 'd', 106 ], 
	[ 'n-2' ], 
	[ 0, 
		100 ], 
	[ 1, 
		102 ], 
	[ 2, 
		104 ], 
	[ 3, 
		106 ], 
	[ 'n-3' ], 
	[ 100 ], 
	[ 102 ], 
	[ 104 ], 
	[ 106 ], 
	[ 'q' ], 
	[ 'w' ], 
	[ 'e' ], 
	[ 'r' ], 
	[ 't' ], 
	[ 'y' ], 
	[ 0, 
		'q' ], 
	[ 1, 
		'w' ], 
	[ 2, 
		'e' ], 
	[ 3, 
		'r' ], 
	[ 4, 
		't' ], 
	[ 5, 
		'y' ]
]);
(function (result){                                                                // tests.jsx:144
	var missed = false;
	
	(function test_comma_free (log){                                               // tests.jsx:146
		log ([                                                                     // tests.jsx:147
			'string',                                                              // tests.jsx:147
			187, 
			function (arg){                                                        // tests.jsx:150
				return 15;
			}, 
			function (arg){                                                        // tests.jsx:151
				return 18;
			}, 
			{
				a: 20,                                                             // tests.jsx:153
				b: 25,                                                             // tests.jsx:154
				c: [                                                               // tests.jsx:155
					function (arg){                                                // tests.jsx:155
						return 14;
					}, 
					function (arg){                                                // tests.jsx:157
						return 'hi';                                               // tests.jsx:157
					}
				]
			}
		]);
	})(function (args){                                                            // tests.jsx:161
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:162
			got = JSON.stringify (args);                                           // tests.jsx:163
		
		if (expected === undefined){                                               // tests.jsx:164
			if (!missed){                                                          // tests.jsx:165
				console.log ('Missing entry:');                                    // tests.jsx:166
				missed = true;                                                     // tests.jsx:167
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:171
				function (m, s){                                                   // tests.jsx:172
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:172
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:174
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:175
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:176
	});
	console.log ('[Testing] Test "Comma-free" has been passed');                   // tests.jsx:178
})([
	[
		'string',                                                                  // tests.jsx:179
		187, 
		null, 
		null, 
		{ 'a': 20, 'b': 25, 'c': [ null, null ] }
	]
]);
(function (result){                                                                // tests.jsx:181
	var missed = false;
	
	(function test_lambdas (log){                                                  // tests.jsx:183
		var a = function (test){                                                   // tests.jsx:184
				return typeof test;                                                // tests.jsx:184
			}, 
			b = function (arg){                                                    // tests.jsx:185
				return arg;                                                        // tests.jsx:185
			}, 
			c = function (arg){                                                    // tests.jsx:186
				return arg;                                                        // tests.jsx:186
			}, 
			d = function (arg){                                                    // tests.jsx:187
				if (a && b ())                                                     // tests.jsx:187
					return arg;                                                    // tests.jsx:187
				else
					return - arg;                                                  // tests.jsx:187
			}, 
			e = function (arg){                                                    // tests.jsx:188
				return typeof a + a (b);                                           // tests.jsx:188
			};
		
		var f = function (arg){                                                    // tests.jsx:190
			return { a: 'a', b: String (d ()) };
		};
		
		var g = [                                                                  // tests.jsx:195
			function (arg){                                                        // tests.jsx:195
				return { a: 'b' };
			}, 
			function (arg){                                                        // tests.jsx:195
				return b;                                                          // tests.jsx:195
			}
		];
		
		[
			function (arg){                                                        // tests.jsx:197
				if (t){                                                            // tests.jsx:197
					a;                                                             // tests.jsx:197
				} else
					return b;                                                      // tests.jsx:197
			}, 
			function (arg){                                                        // tests.jsx:197
				if (q)                                                             // tests.jsx:197
					return b;                                                      // tests.jsx:197
			}
		];
		log ([                                                                     // tests.jsx:199
			a (1),                                                                 // tests.jsx:199
			b (1),                                                                 // tests.jsx:201
			c (1),                                                                 // tests.jsx:202
			d (1),                                                                 // tests.jsx:203
			e (),                                                                  // tests.jsx:204
			f (),                                                                  // tests.jsx:205
			g [0](),                                                               // tests.jsx:206
			String (g [1]()()),                                                    // tests.jsx:207
			g.length
		]);
	})(function (args){                                                            // tests.jsx:210
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:211
			got = JSON.stringify (args);                                           // tests.jsx:212
		
		if (expected === undefined){                                               // tests.jsx:213
			if (!missed){                                                          // tests.jsx:214
				console.log ('Missing entry:');                                    // tests.jsx:215
				missed = true;                                                     // tests.jsx:216
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:220
				function (m, s){                                                   // tests.jsx:221
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:221
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:223
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:224
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:225
	});
	console.log ('[Testing] Test "Lambdas" has been passed');                      // tests.jsx:227
})([
	[
		'number',                                                                  // tests.jsx:228
		1, 
		1, 
		- 1, 
		'functionfunction',                                                        // tests.jsx:228
		{ 'a': 'a', 'b': 'NaN' }, 
		{ 'a': 'b' }, 
		'undefined',                                                               // tests.jsx:228
		2
	]
]);
(function (result){                                                                // tests.jsx:230
	var missed = false;
	
	(function test_functions (log){                                                // tests.jsx:232
		function a (arg){                                                          // tests.jsx:233
			if (arg === undefined)                                                 // tests.jsx:233
				arg = 18;                                                          // tests.jsx:233
		
			return arg;                                                            // tests.jsx:234
		}
		
		function b (arg){                                                          // tests.jsx:236
			return arg;                                                            // tests.jsx:237
		}
		
		log ([ a (), b () ]);                                                      // tests.jsx:239
	})(function (args){                                                            // tests.jsx:240
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:241
			got = JSON.stringify (args);                                           // tests.jsx:242
		
		if (expected === undefined){                                               // tests.jsx:243
			if (!missed){                                                          // tests.jsx:244
				console.log ('Missing entry:');                                    // tests.jsx:245
				missed = true;                                                     // tests.jsx:246
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:250
				function (m, s){                                                   // tests.jsx:251
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:251
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:253
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:254
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:255
	});
	console.log ('[Testing] Test "Functions" has been passed');                    // tests.jsx:257
})([
	[ 18, 
		null ]
]);
(function (result){                                                                // tests.jsx:260
	var missed = false;
	
	(function test_getters_setters (log){                                          // tests.jsx:262
		var a = {                                                                  // tests.jsx:263
			get a (){                                                              // tests.jsx:263
				return this._a * 2;                                                // tests.jsx:264
			}, 
			set a (v){
				this._a = v;                                                       // tests.jsx:265
			}
		};
		
		a.a = 5;                                                                   // tests.jsx:268
		
		var b = {                                                                  // tests.jsx:270
			get a (){                                                              // tests.jsx:270
				return this._a * 2;                                                // tests.jsx:271
			}, 
			set a (arg){
				return this._a = arg;                                              // tests.jsx:272
			}
		};
		
		b.a = 15;                                                                  // tests.jsx:275
		log ([ a.a, b.a ]);                                                        // tests.jsx:277
	})(function (args){                                                            // tests.jsx:278
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:279
			got = JSON.stringify (args);                                           // tests.jsx:280
		
		if (expected === undefined){                                               // tests.jsx:281
			if (!missed){                                                          // tests.jsx:282
				console.log ('Missing entry:');                                    // tests.jsx:283
				missed = true;                                                     // tests.jsx:284
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:288
				function (m, s){                                                   // tests.jsx:289
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:289
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:291
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:292
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:293
	});
	console.log ('[Testing] Test "Getters/Setters" has been passed');              // tests.jsx:295
})([
	[ 10, 
		30 ]
]);
(function (result){                                                                // tests.jsx:298
	var missed = false;
	
	(function test_classes_with_getters_setters (log){                             // tests.jsx:300
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:301
			this.__A__a = 7;
		}
		Object.defineProperty (A.prototype, 
			'a', 
			{
				get: (function (){
					return this.__A__a * 2;
				}), 
				set: (function (v){
					this.__A__a = v;                                               // tests.jsx:306
				})
			})
		Object.defineProperty (A.prototype, 
			'b', 
			{
				get: (function (){
					return 15;
				})
			})
		Object.defineProperty (A.prototype, 
			'a2', 
			{
				get: (function (){
					return this.__A__a * 3;
				}), 
				set: (function (arg){
					return this.__A__a = arg;                                      // tests.jsx:310
				})
			})
		Object.defineProperty (A.prototype, 
			'b2', 
			{
				get: (function (){
					return 25;
				})
			})
		Object.defineProperty (A.prototype, 
			'__a3', 
			{
				get: (function (){
					return this.__A__a;
				})
			})
		
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:315
			A.apply (this, 
				arguments);
		}
		__prototypeExtend (B, 
			A);
		B.prototype.test = function (){                                            // tests.jsx:316
			return this.a2 + this.__a3;
		};
		
		var a = new A ();
		
		a.a = 5;                                                                   // tests.jsx:322
		log ([ a.a, a.b, a.a2, a.b2 ]);                                            // tests.jsx:323
		
		var b = new B ();
		
		log ([ b.test () ]);                                                       // tests.jsx:326
	})(function (args){                                                            // tests.jsx:327
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:328
			got = JSON.stringify (args);                                           // tests.jsx:329
		
		if (expected === undefined){                                               // tests.jsx:330
			if (!missed){                                                          // tests.jsx:331
				console.log ('Missing entry:');                                    // tests.jsx:332
				missed = true;                                                     // tests.jsx:333
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:337
				function (m, s){                                                   // tests.jsx:338
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:338
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:340
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:341
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:342
	});
	console.log ('[Testing] Test "Classes with getters/setters" has been passed');
})([
	[ 10, 
		15, 
		15, 
		25 ], 
	[ 28 ]
]);
(function (result){                                                                // tests.jsx:347
	var missed = false;
	
	(function test_classes_with_static_getters_setters (log){                      // tests.jsx:349
		/* Class "A" declaration */
		var A = (function (){                                                      // tests.jsx:350
			var A = function (){}, 
				_a = 7;
			
			Object.defineProperty (A,                                              // tests.jsx:350
				'a', 
				{
					get: (function (){
						return _a * 2;                                             // tests.jsx:353
					}), 
					set: (function (v){
						_a = v;                                                    // tests.jsx:355
					})
				})
			
			Object.defineProperty (A,                                              // tests.jsx:350
				'b', 
				{
					get: (function (){
						return 15;
					})
				})
			
			Object.defineProperty (A,                                              // tests.jsx:350
				'a2', 
				{
					get: (function (){
						return _a * 3;                                             // tests.jsx:357
					}), 
					set: (function (arg){
						return _a = arg;                                           // tests.jsx:359
					})
				})
			
			Object.defineProperty (A,                                              // tests.jsx:350
				'b2', 
				{
					get: (function (){
						return 25;
					})
				})
			
			Object.defineProperty (A,                                              // tests.jsx:350
				'__a3', 
				{
					get: (function (){
						return _a;                                                 // tests.jsx:361
					})
				})
			return A;
		})();
		
		/* Class "B" declaration */
		function B (){}
		__prototypeExtend (B, 
			A);
		B.prototype.test = function (){                                            // tests.jsx:365
			return A.a2 + A.__a3;
		};
		
		A.a = 5;                                                                   // tests.jsx:370
		log ([ A.a, A.b, A.a2, A.b2 ]);                                            // tests.jsx:371
		
		var b = new B ();
		
		A.a = 8;                                                                   // tests.jsx:374
		log ([ b.test () ]);                                                       // tests.jsx:375
	})(function (args){                                                            // tests.jsx:376
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:377
			got = JSON.stringify (args);                                           // tests.jsx:378
		
		if (expected === undefined){                                               // tests.jsx:379
			if (!missed){                                                          // tests.jsx:380
				console.log ('Missing entry:');                                    // tests.jsx:381
				missed = true;                                                     // tests.jsx:382
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:386
				function (m, s){                                                   // tests.jsx:387
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:387
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:389
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:390
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:391
	});
	console.log ('[Testing] Test "Classes with static getters/setters" has been passed');
})([
	[ 10, 
		15, 
		15, 
		25 ], 
	[ 32 ]
]);
(function (result){                                                                // tests.jsx:396
	var missed = false;
	
	(function test_classes (log){                                                  // tests.jsx:398
		/* Class "First" declaration */
		var First = (function (){                                                  // tests.jsx:399
			var First = function (dog){                                            // tests.jsx:399
					this.__First_dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';    // tests.jsx:402
					this.__First_horse = 'IGOGO, MOTHERFUCKERS!';                  // tests.jsx:403
					log ([ '.', '"First" says "Hi!"' ]);                           // tests.jsx:406
					this.__First_dog = dog + ' (' + cat + ')';                     // tests.jsx:407
					log ([ '.', '.', this.__First_dog ]);                          // tests.jsx:408
				}, 
				cat = 'Meow?';                                                     // tests.jsx:400
			
			First.prototype.cow = function (){                                     // tests.jsx:411
				log ([ '.', 'Mo-o-o-o from "First".' ]);                           // tests.jsx:412
			};
			return First;
		})();
		
		/* Class "Second" declaration */
		var Second = (function (){                                                 // tests.jsx:416
			var Second = function (){                                              // tests.jsx:416
					if (this.constructor === Second)
						throw new Error ('Trying to instantiate abstract class Second');
					
					this.horse = 'Horse, tazshemta';                               // tests.jsx:419
					First.apply (this, 
						arguments);
				}, 
				cat = 'Meow!';                                                     // tests.jsx:417
			
			__prototypeExtend (Second, 
				First);
			Second.prototype.whoIsIt = function (){                                // tests.jsx:421
				log ([ '.', 'Michael Jackson, for example' ]);                     // tests.jsx:422
				log ([ '.', 'Or cat:', cat ]);                                     // tests.jsx:423
				log ([ '.', 'Or dog:', Second.__dog ]);                            // tests.jsx:424
				log ([ '.', 'Or horse:', this.horse ]);                            // tests.jsx:425
			};
			Second.prototype.eat = function (){                                    // tests.jsx:428
				log ([ '.', 'Wow, yammy!' ]);                                      // tests.jsx:429
			};
			Second.prototype.sleep = function (){                                  // tests.jsx:432
				log ([ '.', 'Z-z-z-z...' ]);                                       // tests.jsx:433
			};
			Second.__dog = 'WOOF! WOOF! WOOF!';                                    // tests.jsx:418
			return Second;
		})();
		
		/* Class "Third" declaration */
		function Third (){                                                         // tests.jsx:439
			Second.apply (this, 
				arguments);
		}
		__prototypeExtend (Third, 
			Second);
		Third.prototype.eat = function (){                                         // tests.jsx:440
			Second.prototype.eat.apply (this, arguments);                          // tests.jsx:416
			log ([ '. .', 'And chew-chew-chew!' ]);                                // tests.jsx:442
		};
		Third.prototype.sleep = function (){                                       // tests.jsx:445
			Second.prototype.sleep.apply (this, arguments);                        // tests.jsx:416
			log ([ '. .', 'Now with 20% more snoring!' ]);                         // tests.jsx:447
		};
		Third.prototype.poop = function (){                                        // tests.jsx:450
			log ([ '.', 'E-e-e-w.' ]);                                             // tests.jsx:451
		};
		
		/* Class "Fourth" declaration */
		function Fourth (){                                                        // tests.jsx:455
			Third.call (this, 
				'Dogs don\'t say "KRAKOZYABRA"');
			log ([ '.', '"Fourth" in da house.' ]);                                // tests.jsx:458
		}
		__prototypeExtend (Fourth, 
			Third);
		Fourth.prototype.poop = function (){                                       // tests.jsx:461
			return log ([ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]);
		};
		
		var c;
		
		log ([ 'Here come "First"!' ]);                                            // tests.jsx:467
		new First ('What do dogs say?');                                           // tests.jsx:468
		log ([ 'And now — "Second"!' ]);                                           // tests.jsx:470
		
		try {
			new Second ('Nothing here.');                                          // tests.jsx:472
		} catch (e){
			log ([ '.', '"Second" is too tired: ' + e.message ]);                  // tests.jsx:474
		} 
		
		log ([ 'Next is "Third"!' ]);                                              // tests.jsx:476
		c = new Third ('What do dogs say? Last try!');                             // tests.jsx:477
		log ([ '"Third" has something to eat!' ]);                                 // tests.jsx:479
		c.eat ();                                                                  // tests.jsx:480
		log ([ 'Now he wants to sleep!' ]);                                        // tests.jsx:482
		c.sleep ();                                                                // tests.jsx:483
		log ([                                                                     // tests.jsx:485
			'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
		]);
		c.poop ();                                                                 // tests.jsx:486
		log ([                                                                     // tests.jsx:488
			'And now "Third" has something to tell us! "Third", who is it?'
		]);
		c.whoIsIt ();                                                              // tests.jsx:489
		log ([ 'And, finally, "Fourth".' ]);                                       // tests.jsx:491
		c = new Fourth ();                                                         // tests.jsx:492
		log ([ 'Okay, give us some your regular crap.' ]);                         // tests.jsx:494
		c.poop ();                                                                 // tests.jsx:495
	})(function (args){                                                            // tests.jsx:496
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:497
			got = JSON.stringify (args);                                           // tests.jsx:498
		
		if (expected === undefined){                                               // tests.jsx:499
			if (!missed){                                                          // tests.jsx:500
				console.log ('Missing entry:');                                    // tests.jsx:501
				missed = true;                                                     // tests.jsx:502
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:506
				function (m, s){                                                   // tests.jsx:507
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:507
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:509
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:510
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:511
	});
	console.log ('[Testing] Test "Classes" has been passed');                      // tests.jsx:513
})([
	[ 'Here come "First"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? (Meow?)' ], 
	[ 'And now — "Second"!' ], 
	[
		'.',                                                                       // tests.jsx:514
		'"Second" is too tired: Trying to instantiate abstract class Second'
	], 
	[ 'Next is "Third"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? Last try! (Meow?)' ], 
	[ '"Third" has something to eat!' ], 
	[ '.', 'Wow, yammy!' ], 
	[ '. .', 'And chew-chew-chew!' ], 
	[ 'Now he wants to sleep!' ], 
	[ '.', 'Z-z-z-z...' ], 
	[ '. .', 'Now with 20% more snoring!' ], 
	[
		'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
	], 
	[ '.', 'E-e-e-w.' ], 
	[
		'And now "Third" has something to tell us! "Third", who is it?'
	], 
	[ '.', 'Michael Jackson, for example' ], 
	[ '.', 'Or cat:', 'Meow!' ], 
	[ '.', 'Or dog:', 'WOOF! WOOF! WOOF!' ], 
	[ '.', 'Or horse:', 'Horse, tazshemta' ], 
	[ 'And, finally, "Fourth".' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'Dogs don\'t say "KRAKOZYABRA" (Meow?)' ], 
	[ '.', '"Fourth" in da house.' ], 
	[ 'Okay, give us some your regular crap.' ], 
	[ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]
]);
(function (result){                                                                // tests.jsx:516
	var missed = false;
	
	(function test_static_fields_with_initializers (log){                          // tests.jsx:518
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:531
			log ([ B.b ]);                                                         // tests.jsx:535
		}
		B.a = 1;                                                                   // tests.jsx:532
		B.b = B.a * 2;                                                             // tests.jsx:532
		
		/* Class "A" declaration */
		var A = (function (){                                                      // tests.jsx:519
			var A = function (){                                                   // tests.jsx:519
					log ([ b, A.pb ]);                                             // tests.jsx:527
				}, 
				a = 2,                                                             // tests.jsx:520
				b = a + 2;                                                         // tests.jsx:521
			
			A.pa = 2;                                                              // tests.jsx:523
			A.pb = A.pa + 2;                                                       // tests.jsx:524
			return A;
		})();
		
		new A ();                                                                  // tests.jsx:539
		new B ();                                                                  // tests.jsx:540
	})(function (args){                                                            // tests.jsx:541
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:542
			got = JSON.stringify (args);                                           // tests.jsx:543
		
		if (expected === undefined){                                               // tests.jsx:544
			if (!missed){                                                          // tests.jsx:545
				console.log ('Missing entry:');                                    // tests.jsx:546
				missed = true;                                                     // tests.jsx:547
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:551
				function (m, s){                                                   // tests.jsx:552
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:552
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:554
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:555
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:556
	});
	console.log ('[Testing] Test "Static fields with initializers" has been passed');
})([
	[ 4, 
		4 ], 
	[ 2 ]
]);
(function (result){                                                                // tests.jsx:561
	var missed = false;
	
	(function test_constructors (log){                                             // tests.jsx:563
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:564
			log ([ 'A' ]);                                                         // tests.jsx:566
		}
		
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:570
			A.apply (this, 
				arguments);
			log ([ 'B' ]);                                                         // tests.jsx:572
		}
		__prototypeExtend (B, 
			A);
		
		/* Class "C" declaration */
		function C (){                                                             // tests.jsx:576
			B.apply (this, 
				arguments);
		}
		__prototypeExtend (C, 
			B);
		
		/* Class "D" declaration */
		function D (){                                                             // tests.jsx:579
			C.apply (this, 
				arguments);
			log ([ 'D' ]);                                                         // tests.jsx:581
		}
		__prototypeExtend (D, 
			C);
		
		/* Class "E" declaration */
		function E (arg){                                                          // tests.jsx:585
			D.apply (this, 
				arguments);
			log ([ 'E(' + arg + ')' ]);                                            // tests.jsx:587
		}
		__prototypeExtend (E, 
			D);
		
		/* Class "F" declaration */
		function F (arg){                                                          // tests.jsx:591
			E.call (this, 
				arg);
			log ([ 'F(' + arg + ')' ]);                                            // tests.jsx:594
		}
		__prototypeExtend (F, 
			E);
		
		/* Class "G" declaration */
		function G (){                                                             // tests.jsx:598
			F.apply (this, 
				arguments);
		}
		__prototypeExtend (G, 
			F);
		
		{
			var __c = [ A, B, C, D, E, F, G ];
			
			for (var i = 0; i < __c.length; i ++){                                 // tests.jsx:600
				var c = __c [i];
				
				log ([ c.name + ':' ]);                                            // tests.jsx:601
				new c (i);                                                         // tests.jsx:602
			}
			
			__c = undefined;
		}
	})(function (args){                                                            // tests.jsx:604
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:605
			got = JSON.stringify (args);                                           // tests.jsx:606
		
		if (expected === undefined){                                               // tests.jsx:607
			if (!missed){                                                          // tests.jsx:608
				console.log ('Missing entry:');                                    // tests.jsx:609
				missed = true;                                                     // tests.jsx:610
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:614
				function (m, s){                                                   // tests.jsx:615
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:615
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:617
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:618
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:619
	});
	console.log ('[Testing] Test "Constructors" has been passed');                 // tests.jsx:621
})([
	[ 'A:' ], 
	[ 'A' ], 
	[ 'B:' ], 
	[ 'A' ], 
	[ 'B' ], 
	[ 'C:' ], 
	[ 'A' ], 
	[ 'B' ], 
	[ 'D:' ], 
	[ 'A' ], 
	[ 'B' ], 
	[ 'D' ], 
	[ 'E:' ], 
	[ 'A' ], 
	[ 'B' ], 
	[ 'D' ], 
	[ 'E(4)' ], 
	[ 'F:' ], 
	[ 'A' ], 
	[ 'B' ], 
	[ 'D' ], 
	[ 'E(5)' ], 
	[ 'F(5)' ], 
	[ 'G:' ], 
	[ 'A' ], 
	[ 'B' ], 
	[ 'D' ], 
	[ 'E(6)' ], 
	[ 'F(6)' ]
]);
(function (result){                                                                // tests.jsx:624
	var missed = false;
	
	(function test_hardcore_test_for_classes (log){                                // tests.jsx:626
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:627
			this.__parent = 'WOOHOO!';                                             // tests.jsx:628
		}
		
		/* Class "B" declaration */
		var B = (function (){                                                      // tests.jsx:631
			var B = function (variable){                                           // tests.jsx:631
					this.__B_testObj = {
						find: (function (){                                        // tests.jsx:709
							return [ { variable: 'deep!' } ];
						})
					};
					A.apply (this, 
						arguments);
					this.__B_variable = variable;                                  // tests.jsx:638
					this.qwerty = 'default';                                       // tests.jsx:639
				}, 
				privateStatic = 'done';                                            // tests.jsx:632
			
			__prototypeExtend (B, 
				A);
			B.prototype.test = function (a, b){                                    // tests.jsx:642
				var __;
				
				a [a instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:643
				b [b instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:644
				log ([                                                             // tests.jsx:645
					this.__B_variable,                                             // tests.jsx:645
					a [a instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:645
					b [b instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:645
					(__ = new A (), __ [__ instanceof A ? '__parent' : 'parent'])
				]);
			};
			B.prototype.other = function (a, b){                                   // tests.jsx:648
				var __;
				
				function getA (){                                                  // tests.jsx:649
					log ([ '[getA]' ]);                                            // tests.jsx:650
					return {
						get: (function (){                                         // tests.jsx:652
							log ([ '[getA][get]' ]);                               // tests.jsx:653
							return a;                                              // tests.jsx:654
						})
					};
				}
				
				function getB (){                                                  // tests.jsx:659
					log ([ '[getB]' ]);                                            // tests.jsx:660
					return {
						get: (function (){                                         // tests.jsx:662
							log ([ '[getB][get]' ]);                               // tests.jsx:663
							return b;                                              // tests.jsx:664
						})
					};
				}
				
				log ([                                                             // tests.jsx:669
					(__ = getA ().get (),                                          // tests.jsx:669
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed'), 
					(__ = getB ().get (),                                          // tests.jsx:669
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed')
				]);
				log ([ 'ok' ]);                                                    // tests.jsx:670
				log ([                                                             // tests.jsx:671
					(__ = getA ().get (),                                          // tests.jsx:671
						__ [__ instanceof B ? '__B_variable' : 'variable']), 
					(__ = getB ().get (),                                          // tests.jsx:671
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.final = function (a, b){                                   // tests.jsx:674
				function getA (){                                                  // tests.jsx:675
					log ([ '[getA]' ]);                                            // tests.jsx:676
					return a;                                                      // tests.jsx:677
				}
				
				function getB (){                                                  // tests.jsx:680
					log ([ '[getB]' ]);                                            // tests.jsx:681
					return b;                                                      // tests.jsx:682
				}
				
				log ([ getA ().qwerty += '-changed', getB ().qwerty += '-changed' ]);
				log ([ a.qwerty, b.qwerty ]);                                      // tests.jsx:686
			};
			B.prototype.method = function (a, b){                                  // tests.jsx:689
				var __;
				
				function getA (){                                                  // tests.jsx:690
					log ([ '[getA]' ]);                                            // tests.jsx:691
					return a;                                                      // tests.jsx:692
				}
				
				function getB (){                                                  // tests.jsx:695
					log ([ '[getB]' ]);                                            // tests.jsx:696
					return b;                                                      // tests.jsx:697
				}
				
				log ([                                                             // tests.jsx:700
					(__ = getA (),                                                 // tests.jsx:700
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						1, 
						2), 
					(__ = getB (),                                                 // tests.jsx:700
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						3)
				]);
			};
			B.prototype.__B_testMethod = function (){                              // tests.jsx:703
				log ([ arguments ]);                                               // tests.jsx:704
				return this instanceof B;                                          // tests.jsx:705
			};
			B.prototype.awful = function (){                                       // tests.jsx:718
				var __;
				
				log ([                                                             // tests.jsx:719
					(__ = this.__B_testObj.find ()[0],                             // tests.jsx:719
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.staticTest = function (obj){                               // tests.jsx:722
				log ([ obj.privateStatic, privateStatic ]);                        // tests.jsx:723
			};
			return B;
		})();
		
		new B ('first').method (new B ('second'),                                  // tests.jsx:727
			{
				testMethod: (function (arg){                                       // tests.jsx:727
					return this.result + arg;                                      // tests.jsx:727
				}), 
				result: 'success'
			});
		new B ('first').test (new B ('second'), { variable: 'success' });          // tests.jsx:728
		new B ('first').other (new B ('second'), { variable: 'success' });         // tests.jsx:729
		new B ('first').final (new B ('second'), { qwerty: 'qwerty' });            // tests.jsx:730
		new B ().awful ();                                                         // tests.jsx:731
		new B ('first').staticTest ({ privateStatic: 'arg' });                     // tests.jsx:732
	})(function (args){                                                            // tests.jsx:733
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:734
			got = JSON.stringify (args);                                           // tests.jsx:735
		
		if (expected === undefined){                                               // tests.jsx:736
			if (!missed){                                                          // tests.jsx:737
				console.log ('Missing entry:');                                    // tests.jsx:738
				missed = true;                                                     // tests.jsx:739
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:743
				function (m, s){                                                   // tests.jsx:744
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:744
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:746
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:747
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:748
	});
	console.log ('[Testing] Test "Hardcore test for classes" has been passed');    // tests.jsx:750
})([
	[ '[getA]' ], 
	[ { '0': 1, '1': 2 } ], 
	[ '[getB]' ], 
	[ true, 
		'success3' ], 
	[ 'first', 'second-changed', 'success-changed', 'WOOHOO!' ], 
	[ '[getA]' ], 
	[ '[getA][get]' ], 
	[ '[getB]' ], 
	[ '[getB][get]' ], 
	[ 'second-changed', 'success-changed' ], 
	[ 'ok' ], 
	[ '[getA]' ], 
	[ '[getA][get]' ], 
	[ '[getB]' ], 
	[ '[getB][get]' ], 
	[ 'second-changed', 'success-changed' ], 
	[ '[getA]' ], 
	[ '[getB]' ], 
	[ 'default-changed', 'qwerty-changed' ], 
	[ 'default-changed', 'qwerty-changed' ], 
	[ 'deep!' ], 
	[ 'arg', 'done' ]
]);
(function (result){                                                                // tests.jsx:753
	var missed = false;
	
	(function test_access_through___that (log){                                    // tests.jsx:755
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:756
			var __that = this;
			
			this.__A_a = 'ok-a';                                                   // tests.jsx:757
			this.__A_b = 'ok-b';                                                   // tests.jsx:757
			Function.prototype.call.call ((function (arg){                         // tests.jsx:759
				log ([ '[A]', __that.__A_a, this ['b'] ]);                         // tests.jsx:760
			}).bind ({ b: 'ok-ok-ok-b' }),                                         // tests.jsx:761
			10);
			log ([ '[B]', this.__A_a, this.__A_b ]);                               // tests.jsx:762
		}
		
		new A ();                                                                  // tests.jsx:766
	})(function (args){                                                            // tests.jsx:767
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:768
			got = JSON.stringify (args);                                           // tests.jsx:769
		
		if (expected === undefined){                                               // tests.jsx:770
			if (!missed){                                                          // tests.jsx:771
				console.log ('Missing entry:');                                    // tests.jsx:772
				missed = true;                                                     // tests.jsx:773
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:777
				function (m, s){                                                   // tests.jsx:778
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:778
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:780
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:781
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:782
	});
	console.log ('[Testing] Test "Access through __that" has been passed');        // tests.jsx:784
})([
	[ '[A]', 'ok-a', 'ok-ok-ok-b' ], 
	[ '[B]', 'ok-a', 'ok-b' ]
]);
(function (result){                                                                // tests.jsx:787
	var missed = false;
	
	(function test_for_parser_and_generator (log){                                 // tests.jsx:789
		[ 0, 
			1, 
			2, 
			3, 
			4, 
			5 ];
		[ 9, 
			8, 
			7, 
			6, 
			5 ];
		
		var a = function (){                                                       // tests.jsx:793
				log ([                                                             // tests.jsx:794
					'5',                                                           // tests.jsx:794
					'58', 
					'test58', 
					'begin insert middle test end', 
					'5-%0-8', 
					'5-5-8'
				]);
			}, 
			b = function (variable5, variable8){                                   // tests.jsx:803
				if (variable5 === undefined)                                       // tests.jsx:803
					variable5 = 1;                                                 // tests.jsx:803
			
				if (variable8 === undefined)                                       // tests.jsx:803
					variable8 = 'K';                                               // tests.jsx:803
			
				function q (){}
				
				log ([                                                             // tests.jsx:806
					'' + variable5,                                                // tests.jsx:806
					'' + variable5 + variable8,                                    // tests.jsx:808
					'test' + variable5 + variable8
				]);
				
				function a (){                                                     // tests.jsx:812
					console.warn ('Not implemented at 812 line of tests.jsx');     // tests.jsx:812
				}
				
				function b (){}
				
				if (a)                                                             // tests.jsx:816
					function s (){}
			};
		
		log ([ 'hi' ]);                                                            // tests.jsx:820
		
		while (0);
		
		log ([                                                                     // tests.jsx:824
			0x86,                                                                  // tests.jsx:824
			'test',                                                                // tests.jsx:827
			'\n\r\t',                                                              // tests.jsx:828
			'multiline\
	string',                                                                       // tests.jsx:830
			'qqq\'qqq',                                                            // tests.jsx:831
			'\u0061',                                                              // tests.jsx:832
			'\%\~'
		]);
		log ([                                                                     // tests.jsx:836
			'begin ' + console + ' end',                                           // tests.jsx:836
			'' + console,                                                          // tests.jsx:838
			'be\ngin \'' + console + ' middle ' + JSON + ' end',                   // tests.jsx:840
			'', 
			'attaching test', 
			'here goes hardcore test', 
			'really hardcore te\'st', 
			'really hardcore te"st'
		]);
		a ();                                                                      // tests.jsx:850
	})(function (args){                                                            // tests.jsx:851
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:852
			got = JSON.stringify (args);                                           // tests.jsx:853
		
		if (expected === undefined){                                               // tests.jsx:854
			if (!missed){                                                          // tests.jsx:855
				console.log ('Missing entry:');                                    // tests.jsx:856
				missed = true;                                                     // tests.jsx:857
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:861
				function (m, s){                                                   // tests.jsx:862
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:862
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:864
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:865
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:866
	});
	console.log ('[Testing] Test "For parser and generator" has been passed');     // tests.jsx:868
})([
	[ 'hi' ], 
	[
		134, 
		'test',                                                                    // tests.jsx:869
		'\n\r\t',                                                                  // tests.jsx:869
		'multiline\tstring',                                                       // tests.jsx:869
		'qqq\'qqq',                                                                // tests.jsx:869
		'a',                                                                       // tests.jsx:869
		'%~'
	], 
	[
		'begin [object Object] end',                                               // tests.jsx:869
		'[object Object]',                                                         // tests.jsx:869
		'be\ngin \'[object Object] middle [object JSON] end',                      // tests.jsx:869
		'',                                                                        // tests.jsx:869
		'attaching test',                                                          // tests.jsx:869
		'here goes hardcore test',                                                 // tests.jsx:869
		'really hardcore te\'st',                                                  // tests.jsx:869
		'really hardcore te"st'
	], 
	[
		'5',                                                                       // tests.jsx:869
		'58',                                                                      // tests.jsx:869
		'test58',                                                                  // tests.jsx:869
		'begin insert middle test end',                                            // tests.jsx:869
		'5-%0-8',                                                                  // tests.jsx:869
		'5-5-8'
	]
]);
(function (result){                                                                // tests.jsx:871
	var missed = false;
	
	(function test_multiline (log){                                                // tests.jsx:873
		var first = " first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			second = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			third = "first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line", 
			fourth = "first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line", 
			fifth = "\t\t first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line", 
			symbols = "'\"`";                                                      // tests.jsx:903
		
		log ([ first ]);                                                           // tests.jsx:905
		log ([ second ]);                                                          // tests.jsx:906
		log ([ third ]);                                                           // tests.jsx:907
		log ([ fourth ]);                                                          // tests.jsx:908
		log ([ fifth ]);                                                           // tests.jsx:909
		log ([ symbols ]);                                                         // tests.jsx:910
	})(function (args){                                                            // tests.jsx:911
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:912
			got = JSON.stringify (args);                                           // tests.jsx:913
		
		if (expected === undefined){                                               // tests.jsx:914
			if (!missed){                                                          // tests.jsx:915
				console.log ('Missing entry:');                                    // tests.jsx:916
				missed = true;                                                     // tests.jsx:917
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:921
				function (m, s){                                                   // tests.jsx:922
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:922
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:924
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:925
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:926
	});
	console.log ('[Testing] Test "Multiline" has been passed');                    // tests.jsx:928
})([
	[
		' first line\nsecond line\n\ttabbed line\n\tanother one\nlast line'
	], 
	[
		'first line\nsecond line\n\ttabbed line\n\tanother one\nlast line'
	], 
	[
		'first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line'
	], 
	[
		'first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line'
	], 
	[
		'\t\t first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line'
	], 
	[ '\'"`' ]
]);
