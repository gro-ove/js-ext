function sleep (timeout, callback)
	setTimeout (callback, timeout);

function ten () asynchronous {
	asynchronous sleep (100);
	return 10;
}

function double (arg) asynchronous {
	asynchronous sleep (100);
	return arg * 2;
}

function asyncFn () asynchronous {
	console.time ('> asynchronous');
	var temp = asynchronous double (asynchronous ten ());
	console.timeEnd ('> asynchronous');
	console.log (temp);
}

asyncFn ();

@buildTo ('./temp/current.js')