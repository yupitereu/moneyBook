<template>
	<div>
		<transition-group name="flip-list" tag="div" class="checklist">
			<div class="listItem" v-for="(dragDatum, dragIndex) in dragData" draggable="true" @dragstart="dragStart(dragIndex, $event)" @drag="drag($event)" @dragover="dragOver(dragIndex, $event)" @drop="drop($event)" :key="dragDatum">{{ dragDatum }}</div>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: "dragDropSort",
	data() {
		return {
			dragData: ['A', 'B', 'C', 'D', 'E', 'F'],
			dragEventData: {elementIndex: -1, writtenPageY: 0, moveAmountY: 0, throttlingTimer: null}
		}
	},
	methods: {
		dragStart(dragIndex, event) {
			this.dragEventData.elementIndex = dragIndex; // 드래그를 시작한 엘리먼트 인덱스 선택
			this.dragEventData.writtenPageY = event.pageY; // 드래그가 시작된 마우스 위치 기록
		},
		dragOver(overIndex, event) {
			event.preventDefault(); // 드래그 관련 브라우저 기본 동작 취소
			if ((this.dragEventData.moveAmountY > 0 && this.dragEventData.elementIndex < overIndex) || (this.dragEventData.moveAmountY < 0 && this.dragEventData.elementIndex > overIndex)) {
				this.dragData.moveElement(this.dragEventData.elementIndex, overIndex); // 엘리먼트 정렬 수행
				this.dragEventData.elementIndex = overIndex; // 현재 드래그 중인 엘리먼트의 변경된 인덱스 재선택
			}
		},
		drag(event) {
			if (!this.dragEventData.throttlingTimer) { // 예정된 타이머가 없는 경우
				this.dragEventData.throttlingTimer = setTimeout(() => {
					this.dragEventData.moveAmountY = event.pageY - this.dragEventData.writtenPageY; // 마우스 세로 이동량 및 방향 기록
					this.dragEventData.writtenPageY = event.pageY; // 마지막 마우스 위치 재기록
					this.dragEventData.throttlingTimer = null; // 타이머 클리어(다음 이벤트에서 새로운 타이머 실행)
				}, 100);
			}
		},
		drop(event) {
			event.preventDefault();
			this.dragEventData.moveAmountY = 0; // 마우스 세로 이동량 및 방향 초기화
			if (this.dragEventData.throttlingTimer) { // 예정된 드래그 이벤트 타이머가 있는 경우 초기화
				clearTimeout(this.dragEventData.throttlingTimer);
				this.dragEventData.throttlingTimer = null;
			}
		}
	}
}
</script>

<style scoped>
.checklist {
	position: relative;
	width: 320px;
	height: 600px;
}
.listItem {
	height: 90px;
	width: 100%;
	border: 0px solid rgba(123, 123, 123, 0.498039);
	border-radius: 4px;
	color: rgb(153, 153, 153);
	line-height: 90px;
	padding-left: 32px;
	font-size: 24px;
	font-weight: 400;
	background-color: rgb(0, 255, 0);
	box-shadow: rgba(0,0,0,0.2) 0px 1px 2px 0px;
}

.flip-list-move {
	transition: transform .5s;
}
</style>