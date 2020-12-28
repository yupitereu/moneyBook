export default {
	name: 'About',
	watch: {
		'$route.hash'(to, from) {
			this.$root.$emit('alert', {msg: 'About 페이지 입니다.<br/> hash: ' + to});
		}
	},
	mounted() {
		this.$root.$emit('confirm', {title: '알림', msg: 'About 페이지 입니다.<br/> 뒤로 이동하시겠습니까?', confirmCallback: () => {
				this.$router.go(-1);
			}
		});
	},
	beforeDestroy() {
		console.log('About BeforeDestroy');
	}
}