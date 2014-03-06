function __pe(c, p, t) {
    t = function () {
    };
    t.prototype = p.prototype;
    c.prototype = new t();
    c.prototype.constructor = c;
}
function __pn(c, o, r, u) {
    u = r.slice(u);
    return o instanceof c ? r : u;
}
var A = function () {
        var A = function () {
            this.__parent = 'WOOHOO!';
        };
        return A;
    }(), B = function () {
        var B = function (variable) {
                A.call(this);
                this.__B_variable = variable;
                this.qwerty = 'default';
            }, privateStatic = 'done';
        __pe(B, A);
        B.prototype.test = function (a, b) {
            a[__pn(B, a, '__B_variable', 4)] += '-changed';
            b[__pn(B, b, '__B_variable', 4)] += '-changed';
            console.log(this.__B_variable, a[__pn(B, a, '__B_variable', 4)], b[__pn(B, b, '__B_variable', 4)], new A()[__pn(A, new A(), '__parent', 2)]);
        };
        B.prototype.other = function (a, b) {
            function getA() {
                console.log('[getA]');
                return a;
            }
            function getB() {
                console.log('[getB]');
                return b;
            }
            console.log(function (__arg) {
                return __arg[__pn(B, __arg, '__B_variable', 4)] += '-changed';
            }(getA()), function (__arg) {
                return __arg[__pn(B, __arg, '__B_variable', 4)] += '-changed';
            }(getB()));
            console.log(a[__pn(B, a, '__B_variable', 4)], b[__pn(B, b, '__B_variable', 4)]);
        };
        B.prototype.final = function (a, b) {
            function getA() {
                console.log('[getA]');
                return a;
            }
            function getB() {
                console.log('[getB]');
                return b;
            }
            console.log(getA().qwerty += '-changed', getB().qwerty += '-changed');
            console.log(a.qwerty, b.qwerty);
        };
        B.prototype.staticTest = function (obj) {
            console.log(obj.privateStatic, privateStatic);
        };
        return B;
    }();
(function () {
    new B('first').test(new B('second'), { variable: 'success' });
    new B('first').other(new B('second'), { variable: 'success' });
    new B('first').final(new B('second'), { qwerty: 'qwerty' });
    new B('first').staticTest({ privateStatic: 'arg' });
}());