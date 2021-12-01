import React from "react";
import ImageFeedPostControls from "./ImageFeedPostControls";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import CollapsibleText from "../global/CollapsibleText";
import HashTag from "../global/HashTag";
import HighlightedContentList from "../global/HighlightedContentList";
import { SIZE_REF_12, SIZE_REF_4, SIZE_REF_8 } from "../../utility/constants";
import ImagePostHeader from "./ImagePostHeader";
import ImagePostBody from "./ImagePostBody";

const renderItem = (item: ListRenderItemInfo<string>) => (
  <HashTag id={item.item} />
);

const keyExtarctor = (item: string) => item;

export interface ImapgePostProps {
  id: string;
}

const ImagePost = ({ id }: ImapgePostProps) => {
  return (
    <View style={[styles.container]}>
      <ImagePostHeader id={id} />
      <ImagePostBody id={id} />
      <ImageFeedPostControls />
      <HighlightedContentList
        data={data}
        keyExtractor={keyExtarctor}
        renderItem={renderItem}
        style={styles.hashtagList}
      />
      <CollapsibleText
        content="hello this is a demo capton to check the visibility of captions in full screen mode of the image post and it is quite allright this is the best app on the group of social media and i am new here but already amused with this app :)"
        style={styles.captionText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  captionText: {
    fontSize: SIZE_REF_12,
    paddingHorizontal: SIZE_REF_4,
  },
  hashtagList: {
    marginVertical: SIZE_REF_8,
  },
});

export default ImagePost;
