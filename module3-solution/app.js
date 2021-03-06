(function(){
'use strict';
// app.js
angular.module("NarrowItDownApp",[])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$injector =["MenuSearchService"];
function NarrowItDownController(MenuSearchService){
    var menu= this;

    menu.found = [];
    menu.searchTerm = "";
    menu.showError = [false,];

    menu.narrowItDown = function(){
      menu.items = [];
      var searchTerm = menu.searchTerm.toLowerCase();
      if(searchTerm == "") {
        menu.showError[0] = true;
        return;
      }
      console.log("Narrow it down button was clicked: " + searchTerm );

      var allItmePromise = MenuSearchService.getMatchedMenuItems();
        allItmePromise.then(function(allItems){
                console.log("button promise");
        menu.AllItems = allItems.data.menu_items;

        console.log(menu.AllItems);
        for (var i = 0; i < menu.AllItems.length; i++) {
          if((menu.AllItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) ||
              (menu.AllItems[i].name.toLowerCase().indexOf(searchTerm) !== -1))
          {
            menu.items.push(menu.AllItems[i]);
          }
          if(menu.items.length === 0)
            menu.showError[0] = true;
          else
            menu.showError[0] = false;
        }
                console.log(menu.items);
      })
    }

//remove button click  
menu.removeItem = function (index) {
  console.log("main controller ");
    menu.items.splice(index, 1);
  };
//    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

 //   promise.then(function (response) {

 //      console.log(response.data);

 //   })
 //   .catch(function (error) {
 //     console.log(error);
  //   })
    //menu.found = MenuSearchService.getMatchedMenueItems(menu.searchTerm );
}   
//Service 
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
      onRemove: '&',
      showError: '<'
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

  myCtrl.onRemove = function (rIndex, mlist, sError){
    // remove the item from the list 
    console.log("Button click handler onRemove: " + rIndex);
    console.log(mlist);
    mlist.splice(rIndex, 1);
    if(mlist.length === 0){
        sError[0] = true;
    }
  }
}
//end 
})()  
