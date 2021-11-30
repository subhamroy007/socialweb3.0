import React, { ReactElement, useCallback, useMemo } from "react";
import {
  StyleProp,
  StyleSheet,
  TextProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "../../store/appStore";
import { selectName, selectUploads } from "../../store/hashTag/selector";
import {
  selectAuthorSocialId,
  selectTimestamp,
} from "../../store/imagePost/selector";
import { selectSocialId, selectUsername } from "../../store/user/selector";
import { SIZE_REF_16, SIZE_REF_4 } from "../../utility/constants";
import { globalColors } from "../../utility/styles";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "./Avatar";
import RoundedIcon from "./RoundedIcon";

export interface InfoProps {
  primaryText: () => ReactElement<TextProps>;
  secondaryText?: () => ReactElement<TextProps>;
  picture: () => ReactElement<ViewProps>;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
}

const Info = ({ picture, primaryText, secondaryText }: InfoProps) => {
  return (
    <View style={styles.container}>
      {picture()}
      <View style={styles.rightContainer}>
        {primaryText()}
        {secondaryText ? secondaryText() : undefined}
      </View>
    </View>
  );
};

const useInfoTextStyle = (
  size: number
): [StyleProp<TextStyle>[], StyleProp<TextStyle>[]] => {
  const textStyles = useMemo<[StyleProp<TextStyle>[], StyleProp<TextStyle>[]]>(
    () => [
      [{ fontSize: size * 0.5 }, globalColors.defaultTextColor],
      [{ fontSize: (size - SIZE_REF_4) * 0.5 }, globalColors.defaultTextColor],
    ],
    [size]
  );

  return textStyles;
};

export interface InfoWrapperProps {
  id: string;
  size: number;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
}

export const UserInfo = ({ id, style, size }: InfoWrapperProps) => {
  const dispatch = useAppDispatch();

  const socialIdSelectorCallback = useCallback(
    (state: RootState) => selectSocialId(state, id),
    [id]
  );
  const usernameSelectorCallback = useCallback(
    (state: RootState) => selectUsername(state, id),
    [id]
  );

  const socialId = useAppSelector(socialIdSelectorCallback);

  const username = useAppSelector(usernameSelectorCallback);

  const avatarRenderCallback = useCallback(
    () => <Avatar size={size} id={id} showStoryIndicator={true} />,
    [id]
  );

  const [primaryTextStyle, secondaryTextStyle] = useInfoTextStyle(size);

  const primaryTextRenderCallback = useCallback(
    () => <MediumText style={primaryTextStyle}>{socialId}</MediumText>,
    [socialId]
  );

  const secondaryTextRenderCallback = useCallback(
    () => <RegularText style={secondaryTextStyle}>{username}</RegularText>,
    [username]
  );

  return (
    <Info
      picture={avatarRenderCallback}
      primaryText={primaryTextRenderCallback}
      secondaryText={secondaryTextRenderCallback}
      style={style}
    />
  );
};

export const PostHeaderInfo = ({ id, style, size }: InfoWrapperProps) => {
  const dispatch = useAppDispatch();

  const socialIdSelectorCallback = useCallback(
    (state: RootState) => selectAuthorSocialId(state, id),
    [id]
  );

  const timestampSelectorCallback = useCallback(
    (state: RootState) => selectTimestamp(state, id),
    [id]
  );

  const socialId = useAppSelector(socialIdSelectorCallback);

  const timestamp = useAppSelector(timestampSelectorCallback);

  const avatarRenderCallback = useCallback(
    () => <Avatar size={size} id={id} showStoryIndicator={true} />,
    [id]
  );

  const [primaryTextStyle, secondaryTextStyle] = useInfoTextStyle(size);

  const primaryTextRenderCallback = useCallback(
    () => <MediumText style={primaryTextStyle}>{socialId}</MediumText>,
    [socialId]
  );

  const secondaryTextRenderCallback = useCallback(
    () => <RegularText style={secondaryTextStyle}>{timestamp}</RegularText>,
    [timestamp]
  );

  return (
    <Info
      style={style}
      picture={avatarRenderCallback}
      primaryText={primaryTextRenderCallback}
      secondaryText={secondaryTextRenderCallback}
    />
  );
};

export const HashTagInfo = ({ id, style, size }: InfoWrapperProps) => {
  const dispatch = useAppDispatch();

  const nameSelectorCallback = useCallback(
    (state: RootState) => selectName(state, id),
    [id]
  );
  const uploadsSelectorCallback = useCallback(
    (state: RootState) => selectUploads(state, id),
    [id]
  );

  const name = useAppSelector(nameSelectorCallback);
  const uploads = useAppSelector(uploadsSelectorCallback);

  const iconRenderCallback = useCallback(
    () => <RoundedIcon color="black" name="hashtag-solid" size={size} />,
    []
  );

  const [primaryTextStyle, secondaryTextStyle] = useInfoTextStyle(size);

  const primaryTextRenderCallback = useCallback(
    () => <MediumText style={primaryTextStyle}>{name}</MediumText>,
    [name]
  );

  const secondaryTextRenderCallback = useCallback(
    () => <RegularText style={secondaryTextStyle}>{uploads}</RegularText>,
    [uploads]
  );

  return (
    <Info
      picture={iconRenderCallback}
      primaryText={primaryTextRenderCallback}
      secondaryText={secondaryTextRenderCallback}
      style={style}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZE_REF_4,
  },
});
