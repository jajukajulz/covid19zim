$(document).ready(function() {
   var CONSTANTS = {
                  HOME_MENU_BUTTON : "#homeMenuButton",
                  DATA_MENU_BUTTON : "#dataMenuButton",
                  HOTLINES_MENU_BUTTON : "#hotlinesMenuButton",
                  RESOURCES_MENU_BUTTON : "#resourcesMenuButton",
                  SERVICE_PROVIDERS_MENU_BUTTON : "#serviceProviderMenuButton",

                  DATA_ROW: "#dataRow",
                  HOTLINES_ROW: "#hotlinesRow",
                  RESOURCES_ROW: "#resourcesRow",
                  SERVICE_PROVIDERS_ROW: "#serviceProvidersRow",

                  STATS_TOTAL_CONFIRMED: "#stats_total_confirmed",
                  STATS_TOTAL_DEATHS: "#stats_total_deaths",
                  STATS_TOTAL_RECOVER: "#stats_total_recover",
                  STATS_LAST_UPDATED: "#stats_last_updated",

                  LOADING : "#loadingRow",
                  NOTIFICATION_BAR_ROW: "#notificationBarRow",
                  NOTIFICATION_BAR_DIV: "#divNotificationBar",
                  LAST_UPDATED_DIV: "#lastUpdatedDiv",

                  SUCCESS: "success",
                  ERROR: "error",
                  WARNING: "warning",
                  ACTIVE: "active",
                  DASH: "-"
                };

    // load stats from Firebase
    getStats();
    
    // display the data dashboard i.e. landing page after clicking on covid19zim title / logo at top of the page
    $(CONSTANTS.HOME_MENU_BUTTON).click(function() {
        displayRow(CONSTANTS.DATA_ROW, CONSTANTS.EMPTY_STRING);
        setActiveClass(CONSTANTS.DATA_MENU_BUTTON)
    });

    // display the data dashboard row after menu button click
    $(CONSTANTS.DATA_MENU_BUTTON).click(function() {
        displayRow(CONSTANTS.DATA_ROW, CONSTANTS.EMPTY_STRING);
        setActiveClass(CONSTANTS.DATA_MENU_BUTTON)
    });

    // display the hotlines row  after menu button click
    $(CONSTANTS.HOTLINES_MENU_BUTTON).click(function() {
        displayRow(CONSTANTS.HOTLINES_ROW, CONSTANTS.EMPTY_STRING);
        setActiveClass(CONSTANTS.HOTLINES_MENU_BUTTON)
    });

    // display the resources row  after menu button click
    $(CONSTANTS.RESOURCES_MENU_BUTTON).click(function() {
        displayRow(CONSTANTS.RESOURCES_ROW, CONSTANTS.EMPTY_STRING);
        setActiveClass(CONSTANTS.RESOURCES_MENU_BUTTON)
    });

    // display the resources row  after menu button click
    $(CONSTANTS.SERVICE_PROVIDERS_MENU_BUTTON).click(function() {
        displayRow(CONSTANTS.SERVICE_PROVIDERS_ROW, CONSTANTS.EMPTY_STRING);
        setActiveClass(CONSTANTS.SERVICE_PROVIDERS_MENU_BUTTON)
    });

    //initially display data row
    //displayRow(CONSTANTS.DATA_ROW, CONSTANTS.EMPTY_STRING);

    // Show/Hide a "loading" indicator when AJAX request starts/completes:
    $(document).on({
        ajaxStart: function() { $(CONSTANTS.LOADING).show(); console.log("AJAX START LOADING")}, //ajaxStart specifies a function to run when the first AJAX request begins
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

    //function to hide active class from menu button
    function setActiveClass(menuButton) {
        // remove Active Class
        $(CONSTANTS.DATA_MENU_BUTTON).removeClass(CONSTANTS.ACTIVE);
        $(CONSTANTS.HOTLINES_MENU_BUTTON).removeClass(CONSTANTS.ACTIVE);
        $(CONSTANTS.RESOURCES_MENU_BUTTON).removeClass(CONSTANTS.ACTIVE);
        $(CONSTANTS.SERVICE_PROVIDERS_MENU_BUTTON).removeClass(CONSTANTS.ACTIVE);

        $(menuButton).addClass(CONSTANTS.ACTIVE);
    };

    function getStats(){
        $.ajax({ url: "/api/v1/fetch_stats",
        beforeSend: function () {
            // ... your initialization code here (so show loader) ...
            displayRow(CONSTANTS.LOADING, CONSTANTS.EMPTY_STRING);
            console.log("AJAX START LOADING");
          },
        complete: function () {
            // ... your finalization code here (hide loader) ...
            displayRow(CONSTANTS.DATA_ROW, CONSTANTS.EMPTY_STRING);

            console.log("AJAX STOP LOADING");
            
          },
        }).done(function(res) {
            var res_stats_total_confirmed, res_stats_total_deaths, res_stats_total_recover, res_stats_last_updated
            if (res.response_status_flag) {
            // STATS_TOTAL_CONFIRMED: "#stats_total_confirmed",
            // STATS_TOTAL_DEATHS: "#stats_total_deaths",
            // STATS_TOTAL_RECOVER: "#stats_total_recover",
            // STATS_LAST_UPDATED: "#stats_last_updated",
            res_stats_total_confirmed = res.total_confirmed;
            res_stats_total_deaths = res.total_deaths;
            res_stats_total_recover = res.total_recovered; 
            res_stats_last_updated = res.last_updated;

            //    console.log(res.total_confirmed);
            } else if(JSON.parse(res).response_status_flag) {
                console.log("Cached stats :)");
                var data = JSON.parse(res);
                console.log(data.total_confirmed);
                res_stats_total_confirmed = data.total_confirmed;
                res_stats_total_deaths = data.total_deaths;
                res_stats_total_recover = data.total_recovered; 
                res_stats_last_updated = data.last_updated;
                //console.log(res);
            } else {
                console.log('error...ajax');
                res_stats_total_confirmed = CONSTANTS.DASH;
                res_stats_total_deaths = CONSTANTS.DASH;
                res_stats_total_recover = CONSTANTS.DASH; 
                res_stats_last_updated = CONSTANTS.DASH;
            }
            $(CONSTANTS.STATS_TOTAL_CONFIRMED).html(`<h1 class="card-text">${res_stats_total_confirmed}</h1>`);
            $(CONSTANTS.STATS_TOTAL_DEATHS).html(`<h1 class="card-text">${res_stats_total_deaths}</h1>`);
            $(CONSTANTS.STATS_TOTAL_RECOVER).html(`<h1 class="card-text">${res_stats_total_recover}</h1>`);
            $(CONSTANTS.STATS_LAST_UPDATED).html(`<i>Last updated ${res_stats_last_updated}.</i>`);
        });
    };

    //function to display row based on menu button selection
    function displayRow(rowName, formName) {

        // Hide rows
        $(CONSTANTS.LOADING).hide();
        $(CONSTANTS.DATA_ROW).hide();
        $(CONSTANTS.HOTLINES_ROW).hide();
        $(CONSTANTS.RESOURCES_ROW).hide();
        $(CONSTANTS.SERVICE_PROVIDERS_ROW).hide();
        $(CONSTANTS.NOTIFICATION_BAR_ROW).hide();

        //reset form fields
        if (formName !== CONSTANTS.EMPTY_STRING) {
            console.log("formName " + formName);
            $(formName).get(0).reset();
        }

        // Display the passed in row
        $(rowName).show();
    };
});
