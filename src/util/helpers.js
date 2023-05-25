import dayjs from 'dayjs';

export const getMonth = (month = dayjs().month()) => {
	const year = dayjs().year();
	const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
	let currentMonthCount = 0 - firstDayOfTheMonth;
	const daysMatrix = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount));
		});
	});
	return daysMatrix;
};

export const thirdSunday = (year, month) => {
	const date = new Date(year, month, 1, 12);
	let weekday = date.getDay();
	let dayDiff = weekday === 0 ? 14 : weekday + 7;
	return date.setDate(date.getDate() - dayDiff);
};
