var A = function () {
        var A = function () {
            this.PUBLIC_a = undefined;
        };
        return A;
    }(), B = function () {
        var B = function () {
                A.call(this);
                this.PUBLIC_a = undefined;
            }, _0 = function () {
            };
        _0.prototype = A.prototype;
        B.prototype = new _0();
        B.prototype.constructor = B;
        _0 = undefined;
        return B;
    }(), C = function () {
        var C = function () {
                A.call(this);
                this.PUBLIC_a = undefined;
            }, _1 = function () {
            };
        _1.prototype = A.prototype;
        C.prototype = new _1();
        C.prototype.constructor = C;
        _1 = undefined;
        return C;
    }();