export default {
	namespaced: true,
	state: {
		name: '',
		no: 0
	},
	getters: {
		GET_MEMBER: (state) => state,
	},
	mutations: {
		SET_MEMBER: (state, payload) => {
			if (typeof payload.memberName !== 'undefined') {
				state.name = payload.memberName;
			}
			if (typeof payload.memberNo !== 'undefined') {
				state.no = payload.memberNo;
			}
		}
	},
	actions: {
	}
}
