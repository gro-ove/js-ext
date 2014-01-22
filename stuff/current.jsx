class B {
	static public var variable = JSON.stringify ({ key: 'value' });
}

class C {
	static public function test (){
		return 187;
	}
}

class A {
	use B, C;

	static var a = 18,
		b = B.variable;

	static function localFunction (){
		doSomethingLocal ();
	}

	static public function workAllDay (){
		doSomething ();
	}

	static {
		a = a * C.test ();
	}

	public var local, temp, hi = 18;

	private var pvar = 20;
	protected var provar = 25;

	public function workThis (){
		hi = hi + 1;

		var pvar = function (){
			temp = temp * pvar;
		};

		pvar ();

		return {
			hi: hi + 1,
			pvar: pvar
		}
	}

	(arg){
		local = arg;
	}
}

class Child extends A {
	public function blaBlaBla (){
		local = 'LOCAL!' + provar;
	}

	(arg){
		super ('QWERTY!');
	}
}

// __m ('A', function (){
// 	var a = 18, b;

// 	function localFunction (){
// 		doSomethingLocal ();
// 	}

// 	function workAllDay (){
// 		doSomething ();
// 	}

// 	return {
// 		workAllDay: workAllDay,
// 		@s: function (){
// 			b = B.variable;
// 		},
// 		@i: function (){
// 			a = a * C.test ();
// 		},
// 		@c: {
// 			@i: function (arg){
// 				this.local = arg;
// 				this.hi = 18;
// 			},

// 			workThis: function (){
// 				this.hi = this.hi + 1;
// 			}
// 		}
// 	}
// }, [ 'B', 'C' ]);


// __m ('A', function (){
// 	var a = 18, b;

// 	

// 	return {
// 		__s: function (){
// 			b = B.variable;
// 		},
// 		__i: function (){

// 		}
// 	}
// });