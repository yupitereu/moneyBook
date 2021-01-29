<template>
	<div ref="alarmToastUI" class="alarmToastUI" v-if="isShow">
		<transition-group name="bounce">
			<div class="alarmToastBox bounce-item" :style="{height: `${alarmToastDatum.height}px`}" :key="alarmToastDatum.key" v-for="alarmToastDatum in alarmToastData" v-if="alarmToastDatum.isShow" @click="clickToast(alarmToastDatum)" @mouseout="restartRemoveTimer(alarmToastDatum);" @mouseover="pauseRemoveTimer(alarmToastDatum);">
				<div class="messageBox">
					<div class="iconLayer">@</div>
					<div class="textLayer" v-html="alarmToastDatum.message"/>
					<div class="buttonLayer" @click.stop="removeToast(alarmToastDatum);">X</div>
				</div>
				<div class="progressBox">
					<span class="progressBar" :style="{width: alarmToastDatum.remainingRatio}"></span>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: "AlarmToast",
	data() {
		return {
			alarmToastData: [], // 화면에 출력할 토스트 데이터
			waitingData: [], // 대기열 토스트 데이터
			removeTimer: null, // 토스트 데이터 삭제를 위한 타이머(setInterval 객체)
			removeTimerInterval: 10, // 삭제 타이머 수행 간격(millisecond)
			isShow: false // 토스트 영역 출력 여부
		}
	},
	created() {
		/**
		 * 알람 토스트 출력 이벤트 정의
		 * @param {object} toastData
		 *
		 * @requires message 출력할 메시지(html)
		 * @requires toastClickEvent 토스트 클릭 시 실행할 함수
		 * @options height 토스트메시지 전체 높이
		 * @options timeOut 토스트메시지 전체 높이
		 * @options isClearAllToastAtClick 토스트 클릭 시 모든 알람 토스트 닫기 여부
		 */
		this.$root.$on('alarmToast', (toastData) => {
			if(typeof toastData !== 'object') return console.error('alarmToast options is not object');
			const nowTime = this.$moment();
			this.isShow = true;
			toastData.isShow = true;
			toastData.isProgressTimer = true;
			toastData.noticeTime = nowTime.format('HH:mm');

			toastData.key = toastData.key || nowTime.toDate().getTime();
			toastData.toastClickEvent = toastData.toastClickEvent || null;
			toastData.timeOut = toastData.timeOut || 5000;
			toastData.height = toastData.height || 100;
			toastData.message = `<span>${toastData.message}</span>` || '';
			toastData.isClearAllToastAtClick = toastData.isClearAllToastAtClick || false;

			toastData.remaining = toastData.timeOut;
			toastData.remainingRatio = '100%';
			this.setRemoveTimer();
			this.$nextTick(() => {
				if (this.$refs.alarmToastUI.offsetHeight + toastData.height < window.innerHeight && this.waitingData.length === 0) {
					this.alarmToastData.push(toastData);
				} else {
					this.waitingData.push(toastData);
				}
			});
		});
	},
	methods: {
		/**
		 * 모든 메시지 닫기
		 */
		clearAllToast() {
			clearInterval(this.removeTimer); // 타이머 삭제
			this.removeTimer = null;
			this.isShow = false; // 알림영역 비노출 처리
			this.alarmToastData.splice(0, this.alarmToastData.length); // 모든 출력 데이터 삭제
			this.waitingData.splice(0, this.waitingData.length); // 모든 대기열 데이터 삭제
		},
		/**
		 * 트스트 메시지 클릭 이벤트
		 * @param toastData 클릭한 데이터
		 */
		clickToast(toastData) {
			if (typeof toastData.toastClickEvent === 'function') {
				toastData.toastClickEvent();
			}

			if (toastData.isClearAllToastAtClick) {
				this.clearAllToast();
			} else {
				this.removeToast(toastData);
			}
		},
		/**
		 * 개별 메시지 타이머 일시 정지(hover 이벤트)
		 * @param toastData 일시 정지할 데이터
		 */
		pauseRemoveTimer(toastData) {
			toastData.isProgressTimer = false; // 타이머 일시 중지
			toastData.remaining = toastData.timeOut; // 남은 시간 재설정
			toastData.remainingRatio = '100%'; // 프로그레스바 재설정
		},
		/**
		 * 개별 메시지 닫기
		 * @param toastData 삭제할 데이터
		 */
		removeToast(toastData) {
			toastData.isShow = false;
			setTimeout(() => {
				if (this.waitingData.length > 0) { // 대기 중인 데이터가 존재하는 경우
					this.alarmToastData.push(this.waitingData.shift());
				} else if (this.alarmToastData.filter(value => value.isShow === true).length === 0) { // 대기 중인 데이터가 없고 화면에 출력된 데이터가 없는 경우
					this.clearAllToast();
				}
			}, 300);
		},
		/**
		 * 개별 메시지 타이머 재시작
		 * @param toastData 재시작할 데이터
		 */
		restartRemoveTimer(toastData) {
			toastData.isProgressTimer = true; // 타이머 재시작
		},
		/**
		 * 토스트 닫기 타이머 설정
		 */
		setRemoveTimer() {
			if (this.alarmToastData.length === 0 && this.removeTimer === null) { // 현재 타이머가 없는 상태일 때만 타이머 세팅
				this.isShow = true;
				this.removeTimer = setInterval(() => {
					this.alarmToastData.forEach((datum, index) => {
						if (datum.isShow) {
							if (datum.isProgressTimer) { // 타이머가 실행중인 경우
								datum.remaining -= this.removeTimerInterval; // 남은 시간 차감
								datum.remainingRatio = `${datum.remaining / datum.timeOut * 100}%`; // 남은 시간에 대한 프로그레스바 길이 조정

								if (datum.remaining <= 0) { // 남은 시간이 없는 경우
									this.removeToast(datum);
								}
							}
						}
					});
				}, this.removeTimerInterval);
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.alarmToastUI {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 700;
	width: 20vw;
	height: fit-content;
	max-height: 100vh;
	cursor: pointer;

	// 개별 메시지 박스
	.alarmToastBox {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;
		margin-top: 20px;
		background-color: #333333;
		width: 90%;
		color: #ebebeb;
		opacity: .8;

		// 메시지 출력 영역
		.messageBox {
			height: calc(100% - 5px);
			display: flex;

			div {
				display: flex;
				align-items: center;
				height: 100%;
			}

			div.iconLayer {
				width: 30px;
				justify-content: center;
			}
			div.textLayer {
				width: calc(100% - 60px);
				word-break: keep-all;
				text-align: left;
			}
			div.buttonLayer {
				width: 30px;
				justify-content: center;
			}
		}

		// 프로그레스바
		.progressBox {
			height: 5px;
			background-color: #000000;

			.progressBar {
				display: block;
				height: 100%;
				background-color: #ff0000;
			}
		}
	}

	// 알림 박스 애니메이션
	.bounce-enter-active {
		animation: bounce-in .3s;
	}
	.bounce-leave-active {
		animation: bounce-in .3s reverse;
	}
	@keyframes bounce-in {
		0% {
			left: 100%
		}
		80% {
			left: -10%
		}
		100% {
			left: 0
		}
	}
}
</style>