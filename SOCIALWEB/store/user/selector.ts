import { selectUserById } from "./slice";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectSocialId = createDraftSafeSelector<
  [typeof selectUserById],
  string | undefined
>(selectUserById, (user) => user?.socialId);

export const selectUsername = createDraftSafeSelector<
  [typeof selectUserById],
  string | undefined
>(selectUserById, (user) => user?.username);

export const selectProfilePictureUrl = createDraftSafeSelector<
  [typeof selectUserById],
  string | undefined
>(selectUserById, (user) => user?.profilePictureUrl);
