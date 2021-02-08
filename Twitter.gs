function tweetLodi() {
  
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}

  let tweetDay = getdayFull().toString().replace(/###/g,"\u000a")+"  "+dayColor[dayObj.color]+"\u000a \u000a";
  let tweetPsalm = "#Preghiamo\u000a"+lastVerseFull().toString().replace(/###/g,"\u000a");

  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service

    if (tweetPsalm.length < 280) {
      let response = service.sendTweet(tweetPsalm, null, null);
      if (response) {                                                                            //If response is detected... 
        Logger.log(response);
        MailApp.sendEmail("kn35roby@gmail.com","Twitter Response", Logger.getLog());
        setTwitterFollowers(response.user.followers_count);
      }
      service.
      response = service.sendTweet(tweetDay, null, null);

    } else {MailApp.sendEmail("kn35roby@gmail.com","Twitter length exceded!", err.toString() + "\r\n" + err.stack.toString());}
  }
  catch (err) { 
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception", err.toString() + "\r\n" + err.stack.toString());
  }
}

function tweetUsers() {
  var tweet = getWeekMsg().toString().replace(/<TOT>/, sendTotalUser)
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
