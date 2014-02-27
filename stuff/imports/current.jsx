@macro initialize {
	macro ('test:string', ['a', 'b:string'], 'b + a');
}()

@test (1, 5);
