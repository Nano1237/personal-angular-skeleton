angular.module('my.services')
    .service('MyService', [
        function () {
            return function () {
                return 'Value from Service';
            }
        }
    ]);
