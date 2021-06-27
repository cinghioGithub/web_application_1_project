import { Navbar as NavbarBootstrap, NavDropdown } from "react-bootstrap";
import Button from "./Button";

export const Navbar = ({ ...props }) => {
  const { user, logout } = props;
  return (
    <>
      <NavbarBootstrap
        bg="success"
        expand="lg"
        className="navbar-light bg-white topbar mb-4 static-top border-bottom d-flex justify-content-between"
        variant="dark"
      >
        <NavbarBootstrap.Toggle
          className="white-toggler d-block d-lg-none"
          aria-controls="toggleMenu"
        />
        <NavbarBootstrap.Brand
          className="navbar-brand text-primary font-weight-bold d-flex align-items-center"
          href="/"
        >
          Questionnaires 
        </NavbarBootstrap.Brand>
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          {!user ? (
            <li className="nav-item dropdown no-arrow h-100">
              <Button type={"success"} text={"Login"} url={"/login"} />
            </li>
          ) : (
            <NavDropdown
              align={"right"}
              id="dropdown-menu-align-right"
              className="nav-item dropdown no-arrow"
              title={
                <>
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {user.name}
                  </span>
                </>
              }
            >
              <NavDropdown.Item className="text-danger" onClick={logout}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </ul>
      </NavbarBootstrap>
    </>
  );
};

export default Navbar;
