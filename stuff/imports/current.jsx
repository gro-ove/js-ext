class First {
	static var h = 18;

	a = 1024;

	(a){
		this.a = a + h;
	}

	public oldFn {
		console.log (h);
	}
}

public class Second extends First {
	static var h = 'overrided';

	fn (){
		console.log (h);
		return this;
	}
}

{
	new Second ().fn ().oldFn ();
}