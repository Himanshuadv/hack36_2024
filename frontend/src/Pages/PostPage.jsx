import React,{useState} from 'react'
import Post from '../components/Post'
import Singlepost from '../components/Singlepost'

function PostPage() {
    const [posts,setPosts] = useState([])
    console.log(posts);
  return (
    <div className='w-full mx-8'><Post setPosts={setPosts} posts={posts}/>
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
    </div>
  )
}

export default PostPage