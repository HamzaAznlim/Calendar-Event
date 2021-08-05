let events = [
		
	{
			date: '2021/07/14',
			arrEvents: [
				{
					id: 1,
					title :"React.js",
					body: "Just a test for React"
				},
				{
					id: 12,
					title :"React Api",
					body: "consume an Api"
				},
			]	
		},
        
		{
			data: '2021/07/30',
			arrEvents: [
				{	
					id: 124,
					title :"React.js",
					body: "Just a test for React"
				},		
			]	
		}

]



// Add Event 

const addEvent = (DateString,element)=>{
	
    let booleanTYPE;

	events.map((el)=> {
		if(el.data == DateString){
			booleanTYPE = true;
			return;
		}else{
			booleanTYPE = false;
			return;
		}
	})

	
	if(booleanTYPE){

		events.filter((el)=> el.data == DateString)[0].arrEvents.push(element);
		
	}else{
		events.push({
			data:DateString,
			arrEvents: [
				element	
			]	
		})
	}
}

addEvent('2021/07/30',{	
	id: 12454,
	title :"Laravel ",
	body: "Create API Auth User"
})


// VIEW Event


const getEvent = (date,id)=>{

    return events.filter((el)=> el.data === date)[0].arrEvents.find((el)=> el.id ==id);
}



// editEvent function

const editEvent = (date, arr,id)=>{

	events = arr.map((el)=>{

		if(el.data === date) {

			el.arrEvents.map((item)=>{
				if(item.id == id){
					item.title = "hamza"
				}

				return {...item}
			})
		}
		return el;

	})
	
}

editEvent('2021/07/14',events,12);



// <div class="day disabled"></div>
// 				<div class="day disabled"></div>
// 				<div class="day disabled"></div>
// 				<div class="day disabled"></div>
// 				<div class="day">
// 					<span class="day_num">1</span>
// 					<div class="eventNote">Api Consume</div>
// 				</div>
// 				<div class="day"><span class="day_num">2</span></div>
// 				<div class="day"><span class="day_num">3</span></div>
// 				<div class="day"><span class="day_num">4</span></div>
// 				<div class="day"><span class="day_num">5</span></div>
// 				<div class="day"><span class="day_num">6</span></div>
// 				<div class="day"><span class="day_num">7</span></div>
// 				<div class="day"><span class="day_num">8</span></div>
// 				<div class="day"><span class="day_num">9</span></div>
// 				<div class="day"><span class="day_num">10</span></div>
// 				<div class="day"><span class="day_num">11</span></div>
// 				<div class="day"><span class="day_num">12</span></div>
// 				<div class="day"><span class="day_num">13</span></div>
// 				<div class="day">
// 					<span class="day_num">14</span>
// 					<div class="eventNote">Wordpress Api</div>
// 					<div class="eventNote note__bg-danger">Laravel Api Crud</div>
// 				</div>
// 				<div class="day"><span class="day_num">15</span></div>
// 				<div class="day"><span class="day_num">16</span></div>
// 				<div class="day"><span class="day_num">17</span></div>
// 				<div class="day"><span class="day_num">18</span></div>
// 				<div class="day"><span class="day_num">19</span></div>
// 				<div class="day"><span class="day_num">20</span></div>
// 				<div class="day"><span class="day_num">21</span></div>
// 				<div class="day"><span class="day_num">22</span></div>
// 				<div class="day"><span class="day_num">23</span></div>
// 				<div class="day"><span class="day_num">24</span></div>
// 				<div class="day"><span class="day_num">25</span></div>
// 				<div class="day"><span class="day_num">26</span></div>
// 				<div class="day"><span class="day_num">27</span></div>
// 				<div class="day"><span class="day_num active">28</span></div>
// 				<div class="day">
// 					<span class="day_num">29</span>
// 					<div class="eventNote note__bg-primary">PHP Framework</div>
// 				</div>
// 				<div class="day"><span class="day_num">30</span></div>
// 				<div class="day"><span class="day_num">31</span></div>
// 			</div>