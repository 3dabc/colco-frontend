//map with dynamic location and sensor data
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row } from "reactstrap";
import UserHeader from "components/Headers/UserHeader";

const MapWrapper = () => {
  const mapRef = React.useRef(null);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    // Fetch sensor data from the backend
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/sensors`);
        setSensorData(response.data); // Assuming the API returns an array of sensor objects
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();

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
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 5.0669, lng: -75.52272 }, // Default center (Manizales, Caldas, Colombia)
      });

      // Add markers for each sensor
      sensorData.forEach((sensor) => {
        const {
          gps_coordinates: { latitude, longitude },
          soil_moisture,
          soil_ph,
          temperature,
          light_intensity,
        } = sensor;

        const marker = new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          animation: window.google.maps.Animation.DROP,
          title: `Sensor at (${latitude}, ${longitude})`,
        });

        const contentString = `
          <div class="info-window-content">
            <h2>Sensor Data</h2>
            <p><strong>Soil Moisture:</strong> ${soil_moisture}%</p>
            <p><strong>Soil pH:</strong> ${soil_ph}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Light Intensity:</strong> ${light_intensity} lux</p>
          </div>
        `;

        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("mouseover", () => {
          infowindow.open(map, marker);
        });

        marker.addListener("mouseout", () => {
          infowindow.close();
        });
      });
    };

    loadGoogleMapsScript();
  }, [sensorData]);

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



// STATIC MAP WITH HARDCODED SENSOR POPUP INFO 
// import React, { useEffect, useRef } from "react";
// import { Card, Container, Row } from "reactstrap";
// import Header from "components/Headers/Header.js";

// const MapWrapper = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const loadGoogleMapsScript = () => {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&callback=initMap`;
//       script.async = true;
//       script.defer = true;
//       document.body.appendChild(script);
//     };

//     // Initialize the map after the Google Maps API has loaded
//     window.initMap = () => {
//       const map = new window.google.maps.Map(mapRef.current, {
//         zoom: 13,
//         center: { lat: 5.0669, lng: -75.52272 }, // Default center (Manizales, Caldas, Colombia)
//       });

//       // Add a static marker with hardcoded data
//       const marker = new window.google.maps.Marker({
//         position: { lat: 5.0669, lng: -75.52272 }, // Static position
//         map: map,
//         animation: window.google.maps.Animation.DROP,
//         title: "Static Sensor Location",
//       });

//       // Hardcoded info window content
//       const contentString = `
//         <div class="info-window-content">
//           <h2>Static Sensor Data</h2>
//           <p><strong>Soil Moisture:</strong> 45%</p>
//           <p><strong>Soil pH:</strong> 6.8</p>
//           <p><strong>Temperature:</strong> 25°C</p>
//           <p><strong>Light Intensity:</strong> 300 lux</p>
//         </div>
//       `;

//       const infowindow = new window.google.maps.InfoWindow({
//         content: contentString,
//       });

//       // Show the info window on marker hover
//       marker.addListener("mouseover", () => {
//         infowindow.open(map, marker);
//       });

//       // Hide the info window when the mouse leaves the marker
//       marker.addListener("mouseout", () => {
//         infowindow.close();
//       });
//     };

//     loadGoogleMapsScript();
//   }, []);

//   return (
//     <div
//       style={{ height: `600px` }}
//       className="map-canvas"
//       id="map-canvas"
//       ref={mapRef}
//     ></div>
//   );
// };

// const Maps2 = () => {
//   return (
//     <>
//       <Header />
//       <Container className="mt--7" fluid>
//         <Row>
//           <div className="col">
//             <Card className="shadow border-0">
//               <MapWrapper />
//             </Card>
//           </div>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Maps2;