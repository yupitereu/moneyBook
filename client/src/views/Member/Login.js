export default {
	name: "Login",
	data() {
		return {
			autoLoginCheck: false,
			code: this.$route.query.code
		}
	},
	inject: ['showDialogue'],
	methods: {
		kakaoLoginRequest() {
			this.$cookie.set('loginType', 'kakao');
			Kakao.Auth.authorize({
				redirectUri: `${window.location.origin}/member/login`
			});
		},
		kakaoLoginResponse() {
			this.$axios.post('/member/kakaoAuthComplete', {
				redirectUri: `${window.location.origin}/member/login`,
				code: this.$route.query.code
			})
			.then(response => {
				if (response.data.isMember) {
					this.loginComplete(response.data.refreshToken)
				} else {
					this.showDialogue({type: 'confirm', message: '샐러몬북의 회원이 아닙니다.<br>회원가입 후 이용하시겠습니까?'}).then(response => {
						if (response) {
							this.joinMember(response.data.kakaoAccount);
						} else {
							this.$cookie.set('loginType');
						}
					});
				}
			});
		},
		joinMember(accountInfo) {
			switch (this.$cookie.get('loginType')) {
				case 'kakao':
					this.$axios.post('/member/joinMember', {
						socialType: 'kakao',
						kakaoAccount: accountInfo
					})
					.then(response => {

					});
					break;
			}
		},
		loginComplete(refreshToken) {
			if (this.autoLoginCheck) {
				localStorage.setItem('refreshToken', refreshToken);
			} else {
				this.$cookie.set('refreshToken', refreshToken);
			}
			this.$cookie.set('loginType');
			this.$router.push('/');
		}
	},
	created () {
		// 클라이언트에 저장 중인 토큰 정보 삭제
		this.$cookie.set('accessToken');
		this.$cookie.set('refreshToken');
		localStorage.removeItem('refreshToken');

		if (this.code && this.$cookie.get('loginType') === 'kakao') {
			this.kakaoLoginResponse();
		}
	}
}
