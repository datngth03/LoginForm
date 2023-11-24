// eslint-disable-next-line no-unused-vars
//Login.jsx
import React, { useState } from "react";
import "./style.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [values, setValues] = useState({
      email: "",
      password: "",
   });
   const [err, setErr] = useState(null);
   const navigate = useNavigate();

   const handleInputChange = (e) => {
      // Reset error when input changes
      // setErr(null);
      setValues({ ...values, [e.target.name]: e.target.value });
   };

   const handleInputClick = () => {
      // Reset error when input is clicked
      setErr(null);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      axios
         .post("http://localhost:3000/auth/adminlogin", values, { withCredentials: true })
         .then((result) => {
            if (result.data.loginStatus) {
               localStorage.setItem("valid", true);

               navigate("/dashboard");
            } else {
               // Handle login failure, e.g., show an error message
               setErr(result.data.Error);
               console.log(result.data.Error);
            }
         })
         .catch((error) => console.log(error));
   };
   return (
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
         <div className="p-3 rounded w-25 border loginForm">
            <div className="text-warning">{err && err}</div>
            <h2 className="text-center">Login Form</h2>
            <form action="" onSubmit={handleSubmit}>
               <div className="mb-3">
                  <label htmlFor="email" className="mb-1">
                     <strong>Email:</strong>
                  </label>
                  <input
                     type="email"
                     id="email"
                     name="email"
                     autoComplete="off"
                     placeholder="Enter Email ... "
                     className="form-control rounded-0"
                     // required
                     onChange={handleInputChange}
                     onClick={handleInputClick}
                  />
               </div>
               <div className="mb-3">
                  <label htmlFor="password" className="mb-1">
                     <strong>Password:</strong>
                  </label>
                  <input
                     type="password"
                     id="password"
                     name="password"
                     autoComplete="off"
                     placeholder="Enter password ... "
                     className="form-control"
                     // required
                     onChange={(e) => setValues({ ...values, password: e.target.value })}
                     onClick={handleInputClick}
                  />
               </div>
               <button className="btn btn-success rounded-0 w-100 mb-2">Log in</button>
               <div className="">
                  <input type="checkbox" id="agree" name="agree" />
                  <label htmlFor="agree">&nbsp; You are agree with terms & conditions</label>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
