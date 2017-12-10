/*global angular */
'use strict';
var app = angular.module('material.services');
app.factory('leagueService', function($http, $q, baseUrl, serviceModules, serviceCollections, backend) {
    return {
        getLeagues: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://soccer.sportmonks.com/api/v2.0/leagues?api_token=" + backend.clientId + "&include=seasons"
            }).then(function(data) {
                deferred.resolve(data.data);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        },
        getLeagueById: function(leagueId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    serviceModules.LEAGUES, [{
                        collection: leagueId
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
        getLeagueTableBySeasonId: function(league) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(serviceCollections.STANDINGS,
                    [{
                        collection: serviceCollections.SEASON,
                        value: league.id
                    }], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }]
                ),
                skipAuthorization: false
            }).then(function(data) {
                league.seasonTable = data.data.data;
                deferred.resolve(league);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        }
    };
});
