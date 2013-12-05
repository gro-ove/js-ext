Literal
	= NullLiteral
	/ BooleanLiteral
	/ value:NumericLiteral {
			return {
				type:  "NumericLiteral",
				value: value
			};
		}
	/ value:StringLiteral {
			return {
				type:  "StringLiteral",
				value: value
			};
		}
	/ RegularExpressionLiteral

NullLiteral
	= "null" !IdentifierStart { return { type: "NullLiteral" }; }

BooleanLiteral
	= literal:("true" / "false") !IdentifierStart { return { type: "BooleanLiteral", value: literal === "true"  }; }

NumericLiteral "number"
	= literal:(FuckedIntegerLiteral / HexIntegerLiteral / DecimalLiteral) !IdentifierStart {
			return literal.$;
		}

DecimalLiteral
	= DecimalDigits "."? DecimalDigits? ExponentPart?
	/ "." DecimalDigits ExponentPart?

DecimalDigits
	= [0-9]+

ExponentPart
	= [eE] [-+]? DecimalDigits

FuckedIntegerLiteral
	= "0" [0-7]+ ![89]

HexIntegerLiteral
	= "0" [xX] [0-9a-fA-F]+

StringLiteral "string"
	= parts:('"' DoubleStringCharacter* '"' / "'" SingleStringCharacter* "'") { return JSON.parse ('"' + parts [1].$.replace (/(^|\\\\|[^\\])"/g, '$1\\"') + '"'); }
	/ type:[a-z]* "`" character:MultilineStringCharacter* "`" { return character.$ }

DoubleStringCharacter
	= !('"' / "\\" / LineTerminator) . 
	/ "\\" LineTerminatorSequence { return '' }
	/ "\\" .

SingleStringCharacter
	= !("'" / "\\" / LineTerminator) . 
	/ "\\" LineTerminatorSequence { return '' }
	/ "\\" .

MultilineStringCharacter
	= "\\`"
	/ !"`" .

RegularExpressionLiteral "regular expression"
	= "/" body:(!("/" / "\\") . / "\\" . )+ "/" flags:[a-z]* {
			return {
				type:  "RegularExpressionLiteral",
				body:  body.$,
				flags: flags.$
			};
		}
		