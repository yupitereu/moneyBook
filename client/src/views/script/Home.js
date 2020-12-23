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
	mounted() {
		console.log(this.$moment().format('YYYY-MM-DD'));
		this.$axios.post('/api/Sample/call', {data: 1})
			.then(response => {
				console.log(response.data);
			})
	},
	methods: {
		changeMyData(text) {
			this.myData = text;
		}
	},
	provide() {
		return {
			changeMyData: this.changeMyData
		}
	}
}