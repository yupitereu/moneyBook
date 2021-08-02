<template>
	<div>
		<HeaderUI/>
		<main>
			<router-view/>
		</main>
		<FooterUI/>
	</div>
</template>

<script>
import FooterUI from "@/components/layout/FooterUI.vue";
import HeaderUI from "@/components/layout/HeaderUI.vue";

export default {
	name: "DefaultLayout",
	components: {
		HeaderUI,
		FooterUI
	},
}
</script>

<style scoped>

</style>