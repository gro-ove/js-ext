console.log (l`
	@back: red;
	
	body { 
		background: @back; 
		&:hover {
			background: black;
		}
		
		div { .pos (10px, 20px) }
	}`);
	

/*{Result-Begin}
body{background:#ff0000;}body:hover{background:black;}
body div{position:absolute;left:10px;top:20px;}
{Result-End}*/
