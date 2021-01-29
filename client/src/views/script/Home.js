import HelloWorld from '@/components/HelloWorld.vue'

export default {
	name: 'Home',
	components: {
		HelloWorld
	},
	data() {
		return {
			myData: 'Hey'
		};
	},
	methods: {
		changeMyData(text) {
			this.myData = text;
			this.$root.$emit('alarmToast', {message: text});
		}
	},
	provide() {
		return {
			changeMyData: this.changeMyData
		}
	},
	mounted() {
		// console.log(this.$moment().format('YYYY-MM-DD'));
		this.$axios.post('/api/Sample/call', {data: 1})
		.then(response => {
			console.log(this.myData);
		});

		let arr = [0, 1, 2, 3, 4];
		for (let val of arr) {
			val += 1;
		}
		console.log(arr);
	}
}