var buildPreview;
  // CLASS_PAGE = {}; // we don't need this because of doucment.ready

// var starClick;
  var cpBuild = function() {
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
    var cpNotice = $("#notice");
    var cpIcon = $(".cp-result-icon")

    var umContents = $("#um-content");
    var umInputs = $("#um-inputs");
    var umFiles = $("#um-fileOpt");

    var marginSize = 10;
    var paddingSize = 10;
    var navbarHeight = cpNavbar.height() + marginSize;
    var noticeHeight = cpNotice.height();

    // console.log(navbarHeight);
    var windowHeight = $(window).height() - (2*marginSize);
    var windowWidth = $(window).width() - (2*marginSize);
    var resultsWidth = cpResults.width() + (2*marginSize);

    // Make notice disappear if it has not content
    if (cpNotice.children().html() == '') {
      cpNotice.css("display", "none");
      cpNotice.css("padding", 0);
    } else {
      cpNotice.animate({"opacity": 1}, 3000, function() {
        cpNotice.animate({"opacity": 0}, 500, function() {
          cpNotice.css("display", "none");
        });
      });
    }

    cpContent.css("margin-top", navbarHeight)
      .height(windowHeight - navbarHeight + (marginSize));

    cpResults.height(cpContent.height() - (2*marginSize));
    cpViewer.width(cpContent.width() - cpResults.width() - marginSize - (4*paddingSize))
      .css("margin-left", marginSize).height(cpContent.height() - (2*marginSize));

    cpSearch.width(cpResults.width() - cpFilter.width() - (2*paddingSize) - marginSize);

    cpSearchOverlay.width(cpSearch.width() + (2*paddingSize));

    cpFilterBtn.height(cpSearch.height());

    cpMenu.css("right", 0)
      .width((cpResults.width() - marginSize) / 2);

    cpResultsDisplay.height(cpResults.height() - (cpClassTitle.height() + (2*marginSize)) - (cpSearch.height() + marginSize + (2*paddingSize)) - (2*marginSize));
    
    cpUploadImg.height(50);
    cpUploadOverlay.height(cpUploadImg.height()).width(cpUploadImg.width());
    
    $(".cp-results-upvotes").css("margin", 0);
    // cpTitleCont.css("margin-top", (cpResult.height()/2) - (cpTitleCont.height()/2))

    // Responsive JS
    $(window).resize(function() {
      var windowHeight = $(window).height() - (2*marginSize);
      var windowWidth = $(window).width() - (2*marginSize);

      // console.log("windowHeight: " + windowHeight + ", navbarHeight: " + navbarHeight + ", marginSize: " + marginSize);
      cpContent.height(windowHeight - navbarHeight + (marginSize));
      cpResults.height(cpContent.height() - (2*marginSize));
      cpViewer.width(cpContent.width() - cpResults.width() - marginSize - (4*paddingSize)).height(cpContent.height() - (2*marginSize));
      cpResultsDisplay.height(cpResults.height() - (cpClassTitle.height() + (2*marginSize)) - (cpSearch.height() + marginSize + (2*paddingSize)) - (2*marginSize));

      if(umContents.width() < 480 ){
      	umContents.css("overflow", "auto");
      }
      else{
      	umContents.css("overflow", "visible");
      }
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

    $("body").on("click", ".cp-filterOption", function() {
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

    starClick = function() {
      console.log(this);
      console.log($(this));
      // if ($("#" + id).css("opacity") == 0) { // not favorited
      //   $("#" + id).css("opacity", 1);
      // } else { // favorited
      //   $("#" + id).css("opacity", 0);
      // }
    }
    $(".um-up-type").on("click", function() {
      var val = $(this).attr("data-type");
      $($("input#um-inp-type")[0]).val(val);
    });
    $("select#resource_class_ta_id").select2({
      width: "150px",
      allowClear: true
    });

  addlike = function(resourceid) {
    $.ajax({
      type: "GET",
      url: "/class_ta/addlike",
      data: { resource_id: resourceid},
      contentType: 'application/json',
        dataType: "json"
    })
    .done(function( data) {
      console.log(data);
    });
  }

  removelike = function(resourceid) {
    $.ajax({
      type: "GET",
      url: "/class_ta/removelike",
      data: { resource_id: resourceid},
      contentType: 'application/json',
        dataType: "json"
    })
    .done(function( data) {
      console.log(data);
    });
  }

  showbookmark = function() {
    
  }

  hidebookmark = function() {
    
  }

  removeresource = function(resourceid) {
    $.ajax({
      type: "GET",
      url: "/class_ta/removeresource",
      data: { resource_id: resourceid},
      contentType: 'application/json',
        dataType: "json"
    })
    .done(function( data) {
      console.log(data);
    });

    // location.reload();
  }

  $("body").on("click", "#cp-topRatedBtn", function() {
    if (!$("#cp-topRatedBtn").hasClass("cp-selected")) {
      $("#cp-topRatedBtn").addClass("cp-selected");
    }
    if ($("#cp-newestBtn").hasClass("cp-selected")) {
      $("#cp-newestBtn").removeClass("cp-selected");
    }
  }).on("click", "#cp-newestBtn", function() {
    if (!$("#cp-newestBtn").hasClass("cp-selected")) {
      $("#cp-newestBtn").addClass("cp-selected");
    }
    if ($("#cp-topRatedBtn").hasClass("cp-selected")) {
      $("#cp-topRatedBtn").removeClass("cp-selected");
    }
  });
    
  $("#cp-likeBtn").tooltip();
  $(".deleteResource").tooltip();
  $("#cp-likeBtnOutline").tooltip();
  // $('.dropdown-menu').click(function(e) {
  //     e.stopPropagation();
  // });

}

// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
