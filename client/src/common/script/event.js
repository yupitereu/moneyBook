import { mapGetters, mapMutations } from 'vuex';

export default {
	computed: {
		...mapGetters({clickTarget: 'CLICK_TARGET'})
	},
	watch: {
		clickTarget(newVal) {
			if (newVal) {
				this.globalClickAction(newVal);
				setTimeout(() => {
					if (this.clickTarget) {
						this.setClickTarget(null);
					}
				},0);
			}
		}
	},
	methods: {
		...mapMutations({setClickTarget: 'SET_CLICK_TARGET'}),
		globalClickAction(clickTarget) {}
	}
}