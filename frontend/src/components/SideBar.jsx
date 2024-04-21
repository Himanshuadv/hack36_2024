import React, { useState } from "react";
import Dropdown from "./DropDown";
import Panel from "./Panel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

function SideBar() {
  const [selection, setSelection] = useState(null);
  const [eventSelection, setEventSelection] = useState(null);
  const [isCommityOpen, setIsCommityOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const navigate = useNavigate()


  const handleLogout = async()=>[
    await axios.post('http://localhost:3000/api/v1/users/logout',{},{withCredentials: true, credentials: 'include'}).then((res)=>{
      toast.success('Logged Out successfully!')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      navigate('/')
    }).catch((err)=>{
      console.log(err);
    })
  ]

  const handleEvent = (option) => {
    setEventSelection(option);
    setIsEventOpen(!isEventOpen);
  };

  const handleCommity = (option) => {
    setSelection(option);
    setIsCommityOpen(!isCommityOpen);
  };

  const commityOptions = [
    { label: "Garba", value: "Garba" },
    { label: "Nepali", value: "Nepali" },
    { label: "Arts", value: "Arts" },
  ];

  const events = [
    { label: "culrav", value: "culrav" },
    { label: "avishkar", value: "avishkar" },
    { label: "gdsc", value: "gdsc" },
  ];

  return (
    <>
      <div className="flex flex-col justify-center text-center border-b border-gray-500 pt-8 pb-8">
        <div className="w-full">
          <Panel>Home</Panel>
        </div>
        <div className="w-full">
          <Panel>Trending</Panel>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center border-b border-gray-500 pt-5 pb-5">
        <div className="w-full">
          <Panel onClick={() => handleCommity()}>{selection?.label || "Commity"}</Panel>
          {isCommityOpen && (
            <div className="border-t  pt-2 pb-2">
              {commityOptions.map((option) => (
                <div
                  key={option.value}
                  className="hover:bg-sky-100 rounded cursor-pointer p-1"
                  
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center text-center border-b border-gray-500 pt-5 pb-5">
        <div className="w-full">
          <Panel onClick={() => handleEvent()}>{eventSelection?.label || "Event"}</Panel>
          {isEventOpen && (
            <div className="border-t  pt-2 pb-2">
              {events.map((option) => (
                <div
                  key={option.value}
                  className="hover:bg-sky-100 rounded cursor-pointer p-1"
                  
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center text-center border-b border-gray-500 pt-5 pb-5">
        
        <div className="w-full">
        <Panel>About us</Panel>
        </div>
        <div className="w-full">
        <Panel>User Policy</Panel>
        </div>
        <div className="w-full cursor-pointer" onClick={handleLogout}>
          <Panel>Logout</Panel>
        </div>
      </div>
    </>
  );
}

export default SideBar;
