var a = function (){                      // current.jsx:1
		'' + 5;                           // current.jsx:2
		'' + 5 + 8;                       // current.jsx:3
		'test' + 5 + 8;                   // current.jsx:4
		'begin insert middle test end';   // current.jsx:5
	}, 
	b = function (){                      // current.jsx:7
		function q (){}                   // current.jsx:8
		
		'' + variable5;                   // current.jsx:10
		'' + variable5 + variable8;       // current.jsx:11
		'test' + variable5 + variable8;   // current.jsx:12
		
		function a (){}                   // current.jsx:14
		
		function b (){}                   // current.jsx:16
		
		if (a)                            // current.jsx:18
			function s (){}               // current.jsx:19
	};

'qwerty';                                 // current.jsx:22
console.log ('hi');                       // current.jsx:23

while (0)                                 // current.jsx:25
	;                                     // ...
