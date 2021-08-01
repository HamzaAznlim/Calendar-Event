const days__months = document.getElementById('days__months');
const toDay_ = document.getElementById('toDay_');
const arrow__next = document.querySelector('.arrow__next');
const arrow__prev = document.querySelector('.arrow__prev');
const close__model = document.querySelector('.close__model');
const input__model = document.querySelector('.input__model');
const model__Calendar = document.querySelector('#model__Calendar');
const model__Calendar__save = document.querySelector('#model__Calendar__save');

let whatMonth = 0,
	dayClickedOn = null;

let eventsArr = localStorage.getItem('events')
	? JSON.parse(localStorage.getItem('events'))
	: [];

const weekdaysArray = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

close__model.addEventListener('click', (e) => {
	model__Calendar.classList.add('remove__model');

	input__model.value = '';
	dayClickedOn = null;
	load__();
});

model__Calendar__save.addEventListener('click', () => {
	if (input__model.value === '') {
		alert('Please enter a something!!');
	} else {
		eventsArr.push({
			data: dayClickedOn,
			title: input__model.value,
		});
		localStorage.setItem('events', JSON.stringify(eventsArr));

		model__Calendar.classList.add('remove__model');
		dayClickedOn = null;
		input__model.value = '';
		load__();
	}
});

const showModel = (date) => {
	dayClickedOn = date;
	const eventDay = eventsArr.find((item) => item.data === dayClickedOn);

	if (eventDay) {
		var proceed = confirm('Are you sure you want to proceed?');

		if (proceed) {
			eventsArr = eventsArr.filter((event) => event.data !== dayClickedOn);
			localStorage.setItem('events', JSON.stringify(eventsArr));
			load__();
		} else {
			return;
		}
	} else {
		model__Calendar.classList.remove('remove__model');
	}
};

const load__ = () => {
	const Dt = new Date();

	if (whatMonth !== 0) {
		Dt.setMonth(new Date().getMonth() + whatMonth);
	}

	const day = Dt.getDate();
	const month = Dt.getMonth();
	const year = Dt.getFullYear();

	days__months.innerHTML = '';

	const firstDayOfMonth = new Date(year, month, 1);
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
		weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});
	const toDay = firstDayOfMonth.toLocaleDateString('en-us', {
		month: 'long',
		year: 'numeric',
	});

	const paddingDays = weekdaysArray.indexOf(dateString.split(', ')[0]);

	toDay_.innerText = toDay;

	for (let i = 1; i <= paddingDays + daysInMonth; i++) {
		const daySquare = document.createElement('div');

		const fullDate = `${month + 1}/${i - paddingDays}/${year}`;
		daySquare.classList.add('day_');

		if (i > paddingDays) {
			daySquare.innerText = i - paddingDays;

			const eventDay = eventsArr.find((item) => item.data === fullDate);

			if (eventDay) {
				EventDiv = document.createElement('div');
				EventDiv.classList.add('note');
				EventDiv.innerText = eventDay.title;
				daySquare.appendChild(EventDiv);
			}

			daySquare.addEventListener('click', () => showModel(fullDate));
		} else {
			daySquare.classList.add('disabled_');
		}

		if (day == i - paddingDays && month == new Date().getMonth()) {
			daySquare.classList.add('currentDay');
		}

		days__months.appendChild(daySquare);
	}
};

const initBtn = () => {
	arrow__next.addEventListener('click', () => {
		whatMonth++;
		load__();
	});

	arrow__prev.addEventListener('click', () => {
		whatMonth--;
		load__();
	});
};

initBtn();
load__();
