Module
	= ModuleToken __ name:Identifier __ "{" __ elements:(ModuleElement __)* "}" {
			return {
				type:     "Module",
				name:     name,
				elements: elements.map (function (arg){ return arg [0] })
			};
		}

ModuleElement
	= ImportStatement
	/ ModuleVariableStatement
	/ ModuleFunctionDeclaration

ImportStatement
	= ImportToken __ imports:ImportDeclarationList EOS { return { type: "ImportStatement", declarations: imports } }

ImportDeclarationList
	= head:ImportDeclaration tail:(__ "," __ ImportDeclaration)* {
			var result = [head];
			for (var i = 0; i < tail.length; i++) 
				result.push(tail[i][3]);
			return result;
		}

ImportDeclaration
	= weak:"@"? name:Identifier { return { name: name, strong: !weak } }

ModuleVariableStatement
	= export_:(ExportToken __)? variables:VariableStatement { 
		variables ['export'] = !!export_;
		return variables;
	}

ModuleFunctionDeclaration
	= export_:(ExportToken __)? fn:FunctionDeclaration { 
		fn ['export'] = !!export_;
		return fn;
	}