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

function getTwitterFollowers() {
  return (parseInt(readParams().getRange("B5").getValue()));
}

function getTelegramSubcribers() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("Subscribers").getDataRange().getNumRows();
}

function getFBLikes() {
  return (parseInt(readParams().getRange("B6").getValue()));
}


function getAllUsers() {
  return readParams().getRange("B16").getValue();
}

function getLiturgicDay() {
  return JSON.parse(readParams().getRange("B7").getValue());
}

function lastVerseFull() {
  return readParams().getRange("B8").getValue();
}

function getdayFull() {
  return readParams().getRange("B9").getValue();
}

function getWeekMsg () {
  return readParams().getRange("B10").getValue();
}

//compietaMsg
function getCompietaFull() {
  return readParams().getRange("B11").getValue();
}

function getCompietaImage() {
  return readParams().getRange("B12").getValue();
}