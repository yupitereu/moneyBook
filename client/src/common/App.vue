<template>
	<div id="app" @click="$root.$emit('GlobalClick', $event)">
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
import { mapGetters } from 'vuex';

export default {
	components: {
		DialogueBoxUI,
		AlarmToastUI
	},
	data() {
		return {
			dialogueData: []
		}
	},
	computed: {
		...mapGetters('member', {memberInfo: 'GET_MEMBER'})
	},
	provide() {
		return {
			showDialogue: this.showDialogue
		}
	},
	methods: {
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
		this.$root.$on('showDialogue', (data, buttonAction) => {
			this.showDialogue(data).then(buttonAction);
		});
		this.$router.beforeEach((to, from, next) => {
			next();
		});

		this.getMemberData();
	}
}
</script>

<style src="./style/default.scss" lang="scss"/>
