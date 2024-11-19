import React, { useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddCourse() {
    const token = sessionStorage.getItem('token');
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    category: '',
    duration: '',
    description: '',
    instruction: '',
    posterImage: '',
    level: '',
    language: '',
    certificate: false
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1008/teacher/addCourse', {
        name : formData.name,
        subject : formData.subject,
        category : formData.category,
        duration : formData.duration,
        // description : formData.description,
        // instruction : formData.instruction,
        // posterImage : formData.posterImage,
    },
    {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
    }
    ).then((res)=>{
        setFormData({})
        alert("Course Add Successful");
        navigate('/mycourses')
    })
    .catch((err)=>console.log(err))
  };

  return (
    <>
      <Header />
      <div className="p-5 addCourse">
        <h2 className="mb-4">Add New Course</h2>
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
          <div className="mb-3">
            <label htmlFor="courseName" className="form-label">Course Name *</label>
            <input
              type="text"
              id="courseName"
              name="name"
              className="form-control"
              value={formData.courseName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="form-control"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration *</label>
            <input
              type="text"
              id="duration"
              name="duration"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description *</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="instruction" className="form-label">Instruction</label>
            <textarea
              id="instruction"
              name="instruction"
              className="form-control"
              value={formData.instruction}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="posterImage" className="form-label">Poster Image</label>
            <input
              type="file"
              id="posterImage"
              name="posterImage"
              className="form-control"
              onChange={handleChange}
              accept="image/*"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="level" className="form-label">Level</label>
            <select
              id="level"
              name="level"
              className="form-select"
              value={formData.level}
              onChange={handleChange}
            >
              <option value="">Select level</option>
              <option value="advanced">Advanced</option>
              <option value="medium">Medium</option>
              <option value="easy">Easy</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="language" className="form-label">Language</label>
            <input
              type="text"
              id="language"
              name="language"
              className="form-control"
              value={formData.language}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="certificate"
              name="certificate"
              className="form-check-input"
              checked={formData.certificate}
              onChange={handleChange}
            />
            <label htmlFor="certificate" className="form-check-label">Certificate (Yes/No)</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Course</button>
        </form>
      </div>
    </>
  );
}
