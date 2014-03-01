for (key in JSON.parse('{ "a": 19 }')) {
    console.log('IN:', key);
}
{
    var _0 = JSON.parse('{ "a": 19 }');
    for (key in _0)
        if (_0.hasOwnProperty(key)) {
            console.log('IN-OBJECT:', key);
        }
    _0 = undefined;
}
{
    var _1 = JSON.parse('{ "a": 19 }');
    for (key in _1) {
        value = _1[key];
        console.log('IN:', key);
    }
    _1 = undefined;
}
{
    var _2 = JSON.parse('{ "a": 19 }');
    for (key in _2)
        if (_2.hasOwnProperty(key)) {
            value = _2[key];
            console.log('IN-OBJECT:', key);
        }
    _2 = undefined;
}