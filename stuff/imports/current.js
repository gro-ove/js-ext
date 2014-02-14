var A = function () {
        var _1 = function () {
            this._fn();
        };
        _1.prototype._fn = function () {
            console.log('A');
        };
        return _1;
    }(), B = function () {
        var _2 = function () {
                A.call(this);
            }, _3 = function () {
            };
        _3.prototype = A.prototype;
        _2.prototype = new _3();
        _2.prototype.constructor = _2;
        _3 = undefined;
        _2.prototype._fn = function () {
            console.log('B');
            A.prototype._fn.call(this);
        };
        return _2;
    }();
(function () {
    new B();
}());