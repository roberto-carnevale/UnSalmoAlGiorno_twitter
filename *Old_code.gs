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
