/*global angular */
'use strict';

var app = angular.module('material');
app.controller('landingPageController', function($scope, leagueService, $q, $mdDialog, folders, pathBuilder, commons, seasonService, $filter) {
    var landingPageCtrl = $scope,
        requestedLeagues = [], // save requested leagues in order to reduce calls
        promises = [],
        leagueIdDetails = new Map();
    $scope.loading = true;

    $scope.updatesLeagueScrollBar = function(leagueId) {
        commons.initScrollBar('#leagueTab'+leagueId);
        $('#tab-content-' + index).css('position', 'absolute');
    };

    $scope.sortBy = function(propertyName, table) {
        if(table[propertyName]){
            table[propertyName].reverse = !table[propertyName].reverse;
        }else{
            table[propertyName] = {reverse: false};
        }
        table.standings.data = $filter('orderBy')(table.standings.data, propertyName,  table[propertyName].reverse)
    };

    landingPageCtrl.getAllLeagues = function() {
        leagueService.getLeagues().then(function(leagues) {
            $scope.leagues = leagues.data;
            angular.forEach($scope.leagues, function(league) {
                angular.forEach(league.seasons.data, function(leagueSeason) {
                    landingPageCtrl.getLeagueTable(leagueSeason);
                });
            })
        });
    };

    landingPageCtrl.getLeagueTable = function(leagueSeason) {
        // blockUI.start();
        leagueService.getLeagueTableBySeasonId(leagueSeason).then(function(response) {
            // blockUI.stop();
            angular.forEach(leagueSeason.seasonTable, function(phase) {
                if (!(requestedLeagues.includes(phase.league_id))) { //if league detail has not yet been requested
                    requestedLeagues.push(phase.league_id);
                    var deferred = $q.defer();
                    leagueService.getLeagueById(phase.league_id).then(function(requestedLeagueDetail) {
                        // blockUI.stop();
                        leagueIdDetails.set(requestedLeagueDetail.data.id, requestedLeagueDetail.data);
                        deferred.resolve();
                    });
                    promises.push(deferred.promise);
                    $q.all(promises).then(function() {
                        $scope.loading = false;
                        commons.initScrollBar('#leagueTab'+$scope.leagues[0].id);
                    })
                }
            });
        });
    };

    $scope.getTopPlayer = function(ev, season) {
        seasonService.getBestSeasonScorer(season).then(function(seasonGoals) {
            $mdDialog.show({
                templateUrl: pathBuilder.build(folders.SEASON_BEST_SCORER, 'seasonBestScorerModal.html', [folders.VIEWS]),
                parent: angular.element(document.body),
                targetEvent: (ev) ? ev : null,
                clickOutsideToClose: true,
                controller: 'seasonBestScorerController',
                locals: {
                    seasonGoals: seasonGoals
                }
            });
        })
    };

    landingPageCtrl.getLeagueIdDetails = function(leagueId) {
        return leagueIdDetails.get(leagueId);
    };

    $scope.openTeamDetails = function(ev, teamId, phase) {
        $mdDialog.show({
            templateUrl: pathBuilder.build(folders.TEAM_INFOS_MODAL, 'teamInfosModal.html', [folders.VIEWS]),
            parent: angular.element(document.body),
            targetEvent: (ev) ? ev : null,
            clickOutsideToClose: true,
            controller: 'teamInfosModalController',
            locals: {
                teamId: teamId,
                phase: phase
            }
        });
    };

    landingPageCtrl.getAllLeagues();
});
