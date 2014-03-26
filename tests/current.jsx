a = lambda;
b = function (obj){
	var temp;

	console.log ('function - begin');

	try {
		console.log ('try');
		obj.test;
		console.log ('try - end');
	} catch (e){
		console.log ('catch');
		return 'from catch';
		console.log ('catch - end');
	} finally {
		console.log ('finally');
		return;
		console.log ('finally - end');
	}
	
	console.log ('function - end');
};
(a)();
console.log ('== with error ==');
console.log ('result: ' + b ());
console.log ('== without error ==');
console.log ('result: ' + b ({}));

var v = (1, 2);

@buildTo ('./temp/current.js')