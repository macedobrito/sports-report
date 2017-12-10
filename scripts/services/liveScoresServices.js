/*global angular */
'use strict';
var app = angular.module('material.services');
app.factory('liveScoresServices', function($http, $q, baseUrl, serviceModules, serviceCollections, backend) {
    return {
        getLiveScores: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    null, [{collection: serviceCollections.LIVE_SCORES}], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }, {
                        queryParam: serviceCollections.INCLUDE,
                        value: ['goals', 'tvstations']
                    }]
                )
            }).then(function(data) {
                deferred.resolve(data.data);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        },
        getHeadToHead: function(teamId1, teamId2) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    serviceModules.HEAD_TO_HEAD, [{
                            collection: teamId1
                        },
                        {
                            collection: teamId2
                        }], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }]
                )
            }).then(function(data) {
                deferred.resolve(data.data);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        },
    }
});
