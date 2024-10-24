import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Teacher from "./pages/Teacher"; // Assuming this will now be Teacher component
import Student from "./pages/Student"; // Assuming this will now be Students component
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/authSlice";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const dispatch = useDispatch();

  // Fetch user and token from sessionStorage on page load
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      dispatch(setCredentials({ user: storedUser, token: storedToken }));
    }

    setLoading(false); // Data has been fetched, stop loading
  }, [dispatch]);

  // Prevent rendering routes until we finish checking sessionStorage
  if (loading) {
    return <div>Loading...</div>; // Optional: show a loading spinner or placeholder
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {user && user.role === "principal" ? (  // Changed 'admin' to 'principal'
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/teachers" element={<Teacher />} />  {/* Managers renamed to Teachers */}
            <Route path="/students" element={<Student />} />  {/* Employees renamed to Students */}
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null}

        {user && user.role === "teacher" ? (  // Changed 'manager' to 'teacher'
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/students" element={<Student />} />  {/* Employees renamed to Students */}
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null}

        {user && user.role === "student" ? (  // Changed 'employee' to 'student'
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : null}

        {/* Catch-all route */}
        {user && <Route path="*" element={<Navigate to="/home" />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
