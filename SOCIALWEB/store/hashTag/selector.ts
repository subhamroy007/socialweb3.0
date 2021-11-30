import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { selectHashTagById } from "./slice";

export const selectName = createDraftSafeSelector<
  [typeof selectHashTagById],
  string | undefined
>(selectHashTagById, (hashTag) => hashTag?.name);

export const selectUploads = createDraftSafeSelector<
  [typeof selectHashTagById],
  number | undefined
>(selectHashTagById, (hashTag) => hashTag?.uploads.noOfUploads);
