import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CollapsableText from "../components/global/NewCollapsableText";
import { globalColors, globalLayouts } from "../utility/styles";
import { BoldText } from "../utility/ui";

const VideoFeedScreen = () => {
  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      <View
        style={{
          flexDirection: "row",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          backgroundColor: "green",
        }}
      >
        <CollapsableText isExpandable={true}>
          {
            "hello \n world i am subham royaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          }
        </CollapsableText>
      </View>
      <BoldText>hi</BoldText>
    </SafeAreaView>
  );
};

export default VideoFeedScreen;
