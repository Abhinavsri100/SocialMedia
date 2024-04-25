/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postsSlice";
export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (_, thunkAPI) => {
    // const dispatch = useDispatch();
    try {
      // dispatch(setLoading(true));
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getFeedData");
      // setLoading(false);
      console.log("feed data ", response.result);
      return response.result;
    } catch (e) {
      console.log(e.message);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const followAndUnfollowUser = createAsyncThunk(
  "user/followAndUnfollow",
  async (body, thunkAPI) => {
    try {
      // dispatch(setLoading(true));
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/follow", body);
      // setLoading(false);
      // console.log("follow data ", response.result);
      return response.result.user;
    } catch (e) {
      console.log(e.message);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        // console.log("This is", action.payload);
        state.feedData = action.payload;
        console.log("fd ", state.feedData);
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;

        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        console.log("feed like", post, index);
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings.findIndex(
          (item) => item._id === user._id
        );
        if (index != -1) {
          state?.feedData?.followings.splice(index, 1);
        } else {
          state?.feedData?.followings.push(user);
        }
      });
  },
});
export default feedSlice.reducer;
