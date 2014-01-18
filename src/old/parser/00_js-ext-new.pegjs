/*
 * Modified JavaScript parser from PEGJS. Thanks to dmajda.
 * (https://github.com/dmajda/pegjs/blob/master/examples/javascript.pegjs)
 */

/*
 * JavaScript parser based on the grammar described in ECMA-262, 5th ed.
 * (http://www.ecma-international.org/publications/standards/Ecma-262.htm)
 *
 * The parser builds a tree representing the parsed JavaScript, composed of
 * basic JavaScript values, arrays and objects (basically JSON). It can be
 * easily used by various JavaScript processors, transformers, etc.
 *
 * Intentional deviations from ECMA-262, 5th ed.:
 *
 * * The specification does not consider |FunctionDeclaration| and
 * |FunctionExpression| as statements, but JavaScript implementations do and
 * so are we. This syntax is actually used in the wild (e.g. by jQuery).
 *
 * Limitations:
 *
 * * Non-BMP characters are completely ignored to avoid surrogate
 * pair handling (JavaScript strings in most implementations are AFAIK
 * encoded in UTF-16, though this is not required by the specification --
 * see ECMA-262, 5th ed., 4.3.16).
 *
 * * One can create identifiers containing illegal characters using Unicode
 * escape sequences. For example, "abcd\u0020efgh" is not a valid
 * identifier, but it is accepted by the parser.
 *
 * * Strict mode is not recognized. That means that within strict mode code,
 * "implements", "interface", "let", "package", "private", "protected",
 * "public", "static" and "yield" can be used as names. Many other
 * restrictions and exceptions from ECMA-262, 5th ed., Annex C are also not
 * applied.
 *
 * * The parser does not handle regular expression literal syntax (basically,
 * it treats anything between "/"'s as an opaque character sequence and also
 * does not recognize invalid flags properly).
 *
 * * The parser doesn't report any early errors except syntax errors (see
 * ECMA-262, 5th ed., 16).
 *
 * At least some of these limitations should be fixed sometimes.
 *
 * Many thanks to inimino (http://inimino.org/~inimino/blog/) for his ES5 PEG
 * (http://boshi.inimino.org/3box/asof/1270029991384/PEG/ECMAScript_unified.peg),
 * which helped me to solve some problems (such as automatic semicolon
 * insertion) and also served to double check that I converted the original
 * grammar correctly.
 */

start
	= ___ data:(ProgramElement ___)* { return { type: "Program", elements: data.map (function (a){ return a [0] }) } }

ProgramElement
	= comment:Comments { return { type: "Comment", data: comment } }
	/ Module
	/ Statement

Comments
	= data:(Comment WhiteSpace* LineTerminatorSequence*)+ { return data.map (function (a){ return a [0].$ }) }

___
	= (WhiteSpace / LineTerminatorSequence)*

SpecialComments
	= "// ==Jsx==" LineTerminator SpecialComment "// ==/Jsx==" LineTerminator

SpecialComment
	= "//" WhiteSpace* "@" Identifier WhiteSpace+ (!LineTerminator .)
