import React from 'react'
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import logo from '../assets/hacker.png'
import { BsSearch } from "react-icons/bs";
function Nav() {
    return (
        <>
            <div className='w-full h-16 bg-[#00ADB5] flex justify-between items-center shadow-lg'>
                <div className='flex items-center mx-5'>
                    <img className='h-12 w-12 rounded-full mx-2 border-2 border-gray-600 bg-red-400' src={logo} alt="logo" />
                    <p className='text-lg font-bold'>Motis</p>
                </div>

                <div className='flex items-center'>
                    <input className='py-1 px-5 w-[300px] rounded-s-md focus:outline-none' type="text" placeholder='Search' />
                    <div className='py-[7px] text-lg bg-yellow-400 px-3 rounded-e-md font-bold'>
                        <BsSearch />
                    </div>

                </div>

                <div className='flex items-center mx-5'>
                    <div className='text-2xl mx-3'>
                        <IoNotifications />
                    </div>

                    <div className='text-2xl mx-3'>
                        <FaUser />
                    </div>


                </div>
            </div>
        </>
    )
}

export default Nav