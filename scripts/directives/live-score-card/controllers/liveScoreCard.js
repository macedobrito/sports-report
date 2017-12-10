/* global angular, TweenMax, Power4 */
'use strict';

angular.module('material').directive('liveScoreCard', function(teamService, $mdDialog, pathBuilder, folders, liveScoresServices, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: './scripts/directives/live-score-card/views/liveScoreCard.html',
        scope: {
            card: '='
        },
        replace: true,
        controller: function($scope, $element, teamService, $mdDialog, pathBuilder, commons) {
            $scope.loading = true;
            teamService.getTeamById($scope.card.localteam_id).then(function(localTeamDetail) {
                $scope.localTeamDetail = localTeamDetail.data;
                $scope.loading = false;
                setTimeout(function() {
                    commons.initScrollBar('#team-score-'+$scope.card.localteam_id);
                }, 500)
            });
            teamService.getTeamById($scope.card.visitorteam_id).then(function(visitorTeamDetail) {
                $scope.visitorTeamDetail = visitorTeamDetail.data;
            });

            $scope.compareTeams = function (ev){
                $mdDialog.show({
                    templateUrl: pathBuilder.build(folders.TEAMS_HEAD_TO_HEAD, 'teamsHeadToHeadModal.html', [folders.VIEWS]),
                    parent: angular.element(document.body),
                    targetEvent: (ev) ? ev : null,
                    clickOutsideToClose: true,
                    controller: 'teamsHeadToHeadController',
                    locals: {
                        team1CompleteInfo: $scope.localTeamDetail,
                        team2CompleteInfo: $scope.visitorTeamDetail,
                        teamId1: $scope.card.localteam_id,
                        teamId2: $scope.card.visitorteam_id,
                    }
                });
            };

            $scope.openTeamModal = function(ev, teamId, phase) {
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

            $scope.openPlayerModal= function(ev, playerId) {
                $rootScope.playerId = playerId;
                $mdDialog.show({
                    templateUrl: pathBuilder.build(folders.PLAYER_INFO, 'playerInfosModal.html', [folders.VIEWS]),
                    parent: angular.element(document.body),
                    targetEvent: (ev) ? ev : null,
                    clickOutsideToClose: true,
                    controller: 'playerInfoController',
                    locals: {
                        playerId: playerId
                    }
                });
            };

            if($scope.card.time.status === 'LIVE') {
                $scope.cardStatus = 'card-active';
            }else if($scope.card.time.status === 'HT'){
                $scope.cardStatus = 'card-paused';
            }
        }
    };
});