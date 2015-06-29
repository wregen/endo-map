(function (angular) {
    'use strict';

    angular
            .module('app')
            .controller('AppController', controller);

    controller.$inject = ['$scope'];

    var map;
    var drawingManager;
    var placeIdArray = [];
    var polylines = [];
    var snappedCoordinates = [];
    var apiKey = 'AIzaSyD4wrwLnbGC1JB31fyb0g3PksX_ttZU4FY';

    function controller($scope) {
        var vm = this,
                zoom = 17;
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
        vm.clearAllPolylines = clearAllPolylines;
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

    function clearAllPolylines() {
        for (var i = 0; i < polylines.length; ++i) {
            polylines[i].setMap(null);
        }
        polylines = [];
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
        drawingManager = new google.maps.drawing.DrawingManager({
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

        drawingManager.addListener('polylinecomplete', function (poly) {
            var path = poly.getPath();
            polylines.push(poly);
            placeIdArray = [];
//            console.log(polylines);
            runSnapToRoad(path);
            poly.setMap(null);
        });
    }

    function runSnapToRoad(path) {
        var pathValues = [];
        for (var i = 0; i < path.getLength(); i++) {
            pathValues.push(path.getAt(i).toUrlValue());
        }

        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: false,
            key: apiKey,
            path: pathValues.join('|')
        }, function (data) {
            console.log(data);
            processSnapToRoadResponse(data);
            drawSnappedPolyline();
//            getAndDrawSpeedLimits();
        });
    }
// Store snapped polyline returned by the snap-to-road method.
    function processSnapToRoadResponse(data) {
        snappedCoordinates = [];
        placeIdArray = [];
        for (var i = 0; i < data.snappedPoints.length; i++) {
            var latlng = new google.maps.LatLng(
                    data.snappedPoints[i].location.latitude,
                    data.snappedPoints[i].location.longitude);
            snappedCoordinates.push(latlng);
            placeIdArray.push(data.snappedPoints[i].placeId);
        }
        console.log(placeIdArray);
    }

// Draws the snapped polyline (after processing snap-to-road response).
    function drawSnappedPolyline() {
        var snappedPolyline = new google.maps.Polyline({
            path: snappedCoordinates,
            strokeColor: 'red',
            strokeWeight: 3
        });

        snappedPolyline.setMap(map);
        polylines.push(snappedPolyline);
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

    function CenterControl(controlDiv, map) {

        // Set CSS for the control border
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to
        // Chicago
        google.maps.event.addDomListener(controlUI, 'click', function () {
            map.setCenter(chicago)
        });

    }
})(this.angular);