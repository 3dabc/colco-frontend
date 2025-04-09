import React from 'react'
// import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Container ,  Card, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import UserHeader from "components/Headers/UserHeader.js";
 
const Notifications = () => {
    // const [notifications, setNotifications] = useState([]);
    // useEffect(() => {
    //     axios
    //     .get(`${process.env.REACT_APP_API_URL}/notifications`)
    //     .then((response) => {
    //         setNotifications(response.data);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching notifications:", error);
    //     });     
    // }, []);
  return (
//     <div>
//     {notifications.map((notification, index) => (
//       <div key={index}>
//         <p>{notification.message}</p>
//       </div>
//     ))}
//   </div>
// );
// };
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

export default Notifications;