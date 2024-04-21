import React,{useEffect, useState} from 'react'
import Post from '../components/Post'
import Singlepost from '../components/Singlepost'
import {IoChatbubbleEllipses} from 'react-icons/io5'
import axios from 'axios'

function PostPage() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{
      console.log("hello");
      axios.get('http://localhost:3000/api/v1/users/posts/all',{withCredentials: true, credentials: 'include'}).then((res)=>{
        setPosts(res.data)
      }).catch((err)=>{
        console.log(err);
      })

    },[])
  return (
    <div className='w-auto mx-8 relative'><Post setPosts={setPosts} posts={posts}/>
     {posts?.map((post) => (
                <Singlepost key={post._id} post={post} />
            ))}
    
    {/* <div className='sticky bottom-10 right-10 '>
                        <IoChatbubbleEllipses color='#00ADB5' width="32px" height="32px" size="32px"/>
    </div> */}
    </div>
  )
}

export default PostPage