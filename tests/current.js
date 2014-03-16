function __prototypeExtend (c, p, t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t ();
	c.prototype.constructor = c;
}

function Parent (){                                        // current.jsx:15
	console.log ('Created: ' + this.__Parent_method ());   // current.jsx:17
}

Parent.prototype.__Parent_method = function (){            // current.jsx:20
	return 'Ok.';                                          // current.jsx:21
};

function Child (){                                         // current.jsx:25
	Parent.apply (this, arguments);                        // current.jsx:15
}

__prototypeExtend (Child, Parent);
Child.prototype.__Parent_method = function (){             // current.jsx:26
	return 'Fail.';                                        // current.jsx:27
};
(function (){
	new Child ();                                          // current.jsx:32
}());
