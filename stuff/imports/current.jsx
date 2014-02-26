/^https?:\/\/(?:www\.|m\.)?youtu(?:be\.com\/(?:watch\?.*?v=|v\/|embed\/)|\.be\/)([^&#?]+).*?(?:t(?:ime)?=(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?)?$/
/^https?:\/\/(?:www\.)?vimeo\.com\/(?:[^\?]+\?clip_id=)?(\d+).*?$/
/^https?:\/\/(?:www\.)?coub\.com\/view\/([_a-zA-Z0-9]+)$/
/"first_frame_versions":\{"template":"([^"]+)"/

@macro TEST_STRING:boolean (arg:raw) { k: "\"Test: %0\" (" + arg + ")" };

@TEST_STRING { string }
@TEST_STRING ( @TEST_STRING ('woohoo!') )