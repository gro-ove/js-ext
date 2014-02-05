@macro param (key, value){
	params.add (key, value);
}

@param ('import', 'other');

@macro time +new Date;
var current_t = @time;
