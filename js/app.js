(function (angular) {
    'use strict';

    angular
            .module('app', ['ngRoute', 'ngAnimate', 'ngMap', 'angular-carousel'])
            .config(['$compileProvider', '$routeProvider', '$locationProvider', '$provide', function ($compileProvider, $routeProvider, $locationProvider, $provide) {
                    $provide.factory('$routeProvider', function () {
                        return $routeProvider;
                    });
                    $locationProvider
                            .html5Mode(false)
                            .hashPrefix('!');
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);
                }])
            .run(['$route', '$routeProvider', 'appDataService', function ($route, $routeProvider, appDataService) {

                    for (var val in appDataService.sections) {
                        $routeProvider.when('/' + val, {
                            controller: 'AppController',
                            controllerAs: 'main',
                            template: ' '
                        });

                    }
                    $routeProvider.otherwise({
                        redirectTo: '/',
                        template: ' '
                    });

                }]);
})(this.angular);
