function __prototypeExtend (c, p, t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t ();
	c.prototype.constructor = c;
}

/* Definition of class "Parent" */

function Parent (){                                 // current.jsx:15
	if (this.constructor === Parent)
		throw new Error ('Trying to instantiate abstract class Parent');
	
	console.log ('Created: ' + this.__method ());   // current.jsx:17
	console.log (this.__a (), this.b ());           // current.jsx:18
}

Parent.prototype.b = function (){                   // current.jsx:25
	return 'B';                                     // current.jsx:26
};

/* Definition of class "Child" */

function Child (){                                  // current.jsx:29
	Parent.apply (this, arguments);                 // current.jsx:15
}

__prototypeExtend (Child, Parent);
Child.prototype.__method = function (){             // current.jsx:30
	return 'Win.';                                  // current.jsx:31
};
Child.prototype.__a = function (){                  // current.jsx:34
	return 'C-A';                                   // current.jsx:35
};
Child.prototype.b = function (){                    // current.jsx:37
	return 'C-B';                                   // current.jsx:38
};

/* Global initializer */

(function (){
	new Child ();                                   // current.jsx:42
}());
