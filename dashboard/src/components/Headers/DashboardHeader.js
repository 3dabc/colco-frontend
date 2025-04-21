import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const DashboardHeader = ({ sensor, setSensor }) => {
  const [measurements, setMeasurements] = useState({
    soilMoisture: "N/A",
    relativeHumidity: "N/A",
    temperature: "N/A",
    lightIntensity: "N/A",
    soilPH: "N/A",
  });

  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMeasurements = async () => {
      if (!currentUser) {
        console.error("User is not authenticated.");
        return;
      }
  
      try {
        // Get the Firebase Auth token
        const token = await currentUser.getIdToken();
  
        // Fetch sensor data from the backend
        const response = await axios.get(`http://localhost:5000/api/v1/sensor/${sensor || 1}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        console.log("Backend response:", response.data); // Log the response to verify the structure

  
        // Update measurements state with the fetched data
        // const {
        //   soil_moisture: soilMoisture,
        //   relative_humidity: relativeHumidity,
        //   temperature,
        //   light_intensity: lightIntensity,
        //   soil_ph: soilPH,
        // } = response.data[1];

        const { avg } = response.data;
        
        setMeasurements({
          soilMoisture: avg.soilMoisture ? `${avg.soilMoisture} %` : "N/A",
          relativeHumidity: avg.relativeHumidity ? `${avg.relativeHumidity} %` : "N/A",
          temperature: avg.temperature ? `${avg.temperature} °C` : "N/A",
          lightIntensity: avg.lightIntensity ? `${avg.lightIntensity} lx` : "N/A",
          soilPH: avg.soilPH ? `${avg.soilPH}` : "N/A",
        });
      } catch (error) {
        console.error("Error fetching measurements:", error);
      }
    };
  
    fetchMeasurements();
  }, [sensor, currentUser]);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-md-8"
        style={{ backgroundColor: "023F3a" }}
      >
        <Container fluid>
          <Row className="align-items-center">
            <Col lg="3">
              <div className="d-flex align-items-center" style={{ padding: "10px" }}>
                <UncontrolledDropdown>
                  <DropdownToggle color="white">
                    <span className="dropdown-menu-arrow" right>
                      <i className="fa-solid fa-chevron-down"></i>
                      <span className="text-dark">Sensors</span>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdowntime">
                    {[1, 2, 3].map((num) => (
                      <DropdownItem key={num} onClick={() => setSensor(num)}>
                        <span>{num}</span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Col>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase font-weight-bold mb-0"
                          >
                            Soil Moisture
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {measurements.soilMoisture}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="fa-solid fa-droplet" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase font-weight-bold mb-0"
                          >
                            Relative Humidity
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {measurements.relativeHumidity}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa-solid fa-cloud-showers-water" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase font-weight-bold mb-0"
                          >
                            Temperature
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {measurements.temperature}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fa-solid fa-temperature-half" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase font-weight-bold mb-0"
                          >
                            Light Intensity
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {measurements.lightIntensity}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="ni ni-bulb-61" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase font-weight-bold mb-0"
                          >
                            Soil pH
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {measurements.soilPH}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-orange text-white rounded-circle shadow">
                            <i className="ni ni-sound-wave" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DashboardHeader;