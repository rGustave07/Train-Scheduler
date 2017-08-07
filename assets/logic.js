
// Linking Firebase
// Initialize Firebase
 var config = {
   apiKey: "AIzaSyCBhYi5wL5f4oWr7j5Ryu8wqxxq6vYsvnE",
   authDomain: "train-schedule-db-71655.firebaseapp.com",
   databaseURL: "https://train-schedule-db-71655.firebaseio.com",
   projectId: "train-schedule-db-71655",
   storageBucket: "train-schedule-db-71655.appspot.com",
   messagingSenderId: "507396451387"
 };
 firebase.initializeApp(config);
// End of Firebase link
var database = firebase.database();


$('#submitButton').on('click', function() {
  console.log("Linked and working");

  // Store values in variables to push to database
  var trnName = $('#inputTrainName').val();
  var destination = $('#inputDestination').val();
  var trnTime = moment($('#inputFirstTrainTime').val().trim(), "HH:mm").format("X");
  var trnFreq = $('#inputFrequency').val();

  // calling our database ref variable in order to push to firebase db
  database.ref().push({
    trainName: trnName,
    dest: destination,
    firstTrainTime: trnTime,
    Freq: trnFreq
  });

  // Calculating train stats
  database.ref().on("child_added", function(childSnapshot){
    var snap = childSnapshot.val();
    // console.log(snap); This yields the the object
    var trainFreq = snap.Freq;
    var trainTime = snap.firstTrainTime;
    var trainTimeConverted = moment(trainTime, "HH:mm").format("X");

    var timeDiff = moment().diff(moment.unix(trainTime), "minutes");
    console.log("time difference: ", timeDiff);
    var tRemainder = moment().diff(moment.unix(traintime)) % trainFreq;


  });

  //displaying the contents

  $('.traintable').append(  "<tr>" +
    "<td>" + trnName     + "</td>" +
    "<td>" + destination + "</td>" +
    "<td>" + trnFreq     + "</td>" +
    "<td>" + nxtArrival  + "</td>" +
    "<td>" + minAway     + "</td>" + "</tr>"
  );

});
