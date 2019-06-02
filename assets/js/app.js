

// assures function loads after page

$(document).ready(function() {


// reference to firebase 
var firebaseConfig = {
    apiKey: "AIzaSyDXwOxJB_4ZFg9t_OoVXmMe8D8TbbIiFlQ",
    authDomain: "testing-8c302.firebaseapp.com",
    databaseURL: "https://testing-8c302.firebaseio.com",
    projectId: "testing-8c302",
    storageBucket: "testing-8c302.appspot.com",
    messagingSenderId: "345252401906",
    appId: "1:345252401906:web:e98abbdf12e542a6"
  };

  firebase.initializeApp(firebaseConfig);
  
  // setting local firebase variable
var database = firebase.database();

// add onclick event to submit button

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  // grabs value of train form fields
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var freq = $("#frequency").val().trim();
  var first = $("#firstTrain").val().trim();

  // stores train form values to firebase
  database.ref("/trains").push({
    name: trainName,
    dest: destination,
    freq: freq,
    first: first,
  });

// clears train form 
  $("#trainName").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#firstTrain").val("");

});


// add event to add trains from firebase to page
database.ref("/trains").on("child_added", function(snapshot) {


  // calculates how far away the next train is and when it will arrive
var freq = snapshot.val().freq;
var firstTrain = snapshot.val().first;
var firstTrFormat = moment(firstTrain, "HH:mm").subtract(1, "years");
// console.log(firstTrFormat);
var diff = moment().diff(moment(firstTrFormat), "minutes");
// console.log(diff);
var till = diff % freq;
// console.log(till);
var minTill = freq - till;
// console.log(minTill);
var nextTrain = moment().add(minTill, "minutes");
// console.log(nextTrain)
var arrival = moment(nextTrain).format("hh:mma");
// console.log(arrival);


// prints train information to the table
var row = $("<tr>");
var nameCell = $("<td>").text(snapshot.val().name);
var destCell = $("<td>").text(snapshot.val().dest);
var freqCell = $("<td>").text(snapshot.val().freq);
var firstCell = $("<td>").text(snapshot.val().first);
var nextCell = $("<td>").text(arrival);
var minCell = $("<td>").text(minTill);
row.append(nameCell, destCell, freqCell, firstCell, nextCell, minCell);
$("tbody").append(row);

});


});
    
  
