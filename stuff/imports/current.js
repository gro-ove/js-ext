function __ca (from, to, result){                       // current.jsx:50
	if (typeof from === 'string')                       // ...
		from = from.charCodeAt (0);                     // ...
	if (typeof to === 'string')                         // ...
		to = to.charCodeAt (0);                         // ...
	result = new Array (Math.abs (to - from) + 1);      // ...
	if (from < to)                                      // ...
		for (var i = 0; i < result.length; i ++)        // ...
			result[i] = i + from;                       // ...
	else
		for (var i = result.length - 1; i >= 0; i --)   // ...
			result[i] = from - i;                       // ...
	return result;                                      // ...
}
function __pe (c, p, t){                                // undefined:85
	t = function (){};                                  // ...
	t.prototype = p.prototype;                          // ...
	c.prototype = new t ();                             // ...
	c.prototype.constructor = c;                        // ...
}
function __bo (obj, name){                              // ...
	if (!obj.hasOwnProperty ('__bt'))                   // ...
		obj.__bt = {};                                  // ...
	if (!obj.__bt.hasOwnProperty (name))                // ...
		obj.__bt[name] = obj[name].bind (obj);          // ...
	return obj.__bt[name];                              // ...
}
var temp = function (){                                 // current.jsx:4
	a = 1;                                              // current.jsx:2
	b = 2;                                              // current.jsx:3
};
var temp = function (){                                 // current.jsx:9
		a = 1;                                          // current.jsx:7
		b = 2;                                          // current.jsx:8
	}, 
	other = function (){                                // current.jsx:12
		a = 1;                                          // current.jsx:10
		b = 2;                                          // current.jsx:11
	};
[
	function (){                                        // current.jsx:18
		a = 1;                                          // current.jsx:16
		b = 2;                                          // current.jsx:17
	}
];
[
	1,                                                  // current.jsx:21
	2,                                                  // ...
	3,                                                  // ...
	{
		long_long_long_long_long_ke_e_e_e_e_e_ey: GLOBAL.long_long_long_long_long_ke_e_e_e_e_e_ey
	}
];
console.log ('10',                                      // current.jsx:23
	20,                                                 // ...
	[
		1,                                              // current.jsx:24
		2,                                              // current.jsx:25
		3,                                              // current.jsx:26
		{
			'long-long-long-long-long ke-e-e-e-e-e-ey': 'long-long-long-long-long va-a-a-a-a-alue'
		}
	], 
	'20');
function hi (){                                         // current.jsx:46
	return console.log (187,                            // current.jsx:35
		function (arg){                                 // current.jsx:37
			return 15;                                  // current.jsx:36
		}, 
		function (arg){                                 // current.jsx:38
			return 18;                                  // current.jsx:37
		}, 
		{
			a: 20,                                      // current.jsx:39
			b: 25,                                      // current.jsx:40
			c: [
				function (arg){                         // current.jsx:43
					return 14;                          // current.jsx:42
				}, 
				function (arg){                         // current.jsx:44
					return 'hi';                        // current.jsx:43
				}
			]
		});
}
hi ();
console.log (__ca (1, 20));
console.log (__ca (1, 21));
console.log ('HELLO THERE!');
console.log (function (){                               // current.jsx:57
	console.log ('hi');                                 // ...
	return ':)';                                        // ...
}());
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:58
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:59
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
]);
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:60
	'long-long-long-long-long a-a-a-a-a-argument',      // ...
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:61
	'long-long-long-long-long a-a-a-a-a-argument',      // ...
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
]);
var A = function (){                                    // undefined:85
		var A = function (){};                          // current.jsx:85
		A.prototype.__method = function (a, b){         // current.jsx:67
			console.log (a, b);                         // current.jsx:65
			return a + b;                               // current.jsx:66
		};
		return A;                                       // current.jsx:63
	}(), 
	B = function (){                                    // undefined:85
		var B = function (){                            // current.jsx:85
			A.call (this);                              // ...
		};
		__pe (B, A);                                    // undefined:85
		B.prototype.__method = function (a, b){         // current.jsx:74
			console.log ('method');                     // current.jsx:72
			A.prototype.__method.call (this);           // current.jsx:85
		};
		B.prototype.test = function (){                 // current.jsx:79
			console.log ('test');                       // current.jsx:77
			return __bo (this, '__method');             // current.jsx:85
		};
		return B;                                       // current.jsx:70
	}();
(function (){                                           // current.jsx:85
	console.log ('B:');                                 // current.jsx:83
	new B ().test ()(1, 2);                             // current.jsx:84
}());
