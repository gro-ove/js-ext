function off (){
	setTimeout (lambda {
		if (!global.mustacheEntries)
			global.mustacheEntries = [];

		if (to === undefined)
			to = 'Mustache';

		var result 	= 'if (!window.%0) window.%0 = {};\n' (to),
			regExp 	= new RegExp ('\\{\\{([!@#\\^\\/&\\{]?)([^\\}]+)\\}?\\}\\}', 'i'),
			str 	= JSON.stringify.bind (JSON),
			last 	= 0,
			left;

		function identifier (obj, what)
			obj + (/[_$a-zA-Z][_$a-zA-Z0-9]*/.test (what) ? '.%0' (what) : '[%0]' (str (what)));

		function preprocess (entry){
			var template 	= str (entry.value.replace (/\{\{\s+\}\}/g, ' ').replace (/[\n\r\t ]+/g, ' ').replace (/(\}\}|>) (\{\{|<)/g, '$1$2').replace (/ +/g, ' ')),
				pos 		= 0,
				apply 		= true,
				opened 		= [],
				closed 		= [],
				size,
				temp;

			function next (){
				var substr 	= template.substr (pos),
					next 	= substr.search (regExp),
					match;

				if (next === -1){
					return false;
				} else {
					pos    += next + 1;
					match 	= substr.match (regExp);
					size 	= match [0].length;
					return match;
				}
			}

			function replace (what){
				template = template.substr (0, pos - 1) + what + template.substr (pos - 1 + size);
				pos --;
			}

			while (next ()){
				if (RegExp.$1 !== '!'){
					temp = RegExp.$2.trim ();

					if (temp [0] === '.' && temp.length 1 || temp.length < 1 || temp.indexOf ('..') !== -1)
						throw new Error ('Bad value (%0, "%1")' (entry.key, RegExp.$2));

					temp = str (temp.indexOf ('.') 0 ? temp.split ('.') : temp);
				}

				switch (RegExp.$1){
					case '!':
						replace ('');
						break;
					case '@':
					case '#':
					case '^':
						opened.push ({
							type: 	RegExp.$1,
							key: 	RegExp.$2
						});

						replace ('" + %0 (%1, function (){ return "' (RegExp.$1 === '@' ? 'yes' : RegExp.$1 === '#' ? 'sub' : 'no', temp));

						apply = false;
						break;
					case '/':
						var last = opened.pop ();

						if (!last)
							throw new Error ('Opening tag not found (%0, "%1")' (entry.key, RegExp.$2));

						if (last.key !== RegExp.$2)
							throw new Error ('Wrong closing tag (%0, "%1")' (entry.key, RegExp.$2));

						replace ('"; }) /* %0%1 */ + "' (last.type, last.key));
						break;
					case '&':
					case '{':
						apply = false;
						replace ('" + get (%0) + "' (temp));
						break;
					default:
						apply = false;
						replace ('" + html (%0) + "' (temp));
				}
			}

			template = template
				.split ('+ "" +').join ('+')
				.split ('return "" + ').join ('return ')
				.split ('+ "";').join (';')
				.replace (/function \(\)\{ return ("([^\\"]\\"|[^"])+"); \}/g, '$1')
				.replace (/\) \/\* @([^\s]+) \*\/ \+ no \("\1", /g, ', ')
				.replace (/\) \/\* \^([^\s]+) \*\/ \+ yes \("\1", /g, ', ')
				.replace (/^"" \+ | \+ ""$/g, '');

			if (apply){
				result += '%0 = function (){ return %1 };\n' (identifier (to, entry.key), template);
				entry.done = true;
			} else
				entry.template = template;
		}

		for (var entry in-array global.mustacheEntries)
			preprocess (entry);

		left = global.mustacheEntries.filter (lambda !arg.done);
		if (left.length){
			result += `
				(function (){
					var entityMap 		= { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#x2F;" }, 
						escapeRegExp 	= new RegExp ('[&<>"\'\\/]', 'g'),
						contexts 		= new Array (32), 
						contextsSize,
						pos, 
						size;

					function sub (key, fn){ 
						var target = get (key, true),
							result,
							current;

						if (target !== null && target !== undefined && target !== false){ 
							current = contextsSize;
							contextsSize ++;

							if (target instanceof Array){ 
								result = ""; 

								for (var i = 0, n = target.length; i < n; i ++){ 
									pos 	= i;
									size 	= n;

									contexts [current] = target [i]; 
									result += typeof fn === 'string' ? fn : fn () 
								} 
							} else { 
								contexts [current] = target;
								result = typeof fn === 'string' ? fn : fn (); 
							} 

							contextsSize --; 
							return result 
						} else 
							return "" 
					}

					function empty (value, extended)
						value === undefined || value === null || extended && (value === false || value instanceof Array && value.length === 0)

					function string (value, raw)
						raw ? value : empty (value) ? '' : String (value)

					function yes (key, fn, other){
						var temp = get (key, true);
						if (!empty (temp, true))
							return fn ? typeof fn === 'string' ? fn : fn () : '';
						else
							return other ? typeof other === 'string' ? other : other () : '';
					}

					function no (key, fn, other)
						yes (key, other, fn);

					function get (key, raw){ 
						if (key [0] === '%')
							switch (key){
								case '%first':
									return string (pos === 0, raw);
								case '%second':
									return string (pos > 0, raw);
								case '%last':
									return string (pos === size - 1, raw);
							}

						if (key instanceof Array){
							var temp = get (key [0], true);
							for (var i = 1; i < key.length && temp; i ++)
								temp = temp [key [i]];
							return string (temp, raw);
						} else if (key === "."){ 
							return string (contexts [contextsSize - 1], raw) 
						} else { 
							for (var i = contextsSize - 1; i >= 0; i --) 
								if (contexts [i] && contexts [i][key] !== undefined) 
									return string (contexts [i][key], raw); 
							return raw ? undefined : "" 
						} 
					}

					function html (key)
						get (key).replace (escapeRegExp, lambda entityMap [arg])`

			for (var i, entry in-array left)
				result += `
					%0 = function (){ 
						contextsSize = 0;
						for (var i = 0; i < arguments.length; i ++)
							if (arguments [i] !== undefined){
								contexts [contextsSize] = arguments [i];
								contextsSize ++;
							}
						return %1 
					};` (identifier (to, entry.key), entry.template);

			result += `
				})()`;
		}

		cb (result);
	}, 500);	// TODO: FIXME: AWFUL CODE!
}