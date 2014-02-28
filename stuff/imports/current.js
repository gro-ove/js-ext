var First = function () {
        var First = function (dog) {
                this.dog = 'SORRY I CAN\'T WOOF BECAUSE I\'M SICK';
                console.log('.', '"First" says "Hi!"');
                this.dog = dog + ' (' + cat + ')';
                console.log('.', '.', this.dog);
            }, cat = 'Meow?';
        First.prototype.cow = function () {
            console.log('.', 'Mo-o-o-o from "First".');
        };
        return First;
    }(), Second = function () {
        var Second = function (dog) {
                if (this.constructor === Second)
                    throw new Error('Trying to instantiate abstract class Second');
                First.call(this, dog);
                this.horse = 'Horse, tazshemta';
            }, _0 = function () {
            }, cat = 'Meow!';
        _0.prototype = First.prototype;
        Second.prototype = new _0();
        Second.prototype.constructor = Second;
        _0 = undefined;
        Second.prototype.whoIsIt = function () {
            console.log('.', 'Michael Jackson, for example');
            console.log('.', 'Or cat:', cat);
            console.log('.', 'Or dog:', Second.dog);
            console.log('.', 'Or horse:', this.horse);
        };
        Second.prototype.eat = function () {
            console.log('.', 'Wow, yammy!');
            console.log('.', '.', this.sleep());
            console.log('.', '.', this.poo());
            return this;
        };
        Second.dog = 'WOOF WOOF WOOF';
        return Second;
    }(), Third = function () {
        var Third = function (dog) {
                Second.call(this, dog);
            }, _1 = function () {
            };
        _1.prototype = Second.prototype;
        Third.prototype = new _1();
        Third.prototype.constructor = Third;
        _1 = undefined;
        Third.prototype.eat = function () {
            Second.prototype.eat.call(this);
            console.log('.', 'And chew-chew-chew!');
        };
        Third.prototype.sleep = function () {
            Second.prototype.sleep.call(this);
            console.log('.', 'Now with 20% more snoring!');
        };
        Third.prototype.poo = function () {
            console.log('.', 'E-e-e-w.');
        };
        return Third;
    }(), Fourth = function () {
        var Fourth = function () {
                Third.call(this, 'Dogs don\'t say "KRAKOZYABRA"');
                console.log('.', '"Fourth" in da house.');
            }, _2 = function () {
            };
        _2.prototype = Third.prototype;
        Fourth.prototype = new _2();
        Fourth.prototype.constructor = Fourth;
        _2 = undefined;
        Fourth.prototype.__poo = function () {
            return console.log('.', 'I won\'t do it, I\'m hungry and it is disgusting!');
        };
        return Fourth;
    }();
(function () {
    console.log('Here come "First"!');
    new First('What do dogs say?');
    console.log('And now \u2014 "Second"!');
    try {
        new Second('Nothing here.');
    } catch (e) {
        console.log('.', '"Second" is too tired: ' + e.message);
    }
    console.log('Next is "Third"!');
    new Third('What do dogs say? Last try!').eat();
    console.log('And, finally, "Fourth".');
    new Fourth().poo();
}());