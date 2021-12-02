import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { TaskState } from "../../utility/types";
import { RootState } from "../appStore";

export const selectState = createDraftSafeSelector<
  [(state: RootState) => TaskState],
  TaskState
>(
  (state) => state.appData.screenInfo.imageFeed.state,
  (state) => state
);

export const selectImageFeedIds = createDraftSafeSelector<
  [(state: RootState) => string[] | undefined],
  string[] | undefined
>(
  (state) => state.appData.screenInfo.imageFeed.ids,
  (state) => state
);
