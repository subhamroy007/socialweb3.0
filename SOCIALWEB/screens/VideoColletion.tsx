import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBar } from "react-native-tab-view";
import Icon, {
    AroundTheClockBold,
    ArrowDown,
    BookmarkOutlineBold,
    BookmarkOutlineRegular,
    BookmarkSolid,
} from "../components/Icons";
import { globalColors, globalLayouts } from "../utility/styles";
import { BoldText } from "../utility/ui";

const VideoCollection = () => {
    return (
        <SafeAreaView
            edges={["left", "right"]}
            style={[globalLayouts.tabLayout, globalColors.screenColor]}
        >
            <Icon name="bookmark-outline-bold" size={32} color="red" />
            <Icon name="around-the-clock-regular" size={32} color="red" />
            <Icon name="arrow-down" size={32} color="red" />
            <Icon name="bookmark-outline-bold" size={32} color="red" />
            <Icon name="edit-solid" size={32} color="red" />
            <Icon name="history-regular" size={32} color="red" />
            <Icon name="trending-solid" size={32} color="red" />
        </SafeAreaView>
    );
};

export default VideoCollection;
