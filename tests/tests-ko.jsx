/* tests with --keep-order */
@buildTo ('./temp/tests-ko.js')

@macro output:raw-nm (args:raw){
    return 'log ([ %0 ])' (args);
}

@macro test:raw-nm (name:string, args:raw, code:raw){
    return `(function (result){
        var missed = false;
        (function %2 (log) %0)(function (args){
            var expected = JSON.stringify (result.shift ()),
                got = JSON.stringify (args);
            if (expected === undefined){
                if (!missed){
                    console.log ('Missing entry:');
                    missed = true;
                }

                var temp = [];
                console.log ('\t' + got
                    .replace (/"((?:\\"|[^"])+)"/g, lambda (m, s) '\'' + temp.push (s) + '\'')
                    .replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2')
                    .replace (/'(\d+)'/g, lambda (m, s) '\'' + temp [+s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\''));
            } else if (expected !== got)
                throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);
        });
        console.log ('[Testing] Test "%1" has been passed');
    })([%3])` (code, name, 'test_' + name.replace (/[^a-zA-Z_$]+/g, '_').toLowerCase (), args.slice (1, -1).trim ().replace (/\n/g, ','));
}

@test ('Inner classes', {
    [ 'A' ]
    [ 'A.B' ]
    [ 'A.C' ]
    [ 'B' ]
    [ 'A.C' ]
}, {
    class B {
        {
            @output { 'B' };
        }
    }

    class A {
        class B {
            {
                @output { 'A.B' };
            }
        }

        external class C {
            {
                @output { 'A.C' };
            }
        }

        {
            @output { 'A' };
            new B();
            new C();
        }
    }

    var a = new A ();
    var b = new B ();

    var ac = new A.C();
});

@test ('Partial classes', {
    [ 'A', 5, 6 ]
}, {
    partial class A {
        var ia = 5;
    }

    partial class A {
        var ib = 6;
        {
            @output { 'A', ia, ib };
        }
    }

    var a = new A ();
});

@test ('Inner partial classes', {
    [ 'A' ]
    [ 'A.C', 5, 6 ]
    [ 'A.C', 5, 6 ]
}, {
    class A {
        partial external class C {
            var ia = 5;
        }

        partial external class C {
            var ib = 6;
            {
                @output { 'A.C', ia, ib };
            }
        }

        {
            @output { 'A' };
            new C();
        }
    }

    var a = new A ();
    var ac = new A.C();
});

@test ('Inner partial classes in partial classes', {
    [ 'A' ]
    [ 'A.C', 5, 6, 8, 9 ]
    [ 'A.C', 5, 6, 8, 9 ]
}, {
    partial class A {
        partial external class C {
            public ia = 5;
            ja = 8;
        }
    }

    partial class A {
        partial external class C {
            public ib = 6;
            jb = 9;
            {
                @output { 'A.C', ia, ib, ja, jb };
            }
        }

        {
            @output { 'A' };
            new C();
        }
    }

    var a = new A ();
    var ac = new A.C();
});

@test ('Inner partial classes in partial classes with access to static method', {
    [ 'A' ]
    [ 'HERE' ]
    [ 'PUBLIC' ]
    [ 'A.C', 5, 6, 8, 9 ]
    [ 'HERE' ]
    [ 'PUBLIC' ]
    [ 'A.C', 5, 6, 8, 9 ]
}, {
    partial class A {
        static testu(){
            @output { 'HERE' };
        }

        static public testi(){
            @output { 'PUBLIC' };
        }
    }

    partial class A {
        partial external class C {
            public ia = 5;
            ja = 8;
        }
    }

    partial class A {
        partial external class C {
            public ib = 6;
            jb = 9;
            {
                testu();
                testi();
                @output { 'A.C', ia, ib, ja, jb };
            }
        }

        {
            @output { 'A' };
            new C();
        }
    }

    var a = new A ();
    var ac = new A.C();
});

@test ('Async method', {
    [ 'A' ]
    [ 'C' ]
    [ 'E' ]
    [ 'B', 15, 19 ]
    [ 'Z' ]
}, {
    function a(tt, callback){
        @output { 'C' };
        setTimeout(lambda callback(tt + 14));
    }

    function test(qq) async {
        var q = qq + 10;
        @output { 'A' };
        //if (q > 10){ TODO?
            var n = async a(5);
        //}
        @output { 'B', q, n };
    }

    test(5, lambda {
        @output { 'Z' };
    });
    @output { 'E' };
});

@test ('There was a bug', {
    [ 2 ]
}, {
    static class A {
        public var list = 1;

        external class B {
            var list = 2;

            (){
                @output { list };
            }
        }
    }

    new A.B();
});