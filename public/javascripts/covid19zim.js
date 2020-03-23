$(document).ready(function() {
   var CONSTANTS = {
                  HOME_MENU_BUTTON : "#homeMenuButton",
                  DATA_MENU_BUTTON : "#dataMenuButton",
                  HOTLINES_MENU_BUTTON : "#hotlinesMenuButton",
                  RESOURCES_MENU_BUTTON : "#resourcesMenuButton",

                  DATA_ROW: "#dataRow",
                  HOTLINES_ROW: "#hotlinesRow",
                  RESOURCES_ROW: "#resourcesRow",

                  LOADING : "#loadingRow",
                  NOTIFICATION_BAR_ROW: "#notificationBarRow",
                  NOTIFICATION_BAR_DIV: "#divNotificationBar",
                  LAST_UPDATED_DIV: "#lastUpdatedDiv",

                  SUCCESS: "success",
                  ERROR: "error",
                  WARNING: "warning"
                };

    // display the data dashboard i.e. landing page after clicking on covid19zim title / logo at top of the page
    $(CONSTANTS.HOME_MENU_BUTTON).click(function() { displayRow(CONSTANTS.DATA_ROW, CONSTANTS.EMPTY_STRING) });

    // display the data dashboard row after menu button click
    $(CONSTANTS.DATA_MENU_BUTTON).click(function() { displayRow(CONSTANTS.DATA_ROW,
                                                                              CONSTANTS.EMPTY_STRING) });

    // display the hotliness row  after menu button click
    $(CONSTANTS.HOTLINES_MENU_BUTTON).click(function() { displayRow(CONSTANTS.HOTLINES_ROW,
                                                                              CONSTANTS.EMPTY_STRING) });

    // display the resources row  after menu button click
    $(CONSTANTS.RESOURCES_MENU_BUTTON).click(function() { displayRow(CONSTANTS.RESOURCES_ROW,
                                                                              CONSTANTS.EMPTY_STRING) });

    //initially display data row
    displayRow(CONSTANTS.DATA_ROW, CONSTANTS.EMPTY_STRING);

    // Show/Hide a "loading" indicator when AJAX request starts/completes:
    $(document).on({
        ajaxStart: function() { $(CONSTANTS.LOADING).show() }, //ajaxStart specifies a function to run when the first AJAX request begins
        ajaxStop: function() { $(CONSTANTS.LOADING).hide() } //ajaxStop specifies a function to run when all AJAX requests have completed
    });

    //function to trigger notification bar at the top of the page
    function triggerNotificationOpen(parentDivID, alertDivID, alertMessage, alertType) {
      console.log("triggerNotificationOpen");
      $(CONSTANTS.NOTIFICATION_BAR_ROW).show();
      if (alertType === CONSTANTS.SUCCESS)
        var divNotificationHtml = '<div id='+alertDivID+' class="alert alert-success fade in show"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button><strong>'+alertMessage+'</strong></div>';
      else if (alertType === CONSTANTS.ERROR)
         var divNotificationHtml = '<div id='+alertDivID+' class="alert alert-danger fade in show"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button><strong>'+alertMessage+'</strong></div>';
      else if (alertType === CONSTANTS.WARNING)
          var divNotificationHtml = '<div id='+alertDivID+' class="alert alert-warning fade in show"><button type="button" class="close close-alert" data-dismiss="alert" aria-hidden="true">×</button><strong>'+alertMessage+'</strong></div>';
      //console.log(divNotificationHtml);
      $(parentDivID).html(divNotificationHtml);
    };

    //function to display row based on menu button selection
    function displayRow(rowName, formName) {
        // Hide rows
        $(CONSTANTS.LOADING).hide();
        $(CONSTANTS.DATA_ROW).hide();
        $(CONSTANTS.HOTLINES_ROW).hide();
        $(CONSTANTS.RESOURCES_ROW).hide();
        $(CONSTANTS.NOTIFICATION_BAR_ROW).hide();

        //reset form fields
        console.log("formName " + formName);
        if (formName !== CONSTANTS.EMPTY_STRING) {
            $(formName).get(0).reset();
        }

        // Display the passed in row
        $(rowName).show();
    }
});
