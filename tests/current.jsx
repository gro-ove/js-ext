function test (){
	b + c || d;
	b - c - d;
	b - (c - d);
	a + (c, d);
	(a | b + c) + d;
	a + b | c + d;
	a + (b | c) + d;
}

var a = JSON.stringify (' ' + '//' + ' '),
	b = JSON.stringify (' // ');

'//112'

console.log (a, b);
console.log ('a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b, a, b');
console.log (a, b);
