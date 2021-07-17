<template>
	<div class="dialogueBoxUI" v-if="dialogueData.length > 0">
		<div class="overlay"></div>
		<div v-for="(dialogueDatum, index) in dialogueData" style="position: fixed">
			<div class="dialogueBox">
				<div class="dialogueText">
					<div class="dialogueTitle" v-if="dialogueDatum.title" :style="{backgroundColor: dialogueDatum.backgroundColor, color: dialogueDatum.titleColor, fontSize: dialogueDatum.titleFontSize }">
						{{ dialogueDatum.title }}
					</div>
					<input type="text" ref="promptInput" :placeholder="dialogueDatum.promptPlaceholder" v-show="dialogueDatum.type === 'prompt'" v-model="dialogueDatum.promptText">
					<div v-html="dialogueDatum.message"></div>
				</div>
				<div class="btnWrap">
					<div ref="cancelButton" class="btn cancelBtn" v-show="dialogueDatum.type === 'confirm' || dialogueDatum.type === 'prompt'" @click="clickDialogueButton('cancel',index)">{{ dialogueDatum.cancelTitle || '아니오' }}</div>
					<div ref="confirmButton" class="btn confirmBtn" @click="clickDialogueButton('confirm', index)">{{ dialogueDatum.confirmTitle || '예' }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./DialogueBoxUI.js" />
<style src="./DialogueBoxUI.scss" lang="scss" scoped />