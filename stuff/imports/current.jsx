class A {
	protected parent = 'WOOHOO!';
}

class B extends A {
	static var privateStatic = 'success';
	var variable;

	(variable)
		this.variable = variable;

	public test (a, b){
		a.variable += '-changed';
		b.variable += '-changed';
		console.log (variable, a.variable, b.variable, new A ().parent);
		console.log (B.privateStatic);
	}

	public other (a, b){
		function getA (){
			console.log ('[getA]');
			return a;
		}

		function getB (){
			console.log ('[getB]');
			return b;
		}

		getA ().variable += '-changed';
		getB ().variable += '-changed';
		console.log (a.variable, b.variable);
	}
}

{
	new B ('first').test (new B ('second'), { variable: 'success' });
	new B ('first').other (new B ('second'), { variable: 'success' });
}