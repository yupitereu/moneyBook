<template>
	<div class="home">
		<HomeCompBoard/>
		<HomeRemainBoard class="bg-primary-dark" boardTitle="잔액정보" :foldingButton="true">
			<template v-slot:contents>

			</template>
		</HomeRemainBoard>
		<HomeRemainBoard class="bg-white" :foldingButton="false">
			<template v-slot:title>
				<div class="title-left">
					<img src="../../assets/book.svg" class="icon">
					<span>미정산금액</span>
				</div>
				<div class="title-right third">-2,011,111</div>
			</template>
		</HomeRemainBoard>
	</div>
</template>

<script src="./Home.js" />
<style src="./Home.scss" lang="scss" scoped/>
