var A = function () {
        var A = function () {
        };
        A.prototype.a = function (a, b) {
            console.log(a, b);
        };
        return A;
    }();
(function () {
    new A().a(1, 2);
}());