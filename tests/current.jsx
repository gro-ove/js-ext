class B extends A {
	static var temp = L.temp;
	var a;

	(a){
		this.a = a;
		console.log ('[B]', this.a, temp);
	}

	protected value = 10;
}

class A uses L {
	(){
		console.log ('[A]', value);
	}

	abstract protected value;

	protected fn ()
		return 'Hello from "A".';
}

(function (){
	class C extends B {
		(a){
			super (a * 10);
			console.log ('[C]', a + '.', value + '.', fn (), tmp (), new D ());

			class D {
				(){
					console.log ('[D]');
				}
			}
		}

		protected tmp ()
			return '"C" is here.';
	}

	new C (20);
})();

if (0)
	static class L {
		public var temp = 'static variable';

		(){
			console.log ('[L]', Sub.method ());
		}
	}

if (1){
	public static class Sub {
		method ()
			'Sub';
	}
}

public class C extends A {
	method ()
		'Sub';
	protected value = '<ccc>';
}

console.log ('[C]', new C ().method ());

// class D extends C {
// 	method ()
// 		'Sub';
// }