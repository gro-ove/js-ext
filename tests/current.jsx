// abstract class A {
// 	(){
// 		console.log ('created');
// 	}

// 	method (){
// 		console.log ('created');
// 	}
// }

// class Ac extends A {

// }

class Parent {
	(){
		console.log ('Created: ' + method ());
	}

	method (){
		return 'Ok.';
	}
}

class Child extends Parent {
	method (){
		return 'Fail.';
	}
}

{
	new Child ();
}