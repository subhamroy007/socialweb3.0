import React, { useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FastImage, { ImageStyle, Source } from "react-native-fast-image";
import { RootState, useAppSelector } from "../../store/appStore";
import { selectProfilePictureUrl } from "../../store/user/selector";
import { AVATAR_PHOTO_TO_GAP_RATIO } from "../../utility/constants";
import { AvatarProps } from "../../utility/types";

const Avatar = ({ size, id, style, showStoryIndicator }: AvatarProps) => {
  const profilePictureUrlSelectorCallback = useCallback(
    (state: RootState) => selectProfilePictureUrl(state, id),
    [id]
  );

  const profilePictureUrl = useAppSelector(profilePictureUrlSelectorCallback);

  const avatarSource: Source = useMemo(
    () => ({
      uri: profilePictureUrl,
      cache: "immutable",
      priority: "high",
    }),
    [id]
  );

  const avatarStyle: ImageStyle = useMemo(() => {
    const imageSize = showStoryIndicator
      ? size * (1 - 4 * AVATAR_PHOTO_TO_GAP_RATIO)
      : size;

    return {
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize * 0.5,
    };
  }, [size, showStoryIndicator]);

  const containerStyleList: StyleProp<ViewStyle>[] = useMemo(
    () => [
      {
        borderWidth: showStoryIndicator
          ? size * AVATAR_PHOTO_TO_GAP_RATIO
          : undefined,
        borderRadius: size * 0.5,
        height: size,
        width: size,
      },
      showStoryIndicator ? styles.container : undefined,
      style,
    ],
    [size, showStoryIndicator]
  );

  return (
    <View style={containerStyleList}>
      <FastImage source={avatarSource} resizeMode="cover" style={avatarStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#3F71F2",
    flexWrap: "nowrap",
  },
});

export default Avatar;
