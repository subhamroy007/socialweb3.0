import React, { useCallback, useMemo, useState } from "react";
import {
  ListRenderItemInfo,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  HandlerStateChangeEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import useImageResize from "../../hooks/useImageResize";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectImageList } from "../../store/imagePost/selector";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../utility/constants";
import { ImageConfig } from "../../utility/types2";
import { ConfiguredFlatList } from "../../utility/ui";
import ImageFeedPostOverlay from "./ImageFeedPostOverlay";

const renderItem = (item: ListRenderItemInfo<ImageConfig>) => (
  <FastImage
    source={item.item.source}
    style={item.item.style}
    resizeMode={item.item.resizeMode}
  />
);

export interface ImagePostBodyProps {
  id: string;
}

const ImagePostBody = ({ id }: ImagePostBodyProps) => {
  const [isOverlayVisible, setOverlayVisible] = useState<boolean>(false);

  const [imageIndex, setImageIndex] = useState<number>(0);

  const imageConfigList = useMemo<ImageConfig[]>(() => {
    const imageListSelectorCallback = useCallback(
      (state: RootState) => selectImageList(state, id)!,
      [id]
    );

    const imageList = useAppSelector(imageListSelectorCallback);

    return imageList.map<ImageConfig>((imageInfo) => {
      const { width, height, resizeMode } = useImageResize(
        { original: imageInfo.width, max: WINDOW_WIDTH, min: WINDOW_WIDTH },
        {
          original: imageInfo.height,
          max: WINDOW_WIDTH * 0.66,
          min: WINDOW_HEIGHT * 0.3,
        }
      );
      return {
        resizeMode,
        style: { width, height },
        source: { cache: "immutable", priority: "high", uri: imageInfo.url },
      };
    });
  }, [id]);

  const viewabilityConfig: ViewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 100,
      minimumViewTime: 1,
    }),
    []
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

  const viewableItemChangedCallback = useCallback<
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => void
  >(({ viewableItems }) => {
    setImageIndex(viewableItems[0].index!);
  }, []);

  return (
    <View style={[styles.imagePostBody]}>
      <TapGestureHandler
        minPointers={1}
        maxDurationMs={600}
        maxDelayMs={600}
        numberOfTaps={1}
        shouldCancelWhenOutside={true}
        onHandlerStateChange={singleTapHandler}
      >
        <ConfiguredFlatList
          contentContainerStyle={styles.listContentContainerStyle}
          data={imageConfigList}
          renderItem={renderItem}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={viewableItemChangedCallback}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <ImageFeedPostOverlay
          isVisible={isOverlayVisible}
          style={imageConfigList[imageIndex].style}
        />
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePostBody: {
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  listContentContainerStyle: {
    padding: 0,
  },
});

export default ImagePostBody;
