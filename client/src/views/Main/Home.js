import eventMixin from "@/common/script/event";

export default {
	name: 'Home',
	mixins: [eventMixin],
	data() {
		return {
			myData: 'Hey',
			resolve: null,
			queryValue: +this.$route.query.value || 0,
			isShow: {
				layerPopup: false
			}
		};
	},
	inject: ['showDialogue'],
	methods: {
		queryPlus() {
			this.queryValue++;
			// this.$router.push('/?value=' + this.queryValue).then(() => {
			// 	console.log(111);
			// });

			this.$router.push('/');
		},
		globalClickAction (clickTarget) {
			console.log('Home:', clickTarget);
		}
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