angular.module('material', ['ngMaterial', 'material.constants', 'ui.router', 'material.router', 'material.services']).run(function($rootScope, $controller) {
// angular.module('material', []).run(function($rootScope, $controller) {
}).config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('Yellow', {
        '50': '#ff7a00',
        '100': '#ff7a00',
        '200': '#ff7a00',
        '300': '#ff7a00',
        '400': '#ff7a00',
        '500': '#ff7a00',
        '600': '#ff7a00',
        '700': '#ff7a00',
        '800': '#ff7a00',
        '900': '#ff7a00',
        'A100': '#ff7a00',
        'A200': '#ff7a00',
        'A400': '#ff7a00',
        'A700': '#ff7a00',
        'contrastDefaultColor': '#ff7a00'
    });
    $mdThemingProvider.theme('default')
        .primaryPalette('Yellow')
        .accentPalette('Yellow');
}).run(function($state, $rootScope, $q) {
    var transitionTo = $state.transitionTo;
    $state.transitionTo = function(to, toParams, options) {
        var from = $state.$current,
            fromParams = $state.params;
        to = to.name ? to : $state.get(to);

        if (options.notify !== false && $rootScope.$broadcast('$beforeStateChange', to, toParams, from, fromParams).defaultPrevented) {
            return $q.reject(new Error('transition prevented'));
        } else {
            return transitionTo(to, toParams, options);
        }
    };
});

