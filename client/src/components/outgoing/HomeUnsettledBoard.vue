<template>
	<div class="board bg-primary-dark flex flex-column">
		<div class="board-title txt-rg txt-bold flex">
			<div class="left">잔액정보</div>
			<div class="right flex">
				<div class="btn btn-dark fold-button" @click="isShow.contents = !isShow.contents">
					<span role="button" class="material-icons">{{ isShow.contents ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "HomeUnsettledBoard"
}
</script>

<style scoped>

</style>