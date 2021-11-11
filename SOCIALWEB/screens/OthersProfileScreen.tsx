import { SafeAreaView } from "react-native-safe-area-context";
import { globalColors } from "../utility/style/colors";
import { globalLayouts } from "../utility/style/layout";
import React from "react";
import {
  PROFILE_BIO_TEXT_SIZE,
  PROFILE_ICON_GAP,
  PROFILE_LINK_CONTAINER_MARGIN,
  PROFILE_META_CONTAINER_PADDING,
  PROFILE_META_LINK_GAP,
  PROFILE_NAME_VALUE_PAIR_GAP,
  PROFILE_SCREEN_PADDING,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from "../utility/constants/appConstants";
import { StyleSheet } from "react-native";
import VideoCollection from "../components/VideoColletion";
import StoryBook from "../components/StoryBook";
import ImageGallery from "../components/ImageGallery";
import SwippableTabNavigator, {
  SwippableTabScreen,
} from "../components/global/CustomMaterialNavigator";
import HighlightedLink from "../components/ResourceContainer";
import { ScrollView } from "react-native-gesture-handler";
import { RegularText } from "../utility/ui/appText";
import SolidButton from "../components/SolidButton";
import RoundedIcon from "../components/RoundedIcon";
import NameValuePair from "../components/NameValuePair";
import AvatarUserIdPair from "../components/AvatarUserIdPair";

const OthersProfileScreen = () => {
  return (
    <SafeAreaView
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
      edges={["left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.wrapperScrollbar]}
        stickyHeaderIndices={[3]}
      >
        <SafeAreaView edges={[]} style={[styles.avatarMetaIconWrapper]}>
          <AvatarUserIdPair />
          <SafeAreaView edges={[]} style={[styles.metaIconWrapper]}>
            <SafeAreaView edges={[]} style={[styles.metadataContainer]}>
              <NameValuePair name="uploads" value="400" />
              <NameValuePair name="followers" value="12M" style={styles.icon} />
              <NameValuePair
                name="followings"
                value="212"
                style={styles.icon}
              />
            </SafeAreaView>
            <SafeAreaView edges={[]} style={[styles.iconContainer]}>
              <RoundedIcon
                color="black"
                dragEnabled={false}
                tapEnabled={false}
                name="tag"
                size={30}
              />
              <RoundedIcon
                color="black"
                dragEnabled={false}
                tapEnabled={false}
                name="more-option"
                size={30}
                style={styles.icon}
              />
              <RoundedIcon
                color="black"
                dragEnabled={false}
                tapEnabled={false}
                name="tag"
                size={30}
                style={styles.icon}
              />
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
        <SolidButton
          title="follow"
          onPress={() => {}}
          style={[styles.button]}
        />
        <SafeAreaView edges={[]} style={[styles.bioLinkWrapper]}>
          <RegularText style={[styles.bioText]}>
            hello this is a demo capton to chek the visibility of captions in
            full screen mode of the image post and it is quite allright this is
            the best app on the group of social media and i am new here but
            already amused with this app :)
          </RegularText>
          <SafeAreaView edges={[]} style={[styles.linkContainer]}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              scrollEventThrottle={1}
            >
              <HighlightedLink
                iconName="heart-solid"
                title="checkout my merchendice"
                url=""
                style={{ marginRight: 4 }}
              />
              <HighlightedLink
                iconName="heart-solid"
                title="see vlog"
                url=""
                style={{ marginRight: 4 }}
              />
              <HighlightedLink
                iconName="heart-solid"
                title="new video out"
                url=""
                style={{ marginRight: 4 }}
              />
              <HighlightedLink
                iconName="heart-solid"
                title="new show tickets"
                url=""
              />
            </ScrollView>
          </SafeAreaView>
        </SafeAreaView>
        <SwippableTabNavigator width={WINDOW_WIDTH} height={WINDOW_HEIGHT}>
          <SwippableTabScreen
            target={<ImageGallery />}
            activeColor="black"
            inActiveColor="grey"
            icon="heart-outline"
          />
          <SwippableTabScreen
            target={<VideoCollection />}
            activeColor="black"
            inActiveColor="grey"
            icon="heart-outline"
          />
          <SwippableTabScreen
            target={<StoryBook />}
            activeColor="black"
            inActiveColor="grey"
            icon="heart-outline"
          />
        </SwippableTabNavigator>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-start",
    marginLeft: PROFILE_SCREEN_PADDING,
    marginBottom: PROFILE_META_LINK_GAP,
  },
  nameValuePair: {
    marginLeft: PROFILE_NAME_VALUE_PAIR_GAP,
  },
  icon: {
    marginLeft: PROFILE_ICON_GAP,
  },
  wrapperScrollbar: {
    flex: 1,
    width: "100%",
  },
  bioText: {
    fontSize: PROFILE_BIO_TEXT_SIZE,
  },
  linkContainer: {
    width: "100%",
    marginTop: PROFILE_LINK_CONTAINER_MARGIN,
  },
  bioLinkWrapper: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingHorizontal: PROFILE_SCREEN_PADDING,
    paddingBottom: PROFILE_LINK_CONTAINER_MARGIN,
  },
  metadataContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: PROFILE_META_CONTAINER_PADDING,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaIconWrapper: {
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  avatarMetaIconWrapper: {
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    paddingHorizontal: PROFILE_SCREEN_PADDING,
    paddingBottom: PROFILE_META_LINK_GAP,
  },
});

export default OthersProfileScreen;
