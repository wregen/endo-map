(function (angular) {
    'use strict';

    angular
            .module('app')
            .directive('siteMap', directive);

    directive.$inject = ['$rootScope'];

    function directive($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                mapData: '@'
            },
            link: function (scope, element, attrs) {

                scope = angular.extend(scope, angular.fromJson(attrs.mapData));
                scope.center = scope.origin.center;
                scope.zoom = scope.origin.zoom;
                scope.directionVisible = false;
                scope.toggleDirection = function () {
                    if (!scope.directionVisible) {
                        setDirection();
                    } else {
                        resetDirection();
                    }
                    scope.directionVisible = !scope.directionVisible;
                    setBtn();
                };

                var directionsService = new google.maps.DirectionsService(),
                        directionsDisplay = new google.maps.DirectionsRenderer(),
                        origin = new google.maps.LatLng(scope.origin.center[0], scope.origin.center[1]),
                        destination = new google.maps.LatLng(scope.destination.center[0], scope.destination.center[1]),
                        originInfowindow = new google.maps.InfoWindow({
                            position: origin,
                            content: scope.origin.hint
                        }),
                        destinationInfowindow = new google.maps.InfoWindow({
                            position: destination,
                            content: scope.destination.hint
                        }),
                        center = origin;

                setBtn();
                originInfowindow.open(scope.map);

                function setDirection() {
                    originInfowindow.open(scope.map);
                    destinationInfowindow.open(scope.map);

                    directionsDisplay.setMap(scope.map);

                    var request = {
                        origin: origin,
                        destination: destination,
                        travelMode: google.maps.TravelMode.DRIVING
                    };

                    directionsService.route(request, function (response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });

                }
                function resetDirection() {
                    originInfowindow.open(scope.map);
                    destinationInfowindow.close();
                    directionsDisplay.setMap(null);
                    directionsDisplay.setPanel(null);
                    directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(scope.map);
                    scope.map.setCenter(center);
                    scope.map.setZoom(scope.zoom);
                }
                function setBtn() {
                    if (scope.directionVisible === false) {
                        scope.btnCls = "mdi-maps-navigation";
                        scope.btnMsg = scope.origin.msg;
                    } else {
                        scope.btnCls = "mdi-action-home";
                        scope.btnMsg = scope.destination.msg;
                    }
                }
            },
            templateUrl: 'js/map.html'
        };
    }

})(this.angular);
