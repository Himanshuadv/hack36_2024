import React, { useState } from "react";
import profile from "../assets/student.webp";
import { Image } from "react-ionicons";
import { Podium } from "react-ionicons";
import Button from "./Button";
import { PricetagsSharp } from "react-ionicons";
import Dropdown from "./DropDown";
import axios from "axios";
import { toast } from "react-toastify";



function Post({ setPosts, posts }) {
  const [content, setContents] = useState("");
  const [isTag, setIsTag] = useState(false);
  const [tag, setTag] = useState([]);
  const options = [
    {
      id: "22ii",
      name: "commity",
    },
    {
      id: "221i",
      name: "academic",
    },
    {
      id: "22i9",
      name: "sports",
    },
    {
      id: "2i2i",
      name: "events",
    },
    {
      id: "2l2i",
      name: "club",
    },
    {
      id: "2m2i",
      name: "coding",
    },
    {
      id: "2n2i",
      name: "hackthon",
    },
  ];
  const handlePosts = async() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem('name')
    const post = {
      content: content,
      tag: tag,
      id: id,
      name:name,
    };
    
    axios
      .post("http://localhost:3000/api/v1/users/post", post, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        //post is saved successfully that is reply from backend
        if (res.status === 500) {
          toast.warning(res.data.message);
        }
        //  console.log(res);
      })
      .catch((err) => {
        const message = err.response?.data.message;
        toast.warning(message);
        console.log(err);
      });
  };
  const handleTag = (name) => {
    const uniqueTags = new Set([...tag, name]);
    setTag([...uniqueTags]);
  
    setIsTag(false);
  };
  const handleRemoveTag = (indexToRemove) => {
    const updatedTags = tag.filter((_, index) => index !== indexToRemove);
    setTag(updatedTags);
  };
  

  return (
    <div className="flex flex-row  p-2 w-2/3 my-8">
      <img
        src={profile}
        alt="profile"
        className="w-16 h-16 rounded-full mx-2"
      />
      <div className="flex flex-col w-full">
        <input
          type="text"
          placeholder="what is new today"
          value={content}
          className="py-2 px-2 mb-2 border border-gray-400 focus:outline-none rounded-md min-h-fit min-w-fit"
          onChange={(e) => setContents(e.target.value)}
        />
        <div className="flex flex-col ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row w-2/6 justify-evenly">
              <Image
                height="28px"
                width="28px"
                color="#00ADB5"
                className="hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
              />
              <Podium
                height="28px"
                width="28px"
                color="#00ADB5"
                className="hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
              />
              <PricetagsSharp
                height="28px"
                width="28px"
                color="#00ADB5"
                className="hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
                onClick={() => setIsTag(!isTag)}
              />
            </div>

            <Button primary rounded outline onClick={handlePosts}>
              Post
            </Button>
          </div>
          <div>
            {tag.length > 0 ? (
              <div
                className="flex flex-row flex-wrap overflow-scroll w-full "
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {tag.map((tagItem, index) => (
                  <div  key={index}>
                    <span
                     
                      className="bg-white shadow-sm rounded-md shadow-gray-500 px-1 text-sm m-1 cursor-pointer"
                      onClick={() => handleRemoveTag(index)}
                    >
                      {tagItem}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="bg-white shadow-sm rounded-md shadow-gray-500 px-1 text-sm">
                select tag
              </span>
            )}
          </div>
        </div>

        {isTag && (
          <div className="flex w-full mt-2 items-center z-50 p-2">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="p-1 text-sm text-center rounded-md bg-gray-400 m-2 cursor-pointer"
                onClick={() => handleTag(opt.name)}
              >
                {opt.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
