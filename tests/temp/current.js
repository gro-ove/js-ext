function sleep (timeout, callback){           // current.jsx:1
	return setTimeout (callback, timeout);    // current.jsx:2
}

function ten (__callback){                    // current.jsx:4
	function __block_0 (){
		sleep (100, __block_1)                // current.jsx:5
	}
	
	function __block_1 (){
		return __callback (10);
	}
	
	__block_0 ();
}

function asyncFn (__callback){                // current.jsx:9
	var temp;
	
	function __block_0 (){
		console.time ('> asynchronous');      // current.jsx:10
		
		ten (function (__result){             // current.jsx:11
			temp = __result;                  // current.jsx:11
			
			__block_1 ()
		})
	}
	
	function __block_1 (){
		console.timeEnd ('> asynchronous');   // current.jsx:12
		console.log (temp);                   // current.jsx:13
	}
	
	__block_0 ();
}

asyncFn ();                                   // current.jsx:16
