'use strict';
const loadingMoment = new Date();
setInputYear(loadingMoment.getFullYear());
setInputMonth(loadingMoment.getMonth());
setInputDay(loadingMoment.getDate());
setInputHour(loadingMoment.getHours());
setInputMinute(loadingMoment.getMinutes());

function setInputYear(year) {
	document.querySelector('#year').value = year;
}

function setInputMonth(month) {
	document.querySelector('#month').value = month + 1;
}

function setInputDay(day) {
	document.querySelector('#day').value = day;
}

function setInputHour(hour) {
	document.querySelector('#hour').value = hour;
}

function setInputMinute(minute) {
	document.querySelector('#minute').value = minute;
}

function setResult(text) {
	document.querySelector('.result').innerText = text;
}

function getInputYear() {
	return document.querySelector('#year').value;
}

function getInputMonth() {
	return document.querySelector('#month').value - 1;
}

function getInputDay() {
	return document.querySelector('#day').value;
}

function getInputHour() {
	return document.querySelector('#hour').value;
}

function getInputMinute() {
	return document.querySelector('#minute').value;
}

function getFullDate() {
	return new Date(getInputYear(), getInputMonth(), getInputDay(), getInputHour(), getInputMinute());
}

document.querySelector('button').addEventListener('click', compareDates);

function compareDates() {
	formatDate(getFullDate());
}

function formatDate(date) {
	const diff = new Date() - date;
	if (diff < 1000) {
		setResult('Прямо сейчас');
	} else if (Math.round(diff < 60 * 1000)) {
		setResult(`${Math.round(diff / 1000)} сек. назад`);
	} else if (diff < 60 * 60 * 1000) {
		setResult(`${Math.round(diff / 1000 / 60)} мин. назад`);
	} else {
		var options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			timezone: 'UTC'
		};
		const woComma = date.toLocaleString("ru", options).replace(',', '');
		setResult(woComma);
	}
}