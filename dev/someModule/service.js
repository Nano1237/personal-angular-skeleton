angular.module('my.services')
    .service('MyService', [
        function () {
            return function () {
                return 'Value from Service';
            }
        }
    ])
    .service('MyApiService', [
        '$http',
        '$q',
        'API_ROOT',
        function ($http, $q, API_ROOT) {
            return function () {
                var def = $q.defer();
                $http.get(API_ROOT).success(def.resolve);
                return def.promise;
            }
        }
    ]);
