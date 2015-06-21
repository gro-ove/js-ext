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
	
	(function test_strings_format(log){                                           // tests.jsx:9
		log([ '3 3' ]);                                                           // tests.jsx:10
		log([ '%0 2' ]);                                                          // tests.jsx:11
		log([ "%%0 %0" ]);                                                        // tests.jsx:12
	})(function (args){                                                           // tests.jsx:13
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:14
			got = JSON.stringify(args);                                           // tests.jsx:15
		
		if (expected === undefined){                                              // tests.jsx:16
			if (!missed){                                                         // tests.jsx:17
				console.log('Missing entry:');                                    // tests.jsx:18
				missed = true;                                                    // tests.jsx:19
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:23
				function (m, s){                                                  // tests.jsx:24
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:24
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:26
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:27
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:28
	});
	console.log('[Testing] Test "Strings format" has been passed');               // tests.jsx:30
})([ [ '3 3' ], 
	[ '%0 2' ], 
	[ '%' + '%' + '0 %' + '0' ] ]);
(function (result){                                                               // tests.jsx:33
	var missed = false;
	
	(function test_priorities(log){                                               // tests.jsx:35
		var a = 1, b = 2, c = 3, d = 4;
		
		log([                                                                     // tests.jsx:37
			b + c || d,                                                           // tests.jsx:37
			b - c - d,                                                            // tests.jsx:39
			b - (c - d),                                                          // tests.jsx:40
			a + (c, d),                                                           // tests.jsx:41
			(a | b + c) + d,                                                      // tests.jsx:42
			a + b | c + d,                                                        // tests.jsx:43
			a + (b | c) + d
		]);
	})(function (args){                                                           // tests.jsx:46
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:47
			got = JSON.stringify(args);                                           // tests.jsx:48
		
		if (expected === undefined){                                              // tests.jsx:49
			if (!missed){                                                         // tests.jsx:50
				console.log('Missing entry:');                                    // tests.jsx:51
				missed = true;                                                    // tests.jsx:52
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:56
				function (m, s){                                                  // tests.jsx:57
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:57
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:59
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:60
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:61
	});
	console.log('[Testing] Test "Priorities" has been passed');                   // tests.jsx:63
})([
	[ 5, 
		- 5, 
		3, 
		5, 
		9, 
		7, 
		8 ]
]);
(function (result){                                                               // tests.jsx:66
	var missed = false;
	
	(function test_fancy_arrays_loops_and_stuff(log){                             // tests.jsx:68
		{
			var __0 = [ 'a', 'b', 
				'c' ];
			
			for (var index = 0; index < __0.length; index ++){                    // tests.jsx:69
				var value = __0[index];
				
				log([ index, value ]);                                            // tests.jsx:70
			}
			
			__0 = undefined;
		}
		
		{
			var __1 = __createArray(0, 
				10);
			
			for (var key in __1){
				var value = __1[key];
				
				log([ key, value ]);                                              // tests.jsx:73
			}
			
			__1 = undefined;
		}
		
		for (var key in __createArray(0, 
			20))
			log([ key ]);                                                         // tests.jsx:76
		
		log([                                                                     // tests.jsx:78
			[ 5, 4, 
				3, 
				2, 
				1 ],                                                              // tests.jsx:78
			__createArray(15, 
				1)
		]);
		log([                                                                     // tests.jsx:79
			__createArray('a', 'k'),                                              // tests.jsx:79
			[ 'd', 'c', 
				'b', 
				'a' ], 
			__createArray('k', 'a')
		]);
	})(function (args){                                                           // tests.jsx:80
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:81
			got = JSON.stringify(args);                                           // tests.jsx:82
		
		if (expected === undefined){                                              // tests.jsx:83
			if (!missed){                                                         // tests.jsx:84
				console.log('Missing entry:');                                    // tests.jsx:85
				missed = true;                                                    // tests.jsx:86
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:90
				function (m, s){                                                  // tests.jsx:91
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:91
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:93
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:94
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:95
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
(function (result){                                                               // tests.jsx:100
	var missed = false;
	
	(function test_another_test_for_loops(log){                                   // tests.jsx:102
		var a1 = { a: 1, b: 2, c: 3 },                                            // tests.jsx:103
			a2 = { a: 'a', b: 'b', c: 'c' },                                      // tests.jsx:104
			a3 = [ 1, 2, 
				3, 
				4 ],                                                              // tests.jsx:105
			a4 = [ 'a', 'b', 'c' ];                                               // tests.jsx:106
		
		for (var n in a1)                                                         // tests.jsx:108
			log([ n ]);                                                           // tests.jsx:108
		
		for (n in a2)                                                             // tests.jsx:109
			log([ n ]);                                                           // tests.jsx:109
		
		for (var n in a1){                                                        // tests.jsx:111
			var v = a1[n];
			
			log([ n ]);                                                           // tests.jsx:111
		}
		
		for (n in a2){                                                            // tests.jsx:112
			v = a2[n];                                                            // tests.jsx:112
			log([ n ]);                                                           // tests.jsx:112
		}
		
		for (var __2 = 0; __2 < a3.length; __2 ++){                               // tests.jsx:114
			var n = a3[__2];
			
			log([ n ]);                                                           // tests.jsx:114
		}
		
		for (var __3 = 0; __3 < a4.length; __3 ++){                               // tests.jsx:115
			n = a4[__3];                                                          // tests.jsx:115
			log([ n ]);                                                           // tests.jsx:115
		}
		
		for (var n = 0; n < a3.length; n ++){                                     // tests.jsx:117
			var v = a3[n];
			
			log([ n ]);                                                           // tests.jsx:117
		}
		
		for (n = 0; n < a4.length; n ++){                                         // tests.jsx:118
			v = a4[n];                                                            // tests.jsx:118
			log([ n ]);                                                           // tests.jsx:118
		}
		
		{
			var __4 = { a9: 7 };
			
			for (n in __4){                                                       // tests.jsx:120
				v = __4[n];                                                       // tests.jsx:120
				log([ n ]);                                                       // tests.jsx:120
			}
			
			__4 = undefined;
		}
		
		for (v in { a10: 7 })                                                     // tests.jsx:121
			log([ n ]);                                                           // tests.jsx:121
		
		for (var n in { a: 100, b: 102, c: 104, d: log([ 'n-0' ]) || 106 })
			log([ n ]);                                                           // tests.jsx:129
		
		{
			var __5 = { a: 100, b: 102, c: 104, d: log([ 'n-1' ]) || 106 };
			
			for (var i in __5){
				var k = __5[i];
				
				log([ i, k ]);                                                    // tests.jsx:137
			}
			
			__5 = undefined;
		}
		
		{
			var __6 = [ 100, 
				102, 
				104, 
				log([ 'n-2' ]) || 106 ];
			
			for (var i = 0; i < __6.length; i ++){                                // tests.jsx:139
				var k = __6[i];
				
				log([ i, k ]);                                                    // tests.jsx:140
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
				
				log([ k ]);                                                       // tests.jsx:143
			}
			
			__8 = undefined;
		}
		
		{
			var __a = 'qwerty';
			
			for (var __9 = 0; __9 < __a.length; __9 ++){
				var n = __a[__9];
				
				log([ n ]);                                                       // tests.jsx:146
			}
			
			__a = undefined;
		}
		
		{
			var __b = 'qwerty';
			
			for (var n = 0; n < __b.length; n ++){                                // tests.jsx:148
				var e = __b[n];
				
				log([ n, e ]);                                                    // tests.jsx:149
			}
			
			__b = undefined;
		}
	})(function (args){                                                           // tests.jsx:150
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:151
			got = JSON.stringify(args);                                           // tests.jsx:152
		
		if (expected === undefined){                                              // tests.jsx:153
			if (!missed){                                                         // tests.jsx:154
				console.log('Missing entry:');                                    // tests.jsx:155
				missed = true;                                                    // tests.jsx:156
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:160
				function (m, s){                                                  // tests.jsx:161
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:161
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:163
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:164
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:165
	});
	console.log('[Testing] Test "Another test for loops" has been passed');       // tests.jsx:167
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
(function (result){                                                               // tests.jsx:170
	var missed = false;
	
	(function test_comma_free(log){                                               // tests.jsx:172
		log([                                                                     // tests.jsx:173
			'string',                                                             // tests.jsx:173
			187, 
			function (arg){                                                       // tests.jsx:176
				return 15;
			}, 
			function (arg){                                                       // tests.jsx:177
				return 18;
			}, 
			{
				a: 20,                                                            // tests.jsx:179
				b: 25,                                                            // tests.jsx:180
				c: [                                                              // tests.jsx:181
					function (arg){                                               // tests.jsx:181
						return 14;
					}, 
					function (arg){                                               // tests.jsx:183
						return 'hi';                                              // tests.jsx:183
					}
				]
			}
		]);
	})(function (args){                                                           // tests.jsx:187
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:188
			got = JSON.stringify(args);                                           // tests.jsx:189
		
		if (expected === undefined){                                              // tests.jsx:190
			if (!missed){                                                         // tests.jsx:191
				console.log('Missing entry:');                                    // tests.jsx:192
				missed = true;                                                    // tests.jsx:193
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:197
				function (m, s){                                                  // tests.jsx:198
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:198
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:200
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:201
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:202
	});
	console.log('[Testing] Test "Comma-free" has been passed');                   // tests.jsx:204
})([
	[
		'string',                                                                 // tests.jsx:205
		187, 
		null, 
		null, 
		{ 'a': 20, 'b': 25, 'c': [ null, null ] }
	]
]);
(function (result){                                                               // tests.jsx:207
	var missed = false;
	
	(function test_lambdas(log){                                                  // tests.jsx:209
		var a = function (test){                                                  // tests.jsx:210
				return typeof test;                                               // tests.jsx:210
			}, 
			b = function (arg){                                                   // tests.jsx:211
				return arg;                                                       // tests.jsx:211
			}, 
			c = function (arg){                                                   // tests.jsx:212
				return arg;                                                       // tests.jsx:212
			}, 
			d = function (arg){                                                   // tests.jsx:213
				if (a && b())                                                     // tests.jsx:213
					return arg;                                                   // tests.jsx:213
				else
					return - arg;                                                 // tests.jsx:213
			}, 
			e = function (arg){                                                   // tests.jsx:214
				return typeof a + a(b);                                           // tests.jsx:214
			};
		
		var f = function (arg){                                                   // tests.jsx:216
			return { a: 'a', b: String(d()) };
		};
		
		var g = [                                                                 // tests.jsx:221
			function (arg){                                                       // tests.jsx:221
				return { a: 'b' };
			}, 
			function (arg){                                                       // tests.jsx:221
				return b;                                                         // tests.jsx:221
			}
		];
		
		[
			function (arg){                                                       // tests.jsx:223
				if (t){                                                           // tests.jsx:223
					a;                                                            // tests.jsx:223
				} else
					return b;                                                     // tests.jsx:223
			}, 
			function (arg){                                                       // tests.jsx:223
				if (q)                                                            // tests.jsx:223
					return b;                                                     // tests.jsx:223
			}
		];
		log([                                                                     // tests.jsx:225
			a(1),                                                                 // tests.jsx:225
			b(1),                                                                 // tests.jsx:227
			c(1),                                                                 // tests.jsx:228
			d(1),                                                                 // tests.jsx:229
			e(),                                                                  // tests.jsx:230
			f(),                                                                  // tests.jsx:231
			g[0](),                                                               // tests.jsx:232
			String(g[1]()()),                                                     // tests.jsx:233
			g.length
		]);
	})(function (args){                                                           // tests.jsx:236
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:237
			got = JSON.stringify(args);                                           // tests.jsx:238
		
		if (expected === undefined){                                              // tests.jsx:239
			if (!missed){                                                         // tests.jsx:240
				console.log('Missing entry:');                                    // tests.jsx:241
				missed = true;                                                    // tests.jsx:242
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:246
				function (m, s){                                                  // tests.jsx:247
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:247
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:249
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:250
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:251
	});
	console.log('[Testing] Test "Lambdas" has been passed');                      // tests.jsx:253
})([
	[
		'number',                                                                 // tests.jsx:254
		1, 
		1, 
		- 1, 
		'functionfunction',                                                       // tests.jsx:254
		{ 'a': 'a', 'b': 'NaN' }, 
		{ 'a': 'b' }, 
		'undefined',                                                              // tests.jsx:254
		2
	]
]);
(function (result){                                                               // tests.jsx:256
	var missed = false;
	
	(function test_functions(log){                                                // tests.jsx:258
		function a(arg){                                                          // tests.jsx:259
			if (arg === undefined)                                                // tests.jsx:259
				arg = 18;                                                         // tests.jsx:259
		
			return arg;                                                           // tests.jsx:260
		}
		
		function b(arg){                                                          // tests.jsx:262
			return arg;                                                           // tests.jsx:263
		}
		
		log([ a(), b() ]);                                                        // tests.jsx:265
	})(function (args){                                                           // tests.jsx:266
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:267
			got = JSON.stringify(args);                                           // tests.jsx:268
		
		if (expected === undefined){                                              // tests.jsx:269
			if (!missed){                                                         // tests.jsx:270
				console.log('Missing entry:');                                    // tests.jsx:271
				missed = true;                                                    // tests.jsx:272
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:276
				function (m, s){                                                  // tests.jsx:277
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:277
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:279
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:280
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:281
	});
	console.log('[Testing] Test "Functions" has been passed');                    // tests.jsx:283
})([
	[ 18, 
		null ]
]);
(function (result){                                                               // tests.jsx:286
	var missed = false;
	
	(function test_getters_setters(log){                                          // tests.jsx:288
		var a = {                                                                 // tests.jsx:289
			get a(){                                                              // tests.jsx:289
				return this._a * 2;                                               // tests.jsx:290
			}, 
			set a(v){
				this._a = v;                                                      // tests.jsx:291
			}
		};
		
		a.a = 5;                                                                  // tests.jsx:294
		
		var b = {                                                                 // tests.jsx:296
			get a(){                                                              // tests.jsx:296
				return this._a * 2;                                               // tests.jsx:297
			}, 
			set a(arg){
				return this._a = arg;                                             // tests.jsx:298
			}
		};
		
		b.a = 15;                                                                 // tests.jsx:301
		log([ a.a, b.a ]);                                                        // tests.jsx:303
	})(function (args){                                                           // tests.jsx:304
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:305
			got = JSON.stringify(args);                                           // tests.jsx:306
		
		if (expected === undefined){                                              // tests.jsx:307
			if (!missed){                                                         // tests.jsx:308
				console.log('Missing entry:');                                    // tests.jsx:309
				missed = true;                                                    // tests.jsx:310
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:314
				function (m, s){                                                  // tests.jsx:315
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:315
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:317
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:318
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:319
	});
	console.log('[Testing] Test "Getters/Setters" has been passed');              // tests.jsx:321
})([
	[ 10, 
		30 ]
]);
(function (result){                                                               // tests.jsx:324
	var missed = false;
	
	(function test_classes_with_getters_setters(log){                             // tests.jsx:326
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:327
			this.__A__a = 7;
		}
		Object.defineProperty(A.prototype, 
			'a', 
			{
				get: (function (){
					return this.__A__a * 2;
				}), 
				set: (function (v){
					this.__A__a = v;                                              // tests.jsx:332
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
					return this.__A__a = arg;                                     // tests.jsx:336
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
		function M(){                                                             // tests.jsx:354
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
		function B(){                                                             // tests.jsx:341
			A.apply(this, 
				arguments);
		}
		__prototypeExtend(B, 
			A);
		B.prototype.test = function (){                                           // tests.jsx:342
			return this.a2 + this.__a3;
		};
		
		var a = new A();
		
		a.a = 5;                                                                  // tests.jsx:348
		log([ a.a, a.b, a.a2, a.b2 ]);                                            // tests.jsx:349
		
		var b = new B();
		
		log([ b.test() ]);                                                        // tests.jsx:352
		
		var n = new N();
		
		log([ n.Q ]);                                                             // tests.jsx:363
	})(function (args){                                                           // tests.jsx:364
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:365
			got = JSON.stringify(args);                                           // tests.jsx:366
		
		if (expected === undefined){                                              // tests.jsx:367
			if (!missed){                                                         // tests.jsx:368
				console.log('Missing entry:');                                    // tests.jsx:369
				missed = true;                                                    // tests.jsx:370
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:374
				function (m, s){                                                  // tests.jsx:375
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:375
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:377
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:378
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:379
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
(function (result){                                                               // tests.jsx:384
	var missed = false;
	
	(function test_classes_with_static_getters_setters(log){                      // tests.jsx:386
		/* Class "A" declaration */
		var A = (function (){                                                     // tests.jsx:387
			var A = function (){}, 
				_a = 7;
			
			Object.defineProperty(A,                                              // tests.jsx:387
				'a', 
				{
					get: (function (){
						return _a * 2;                                            // tests.jsx:390
					}), 
					set: (function (v){
						_a = v;                                                   // tests.jsx:392
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:387
				'b', 
				{
					get: (function (){
						return 15;
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:387
				'a2', 
				{
					get: (function (){
						return _a * 3;                                            // tests.jsx:394
					}), 
					set: (function (arg){
						return _a = arg;                                          // tests.jsx:396
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:387
				'b2', 
				{
					get: (function (){
						return 25;
					})
				});
			Object.defineProperty(A,                                              // tests.jsx:387
				'__a3', 
				{
					get: (function (){
						return _a;                                                // tests.jsx:398
					})
				});
			return A;
		})();
		
		/* Class "B" declaration */
		function B(){}
		__prototypeExtend(B, 
			A);
		B.prototype.test = function (){                                           // tests.jsx:402
			return A.a2 + A.__a3;
		};
		
		A.a = 5;                                                                  // tests.jsx:407
		log([ A.a, A.b, A.a2, A.b2 ]);                                            // tests.jsx:408
		
		var b = new B();
		
		A.a = 8;                                                                  // tests.jsx:411
		log([ b.test() ]);                                                        // tests.jsx:412
	})(function (args){                                                           // tests.jsx:413
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:414
			got = JSON.stringify(args);                                           // tests.jsx:415
		
		if (expected === undefined){                                              // tests.jsx:416
			if (!missed){                                                         // tests.jsx:417
				console.log('Missing entry:');                                    // tests.jsx:418
				missed = true;                                                    // tests.jsx:419
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:423
				function (m, s){                                                  // tests.jsx:424
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:424
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:426
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:427
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:428
	});
	console.log('[Testing] Test "Classes with static getters/setters" has been passed');
})([
	[ 10, 
		15, 
		15, 
		25 ], 
	[ 32 ]
]);
(function (result){                                                               // tests.jsx:433
	var missed = false;
	
	(function test_classes(log){                                                  // tests.jsx:435
		/* Class "First" declaration */
		var First = (function (){                                                 // tests.jsx:436
			var First = function (dog){                                           // tests.jsx:436
					this.__First_dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';   // tests.jsx:439
					this.__First_horse = 'IGOGO, MOTHERFUCKERS!';                 // tests.jsx:440
					log([ '.', '"First" says "Hi!"' ]);                           // tests.jsx:443
					this.__First_dog = dog + ' (' + cat + ')';                    // tests.jsx:444
					log([ '.', '.', this.__First_dog ]);                          // tests.jsx:445
				}, 
				cat = 'Meow?';                                                    // tests.jsx:437
			
			First.prototype.cow = function (){                                    // tests.jsx:448
				log([ '.', 'Mo-o-o-o from "First".' ]);                           // tests.jsx:449
			};
			return First;
		})();
		
		/* Class "Second" declaration */
		var Second = (function (){                                                // tests.jsx:453
			var Second = function (){                                             // tests.jsx:453
					if (this.constructor === Second)
						throw new Error('Trying to instantiate abstract class Second');
					
					this.horse = 'Horse, tazshemta';                              // tests.jsx:456
					First.apply(this, 
						arguments);
				}, 
				cat = 'Meow!';                                                    // tests.jsx:454
			
			__prototypeExtend(Second, 
				First);
			Second.prototype.whoIsIt = function (){                               // tests.jsx:458
				log([ '.', 'Michael Jackson, for example' ]);                     // tests.jsx:459
				log([ '.', 'Or cat:', cat ]);                                     // tests.jsx:460
				log([ '.', 'Or dog:', Second.__dog ]);                            // tests.jsx:461
				log([ '.', 'Or horse:', this.horse ]);                            // tests.jsx:462
			};
			Second.prototype.eat = function (){                                   // tests.jsx:465
				log([ '.', 'Wow, yammy!' ]);                                      // tests.jsx:466
			};
			Second.prototype.sleep = function (){                                 // tests.jsx:469
				log([ '.', 'Z-z-z-z...' ]);                                       // tests.jsx:470
			};
			Second.__dog = 'WOOF! WOOF! WOOF!';                                   // tests.jsx:455
			return Second;
		})();
		
		/* Class "Third" declaration */
		function Third(){                                                         // tests.jsx:476
			Second.apply(this, 
				arguments);
		}
		__prototypeExtend(Third, 
			Second);
		Third.prototype.eat = function (){                                        // tests.jsx:477
			Second.prototype.eat.apply(this, arguments);                          // tests.jsx:453
			log([ '. .', 'And chew-chew-chew!' ]);                                // tests.jsx:479
		};
		Third.prototype.sleep = function (){                                      // tests.jsx:482
			Second.prototype.sleep.apply(this, arguments);                        // tests.jsx:453
			log([ '. .', 'Now with 20% more snoring!' ]);                         // tests.jsx:484
		};
		Third.prototype.poop = function (){                                       // tests.jsx:487
			log([ '.', 'E-e-e-w.' ]);                                             // tests.jsx:488
		};
		
		/* Class "Fourth" declaration */
		function Fourth(){                                                        // tests.jsx:492
			Third.call(this, 
				'Dogs don\'t say "KRAKOZYABRA"');
			log([ '.', '"Fourth" in da house.' ]);                                // tests.jsx:495
		}
		__prototypeExtend(Fourth, 
			Third);
		Fourth.prototype.poop = function (){                                      // tests.jsx:498
			return log([ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]);
		};
		
		var c;
		
		log([ 'Here come "First"!' ]);                                            // tests.jsx:504
		new First('What do dogs say?');                                           // tests.jsx:505
		log([ 'And now — "Second"!' ]);                                           // tests.jsx:507
		
		try {
			new Second('Nothing here.');                                          // tests.jsx:509
		} catch (e){
			log([ '.', '"Second" is too tired: ' + e.message ]);                  // tests.jsx:511
		} 
		
		log([ 'Next is "Third"!' ]);                                              // tests.jsx:513
		c = new Third('What do dogs say? Last try!');                             // tests.jsx:514
		log([ '"Third" has something to eat!' ]);                                 // tests.jsx:516
		c.eat();                                                                  // tests.jsx:517
		log([ 'Now he wants to sleep!' ]);                                        // tests.jsx:519
		c.sleep();                                                                // tests.jsx:520
		log([                                                                     // tests.jsx:522
			'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
		]);
		c.poop();                                                                 // tests.jsx:523
		log([                                                                     // tests.jsx:525
			'And now "Third" has something to tell us! "Third", who is it?'
		]);
		c.whoIsIt();                                                              // tests.jsx:526
		log([ 'And, finally, "Fourth".' ]);                                       // tests.jsx:528
		c = new Fourth();                                                         // tests.jsx:529
		log([ 'Okay, give us some your regular crap.' ]);                         // tests.jsx:531
		c.poop();                                                                 // tests.jsx:532
	})(function (args){                                                           // tests.jsx:533
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:534
			got = JSON.stringify(args);                                           // tests.jsx:535
		
		if (expected === undefined){                                              // tests.jsx:536
			if (!missed){                                                         // tests.jsx:537
				console.log('Missing entry:');                                    // tests.jsx:538
				missed = true;                                                    // tests.jsx:539
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:543
				function (m, s){                                                  // tests.jsx:544
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:544
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:546
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:547
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:548
	});
	console.log('[Testing] Test "Classes" has been passed');                      // tests.jsx:550
})([
	[ 'Here come "First"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? (Meow?)' ], 
	[ 'And now — "Second"!' ], 
	[
		'.',                                                                      // tests.jsx:551
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
(function (result){                                                               // tests.jsx:553
	var missed = false;
	
	(function test_static_fields_with_initializers(log){                          // tests.jsx:555
		/* Class "A" declaration */
		var A = (function (){                                                     // tests.jsx:556
			var A = function (){                                                  // tests.jsx:556
					log([ b, A.pb ]);                                             // tests.jsx:564
				}, 
				a = 2,                                                            // tests.jsx:557
				b = a + 2;                                                        // tests.jsx:558
			
			A.pa = 2;                                                             // tests.jsx:560
			A.pb = A.pa + 2;                                                      // tests.jsx:561
			return A;
		})();
		
		/* Class "B" declaration */
		function B(){                                                             // tests.jsx:568
			log([ B.b ]);                                                         // tests.jsx:572
		}
		B.a = 1;                                                                  // tests.jsx:569
		B.b = B.a * 2;                                                            // tests.jsx:569
		
		new A();                                                                  // tests.jsx:576
		new B();                                                                  // tests.jsx:577
	})(function (args){                                                           // tests.jsx:578
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:579
			got = JSON.stringify(args);                                           // tests.jsx:580
		
		if (expected === undefined){                                              // tests.jsx:581
			if (!missed){                                                         // tests.jsx:582
				console.log('Missing entry:');                                    // tests.jsx:583
				missed = true;                                                    // tests.jsx:584
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:588
				function (m, s){                                                  // tests.jsx:589
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:589
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:591
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:592
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:593
	});
	console.log('[Testing] Test "Static fields with initializers" has been passed');
})([
	[ 4, 
		4 ], 
	[ 2 ]
]);
(function (result){                                                               // tests.jsx:598
	var missed = false;
	
	(function test_constructors(log){                                             // tests.jsx:600
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:601
			log([ 'A' ]);                                                         // tests.jsx:603
		}
		
		/* Class "B" declaration */
		function B(){                                                             // tests.jsx:607
			A.apply(this, 
				arguments);
			log([ 'B' ]);                                                         // tests.jsx:609
		}
		__prototypeExtend(B, 
			A);
		
		/* Class "C" declaration */
		function C(){                                                             // tests.jsx:613
			B.apply(this, 
				arguments);
		}
		__prototypeExtend(C, 
			B);
		
		/* Class "D" declaration */
		function D(){                                                             // tests.jsx:616
			C.apply(this, 
				arguments);
			log([ 'D' ]);                                                         // tests.jsx:618
		}
		__prototypeExtend(D, 
			C);
		
		/* Class "E" declaration */
		function E(arg){                                                          // tests.jsx:622
			D.apply(this, 
				arguments);
			log([ 'E(' + arg + ')' ]);                                            // tests.jsx:624
		}
		__prototypeExtend(E, 
			D);
		
		/* Class "F" declaration */
		function F(arg){                                                          // tests.jsx:628
			E.call(this, 
				arg);
			log([ 'F(' + arg + ')' ]);                                            // tests.jsx:631
		}
		__prototypeExtend(F, 
			E);
		
		/* Class "G" declaration */
		function G(){                                                             // tests.jsx:635
			F.apply(this, 
				arguments);
		}
		__prototypeExtend(G, 
			F);
		
		{
			var __c = [ A, B, C, D, E, F, G ];
			
			for (var i = 0; i < __c.length; i ++){                                // tests.jsx:637
				var c = __c[i];
				
				log([ c.name + ':' ]);                                            // tests.jsx:638
				new c(i);                                                         // tests.jsx:639
			}
			
			__c = undefined;
		}
	})(function (args){                                                           // tests.jsx:641
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:642
			got = JSON.stringify(args);                                           // tests.jsx:643
		
		if (expected === undefined){                                              // tests.jsx:644
			if (!missed){                                                         // tests.jsx:645
				console.log('Missing entry:');                                    // tests.jsx:646
				missed = true;                                                    // tests.jsx:647
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:651
				function (m, s){                                                  // tests.jsx:652
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:652
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:654
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:655
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:656
	});
	console.log('[Testing] Test "Constructors" has been passed');                 // tests.jsx:658
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
(function (result){                                                               // tests.jsx:661
	var missed = false;
	
	(function test_hardcore_test_for_classes(log){                                // tests.jsx:663
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:664
			this.__parent = 'WOOHOO!';                                            // tests.jsx:665
		}
		
		/* Class "B" declaration */
		var B = (function (){                                                     // tests.jsx:668
			var B = function (variable){                                          // tests.jsx:668
					this.__B_testObj = {
						find: (function (){                                       // tests.jsx:746
							return [ { variable: 'deep!' } ];
						})
					};
					A.apply(this, 
						arguments);
					this.__B_variable = variable;                                 // tests.jsx:675
					this.qwerty = 'default';                                      // tests.jsx:676
				}, 
				privateStatic = 'done';                                           // tests.jsx:669
			
			__prototypeExtend(B, 
				A);
			B.prototype.test = function (a, b){                                   // tests.jsx:679
				var __;
				
				a[a instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:680
				b[b instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:681
				log([                                                             // tests.jsx:682
					this.__B_variable,                                            // tests.jsx:682
					a[a instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:682
					b[b instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:682
					(__ = new A(), __[__ instanceof A ? '__parent' : 'parent'])
				]);
			};
			B.prototype.other = function (a, b){                                  // tests.jsx:685
				var __;
				
				function getA(){                                                  // tests.jsx:686
					log([ '[getA]' ]);                                            // tests.jsx:687
					return {
						get: (function (){                                        // tests.jsx:689
							log([ '[getA][get]' ]);                               // tests.jsx:690
							return a;                                             // tests.jsx:691
						})
					};
				}
				
				function getB(){                                                  // tests.jsx:696
					log([ '[getB]' ]);                                            // tests.jsx:697
					return {
						get: (function (){                                        // tests.jsx:699
							log([ '[getB][get]' ]);                               // tests.jsx:700
							return b;                                             // tests.jsx:701
						})
					};
				}
				
				log([                                                             // tests.jsx:706
					(__ = getA().get(),                                           // tests.jsx:706
						__[__ instanceof B ? '__B_variable' : 'variable'] += '-changed'), 
					(__ = getB().get(),                                           // tests.jsx:706
						__[__ instanceof B ? '__B_variable' : 'variable'] += '-changed')
				]);
				log([ 'ok' ]);                                                    // tests.jsx:707
				log([                                                             // tests.jsx:708
					(__ = getA().get(),                                           // tests.jsx:708
						__[__ instanceof B ? '__B_variable' : 'variable']), 
					(__ = getB().get(),                                           // tests.jsx:708
						__[__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.final = function (a, b){                                  // tests.jsx:711
				function getA(){                                                  // tests.jsx:712
					log([ '[getA]' ]);                                            // tests.jsx:713
					return a;                                                     // tests.jsx:714
				}
				
				function getB(){                                                  // tests.jsx:717
					log([ '[getB]' ]);                                            // tests.jsx:718
					return b;                                                     // tests.jsx:719
				}
				
				log([ getA().qwerty += '-changed', getB().qwerty += '-changed' ]);
				log([ a.qwerty, b.qwerty ]);                                      // tests.jsx:723
			};
			B.prototype.method = function (a, b){                                 // tests.jsx:726
				var __;
				
				function getA(){                                                  // tests.jsx:727
					log([ '[getA]' ]);                                            // tests.jsx:728
					return a;                                                     // tests.jsx:729
				}
				
				function getB(){                                                  // tests.jsx:732
					log([ '[getB]' ]);                                            // tests.jsx:733
					return b;                                                     // tests.jsx:734
				}
				
				log([                                                             // tests.jsx:737
					(__ = getA(),                                                 // tests.jsx:737
						__[__ instanceof B ? '__B_testMethod' : 'testMethod']).call(__, 
						1, 
						2), 
					(__ = getB(),                                                 // tests.jsx:737
						__[__ instanceof B ? '__B_testMethod' : 'testMethod']).call(__, 
						3)
				]);
			};
			B.prototype.__B_testMethod = function (){                             // tests.jsx:740
				log([ arguments ]);                                               // tests.jsx:741
				return this instanceof B;                                         // tests.jsx:742
			};
			B.prototype.awful = function (){                                      // tests.jsx:755
				var __;
				
				log([                                                             // tests.jsx:756
					(__ = this.__B_testObj.find()[0],                             // tests.jsx:756
						__[__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.staticTest = function (obj){                              // tests.jsx:759
				log([ obj.privateStatic, privateStatic ]);                        // tests.jsx:760
			};
			return B;
		})();
		
		new B('first').method(new B('second'),                                    // tests.jsx:764
			{
				testMethod: (function (arg){                                      // tests.jsx:764
					return this.result + arg;                                     // tests.jsx:764
				}), 
				result: 'success'
			});
		new B('first').test(new B('second'), { variable: 'success' });            // tests.jsx:765
		new B('first').other(new B('second'), { variable: 'success' });           // tests.jsx:766
		new B('first').final(new B('second'), { qwerty: 'qwerty' });              // tests.jsx:767
		new B().awful();                                                          // tests.jsx:768
		new B('first').staticTest({ privateStatic: 'arg' });                      // tests.jsx:769
	})(function (args){                                                           // tests.jsx:770
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:771
			got = JSON.stringify(args);                                           // tests.jsx:772
		
		if (expected === undefined){                                              // tests.jsx:773
			if (!missed){                                                         // tests.jsx:774
				console.log('Missing entry:');                                    // tests.jsx:775
				missed = true;                                                    // tests.jsx:776
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:780
				function (m, s){                                                  // tests.jsx:781
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:781
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:783
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:784
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:785
	});
	console.log('[Testing] Test "Hardcore test for classes" has been passed');    // tests.jsx:787
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
(function (result){                                                               // tests.jsx:790
	var missed = false;
	
	(function test_access_through___that(log){                                    // tests.jsx:792
		/* Class "A" declaration */
		function A(){                                                             // tests.jsx:793
			var __that = this;
			
			this.__A_a = 'ok-a';                                                  // tests.jsx:794
			this.__A_b = 'ok-b';                                                  // tests.jsx:794
			Function.prototype.call.call((function (arg){                         // tests.jsx:796
				log([ '[A]', __that.__A_a, this['b'] ]);                          // tests.jsx:797
			}).bind({ b: 'ok-ok-ok-b' }),                                         // tests.jsx:798
			10);
			log([ '[B]', this.__A_a, this.__A_b ]);                               // tests.jsx:799
		}
		
		new A();                                                                  // tests.jsx:803
	})(function (args){                                                           // tests.jsx:804
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:805
			got = JSON.stringify(args);                                           // tests.jsx:806
		
		if (expected === undefined){                                              // tests.jsx:807
			if (!missed){                                                         // tests.jsx:808
				console.log('Missing entry:');                                    // tests.jsx:809
				missed = true;                                                    // tests.jsx:810
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:814
				function (m, s){                                                  // tests.jsx:815
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:815
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:817
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:818
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:819
	});
	console.log('[Testing] Test "Access through __that" has been passed');        // tests.jsx:821
})([
	[ '[A]', 'ok-a', 'ok-ok-ok-b' ], 
	[ '[B]', 'ok-a', 'ok-b' ]
]);
(function (result){                                                               // tests.jsx:824
	var missed = false;
	
	(function test_for_parser_and_generator(log){                                 // tests.jsx:826
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
		
		var a = function (){                                                      // tests.jsx:830
				log([                                                             // tests.jsx:831
					'5',                                                          // tests.jsx:831
					'58', 
					'test58', 
					'begin insert middle test end', 
					'5-%0-8', 
					'5-5-8'
				]);
			}, 
			b = function (variable5, variable8){                                  // tests.jsx:840
				if (variable5 === undefined)                                      // tests.jsx:840
					variable5 = 1;                                                // tests.jsx:840
			
				if (variable8 === undefined)                                      // tests.jsx:840
					variable8 = 'K';                                              // tests.jsx:840
			
				function q(){}
				
				log([                                                             // tests.jsx:843
					'' + variable5,                                               // tests.jsx:843
					'' + variable5 + variable8,                                   // tests.jsx:845
					'test' + variable5 + variable8
				]);
				
				function a(){                                                     // tests.jsx:849
					console.warn('Not implemented at 849 line of tests.jsx');     // tests.jsx:849
				}
				
				function b(){}
				
				if (a)                                                            // tests.jsx:853
					function s(){}
			};
		
		log([ 'hi' ]);                                                            // tests.jsx:857
		
		while (0);
		
		log([                                                                     // tests.jsx:861
			0x86,                                                                 // tests.jsx:861
			'test',                                                               // tests.jsx:864
			'\n\r\t',                                                             // tests.jsx:865
			'multiline\
	string',                                                                      // tests.jsx:867
			'qqq\'qqq',                                                           // tests.jsx:868
			'\u0061',                                                             // tests.jsx:869
			'\%\~'
		]);
		log([                                                                     // tests.jsx:873
			'begin ' + console + ' end',                                          // tests.jsx:873
			'' + console,                                                         // tests.jsx:875
			'be\ngin \'' + console + ' middle ' + JSON + ' end',                  // tests.jsx:877
			'', 
			'attaching test', 
			'here goes hardcore test', 
			'really hardcore te\'st', 
			'really hardcore te"st'
		]);
		a();                                                                      // tests.jsx:887
	})(function (args){                                                           // tests.jsx:888
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:889
			got = JSON.stringify(args);                                           // tests.jsx:890
		
		if (expected === undefined){                                              // tests.jsx:891
			if (!missed){                                                         // tests.jsx:892
				console.log('Missing entry:');                                    // tests.jsx:893
				missed = true;                                                    // tests.jsx:894
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:898
				function (m, s){                                                  // tests.jsx:899
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:899
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:901
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:902
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:903
	});
	console.log('[Testing] Test "For parser and generator" has been passed');     // tests.jsx:905
})([
	[ 'hi' ], 
	[
		134, 
		'test',                                                                   // tests.jsx:906
		'\n\r\t',                                                                 // tests.jsx:906
		'multiline\tstring',                                                      // tests.jsx:906
		'qqq\'qqq',                                                               // tests.jsx:906
		'a',                                                                      // tests.jsx:906
		'%~'
	], 
	[
		'begin [object Object] end',                                              // tests.jsx:906
		'[object Object]',                                                        // tests.jsx:906
		'be\ngin \'[object Object] middle [object JSON] end',                     // tests.jsx:906
		'',                                                                       // tests.jsx:906
		'attaching test',                                                         // tests.jsx:906
		'here goes hardcore test',                                                // tests.jsx:906
		'really hardcore te\'st',                                                 // tests.jsx:906
		'really hardcore te"st'
	], 
	[
		'5',                                                                      // tests.jsx:906
		'58',                                                                     // tests.jsx:906
		'test58',                                                                 // tests.jsx:906
		'begin insert middle test end',                                           // tests.jsx:906
		'5-%0-8',                                                                 // tests.jsx:906
		'5-5-8'
	]
]);
(function (result){                                                               // tests.jsx:908
	var missed = false;
	
	(function test_multiline(log){                                                // tests.jsx:910
		var first = " first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			second = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			third = "first line\nsecond line\n\ttabbed line\n\tanother one\n\tcheck one\nlast line", 
			fourth = "first line\n\t   second line\n\t\t   tabbed line\n\t\t   another one\n\t   last line", 
			fifth = "\t\t first line\n\t\tsecond line\n\t\t\ttabbed line\n\t\t\tanother one\nlast line", 
			symbols = "'\"`";                                                     // tests.jsx:940
		
		log([ first ]);                                                           // tests.jsx:942
		log([ second ]);                                                          // tests.jsx:943
		log([ third ]);                                                           // tests.jsx:944
		log([ fourth ]);                                                          // tests.jsx:945
		log([ fifth ]);                                                           // tests.jsx:946
		log([ symbols ]);                                                         // tests.jsx:947
	})(function (args){                                                           // tests.jsx:948
		var expected = JSON.stringify(result.shift()),                            // tests.jsx:949
			got = JSON.stringify(args);                                           // tests.jsx:950
		
		if (expected === undefined){                                              // tests.jsx:951
			if (!missed){                                                         // tests.jsx:952
				console.log('Missing entry:');                                    // tests.jsx:953
				missed = true;                                                    // tests.jsx:954
			}
			
			var temp = [];
			
			console.log('\t' + got.replace(/"((?:\\"|[^"])+)"/g,                  // tests.jsx:958
				function (m, s){                                                  // tests.jsx:959
					return '\'' + temp.push(s) + '\'';                            // tests.jsx:959
				}).replace(/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace(/'(\d+)'/g, 
				function (m, s){                                                  // tests.jsx:961
					return '\'' + temp[+ s - 1].replace(/\\"/g, '"').replace(/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                              // tests.jsx:962
			throw new Error('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:963
	});
	console.log('[Testing] Test "Multiline" has been passed');                    // tests.jsx:965
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
