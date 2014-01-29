// var constTest 			= @const,
// 	numberArgTest 		= @argsTest (0),
// 	stringArgTest 		= @argsTest ('string'),
// 	objectArgTest 		= @argsTest ({ a: 7 }),
// 	macroArgTest 		= @argsTest (@const);

{
	console.log (@const);
	@macro const 25;
}

@macro const 20;
// @macro argsTest JSON.stringify (arg);