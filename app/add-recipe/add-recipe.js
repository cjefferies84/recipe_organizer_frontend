'use strict';

angular.module('myApp.addRecipe', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-recipe', {
            templateUrl: 'add-recipe/add-recipe.html',
            controller: 'AddRecipesCtrl'
        });
    }])

    .controller('AddRecipesCtrl', ['$scope', 'Restangular', '$location', function ($scope, Restangular, $location) {
        // Initialize an empty recipe object with an empty ingredients and tags list inside.

        document.getElementById('recipe-name').focus();

        $scope.recipe = {
            ingredients: [],
            tags: []
        };

        // Add the ingredients to the recipe object we're building
        $scope.addIngredientToRecipe = function(ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';

            document.getElementById('ingredient-input').focus()
        };

         $scope.removeIngredientFromRecipe = function(index) {
            console.log(index);
            //Splice takes element index to start at and second how many elements to delete
            $scope.recipe.ingredients.splice(index, 1);
        };

        // Add the tags to the recipe object we're building
        $scope.addTagToRecipe = function (tagName) {
            var tag = {name: tagName};
            $scope.recipe.tags.push(tag);
            $scope.tagName = '';

            document.getElementById('tag-input').focus()
        };

        // Add a new recipe, alert the user when it's been created or when there was a problem.
        $scope.addRecipe = function () {
            Restangular.all('add-recipe/').customPOST($scope.recipe).then(function () {
                    alert("Your recipe was successfully created");
                    $location.path('/recipes');
                },
                function () {
                    alert("There was a problem creating your recipe. Please try again.")
                })}
    }]);