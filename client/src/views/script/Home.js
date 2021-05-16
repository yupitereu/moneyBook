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
			console.log(response.data);
		});
	}
}