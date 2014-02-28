class First {
	static var psv = ':staticprivate';

	a = ':a';

	(a){
		this.a = a + psv;
	}

	public oldFn {
		console.log ('[ oldfn ]', psv, a);
	}
}

public class Second extends First {
	static var psv = ':overrided';
	protected static dsv = ':protected';
	var usv = ':public';

	fn (){
		console.log ('[ fn ]', psv, test ());
		return this;
	}

	abstract protected test ();
}

public class SecondNotAbstract extends Second {
	protected test ()
		'test';
}

protected class Third extends Second {
	(){
		super (':argument');
		console.log ('[ static test ]', dsv, this.dsv, this.usv)
	}
}

{
	new First (':first');
	new SecondNotAbstract (':test').fn ().oldFn ();
	new Third ().fn ().oldFn ();
}