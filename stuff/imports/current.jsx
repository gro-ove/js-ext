var test = [
	/^https?:\/\/(?:www\.|m\.)?yo\/*utu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/
];

@macro TEST_STRING:boolean (arg:raw) { k: "\"Test: %0\" (" + arg + ")" };

@TEST_STRING { string }
@TEST_STRING ( @TEST_STRING ('woohoo!') )