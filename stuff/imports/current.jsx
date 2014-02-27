@macro delayed:string (a, fn:callback){
	setTimeout (lambda fn (a), 100);
}

@macro name:string {
	return 18;
}()

// // interface Object {
// // 	implemented public function toString ();
// // }

// var p;

// function fn (c){
// 	if (!p)
// 		p = c;
// 	else
// 		console.log (p === c ? '[Bind test complete]' : '[Bind test failed]')
// }

// class A {
// 	protected var a = 18;

// 	protected static var s = '[protected static var]';
// 	static var p = '[private static var]';

// 	private function hardcore (){}

// 	(a){
// 		(lambda {
// 			setTimeout (lambda {
// 				console.log ('[A]', a, s, p);
// 			}, 100);
// 		})();

// 		this.a = a || this.a;

// 		fn (hardcore);
// 		fn (hardcore);
// 	}
// }

// class B extends A {
// 	var value, other = 19;

// 	private function hardcore (){
// 		console.log ('[H]', a, value, this.value);
// 	}

// 	(value){
// 		this.value = value;

// 		a = 1024;
// 		console.log ('[B]', a, this.value, s);
// 		super ();

// 		(lambda {
// 			setTimeout (lambda {
// 				console.log ('[T]', a, value, this.value, other);
// 			}, 100);
// 		})();

// 		setTimeout (hardcore, 300);
// 	}
// }

// {
// 	new B ('v-v-value!');
// }
