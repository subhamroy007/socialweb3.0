import { NavigatorScreenParams } from "@react-navigation/core";
import { ReactElement } from "react";
import {
    Animated,
    PanResponderInstance,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";

//defining the generic id and timestamp pair interface
export interface IdTimeStampPair {
    id: string; //generic id
    timestamp: number; //generic timestamp
}

//defining the user id avatar url pair interfcae
export interface UseIdAvatarPair {
    id: string; //user id
    url: string; //user profile picture link
}

//generic image info interface
export interface ImageInfo {
    url: string; //url of the image
    width: number; //width of the image in pixels
    height: number; //height of the image in pixels
}

//utility type to represent any aribtrary task state
export type taskState = "idle" | "success" | "loading" | "failure";

//type to represent additional data of the image post slice
export interface ImagePostMetaState {
    imagePostFeedMeta: {
        //either the image feed is loading or successfully loaded or failed
        feedState: taskState;
        //list of all the post ids that is part of the current user feed
        feedList: string[];
        //most recent feed request page no
        currentFeedPageNo: number;
        //most recent error information encountered when getting new feed information
        recentError?: {
            code: number;
            message: string;
        };
    };
}

//defining the data structure of the ImagePost
export interface ImagePost {
    id: string; //unique id of the post
    content: ImageInfo[] | ImageInfo; //single or multiple string representing the image links
    caption?: string; //caption associated with the post
    timestamp: number; //date when the post created in miliseconds
    author: string; //userId of the post author
    hashtagList?: string[]; //list of hashtag ids used in the post
    likeInfo: {
        //list of the user ids who liked the post
        noOfLikes: number;
        likeList?: IdTimeStampPair[];
        filteredUsers?: string[];
    };
    commentInfo: {
        //list of the comment ids in the post
        noOfComments: number;
        commentList?: Comment[];
        filteredUsers?: string[];
    };
    shareInfo: {
        //list of the use ids who shared the post via diffrent options
        noOfShares: number;
        shareList?: IdTimeStampPair[];
        filteredShareList?: string[];
    };
    tagInfo: {
        noOfTags: number;
        tagList?: string[];
    }; //list of the users tagged in the post
}

//defining User Data Structure
export interface User {
    id: string; //userid
    socialId: string; //unique social id
    username: string; //optional username
    storyInfo: {
        //user story informition
        noOfStories: number; //number of seen and unseen stories
        hasUnSeenStory: boolean; //is the logged in user has yet to see any story of this user
        storyList?: string[]; //id of the stories
    };
    followerInfo: {
        //follower information
        noOfFollowers: number; //total number of followers
        followerList?: string[]; //list of userids
        isFollower: boolean;
    };
    followingInfo: {
        //following  information
        noOfFollowing: number; //total number of followings
        followingList?: string[]; //list of the userids
        isFollowing: boolean;
    };
    posts: {
        //post information
        noOfPosts: number; //total number of posts
        imagePost: {
            //image post information
            noOfImagePosts: number;
            imagePostList?: string[];
        };
    };
}

//defining the messaage data structure of stories
export interface PrivateStoryMessage {
    id: string;
    content: string;
    timestamp: number;
}

//defining the story data structure
export interface Story {
    id: string;
    author: string;
    timestamp: number;
    content: {
        url: string;
    };
    hasSeen: boolean;
}

//a utility type to represent user data
export interface UserInfoResponse {
    id: string;
    socialId: string;
    username: string;
    profilePictureUrl: string;
    isFollower: boolean;
    isFollowing: boolean;
}

//a speicific story data response
export interface StoryInfoResponse {
    id: string;
    timestamp: number;
    content: {
        url: string;
    };
    hasSeen: boolean;
}

//full response of a of specific user story data
export interface StoryResponse {
    userInfo: UserInfoResponse; //target user info
    storyList: Story[]; //list of active stories
}

//a utility type to represent page data
export interface PageInfoResponse<T> {
    pageNo: number;
    pageSize: number;
    pageLength: number;
    totalNoOfPages: number;
    list?: T[];
}

//a utility type to represent user information along with an arbitrary timestamp
export interface UserInfoWithTimeStampResponse {
    userInfo: UserInfoResponse;
    timestamp: number;
}

//a specific reply data response
export interface ReplyResponse {
    id: string;
    content: string;
    author: UserInfoResponse;
    timestamp: number;
    likeInfo: {
        noOfLikes: number;
        pageInfo: PageInfoResponse<UserInfoWithTimeStampResponse>;
        isLiked: boolean;
    };
}

// a specific comment data response
export interface CommentResponse extends ReplyResponse {
    replyInfo: {
        noOfReply: number;
        pageInfo: PageInfoResponse<ReplyResponse>;
    };
}

//a specific image post response
export interface ImagePostResponse {
    id: string;
    content: ImageInfo[] | ImageInfo;
    caption?: string;
    timestamp: number;
    author: UserInfoResponse;
    hashtagList?: string[];
    likeInfo: {
        noOfLikes: number;
        pageInfo: PageInfoResponse<UserInfoWithTimeStampResponse>;
        filteredUsers?: string[];
    };
    commentInfo: {
        noOfComments: number;
        pageInfo: PageInfoResponse<CommentResponse>;
        filteredUsers?: string[];
    };
    shareInfo: {
        noOfShares: number;
        pageInfo: PageInfoResponse<UserInfoWithTimeStampResponse>;
        filteredShareList?: string[];
    };
    tagInfo: {
        noOfTags: number;
        pageInfo: PageInfoResponse<UserInfoResponse>;
    };
}

//full response of image feed screen loading data
export interface ImageFeedScreenResponse {
    storyFeedInfo?: PageInfoResponse<StoryResponse>;
    imagePostFeedInfo?: PageInfoResponse<ImagePostResponse>;
}

//a utility type to create custom errors in the app
export interface AppError {
    code: number;
    message: string;
    reasons?: {
        [key: string]: string;
    };
}

//hashtag info respose type
export interface HashTagResponse {
    id: string;
    name: string;
    saveInfo: {
        //save  information
        noOfSaves: number;
        pageInfo: PageInfoResponse<UserInfoResponse>;
        isSaved: boolean;
    };
    uploads: {
        //post information
        noOfUploads: number; //total number of posts
        imagePost: {
            //image post information
            noOfImagePosts: number;
            pageInfo: PageInfoResponse<ImagePostResponse>;
        };
    };
}

//user info response type
export interface UserResponse {
    id: string; //userid
    socialId: string; //unique social id
    username: string; //optional username
    storyInfo: {
        //user story informition
        noOfStories: number; //number of seen and unseen stories
        hasUnSeenStory: boolean; //is the logged in user has yet to see any story of this user
        pageInfo: PageInfoResponse<Story>; //id of the stories
    };
    followerInfo: {
        //follower information
        noOfFollowers: number; //total number of followers
        followerList?: string[]; //list of userids
        isFollower: boolean;
    };
    followingInfo: {
        //following  information
        noOfFollowing: number; //total number of followings
        followingList?: string[]; //list of the userids
        isFollowing: boolean;
    };
    posts: {
        //post information
        noOfPosts: number; //total number of posts
        imagePost: {
            //image post information
            noOfImagePosts: number;
            imagePostList?: string[];
        };
    };
}

export type SearchScreenNavigationParamList = {
    ImageGallery: undefined;
    VideoCollection: undefined;
    HashTagList: undefined;
    UserList: undefined;
};

export type UtilityStackNavigatorParamList = {
    OthersProfileScreen: undefined;
    SearchResultScreen: undefined;
};

export type RootTabNavigatorParamList = {
    ImageFeedScreen: undefined;
    VideoFeedScreen: undefined;
    ProfileScreen: undefined;
    TrendingScreen: undefined;
    NotificationScreen: undefined;
    SavedDataScreen: undefined;
    SettingsScreen: undefined;
    Stacks: NavigatorScreenParams<UtilityStackNavigatorParamList>;
};

export type RootStackNavigatorParamList = {
    Tabs: NavigatorScreenParams<RootTabNavigatorParamList>;
    LiveScreen: undefined;
    StoryFeedScreen: undefined;
    PostMetaInfoStack: undefined;
};

export interface GenericTabBarIconProps {
    children: React.ReactNode;
    onPress: (routeName: string) => void;
    routeName: string;
}

export interface NavigationShutterHook {
    animationControlData: Animated.Value;
    isOverlayVisible: boolean;
    shutterPanResponder: PanResponderInstance;
}

export interface CollapseTextProps {
    content: string;
    style?: StyleProp<TextStyle>;
}

export interface TextScrollProps {
    children: React.ReactNode;
}

export interface ResourceContainnerProps {
    iconName: string;
    title: string;
    url: string;
    style?: StyleProp<ViewStyle>;
}

//a utility interface represent the name value component props
export interface NameValuePairProps {
    name: string;
    value: string;
    style?: StyleProp<ViewStyle>;
}

//a utility props type that includes th e animation control data to control the tab bar transition along
//with the default props (i.e navigation, state)
export interface MainTabNavigationBarProps {
    animationControlData: Animated.Value;
    onTabPress: (route: string) => void;
    routes: string[];
    activeIndex: number;
}

export type PostMetaNavigatorParamList = {
    CommentTab: undefined;
    LikeTab: undefined;
    ShareTab: undefined;
};

export interface AvatarProps {
    size: number;
    url: string;
    style?: StyleProp<ViewStyle>;
}

export interface CarosolProps {
    noOfItems: number;
    normalDotSize: number;
    activeDotSize: number;
    scrollReference: Animated.Value;
}

export interface CustomMaterialScreenProps {
    target: ReactElement<any>;
    activeIcon: string;
    inActiveIcon: string;
    size: number;
}

export interface CustomMaterialNavigatorProps {
    width: number;
    height: number;
    children: ReactElement<CustomMaterialScreenProps>[];
}

export interface TabItemProps {
    inActiveIcon: string;
    activeIcon: string;
    onPress: () => void;
    size: number;
    width: number;
    animationControlData: Animated.Value;
    index: number;
}

//utility interface to represent icon props
export interface IconProps {
    //optional action associated to the icon
    onPress?: () => void;
    //name of the icon
    name: string;
    //size of the icon in pixels
    size: number;
    //color of the icon
    color: string;
    style?: StyleProp<ViewStyle>;
}

//a utility interface extends the IconProps and specifies tap and drap gesture configuration
export interface RoundedIconProps extends IconProps {
    //whether the icon supports tapping
    tapEnabled?: boolean;
    //whether the icon supports dragging
    dragEnabled?: boolean;
    //tap handler
    onTap?: () => void;
    //drag handler
    onDrag?: () => void;
    //optional style prop
    style?: StyleProp<ViewStyle>;
    //optinal scale prop for the icon
    scale?: number;
}

export interface EntityInfoProps {
    url?: string;
    name?: string;
    primaryText: string;
    secondaryText: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
}

export interface ItemSeparatorProps {
    axis: "horizontal" | "vertical";
    length: number;
}

export interface AvatarSocialIdPairProps {
    avatarSize: number;
    fontSize: number;
    gapSize: number;
    style?: StyleProp<ViewStyle>;
}

//-----------------------------------------------------api-types--------------------------------------------------

export interface Link {
    title: string;
    url: string;
    icon: string;
}

export interface CountListPair<T> {
    count: number;
    list: T[];
}

export interface UserEntity {
    id: string;
    socialId: string;
    timestamp: number;
    username: string;
    profilePictureUrl: string;
    bio: string;
    links: CountListPair<Link>;
    followerInfo: CountListPair<IdTimeStampPair>;
    followingInfo: CountListPair<IdTimeStampPair>;
    uploads: {
        noOfUploads: number;
        imagePost: CountListPair<string>;
    };
    saves: {
        noOfSaves: number;
        imagePost: CountListPair<string>;
        hashtags: CountListPair<string>;
    };
    tags: {
        noOfTags: number;
        imagePost: CountListPair<string>;
    };
}

export interface HashTagEntity {
    id: string;
    name: string;
    saveInfo: CountListPair<IdTimeStampPair>;
    uploads: {
        noOfUploads: number;
        imagePost: CountListPair<string>;
    };
}

export interface GenericData {
    id: string;
    timestamp: number;
    author: string;
}

export interface PostMetaData {
    likeInfo: CountListPair<IdTimeStampPair>;
    commentInfo: CountListPair<Comment>;
    shareInfo: CountListPair<IdTimeStampPair>;
    tagInfo: CountListPair<IdTimeStampPair>;
    hashTagInfo: CountListPair<string>;
}

export interface ImagePostEntity extends GenericData, PostMetaData {
    images: ImageInfo | ImageInfo[];
    caption: string;
}

export interface Reply extends GenericData {
    content: string;
    likeInfo: CountListPair<IdTimeStampPair>;
}

export interface Comment extends Reply {
    replyInfo: CountListPair<Reply>;
}
