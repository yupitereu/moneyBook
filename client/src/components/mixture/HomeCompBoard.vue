<template>
	<div class="board bg-primary flex flex-column">
		<div class="category flex flex-column">
			<div class="category-main">
				<HomeCompBoardButton v-for="category in allCategory.main" :category="category" :is-active="categorySelectionKey.main === category.key" @click="key => changeCategory('main', key)"/>
			</div>
			<div class="category-sub">
				<div class="category-sub-contents">
					<HomeCompBoardButton v-for="category in allCategory.sub[categorySelectionKey.main]" :category="category" :is-active="categorySelectionKey.sub === category.key" @click="key => changeCategory('sub', key)"/>
				</div>
			</div>
		</div>
		<div class="contents flex">
			<div class="title txt-rg txt-bold">
				{{ categorySelectionKey.main === 'income' && '이 달의 총 수익' || '이 달의 총 잔액' }}
			</div>
			<div class="value txt-xxl txt-bold">2,010,000</div>
		</div>
	</div>
</template>

<script>
import HomeCompBoardButton from "@/components/mixture/HomCompBoardButton";
import {mapGetters, mapMutations} from "vuex";

export default {
	name: "HomeCompBoard",
	components: {HomeCompBoardButton},
	data() {
		return {
		}
	},
	computed: {
		...mapGetters({allCategory: 'ALL_CATEGORY', categorySelectionKey: 'CATEGORY_SELECTION_KEY'})
	},
	methods: {
		...mapMutations({setCategorySelection: 'SET_CATEGORY_SELECTION'}),
		changeCategory(type, key) {
			this.categorySelectionKey[type] = key;
			if (type === 'main') {
				this.categorySelectionKey.sub = '0';
			}

			this.setCategorySelection(this.categorySelectionKey)
		}
	}
}
</script>

<style lang="scss" scoped>
.board {
	width: 100%;
	height: 285px;
	box-sizing: border-box;
	margin-bottom: 15px;
	border: 0;
	.category {
		align-items: flex-start;
		&-main {
			padding: 20px 12px;
			span {
				margin-right: 30px;
				&:last-child {
					margin-right: 0;
				}
			}
		}
		&-sub {
			&::before {
				content: '';
				border-top: white solid 1px;
				margin-bottom: 20px;
				display: block;
				opacity: .2;
			}
			width: 100%;
			padding: 0 12px 0 12px;
			box-sizing: border-box;
			&-contents {
				max-width: 100%;
				white-space: nowrap;
				overflow-x: auto;
				scrollbar-width: none;
				&::-webkit-scrollbar {
					display: none;
				}
				span {
					margin-right: 10px;
					&:last-child {
						margin-right: 0;
					}
				}
			}

		}
	}
	.contents {
		width: 100%;
		flex-grow: 1;
		justify-content: space-between;
		align-items: center;
		.title {
			margin-left: 22px;
		}
		.value {
			margin-top: -1.6rem;
			margin-right: 22px;
		}
	}
}
</style>