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
            <Icon name="BookmarkOutlineBold" size={32} color="red" />
            <Icon name="AroundTheClockRegular" size={32} color="red" />
            <Icon name="ArrowDown" size={32} color="red" />
            <Icon name="BookmarkOutlineRegular" size={32} color="red" />
            <Icon name="EditSolid" size={32} color="red" />
            <Icon name="HistoryRegular" size={32} color="red" />
            <Icon name="TrendingSolid" size={32} color="red" />
        </SafeAreaView>
    );
};

export default VideoCollection;
