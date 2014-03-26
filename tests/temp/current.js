a = function (arg){};
b = function (obj){                      // current.jsx:2
	var temp;
	
	console.log ('function - begin');    // current.jsx:5
	
	try {
		console.log ('try');             // current.jsx:8
		obj.test;                        // current.jsx:9
		console.log ('try - end');       // current.jsx:10
	} catch (e){                         // current.jsx:11
		console.log ('catch');           // current.jsx:12
		return 'from catch';             // current.jsx:13
		console.log ('catch - end');     // current.jsx:14
	} finally {
		console.log ('finally');         // current.jsx:16
		return;
		console.log ('finally - end');   // current.jsx:18
	}
	
	console.log ('function - end');      // current.jsx:21
};
a ();                                    // current.jsx:23
console.log ('== with error ==');        // current.jsx:24
console.log ('result: ' + b ());         // current.jsx:25
console.log ('== without error ==');     // current.jsx:26
console.log ('result: ' + b ({}));       // current.jsx:27

var v = (1, 2);
