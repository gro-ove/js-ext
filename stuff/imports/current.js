var A = function () {
        var A = function () {
            this.__a = 10;
        };
        return A;
    }(), B = function () {
        var B = function () {
                A.call(this);
                this.PUBLIC_b = 11;
            }, _0 = function () {
            };
        _0.prototype = A.prototype;
        B.prototype = new _0();
        B.prototype.constructor = B;
        _0 = undefined;
        return B;
    }(), C = function () {
        var C = function () {
                B.call(this);
                this.PUBLIC_b = 11;
            }, _1 = function () {
            };
        _1.prototype = B.prototype;
        C.prototype = new _1();
        C.prototype.constructor = C;
        _1 = undefined;
        return C;
    }();