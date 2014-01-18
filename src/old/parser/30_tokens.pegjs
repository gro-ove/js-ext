ReservedWord
	= Keyword
	/ NullLiteral
	/ BooleanLiteral

Keyword
	= (
		  "break"
		/ "case"
		/ "catch"
		/ "continue"
		/ "debugger"
		/ "default"
		/ "delete"
		/ "do"
		/ "else"
		/ "finally"
		/ "for"
		/ "function"
		/ "lambda"
		/ "if"
		/ "instanceof"
		/ "in"
		/ "new"
		/ "return"
		/ "switch"
		/ "this"
		/ "throw"
		/ "try"
		/ "typeof"
		/ "var"
		/ "void"
		/ "while"
		/ "with"
		/ "module" ) !IdentifierPart

BreakToken      = "break"            !IdentifierPart
CaseToken       = "case"             !IdentifierPart
CatchToken      = "catch"            !IdentifierPart
ContinueToken   = "continue"         !IdentifierPart
DebuggerToken   = "debugger"         !IdentifierPart
DefaultToken    = "default"          !IdentifierPart
DeleteToken     = "delete"           !IdentifierPart { return "delete"; }
DoToken         = "do"               !IdentifierPart
ElseToken       = "else"             !IdentifierPart
FinallyToken    = "finally"          !IdentifierPart
ForToken        = "for"              !IdentifierPart
FunctionToken   = "function"         !IdentifierPart
LambdaToken     = "lambda"           !IdentifierPart
GetToken        = "get"              !IdentifierPart
IfToken         = "if"               !IdentifierPart
InstanceofToken = "instanceof"       !IdentifierPart { return "instanceof"; }
InToken         = "in"               !IdentifierPart { return "in"; }
InArrayToken    = "in-array"         !IdentifierPart { return "in-array"; }
NewToken        = "new"              !IdentifierPart
ReturnToken     = "return"           !IdentifierPart
SetToken        = "set"              !IdentifierPart
SwitchToken     = "switch"           !IdentifierPart
ThisToken       = "this"             !IdentifierPart
ThrowToken      = "throw"            !IdentifierPart
TryToken        = "try"              !IdentifierPart
TypeofToken     = "typeof"           !IdentifierPart { return "typeof"; }
VarToken        = "var"              !IdentifierPart
VoidToken       = "void"             !IdentifierPart { return "void"; }
WhileToken      = "while"            !IdentifierPart
WithToken       = "with"             !IdentifierPart
ModuleToken     = "module"           !IdentifierPart
ImportToken     = "import"           !IdentifierPart
ExportToken     = "export"           !IdentifierPart
