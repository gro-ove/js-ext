# TODO
	V classes
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
		V this support
		V renaming private and protected variables
		V abstract classes
		V short syntax
		V binded functions fixed 
			/*
			 * 	...
			 * 	
			 * 	private example (){
			 *		$ ('body')
			 * 			.on ('click', onClick)
			 * 			.off ('click', onClick);
			 * 	}
			 *
			 *	private onClick (event){ ... }
			 * 	
			 */
		V static private and object locked conflict
		V function expression without args
		V new operator instead of "in"
		V convert member expression for static private to identifier
		V processSuperExpression: add check if static method is processing
		C if default fields initializations
		- add interfaces
		- add implementeds
			- implementeds generator
			- set marks for already existings helpers
				? with cool macros
		- throw error if "return" found in contructor
		- improve search for super method call in contructor
		- anonymous classes
		- "super;" ⇒ "ParentClass.prototype.method.apply (this, arguments)"
		- initialization with constructor: for example, "var a = new A (){ objectField = value; for (var i = 0; i < 10; i ++) something ++ }"
		- partial classes
		L inner classes
		? add access like "other.privateMethod"
		? kind of multiple inheritance
		? add class initialize only on first access (getters needed)
		X add access like ['field' + name] support
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
		V arguments with callback bug
		V anonynous macros
		V macros definion in macros
		- fix macro parsing errors (filename, linenumber, etc.)
		L macros order
		? parsing with awesome parser
	V update readme
	V including
	V fix lambdas
	V one-line functions with result
	V functions without arguments
	V saving result and stuff
	V fix this.privatefield access
	V array initializer operator
		V with function
	V convert [].forEach into Array.prototype.forEach and stuff
	V new loop: for-in-object
	V syntax highlight and stuff support for sumlime text
	V default arguments to constuctor
	V new generator 
		- with line number comments support
	F import with dot in name
	F import folders
	- syntax like "function name (){ ... }()" support
	- command line arguments
	- uglifyjs
	- getters and setters for objects
	- errors handling
	- enums
	- caching
		- available for macros
		- for files without macros
		- for files without macro calls
		X for everything
	L npm
	L warnings
	? ie8 compilation mode
	? types check
		? functions with same name but different sets of arguments
	? something like junit
	? randomized names
	? override js-ext functions (then will be possible to add warnings and tests from macros!)
		? override functions of js-ext parser (new elements from macros! change existings elements from macros!)
	? or instuctions to parser or something in comments (developer will generate them with macros)
		- macro for override instruction

# Letters
	- something to do
	L later
	C check something for bugs
	? not sure about it
	V done
	F fixme
	X not needed (but, maybe, one day...)