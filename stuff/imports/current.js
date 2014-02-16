var A = function () {
        var A = function () {
            this.fn();
        };
        A.prototype.fn = function () {
            console.log('A');
        };
        return A;
    }(), B = function () {
        var B = function () {
                A.call(this);
            }, _1 = function () {
            };
        _1.prototype = A.prototype;
        B.prototype = new _1();
        B.prototype.constructor = B;
        _1 = undefined;
        B.prototype.fn = function () {
            console.log('B');
            A.prototype.fn.call(this);
        };
        return B;
    }();
(function () {
    new B();
}());