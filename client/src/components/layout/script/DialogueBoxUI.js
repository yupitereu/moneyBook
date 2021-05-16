export default {
	name: "DialogueBoxUI",
	props: ['dialogueData'],
	watch: {
		dialogueData(newVal) {
			if (newVal.length > 0) {
				const lastIndex = newVal.length - 1;
				this.$nextTick(() => {
					if (newVal[lastIndex].type === 'prompt') {
						this.$refs.promptInput[lastIndex].focus();
					} else {
						this.$refs.confirmButton[lastIndex].focus();
					}
				});
			}
		}
	},
	methods: {
		clickDialogueButton(buttonType, index) {
			const result = this.dialogueData[index].type === 'prompt' ? {result: buttonType === 'confirm', promptText: this.dialogueData[index].promptText} : buttonType === 'confirm';
			this.dialogueData[index].resolve(result);
			this.$emit('buttonClick');
		}
	}
}