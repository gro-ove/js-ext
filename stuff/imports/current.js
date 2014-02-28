var First = function () {
        var First = function (a) {
                this.__First_a = ':a';
                this.__First_a = a + psv;
            }, psv = ':staticprivate';
        First.prototype.oldFn = function () {
            console.log('[ oldfn ]', psv, this.__First_a);
        };
        return First;
    }(), Second = function () {
        var Second = function (a) {
                if (this.constructor === Second)
                    throw new Error('Trying to instantiate abstract class');
                First.call(this, a);
                this.usv = ':public';
            }, _0 = function () {
            };
        _0.prototype = First.prototype;
        Second.prototype = new _0();
        Second.prototype.constructor = Second;
        _0 = undefined;
        Second.prototype.fn = function () {
            console.log('[ fn ]', Second.psv, this.__test());
            return this;
        };
        Second.psv = ':overrided';
        Second.__dsv = ':protected';
        return Second;
    }(), SecondNotAbstract = function () {
        var SecondNotAbstract = function (a) {
                Second.call(this, a);
            }, _1 = function () {
            };
        _1.prototype = Second.prototype;
        SecondNotAbstract.prototype = new _1();
        SecondNotAbstract.prototype.constructor = SecondNotAbstract;
        _1 = undefined;
        SecondNotAbstract.prototype.__test = function () {
            return 'test';
        };
        return SecondNotAbstract;
    }(), Third = function () {
        var Third = function () {
                Second.call(this, ':argument');
                console.log('[ static test ]', Second.__dsv, this.dsv, this.usv);
            }, _2 = function () {
            };
        _2.prototype = Second.prototype;
        Third.prototype = new _2();
        Third.prototype.constructor = Third;
        _2 = undefined;
        return Third;
    }();
(function () {
    new First(':first');
    new SecondNotAbstract(':test').fn().oldFn();
    new Third().fn().oldFn();
}());