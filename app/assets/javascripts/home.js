// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/



	//javascript for homepage
	var hpBuild = function() {
		var hpContent = $("#hp-content")
		var hpNavbar = $("#navbar");
		var hpColumn = $(".hp-column");
		var hpClassInfo = $(".hp-classInfo");

		var marginSize = 10;
		var paddingSize = 10;
		var navbarHeight = hpNavbar.height() + marginSize;

		var windowHeight = $(window).height() - 2*marginSize;
		var windowWidth = $(window).width() - 2*marginSize;

		hpContent.css("margin-top", navbarHeight)
			.height(windowHeight - navbarHeight - marginSize);

		//column width
		hpColumn.width((windowWidth - 2*paddingSize)/3.0);
		hpColumn.height(hpContent.height() - 2*paddingSize);

		//responsive JS
		$(window).resize(function() {
			var windowHeight = $(window).height() - 2*marginSize;
			var windowWidth = $(window).width() - 2*marginSize;

			hpContent.css("margin-top", navbarHeight)
				.height(windowHeight - navbarHeight - marginSize);


			hpColumn.width((windowWidth - 2*paddingSize)/3);
			hpColumn.height(hpContent.height() - 2*paddingSize);
		});


		//var classInfoHeading = hpClassInfo.children().first();
		//classInfoHeading.css("margin-top", (hpClassInfo.height() - classInfoHeading.height())/2 + "px");

	}


