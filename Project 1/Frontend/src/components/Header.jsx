import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const userRole = sessionStorage.getItem("userRole");
  const navigate = useNavigate();
  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg ">
        <Link className="navbar-brand" to="/home">
          <img
            src="https://storage.googleapis.com/a1aa/image/gpBB3dJI8iKeeU9CSX1PW0JSjtmtXdAQSl2UfADTeazN7GJPB.jpg"
            alt="Logo"
            width="40"
            height="40"
          />
          <span className="ms-2 fw-bold">SUPER LEARNING</span>
        </Link>
        <div className="collapse navbar-collapse">
          <form className="d-flex ms-3 search-bar">
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link" to="/courses" id="coursesDropdown">
                Courses
              </Link>
            </li>
            {userRole == "teacher" && (
              <>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link"
                    to="/mycourses"
                    id="resourcesDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Courses
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                EN <i className="fas fa-globe"></i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    EN
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    ES
                  </a>
                </li>
              </ul>
            </li>
            <li>
                <a className="btn btn-danger" onClick={handleLogout}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
