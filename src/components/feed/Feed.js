/** @format */

import React, { useEffect } from "react";
import { Post } from "../posts/Post";
import { Follower } from "../follower/Follower";
import { Following } from "../following/Following";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
export const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  useEffect(() => {
    dispatch(getFeedData());
    console.log("here is your feed data ", feedData);
  }, [dispatch]);
  return (
    <div className="flex mt-5 flex-row w-11/12 justify-center">
      <div className=" left over ">
        {feedData?.posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
      <div className="right min-h-[500px] w-[30%] mx-12">
        <div>
          <div className="flex mb-4">
            <h2 className="text-2xl font-semibold">You Are Following</h2>
          </div>
          <div className="h-[300px] overflow-scroll">
            {" "}
            {feedData.followings?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex  mb-4 ">
            {" "}
            <h2 className="text-2xl font-semibold">Suggested To Follow</h2>
          </div>
          <div className="min-h-[300px] overflow-y-auto">
            {feedData?.suggestions?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
