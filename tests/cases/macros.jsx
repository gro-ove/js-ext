@macro const 20;
@macro argsTest JSON.stringify (arg);
@macro multiArgsTest (a, b, c) JSON.stringify ([ a, b, c ]);
@macro areasTest '@const';
@macro areasOtherTest @const;

var constTest           = @const,
    numberArgTest       = @argsTest (0),
    stringArgTest       = @argsTest ('string'),
    objectArgTest       = @argsTest ({ a: 7 }),
    macroArgTest        = @argsTest ({ constValue: @const }),
    multiArgTest        = @multiArgsTest (1, 2, 3);

@macro enumMacro (arg, callback){
    var result = {};

    console.assert (typeof arg === 'string', 'Argument must be string');
    arg.split (',').map (lambda (arg) arg.trim ()).forEach (lambda (arg) result [arg] = arg);

    setTimeout (lambda {
        callback ({
            type:   ReturnType.Object,
            value:  result
        });
    }, 200);
}

var carOrDog = @enumMacro {
    Cat, 
    Dog, 
    CatDog
};

@macro crazyMacro (arg)
    {
        type:   arg.indexOf ('STRING:') === -1 ? ReturnType.RawWithMacros : ReturnType.String,
        value:  arg.match (/[^:]+$/)[0].split ('}').map (lambda (arg) arg.trim ()).join ('').replace (/#/g, ' ')
    };

var helloWorld = @crazyMacro {{
        STRING:
        H } e } l } l } o } # } w } o } r } l } d } !
    }};

{
    console.log (@const (), @argsTest ([ @time, @const, @areasTest, @areasOtherTest ]));
    console.log (@macroWhichUsingAnotherMacros, @timeout);
    @crazyMacro {{ RAW: @ } c } o } n } s } t } # } /* } #IS IT PSEUDOCONST?# } */ } }}

    @macro macroWhichUsingAnotherMacros (callback){
        @const (lambda (arg){
            callback (@argsTest ({ a: 18, b: arg, c: @argsTest ([ 'test' ]) }));
        });
    }
    @macro time +new Date % 10000 / 100 | 0;
    @macro const (callback) setTimeout (lambda callback (@time), 500); // NOT A CONST AT ALL
    @macro timeout (callback) setTimeout (lambda @const (callback), 500);
}
