import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { User, UserStoreMetaData } from "../../utility/types2";
import { getImageFeedThunk } from "../appData/reducer";
import { RootState } from "../appStore";

const userEntity = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

const userSlice = createSlice({
  initialState: userEntity.getInitialState<UserStoreMetaData>({
    metaDataMap: {},
  }),
  name: "user",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getImageFeedThunk.fulfilled,
      (state, { payload: { list } }) => {
        const userList: User[] = [];
        list.forEach(({ author }) => {
          const user: User = {
            followerInfo: {
              isFollower: author.isFollower,
              noOfFollowers: author.noOfFollowers,
            },
            followingInfo: {
              isFollowing: author.isFollowing,
            },
            id: author.id,
            profilePictureUrl: author.profilePictureUrl,
            socialId: author.socialId,
            username: author.username,
          };
          userList.push(user);
        });
        userEntity.addMany(state, userList);
      }
    );
  },
});

export const userReducer = userSlice.reducer;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectEntities: selectUsers,
  selectIds: selectUserIds,
  selectTotal: selectTotalUsers,
} = userEntity.getSelectors<RootState>((state) => state.user);
