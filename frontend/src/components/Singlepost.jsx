import React from 'react'
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import logo from '../assets/hacker.png'
function Singlepost() {
  return (
    <>
        <div className='flex flex-col w-full rounded-md border-2 border-gray-400'>
            <div className='flex justify-start items-center my-2'>
                <div className='flex'>
                <img className='h-12 w-12 rounded-full mx-2 border-2 border-gray-600 bg-red-400' src={logo} alt="logo" />
                    <div className='flex flex-col'>
                        <p>Name</p>
                        <p>Caption</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-center py-2 px-5'>
                <p className='font-normal'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi temporibus in quibusdam voluptatum veritatis molestiae, laboriosam fugiat nisi vitae.</p>
            </div>
            <hr />
            <div className='flex justify-evenly py-2'>
            <div className='text-2xl font-bold'>
            <BiUpvote />
            </div>
            <div className='text-2xl font-bold'>
            <BiDownvote />
            </div>
            <div className='text-2xl font-bold'>
            <FaRegCommentDots />
            </div>
            </div>
        </div>
    </>
  )
}

export default Singlepost