import { createAsyncThunk } from "@reduxjs/toolkit";
import { getImageFeed } from "../../utility/clients";
import {
  AppError,
  ImageFeedRequestConfig,
  ImagePostResponse,
  PageInfoWithData,
} from "../../utility/types2";

export const getImageFeedThunk = createAsyncThunk<
  PageInfoWithData<ImagePostResponse>,
  undefined,
  ImageFeedRequestConfig
>(
  "imageFeed",
  async (_, thunkApi) => {
    const pageId =
      thunkApi.getState().appData.screenInfo.imageFeed.pageInfo?.pageNo;

    try {
      const imageFeedResponse = await getImageFeed(
        pageId ? pageId + 1 : 0,
        "",
        {}
      );

      return imageFeedResponse;
    } catch (error) {
      return thunkApi.rejectWithValue(error as AppError, {});
    }
  },
  {
    idGenerator: () => "imageFeed@" + Date.now(),
    dispatchConditionRejection: false,
    condition: (arg, api) => {
      return api.getState().appData.screenInfo.imageFeed.state !== "loading";
    },
  }
);
