var app = angular.module('material');
app.controller('teamsHeadToHeadController', function($scope, $q, $timeout, commons, liveScoresServices, team1CompleteInfo, team2CompleteInfo, teamId1, teamId2) {
    $scope.loading = true;
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


    $scope.getHeadToHead = function(){
        liveScoresServices.getHeadToHead(teamId1, teamId2).then(function(teamsComparison) {
            console.log(teamsComparison.data)
        })
    };

    
    
    $scope.getHeadToHead();
});