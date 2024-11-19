import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function Courses() {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token"); // Assuming token is stored in local storage
  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:1008/auth/home", {
        headers: {
          Authorization: `Bearer ${token}` // Use Bearer token for Authorization
        }
      })
      .then((res) => {
        setData(res.data.courses);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <div className="course_baner">
        <h1>Better Future</h1>
      </div>
      <center style={{backgroundColor : '#F5F5F5'}}>
        <h2 className="p-4">Courses to get started</h2>
      </center>
      <div className="row" style={{ marginTop : '-7.5px' }}>
        <div className="col-3 filter">
          
        </div>
        <div className="col-9 courses p-5" style={{backgroundColor : '#ECE6F6'}}>
          <h3>All Courses</h3>
          <div className="row">
          {data &&
            data.map((e, i) => {
              return <>
                <div className="course_box col-3 p-3 ms-4 me-5 mb-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjste-7yVJ-wcbBtKSSKDDdRaGF-MtZaKgxA&s"
                    alt="Image not available"
                  />
                  <h5 className="mt-2">{e.name}</h5>
                  <h6>{e.subject}</h6>
                  <p><strong>Rating :- </strong>{e.rating}⭐</p>
                  <button className="btn btn-outline-primary">View Course</button>
                </div>
              </>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
