import React from "react";
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
import { useAuth } from "../../contexts/AuthContext";

const DashboardHeader = ({ sensor, setSensor }) => {
  const { sensorData } = useAuth(); // Access sensorData from AuthContext

  const measurements = sensorData
  ? {
      soilMoisture: sensorData.avg?.soilMoisture || "N/A",
      temperature: sensorData.avg?.temperature || "N/A",
      lightIntensity: sensorData.avg?.lightIntensity || "N/A",
      soilPH: sensorData.avg?.soilPH || "N/A",
    }
  : {
      soilMoisture: "N/A",
      temperature: "N/A",
      lightIntensity: "N/A",
      soilPH: "N/A",
    };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-md-8"
        style={{ backgroundColor: "023F3a" }}
      >
        <Container fluid>
          <Row className="align-items-center">
            <Col lg="3">
              <div className="d-flex align-items-center" style={{ padding: "15px" }}>
                <UncontrolledDropdown>
                  <DropdownToggle color="white">
                    <span className="dropdown-menu-arrow" right>
                      <i className="fa-solid fa-chevron-down"></i>
                      <span className="text-dark">Nodes</span>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdowntime">
                    {[1].map((num) => (
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