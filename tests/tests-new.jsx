/* tests with --keep-order */
@buildTo ('./temp/tests-new.js')

@macro output:raw-nm (args:raw){
    return 'log ([ %0 ])' (args);
}

@macro test:raw-nm (name:string, args:raw, code:raw){
    return `(function (result){
        var missed = false;
        (function %2 (log) %0)(function (args){
            var expected = JSON.stringify (result.shift ()),
                got = JSON.stringify (args);
            if (expected === undefined){
                if (!missed){
                    console.log ('Missing entry:');
                    missed = true;
                }

                var temp = [];
                console.log ('\t' + got
                    .replace (/"((?:\\"|[^"])+)"/g, lambda (m, s) '\'' + temp.push (s) + '\'')
                    .replace (/(,|\[|\{|\:)|(\]|\})/g, '$1 $2')
                    .replace (/'(\d+)'/g, lambda (m, s) '\'' + temp [+s - 1].replace (/\\"/g, '"').replace (/'/g, '\\\'') + '\''));
            } else if (expected !== got)
                throw new Error ('Expected and got:\n\t' + expected + '\n\t' + got);
        });
        console.log ('[Testing] Test "%1" has been passed');
    })([%3])` (code, name, 'test_' + name.replace (/[^a-zA-Z_$]+/g, '_').toLowerCase (), args.slice (1, -1).trim ().replace (/\n/g, ','));
}

@test ('Async-Try', {
    [ "RESULT:@buildTo ('./temp/tests.js')\n\n@macro output:raw-nm (args:raw){\n\treturn 'log ([ %0 ])' (args);\n}\n\n@ma" ]
}, {
    function getFirstHundredSymbols(f) async {
        var content = async-try require('fs').readFile(f);
        return content.toString().substr(0, 100);
    }

    getFirstHundredSymbols('tests/tests.jsx', lambda {
        @output { 'RESULT:' + arg };
    });
});