import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appDataReducer } from "./appData/slice";
import { commentReducer } from "./comment/slice";
import { hashTagReducer } from "./hashTag/slice";
import { imagePostReducer } from "./imagePost/slice";
import { replyReducer } from "./reply/slice";
import { userReducer } from "./user/slice";

//creating a single store for the entire app
const appStore = configureStore({
  reducer: {
    imagePost: imagePostReducer, //reducer slice that interacts with the ImagePostEntity
    user: userReducer, //reducer slice that interacts with the UserEntity
    appData: appDataReducer,
    reply: replyReducer,
    comment: commentReducer,
    hashTag: hashTagReducer,
  },
  // devTools: false, //devtools extension is unnesessary
  // enhancers: [], //no enhancers are added at the moment
  // middleware: (getDefaultMiddleware) => {
  //   //only default thunk, immutability and serialization middlewere are added at the moment
  //   return getDefaultMiddleware();
  // },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default appStore;
