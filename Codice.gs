function tweetLodi() {
  let verse = lastVerse();

  var sog = new SalmiOnGoogle();
  tweet = sog.niceVerseForTwitter(verse);

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

function tweetUsers() {
  var tweet = "Ogni mattina siamo in " + getAllUsers() + " insieme a pregare su tutte le piattaforme!\u000aVisita il sito http://bit.ly/unsalmoalgiorno per saperne di più"
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
