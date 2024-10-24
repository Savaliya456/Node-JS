// src/components/Header.jsx
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  // if(!user){
  //   navigate('/')
  // }

  function handleLogout(){
    sessionStorage.clear();
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/home" className="nav-link active me-4">
          <h3>Project</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link active">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            {user.role === "principal" ? (
              <>
                <li className="nav-item">
                  <Link to="/teachers" className="nav-link">
                    Teachers
                  </Link>
                </li>
              </>
            ) : null}
            {user.role === "principal" || user.role === "teacher" ? (
              <>
                <li className="nav-item">
                  <Link to="/students" className="nav-link">
                    Students
                  </Link>
                </li>
              </>
            ) : null}
            <li className="nav-item">
              <a href="" className="nav-link" onClick={handleLogout}>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
