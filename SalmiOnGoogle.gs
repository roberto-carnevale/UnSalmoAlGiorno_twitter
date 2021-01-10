function SalmiOnGoogle() {
  //set up tab
  this.tabData = SpreadsheetApp.openById(SalmiDBSpreadsheet).getSheetByName(SalmiDBTab);
}


SalmiOnGoogle.prototype.niceVerseForTwitter = function(seedW) {
  let verseRaw = this.tabData.getRange("A"+seedW+":D"+seedW).getValues();
  let htmlVerse = "#Preghiamo\u000a \u000a" + verseRaw[0][0]+","+verseRaw[0][2] + "\u000a" + verseRaw[0][3].toString().replace(/###/g,"\u000a");
  return htmlVerse;
