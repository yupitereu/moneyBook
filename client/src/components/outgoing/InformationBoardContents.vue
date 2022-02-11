<template>
	<div class="flex flex-column flex-align-center">
		<div class="title-box txt-bold" :class="titleIcon">{{ title }}</div>
		<div class="price-box txt-bold">{{ price && price.numberFormat() || 0 }}</div>
	</div>
</template>

<script>
export default {
	name: "InformationBoardContents",
	props: ["title", "titleIcon", "price"]
}
</script>

<style lang="scss" scoped>
.title-box {
	width: fit-content;
	height: 2.4rem;
	padding-left: 3.4rem;
	color: $white;
	opacity: .7;
	font-size: 1.6rem;
}
.won {
	background: url("~@/assets/ico-won-box.svg") no-repeat;
}
.plus {
	background: url("~@/assets/ico-plus-box.svg") no-repeat;
}
.minus {
	background: url("~@/assets/ico-minus-box.svg") no-repeat;
}
.price-box {
	padding-top: 3px;
	font-size: 1.6rem;
}
</style>