class A {
	protected parent = 'WOOHOO!';
}

class B extends A {
	static var privateStatic = 'done';
	var variable;

	public var qwerty;

	(variable){
		this.variable = variable;
		qwerty = 'default';
	}

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

	public final (a, b){
		function getA (){
			console.log ('[getA]');
			return a;
		}

		function getB (){
			console.log ('[getB]');
			return b;
		}

		console.log (getA ().qwerty += '-changed', getB ().qwerty += '-changed');
		console.log (a.qwerty, b.qwerty);
	}

	public staticTest (obj){
		console.log (obj.privateStatic, B.privateStatic);
	}
}

{
	new B ('first').test (new B ('second'), { variable: 'success' });
	new B ('first').other (new B ('second'), { variable: 'success' });
	new B ('first').final (new B ('second'), { qwerty: 'qwerty' });
	new B ('first').staticTest ({ privateStatic: 'arg' });
}