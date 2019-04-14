var config = {
    apiKey: "AIzaSyDXisX84MkJU9272Jl755hZ_SRzteHBHTw",
    authDomain: "train-schedule-6a6bd.firebaseapp.com",
    databaseURL: "https://train-schedule-6a6bd.firebaseio.com",
    projectId: "train-schedule-6a6bd",
    storageBucket: "train-schedule-6a6bd.appspot.com",
    messagingSenderId: "183849912675"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#trainName-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTime = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years");
    var frequency = $("#frequency-input").val().trim();

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var newTrain = {
        train: trainName,
        dest: destination,
        arrival: firstTime,
        frequencyRate: frequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.dest);
    console.log(newTrain.arrival);
    console.log(newTrain.frequencyRate);

    alert("Train added to schedule successfully");

    $("#trainName-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

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
    console.log(time);
    console.log(frequency);

    var time = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(time);

    var timeDiff = moment().diff(moment(time), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);

    var timeRemains = timeDiff % frequency;
    console.log(timeRemains);

    var minsToTrain = frequency - timeRemains;
    console.log("MINUTES TILL TRAIN: " + minsToTrain);

    var nextTrain = moment().add(minsToTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var newTrainAdded = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minsToTrain),
    );

    $("#trainAdded> tbody").append(newTrainAdded);
});

jQuery(document).ready(function () {
    jQuery('.timepicker').timepicker({
        twelveHour: false,
    });
});

