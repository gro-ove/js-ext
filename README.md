# js-ext

### What this is

This is a another preprocessor for JavaScript. Based on [Esprima](https://github.com/ariya/esprima) and using [UglifyJS2](https://github.com/mishoo/UglifyJS2) to compress result.

### Project status

New version is coming soon, with new features.

### Features

#### 1. Lambda-functions

	setTimeout (lambda doSomething (argument), 1000);
	
	[ 1, 2, 3 ].map (lambda arg * 2);     
	// [2, 4, 6]
	
	[ 1, 2, 3 ].forEach (lambda (v, i) console.log (i + ': ' + v))
	// 0: 1, 1: 2, 2: 3

#### 2. Default argument values

	function test (a = 100, b = getValue ()){
		...
	}

#### 3. Multiline strings

	var text = `bla-bla-bla
				bla-bla-bla`;
	
#### 4. Different way to write

	try
		throw new Error ();
		
	try
		throw new Error ();
	catch
		console.log (e);
		
	function sqr (v)
		v * v;

#### 5. More cycles

	for (var key, value in { a: 1, b: 2, c: 3, d: 4 })
		console.log (key + ' → ' + value); 

	for (var value in-array [ 'a', 'b', 'c' ])
		console.log (value);

	for (var i, value in-array [ 'a', 'b', 'c' ])
		console.log (i, value);

#### 6. Macros
###### NEW

	@macro const 20;

	console.log (@const);

	@macro loadFromFile (file){
		return {
			type: 	ReturnType.String,
			value: 	fs.readFileSync (path.resolve (context.file.dirname, file))
		}
	}

	console.log (@loadFromFile ('../release-notes.txt'));
				
#### 7. Classes 
###### NEW

	class Test use Main {
		static public var something = Main.value + 'value';

		protected var a = 'protected';
		
		private function get (){
			console.log (something);
		}
		
		(){
			get ();
		}
	}
	
	class Other extends Text {
		static {
			something = 'modified';
		}

		var value;
		
		(value){
			this.value = value;
			console.log (a, Main.staticFunction ());
		}
	}

	static class Main {
		public var value = 'mainValue';

		public function staticFunction (){
			return 'Hello from Main';
		}
	}

	{
		console.log (new Other () instanceof Other);
		// true
	}
		
#### 8. Build-in string formatting 
###### NEW
	
	console.log ('Something: %0, "%1", (%2), \'%3\'.' (firstValue, secondValue, thirdValue, forthValue));

#### 9. Cool operator from Perl 
###### NEW
	
	if (featureNotImplemented)
		...

#### 10. Arrays initialization:
###### NEW
	
	var zeroToTen 	= [ 0 .. 10 ],
		aToZ 		= [ 'a' .. 'z' ],
		oneToVar 	= [ 1 .. value ];
		
#### 11. Full backward compatibility (with default JavaScript):

	Of course, if you are not going to use such keywords as "lambda", "class", "use" or something else.

### Usage, documentation, how to install

	Coming soon.
