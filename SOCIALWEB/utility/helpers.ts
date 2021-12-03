import { getImageFeedThunk } from "./../store/appData/reducer";
import {
    IMAGE_POST_RESPONSE_PAGE_SIZE,
    USER_INFO_WITH_TIMESTAMP_PAGE_SIZE,
} from "./constants";
import { CountListPair, HashTagInfo, ImageInfo, UserInfo } from "./types2";
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
import faker from "faker";
import { max } from "react-native-reanimated";

export const timeElapsed = ({ timeStamp }: { timeStamp: number }): string => {
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

export const countAbbreviator = ({ count }: { count: number }): string => {
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

export const timeFormatter = ({ timestamp }: { timestamp: number }): string => {
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

export const dateString = ({ timestamp }: { timestamp: number }) => {
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

const generateCountListPairForUserInfo = (): CountListPair<UserInfo> => {
    let list: UserInfo[] = [];
    const count: number = faker.datatype.number(1000);
    for (let i = 0; i < count; i++) {
        const user: UserInfo = {
            id: "UserId_" + faker.datatype.uuid(),
            socialId: "SocialId_" + faker.datatype.uuid(),
            username: faker.name.findName(),
            profilePictureUrl: faker.image.imageUrl(),
            isFollower: faker.datatype.boolean(),
            isFollowing: faker.datatype.boolean(),
            noOfFollowers: faker.datatype.number(),
        };
        list.push(user);
    }
    return { count, list } as CountListPair<UserInfo>;
};

const generateCountListPairForHashTagInfo = (): CountListPair<HashTagInfo> => {
    let list: HashTagInfo[] = [];
    const count: number = faker.datatype.number(1000);
    for (let i = 0; i < count; i++) {
        const hashTag: HashTagInfo = {
            id: "HashTagId_" + faker.datatype.uuid(),
            name: faker.lorem.word(),
            isSaved: faker.datatype.boolean(),
            noOfUploads: faker.datatype.number(),
        };
        list.push(hashTag);
    }
    return { count, list } as CountListPair<HashTagInfo>;
};

const generateImagesList = (): ImageInfo[] => {
    const length = faker.datatype.number(10);
    let list: ImageInfo[] = [];
    for (let i = 0; i < length; i++) {
        const image: ImageInfo = {
            url: faker.image.imageUrl(),
            height: faker.datatype.number(1080),
            width: faker.datatype.number(1080),
        };
        list.push(image);
    }
    return list;
};

export function generateImageFeedResponse(
    pageId: number
): PageInfoWithData<ImagePostResponse> {
    let pageNo: number = pageId;
    const pageSize: number = IMAGE_POST_RESPONSE_PAGE_SIZE;
    const noOfPages: number = 9999999;
    let list: ImagePostResponse[] = [];
    for (let i = 0; i < pageSize; i++) {
        if (pageNo <= noOfPages) {
            const imagePost: ImagePostResponse = {
                id: "ImageId_" + faker.datatype.uuid(),
                timestamp: faker.time.recent(),
                author: {
                    id: "UserId_" + faker.datatype.uuid(),
                    socialId: "SocialId_" + faker.datatype.uuid(),
                    username: faker.name.findName(),
                    profilePictureUrl: faker.image.imageUrl(),
                    isFollower: faker.datatype.boolean(),
                    isFollowing: faker.datatype.boolean(),
                    noOfFollowers: faker.datatype.number(),
                },
                caption: faker.lorem.sentences(),
                images: generateImagesList(),
                isSaved: faker.datatype.boolean(),
                likeInfo: {
                    isLiked: faker.datatype.boolean(),
                    count: generateCountListPairForUserInfo().count,
                    list: generateCountListPairForUserInfo().list,
                },
                commentInfo: {
                    count: generateCountListPairForUserInfo().count,
                    list: generateCountListPairForUserInfo().list,
                },
                shareInfo: {
                    count: generateCountListPairForUserInfo().count,
                    list: generateCountListPairForUserInfo().list,
                },
                tagInfo: {
                    count: generateCountListPairForUserInfo().count,
                    list: generateCountListPairForUserInfo().list,
                },
                hashTagInfo: {
                    count: generateCountListPairForHashTagInfo().count,
                    list: generateCountListPairForHashTagInfo().list,
                },
            };
            list.push(imagePost);
        } else break;
    }
    const pageLength: number = list.length;
    return {
        pageNo,
        pageLength,
        pageSize,
        noOfPages,
        list,
    } as PageInfoWithData<ImagePostResponse>;
}

// export function generateCommentResponse(
//     pageId: number
// ): PageInfoWithData<CommentResponse> {
//     return {} as PageInfoWithData<CommentResponse>;
// }

// export function generateReplyResponse(
//     pageId: number
// ): PageInfoWithData<ReplyResponse> {
//     return {} as PageInfoWithData<ReplyResponse>;
// }
export function generateReplyResponse(
    pageId: number
): PageInfoWithData<ReplyResponse> {
    let pageNo: number = pageId;
    const pageSize: number = IMAGE_POST_RESPONSE_PAGE_SIZE;
    const noOfPages: number = 9999999;
    let list: ReplyResponse[] = [];

    for (let i = 0; i < pageSize; i++) {
        if (pageNo <= noOfPages) {
            const reply: ReplyResponse = {
                id: "ReplyId_" + faker.datatype.uuid(),
                timestamp: faker.time.recent(),
                author: {
                    id: "UserId_" + faker.datatype.uuid(),
                    socialId: "SocialId_" + faker.datatype.uuid(),
                    username: faker.name.findName(),
                    profilePictureUrl: faker.image.imageUrl(),
                    isFollower: faker.datatype.boolean(),
                    isFollowing: faker.datatype.boolean(),
                    noOfFollowers: faker.datatype.number(),
                },
                content: faker.lorem.sentences(),
                likeInfo: {
                    noOfLikes: faker.datatype.number(),
                    isLiked: faker.datatype.boolean(),
                },
            };
            list.push(reply);
        } else break;
    }
    const pageLength: number = list.length;
    return {
        pageNo,
        pageLength,
        pageSize,
        noOfPages,
        list,
    } as PageInfoWithData<ReplyResponse>;
}

export function generateCommentResponse(
    pageId: number
): PageInfoWithData<CommentResponse> {
    let pageNo: number = pageId;
    const pageSize: Number = IMAGE_POST_RESPONSE_PAGE_SIZE;
    const noOfPages: number = 9999999;
    let list: CommentResponse[] = [];

    for (let i = 0; i < pageSize; i++) {
        if (pageNo <= noOfPages) {
            const comments: CommentResponse = {
                id: "ReplyId_" + faker.datatype.uuid(),
                timestamp: faker.time.recent(),
                author: {
                    id: "UserId_" + faker.datatype.uuid(),
                    socialId: "SocialId_" + faker.datatype.uuid(),
                    username: faker.name.findName(),
                    profilePictureUrl: faker.image.imageUrl(),
                    isFollower: faker.datatype.boolean(),
                    isFollowing: faker.datatype.boolean(),
                    noOfFollowers: faker.datatype.number(),
                },
                content: faker.lorem.sentences(),
                likeInfo: {
                    noOfLikes: faker.datatype.number(),
                    isLiked: faker.datatype.boolean(),
                },
                noOfReplies: faker.datatype.number(),
            };
            list.push(comments);
        } else break;
    }
    const pageLength: number = list.length;

    return {
        pageNo,
        pageLength,
        pageSize,
        noOfPages,
        list,
    } as PageInfoWithData<CommentResponse>;
}

export function generateUserInfoWithTimestamp(
    pageId: number
): PageInfoWithData<UserInfoWithTimestamp> {
    let pageNo: number = pageId;
    const pageSize: number = USER_INFO_WITH_TIMESTAMP_PAGE_SIZE;
    const noOfPages: number = 9999999;
    let list: UserInfoWithTimestamp[] = [];
    for (let i = 0; i < pageSize; i++) {
        if (pageNo <= noOfPages) {
            const user: UserInfoWithTimestamp = {
                id: "UserId_" + faker.datatype.uuid(),
                socialId: "SocialId_" + faker.datatype.uuid(),
                username: faker.name.findName(),
                profilePictureUrl: faker.image.imageUrl(),
                isFollower: faker.datatype.boolean(),
                isFollowing: faker.datatype.boolean(),
                noOfFollowers: faker.datatype.number(),
                timestamp: faker.time.recent(),
            };
            list.push(user);
        } else break;
    }
    const pageLength: number = list.length;
    return {
        pageNo,
        pageLength,
        pageSize,
        noOfPages,
        list,
    } as PageInfoWithData<UserInfoWithTimestamp>;
}
