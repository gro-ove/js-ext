var p;
function fn(c) {
    if (!p)
        p = c;
    else
        console.log('[Check]', p === c ? 'success' : 'fail');
}
var A = function () {
        var A = function (value) {
            fn(this._A_hardcore.bind(this));
            fn(this._A_hardcore.bind(this));
        };
        A.prototype._A_hardcore = function () {
        };
        return A;
    }();
(function () {
    new A('v-v-value!');
}());