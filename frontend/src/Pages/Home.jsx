import React,{useState} from 'react'
import SideBar from '../components/SideBar';
import PostPage from './PostPage';

function Home() {
    const [isloading,setIsLoading] = useState(false)
    return (
        <div className="h-screen">
          {isloading ? (
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-2"></div>
                <p className="text-gray-700">Loading...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row h-screen ">
              <div className="lg:w-1/4 mb-4 lg:mb-0 shadow-black-light border-x-2 border-gray-500  overflow-auto shadow-xl shadow-slate-800 bg-side">
                {/* content of side bar */}
                <SideBar/>
              </div>
              <div className="lg:w-3/4 m-4  pl-0 lg:pl-4 overflow-auto bg-post">
                     
                    <PostPage/>
                  
                  
                       
    
    
              </div>
            </div>
          )}
        
        </div>
      );
}

export default Home