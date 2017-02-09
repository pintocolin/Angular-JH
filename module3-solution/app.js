(function(){
'use strict';
// app.js
angular.module("NarrowItDownApp",[])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService);

NarrowItDownController.$injector =["MenuSearchService"];
function NarrowItDownController(MenuSearchService){
    var menu= this;


}   



MenuSearchService.$injector = ["scope"];
function MenuSearchService(){
    var menuService = this;


    
}

})()