import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Comment, CommentEntityMetaData, PageInfo } from "../../utility/types";
import { RootState } from "../appStore";

const commentEntity = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (comment1, comment2) => comment1.timestamp - comment2.timestamp,
});

const commentSlice = createSlice({
  initialState: commentEntity.getInitialState<CommentEntityMetaData>({
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
