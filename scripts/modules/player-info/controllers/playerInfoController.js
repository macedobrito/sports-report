/*global angular */
'use strict';

var app = angular.module('material');
app.controller('playerInfoController', function($scope, playersServices, $stateParams, $rootScope, commons, leagueService, seasonService) {
    var leagueIdDetails = new Map(),
        seasonIdDetails = new Map();
    $scope.getPlayerInfos = function(){
        $scope.loading = true;
        var playerId = ($stateParams.playerId) ? $stateParams.playerId : $rootScope.playerId;
        playersServices.getPlayerById(playerId).then(function(player) {
            $scope.player = player.completeInfo;
            $scope.loading = false;
            setTimeout(function() {
                commons.initScrollBar('.mainBodyScroll');
            }, 500)
        })
    };

    $scope.resolveLeagueName = function(leagueId) {
       var textToReturn = $scope.getLeagueIdDetails(leagueId);
        if(textToReturn){
            textToReturn = textToReturn.name;
        }else{
            textToReturn = '-';
        }
        return textToReturn;
    };

    $scope.resolveSeasonName = function(seasonId) {
        var textToReturn = $scope.getSeasonIdDetails(seasonId);
        if(textToReturn){
            textToReturn = textToReturn.name;
        }else{
            textToReturn = '-';
        }
        return textToReturn;
    };

    $scope.getLeaguesDetails = function() {
        angular.forEach($scope.player.stats.data , function(stat) {
            leagueService.getLeagueById(stat.league_id).then(function(requestedLeagueDetail) {
                leagueIdDetails.set(requestedLeagueDetail.data.id, requestedLeagueDetail.data);
            });
            seasonService.getSeasonById(stat.season_id).then(function(requestedSeasonDetail) {
                seasonIdDetails.set(requestedSeasonDetail.data.id, requestedSeasonDetail.data);
            })
        });

    };

    $scope.getLeagueIdDetails = function(leagueId) {
        return leagueIdDetails.get(leagueId);
    };

    $scope.getSeasonIdDetails = function(seasonId) {
        return seasonIdDetails.get(seasonId);
    };

    $scope.getPlayerInfos();
});
