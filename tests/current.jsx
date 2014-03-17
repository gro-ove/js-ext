class A {
	(){
		console.log ('[A]', value);
	}

	abstract protected value;
}

class B extends A {
	var a;

	(a){
		this.a = a;
	}

	protected value = 10;
}

{
	new B (20);
}