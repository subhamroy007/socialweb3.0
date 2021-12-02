import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { RegularText } from "../../utility/ui";

function calculateThresholdCharacterIndex(text: string, index: number): number {
  const newLineCharIndex = text.indexOf("\n");
  console.log(newLineCharIndex, index);
  if (index <= text.length) {
    return newLineCharIndex >= index || newLineCharIndex === -1
      ? index
      : newLineCharIndex;
  }

  return newLineCharIndex === -1
    ? index
    : Math.min(text.length - 1, newLineCharIndex);
}

export interface CollapsableTextProps {
  children: string;
  isExpandable: boolean;
  maxNoOfLines?: number;
  maxNoOfCharacters?: number;
}

const CollapsableText = ({
  children,
  isExpandable,
  maxNoOfCharacters,
  maxNoOfLines,
}: CollapsableTextProps) => {
  const [isCollapsed, setCollapsed] = useState<boolean>(true);

  const [text, numberOfLines] = useMemo(() => {
    const allowedNoOfLines = maxNoOfLines && isCollapsed ? maxNoOfLines : 10000;
    const allowedNoOfCharacters =
      maxNoOfCharacters && !maxNoOfLines && isCollapsed
        ? calculateThresholdCharacterIndex(children, maxNoOfCharacters - 1) + 1
        : children.length;

    const visibleText = children.slice(0, allowedNoOfCharacters);
    return [visibleText, allowedNoOfLines];
  }, [children, maxNoOfCharacters, maxNoOfLines, isCollapsed]);

  const textClickCallback = useCallback(
    () => setCollapsed((state) => !state),
    [setCollapsed]
  );

  return (
    <RegularText
      numberOfLines={numberOfLines}
      ellipsizeMode="tail"
      onPress={isExpandable ? textClickCallback : undefined}
      style={styles.text}
    >
      {text}
    </RegularText>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    backgroundColor: "red",
  },
});

export default CollapsableText;
