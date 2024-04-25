/** @format */

import React, { useEffect, useState } from "react";
import Avatar from "../../assets/man.png";
import { useDispatch, useSelector } from "react-redux";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";
import { useNavigate } from "react-router-dom";
export const Follower = ({ user }) => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const [isFollowing, setIsFollowing] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (feedData.followings.find((item) => item._id === user._id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [feedData]);
  function handleUserFollow() {
    dispatch(followAndUnfollowUser({ userIdTofollow: user._id }));
  }
  return (
    <div className="flex justify-between sm:min-w-[300px] items-center gap-2 mb-2 ">
      <div className="flex flex-row items-center">
        <img
          className="h-[50px] px-5 cursor-pointer"
          src={user?.avatar?.url}
          alt=""
          onClick={() => navigate(`/profile/${user._id}`)}
        />
        <h2>{user?.name}</h2>
      </div>

      <div>
        <button
          className="border border-richblack-200 p-2 px-6 rounded-md text-blue-200  hover:active:bg-blue-200 hover:active:text-white "
          onClick={handleUserFollow}
        >
          {isFollowing ? "Unfollow" : "follow"}
        </button>
      </div>
    </div>
  );
};
