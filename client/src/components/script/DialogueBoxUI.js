export default {
	name: "DialogueBoxUI",
	data() {
		return {
			dialogueData: []
		}
	},
	methods: {
		clickDialogueButton(buttonType, index) {
			this.dialogueData[index].isShow = false;
			if (buttonType === 'confirm' && typeof this.dialogueData[index].confirmCallback === 'function') {
				this.dialogueData[index].confirmCallback();
			} else if (buttonType === 'cancel' && typeof this.dialogueData[index].cancelCallback === 'function') {
				this.dialogueData[index].cancelCallback();
			}

			this.dialogueData.pop();
		}
	},
	created() {
		this.$root.$on('alert', (options) => {
			if(typeof options !== 'object') return console.error('alert error');
			options.isShow = true;
			options.type = 'alert';
			this.dialogueData.push(options);
		});

		this.$root.$on('confirm', (options) => {
			if(typeof options !== 'object') return console.error('confirm error');
			options.isShow = true;
			options.type = 'confirm';
			this.dialogueData.push(options);
		});
	}
}