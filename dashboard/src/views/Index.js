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
// import React, { useEffect, useState } from "react";
// import axios from "axios";


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
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  temperatureData,
  humidityData,
  phData,
} from "variables/charts.js";
// import { chartOptions, generateChartData } from "variables/charts.js";

import Header from "components/Headers/DashboardHeader.js";

// const Index = () => {
  // const [sensor, setSensor] = useState(1);
  // const [humidityData, setHumidityData] = useState(null);
  // const [temperatureData, setTemperatureData] = useState(null);
  // const [phData, setPhData] = useState(null);

  // useEffect(() => {
  //   // Fetch data for humidity
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/dashboard/humidity`)
  //     .then((response) => {
  //       const { labels, data } = response.data;
  //       setHumidityData(
  //         generateChartData(labels, data, "Humidity", "rgba(75,192,192,0.4)", "rgba(75,192,192,1)")
  //       );
  //     })
  //     .catch((error) => console.error("Error fetching humidity data:", error));

  //   // Fetch data for temperature
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/dashboard/temperature`)
  //     .then((response) => {
  //       const { labels, data } = response.data;
  //       setTemperatureData(
//     generateChartData(labels, data, "Temperature", "rgba(255,99,132,0.4)", "rgba(255,99,132,1)")
//   );
// })
// .catch((error) => console.error("Error fetching temperature data:", error));

    // // Fetch data for pH
    // axios
    // .get(`${process.env.REACT_APP_API_URL}/dashboard/ph`)
    // .then((response) => {
    //   const { labels, data } = response.data;
    //   setPhData(
    //     generateChartData(labels, data, "pH", "rgba(54,162,235,0.4)", "rgba(54,162,235,1)")
    //   );
    // })
    // .catch((error) => console.error("Error fetching pH data:", error));
    // }, []);

// return (
// <>
// <Header sensor={sensor} setSensor={setSensor} />
// <Container className="mt--7" fluid>
//   <Row>
//     <Col xl="4">
//       <Card className="shadow">
//         <CardHeader className="bg-transparent">
//           <Row className="align-items-center">
  {/*           <div className="col">
                  <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Performance
                  </h6>
                  <h2 className="mb-0">Average Humidity</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              <div style={{ position: "relative", height: "200px" }}>
                {humidityData ? (
                    <Bar data={humidityData} options={chartOptions()} />
                  ) : (
                    <p>Loading...</p>
                  )}
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
                      Overview
                    </h6>
                    <h2 className="mb-0">Daily Temperature</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ position: "relative", height: "200px" }}>
                  {temperatureData ? (
                    <Line data={temperatureData} options={chartOptions()} />
                  ) : (
                    <p>Loading...</p>
                  )}
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
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ position: "relative", height: "200px" }}>
                  {phData ? (
                    <Bar data={phData} options={chartOptions()} />
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;*/}

const Index = (props) => {
  //const [activeNav, setActiveNav] = useState(1);
  
  // toggle which sensor's data is being displayed
  const [sensor, setSensor] = useState(1)

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

 
  return (
    <>
      <Header sensor={sensor} setSensor={setSensor}/>
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
                 
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div 
                style={{position: "relative",
                        height: "200px"}}>
                  <Bar
                    data={humidityData[sensor]}
                    options={humidityData.options}

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
                    <h2 className="text-black mb-0">Daily Temperature </h2>
                  </div>
                 
                </Row>
              </CardHeader>
              <CardBody>
                <div 
                style={{position: "relative",
                        height: "200px",
                        }
                        }>
                  <Line 
                    data={temperatureData[sensor]}
                    options={temperatureData[sensor].chartOptions}
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
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div style={{position: "relative",
                        height: "200px"}}>
                  <Bar
                    data={phData[sensor]}
                    options={phData.optionsPh}

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
                    <h3 className="mb-0">Numer of Sensors: 3</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="hardware"
                      size="sm"
                    >
                      See more
                    </Button>
                  </div>
                </Row>
              </CardHeader>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
