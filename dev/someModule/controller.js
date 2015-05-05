angular.module('my.controllers')
    .controller('MyCtrl', [
        '$scope',
        'MyService',
        function ($scope, MyService) {
            $scope.myVariable = MyService();
        }
    ]);