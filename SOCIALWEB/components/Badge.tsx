import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    FONT_SIZE_REF_10,
    GAP_SIZE_REF_2,
    GAP_SIZE_REF_6,
    SIZE_REF_16,
} from "../utility/constants/appConstants";
import { BadgeProps } from "../utility/types/other_types";
import { MediumText } from "../utility/ui/appText";

const Badge = ({ count, style }: BadgeProps) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <MediumText style={styles.badgeCount}>{count}</MediumText>
        </SafeAreaView>
    );
};

export default Badge;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#07F23B",
        borderRadius: SIZE_REF_16,
        paddingVertical: GAP_SIZE_REF_2,
        paddingHorizontal: GAP_SIZE_REF_6,
        alignItems: "center",
    },
    badgeCount: {
        color: "#FFFFFF",
        fontSize: FONT_SIZE_REF_10,
    },
});
