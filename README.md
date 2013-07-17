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
        
#### 7. Full backward compatibility
    
#### And so on.

### Usage

Coming soon.

### License

Hmm, I have no idea. If you want, you can use this code as it pleases, I'm all for it.

Oh, and yes, there are a couple of modules taken from other projects. I don't know, what's with licenses, but you always can open these files and read it. Sorry, but I have something better to do.
