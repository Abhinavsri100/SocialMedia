/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
// import { useDispatch } from "react-redux";

export const getMyPosts = createAsyncThunk(
  "user/getMyInfo",
  async (_, thunkAPI) => {
    // const dispatch = useDispatch();
    try {
      // dispatch(setLoading(true));
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("/user/getMyProfile");
      // setLoading(false);
      // console.log(response);
      return response.result;
    } catch (e) {
      console.log(e.message);
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
// export const logoutMe = createAsyncThunk("/user/logout", async (body) => {
//   setLoading(true);
//   const response = await axiosClient.post("/user/logout");
//   setLoading(false);
// });
// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async (body, thunkAPI) => {
//     try {
//       thunkAPI.dispatch(setLoading(true));
//       const response = await axiosClient.put("/user/", body);
//       // console.log(response);
//       return response.result;
//     } catch (e) {
//       console.log(e.message);
//       return Promise.reject(e);
//     } finally {
//       thunkAPI.dispatch(setLoading(false));
//     }
//   }
// );

const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMyProfile: (state, action) => {
      state.myProfile = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyPosts.fulfilled, (state, action) => {
      // console.log("This is", action.payload);
      state.myProfile = action.payload.user;
    });
    // .addCase(updateProfile.fulfilled, (state, action) => {
    //   state.myProfile = action.payload.user;
    // });
  },
});
export default appConfigSlice.reducer;
export const { setLoading, setMyProfile, showToast } = appConfigSlice.actions;
