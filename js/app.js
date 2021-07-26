

const days__months = document.getElementById('days__months');
const toDay_  = document.getElementById('toDay_');
const arrow__next  = document.querySelector('.arrow__next');
const arrow__prev  = document.querySelector('.arrow__prev');
const close__model  = document.querySelector('.close__model');
const model__Calendar  = document.querySelector('#model__Calendar');

let whatMonth = 0,
    dayClickedOn=null;

const weekdaysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



close__model.addEventListener('click',(e)=>{

    model__Calendar.style.display='none';

   document.querySelector('.input__model').value="";


  

})



const load__ = () => {

    const Dt =  new Date();


    if(whatMonth !== 0){
        Dt.setMonth(new Date().getMonth() + whatMonth);
    }

    const day = Dt.getDate();
    const month = Dt.getMonth();
    const year = Dt.getFullYear();


    

    days__months.innerHTML = '';

    const firstDayOfMonth = new Date(year,month,1);
    const daysInMonth = new Date(year,month+1,0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday:'long',
        year:'numeric',
        month:'numeric',
        day:'numeric',
    });
    const toDay = firstDayOfMonth.toLocaleDateString('en-us',{
        month:'long',
        year:'numeric',
    });

    const paddingDays = weekdaysArray.indexOf(dateString.split(', ')[0]);

    toDay_.innerText =toDay;

    for(let i = 1; i <= paddingDays + daysInMonth; i++ ){

        const daySquare = document.createElement('div');
        daySquare.classList.add('day_');

        if(i > paddingDays) {

            daySquare.innerText= i - paddingDays;

            daySquare.addEventListener('click',(e)=> {

                if(model__Calendar.style.display == 'none'){
                    model__Calendar.style.display='block';
                } else{
                    model__Calendar.style.display='none';
                }
            });

        }else{
            daySquare.classList.add('disabled_');
        }

        if(day == i - paddingDays && month == new Date().getMonth()){
            daySquare.classList.add('currentDay');
        }

        days__months.appendChild(daySquare);

    }


}

const initBtn = () =>{

    arrow__next.addEventListener('click',()=>{
        whatMonth++;
        load__();
    });

    arrow__prev.addEventListener('click',()=>{
        whatMonth--;
        load__();
    });

};

initBtn();
load__();





