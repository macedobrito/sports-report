/*global angular */
'use strict';
var app = angular.module('material.services');
app.service('teamService', function($http, $q, baseUrl, serviceModules, serviceCollections, backend) {
    return {
        getTeamBySeasonId: function(seasonId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    serviceModules.TEAMS, [{
                        collection: serviceCollections.SEASON,
                        value: seasonId
                    }], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }]
                ),
                skipAuthorization: false
            }).then(function(data) {
                deferred.resolve(data.data);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        },
        getTeamById: function(teamId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    serviceModules.TEAMS, [{
                        collection: teamId
                    }], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }, {
                        queryParam: serviceCollections.INCLUDE,
                        value: serviceCollections.SQUAD
                    }
                    ]
                ),
                skipAuthorization: false
            }).then(function(data) {
                deferred.resolve(data.data);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        }
    };
});
