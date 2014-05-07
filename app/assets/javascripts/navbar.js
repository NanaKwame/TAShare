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

		var classDict = new Object();

		for(var i=0; i < class_list.length; i= i+1){
			var key = class_list[i].number + " " + class_list[i].name;
			classDict[key] = class_list[i].link;
		}

		$('#search').autocomplete({
			minLength: 2,
			select: function(event, ui){
				$(".glyphicon-search").css("display", "none");
				var classLink = classDict[ui.item.value]
				var loc = $(location).attr('href'); 
				var preroot = loc.split("class_ta/")[0];
				var root = preroot.slice(0,(preroot.length-1));
				var destination = root + classLink;
				window.location = destination;
		},
			source: Object.keys(classDict),
		});

	}


$(document).ready(function() {
	initNavBar();
	$("#search").select2({
	});
});