/** @format */

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getItem, KEY_ACCESS_TOKEN } from "../utils/localStorageManager";
export const RequireUser = () => {
  const user = getItem(KEY_ACCESS_TOKEN);
  //
  return user ? <Outlet /> : <Navigate to={"/login"} />;
  // return <Outlet />;
};
