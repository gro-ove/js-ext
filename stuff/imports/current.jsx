class TEST_CLASS extends PARENT_CLASS implements FIRST_INTERFACE, SECOND_INTERFACE uses FIRST_USED, SECOND_USED, THIRD_USED {

	// Long versions

	public function O_M (){}
	protected function _O_M (){}
	private function __O_M (){}

	static public function S_M (){}
	static protected function _S_M (){}
	static private function __S_M (){}

	public var O_V = 1;
	protected var _O_V = 2;
	private var __O_V = 3;

	static public var S_V = 4;
	static protected var _S_V = 5;
	static private var __S_V = 6;

	// Short versions

	public O_M_ (){}
	protected _O_M_ (){}
	private __O_M_ (){}

	static public S_M_ (){}
	static protected _S_M_ (){}
	static private __S_M_ (){}

	public O_V_ = 7;
	protected _O_V_ = 8;
	private __O_V_ = 9;

	static public S_V_ = 10;
	static protected _S_V_ = 11;
	static private __S_V_ = 12;
}

public class TEST_INTERFACE {
	V;
}

public interface TEST_INTERFACE {
	static STATIC {}

	static Q = 1025;

	V ();
	BAD ()
}

static protected class STATIC_TEST {
	public V;
	METHOD ();
	BAD ();
}

implemented class Object {
	public toString ();
	public valueOf ();
}