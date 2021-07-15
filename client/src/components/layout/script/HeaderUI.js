import { mapGetters, mapActions } from 'vuex'

export default {
	name: "HeaderUI",
	data() {
		return {
			selectedYear: this.$moment().year(),
			selectedMonth: this.$moment().month() + 1
		}
	},
	computed: {
		...mapGetters('headerUI', {
			headerState: 'UI_STATE'
		})
	},
	created () {
	}
}