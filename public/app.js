/* global angular */

angular.module('meanTodo', [])
    .controller('mainCtrl', function($http) {
        var main = this;
      
        $http.get('/todo').then(function(res) {
            main.todos = res.data;
        });
    });