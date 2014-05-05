/* Angular Controller */


var angularControllers = angular.module('TAShareApp', []);

var capitalize = function(string) {
    var firstLetter = string[0].toUpperCase();
    var restOfString = string.substring(1, string.length)
    return firstLetter + restOfString;
}

angularControllers.controller('HomePageCtrl', ['$scope', '$http',
  function($scope, $http) {
    // $http.get('phones/phones.json').success(function(data) {
    //   $scope.phones = data;
    // });

    $scope.foo = 'bar';
  }]);

angularControllers.controller('ClassPageCtrl', ['$scope', '$http',
    function($scope, $http) {
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
          });
          console.log(data);
        });
        // $http.get('/class_ta/resourcejs').success(function(data) {
        //     $scope.results = data;
        // });

        $scope.categories = ["Starred", "Video", "Website", "Audio", "Note", "Problem", "Other"];
        $scope.resultsOrder = "-likes.length";
        console.log($scope.resultsOrder);
        $scope.filterCategories = {};

        

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