  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAo39iVLAq0CQ1JrUt1qnMTTwk7SYGYsx4",
    authDomain: "firstproject-ae554.firebaseapp.com",
    databaseURL: "https://firstproject-ae554.firebaseio.com",
    projectId: "firstproject-ae554",
    storageBucket: "firstproject-ae554.appspot.com",
    messagingSenderId: "15647467718"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var username = null;

$("#submit").on("click",function(){
    event.preventDefault();
    var input_message = $("#input_message");
    var input = input_message.val();
    if(username == null){
        username = input; 
        input_message.attr("placeholder","Enter your message");
    }else{
        message = username + ": " + input; 
        message = getTimeStamp() + " " + message;
        database.ref().push(message);

    }
    input_message.val("");
});


database.ref().on("value",function(snapshot){
    var messages = "";
    $("#chat_box").empty();

    for(var item in snapshot.val()){
        messages = messages + snapshot.val()[item]+ "<br>";
        $("#chat_box").html(messages);
    }
    
});

function getTimeStamp(){
    var today = new Date();
    var month = today.getMonth();
    var day = today.getDate();
    var hour = today.getHours();
    var minute = today.getMinutes();
    return month + "-" + day + " " + hour + ":" + minute; 
}