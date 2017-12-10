/*global angular */
'use strict';

var app = angular.module('material');
app.controller('menuController', function($scope, states, folders, pathBuilder, icons, $state) {
    $scope.menu = [
        {
            id: 'home',
            name: 'Home',
            state: states.LANDING_PAGE,
            icon: pathBuilder.build(folders.MODULE_ICONS, icons.HOME)
        },
        {
            id: 'liveScores',
            name: 'Live Scores',
            state: states.LIVE_SCORES,
            icon: pathBuilder.build(folders.MODULE_ICONS, icons.LIVE)
        }
    ];
    
    $scope.navigate = function(module){
        $state.go(module.state)
    }
});
