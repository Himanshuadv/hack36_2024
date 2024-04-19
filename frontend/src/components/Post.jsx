import React from 'react'
import logo from '../assets/hacker.png'
function Post() {
  return (
    <>
        <div className='flex flex-col w-[30%] bg-yellow-400 rounded-md'>
            <div className='flex justify-start items-center my-2'>
                <div className='flex'>
                <img className='h-12 w-12 rounded-full mx-2 border-2 border-gray-600 bg-red-400' src={logo} alt="logo" />
                    <div className='flex flex-col'>
                        <p>Name</p>
                        <p>Caption</p>
                    </div>
                </div>
            </div>
            <div className='flex w-'>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi temporibus in quibusdam voluptatum veritatis molestiae, laboriosam fugiat nisi vitae.</p>
            </div>
        </div>
    </>
  )
}

export default Post