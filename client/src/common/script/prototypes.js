Number.prototype.commaFormat = function () {
	if (this === 0) return 0;

	const reg = /(^[+-]?\d+)(\d{3})/;
	let n = this.toString();

	while(reg.test(n)) {
		n = n.replace(reg, '$1' + ',' + '$2');
	}

	return n;
};

// 문자열 타입에서 쓸 수 있도록 commaFormat() 함수 추가
String.prototype.commaFormat = function () {
	const num = parseFloat(this);
	if (isNaN(num)) {
		return 'isNaN';
	}

	return num.commaFormat();
};

String.prototype.phoneFormat = function () {
	const reg = this.startsWith('0504') ? /(\d{4})(\d{4})(\d)/ : (this.startsWith('02') ? /(\d{2})(\d{3,4})(\d{4})/ : /(\d{3})(\d{3,4})(\d{4})/);

	return this.replace(reg, "$1-$2-$3");
};

// 문자열에 padString을 왼쪽에 붙여서 지정한 길이로 만드는 함수
String.prototype.lpad = function (padString, length) {
	let s = this, i = s.length;
	while (i++ < length) {
		s = padString + s;
	}
	return s;
};

String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.moveElement = function (fromIndex, toIndex) {
	if (fromIndex < 0) {
		fromIndex += this.length;
	}
	if (toIndex < 0) {
		toIndex += this.length;
	}
	if (toIndex >= this.length) {
		var k = toIndex - this.length + 1;
		while (k--) {
			this.push(undefined);
		}
	}
	return this.splice(toIndex, 0, this.splice(fromIndex, 1)[0]);
}

