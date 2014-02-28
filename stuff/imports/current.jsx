class First {
	static var cat = 'Meow?';

	dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';

	(dog){
		console.log ('.', '"First" says "Hi!"');
		this.dog = dog + ' (' + cat + ')';
		console.log ('.', '.', this.dog);
	}

	public cow {
		console.log ('.', 'Mo-o-o-o from "First".');
	}
}

public class Second extends First {
	private static var cat = 'Meow!';
	protected static dog = 'WOOF WOOF WOOF';
	var horse = 'Horse, tazshemta';

	whoIsIt {
		console.log ('.', 'Michael Jackson, for example');
		console.log ('.', 'Or cat:', cat);
		console.log ('.', 'Or dog:', dog);
		console.log ('.', 'Or horse:', horse);
	}

	eat (){
		console.log ('.', 'Wow, yammy!');
		console.log ('.', '.', sleep ());
		console.log ('.', '.', poo ());
		return this;
	}

	abstract protected sleep (){
		console.log ('.', 'Z-z-z-z...');
	}

	abstract protected poo ();
}

public class Third extends Second {
	eat (){
		super;
		console.log ('.', 'And chew-chew-chew!');
	}

	sleep (){
		super;
		console.log ('.', 'Now with 20% more snoring!');
	}

	poo (){
		console.log ('.', 'E-e-e-w.');
	}
}

protected class Fourth extends Third {
	(){
		super ('Dogs don\'t say "KRAKOZYABRA"');
		console.log ('.', '"Fourth" in da house.');
	}

	poo ()
		console.log ('.', 'I won\'t do it, I\'m hungry and it is disgusting!');
}

{
	console.log ('Here come "First"!');
	new First ('What do dogs say?');

	console.log ('And now — "Second"!');
	try
		new Second ('Nothing here.');
	catch
		console.log ('.', '"Second" is too tired: ' + e.message);

	console.log ('Next is "Third"!');
	new Third ('What do dogs say? Last try!').eat ();

	console.log ('And, finally, "Fourth".');
	new Fourth ().poo ();
}