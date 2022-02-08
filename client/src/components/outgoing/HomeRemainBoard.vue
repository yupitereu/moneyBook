<template>
	<div class="board flex flex-column">
		<div class="board-title txt-rg txt-bold flex">
			<div class="left" v-if="boardTitle">{{ boardTitle }}</div>
			<div class="right flex" v-if="foldingButton">
				<div class="btn btn-dark fold-button" @click="isShow.contents = !isShow.contents">
					<span role="button" class="material-icons">{{ isShow.contents ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</span>
				</div>
			</div>
			<slot name="title"/>
		</div>
		<div class="board-contents">
			<transition name="slide-down">
				<div class="show" v-if="isShow.contents">
					<slot name="contents"/>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "HomeRemainBoard",
	props: ["foldingButton", "boardTitle"],
	data() {
		return {
			isShow: {
				contents: !this.foldingButton,
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.board {
	width: 100%;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	margin-top: -6rem;
	justify-content: flex-start;
	&-title {
		align-self: flex-start;
		width: inherit;
		height: 6rem;
		.left {
			text-align: left;
			flex-grow: 3;
			align-self: center;
			padding-left: 22px;
		}
		.right {
			flex-grow: 1;
			align-self: center;
			justify-content: flex-end;
			padding-right: 26px;
			.fold-button {
				width: 3rem;
				height: 3rem
			}
		}
	}
	.title-left {
		display: flex;
		text-align: left;
		flex-grow: 3;
		align-self: center;
		padding-left: 22px;
		align-items: center;
		font-size: 1.8rem;
		.icon {
			margin-right: 10px;
		}
	}
	.title-right {
		flex-grow: 1;
		align-self: center;
		text-align: right;
		padding-right: 12px;
		font-size: 2.4rem;
	}
	&-contents {
		min-height: 6rem;
		height: auto;
		overflow: visible;
		.show {
			height: 18.4rem;
			&::before {
				content: '';
				border: white solid 1px;
				opacity: .1;
				display: block;
			}
		}
	}
}
</style>