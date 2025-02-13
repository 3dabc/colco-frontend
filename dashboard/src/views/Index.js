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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartTemp,
  chartHumidity,
  chartPH,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  //const [activeNav, setActiveNav] = useState(1);
  const [chartTempData, setChartTempData] = useState(chartTemp.data1);

  const[chartHumidityData, setChartHumidityData] = useState(chartHumidity.data1)

  const[chartPhData, setChartPhData] = useState(chartPH.data1)

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleTemp = (e, index) => {
    e.preventDefault();
    setChartTempData(chartTemp["data" + index]);
  };

  const toggleHumidity = (e, index) => {
    e.preventDefault();
    setChartHumidityData(chartHumidity["data" + index]);
  };

  const togglePh = (e, index) => {
    e.preventDefault();
    setChartPhData(chartPH["data" + index]);
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
        <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Average Humidity</h2>
                  </div>
                  <Navbar>
                    <Nav>
                      <UncontrolledDropdown nav>
                        <DropdownToggle >
                        <span className="mb-0 text-sm font-weight-bold">
                      Sensors
                    </span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={(e) => toggleHumidity(e, 1)}>
                            <span onClick={(e) => toggleHumidity(e, 1)}>1</span>
                          </DropdownItem>
                          <DropdownItem  onClick={(e) => toggleHumidity(e, 2)}>
                            <span onClick={(e) => toggleHumidity(e, 2)}>2</span>
                          </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown></Nav>
                  </Navbar>

                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div 
                style={{position: "relative",
                        height: "200px"}}>
                  <Bar
                    data={chartHumidityData}
                    options={chartHumidity.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-white shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-black mb-0">Daily Temperature</h2>
                  </div>
                  <Navbar>
                    <Nav>
                      <UncontrolledDropdown nav>
                        <DropdownToggle >
                        <span className="mb-0 text-sm font-weight-bold">
                      Sensors
                    </span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem  onClick={(e) => toggleTemp(e, 1)}>
                            <span>1</span>
                          </DropdownItem>
                          <DropdownItem  onClick={(e) => toggleTemp(e, 2)}>
                            <span>2</span>
                          </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown></Nav>
                  </Navbar>
                </Row>
              </CardHeader>
              <CardBody>
                <div 
                style={{position: "relative",
                        height: "200px",
                        }
                        }>
                  <Line 
                    data={chartTempData}
                    options={chartTemp.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Target vs Reality (pH)</h2>
                  </div>
                  <Navbar>
                    <Nav>
                      <UncontrolledDropdown nav>
                        <DropdownToggle >
                        <span className="mb-0 text-sm font-weight-bold">
                      Sensors
                    </span>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={(e) => togglePh(e, 1)}>
                            <span>1</span>
                          </DropdownItem>
                          <DropdownItem onClick={(e) => togglePh(e, 2)}>
                            <span>2</span>
                          </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown></Nav>
                  </Navbar>

                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div style={{position: "relative",
                        height: "200px"}}>
                  <Bar
                    data={chartPhData}
                    options={chartPH.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Numer of Sensors: 2</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="hardware"
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/* <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Page name</th>
                    <th scope="col">Visitors</th>
                    <th scope="col">Unique users</th>
                    <th scope="col">Bounce rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">/argon/</th>
                    <td>4,569</td>
                    <td>340</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/index.html</th>
                    <td>3,985</td>
                    <td>319</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/charts.html</th>
                    <td>3,513</td>
                    <td>294</td>
                    <td>
                      <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                      36,49%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/tables.html</th>
                    <td>2,050</td>
                    <td>147</td>
                    <td>
                      <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">/argon/profile.html</th>
                    <td>1,795</td>
                    <td>190</td>
                    <td>
                      <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                      46,53%
                    </td>
                  </tr>
                </tbody>
              </Table> */}
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Maps</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="maps"
                      size="sm"
                    >
                      See locations
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/* <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
