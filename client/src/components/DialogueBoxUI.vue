<template>
	<div class="dialogueBoxUI" v-if="dialogueData.length > 0">
		<div class="overlay"></div>
		<div v-for="(dialogueDatum, index) in dialogueData" style="position: fixed">
			<div class="dialogueBox">
				<div class="dialogueText">
					<div class="dialogueTitle" v-if="dialogueDatum.title" :style="{backgroundColor: dialogueDatum.bgColor, color: dialogueDatum.titleColor, fontSize: dialogueDatum.titleFontSize }">
						{{ dialogueDatum.title }}
					</div>
					<div v-html="dialogueDatum.msg"></div>
				</div>
				<div class="btnWrap">
					<div class="btn cancelBtn" v-if="dialogueDatum.type === 'confirm'" @click="clickDialogueButton('cancel',index)">{{ dialogueDatum.cancelTitle || '아니오' }}</div>
					<div class="btn confirmBtn" @click="clickDialogueButton('confirm', index)">{{ dialogueDatum.confirmTitle || '예' }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./script/DialogueBoxUI.js"/>
<style src="./style/DialogueBoxUI.scss" lang="scss" scoped />