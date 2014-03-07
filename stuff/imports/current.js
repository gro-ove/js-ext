function __ca (from, to, result){                       // current.jsx:52
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
function __pe (c, p, t){                                // current.jsx:72
	t = function (){};                                  // ...
	t.prototype = p.prototype;                          // ...
	c.prototype = new t ();                             // ...
	c.prototype.constructor = c;                        // ...
}
function __bo (obj, name){                              // current.jsx:80
	if (!obj.hasOwnProperty ('__bt'))                   // ...
		obj.__bt = {};                                  // ...
	if (!obj.__bt.hasOwnProperty (name))                // ...
		obj.__bt[name] = obj[name].bind (obj);          // ...
	return obj.__bt[name];                              // ...
}
console.log = function (arg){};
var temp = function (){                                 // current.jsx:6
	a = 1;                                              // current.jsx:4
	b = 2;                                              // current.jsx:5
};
var temp = function (){                                 // current.jsx:11
		a = 1;                                          // current.jsx:9
		b = 2;                                          // current.jsx:10
	}, 
	other = function (){                                // current.jsx:14
		a = 1;                                          // current.jsx:12
		b = 2;                                          // current.jsx:13
	};
[
	function (){                                        // current.jsx:20
		a = 1;                                          // current.jsx:18
		b = 2;                                          // current.jsx:19
	}
];
[
	1,                                                  // current.jsx:23
	2,                                                  // ...
	3,                                                  // ...
	{
		long_long_long_long_long_ke_e_e_e_e_e_ey: GLOBAL.long_long_long_long_long_ke_e_e_e_e_e_ey
	}
];
console.log ('10',                                      // current.jsx:25
	20,                                                 // ...
	[
		1,                                              // current.jsx:26
		2,                                              // current.jsx:27
		3,                                              // current.jsx:28
		{
			'long-long-long-long-long ke-e-e-e-e-e-ey': 'long-long-long-long-long va-a-a-a-a-alue'
		}
	], 
	'20');
function hi (){                                         // current.jsx:48
	return console.log (187,                            // current.jsx:37
		function (arg){                                 // current.jsx:39
			return 15;                                  // current.jsx:38
		}, 
		function (arg){                                 // current.jsx:40
			return 18;                                  // current.jsx:39
		}, 
		{
			a: 20,                                      // current.jsx:41
			b: 25,                                      // current.jsx:42
			c: [
				function (arg){                         // current.jsx:45
					return 14;                          // current.jsx:44
				}, 
				function (arg){                         // current.jsx:46
					return 'hi';                        // current.jsx:45
				}
			]
		});
}
hi ();
console.log (__ca (1, 20));
console.log (__ca (1, 21));
console.log ('HELLO THERE!');
console.log (function (){                               // current.jsx:59
	console.log ('hi');                                 // ...
	return ':)';                                        // ...
}());
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:60
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:61
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
]);
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:62
	'long-long-long-long-long a-a-a-a-a-argument',      // ...
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',      // current.jsx:63
	'long-long-long-long-long a-a-a-a-a-argument',      // ...
	'long-long-long-long-long a-a-a-a-a-argument'       // ...
]);
var A = function (){
		var A = function (){};                          // current.jsx:87
		A.prototype.__method = function (a, b){         // current.jsx:69
			console.log (a, b);                         // current.jsx:67
			return a + b;                               // current.jsx:68
		};
		return A;                                       // current.jsx:65
	}(), 
	B = function (){
		var B = function (){                            // current.jsx:87
			A.call (this);                              // current.jsx:65
		};
		__pe (B, 
			A);
		B.prototype.__method = function (a, b){         // current.jsx:76
			console.log ('method');                     // current.jsx:74
			A.prototype.__method.call (this);           // current.jsx:87
		};
		B.prototype.test = function (){                 // current.jsx:81
			console.log ('test');                       // current.jsx:79
			return __bo (this, '__method');             // current.jsx:87
		};
		return B;                                       // current.jsx:72
	}();
(function (){                                           // current.jsx:87
	console.log ('B:');                                 // current.jsx:85
	new B ().test ()(1, 2);                             // current.jsx:86
}());
