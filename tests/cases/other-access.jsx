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
			return {
				get: function (){
					console.log ('[getA][get]');
					return a;
				}
			};
		}

		function getB (){
			console.log ('[getB]');
			return {
				get: function (){
					console.log ('[getB][get]');
					return b;
				}
			};
		}

		console.log (getA ().get ().variable += '-changed', getB ().get ().variable += '-changed');
		console.log ('ok');
		console.log (getA ().get ().variable, getB ().get ().variable);
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

	public method (a, b){
		function getA (){
			console.log ('[getA]');
			return a;
		}

		function getB (){
			console.log ('[getB]');
			return b;
		}

		console.log (getA ().testMethod (1, 2), getB ().testMethod (3));
	}

	testMethod (){
		console.log (arguments);
		return this instanceof B;
	}

	var testObj = {
		find: function (){
			return [
				{
					variable: 'deep!'
				}
			]
		}
	}

	public awful (){
		console.log (testObj.find ()[0].variable);
	}

	public staticTest (obj){
		console.log (obj.privateStatic, B.privateStatic);
	}
}

{
	new B ('first').method (new B ('second'), { testMethod: lambda this.result + arg, result: 'success' });
	new B ('first').test (new B ('second'), { variable: 'success' });
	new B ('first').other (new B ('second'), { variable: 'success' });
	new B ('first').final (new B ('second'), { qwerty: 'qwerty' });
	new B ().awful ();
	new B ('first').staticTest ({ privateStatic: 'arg' });
}