import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import axios from "axios";
import "../App.css";

const Teacher = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]); // State for teachers
  const [students, setStudents] = useState([]); // State for students
  const [selectedStudents, setSelectedStudents] = useState({});

  const [isEdit, setIsEdit] = useState(false);
  const [showAddTeacherForm, setShowAddTeacherForm] = useState(false); // State to control form visibility

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    salary: ""
  });

  useEffect(() => {
    // Uncomment this if you want to enforce authentication
    // if (!token) {
    //   navigate("/"); // Redirect to login if not authenticated
    // }

    // Fetch teachers data
    axios
      .get("http://localhost:1008/principal/viewTeachers", {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        console.log(res.data);
        
        setTeachers(res.data.teachers);
      })
      .catch((err) => console.log(err));

    // Fetch students data
    axios
      .get("http://localhost:1008/principal/viewStudents", {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);

  // Function to handle form submission
  const handleAddTeacher = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(
          `http://localhost:1008/principal/editTeacher?id=${newTeacher._id}`,
          {
            name: newTeacher.name,
            email: newTeacher.email,
            department: newTeacher.department,
            salary: newTeacher.salary
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log("Teacher updated successfully", res.data.teacher);
          const updatedTeachers = teachers.map((t) =>
            t._id === newTeacher._id ? res.data.teacher : t
          );
          setTeachers(updatedTeachers); // Update the list with the edited teacher
          setShowAddTeacherForm(false); // Close the form
          setIsEdit(false); // Reset to add mode
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          "http://localhost:1008/principal/addTeacher",
          {
            name: newTeacher.name,
            email: newTeacher.email,
            password: newTeacher.password,
            department: newTeacher.department,
            salary: newTeacher.salary
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log("Teacher added successfully", res.data);
          setTeachers([...teachers, res.data.teacher]); // Add the new teacher to the list
          setShowAddTeacherForm(false); // Close the form
        })
        .catch((err) => console.log(err));
    }
    
    // Reset the form
    setNewTeacher({
      name: "",
      email: "",
      password: "",
      department: "",
      salary: ""
    });
  };

  const handleInputChange = (e) => {
    setNewTeacher({
      ...newTeacher,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1008/principal/deleteTeacher?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        console.log(res);
        setTeachers(teachers.filter((t) => t._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const teacherToEdit = teachers.find((t) => t._id === id);
    setNewTeacher(teacherToEdit);
    setShowAddTeacherForm(true);
    setIsEdit(true);
  };

  const handleViewStudents = (department, teacherId) => {
    setSelectedStudents((prev) => {
      // If the same teacherId is clicked, remove it (toggle behavior)
      if (prev[teacherId]) {
        const updated = { ...prev };
        delete updated[teacherId]; // Remove the currently toggled students
        return updated;
      } else {
        // Otherwise, show students for the clicked teacher
        const filteredStudents = students.filter(
          (s) => s.department === department
        );
        return {
          ...prev,
          [teacherId]: filteredStudents // Add new teacher's students
        };
      }
    });
  };

  return (
    <>
      {token && (
        <>
          <Header />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Teachers</h1>
            <button
              className="btn btn-info me-3"
              style={{ height: "40px", marginTop: "10px" }}
              onClick={() => setShowAddTeacherForm(true)} // Show form on click
            >
              Add Teacher
            </button>
          </div>

          <div
            className={showAddTeacherForm ? "blur-background" : ""} // Apply blur class conditionally
          >
            {teachers && (
              <div>
                <table className="table table-hover table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Salary</th>
                      <th>Join Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers &&
                      teachers.map((t) => (
                        <React.Fragment key={t._id}>
                          <tr>
                            <td>{t.name}</td>
                            <td>{t.email}</td>
                            <td>{t.department}</td>
                            <td>{t.salary}</td>
                            <td>{t.createdAt}</td>
                            <td>
                              <button
                                onClick={() => handleDelete(t._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>{" "}
                              <button
                                onClick={() => handleEdit(t._id)}
                                className="btn btn-warning"
                              >
                                Edit
                              </button>{" "}
                              <button
                                onClick={() =>
                                  handleViewStudents(t.department, t._id)
                                }
                                className="btn btn-outline-primary"
                              >
                                {selectedStudents[t._id]
                                  ? "Hide Students"
                                  : "View Students"}
                              </button>{" "}
                            </td>
                          </tr>

                          {/* Show students under the teacher */}
                          <tr
                            className={`student-row ${
                              selectedStudents[t._id] ? "show" : ""
                            }`}
                          >
                            <td colSpan="6">
                              {selectedStudents[t._id] && (
                                <table className="table table-bordered">
                                  <thead>
                                    <tr>
                                      <th>Student Name</th>
                                      <th>Email</th>
                                      <th>Department</th>
                                      <th>Grade</th> {/* Assuming students have grades instead of salary */}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedStudents[t._id].map((stu) => (
                                      <tr key={stu._id}>
                                        <td>{stu.name}</td>
                                        <td>{stu.email}</td>
                                        <td>{stu.department}</td>
                                        <td>{stu.grade}</td> {/* Updated to reflect student grade */}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Form for adding a new teacher */}
          {showAddTeacherForm && (
            <div className="teacher-form-overlay">
              <div className="teacher-form">
                <h2>{isEdit ? "Edit Teacher" : "Add New Teacher"}</h2>
                <form onSubmit={handleAddTeacher}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newTeacher.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={newTeacher.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  {!isEdit && (
                    <>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="text"
                          className="form-control"
                          name="password"
                          value={newTeacher.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <br />
                    </>
                  )}
                  <div className="form-group">
                    <label>Department</label>
                    <input
                      type="text"
                      className="form-control"
                      name="department"
                      value={newTeacher.department}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Salary</label>
                    <input
                      type="number"
                      className="form-control"
                      name="salary"
                      value={newTeacher.salary}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-success">
                    {isEdit ? "Save" : "Add Teacher"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowAddTeacherForm(false);
                      setNewTeacher({
                        name: "",
                        email: "",
                        password: "",
                        department: "",
                        salary: ""
                      });
                      setIsEdit(false);
                    }} // Hide form on cancel
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Teacher;
