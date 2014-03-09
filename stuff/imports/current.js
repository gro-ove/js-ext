function a (){                                  // current.jsx:1
	'' + 5 + '';                                // current.jsx:2
	'' + 5 + '' + 8 + '';                       // current.jsx:3
	'test' + 5 + '' + 8 + '';                   // current.jsx:4
	'test';                                     // current.jsx:5
	'' + 5 + '-%' + 5 + '-' + 8 + '';           // current.jsx:6
}

'qwerty';                                       // current.jsx:9
console.log ('test');                           // current.jsx:10

function b (){                                  // current.jsx:12
	function q (){}                             // current.jsx:13
	
	'' + variable5 + '';                        // current.jsx:15
	'' + variable5 + '' + variable8 + '';       // current.jsx:16
	'test' + variable5 + '' + variable8 + '';   // current.jsx:17
	
	function a (){}                             // current.jsx:19
	
	function b (){}                             // current.jsx:21
	
	if (a)                                      // current.jsx:23
		function s (){}                         // current.jsx:24
}