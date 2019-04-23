jQuery(document).ready(function () {
    jQuery('.timepicker').timepicker({
        twelveHour: false,
    });
});

var database = firebase.database();

$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();

    if (!$("#trainName-input").val().trim()) {
        alert("Add Train Name")
        return;
    };
    if (!$("#destination-input").val().trim()) {
        alert("Add Destination")
        return;
    };
    if (!$("#time-input").val().trim()) {
        alert("Add Train Time")
        return;
    };
    if (!$("#frequency-input").val().trim()) {
        alert("Add frequency")
        return;
    };

    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
    var frequency = $("#frequency-input").val().trim();
    var currentTime = moment();

    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
    console.log(currentTime);



    var newTrain = {

        train: trainName,
        dest: destination,
        arrival: firstTime,
        frequencyRate: frequency
    };

    database.ref().push(newTrain);

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    alert("Train added to schedule successfully");

    return false;

});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var destination = childSnapshot.val().dest;
    var firstTime = childSnapshot.val().arrival;
    var frequency = childSnapshot.val().frequencyRate;

    console.log(trainName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);

    var firstTime = moment(firstTime, "HH:mm").subtract(1, "years");

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    var difference = moment().diff(moment(firstTimeConverted), "minutes");

    var timeRemains = difference % frequency;

    var minsToArrive = frequency - timeRemains;

    var nextTrain = moment().add(minsToArrive, "minutes");

    var newTrainAdded = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minsToArrive),
    );

    $("#trainTable > tbody").append(newTrainAdded)

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});