import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  ImagePost,
  ImagePostResponse,
  ImagePostStoreMetaData,
  PostInfo,
  PostResponseInfo,
} from "../../utility/types2";
import { getImageFeedThunk } from "../appData/reducer";
import { RootState } from "../appStore";

function extractId<T extends { id: string }>(entity: T): string {
  return entity.id;
}

const postResponseInfoToPostInfo = ({
  commentInfo,
  hashTagInfo,
  likeInfo,
  shareInfo,
  tagInfo,
}: PostResponseInfo): PostInfo => {
  return {
    commentInfo: {
      filteredUsers: commentInfo.filteredUsers.map(extractId),
      noOfComments: commentInfo.noOfComments,
    },
    hashTagInfo: {
      count: hashTagInfo.noOfHashTags,
      list: hashTagInfo.pageInfo.list.map(extractId),
    },
    likeInfo: {
      filteredUsers: likeInfo.filteredUsers.map(extractId),
      isLiked: likeInfo.isLiked,
      noOfLikes: likeInfo.noOfLikes,
    },
    shareInfo: {
      filteredUsers: shareInfo.filteredUsers.map(extractId),
      noOfShares: shareInfo.noOfShares,
    },
    tagInfo: {
      count: tagInfo.noOfTags,
      list: tagInfo.pageInfo.list.map(extractId),
    },
  };
};

const imagePostResponseToImagePostConverter = (
  imagePostResponse: ImagePostResponse
): ImagePost => {
  return {
    author: imagePostResponse.author.id,
    id: imagePostResponse.id,
    images: imagePostResponse.images,
    caption: imagePostResponse.caption,
    timestamp: imagePostResponse.timestamp,
    ...postResponseInfoToPostInfo({
      commentInfo: imagePostResponse.commentInfo,
      hashTagInfo: imagePostResponse.hashTagInfo,
      likeInfo: imagePostResponse.likeInfo,
      shareInfo: imagePostResponse.shareInfo,
      tagInfo: imagePostResponse.tagInfo,
    }),
  };
};

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
