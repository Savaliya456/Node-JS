import "../App.css"; // Make sure your CSS path is correct
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:1008/auth/signin', {
            email,password,
        })
        .then((res)=>{
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("userRole", res.data.user.role);
            
            setEmail('')
            setPassword('')
            navigate('/home')
        }) .catch((err) => console.log(err))
    };

    return (
        <div className="loginBg">
            <div className="container" >
            <div className="row justify-content-center">
                <div className="">
                    <div className="card shadow-lg border-0 rounded-3" style={{top : '35%',left : '33%'}}>
                        <div className="card-body p-4">
                            <h3 className="card-title text-center mb-4 text-primary">Login</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-secondary">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control border-primary"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label text-secondary">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control border-primary"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 btn-lg">
                                    Login
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <small className="text-muted">Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
