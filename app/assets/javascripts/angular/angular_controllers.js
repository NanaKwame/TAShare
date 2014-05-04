/* Angular Controller */


var angularControllers = angular.module('TAShareApp', []);

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
        $.ajax({
          type: "GET",
          url: "/class_ta/resourcejs",
          data: {class_id: classid},
          contentType: 'application/json',
          dataType: "json"
        }).done(function(data) {
          console.log(data);
          $scope.$apply(function() {
            $scope.results = data;
          });
        });
        // $http.get('/class_ta/resourcejs').success(function(data) {
        //     $scope.results = data;
        // });
        $scope.resultsOrder = "created_at";
        $scope.resultsFilter;

        $scope.changeSort = function(sortType) {
            $scope.resultsOrder = sortType;
        }
    }
]);