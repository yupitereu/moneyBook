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
		const data = new FormData();
		data.append('aaa', '111');
		// this.$axios.post('/Sample/call', data, {
		// 	headers: {
		// 		"Content-Type": "multipart/form-data"
		// 	}
		// })
		// .then(response => {
		// 	// this.showDialogue({type: 'confirm', message: '첫번째 alert'}).then(response => {
		// 	// 	console.log(response);
		// 	// });
		// }).catch((error) => {
		// 	if (error) {
		// 		console.log(error);
		// 	}
		// });
	}
}