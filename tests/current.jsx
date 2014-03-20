function sleep (timeout, callback)
	setTimeout (callback, timeout);

function asyncFn () asynchronous {
	console.time ('> sleep');
	asynchronous sleep (100);
	console.timeEnd ('> sleep');
}

asyncFn ();

@buildTo ('./temp/current.js')