import moment from "moment/moment";
import 'moment/locale/ko'

export default {
	namespaced: true,
	state: {
		backgroundColor: '#315DEA',
		showLeftButton: false,
		showRightButton: true,
		yearMonth: moment().format('yyyy-MM')
	},
	getters: {
		UI_STATE: (state) => state,
	},
	mutations: {
		SET_COLOR: (state, payload) => {
			state.backgroundColor = payload;
		},
		SET_BUTTONS: (state, payload) => {
			state.showLeftButton = payload.leftButton;
			state.showRightButton = payload.rightButton;
		},
		SET_YEAR_MONTH: (state, payload) => {
			state.yearMonth = payload;
		},
	},
	actions: {
	}
}

