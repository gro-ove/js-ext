console.log = lambda;

var temp = function (){ 
	a = 1; 
	b = 2; 
};

var temp = function (){ 
	a = 1; 
	b = 2; 
}, other = function (){ 
	a = 1; 
	b = 2; 
};

[ 
	function (){ 
		a = 1; 
		b = 2; 
	} 
];

[ 1, 2, 3, { long_long_long_long_long_ke_e_e_e_e_e_ey: GLOBAL.long_long_long_long_long_ke_e_e_e_e_e_ey } ];

console.log ('10', 20, [ 
	1, 
	2, 
	3, 
	{ 
		'long-long-long-long-long ke-e-e-e-e-e-ey': 'long-long-long-long-long va-a-a-a-a-alue' 
	} 
], '20');

function hi ()
	console.log (
		// '\u2028' 
		187 
		lambda 15 
		lambda 18 
		{ 
			a: 20 
			b: 25 
			c: [ 
				lambda 14 
				lambda 'hi' 
			] 
		}
	);

hi ();

console.log ([ 1 .. 20 ]);

console.log ([ 1 .. 21 ]);
{
console.log ('HELLO THERE!');
}

function TEST (){
	{
		console.log ('test');
	}
}



console.log (function (){ console.log ('hi'); return ':)' }())
console.log ([ 'long-long-long-long-long a-a-a-a-a-argument', 'long-long-long-long-long a-a-a-a-a-argument' ], 
	[ 'long-long-long-long-long a-a-a-a-a-argument', 'long-long-long-long-long a-a-a-a-a-argument' ])
console.log ([ 'long-long-long-long-long a-a-a-a-a-argument', 'long-long-long-long-long a-a-a-a-a-argument', 'long-long-long-long-long a-a-a-a-a-argument' ], 
	[ 'long-long-long-long-long a-a-a-a-a-argument', 'long-long-long-long-long a-a-a-a-a-argument', 'long-long-long-long-long a-a-a-a-a-argument' ])

class A {
	protected method (a, b){
		console.log (a, b);
		return a + b;
	}
}

class B extends A {
	protected method (a, b){
		console.log ('method');
		super;
	}

	public test (){
		console.log ('test');
		return method;
	}
}

{
	console.log ('B:');
	new B ().test ()(1, 2);
}

// class B extends A {
// 	static var privateStatic = 'done';
// 	var variable;

// 	public var qwerty;

// 	(variable){
// 		this.variable = variable;
// 		qwerty = 'default';
// 	}

// 	public test (a, b){
// 		a.variable += '-changed';
// 		b.variable += '-changed';
// 		console.log (variable, a.variable, b.variable, new A ().parent);
// 	}

// 	public other (a, b){
// 		function getA (){
// 			console.log ('[getA]');
// 			return {
// 				get: function (){
// 					console.log ('[getA][get]');
// 					return a;
// 				}
// 			};
// 		}

// 		function getB (){
// 			console.log ('[getB]');
// 			return {
// 				get: function (){
// 					console.log ('[getB][get]');
// 					return b;
// 				}
// 			};
// 		}

// 		console.log (getA ().get ().variable += '-changed', getB ().get ().variable += '-changed');
// 		console.log ('ok');
// 		console.log (getA ().get ().variable, getB ().get ().variable);
// 	}

// 	public final (a, b){
// 		function getA (){
// 			console.log ('[getA]');
// 			return a;
// 		}

// 		function getB (){
// 			console.log ('[getB]');
// 			return b;
// 		}

// 		console.log (getA ().qwerty += '-changed', getB ().qwerty += '-changed');
// 		console.log (a.qwerty, b.qwerty);
// 	}

// 	var testObj = {
// 		find: function (){
// 			return [
// 				{
// 					variable: 'deep!'
// 				}
// 			]
// 		}
// 	}

// 	public awful (){
// 		console.log (testObj.find ()[0].variable);
// 	}

// 	public staticTest (obj){
// 		console.log (obj.privateStatic, B.privateStatic);
// 	}
// }

// {
// 	new B ('first').test (new B ('second'), { variable: 'success' });
// 	new B ('first').other (new B ('second'), { variable: 'success' });
// 	new B ('first').final (new B ('second'), { qwerty: 'qwerty' });
// 	// new B ().awful ();
// 	// new B ('first').staticTest ({ privateStatic: 'arg' });
// }