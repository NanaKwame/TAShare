	var initNavBar = function(){
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
		var length = 0;

		// console.log(navbarHeight);
		var windowHeight = $(window).height() - (2*marginSize);
		var windowWidth = $(window).width() - (2*marginSize);

		navCont.height(navbarHeight - (3*marginSize));
		profPic.height(navCont.height());

		console.log("Heres info", name.width(), gear.width(), navbarHeight);

		navRight.width(navbarHeight + name.width() + gear.width() + (2*marginSize));

		navLeft.width(navCont.width() - navRight.width() - marginSize);

		search.height(navCont.height() - (2*marginSize) - (paddingSize));
		length = navLeft.width() - (logo.width() + (2*marginSize) + (2*paddingSize)) - (2*marginSize);
		search.width( navLeft.width() - (logo.width() + (2*marginSize) + (2*paddingSize)) - (2*marginSize) );

		$(window).resize(function() {
			navLeft.width(navCont.width() - navRight.width() - marginSize);
			search.width( navLeft.width() - (logo.width() + (2*marginSize) + (2*paddingSize)) - (2*marginSize) -45);
		});

		$("#divPusher").height(navbar.height() + marginSize);

		$(document).tooltip({
		    selector: '[id=profImgOverlay]'
		 });
		$(document).tooltip({
			selector: '[id=logOut]'
		});

	}


	
// var goToPage = function(link) {
// 	console.log(link);
// 	window.location.href = link;
// }
	

$(document).ready(function() {
	initNavBar();
	$("#search").select2({
	});
});