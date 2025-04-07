import React from 'react';
// import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Container , Row, Col, Card, CardHeader, Table, Button } from "reactstrap";
import Header from "components/Headers/Header.js";
 
const Hardware = () => {
    // const[hardwareData, setHardwareData] = useState([]);
    // useEffect(() => {   
    //     axios
    //     .get(`${process.env.REACT_APP_API_URL}/hardware`)
    //     .then((response) => {
    //         setHardwareData(response.data);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching hardware data:", error);
    //     });
    // }, []);
  return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Device</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {hardwareData.map((device, index) => (
//             <tr key={index}>
//               <td>{device.name}</td>
//               <td>{device.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
    <div>
        <Header />
        <Container>
            <Card className="bg-secondary shadow border-0">
                <CardHeader className="bg-transparent pb-5">
                    <div className="text-muted text-center mt-2 mb-3">
                        <medium>Connected Devices</medium>
                    </div>
                </CardHeader>
                <div className="text-center">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Device</th>
                        <th>Location</th>
                        <th>Connectivity</th>
                    </tr>
                </thead>
            <tbody>
                    <tr>
                        <td>1</td>
                        <td>Hill</td>
                        <td>Connected</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Field</td>
                        <td>Not Connected</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td >Farmhouse</td>
                        <td>Connected</td>
                    </tr>
            </tbody>
            </Table>
            </div>
            <div className="btn-wrapper text-left" style={{padding: "20px"}}> 
                <Button color="primary" size="sm" type="button">
                    Edit Devices
                </Button>
            </div>
            </Card>
        </Container>
    </div>
  )
}

export default Hardware;