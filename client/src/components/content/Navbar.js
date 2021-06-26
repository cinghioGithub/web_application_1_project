//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faPollH } from "@fortawesome/free-solid-svg-icons";
import { Navbar as NavbarBootstrap, NavDropdown } from "react-bootstrap";
import Button from "../Various/Button";
import img from "../../img/undraw_profile_2.svg";

export const Navbar = ({ ...props }) => {
  const { user, logout } = props;
  return (
    <>
      <NavbarBootstrap
        //onToggle={toggleFunc}
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
          {/*<FontAwesomeIcon icon={faPollH} className={"mr-2 mb-0 h1"} />*/}
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
                  {/*<img
                    alt=""
                    className="img-profile rounded-circle"
                    src={img}
                  />*/}
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
      {/* <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>

        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="/login"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {user.username}
              </span>
              <img alt="" className="img-profile rounded-circle" src={img} />
            </a>
          </li>
        </ul>
      </nav> */}
    </>
  );
};

export default Navbar;
