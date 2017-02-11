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

    menu.found = [];
    menu.searchTerm = "";
    menu.showError = false;

    menu.narrowItDown = function(){
      console.log("Narrow it down button was clicked" + menu.searchTerm );

      var allItmePromise = MenuSearchService.getMatchedMenuItems();
        allItmePromise.then(function(allItems){
                console.log("button promise");
        menu.items = allItems.data.menu_items;
        console.log(menu.items);

      })
    }

//    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

 //   promise.then(function (response) {

 //      console.log(response.data);

 //   })
 //   .catch(function (error) {
 //     console.log(error);
  //   })
    //menu.found = MenuSearchService.getMatchedMenueItems(menu.searchTerm );
}   
//SErvice 
MenuSearchService.$injector = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

   service.getMatchedMenueItems = function(searchTerm) {
    var allMenuItemsPromise = service.getMatchedMenuItems(searchTerm);

    allMenuItemsPromise
      .then(function(response){
          console.log(response.data);
          var allItems = response.data.menu_items;
          return allItems;
          //return allItems.filter(function(searchTerm) {
            //return allItems.description.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1;
          //})
      })
      .catch(function(error){
          console.log("error getting data from server");
      })
   }
}

// directive
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
  console.log("In the FoundItemDirective function" );

  return ddo;
}

FoundItemsController.$injector =[];
function FoundItemsController(){
  var myCtrl = this;

  console.log("in the FoundItemController funciton : ");

  myCtrl.onRemove = function (){
    // remove the item from the list 
    console.log("Button click handler onRemove");
  }
}
//end 
})()  
