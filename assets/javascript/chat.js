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
  var currentChatRoom = "one";

  renderChatAppOptions("chatroom","chatroom");
  renderChatAppOptions("members","members");
//check localStorage get username from chatapp
if(localStorage.chatappUsername == undefined){
    input_message.attr("placeholder","Enter your name.");
}else{
    username=localStorage.chatappUsername;
    input_message.attr("placeholder","Enter your message");
}

//update chatroom message when user select another chatroom.
$("#chatroom").on("change",function(){
    currentChatRoom = $("#chatroom").val();
    database.ref("messages/"+currentChatRoom).once("value").then(function(snapshot){
        //this get multiple messages in one return.
        var messages = snapshot.val();
        var newLine = $("<br>");
        for(var key in messages){
            var item = messages[key];
            item.timestamp;
            item.username;
            item.message;
            var post = $("<span>");
            
            if(item.username == localStorage.chatappUsername){
                post.css("float","right");
            }else{
                post.css("float","left");
            }
            post.text(getTimeStamp(item.timestamp) + " " + item.username + " " + item.message);
            //$("#chat_box").empty();

            $("#chat_box").append(post);
            $("#chat_box").append(newLine);
        }
    });
})

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
database.ref(("messages/"+ currentChatRoom)).on("child_added",function(snapshot){
    var messages = snapshot.val();
    var timestamp = messages.timestamp;
    var username = messages.username;
    var message = messages.message;
    var post = $("<span>");
    var newLine = $("<br>");
    if(username == localStorage.chatappUsername){
        post.css("float","right");
    }else{
        post.css("float","left");
    }
    post.text(getTimeStamp(timestamp) + " " + username + " " + message);
    //$("#chat_box").empty();

    $("#chat_box").append(post);
    $("#chat_box").append(newLine);

});

function createChatRoom(chatRoomName,x,y){
    var path = "chatroom/" + chatRoomName;
    var param = {
        x: x,
        y: y,
        title: chatRoomName
    }
    
    database.ref(path).update(param);
    //refresh chatroom selections.
    renderChatAppOptions("chatroom","chatroom");
}

function getTimeStamp(timestamp){

    var date = new Date(timestamp);
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    return month + "-" + day + " " + hour + ":" + minute; 
}

//get all chatrooms.
//create options;
// group such as chatroom or members.
function renderChatAppOptions(group,class_name){
    database.ref(group).once("value").then(function(snapshot){
        var chatRoomIds = Object.keys(snapshot.val());
        class_name = "#"+class_name;
        $(class_name).empty();
        chatRoomIds.forEach(function(chatRoomId){
            var option = $("<option>",{value:chatRoomId, text:chatRoomId});
            
            $(class_name).append(option);
        })
        
    });
    currentChatRoom = $("#chatroom").val();
}


