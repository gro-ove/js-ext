@macro const 20;
@macro argsTest JSON.stringify (arg);
@macro multiArgsTest (a, b, c) JSON.stringify ([ a, b, c ]);
@macro areasTest '@const';

var constTest 			= @const,
	numberArgTest 		= @argsTest (0),
	stringArgTest 		= @argsTest ('string'),
	objectArgTest 		= @argsTest ({ a: 7 }),
	macroArgTest 		= @argsTest ({ constValue: @const }),
	multiArgTest 		= @multiArgsTest (1, 2, 3);

@macro enumMacro (arg){
	var result = {};

	console.assert (typeof arg === 'string', 'Argument must be string');
	arg.split (',').map (lambda (arg) arg.trim ()).forEach (lambda (arg) result [arg] = arg);

	return {
		type: 	ReturnType.Object,
		value: 	result
	};
}

var carOrDog = @enumMacro {
	Cat, 
	Dog, 
	CatDog
};

@macro crazyMacro (arg)
	{
		type: 	arg.indexOf ('STRING:') === -1 ? ReturnType.Raw : ReturnType.String,
		value: 	arg.match (/[^:]+$/)[0].split ('}').map (lambda (arg) arg.trim ()).join ('').replace (/#/g, ' ')
	};

var helloWorld = @crazyMacro {{
		STRING:
		H } e } l } l } o } # } w } o } r } l } d } !
	}};

{
	console.log (@const (), @argsTest ([ @const, @areasTest ]));
	console.log (@macroWhichUsingAnotherMacro);
	@crazyMacro {{ RAW: @ } c } o } n } s } t } # } /* } #IS IT EQUALS TO TWENTY FIVE?# } */ } }}

	@macro macroWhichUsingAnotherMacro (){
		return @argsTest ({ a: 18, b: @const, c: @argsTest ([ 'test' ]) });
	}
	@macro const 25;
}
