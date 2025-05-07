import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Hardware from "views/examples/Hardware.js";
import Notifications from "views/examples/Notifications.js";
import Register from "views/examples/Register.js";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-muted",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/notif",
    name: "Notifications",
    icon: "fa-regular fa-bell",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-muted",
    component: <Maps />,
    layout: "/admin",
  },
  {path: "/hardware",
   name: "Hardware",
   icon: "fa fa-cog text-muted",
   component: <Hardware />,
   layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-muted",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/registration",
    name: "Registration",
    icon: "fa-regular fa-address-card",
    component: <Register />,
    layout: "/auth",
  },
  {
    name: "Log Out",
    icon: "ni ni-key-25 text-muted",
    action: "logout",
    layout: "/auth",
  },
  {
    path: "/login",
    // name: "Log Out",
    // icon: "ni ni-key-25 text-muted",
    component: <Login />,
    layout: "/auth",
  }
];
export default routes;
