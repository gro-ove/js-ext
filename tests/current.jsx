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
		console.log ('[B]', this.a);
	}

	protected value = 10;
}

{
	class C extends B {
		(a){
			super (a * 10);
		}
	}

	new C (20);
}