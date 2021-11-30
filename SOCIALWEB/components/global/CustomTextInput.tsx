import React, { useCallback, useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
    GAP_SIZE_REF_4,
    GAP_SIZE_REF_8,
} from "../../utility/constants/appConstants";

const CustomTextInput = ({
    placeHolder,
    multiLine,
    secureTextEntry,
    style,
    maxLength,
    inputChangeHandler,
    otherProps,
}: {
    placeHolder: string;
    maxLength?: number;
    multiLine?: boolean;
    secureTextEntry?: boolean;
    style?: StyleProp<ViewStyle>;
    inputChangeHandler?: (text: string) => void;
    otherProps?: any;
}) => {
    const [textValue, setTextValue] = useState<string>("");
    const textChangeHandler = useCallback(
        (text: string) => {
            setTextValue(text);
            // inputChangeHandler(text);
        },
        [textValue]
    );
    return (
        <TextInput
            value={textValue}
            onChangeText={textChangeHandler}
            placeholder={placeHolder}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, style]}
            multiline={multiLine}
            maxLength={maxLength}
            {...otherProps}
        />
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    textInput: {
        width: "85%",
        paddingVertical: GAP_SIZE_REF_4,
        paddingHorizontal: GAP_SIZE_REF_8,
    },
});