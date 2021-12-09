// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
let sortCount = 0;

function solution(A) {
	// write your code in JavaScript (Node.js 8.9.4)
	if (Array.isArray(A)) {
		if (A.length) {
			sort(A);
		}
		return sortCount;
	}

	return -1;
}

function sort(array) {
	if (array.length > 1) {
		const middleIndex = Math.floor(array.length / 2);
		const leftArray = array.slice(0, middleIndex);
		const rightArray = array.slice(middleIndex);

		return merge(sort(leftArray), sort(rightArray));
	}
	return array;
}

function merge(leftArray, rightArray) {
	let mergeResult = [];
	while (leftArray.length || rightArray.length) {
		let spliceIndexes = [];
		if (leftArray.length) {
			for (let rightIndex = 0; rightIndex < rightArray.length; rightIndex++) {
				if (rightArray[rightIndex] < leftArray[0]) {
					mergeResult.push(rightArray[rightIndex]);
					spliceIndexes.push(rightIndex);
					sortCount++;
				} else {
					break;
				}
			}
			if (spliceIndexes.length) {
				spliceIndexes.reverse();
				for (const index of spliceIndexes) {
					rightArray.splice(index, 1);
				}
			}

			mergeResult.push(...leftArray.splice(0, 1));
			sortCount += leftArray.length * spliceIndexes.length;

		} else {
			for (let rightIndex = 0; rightIndex < rightArray.length; rightIndex++) {
				mergeResult.push(rightArray[rightIndex]);
			}
			break;
		}
	}

	return mergeResult;
}