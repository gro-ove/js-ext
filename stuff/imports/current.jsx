function a (){
	'%0' (5);
	'%0%1' (5, 8);
	'test%0%1' (5, 8);
	'test%0qwerty%1' ('', 'test');
	'%0-%%0-%1' (5, 8);
}

'qwerty';
console.log ('test');

function b (){
	function q (){}

	'%0' (variable5);
	'%0%1' (variable5, variable8);
	'test%0%1' (variable5, variable8);

	function a (){}

	function b (){}

	if (a)
		function s (){}
}
