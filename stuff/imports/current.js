function __ca (from, 
	to, 
	result){
	if (typeof from === 'string')
		from = from.charCodeAt (0);
	if (typeof to === 'string')
		to = to.charCodeAt (0);
	result = new Array (Math.abs (to - from) + 1);
	if (from < to)
		for (var i = 0; i < result.length; i ++)
			result[i] = i + from;
	else
		for (var i = result.length - 1; i >= 0; i --)
			result[i] = from - i;
	return result;
}
[
	1,                                               // current.jsx:1
	2,                                               // ...
	3,                                               // ...
	{
		long_long_long_long_long_ke_e_e_e_e_e_ey: GLOBAL.long_long_long_long_long_ke_e_e_e_e_e_ey
	}
];
console.log ('10',                                   // current.jsx:3
	20,                                              // ...
	[
		1,                                           // current.jsx:4
		2,                                           // current.jsx:5
		3,                                           // current.jsx:6
		{
			'long-long-long-long-long ke-e-e-e-e-e-ey': 'long-long-long-long-long va-a-a-a-a-alue'
		}
	], 
	'20');
function hi (){                                      // current.jsx:12
	return console.log (187,                         // current.jsx:15
		function (arg){                              // ...
			return 15;                               // current.jsx:16
		}, 
		function (arg){                              // current.jsx:17
			return 18;                               // ...
		}, 
		{
			a: 20,                                   // current.jsx:19
			b: 25,                                   // current.jsx:20
			c: [
				function (arg){                      // current.jsx:21
					return 14;                       // current.jsx:22
				}, 
				function (arg){                      // current.jsx:23
					return 'hi';                     // ...
				}
			]
		});
}
hi ();
console.log (__ca (1, 20));
console.log (__ca (1, 21));
console.log ('HELLO THERE!');
console.log (function (){console.log ('hi');return ':)';}());
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',   // current.jsx:38
	'long-long-long-long-long a-a-a-a-a-argument'    // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',   // current.jsx:39
	'long-long-long-long-long a-a-a-a-a-argument'    // ...
]);
console.log ([
	'long-long-long-long-long a-a-a-a-a-argument',   // current.jsx:40
	'long-long-long-long-long a-a-a-a-a-argument',   // ...
	'long-long-long-long-long a-a-a-a-a-argument'    // ...
], 
[
	'long-long-long-long-long a-a-a-a-a-argument',   // current.jsx:41
	'long-long-long-long-long a-a-a-a-a-argument',   // ...
	'long-long-long-long-long a-a-a-a-a-argument'    // ...
]);
