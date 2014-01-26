class A {

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
		console.log ('E: ' + arg);
	}
}

class F extends D {
	(arg){
		// super (arg);
		console.log ('F: ' + arg);
	}
}

{
	var f = new F ();
}

// class Something {
// 	var a = 18;

// 	public var b;

// 	(arg){
// 		console.log ('New Something: ' + arg);
// 		b = a + arg;
// 	}
// }

// class Child extends Something {
// 	public var fn, check = 'object field';

// 	public function test (arg){
// 		var q;
// 		console.log ('Test: ' + check);
// 		setTimeout (lambda console.log ('From timeout: ' + check), 400);
// 	}

// 	(arg){
// 		super (12);

// 		var check = 'local variable';
// 		console.log ('Child: ' + (b + arg));

// 		fn = function (){
// 			test (check);
// 		}
// 	}
// }

// static class App {
// 	use Child;

// 	(){
// 		var s = new Child (2);
// 		console.log (s.b);

// 		s.fn ();
// 	}
// }