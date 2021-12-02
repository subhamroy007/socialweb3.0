import React, { ReactElement, useCallback } from "react";
import {
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { SIZE_REF_4 } from "../../utility/constants";
import { createKeyExtractor } from "../../utility/helpers";
import { ConfiguredFlatList } from "../../utility/ui";
import HashTag from "./HashTag";
import ItemSeparator from "./ItemSeparator";

export interface HashTagListProps {
  data: string[];
  style?: StyleProp<ViewStyle>;
}

const renderItem = (item: ListRenderItemInfo<string>) => {
  return <HashTag id={item.item} />;
};

const keyExtractor = createKeyExtractor("hashtag");

const HashTagList = ({ data, style }: HashTagListProps) => {
  const itemSeparetorCallback = useCallback(
    () => <ItemSeparator axis="vertical" length={SIZE_REF_4} />,
    []
  );

  return (
    <View style={[styles.container, style]}>
      <ConfiguredFlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={itemSeparetorCallback}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },

  listContentContainer: {
    paddingVertical: 0,
    paddingHorizontal: SIZE_REF_4,
  },
});

export default HashTagList;
