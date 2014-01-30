var constTest 			= @const,
	numberArgTest 		= @argsTest (0),
	stringArgTest 		= @argsTest ('string'),
	objectArgTest 		= @argsTest ({ a: 7 }),
	macroArgTest 		= @argsTest ({ constValue: @const }),
	multiArgTest 		= @multiArgsTest (1, 2, 3);

@macro const 20;

{
	console.log (@const);
	@macro const 25;
}

@macro argsTest JSON.stringify (arg);
@macro multiArgsTest (a, b, c) JSON.stringify ([ a, b, c ]);