import React, { useEffect, useState } from "react";
import axios from "axios";

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";
import { useAuth } from "../../contexts/AuthContext";
import DashboardHeader from "components/Headers/DashboardHeader";

const Maps = () => {
  const { currentUser } = useAuth();

  const [coordinate, setCoordinate] = useState({
    latitude: 34.2419, // Default latitude for Jacaranda Hall, CSUN if API fails
    longitude: -118.5281, // Default longitude for Jacaranda Hall, CSUN if API fails
  });

  useEffect(() => {
    // Fetch GPS coordinate from the API
    const fetchCoordinate = async () => {
      if (!currentUser) {
        console.error("User is not authenticated.");
        return;
      }

      try {
        const token = await currentUser.getIdToken(true); // Force refresh the token

        const response = await axios.get(`http://localhost:5000/api/v1/sensor/1`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        console.log("API Response:", response.data);
        const {data} = response.data;

        // Extract the most recent GPS coordinates from the "data" part of the response
        if (data && data.data && data.data.length > 0) {
          const mostRecentData = data.data[0]; // Assuming the most recent data point is the first in the array
          console.log("Most Recent Data:", mostRecentData);

          if (mostRecentData.gps_coordinates) {
            const { latitude, longitude } = mostRecentData.gps_coordinates;
            if (latitude && longitude) {
              setCoordinate({ latitude, longitude }); // Store the extracted coordinates
            } else {
              console.warn("Invalid GPS coordinates in the most recent data point. Using default coordinates.");
            }
          } else {
            console.warn("No GPS coordinates found in the most recent data point. Using default coordinates.");
          }
        } else {
          console.warn("No data found in API response. Using default coordinates.");
        }
      } catch (error) {
        console.error("Error fetching GPS coordinates:", error);
        console.warn("Using default coordinates for Jacaranda Hall, CSUN.");
      }
    };

    fetchCoordinate();

    // Dynamically load the Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        console.error("Failed to load the Google Maps API script.");
      };

      document.body.appendChild(script);
    };

    // Initialize the map after the Google Maps API has loaded
    window.initMap = () => {
      const center = { lat: coordinate.latitude, lng: coordinate.longitude };

      // Create the map
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
      });

      // Add a marker for the coordinate
      new window.google.maps.Marker({
        position: center,
        map: map,
        title: `Coordinates: (${coordinate.latitude}, ${coordinate.longitude})`, // Dynamic title based on coordinates
      });
    };

    loadGoogleMapsScript(); // Load the Google Maps API script
  }, []); // Run only once when the component mounts

  return (
    <>
      <DashboardHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0">
              <div
                id="map"
                style={{ height: "600px" }}
                className="map-canvas"
              ></div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Maps;