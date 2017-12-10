var app = angular.module('material');
app.controller('teamInfosModalController', function($scope, teamService, playersServices, teamId, phase, $q, $timeout, commons, states, $state, $mdDialog) {
    $scope.loading = true;
    $scope.phase = phase;
    var promises = [];

    $scope.fadeElementsIn = function() {
        $timeout(function() {
            var allElements = $('.modal-dynamic-element');
            TweenMax.staggerFromTo(allElements, 0.2, {
                ease: Power0.easeInOut,
                paddingBottom: 15
            }, {
                ease: Power0.easeInOut,
                paddingBottom: 0
            }, 0.04);

            TweenMax.staggerFromTo(allElements, 0.2, {
                ease: Power0.easeInOut,
                opacity: 0
            }, {
                ease: Power0.easeInOut,
                opacity: 1
            }, 0.04);

            commons.initScrollBar('#teamInfoScrollBar');
        })
    };

    $scope.goToPlayerDetail = function (playerId){
        $mdDialog.hide();
        $state.go(states.PLAYER_INFO, {playerId: playerId});
    };


    $scope.getTeamById = function(teamId){
        teamService.getTeamById(teamId).then(function(team) {
            $scope.team = team.data;
            angular.forEach($scope.team.squad.data, function(player) {
                var deferred = $q.defer();
                playersServices.getPlayerById(player).then(function(player) {
                    deferred.resolve();
                    $q.all(promises).then(function() {
                        $scope.loading = false;
                        $scope.fadeElementsIn();
                    })
                });
                promises.push(deferred.promise);
            });
        })
    };

    
    
    $scope.getTeamById(teamId);
});