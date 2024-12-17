import React, { createContext, useContext } from "react";
const RouterContext = createContext(null);
export const useRouter = () => {
  return useContext(RouterContext);
};
export const RouterProvider = RouterContext.Provider;
