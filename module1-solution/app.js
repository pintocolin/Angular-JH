(function () {
'use strick';

angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

function LunchCheckController($scope, $filter){
    $scope.LunchMessage = "test";
    };

}  )();