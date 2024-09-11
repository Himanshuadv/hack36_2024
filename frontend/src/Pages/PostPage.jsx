import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Singlepost from "../components/Singlepost";
import { IoChatbubbleEllipses } from "react-icons/io5";
import axios from "axios";
import { getAllPost } from "../services/apiPost";
import { useQuery } from "@tanstack/react-query";




function PostPage() {
  const {
    isLoading,
    data: post,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPost,
  });

  const [posts, setPosts] = useState([]); // Initialize with an empty array
  
  // Update posts when the data is available
  useEffect(() => {
    if (post) {
      setPosts(post);
    }
  }, [post]);
  
  const [flag, setFlag] = useState(false);
  if(isLoading){
    return <div>
      Hello!!
    </div>
  }
  
  
  // setInterval(()=>{

  // },1000)
  

  return (
    <div className="w-auto mx-8 relative">
      <Post setPosts={setPosts} posts={posts} />
      {posts?.map((post) => (
        <Singlepost key={post._id} post={post} setFlag={setFlag} flag={flag} />
      ))}

      {/* <div className='sticky bottom-10 right-10 '>
                        <IoChatbubbleEllipses color='#00ADB5' width="32px" height="32px" size="32px"/>
    </div> */}
    </div>
  );
}

export default PostPage;
