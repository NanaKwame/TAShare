$(document).ready(function() {

	// Styling JavaScript
	var navbar = $("#navbar");
	var navCont = $("#navContainer");
	var navLeft = $("#navLeft");
	var navRight = $("#navRight");
	var search = $("#search");
	var logo = $("#logo");
	var profPic = $("#profPic");
	var name = $("#name");
	var gear = $("#gear");

	var marginSize = 10;
	var paddingSize = 10;
	var navbarHeight = navbar.height() + marginSize;

	// console.log(navbarHeight);
	var windowHeight = $(window).height() - (2*marginSize);
	var windowWidth = $(window).width() - (2*marginSize);

	navCont.height(navbarHeight - (3*marginSize));
	profPic.height(navCont.height());

	navRight.width(navbarHeight + name.width() + gear.width() + (2*marginSize));
	navLeft.width(navCont.width() - navRight.width() - marginSize);
	search.height(navCont.height() - (2*marginSize) - (2*paddingSize))
		.width( navLeft.width() - (logo.width() + (2*marginSize) + (2*paddingSize)) - (2*marginSize) );
	$(window).resize(function() {
		navLeft.width(navCont.width() - navRight.width() - marginSize);
		search.width( navLeft.width() - (logo.width() + (2*marginSize) + (2*paddingSize)) - (2*marginSize) );
	});

	$("#divPusher").height(navbar.height() + marginSize);
});