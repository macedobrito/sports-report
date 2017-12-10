/*global angular */
'use strict';

angular.module('material.router', ['material']).config(function($stateProvider, $urlRouterProvider, states, $locationProvider, backend) {
    if (!backend.enableHashtag) {
        $locationProvider.html5Mode(true);
    }
    $urlRouterProvider.when('', ['$state', function($state) {
        $state.go(states.LANDING_PAGE);
    }]);
    $urlRouterProvider.when('/', ['$state', function($state) {
        $state.go(states.LANDING_PAGE);
    }]);

    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path(),
            search = $location.search();

        if (path[path.length - 1] === '/') {
            if ($.isEmptyObject(search)) {
                return path.slice(0, -1);
            } else {
                var params = [];
                angular.forEach(search, function(v, k) {
                    params.push(k + '=' + v);
                });
                return path.slice(0, -1) + '?' + params.join('&');
            }
        }
    });

    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state(states.ERROR, {
            url: 'error',
            templateUrl: 'scripts/modules/core/views/error.html'
        })
        .state(states.HOME, {
            url: '/',
            controller: 'homeController',
            controllerAs: 'homeCtrl',
            templateUrl: 'scripts/modules/home/views/home.html'
        })
        .state(states.LANDING_PAGE, {
            url: 'home',
            controller: 'landingPageController',
            controllerAs: 'landingPageCtrl',
            templateUrl: 'scripts/modules/landing-page/views/landingPage.html'
        })
        .state(states.LIVE_SCORES, {
            url: 'liveScores',
            controller: 'liveScoresController',
            controllerAs: 'liveScoresCtrl',
            templateUrl: 'scripts/modules/live-scores/views/liveScores.html'
        })
        .state(states.PLAYER_INFO, {
            url: 'playerInfo/:playerId',
            controller: 'playerInfoController',
            controllerAs: 'playerInfoCtrl',
            templateUrl: 'scripts/modules/player-info/views/playerInfo.html'
        })
});
