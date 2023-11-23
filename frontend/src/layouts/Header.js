import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // Dropdown,
  Button,
} from "reactstrap";
// import { ReactComponent as LogoWhite } from "../assets/images/logos/amplelogowhite.svg";
// import user1 from "../assets/images/users/user1.jpg";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  // const [dropdownOpen, setDropdownOpen] = React.useState(false);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  return (
    <Navbar color="dark" dark expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          {/* <LogoWhite /> */}
        </NavbarBrand>
        <Button
          color="dark"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="dark"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/get-device" className="nav-link">
              GetDevice
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/modbus" className="nav-link">
              Modbus
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/spark-plug-b" className="nav-link">
              SparkPlug_B
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/local-storage" className="nav-link">
              LocalStorage
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/cloud-storage" className="nav-link">
              CloudStorage
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/node-parameter" className="nav-link">
              NodeParameter
            </Link>
          </NavItem>
          {/* <NavItem>
            <Link to="/create-device-and-register" className="nav-link">
              CreateDeviceAndRegister
            </Link>
          </NavItem> */}
          {/* <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              DD Menu
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
