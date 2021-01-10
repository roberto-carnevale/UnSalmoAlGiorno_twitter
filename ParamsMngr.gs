function readParams() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams);
}

function readDebugChat() {
  return (parseInt(readParams().getRange("B4").getValue()));
}

function sendMessage() {
  return (parseInt(readParams().getRange("B1").getValue()));
}
function lastVerse() {
  return (parseInt(readParams().getRange("B2").getValue()));
}
function lastSentUsers() {
  return (parseInt(readParams().getRange("B3").getValue()));
}

function setlastVerse(num) {
  return (parseInt(readParams().getRange("B2").setValue(num)));
}
function setlastSentUsers(num) {
  readParams().getRange("B3").setValue(num);
}

function setTwitterFollowers(num) {
  readParams().getRange("B5").setValue(num);
}

function getTwitterFollowers(num) {
  return (parseInt(readParams().getRange("B5").getValue()));
}
