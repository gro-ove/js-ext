var temp = lp`body {
		background: @BACKGROUND_COLOR;
		@textSize: @TEXT_SIZE;
		.class { font-size: @TEXT_SIZE; height: @textSize }
	}`;
	
console.log (temp, temp.less ({ backgroundColor: 'red', textSize: '73%' }));

/*{Result-Begin}
body{background:@BACKGROUND_COLOR;}body .class{font-size:@TEXT_SIZE;height:@TEXT_SIZE;}
 body{background:red;}body .class{font-size:73%;height:73%;}
{Result-End}*/
