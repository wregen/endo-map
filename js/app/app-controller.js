(function (angular) {
    'use strict';

    angular
            .module('app')
            .controller('AppController', controller);

    controller.$inject = ['$window','$animate'];

    function controller($rootScope, $animate) {
        var vm = this;
        $rootScope.$on("$includeContentLoaded", function () {
            $animate.leave(angular.element('.site-app-loading').children());
        });
        return vm;

    }

})(this.angular);
