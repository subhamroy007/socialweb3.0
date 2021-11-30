import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../components/global/LoadingIndicator";
import StoryList from "../components/imagePost/StoryList";
import { getImageFeedThunk } from "../store/appData/reducer";
import { selectImageFeedIds, selectState } from "../store/appData/selector";
import { useAppDispatch, useAppSelector } from "../store/appStore";
import { SHUTTER_HEIGHT } from "../utility/constants";
import { globalColors, globalLayouts } from "../utility/styles";
import { ImageFeedRequest } from "../utility/types";
import { ConfiguredFlatList } from "../utility/ui";

const NewImageFeedScreen = () => {
  const state = useAppSelector(selectState);

  const data = useAppSelector(selectImageFeedIds);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const prepare = async () => {
      const imageFeedRequest: ImageFeedRequest = {
        includeImage: true,
        includeStory: true,
      };
      dispatch(getImageFeedThunk(imageFeedRequest));
    };
    prepare();
  }, [dispatch]);

  let listFooterComponent = null;

  if (state === "loading" || !data || data.length === 0) {
    listFooterComponent = <LoadingIndicator />;
  }

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={[globalLayouts.screenLayout, globalColors.screenColor]}
    >
      <StatusBar hidden={true} />
      <ConfiguredFlatList
        data={data}
        renderItem={() => null}
        style={[styles.list]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={StoryList}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    marginBottom: Math.floor((SHUTTER_HEIGHT * 4) / 25),
  },
  listContentContainer: {
    paddingHorizontal: 0,
  },
});

export default NewImageFeedScreen;
