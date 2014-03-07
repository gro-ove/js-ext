function __ca (from, to, result){                           // current.jsx:52
	if (typeof from === 'string')                           // ...
		from = from.charCodeAt (0);                         // ...
	if (typeof to === 'string')                             // ...
		to = to.charCodeAt (0);                             // ...
	result = new Array (Math.abs (to - from) + 1);          // ...
	if (from < to)                                          // ...
		for (var i = 0; i < result.length; i ++)            // ...
			result[i] = i + from;                           // ...
	else
		for (var i = result.length - 1; i >= 0; i --)       // ...
			result[i] = from - i;                           // ...
	return result;                                          // ...
}
function __pe (c, p, t){                                    // current.jsx:80
	t = function (){};                                      // ...
	t.prototype = p.prototype;                              // ...
	c.prototype = new t ();                                 // ...
	c.prototype.constructor = c;                            // ...
}
function __bo (obj, name){                                  // current.jsx:88
	if (!obj.hasOwnProperty ('__bt'))                       // ...
		obj.__bt = {};                                      // ...
	if (!obj.__bt.hasOwnProperty (name))                    // ...
		obj.__bt[name] = obj[name].bind (obj);              // ...
	return obj.__bt[name];                                  // ...
}
console.log = function (arg){};
var temp = function (){                                     // current.jsx:3
	a = 1;                                                  // current.jsx:4
	b = 2;                                                  // current.jsx:5
};
var temp = function (){                                     // current.jsx:8
		a = 1;                                              // current.jsx:9
		b = 2;                                              // current.jsx:10
	}, 
	other = function (){                                    // current.jsx:11
		a = 1;                                              // current.jsx:12
		b = 2;                                              // current.jsx:13
	};
[
	function (){                                            // current.jsx:16
		a = 1;                                              // current.jsx:18
		b = 2;                                              // current.jsx:19
	}
];
[
	1,                                                      // current.jsx:23
	2,                                                      // ...
	3,                                                      // ...
	{
		long_long_long_long_long_ke_e_e_e_e_e_ey: GLOBAL.long_long_long_long_long_ke_e_e_e_e_e_ey
	}
];
console.log ('10',                                          // current.jsx:25
	20,                                                     // ...
	[
		1,                                                  // current.jsx:26
		2,                                                  // current.jsx:27
		3,                                                  // current.jsx:28
		{
			'long-long-long-long-long ke-e-e-e-e-e-ey': 'long-long-long-long-long va-a-a-a-a-alue'
		}
	], 
	'20');
function hi (){                                             // current.jsx:34
	return console.log (187,                                // current.jsx:37
		function (arg){                                     // ...
			return 15;                                      // current.jsx:38
		}, 
		function (arg){                                     // current.jsx:39
			return 18;                                      // ...
		}, 
		{
			a: 20,                                          // current.jsx:41
			b: 25,                                          // current.jsx:42
			c: [
				function (arg){                             // current.jsx:43
					return 14;                              // current.jsx:44
				}, 
				function (arg){                             // current.jsx:45
					return 'hi';                            // ...
				}
			]
		});
}
hi ();
console.log (__ca (1, 20));
console.log (__ca (1, 21));
function TEST (){                                           // current.jsx:59
	{
		console.log ('test');                               // current.jsx:61
	}
}
console.log (function (){                                   // current.jsx:67
	console.log ('hi');                                     // ...
	return ':)';                                            // ...
}());
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',          // current.jsx:68
	'long-long-long-long-long a-a-a-a-a-argument'           // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',          // current.jsx:69
	'long-long-long-long-long a-a-a-a-a-argument'           // ...
]);
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',          // current.jsx:70
	'long-long-long-long-long a-a-a-a-a-argument',          // ...
	'long-long-long-long-long a-a-a-a-a-argument'           // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',          // current.jsx:71
	'long-long-long-long-long a-a-a-a-a-argument',          // ...
	'long-long-long-long-long a-a-a-a-a-argument'           // ...
]);
var A = function (){
		var A = function (){};                              // current.jsx:73
		A.prototype.__method = function (a, b){             // ...
			console.log (a, b);                             // current.jsx:75
			return a + b;                                   // current.jsx:76
		};
		return A;                                           // current.jsx:73
	}(), 
	B = function (){
		var B = function (){};                              // current.jsx:80
		__pe (B, A);
		B.prototype.__method = function (a, b){             // ...
			console.log ('method');                         // current.jsx:82
			A.prototype.__method.apply (this, arguments);   // current.jsx:95
		};
		B.prototype.test = function (){                     // current.jsx:80
			console.log ('test');                           // current.jsx:87
			return __bo (this, '__method');                 // current.jsx:95
		};
		return B;                                           // current.jsx:80
	}();
(function (){                                               // current.jsx:57
	console.log ('HELLO THERE!');                           // current.jsx:56
}());
(function (){                                               // current.jsx:95
	console.log ('B:');                                     // current.jsx:93
	new B ().test ()(1, 2);                                 // current.jsx:94
}());
