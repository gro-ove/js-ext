console.log = lambda process.stdout.write (arguments [0]);

class A {
	public function test (){
		...
	}
}

class B extends A {
	(){
		console.log ('B');
	}
}

class C extends B {
}

class D extends C {
	(){
		console.log ('D');
	}
}

class E extends D {
	(arg){
		console.log ('E(' + arg + ')');
	}
}

class F extends E {
	(arg){
		super (arg);
		console.log ('F(' + arg + ')');
	}
}

class G extends F {}

class H extends G {
	var temp = 19;
}

{
	for (var i = 'A'; this [i]; i = String.fromCharCode (i.charCodeAt (0) + 1)){
		console.log (i + '> '); 
		new this [i](i.charCodeAt (0) - 'A'.charCodeAt (0)); 
		console.log ('\n');
	}

	new A ().test ();

	console.log ('test: %0'(+new Date));
}