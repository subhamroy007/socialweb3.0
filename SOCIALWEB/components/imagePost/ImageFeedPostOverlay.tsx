import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePostMetaText from "./ImagePostMetaText";
import Tag from "../global/Tag";
import { SIZE_REF_12, SIZE_REF_16, SIZE_REF_8 } from "../../utility/constants";
import { AnimatedSafeAreaView } from "../../utility/ui";

export interface ImageFeedPostOverlayProps {
  isVisible: boolean;
  style?: StyleProp<ViewStyle>;
}

const ImageFeedPostOverlay = ({
  style,
  isVisible,
}: ImageFeedPostOverlayProps) => {
  //reference that controls the opacity of the overlay in animation effect
  const animatedData = useRef(new Animated.Value(0)).current;

  const [zIndex, setZIndex] = useState<number>(-1);

  useEffect(() => {
    setZIndex(5);
    if (isVisible) {
      Animated.timing(animatedData, {
        toValue: 1,
        useNativeDriver: true,
        duration: 150,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(animatedData, {
        toValue: 0,
        useNativeDriver: true,
        duration: 150,
        easing: Easing.linear,
      }).start(({ finished }) => setZIndex(-1));
    }

    return () => {
      animatedData.stopAnimation();
    };
  }, [animatedData, isVisible]);

  const overlayStyleList = useMemo(() => {
    return [{ opacity: animatedData, zIndex }, style, styles.overlay];
  }, [style, zIndex, animatedData]);

  const iconList = useMemo(
    () => [
      { name: "heart-solid", color: "white", size: SIZE_REF_12 * 2 },
      { name: "comment-solid", color: "white", size: SIZE_REF_12 * 2 },
      { name: "send", color: "white", size: SIZE_REF_12 * 2 },
    ],
    []
  );

  return (
    <Animated.View style={overlayStyleList}>
      <ScrollView
        style={styles.overlayScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        pagingEnabled={true}
        horizontal={true}
      >
        <View style={[styles.metaDataSecion, style]}>
          <View style={styles.metaDataWrapper}>
            <ImagePostMetaText
              filteredReference={["you", "akshay_kumar2.0"]}
              numberOfData={5693}
              icon={iconList[0]}
              style={styles.metaDeta}
            />

            <ImagePostMetaText
              filteredReference={["ananyapanda"]}
              numberOfData={90253}
              icon={iconList[1]}
              style={styles.metaDeta}
            />

            <ImagePostMetaText numberOfData={254} icon={iconList[2]} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.tagListSection}
          style={style}
        >
          <Tag id="ananyapanda" style={styles.tagListItem} />
          <Tag id="aliya2.0" style={styles.tagListItem} />
          <Tag id="akshay_kumar" style={styles.tagListItem} />
          <Tag id="roybond007" style={styles.tagListItem} />
          <Tag id="sumaxx" style={styles.tagListItem} />
          <Tag id="subrata_kolay" style={styles.tagListItem} />
          <Tag id="babai420" style={styles.tagListItem} />
          <Tag id="kushalroy" style={styles.tagListItem} />
          <Tag id="ananyapanda" style={styles.tagListItem} />
          <Tag id="aliya2.0" style={styles.tagListItem} />
          <Tag id="akshay_kumar" style={styles.tagListItem} />
          <Tag id="roybond007" style={styles.tagListItem} />
          <Tag id="sumaxx" style={styles.tagListItem} />
          <Tag id="subrata_kolay" style={styles.tagListItem} />
          <Tag id="babai420" style={styles.tagListItem} />
          <Tag id="kushalroy" style={styles.tagListItem} />
        </ScrollView>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    top: 0,
    left: 0,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  metaDataSecion: {
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    padding: SIZE_REF_8,
  },
  metaDataWrapper: {
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  tagListSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: SIZE_REF_8 * 3,
    paddingLeft: SIZE_REF_8,
    justifyContent: "space-between",
  },
  overlayScroll: {
    flex: 1,
    width: "100%",
  },
  tagListItem: {
    marginBottom: SIZE_REF_8 * 3,
    marginRight: SIZE_REF_8,
  },
  metaDeta: {
    marginBottom: SIZE_REF_16,
  },
});

export default ImageFeedPostOverlay;
