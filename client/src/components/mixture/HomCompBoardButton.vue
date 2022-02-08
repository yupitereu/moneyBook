<template>
	<span role="button" class="category-button txt-sm txt-medium" :class="{'active': isActive}" @click="$emit('click', category.key)">{{ category.categoryName }}</span>
</template>

<script>
export default {
	name: "HomCompBoardButton",
	props: ['category', 'isActive']
}
</script>

<style lang="scss" scoped>
.category-button {
	opacity: .5;
	&.active {
		opacity: 1;
	}
}
</style>