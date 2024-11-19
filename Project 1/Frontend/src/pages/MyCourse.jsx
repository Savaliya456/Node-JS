import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MyCourse() {
  const token = sessionStorage.getItem("token"); // Assuming token is stored in session storage
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1008/teacher/viewCourse", {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        setCourses(res.data.course);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (courseId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this course?");
    if (userConfirmed) {
      // Make a delete request to the server
      axios
        .delete(`http://localhost:1008/teacher/deleteCourse?id=${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include token for authentication
          }
        })
        .then(() => {
          setCourses(courses.filter(course => course._id !== courseId));
        //   alert("Course deleted successfully");
        })
        .catch((err) => console.log("Failed to delete course:", err));
    }
  };

  return (
    <>
      <Header />
      <div className="mycourse p-5">
        <div className="d-flex justify-content-between">
          <h2>My Courses</h2>
          <Link to="/addCourse">
            <button className="btn btn-outline-primary">Add More</button>
          </Link>
        </div>
        <div className="row mt-4">
          {courses &&
            courses.map((e, i) => {
              return (
                <div key={e._id || i} className="course_box col-3 p-3 ms-4 me-5 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjste-7yVJ-wcbBtKSSKDDdRaGF-MtZaKgxA&s"
                    alt="Image not available"
                  />
                  <h5 className="mt-2">{e.name}</h5>
                  <h6>{e.subject}</h6>
                  <p>
                    <strong>Rating :- </strong>
                    {e.rating}⭐
                  </p>
                  <div className="d-flex justify-content-around">
                    <button className="btn btn-outline-primary">View</button>
                    <button className="btn btn-outline-warning">Edit</button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDelete(e._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
