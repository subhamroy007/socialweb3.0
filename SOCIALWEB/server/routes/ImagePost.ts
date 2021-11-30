import {
  HashTagInfo,
  ImagePostResponse,
  PageInfoWithData,
  UserInfo,
} from "../../utility/types2";
import HASHTAG from "../data/HashTag";
import IMAGE_POST from "../data/imagePost";
import USER from "../data/User";

const PAGE_SIZE = 5;

const TAG_PAGE_SIZE = 15;

const HASHTAG_PAGE_SIZE = 20;

const extractHashTag = (id: string): HashTagInfo => {
  const resut = HASHTAG.find((hashtag) => hashtag.id === id)!;

  return { id: resut.id, name: resut.name };
};

const extractUser = (author: string, id: string): UserInfo => {
  const result = USER.find((user) => user.id === author)!;

  return {
    id: result.id,
    isFollower:
      result.followerInfo.list.findIndex((user) => user.id === id) !== -1,
    isFollowing:
      result.followingInfo.list.findIndex((user) => user.id === id) !== -1,
    profilePictureUrl: result.profilePictureUrl,
    socialId: result.socialId,
    username: result.username,
  };
};

const extractFilteredUsers = (id: string): UserInfo[] => {
  const listSize = Math.min(Math.ceil(Math.random() * 2), 2);
  const result: UserInfo[] = [];
  for (let i = 1; i <= listSize; i++) {
    const userIndex = Math.min(
      Math.ceil(Math.random() * USER.length),
      USER.length - 1
    );
    result.push(extractUser(USER[userIndex].id, id));
  }
  return result;
};

export const serveImageFeed = (
  pageId: number,
  userId: string
): PageInfoWithData<ImagePostResponse> => {
  const startIndex = pageId * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const result: ImagePostResponse[] = IMAGE_POST.slice(
    startIndex,
    endIndex
  ).map((imagePost) => {
    const author = extractUser(imagePost.author, userId);

    const tagList = imagePost.tagInfo.list
      .slice(0, TAG_PAGE_SIZE)
      .map<UserInfo>((tag) => extractUser(tag, userId));

    const hashtagList = imagePost.hashTagInfo.list
      .slice(0, HASHTAG_PAGE_SIZE)
      .map<HashTagInfo>((hashtag) => extractHashTag(hashtag));

    return {
      author,
      id: imagePost.id,
      caption: imagePost.caption,
      timestamp: imagePost.timestamp,
      images: imagePost.images,
      commentInfo: {
        noOfComments: imagePost.commentInfo.count,
        filteredUsers: extractFilteredUsers(userId),
      },
      likeInfo: {
        isLiked:
          imagePost.likeInfo.list.findIndex((user) => user.id === userId) !==
          -1,
        noOfLikes: imagePost.likeInfo.count,
        filteredUsers: extractFilteredUsers(userId),
      },
      shareInfo: {
        noOfShares: imagePost.shareInfo.count,
        filteredUsers: extractFilteredUsers(userId),
      },
      tagInfo: {
        noOfTags: imagePost.tagInfo.count,
        pageInfo: {
          noOfPages: Math.ceil(imagePost.tagInfo.count / TAG_PAGE_SIZE),
          pageSize: TAG_PAGE_SIZE,
          pageLength: tagList.length,
          list: tagList,
          pageNo: 0,
        },
      },
      hashTagInfo: {
        noOfHashTags: imagePost.hashTagInfo.count,
        pageInfo: {
          noOfPages: Math.ceil(imagePost.hashTagInfo.count / HASHTAG_PAGE_SIZE),
          pageNo: 0,
          pageSize: HASHTAG_PAGE_SIZE,
          pageLength: hashtagList.length,
          list: hashtagList,
        },
      },
    };
  });

  return {
    noOfPages: Math.ceil(IMAGE_POST.length / PAGE_SIZE),
    pageLength: result.length,
    pageNo: pageId,
    pageSize: PAGE_SIZE,
    list: result,
  };
};
