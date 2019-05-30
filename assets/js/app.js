


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
  
var database = firebase.database();

$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var freq = $("#frequency").val().trim();
  var first = $("#firstTrain").val().trim();

  database.ref("/trains").push({
    name: trainName,
    dest: destination,
    freq: freq,
    first: first,
  });


  $("#trainName").val("");
  $("#destination").val("");
  $("#frequency").val("");
  $("#firstTrain").val("");

});


database.ref("/trains").on("child_added", function(snapshot) {

var freq = snapshot.val().freq;
var firstTrain = snapshot.val().first;
var firstTrFormat = moment(firstTrain, "HH:mm").subtract(1, "years");
var diff = moment().diff(moment(firstTrFormat), "minutes");
var till = diff % freq;
var minTill = freq - till;
var nextTrain = moment().add(minTill, "minutes");
var arrival = moment(nextTrain).format("hh:mma");



var row = $("<tr>");
var nameCell = $("<td>").text(snapshot.val().name);
var destCell = $("<td>").text(snapshot.val().dest);
var freqCell = $("<td>").text(snapshot.val().freq);
var firstCell = $("<td>").text(snapshot.val().first);
var nextCell = $("<td>").text(arrival);
var minCell = $("<td>").text(minTill);
row.append(nameCell, destCell, freqCell, firstCell, nextCell, minCell);
$("tbody").append(row);

})




 
    
  
