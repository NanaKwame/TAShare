$(document).ready(function() {
	// CLASS_PAGE = {}; // we don't need this because of doucment.ready

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

	// Responsive JS
	$(window).resize(function() {
		var windowHeight = $(window).height() - (2*marginSize);
		var windowWidth = $(window).width() - (2*marginSize);

		// console.log("windowHeight: " + windowHeight + ", navbarHeight: " + navbarHeight + ", marginSize: " + marginSize);
		cpContent.height(windowHeight - navbarHeight + marginSize);
		cpViewer.width(cpContent.width() - cpResults.width() - marginSize - (4*paddingSize));
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

	console.log("hi");
});