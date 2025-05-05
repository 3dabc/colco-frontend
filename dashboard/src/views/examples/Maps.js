import React, { useEffect, useRef } from "react";
import { Card, Container, Row } from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import { useAuth } from "../../contexts/AuthContext";

const MapWrapper = () => {
  const mapRef = useRef(null);
  const { sensorData, gpsCoordinates } = useAuth(); // Access sensorData and gpsCoordinates from AuthContext

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    // Initialize the map after the Google Maps API has loaded
    window.initMap = () => {
      // Use GPS coordinates from AuthContext
      const { latitude: lat, longitude: lng } = gpsCoordinates;

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat, lng }, // Use coordinates from AuthContext
      });

      // Add a marker at the dynamic location
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: "Node Location",
      });

      // Dynamic info window content using sensorData.avg
      const contentString = `
        <div class="info-window-content">
          <h2>Node Data</h2>
          <p><strong> Soil Moisture:</strong> ${sensorData.avg.soilMoisture}</p>
          <p><strong>Temperature:</strong> ${sensorData.avg.temperature}</p>
          <p><strong>Light Intensity:</strong> ${sensorData.avg.lightIntensity}</p>
          <p><strong>Soil pH:</strong> ${sensorData.avg.soilPH}</p>
        </div>
      `;

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      // Show the info window on marker hover
      marker.addListener("mouseover", () => {
        infowindow.open(map, marker);
      });

      // Hide the info window when the mouse leaves the marker
      marker.addListener("mouseout", () => {
        infowindow.close();
      });
    };

    loadGoogleMapsScript(); // Load Google Maps script
  }, [sensorData, gpsCoordinates]); // Re-run when sensorData or gpsCoordinates changes

  return (
    <div
      style={{ height: `600px` }}
      className="map-canvas"
      id="map-canvas"
      ref={mapRef}
    ></div>
  );
};

const Maps2 = () => {
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <MapWrapper />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps2;