import eventMixin from "@/common/script/event";
import HomeCompBoard from "@/components/mixture/HomeCompBoard";
import HomeRemainBoard from "@/components/outgoing/HomeRemainBoard";
import InformationBoardContents from "@/components/outgoing/InformationBoardContents";
import AccountUnsettledMoney from "@/components/outgoing/AccountUnsettledMoney";

export default {
	name: 'Home',
	components: {HomeCompBoard, HomeRemainBoard, InformationBoardContents, AccountUnsettledMoney},
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
		globalClickAction (clickTarget) {
			// console.log('Home:', clickTarget);
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