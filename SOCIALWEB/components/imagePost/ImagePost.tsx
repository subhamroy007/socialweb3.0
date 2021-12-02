import { StyleSheet, View } from "react-native";
import CollapsibleText from "../global/CollapsibleText";
import { SIZE_REF_12, SIZE_REF_4, SIZE_REF_8 } from "../../utility/constants";
import ImagePostHeader from "./ImagePostHeader";
import ImagePostBody from "./ImagePostBody";
import ImagePostControls from "./ImagePostControls";
import { RootState, useAppSelector } from "../../store/appStore";
import { useCallback } from "react";
import { selectHashTagList } from "../../store/imagePost/selector";
import HashTagList from "../global/HashTagList";

export interface ImagePostProps {
  id: string;
}

const ImagePost = ({ id }: ImagePostProps) => {
  const hashTagListSelectorCallback = useCallback(
    (state: RootState) => selectHashTagList(state, id)!,
    [id]
  );

  const hashtagList = useAppSelector(hashTagListSelectorCallback);

  return (
    <View style={[styles.container]}>
      <ImagePostHeader id={id} />
      <ImagePostBody id={id} />
      <ImagePostControls id={id} />
      <HashTagList data={hashtagList} style={styles.hashtagList} />
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
