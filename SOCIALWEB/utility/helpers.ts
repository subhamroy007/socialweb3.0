// <--------------TimeElapsed function calculates the time elapsed between current time and given time------------------>

import {
  CommentResponse,
  ImagePost,
  ImagePostResponse,
  PageInfoWithData,
  PostInfo,
  PostResponseInfo,
  ReplyResponse,
  UserInfoWithTimestamp,
} from "./types2";

const timeElapsed = ({ timeStamp }: { timeStamp: number }): string => {
  const currentTime: number = Date.now();
  let elapsedTime = Math.floor((currentTime - timeStamp) / 1000);
  let timeString: string = "";
  if (elapsedTime < 60) {
    timeString = "Just now";
  } else if (elapsedTime >= 60 && elapsedTime < 3600) {
    let time = Math.floor(elapsedTime / 60);
    timeString = time + "min";
  } else if (elapsedTime >= 3600 && elapsedTime < 86400) {
    let time = Math.floor(elapsedTime / 3600);
    timeString = time + "hr";
  } else if (elapsedTime >= 86400 && elapsedTime < 604800) {
    let time = Math.floor(elapsedTime / 86400);
    timeString = time + "d";
  } else if (elapsedTime >= 604800 && elapsedTime < 2592000) {
    let time = Math.floor(elapsedTime / 604800);
    timeString = time + "w";
  } else if (elapsedTime >= 2592000 && elapsedTime < 31104000) {
    let time = Math.floor(elapsedTime / 2592000);
    timeString = time + "m";
  } else {
    let time = Math.floor(elapsedTime / 31104000);
    timeString = time + "y";
  }

  return timeString;
};

// <--------------------CountAbbreviator function truncates the count to small abbreviations------------------>

const countAbbreviator = ({ count }: { count: number }): string => {
  let abbreviation: string = "";
  if (count < 1000) {
    abbreviation = count + " ";
  } else if (count >= 1000 && count < 1000000) {
    if (count < 10000) {
      let newCount = count / 100;
      if (newCount % 10 >= 1) {
        newCount = count / 1000;
        abbreviation = newCount.toFixed(1) + "K";
      } else {
        newCount = Math.floor(count / 1000000);
        abbreviation = newCount + "K";
      }
    } else {
      let newCount = Math.floor(count / 1000);
      abbreviation = newCount + "K";
    }
  } else if (count >= 1000000 && count < 100000000) {
    if (count < 10000000) {
      let newCount = count / 100000;
      if (newCount % 10 >= 1) {
        newCount = count / 1000000;
        abbreviation = newCount.toFixed(1) + "M";
      } else {
        newCount = Math.floor(count / 1000000);
        abbreviation = newCount + "M";
      }
    } else {
      let newCount = Math.floor(count / 1000000);
      abbreviation = newCount + "M";
    }
  } else {
    if (count < 1000000000) {
      let newCount = count / 10000000;
      if (newCount % 10 >= 1) {
        newCount = count / 100000000;
        abbreviation = newCount.toFixed(1) + "B";
      } else {
        newCount = Math.floor(count / 100000000);
        abbreviation = newCount + "B";
      }
    } else {
      let newCount = Math.floor(count / 100000000);
      abbreviation = newCount + "B";
    }
  }
  return abbreviation;
};

// <-------------------TimeFormatter formats the date in AM & PM format-------------------->

const timeFormatter = ({ timestamp }: { timestamp: number }): string => {
  let time = new Date(timestamp);
  let timeString: string = "";
  if (time.getHours() > 12) {
    timeString = time.getHours() - 12 + ":" + time.getMinutes() + "pm";
  } else {
    timeString = time.getHours() + ":" + time.getMinutes() + "am";
  }
  return timeString;
};

// <-------------------DateString formats the timestamp in Month DD YYYY format------------------->

const dateString = ({ timestamp }: { timestamp: number }) => {
  let timestring: string = "";
  let monthString: string = "";
  let time = new Date(timestamp);
  let month: number = time.getMonth();
  let year: number = time.getFullYear();
  let date: number = time.getDate();
  switch (month) {
    case 0:
      monthString = "January";
      break;
    case 1:
      monthString = "February";
      break;
    case 2:
      monthString = "March";
      break;
    case 3:
      monthString = "April";
      break;
    case 4:
      monthString = "May";
      break;
    case 5:
      monthString = "June";
      break;
    case 6:
      monthString = "July";
      break;
    case 7:
      monthString = "August";
      break;
    case 8:
      monthString = "September";
      break;
    case 9:
      monthString = "October";
      break;
    case 10:
      monthString = "November";
      break;
    case 11:
      monthString = "December";
      break;
    default:
      break;
  }
  timestring = monthString + " " + date + " " + year;
  return timestring;
};

export function extractId<T extends { id: string }>(entity: T): string {
  return entity.id;
}

export function postResponseInfoToPostInfo({
  commentInfo,
  hashTagInfo,
  likeInfo,
  shareInfo,
  tagInfo,
  isSaved,
}: PostResponseInfo): PostInfo {
  return {
    isSaved: isSaved,
    commentInfo: {
      count: commentInfo.count,
      filteredUsers: commentInfo.list.map((user) => extractId(user)),
      list: [],
    },
    hashTagInfo: {
      count: hashTagInfo.count,
      list: hashTagInfo.list.map((hashTag) => extractId(hashTag)),
    },
    likeInfo: {
      count: likeInfo.count,
      filteredUsers: likeInfo.list.map((user) => extractId(user)),
      isLiked: likeInfo.isLiked,
      list: [],
    },
    shareInfo: {
      count: shareInfo.count,
      filteredUsers: shareInfo.list.map((user) => extractId(user)),
      list: [],
    },
    tagInfo: {
      count: tagInfo.count,
      list: tagInfo.list.map(extractId),
    },
  };
}

export function imagePostResponseToImagePostConverter(
  imagePostResponse: ImagePostResponse
): ImagePost {
  return {
    author: imagePostResponse.author.id,
    id: imagePostResponse.id,
    images: imagePostResponse.images,
    caption: imagePostResponse.caption,
    timestamp: imagePostResponse.timestamp,
    ...postResponseInfoToPostInfo({
      commentInfo: imagePostResponse.commentInfo,
      hashTagInfo: imagePostResponse.hashTagInfo,
      likeInfo: imagePostResponse.likeInfo,
      shareInfo: imagePostResponse.shareInfo,
      tagInfo: imagePostResponse.tagInfo,
      isSaved: imagePostResponse.isSaved,
    }),
  };
}

export function createKeyExtractor(type: string) {
  return (item: string, index?: number) => type + "@" + item;
}

//<----------------------------------------dummy-data-generator-functions---------------------------------------->

export function generateImageFeedResponse(
  pageId: number
): PageInfoWithData<ImagePostResponse> {
  return {} as PageInfoWithData<ImagePostResponse>;
}

export function generateCommentResponse(
  pageId: number
): PageInfoWithData<CommentResponse> {
  return {} as PageInfoWithData<CommentResponse>;
}

export function generateReplyResponse(
  pageId: number
): PageInfoWithData<ReplyResponse> {
  return {} as PageInfoWithData<ReplyResponse>;
}

export function generateUserInfoWithTimestamp(
  pageId: number
): PageInfoWithData<UserInfoWithTimestamp> {
  return {} as PageInfoWithData<UserInfoWithTimestamp>;
}
