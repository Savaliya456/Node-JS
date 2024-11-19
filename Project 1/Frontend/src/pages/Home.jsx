import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token"); // Assuming token is stored in local storage
  const navigate = useNavigate();

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
    <>
      <Header/>


    </>
  );
}
