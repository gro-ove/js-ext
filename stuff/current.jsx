// ==Jsx==
// @macro const 20
// @macro test '`%0`'(new Date)
// @macro time '`%0`'(new Date (args [0]))
// @macro json JSON.stringify (args)
// ==/Jsx==

// @macro const = 20;
// @macro time = '`%0`'(new Date (args [0]));
// @macro json (){
// 	return str (JSON.stringify (args));
// }

// console.log (@json (10525, 0.18, 016, 0x15, 18e3, 18e+3, 18e-3, 'te\'\nst', `te

// 	st`, { a: 7, b: 8 }, {
// 		callSomething ();
// 	}));

// console.log (@const)

@macro const = 20;

console.log (@const);