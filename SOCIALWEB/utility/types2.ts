//----------------------------------------common-types-----------------------------------------------------

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
}

//----------------------------------------server-entity-types-----------------------------------------------------

export interface ReplyEntity extends GeneralInfo {
  content: string;
  likeInfo: CountListPair<IdTimeStampPair>;
}

export interface CommentEntity extends ReplyEntity {
  replyInfo: CountListPair<ReplyEntity>;
}

export interface PostEntityInfo {
  likeInfo: CountListPair<IdTimeStampPair>;
  commentInfo: CountListPair<CommentEntity>;
  shareInfo: CountListPair<IdTimeStampPair>;
  tagInfo: CountListPair<string>;
  hashTagInfo: CountListPair<string>;
}

export interface ImagePostEntity extends GeneralInfo, PostEntityInfo {
  images: ImageInfo[];
  caption: string;
}

export interface HashTagEntity {
  id: string;
  name: string;
  saveInfo: CountListPair<IdTimeStampPair>;
  uploads: {
    noOfUploads: number;
    imagePosts: CountListPair<string>;
  };
}

export interface UserEntity extends IdTimeStampPair {
  socialId: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
  links: CountListPair<Link>;
  followerInfo: CountListPair<IdTimeStampPair>;
  followingInfo: CountListPair<IdTimeStampPair>;
  uploads: {
    noOfUploads: number;
    imagePosts: CountListPair<string>;
  };
  saves: {
    noOfSaves: number;
    imagePosts: CountListPair<string>;
    hashTags: CountListPair<string>;
  };
  tags: {
    noOfTags: number;
    imagePosts: CountListPair<string>;
  };
}

//-----------------------------------api-response-types-----------------------------------------

export interface GeneralResponseInfo {
  id: string;
  timestamp: number;
  author: UserInfo;
}

export interface PostResponseInfo {
  likeInfo: {
    noOfLikes: number;
    isLiked: boolean;
    filteredUsers: UserInfo[];
  };
  commentInfo: {
    noOfComments: number;
    filteredUsers: UserInfo[];
  };
  shareInfo: {
    noOfShares: number;
    filteredUsers: UserInfo[];
  };
  tagInfo: {
    noOfTags: number;
    pageInfo: PageInfoWithData<UserInfo>;
  };
  hashTagInfo: {
    noOfHashTags: number;
    pageInfo: PageInfoWithData<HashTagInfo>;
  };
}

export interface ImagePostResponse
  extends GeneralResponseInfo,
    PostResponseInfo {
  images: ImageInfo | ImageInfo[];
  caption?: string;
}

//--------------------------------------------redux-store-types-----------------------------------------

export interface PostInfo {
  likeInfo: {
    noOfLikes: number;
    isLiked: boolean;
    filteredUsers: string[];
  };
  commentInfo: {
    noOfComments: number;
    filteredUsers: string[];
  };
  shareInfo: {
    noOfShares: number;
    filteredUsers: string[];
  };
  tagInfo: CountListPair<string>;
  hashTagInfo: CountListPair<string>;
}

export interface ImagePost extends GeneralInfo, PostInfo {
  images: ImageInfo[];
  caption?: string;
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

export interface User {
  id: string;
  socialId: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
  links: CountListPair<Link>;
  followerInfo: CountListPair<IdTimeStampPair>;
  followingInfo: CountListPair<IdTimeStampPair>;
  uploads: {
    noOfUploads: number;
    imagePosts: CountListPair<string>;
  };
  saves: {
    noOfSaves: number;
    imagePosts: CountListPair<string>;
    hashtags: CountListPair<string>;
  };
  tags: {
    noOfTags: number;
    imagePosts: CountListPair<string>;
  };
}

export interface UserMetaData {
  linkInfo: PageInfo;
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

export interface UserEntityMetaData {
  metaDataMap: UserMetaDataMap;
}

export interface HashTag {
  id: string;
  name: string;
  saveInfo: {
    noOfSaves: number;
    isSaved: boolean;
    saves: IdTimeStampPair[];
  };
  uploads: {
    noOfUploads: number;
    imagePosts: CountListPair<string>;
  };
}
