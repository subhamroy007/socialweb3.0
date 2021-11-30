import { createSlice } from "@reduxjs/toolkit";
import { AppData, PageInfo } from "../../utility/types2";
import { getImageFeedThunk } from "./reducer";

const appDataIntialState: AppData = {
  screenInfo: {
    imageFeed: {
      state: "idle/init",
    },
  },
};

const appDataSlice = createSlice({
  initialState: appDataIntialState,
  name: "appData",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getImageFeedThunk.pending, (state) => {
        state.screenInfo.imageFeed.state = "loading";
      })
      .addCase(getImageFeedThunk.rejected, (state, action) => {
        state.screenInfo.imageFeed.state = "idle/failure";
        state.screenInfo.imageFeed.error = action.payload;
      })
      .addCase(getImageFeedThunk.fulfilled, (state, { payload }) => {
        state.screenInfo.imageFeed.state = "idle/success";
        const pageResult: PageInfo = {
          noOfPages: payload.noOfPages,
          pageLength: payload.pageLength,
          pageNo: payload.pageNo,
          pageSize: payload.pageSize,
        };
        state.screenInfo.imageFeed.pageInfo = pageResult;
        state.screenInfo.imageFeed.ids = payload.list.map<string>(
          (imagePost) => imagePost.id
        );
      });
  },
});

export const appDataReducer = appDataSlice.reducer;
