// if ('console' !in GLOBAL)
// 	console.log ('none');
// else
// 	console.log ('found');

// if ('console' in-object GLOBAL)
// 	console.log ('found');
// else
// 	console.log ('none');

// if ('console' !in-object GLOBAL)
// 	console.log ('none');
// else
// 	console.log ('found');

for (key in JSON.parse ('{ "a": 19 }')){
	console.log ('IN:', key);
}

for (key in-object JSON.parse ('{ "a": 19 }')){
	console.log ('IN-OBJECT:', key);
}

for (key, value in JSON.parse ('{ "a": 19 }')){
	console.log ('IN:', key);
}

for (key, value in-object JSON.parse ('{ "a": 19 }')){
	console.log ('IN-OBJECT:', key);
}
