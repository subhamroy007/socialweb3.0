import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { ReactElement } from "react";
import {
    Animated,
    PanResponderInstance,
    StyleProp,
    TextStyle,
    ViewStyle,
} from "react-native";

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
    children: React.ReactNode;
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
export type MainTabNavigationBarProps = BottomTabBarProps & {
    animationControlData: Animated.Value;
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
    target: JSX.Element;
    icon: string;
    activeColor: string;
    inActiveColor: string;
}

export interface CustomMaterialNavigatorProps {
    width: number;
    height: number;
    children: ReactElement<CustomMaterialScreenProps>[];
}

export interface TabItemProps {
    width: number;
    icon: string;
    activeColor: string;
    inActiveColor: string;
    size: number;
    onPress: () => void;
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
}

//a utility interface extends the IconProps and specifies tap and drap gesture configuration
export interface RoundedIconProps extends IconProps {
    //whether the icon supports tapping
    tapEnabled: boolean;
    //whether the icon supports dragging
    dragEnabled: boolean;
    //tap handler
    onTap?: () => void;
    //drag handler
    onDrag?: () => void;
    //optional style prop
    style?: StyleProp<ViewStyle>;
}

export interface EntityInfoProps {
    url?: string;
    name?: string;
    primaryText: string;
    secondaryText: string;
    size?: number;
    style?: StyleProp<ViewStyle>;
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
