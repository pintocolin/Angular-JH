(function(){
'use strict';
// app.js
angular.module("NarrowItDownApp",[])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$injector =["MenuSearchService"];
function NarrowItDownController(MenuSearchService){
    var menu= this;

    var searchTerm = "chicken";
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    console.log(menu.items);
    promise.then(function (response) {
      if(1){
        menu.items = response.data;
        console.log(menu.items);
      }
      else{
        menu.error = "Nothing found";
        console.log(menu.error);
      }

    })
    .catch(function (error) {
      console.log(error);
    })


}   

MenuSearchService.$injector = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        //category: shortName
      }
    });

    return response;
  };
    
}
function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsTemplate.html',
    restrict: 'E',
    scope: {
      items: '<foundItems',
      onRemove: '&'
    },
    controller: FoundItemsController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsController( ){
  var list = this;

  list.items = nlist.items;
  list.onRemove = function (){
    // remove the item from the list 
  }
}
//end 
})()  
