import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Comment, CommentStoreMetaData } from "../../utility/types2";
import { RootState } from "../appStore";

const commentEntity = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (comment1, comment2) => comment1.timestamp - comment2.timestamp,
});

const commentSlice = createSlice({
  initialState: commentEntity.getInitialState<CommentStoreMetaData>({
    metaDataMap: {},
  }),
  name: "comment",
  reducers: {},
  extraReducers: {},
});

export const commentReducer = commentSlice.reducer;

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectEntities: selectComments,
  selectIds: selectCommentIds,
  selectTotal: selectTotalComments,
} = commentEntity.getSelectors<RootState>((state) => state.comment);
