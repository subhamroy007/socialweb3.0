import React, { useCallback } from "react";
import Icon from "../global/Icon";
import { StyleSheet, View } from "react-native";
import {
  SIZE_REF_12,
  SIZE_REF_14,
  SIZE_REF_16,
  SIZE_REF_4,
  SIZE_REF_8,
} from "../../utility/constants";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackNavigatorParamList } from "../../utility/types";

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/appStore";
import { selectIsLiked, selectIsSaved } from "../../store/imagePost/selector";
import { useNavigation } from "@react-navigation/core";

export type ImageFeedScreenProps = StackScreenProps<
  RootStackNavigatorParamList,
  "Tabs"
>;

export type ImageFeedScreenNavigationProps = ImageFeedScreenProps["navigation"];

export interface ImagePostControlsProps {
  id: string;
}

const ImagePostControls = ({ id }: ImagePostControlsProps) => {
  const appNavigation = useNavigation<ImageFeedScreenNavigationProps>();

  const isLikedSelectorCallback = useCallback(
    (state: RootState) => selectIsLiked(state, id)!,
    [id]
  );

  const isSavedSelectorCallback = useCallback(
    (state: RootState) => selectIsSaved(state, id)!,
    [id]
  );

  const isLiked = useAppSelector(isLikedSelectorCallback);
  const isSaved = useAppSelector(isSavedSelectorCallback);

  const likeIconClickHandler = useCallback(() => {}, []);

  const commentIconClickHandler = useCallback(() => {}, []);

  const shareIconClickHandler = useCallback(() => {}, []);

  const bookmarkIconClickHandler = useCallback(() => {}, []);

  const dispatch = useAppDispatch();

  return (
    <View style={styles.imagePostControls}>
      <View style={styles.leftContainer}>
        <Icon
          color={isLiked ? "#EE3434" : "black"}
          name={isLiked ? "heart-solid" : "heart-outline"}
          size={SIZE_REF_12 + SIZE_REF_14}
          style={styles.icon}
          onPress={likeIconClickHandler}
        />
        <Icon
          color="black"
          name="comment-outline"
          size={SIZE_REF_12 + SIZE_REF_14}
          style={styles.icon}
          onPress={commentIconClickHandler}
        />
        <Icon
          color="black"
          name="send"
          size={SIZE_REF_12 + SIZE_REF_14}
          onPress={shareIconClickHandler}
        />
      </View>
      <Icon
        color="black"
        name={isSaved ? "bookmark-solid" : "bookmark-outline"}
        size={SIZE_REF_12 + SIZE_REF_14}
        onPress={bookmarkIconClickHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePostControls: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SIZE_REF_8,
    paddingHorizontal: SIZE_REF_4,
  },
  leftContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: SIZE_REF_16,
  },
});

export default ImagePostControls;
