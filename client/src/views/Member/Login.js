// import {mapMutations} from "vuex";

export default {
	name: "Login",
	data() {
		return {
			autoLoginCheck: true,
			code: this.$route.query.code
		}
	},
	inject: ['showDialogue'],
	methods: {
		// ...mapMutations({setMember: 'SET_MEMBER'}),
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
					this.$store.commit('member/SET_MEMBER', response.data.userInfo)
				} else {
					this.showDialogue({type: 'confirm', message: '티끌 모아 쓰는 가계부의 회원이 아닙니다.<br>회원가입 후 이용하시겠습니까?'}).then(btnResponse => {
						if (btnResponse) {
							this.joinMember(response.data.kakaoAccount);
						}
					});
				}
			}).catch(error => {
				this.showDialogue({message: error.data.message});
			}).finally(() => {
				this.$cookie.set('loginType');
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
						if (response.data.isMember) {
							this.loginComplete(response.data.refreshToken);
							this.$store.commit('member/SET_MEMBER', response.data.userInfo)
						} else {
							this.showDialogue({message: '회원가입을 실패하였습니다.'});
						}
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
