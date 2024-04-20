import React,{useEffect, useState,useRef} from 'react'
import { ThumbsUpSharp } from 'react-ionicons'
import { ThumbsDownSharp } from 'react-ionicons'
import { ChatbubbleEllipsesSharp } from 'react-ionicons'
import user from '../assets/user.avif'
import { PricetagsSharp } from 'react-ionicons'
import Button from './Button'

import logo from '../assets/hacker.png'
function Singlepost() {
    const [likes,setLikes] = useState(0)
    const [dislikes,setDislikes] = useState(0)
    const [comments,setComments] = useState('')
    const [liked,setLiked] = useState(false)
    const [disliked,setDisliked] = useState(false)
    const [commentClicked,setCommentClicked] = useState(false)
    const divEl = useRef();
    const handleComments = ()=>{
        setCommentClicked(!commentClicked)
    }

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
        if(disliked){
            setDisliked(false)
            setDislikes(dislikes-1)
            setLikes(likes+1)
            setLiked(true)
        }else if(liked){
            setLikes(likes-1);
            setLiked(false)
        }else{
            setLikes(likes+1)
            setLiked(true)
        }

        
    }
    const handleDislikes = ()=>{
       if(liked){
            setLiked(false)
            setLikes(likes-1)
            setDislikes(dislikes+1)
            setDisliked(true)
        }else if(disliked){
            setDislikes(dislikes-1);
            setDisliked(false)
        }else{
            setDislikes(likes+1)
            setDisliked(true)
        }
    }
    const elements = [];
    
    for (let i = 0; i < 8; i++) {
        elements.push(<div key={i} className='my-2'> Here goes comments 
        </div>);
      }
  return (
    <>
        <div className='flex flex-col rounded-md border-b border-t shadow-md border-nav w-2/3 my-4'>
            <div className='flex justify-start items-center my-2'>
                <div className='flex'>
                <img className='h-12 w-12 mx-2 border-gray-600 bg-red-400' src={user} alt="logo" />
                    <div className='flex flex-col'>
                        <p>Name</p>
                        <p>Caption</p>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex w-full justify-center py-2 px-5'>
                <p className='font-normal'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi temporibus in quibusdam voluptatum veritatis molestiae, laboriosam fugiat nisi vitae.</p>
            </div>
            <hr />
            <div className='flex justify-between py-1 my-1 px-5 items-center w-9/12'>
            <div className='text-2xl font-bold relative'>
            <ThumbsUpSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer' onClick={handleLikes}/><span className='text-sm absolute top-1 -right-3'>{likes}</span>
            </div>
            <div className='text-2xl font-bold relative'>
            <ThumbsDownSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' onClick={handleDislikes}/><span className='text-sm absolute top-1 -right-3'>{dislikes}</span>
            </div>
            <div className='text-2xl font-bold relative'>
            <ChatbubbleEllipsesSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' onClick={handleComments}/><span className='text-sm absolute top-1 -right-3'>0</span>
            </div>
            <div className='text-2xl font-bold relative'>
           <PricetagsSharp className='hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer ' />
            </div>
            </div>
            {commentClicked && <div ref={divEl} className='flex flex-col justify-around my-4 overflow-auto w-full max-h-56 px-5 relative'>
                <div className='flex justify-between sticky top-0 backdrop-blur-3xl mb-2'>
                
                <input type="text" className='w-2/3 border  focus:outline-none  px-2 text-base border-gray-400 rounded-md' placeholder='Add your comments'/>
                <Button primary rounded className="p-0 text-sm" outline> comment </Button>
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