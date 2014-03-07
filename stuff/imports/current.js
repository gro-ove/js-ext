var A = function (){
	var A = function (){                // current.jsx:2
		this.__A_callbacks = [];        // ...
	};
	A.prototype.on = function (fn){     // current.jsx:1
		this.__A_callbacks.push (fn);   // current.jsx:7
	};
	return A;                           // current.jsx:1
}();
