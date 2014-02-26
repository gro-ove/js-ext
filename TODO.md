# TODO
	V Classes
		V Arguments to exclusions list
		V Classes extends
		V Initialization order
		V Static classes
		V Private and protected variables
		V Static variables
		V Initialization statement
		V Super requested in constuctors
		F Check for parent class static field change
		F Check for order of super constructor call and methods initialization
		F Names fix
		F Static private and object locked conflict
		- Interfaces
		- Abstract classes
		- Short syntax
		- Anonymous classes
		- Initialization with constructor: for example, "var a = new A (){ objectField = value }"
		- This support
		- Special access like ['field' + name] support
		- Renaming private and protected variables
		? Binded functions fixed 
			/*
			 * 	...
			 * 	
			 * 	private function example (){
			 *		$ ('body')
			 * 			.on ('click', bodyClick)
			 * 			.off ('click', bodyClick);
			 * 	}
			 * 	
			 */
		? Kind of multiple inheritance 
	V NotImplemented operator
	V Strings format
	V Macros
		V Macros as macros arguments
		V Macros arguments
		V Source code as macros arguments
			V Crazy source code support
		V Macros in macros result
		V One macro can call another
		V Macros asynchronous
		V Macros à la functions syntax
			V One-line
			V Blocks
			L Default arguments values
		V Fix strange numbers
		V Add types to arguments
		V Add types to macro's result
		V LiteParser: RegExp support
		- Macros definion in macros
		L Anonynous macros
		? Macros order and stuff
		? Parsing with awesome parser
	V Update README
	V Including
		L With new innovative caching
	V Fix lambdas
	V One-line functions with result
	V Functions without arguments
	V Syntax like "function name (){ ... }()" support
	V Saving result and stuff
	F Fix default arguments to constuctor
	F Fix this.privateField access
	F Fix overrided protected functions
	F Import with dot in name
	F Import folders
	- Arguments support
	- UglifyJS
	- Array initializer operator
	- Errors handling
	L Syntax highlight and stuff support for Sumlime Text
	L Build for NPM
	L Enums
	L New Generator with line number comments support
	L Interfaces
	L Override instruction
	L Multifile classes
	L New loop: for-in-only
	L Inner classes
	L Warnings
	L IE8 compilation mode
	? Instuctions to parser or something in comments (developer will generate them with macros)
	? Override parser functions by comments (and again, with macros)
	? Override application functions (in result, I can add Warnings support as set of macros)

# Letters
	- 	Something to do
	L 	Later
	? 	Not sure about it
	V 	Done
	F 	Fixme
	X 	Not needed (but, maybe, one day...)