class A {
	protected parent = 'WOOHOO!';
}

class B extends A {
	static var privateStatic = 'done';
	var variable;

	(variable)
		this.variable = variable;

	public test (a, b){
		a.variable += '-changed';
		b.variable += '-changed';
		console.log (variable, a.variable, b.variable, new A ().parent);
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

		console.log (getA ().variable += '-changed', getB ().variable += '-changed');
		console.log (a.variable, b.variable);
	}

	public staticTest (obj){
		console.log (obj.privateStatic, B.privateStatic);
	}
}

{
	new B ('first').test (new B ('second'), { variable: 'success' });
	new B ('first').other (new B ('second'), { variable: 'success' });
	new B ('first').staticTest ({ privateStatic: 'arg' });
}