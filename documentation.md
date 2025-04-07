# React-based Dashboard 
For the sake of streamlining production, the front end of this project was implemented with a free online React-based template from the website Creative Tim. The template, Argon Dashboard React, creates a dashboard for Bootstrap 4 and Reactstrap that is intuitive and easy to navigate. 
To suit the needs of the project, some files and code have been removed and added. This file will denote each of the important pages on the dashboard as well as their contents and locations. 

# dashboard
Contains: 
- node_modules
- public 
- src 
- `.gitignore` 
- `jsconfig.json`
- `package-lock.json`
- `package.json`
- `README.md`

## public 

### index.html 
The `index.html` file serves as the main HTML template for the ColCo frontend application. It provides the static structure for the React application. This file is essential for rendering the app and includes metadata, external resources, and a placeholder for React components.

React Root Element:
`<div id="root"></div>`: The placeholder where React renders the app.\
Important Note:
The Google Maps API key is exposed in the working map version of this file, it needs to be secured and call on the key in the env file instead.

## src

- `index.js` intitializes the app, sets up routing, and renders main components into the DOM with "root". Also wraps the application in a BrowserRouter component to enable client side routing. Imports styling and assets as well. Note: not to be confused with `Index.js` or `index.html`. 
- `routes.js` defines routing configuration including paths, components, and metadata for each page in the app.\
Each route is represented as an object in the routes array with properties: \
path: URL path for the route.\
name: The name displayed for the route on the sidebar.\
icon: The icon associated with the route and displayed next to the name. \
component: The React component to render when the route is accessed. \
layout: The layout under which the route is grouped (/admin for general pages or /auth for authentication pages).

### assets 
The assets folder contains css, fonts, images, nucleo plugins, and scss files for styling the front end. The ColCo logo that appears on the dashboard and log in can be found in img->brand->`argon-react.png`. 

### components 
Components contains the main navigation components of the front end. \
<b>Footers </b>
- `AdminFooter.js` contains the footer links for the dashboard and inner app pages. Each link directs to pages of ML team's website aside from MIT License which is unchanged from the original template and leads to the Creative Tim Github licensing page. 
- `AuthFooter.js` contains the same links but solely display on the login page with slight modification to styling. These pages can be merged for refactoring and simplicity. 

<b>Headers </b>
- `DashboardHeader.js` contains the 5 data cards that display each metric of collected data as well as a dropdown menu to toggle between the sensor data for the visualizations located on the main Dashboard. 
- `Header.js` contains the same cards but without the sensor dropdown menu and is implemented on pages Maps and Hardware. 
- `UserHeader.js` is a plain header without any sensor data and is implemented in pages Notifications and User Profile. 

<b>Navbars</b>
- `AdminNavbar.js` is the code for the upper right horizontal navigation bar on the inner app pages that contains the search bar, notification button, and user button. The notification button has a drop down that takes you to the Notifications page. The user button has a drop down that takes you to the User Profile page, Settings(currently the same as the User Profile page), and Logout option that takes you to the login page. 
- `AuthNavbar.js` is the upper navigation bar for the login/registration (authentication) pages and contains the Colco logo, link to dashboard, account registration, login, and user profile. 

<b>Sidebar</b> 
- `Sidebar.js` renders all routes enlisted in `routes.js`. Sidebar is not directly editable from this file. Any changes to sidebar must be done in `routes.js`. 

### layouts 
- `Admin.js` is the main container for the dashboard and manages navigation, routing, and layout components for the inner app. 
- `Auth.js` renders the authentication pages and manages navigation, routing, and layout components for said pages. 

### variables 
- `charts.js` contains rendering for the data visualizations in the form of charts on Dashboard and hardcoded chart examples for each sensor toggle option. 

### views 
The views folder contains a folder named examples with the main javascript files for the pages of the website along with one of the two `Index.js` files. 
- `Index.js` also known as the Dashboard page, creates the cards for each data visualization chart and calls the hardcoded sensor data. It also creates cards to indicate number of sensors with link to Hardware connectivity page and a link to sensor locations on the Map. Note: Dashboard is known as Index in `routes.js`.

<b>examples</b> 
- `Hardware.js` codes the Hardware page linked on the sidebar. Integrating `Header.js` for the sensor data and a hardcoded table displaying the connectivity and location of each sensor. 
- `Icons.js` is remaining from the original template. It contained various icons available for use, desired icons can be found at fontawesome.com. This page can be thrown away in refactoring. 
- `Login.js` codes the login page. Note: Login and Log out are used interchangeably in the code and website, the page is known as Login in `routes.js` but may have an action such as Log out linked to it on the website. 
- `Maps.js` renders and dynamically calls the Google Maps API to display a hardcoded location on the map. 
- `Notifications.js` is a hardcoded notification page with a drop down to filter notifications. 
- `Profile.js` codes the User Profile page with user input to add user information. Not yet connected to backend for saving or editable. 
- `Register.js` is the registration page to create a new account. Note: Welcome message is the same on Login page and edits will be displayed on both pages. Additionally, Create account link on Login page leads to registration page. 
- `Tables.js` leftover from template. Thrown away in refactoring. 
