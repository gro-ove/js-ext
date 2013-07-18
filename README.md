# js-ext

### What this is

This is a new preprocessor for JavaScript. 

### Features

#### 1. Lambda-functions

    setTimeout (lambda doSomething (arg), 1000);
    
    [1, 2, 3].map (lambda arg * 2);     // [2, 4, 6]
    
    [1, 2, 3].forEach (lambda (v, i) console.log (i + ': ' + v))
                                        // 0: 1, 1: 2, 2: 3

#### 2. Default argument values

    function test (a = 100, b = getValue ()){
        // ...
    }

#### 3. Multiline strings

    var text = `bla-bla-bla
                bla-bla-bla`;

    var html = h`<div>
                    <a href="#">Link</a>
                </div>`;        // Will be compressed

    var css = c`body {
                    color: red;
                }`;             // Will be compressed
                
#### 4. Modules

    module Test {
        var a;
        
        export function get (){
            return a;
        }
        
        function init (){
            a = 100;
        }
    }
    
    module Other {
        import Test;
        
        function init (){
            console.log (Test.get ());   // 100, of course
        }
    }
    
#### 5. Different way to write:

    try
        throw 0;
        
    try
        throw 0;
    catch
        console.log (e);
        
    function sqr (v)
        return v * v;
        
#### 6. Something like imports, includes and stuff:
    
    // ==Jsx==
    // @import utils/string.format
    // ==/Jsx==
    
    console.log ('Test: {0}.'.format ('Hello, World!'));
        
#### 7. Full backward compatibility (with default JavaScript):

    Of course, if you are not going to use such keywords as "lambda", "module", "import" or "export".
    
#### And so on, for example:

    var obj = { a: 1, b: 2, c: 3, d: 4 };
    for (key, value in obj)
        console.log (key + ' → ' + value);  // I think, this is oblivious

### Usage

Coming soon.

### License

Hmm... WTFPL

