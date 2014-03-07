function __pe (c, p, t){                    // current.jsx:11
	t = function (){};                      // ...
	t.prototype = p.prototype;              // ...
	c.prototype = new t ();                 // ...
	c.prototype.constructor = c;            // ...
}
var A = function (){
		var A = function (){                // current.jsx:2
			this.__A_callbacks = [];        // ...
		};
		A.prototype.on = function (fn){     // current.jsx:1
			this.__A_callbacks.push (fn);   // current.jsx:7
		};
		return A;                           // current.jsx:1
	}(), 
	B = function (){
		var B = function (){                // current.jsx:11
			A.apply (this, arguments);      // current.jsx:1
		};
		__pe (B, A);
		return B;                           // current.jsx:11
	}();
