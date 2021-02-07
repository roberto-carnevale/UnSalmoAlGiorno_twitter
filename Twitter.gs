function tweetLodi() {
  
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}

  let tweetPsalm = dayTempo[dayObj.tempo] + "  #Preghiamo "+stringsTempo[dayObj.tempo]+stringHoly+dayName+"  "+dayColor[dayObj.color]+"\u000a \u000a";
  let tweetDay = lastVerseFull().toString().replace(/###/g,"\u000a");

  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service

    if (tweetPsalm.length < 280) {
      let response = service.sendTweet(tweetPsalm, null, null);
      if (response) {                                                                            //If response is detected... 
        //console.log(response);
        setTwitterFollowers(response.user.followers_count);
      }

      response = service.sendTweet(tweetDay, null, null);
      if (response) {                                                                            //If response is detected... 
        //console.log(response);
        setTwitterFollowers(response.user.followers_count);
      }
    } else {MailApp.sendEmail("kn35roby@gmail.com","Twitter length exceded!", err.toString() + "\r\n" + err.stack.toString());}
  }
  catch (err) { 
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception", err.toString() + "\r\n" + err.stack.toString());
  }
}

function tweetUsers() {
  var tweet = "Ogni mattina siamo in " + getAllUsers() + " a pregare insieme, sullo stesso Salmo, da tutte le piattaforme!\u000aVisita il sito http://bit.ly/unsalmoalgiorno per saperne di più"
  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  try {
    var params = new Array(0);                                                                //Array for params (reply, images, etc)
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service

    // if (!service.hasAccess()) {                                                               //If credentials do NOT grant access...
    //   console.log("Authorization Failed");                                                    //log authentication failure 
    // } else {                                                                                  //If credentials grant access...   
    //   console.log("Authentication Successful");
    // }
    var params = new Array(0);
    let response = service.sendTweet(tweet, null, null);
    if (response) {                                                                            //If response is detected... 
      //console.log(response);
      setTwitterFollowers(response.user.followers_count);
    }
  }
  catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception", err.toString() + "\r\n" + err.stack.toString());
  }
}
