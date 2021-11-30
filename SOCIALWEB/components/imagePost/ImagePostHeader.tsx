import React, { useMemo } from "react";
import Icon from "../global/Icon";
import { StyleSheet, View } from "react-native";
import EntityInfo from "../global/EntityInfo";
import { SIZE_REF_12, SIZE_REF_4, SIZE_REF_8 } from "../../utility/constants";
import { PostHeaderInfo } from "../global/info";

export interface ImagePostHeaderProps {
  id: string;
}

const ImagePostHeader = ({ id }: ImagePostHeaderProps) => {
  return (
    <View style={styles.container}>
      <PostHeaderInfo id={id} size={SIZE_REF_4 * 9} />
      <Icon color="black" name="more-solid" size={SIZE_REF_12 * 2} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SIZE_REF_8,
    paddingHorizontal: SIZE_REF_4,
  },
});

export default ImagePostHeader;
