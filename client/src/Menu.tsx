import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="bg-info p-3 rounded-start rounded-top rounded-pill">
        <NavLink to="/" className="navbar-brand fw-bolder fs-4 pe-5 d-flex">
          <div className="border-end px-3">DrNG</div>
          <div className="border-start px-3">PATIENTS</div>
        </NavLink>
      </div>
    </nav>
  );
}
