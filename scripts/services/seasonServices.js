/*global angular */
'use strict';
var app = angular.module('material.services');
app.service('seasonService', function($http, $q, baseUrl, serviceModules, serviceCollections, backend) {
    return {
        getSeasons: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    serviceModules.SEASONS, null, [{
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
        getSeasonById: function(seasonId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    null, [{
                        collection: serviceModules.SEASONS,
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
        getBestSeasonScorer: function(season) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(serviceCollections.TOP_SCORERS,
                    [{
                        collection: serviceCollections.SEASON,
                        value: season.id
                    }], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }]
                ),
                skipAuthorization: false
            }).then(function(data) {
                season.bestScorer = data.data.data;
                deferred.resolve(season);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        }
    };
});
