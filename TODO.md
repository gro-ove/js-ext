# TODO
	V Classes
		V arguments to exclusions list
		V classes extends
		V initialization order
		V static classes
		V private and protected variables
		V static variables
		V initialization statement
		V super requested in constuctors
		V check for parent class static field change
		V names fix
		F check for order of super constructor call and methods initialization
		F static private and object locked conflict
		F this support
		F special access like ['field' + name] support
		F renaming private and protected variables
		- interfaces
			- interfaces generator
		- abstract classes
		- short syntax
		- anonymous classes
		- initialization with constructor: for example, "var a = new A (){ objectField = value; for (var i = 0; i < 10; i ++) something ++ }"
		- processing default fields initializations
		? binded functions fixed 
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
		? kind of multiple inheritance 
	V notimplemented operator
	V strings format
	V macros
		V macros as macros arguments
		V macros arguments
		V source code as macros arguments
			V crazy source code support
		V macros in macros result
		V one macro can call another
		V macros asynchronous
		V macros à la functions syntax
			V one-line
			V blocks
			L default arguments values
		V fix strange numbers
		V add types to arguments
		V add types to macro's result
		V liteparser: regexp support
		F fix 
		- macros definion in macros
		L anonynous macros
		? macros order and stuff
		? parsing with awesome parser
	V update readme
	V including
		L with new innovative caching
	V fix lambdas
	V one-line functions with result
	V functions without arguments
	V syntax like "function name (){ ... }()" support
	V saving result and stuff
	V fix this.privatefield access
	F fix default arguments to constuctor
	F fix overrided protected functions
	F import with dot in name
	F import folders
	- arguments support
	- uglifyjs
	- array initializer operator
	- errors handling
	L syntax highlight and stuff support for sumlime text
	L build for npm
	L enums
	L new generator with line number comments support
	L interfaces
	L override instruction
	L multifile classes
	L new loop: for-in-only
	L inner classes
	L warnings
	L ie8 compilation mode
	? instuctions to parser or something in comments (developer will generate them with macros)
	? override parser functions by comments (and again, with macros)
	? override application functions (in result, i can add warnings support as set of macros)

# Letters
	- something to do
	L later
	? not sure about it
	V done
	F fixme
	X not needed (but, maybe, one day...)