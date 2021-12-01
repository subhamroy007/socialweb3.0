import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { imagePostResponseToImagePostConverter } from "../../utility/helpers";
import { ImagePost, ImagePostStoreMetaData } from "../../utility/types2";
import { getImageFeedThunk } from "../appData/reducer";
import { RootState } from "../appStore";

const imagePostEntity = createEntityAdapter<ImagePost>({
  selectId: (imagePost) => imagePost.id,
  sortComparer: (imagePost1, imagePost2) =>
    imagePost1.timestamp - imagePost2.timestamp,
});

const imagePostSlice = createSlice({
  initialState: imagePostEntity.getInitialState<ImagePostStoreMetaData>({
    postMetaDataMap: {},
  }),
  name: "imagePost",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getImageFeedThunk.fulfilled, (state, { payload }) => {
      const imagePostList: ImagePost[] = [];
      payload.list.forEach((imagePostResponse) => {
        imagePostList.push(
          imagePostResponseToImagePostConverter(imagePostResponse)
        );
      });
      imagePostEntity.addMany(state, imagePostList);
    });
  },
});

export const imagePostReducer = imagePostSlice.reducer;

export const {
  selectAll: selectAllImagePosts,
  selectById: selectImagePostById,
  selectEntities: selectImagePosts,
  selectIds: selectImagePostIds,
  selectTotal: selectTotalImagePosts,
} = imagePostEntity.getSelectors<RootState>((state) => state.imagePost);
