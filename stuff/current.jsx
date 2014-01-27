// ==Jsx==
// @macro test '`%0`'(new Date)
// @macro time '`%0`'(new Date (args [0]))
// @macro json JSON.stringify (args)
// ==/Jsx==

 console.log (@json (10525, 0.18, 016, 0x15, 18e3, 18e+3, 18e-3, 'te\'\nst', `test`, '{ a: 7, b: 8 }'));