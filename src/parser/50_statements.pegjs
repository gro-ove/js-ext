Statement
	= Block
	/ VariableStatement
	/ EmptyStatement
	/ LabelledStatement
	/ ExpressionStatement
	/ IfStatement
	/ IterationStatement
	/ ContinueStatement
	/ BreakStatement
	/ ReturnStatement
	/ WithStatement
	/ SwitchStatement
	/ ThrowStatement
	/ TryStatement
	/ DebuggerStatement
	/ FunctionDeclaration
	/ FunctionExpression
	/ UniqueLabelledStatement

LambdaStatement
	= LambdaEmptyStatement
	/ LambdaLabelledStatement
	/ LambdaExpressionStatement
	/ LambdaIfStatement
	/ LambdaIterationStatement
	/ LambdaReturnStatement
	/ LambdaWithStatement
	/ LambdaThrowStatement
	/ LambdaTryStatement
	/ LambdaDebuggerStatement
	/ SwitchStatement
	/ FunctionExpression
	/ LambdaUniqueLabelledStatement

StatementList
	= data:(Statement __)* { return data.map (function (arg){ return arg [0] }) }

Block
	= "{" __ statements:StatementList "}" { return { type: "Block", statements: statements } }

PseudoBlock
	= Block / arg:Statement { return { type: "Block", statements: [ arg ] } }

LambdaPseudoBlock
	= Block / arg:LambdaStatement { return { type: "Block", statements: [ arg ] } }

VariableStatement
	= VarToken __ declarations:VariableDeclarationList EOS { return { type: "VariableStatement", declarations: declarations } }

VariableDeclarationList
	= head:VariableDeclaration tail:(__ "," __ VariableDeclaration)* {
			var result = [head];
			for (var i = 0; i < tail.length; i++) 
				result.push(tail[i][3]);
			return result;
		}

VariableDeclarationListNoIn
	= head:VariableDeclarationNoIn tail:(__ "," __ VariableDeclarationNoIn)* {
			var result = [head];
			for (var i = 0; i < tail.length; i++) 
				result.push(tail[i][3]);
			return result;
		}

VariableDeclaration
	= name:Identifier value:(__ Initialiser)? { return { type:  "VariableDeclaration", name:  name, value: value !== null ? value[1] : null } }

VariableDeclarationNoIn
	= name:Identifier value:(__ InitialiserNoIn)? { return { type: "VariableDeclaration", name: name, value: value !== null ? value[1] : null } }

Initialiser
	= "=" (!"=") __ expression:AssignmentExpression { return expression; }

InitialiserNoIn
	= "=" (!"=") __ expression:AssignmentExpressionNoIn { return expression; }

EmptyStatement
	= ";" { return { type: "EmptyStatement" }; }

LambdaEmptyStatement
	= ";" { return { type: "EmptyStatement" }; }

ExpressionStatement
	= expression:Expression EOS? { return expression; }

LambdaExpressionStatement
	= expression:LambdaExpression EOS? { return expression; }

IfStatement
	= IfToken __ "(" __ condition:Expression __ ")" __ ifStatement:Statement elseStatement:(__ ElseToken __ Statement)? {
			return { type: "IfStatement", condition: condition, ifStatement: ifStatement, elseStatement: elseStatement !== null ? elseStatement[3] : null };
		}

LambdaIfStatement
	= IfToken __ "(" __ condition:Expression __ ")" __ ifStatement:LambdaStatement elseStatement:(__ ElseToken __ LambdaStatement)? {
			return { type: "IfStatement", condition: condition, ifStatement: ifStatement, elseStatement: elseStatement !== null ? elseStatement[3] : null };
		}

IterationStatement
	= DoWhileStatement
	/ WhileStatement
	/ ForStatement
	/ ForInStatement

LambdaIterationStatement
	= DoWhileStatement
	/ LambdaWhileStatement
	/ LambdaForStatement
	/ LambdaForInStatement

DoWhileStatement
	= DoToken __ statement:Statement __ WhileToken __ "(" __ condition:Expression __ ")" EOS { return { type: "DoWhileStatement", condition: condition, statement: statement } }

WhileStatement
	= WhileToken __ "(" __ condition:Expression __ ")" __ statement:Statement       { return { type: "WhileStatement", condition: condition, statement: statement } }

LambdaWhileStatement
	= WhileToken __ "(" __ condition:Expression __ ")" __ statement:LambdaStatement { return { type: "WhileStatement", condition: condition, statement: statement } }

ForStatement
	= ForToken __ "(" __ initializer:ForStatementInitializer __ ";" __ test:Expression? __ ";" __ counter:Expression? __ ")" __ statement:Statement {
			return { type: "ForStatement", initializer: initializer, test: test, counter: counter, statement: statement };
		}

LambdaForStatement
	= ForToken __ "(" __ initializer:ForStatementInitializer __ ";" __ test:Expression? __ ";" __ counter:Expression? __ ")" __ statement:LambdaStatement {
			return { type: "ForStatement", initializer: initializer, test: test, counter: counter, statement: statement };
		}

ForStatementInitializer
	= VarToken __ declarations:VariableDeclarationListNoIn { return { type: "VariableStatement", declarations: declarations } }
	/ ExpressionNoIn?

ForInStatement
	= ForToken __ "(" __ iterator:ForInStatementIterator __ token:(InArrayToken / InToken) __ collection:Expression __ ")" __ statement:Statement {
			return { type: "ForInStatement", iterator: iterator, collection: collection, token: token, statement: statement };
		}

LambdaForInStatement
	= ForToken __ "(" __ iterator:ForInStatementIterator __ token:(InArrayToken / InToken) __ collection:Expression __ ")" __ statement:LambdaStatement {
			return { type: "ForInStatement", iterator: iterator, collection: collection, token: token, statement: statement };
		}

ForInStatementIterator
	= VarToken __ declaration:Identifier __ "," __ value:Identifier { return {
			type: "VariableDeclarations",
			declarations: [
				{ type: "VariableDeclaration", name: declaration },
				{ type: "VariableDeclaration", name: value }
			]
		} }
	/ declaration:LeftHandSideExpression __ "," __ value:LeftHandSideExpression { return {
			type: "BinaryExpression",
			operator: ",",
			left: declaration,
			right: value
		} }
	/ VarToken __ declaration:VariableDeclarationNoIn { return {
			type: "VariableDeclarations",
			declarations: [ declaration ]
		} }
	/ LeftHandSideExpression

ContinueStatement
	= ContinueToken _ label:(
				identifier:Identifier EOS { return identifier; }
			/ EOSNoLineTerminator       { return "";         }
		) { return { type: "ContinueStatement", label: label !== "" ? label : null } }

BreakStatement
	= BreakToken _ label:(
				identifier:Identifier EOS { return identifier; }
			/ EOSNoLineTerminator       { return ""; }
		) { return { type: "BreakStatement", label: label !== "" ? label : null } }

ReturnStatement
	= ReturnToken _ value:( expression:Expression EOS { return expression } / EOSNoLineTerminator { return "" } ) { return { type:  "ReturnStatement", value: value !== "" ? value : null } }

LambdaReturnStatement
	= ReturnToken _ value:( expression:LambdaExpression EOS? { return expression } / EOSNoLineTerminator { return "" } ) { return { type:  "ReturnStatement", value: value !== "" ? value : null } }

WithStatement
	= WithToken __ "(" __ environment:Expression __ ")" __ statement:Statement { return { type: "WithStatement", environment: environment, statement: statement } }

LambdaWithStatement
	= WithToken __ "(" __ environment:Expression __ ")" __ statement:LambdaStatement { return { type: "WithStatement", environment: environment, statement: statement } }

SwitchStatement
	= SwitchToken __ "(" __ expression:Expression __ ")" __ clauses:CaseBlock { return { type: "SwitchStatement", expression: expression, clauses: clauses } }

CaseBlock
	= "{" __ before:CaseClauses? defaultAndAfter:(__ DefaultClause __ CaseClauses?)? __ "}" {
			var before = before !== null ? before : [];
			if (defaultAndAfter !== null) {
				var defaultClause = defaultAndAfter [1], 
						clausesAfter = defaultAndAfter [3] !== null ? defaultAndAfter [3] : [];
			} else {
				var defaultClause = null,
						clausesAfter = [];
			}

			return (defaultClause ? before.concat (defaultClause) : before).concat (clausesAfter);
		}

CaseClauses
	= head:CaseClause tail:(__ CaseClause)* {
			var result = [head];
			for (var i = 0; i < tail.length; i++) 
				result.push(tail[i][1]);
			return result;
		}

CaseClause
	= CaseToken __ selector:Expression __ ":" statements:(__ StatementList)? {
			return {
				type:       "CaseClause",
				selector:   selector,
				statements: statements !== null ? statements[1] : []
			};
		}

DefaultClause
	= DefaultToken __ ":" statements:(__ StatementList)? {
			return {
				type:       "DefaultClause",
				statements: statements !== null ? statements[1] : []
			};
		}

LabelledStatement
	= label:Identifier __ ":" __ statement:(Block / IterationStatement) { return { type: "LabelledStatement", label: label, statement: statement } }

LambdaLabelledStatement
	= label:Identifier __ ":" __ statement:(Block / LambdaIterationStatement) { return { type: "LabelledStatement", label: label, statement: statement } }

UniqueLabelledStatement
	= label:Identifier __ ":" __ statement:Statement { return { type: "LabelledStatement", label: label, statement: statement } }

LambdaUniqueLabelledStatement
	= label:Identifier __ ":" __ statement:LambdaStatement { return { type: "LabelledStatement", label: label, statement: statement } }

ThrowStatement
	= ThrowToken _ exception:Expression EOSNoLineTerminator { return { type: "ThrowStatement", exception: exception } }

LambdaThrowStatement
	= ThrowToken _ exception:LambdaExpression EOSNoLineTerminator? { return { type: "ThrowStatement", exception: exception } }

TryStatement
	= TryToken __ block:PseudoBlock __ catch_:Catch? __ finally_:Finally? {
			return { type: "TryStatement", block: block, "catch": catch_ ? catch_ : null, "finally": finally_ ? catch_ : null };
		}

LambdaTryStatement
	= TryToken __ block:LambdaPseudoBlock __ catch_:LambdaCatch? __ finally_:LambdaFinally? {
			return { type: "TryStatement", block: block, "catch": catch_ ? catch_ : null, "finally": finally_ ? catch_ : null };
		}

Catch
	= CatchToken __ identifier:("(" __ Identifier __ ")" __)? block:PseudoBlock { return { type: "Catch", identifier: identifier ? identifier [2] : "e", block: block } }

LambdaCatch
	= CatchToken __ identifier:("(" __ Identifier __ ")" __)? block:LambdaPseudoBlock { return { type: "Catch", identifier: identifier ? identifier [2] : "e", block: block } }

Finally
	= FinallyToken __ block:PseudoBlock { return { type: "Finally", block: block } }

LambdaFinally
	= FinallyToken __ block:LambdaPseudoBlock { return { type: "Finally", block: block } }

DebuggerStatement
	= DebuggerToken EOS { return { type: "DebuggerStatement" }; }

LambdaDebuggerStatement
	= DebuggerToken EOS? { return { type: "DebuggerStatement" }; }
	