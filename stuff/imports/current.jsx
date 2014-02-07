/*{
	@macro param (key, value){
		params.add (key, value);
	}

	@param ('import', 'other');
}*/

@macro time new Date ().getMinutes ();
var current_t = @time;

@macro arg 1000 + arg;
var current_o = @arg (1);

var current_to = @arg (@time);
