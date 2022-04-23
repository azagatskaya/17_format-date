'use strict';

const colors = {
	icon: ['fa-moon', 'fa-sun'],
	wrapBg: ['linear-gradient(to bottom, #45484d 0%, #000000 100%)',
		'linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%)'
	],
	elemBg: ['#4c4c51', '#fff'],
	borderCol: ['grey', 'lightgrey'],
	textCol: ['whitesmoke', 'inherit'],
	themeTextCol: ['whitesmoke', 'slategray'],
	btnBg: ['rgb(94, 158, 255)', 'linear-gradient(to bottom, #8fc400 0%,#8fc400 100%)']
}

//  ------------------- DATES & TIME ----------------------

const loadingMoment = new Date();
setInputValue('#year', loadingMoment.getFullYear());
setInputValue('#month', loadingMoment.getMonth() + 1);
setInputValue('#day', loadingMoment.getDate());
setInputValue('#hour', loadingMoment.getHours());
setInputValue('#minute', loadingMoment.getMinutes());

function setInputValue(selector, val) {
	document.querySelector(selector).value = val;
}

function setResult(text) {
	document.querySelector('.result').innerText = text;
}

function getInputValue(selector) {
	return document.querySelector(selector).value;
}

function getFullDate() {
	return new Date(getInputValue('#year'), getInputValue('#month') - 1, getInputValue('#day'), getInputValue('#hour'), getInputValue('#minute'));
}

document.querySelector('.btn__format').addEventListener('click', compareDates);

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

// ----------------- THEMES ----------------------------

getThemeCard().addEventListener('click', changeMenuDisplay);

document.querySelector('.sub-menu__link--dark').addEventListener('click', () => changeTheme('dark'));

document.querySelector('.sub-menu__link--light').addEventListener('click', () => changeTheme('light'));

function changeTheme(theme) {
	let i;
	(theme === 'dark') ? i = 0: (theme === 'light') ? i = 1 : console.log("Theme doesn't exist");
	setThemeIcon(getElement('.theme__img'), colors.icon[i]);
	setBackground(getElement('.wrapper'), colors.wrapBg[i]);
	setBackground(getElements('.item > input, .sub-menu__link, .rand-gen__data'), colors.elemBg[i]);
	setBorderColor(getElements('.item > input, .rand-gen__data, .sub-menu__link'), colors.borderCol[i]);
	setColor(getElements('.item > label, .theme__img, .menu__link, .sub-menu__link'), colors.themeTextCol[i]);
	setColor(getElements('.item > input, .result'), colors.textCol[i]);
	setBackground(getElement('.btn__format'), colors.btnBg[i]);
	setBackground(getElement('.rand-gen__btn'), colors.btnBg[i]);
	hideElement(getThemeMenu());
}

function getElements(selector) {
	return document.querySelectorAll(selector);
}

function getElement(selector) {
	return document.querySelector(selector);
}

function getThemeCard() {
	return document.querySelector('.menu__list a');
}

function getThemeMenu() {
	return document.querySelector('.sub-menu__list');
}

function setThemeIcon(element, icon) {
	if (icon === 'fa-sun') {
		element.classList.remove('fa-moon');
	} else {
		element.classList.remove('fa-sun');
	}
	element.classList.add(icon);
}

function setBackground(element, color) {
	if (element.length) {
		for (let e of element) {
			e.style.backgroundColor = color;
		}
	} else {
		element.style.background = color;
	}
}

function setBorderColor(setOfElements, color) {
	for (let el of setOfElements) {
		el.style.borderColor = color;
	}
}

function setColor(setOfElements, color) {
	for (let el of setOfElements) {
		el.style.color = color;
	}
}

function isMenuDisplayed() {
	return getThemeMenu().style.display === 'block';
}

function changeMenuDisplay() {
	return isMenuDisplayed() ? hideElement(getThemeMenu()) : showElement(getThemeMenu());
}

function showElement(element) {
	element.style.display = 'block';
}

function hideElement(element) {
	element.style.display = 'none';
}

// ---------------------- Random Generator ------------------

document.querySelector('.rand-gen__btn').addEventListener('click', genAndCalc);


function genAndCalc() {
	const arr = generateRandomNumbers();
	printNumbers(arr);
	calculate(arr);
}

function generateRandomNumbers() {
	let randomArr = [];
	for (let i = 0; i < 10; i++) {
		let randNum = Math.round(Math.random() * (10 - (-10)) + (-10));
		randomArr.push(randNum);
	}
	return randomArr;
}

function printNumbers(arr) {
	document.querySelector('.rand-gen__data').innerText = arr.toString();
}

function calculate(arr) {
	const min = Math.min(...arr);
	const max = Math.max(...arr);
	const round = Math.round(...arr);
	const sum = arr.reduce((a, b) => {
		return a + b;
	});
	const mult = arr.reduce((a, b) => {
		return a * b;
	});
	document.querySelector('.rand-gen__results').innerText = `Минимальное: ${min}\nМаксимальное: ${max}\nСреднее арифметическое: ${round}\nСумма чисел: ${sum}\nПроизведение чисел: ${mult}`;
}