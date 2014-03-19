(function test (){
	console.log ('Hello world!')
}).call ();
(function test (){
	console.log ('Hello world!')
}).call.call;

if (0)
	(function a (){});

var c = function b (){};

q = function (){};
q (function (){});
a = function (){}.call;

@buildTo ('./temp/current.js')