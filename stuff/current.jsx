var a = lambda (test){ result },
	b = lambda { result },
	c = lambda result,
	d = lambda if (a){ b, c },
	e = lambda a + b;

var f = lambda {
		a: a,
		b: b
	};

var a = [ lambda a, lambda b ];

[ lambda if (t) a else b, lambda if (q) return b ]