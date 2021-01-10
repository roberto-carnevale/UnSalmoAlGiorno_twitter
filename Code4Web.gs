function doGet(req) {
  var platform = req.parameter.platform;
  var htmlProlog = "";
  if (platform=="Telegram") {
    htmlProlog = "Su Telegram ci sono "+getTelegramSubcribers() +" iscritti";
  }
  if (platform=="Twitter") {
    htmlProlog = "Su Twitter ci sono "+getTwitterFollowers()+" followers";
  }
  let htmlOutput = HtmlService.createHtmlOutput(htmlProlog);
  htmlOutput.setSandboxMode(HtmlService.SandboxMode.IFRAME)
  htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
  return htmlOutput;
}

function readParams() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName(SubscriberParams);
}

function getTwitterFollowers() {
  return (parseInt(readParams().getRange("B5").getValue()));
}

function getTelegramSubcribers() {
  return SpreadsheetApp.openById(SubscriberSpreadsheet).getSheetByName("Subscribers").getDataRange().getNumRows();
}
