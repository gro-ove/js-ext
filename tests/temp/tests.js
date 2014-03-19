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
	
	(function (log){                                                               // tests.jsx:9
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
	
	(function (log){                                                               // tests.jsx:42
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
	
	(function (log){                                                               // tests.jsx:76
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
	
	(function (log){                                                               // tests.jsx:146
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
	
	(function (log){                                                               // tests.jsx:183
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
	
	(function (log){                                                               // tests.jsx:232
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
	
	(function (log){                                                               // tests.jsx:262
		/* Class "First" declaration */
		var First = (function (){                                                  // tests.jsx:263
			var First = function (dog){                                            // tests.jsx:263
					this.__First_dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';    // tests.jsx:266
					this.__First_horse = 'IGOGO, MOTHERFUCKERS!';                  // tests.jsx:267
					log ([ '.', '"First" says "Hi!"' ]);                           // tests.jsx:270
					this.__First_dog = dog + ' (' + cat + ')';                     // tests.jsx:271
					log ([ '.', '.', this.__First_dog ]);                          // tests.jsx:272
				}, 
				cat = 'Meow?';                                                     // tests.jsx:264
			
			First.prototype.cow = function (){                                     // tests.jsx:275
				log ([ '.', 'Mo-o-o-o from "First".' ]);                           // tests.jsx:276
			};
			return First;
		})();
		
		/* Class "Second" declaration */
		var Second = (function (){                                                 // tests.jsx:280
			var Second = function (){                                              // tests.jsx:280
					if (this.constructor === Second)
						throw new Error ('Trying to instantiate abstract class Second');
					
					this.horse = 'Horse, tazshemta';                               // tests.jsx:283
					First.apply (this, 
						arguments);
				}, 
				cat = 'Meow!';                                                     // tests.jsx:281
			
			__prototypeExtend (Second, 
				First);
			Second.prototype.whoIsIt = function (){                                // tests.jsx:285
				log ([ '.', 'Michael Jackson, for example' ]);                     // tests.jsx:286
				log ([ '.', 'Or cat:', cat ]);                                     // tests.jsx:287
				log ([ '.', 'Or dog:', Second.__dog ]);                            // tests.jsx:288
				log ([ '.', 'Or horse:', this.horse ]);                            // tests.jsx:289
			};
			Second.prototype.eat = function (){                                    // tests.jsx:292
				log ([ '.', 'Wow, yammy!' ]);                                      // tests.jsx:293
			};
			Second.prototype.sleep = function (){                                  // tests.jsx:296
				log ([ '.', 'Z-z-z-z...' ]);                                       // tests.jsx:297
			};
			Second.__dog = 'WOOF! WOOF! WOOF!';                                    // tests.jsx:282
			return Second;
		})();
		
		/* Class "Third" declaration */
		function Third (){                                                         // tests.jsx:303
			Second.apply (this, 
				arguments);
		}
		__prototypeExtend (Third, 
			Second);
		Third.prototype.eat = function (){                                         // tests.jsx:304
			Second.prototype.eat.apply (this, arguments);                          // tests.jsx:280
			log ([ '. .', 'And chew-chew-chew!' ]);                                // tests.jsx:306
		};
		Third.prototype.sleep = function (){                                       // tests.jsx:309
			Second.prototype.sleep.apply (this, arguments);                        // tests.jsx:280
			log ([ '. .', 'Now with 20% more snoring!' ]);                         // tests.jsx:311
		};
		Third.prototype.poop = function (){                                        // tests.jsx:314
			log ([ '.', 'E-e-e-w.' ]);                                             // tests.jsx:315
		};
		
		/* Class "Fourth" declaration */
		function Fourth (){                                                        // tests.jsx:319
			Third.call (this, 
				'Dogs don\'t say "KRAKOZYABRA"');
			log ([ '.', '"Fourth" in da house.' ]);                                // tests.jsx:322
		}
		__prototypeExtend (Fourth, 
			Third);
		Fourth.prototype.poop = function (){                                       // tests.jsx:325
			return log ([ '.', 'I won\'t do it, I\'m hungry and it is disgusting!' ]);
		};
		
		var c;
		
		log ([ 'Here come "First"!' ]);                                            // tests.jsx:331
		new First ('What do dogs say?');                                           // tests.jsx:332
		log ([ 'And now — "Second"!' ]);                                           // tests.jsx:334
		
		try {
			new Second ('Nothing here.');                                          // tests.jsx:336
		} catch (e){
			log ([ '.', '"Second" is too tired: ' + e.message ]);                  // tests.jsx:338
		} 
		
		log ([ 'Next is "Third"!' ]);                                              // tests.jsx:340
		c = new Third ('What do dogs say? Last try!');                             // tests.jsx:341
		log ([ '"Third" has something to eat!' ]);                                 // tests.jsx:343
		c.eat ();                                                                  // tests.jsx:344
		log ([ 'Now he wants to sleep!' ]);                                        // tests.jsx:346
		c.sleep ();                                                                // tests.jsx:347
		log ([                                                                     // tests.jsx:349
			'Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!'
		]);
		c.poop ();                                                                 // tests.jsx:350
		log ([                                                                     // tests.jsx:352
			'And now "Third" has something to tell us! "Third", who is it?'
		]);
		c.whoIsIt ();                                                              // tests.jsx:353
		log ([ 'And, finally, "Fourth".' ]);                                       // tests.jsx:355
		c = new Fourth ();                                                         // tests.jsx:356
		log ([ 'Okay, give us some your regular crap.' ]);                         // tests.jsx:358
		c.poop ();                                                                 // tests.jsx:359
	})(function (args){                                                            // tests.jsx:360
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:361
			got = JSON.stringify (args);                                           // tests.jsx:362
		
		if (expected === undefined){                                               // tests.jsx:363
			if (!missed){                                                          // tests.jsx:364
				console.log ('Missing entry:');                                    // tests.jsx:365
				missed = true;                                                     // tests.jsx:366
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:370
				function (m, s){                                                   // tests.jsx:371
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:371
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:373
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:374
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:375
	});
	console.log ('[Testing] Test "Classes" has been passed');                      // tests.jsx:377
})([
	[ 'Here come "First"!' ], 
	[ '.', '"First" says "Hi!"' ], 
	[ '.', '.', 'What do dogs say? (Meow?)' ], 
	[ 'And now — "Second"!' ], 
	[
		'.',                                                                       // tests.jsx:378
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
(function (result){                                                                // tests.jsx:380
	var missed = false;
	
	(function (log){                                                               // tests.jsx:382
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:383
			log ([ 'A' ]);                                                         // tests.jsx:385
		}
		
		/* Class "B" declaration */
		function B (){                                                             // tests.jsx:389
			A.apply (this, 
				arguments);
			log ([ 'B' ]);                                                         // tests.jsx:391
		}
		__prototypeExtend (B, 
			A);
		
		/* Class "C" declaration */
		function C (){                                                             // tests.jsx:395
			B.apply (this, 
				arguments);
		}
		__prototypeExtend (C, 
			B);
		
		/* Class "D" declaration */
		function D (){                                                             // tests.jsx:398
			C.apply (this, 
				arguments);
			log ([ 'D' ]);                                                         // tests.jsx:400
		}
		__prototypeExtend (D, 
			C);
		
		/* Class "E" declaration */
		function E (arg){                                                          // tests.jsx:404
			D.apply (this, 
				arguments);
			log ([ 'E(' + arg + ')' ]);                                            // tests.jsx:406
		}
		__prototypeExtend (E, 
			D);
		
		/* Class "F" declaration */
		function F (arg){                                                          // tests.jsx:410
			E.call (this, 
				arg);
			log ([ 'F(' + arg + ')' ]);                                            // tests.jsx:413
		}
		__prototypeExtend (F, 
			E);
		
		/* Class "G" declaration */
		function G (){                                                             // tests.jsx:417
			F.apply (this, 
				arguments);
		}
		__prototypeExtend (G, 
			F);
		
		{
			var __c = [ A, B, C, D, E, F, G ];
			
			for (var i = 0; i < __c.length; i ++){                                 // tests.jsx:419
				var c = __c [i];
				
				log ([ c.name + ':' ]);                                            // tests.jsx:420
				new c (i);                                                         // tests.jsx:421
			}
			
			__c = undefined;
		}
	})(function (args){                                                            // tests.jsx:423
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:424
			got = JSON.stringify (args);                                           // tests.jsx:425
		
		if (expected === undefined){                                               // tests.jsx:426
			if (!missed){                                                          // tests.jsx:427
				console.log ('Missing entry:');                                    // tests.jsx:428
				missed = true;                                                     // tests.jsx:429
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:433
				function (m, s){                                                   // tests.jsx:434
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:434
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:436
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:437
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:438
	});
	console.log ('[Testing] Test "Constructors" has been passed');                 // tests.jsx:440
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
(function (result){                                                                // tests.jsx:443
	var missed = false;
	
	(function (log){                                                               // tests.jsx:445
		/* Class "A" declaration */
		function A (){                                                             // tests.jsx:446
			this.__parent = 'WOOHOO!';                                             // tests.jsx:447
		}
		
		/* Class "B" declaration */
		var B = (function (){                                                      // tests.jsx:450
			var B = function (variable){                                           // tests.jsx:450
					this.__B_testObj = {
						find: (function (){                                        // tests.jsx:528
							return [ { variable: 'deep!' } ];
						})
					};
					A.apply (this, 
						arguments);
					this.__B_variable = variable;                                  // tests.jsx:457
					this.qwerty = 'default';                                       // tests.jsx:458
				}, 
				privateStatic = 'done';                                            // tests.jsx:451
			
			__prototypeExtend (B, 
				A);
			B.prototype.test = function (a, b){                                    // tests.jsx:461
				var __;
				
				a [a instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:462
				b [b instanceof B ? '__B_variable' : 'variable'] += '-changed';    // tests.jsx:463
				log ([                                                             // tests.jsx:464
					this.__B_variable,                                             // tests.jsx:464
					a [a instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:464
					b [b instanceof B ? '__B_variable' : 'variable'],              // tests.jsx:464
					(__ = new A (), __ [__ instanceof A ? '__parent' : 'parent'])
				]);
			};
			B.prototype.other = function (a, b){                                   // tests.jsx:467
				var __;
				
				function getA (){                                                  // tests.jsx:468
					log ([ '[getA]' ]);                                            // tests.jsx:469
					return {
						get: (function (){                                         // tests.jsx:471
							log ([ '[getA][get]' ]);                               // tests.jsx:472
							return a;                                              // tests.jsx:473
						})
					};
				}
				
				function getB (){                                                  // tests.jsx:478
					log ([ '[getB]' ]);                                            // tests.jsx:479
					return {
						get: (function (){                                         // tests.jsx:481
							log ([ '[getB][get]' ]);                               // tests.jsx:482
							return b;                                              // tests.jsx:483
						})
					};
				}
				
				log ([                                                             // tests.jsx:488
					(__ = getA ().get (),                                          // tests.jsx:488
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed'), 
					(__ = getB ().get (),                                          // tests.jsx:488
						__ [__ instanceof B ? '__B_variable' : 'variable'] += '-changed')
				]);
				log ([ 'ok' ]);                                                    // tests.jsx:489
				log ([                                                             // tests.jsx:490
					(__ = getA ().get (),                                          // tests.jsx:490
						__ [__ instanceof B ? '__B_variable' : 'variable']), 
					(__ = getB ().get (),                                          // tests.jsx:490
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.final = function (a, b){                                   // tests.jsx:493
				function getA (){                                                  // tests.jsx:494
					log ([ '[getA]' ]);                                            // tests.jsx:495
					return a;                                                      // tests.jsx:496
				}
				
				function getB (){                                                  // tests.jsx:499
					log ([ '[getB]' ]);                                            // tests.jsx:500
					return b;                                                      // tests.jsx:501
				}
				
				log ([ getA ().qwerty += '-changed', getB ().qwerty += '-changed' ]);
				log ([ a.qwerty, b.qwerty ]);                                      // tests.jsx:505
			};
			B.prototype.method = function (a, b){                                  // tests.jsx:508
				var __;
				
				function getA (){                                                  // tests.jsx:509
					log ([ '[getA]' ]);                                            // tests.jsx:510
					return a;                                                      // tests.jsx:511
				}
				
				function getB (){                                                  // tests.jsx:514
					log ([ '[getB]' ]);                                            // tests.jsx:515
					return b;                                                      // tests.jsx:516
				}
				
				log ([                                                             // tests.jsx:519
					(__ = getA (),                                                 // tests.jsx:519
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						1, 
						2), 
					(__ = getB (),                                                 // tests.jsx:519
						__ [__ instanceof B ? '__B_testMethod' : 'testMethod']).call (__, 
						3)
				]);
			};
			B.prototype.__B_testMethod = function (){                              // tests.jsx:522
				log ([ arguments ]);                                               // tests.jsx:523
				return this instanceof B;                                          // tests.jsx:524
			};
			B.prototype.awful = function (){                                       // tests.jsx:537
				var __;
				
				log ([                                                             // tests.jsx:538
					(__ = this.__B_testObj.find ()[0],                             // tests.jsx:538
						__ [__ instanceof B ? '__B_variable' : 'variable'])
				]);
			};
			B.prototype.staticTest = function (obj){                               // tests.jsx:541
				log ([ obj.privateStatic, privateStatic ]);                        // tests.jsx:542
			};
			return B;
		})();
		
		new B ('first').method (new B ('second'),                                  // tests.jsx:546
			{
				testMethod: (function (arg){                                       // tests.jsx:546
					return this.result + arg;                                      // tests.jsx:546
				}), 
				result: 'success'
			});
		new B ('first').test (new B ('second'), { variable: 'success' });          // tests.jsx:547
		new B ('first').other (new B ('second'), { variable: 'success' });         // tests.jsx:548
		new B ('first').final (new B ('second'), { qwerty: 'qwerty' });            // tests.jsx:549
		new B ().awful ();                                                         // tests.jsx:550
		new B ('first').staticTest ({ privateStatic: 'arg' });                     // tests.jsx:551
	})(function (args){                                                            // tests.jsx:552
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:553
			got = JSON.stringify (args);                                           // tests.jsx:554
		
		if (expected === undefined){                                               // tests.jsx:555
			if (!missed){                                                          // tests.jsx:556
				console.log ('Missing entry:');                                    // tests.jsx:557
				missed = true;                                                     // tests.jsx:558
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:562
				function (m, s){                                                   // tests.jsx:563
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:563
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:565
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:566
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:567
	});
	console.log ('[Testing] Test "Hardcore test for classes" has been passed');    // tests.jsx:569
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
(function (result){                                                                // tests.jsx:572
	var missed = false;
	
	(function (log){                                                               // tests.jsx:574
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
		
		var a = function (){                                                       // tests.jsx:578
				log ([                                                             // tests.jsx:579
					'5',                                                           // tests.jsx:579
					'58', 
					'test58', 
					'begin insert middle test end', 
					'5-%0-8', 
					'5-5-8'
				]);
			}, 
			b = function (variable5, variable8){                                   // tests.jsx:588
				if (variable5 === undefined)                                       // tests.jsx:588
					variable5 = 1;                                                 // tests.jsx:588
			
				if (variable8 === undefined)                                       // tests.jsx:588
					variable8 = 'K';                                               // tests.jsx:588
			
				function q (){}
				
				log ([                                                             // tests.jsx:591
					'' + variable5,                                                // tests.jsx:591
					'' + variable5 + variable8,                                    // tests.jsx:593
					'test' + variable5 + variable8
				]);
				
				function a (){                                                     // tests.jsx:597
					console.warn ('Not implemented at 597 line of tests.jsx');     // tests.jsx:597
				}
				
				function b (){}
				
				if (a)                                                             // tests.jsx:601
					function s (){}
			};
		
		log ([ 'hi' ]);                                                            // tests.jsx:605
		
		while (0);
		
		log ([                                                                     // tests.jsx:609
			0x86,                                                                  // tests.jsx:609
			'test',                                                                // tests.jsx:612
			'\n\r\t',                                                              // tests.jsx:613
			'multiline\
	string',                                                                       // tests.jsx:614
			'qqq\'qqq',                                                            // tests.jsx:615
			'\u0061',                                                              // tests.jsx:616
			'\%\~'
		]);
		log ([                                                                     // tests.jsx:620
			'begin ' + console + ' end',                                           // tests.jsx:620
			'' + console,                                                          // tests.jsx:622
			'be\ngin \'' + console + ' middle ' + JSON + ' end',                   // tests.jsx:624
			'', 
			'attaching test', 
			'here goes hardcore test', 
			'really hardcore te\'st', 
			'really hardcore te"st'
		]);
		a ();                                                                      // tests.jsx:634
	})(function (args){                                                            // tests.jsx:635
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:636
			got = JSON.stringify (args);                                           // tests.jsx:637
		
		if (expected === undefined){                                               // tests.jsx:638
			if (!missed){                                                          // tests.jsx:639
				console.log ('Missing entry:');                                    // tests.jsx:640
				missed = true;                                                     // tests.jsx:641
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:645
				function (m, s){                                                   // tests.jsx:646
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:646
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:648
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:649
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:650
	});
	console.log ('[Testing] Test "For parser and generator" has been passed');     // tests.jsx:652
})([
	[ 'hi' ], 
	[
		134, 
		'test',                                                                    // tests.jsx:653
		'\n\r\t',                                                                  // tests.jsx:653
		'multiline\tstring',                                                       // tests.jsx:653
		'qqq\'qqq',                                                                // tests.jsx:653
		'a',                                                                       // tests.jsx:653
		'%~'
	], 
	[
		'begin [object Object] end',                                               // tests.jsx:653
		'[object Object]',                                                         // tests.jsx:653
		'be\ngin \'[object Object] middle [object JSON] end',                      // tests.jsx:653
		'',                                                                        // tests.jsx:653
		'attaching test',                                                          // tests.jsx:653
		'here goes hardcore test',                                                 // tests.jsx:653
		'really hardcore te\'st',                                                  // tests.jsx:653
		'really hardcore te"st'
	], 
	[
		'5',                                                                       // tests.jsx:653
		'58',                                                                      // tests.jsx:653
		'test58',                                                                  // tests.jsx:653
		'begin insert middle test end',                                            // tests.jsx:653
		'5-%0-8',                                                                  // tests.jsx:653
		'5-5-8'
	]
]);
(function (result){                                                                // tests.jsx:655
	var missed = false;
	
	(function (log){                                                               // tests.jsx:657
		var test = "first line\nsecond line\n\ttabbed line\n\tanother one\nlast line", 
			withSpaces = "first line\nsecond line\n    tabbed line\n    another one\n\tcheck one\nlast line", 
			disabled = "first line\n\t\t\tsecond line\n\t\t\t\ttabbed line\n\t\t\t\tanother one\n\t\t\tlast line", 
			symbols = "'\"`";                                                      // tests.jsx:663
		
		log ([ test + '\n' ]);                                                     // tests.jsx:665
		log ([ withSpaces + '\n' ]);                                               // tests.jsx:666
		log ([ disabled + '\n' ]);                                                 // tests.jsx:667
		log ([ symbols ]);                                                         // tests.jsx:668
	})(function (args){                                                            // tests.jsx:669
		var expected = JSON.stringify (result.shift ()),                           // tests.jsx:670
			got = JSON.stringify (args);                                           // tests.jsx:671
		
		if (expected === undefined){                                               // tests.jsx:672
			if (!missed){                                                          // tests.jsx:673
				console.log ('Missing entry:');                                    // tests.jsx:674
				missed = true;                                                     // tests.jsx:675
			}
			
			var temp = [];
			
			console.log ('\t' + got.replace (/"((?:\\"|[^"])+)"/g,                 // tests.jsx:679
				function (m, s){                                                   // tests.jsx:680
					return '\'' + temp.push (s) + '\'';                            // tests.jsx:680
				}).replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2').replace (/'(\d+)'/g, 
				function (m, s){                                                   // tests.jsx:682
					return '\'' + temp [+ s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\'';
				}));
		} else if (expected !== got)                                               // tests.jsx:683
			throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);   // tests.jsx:684
	});
	console.log ('[Testing] Test "Multiline" has been passed');                    // tests.jsx:686
})([
	[
		'first line\nsecond line\n\ttabbed line\n\tanother one\nlast line\n'
	], 
	[
		'first line\nsecond line\n    tabbed line\n    another one\n\tcheck one\nlast line\n'
	], 
	[
		'first line\n\t\t\tsecond line\n\t\t\t\ttabbed line\n\t\t\t\tanother one\n\t\t\tlast line\n'
	], 
	[ '\'"`' ]
]);
