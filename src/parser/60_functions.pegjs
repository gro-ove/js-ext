FunctionDeclaration
	= FunctionToken __ name:Identifier __ "(" __ params:FormalParameterList? __ ")" __ elements:PseudoBlock {
			return {
				type:     "Function",
				name:     name,
				params:   params !== null ? params : [],
				elements: elements
			};
		}

FunctionExpression
	= FunctionToken __ name:Identifier? __ "(" __ params:FormalParameterList? __ ")" __ elements:PseudoBlock {
			return {
				type:     "Function",
				name:     name,
				params:   params !== null ? params : [],
				elements: elements
			};
		}
	/ LambdaToken __ params:("(" __ FormalParameterList? __ ")")? __ elements:(Block / LambdaStatement) {
			return {
				type:     "Function",
				lambda:   true,
				params:   params && params [2] !== null ? params [2] : [ 'arg' ],
				elements: elements
			};
		}

FormalParameterList
	= head:FormalParameter tail:(__ "," __ FormalParameter)* {
			var result = [head];
			for (var i = 0; i < tail.length; i++) 
				result.push(tail[i][3]);
			return result;
		}

FormalParameter
	= name:Identifier __ "=" __ value:AssignmentExpression {
		return {
			name: name,
			value: value
		}
	}
	/ Identifier
	