import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import "../App.css";

const Students = () => {
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "",
    department: user.role === "principal" ? "" : user.department,
  });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const userDepartment = user.role === "teacher" ? user.department : null;

    axios
      .get(`http://localhost:1008/${user.role}/viewStudents`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userDepartment },
      })
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();

    if (isEdit) {
      axios
        .put(`http://localhost:1008/${user.role}/editStudent?id=${newStudent._id}`, {
          name: newStudent.name,
          email: newStudent.email,
          department: newStudent.department,
        }, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          const updatedStudents = students.map((stu) =>
            stu._id === newStudent._id ? res.data.student : stu
          );
          setStudents(updatedStudents);
          setShowAddStudentForm(false);
          setIsEdit(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `http://localhost:1008/${user.role}/addStudent`,
          {
            name: newStudent.name,
            email: newStudent.email,
            password: newStudent.password,
            department: newStudent.department,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setStudents([...students, res.data.student]);
          setShowAddStudentForm(false);
        })
        .catch((err) => console.log(err));
    }

    setNewStudent({
      name: "",
      email: "",
      password: "",
      department: "",
    });
  };

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1008/${user.role}/deleteStudent?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStudents(students.filter((stu) => stu._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((stu) => stu._id === id);
    setNewStudent(studentToEdit);
    setShowAddStudentForm(true);
    setIsEdit(true);
  };

  // Group students by department
  const groupedStudentsByDepartment = students.reduce((acc, student) => {
    if (!acc[student.department]) {
      acc[student.department] = [];
    }
    acc[student.department].push(student);
    return acc;
  }, {});

  return (
    <>
      {token && (
        <>
          <Header />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>Students</h1>
            <button
              className="btn btn-info me-3"
              style={{ height: "40px", marginTop: "10px" }}
              onClick={() => setShowAddStudentForm(true)}
            >
              Add Student
            </button>
          </div>

          <div className={showAddStudentForm ? "blur-background" : ""}>
            {Object.keys(groupedStudentsByDepartment).map((department) => (
              <div key={department}>
                <h2>{department} Department</h2>
                <table className="table table-hover table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Join Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedStudentsByDepartment[department].map((stu) => (
                      <tr key={stu._id}>
                        <td>{stu.name}</td>
                        <td>{stu.email}</td>
                        <td>{stu.createdAt}</td>
                        <td>
                          <button
                            onClick={() => handleDelete(stu._id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>{" "}
                          <button
                            onClick={() => handleEdit(stu._id)}
                            className="btn btn-warning"
                          >
                            Edit
                          </button>{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {showAddStudentForm && (
            <div className="student-form-overlay">
              <div className="student-form">
                <h2>{isEdit ? "Edit Student" : "Add New Student"}</h2>
                <form onSubmit={handleAddStudent}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={newStudent.name}
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
                      value={newStudent.email}
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
                          value={newStudent.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <br />
                    </>
                  )}
                  {user && user.role === "principal" && (
                    <div className="form-group">
                      <label>Department</label>
                      <input
                        type="text"
                        className="form-control"
                        name="department"
                        value={newStudent.department}
                        onChange={handleInputChange}
                        required
                      />
                      <br />
                    </div>
                  )}

                  <button type="submit" className="btn btn-success">
                    {isEdit ? "Save" : "Add Student"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowAddStudentForm(false);
                      setIsEdit(false);
                      setNewStudent({
                        name: "",
                        email: "",
                        password: "",
                        department: "",
                      });
                    }}
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

export default Students;
