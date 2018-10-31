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
  var input_message = $("#input_message");

//check localStorage get username from chatapp
if(localStorage.chatappUsername == undefined){
    input_message.attr("placeholder","Enter your name.");
}else{
    username=localStorage.chatappUsername;
    input_message.attr("placeholder","Enter your message");
}

//get all chatrooms
//create options
database.ref("chatroom").once("value").then(function(snapshot){
     var chatRoomIds = Object.keys(snapshot.val());
     chatRoomIds.forEach(function(chatRoomId){
         var option = $("<option>",{value:chatRoomId, text:chatRoomId});
         $("#chat_rooms_options").append(option);
     })
     
});

//get all chatrooms
//create options
database.ref("members").once("value").then(function(snapshot){
    var members = snapshot.val();
    for ( var member in members){
        var option = $("<option>",{value:member, text:member});
        $("#members").append(option);
    }
    
});

$("#submit").on("click",function(){
    event.preventDefault();
    var chatroom = "messages/" + $("#chat_rooms_options").val();
    var input = input_message.val();
    var today = new Date();
    var timestamp = today.getTime();
    //set username 
    if(username == null){
        username = input; 
        localStorage.chatappUsername = input;
        input_message.attr("placeholder","Enter your message");
    }else{
        var post = {
            username: username,
            timestamp: timestamp,
            message: input
        }
        database.ref(chatroom).push(post)
    }
    input_message.val("");
});

//Display messages from selected chatroom.
database.ref("messages/one").on("child_added",function(snapshot){
    var messages = snapshot.val();
    var timestamp = messages.timestamp;
    var username = messages.username;
    var message = messages.message;
    var post = getTimeStamp(timestamp) + " " + username + " " + message + "<br>";
    //$("#chat_box").empty();

    $("#chat_box").append(post);

    
});

function getTimeStamp(timestamp){

    var date = new Date(timestamp);
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    return month + "-" + day + " " + hour + ":" + minute; 
}