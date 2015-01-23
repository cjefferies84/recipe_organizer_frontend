'use strict';

angular.module('recipeOrganizer.recipes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/recipes', {
    templateUrl: 'recipes/recipes.html',
    controller: 'RecipesCtrl'
  });
}])

.controller('RecipesCtrl', ['$scope', 'Restangular', function($scope, Restangular) {
    Restangular.all('recipes').getList().then(function(recipes) {
        $scope.recipes = recipes;
    });

    $scope.deleteRecipe = function(recipeID) {
        Restangular.one('recipes', recipeID).customDELETE().then(function(){
            $location.path('/recipes');
        })
    }
}]);