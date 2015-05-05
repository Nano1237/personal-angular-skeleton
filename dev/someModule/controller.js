angular.module('my.controllers')
    .controller('MyCtrl', [
        '$scope',
        'MyService',
        'MyApiService',
        function ($scope, MyService, MyApiService) {
            $scope.myVariable = MyService();
            $scope.myAjaxValue = 'loading...';
            MyApiService().then(function (a) {
                $scope.myAjaxValue = a.success ? a.text : 'Ajax Resource Failed';
            });
        }
    ]);