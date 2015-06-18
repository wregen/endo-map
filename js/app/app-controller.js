(function (angular) {
    'use strict';

    angular
            .module('app')
            .controller('AppController', controller);

    controller.$inject = ['$rootScope', '$animate'];

    function controller($rootScope, $animate) {
        var vm = this;


        $animate.leave(angular.element('.site-app-loading').children());
        return vm;
    }

})(this.angular);
