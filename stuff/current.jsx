// ==Jsx==
// @macros test '`%0`'(new Date)
// @macros time '`%0`'(new Date (args [0]))
// @macros json JSON.stringify (args)
// ==/Jsx==

console.log (@json (10525, 0.18, 016, 0x15, 18e3, 18e+3, 18e-3, 'te\'\nst', `te

	st`, { a: 7, b: 8 }));