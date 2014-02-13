// @import ('other')

// @macro time new Date ().getMinutes ();
class A {
	protected function fn (){
		console.log ('A');
	}

	(){
		fn ();
	}
}

class B extends A {
	protected function fn (){
		console.log ('B');
		super ();
	}
}

{
	new B ();
}

// var current_t = @time;

// @macro arg 1000 + arg;
// var current_o = @arg (1);

// var current_to = @arg (@time);

// @macro file { type: ReturnType.String, value: context.file.fullpath };
// console.log (@file);

// var diffucultTest = @macroInOtherFile;

// class A {
// 	private var variable = 10;

// 	public function test (){
// 		return lambda arg + variable;
// 	}

// 	public function check (){
// 		test ();
// 		return test;
// 	}
// }

// function oneLineWithResult (arg)
// 	if (arg)
// 		arg + 20;

// function oneLineWithoutArgumentsWithResult 
// 	if (arg)
// 		arg + 20;

// function callRightHere (){
// 	new A
// }(current_o)