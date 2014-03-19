function test (){                             // current.jsx:1
	b + c || d;                               // current.jsx:2
	b - c - d;                                // current.jsx:3
	b - (c - d);                              // current.jsx:4
	a + (c, d);                               // current.jsx:5
	(a | b + c) + d;                          // current.jsx:6
	a + b | c + d;                            // current.jsx:7
	a + (b | c) + d;                          // current.jsx:8
}

var a = JSON.stringify (' ' + '//' + ' '),    // current.jsx:11
	b = JSON.stringify (' // ');              // current.jsx:12

'//112';                                      // current.jsx:14
console.log (a, b);                           // current.jsx:16
console.log ('a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b');
console.log (a, b);                           // current.jsx:18
