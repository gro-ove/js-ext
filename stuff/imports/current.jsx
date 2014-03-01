class Test {
	a = 19;

	(arg){
		console.log (this [arg]);
	}
}

{
	new Test ('a');
}