import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Import AuthContext
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("Calling logout...");
      await logout(); // Call the logout function from AuthContext
      console.log("Navigating to login...");
      navigate("/auth/login"); // Redirect to the login page
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-black text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText || "Dashboard"}
          </Link>
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-1" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <i className="fa-regular fa-bell" aria-hidden="true"></i>
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem to="/admin/notif" tag={Link}>
                  <i className="fa-regular fa-bell" />
                  <span>Notifications</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <i className="fa-regular fa-user" aria-hidden="true"></i>
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-key-25" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;