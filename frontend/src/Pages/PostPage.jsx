import React,{useState} from 'react'
import Post from '../components/Post'
import Singlepost from '../components/Singlepost'
import {IoChatbubbleEllipses} from 'react-icons/io5'

function PostPage() {
    const [posts,setPosts] = useState([])
    console.log(posts);
  return (
    <div className='w-full mx-8 relative'><Post setPosts={setPosts} posts={posts}/>
     
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <Singlepost/>
    <div className='sticky bottom-10 right-10 '>
                        <IoChatbubbleEllipses color='#00ADB5' width="32px" height="32px" size="32px"/>
    </div>
    </div>
  )
}

export default PostPage