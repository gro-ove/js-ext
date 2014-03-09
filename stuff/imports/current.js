var a = function (){                                // current.jsx:23
		'' + 5 + '';                                // current.jsx:2
		'' + 5 + '' + 8 + '';                       // current.jsx:3
		'test' + 5 + '' + 8 + '';                   // current.jsx:4
		'test';                                     // current.jsx:5
		'' + 5 + '-%' + 5 + '-' + 8 + '';           // current.jsx:6
	}, 
	b = function (){                                // current.jsx:21
		function q (){}                             // current.jsx:9
		
		'' + variable5 + '';                        // current.jsx:11
		'' + variable5 + '' + variable8 + '';       // current.jsx:12
		'test' + variable5 + '' + variable8 + '';   // current.jsx:13
		
		function a (){}                             // current.jsx:15
		
		function b (){}                             // current.jsx:17
		
		if (a)                                      // current.jsx:19
			function s (){}                         // current.jsx:20
	};

'qwerty';                                           // current.jsx:23
console.log ('test');