console.log('JUST A FILE');
console.log('TEMP');
var other_t = 20;
var current_t = 20;
var current_o = 1001;
var current_to = 1020;
console.log('D:\\Development\\GitHub\\js-ext\\stuff\\imports\\current.jsx');
var diffucultTest = 'Hello from Other File!';
function oneLineWithResult(arg) {
    if (arg)
        return arg + 20;
}
function oneLineWithoutArgumentsWithResult(arg) {
    if (arg)
        return arg + 20;
}
(function callRightHere() {
    new A();
}(current_o));
var A = function () {
        var _2 = function () {
            this._1 = 10;
        };
        _2.prototype.test = function () {
            var _0 = this;
            return function (arg) {
                return arg + _0._1;
            };
        };
        return _2;
    }();