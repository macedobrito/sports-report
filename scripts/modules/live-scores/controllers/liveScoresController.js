/*global angular */
'use strict';

var app = angular.module('material');
app.controller('liveScoresController', function($scope, commons, liveScoresServices) {
    $scope.getLiveScores = function(){
        $scope.loading = true;
        liveScoresServices.getLiveScores().then(function(liveScores) {
            $scope.liveScores = liveScores.data;
            setTimeout(function() {
                commons.initScrollBar('.scroller-cont');
            }, 500);
            $scope.loading = false;
        })
    };

    $scope.getLiveScores();
});
