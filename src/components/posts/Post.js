/** @format */

import React from "react";
import Avatar from "../../assets/man.png";
import Nature from "../../assets/nature.png";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../redux/slices/appConfigSlice";
import { TOAST_SUCCESS } from "../../App";
export const Post = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handlePostLiked() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: "Liked Or Unliked",
      })
    );
    dispatch(
      likeAndUnlikePost({
        postId: post._id,
      })
    );
  }
  return (
    <div className="flex flex-col gap-2 min-h-[550px] lg:min-w-[60%] md:min-w-[60%] border border-richblack-200 rounded-md pb-2 mb-2 ">
      <div className=" flex flex-row gap-3 w-[100%] items-center">
        <img
          src={post?.owner?.avatar?.url}
          className="h-[50px] px-2 py-1 cursor-pointer"
          alt=""
          onClick={() => navigate(`/profile/${post.owner._id}`)}
        />

        {/* <div>
          <Avatar />
        </div> */}

        <h2 className="font-semibold">{post?.owner?.name}</h2>
      </div>
      <div className="flex flex-row justify-center">
        <img src={post?.image?.url} className="lg:h-[400px]" alt="" />
      </div>
      <div
        className="flex flex-row gap-3 items-center px-2 cursor-pointer"
        onClick={handlePostLiked}
      >
        {post.isLiked ? (
          <AiFillHeart className="text-3xl text-pink-300" />
        ) : (
          <AiOutlineHeart className="text-3xl" />
        )}

        <h3>{`${post?.likesCount} likes`}</h3>
      </div>
      <p className="caption px-2">{post?.caption}</p>
      <p className="px-2 text-richblack-200">{post?.timeAgo}</p>
    </div>
  );
};
