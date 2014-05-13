/* Angular Controller */
$(".cp-resultSelected").on("click", function() {
    console.log("clicked")
})

var angularControllers = angular.module('TAShareApp', [])
    .directive('resultsDirective', function() {
        return function(scope, element, attrs) {
            console.log("element: ", element);
            if (scope.$first) {
                element.attr("ng-click", "setCurrentResult(result)");
                
                element.click();
                console.log("cpSelected", $(".cp-resultSelected"));
            } else if (scope.$last) {
                $(".cp-resultSelected").click();
            }

        }
    });

var capitalize = function(string) {
    var firstLetter = string[0].toUpperCase();
    var restOfString = string.substring(1, string.length)
    return firstLetter + restOfString;
}

var getId = function(url) { // taken from stackOverflow
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

var getUrlVars = function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(
        window.location.href.indexOf('?') + 1).split('&');
    for ( var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var getBookmarkId = function(name) {
    if (!(name in getUrlVars())) {
        return -1;
    }
    return getUrlVars()[name];
}

angularControllers.controller('HomePageCtrl', ['$scope', '$http',
  function($scope, $http) {
    // $http.get('phones/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });

    $scope.foo = 'bar';
  }]);

angularControllers.controller('NavbarCtrl', ['$scope', 
    function($scope) {
        $scope.classes = class_list;
        // $scope.goToPage = function(link) {
        //     console.log(link);
        //     window.location.href = link;
        // }
    }])

angularControllers.controller('ClassPageCtrl', ['$scope', '$http', '$sce',
    function($scope, $http, $sce) {
        // gets the resources for this class
        var resourceList = [];
        // $scope.results;

        $scope.addlike = function(resourceid) {
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

        $scope.addbookmark = function(resourceid) {
            console.log(resourceid);
            $.ajax({
              type: "GET",
              url: "/class_ta/addbookmark",
              data: { resource_id: resourceid},
              contentType: 'application/json',
                dataType: "json"
            })
            .done(function( data) {
              console.log(data);
            });
        }

        $scope.removelike = function(resourceid) {
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

        $scope.removebookmark = function(resourceid) {
            $.ajax({
              type: "GET",
              url: "/class_ta/removebookmark",
              data: { resource_id: resourceid},
              contentType: 'application/json',
                dataType: "json"
            })
            .done(function( data) {
              console.log(data);
            });
        }

        $.ajax({
          type: "GET",
          url: "/class_ta/resourcejs",
          data: {class_id: classid},
          contentType: 'application/json',
          dataType: "json"
        }).done(function(data) {
          for (var i = 0; i < data.length; i++) {
                var thisResult = data[i];
                var thisBookmarks = thisResult["bookmarks"];
                var thisLikes = thisResult["likes"];
                thisResult.bookmarked = false;
                thisResult.liked = false;
                thisResult.mine =false;
                if (thisResult.user_id === userId) {
                    thisResult.mine = true;
                };
                for (var j = 0; j < thisBookmarks.length; j++) {
                    if (thisBookmarks[j].user_id == userId) {
                        thisResult.bookmarked = true;
                    }
                }
                for (var j = 0; j < thisLikes.length; j++) {
                    if (thisLikes[j].user_id == userId) {
                        thisResult.liked = true;
                    }
                }
          }
          $scope.$apply(function() {
            $scope.results = data;
            resources = data;

            resourceToDisplayID = getBookmarkId('resource_id');
            for (var i = 0; i < data.length; i++) {
                if (data[i]['id'] == resourceToDisplayID) {
                    resourceToDisplay = data[i];
                }
            }
            
          });
          console.log(data);
        });

        $scope.currentResult;
        $scope.thisUser = userId;
        $scope.categories = ["Starred", "Video", "Website", "Audio", "Note"];
        $scope.resultsOrder = "-likes.length";
        $scope.filterCategories = {};
        $scope.selectedResultId = "";
        $scope.resourceToDelete;
        $scope.resourceToLike;

        $scope.removeFromDisplay = function(id) {
            console.log(id);
            for (var i = 0; i < $scope.results.length; i++) {
                var result = $scope.results[i];
                if (result['id'] == id) {
                    
                    $scope.results.splice(i, 1);
                    $("#cp-deleteNotice").animate({"opacity": 1}, 300, function() {
                        $("#cp-deleteNotice").animate({"opacity": 1}, 2000, function() {
                            $("#cp-deleteNotice").animate({"opacity": 0}, 300, function() {
                                
                            });
                        });
                    });
                }
            }
        }

        $scope.setResourceToDelete = function(id) {
            resourceToRemove = id;
            $scope.resourceToDelete = id;
        }
        
        $scope.setCurrentResult = function(result) {
            console.log("setCurrentResult called")
            $(".cp-resultSelected").removeClass("cp-resultSelected");
            $("#" + result['id']).addClass("cp-resultSelected"); 

            if (result.type == "Video") {

                $scope.currentResult = result;
                var id = getId($scope.currentResult['link']);
                $scope.currentResultURL = $sce.trustAsResourceUrl("//youtube.com/embed/" + id);
                
                console.log("class added");
            } else if (result.type == "Audio") {

            } else {
                $scope.currentResult = result;
                $scope.currentResultURL = $sce.trustAsResourceUrl($scope.currentResult['link']);
 
                console.log("class added");
            }
            

            $scope.resourceToLike = result;
            resourceToLike = result;
        }

        $scope.updateFilterCategories = function(category) {
            if (category in $scope.filterCategories) {
                delete $scope.filterCategories[category];
            } else {
                $scope.filterCategories[category] = null;
            }
            console.log($scope.filterCategories);
        }

        $scope.resultsFilter = function(result) {
            if (Object.keys($scope.filterCategories).length == 0) {
                return true;
            } else if (result.type in $scope.filterCategories) {
                if ("Starred" in $scope.filterCategories) {
                    if (!result.bookmarked) {
                        return false;
                    }
                }
                return true; 
            } else if (result.bookmarked && "Starred" in $scope.filterCategories) {
                if (Object.keys($scope.filterCategories).length == 1) {
                    return true;
                } else { // there are other options
                    if (!(result.type in $scope.filterCategories)) {
                        return false;
                    }
                    return true
                }
                
            } else {
                return false;
            }
        }

        $scope.changeSort = function(sortType) {

            $scope.resultsOrder = sortType;
            console.log($scope.resultsOrder);
        }
        $(window).load(function() {
            var audio = false;
            var link, result;
            $(".cp-result").each(function() {
                var thisID = $(this).attr("id");
                if ($($(this).children()[2]).attr("src") == '/assets/audioIcon.png') {
                    for (var i = 0; i < resources.length; i++) {
                        if (resources[i]['id'] == thisID) {
                            
                            $($(this).children()[2]).wrap("<a id = 'cp-link-" + resources[i]['id'] + "' href=" + link + " target='_blank'></a>");
                        }

                        if (resources[i]['id'] == resourceToDisplay.id) {
                            link = resources[i]['link'];
                            result = resources[i];
                        }
                    }
                    
                }
            })
            if (resourceToDisplay != -1) {
                console.log(resourceToDisplay.type);
                if (resourceToDisplay.type == "Audio") {
                    console.log(link);
                    window.open(link, '_blank');
                    $("#" + resourceToDisplay.id).click();
                } else {
                    $("#" + resourceToDisplay.id).click();
                }
            }
            $(".deleteResource").tooltip();
            $(".cp-result-star").tooltip();
            $(".cp-result-starFilled").tooltip();
        })
    }
]);

