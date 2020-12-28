<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about#1234">About1</router-link> |
			<router-link to="/about#abcd">About2</router-link>
		</div>
		<transition name="fade">
			<router-view/>
		</transition>
		<DialogueBoxUI/>
	</div>
</template>

<script>
import DialogueBoxUI from "@/components/DialogueBoxUI";
export default {
	components: {
		DialogueBoxUI
	}
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	.fade-enter-active {
		transition: opacity .7s ease;
	}

	.fade-enter, .fade-leave, .fade-leave-active {
		opacity: 0;
	}
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
