// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

//javascript for homepage
var hpBuild = function() {
	var hpContent = $("#hp-content")
	var hpNavbar = $("#navbar");
	var hpColumn = $(".hp-column");
	var hpColumnTitle = $(".hp-column-title");
	var hpColumnList = $(".hp-column-list");
	var hpClassInfo = $(".hp-classInfo");
	var hpInfoTitle = $(".hp-infoTitle");

	var marginSize = 10;
	var paddingSize = 10;
	var navbarHeight = hpNavbar.height() + marginSize;

	//responsive page JS
	var resizeFunc = function() {
		//Fix height of page
		var windowHeight = $(window).height() - 2*marginSize;
		hpContent.css("margin-top", navbarHeight)
			.height(windowHeight - navbarHeight - marginSize);
		
		//Get Width
		var windowWidth = $(window).width() - 2*marginSize;

		//Choose between inline-block or stacked blocks
		if (windowWidth < 720) {
			hpColumn.width(windowWidth - 4*paddingSize);
			hpColumn.css("height", "auto");
			hpColumnList.css("height", "auto");
			hpContent.css("height", "auto");
		} else {
			hpColumn.width(Math.floor((windowWidth - 2*paddingSize)/3.0) - 2*paddingSize);
			hpColumn.height(Math.floor(hpContent.height() - 2*paddingSize));

			hpColumnList.height(hpColumn.height() - hpColumnTitle.height() - 20);
		}

		//Set Vertical Align for info titles
		for (var i = 0; i < hpInfoTitle.length; i++) {
			$(hpInfoTitle[i]).css("margin-top", (hpClassInfo.height() - $(hpInfoTitle[i]).height())/2 + "px");
		}
	}

	//Event listener for window resizing
	$(window).resize(resizeFunc);

	//Resize when loading page
	resizeFunc();

	addenrollment = function(userid, classid) {
		$.ajax({
	      type: "GET",
	      url: "/class_ta/addenroll",
	      data: { user_id: userid, class_ta_id: classid},
	      contentType: 'application/json',
	        dataType: "json"
	    })
	    .done(function( data) {
	      console.log(data);
	    });
	}

}


