import React,{useState} from "react";
import profile from "../assets/student.webp";
import { Image } from "react-ionicons";
import { Podium } from "react-ionicons";
import Button from "./Button";




function Post({setPosts,posts}) {
    const [content,setContents] = useState('')
    const handlePosts = ()=>{
        setPosts([
            ...posts, // Spread the existing posts
            {
              contents: content,
              likes: 0,
              dislikes: 0,
              comments: [],
              tag: []
            }
          ]);
    }
  return (
    <div className="flex flex-row  p-2 w-2/3 ">
      <img
        src={profile}
        alt="profile"
        className="w-16 h-16 rounded-full mx-2 "
      />
      <div className="flex flex-col w-full ">
        <input
          type="text"
          placeholder="what is  new today"
          value={content}
          className="py-2 px-2 mb-2 border border-gray-400 focus:outline-none rounded-md min-h-fit min-w-fit"
          onChange={(e)=>setContents(e.target.value)}
        />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row w-1/6 justify-evenly">
            <Image  height="28px" width="28px" color="#00ADB5" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer'/>
            <Podium   height="28px" width="28px" color="#00ADB5" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' />
          </div>
          <Button primary rounded outline onClick={handlePosts}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Post;
