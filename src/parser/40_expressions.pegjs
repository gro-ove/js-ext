PrimaryExpression
	= ThisToken       { return { type: "This" }; }
	/ name:Identifier { return { type: "Variable", name: name }; }
	/ Literal
	/ ArrayLiteral
	/ ObjectLiteral
	/ "(" __ expression:Expression __ ")" { return expression; }

ArrayLiteral
	= "[" __ data:ArrayElement* "]" {
		return {
			type: "ArrayLiteral",
			elements: data
		}
	}

ArrayElement
	= "," __ { return { type: "Variable", name: "undefined" } }
	/ data:AssignmentExpression __ ","? __ { return data }

ObjectLiteral
	= "{" __ data:ObjectElement* "}" {
		return {
			type: "ObjectLiteral",
			properties: data
		}
	}

ObjectElement
	= "," __ { return { type: "Variable", name: "undefined" } }
	/ data:PropertyAssignment __ ","? __ { return data }

PropertyAssignment
	= name:PropertyName __ ":" __ value:AssignmentExpression {
			return {
				type:  "PropertyAssignment",
				name:  name,
				value: value
			};
		}
	/ GetToken __ name:PropertyName __ "(" __ ")" __ body:PseudoBlock {
			return {
				type: "GetterDefinition",
				name: name,
				body: body
			};
		}
	/ SetToken __ name:PropertyName __ "(" __ param:Identifier __ ")" __ body:PseudoBlock {
			return {
				type:  "SetterDefinition",
				name:  name,
				param: param,
				body:  body
			};
		}

PropertyName
	= IdentifierName
	/ StringLiteral
	/ NumericLiteral

MemberExpression
	= base:(
				PrimaryExpression
			/ FunctionExpression
			/ NewToken __ constructor:MemberExpression __ args:Arguments {
					return {
						type:        "NewOperator",
						constructor: constructor,
						arguments:   args
					};
				}
		)
		accessors:(
				__ "[" __ name:Expression __ "]" { return name; }
			/ __ "." __ name:IdentifierName    { return name; }
		)* {
			var result = base;
			for (var i = 0; i < accessors.length; i++) {
				result = {
					type: "PropertyAccess",
					base: result,
					name: accessors[i]
				};
			}
			return result;
		}

NewExpression
	= MemberExpression
	/ NewToken __ constructor:NewExpression {
			return {
				type:        "NewOperator",
				constructor: constructor,
				arguments:   []
			};
		}

CallExpression
	= base:(
			name:MemberExpression __ args:Arguments {
				return {
					type:      "FunctionCall",
					name:      name,
					arguments: args
				};
			}
		)
		argumentsOrAccessors:(
				__ args:Arguments {
					return {
						type:      "FunctionCallArguments",
						arguments: args
					};
				}
			/ __ "[" __ name:Expression __ "]" {
					return {
						type: "PropertyAccessProperty",
						name: name
					};
				}
			/ __ "." __ name:IdentifierName {
					return {
						type: "PropertyAccessProperty",
						name: name
					};
				}
		)* {
			var result = base;
			for (var i = 0; i < argumentsOrAccessors.length; i++) {
				switch (argumentsOrAccessors[i].type) {
					case "FunctionCallArguments":
						result = {
							type:      "FunctionCall",
							name:      result,
							arguments: argumentsOrAccessors[i].arguments
						};
						break;
					case "PropertyAccessProperty":
						result = {
							type: "PropertyAccess",
							base: result,
							name: argumentsOrAccessors[i].name
						};
						break;
					default:
						throw new Error(
							"Invalid expression type: " + argumentsOrAccessors[i].type
						);
				}
			}
			return result;
		}

Arguments
	= "(" __ args:ArrayElement* __ ")" { return args }

LeftHandSideExpression
	= CallExpression
	/ NewExpression

PostfixExpression
	= expression:LeftHandSideExpression _ operator:PostfixOperator {
			return {
				type:       "PostfixExpression",
				operator:   operator,
				expression: expression
			};
		}
	/ LeftHandSideExpression

PostfixOperator
	= "++"
	/ "--"

UnaryExpression
	= PostfixExpression
	/ operator:UnaryOperator __ expression:UnaryExpression {
			return {
				type:       "UnaryExpression",
				operator:   operator,
				expression: expression
			};
		}

UnaryOperator
	= DeleteToken
	/ VoidToken
	/ TypeofToken
	/ "++"
	/ "--"
	/ "+"
	/ "-"
	/ "~"
	/  "!"

MultiplicativeExpression
	= head:UnaryExpression
		tail:(__ MultiplicativeOperator __ UnaryExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

MultiplicativeOperator
	= operator:("*" / "/" / "%") !"=" { return operator; }

AdditiveExpression
	= head:MultiplicativeExpression
		tail:(__ AdditiveOperator __ MultiplicativeExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

AdditiveOperator
	= "+" !("+" / "=") { return "+"; }
	/ "-" !("-" / "=") { return "-"; }

ShiftExpression
	= head:AdditiveExpression
		tail:(__ ShiftOperator __ AdditiveExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

ShiftOperator
	= "<<"
	/ ">>>"
	/ ">>"

RelationalExpression
	= head:ShiftExpression
		tail:(__ RelationalOperator __ ShiftExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

RelationalOperator
	= "<="
	/ ">="
	/ "<"
	/ ">"
	/ InstanceofToken
	/ InToken

RelationalExpressionNoIn
	= head:ShiftExpression
		tail:(__ RelationalOperatorNoIn __ ShiftExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

RelationalOperatorNoIn
	= "<="
	/ ">="
	/ "<"
	/ ">"
	/ InstanceofToken

EqualityExpression
	= head:RelationalExpression
		tail:(__ EqualityOperator __ RelationalExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

EqualityExpressionNoIn
	= head:RelationalExpressionNoIn
		tail:(__ EqualityOperator __ RelationalExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

EqualityOperator
	= "==="
	/ "!=="
	/ "=="
	/ "!="

BitwiseANDExpression
	= head:EqualityExpression
		tail:(__ BitwiseANDOperator __ EqualityExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

BitwiseANDExpressionNoIn
	= head:EqualityExpressionNoIn
		tail:(__ BitwiseANDOperator __ EqualityExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

BitwiseANDOperator
	= "&" !("&" / "=") { return "&"; }

BitwiseXORExpression
	= head:BitwiseANDExpression
		tail:(__ BitwiseXOROperator __ BitwiseANDExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

BitwiseXORExpressionNoIn
	= head:BitwiseANDExpressionNoIn
		tail:(__ BitwiseXOROperator __ BitwiseANDExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

BitwiseXOROperator
	= "^" !("^" / "=") { return "^"; }

BitwiseORExpression
	= head:BitwiseXORExpression
		tail:(__ BitwiseOROperator __ BitwiseXORExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

BitwiseORExpressionNoIn
	= head:BitwiseXORExpressionNoIn
		tail:(__ BitwiseOROperator __ BitwiseXORExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

BitwiseOROperator
	= "|" !("|" / "=") { return "|"; }

LogicalANDExpression
	= head:BitwiseORExpression
		tail:(__ LogicalANDOperator __ BitwiseORExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

LogicalANDExpressionNoIn
	= head:BitwiseORExpressionNoIn
		tail:(__ LogicalANDOperator __ BitwiseORExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

LogicalANDOperator
	= "&&" !"=" { return "&&"; }

LogicalORExpression
	= head:LogicalANDExpression
		tail:(__ LogicalOROperator __ LogicalANDExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

LogicalORExpressionNoIn
	= head:LogicalANDExpressionNoIn
		tail:(__ LogicalOROperator __ LogicalANDExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

LogicalOROperator
	= "||" !"=" { return "||"; }

ConditionalExpression
	= condition:LogicalORExpression __
		"?" __ trueExpression:AssignmentExpression __
		":" __ falseExpression:AssignmentExpression {
			return {
				type:            "ConditionalExpression",
				condition:       condition,
				trueExpression:  trueExpression,
				falseExpression: falseExpression
			};
		}
	/ LogicalORExpression

ConditionalExpressionNoIn
	= condition:LogicalORExpressionNoIn __
		"?" __ trueExpression:AssignmentExpressionNoIn __
		":" __ falseExpression:AssignmentExpressionNoIn {
			return {
				type:            "ConditionalExpression",
				condition:       condition,
				trueExpression:  trueExpression,
				falseExpression: falseExpression
			};
		}
	/ LogicalORExpressionNoIn

AssignmentExpression
	= left:LeftHandSideExpression __
		operator:AssignmentOperator __
		right:AssignmentExpression {
			return {
				type:     "AssignmentExpression",
				operator: operator,
				left:     left,
				right:    right
			};
		}
	/ ConditionalExpression

AssignmentExpressionNoIn
	= left:LeftHandSideExpression __
		operator:AssignmentOperator __
		right:AssignmentExpressionNoIn {
			return {
				type:     "AssignmentExpression",
				operator: operator,
				left:     left,
				right:    right
			};
		}
	/ ConditionalExpressionNoIn

AssignmentOperator
	= "=" (!"=") { return "="; }
	/ "*="
	/ "/="
	/ "%="
	/ "+="
	/ "-="
	/ "<<="
	/ ">>="
	/ ">>>="
	/ "&="
	/ "^="
	/ "|="

Expression
	= head:AssignmentExpression
		tail:(__ "," __ AssignmentExpression)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}

LambdaExpression
	= AssignmentExpression

ExpressionNoIn
	= head:AssignmentExpressionNoIn
		tail:(__ "," __ AssignmentExpressionNoIn)* {
			var result = head;
			for (var i = 0; i < tail.length; i++) {
				result = {
					type:     "BinaryExpression",
					operator: tail[i][1],
					left:     result,
					right:    tail[i][3]
				};
			}
			return result;
		}
		