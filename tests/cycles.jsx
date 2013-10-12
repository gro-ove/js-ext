for (var n in {
	a: 100,
	b: 102,
	c: 104,
	d: console.log ('n-0') || 106
})
	console.log (n);

for (var i, k in {
	a: 100,
	b: 102,
	c: 104,
	d: console.log ('n-1') || 106
})
	console.log (i, k);

for (var i, k in-array [ 100, 102, 104, console.log ('n-2') || 106 ])
	console.log (i, k);

for (var k in-array [ 100, 102, 104, console.log ('n-3') || 106 ])
	console.log (k);

for (var n in-array 'qwerty')
	console.log (n);

for (var n, e in-array 'qwerty')
	console.log (n, e); 

/*{Result-Begin}
n-0
a
b
c
d
n-1
a 100
b 102
c 104
d 106
n-2
0 100
1 102
2 104
3 106
n-3
100
102
104
106
q
w
e
r
t
y
0 'q'
1 'w'
2 'e'
3 'r'
4 't'
5 'y'
{Result-End}*/
