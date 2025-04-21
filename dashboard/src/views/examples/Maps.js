/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect } from 'react';
// import axios from 'axios';

// reactstrap components
import { Card, Container, Row } from "reactstrap";

// core components
import Header from "components/Headers/Header.js";



const Maps = () => {
  // <Header />
  // const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
  //   axios 
  //   .get(`${process.env.REACT_APP_MAPS_API_KEY}/coordinates`)
  //   .then((response) => {
  //     setCoordinates(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching coordinates:", error);
  //   });
  // }, []);

//   useEffect(() => {
//     if (coordinates.length > 0) {
//       //Create the map 
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         zoom: 8,
//         center: coordinates[0],
//       });

//       coordinates.forEach((coordinate) => {
//         new window.google.maps.Marker({
//           position: coordinate,
//           map: map,
//           title: coordinate.name,
//         });
//       });
//     }
//   }, [coordinates]);

//   return <div id="map" style={{ height: "600px", width: "100%"}}/>;
// };

    // Dynamically load the Google Maps API script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    };

    // Initialize the map after the Google Maps API has loaded
    window.initMap = () => {
      const center = { lat: 5.06690, lng: -75.52272 }; // Manizales, Caldas, Colombia

      // Create the map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: center,
      });

      // Create a marker
      new window.google.maps.Marker({
        position: center,
        map: map,
        title: "Hello World!",
      });
    };

    loadGoogleMapsScript(); // Load the Google Maps API script
  }, []);
}

const MapWrapper = () => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    const lat = 5.0630;
    const lng = -75.5028;
    const myLatlng = new google.maps.LatLng(lat, lng);

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

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Manizales, Caldas, Colombia",
    });

    const contentString =
      '<div class="info-window-content"><h2>Manizales, Caldas, Colombia</h2>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      try {
        infowindow.open(map, marker);
      } catch (error) {
        const errorResponse = {
          status: 401,
          error: `Unauthorized: ${error.message}`,
        };
        console.error(`Error ${errorResponse.status}: ${errorResponse.error}`);
        alert(`Error ${errorResponse.status}: ${errorResponse.error}`);
      }
    });
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
      {/* Page content */}
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
// export default Maps;
