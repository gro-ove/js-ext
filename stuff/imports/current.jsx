class A {
	private var callbacks = [];

	(){}

	public function on (fn){
		callbacks.push (fn);
	}
}

class B extends A {

}
