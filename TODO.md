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
			 * 	private function example (){
			 *		$ ('body')
			 * 			.on ('click', bodyClick)
			 * 			.off ('click', bodyClick);
			 * 	}
			 * 	
			 */
		V static private and object locked conflict
		V function expression without args
		V new operator instead of "in"
		F check for order of super constructor call and initialization
		- convert member expression for static private to identifier
		- processSuperExpression: add check if static method is processing
		- prevent binded functions processing
		- prevent functions with "call" or "apply" processing
		- add interfaces
		- add implementeds
			- implementeds generator
			- save already added helpers
				? with cool macros
		- throw error if "return" found in contructor
		- improve search of call of super method in contructor
		- improve errors report
		- anonymous classes
		- "super;" ⇒ "ParentClass.prototype.method.apply (this, arguments)"
		- initialization with constructor: for example, "var a = new A (){ objectField = value; for (var i = 0; i < 10; i ++) something ++ }"
		- processing default fields initializations
		- partial classes
		L special access like ['field' + name] support
		? kind of multiple inheritance
		? if Js-Ext could use getters, add initialize only on first access
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
	V array initializer operator
		V with function
	V convert [].forEach into Array.prototype.forEach and stuff
	V new loop: for-in-object
	F default arguments to constuctor
	F import with dot in name
	F import folders
	F shit with functions (callable declarations)
	F improve errors detect for function or lambda body and stuff
	- arguments support
	- randomized names
	- object initializer features
	- uglifyjs
	- correct macro parsing errors (filename, linenumber, etc.)
	- errors handling
	L syntax highlight and stuff support for sumlime text
	L build for npm
	L enums
	L new generator with line number comments support
	L interfaces
	L override instruction
	L multifile classes
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