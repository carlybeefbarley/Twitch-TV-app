$(document).ready(function(){
  var following = [];
  var url = "https://wind-bow.glitch.me/twitch-api/streams/freecodecamp";
  $.getJSON(url,function(data1){
    if(data1.stream===null){
      $("#fccStatus").html("Free Code Camp is Currently OFFLINE!");
    }else{
      $("#fccStatus").html("Free Code Camp is Currently ONLINE!");
    }
  });


  var followerURL = "https://wind-bow.glitch.me/twitch-api/users/freecodecamp/follows/channels";
  $.getJSON(followerURL, function(data2){
    for(var i=0; i < data2.follows.length; i++){
      var displayName = data2.follows[i].channel.display_name;
      //var logo = data2.follows[i].channel.logo;
     // var status = data2.follows[i].channel.status;
      
      following.push(displayName);  
    }
       following.push("comster404");
      following.push("brunofin");
      following.push("ESL_SC2");

    
    for(var i=0; i <following.length; i++){
      var url2 = "https://wind-bow.glitch.me/twitch-api/channels/" + following[i];
      
      $.getJSON(url2, function(data3){
        var logo;
        var status;
        var name;

       if (data3.error){
             logo = "http://www.ipaddressguide.org/wp-content/uploads/2013/10/VPN-not-working.png";
             name = data3.message;
             status = data3.error;
         
         $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src = '" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
       }
        
        
      });

    }
for(var i=0; i <following.length; i++) {
  var onlineURL = "https://wind-bow.glitch.me/twitch-api/channels/" + following[i];
  $.getJSON(onlineURL, function(data4) {
    if (data4.partner === true){
    var logo = data4.logo;
    var status = "<strong>" + "ONLINE:" + "</strong>"+ "<br>";
    var statusResult = status.fontcolor("green");
    var statusInfo = statusResult + data4.status;
    var name = data4.name;

      
      if(logo === null) {
        logo = "http://lasvegaskravmaga.com/images/no_logo.gif";
      }
      
      
    
    $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src = '" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + statusInfo + "</div></div>");
    } else {
      
    var logo = data4.logo;
    var status = "<strong>" + "OFFLINE" + "</strong>"+ "<br>";
    var statusResult = status.fontcolor("red");

    var name = data4.name;
      
     if(logo === null) {
        logo = "http://lasvegaskravmaga.com/images/no_logo.gif";
      }
    
    $("#followerInfo").prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src = '" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + statusResult + "</div></div>");
    }
  });
}
  
    
 });
  
});
