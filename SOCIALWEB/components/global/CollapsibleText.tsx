import { StyleSheet } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { MediumText, RegularText } from "../../utility/ui";
import { THERESHOLDLENGTH } from "../../utility/constants/appConstants";
import { CollapseTextProps } from "../../utility/types/other_types";
import { SafeAreaView } from "react-native-safe-area-context";

const CollapsibleText = ({ children, style }: CollapseTextProps) => {
    const text: string = children as string;
    const length = text.length;
    // isCollapsed is react state variable maintained to check whether the text component is expanded or not. The deafult value is true.
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    // textSliceHandler function returns a substring from the original string based on the position of the first occurance of '\n', in comparison with THRESHOLD length.
    const textSliceHandler = useMemo((): string => {
        let slice: string = "";
        let position: number = text.indexOf("\n");
        if (position < THERESHOLDLENGTH && position !== -1) {
            slice = text.slice(0, position);
        } else {
            slice = text.slice(0, THERESHOLDLENGTH - 1);
        }
        return slice;
    }, []);

    const resultText: string = isCollapsed ? textSliceHandler : text; // Contains the resultant string based the isCollapsed state.

    // A callback function to control the value of the isCollapsed state.
    const collapseStateHandler = useCallback(() => {
        if (isCollapsed) {
            setIsCollapsed(false);
        } else {
            setIsCollapsed(true);
        }
    }, [isCollapsed]);
    const collapseToggler = isCollapsed ? (
        <MediumText style={styles.collapseToggler}> Read more</MediumText>
    ) : (
        <MediumText style={[styles.collapseToggler]}> Read less</MediumText>
    );
    return (
        <SafeAreaView style={[styles.textContainer, style]}>
            <RegularText onPress={collapseStateHandler}>
                {resultText}
                {length < THERESHOLDLENGTH ? null : collapseToggler}
            </RegularText>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    collapseToggler: {
        color: "gray",
    },
    textContainer: {
        width: "95%",
        flexDirection: "row",
        alignContent: "flex-start",
        flexWrap: "nowrap",
    },
});

export default CollapsibleText;
