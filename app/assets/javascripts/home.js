// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/



	//javascript for homepage
	var hpBuild = function() {
		var hpContent = $("#hp-content")
		var hpNavbar = $("#navbar");
		var hpColumn = $(".hp-column");
		var hpClassInfo = $(".hp-classInfo");
		var hpClassTitle = $(".hp-classTitle");

		var marginSize = 10;
		var paddingSize = 10;
		var navbarHeight = hpNavbar.height() + marginSize;

		
		var windowHeight = $(window).height() - 2*marginSize;
		hpContent.css("margin-top", navbarHeight)
			.height(windowHeight - navbarHeight - marginSize);

		var windowWidth = $(window).width() - 2*marginSize;

		//column width
		hpColumn.width(Math.floor((windowWidth - 2*paddingSize)/3.0));
		hpColumn.height(Math.floor(hpContent.height() - 2*paddingSize));

		//Set Vertical Align for class titles
		hpClassTitle.css("margin-top", (hpClassInfo.height() - hpClassTitle.height())/2 + "px");

		//responsive page JS
		var windowVar = $(window);
		$(window).resize(function() {
			var windowHeight = windowVar.height() - 2*marginSize;
			hpContent.css("margin-top", navbarHeight)
				.height(windowHeight - navbarHeight - marginSize);
			
			var windowWidth = windowVar.width() - 2*marginSize;
			hpColumn.width(Math.floor((windowWidth - 2*paddingSize)/3.0));
			hpColumn.height(Math.floor(hpContent.height() - 2*paddingSize));

			//Set Vertical Align for class titles
			hpClassTitle.css("margin-top", (hpClassInfo.height() - hpClassTitle.height())/2 + "px");
			
		});
	}


