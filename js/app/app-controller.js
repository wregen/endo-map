(function (angular) {
    'use strict';

    angular
            .module('app')
            .controller('AppController', controller);

    controller.$inject = ['$scope'];

    function controller($scope) {
        var vm = this,
                zoom = 14,
                map = new google.maps.Map(document.getElementById('map'), {zoom: zoom});

        showMyLocation(map);
        drawOnMap(map);
        vm.showMyLocation = function () {
            showMyLocation(map);
            setDefaultZoom(map, zoom);
        };
        vm.setDefaultZoom = function () {
            setDefaultZoom(map, zoom);
        };
        return vm;
    }

    function setDefaultZoom(map, zoom) {
        map.setZoom(zoom);
    }

    function showMyLocation(map) {
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
            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
//                    google.maps.drawing.OverlayType.MARKER,
                    google.maps.drawing.OverlayType.POLYLINE
                ]
            },
            polylineOptions: {
                strokeColor: '#01579B',
                strokeWeight: 5,
                editable: true
            }
        });
        drawingManager.setMap(map);

    }

    function addLatLng(event) {
        
        var path = poly.getPath();
        // Because path is an MVCArray, we can simply append a new coordinate
        // and it will automatically appear
        path.push(event.latLng);

        // Update the text field to display the polyline encodings
        var encodeString = google.maps.geometry.encoding.encodePath(path);
        if (encodeString) {
            console.log(encodeString);
        }
    }
})(this.angular);