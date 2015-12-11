/* global angular */

angular.module('meanTodo', [])
    .controller('mainCtrl', function($http) {
        var main = this
            main.completed;

        main.addTodo = function() {
            if (!main.newTodoText) return false;

            console.log('sending', main.newTodoText);
            
            $http({
                method: 'POST',
                url: '/todos',
                data: {
                    task: main.newTodoText,
                    completed: false
                }
            }).then(function (res) {
                if (res.status === 201) {
                    main.getTodos();
                }

                var consoleMessage = (res.status === 201)
                    ? 'new task "' + main.newTodoText + '" has been stored'
                    : 'server response was "' + res.data + '" with http status ' + res.status;
                console.log(consoleMessage);
            });
        };

        main.updateCompleted = function(todo) {
            $http({
                method: 'PUT',
                url: '/todos/' + todo._id,
                data: {
                    todo: {
                        completed: todo.completed
                    }
                }
            }).then(function (res) {
                main.getTodos();
            });
        };

        main.getTodos = function() {
            $http.get('/todos').then(function(res) {
                main.todos = res.data;
            });
        };

        // initial population
        main.getTodos();
    });