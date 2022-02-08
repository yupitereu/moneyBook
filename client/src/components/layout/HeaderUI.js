import { mapGetters } from 'vuex'

export default {
	name: "HeaderUI",
	data() {
		return {
			selectedYearMonth: `${this.$moment().year()}-${(this.$moment().month() + 1).lpad('0', 2)}`,
			isShowWholeMenu: false
		}
	},
	computed: {
		...mapGetters('headerUI', {
			headerState: 'UI_STATE'
		})
	},
	watch: {
		selectedYearMonth(newVal) {
			const yearMonth = newVal.split('-');
			if (yearMonth.length !== 2 || isNaN(yearMonth[0]) || (isNaN(yearMonth[1]) || yearMonth[1] <= 0 || yearMonth[1] > 12)) {
				this.selectedYearMonth = `${this.$moment().year()}-${(this.$moment().month() + 1).lpad('0', 2)}`;
			}
			this.$refs.monthSelector.blur();
			this.$store.commit('SET_YEAR_MONTH', newVal);
		}
	},
	methods: {
		selectedMonthChange(operationMonth) {
			this.selectedYearMonth = this.$moment(this.selectedYearMonth).add(operationMonth, 'month').format('yyyy-MM');
		}
	},
	created () {
	}
}