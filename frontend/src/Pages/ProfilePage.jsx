import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import logo from "../assets/hacker.png";
import Nav from "../components/Nav";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

function ProfilePage() {
  const input =
    "bg-form  border-b-4 border-gray-300 mx-2 my-2 px-2 py-2 text-base rounded-md w-3/4 outline-none ";

  const navigate = useNavigate();
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [username,setUserName] = useState(localStorage.getItem("name"))
  const [currentPassword,setCurrentPassword] = useState("")
  

  function handleSubmit(e){
    e.preventDefault();
    if(confirmPassword !== password){
        toast.success("Password is not same!", {
            autoClose: 5000,
          });
          setPassword("");
        setConfirmPassword("")
        setUserName("")
        navigate("/home/profile");
    }
    setPassword("");
    setConfirmPassword("")
    setUserName("")
    const id = localStorage.getItem("id")
    const data = { username, password,id,currentPassword };
    axios
      .post(`http://localhost:3000/api/v1/users/updatePassword`, data,{withCredentials: true, credentials: 'include'})
      .then((response) => {
        console.log(response);
        // if(response.data.status === "success"){
        //     toast.success("Password Updated successfully")
        // }
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen w-full ">
        <div className="h-3/4 rounded-lg w-1/2 shadow-2xl bg-gray-400">
          <h1 className="text-4xl font-semibold m-10">Profile Setting</h1>
          <div className="flex justify-center items-center">
            <img
              src={logo}
              className="w-32 h-32 items-center text-center"
              alt=""
            />
          </div>

          <form action="" className="flex flex-col justify-center items-center">
            <input type="text" className={input} placeholder="Username" value={username}
              onChange={(e)=>setUserName(e.target.value)} />
            <input
              type="text"
              className={input}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e)=>setCurrentPassword(e.target.value)}
              
            />
            <input type="text" className={input} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="New Password" />
            <input
              type="text"
              className={input}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <div className="flex flex-row justify-around w-full">
              <Button primary rounded onClick={handleSubmit}>
                {" "}
                Update
              </Button>
              <Button
                secondary
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <IoIosArrowRoundBack />
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
