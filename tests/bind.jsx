// ==Jsx==
// @import utils/function.bind
// ==/Jsx==

var a = lambda {
	console.log (this.test);
}.bind ({ test: 100 });

var b = function (){
	console.log (this.test);
}.bind ({ test: 200 });

a ();
b ();

/*{Result-Begin}
100
200
{Result-End}*/
