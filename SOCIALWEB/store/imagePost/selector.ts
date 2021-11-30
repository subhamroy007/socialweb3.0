import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { ImageInfo, ImagePost, User } from "../../utility/types2";
import { RootState } from "../appStore";
import { selectUserById } from "../user/slice";
import { selectImagePostById } from "./slice";

export const selectAuthorSocialId = createDraftSafeSelector<
  [(state: RootState, postId: string) => User | undefined],
  string | undefined
>(
  (state, postId) => {
    const imagePost = selectImagePostById(state, postId);

    if (!imagePost) {
      return undefined;
    }

    return selectUserById(state, imagePost.author);
  },
  (user) => user?.socialId
);

export const selectTimestamp = createDraftSafeSelector<
  [typeof selectImagePostById],
  number | undefined
>(selectImagePostById, (imagePost) => imagePost?.timestamp);

export const selectImageList = createDraftSafeSelector<
  [typeof selectImagePostById],
  ImageInfo[] | undefined
>(selectImagePostById, (imagePost) => imagePost?.images);
