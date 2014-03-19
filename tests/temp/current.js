(function test (){                  // current.jsx:1
	console.log ('Hello world!');   // current.jsx:2
}).call ();                         // current.jsx:3
(function test (){                  // current.jsx:4
	console.log ('Hello world!');   // current.jsx:5
}).call.call;                       // current.jsx:6

if (0)
	(function a (){});

var c = function b (){};

q = function (){};
q (function (){});                  // current.jsx:14
a = (function (){}).call;           // current.jsx:15
