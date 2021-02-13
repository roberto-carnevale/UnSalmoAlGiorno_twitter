function tweetLodi() {
  
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}

  let tweetDay = dayColor[dayObj.color]+"  "+stringColorMailingList[dayObj.color]+ "  " +dayColor[dayObj.color]+"\u000a"+getdayFull().toString().replace(/###/g,"\u000a");
  let tweetPsalm = "\u000a\u000a#Preghiamo\u000a"+lastVerseFull().toString().replace(/###/g,"\u000a");

  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service
    // if too long for tweeting
    if (tweetPsalm.length + tweetDay.length > 260) {
      //tweet the psalm
      let response = tweetThis(service, tweetPsalm, null);
      if (response) {                                                                            //If response is detected... 
        setTwitterFollowers(response.user.followers_count);
      }
      //add caption as response
      tweetThis(service,  '@unsalmoalgiorno\u000a' +tweetDay, { in_reply_to_status_id: response.id_str });

    } else {
      //if short enough tweet all together
      tweetThis(service, tweetDay + tweetPsalm, null);
    }
  }
  catch (err) { 
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception - Auth/body", err.toString() + "\r\n" + err.stack.toString());
  }
}
function tweetThis(service, status, options) {
  try {
    Logger.clear();
    response = service.sendTweet( status, options, null);
    Logger.log(response);
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Response", Logger.getLog());
    return response;
  }
  catch (err) { 
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception - Tweet", err.toString() + "\r\n" + err.stack.toString());
  }
}


function tweetUsers() {
  var tweet = getWeekMsg().toString().replace(/<TOT>/, sendTotalUser).replace(/###/g,"\u000a");
  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service

    // if (!service.hasAccess()) {                                                               //If credentials do NOT grant access...
    //   console.log("Authorization Failed");                                                    //log authentication failure 
    // } else {                                                                                  //If credentials grant access...   
    //   console.log("Authentication Successful");
    // }

    let response = service.sendTweet(tweet, null, null);
    if (response) {                                                                            //If response is detected... 
      //console.log(response);
      setTwitterFollowers(response.user.followers_count);
    }
  }
  catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception - Total users", err.toString() + "\r\n" + err.stack.toString());
  }
}
