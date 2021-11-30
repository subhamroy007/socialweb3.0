import React, { useCallback } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    FONT_SIZE_REF_12,
    FONT_SIZE_REF_14,
    FONT_SIZE_REF_16,
    GAP_SIZE_REF_4,
} from "../utility/constants/appConstants";
import { UserChatContactProps } from "../utility/types/other_types";
import { BoldText, RegularText } from "../utility/ui";
import Badge from "./Badge";
import Avatar from "./global/Avatar";

const UserChatContact = ({
    avatarUrl,
    name,
    timeStamp,
    text,
    unreadCount,
    style,
}: UserChatContactProps) => {
    const chatPressHandler = useCallback(() => {}, []);

    return (
        <Pressable
            style={[styles.container, style]}
            onPress={chatPressHandler}
            android_ripple={{ color: "grey" }}
        >
            <SafeAreaView style={styles.avatarContainer}>
                <Avatar size={72} url={avatarUrl} />
            </SafeAreaView>
            <SafeAreaView style={styles.template}>
                <SafeAreaView style={styles.subContainer}>
                    <BoldText style={styles.textLg}>{name}</BoldText>
                    <RegularText style={styles.textSm}>{timeStamp}</RegularText>
                </SafeAreaView>
                <SafeAreaView style={styles.subContainer}>
                    <RegularText numberOfLines={1} style={styles.textMd}>
                        ✓✓{text}
                    </RegularText>
                    {unreadCount ? <Badge count={unreadCount} /> : null}
                </SafeAreaView>
            </SafeAreaView>
        </Pressable>
    );
};

export default UserChatContact;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        padding: GAP_SIZE_REF_4,
    },
    avatarContainer: {
        paddingHorizontal: GAP_SIZE_REF_4,
        width: "20%",
    },
    template: {
        width: "80%",
        padding: GAP_SIZE_REF_4,
        justifyContent: "space-around",
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textLg: {
        fontSize: FONT_SIZE_REF_16,
    },
    textMd: {
        fontSize: FONT_SIZE_REF_14,
    },
    textSm: {
        fontSize: FONT_SIZE_REF_12,
    },
});
