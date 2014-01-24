class A {
	use B, C;

	static var a = 18, b = test;

	static function privateStatic (){
		doSomethingLocal
	}

	static public function publicStatic (){
		doSomething
	}

	static {
		staticInitialize
	}

	public var publicVar = 1;
	private var privateVar = 2;
	protected var protectedVar = 3;
	
	var undefinedVar;

	public function publicObject (){
		protectedVar = protectedVar + 1;

		var publicVar = function (){};

		publicVar ();
	}

	(arg){
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
		super ('publicObject from A');
		publicVar = protectedVar;
	}

	(arg){
		super ('A constructor');
		super.publicObject ();
	}
}

class ChildChild extends Child {
	function test (publicVar){
		protectedVar = publicVar
	}

	(){
		super ('Child constructor');
		super.super.publicObject ('publicObject from A');

		publicObject (protectedVar);
	}
}