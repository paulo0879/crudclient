(function() {
    'use strict';
    angular
        .module('crudClientApp')
        .factory('Client', Client);

    Client.$inject = ['$resource', 'DateUtils'];

    function Client ($resource, DateUtils) {
        var resourceUrl =  'api/clients/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateOfBirthday = DateUtils.convertLocalDateFromServer(data.dateOfBirthday);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.dateOfBirthday = DateUtils.convertLocalDateToServer(copy.dateOfBirthday);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.dateOfBirthday = DateUtils.convertLocalDateToServer(copy.dateOfBirthday);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
