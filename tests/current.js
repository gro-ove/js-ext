function __prototypeExtend (c, p, t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t ();
	c.prototype.constructor = c;
}

/* Definition of class "A" */

function A (){                           // current.jsx:1
	if (this.constructor === A)
		throw new Error ('Trying to instantiate abstract class A');
	
	console.log ('[A]', this.__value);   // current.jsx:3
}

/* Definition of class "B" */

function B (a){                          // current.jsx:9
	this.__value = 10;
	A.apply (this, arguments);
	this.__B_a = a;                      // current.jsx:13
}

__prototypeExtend (B, A);

/* Global initializer */

(function (){
	new B (20);                          // current.jsx:20
}());
