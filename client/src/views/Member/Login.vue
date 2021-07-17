<template>
	<div>로그인 페이지</div>
</template>

<script>
export default {
	name: "Login",
	created () {
		// 클라이언트에 저장 중인 토큰 정보 삭제
		this.$cookie.set('accessToken');
		this.$cookie.set('refreshToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('refreshToken');
	}
}
</script>

<style scoped>

</style>