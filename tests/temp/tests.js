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
	
	(function test_classes (log){                                                  // tests.jsx:349
		/* Class "First" declaration */
		var First = (function (){                                                  // tests.jsx:350
			var First = function (dog){                                            // tests.jsx:350
					this.__First_dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';    // tests.jsx:353
					this.__First_horse = 'IGOGO, MOTHERFUCKERS!';                  // tests.jsx:354
					log ([ '.', '"First" says "Hi!"' ]);                           // tests.jsx:357
					this.__First_dog = dog + ' (' + cat + ')';                     // tests.jsx:358
					log ([ '.', '.', this.__First_dog ]);                          // tests.jsx:359
				}, 
				cat = 'Meow?';                                                     // tests.jsx:351
			
			First.prototype.cow = function (){                                     // tests.jsx:362
				log ([ '.', 'Mo-o-o-o from "First".' ]);                           // tests.jsx:363
			};
			return First;
		})();
		
		/* Class "Second" declaration */
		var Second = (function (){                                                 // tests.jsx:367
			var Second = function (){                                              // tests.jsx:367
					if (this.constructor === Second)
						throw new Error ('Trying to instantiate abstract class Second');
					
					this.horse = 'Horse, tazshemta';                               // tests.jsx:370
					First.apply (this, 
						arguments);
				}, 
				cat = 'Meow!';                                                     // tests.jsx:368
			
			__prototypeExtend (Second, 
				First);
			Second.prototype.whoIsIt = function (){                                // tests.jsx:372
				log ([ '.', 'Michael Jackson, for example' ]);                     // tests.jsx:373
				log ([ '.', 'Or cat:', cat ]);                                     // tests.jsx:374
				log ([ '.', 'Or dog:', Second.__dog ]);                            // tests.jsx:375
				log ([ '.', 'Or horse:', this.horse ]);                            // tests.jsx:376
			};
			Second.prototype.eat = function (){                                    // tests.jsx:379
				log ([ '.', 'Wow, yammy!' ]);                                      // tests.jsx:380
			};
			Second.prototype.sleep = function (){                                  // tests.jsx:383
				log ([ '.', 'Z-z-z-z...' ]);                                       // tests.jsx:384
			};
			Second.__dog = 'WOOF! WOOF! WOOF!';                                    // tests.jsx:369
			return Second;
		})();
		
		/* Class "Third" declaration */
		function Third (){                                                         // tests.jsx:390
			Second.apply (this, 
				arguments);
		}
		__prototypeExtend (Third, 
			Second);
		Third.prototype.eat = function (){                                         // tests.jsx:391
			Second.prototype.eat.apply (this, arguments);                          // tests.jsx:367
			log ([ '. .', 'And chew-chew-chew!' ]);                                // tests.jsx:393
		};
		Third.prototype.sleep = function (){                                       // tests.jsx:396
			Second.prototype.sleep.apply (this, arguments);                        // tests.jsx:367
			log ([ '. .', 'Now with 20% more snoring!' ]);                         // tests.jsx:398
		};
		Third.prototype.poop = function (){                                        // tests.jsx:401
			log ([ '.', 'E-e-e-w.' ]);                                             // tests.jsx:402
		};
		
		/* Class "Fourth" declaration */
		function Fourth (){                                                        // tests.jsx:406
			Third.call (this, 
				'Dogs don\'t say "KRAKOZYABRA"');
			log ([ '.', '"Fourth" in da house.' ]);                                // tests.jsx:409
		}
		__prototypeExtend (Fourth, 
			Third);
		Fourth.prototype.poop = function (){                                       // tests.jsx:412
			return log ([ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]);
		};
		
		var c;
		
		log ([ 'Here come "First"!' ]);                                            // tests.jsx:418
		new First ('What do dogs say?');                                           // tests.jsx:419
		log ([ 'And now — "Second"!' ]);                                           // tests.jsx:421
		
		try {
			new Second ('Nothing here.');                                          // tests.jsx:423
		} catch (e){
			log ([ '.', '"Second" is too tired: ' + e.message ]);                  // tests.jsx:425
		} 
		
		log ([ 'Next is "Third"!' ]);                                              // tests.jsx:427
		c = new Third ('What do dogs say? Last try!');                             // tests.jsx:428
		log ([ '"Third" has something to eat!' ]);                                 // tests.jsx:430
		c.eat ();                                                                  // tests.jsx:431
		log ([ 'Now he wants to sleep!' ]);                                        // tests.jsx:433
		c.sleep ();                                                                // tests.jsx:434
		log ([                                                                     // tests.jsx:436
			'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
		]);
		c.poop ();                                                                 // tests.jsx:437
		log ([                                                                     // tests.jsx:439
			'And now "Third" has something to tell us! "Third", who is it?'
		]);
		c.whoIsIt ();                                                              // tests.jsx:440
		log ([ 'And, finally, "Fourth".' ]);                                       // tests.jsx:442
		c = new Fourth ();                                                         // tests.jsx:443
		log ([ 'Okay, give us some your regular crap.' ]);                         // tests.jsx:445
		c.poop ();                                                                 // tests.jsx:446
	})(function (args){                                                            // tests.jsx:447
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:448
			got = JSON.stringify (args);                                           // tests.jsx:449
		
		if (expected === undefined){                                               // tests.jsx:450
			if (!missed){                                                          // tests.jsx:451
				console.log ('Missing entry:');                                    // tests.jsx:452
				missed = true;                                                     // tests.jsx:453
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:457
				function (m, s){                                                   // tests.jsx:458
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:458
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:460
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:461
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:462
	});
	console.log ('[Testing] Test "Classes" has been passed');                      // tests.jsx:464
})([
	[ 'Here come "First"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? (Meow?)' ], 
	[ 'And now — "Second"!' ], 
	[
		'.',                                                                       // tests.jsx:465
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
(function (result){                                                                // tests.jsx:467
	var missed = false;
	
	(function test_static_fields_with_initializers (log){                          // tests.jsx:469
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:482
			log ([ B.b ]);                                                         // tests.jsx:486
		}
		B.a = 1;                                                                   // tests.jsx:483
		B.b = B.a * 2;                                                             // tests.jsx:483
		
		/* Class "A" declaration */
		var A = (function (){                                                      // tests.jsx:470
			var A = function (){                                                   // tests.jsx:470
					log ([ b, A.pb ]);                                             // tests.jsx:478
				}, 
				a = 2,                                                             // tests.jsx:471
				b = a + 2;                                                         // tests.jsx:472
			
			A.pa = 2;                                                              // tests.jsx:474
			A.pb = A.pa + 2;                                                       // tests.jsx:475
			return A;
		})();
		
		new A ();                                                                  // tests.jsx:490
		new B ();                                                                  // tests.jsx:491
	})(function (args){                                                            // tests.jsx:492
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:493
			got = JSON.stringify (args);                                           // tests.jsx:494
		
		if (expected === undefined){                                               // tests.jsx:495
			if (!missed){                                                          // tests.jsx:496
				console.log ('Missing entry:');                                    // tests.jsx:497
				missed = true;                                                     // tests.jsx:498
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:502
				function (m, s){                                                   // tests.jsx:503
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:503
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:505
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:506
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:507
	});
	console.log ('[Testing] Test "Static fields with initializers" has been passed');
})([
	[ 4, 
		4 ], 
	[ 2 ]
]);
(function (result){                                                                // tests.jsx:512
	var missed = false;
	
	(function test_constructors (log){                                             // tests.jsx:514
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:515
			log ([ 'A' ]);                                                         // tests.jsx:517
		}
		
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:521
			A.apply (this, 
				arguments);
			log ([ 'B' ]);                                                         // tests.jsx:523
		}
		__prototypeExtend (B, 
			A);
		
		/* Class "C" declaration */
		function C (){                                                             // tests.jsx:527
			B.apply (this, 
				arguments);
		}
		__prototypeExtend (C, 
			B);
		
		/* Class "D" declaration */
		function D (){                                                             // tests.jsx:530
			C.apply (this, 
				arguments);
			log ([ 'D' ]);                                                         // tests.jsx:532
		}
		__prototypeExtend (D, 
			C);
		
		/* Class "E" declaration */
		function E (arg){                                                          // tests.jsx:536
			D.apply (this, 
				arguments);
			log ([ 'E(' + arg + ')' ]);                                            // tests.jsx:538
		}
		__prototypeExtend (E, 
			D);
		
		/* Class "F" declaration */
		function F (arg){                                                          // tests.jsx:542
			E.call (this, 
				arg);
			log ([ 'F(' + arg + ')' ]);                                            // tests.jsx:545
		}
		__prototypeExtend (F, 
			E);
		
		/* Class "G" declaration */
		function G (){                                                             // tests.jsx:549
			F.apply (this, 
				arguments);
		}
		__prototypeExtend (G, 
			F);
		
		{
			var __c = [ A, B, C, D, E, F, G ];
			
			for (var i = 0; i < __c.length; i ++){                                 // tests.jsx:551
				var c = __c [i];
				
				log ([ c.name + ':' ]);                                            // tests.jsx:552
				new c (i);                                                         // tests.jsx:553
			}
			
			__c = undefined;
		}
	})(function (args){                                                            // tests.jsx:555
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:556
			got = JSON.stringify (args);                                           // tests.jsx:557
		
		if (expected === undefined){                                               // tests.jsx:558
			if (!missed){                                                          // tests.jsx:559
				console.log ('Missing entry:');                                    // tests.jsx:560
				missed = true;                                                     // tests.jsx:561
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:565
				function (m, s){                                                   // tests.jsx:566
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:566
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:568
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:569
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:570
	});
	console.log ('[Testing] Test "Constructors" has been passed');                 // tests.jsx:572
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
(function (result){                                                                // tests.jsx:575
	var missed = false;
	
	(function test_hardcore_test_for_classes (log){                                // tests.jsx:577
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:578
			this.__parent = 'WOOHOO!';                                             // tests.jsx:579
		}
		
		/* Class "B" declaration */
		var B = (function (){                                                      // tests.jsx:582
			var B = function (variable){                                           // tests.jsx:582
					this.__B_testObj = {
						find: (function (){                                        // tests.jsx:660
							return [ { variable: 'deep!' } ];
						})
					};
					A.apply (this, 
						arguments);
					this.__B_variable = variable;                                  // tests.jsx:589
					this.qwerty = 'default';                                       // tests.jsx:590
				}, 
				privateStatic = 'done';                                            // tests.jsx:583
			
			__prototypeExtend (B, 
				A);
			B.prototype.test = function (a, b){                                    // tests.jsx:593
				var __;
				
				a [a instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:594
				b [b instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:595
				log ([                                                             // tests.jsx:596
					this.__B_variable,                                             // tests.jsx:596
					a [a instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:596
					b [b instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:596
					(__ = new A (), __ [__ instanceof A ? '__parent' : 'parent'])
				]);
			};
			B.prototype.other = function (a, b){                                   // tests.jsx:599
				var __;
				
				function getA (){                                                  // tests.jsx:600
					log ([ '[getA]' ]);                                            // tests.jsx:601
					return {
						get: (function (){                                         // tests.jsx:603
							log ([ '[getA][get]' ]);                               // tests.jsx:604
							return a;                                              // tests.jsx:605
						})
					};
				}
				
				function getB (){                                                  // tests.jsx:610
					log ([ '[getB]' ]);                                            // tests.jsx:611
					return {
						get: (function (){                                         // tests.jsx:613
							log ([ '[getB][get]' ]);                               // tests.jsx:614
							return b;                                              // tests.jsx:615
						})
					};
				}
				
				log ([                                                             // tests.jsx:620
					(__ = getA ().get (),                                          // tests.jsx:620
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed'), 
					(__ = getB ().get (),                                          // tests.jsx:620
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed')
				]);
				log ([ 'ok' ]);                                                    // tests.jsx:621
				log ([                                                             // tests.jsx:622
					(__ = getA ().get (),                                          // tests.jsx:622
						__ [__ instanceof B ? '__B_variable' : 'variable']), 
					(__ = getB ().get (),                                          // tests.jsx:622
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.final = function (a, b){                                   // tests.jsx:625
				function getA (){                                                  // tests.jsx:626
					log ([ '[getA]' ]);                                            // tests.jsx:627
					return a;                                                      // tests.jsx:628
				}
				
				function getB (){                                                  // tests.jsx:631
					log ([ '[getB]' ]);                                            // tests.jsx:632
					return b;                                                      // tests.jsx:633
				}
				
				log ([ getA ().qwerty += '-changed', getB ().qwerty += '-changed' ]);
				log ([ a.qwerty, b.qwerty ]);                                      // tests.jsx:637
			};
			B.prototype.method = function (a, b){                                  // tests.jsx:640
				var __;
				
				function getA (){                                                  // tests.jsx:641
					log ([ '[getA]' ]);                                            // tests.jsx:642
					return a;                                                      // tests.jsx:643
				}
				
				function getB (){                                                  // tests.jsx:646
					log ([ '[getB]' ]);                                            // tests.jsx:647
					return b;                                                      // tests.jsx:648
				}
				
				log ([                                                             // tests.jsx:651
					(__ = getA (),                                                 // tests.jsx:651
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						1, 
						2), 
					(__ = getB (),                                                 // tests.jsx:651
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						3)
				]);
			};
			B.prototype.__B_testMethod = function (){                              // tests.jsx:654
				log ([ arguments ]);                                               // tests.jsx:655
				return this instanceof B;                                          // tests.jsx:656
			};
			B.prototype.awful = function (){                                       // tests.jsx:669
				var __;
				
				log ([                                                             // tests.jsx:670
					(__ = this.__B_testObj.find ()[0],                             // tests.jsx:670
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.staticTest = function (obj){                               // tests.jsx:673
				log ([ obj.privateStatic, privateStatic ]);                        // tests.jsx:674
			};
			return B;
		})();
		
		new B ('first').method (new B ('second'),                                  // tests.jsx:678
			{
				testMethod: (function (arg){                                       // tests.jsx:678
					return this.result + arg;                                      // tests.jsx:678
				}), 
				result: 'success'
			});
		new B ('first').test (new B ('second'), { variable: 'success' });          // tests.jsx:679
		new B ('first').other (new B ('second'), { variable: 'success' });         // tests.jsx:680
		new B ('first').final (new B ('second'), { qwerty: 'qwerty' });            // tests.jsx:681
		new B ().awful ();                                                         // tests.jsx:682
		new B ('first').staticTest ({ privateStatic: 'arg' });                     // tests.jsx:683
	})(function (args){                                                            // tests.jsx:684
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:685
			got = JSON.stringify (args);                                           // tests.jsx:686
		
		if (expected === undefined){                                               // tests.jsx:687
			if (!missed){                                                          // tests.jsx:688
				console.log ('Missing entry:');                                    // tests.jsx:689
				missed = true;                                                     // tests.jsx:690
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:694
				function (m, s){                                                   // tests.jsx:695
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:695
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:697
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:698
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:699
	});
	console.log ('[Testing] Test "Hardcore test for classes" has been passed');    // tests.jsx:701
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
(function (result){                                                                // tests.jsx:704
	var missed = false;
	
	(function test_access_through___that (log){                                    // tests.jsx:706
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:707
			var __that = this;
			
			this.__A_a = 'ok-a';                                                   // tests.jsx:708
			this.__A_b = 'ok-b';                                                   // tests.jsx:708
			Function.prototype.call.call ((function (arg){                         // tests.jsx:710
				log ([ '[A]', __that.__A_a, this ['b'] ]);                         // tests.jsx:711
			}).bind ({ b: 'ok-ok-ok-b' }),                                         // tests.jsx:712
			10);
			log ([ '[B]', this.__A_a, this.__A_b ]);                               // tests.jsx:713
		}
		
		new A ();                                                                  // tests.jsx:717
	})(function (args){                                                            // tests.jsx:718
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:719
			got = JSON.stringify (args);                                           // tests.jsx:720
		
		if (expected === undefined){                                               // tests.jsx:721
			if (!missed){                                                          // tests.jsx:722
				console.log ('Missing entry:');                                    // tests.jsx:723
				missed = true;                                                     // tests.jsx:724
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:728
				function (m, s){                                                   // tests.jsx:729
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:729
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:731
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:732
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:733
	});
	console.log ('[Testing] Test "Access through __that" has been passed');        // tests.jsx:735
})([
	[ '[A]', 'ok-a', 'ok-ok-ok-b' ], 
	[ '[B]', 'ok-a', 'ok-b' ]
]);
(function (result){                                                                // tests.jsx:738
	var missed = false;
	
	(function test_for_parser_and_generator (log){                                 // tests.jsx:740
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
		
		var a = function (){                                                       // tests.jsx:744
				log ([                                                             // tests.jsx:745
					'5',                                                           // tests.jsx:745
					'58', 
					'test58', 
					'begin insert middle test end', 
					'5-%0-8', 
					'5-5-8'
				]);
			}, 
			b = function (variable5, variable8){                                   // tests.jsx:754
				if (variable5 === undefined)                                       // tests.jsx:754
					variable5 = 1;                                                 // tests.jsx:754
			
				if (variable8 === undefined)                                       // tests.jsx:754
					variable8 = 'K';                                               // tests.jsx:754
			
				function q (){}
				
				log ([                                                             // tests.jsx:757
					'' + variable5,                                                // tests.jsx:757
					'' + variable5 + variable8,                                    // tests.jsx:759
					'test' + variable5 + variable8
				]);
				
				function a (){                                                     // tests.jsx:763
					console.warn ('Not implemented at 763 line of tests.jsx');     // tests.jsx:763
				}
				
				function b (){}
				
				if (a)                                                             // tests.jsx:767
					function s (){}
			};
		
		log ([ 'hi' ]);                                                            // tests.jsx:771
		
		while (0);
		
		log ([                                                                     // tests.jsx:775
			0x86,                                                                  // tests.jsx:775
			'test',                                                                // tests.jsx:778
			'\n\r\t',                                                              // tests.jsx:779
			'multiline\
	string',                                                                       // tests.jsx:781
			'qqq\'qqq',                                                            // tests.jsx:782
			'\u0061',                                                              // tests.jsx:783
			'\%\~'
		]);
		log ([                                                                     // tests.jsx:787
			'begin ' + console + ' end',                                           // tests.jsx:787
			'' + console,                                                          // tests.jsx:789
			'be\ngin \'' + console + ' middle ' + JSON + ' end',                   // tests.jsx:791
			'', 
			'attaching test', 
			'here goes hardcore test', 
			'really hardcore te\'st', 
			'really hardcore te"st'
		]);
		a ();                                                                      // tests.jsx:801
	})(function (args){                                                            // tests.jsx:802
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:803
			got = JSON.stringify (args);                                           // tests.jsx:804
		
		if (expected === undefined){                                               // tests.jsx:805
			if (!missed){                                                          // tests.jsx:806
				console.log ('Missing entry:');                                    // tests.jsx:807
				missed = true;                                                     // tests.jsx:808
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:812
				function (m, s){                                                   // tests.jsx:813
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:813
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:815
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:816
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:817
	});
	console.log ('[Testing] Test "For parser and generator" has been passed');     // tests.jsx:819
})([
	[ 'hi' ], 
	[
		134, 
		'test',                                                                    // tests.jsx:820
		'\n\r\t',                                                                  // tests.jsx:820
		'multiline\tstring',                                                       // tests.jsx:820
		'qqq\'qqq',                                                                // tests.jsx:820
		'a',                                                                       // tests.jsx:820
		'%~'
	], 
	[
		'begin [object Object] end',                                               // tests.jsx:820
		'[object Object]',                                                         // tests.jsx:820
		'be\ngin \'[object Object] middle [object JSON] end',                      // tests.jsx:820
		'',                                                                        // tests.jsx:820
		'attaching test',                                                          // tests.jsx:820
		'here goes hardcore test',                                                 // tests.jsx:820
		'really hardcore te\'st',                                                  // tests.jsx:820
		'really hardcore te"st'
	], 
	[
		'5',                                                                       // tests.jsx:820
		'58',                                                                      // tests.jsx:820
		'test58',                                                                  // tests.jsx:820
		'begin insert middle test end',                                            // tests.jsx:820
		'5-%0-8',                                                                  // tests.jsx:820
		'5-5-8'
	]
]);
(function (result){                                                                // tests.jsx:822
	var missed = false;
	
	(function test_multiline (log){                                                // tests.jsx:824
		var first = " first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			second = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			third = "first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line", 
			fourth = "first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line", 
			fifth = "\t\t first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line", 
			symbols = "'\"`";                                                      // tests.jsx:854
		
		log ([ first ]);                                                           // tests.jsx:856
		log ([ second ]);                                                          // tests.jsx:857
		log ([ third ]);                                                           // tests.jsx:858
		log ([ fourth ]);                                                          // tests.jsx:859
		log ([ fifth ]);                                                           // tests.jsx:860
		log ([ symbols ]);                                                         // tests.jsx:861
	})(function (args){                                                            // tests.jsx:862
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:863
			got = JSON.stringify (args);                                           // tests.jsx:864
		
		if (expected === undefined){                                               // tests.jsx:865
			if (!missed){                                                          // tests.jsx:866
				console.log ('Missing entry:');                                    // tests.jsx:867
				missed = true;                                                     // tests.jsx:868
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:872
				function (m, s){                                                   // tests.jsx:873
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:873
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:875
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:876
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:877
	});
	console.log ('[Testing] Test "Multiline" has been passed');                    // tests.jsx:879
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
