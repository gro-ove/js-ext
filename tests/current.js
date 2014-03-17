function __prototypeExtend (c, p, t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t ();
	c.prototype.constructor = c;
}

/* Class "Sub" declaration */
var Sub = {                                          // current.jsx:49
	method: function (){                             // ...
		return 'Sub';                                // current.jsx:51
	}
};

/* Class "L" declaration */
var L = { temp: 'static variable' };
(function (){                                        // current.jsx:59
	console.log ('[L]', Sub.method ());              // current.jsx:60
}());

/* Class "A" declaration */
function A (){                                       // current.jsx:13
	if (this.constructor === A)
		throw new Error ('Trying to instantiate abstract class A');
	
	console.log ('[A]', this.__value);               // current.jsx:15
}
A.prototype.__fn = function (){                      // current.jsx:20
	return 'Hello from "A".';                        // current.jsx:21
};

/* Class "C" declaration */
function C (){                                       // current.jsx:64
	this.__value = '<ccc>';                          // current.jsx:67
	A.apply (this, arguments);
}
__prototypeExtend (C, A);
C.prototype.method = function (){                    // current.jsx:65
	return 'Sub';                                    // current.jsx:66
};

/* Class "B" declaration */
var B = function (){                                 // current.jsx:1
	var B = function (a){                            // ...
			this.__value = 10;
			A.apply (this, arguments);
			this.__B_a = a;                          // current.jsx:6
			console.log ('[B]', this.__B_a, temp);   // current.jsx:7
		}, 
		temp = L.temp;                               // current.jsx:2
	
	__prototypeExtend (B, A);
	return B;
}();

(function (){                                        // current.jsx:24
	/* Class "C" declaration */
	function C (a){                                  // current.jsx:25
		/* Class "D" declaration */
		function D (){                               // current.jsx:30
			console.log ('[D]');                     // current.jsx:32
		}
		D.prototype.toString = function (){          // current.jsx:35
			return '[D] as string.';                 // current.jsx:36
		};
		
		B.call (this, a * 10);
		console.log ('[C]',                          // current.jsx:28
			a + '.',                                 // ...
			this.__value + '.',                      // ...
			this.__fn (), 
			this.__tmp (), 
			'' + new D ());                          // ...
	}
	__prototypeExtend (C, B);
	C.prototype.__tmp = function (){                 // current.jsx:41
		return '"C" is here.';                       // current.jsx:42
	};
	
	new C (20);                                      // current.jsx:45
}());

if (1){}

if (0);

console.log ('[C]', new C ().method ());             // current.jsx:70
