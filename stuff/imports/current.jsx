// class A {
// 	protected a;
// }

// class B extends A {
// 	protected a;
// }

// class C extends A {
// 	public a;
// }

// class D extends A {
// 	private a;
// }

// Попробовать с методами

class A {
	protected var a = 10
}

class B extends A {
	private var b = 11;
}

class C extends B {
	public var b = 11;
}