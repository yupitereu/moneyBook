<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
	methods: {
  	calculate: function (a, b, operator) {
  		console.log(a, b, operator);
  		//console.log(a - b);
			//왜 if 문만 수행을 할까?
			// (조건) {수행구문 }
			//let c = '+'; // 위에서 변수값을 먼저 선언을 해주고, 순차적으로 선언되어 아래로 내려감
			if (operator == '+') { // 'c'라고 선언하면 상수가 되어짐, c라고 선언해야 변수로 인지
				console.log(a + b);
				console.log('if'); // 디버깅을 위한 수
			} else if (operator == '*') {
				console.log(a * b);
				console.log('else if *');
			} else if (operator == '/') {
				console.log(a / b);
				console.log('else if /');
			}  else if (operator == '%') {
				console.log(a % b);
				console.log('else if %');
			} else {
				console.log(a - b);
			}
		}, //메소드가 끝났으니 , 찍기!
		checkOdd: function (num) {
  		// 1. if문 사용하기 / num이 짝수인지, 홀 수 인지 찾아보는방법으로.
			// 사칙연산 및 나머지연산 중 한가지를 사용하면된다고함
			// 짝수의 정의란? > 답을 생각해보기
		}
	},
  mounted() {
		this.calculate(2, 1, '-');
		this.calculate(2, 1, '+');
		this.calculate(2, 9, '*');
		this.calculate(45, 5, '/');
		this.calculate(15, 4, '%');
		this.checkOdd(1);
	}
}
</script>