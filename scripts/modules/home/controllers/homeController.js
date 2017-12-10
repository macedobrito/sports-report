/*global angular */
'use strict';

var app = angular.module('material');
app.controller('homeController', function($scope, $timeout, $state, $http, $transitions, $rootScope) {
    $rootScope.isDesktopMode = isDesktopMode;

    $scope.fadeElementsOut = function(toState, toParams) {
        var allElements = $('.dynamic-element').toArray();
        allElements.reverse();
        TweenMax.staggerTo(allElements, 0.4, {
            ease: Power4.easeInOut,
            x: -140
        }, 0.02);

        TweenMax.staggerTo(allElements, 0.2, {
            ease: Power0.easeInOut,
            opacity: 0
        }, 0.02);
        setTimeout(function() {
            $scope.canNavigate = true;
            if (toState) {
                if (toParams) {
                    toParams = (toParams.playerId) ? toParams : $state.params;
                }
                $state.go(toState.name, toParams);
            }
        }, 300);
    };

    $scope.fadeElementsIn = function() {
        $timeout(function() {
            var allElements = $('.dynamic-element');
            TweenMax.staggerFrom(allElements, 0.4, {
                ease: Power4.easeInOut,
                x: -140
            }, 0.04);

            TweenMax.staggerFromTo(allElements, 0.2, {
                ease: Power0.easeInOut,
                opacity: 0
            }, {
                ease: Power0.easeInOut,
                opacity: 1
            }, 0.04);
        })
    };

    $scope.navigate = function(state, parameters) {
        $scope.fadeElementsOut();
        var stateToGo = state;
        if (state.constructor === Array) {
            stateToGo = state[state.length - 1];
        }
        $state.go(stateToGo, $scope.paramsToBeUsed);
    };

    $transitions.onSuccess({}, function(transition) {
        $scope.canNavigate = false;
        $scope.initScreen();
    });

    $scope.$on('$beforeStateChange', function(event, toState, toParams, fromState) {
        if (!$scope.canNavigate) {
            if (toState.name !== fromState.name) {
                event.preventDefault();
                $scope.fadeElementsOut(toState, toParams);
            }
        }
    });

    
    $scope.initScreen = function() {
        $scope.$$postDigest(function() { //wait to all DOM elements is rendered after digest
            var waitForTemplateCache = function() {
                if ($http.pendingRequests.length > 0) {
                    $timeout(waitForTemplateCache); // Wait for all templates to be loaded
                } else {
                    $timeout(function() {
                        $scope.fadeElementsIn();
                    });
                }
            };
            $timeout(waitForTemplateCache);
        });
    };

    $scope.initScreen();
});
