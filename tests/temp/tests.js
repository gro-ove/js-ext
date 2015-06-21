function __createArray(from, 
	to, 
	result){
	if (typeof from === 'string')
		from = from.charCodeAt(0);
	
	if (typeof to === 'string')
		to = to.charCodeAt(0);
	
	result = new Array(Math.abs(to - from) + 1);
	
	if (from < to)
		for (var i = 0; i < result.length; i ++)
			result[i] = i + from;
	else
		for (var i = result.length - 1; i >= 0; i --)
			result[i] = from - i;
	return result;
}

function __prototypeExtend(c, 
	p, 
	t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t();
	c.prototype.constructor = c;
}

(function (result){                                                               // tests.jsx:7
	var missed = false;
	
	(function test_priorities(log){                                               // tests.jsx:9
		var a = 1, b = 2, c = 3, d = 4;
		
		log([                                                                     // tests.jsx:11
			b + c || d,                                                           // tests.jsx:11
			b - c - d,                                                            // tests.jsx:13
			b - (c - d),                                                          // tests.jsx:14
			a + (c, d),                                                           // tests.jsx:15
			(a | b + c) + d,                                                      // tests.jsx:16
			a + b | c + d,                                                        // tests.jsx:17
			a + (b | c) + d
		]);
	})(function (args){                                                           // tests.jsx:20
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:21
			got = JSON.stringify(args);                                           // tests.jsx:22
		
		if (expected === undefined){                                              // tests.jsx:23
			if (!missed){                                                         // tests.jsx:24
				console.log('Missing entry:');                                    // tests.jsx:25
				missed = true;                                                    // tests.jsx:26
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:30
				function (m, s){                                                  // tests.jsx:31
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:31
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:33
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:34
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:35
	});
	console.log('[Testing] Test "Priorities" has been passed');                   // tests.jsx:37
})([
	[ 5, 
		- 5, 
		3, 
		5, 
		9, 
		7, 
		8 ]
]);
(function (result){                                                               // tests.jsx:40
	var missed = false;
	
	(function test_fancy_arrays_loops_and_stuff(log){                             // tests.jsx:42
		{
			var __0 = [ 'a', 'b', 
				'c' ];
			
			for (var index = 0; index < __0.length; index ++){                    // tests.jsx:43
				var value = __0[index];
				
				log([ index, value ]);                                            // tests.jsx:44
			}
			
			__0 = undefined;
		}
		
		{
			var __1 = __createArray(0, 
				10);
			
			for (var key in __1){
				var value = __1[key];
				
				log([ key, value ]);                                              // tests.jsx:47
			}
			
			__1 = undefined;
		}
		
		for (var key in __createArray(0, 
			20))
			log([ key ]);                                                         // tests.jsx:50
		
		log([                                                                     // tests.jsx:52
			[ 5, 4, 
				3, 
				2, 
				1 ],                                                              // tests.jsx:52
			__createArray(15, 
				1)
		]);
		log([                                                                     // tests.jsx:53
			__createArray('a', 'k'),                                              // tests.jsx:53
			[ 'd', 'c', 
				'b', 
				'a' ], 
			__createArray('k', 'a')
		]);
	})(function (args){                                                           // tests.jsx:54
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:55
			got = JSON.stringify(args);                                           // tests.jsx:56
		
		if (expected === undefined){                                              // tests.jsx:57
			if (!missed){                                                         // tests.jsx:58
				console.log('Missing entry:');                                    // tests.jsx:59
				missed = true;                                                    // tests.jsx:60
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:64
				function (m, s){                                                  // tests.jsx:65
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:65
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:67
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:68
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:69
	});
	console.log('[Testing] Test "Fancy arrays, loops and stuff" has been passed');
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
(function (result){                                                               // tests.jsx:74
	var missed = false;
	
	(function test_another_test_for_loops(log){                                   // tests.jsx:76
		var a1 = { a: 1, b: 2, c: 3 },                                            // tests.jsx:77
			a2 = { a: 'a', b: 'b', c: 'c' },                                      // tests.jsx:78
			a3 = [ 1, 2, 
				3, 
				4 ],                                                              // tests.jsx:79
			a4 = [ 'a', 'b', 'c' ];                                               // tests.jsx:80
		
		for (var n in a1)                                                         // tests.jsx:82
			log([ n ]);                                                           // tests.jsx:82
		
		for (n in a2)                                                             // tests.jsx:83
			log([ n ]);                                                           // tests.jsx:83
		
		for (var n in a1){                                                        // tests.jsx:85
			var v = a1[n];
			
			log([ n ]);                                                           // tests.jsx:85
		}
		
		for (n in a2){                                                            // tests.jsx:86
			v = a2[n];                                                            // tests.jsx:86
			log([ n ]);                                                           // tests.jsx:86
		}
		
		for (var __2 = 0; __2 < a3.length; __2 ++){                               // tests.jsx:88
			var n = a3[__2];
			
			log([ n ]);                                                           // tests.jsx:88
		}
		
		for (var __3 = 0; __3 < a4.length; __3 ++){                               // tests.jsx:89
			n = a4[__3];                                                          // tests.jsx:89
			log([ n ]);                                                           // tests.jsx:89
		}
		
		for (var n = 0; n < a3.length; n ++){                                     // tests.jsx:91
			var v = a3[n];
			
			log([ n ]);                                                           // tests.jsx:91
		}
		
		for (n = 0; n < a4.length; n ++){                                         // tests.jsx:92
			v = a4[n];                                                            // tests.jsx:92
			log([ n ]);                                                           // tests.jsx:92
		}
		
		{
			var __4 = { a9: 7 };
			
			for (n in __4){                                                       // tests.jsx:94
				v = __4[n];                                                       // tests.jsx:94
				log([ n ]);                                                       // tests.jsx:94
			}
			
			__4 = undefined;
		}
		
		for (v in { a10: 7 })                                                     // tests.jsx:95
			log([ n ]);                                                           // tests.jsx:95
		
		for (var n in { a: 100, b: 102, c: 104, d: log([ 'n-0' ]) || 106 })
			log([ n ]);                                                           // tests.jsx:103
		
		{
			var __5 = { a: 100, b: 102, c: 104, d: log([ 'n-1' ]) || 106 };
			
			for (var i in __5){
				var k = __5[i];
				
				log([ i, k ]);                                                    // tests.jsx:111
			}
			
			__5 = undefined;
		}
		
		{
			var __6 = [ 100, 
				102, 
				104, 
				log([ 'n-2' ]) || 106 ];
			
			for (var i = 0; i < __6.length; i ++){                                // tests.jsx:113
				var k = __6[i];
				
				log([ i, k ]);                                                    // tests.jsx:114
			}
			
			__6 = undefined;
		}
		
		{
			var __8 = [ 100, 
				102, 
				104, 
				log([ 'n-3' ]) || 106 ];
			
			for (var __7 = 0; __7 < __8.length; __7 ++){
				var k = __8[__7];
				
				log([ k ]);                                                       // tests.jsx:117
			}
			
			__8 = undefined;
		}
		
		{
			var __a = 'qwerty';
			
			for (var __9 = 0; __9 < __a.length; __9 ++){
				var n = __a[__9];
				
				log([ n ]);                                                       // tests.jsx:120
			}
			
			__a = undefined;
		}
		
		{
			var __b = 'qwerty';
			
			for (var n = 0; n < __b.length; n ++){                                // tests.jsx:122
				var e = __b[n];
				
				log([ n, e ]);                                                    // tests.jsx:123
			}
			
			__b = undefined;
		}
	})(function (args){                                                           // tests.jsx:124
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:125
			got = JSON.stringify(args);                                           // tests.jsx:126
		
		if (expected === undefined){                                              // tests.jsx:127
			if (!missed){                                                         // tests.jsx:128
				console.log('Missing entry:');                                    // tests.jsx:129
				missed = true;                                                    // tests.jsx:130
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:134
				function (m, s){                                                  // tests.jsx:135
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:135
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:137
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:138
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:139
	});
	console.log('[Testing] Test "Another test for loops" has been passed');       // tests.jsx:141
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
(function (result){                                                               // tests.jsx:144
	var missed = false;
	
	(function test_comma_free(log){                                               // tests.jsx:146
		log([                                                                     // tests.jsx:147
			'string',                                                             // tests.jsx:147
			187, 
			function (arg){                                                       // tests.jsx:150
				return 15;
			}, 
			function (arg){                                                       // tests.jsx:151
				return 18;
			}, 
			{
				a: 20,                                                            // tests.jsx:153
				b: 25,                                                            // tests.jsx:154
				c: [                                                              // tests.jsx:155
					function (arg){                                               // tests.jsx:155
						return 14;
					}, 
					function (arg){                                               // tests.jsx:157
						return 'hi';                                              // tests.jsx:157
					}
				]
			}
		]);
	})(function (args){                                                           // tests.jsx:161
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:162
			got = JSON.stringify(args);                                           // tests.jsx:163
		
		if (expected === undefined){                                              // tests.jsx:164
			if (!missed){                                                         // tests.jsx:165
				console.log('Missing entry:');                                    // tests.jsx:166
				missed = true;                                                    // tests.jsx:167
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:171
				function (m, s){                                                  // tests.jsx:172
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:172
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:174
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:175
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:176
	});
	console.log('[Testing] Test "Comma-free" has been passed');                   // tests.jsx:178
})([
	[
		'string',                                                                 // tests.jsx:179
		187, 
		null, 
		null, 
		{ 'a': 20, 'b': 25, 'c': [ null, null ] }
	]
]);
(function (result){                                                               // tests.jsx:181
	var missed = false;
	
	(function test_lambdas(log){                                                  // tests.jsx:183
		var a = function (test){                                                  // tests.jsx:184
				return typeof test;                                               // tests.jsx:184
			}, 
			b = function (arg){                                                   // tests.jsx:185
				return arg;                                                       // tests.jsx:185
			}, 
			c = function (arg){                                                   // tests.jsx:186
				return arg;                                                       // tests.jsx:186
			}, 
			d = function (arg){                                                   // tests.jsx:187
				if (a && b())                                                     // tests.jsx:187
					return arg;                                                   // tests.jsx:187
				else
					return - arg;                                                 // tests.jsx:187
			}, 
			e = function (arg){                                                   // tests.jsx:188
				return typeof a + a(b);                                           // tests.jsx:188
			};
		
		var f = function (arg){                                                   // tests.jsx:190
			return { a: 'a', b: String(d()) };
		};
		
		var g = [                                                                 // tests.jsx:195
			function (arg){                                                       // tests.jsx:195
				return { a: 'b' };
			}, 
			function (arg){                                                       // tests.jsx:195
				return b;                                                         // tests.jsx:195
			}
		];
		
		[
			function (arg){                                                       // tests.jsx:197
				if (t){                                                           // tests.jsx:197
					a;                                                            // tests.jsx:197
				} else
					return b;                                                     // tests.jsx:197
			}, 
			function (arg){                                                       // tests.jsx:197
				if (q)                                                            // tests.jsx:197
					return b;                                                     // tests.jsx:197
			}
		];
		log([                                                                     // tests.jsx:199
			a(1),                                                                 // tests.jsx:199
			b(1),                                                                 // tests.jsx:201
			c(1),                                                                 // tests.jsx:202
			d(1),                                                                 // tests.jsx:203
			e(),                                                                  // tests.jsx:204
			f(),                                                                  // tests.jsx:205
			g[0](),                                                               // tests.jsx:206
			String(g[1]()()),                                                     // tests.jsx:207
			g.length
		]);
	})(function (args){                                                           // tests.jsx:210
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:211
			got = JSON.stringify(args);                                           // tests.jsx:212
		
		if (expected === undefined){                                              // tests.jsx:213
			if (!missed){                                                         // tests.jsx:214
				console.log('Missing entry:');                                    // tests.jsx:215
				missed = true;                                                    // tests.jsx:216
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:220
				function (m, s){                                                  // tests.jsx:221
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:221
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:223
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:224
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:225
	});
	console.log('[Testing] Test "Lambdas" has been passed');                      // tests.jsx:227
})([
	[
		'number',                                                                 // tests.jsx:228
		1, 
		1, 
		- 1, 
		'functionfunction',                                                       // tests.jsx:228
		{ 'a': 'a', 'b': 'NaN' }, 
		{ 'a': 'b' }, 
		'undefined',                                                              // tests.jsx:228
		2
	]
]);
(function (result){                                                               // tests.jsx:230
	var missed = false;
	
	(function test_functions(log){                                                // tests.jsx:232
		function a(arg){                                                          // tests.jsx:233
			if (arg === undefined)                                                // tests.jsx:233
				arg = 18;                                                         // tests.jsx:233
		
			return arg;                                                           // tests.jsx:234
		}
		
		function b(arg){                                                          // tests.jsx:236
			return arg;                                                           // tests.jsx:237
		}
		
		log([ a(), b() ]);                                                        // tests.jsx:239
	})(function (args){                                                           // tests.jsx:240
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:241
			got = JSON.stringify(args);                                           // tests.jsx:242
		
		if (expected === undefined){                                              // tests.jsx:243
			if (!missed){                                                         // tests.jsx:244
				console.log('Missing entry:');                                    // tests.jsx:245
				missed = true;                                                    // tests.jsx:246
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:250
				function (m, s){                                                  // tests.jsx:251
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:251
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:253
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:254
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:255
	});
	console.log('[Testing] Test "Functions" has been passed');                    // tests.jsx:257
})([
	[ 18, 
		null ]
]);
(function (result){                                                               // tests.jsx:260
	var missed = false;
	
	(function test_getters_setters(log){                                          // tests.jsx:262
		var a = {                                                                 // tests.jsx:263
			get a(){                                                              // tests.jsx:263
				return this._a * 2;                                               // tests.jsx:264
			}, 
			set a(v){
				this._a = v;                                                      // tests.jsx:265
			}
		};
		
		a.a = 5;                                                                  // tests.jsx:268
		
		var b = {                                                                 // tests.jsx:270
			get a(){                                                              // tests.jsx:270
				return this._a * 2;                                               // tests.jsx:271
			}, 
			set a(arg){
				return this._a = arg;                                             // tests.jsx:272
			}
		};
		
		b.a = 15;                                                                 // tests.jsx:275
		log([ a.a, b.a ]);                                                        // tests.jsx:277
	})(function (args){                                                           // tests.jsx:278
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:279
			got = JSON.stringify(args);                                           // tests.jsx:280
		
		if (expected === undefined){                                              // tests.jsx:281
			if (!missed){                                                         // tests.jsx:282
				console.log('Missing entry:');                                    // tests.jsx:283
				missed = true;                                                    // tests.jsx:284
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:288
				function (m, s){                                                  // tests.jsx:289
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:289
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:291
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:292
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:293
	});
	console.log('[Testing] Test "Getters/Setters" has been passed');              // tests.jsx:295
})([
	[ 10, 
		30 ]
]);
(function (result){                                                               // tests.jsx:298
	var missed = false;
	
	(function test_classes_with_getters_setters(log){                             // tests.jsx:300
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:301
			this.__A__a = 7;
		}
		Object.defineProperty(A.prototype, 
			'a', 
			{
				get: (function (){
					return this.__A__a * 2;
				}), 
				set: (function (v){
					this.__A__a = v;                                              // tests.jsx:306
				})
			});
		Object.defineProperty(A.prototype, 
			'b', 
			{
				get: (function (){
					return 15;
				})
			});
		Object.defineProperty(A.prototype, 
			'a2', 
			{
				get: (function (){
					return this.__A__a * 3;
				}), 
				set: (function (arg){
					return this.__A__a = arg;                                     // tests.jsx:310
				})
			});
		Object.defineProperty(A.prototype, 
			'b2', 
			{
				get: (function (){
					return 25;
				})
			});
		Object.defineProperty(A.prototype, 
			'__a3', 
			{
				get: (function (){
					return this.__A__a;
				})
			});
		
		/* Class "M" declaration */
		function M(){                                                             // tests.jsx:328
			if (this.constructor === M)
				throw new Error('Trying to instantiate abstract class M');
		}
		
		/* Class "N" declaration */
		function N(){}
		__prototypeExtend(N, 
			M);
		Object.defineProperty(N.prototype, 
			'Q', 
			{
				get: (function (){
					return 4;
				})
			});
		
		/* Class "B" declaration */
		function B(){                                                             // tests.jsx:315
			A.apply(this, 
				arguments);
		}
		__prototypeExtend(B, 
			A);
		B.prototype.test = function (){                                           // tests.jsx:316
			return this.a2 + this.__a3;
		};
		
		var a = new A();
		
		a.a = 5;                                                                  // tests.jsx:322
		log([ a.a, a.b, a.a2, a.b2 ]);                                            // tests.jsx:323
		
		var b = new B();
		
		log([ b.test() ]);                                                        // tests.jsx:326
		
		var n = new N();
		
		log([ n.Q ]);                                                             // tests.jsx:337
	})(function (args){                                                           // tests.jsx:338
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:339
			got = JSON.stringify(args);                                           // tests.jsx:340
		
		if (expected === undefined){                                              // tests.jsx:341
			if (!missed){                                                         // tests.jsx:342
				console.log('Missing entry:');                                    // tests.jsx:343
				missed = true;                                                    // tests.jsx:344
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:348
				function (m, s){                                                  // tests.jsx:349
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:349
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:351
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:352
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:353
	});
	console.log('[Testing] Test "Classes with getters/setters" has been passed');
})([
	[ 10, 
		15, 
		15, 
		25 ], 
	[ 28 ], 
	[ 4 ]
]);
(function (result){                                                               // tests.jsx:358
	var missed = false;
	
	(function test_classes_with_static_getters_setters(log){                      // tests.jsx:360
		/* Class "A" declaration */
		var A = (function (){                                                     // tests.jsx:361
			var A = function (){}, 
				_a = 7;
			
			Object.defineProperty(A,                                              // tests.jsx:361
				'a', 
				{
					get: (function (){
						return _a * 2;                                            // tests.jsx:364
					}), 
					set: (function (v){
						_a = v;                                                   // tests.jsx:366
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:361
				'b', 
				{
					get: (function (){
						return 15;
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:361
				'a2', 
				{
					get: (function (){
						return _a * 3;                                            // tests.jsx:368
					}), 
					set: (function (arg){
						return _a = arg;                                          // tests.jsx:370
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:361
				'b2', 
				{
					get: (function (){
						return 25;
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:361
				'__a3', 
				{
					get: (function (){
						return _a;                                                // tests.jsx:372
					})
				});
			return A;
		})();
		
		/* Class "B" declaration */
		function B(){}
		__prototypeExtend(B, 
			A);
		B.prototype.test = function (){                                           // tests.jsx:376
			return A.a2 + A.__a3;
		};
		
		A.a = 5;                                                                  // tests.jsx:381
		log([ A.a, A.b, A.a2, A.b2 ]);                                            // tests.jsx:382
		
		var b = new B();
		
		A.a = 8;                                                                  // tests.jsx:385
		log([ b.test() ]);                                                        // tests.jsx:386
	})(function (args){                                                           // tests.jsx:387
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:388
			got = JSON.stringify(args);                                           // tests.jsx:389
		
		if (expected === undefined){                                              // tests.jsx:390
			if (!missed){                                                         // tests.jsx:391
				console.log('Missing entry:');                                    // tests.jsx:392
				missed = true;                                                    // tests.jsx:393
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:397
				function (m, s){                                                  // tests.jsx:398
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:398
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:400
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:401
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:402
	});
	console.log('[Testing] Test "Classes with static getters/setters" has been passed');
})([
	[ 10, 
		15, 
		15, 
		25 ], 
	[ 32 ]
]);
(function (result){                                                               // tests.jsx:407
	var missed = false;
	
	(function test_classes(log){                                                  // tests.jsx:409
		/* Class "First" declaration */
		var First = (function (){                                                 // tests.jsx:410
			var First = function (dog){                                           // tests.jsx:410
					this.__First_dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';   // tests.jsx:413
					this.__First_horse = 'IGOGO, MOTHERFUCKERS!';                 // tests.jsx:414
					log([ '.', '"First" says "Hi!"' ]);                           // tests.jsx:417
					this.__First_dog = dog + ' (' + cat + ')';                    // tests.jsx:418
					log([ '.', '.', this.__First_dog ]);                          // tests.jsx:419
				}, 
				cat = 'Meow?';                                                    // tests.jsx:411
			
			First.prototype.cow = function (){                                    // tests.jsx:422
				log([ '.', 'Mo-o-o-o from "First".' ]);                           // tests.jsx:423
			};
			return First;
		})();
		
		/* Class "Second" declaration */
		var Second = (function (){                                                // tests.jsx:427
			var Second = function (){                                             // tests.jsx:427
					if (this.constructor === Second)
						throw new Error('Trying to instantiate abstract class Second');
					
					this.horse = 'Horse, tazshemta';                              // tests.jsx:430
					First.apply(this, 
						arguments);
				}, 
				cat = 'Meow!';                                                    // tests.jsx:428
			
			__prototypeExtend(Second, 
				First);
			Second.prototype.whoIsIt = function (){                               // tests.jsx:432
				log([ '.', 'Michael Jackson, for example' ]);                     // tests.jsx:433
				log([ '.', 'Or cat:', cat ]);                                     // tests.jsx:434
				log([ '.', 'Or dog:', Second.__dog ]);                            // tests.jsx:435
				log([ '.', 'Or horse:', this.horse ]);                            // tests.jsx:436
			};
			Second.prototype.eat = function (){                                   // tests.jsx:439
				log([ '.', 'Wow, yammy!' ]);                                      // tests.jsx:440
			};
			Second.prototype.sleep = function (){                                 // tests.jsx:443
				log([ '.', 'Z-z-z-z...' ]);                                       // tests.jsx:444
			};
			Second.__dog = 'WOOF! WOOF! WOOF!';                                   // tests.jsx:429
			return Second;
		})();
		
		/* Class "Third" declaration */
		function Third(){                                                         // tests.jsx:450
			Second.apply(this, 
				arguments);
		}
		__prototypeExtend(Third, 
			Second);
		Third.prototype.eat = function (){                                        // tests.jsx:451
			Second.prototype.eat.apply(this, arguments);                          // tests.jsx:427
			log([ '. .', 'And chew-chew-chew!' ]);                                // tests.jsx:453
		};
		Third.prototype.sleep = function (){                                      // tests.jsx:456
			Second.prototype.sleep.apply(this, arguments);                        // tests.jsx:427
			log([ '. .', 'Now with 20% more snoring!' ]);                         // tests.jsx:458
		};
		Third.prototype.poop = function (){                                       // tests.jsx:461
			log([ '.', 'E-e-e-w.' ]);                                             // tests.jsx:462
		};
		
		/* Class "Fourth" declaration */
		function Fourth(){                                                        // tests.jsx:466
			Third.call(this, 
				'Dogs don\'t say "KRAKOZYABRA"');
			log([ '.', '"Fourth" in da house.' ]);                                // tests.jsx:469
		}
		__prototypeExtend(Fourth, 
			Third);
		Fourth.prototype.poop = function (){                                      // tests.jsx:472
			return log([ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]);
		};
		
		var c;
		
		log([ 'Here come "First"!' ]);                                            // tests.jsx:478
		new First('What do dogs say?');                                           // tests.jsx:479
		log([ 'And now — "Second"!' ]);                                           // tests.jsx:481
		
		try {
			new Second('Nothing here.');                                          // tests.jsx:483
		} catch (e){
			log([ '.', '"Second" is too tired: ' + e.message ]);                  // tests.jsx:485
		} 
		
		log([ 'Next is "Third"!' ]);                                              // tests.jsx:487
		c = new Third('What do dogs say? Last try!');                             // tests.jsx:488
		log([ '"Third" has something to eat!' ]);                                 // tests.jsx:490
		c.eat();                                                                  // tests.jsx:491
		log([ 'Now he wants to sleep!' ]);                                        // tests.jsx:493
		c.sleep();                                                                // tests.jsx:494
		log([                                                                     // tests.jsx:496
			'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
		]);
		c.poop();                                                                 // tests.jsx:497
		log([                                                                     // tests.jsx:499
			'And now "Third" has something to tell us! "Third", who is it?'
		]);
		c.whoIsIt();                                                              // tests.jsx:500
		log([ 'And, finally, "Fourth".' ]);                                       // tests.jsx:502
		c = new Fourth();                                                         // tests.jsx:503
		log([ 'Okay, give us some your regular crap.' ]);                         // tests.jsx:505
		c.poop();                                                                 // tests.jsx:506
	})(function (args){                                                           // tests.jsx:507
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:508
			got = JSON.stringify(args);                                           // tests.jsx:509
		
		if (expected === undefined){                                              // tests.jsx:510
			if (!missed){                                                         // tests.jsx:511
				console.log('Missing entry:');                                    // tests.jsx:512
				missed = true;                                                    // tests.jsx:513
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:517
				function (m, s){                                                  // tests.jsx:518
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:518
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:520
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:521
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:522
	});
	console.log('[Testing] Test "Classes" has been passed');                      // tests.jsx:524
})([
	[ 'Here come "First"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? (Meow?)' ], 
	[ 'And now — "Second"!' ], 
	[
		'.',                                                                      // tests.jsx:525
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
(function (result){                                                               // tests.jsx:527
	var missed = false;
	
	(function test_static_fields_with_initializers(log){                          // tests.jsx:529
		/* Class "A" declaration */
		var A = (function (){                                                     // tests.jsx:530
			var A = function (){                                                  // tests.jsx:530
					log([ b, A.pb ]);                                             // tests.jsx:538
				}, 
				a = 2,                                                            // tests.jsx:531
				b = a + 2;                                                        // tests.jsx:532
			
			A.pa = 2;                                                             // tests.jsx:534
			A.pb = A.pa + 2;                                                      // tests.jsx:535
			return A;
		})();
		
		/* Class "B" declaration */
		function B(){                                                             // tests.jsx:542
			log([ B.b ]);                                                         // tests.jsx:546
		}
		B.a = 1;                                                                  // tests.jsx:543
		B.b = B.a * 2;                                                            // tests.jsx:543
		
		new A();                                                                  // tests.jsx:550
		new B();                                                                  // tests.jsx:551
	})(function (args){                                                           // tests.jsx:552
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:553
			got = JSON.stringify(args);                                           // tests.jsx:554
		
		if (expected === undefined){                                              // tests.jsx:555
			if (!missed){                                                         // tests.jsx:556
				console.log('Missing entry:');                                    // tests.jsx:557
				missed = true;                                                    // tests.jsx:558
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:562
				function (m, s){                                                  // tests.jsx:563
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:563
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:565
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:566
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:567
	});
	console.log('[Testing] Test "Static fields with initializers" has been passed');
})([
	[ 4, 
		4 ], 
	[ 2 ]
]);
(function (result){                                                               // tests.jsx:572
	var missed = false;
	
	(function test_constructors(log){                                             // tests.jsx:574
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:575
			log([ 'A' ]);                                                         // tests.jsx:577
		}
		
		/* Class "B" declaration */
		function B(){                                                             // tests.jsx:581
			A.apply(this, 
				arguments);
			log([ 'B' ]);                                                         // tests.jsx:583
		}
		__prototypeExtend(B, 
			A);
		
		/* Class "C" declaration */
		function C(){                                                             // tests.jsx:587
			B.apply(this, 
				arguments);
		}
		__prototypeExtend(C, 
			B);
		
		/* Class "D" declaration */
		function D(){                                                             // tests.jsx:590
			C.apply(this, 
				arguments);
			log([ 'D' ]);                                                         // tests.jsx:592
		}
		__prototypeExtend(D, 
			C);
		
		/* Class "E" declaration */
		function E(arg){                                                          // tests.jsx:596
			D.apply(this, 
				arguments);
			log([ 'E(' + arg + ')' ]);                                            // tests.jsx:598
		}
		__prototypeExtend(E, 
			D);
		
		/* Class "F" declaration */
		function F(arg){                                                          // tests.jsx:602
			E.call(this, 
				arg);
			log([ 'F(' + arg + ')' ]);                                            // tests.jsx:605
		}
		__prototypeExtend(F, 
			E);
		
		/* Class "G" declaration */
		function G(){                                                             // tests.jsx:609
			F.apply(this, 
				arguments);
		}
		__prototypeExtend(G, 
			F);
		
		{
			var __c = [ A, B, C, D, E, F, G ];
			
			for (var i = 0; i < __c.length; i ++){                                // tests.jsx:611
				var c = __c[i];
				
				log([ c.name + ':' ]);                                            // tests.jsx:612
				new c(i);                                                         // tests.jsx:613
			}
			
			__c = undefined;
		}
	})(function (args){                                                           // tests.jsx:615
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:616
			got = JSON.stringify(args);                                           // tests.jsx:617
		
		if (expected === undefined){                                              // tests.jsx:618
			if (!missed){                                                         // tests.jsx:619
				console.log('Missing entry:');                                    // tests.jsx:620
				missed = true;                                                    // tests.jsx:621
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:625
				function (m, s){                                                  // tests.jsx:626
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:626
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:628
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:629
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:630
	});
	console.log('[Testing] Test "Constructors" has been passed');                 // tests.jsx:632
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
(function (result){                                                               // tests.jsx:635
	var missed = false;
	
	(function test_hardcore_test_for_classes(log){                                // tests.jsx:637
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:638
			this.__parent = 'WOOHOO!';                                            // tests.jsx:639
		}
		
		/* Class "B" declaration */
		var B = (function (){                                                     // tests.jsx:642
			var B = function (variable){                                          // tests.jsx:642
					this.__B_testObj = {
						find: (function (){                                       // tests.jsx:720
							return [ { variable: 'deep!' } ];
						})
					};
					A.apply(this, 
						arguments);
					this.__B_variable = variable;                                 // tests.jsx:649
					this.qwerty = 'default';                                      // tests.jsx:650
				}, 
				privateStatic = 'done';                                           // tests.jsx:643
			
			__prototypeExtend(B, 
				A);
			B.prototype.test = function (a, b){                                   // tests.jsx:653
				var __;
				
				a[a instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:654
				b[b instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:655
				log([                                                             // tests.jsx:656
					this.__B_variable,                                            // tests.jsx:656
					a[a instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:656
					b[b instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:656
					(__ = new A(), __[__ instanceof A ? '__parent' : 'parent'])
				]);
			};
			B.prototype.other = function (a, b){                                  // tests.jsx:659
				var __;
				
				function getA(){                                                  // tests.jsx:660
					log([ '[getA]' ]);                                            // tests.jsx:661
					return {
						get: (function (){                                        // tests.jsx:663
							log([ '[getA][get]' ]);                               // tests.jsx:664
							return a;                                             // tests.jsx:665
						})
					};
				}
				
				function getB(){                                                  // tests.jsx:670
					log([ '[getB]' ]);                                            // tests.jsx:671
					return {
						get: (function (){                                        // tests.jsx:673
							log([ '[getB][get]' ]);                               // tests.jsx:674
							return b;                                             // tests.jsx:675
						})
					};
				}
				
				log([                                                             // tests.jsx:680
					(__ = getA().get(),                                           // tests.jsx:680
						__[__ instanceof B ? '__B_variable' : 'variable'] += '-changed'), 
					(__ = getB().get(),                                           // tests.jsx:680
						__[__ instanceof B ? '__B_variable' : 'variable'] += '-changed')
				]);
				log([ 'ok' ]);                                                    // tests.jsx:681
				log([                                                             // tests.jsx:682
					(__ = getA().get(),                                           // tests.jsx:682
						__[__ instanceof B ? '__B_variable' : 'variable']), 
					(__ = getB().get(),                                           // tests.jsx:682
						__[__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.final = function (a, b){                                  // tests.jsx:685
				function getA(){                                                  // tests.jsx:686
					log([ '[getA]' ]);                                            // tests.jsx:687
					return a;                                                     // tests.jsx:688
				}
				
				function getB(){                                                  // tests.jsx:691
					log([ '[getB]' ]);                                            // tests.jsx:692
					return b;                                                     // tests.jsx:693
				}
				
				log([ getA().qwerty += '-changed', getB().qwerty += '-changed' ]);
				log([ a.qwerty, b.qwerty ]);                                      // tests.jsx:697
			};
			B.prototype.method = function (a, b){                                 // tests.jsx:700
				var __;
				
				function getA(){                                                  // tests.jsx:701
					log([ '[getA]' ]);                                            // tests.jsx:702
					return a;                                                     // tests.jsx:703
				}
				
				function getB(){                                                  // tests.jsx:706
					log([ '[getB]' ]);                                            // tests.jsx:707
					return b;                                                     // tests.jsx:708
				}
				
				log([                                                             // tests.jsx:711
					(__ = getA(),                                                 // tests.jsx:711
						__[__ instanceof B ? '__B_testMethod' : 'testMethod']).call(__, 
						1, 
						2), 
					(__ = getB(),                                                 // tests.jsx:711
						__[__ instanceof B ? '__B_testMethod' : 'testMethod']).call(__, 
						3)
				]);
			};
			B.prototype.__B_testMethod = function (){                             // tests.jsx:714
				log([ arguments ]);                                               // tests.jsx:715
				return this instanceof B;                                         // tests.jsx:716
			};
			B.prototype.awful = function (){                                      // tests.jsx:729
				var __;
				
				log([                                                             // tests.jsx:730
					(__ = this.__B_testObj.find()[0],                             // tests.jsx:730
						__[__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.staticTest = function (obj){                              // tests.jsx:733
				log([ obj.privateStatic, privateStatic ]);                        // tests.jsx:734
			};
			return B;
		})();
		
		new B('first').method(new B('second'),                                    // tests.jsx:738
			{
				testMethod: (function (arg){                                      // tests.jsx:738
					return this.result + arg;                                     // tests.jsx:738
				}), 
				result: 'success'
			});
		new B('first').test(new B('second'), { variable: 'success' });            // tests.jsx:739
		new B('first').other(new B('second'), { variable: 'success' });           // tests.jsx:740
		new B('first').final(new B('second'), { qwerty: 'qwerty' });              // tests.jsx:741
		new B().awful();                                                          // tests.jsx:742
		new B('first').staticTest({ privateStatic: 'arg' });                      // tests.jsx:743
	})(function (args){                                                           // tests.jsx:744
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:745
			got = JSON.stringify(args);                                           // tests.jsx:746
		
		if (expected === undefined){                                              // tests.jsx:747
			if (!missed){                                                         // tests.jsx:748
				console.log('Missing entry:');                                    // tests.jsx:749
				missed = true;                                                    // tests.jsx:750
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:754
				function (m, s){                                                  // tests.jsx:755
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:755
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:757
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:758
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:759
	});
	console.log('[Testing] Test "Hardcore test for classes" has been passed');    // tests.jsx:761
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
(function (result){                                                               // tests.jsx:764
	var missed = false;
	
	(function test_access_through___that(log){                                    // tests.jsx:766
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:767
			var __that = this;
			
			this.__A_a = 'ok-a';                                                  // tests.jsx:768
			this.__A_b = 'ok-b';                                                  // tests.jsx:768
			Function.prototype.call.call((function (arg){                         // tests.jsx:770
				log([ '[A]', __that.__A_a, this['b'] ]);                          // tests.jsx:771
			}).bind({ b: 'ok-ok-ok-b' }),                                         // tests.jsx:772
			10);
			log([ '[B]', this.__A_a, this.__A_b ]);                               // tests.jsx:773
		}
		
		new A();                                                                  // tests.jsx:777
	})(function (args){                                                           // tests.jsx:778
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:779
			got = JSON.stringify(args);                                           // tests.jsx:780
		
		if (expected === undefined){                                              // tests.jsx:781
			if (!missed){                                                         // tests.jsx:782
				console.log('Missing entry:');                                    // tests.jsx:783
				missed = true;                                                    // tests.jsx:784
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:788
				function (m, s){                                                  // tests.jsx:789
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:789
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:791
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:792
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:793
	});
	console.log('[Testing] Test "Access through __that" has been passed');        // tests.jsx:795
})([
	[ '[A]', 'ok-a', 'ok-ok-ok-b' ], 
	[ '[B]', 'ok-a', 'ok-b' ]
]);
(function (result){                                                               // tests.jsx:798
	var missed = false;
	
	(function test_for_parser_and_generator(log){                                 // tests.jsx:800
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
		
		var a = function (){                                                      // tests.jsx:804
				log([                                                             // tests.jsx:805
					'5',                                                          // tests.jsx:805
					'58', 
					'test58', 
					'begin insert middle test end', 
					'5-%0-8', 
					'5-5-8'
				]);
			}, 
			b = function (variable5, variable8){                                  // tests.jsx:814
				if (variable5 === undefined)                                      // tests.jsx:814
					variable5 = 1;                                                // tests.jsx:814
			
				if (variable8 === undefined)                                      // tests.jsx:814
					variable8 = 'K';                                              // tests.jsx:814
			
				function q(){}
				
				log([                                                             // tests.jsx:817
					'' + variable5,                                               // tests.jsx:817
					'' + variable5 + variable8,                                   // tests.jsx:819
					'test' + variable5 + variable8
				]);
				
				function a(){                                                     // tests.jsx:823
					console.warn('Not implemented at 823 line of tests.jsx');     // tests.jsx:823
				}
				
				function b(){}
				
				if (a)                                                            // tests.jsx:827
					function s(){}
			};
		
		log([ 'hi' ]);                                                            // tests.jsx:831
		
		while (0);
		
		log([                                                                     // tests.jsx:835
			0x86,                                                                 // tests.jsx:835
			'test',                                                               // tests.jsx:838
			'\n\r\t',                                                             // tests.jsx:839
			'multiline\
	string',                                                                      // tests.jsx:841
			'qqq\'qqq',                                                           // tests.jsx:842
			'\u0061',                                                             // tests.jsx:843
			'\%\~'
		]);
		log([                                                                     // tests.jsx:847
			'begin ' + console + ' end',                                          // tests.jsx:847
			'' + console,                                                         // tests.jsx:849
			'be\ngin \'' + console + ' middle ' + JSON + ' end',                  // tests.jsx:851
			'', 
			'attaching test', 
			'here goes hardcore test', 
			'really hardcore te\'st', 
			'really hardcore te"st'
		]);
		a();                                                                      // tests.jsx:861
	})(function (args){                                                           // tests.jsx:862
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:863
			got = JSON.stringify(args);                                           // tests.jsx:864
		
		if (expected === undefined){                                              // tests.jsx:865
			if (!missed){                                                         // tests.jsx:866
				console.log('Missing entry:');                                    // tests.jsx:867
				missed = true;                                                    // tests.jsx:868
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:872
				function (m, s){                                                  // tests.jsx:873
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:873
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:875
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:876
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:877
	});
	console.log('[Testing] Test "For parser and generator" has been passed');     // tests.jsx:879
})([
	[ 'hi' ], 
	[
		134, 
		'test',                                                                   // tests.jsx:880
		'\n\r\t',                                                                 // tests.jsx:880
		'multiline\tstring',                                                      // tests.jsx:880
		'qqq\'qqq',                                                               // tests.jsx:880
		'a',                                                                      // tests.jsx:880
		'%~'
	], 
	[
		'begin [object Object] end',                                              // tests.jsx:880
		'[object Object]',                                                        // tests.jsx:880
		'be\ngin \'[object Object] middle [object JSON] end',                     // tests.jsx:880
		'',                                                                       // tests.jsx:880
		'attaching test',                                                         // tests.jsx:880
		'here goes hardcore test',                                                // tests.jsx:880
		'really hardcore te\'st',                                                 // tests.jsx:880
		'really hardcore te"st'
	], 
	[
		'5',                                                                      // tests.jsx:880
		'58',                                                                     // tests.jsx:880
		'test58',                                                                 // tests.jsx:880
		'begin insert middle test end',                                           // tests.jsx:880
		'5-%0-8',                                                                 // tests.jsx:880
		'5-5-8'
	]
]);
(function (result){                                                               // tests.jsx:882
	var missed = false;
	
	(function test_multiline(log){                                                // tests.jsx:884
		var first = " first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			second = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			third = "first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line", 
			fourth = "first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line", 
			fifth = "\t\t first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line", 
			symbols = "'\"`";                                                     // tests.jsx:914
		
		log([ first ]);                                                           // tests.jsx:916
		log([ second ]);                                                          // tests.jsx:917
		log([ third ]);                                                           // tests.jsx:918
		log([ fourth ]);                                                          // tests.jsx:919
		log([ fifth ]);                                                           // tests.jsx:920
		log([ symbols ]);                                                         // tests.jsx:921
	})(function (args){                                                           // tests.jsx:922
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:923
			got = JSON.stringify(args);                                           // tests.jsx:924
		
		if (expected === undefined){                                              // tests.jsx:925
			if (!missed){                                                         // tests.jsx:926
				console.log('Missing entry:');                                    // tests.jsx:927
				missed = true;                                                    // tests.jsx:928
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:932
				function (m, s){                                                  // tests.jsx:933
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:933
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:935
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:936
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:937
	});
	console.log('[Testing] Test "Multiline" has been passed');                    // tests.jsx:939
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
