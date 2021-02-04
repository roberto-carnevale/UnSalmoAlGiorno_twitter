function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBByTypeTab);
}


SalmiOnGoogle.prototype.niceVerseForTwitter = function(seedW) {
  let dayObj = getLiturgicDay();
  let dayName = "";
  let stringsHoly = "";
  if (dayObj.name) {dayName=dayObj.name;}
  if (dayObj.holy) {stringsHoly=stringsHoly[dayObj.holy];}

  let htmlVerse = dayTempo[dayObj.tempo] + "  #Preghiamo "+stringsTempo[dayObj.tempo]+stringsHoly+dayName+"  "+dayColor[dayObj.color]+"\u000a \u000a";
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  htmlVerse += verseRaw[0][0]+","+verseRaw[0][2] + "\u000a" + verseRaw[0][3].toString().replace(/###/g,"\u000a");
  
  return htmlVerse;
}