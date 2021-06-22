import Button from "../Various/Button";
import { Link } from "react-router-dom";

export const Sidebar = ({ ...props }) => {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="index.html"
      >
        <div className="sidebar-brand-text mx-3">Admin Dashboard</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item active">
        <Link className="nav-link" to="/">
          {/*<i className="fas fa-fw fa-tachometer-alt"></i>*/}
          <span className="ml-1">Home</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Manage</div>

      <li className="nav-item">
        <Link className="nav-link" to="/manage">
          {/*<i className="fas fa-fw fa-cog"></i>*/}
          <span className="ml-1">My Questionnaires</span>
        </Link>
      </li>

      <div className="d-flex justify-content-center mb-3">
        <Button text={"New Questionnaire"} type={"success"} url={"/create"} />
      </div>
      <hr className="sidebar-divider" />
    </ul>
  );
};

export default Sidebar;
