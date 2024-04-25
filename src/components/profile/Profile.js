/** @format */

import React, { useEffect, useState } from "react";
import { Post } from "../posts/Post";
import Avatar from "../../assets/man.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../createPost/CreatePost";
import { getUserProfile } from "../../redux/slices/postsSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
export const Profile = () => {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  const params = useParams();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const dispatch = useDispatch();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile({ userId: params.userId }));
    console.log("params", params);
    console.log("redux wala", userProfile);
    setIsMyProfile(myProfile?._id === params.userId);
    setIsFollowing(
      feedData?.followings?.find((item) => item._id === params.userId)
    );
  }, [myProfile, params.userId, feedData]);
  function handleUserFollow() {
    dispatch(followAndUnfollowUser({ userIdTofollow: params.userId }));
  }
  return (
    <div className="lg:flex lg:flex-row sm:flex sm:flex-col-reverse   mt-5 flex-row w-11/12 justify-center">
      <div className=" left ">
        {isMyProfile && <CreatePost />}
        {userProfile?.posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <div className="flex  flex-col sm:mb-2 sm:pb-3 mx-20 border max-h-[400px] min-w-[350px] rounded-md gap-2">
        <div className="flex justify-center mt-2">
          <img
            className="h-[100px] px-5 cursor-pointer"
            src={userProfile?.avatar?.url}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-2">
          <h2 className="font-semibold">{userProfile?.name}</h2>
          <p className="text-richblack-200">{userProfile?.bio}</p>
        </div>
        <div className="flex justify-center mt-2 gap-20">
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              {userProfile?.followers?.length}
            </div>
            <div className="font-semibold">Followers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold">
              {userProfile?.followings?.length}
            </div>
            <div className="font-semibold">Following</div>
          </div>
        </div>
        {!isMyProfile && (
          <button
            className="border border-richblack-200 p-2 px-6 rounded-md text-blue-200  hover:active:bg-blue-200 hover:active:text-white "
            onClick={handleUserFollow}
          >
            {isFollowing ? "Unfollow" : "follow"}
          </button>
        )}
        {isMyProfile && (
          <div className="flex flex-row justify-center mt-2 ">
            <button
              onClick={() => navigate("/updateProfile")}
              className=" border  py-2 px-16 rounded-md border-blue-100 text-blue-100"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
