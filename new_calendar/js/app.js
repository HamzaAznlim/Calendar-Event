const dateToDay = document.getElementById('date__controller_show'),
 	  nextMonth = document.getElementById('next__month'),
	  prevMonth = document.getElementById('prev__month'),
	  daysMonth	= document.getElementById('days__month'),
	  hideMainModel = document.querySelector('.model__Calendar__header--remove'),
	  save = document.getElementById('save'),
	  modelCalendarMain = document.querySelector('.model__Calendar'),
	  title = document.getElementById('title'),
	  body  = document.getElementById('body'),
	  removePreview  = document.getElementById('remove__preview'),
	  deleteEvent  = document.getElementById('delete_event');
	  

let events = localStorage.getItem('events')
	? JSON.parse(localStorage.getItem('events'))
	: [];

let dayClickedOn = null;
let idEvent=null;
let whatMonth 	 = 0;


const weekdaysArray = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];


const selectColor = () => {

	const colors =  Array.from(document.querySelectorAll('.color_'))

	colors.forEach((element) => {

		element.addEventListener('click',(e)=>{

			document.querySelector('.color_.active').classList.remove('active');

			e.currentTarget.classList.add('active');
			
			console.log(e.currentTarget);

		})
	})



}

selectColor();

/*
---------------------------------------------------------------------
---------------------------------------------------------------------
---------------------------------------------------------------------
*/

nextMonth.addEventListener('click', () => {
	whatMonth++;
	renderCalendar();
});

prevMonth.addEventListener('click', () => {
	whatMonth--;
	renderCalendar();
});

// Hide Main Model 
hideMainModel.addEventListener('click', ()=>{ modelCalendarMain.style.display= 'none';})

// Hide Preview Model 
removePreview.addEventListener('click', ()=>{ document.querySelector('.preview__model').style.display= 'none';})

// Call addEvent function for adding Events on Click 
save.addEventListener('click',()=> addEvent())



// Show Main Model 
const showModel = (e)=>{

	 
	if(e.target.classList.contains('eventNote')){

		document.querySelector('.preview__model').style.display= 'block';

		dayClickedOn = e.target.parentElement.getAttribute('to-date');
		
		idEvent = e.target.getAttribute('id-event');

		const result = events.filter((el)=> el.date === dayClickedOn)[0].arrEvents.find((el)=> el.id ==idEvent);

		console.log(result);
		document.querySelector('#preview__model__title').textContent = result.title;
		document.querySelector('#preview__model__body').textContent = result.body;
		return;
		
	}

	modelCalendarMain.style.display= 'block';
	dayClickedOn = e.currentTarget.getAttribute('to-date');
}




/*
=======================================================================
	Clear the Inputs And load function  => renderCalendar
=======================================================================
*/

const clearAndCall = ()=>{

	modelCalendarMain.style.display= 'none';
	title.value = "";
	body.value = "";
	renderCalendar();

}


/*
=======================================================================
	Add Event to The array [Events]  and set it to localStorage 
=======================================================================
*/
const addEvent = () =>{

	if(title.value === "" || body.value === ""){
		alert("check")
		return;
	}

	const color  = document.querySelector('.color_.active').getAttribute('data-color');

	const element = {	
		id: events.length+1,
		title :title.value,
		body: body.value,
		color
	};	
	
	let booleanTYPE;

	events.map((el)=> {
		if(el.date == dayClickedOn){
			booleanTYPE = true;
			return;
		}else{
			booleanTYPE = false;
			return;
		}
	})

	
	if(booleanTYPE){

		events.filter((el)=> el.date == dayClickedOn)[0].arrEvents.push(element);
		clearAndCall();
		
	}else{
		events.push({
			date:dayClickedOn,
			arrEvents: [
				element	
			]	
		})
		
		clearAndCall();
	}

	localStorage.setItem('events', JSON.stringify(events));

}



/*
=======================================================================
	Remove Event from Events array
=======================================================================
*/
console.log(events)

const removeEvent = (date,id) =>{


	let arr = {date: date,arrEvents:events.filter((el)=> el.date == date)[0].arrEvents.filter((item)=> item.id != id)};
	let index_s = 0;

	 let dez = events.map((el,index)=>{
		if(el.date == date) {
			index_s=index;
		}
		return el
	})


	let removed = events.splice(index_s, index_s, arr);

	console.log(events);
	
	localStorage.setItem('events', JSON.stringify(events));
	renderCalendar();
	document.querySelector('.preview__model').style.display= 'none';

}

deleteEvent.addEventListener('click', ()=> removeEvent(dayClickedOn,idEvent))

/*
=======================================================================
	display All Events in the (.day) class 
=======================================================================
*/




const renderDays = () =>{

	if(events.length === 0){
		
		return;
	}
	document.querySelectorAll('.day').forEach((el)=>{

			const eventDay = events.filter((item)=> item.date === el.getAttribute('to-date'))[0];
			console.log(eventDay)
			if(typeof eventDay !== 'undefined'){
				
					eventDay.arrEvents.forEach((item)=>{
	
						const EventDiv = document.createElement('div');
						EventDiv.setAttribute('id-event',item.id);
						EventDiv.classList.add('eventNote');
						EventDiv.classList.add(item.color);
						EventDiv.innerText = item.title.substring(0,15) +'..' ;
						el.appendChild(EventDiv);
	
					})
	
			}

	})


}

/*
=================================================================================
	Render All  Calendar Date load days month  in element => (#days__month)
=================================================================================
*/
const renderCalendar = () =>{
	daysMonth.innerHTML = '';

	const Dt = new Date();

	if (whatMonth !== 0) {
		Dt.setMonth(new Date().getMonth() + whatMonth);
	}

	const day = Dt.getDate(),
	 	  month = Dt.getMonth(),
	      year = Dt.getFullYear(),
	 	  firstDayOfMonth = new Date(year, month, 1),
		  daysInMonth = new Date(year, month + 1, 0).getDate();

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

	const positionOfDayOfWeek = weekdaysArray.indexOf(dateString.split(', ')[0]);

	dateToDay.innerText = toDay;

	for(let i = 1; i <= positionOfDayOfWeek + daysInMonth ; i++){

		const daySquare = document.createElement('div');
		const fullDate = `${month + 1}/${i - positionOfDayOfWeek}/${year}`;
		daySquare.className='day';
		daySquare.setAttribute('to-date',fullDate);

		const span = document.createElement('span');
		span.className='day_num';

		if (i > positionOfDayOfWeek){

			span.innerText = i - positionOfDayOfWeek;
			daySquare.appendChild(span);

			daySquare.addEventListener('click',(e)=>showModel(e))



		} else {
			daySquare.classList.add('disabled');
		}

		if (day == i - positionOfDayOfWeek && month == new Date().getMonth()) {
			span.classList.add('active');
		}

		daysMonth.appendChild(daySquare);

	}

	renderDays();

}


renderCalendar();