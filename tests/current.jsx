class A {
	(){
		console.log ('[A]', value);
	}

	abstract protected value;
}

class B extends A {
	protected value = 10;
}

{
	new B ();
}