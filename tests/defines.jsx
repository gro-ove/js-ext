// ==Jsx==
// @define __TEST__ 20
// @define __TEST_OTHER__ 'qwerty'
// @define __TEST_NEW__ qwerty
// ==/Jsx==

console.log (__TEST__);
console.log ('__TEST_NEW__');
console.log (__TEST_OTHER__);
console.log ('__TEST_NEW__ __TEST_OTHER__ __TEST__');
	

/*{Result-Begin}
20
qwerty
qwerty
qwerty 'qwerty' 20
{Result-End}*/
