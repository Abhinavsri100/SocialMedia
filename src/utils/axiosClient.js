/** @format */

import axios from "axios";
import {
  KEY_ACCESS_TOKEN,
  getItem,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "../redux/store";
import { showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";
let baseURL = "http://localhost:4500";
export const axiosClient = axios.create({
  baseURL: "http://localhost:4500",
  withCredentials: true,
});
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});
axiosClient.interceptors.response.use(async (response) => {
  //backend ka data axios ke response .data me hota h
  console.log("interceptor resp", response);
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }
  console.log("aage");
  const originalRequest = response.config;
  const statusCode = data.statusCode;
  const error = data.message;
  console.log("lo data ", data);
  store.dispatch(
    showToast({
      type: TOAST_FAILURE,
      message: data.result || data.message,
    })
  );
  if (
    statusCode === 401 &&
    originalRequest.url === "http://localhost:4500/auth/refresh"
  ) {
    removeItem(KEY_ACCESS_TOKEN);

    window.location.replace("/login", "_self");
    return Promise.reject(error);
  }
  if (statusCode === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const response = await axios
      .create({ withCredentials: true })
      .get(`${baseURL}/auth/refresh`);
    if (response.status === "ok") {
      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.result.accessToken}`;
      return axios(originalRequest);
    } else {
      removeItem(KEY_ACCESS_TOKEN);

      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }
  store.dispatch(
    showToast({
      type: TOAST_FAILURE,
      message: data.result,
    })
  );
  return Promise.reject(error);
});