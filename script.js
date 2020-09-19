//Array of hours included in the work day scheduler (9-5)
var hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]

// Finds the current day and hour with moment.js and displays it in the paragraph with class currentDay
$("#currentDay").html(moment().format('dddd') + "<br>" + moment().format('MMMM Do YYYY')

// Gets tasks from localStorage and parses them with JSON
var tasks = localStorage.getItem('tasksInput');
if(tasks){
    tasks = JSON.parse(tasks);
} else {
    tasks = []
}

// For loop for each element in the hours array
for (i=0; i < hours.length; i++) {
    // Creates new row for every hour in the array
    var row = $("<div>");
    row.addClass("row time-block")
    // Creates div to display the hour for every hour in the array and gives it an ID equivalent to the hour it shows in military time (rowHour)
    var hourDiv = $("<div>")
    hourDiv.addClass("col-md-2 hour")
    var rowHour = i + 9
    console.log(rowHour)
    hourDiv.attr("id", rowHour)
    hourDiv.text(hours[i])
    // Creates a text area where people can input their tasks
    var timearea = $("<textarea>")
    timearea.addClass("col-md-8")
    timearea.attr("id", i);
    // Function that goes through the array of tasks in local storage and logs them in the hour text area if they correspond to the hour
    for (j=0; j < tasks.length; j++) {
        if (tasks[j].inputHr == JSON.parse(timearea.attr("id"))) {
                timearea.text(tasks[j].inputTask)
            }
        }
    //Creates a save button for every row
    var saveBtn = $("<button>")
    saveBtn.addClass("col-md-2 saveBtn")
    saveBtn.text("CLICK TO SAVE")
    saveBtn.attr("data-hour", i)

    // Gets the current hour in military time with moment.js and parses it with JSON
    var thisHour = JSON.parse(moment().format('H'))
    console.log(thisHour)

    // Gets the id of every hour Div and logs it as a variable
    var rowHour = hourDiv.attr("id")
    console.log(rowHour);

    // Adds classes past, present, and future depending if a row's hour is before, after, or the same as the current hour
    if (rowHour < thisHour) {
        timearea.addClass("past");
    } else if (rowHour > thisHour) {
        timearea.addClass("future");
    } else if (rowHour = thisHour) {
        timearea.addClass("present");
    }
    
    // Appends the hour div, text area, and save buttons to the row
    row.append(hourDiv)
    row.append(timearea)
    row.append(saveBtn)

    // Appends the row to the container
    $(".container").append(row)
}


// Click function for the save button
$(".saveBtn").on("click", function(event) {
    // Logs the element that was clicked
    var btnHr = $(this).attr("data-hour");
    console.log($(this));
    // Logs the input text of its sibling text area, which is what the users input
    var inputText = $(this).siblings("textarea").val();
    console.log(inputText);
    // Saves the hour and input text in a variable and pushes it to the array of previously recorded tasks
    var rowInput = {
        inputHr: btnHr,
        inputTask: inputText
    };
    tasks.push(rowInput);
    // Sets item in local storage to the tasks array and stringify it with JSON
    localStorage.setItem('tasksInput', JSON.stringify(tasks))

})


