/// TO BE CLEANED ///

function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBByTypeTab);
}


SalmiOnGoogle.prototype.niceVerseForTwitter = function(seedW) {
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringHoly=stringsHoly[dayObj.holy];}

  let htmlVerse = dayTempo[dayObj.tempo] + "  #Preghiamo "+stringsTempo[dayObj.tempo]+stringHoly+dayName+"  "+dayColor[dayObj.color]+"\u000a \u000a";
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  htmlVerse += lastVerseFull().toString().replace(/###/g,"\u000a");
  
  return htmlVerse;
}