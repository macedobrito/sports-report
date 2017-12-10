/*global angular */
'use strict';
var app = angular.module('material.services');
app.service('playersServices', function($http, $q, baseUrl, serviceModules, serviceCollections, backend) {
    return {
        // https://soccer.sportmonks.com/api/v2.0/players/{id}?api_token=__TOKEN__
        getPlayerById: function(player) {
            var playerObj = {};
            if (typeof player === 'string' || typeof player === 'number') {
                playerObj.player_id = player;
                player = {};
            } else {
                playerObj = player;
            }
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl.getUrl(
                    serviceCollections.PLAYERS, [{
                        collection: playerObj.player_id
                    }], [{
                        queryParam: serviceCollections.api,
                        value: backend.clientId
                    }, {
                            queryParam: serviceCollections.INCLUDE,
                            value: [serviceCollections.TEAM, 'stats']
                    }]
                ),
                skipAuthorization: false
            }).then(function(data) {
                player.completeInfo = data.data.data;
                deferred.resolve(player);
                return deferred.promise;
            }, function(data) {
                deferred.reject(data);
                return deferred.promise;
            });
            return deferred.promise;
        }
    };
});
