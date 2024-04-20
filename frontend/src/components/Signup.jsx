import React, { useState, useEffect } from "react";

import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGooglePlusG } from "react-icons/fa";
import Button from "./Button";
import axios from "axios";

function validateEmail(email) {
  // Regular expression for validating email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@mnnit\.ac\.in$/;
  
  // Check if the email format is valid and matches the specific domain
  return emailRegex.test(email);
}

function Signup({ setIsLog, isLog }) {
  const input =
    "bg-form border border-gray-300 my-1 mx-2 px-3 py-3 text-base rounded-md w-full outline-none";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    if (cpassword !== password) {
      setError("Password Should be same");
    } else {
      if(!validateEmail(email)){
          toast.warning('Only college Student is allowed. Retry with your college email')
      }else{
        setError(null);
      const data = { name, email, password };
    //   console.log(data);
      axios
        .post("http://localhost:3000/api/v1/users/signup", data,{withCredentials: true, credentials: 'include'})
        .then((response) => {
          // alert(response.data.name);
          console.log(response);
          toast.success("Verify Your email and then Login!", {
            theme: "dark",
            autoClose: 5000,
          });
          const name = response.data.data.user.name;
          console.log(response.data.data.user.name);
          localStorage.setItem("name", name);
          setIsLog(()=>(
            !isLog
          )
            
          )
          
        })
        .catch((error) => {
          // Handle error
          const err = error.response.data.message;
          console.log(err);
          let cleanedErrorMessage = err.replace(
            /^User validation failed: /,
            ""
          );

          let email = "";
          let password = "";

          const emailIndex = cleanedErrorMessage.indexOf("email:");
          const passwordIndex = cleanedErrorMessage.indexOf("password:");

          if (emailIndex !== -1) {
            const nextIndex = cleanedErrorMessage.indexOf(",", emailIndex);
            email = cleanedErrorMessage.substring(
              emailIndex + 7,
              nextIndex !== -1 ? nextIndex : cleanedErrorMessage.length
            );
          }

          if (passwordIndex !== -1) {
            const nextIndex = cleanedErrorMessage.indexOf(",", passwordIndex);
            password = cleanedErrorMessage.substring(
              passwordIndex + 10,
              nextIndex !== -1 ? nextIndex : cleanedErrorMessage.length
            );
          }

          if (email !== "") {
            toast.error(email, {
              autoClose: 20000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: "colored",
            });
          }
          if (password !== "") {
            toast.error(password, {
              autoClose: 20000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: "colored",
            });
          }
        });
      }
      
        
    }
  };

  return (
    <div className="flex col justify-center items-center absolute top-0 h-full transition-all duration-75 ease-in-out">
      <form className="bg-white flex justify-center items-center flex-col py-0 px-10 h-full">
        <h1 className="text-3xl font-bold  ">Create Account</h1>
        <div className="flex justify-center p-2 my-4 w-full ">
          <a href="/" alt="something" className="p-4">
            <IoLogoGithub/>
          </a>
          <a href="/" alt="something" className="p-4">
            <FaGooglePlusG/>
          </a>
        </div>
        <span className="m-4">or use your email for registeration</span>
        <input
          type="text"
          placeholder="Name"
          className={input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={input}
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          success
          className="hover:bg-btn text-btn border-btn mt-4"
          rounded
          outline
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        <p className="flex sm:hidden">
          don't have an account?{" "}
          <span
            className="hover:text-blue-500 cursor-pointer"
            onClick={() => setLog(!isLog)}
          >
            click here!
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
