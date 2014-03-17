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
		console.log ('[A]', value, privateValue);
	}

	privateValue = '<pv>';
	abstract protected value;

	protected fn ()
		return 'Hello from "A".';
}

(function (){
	class C extends B {
		(a){
			super (a * 10);
			console.log ('[C]', a + '.', value + '.', fn (), tmp (), '' + new D ());

			class D {
				(){
					console.log ('[D]');
				}

				public toString (){
					return '[D] as string.'
				}
			}
		}

		protected tmp ()
			return '"C" is here.';
	}

	new C (20);
})();

if (1){
	public static class Sub {
		method ()
			'Sub';
	}
}

if (0)
	static class L {
		public var temp = 'static variable';

		(){
			console.log ('[L]', Sub.method ());
		}
	}

partial public class C extends A {
	method ()
		'Sub';
	protected value = '<ccc>';
}

partial public class C2 extends A {
	protected value = '<ccc>';
}

console.log ('[C]', new C ().method ({
	key: 'value'
	0: '0'
	null: 'null'
	true: 'true'
	'string': 'string'
}));

// class D extends C {
// 	method ()
// 		'Sub';
// }