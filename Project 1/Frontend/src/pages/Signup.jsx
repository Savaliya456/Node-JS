import "../App.css"; // Import your custom CSS if needed
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        age: '',
        role: 'student', // Default value
        password: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:1008/auth/signup', {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            age: formData.age,
            role: formData.role,
            password: formData.password
        })
        .then((res)=>{
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userRole", JSON.stringify(res.data.user.role));
            setFormData('')
            navigate('/')
        }) .catch((err)=> console.log(err));
    };

    return (
        <div className="loginBg">
            <div className="container">
            <div className="row justify-content-center">
                <div className="">
                    <div className="card shadow-lg border-0 rounded-3" style={{top : '21%',left : '27%', width : '35rem'}}>
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4 text-primary">Signup</h3>
                            <form onSubmit={handleSubmit} className="row">
                                <div className="col-6">
                                    <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Create your password"
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="Enter your age"
                                        required
                                    />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="contact" className="form-label">Contact</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="contact"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        placeholder="Enter your contact number"
                                        required
                                    />
                                    </div>
                                </div>
                                <div className="text-center mt-3 mb-3">
                                    <small className="text-muted">have an account? <Link to="/" className="text-primary">Sign In</Link></small>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
