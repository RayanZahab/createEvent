function createEvent() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var file = DriveApp.getFileById(sheet.getParent().getId());
  var folder = file.getParents().next();
  
  var colIndex=2;
  var lastrow= sheet.getLastRow();
  var startups = [];
  var day1Jam=DriveApp.getFileById('1X72Mg_RQuHV_ViM0V6FdER5yvo0-SfOz7xmmL3ddLVY');
  var day2Jam=DriveApp.getFileById('1pyI6eJnKE2rae8GRrDNx82QRlEAbw5KRFWrtmeZY2fw');
  
 // 2nd column would be Event title 
 // 3rd column would be Event Start time
 // 4th column would be Event end time
 // 5th column would be Description
 // 6th column would be location
 // 7th column would be emails Separated by comma , 

  for(; colIndex <= lastrow; colIndex++)   
  {
    var type =sheet.getRange(colIndex, 1, 1, 1).getValue();
    if (type && type != "")
    {
      var title =sheet.getRange(colIndex, 2, 1, 1).getValue();
      var startTime =sheet.getRange(colIndex, 3, 1, 1).getValue();
      var endTime =sheet.getRange(colIndex, 4, 1, 1).getValue();
      var mydescription =sheet.getRange(colIndex, 5, 1, 1).getValue();
      var location =sheet.getRange(colIndex, 6, 1, 1).getValue();
      var emails=sheet.getRange(colIndex, 7, 1, 1).getValue();
      var sendEvent= true;
      
      var type =sheet.getRange(colIndex, 1, 1, 1).getValue();
      if(type == "Startups"){
        startups[startups.length] = emails;
        var copy = day1Jam.makeCopy();
        copy.setName("Day 1.2 -"+title.substring(0,10));  
        copy.addEditors(emails.split(','));
        
        copy.moveTo(folder);
        
        var copy2 = day2Jam.makeCopy();
        copy2.setName("Day 3.4 -"+title.substring(0,10));  
        copy2.addEditors(emails.split(','));
      }
      
      var calendar = CalendarApp.getDefaultCalendar().createEvent(title, startTime, endTime, {description: mydescription, location: location, guests: emails, sendEvent: sendEvent});
    }
  } 
}
