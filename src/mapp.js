import React, { useEffect } from "react";
import Polyline from "google-polyline";

const Mapp = () => {
  const [map, setMap] = React.useState(null);
  const [service, setService] = React.useState(null);
  const [waypoints, setWaypoints] = React.useState([]);

  useEffect(() => {
    const initMap = () => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();

      const mapOptions = {
        zoom: 7,
        center: { lat: 19.07596, lng: 72.87764 },
      };

      setMap(new window.google.maps.Map(document.getElementById("map"), mapOptions));

      const request = {
        origin: "mumbai",
        destination: "pune",
        travelMode: "DRIVING",
      };

      directionsService.route(request, function (result, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          setWaypoints(Polyline.decode(result.routes[0].overview_polyline));
        }

        const PolygonCoords = PolygonPoints();
        const PolygonBound = new window.google.maps.Polygon({
          paths: PolygonCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });

        PolygonBound.setMap(map);
        setService(new window.google.maps.places.PlacesService(map));
        for (let j = 0; j < waypoints.length; j += 40) {
          service.nearbySearch(
            {
              location: { lat: waypoints[j][0], lng: waypoints[j][1] },
              radius: "20000",
              type: ["restaurant"],
            },
            callback
          );

          function callback(results, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                if (
                  window.google.maps.geometry.poly.containsLocation(
                    results[i].geometry.location,
                    PolygonBound
                  ) === true
                ) {
                  new window.google.maps.Marker({
                    position: results[i].geometry.location,
                    map: map,
                    title: "Hello World!",
                  });
                }
              }
            }
          }
        }
      });
      directionsRenderer.setMap(map);
    };
})}

export default Mapp
/*
    const PolygonPoints = () => {
      const polypoints = waypoints;
      const PolyLength = polypoints.length;

      const UpperBound = [];
      const LowerBound = [];

      for (let j = 0; j <= PolyLength - 1; j++) {
        const NewPoints = PolygonArray(polypoints[j][
*/