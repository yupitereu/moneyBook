<template>
	<div>
		<HeaderUI/>
		<main>
			<router-view></router-view>
		</main>
		<FooterUI/>
	</div>
</template>

<script>
import HeaderUI from "@/components/layout/HeaderUI";
import FooterUI from "@/components/layout/FooterUI";

export default {
	name: "defaultLayout",
	components: {
		HeaderUI,
		FooterUI
	},
}
</script>

<style scoped>

</style>