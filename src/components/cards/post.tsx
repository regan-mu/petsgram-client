import { AiOutlineHeart, AiFillHeart, AiOutlineComment   } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Ipost } from "../../types";
import AddComment from "../forms/addComment";
import Comment from "./comments";
import { CLOUDINARY_IMG_PREFIX } from "../../constants";
import { likePost, unlikePost } from "../../utils/APIRequests";

const Post: React.FC<{post: Ipost}> = ({post}) => {
    const {id, image, likes, message, owner, age, comments } = post;
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const [popComments, setPopComments] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(0);

    const {mutateAsync: likeMutation} = useMutation({mutationFn: () => likePost(id), mutationKey: ["addLike"]});
    const {mutateAsync: unlikeMutation} = useMutation({mutationFn: () => unlikePost(id), mutationKey: ["removeLike"]});

    useEffect(() => {
        setLikesCount(likes.length);
        checkLiked();
    }, []);

    const checkLiked = () => {
        const userID = localStorage.getItem("user");
        likes.forEach(like => {
            if (like.owner === Number(userID)) {
                setLiked(true);
            }
        });
    }

    const toggleCaption = () => {
        setExpanded(!isExpanded);
    }

    const toggleComments = () => {
        setPopComments(!popComments);
    }

    const addLike = async () => {
        setLiked(!liked);
        if (!liked) {
            await likeMutation();
            setLikesCount(likesCount + 1);
        } else {
            await unlikeMutation();
            setLikesCount(likesCount - 1);
        }
    }

    return (
      <div className="bg-white border rounded-md shadow-sm mb-6">
        {popComments && <Comment id={id} image={image} postCaption={post.message} postAge={post.age} owner={owner} closePopup={toggleComments} />}
        {/* User info */}
        <div className="flex items-center p-4">
            <a href={`/profile/${owner.id}`} className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                <img className="w-full h-full object-cover" src={`${CLOUDINARY_IMG_PREFIX}${owner.avatar}`} alt={owner.username} />
            </a>
            <div className="flex h-max items-center gap-2">
                <a href={`/profile/${owner.id}`} className="font-semibold">{owner.username}</a>
                <div className="w-[4px] h-[4px] rounded-full bg-black"></div>
                <p>{age}</p>
            </div>
        </div>
        {/* Post image */}
        <div className="w-full">
          <img src={`${CLOUDINARY_IMG_PREFIX}${image}`} alt="Post content" className="w-full object-cover" />
        </div>
  
        {/* Post actions */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex space-x-3">
            <button onClick={addLike}>
                {liked ? <AiFillHeart size={24} color={"red"} /> : <AiOutlineHeart size={24} />}
            </button>
            <button onClick={toggleComments}>
                <AiOutlineComment size={24} />
            </button>
          </div>
        </div>
  
        {/* Post likes */}
        <div className="px-4 pb-2">
          <span className="font-semibold">{likesCount} likes</span>
        </div>
  
        {/* Post caption */}
        <div className="px-4 pb-2">
            <div className={`transition-all duration-300 ${isExpanded ? "" : "line-clamp-2"}`}>
                <a href={`/profile/${owner.id}`} className="font-semibold mr-2">{owner.username}</a>
                <span className="text-gray-700" >{message}</span>
            </div>
            {message.length > 100 && (
                <button onClick={toggleCaption} className="text-gray-400">
                    {isExpanded ? 'Less' : 'More'}
                </button>
            )}
        </div>
  
        {/* View comments (static example) */}
        <div className="px-4 pb-2 text-gray-500 cursor-pointer" onClick={toggleComments}>
          {`View all ${comments.length} comments`}
        </div>
  
        {/* Add a comment */}
        <div className="px-4 py-2">
            <AddComment postID={id} />
        </div>
      </div>
    );
  };
  
  export default Post;