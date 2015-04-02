'use strict';

angular.module('myApp.addRecipe', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/add-recipe', {
            templateUrl: 'add-recipe/add-recipe.html',
            controller: 'AddRecipeCtrl'
        });
    }])

    .controller('AddRecipeCtrl', ['$scope', 'Restangular', '$location', '$http', function ($scope, Restangular, $location, $http) {
        // Initialize an empty recipe object with an empty ingredients and tags list inside.


        $scope.recipe = {
            ingredients: [],
            //tags: ["test", "another tag"]
            photo: null
        };

        // Add the ingredients to the recipe object we're building
        $scope.addIngredientToRecipe = function (ingredientName) {
            var ingredient = {name: ingredientName};
            $scope.recipe.ingredients.push(ingredient);
            $scope.ingredientName = '';

        };

        // Add the tags to the recipe object we're building
        $scope.addTagToRecipe = function (tagName) {
            var tag = {name: tagName};
            $scope.recipe.tags.push(tag);
            $scope.tagName = '';

        };

        //Add a new recipe, alert the user when it's been created or when there was a problem.
        $scope.addRecipe = function () {
            //var boundary = "---------------------------7da24f2e50046";

            Restangular.all('add-recipe/').customPOST($scope.recipe).then(function (recipe) {
                alert("You did it! The recipe you created has an id of " + recipe.id);
                var fd = new FormData();
                fd.append("photo", $scope.photo);

                var url = 'http://localhost:8001/recipes/' + String(recipe.id) +'/';

                $http.patch(url, fd, {
                    headers: {'Content-type': undefined},
                    transformRequest: angular.identity

                }).success(function () {
                    alert("Photo should be uploaded now!");
                    $location.path('/recipes');
                }).error(function (response) {
                    console.log('Error response: ' + response);
                });


            });





            //var fd = new FormData();
            //fd.append("photo", $scope.recipe.photo);
            //fd.append("name", $scope.recipe.name);
            //fd.append("description", $scope.recipe.description);
            //fd.append("directions", $scope.recipe.directions);
            //fd.append("ingredients", $scope.recipe.ingredients);
            //fd.append("tags", $scope.recipe.tags);
            //
            //$http.post('http://localhost:8001/add-recipe/', fd, {
            //    headers: {'Content-type': undefined},
            //    transformRequest: angular.identity
            //
            //}).success(function () {
            //    $location.path('/recipes');
            //}).error(function (response) {
            //    console.log('Error response: ' + response);
            //})
        };

        $scope.uploadFile = function (files) {
            $scope.photo = files[0];
        };

        $scope.cancel = function () {
            $location.path('/recipes');


        };

    }]);