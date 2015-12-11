/* global angular */

angular.module('meanTodo', [])
    .controller('MainCtrl', function($http) {
        $http.get('/todo').then(function(res) {
            console.log('meanTodo', res.data);
        });
    });