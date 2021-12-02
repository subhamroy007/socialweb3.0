import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { SIZE_REF_12, SIZE_REF_16 } from "../../utility/constants";
import Icon from "./Icon";

const LoadingIndicator = () => {
  const animationControlData = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animationControlData, {
        toValue: 360,
        useNativeDriver: true,
        duration: 500,
        easing: Easing.linear,
      }),
      { resetBeforeIteration: false }
    ).start();

    return () => animationControlData.stopAnimation();
  }, []);

  const loadingIndicatorDynamicStyle = useMemo(
    () => ({
      transform: [
        {
          rotateZ: animationControlData.interpolate({
            inputRange: [0, 360],
            outputRange: [0 + "deg", 360 + "deg"],
            extrapolate: "clamp",
          }),
        },
      ],
    }),
    [animationControlData]
  );

  return (
    <View style={[styles.conatainer]}>
      <Animated.View style={loadingIndicatorDynamicStyle}>
        <Icon color="#D1CBCB" name="loading" size={SIZE_REF_16 * 3} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZE_REF_12 * 2,
  },
});

export default LoadingIndicator;
