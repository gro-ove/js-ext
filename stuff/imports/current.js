var First = function () {
        var First = function (a) {
                this.__First_a = 1024;
                this.__First_a = a + h;
            }, h = 18;
        return First;
    }(), Second = function () {
        var Second = function (a) {
                First.call(this, a);
            }, _0 = function () {
            };
        _0.prototype = First.prototype;
        Second.prototype = new _0();
        Second.prototype.constructor = Second;
        _0 = undefined;
        Second.prototype.fn = function () {
            console.log(Second.h);
        };
        Second.h = 'overrided';
        return Second;
    }();
(function () {
    new Second().fn();
}());