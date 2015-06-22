(function (angular) {
    'use strict';

    angular
            .module('app', ['ngRoute', 'ngMaterial'])
            .config(['$compileProvider', '$routeProvider', '$locationProvider', '$provide', function ($compileProvider, $routeProvider, $locationProvider, $provide) {
                    $provide.factory('$routeProvider', function () {
                        return $routeProvider;
                    });
                    $locationProvider
                            .html5Mode(false)
                            .hashPrefix('!');
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);
                }]);
})(this.angular);




