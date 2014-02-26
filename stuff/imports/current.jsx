class A {
	protected static var a = 18;

	(){
		console.log ('[A] ' + a);
	}
}

class B extends A {
	(){
		a = 1024;
		console.log ('[B] ' + a);
		super ();
	}
}

{
	new B ();
}