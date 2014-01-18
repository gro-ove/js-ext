WhiteSpace "whitespace"
	= [\t\v\f \u00A0\uFEFF]

LineTerminator
	= [\n\r\u2028\u2029]

LineTerminatorSequence "end of line"
	= "\n"
	/ "\r\n"
	/ "\r"
	/ "\u2028" // line separator
	/ "\u2029" // paragraph separator

Identifier "identifier"
	= !ReservedWord name:IdentifierName { return name; }

IdentifierName "identifier"
	= start:IdentifierStart parts:IdentifierPart* { return start + parts.join("") }

IdentifierStart
	= [a-zA-Z$_]

IdentifierPart
	= [a-zA-Z0-9$_]

Comment "comment"
	= MultiLineComment
	/ SingleLineComment

MultiLineComment
	= "/*" (!"*/" .)* "*/"

MultiLineCommentNoLineTerminator
	= "/*" (!("*/" / LineTerminator) .)* "*/"

SingleLineComment
	= "//" (!LineTerminator .)*

EOS
	= __ ";"
	/ _ LineTerminatorSequence
	/ _ &"}"
	/ __ EOF

EOSNoLineTerminator
	= _ ";"
	/ _ LineTerminatorSequence
	/ _ &"}"
	/ _ EOF

EOF
	= !.

_
	= (WhiteSpace / MultiLineCommentNoLineTerminator / SingleLineComment)*

__
	= (WhiteSpace / LineTerminatorSequence / Comment)*