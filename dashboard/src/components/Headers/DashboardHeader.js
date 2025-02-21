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

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Navbar, Nav, 
    UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
  
  const DashboardHeader = ({sensor, setSensor}) => {
  
    return (
      <>
        <div className="header pb-8 pt-5 pt-md-8" style={{backgroundColor: "023F3a"}}>
          <Container fluid>
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
                            73%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-blue text-white rounded-circle shadow">
                            <i className="fa-solid fa-droplet" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
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
                          <span className="h2 font-weight-bold mb-0">70%</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa-solid fa-cloud-showers-water" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-danger mr-2">
                          <i className="fas fa-arrow-down" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last week</span>
                      </p>
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
                          <span className="h2 font-weight-bold mb-0">86°F</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fa-solid fa-temperature-half" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-warning mr-2">
                          <i className="fas fa-arrow-down" /> 1.10%
                        </span>{" "}
                        <span className="text-nowrap">Since yesterday</span>
                      </p>
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
                          <span className="h2 font-weight-bold mb-0">1,500 lx</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                            <i className="ni ni-bulb-61" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
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
                            3.4
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-orange text-white rounded-circle shadow">
                            <i className="ni ni-sound-wave" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
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
                            Sensor
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                          <Navbar>
                      <Nav>
                        <UncontrolledDropdown nav>
                          <DropdownToggle >
                          <span className="mb-0 text-sm font-weight-bold">
                        {sensor}
                      </span>
                          </DropdownToggle>
                          <DropdownMenu>
                            {[1,2,3].map((num) => (
                            <DropdownItem key={num} onClick={() => {setSensor(num)}} >
                            <span>{num}</span>
                          </DropdownItem>
                            ))}
                          </DropdownMenu>
                          </UncontrolledDropdown></Nav>
                    </Navbar>
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fa-regular fa-hard-drive" />
                          </div>
                        </Col>
                      </Row>
                     
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  };
  
  export default DashboardHeader;
  