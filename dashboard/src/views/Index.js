import { useState, useEffect } from "react";
import { useAuth } from "contexts/AuthContext"; // Import AuthContext
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  temperatureData,
  humidityData,
  phData,
} from "variables/charts.js";

import Header from "components/Headers/DashboardHeader.js";

const Index = () => {
  const { sensorData } = useAuth(); // Access sensor data from AuthContext
  const [sensor, setSensor] = useState(1);
  const [currentHumidityData, setCurrentHumidityData] = useState(null);
  const [currentTemperatureData, setCurrentTemperatureData] = useState(null);
  const [currentPhData, setCurrentPhData] = useState(null);

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }, []);

  useEffect(() => {
    if (sensorData && humidityData[sensor] && temperatureData[sensor] && phData[sensor]) {
      setCurrentHumidityData(humidityData[sensor]);
      setCurrentTemperatureData(temperatureData[sensor]);
      setCurrentPhData(phData[sensor]);
    } else {
      setCurrentHumidityData(null);
      setCurrentTemperatureData(null);
      setCurrentPhData(null);
    }
  }, [sensor, sensorData]);

  return (
    <>
      <Header sensor={sensor} setSensor={setSensor} />
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
                    <h2 className="mb-0">Average Soil Moisture</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ position: "relative", height: "200px" }}>
                  {currentHumidityData ? (
                    <Bar data={currentHumidityData} options={humidityData.options} />
                  ) : (
                    <p>No data available for humidity.</p>
                  )}
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
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ position: "relative", height: "200px" }}>
                  {currentTemperatureData ? (
                    <Line
                      data={currentTemperatureData}
                      options={temperatureData[sensor]?.chartOptions || {}}
                    />
                  ) : (
                    <p>No data available for temperature.</p>
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
                  {currentPhData ? (
                    <Bar data={currentPhData} options={phData.optionsPh} />
                  ) : (
                    <p>No data available for pH.</p>
                  )}
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
                    <h3 className="mb-0">Number of Nodes: {Array.isArray(sensorData?.data) ? sensorData.data.length : 1}</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" to="/hardware" size="sm" tag={Link}>
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
                    <Button color="primary" to="/maps" size="sm" tag={Link}>
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