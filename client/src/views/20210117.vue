<template>
	<div class="test">얍</div>
</template>

<script>
export default {
	name: "test",
	methods : {
		//for 문을 이용해서 반복문을 돌려서 콘솔에 순서대로 숫자를 찍어내보자
		// 처음 시작 시 실행할 구문
		// 세번째 : 반복이 될때마다 진행할 구분
		case1 : function () {
			let arr = ['a','b','c','d','e','f'];
			let z = arr.length;
			for(let i=0; i<z; i++) {
				console.log(arr[i], 'case1',  '모든 수를 다 출력한 경우');
			}
		},
		// a~f  까지 있는데, b,d,f를 뻬고 나머지를 출력해보기
		case2 : function () {
			let arr = ['a','b','c','d','e','f','g','h'];
			let z = arr.length;
			for(let i=0; i<z; i++) {
				if (0 === i % 2) {
					console.log(arr[i], 'case2', 'IF 구문을 이용하여 출력한 경우');
				}
			}
		},
		case3 : function () {
			let arr = ['a','b','c','d','e','f','g','h'];
			let z = arr.length;
			for(let i=0; i<z; i+=2) {
				console.log(arr[i], 'case3', '*를 이용한 경우');
			}
		},
		case4 : function () {
			let arr = ['a','b','c','d','e','f','g','h'];
			let z = arr.length;
			for(let i=0; i<z; i+=2) {
				if (i !== 2) {
					console.log(arr[i], 'case4', 'c를 뺀 경우');
				}
			}
		},
		case5 : function () {
			let arr = ['a','b','c','d'];
			arr.forEach((val, index)=> {
				console.log(val, 'case5');
				arr[index] = val+index; //let은 변수로 사용하기 위할때 선언하는 거이므로 지금은 단순 값을val에 더해줘야하니까, let을 선언하지 않음
			});
			console.log(arr, 'forEach 사용');
		},
		work1: function () {
			for(let i=1; i<10; i++) {
				console.log('2단', '2', '*', i, '=', 2 * i);
			}
		},
		work2 : function () {
			// 반복문은 2번만 사용한다. for문안에 for이 들어갈 수 있음
			for(let a=2; a<10; a++) {  //a가 2부터 9까지 증가를 해야되고
				for(let i=1; i<10; i++) { // *1부터 9까지 곱할 수 있어야되고
					console.log(a, '단', a, '*', i, '=', a * i ); // a에 i를 곱해주는 방식으로 진행
				}
			}
		}
	},
	mounted() {
		this.case1();
		this.case2();
		this.case3();
		this.case4();
		this.case5();
		this.work1();
		this.work2();
	}
}
</script>

<style scoped>

</style>