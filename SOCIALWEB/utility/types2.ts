//----------------------------------------common-types-----------------------------------------------------

import { StyleProp, ViewStyle } from "react-native";
import { ImageStyle, ResizeMode, Source } from "react-native-fast-image";
import { AppDispatch, RootState } from "../store/appStore";

export interface GeneralInfo extends IdTimeStampPair {
  author: string;
}

export interface CountListPair<T> {
  count: number;
  list: T[];
}

//a utility type to represent user data
export interface UserInfo {
  id: string;
  socialId: string;
  username: string;
  profilePictureUrl: string;
  isFollower: boolean;
  isFollowing: boolean;
  noOfFollowers: number;
}

export interface UserInfoWithTimestamp extends UserInfo {
  timestamp: number;
}

//defining the generic id and timestamp pair interface
export interface IdTimeStampPair {
  id: string; //generic id
  timestamp: number; //generic timestamp
}

//generic image info interface
export interface ImageInfo {
  url: string; //url of the image
  width: number; //width of the image in pixels
  height: number; //height of the image in pixels
}

export interface Link {
  title: string;
  url: string;
  icon: string;
}

export interface PageInfo {
  pageNo: number;
  pageLength: number;
  pageSize: number;
  noOfPages: number;
}

export interface PageInfoWithData<T> extends PageInfo {
  list: T[];
}

export interface HashTagInfo {
  id: string;
  name: string;
  isSaved: boolean;
  noOfUploads: number;
}

export interface ImagePostInfo {
  id: string;
  images: ImageInfo[];
}

export interface BadgeProps {
  count: number;
  style?: StyleProp<ViewStyle>;
}
export interface UserChatContactProps {
  avatarUrl: string;
  name: string;
  timeStamp: string;
  text: string;
  unreadCount: number;
  style?: StyleProp<ViewStyle>;
}

export interface Size {
  original: number;
  max: number;
  min: number;
}

export interface ImageConfig {
  source: Source;
  style: StyleProp<ImageStyle>;
  resizeMode: ResizeMode;
}

//-----------------------------------api-response-types-----------------------------------------

export interface GeneralResponseInfo extends IdTimeStampPair {
  author: UserInfo;
}

export interface PostResponseInfo {
  isSaved: boolean;
  likeInfo: CountListPair<UserInfo> & { isLiked: boolean };
  commentInfo: CountListPair<UserInfo>;
  shareInfo: CountListPair<UserInfo>;
  tagInfo: CountListPair<UserInfo>;
  hashTagInfo: CountListPair<HashTagInfo>;
}

export interface ImagePostResponse
  extends GeneralResponseInfo,
    PostResponseInfo {
  images: ImageInfo[];
  caption: string;
}

export interface ReplyResponse extends GeneralResponseInfo {
  content: string;
  likeInfo: {
    noOfLikes: number;
    isLiked: boolean;
  };
}

export interface CommentResponse extends ReplyResponse {
  noOfReplies: number;
}

//--------------------------------------------redux-store-types-----------------------------------------
//utility type to represent any aribtrary task state
export type TaskState =
  | "idle/init"
  | "idle/success"
  | "loading"
  | "idle/failure";

//a utility type to create custom errors in the app
export interface AppError {
  code: number;
  message: string;
  reasons?: {
    [key: string]: string;
  };
}

export interface AppData {
  screenInfo: {
    imageFeed: {
      ids?: string[];
      error?: AppError;
      pageInfo?: PageInfo;
      state: TaskState;
    };
  };
}

export type ImageFeedRequestConfig = {
  /** return type for `thunkApi.getState` */
  state: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch: AppDispatch;

  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue: AppError;
  /** return type of the `serializeError` option callback */
  serializedErrorType: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta: any;
};

export interface PostInfo {
  isSaved: boolean;
  likeInfo: CountListPair<IdTimeStampPair> & {
    isLiked: boolean;
    filteredUsers: string[];
  };
  commentInfo: CountListPair<IdTimeStampPair> & {
    filteredUsers: string[];
  };
  shareInfo: CountListPair<IdTimeStampPair> & {
    filteredUsers: string[];
  };
  tagInfo: CountListPair<string>;
  hashTagInfo: CountListPair<string>;
}

export interface ImagePost extends GeneralInfo, PostInfo {
  images: ImageInfo[];
  caption: string;
}

export interface PostStoreMetaData {
  commentInfo: PageInfo;
  likeInfo: PageInfo;
  shareInfo: PageInfo;
  tagInfo: PageInfo;
  hashTagInfo: PageInfo;
}

export type PostStoreMetaDataMap = {
  [key: string]: PostStoreMetaData;
};

export interface ImagePostStoreMetaData {
  postMetaDataMap: PostStoreMetaDataMap;
}

export interface User {
  id: string;
  socialId: string;
  username: string;
  profilePictureUrl: string;
  bio?: string;
  links?: CountListPair<Link>;
  followerInfo: {
    noOfFollowers: number;
    isFollower: boolean;
    followers?: IdTimeStampPair[];
    filteredUsers?: UserInfo[];
  };
  followingInfo: {
    noOfFollowings?: number;
    isFollowing: boolean;
    followings?: IdTimeStampPair[];
  };
  uploads?: {
    noOfUploads: number;
    imagePosts: CountListPair<string>;
  };
  saves?: {
    noOfSaves: number;
    imagePosts: CountListPair<string>;
    hashtags: CountListPair<string>;
  };
  tags?: {
    noOfTags: number;
    imagePosts: CountListPair<string>;
  };
}

export interface UserMetaData {
  followerInfo: PageInfo;
  followingInfo: PageInfo;
  uploadsInfo: {
    imagePostInfo: PageInfo;
  };
  savesInfo: {
    imagePostInfo: PageInfo;
    hashTagInfo: PageInfo;
  };
  tagsInfo: {
    imagePostInfo: PageInfo;
  };
}

export type UserMetaDataMap = {
  [key: string]: UserMetaData;
};

export interface UserStoreMetaData {
  metaDataMap: UserMetaDataMap;
}

export interface HashTag {
  id: string;
  name: string;
  saveInfo: {
    noOfSaves?: number;
    isSaved: boolean;
    saves?: IdTimeStampPair[];
  };
  uploads: {
    noOfUploads: number;
    imagePosts?: CountListPair<string>;
  };
}

export interface HashTagMetaData {
  saveInfo: PageInfo;
  uploads: {
    imagePosts: PageInfo;
  };
}

export type HashTagMetaDataMap = {
  [key: string]: HashTagMetaData;
};

export interface HashTagStoreMetaData {
  metaDataMap: HashTagMetaDataMap;
}

export interface Reply extends GeneralInfo {
  content: string;
  likeInfo: {
    noOfLikes: number;
    isLiked: boolean;
    likes: IdTimeStampPair[];
  };
}

export interface ReplyMetaData {
  likeInfo: PageInfo;
}

export interface ReplyMetaDataMap {
  [key: string]: ReplyMetaData;
}

export interface ReplyStoreMetaData {
  metaDataMap: ReplyMetaDataMap;
}

export interface Comment extends Reply {
  replyInfo: CountListPair<IdTimeStampPair>;
}

export interface CommentMetaData extends ReplyMetaData {
  replyInfo: PageInfo;
}

export interface CommentMetaDataMap {
  [key: string]: CommentMetaData;
}

export interface CommentStoreMetaData {
  metaDataMap: CommentMetaDataMap;
}
