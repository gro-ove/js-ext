function __prototypeExtend (c, p, t){
	t = function (){};
	t.prototype = p.prototype;
	c.prototype = new t ();
	c.prototype.constructor = c;
}

/* Class "Sub" declaration */
var Sub = {                                                     // current.jsx:50
	method: function (){                                        // ...
		return 'Sub';                                           // current.jsx:52
	}
};

/* Class "L" declaration */
var L = { temp: 'static variable' };
(function (){                                                   // current.jsx:60
	console.log ('[L]', Sub.method ());                         // current.jsx:61
}());

/* Class "A" declaration */
function A (){                                                  // current.jsx:13
	if (this.constructor === A)
		throw new Error ('Trying to instantiate abstract class A');
	
	this.__A_privateValue = '<pv>';                             // current.jsx:18
	console.log ('[A]', this.__value, this.__A_privateValue);   // current.jsx:15
}
A.prototype.__fn = function (){                                 // current.jsx:21
	return 'Hello from "A".';                                   // current.jsx:22
};

/* Class "C2" declaration */
function C2 (){                                                 // current.jsx:71
	this.__value = '<ccc>';                                     // current.jsx:72
	A.apply (this, arguments);
}
__prototypeExtend (C2, A);

/* Class "C" declaration */
function C (){                                                  // current.jsx:65
	this.__value = '<ccc>';                                     // current.jsx:68
	A.apply (this, arguments);
}
__prototypeExtend (C, A);
C.prototype.method = function (){                               // current.jsx:66
	return 'Sub';                                               // current.jsx:67
};

/* Class "B" declaration */
var B = function (){                                            // current.jsx:1
	var B = function (a){                                       // ...
			this.__value = 10;
			A.apply (this, arguments);
			this.__B_a = a;                                     // current.jsx:6
			console.log ('[B]', this.__B_a, temp);              // current.jsx:7
		}, 
		temp = L.temp;                                          // current.jsx:2
	
	__prototypeExtend (B, A);
	return B;
}();

(function (){                                                   // current.jsx:25
	/* Class "C" declaration */
	function C (a){                                             // current.jsx:26
		/* Class "D" declaration */
		function D (){                                          // current.jsx:31
			console.log ('[D]');                                // current.jsx:33
		}
		D.prototype.toString = function (){                     // current.jsx:36
			return '[D] as string.';                            // current.jsx:37
		};
		
		B.call (this, a * 10);
		console.log ('[C]',                                     // current.jsx:29
			a + '.',                                            // ...
			this.__value + '.',                                 // ...
			this.__fn (), 
			this.__tmp (), 
			'' + new D ());                                     // ...
	}
	__prototypeExtend (C, B);
	C.prototype.__tmp = function (){                            // current.jsx:42
		return '"C" is here.';                                  // current.jsx:43
	};
	
	new C (20);                                                 // current.jsx:46
}());

if (1){}

if (0);

console.log ('[C]',                                             // current.jsx:75
	new C ().method ({                                          // ...
		key: 'value',                                           // ...
		0: '0',                                                 // current.jsx:77
		null: 'null',                                           // current.jsx:78
		true: 'true',                                           // current.jsx:79
		'string': 'string'
	}));
