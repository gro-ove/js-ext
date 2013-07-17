// ==Jsx==
// @import modules-public
// @modules-public on
// ==/Jsx==

module Test {
	export function hi (){
		console.log ('hi');
	}
}

forceInit ();
getModule ('Test').hi ();

/*String.prototype.format.add ('j', function (v, params){
	return v [params];
});

String.prototype.format.add ('@', lambda (v, p) v [p [0].toLowerCase ().replace (/_[a-z]/g, lambda arg [1].toUpperCase ())]);

console.log ('{0:@(HI)}'.format ({ hi: 1024 }));

/*var a = [1, 2, 3, 4];

for (i in a)
	console.log (i);

for (i, o in a){
	console.log (o);
}*/