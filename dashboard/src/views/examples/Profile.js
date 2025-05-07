import UserHeader from "components/Headers/UserHeader.js";
import { auth } from "../../config/firebaseConfig";
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { getAccount, updateAccount } from "../../services/profileService";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  });

  useEffect(() => {
    if (!auth.currentUser) {
      console.error("User is not logged in.");
      return;
    }
  
    const fetchAccountData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const accountData = await getAccount(userId);
        setFormData({
          username: accountData.username || "",
          email: accountData.email || "",
          firstName: accountData.firstName || "",
          lastName: accountData.lastName || "",
          address: accountData.address || "",
          city: accountData.city || "",
          country: accountData.country || "",
          postalCode: accountData.postalCode || "",
        });
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
  
    fetchAccountData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Optionally reset form data to original values if needed
  };

  const handleSaveClick = async () => {
    try {
      const userId = auth.currentUser.uid; // Replace with the actual user ID
      await updateAccount(userId, formData);
      setIsEditing(false);
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account.");
    }
  };

  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {!isEditing && (
                      <Button
                        color="primary"
                        onClick={handleEditClick}
                        size="sm"
                      >
                        Edit Account
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="username"
                            placeholder="Username"
                            type="text"
                            value={formData.username}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="firstName"
                          >
                            First name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="firstName"
                            placeholder="First name"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="lastName"
                          >
                            Last name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="lastName"
                            placeholder="Last name"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Address information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="address"
                          >
                            Address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="address"
                            placeholder="Address"
                            type="text"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="city"
                          >
                            City
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="city"
                            placeholder="City"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="country"
                          >
                            Country
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="country"
                            placeholder="Country"
                            type="text"
                            value={formData.country}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="postalCode"
                          >
                            Postal code
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="postalCode"
                            placeholder="Postal code"
                            type="number"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {isEditing && (
                    <div className="text-center mt-4">
                      <Button
                        color="secondary"
                        onClick={handleCancelClick}
                        className="mr-3"
                      >
                        Cancel
                      </Button>
                      <Button color="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                    </div>
                  )}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;