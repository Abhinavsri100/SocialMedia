/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { useDispatch } from "react-redux";
import { setLoading } from "./appConfigSlice";
import axios from "axios";
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    // const dispatch = useDispatch();
    try {
      // dispatch(setLoading(true));
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/user/getUserProfile", body);
      // setLoading(false);
      console.log("userprofile ", response.result);
      return response.result;
    } catch (e) {
      console.log(e.message);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/like", body);
      console.log("like and unlike ", response);
      return response.result.post;
    } catch (e) {
      console.log(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState: {
    userProfile: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        // console.log("This is", action.payload);
        state.userProfile = action.payload;
      })
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});
export default postsSlice.reducer;
