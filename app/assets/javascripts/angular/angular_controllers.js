/* Angular Controller */


var angularControllers = angular.module('TAShareApp', []);

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

angularControllers.controller('HomePageCtrl', ['$scope', '$http',
  function($scope, $http) {
    // $http.get('phones/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });

    $scope.foo = 'bar';
  }]);

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
            $scope.currentResult = data[0];
            $scope.currentResultURL = $sce.trustAsResourceUrl('http://' + $scope.currentResult['link'] + '/embed');
            console.log($scope.currentResultURL);
          });
          console.log(data);
        });

        $scope.currentResult;

        $scope.categories = ["Starred", "Video", "Website", "Audio", "Note", "Problem", "Other"];
        $scope.resultsOrder = "-likes.length";
        $scope.filterCategories = {};
        $scope.selectedResultId = "";
        
        $scope.setCurrentResult = function(result) {
            $scope.currentResult = result;
            if (result.type == "Video") {
                var id = getId($scope.currentResult['link']);
                $scope.currentResultURL = $sce.trustAsResourceUrl("//youtube.com/embed/" + id);
            } else {
                $scope.currentResultURL = $sce.trustAsResourceUrl($scope.currentResult['link']);
            }
            
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
    }
]);