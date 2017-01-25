(function () {
'use strick';

angular.module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
    $scope.LunchMessage = "";
    $scope.lunchList = "";

    $scope.processLunchList = function (){
    console.log("=processing lunch List=");

    var lunch = $scope.lunchList;
    var List =lunch.split(',');

    console.log(lunch);
    console.log(List);

    console.log(List.length);
    if(List.length == 1 && List[0] =="")
        $scope.LunchMessage = "Please enter data first";
    else if(List.length <4 || (List.length ==4 && List[3] ==""))
        $scope.LunchMessage = "Enjoy!";
    else
        $scope.LunchMessage = "Too much!";
    }

}
//processLunchList( );
}  )();