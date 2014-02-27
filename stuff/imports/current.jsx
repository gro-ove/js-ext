var p;

function fn (c){
	if (!p)
		p = c;
	else
		console.log ('[Check]', p === c ? 'success' : 'fail')
}

class A {
	private function hardcore (){}

	(value){
		fn (hardcore);
		fn (hardcore);
	}
}

{
	new A ('v-v-value!');
}
