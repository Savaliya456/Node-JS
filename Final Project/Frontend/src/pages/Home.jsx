import React from 'react';
import Header from '../components/Header';
import '../App.css';

function Home() {
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome to School Management System</h1>
          <p className="welcome-text">Manage Attendance, assign responsibilities, and boost productivity!</p>
        </div>

        <div className="roles-section">
          <div className="role-card">
            <h3>Principal</h3> {/* Updated role */}
            <p>Oversee teachers, assign Attendance, and manage the entire workflow.</p> {/* Updated description */}
          </div>

          <div className="role-card">
            <h3>Teacher</h3> {/* Updated role */}
            <p>Organize students, Attendance, and ensure smooth operations.</p> {/* Updated description */}
          </div>

          <div className="role-card">
            <h3>Student</h3> {/* Updated role */}
            <p>Complete tasks and contribute to project success efficiently.</p> {/* Updated description */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
