(function (angular) {
    'use strict';

    angular
            .module('app', ['ngRoute', 'ngMaterial', 'ngMdIcons'])
            .config(['$mdThemingProvider', '$compileProvider', '$routeProvider', '$locationProvider', '$provide',
                function ($mdThemingProvider, $compileProvider, $routeProvider, $locationProvider, $provide) {

                    $mdThemingProvider.theme('default')
                            .primaryPalette('blue-grey')
                            .accentPalette('orange');


                    $provide.factory('$routeProvider', function () {
                        return $routeProvider;
                    });
                    $locationProvider
                            .html5Mode(false)
                            .hashPrefix('!');
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|skype):/);
                }]);

})(this.angular);




