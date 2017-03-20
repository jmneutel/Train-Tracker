$('#timeCur').html(moment().format("hh:mm"));

// console.log(moment());

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWOdEDRKMNLvhvgGpVO8_63r_MrS-mWLc",
    authDomain: "homework-7-f843c.firebaseapp.com",
    databaseURL: "https://homework-7-f843c.firebaseio.com",
    storageBucket: "homework-7-f843c.appspot.com",
    messagingSenderId: "51186122146"
  };

  firebase.initializeApp(config);

var database = firebase.database();


$("#submit-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();


    // Creates local "temporary" object for holding train data
    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);

    alert("Train successfully added");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

    // Prevents moving to new page
    return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

            console.log(childSnapshot.val());

            var trainName = childSnapshot.val().trainName;
            var destination = childSnapshot.val().destination;
            var firstTrain = childSnapshot.val().firstTrain;
            var frequency = childSnapshot.val().frequency;

            var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
            console.log(firstTimeConverted);

            // Current Time
            var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

            // Difference between the times
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

            // Time apart (remainder)
            var tRemainder = diffTime % frequency;
            console.log(tRemainder);

            // Minute Until Train
            var tMinutesTillTrain = frequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

            // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

            var nextArrival = moment(nextTrain).format("hh:mm");

            $('#timeCur').html(moment().format("hh:mm"));

            $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
                frequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td></tr>");
            });
