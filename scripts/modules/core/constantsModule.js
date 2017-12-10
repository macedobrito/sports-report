/*global angular */
'use strict';

var app = angular.module('material.constants', ['material']);

app.constant('backend', {
    url: appConfig.url,
    api: appConfig.api,
    version: appConfig.version,
    enableHashtag: appConfig.enableHashtag,
    clientId: appConfig.clientId
});

app.constant('serviceModules', {
    SEASONS: 'seasons',
    LEAGUES: 'leagues',
    TEAMS: 'teams',
    LIVE_SCORES: 'livescores',
    HEAD_TO_HEAD: 'head2head'
});

app.constant('states', {
    HOME: 'home',
    build: function() {
        this.assemble = function(parent, state) {
            return parent + '.' + state;
        };
        this.LANDING_PAGE = this.assemble(this.HOME, 'landingPage');
        this.LIVE_SCORES = this.assemble(this.HOME, 'liveScores');
        this.PLAYER_INFO = this.assemble(this.HOME, 'playerInfo');
        this.ERROR = this.assemble(this.HOME, 'error');
        return this;
    }
}.build());


app.constant('serviceCollections', {
    api: 'api_token',
    TEAMS: 'teams',
    SEASON: 'season',
    STANDINGS: 'standings',
    INCLUDE: 'include',
    SQUAD: 'squad',
    PLAYERS: 'players',
    LIVE_SCORES: 'livescores',
    TEAM: 'team',
    TRANSFERS : 'transfers',
    TOP_SCORERS: 'topscorers',
    STATS: 'stats',
    GOAL_SCORERS_PLAYER: 'goalscorers.player'
});

app.service('pathBuilder', function() {
    this.build = function(rootFolder, file, folders) {
        var folderCollection = '';
        angular.forEach(folders, function(folder, i) {
            folderCollection += '/' + folder;
            if (file && i === folders.length - 1) {
                folderCollection += '/';
            }
        });
        if (!folderCollection) {
            file = '/' + file;
        }
        return rootFolder + folderCollection + file;
    };
});

app.service('commons', function() {
    this.initScrollBar = function(selector) {
        var Scrollbar = window.Scrollbar,
            options = {
                speed: 1,
                damping: 0.1,
                overscrollDamping: 0.09,
                thumbMinSize: 20,
                renderByPixels: true,
                alwaysShowTracks: false,
                continuousScrolling: 'auto',
                overscrollEffect: navigator.userAgent.match(/Android/) ? 'glow' : 'bounce',
                overscrollEffectColor: '#87ceeb',
            };

        Scrollbar.init(document.querySelector(selector), options);
    };
});


app.service('baseUrl', function(backend) {
    this.concatQuery = function(queryParams) {
        var concatenator = '?',
            queryString = '';
        angular.forEach(queryParams, function(queryP, i) {
            if (i > 0 && queryParams[0].value != null) {
                concatenator = '&';
            }
            if (queryP.value || queryP.value === 0) {
                queryString += concatenator + queryP.queryParam + '=' + queryP.value;
            }
        });
        return queryString;
    };

    this.buildUrl = function(collections, queryParams) {
        var collectionsString = '';
        angular.forEach(collections, function(col, i) {
            if (i > 0) {
                collectionsString += '/';
            }

            collectionsString += col.collection;

            if (col.value) {
                collectionsString += '/' + col.value;
            }
        });

        collectionsString += this.concatQuery(queryParams);
        return collectionsString;
    };

    this.getUrl = function(module, collections, queryParams) {
        var collectionsString = this.buildUrl(collections, queryParams);
        return backend.api + backend.version + ((module) ? module + '/': '' )+ collectionsString;
    };
});

app.service('pathBuilder', function() {
    this.build = function(rootFolder, file, folders) {
        var folderCollection = '';
        angular.forEach(folders, function(folder, i) {
            folderCollection += '/' + folder;
            if (file && i == folders.length - 1) {
                folderCollection += '/';
            }
        });
        if (!folderCollection) {
            file = '/' + file;
        }
        return rootFolder + folderCollection + file;
    };
});

app.constant('folders', {
    IMAGES_ROOT: './images',
    SCRIPTS: './scripts',
    VIEWS: 'views',
    CONTROLLERS: 'controllers',
    build: function() {
        this.assemble = function(parent, state) {
            return parent + '/' + state;
        };
        // templateUrl: 'scripts/modules/core/views/switch-storehouse/switchStorehouse.html',
        this.MODULE_ICONS = this.assemble(this.IMAGES_ROOT, 'module-icons');
        this.MODULES = this.assemble(this.SCRIPTS, 'modules');
        this.TEAM_INFOS_MODAL = this.assemble(this.MODULES, 'team-infos-modal');
        this.PLAYER_INFO = this.assemble(this.MODULES, 'player-infos-modal');
        this.TEAMS_HEAD_TO_HEAD = this.assemble(this.MODULES, 'teams-head-to-head');
        this.SEASON_BEST_SCORER = this.assemble(this.MODULES, 'season-best-scorer');
        return this;
    }
}.build());

app.constant('icons', {
    HOME: 'home.svg',
    LIVE: 'liveResults.svg',
    USER: 'user.svg'
});