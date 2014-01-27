// ==Jsx==
// @macros test '`%0`'(new Date)
// @macros time '`%0`'(new Date (arg))
// ==/Jsx==

console.log (@test);
console.log (@time (10525));