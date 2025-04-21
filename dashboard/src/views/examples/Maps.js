import React, { useEffect, useRef } from 'react';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";

const MapWrapper = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchGeoData = async () => {
      try {
        // Simulated geo_data and response
        const geoData = {
          lat: 5.0630,
          lng: -75.5028,
          title: "Manizales, Caldas, Colombia",
        };

        const responseStatus = 200; // Simulate HTTP 200 response
        if (responseStatus === 200) {
          const google = window.google;
          const myLatlng = new google.maps.LatLng(geoData.lat, geoData.lng);

          const mapOptions = {
            zoom: 14,
            center: myLatlng,
            scrollwheel: false,
            zoomControl: true,
            styles: [
              {
                featureType: "administrative",
                elementType: "labels.text.fill",
                stylers: [{ color: "#444444" }],
              },
              {
                featureType: "landscape",
                elementType: "all",
                stylers: [{ color: "#f2f2f2" }],
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "road",
                elementType: "all",
                stylers: [{ saturation: -100 }, { lightness: 45 }],
              },
              {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{ visibility: "simplified" }],
              },
              {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "water",
                elementType: "all",
                stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
              },
            ],
          };

          const map = new google.maps.Map(mapRef.current, mapOptions);

          const marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: geoData.title,
          });

          const contentString = `<div class="info-window-content"><h2>${geoData.title}</h2>`;

          const infowindow = new google.maps.InfoWindow({
            content: contentString,
          });

          google.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
        } else {
          throw new Error("Failed to fetch geo data.");
        }
      } catch (error) {
        // Simulate HTTP 401 response with error
        const errorResponse = {
          status: 401,
          error: `Unauthorized: ${error.message}`,
        };
        console.error(`Error ${errorResponse.status}: ${errorResponse.error}`);
        alert(`Error ${errorResponse.status}: ${errorResponse.error}`);
      }
    };

    fetchGeoData();
  }, []);

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
      <Header />
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
