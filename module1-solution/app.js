(function () {
'use strick';

angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
    $scope.LunchMessage = "test";
    $scope.yyy ="" ;
    $scope.lunchList = "";
    }

}  )();