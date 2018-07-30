
const blockBookedDates = (reservations, minStay) => {
	let blockedDates = new Set();
	reservations.forEach(reservation => {
		let start = reservation.checkIn.getDate();
		let end = reservation.checkOut.getDate();
		for ( var i = 1; i < minStay; i++) {
			blockedDates.add(start-i);
		}

		for (var i= start; i<end; i++) {
			blockedDates.add(i);
		}
	});
	return [...blockedDates];
}

const blockDatesBeforeTarget = (targetDate) => {
	let blockedDates = [];

	for (var i = 1; i < targetDate.getDate(); i++) {
		blockedDates.push(i);
	}
	return blockedDates;
}

const blockEntireMonth = () => {
	return blockDatesBeforeTarget (32);
}

const blockDatesAfterTarget = (targetDate) => {
	let blockedDates = [];
	for (var i = targetDate.getDate(); i < 32; i++) {
		blockedDates.push(i);
	}
	return blockedDates;
}

const getYearMonth = (date) => {
	if (!date) return null;
	return [date.getFullYear(), date.getMonth()];
}

const getYearMonthDate = (date) => {
	if (!date) return null;
	return [date.getFullYear(), date.getMonth(), date.getDate()];
}

const getMonthYearString = (date) => {
	var options = {year: 'numeric', month: 'long'};
	return date.toLocaleString('en-US', options);
}

const getFirstDayOfMonth = (date) => {
	return new Date(...getYearMonth(date), 1).getDay();
}

const getMonthLength = (date) => {
	let dateArr = getYearMonth(date);
	return new Date (dateArr[0], dateArr[1] + 1, 0).getDate();
}

const getAdjacentMonth = (date, direction) => {
	let value = direction === 'next'? 1 : -1;
	let current = getYearMonth(date);
	let newMonth = [current[0], current[1] + value, 1];
	return new Date (...newMonth);
}

const isTargetSameMonth = (current, target) => {
	if (!target) return false;

	current = getYearMonth (current);
	target = getYearMonth (target);

	return current[0] === target[0] && current[1] === target[1];
}

const isTargetFutureMonth = (current, target) =>{
	if (!target) return false;

	current = getYearMonth(current);
	target = getYearMonth(target);

	if (current[0] < target[0]) return true;
	if (current[0] === target[0] && current[1] < target[1]) return true;
	return false;
}

const isTargetPastMonth = (current, target) => {
	if (!target) return false;

	return isTargetFutureMonth(target, current);
}

module.exports = {
	blockBookedDates,
	blockDatesBeforeTarget,
	blockDatesAfterTarget,
	blockEntireMonth,
	getYearMonth,
	getYearMonthDate,
	getFirstDayOfMonth,
	getMonthLength,
	getAdjacentMonth,
	getMonthYearString,
	isTargetFutureMonth,
	isTargetSameMonth,
	isTargetPastMonth
}