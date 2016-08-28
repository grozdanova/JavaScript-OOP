/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(arr) {
	if (arr === undefined) {
		throw new Error();
	}
	if (arr.length == 0) {
		return null;
	}
	if (arr.some(function (element) {
		return isNaN(element);
	})) {
		throw new Error('All array elements must be a numbers!');
	}
	arr = arr.map(Number);
	return arr.reduce(function (s, n) {
		return s += n;
	}, 0);
}

module.exports = sum;