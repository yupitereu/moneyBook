export default {
	name: 'MentionInput',
			data() {
		return {
			textareaRef: null, // (required) contentsEditable Div element
			viewerRef: null, // (required) viewr element
			tooltipLayerRef: null, // (optional) 툴팁 element
			mentionListRef: null, // (required) 멘션리스트를 출력할 Div Dom Element를 설정
			mentionDataRefKey: null, // (required) 멘션리스트를 출력할 Div Dom Element를 설정
			mentionListData: [], // 이 리스트 데이터로 v-for를 통하여 리스트 출력
			mentionFontSize: 14, // 멘션이 입력되는 Div나 textarea의 폰트사이즈 지정(멘션리스트 출력 위치 설정을 위해 필요)
			searchMentionIndex: 0, // 멘션리스트에서 선택중인 데이터의 인덱스
			triggerIdx: null, // @가 마지막으로 입력된 위치 인덱스
			queryString: '', // 멘션 검색 문자열
			positionList: {}, // 회원정보 인출을 위한 직위정보 객체
			hoverData: {dept_nm: '', user_nm: '', position_nm: '', isShow: false} // hover 이벤트 시 보여줄 데이터
		};
	},
	computed: {
		/**
		 * 라우터를 통하여 현재 들어온 프로젝트 정보 분석
		 */
		selectedProject() {
			return getSelectedProject();
		},
		async mentionAllListData() {
			let projectMembers = [];
			await ProjService.getMentionMembers(this.selectedProject.projectCode).then((response) => {
				for (const member of response.data.result) {  // 중복 제거 (case : 최상위-L, 상위-M일 때 등)
					const findIndex = projectMembers.findIndex((value) => value.user_id === member.user_id);
					if (findIndex < 0) {
						projectMembers.push(member);
					}
				}
			}).catch(catchError)
			return projectMembers;  // 현재 프로젝트를 볼 수 있는 멤버들만 return
			// return getCorpUserAll();
		},
		userInfo() {
			return getUser();
		}
	},
	methods: {
		/**
		 * 에디터의 input이벤트에 바인딩 할 함수
		 */
		onInput() {
			if (this.textareaRef) {
				const textBeforeCaret = this.getTextBeforeCaret(); // 키보드 커서 직전 위치까지 문자열 인출

				const tokens = textBeforeCaret.split(/\s/g); // 키보드 커서 이전 문자열을 공백을 제외한 문자열 단위로 분리
				const currentInputString = tokens[tokens.length - 1]; // 키보드로 입력 중인 문자열
				const triggerIdx = textBeforeCaret.endsWith(currentInputString) ? textBeforeCaret.length - currentInputString.substr(currentInputString.lastIndexOf('@')).length : -1; // 이벤트 발생 위치(@가 입력된 위치)

				if (textBeforeCaret[triggerIdx] === '@') { // 이벤트 발생 위치의 텍스트가 @인 경우
					this.queryString = textBeforeCaret.slice(triggerIdx + 1);
					const coord = this.getCaretCoordinates(this.queryString.length + 1); // 현재 커서의 절대 위치 인출
					this.setMentionList(this.queryString);
					const currentLeft = this.mentionListRef.style && +this.mentionListRef.style.left || 0;

					if (currentLeft === 0 || isNaN(currentLeft)) { // 멘션리스트 위치 설정
						this.mentionListRef.style.left = coord.left + 'px';
						this.mentionListRef.style.top = (coord.top + this.mentionFontSize * 1.5) + 'px';
						this.triggerIdx = triggerIdx;
					}
				} else {
					this.hideMentionList();
				}
			}
		},
		/**
		 * 에디터 keyDown이벤트에 바인딩 할 함수
		 * @param event
		 * @param node
		 */
		onKeyDown(event, node) {
			if (this.textareaRef) {
				let keyCaught = false;
				if (node) {
					this.mentionFontSize = parseInt(window.getComputedStyle(node, null).getPropertyValue('font-size'));
				}

				if (this.mentionListData.length) {
					switch (event.keyCode) {
						case 40: // arrowDown
							this.searchMentionIndex = Math.min(this.searchMentionIndex + 1, this.mentionListData.length - 1);
							this.$refs[this.mentionDataRefKey][this.searchMentionIndex].scrollIntoViewIfNeeded(false);
							keyCaught = true;
							break;
						case 38: // arrowUp
							this.searchMentionIndex = Math.max(this.searchMentionIndex - 1, 0);
							this.$refs[this.mentionDataRefKey][this.searchMentionIndex].scrollIntoViewIfNeeded(false);
							keyCaught = true;
							break;
						case 27: // esc
							this.searchMentionIndex = 0;
							this.mentionListData = [];
							keyCaught = true;
							break;
						case 13: // enter
						case 9: // tab
							this.addMention();
							keyCaught = true;
							break;
						case 46: // delete
						case 8: // backspace
							this.onInput();
							break;
					}
				}

				if (keyCaught) {
					event.preventDefault();
				}
			}
		},
		/**
		 * 선택가능한 유저 멘션리스트 데이터 세팅
		 * @param queryString
		 */
		async setMentionList(queryString) {
			if (queryString) {
				const mentionMembers = await this.mentionAllListData;
				if (mentionMembers.length) {
					this.mentionListData = mentionMembers.filter((userInfo) => userInfo.user_nm.includes(queryString));
				}
			} else {
				this.hideMentionList();
			}
		},
		/**
		 * 멘션리스트 숨김처리 및 각종 선택값 초기화
		 */
		hideMentionList() {
			setTimeout(() => {
				if (this.mentionListRef) {
					this.mentionListRef.style.left = 0;
					this.mentionListRef.style.top = 0;
				}
				this.mentionListData = [];
				this.searchMentionIndex = 0;
				this.triggerIdx = null;
				this.queryString = '';
			}, 0)
		},
		/**
		 * 멘션 추가 이벤트
		 */
		addMention() {
			const triggerTextLength = this.queryString.length + 1; // 트리거 문자열의 길이(@가 존재하므로 +1)
			const textBeforeCaret = this.getTextBeforeCaret(); // 커서위치 이전의 문자열 인출(HTML제외)
			const triggerExistenceCount = this.stringExistenceCount(textBeforeCaret, '@' + this.queryString); // 커서 이전의 텍스트에서 트리거 문자열과 일치하는 횟수
			let triggerHTMLIndex = -1; // HTML 문자열 기준으로 멘션 이벤트 발랭한 커서 위치

			// 트리거를 교체할 멘션태그 생성
			const mentionTag = `<input type="button" class="mention-data" value="${this.mentionListData[this.searchMentionIndex].user_nm}" data-user-id="${this.mentionListData[this.searchMentionIndex].user_id}" data-user-email="${this.mentionListData[this.searchMentionIndex].user_email}" data-dept-nm="${this.mentionListData[this.searchMentionIndex].dept_nm}" data-position-nm="${this.positionList[this.mentionListData[this.searchMentionIndex].ofcps_cd].cd_nm || ''}">`

			// 커서 이전 문자열의 마지막 트리거 문자열과 일치하는 위치의 HTML문자 기준 Index 검색
			for (let i = 0; i < triggerExistenceCount; i++) {
				triggerHTMLIndex = this.textareaRef.innerHTML.indexOf('@' + this.queryString);
			}

			const triggerHTMLLastIndex = triggerHTMLIndex + triggerTextLength;
			const triggerPreviousHTML = this.textareaRef.innerHTML.slice(0, triggerHTMLIndex); // 이벤트를 발생시킨 @ 이전 위치의 HTML 인출
			const triggerPostHTML = this.textareaRef.innerHTML.slice(triggerHTMLLastIndex); // 키보드 커서 이후의 HTML(멘션 이벤트 텍스트) 인출

			this.textareaRef.innerHTML = triggerPreviousHTML + mentionTag + '&nbsp;' + triggerPostHTML; // 이벤트를 발생시킨 @ 이전 위치의 HTML 입력

			if (textBeforeCaret.length - triggerTextLength > 0) {
				this.setCaretPosition(textBeforeCaret.length - triggerTextLength + 1); // 키보드 커서 위치 복구
			} else {
				this.setCaretPosition(1);
			}

			this.hideMentionList();
		},
		/**
		 * 뷰어의 멘션에 마우스가 올라갔을 때 툴팁 출력 이벤트
		 * @param event
		 */
		mentionMouseOverEvent(event) {
			if (this.tooltipLayerRef) {
				const viewerOffsetRight = this.viewerRef.offsetLeft + this.viewerRef.offsetWidth;
				this.hoverData.dept_nm = event.target.getAttribute('data-dept-nm');
				this.hoverData.position_nm = event.target.getAttribute('data-position-nm');
				this.hoverData.user_nm = event.target.value;
				this.hoverData.isShow = true;
				this.$nextTick(() => {
					const parentOffsetTop = event.target.offsetParent.nodeName === 'TD' ? event.target.offsetParent.offsetTop + event.target.offsetParent.offsetParent.offsetTop : 0;
					const parentOffsetLeft = event.target.offsetParent.nodeName === 'TD' ? event.target.offsetParent.offsetLeft + event.target.offsetParent.offsetParent.offsetLeft : 0;
					this.tooltipLayerRef.style.top = (event.target.offsetTop + parentOffsetTop + event.target.offsetHeight) + 'px';
					if (event.target.offsetLeft + parentOffsetLeft + this.tooltipLayerRef.offsetWidth < viewerOffsetRight) {
						this.tooltipLayerRef.style.left = (event.target.offsetLeft + parentOffsetLeft) + 'px';
					} else {
						this.tooltipLayerRef.style.left = (viewerOffsetRight - this.tooltipLayerRef.offsetWidth) + 'px';
					}
				});
			}
		},
		/**
		 * 뷰어의 멘션에서 마우스가 벗어낫을 때 툴팁 숨김 이벤트
		 */
		mentionMouseOutEvent() {
			this.hoverData.isShow = false;
		},
		/**
		 * 키보드 커서 이동
		 * @param position
		 */
		setCaretPosition(position) {
			if (position >= 0) {
				const selection = window.getSelection();

				const range = this.createRange(this.textareaRef.parentNode, {
					count: position
				});

				if (range) {
					range.collapse(false);
					selection.removeAllRanges();
					selection.addRange(range);
				}
			}
		},
		/**
		 * 키보드 커서 직전까지의 텍스트 인출
		 * @returns {string}
		 */
		getTextBeforeCaret() {
			const isSupported = typeof window.getSelection !== "undefined";
			if (isSupported) {
				const selection = window.getSelection();
				if (selection.rangeCount !== 0) {
					const range = window.getSelection().getRangeAt(0);
					const preCaretRange = range.cloneRange();
					preCaretRange.selectNodeContents(this.textareaRef);
					preCaretRange.setEnd(range.startContainer, range.endOffset);
					return preCaretRange.toString();
				}
			}
			return '';
		},
		/**
		 * 키보드 커서의 절대 위치 인출
		 * @param queryStringLength
		 * @returns {{top: number, left: number}}
		 */
		getCaretCoordinates(queryStringLength) {
			let left = 0, top = 0;
			const isSupported = typeof window.getSelection !== "undefined";
			if (isSupported) {
				const selection = window.getSelection();
				if (selection.rangeCount !== 0) {
					const range = selection.getRangeAt(0).cloneRange();
					range.setEnd(range.startContainer, range.endOffset - queryStringLength);
					range.collapse(true);
					const rangeRect = range.getBoundingClientRect();
					const textAreaRect = this.textareaRef.getBoundingClientRect();

					if (rangeRect) {
						left = rangeRect.left - textAreaRect.left;
						top = rangeRect.top - textAreaRect.top;
					}
				}
			}
			return {left, top};
		},
		/**
		 * 문자열 내 특정 문자열 반복 횟수
		 * @param string
		 * @param subString
		 * @param allowOverlapping
		 * @returns {number|*}
		 */
		stringExistenceCount(string, subString, allowOverlapping) {
			string += "";
			subString += "";
			if (subString.length <= 0) return (string.length + 1);

			let n = 0,
					pos = 0,
					step = allowOverlapping ? 1 : subString.length;

			while (true) {
				pos = string.indexOf(subString, pos);
				if (pos >= 0) {
					++n;
					pos += step;
				} else break;
			}
			return n;
		},
		/**
		 * 마우스 커서 위치 설정을 위한 범위 설정
		 * @param node
		 * @param chars
		 * @param range
		 * @returns {*}
		 */
		createRange(node, chars, range) {
			if (!range) {
				range = document.createRange()
				range.selectNode(node);
				range.setStart(node, 0);
			}

			if (chars.count === 0) {
				range.setEnd(node, chars.count);
			} else if (node && chars.count > 0) {
				if (node.nodeType === Node.TEXT_NODE) {
					if (node.wholeText.length < chars.count) {
						chars.count -= node.wholeText.length;
					} else {
						range.setEnd(node, chars.count);
						chars.count = 0;
					}
				} else {
					for (let lp = 0; lp < node.childNodes.length; lp++) {
						range = this.createRange(node.childNodes[lp], chars, range);

						if (chars.count === 0) {
							break;
						}
					}
				}
			}

			return range;
		}
	},
	created() {
		// 툴팁에 사용할 부서 직위정보 데이터 인출
		const positionList = getCdList(`${this.userInfo.corp_cd}P`) || [];
		positionList.forEach(value => {
			this.positionList[value.cd_detl_cd] = value;
		});
	}
};