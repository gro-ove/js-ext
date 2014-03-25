**Js-Ext** (BSD license) is another preprocessor, which adds syntactic sugar to the regular JavaScript. It has some cool
features like macros or classes, some of them are described below.

**Js-Ext** written in Js-Ext and runs on [Node.js](http://nodejs.org/).

### Usage

Coming soon.

### Features

##### 1. Macros
###### NEW

	/*
		Executing on preprocessing.
	*/

	@macro const 20;

	console.log (@const);

	@macro loadFromFile:raw (file, callback){
		fs.readFile (file, function (error, data){
			if (!error)
				callback ('console.log (' + JSON.stringify (data) + ');');
			else
				callback ('');
		});
	}

	@loadFromFile ('../release-notes.txt');

##### 2. Classes
###### NEW

	/*
		Almost like Java classes; will be converted to JavaScript prototypes.
	*/

	static class Previous {
		public var value = 'valueFromPrevious';

		public staticMethod ()
			return 'Hello from Previous';
	}

	class Parent {
		static public parentStaticField = Previous.value;

		protected parentField = 'protected field';
		
		private get (){
			console.log (parentStaticField);
		}
		
		(){
			console.log ('Parent constructor');
			get ();
		}
	}
	
	class Child extends Parent {
		static {
			parentStaticField = 'modified';
		}

		var value;
		
		(value){
			this.value = value;
			console.log (
				'Child constructor', 
				parentField, 
				Previous.staticMethod ());
		}
	}

	console.log (new Child () instanceof Parent);
		
#### 3. Build-in string formatting 
###### NEW

	/*
		Will be transformed to concatenation.
	*/
	
	console.log ('Something: %0, "%1", (%2), \'%3\'.' (a, b, c, d));
	
#### 4. Shorter ways to write
	
	[ 1 .. 10 ] 				 	// Array with elements from 1 to 10.
		.map (lambda arg * 2) 	  	// Shorter way to create anonymous function.
		.concat (lambda (a, b){     // Lambdas can have arguments and body.
			... 					// Operator from Perl.
		}); 
		
	function sqr (v)				// Functions can contain only one statement.
		v * v;

	function test (a = 100, b){		// And can have default values of arguments.

		try 						// In my opinion, it is convenient,
			throw new Error (); 	// but use it carefully.
			
		try 						// This one is better.
			throw new Error ();
		catch
			console.log (e);

	}

	for (var k, v in { 				// And new loops.
			a: 	1 					// Objects and arrays could be initialized without commas.
			b: 	2
			c: 	3
			d: 	4 
		})
		console.log (key + ' → ' + value); 

	for (var v in-array [ 'a' .. 'z' ])
		console.log (v);

	for (var i, v in-array [ 1 .. numberVariable ])
		console.log (i, v);

##### 5. Almost full backward compatibility with regular JavaScript Code

	Of course, if you are not going to use such keywords as "uses", "class", "lambda" or something like this.