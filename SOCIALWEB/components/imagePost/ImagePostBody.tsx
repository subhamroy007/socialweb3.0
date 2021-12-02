import React, { useCallback, useMemo, useState } from "react";
import { StyleProp, StyleSheet, View } from "react-native";
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectImageList } from "../../store/imagePost/selector";
import {
  IMAGE_POST_MAX_HEIGHT,
  IMAGE_POST_MIN_HEIGHT,
  WINDOW_WIDTH,
} from "../../utility/constants";
import ImageFeedPostOverlay from "./ImageFeedPostOverlay";

export interface ImagePostBodyProps {
  id: string;
}

const ImagePostBody = ({ id }: ImagePostBodyProps) => {
  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

  const imageListSelectorCallback = useCallback(
    (state: RootState) => selectImageList(state, id),
    [id]
  );

  const imageList = useAppSelector(imageListSelectorCallback);

  const imageSourceList: Source[] | undefined = useMemo(
    () =>
      imageList?.map<Source>((item) => ({
        cache: "immutable",
        priority: "high",
        uri: item.url,
      })),
    [imageList]
  );

  const { resizeMode, scaledHeight } = useMemo(() => {
    const calculatedHeight = (height * WINDOW_WIDTH) / width;
    const scaledHeight = Math.max(
      Math.min(calculatedHeight, IMAGE_POST_MAX_HEIGHT),
      IMAGE_POST_MIN_HEIGHT
    );

    let resizeMode: ResizeMode = "center";

    if (calculatedHeight > scaledHeight) {
      resizeMode = "cover";
    }

    return { scaledHeight, resizeMode };
  }, [width, height]);

  const imageResolution: StyleProp<ImageStyle> = useMemo(
    () => ({ width: WINDOW_WIDTH, height: scaledHeight }),
    [scaledHeight]
  );

  const singleTapHandler = useCallback(
    ({
      nativeEvent,
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (nativeEvent.state === State.ACTIVE) {
        setOverlayVisible((state) => !state);
      }
    },
    []
  );

  return (
    <View style={[styles.imageFeedSinglePostContainer]}>
      <TapGestureHandler
        minPointers={1}
        maxDurationMs={600}
        maxDelayMs={600}
        numberOfTaps={1}
        shouldCancelWhenOutside={true}
        onHandlerStateChange={singleTapHandler}
      ></TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  imageFeedSinglePostContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImagePostBody;
