<template>
	<div class="account-area">
		<div class="contents-box flex">
			<div class="contents-box-type check material-icons">done</div>
			<div class="contents-box-data">
				<div class="flex flex-justify-between">
					<span class="txt-medium txt-sm">M-able통장</span>
					<span class="txt-bold txt-sm" :class="{'gray': !accountData.unsettledMoney}">{{ accountData.unsettledMoney.numberFormat() }}</span>
				</div>
				<div class="flex flex-justify-between">
					<span class="txt-ti gray">기지불</span>
					<span class="txt-ti gray">1,000</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "AccountUnsettledMoney",
	props: ['accountData']
}
</script>

<style lang="scss" scoped>
.account-area {
	flex: 1 1;
	box-sizing: border-box;
	margin: 8px 10px;
	min-width: 320px;
	height: 84px;
	box-shadow: 1px 2px 9px rgba(0, 0, 0, .1);
	border-radius: 10px;
	.contents-box {
		padding: 20px;
		height: 100%;
		box-sizing: border-box;
		&-type {
			width: 40px;
			line-height: 40px;
			flex-grow: 0;
			height: 40px;
			margin-right: 10px;
			border-radius: 20px;
			color: $white;
		}
		&-data {
			flex-grow: 1;
		}
		.check {
			background-color: #EFC61A;
		}
		.outgoing {
			background-color: #BA334C;
		}
	}
}

@media screen and (min-width: 680px) {
	.account-area {
		max-width: calc(100vw / 2 - 20px);
	}
}

@media screen and (min-width: 1020px) {
	.account-area {
		max-width: calc(100vw / 3 - 20px);
	}
}

@media screen and (min-width: 1360px) {
	.account-area {
		max-width: calc(100vw / 4 - 20px);
	}
}

@media screen and (min-width: 1700px) {
	.account-area {
		max-width: calc(100vw / 5 - 20px);
	}
}
</style>