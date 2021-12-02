import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import { ListRenderItemInfo, Pressable, StyleSheet, View } from "react-native";
import FastImage, { Source } from "react-native-fast-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { WINDOW_WIDTH } from "../utility/constants";
import { globalColors, globalLayouts } from "../utility/styles";
import {
  RootStackNavigatorParamList,
  RootTabNavigatorParamList,
} from "../utility/types";
import { ConfiguredFlatList } from "../utility/ui";

export type ImageGalleryProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabNavigatorParamList, "ProfileScreen">,
  StackScreenProps<RootStackNavigatorParamList>
>;

export type ImageGalleryNavigationProps = ImageGalleryProps["navigation"];
export type ImageGalleryRouteProps = ImageGalleryProps["route"];

export const ImageGalleryItem = ({ index }: { index: number }) => {
  const navigation = useNavigation<ImageGalleryNavigationProps>();
  const route = useRoute<ImageGalleryRouteProps>();

  const pressInCallback = useCallback(() => {
    navigation.push("OverlayScreen");
  }, [navigation]);

  // const pressOutCallback = useCallback(() => {
  //   if (!navigation.isFocused()) {
  //     navigation.pop(1);
  //   }
  // }, []);

  const width = Math.floor(Math.random() * 300 + 200);
  const height = Math.floor(Math.random() * 300 + 200);

  const imageSource: Source = {
    cache: "immutable",
    priority: "high",
    uri: "https://source.unsplash.com/random/" + width + "x" + height,
  };

  return (
    <>
      <Pressable onLongPress={pressInCallback}>
        <View style={styles.gelleryCell}>
          <FastImage
            source={imageSource}
            style={[
              styles.galleryItem,
              index % 3 === 2 ? styles.galleryRightEdgeItem : undefined,
            ]}
            resizeMode="cover"
          />
        </View>
      </Pressable>
    </>
  );
};

const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const renderFunction = (item: ListRenderItemInfo<number>) => {
  return <ImageGalleryItem index={item.index} />;
};

const getItemLayout = (data: any[] | undefined | null, index: number) => ({
  index,
  length: WINDOW_WIDTH / 3,
  offset: index * (WINDOW_WIDTH / 3),
});

const ImageGallery = () => {
  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={[globalLayouts.tabLayout, globalColors.screenColor]}
    >
      <ConfiguredFlatList
        data={data}
        renderItem={renderFunction}
        keyExtractor={(item, index) => "item" + index}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        // columnWrapperStyle={styles.gelleryCell}
        contentContainerStyle={styles.galleryListContentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  galleryListContentContainer: {
    paddingTop: 2,
    paddingHorizontal: 0,
  },
  galleryItem: {
    width: WINDOW_WIDTH / 3 - 1,
    height: WINDOW_WIDTH / 3 - 1,
    backgroundColor: "#FDFDFD",
  },
  gelleryCell: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    backgroundColor: "white",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  galleryRightEdgeItem: {
    width: WINDOW_WIDTH / 3,
  },
});

export default ImageGallery;
