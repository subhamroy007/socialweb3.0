import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User, UserEntityMetaData } from "../../utility/types2";
import { RootState } from "../appStore";

const userEntity = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

const userSlice = createSlice({
  initialState: userEntity.getInitialState<UserEntityMetaData>({
    metaDataMap: {},
  }),
  name: "user",
  reducers: {},
  extraReducers: {},
});

export const userReducer = userSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectEntities: selectUsers,
  selectIds: selectUserIds,
  selectTotal: selectTotalUsers,
} = userEntity.getSelectors<RootState>((state) => state.user);
