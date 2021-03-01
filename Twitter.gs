function tweetLodi() {
  
  let dayObj = getLiturgicDay();

  let tweetDay = dayColor[dayObj.color]+"  "+stringColorMailingList[dayObj.color]+ "  " +dayColor[dayObj.color]+"\u000a"+getdayFull().toString().replace(/###/g,"\u000a");
  let tweetPsalm = lastVerseFull().toString().replace(/###/g,"\u000a");

  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service
    // if too long for tweeting
    if (tweetPsalm.length + tweetDay.length > 260  || dayObj.text) {
      //tweet the psalm
      let response = tweetThis(service, tweetPsalm, null);
      if (response) {                                                                            //If response is detected... 
        setTwitterFollowers(response.user.followers_count);
      }
      //add caption as response
      tweetThis(service,  '@unsalmoalgiorno\u000a#Preghiamo insieme!\u000a' +tweetDay, { in_reply_to_status_id: response.id_str });
      if (dayObj.text) {
        tweetThis(service,  '@unsalmoalgiorno\u000a' +dayObj.text.toString().replace(/###/g,"\u000a"), { 'in_reply_to_status_id': response.id_str  });
      }
    } else {
      //if short enough tweet all together
      tweetThis(service, tweetDay + "\u000a\u000a#Preghiamo\u000a" +tweetPsalm, null);
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

function tweetLodiwithPhoto() {
  
  let dayObj = getLiturgicDay();

  let tweetDay = dayColor[dayObj.color]+"  "+stringColorMailingList[dayObj.color]+ "  " +dayColor[dayObj.color]+"\u000a"+getdayFull().toString().replace(/###/g,"\u000a");
  let tweetPsalm = "\u000a\u000a#Preghiamo\u000a"+lastVerseFull().toString().replace(/###/g,"\u000a");

  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service

  //image treatment
  var file = null
  let folder = DriveApp.getFolderById(ImageFolder);
  
  let findfile = folder.getFilesByName(dayObj.special+".jpg");
  if (findfile.hasNext()) {
    file=findfile.next().getBlob();
  } else {
    file=folder.getFilesByName(dayObj.baseImage).next().getBlob();
  }

  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service
    // if too long for tweeting
    if (tweetPsalm.length + tweetDay.length > 260) {
      // tweet media
      let res = service.uploadMedia(file, null);
      //tweet the psalm
      let response = tweetThis(service, tweetPsalm, {'media_ids': res.media_id_string});
      if (response) {                                                                            //If response is detected... 
        setTwitterFollowers(response.user.followers_count);
      }
      //add caption as response
      tweetThis(service,  '@unsalmoalgiorno\u000a' +tweetDay, { in_reply_to_status_id: response.id_str });

    } else {
      //if short enough tweet all together
      let res = service.uploadMedia(file, "");
      tweetThis(service, tweetDay + tweetPsalm, {'media_ids': res.media_id_string});
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
  var tweet = getWeekMsg().toString().replace(/<TOT>/, getAllUsers()).replace(/###/g,"\u000a");
  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service
  
  let file = DriveApp.getFolderById(ImageFolder).getFilesByName("candele.jpg").next().getBlob();
  
  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service
    let res = service.uploadMedia(file, "");
    let response = tweetThis(service, tweet, {'media_ids': res.media_id_string});
    if (response) {                                                                            //If response is detected... 
      //console.log(response);
      setTwitterFollowers(response.user.followers_count);
    }
  }
  catch (err) {
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception - Total users", err.toString() + "\r\n" + err.stack.toString());
  }
}


function tweetCompieta() {
  var props = PropertiesService.getScriptProperties();                                      //New Properties Service
  props.setProperties(twitterKeys);                                                         //Pass Authentication through Service

  // gets data
  let file = DriveApp.getFolderById(ImageFolder).getFilesByName("compieta.jpg").next().getBlob();
  let compieta = getCompietaFull().toString().replace(/###/g,"\u000a")+"\u000a \u000aBuonanotte 🛌";

  try {
    var service = new Twitterlib.OAuth(props);                                                   //Attempt Connection with Service
    // if too long for tweeting
    let res = service.uploadMedia(file, "");
    tweetThis(service, compieta, {'media_ids': res.media_id_string});
  }
  catch (err) { 
    MailApp.sendEmail("kn35roby@gmail.com","Twitter Exception - Compieta", err.toString() + "\r\n" + err.stack.toString());
  }
}