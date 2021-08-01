let events = [
		
	{
			data: '2021/07/14',
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



