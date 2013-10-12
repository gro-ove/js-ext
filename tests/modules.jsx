// ==Jsx==
// @target local
// ==/Jsx=

module A {
	import C;
	
	export var temp = 'a';
	
	export function get (){
		return 'A' + C.get ();
	}
}

module B {
	import A;
	
	export function get (){
		return 'B' + A.get ();
	}
}

module C {
	import @A;
	
	export function get (){
		return 'C' + A.temp;
	}
}

module T {
	import A, B, C;
	
	function init (){
		console.log (A.get () + ', ' + B.get () + ', ' + C.get ());
	}
}

/*{Result-Begin}

{Result-End}*/
