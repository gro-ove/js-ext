function __pe(c, p, t) {
    t = function () {
    };
    t.prototype = p.prototype;
    c.prototype = new t();
    c.prototype.constructor = c;
}
var A = function () {
        var A = function () {
            this.__parent = 'WOOHOO!';
        };
        return A;
    }(), B = function () {
        var B = function (variable) {
                A.call(this);
                this.__B_testObj = {
                    find: function () {
                        return [{ variable: 'deep!' }];
                    }
                };
                this.__B_variable = variable;
                this.qwerty = 'default';
            }, privateStatic = 'done';
        __pe(B, A);
        B.prototype.test = function (a, b) {
            a.variable += '-changed';
            b.variable += '-changed';
            console.log(this.__B_variable, a.variable, b.variable, new A().parent);
        };
        B.prototype.other = function (a, b) {
            function getA() {
                console.log('[getA]');
                return {
                    get: function () {
                        console.log('[getA][get]');
                        return a;
                    }
                };
            }
            function getB() {
                console.log('[getB]');
                return {
                    get: function () {
                        console.log('[getB][get]');
                        return b;
                    }
                };
            }
            console.log(getA().get().variable += '-changed', getB().get().variable += '-changed');
            console.log('ok');
            console.log(getA().get().variable, getB().get().variable);
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
        B.prototype.awful = function () {
            console.log(this.__B_testObj.find()[0].variable);
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
}());