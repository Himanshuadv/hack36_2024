import React,{useState} from 'react'
import SideBar from '../components/SideBar';
import PostPage from './PostPage';
import Nav from '../components/Nav';
import { IoChatbubbleEllipses } from "react-icons/io5";


function Home() {
    const [isloading,setIsLoading] = useState(false)
    
    return (
        <div className="h-screen">
            <Nav/>
          {isloading ? (
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-1 border-gray-900 mb-2"></div>
                <p className="text-gray-700">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row h-screen ">
              <div className="lg:w-1/4 h-full  lg:mb-0 border-x-1 border-gray-500  bg-side">
                {/* content of side bar */}
                <SideBar/>
              </div>
              <div className="lg:w-3/4 h-full my-6  pl-0 lg:pl-4 overflow-auto bg-post shadow-2xl  shadow-slate-800 relative">
                    
                    <PostPage />
                    
                  
                  
                       
    
    
              </div>
            </div>
          )}
        
        </div>
      );
}

export default Home