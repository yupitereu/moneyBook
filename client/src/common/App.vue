<template>
	<div id="app">
		<transition name="fade">
			<router-view/>
		</transition>
		<AlarmToastUI/>
		<DialogueBoxUI :dialogueData="dialogueData" @buttonClick="popDialogueData" />
	</div>
</template>

<script>
import DialogueBoxUI from "@/components/layout/DialogueBoxUI";
import AlarmToastUI from "@/components/layout/AlarmToastUI";
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
	provide() {
		return {
			showDialogue: this.showDialogue
		}
	},
	methods: {
		/**
		 * alert, confirm, prompt 출력 함수
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
		popDialogueData() {
			this.dialogueData.pop();
		}
	}
}
</script>

<style src="./style/default.scss" lang="scss"/>
