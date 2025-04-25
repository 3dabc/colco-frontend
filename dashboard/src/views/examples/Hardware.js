import React, { useState, useEffect } from "react";
import { Container, Card, CardHeader, Table, Button, Input } from "reactstrap";
import Header from "components/Headers/Header.js";

const Hardware = () => {
  const [devices, setDevices] = useState(() => {
    const savedDevices = localStorage.getItem("devices");
    return savedDevices
      ? JSON.parse(savedDevices)
      : [
          { id: 1, location: "Hill", connectivity: "Connected" },
          { id: 2, location: "Field", connectivity: "Not Connected" },
          { id: 3, location: "Farmhouse", connectivity: "Connected" },
        ];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedDevices, setEditedDevices] = useState([...devices]);

  useEffect(() => {
    localStorage.setItem("devices", JSON.stringify(devices));
  }, [devices]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditedDevices([...devices]);
  };

  const handleInputChange = (id, field, newValue) => {
    const updatedDevices = editedDevices.map((device) =>
      device.id === id ? { ...device, [field]: newValue } : device
    );
    setEditedDevices(updatedDevices);
  };

  const handleSave = () => {
    setDevices([...editedDevices]);
    setIsEditing(false);
  };

  const handleAddRow = () => {
    const newId = devices.length > 0 ? devices[devices.length - 1].id + 1 : 1;
    const newDevice = { id: newId, location: "New Location", connectivity: "Connected" };
    setEditedDevices([...editedDevices, newDevice]);
    if (!isEditing) setDevices([...devices, newDevice]);
  };

  const handleDeleteRow = (id) => {
    const updatedDevices = editedDevices.filter((device) => device.id !== id);
    setEditedDevices(updatedDevices);
    if (!isEditing) setDevices(updatedDevices);
  };

  return (
    <div>
      <Header />
      <Container>
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <medium>Connected Nodes</medium>
            </div>
          </CardHeader>
          <div className="text-center">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Node</th>
                  <th>Location</th>
                  <th>Connectivity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {editedDevices.map((device) => (
                  <tr key={device.id}>
                    <td>{device.id}</td>
                    <td>
                      {isEditing ? (
                        <Input
                          type="text"
                          value={device.location}
                          onChange={(e) =>
                            handleInputChange(device.id, "location", e.target.value)
                          }
                        />
                      ) : (
                        device.location
                      )}
                    </td>
                    <td>{device.connectivity}</td> {/* Connectivity is no longer editable */}
                    <td>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDeleteRow(device.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="btn-wrapper text-left" style={{ padding: "20px" }}>
            <Button color="success" size="sm" onClick={handleAddRow}>
              Add Node
            </Button>
            {isEditing ? (
              <Button color="success" size="sm" onClick={handleSave} style={{ marginLeft: "10px" }}>
                Save Changes
              </Button>
            ) : (
              <Button color="primary" size="sm" onClick={handleEditClick} style={{ marginLeft: "10px" }}>
                Edit Nodes
              </Button>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hardware;