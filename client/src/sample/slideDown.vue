<template>
	<div>
		<div style="cursor: pointer; border: #333333 1px solid;" @click="isShow = !isShow">button</div>
		<transition name="slide-down">
			<div v-if="isShow">
				<div v-for="index in 3" style="background-color: #42b983; height: 50px; border-bottom: #333333 1px solid"></div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "slideDown",
	data() {
		return {
			isShow: false
		}
	},
	created () {
		console.log('created SlideDown');
	}
}
</script>

<style scoped>
.slide-down-enter-active {
	transition: all 1s;
	transition-delay: 0s;
}
.slide-down-leave-active {
	transition: all 0.5s ease-out;
	transition-delay: 0s;
}
.slide-down-enter, .slide-down-leave-to {  overflow: hidden; max-height: 0 !important; }
.slide-down-leave, .slide-down-enter-to {  overflow: hidden; height: auto; max-height: 2000px;}
</style>