import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { HashTag } from "../../utility/types2";
import { RootState } from "../appStore";

const hashTagEntity = createEntityAdapter<HashTag>({
  selectId: (hashTag) => hashTag.id,
  sortComparer: (hashTag1, hashTag2) =>
    hashTag1.uploads.noOfUploads - hashTag2.uploads.noOfUploads,
});

const hashTagSlice = createSlice({
  initialState: hashTagEntity.getInitialState(),
  name: "hashTag",
  reducers: {},
  extraReducers: {},
});

export const hashTagReducer = hashTagSlice.reducer;

export const {
  selectAll: selectAllHashTags,
  selectById: selectHashTagById,
  selectEntities: selectHashTags,
  selectIds: selectHashTagIds,
  selectTotal: selectTotalHashTag,
} = hashTagEntity.getSelectors<RootState>((state) => state.hashTag);
