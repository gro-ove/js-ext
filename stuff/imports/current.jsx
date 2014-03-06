class A {
	protected other = 'WOOHOO!';
}

class B extends A {
	static var privateStatic = 'success';
	var variable;

	(variable)
		this.variable = variable;

	public test (a, b){
		b.variable += '-changed';
		console.log (variable, a.variable, b.variable, new A ().other);
		console.log (B.privateStatic);
	}
}

{
	new B ('first').test (new B ('second'), { variable: 'success' });
}