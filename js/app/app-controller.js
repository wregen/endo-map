(function (angular) {
    'use strict';

    angular
            .module('app')
            .controller('AppController', controller);

    controller.$inject = ['$scope'];

    function controller($scope) {
        var vm = this;
        initMap();
        return vm;
    }


    function initMap() {
        var mapOptions = {
            zoom: 14
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        drawOnMap(map);

        // Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);

                var current = new google.maps.Marker({
                    map: map,
                    position: pos
                });

                map.setCenter(pos);
            }, function () {
                handleNoGeolocation(true, map);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false, map);
        }
    }

    function handleNoGeolocation(errorFlag, map) {
        if (errorFlag) {
            console.log('Error: The Geolocation service failed.');
        } else {
            console.log('Error: Your browser doesn\'t support geolocation.');
        }

        var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
        };
        map.setCenter(options.position);
    }

    function drawOnMap(map) {
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.POLYLINE,
                    google.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });
        drawingManager.setMap(map);
    }
})(this.angular);
