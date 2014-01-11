// ==Jsx==
// @define TEST_OTHER   'qwerty'  
// @define TEST         20
// @define TEST_NEW     qwerty
// ==/Jsx==

console.log (TEST);
console.log ('TEST_NEW');
console.log (TEST_OTHER);
console.log ('TEST_NEW TEST_OTHER TEST');
	

/*{Result-Begin}
20
qwerty
qwerty
qwerty 'qwerty' 20
{Result-End}*/
