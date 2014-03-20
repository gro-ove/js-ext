function sleep (timeout, callback){          // current.jsx:1
	return setTimeout (callback, timeout);   // current.jsx:2
}

function asyncFn (__callback){               // current.jsx:4
	console.time ('> sleep');                // current.jsx:5
	sleep (100);                             // current.jsx:6
	console.timeEnd ('> sleep');             // current.jsx:7
}

asyncFn ();                                  // current.jsx:10
