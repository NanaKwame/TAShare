var buildPreview;
$(document).ready(function() {
	// CLASS_PAGE = {}; // we don't need this because of doucment.ready
	var cpBuild = function() {
		console.log("building other")
		// Styling JavaScript
		var cpContent = $("#cp-content");
		var cpResults = $("#cp-results");
		var cpViewer = $("#cp-viewer");
		var cpSearch = $("#cp-search");
		var cpSearchOverlay = $("#cp-searchOverlay");
		var cpFilter = $("#cp-filter");
		var cpFilterBtn = $("#cp-filterBtn")
		var cpNavbar = $("#navbar");
		var cpMenu = $("#cp-menu");
		var cpResultsDisplay = $("#cp-resultsDisplay");
		var cpResult = $(".cp-result");
		var cpClassTitle = $("#cp-classTitle");
		var cpResultStar = $(".cp-result-star");
		var cpUploadImg = $("#cp-uploadImg");
		var cpUploadOverlay = $("#cp-uploadOverlay");
		var cpTitleCont = $(".cp-result-titleCont");

		var marginSize = 10;
		var paddingSize = 10;
		var navbarHeight = cpNavbar.height() + marginSize;

		// console.log(navbarHeight);
		var windowHeight = $(window).height() - (2*marginSize);
		var windowWidth = $(window).width() - (2*marginSize);
		var resultsWidth = cpResults.width() + (2*marginSize);

		cpContent.css("margin-top", navbarHeight)
			.height(windowHeight - navbarHeight + marginSize);

		cpViewer.width(cpContent.width() - cpResults.width() - marginSize - (4*paddingSize))
			.css("margin-left", marginSize);

		cpSearch.width(cpResults.width() - cpFilter.width() - (2*paddingSize) - marginSize);

		cpSearchOverlay.width(cpSearch.width() + (2*paddingSize));

		cpFilterBtn.height(cpSearch.height());

		cpMenu.css("left", -cpSearch.width() - (2*paddingSize))
			.width(cpResults.width() - marginSize);

		cpResultsDisplay.height(cpResults.height() - (cpClassTitle.height() + (2*marginSize)) - (cpSearch.height() + marginSize + (2*paddingSize)) - (2*marginSize));

		cpResultStar.css("margin-top", (cpResult.height() - cpResultStar.height()) / 2);
		
		cpUploadImg.height(50);
		cpUploadOverlay.height(cpUploadImg.height()).width(cpUploadImg.width());
		
		cpTitleCont.css("margin-top", 35).height(33);
		// Responsive JS
		$(window).resize(function() {
			var windowHeight = $(window).height() - (2*marginSize);
			var windowWidth = $(window).width() - (2*marginSize);

			// console.log("windowHeight: " + windowHeight + ", navbarHeight: " + navbarHeight + ", marginSize: " + marginSize);
			cpContent.height(windowHeight - navbarHeight + marginSize);
			cpViewer.width(cpContent.width() - cpResults.width() - marginSize - (4*paddingSize));
			cpResultsDisplay.height(cpResults.height() - (cpClassTitle.height() + (2*marginSize)) - (cpSearch.height() + marginSize + (2*paddingSize)) - (2*marginSize));
		});

		$("#cp-menu").on("click", function() {
			$('.dropdown.keep-open').data('closable', false);
		});

		$("#cp-filterBtn").on("click", function() {
			$('.dropdown.keep-open').data('closable', true);
		});

		$('.dropdown.keep-open').on({
		    "shown.bs.dropdown": function() { $(this).data('closable', false); },
		    "hide.bs.dropdown":  function() { return $(this).data('closable'); }
		});

		$(".cp-filterOption").on("click", function() {
			var checkMark = this.children[0].children[0];
			if ($(checkMark).css("display") == "none") {
				$(checkMark).css("display", "block");
			} else {
				$(checkMark).css("display", "none");
			}
		});

		buildPreview = function(type) {
			var source = "";
			if (type === "problems") {
				source   = $("#problem-template").html();
			}
			else if(type === "note"){
				source   = $("#note-template").html();
			}
			else if(type === "audio"){
				source   = $("#audio-template").html();
			}
			else if(type === "website"){
				source   = $("#website-template").html();
			}
			else{
				source   = $("#video-template").html();
			}
			var template = Handlebars.compile(source);
			$("#cp-viewer").html(template);
		}
		$(".cp-result").on("click", function() {
			buildPreview($(this).attr("data-type"));
		});

		$(".cp-result-starFilled").on("click", function() {
			if ($(this).css("opacity") == 0) {
				$(this).css("opacity", 1);
			} else {
				$(this).css("opacity", 0);
			}
		});
	}
	var Build = function() {
		NavbarBuild();
		cpBuild();
	}
	window.onload = Build;
});# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
