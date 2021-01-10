<template>
	<div class="test2">

	</div>
</template>

<script>
export default {
	name: 'test2',
	methods: {
		fruit: function () {
			// 배열
			let arr = ['딸기','배','사과','방울토마토'];
			// console.log(arr);
			// arr.push('귤');
			// console.log('귤을 더했을때', arr);
			// arr.push('포도');
			// console.log('포도를 더했을때', arr);
			// let lastElement = arr.pop();
			// console.log(arr, lastElement);
			// 0번째 값을 돌려받고, 함수안에서 콘솔 찍는건 다 지워버리고, 0번째 값을 돌려받아서 콘솔 로그에 출력
			let a = arr[0];
			return a;
		},
	},
	mounted() {
		// 위에서 retrurn 된 값을 받아와서 아래 새로운 변수를 선언 후 해당 값을 출력
		let fruit = this.fruit();
		console.log (fruit);
	}
}
</script>

<style scoped>

</style>