import React,{useEffect, useState,useRef} from 'react'
import { ThumbsUpSharp } from 'react-ionicons'
import { ThumbsDownSharp } from 'react-ionicons'
import { ChatbubbleEllipsesSharp } from 'react-ionicons'
import user from '../assets/user.avif'
import { PricetagsSharp } from 'react-ionicons'
import Button from './Button'
import axios from 'axios'

// likes and dislikes functionality  and comments fuctionality logic is in backed

import logo from '../assets/hacker.png'
function Singlepost({post}) {
    const [comments,setComments] = useState('')
    const [liked,setIsLiked] = useState(false)
    const [disliked,setDisliked] = useState(false)
    const [commentClicked,setCommentClicked] = useState(false)
    const divEl = useRef();

    const user_id = localStorage.getItem('id')
    useEffect(() => {
      if (post && post.likes && post.likes.includes(user_id)) {
          setIsLiked(true);
      }
      if(post && post.dislikes && post.dislikes.includes(user_id)){
        setDisliked(true)
      }
  }, [post, user_id]);

    const handleComments = ()=>{
        setCommentClicked(!commentClicked)
    }
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    };
    
    const currentTimeString = new Date(post.timestamp).toLocaleTimeString('en-US', options);



  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) {
        return;
      }

      if (!divEl.current.contains(event.target)) {
        setCommentClicked(false);
      }
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, []);




    const handleLikes = ()=>{
        //send user id 
        const userId = localStorage.getItem('id')
       
        axios.put(`http://localhost:3000/api/v1/users/posts/${post?._id}/likes`, {userId}, { withCredentials: true, credentials: 'include' })
        .then((res) => {
          post = res.data
        })
        .catch((err) => {
          console.log(err);
        });
      
        
    }
    const UpdateComment = (e)=>{
        e.preventDefault()
       const userId = localStorage.getItem('id')
       const name = localStorage.getItem('name')
       console.log(comments);
       axios.put(`http://localhost:3000/api/v1/users/posts/${post?._id}/comments`, {userId,content:comments,name}, { withCredentials: true, credentials: 'include' })
       .then((res) => {
         post = res.data
       })
       .catch((err) => {
        console.log(err);
      });
    }
    const handleDislikes = ()=>{
       //route per post karo but iski
       const userId = localStorage.getItem('id')

       axios.put(`http://localhost:3000/api/v1/users/posts/${post?._id}/dislikes`, {userId}, { withCredentials: true, credentials: 'include' })
       .then((res) => {
         post = res.data
       })
       .catch((err) => {
        console.log(err);
      });
       
    }
    const elements = [];
    
console.log(post?.comments);

const sortedComments = [...(post?.comments || [])].sort((a, b) =>  a.timestamp- b.timestamp);

// Then, iterate over the sorted comments array
for (let i = 0; i < sortedComments.length; i++) {
    const comment = sortedComments[i];
    elements.push(
        <div key={i} className='my-4'> 
            <p>{comment?.name}: {comment?.content}</p>
            <div className="flex justify-between w-1/6">
                <ThumbsUpSharp/><span>0</span>
                <ThumbsDownSharp/><span>0</span>
            </div>
        </div>
    );
}

  return (
    <>
        <div className='flex flex-col rounded-md border-b border-t shadow-md border-nav w-2/3 my-4'>
            <div className='flex justify-start items-center my-2'>
                <div className='flex'>
                <img className='h-12 w-12 mx-2 border-gray-600 bg-red-400' src={user} alt="logo" />
                    <div className='flex flex-col'>
                        <p>{post?.username}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex flex-col w-full justify-center py-2 px-5'>
                <p className='font-normal'>{post?.content}</p>
               <div className='w-1/3'>
                <ul className='flex flex-row justify-between text-gray-500 text-sm p-1.5'>
                    {post.tag.map((tag, index) => (
                    <li key={index} className='bg-white shadow-sm rounded-md shadow-gray-500 px-1'>
                        {tag}
                    </li>
                     ))}
                    </ul>

               </div>
            </div>
            <hr />
            <div className='flex justify-between py-1 my-1 px-5 items-center w-9/12 relative'>
            <div className='text-2xl font-bold relative'>
           {!liked ?<>
            <ThumbsUpSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' onClick={handleLikes}/><span className='text-sm absolute top-1 -right-3'>{post?.likes?.length}</span>
           </>:<> <ThumbsUpSharp color="#DD5746" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' onClick={handleLikes}/><span className='text-sm absolute top-1 -right-3'>{post?.likes?.length}</span></>}
            </div>
            <div className='text-2xl font-bold relative'>
            {!disliked ?<>
              <ThumbsDownSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' onClick={handleDislikes}/><span className='text-sm absolute top-1 -right-3'>{post?.dislikes?.length}</span>
            </>:
            <>
            <ThumbsDownSharp color="#DD5746" className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' onClick={handleDislikes}/><span className='text-sm absolute top-1 -right-3'>{post?.dislikes?.length}</span>
            </>

            }
            </div>
            <div className='text-2xl font-bold relative'>
            <ChatbubbleEllipsesSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' onClick={handleComments}/><span className='text-sm absolute top-1 -right-3'>{post?.comments?.length}</span>
            </div>
            <div className='text-2xl font-bold relative'>
           <PricetagsSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' />
            </div>
            <div className='text-xs text-gray-400 text-end font-bold absolute bottom-2 -right-40'>
                      {currentTimeString}
            </div>
            </div>
            {commentClicked && <div ref={divEl} className='flex flex-col justify-around my-4 overflow-auto w-full max-h-56 px-5 relative'>
                <div className='flex justify-between sticky top-0 backdrop-blur-3xl mb-2'>
                
                <input type="text" className='w-2/3 border  focus:outline-none  px-2 text-base border-gray-400 rounded-md' placeholder='Add your comments' onChange={(e)=>setComments(e.target.value)}/>
                <Button primary rounded className="p-0.5 py-2 text-xs" outline onClick={UpdateComment}> comment </Button>
                </div>
                {
                    elements
                }
                
            </div>}
        </div>
    </>
  )
}

export default Singlepost