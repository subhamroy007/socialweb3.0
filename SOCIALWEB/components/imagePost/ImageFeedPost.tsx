import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageFeedPostHeader from "./ImageFeedPostHeader";
import ImageFeedPostControls from "./ImageFeedPostControls";
import ImageFeedSinglePost from "./ImageFeedSinglePost";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import CollapsibleText from "../global/CollapsibleText";
import HashTag from "../global/HashTag";
import HighlightedContentList from "../global/HighlightedContentList";
import { SIZE_REF_12, SIZE_REF_4, SIZE_REF_8 } from "../../utility/constants";

const data = [
  "#wonderlust",
  "#backtonature",
  "#lovelife",
  "#galaxy",
  "#social",
  "#papakipari",
];

const renderItem = (item: ListRenderItemInfo<string>) => (
  <HashTag id={item.item} />
);

const keyExtarctor = (item: string) => item;

const ImageFeedPost = (props: { id: string }) => {
  const height = Math.floor(Math.random() * 720) + 360;
  const width = Math.floor(Math.random() * 720) + 360;

  return (
      <SafeAreaView edges={[]} style={[styles.imageFeedPostContainer]}>
          <ImageFeedPostHeader />
          <ImageFeedSinglePost
              url={`https://source.unsplash.com/random/${width}x${height}`}
              width={width}
              height={height}
          />
          <ImageFeedPostControls />
          <HighlightedContentList
              data={data}
              keyExtractor={keyExtarctor}
              renderItem={renderItem}
              style={styles.hashtagList}
          />
          <CollapsibleText style={styles.captionText}>
              hello this is a demo capton to chek the visibility of captions in
              full screen mode of the image post and it is quite allright this
              is the best app on the group of social media and i am new here but
              already amused with this app :)
          </CollapsibleText>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageFeedPostContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  captionText: {
    fontSize: SIZE_REF_12,
    marginLeft: SIZE_REF_4,
  },
  hashtagList: {
    marginVertical: SIZE_REF_8,
  },
});

export default ImageFeedPost;
