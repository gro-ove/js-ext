var A = function () {
        var A = function () {
            console.log('[A] ' + A._a);
        };
        A._a = 18;
        return A;
    }(), B = function () {
        var B = function () {
                A._a = 1024;
                console.log('[B] ' + A._a);
                A.call(this);
            }, _1 = function () {
            };
        _1.prototype = A.prototype;
        B.prototype = new _1();
        B.prototype.constructor = B;
        _1 = undefined;
        return B;
    }();
(function () {
    new B();
}());