class First {
	static var cat = 'Meow?';

	dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';
	private var horse = 'IGOGO, MOTHERFUCKERS!';

	(dog){
		console.log ('.', '"First" says "Hi!"');
		this.dog = dog + ' (' + cat + ')';
		console.log ('.', '.', this.dog);
	}

	public cow (){
		console.log ('.', 'Mo-o-o-o from "First".');
	}
}

public class Second extends First {
	private static var cat = 'Meow!';
	protected static dog = 'WOOF! WOOF! WOOF!';
	var horse = 'Horse, tazshemta';

	whoIsIt (){
		console.log ('.', 'Michael Jackson, for example');
		console.log ('.', 'Or cat:', cat);
		console.log ('.', 'Or dog:', dog);
		console.log ('.', 'Or horse:', horse);
	}

	eat (){
		console.log ('.', 'Wow, yammy!');
	}

	abstract protected sleep (){
		console.log ('.', 'Z-z-z-z...');
	}

	abstract protected poop ();
}

public class Third extends Second {
	eat (){
		super;
		console.log ('. .', 'And chew-chew-chew!');
	}

	sleep (){
		super;
		console.log ('. .', 'Now with 20% more snoring!');
	}

	poop (){
		console.log ('.', 'E-e-e-w.');
	}
}

protected class Fourth extends Third {
	(){
		super ('Dogs don\'t say "KRAKOZYABRA"');
		console.log ('.', '"Fourth" in da house.');
	}

	public poop ()
		console.log ('.', 'I won\'t do it, I\'m hungry and it is disgusting!');
}

{
	var c;

	console.log ('Here come "First"!');
	new First ('What do dogs say?');

	console.log ('And now — "Second"!');
	try
		new Second ('Nothing here.');
	catch
		console.log ('.', '"Second" is too tired: ' + e.message);

	console.log ('Next is "Third"!');
	c = new Third ('What do dogs say? Last try!');

	console.log ('"Third" has something to eat!');
	c.eat ();

	console.log ('Now he wants to sleep!');
	c.sleep ();

	console.log ('Isn\'t he cute? And now this adorable thing just choose to make THE BIGGEST PIECE OF SHIT I EVER SAW!');
	c.poop ();

	console.log ('And now "Third" has something to tell us! "Third", who is it?');
	c.whoIsIt ();

	console.log ('And, finally, "Fourth".');
	c = new Fourth ();

	console.log ('Okay, give us some your regular crap.');
	c.poop ();
}