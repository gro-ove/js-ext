var a1 = { a: 1, b: 2, c: 3 },
	a2 = { a: 'a', b: 'b', c: 'c' },
	a3 = [ 1, 2, 3, 4 ],
	a4 = [ 'a', 'b', 'c' ];

for (var n in a1) console.log (n);
for (n in a2) console.log (n);

for (var n, v in a1) console.log (n);
for (n, v in a2) console.log (n);

for (var n in-array a3) console.log (n);
for (n in-array a4) console.log (n);

for (var n, v in-array a3) console.log (n);
for (n, v in-array a4) console.log (n);

for (n, v in { a9: 7 }) console.log (n);
for (v in { a10: 7 }) console.log (n);

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
a
b
c
a
b
c
a
b
c
a
b
c
1
2
3
4
a
b
c
0
1
2
3
0
1
2
a9
a9
n-0
a
b
c
d
n-1
n-1
a 100
n-1
b 102
n-1
c 104
n-1
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
