/*class A {
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

	var local, temp, hi = 18;

	A (arg){
		local = arg;
	}

	public workThis (){
		hi = hi + 1;
	}
}*/

__m ('A', function (){
	var a = 18, b;

	function localFunction (){
		doSomethingLocal ();
	}

	function workAllDay (){
		doSomething ();
	}

	return {
		workAllDay: workAllDay,
		__s: function (){
			b = B.variable;
		},
		__i: function (){
			a = a * C.test ();
		},
		__c: {
			__i: function (arg){
				this.local = arg;
				this.hi = 18;
			},

			workThis: function (){
				this.hi = this.hi + 1;
			}
		}
	}
}, [ 'B', 'C' ]);


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