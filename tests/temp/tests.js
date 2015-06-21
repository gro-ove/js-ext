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
	
	(function test_getters (log){                                                  // tests.jsx:262
		var a = {                                                                  // tests.jsx:263
			get a (){                                                              // tests.jsx:263
				return 5;
			}
		};
		
		var b = {                                                                  // tests.jsx:267
			get a (){                                                              // tests.jsx:267
				return 5;
			}
		};
		
		log ([ a.a, b.a ]);                                                        // tests.jsx:271
	})(function (args){                                                            // tests.jsx:272
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:273
			got = JSON.stringify (args);                                           // tests.jsx:274
		
		if (expected === undefined){                                               // tests.jsx:275
			if (!missed){                                                          // tests.jsx:276
				console.log ('Missing entry:');                                    // tests.jsx:277
				missed = true;                                                     // tests.jsx:278
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:282
				function (m, s){                                                   // tests.jsx:283
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:283
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:285
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:286
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:287
	});
	console.log ('[Testing] Test "Getters" has been passed');                      // tests.jsx:289
})([
	[ 5, 
		5 ]
]);
(function (result){                                                                // tests.jsx:292
	var missed = false;
	
	(function test_getters_setters (log){                                          // tests.jsx:294
		var a = {                                                                  // tests.jsx:295
			get a (){                                                              // tests.jsx:295
				return this._a * 2;                                                // tests.jsx:296
			}, 
			set a (v){
				this._a = v;                                                       // tests.jsx:297
			}
		};
		
		a.a = 5;                                                                   // tests.jsx:300
		
		var b = {                                                                  // tests.jsx:302
			get a (){                                                              // tests.jsx:302
				return this._a * 2;                                                // tests.jsx:303
			}, 
			set a (arg){
				return this._a = arg;                                              // tests.jsx:304
			}
		};
		
		b.a = 15;                                                                  // tests.jsx:307
		log ([ a.a, b.a ]);                                                        // tests.jsx:309
	})(function (args){                                                            // tests.jsx:310
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:311
			got = JSON.stringify (args);                                           // tests.jsx:312
		
		if (expected === undefined){                                               // tests.jsx:313
			if (!missed){                                                          // tests.jsx:314
				console.log ('Missing entry:');                                    // tests.jsx:315
				missed = true;                                                     // tests.jsx:316
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:320
				function (m, s){                                                   // tests.jsx:321
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:321
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:323
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:324
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:325
	});
	console.log ('[Testing] Test "Getters/Setters" has been passed');              // tests.jsx:327
})([
	[ 10, 
		30 ]
]);
(function (result){                                                                // tests.jsx:330
	var missed = false;
	
	(function test_classes (log){                                                  // tests.jsx:332
		/* Class "First" declaration */
		var First = (function (){                                                  // tests.jsx:333
			var First = function (dog){                                            // tests.jsx:333
					this.__First_dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';    // tests.jsx:336
					this.__First_horse = 'IGOGO, MOTHERFUCKERS!';                  // tests.jsx:337
					log ([ '.', '"First" says "Hi!"' ]);                           // tests.jsx:340
					this.__First_dog = dog + ' (' + cat + ')';                     // tests.jsx:341
					log ([ '.', '.', this.__First_dog ]);                          // tests.jsx:342
				}, 
				cat = 'Meow?';                                                     // tests.jsx:334
			
			First.prototype.cow = function (){                                     // tests.jsx:345
				log ([ '.', 'Mo-o-o-o from "First".' ]);                           // tests.jsx:346
			};
			return First;
		})();
		
		/* Class "Second" declaration */
		var Second = (function (){                                                 // tests.jsx:350
			var Second = function (){                                              // tests.jsx:350
					if (this.constructor === Second)
						throw new Error ('Trying to instantiate abstract class Second');
					
					this.horse = 'Horse, tazshemta';                               // tests.jsx:353
					First.apply (this, 
						arguments);
				}, 
				cat = 'Meow!';                                                     // tests.jsx:351
			
			__prototypeExtend (Second, 
				First);
			Second.prototype.whoIsIt = function (){                                // tests.jsx:355
				log ([ '.', 'Michael Jackson, for example' ]);                     // tests.jsx:356
				log ([ '.', 'Or cat:', cat ]);                                     // tests.jsx:357
				log ([ '.', 'Or dog:', Second.__dog ]);                            // tests.jsx:358
				log ([ '.', 'Or horse:', this.horse ]);                            // tests.jsx:359
			};
			Second.prototype.eat = function (){                                    // tests.jsx:362
				log ([ '.', 'Wow, yammy!' ]);                                      // tests.jsx:363
			};
			Second.prototype.sleep = function (){                                  // tests.jsx:366
				log ([ '.', 'Z-z-z-z...' ]);                                       // tests.jsx:367
			};
			Second.__dog = 'WOOF! WOOF! WOOF!';                                    // tests.jsx:352
			return Second;
		})();
		
		/* Class "Third" declaration */
		function Third (){                                                         // tests.jsx:373
			Second.apply (this, 
				arguments);
		}
		__prototypeExtend (Third, 
			Second);
		Third.prototype.eat = function (){                                         // tests.jsx:374
			Second.prototype.eat.apply (this, arguments);                          // tests.jsx:350
			log ([ '. .', 'And chew-chew-chew!' ]);                                // tests.jsx:376
		};
		Third.prototype.sleep = function (){                                       // tests.jsx:379
			Second.prototype.sleep.apply (this, arguments);                        // tests.jsx:350
			log ([ '. .', 'Now with 20% more snoring!' ]);                         // tests.jsx:381
		};
		Third.prototype.poop = function (){                                        // tests.jsx:384
			log ([ '.', 'E-e-e-w.' ]);                                             // tests.jsx:385
		};
		
		/* Class "Fourth" declaration */
		function Fourth (){                                                        // tests.jsx:389
			Third.call (this, 
				'Dogs don\'t say "KRAKOZYABRA"');
			log ([ '.', '"Fourth" in da house.' ]);                                // tests.jsx:392
		}
		__prototypeExtend (Fourth, 
			Third);
		Fourth.prototype.poop = function (){                                       // tests.jsx:395
			return log ([ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]);
		};
		
		var c;
		
		log ([ 'Here come "First"!' ]);                                            // tests.jsx:401
		new First ('What do dogs say?');                                           // tests.jsx:402
		log ([ 'And now — "Second"!' ]);                                           // tests.jsx:404
		
		try {
			new Second ('Nothing here.');                                          // tests.jsx:406
		} catch (e){
			log ([ '.', '"Second" is too tired: ' + e.message ]);                  // tests.jsx:408
		} 
		
		log ([ 'Next is "Third"!' ]);                                              // tests.jsx:410
		c = new Third ('What do dogs say? Last try!');                             // tests.jsx:411
		log ([ '"Third" has something to eat!' ]);                                 // tests.jsx:413
		c.eat ();                                                                  // tests.jsx:414
		log ([ 'Now he wants to sleep!' ]);                                        // tests.jsx:416
		c.sleep ();                                                                // tests.jsx:417
		log ([                                                                     // tests.jsx:419
			'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
		]);
		c.poop ();                                                                 // tests.jsx:420
		log ([                                                                     // tests.jsx:422
			'And now "Third" has something to tell us! "Third", who is it?'
		]);
		c.whoIsIt ();                                                              // tests.jsx:423
		log ([ 'And, finally, "Fourth".' ]);                                       // tests.jsx:425
		c = new Fourth ();                                                         // tests.jsx:426
		log ([ 'Okay, give us some your regular crap.' ]);                         // tests.jsx:428
		c.poop ();                                                                 // tests.jsx:429
	})(function (args){                                                            // tests.jsx:430
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:431
			got = JSON.stringify (args);                                           // tests.jsx:432
		
		if (expected === undefined){                                               // tests.jsx:433
			if (!missed){                                                          // tests.jsx:434
				console.log ('Missing entry:');                                    // tests.jsx:435
				missed = true;                                                     // tests.jsx:436
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:440
				function (m, s){                                                   // tests.jsx:441
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:441
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:443
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:444
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:445
	});
	console.log ('[Testing] Test "Classes" has been passed');                      // tests.jsx:447
})([
	[ 'Here come "First"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? (Meow?)' ], 
	[ 'And now — "Second"!' ], 
	[
		'.',                                                                       // tests.jsx:448
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
(function (result){                                                                // tests.jsx:450
	var missed = false;
	
	(function test_static_fields_with_initializers (log){                          // tests.jsx:452
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:465
			log ([ B.b ]);                                                         // tests.jsx:469
		}
		B.a = 1;                                                                   // tests.jsx:466
		B.b = B.a * 2;                                                             // tests.jsx:466
		
		/* Class "A" declaration */
		var A = (function (){                                                      // tests.jsx:453
			var A = function (){                                                   // tests.jsx:453
					log ([ b, A.pb ]);                                             // tests.jsx:461
				}, 
				a = 2,                                                             // tests.jsx:454
				b = a + 2;                                                         // tests.jsx:455
			
			A.pa = 2;                                                              // tests.jsx:457
			A.pb = A.pa + 2;                                                       // tests.jsx:458
			return A;
		})();
		
		new A ();                                                                  // tests.jsx:473
		new B ();                                                                  // tests.jsx:474
	})(function (args){                                                            // tests.jsx:475
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:476
			got = JSON.stringify (args);                                           // tests.jsx:477
		
		if (expected === undefined){                                               // tests.jsx:478
			if (!missed){                                                          // tests.jsx:479
				console.log ('Missing entry:');                                    // tests.jsx:480
				missed = true;                                                     // tests.jsx:481
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:485
				function (m, s){                                                   // tests.jsx:486
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:486
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:488
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:489
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:490
	});
	console.log ('[Testing] Test "Static fields with initializers" has been passed');
})([
	[ 4, 
		4 ], 
	[ 2 ]
]);
(function (result){                                                                // tests.jsx:495
	var missed = false;
	
	(function test_constructors (log){                                             // tests.jsx:497
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:498
			log ([ 'A' ]);                                                         // tests.jsx:500
		}
		
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:504
			A.apply (this, 
				arguments);
			log ([ 'B' ]);                                                         // tests.jsx:506
		}
		__prototypeExtend (B, 
			A);
		
		/* Class "C" declaration */
		function C (){                                                             // tests.jsx:510
			B.apply (this, 
				arguments);
		}
		__prototypeExtend (C, 
			B);
		
		/* Class "D" declaration */
		function D (){                                                             // tests.jsx:513
			C.apply (this, 
				arguments);
			log ([ 'D' ]);                                                         // tests.jsx:515
		}
		__prototypeExtend (D, 
			C);
		
		/* Class "E" declaration */
		function E (arg){                                                          // tests.jsx:519
			D.apply (this, 
				arguments);
			log ([ 'E(' + arg + ')' ]);                                            // tests.jsx:521
		}
		__prototypeExtend (E, 
			D);
		
		/* Class "F" declaration */
		function F (arg){                                                          // tests.jsx:525
			E.call (this, 
				arg);
			log ([ 'F(' + arg + ')' ]);                                            // tests.jsx:528
		}
		__prototypeExtend (F, 
			E);
		
		/* Class "G" declaration */
		function G (){                                                             // tests.jsx:532
			F.apply (this, 
				arguments);
		}
		__prototypeExtend (G, 
			F);
		
		{
			var __c = [ A, B, C, D, E, F, G ];
			
			for (var i = 0; i < __c.length; i ++){                                 // tests.jsx:534
				var c = __c [i];
				
				log ([ c.name + ':' ]);                                            // tests.jsx:535
				new c (i);                                                         // tests.jsx:536
			}
			
			__c = undefined;
		}
	})(function (args){                                                            // tests.jsx:538
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:539
			got = JSON.stringify (args);                                           // tests.jsx:540
		
		if (expected === undefined){                                               // tests.jsx:541
			if (!missed){                                                          // tests.jsx:542
				console.log ('Missing entry:');                                    // tests.jsx:543
				missed = true;                                                     // tests.jsx:544
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:548
				function (m, s){                                                   // tests.jsx:549
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:549
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:551
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:552
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:553
	});
	console.log ('[Testing] Test "Constructors" has been passed');                 // tests.jsx:555
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
(function (result){                                                                // tests.jsx:558
	var missed = false;
	
	(function test_hardcore_test_for_classes (log){                                // tests.jsx:560
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:561
			this.__parent = 'WOOHOO!';                                             // tests.jsx:562
		}
		
		/* Class "B" declaration */
		var B = (function (){                                                      // tests.jsx:565
			var B = function (variable){                                           // tests.jsx:565
					this.__B_testObj = {
						find: (function (){                                        // tests.jsx:643
							return [ { variable: 'deep!' } ];
						})
					};
					A.apply (this, 
						arguments);
					this.__B_variable = variable;                                  // tests.jsx:572
					this.qwerty = 'default';                                       // tests.jsx:573
				}, 
				privateStatic = 'done';                                            // tests.jsx:566
			
			__prototypeExtend (B, 
				A);
			B.prototype.test = function (a, b){                                    // tests.jsx:576
				var __;
				
				a [a instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:577
				b [b instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:578
				log ([                                                             // tests.jsx:579
					this.__B_variable,                                             // tests.jsx:579
					a [a instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:579
					b [b instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:579
					(__ = new A (), __ [__ instanceof A ? '__parent' : 'parent'])
				]);
			};
			B.prototype.other = function (a, b){                                   // tests.jsx:582
				var __;
				
				function getA (){                                                  // tests.jsx:583
					log ([ '[getA]' ]);                                            // tests.jsx:584
					return {
						get: (function (){                                         // tests.jsx:586
							log ([ '[getA][get]' ]);                               // tests.jsx:587
							return a;                                              // tests.jsx:588
						})
					};
				}
				
				function getB (){                                                  // tests.jsx:593
					log ([ '[getB]' ]);                                            // tests.jsx:594
					return {
						get: (function (){                                         // tests.jsx:596
							log ([ '[getB][get]' ]);                               // tests.jsx:597
							return b;                                              // tests.jsx:598
						})
					};
				}
				
				log ([                                                             // tests.jsx:603
					(__ = getA ().get (),                                          // tests.jsx:603
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed'), 
					(__ = getB ().get (),                                          // tests.jsx:603
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed')
				]);
				log ([ 'ok' ]);                                                    // tests.jsx:604
				log ([                                                             // tests.jsx:605
					(__ = getA ().get (),                                          // tests.jsx:605
						__ [__ instanceof B ? '__B_variable' : 'variable']), 
					(__ = getB ().get (),                                          // tests.jsx:605
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.final = function (a, b){                                   // tests.jsx:608
				function getA (){                                                  // tests.jsx:609
					log ([ '[getA]' ]);                                            // tests.jsx:610
					return a;                                                      // tests.jsx:611
				}
				
				function getB (){                                                  // tests.jsx:614
					log ([ '[getB]' ]);                                            // tests.jsx:615
					return b;                                                      // tests.jsx:616
				}
				
				log ([ getA ().qwerty += '-changed', getB ().qwerty += '-changed' ]);
				log ([ a.qwerty, b.qwerty ]);                                      // tests.jsx:620
			};
			B.prototype.method = function (a, b){                                  // tests.jsx:623
				var __;
				
				function getA (){                                                  // tests.jsx:624
					log ([ '[getA]' ]);                                            // tests.jsx:625
					return a;                                                      // tests.jsx:626
				}
				
				function getB (){                                                  // tests.jsx:629
					log ([ '[getB]' ]);                                            // tests.jsx:630
					return b;                                                      // tests.jsx:631
				}
				
				log ([                                                             // tests.jsx:634
					(__ = getA (),                                                 // tests.jsx:634
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						1, 
						2), 
					(__ = getB (),                                                 // tests.jsx:634
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						3)
				]);
			};
			B.prototype.__B_testMethod = function (){                              // tests.jsx:637
				log ([ arguments ]);                                               // tests.jsx:638
				return this instanceof B;                                          // tests.jsx:639
			};
			B.prototype.awful = function (){                                       // tests.jsx:652
				var __;
				
				log ([                                                             // tests.jsx:653
					(__ = this.__B_testObj.find ()[0],                             // tests.jsx:653
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.staticTest = function (obj){                               // tests.jsx:656
				log ([ obj.privateStatic, privateStatic ]);                        // tests.jsx:657
			};
			return B;
		})();
		
		new B ('first').method (new B ('second'),                                  // tests.jsx:661
			{
				testMethod: (function (arg){                                       // tests.jsx:661
					return this.result + arg;                                      // tests.jsx:661
				}), 
				result: 'success'
			});
		new B ('first').test (new B ('second'), { variable: 'success' });          // tests.jsx:662
		new B ('first').other (new B ('second'), { variable: 'success' });         // tests.jsx:663
		new B ('first').final (new B ('second'), { qwerty: 'qwerty' });            // tests.jsx:664
		new B ().awful ();                                                         // tests.jsx:665
		new B ('first').staticTest ({ privateStatic: 'arg' });                     // tests.jsx:666
	})(function (args){                                                            // tests.jsx:667
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:668
			got = JSON.stringify (args);                                           // tests.jsx:669
		
		if (expected === undefined){                                               // tests.jsx:670
			if (!missed){                                                          // tests.jsx:671
				console.log ('Missing entry:');                                    // tests.jsx:672
				missed = true;                                                     // tests.jsx:673
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:677
				function (m, s){                                                   // tests.jsx:678
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:678
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:680
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:681
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:682
	});
	console.log ('[Testing] Test "Hardcore test for classes" has been passed');    // tests.jsx:684
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
(function (result){                                                                // tests.jsx:687
	var missed = false;
	
	(function test_access_through___that (log){                                    // tests.jsx:689
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:690
			var __that = this;
			
			this.__A_a = 'ok-a';                                                   // tests.jsx:691
			this.__A_b = 'ok-b';                                                   // tests.jsx:691
			Function.prototype.call.call ((function (arg){                         // tests.jsx:693
				log ([ '[A]', __that.__A_a, this ['b'] ]);                         // tests.jsx:694
			}).bind ({ b: 'ok-ok-ok-b' }),                                         // tests.jsx:695
			10);
			log ([ '[B]', this.__A_a, this.__A_b ]);                               // tests.jsx:696
		}
		
		new A ();                                                                  // tests.jsx:700
	})(function (args){                                                            // tests.jsx:701
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:702
			got = JSON.stringify (args);                                           // tests.jsx:703
		
		if (expected === undefined){                                               // tests.jsx:704
			if (!missed){                                                          // tests.jsx:705
				console.log ('Missing entry:');                                    // tests.jsx:706
				missed = true;                                                     // tests.jsx:707
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:711
				function (m, s){                                                   // tests.jsx:712
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:712
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:714
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:715
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:716
	});
	console.log ('[Testing] Test "Access through __that" has been passed');        // tests.jsx:718
})([
	[ '[A]', 'ok-a', 'ok-ok-ok-b' ], 
	[ '[B]', 'ok-a', 'ok-b' ]
]);
(function (result){                                                                // tests.jsx:721
	var missed = false;
	
	(function test_for_parser_and_generator (log){                                 // tests.jsx:723
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
		
		var a = function (){                                                       // tests.jsx:727
				log ([                                                             // tests.jsx:728
					'5',                                                           // tests.jsx:728
					'58', 
					'test58', 
					'begin insert middle test end', 
					'5-%0-8', 
					'5-5-8'
				]);
			}, 
			b = function (variable5, variable8){                                   // tests.jsx:737
				if (variable5 === undefined)                                       // tests.jsx:737
					variable5 = 1;                                                 // tests.jsx:737
			
				if (variable8 === undefined)                                       // tests.jsx:737
					variable8 = 'K';                                               // tests.jsx:737
			
				function q (){}
				
				log ([                                                             // tests.jsx:740
					'' + variable5,                                                // tests.jsx:740
					'' + variable5 + variable8,                                    // tests.jsx:742
					'test' + variable5 + variable8
				]);
				
				function a (){                                                     // tests.jsx:746
					console.warn ('Not implemented at 746 line of tests.jsx');     // tests.jsx:746
				}
				
				function b (){}
				
				if (a)                                                             // tests.jsx:750
					function s (){}
			};
		
		log ([ 'hi' ]);                                                            // tests.jsx:754
		
		while (0);
		
		log ([                                                                     // tests.jsx:758
			0x86,                                                                  // tests.jsx:758
			'test',                                                                // tests.jsx:761
			'\n\r\t',                                                              // tests.jsx:762
			'multiline\
	string',                                                                       // tests.jsx:764
			'qqq\'qqq',                                                            // tests.jsx:765
			'\u0061',                                                              // tests.jsx:766
			'\%\~'
		]);
		log ([                                                                     // tests.jsx:770
			'begin ' + console + ' end',                                           // tests.jsx:770
			'' + console,                                                          // tests.jsx:772
			'be\ngin \'' + console + ' middle ' + JSON + ' end',                   // tests.jsx:774
			'', 
			'attaching test', 
			'here goes hardcore test', 
			'really hardcore te\'st', 
			'really hardcore te"st'
		]);
		a ();                                                                      // tests.jsx:784
	})(function (args){                                                            // tests.jsx:785
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:786
			got = JSON.stringify (args);                                           // tests.jsx:787
		
		if (expected === undefined){                                               // tests.jsx:788
			if (!missed){                                                          // tests.jsx:789
				console.log ('Missing entry:');                                    // tests.jsx:790
				missed = true;                                                     // tests.jsx:791
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:795
				function (m, s){                                                   // tests.jsx:796
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:796
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:798
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:799
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:800
	});
	console.log ('[Testing] Test "For parser and generator" has been passed');     // tests.jsx:802
})([
	[ 'hi' ], 
	[
		134, 
		'test',                                                                    // tests.jsx:803
		'\n\r\t',                                                                  // tests.jsx:803
		'multiline\tstring',                                                       // tests.jsx:803
		'qqq\'qqq',                                                                // tests.jsx:803
		'a',                                                                       // tests.jsx:803
		'%~'
	], 
	[
		'begin [object Object] end',                                               // tests.jsx:803
		'[object Object]',                                                         // tests.jsx:803
		'be\ngin \'[object Object] middle [object JSON] end',                      // tests.jsx:803
		'',                                                                        // tests.jsx:803
		'attaching test',                                                          // tests.jsx:803
		'here goes hardcore test',                                                 // tests.jsx:803
		'really hardcore te\'st',                                                  // tests.jsx:803
		'really hardcore te"st'
	], 
	[
		'5',                                                                       // tests.jsx:803
		'58',                                                                      // tests.jsx:803
		'test58',                                                                  // tests.jsx:803
		'begin insert middle test end',                                            // tests.jsx:803
		'5-%0-8',                                                                  // tests.jsx:803
		'5-5-8'
	]
]);
(function (result){                                                                // tests.jsx:805
	var missed = false;
	
	(function test_multiline (log){                                                // tests.jsx:807
		var first = " first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			second = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			third = "first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line", 
			fourth = "first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line", 
			fifth = "\t\t first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line", 
			symbols = "'\"`";                                                      // tests.jsx:837
		
		log ([ first ]);                                                           // tests.jsx:839
		log ([ second ]);                                                          // tests.jsx:840
		log ([ third ]);                                                           // tests.jsx:841
		log ([ fourth ]);                                                          // tests.jsx:842
		log ([ fifth ]);                                                           // tests.jsx:843
		log ([ symbols ]);                                                         // tests.jsx:844
	})(function (args){                                                            // tests.jsx:845
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:846
			got = JSON.stringify (args);                                           // tests.jsx:847
		
		if (expected === undefined){                                               // tests.jsx:848
			if (!missed){                                                          // tests.jsx:849
				console.log ('Missing entry:');                                    // tests.jsx:850
				missed = true;                                                     // tests.jsx:851
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:855
				function (m, s){                                                   // tests.jsx:856
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:856
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:858
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:859
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:860
	});
	console.log ('[Testing] Test "Multiline" has been passed');                    // tests.jsx:862
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
