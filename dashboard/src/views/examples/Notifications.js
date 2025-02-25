import React from 'react'
import { Container , Row, Col, Card, CardHeader, Table, Button, UncontrolledDropdown, ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import UserHeader from "components/Headers/UserHeader.js";
 
const Notifications = () => {
  return (
    <div>
        <UserHeader />
        <Container className="mt--9">
        <div class="dropdown">
        <UncontrolledDropdown>
            <DropdownToggle color="white">
            <span className="dropdown-menu-arrow" right>
                <i class="fa-solid fa-chevron-down"></i>
                <span className="text-dark">Today</span>
            </span>
            </DropdownToggle>
            <DropdownMenu class="dropdowntime">
            <DropdownItem>
                <span>This week</span>
            </DropdownItem>
            <DropdownItem>
                <span>All</span>
            </DropdownItem>
        </DropdownMenu>
        </UncontrolledDropdown>
        </div>
        <div class="messages" color="white" style={{ padding: '16px' }}>
        <Card style={{ padding: '16px' }}>
            No notifications yet.
        </Card>
        </div>
        </Container>
    </div>
  )
}

export default Notifications