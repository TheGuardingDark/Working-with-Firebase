


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





 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(response => {
    var row = $("<tr>");
    var titleCell = $("<td>").text(response.Title);
    var yearCell = $("<td>").text(response.Year);
    var actorCell = $("<td>").text(response.Actors);
    row.append(titleCell, yearCell, actorCell);
    $("tbody").append(row);

  })
