function tweetLodi(pic) {
  
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
      tweetThis(service,  '@unsalmoalgiorno\u000a' +tweetDay, { 'in_reply_to_status_id': response.id_str  });

    } else {
      //if short enough tweet all together
      if (pic) { tweetThis(service, tweetDay + tweetPsalm, {'media_ids': pic}); }
      else { tweetThis(service, tweetDay + tweetPsalm,null); }
    }
  }
  catch (err) { 
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception - Auth/body", err.toString() + "\r\n" + err.stack.toString());
  }
} //1360298496537096202
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

function tweetLodiwithPicture() {
  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys); 
  var service = new Twitterlib.OAuth(props); 
  var file = DriveApp.getFolderById("16fgZ4yKCc2c-tOmkyuFNFU-_4Oewu4Fz").getFilesByName("brand.jpg").next().getBlob();

  let media_id = tweetMedia(service, file)
  tweetLodi(media_id);
}

function tweetMedia (service, media) {
  var res = service.uploadMedia(media,"test");
  return res.media_id_string;
}


function tweetUsers() {
  var tweet = getWeekMsg().toString().replace(/<TOT>/, sendTotalUser)
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
