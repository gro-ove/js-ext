class A {
	use B, C;

	static var a = 18, b = B.variable, c = C.test;

	static function privateStatic (){
		console.debug ('A: static private')
	}

	static public function publicStatic (){
		console.debug ('A: static public');
		privateStatic ();
	}

	static {
		console.debug ('A: static initialize');
		publicStatic ();
	}

	public var publicVar = 1;
	private var privateVar = 2;
	protected var protectedVar = 3;

	var undefinedVar;

	public function publicObject (arg){
		console.debug ('A: object public (' + arg + ')');

		protectedVar = protectedVar + 1;
		var publicVar = function (){};
		publicVar ();
	}

	(arg){
		console.debug ('A: constructor (' + arg + ')');
		privateVar = privateVar + arg;
	}
}

class B {
	static public var variable = JSON.stringify ({ key: 'value' });
}

class C {
	static public function test (){
		return 187;
	}
}

class Child extends A {
	public function publicObject (){
		console.debug ('Child: object public');
		super ('HI');
		publicVar = protectedVar;
	}

	(arg){
		super (arg + ', PKYSLF');
		console.debug ('Child: constructor (' + arg + ')');

		super.publicObject ();
	}
}

class ChildChild extends Child {
	function test (publicVar){
		protectedVar = publicVar
	}

	(){
		super ('WTFMAN');
		console.debug ('ChildChild: constructor');

		super.super.publicObject ('ALLO A ETO TI?');

		publicObject (protectedVar);
	}
}