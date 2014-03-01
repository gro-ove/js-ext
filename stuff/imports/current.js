var Test = function () {
        var Test = function (arg) {
            this.__Test_a = 19;
            console.log(this[arg]);
        };
        return Test;
    }();
(function () {
    new Test('a');
}());