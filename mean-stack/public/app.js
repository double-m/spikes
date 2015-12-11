/* global angular */

angular.module('meanTodo', [])
    .controller('mainCtrl', function($http) {
        var main = this;

        main.addTask = addTask;
        main.updateTask = updateTask;
        main.deleteTask = deleteTask;

        // initial population
        getTasks();

        function addTask() {
            if (!main.newTaskText) return false;

            $http({
                method: 'POST',
                url: '/todos',
                data: {
                    task: main.newTaskText,
                    completed: false
                }
            }).then(function (res) {
                if (res.status === 201) {
                    getTasks();
                }

                var consoleMessage = (res.status === 201)
                    ? 'new task "' + main.newTaskText + '" has been stored'
                    : 'server response was "' + res.data + '" with http status ' + res.status;
                console.log(consoleMessage);
            });
        }

        function deleteTask(id) {
            $http({
                method: 'DELETE',
                url: '/todos/' + id
            }).then(function (res) {
                if (res.status === 200) {
                    getTasks();
                }
            });
        }

        function updateTask(todo) {
            $http({
                method: 'PUT',
                url: '/todos/' + todo._id,
                data: {
                    todo: {
                        completed: todo.completed
                    }
                }
            }).then(function (res) {
                if (res.status === 200) {
                    getTasks();
                }
            });
        }

        function getTasks() {
            $http.get('/todos').then(function(res) {
                main.todos = res.data;
            });
        }
    });