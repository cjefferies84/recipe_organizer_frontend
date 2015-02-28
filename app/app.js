'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.home',
    'myApp.recipes',
    'myApp.ingredients',
    'myApp.recipeDetail',
    'myApp.addRecipe',
    'myApp.version',
    'restangular',
    'ui.bootstrap'

]).

    config(['$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});

        RestangularProvider.setBaseUrl('http://localhost:8001')

}]);

