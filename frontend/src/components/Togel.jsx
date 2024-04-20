import React from 'react'

function Togel({isLog,setIsLog}) {
    
  return (
    <>
         <div
          className={`${
            !isLog && "hidden"
          } absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-[0.3s] ease-in-out z-50`}
        >
          <div className="hidden sm:flex col items-center justify-center bg-tog  h-full bg-gradient-to-r from-indigo-500 to-purple-800 text-white relative  w-[100%] translate-x-0 transition-all duration-75 ease-in-out rounded-l-[100px] ">
            <div className="translate-x-[0]">
              <h1 className="text-white text-4xl font-bold m-4">
                Welcome Back!
              </h1>
              <p className="m-4">Enter Email and Password to Sign in</p>
              <button
                className="m-4 border border-white px-8 py-2 rounded-lg cursor-pointer"
                onClick={() => setIsLog(false)}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${
            isLog&& "hidden"
          } absolute top-0 right-1/2 w-1/2 h-full overflow-hidden transition-all duration-[0.3s] ease-in-out z-50`}
        >
          <div className="hidden sm:flex col items-center justify-center bg-tog  h-full bg-gradient-to-r from-indigo-500 to-purple-800 text-white relative  w-[100%] translate-x-0 transition-all duration-75 ease-in-out rounded-r-[100px] ">
            <div className="translate-x-[0]">
              <h1 className="text-white text-4xl font-bold m-4">
                Hello Friend!
              </h1>
              <p className="m-4">Register with your personal account</p>
              <button
                className="m-4 border border-white px-8 py-2 rounded-lg cursor-pointer"
                onClick={() => setIsLog(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Togel