import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabBar } from "react-native-tab-view";
import { globalColors, globalLayouts } from "../utility/styles";
import { BoldText } from "../utility/ui";

const VideoCollection = () => {
    return (
        <SafeAreaView
            edges={["left", "right"]}
            style={[globalLayouts.tabLayout, globalColors.screenColor]}
        >
            <BoldText>video collection</BoldText>
        </SafeAreaView>
    );
};

export default VideoCollection;
