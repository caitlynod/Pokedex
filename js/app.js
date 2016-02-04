// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var PokedexApp = angular.module('PokedexApp', ['ionic', 'ngRoute', 'ngSanitize'])
.run(function($ionicPlatform, $rootScope, $location) {
  $rootScope.goHome = function(){
    $location.path('/pokemon');
  };
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

PokedexApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/pokemon', {
      controller: 'PokemonController',
      templateUrl: 'partials/pokemon.html'
    })
    .when('/details/:itemId',{
      controller: 'DetailsController',
      templateUrl: 'partials/details.html'
    })
    .otherwise({redirectTo: '/pokemon'});
}]);
var pokemonID = [];
var pokeID =[];
PokedexApp.controller('PokemonController', ['$scope', '$http', '$ionicLoading', function($scope, $http, $ionicLoading){
  $scope.loadPokemon= function(){
    $ionicLoading.show();
    $http.get("http://pokeapi.co/api/v1/pokedex/1/")
    .success(function(response){
      $scope.pokemon = response.pokemon;
      $scope.newID = [];
      for(var i=0; i < response.pokemon.length; i++){
        pokemonID[i] = response.pokemon[i].resource_uri;
        pokeID[i] = pokemonID[i].substring(15);
        $scope.newID.push(pokeID[i]);

      //$scope.newID = pokeID[i];
      console.log($scope.newID);
      }

      
      $ionicLoading.hide();
      //$scope.quantity = 31;
    })
    .finally(function(){
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  $scope.loadPokemon();
  $scope.quantity = 30;

}]);

PokedexApp.controller('DetailsController', ['$scope', '$http', '$routeParams', '$ionicLoading', function($scope, $http, $routeParams, $ionicLoading){
    $ionicLoading.show();
    $http.get("http://pokeapi.co/api/v1/pokemon/"+[$routeParams.itemId])
    .success(function(response){
      console.log(response.evolutions);
      $scope.pokemonName = response;
      $ionicLoading.hide();

    });


}]);