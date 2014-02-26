@macro TEST_STRING (something:raw) "\"Test: %0\" (" + something + ")";

@TEST_STRING { string }
// @TEST_STRING ( string )