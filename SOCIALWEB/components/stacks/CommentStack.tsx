import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  SIZE_REF_1,
  SIZE_REF_10,
  SIZE_REF_12,
  SIZE_REF_16,
  SIZE_REF_2,
  SIZE_REF_4,
} from "../../utility/constants";
import { MediumText, RegularText } from "../../utility/ui";
import Avatar from "../global/Avatar";
import Icon from "../global/Icon";
import ReplyStack from "./ReplyStack";

const CommentStack = () => {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);

  const commentCollapseCallback = useCallback(
    () => setCollapsed((state) => !state),
    [setCollapsed]
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.infoContainer]}>
        <Avatar
          size={SIZE_REF_12 * 2}
          url="data:image/jpeg;base64,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"
        />
        <MediumText style={[styles.text]}>aliya2.0</MediumText>
      </View>
      <RegularText
        style={[styles.commentText]}
        numberOfLines={isCollapsed ? 1 : undefined}
        ellipsizeMode="tail"
        onPress={commentCollapseCallback}
      >
        hello this is a demo text for checking comment and i think that this is
        a graet post and i am very happy that i saw this post it just mady my
        day and i love it.
      </RegularText>
      <View style={[styles.controlsContainer]}>
        <MediumText style={[styles.commentText, styles.replyText]}>
          Reply
        </MediumText>
        <Icon
          color="#EE3434"
          name="heart-solid"
          size={SIZE_REF_16}
          style={[styles.icon]}
        />
        <RegularText style={[styles.timestampText]}>5 mins ago</RegularText>
      </View>
      {!isCollapsed && (
        <View style={[styles.replyContainer]}>
          <ReplyStack />
          <ReplyStack />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  text: {
    fontSize: SIZE_REF_12,
    marginLeft: SIZE_REF_2,
  },
  infoContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  timestampText: {
    fontSize: SIZE_REF_10,
    marginLeft: SIZE_REF_4,
  },
  icon: {
    marginLeft: SIZE_REF_4,
  },
  commentText: {
    fontSize: SIZE_REF_10 + SIZE_REF_1,
  },
  replyText: {
    color: "grey",
  },
  replyContainer: {
    width: "70%",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-end",
    marginTop: SIZE_REF_4,
  },
});

export default CommentStack;
