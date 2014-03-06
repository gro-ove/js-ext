function __pe(c, p, t) {
    t = function () {
    };
    t.prototype = p.prototype;
    c.prototype = new t();
    c.prototype.constructor = c;
}
function __pa(c, o, r, u) {
    u = r.slice(u);
    return o[o instanceof c ? r : u];
}
var A = function () {
        var A = function () {
            this.__other = 'WOOHOO!';
        };
        return A;
    }(), B = function () {
        var B = function (variable) {
                A.call(this);
                return this.__B_variable = variable;
            }, privateStatic = 'success';
        __pe(B, A);
        B.prototype.test = function (a, b) {
            console.log(this.__B_variable, __pa(B, a, '__B_variable', 4), __pa(B, b, '__B_variable', 4), __pa(B, new B(), '__other', 2));
            console.log(B.privateStatic);
        };
        return B;
    }();
(function () {
    new B('first').test(new B('second'), { variable: 'success' });
}());