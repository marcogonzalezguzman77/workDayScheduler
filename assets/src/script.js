//Defines hourPerDay Array on schedulle
var hoursPerDay = ["8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM","9PM"];

//print the current day on page
var currentDayEl = $('#currentDay');
var today = moment();
currentDayEl.text(today.format("MMM Do, YYYY, h:mm:ss A"));

//actual day variable 
var actualDayO = today.format("YYYY-MM-DD");
console.log('Actual Day for Object ',actualDayO);

//activites array empty with a n length
var activitiesArray = new Array(hoursPerDay.length);

//initial day Scheduler object with no hours and no activities values;
var daySchedulerLocalMemory= {
    actualDay: actualDayO,
    hours: hoursPerDay,  
    activities: activitiesArray
};

//Search Activities on local storage
var daySchedulerLocalStorage = JSON.parse(localStorage.getItem("daySchedulerLocalStorage"));

/* INITIALIZE LOCAL STORAGE VALUES */
//if there is no variable dayScheduler on LocalStorage save daySchedulerLocalMemory on LocalStorage
if (!daySchedulerLocalStorage) {
    console.log('there is no variable on local storage');
    //daySchedulerLocalStorage = daySchedulerLocalMemory;
    //Save on local storage the daySchedulerLocalMemory Object
    localStorage.setItem("daySchedulerLocalStorage", JSON.stringify(daySchedulerLocalMemory));
//if there is any value on local storage
} else{   
    console.log('there is a variable on local storage');  
    //if the value of the actual day is another day (not today)
    //initialize the daySchedulerLocalStorage and save daySchedulerLocalMemory on LocalStorage
    if (daySchedulerLocalStorage.actualDay != actualDayO){
        daySchedulerLocalStorage = daySchedulerLocalMemory;
        //Save on local storage the daySchedulerLocalMemory Object
        localStorage.setItem("daySchedulerLocalStorage", JSON.stringify(daySchedulerLocalMemory));
    }
}

console.log('hoursPerDay ',hoursPerDay);
console.log('daySchedulerLocalStorage ',daySchedulerLocalStorage);


//RENDER THE SCHEDULLE

var containerEl = $('#container');

//create ul element for activities
var ulEl = $('<ul>');
ulEl.attr('class', 'list-group');
ulEl.attr('id','activities-list');

//Hour variables used for background colors
var actualHour = moment().format("h");
var actualAmPm = moment().format("A");
var actualHourAmPm = actualHour+actualAmPm;
var positionActualHourAmPm = jQuery.inArray(actualHourAmPm,hoursPerDay);
console.log('Hour ',actualHour);
console.log('day or night',actualAmPm);
console.log('Actual Hour',actualHourAmPm);
console.log('Day position: ',positionActualHourAmPm);


//cicle for all the activites hours
//i represents the position of the hours in the hourPerDay array
for (var i = 0; i < hoursPerDay.length; i++) {
       
    //li element
    var liEl = $('<li>');        
    liEl.addClass("list-group-item d-flex flex-row p-2 text-white ulli");
      
    //hours element
    var spanHoursEl = $('<span>');
    spanHoursEl.text(hoursPerDay[i]);
    spanHoursEl.addClass("p-2 hour");
    liEl.append(spanHoursEl);

    //textarea element 'activites'
    var textAreaEl = $('<textarea>');
    //textAreaEl.text('Empty');

    //put the values of the activities from localstorage
    textAreaEl.text(daySchedulerLocalStorage.activities[i]);
        
    //for positions less than the actual hour
    textAreaEl.addClass("p-2 bg-secondary");
        
    //if the position is the actual hour
    if (i == positionActualHourAmPm){
        textAreaEl.addClass("p-2 bg-danger");
    }

    //if the position more than the actual hour
    if (i > positionActualHourAmPm){
        textAreaEl.addClass("p-2 bg-success");
    }
    //add textarea to li elemnt
    liEl.append(textAreaEl);
    
    //button element
    var buttonEl = $('<span>'); 
    buttonEl.html('<i class="bi bi-save"></i>')      
    buttonEl.addClass("p-2 saveBtn");
    liEl.append(buttonEl);

    //add the li element to ul
    ulEl.append(liEl);
} //End for


//add the ul element to the container
containerEl.append(ulEl);


//SAVE EVENTS when click on save button inside list (span with class saveBtn)

var activitiesListEl = $('#activities-list');

activitiesListEl.on('click', '.saveBtn', function (event) {
  
    //console.log('Click on: ',event.target);
    //console.log('parentElement',this.parentElement);
    //console.log('children cliked',$(this).index());
    
    var activitieNumberSelected = $(this.parentElement).index();
    console.log('parentElement',activitieNumberSelected);
    
    //console.log('Activitie writed ',containerEl.children('ul').children('li').eq(activitieNumberSelected).children().eq(1).text('Here we are'));
    
    //get the value of the textarea, activitieNumberSelected is the children number of ul (the li activitie) and eq(1) is the textarea inside li
    var activitieValue = containerEl.children('ul').children('li').eq(activitieNumberSelected).children().eq(1).val();
    console.log('Activitie writed ',activitieValue);

    //Search Activities on local storage
    var daySchedulerLocalStorageVolatil = JSON.parse(localStorage.getItem("daySchedulerLocalStorage"));
    daySchedulerLocalStorageVolatil.activities[activitieNumberSelected] = activitieValue;
    
    console.log('new object with activitie ',daySchedulerLocalStorageVolatil);

    //save the activitie on the local storage
    localStorage.setItem("daySchedulerLocalStorage", JSON.stringify(daySchedulerLocalStorageVolatil));

    alert("Activitie saved!");
    location.reload();
    
    
  });//end on.click