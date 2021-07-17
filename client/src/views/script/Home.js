export default {
	name: 'Home',
	data() {
		return {
			myData: 'Hey',
			resolve: null
		};
	},
	inject: ['showDialogue'],
	methods: {
	},
	created() {
		this.$axios.post('/api/Sample/call', {data: 1})
		.then(response => {
			this.showDialogue({type: 'confirm', message: '첫번째 alert'}).then(response => {
				console.log(response);
			});

			console.log('result', response);
		}).catch((error) => {
			console.log(error.response);
		});
	}
}