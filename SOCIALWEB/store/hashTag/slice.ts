import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { HashTag } from "../../utility/types2";
import { getImageFeedThunk } from "../appData/reducer";
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
  extraReducers: (builder) => {
    builder.addCase(
      getImageFeedThunk.fulfilled,
      (state, { payload: { list } }) => {
        const hashTagList: HashTag[] = [];
        list.forEach(({ hashTagInfo: { list } }) => {
          list.forEach((hashTagInfo) => {
            const hashTag: HashTag = {
              id: hashTagInfo.id,
              name: hashTagInfo.name,
              saveInfo: { isSaved: hashTagInfo.isSaved },
              uploads: { noOfUploads: hashTagInfo.noOfUploads },
            };
            hashTagList.push(hashTag);
          });
        });
        hashTagEntity.addMany(state, hashTagList);
      }
    );
  },
});

export const hashTagReducer = hashTagSlice.reducer;

export const {
  selectAll: selectAllHashTags,
  selectById: selectHashTagById,
  selectEntities: selectHashTags,
  selectIds: selectHashTagIds,
  selectTotal: selectTotalHashTag,
} = hashTagEntity.getSelectors<RootState>((state) => state.hashTag);
