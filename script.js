var hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"]

$("#currentDay").html(moment().format('dddd') + "<br>" + moment().format('MMMM Do YYYY') + "<br>" + moment().format('h:mm:ss a'))

var tasks = localStorage.getItem('tasksInput');
if(tasks){
    tasks = JSON.parse(tasks);
} else {
    tasks = []
}
console.log(tasks)


for (i=0; i < hours.length; i++) {
    var row = $("<div>");
    row.addClass("row time-block")
    var hourDiv = $("<div>")
    hourDiv.addClass("col-md-2 hour")
    var rowHour = i + 9
    console.log(rowHour)
    hourDiv.attr("id", rowHour)
    hourDiv.text(hours[i])
    var timearea = $("<textarea>")
    timearea.addClass("col-md-8")
    timearea.attr("id", i);
    for (j=0; j < tasks.length; j++) {
        if (tasks[j].inputHr == JSON.parse(timearea.attr("id"))) {
                timearea.text(tasks[j].inputTask)
            }
        }

    var saveBtn = $("<button>")
    saveBtn.addClass("col-md-2 saveBtn")
    saveBtn.attr("data-hour", i)

    var thisHour = JSON.parse(moment().format('H'))
    console.log(thisHour)
   
    var rowHour = hourDiv.attr("id")
    console.log(rowHour);

    if (rowHour < thisHour) {
        timearea.addClass("past");
    } else if (rowHour > thisHour) {
        timearea.addClass("future");
    } else if (rowHour = thisHour) {
        timearea.addClass("present");
    }
    
    row.append(hourDiv)
    row.append(timearea)
    row.append(saveBtn)
    $(".container").append(row)

   

}


   
$(".saveBtn").on("click", function(event) {
    var btnHr = $(this).attr("data-hour");
    console.log($(this));
    var inputText = $(this).siblings("textarea").val();
    console.log(inputText);
    var rowInput = {
        inputHr: btnHr,
        inputTask: inputText
    };
    tasks.push(rowInput);
    localStorage.setItem('tasksInput', JSON.stringify(tasks))

})


