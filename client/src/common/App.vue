<template>
	<div id="app" @click="setClickTarget($event.target)">
		<transition name="fade">
			<router-view/>
		</transition>
		<AlarmToastUI/>
		<DialogueBoxUI :dialogueData="dialogueData" @buttonClick="popDialogueData" />
	</div>
</template>

<script>
import DialogueBoxUI from "@/components/layout/DialogueBoxUI.vue";
import AlarmToastUI from "@/components/layout/AlarmToastUI.vue";
import eventMixin from "@/common/script/event";
import { mapGetters, mapMutations } from 'vuex';

export default {
	components: {
		DialogueBoxUI,
		AlarmToastUI
	},
	mixins: [eventMixin],
	data() {
		return {
			dialogueData: [],
			axiosSource: this.$axios.CancelToken.source()
		}
	},
	computed: {
		...mapGetters('member', {memberInfo: 'GET_MEMBER'}),
	},
	provide() {
		return {
			showDialogue: this.showDialogue,
			clickTarget: this.clickTarget
		}
	},
	methods: {
		...mapMutations({setClickTarget: 'SET_CLICK_TARGET'}),
		/**
		 * alert, confirm, prompt 출력
		 * @param data
		 * @returns {Promise<unknown>}
		 */
		showDialogue(data) {
			return new Promise((resolve, reject) => {
				if (this.dialogueData.findIndex(value => value.message === data.message) > -1) {
					return reject(Error('Same dialogue is already exist.'));
				}
				data.type = data.type || 'alert';
				data.promptText = '';
				data.promptPlaceholder = data.promptPlaceholder || '텍스트를 입력하세요.';
				data.resolve = resolve;
				this.dialogueData.push(data);
			});
		},
		/**
		 * 마지막으로 출력된 alert, confirm, prompt 제거
		 */
		popDialogueData() {
			this.dialogueData.pop();
		},
		axiosConfig() {
			this.$axios.defaults.baseURL = '/api';
			this.$axios.interceptors.request.use(config => {
						config.cancelToken = this.axiosSource.token;
						config.headers.Authorization = this.$cookie.get('accessToken') && `Bearer ${this.$cookie.get('accessToken')}` || "";
						config.headers['refresh-token'] = (this.$cookie.get('refreshToken') && `${this.$cookie.get('refreshToken')}`) || (localStorage.getItem('refreshToken') && `${localStorage.getItem('refreshToken')}`) || "";
						return config;
					},
					error => {
						return Promise.reject(error.response);
					}
			);

			this.$axios.interceptors.response.use(response => {
						if (response.headers.authorization) {
							const accessToken = response.headers.authorization.replace('Bearer ', '');
							if (accessToken) { // 액세스 토큰을 헤더에 포함하여 받은 경우
								this.$cookie.set('accessToken', accessToken); // 토큰이 갱신되었을 수 있으므로 서버로부터 받은 토큰을 다시 세팅
							}
						} else { // 액세스 토큰이 헤더에 없는 경우
							// 로컬에 저장해놓은 토큰 정보 모두 제거
							this.$cookie.set('accessToken');
							this.$cookie.set('refreshToken');
							localStorage.removeItem('refreshToken');
						}

						return response;
					},
					error => {
						if (error.response && error.response.status === 401 && error.response.statusText === 'Not member') {
							this.axiosSource.cancel('User cancel request'); // 진행중인 다른 HTTP 요청 모두 취소
							this.axiosSource = this.$axios.CancelToken.source();
							this.showDialogue({message: '로그인하지 않은 유저입니다.'}).then(() => {
								this.$router.push('/member/login');
							});
							return Promise.reject(error.response);
						}
						else {
							return Promise.reject(error.response);
						}
					}
			);
		},
		getMemberData() {
			if (this.memberInfo.no === 0 && ['/member/login', '/pageNotFound', '/styleGuide'].includes(window.location.pathname) === false) {
				this.$axios.post('/member/getMemberInfo').then(response => {
					if (response.data.isMember) {
						this.$store.commit('member/SET_MEMBER', response.data.userInfo);
					}
				});
			}
		}
	},
	created () {
		this.axiosConfig();
		this.$router.beforeEach((to, from, next) => {
			next();
		});

		this.getMemberData();
	}
}
</script>

<style src="./style/default.scss" lang="scss"/>
