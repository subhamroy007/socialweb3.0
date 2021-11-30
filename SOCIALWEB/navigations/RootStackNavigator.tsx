import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { MetaScreenHeader } from "../components/global/headers";
import LiveScreen from "../screens/LiveScreen";
import OverlayScreen from "../screens/OverlayScreen";
import StoryFeedScreen from "../screens/StoryFeedScreen";
import { RootStackNavigatorParamList } from "../utility/types";
import PostMetaNavigator from "./PostMetaNavigator";
import RootTabNavigator from "./RootTabNavigator";

const StackNavigator = createStackNavigator<RootStackNavigatorParamList>();

const RootStackNavigator = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        keyboardHandlingEnabled: true,
        detachPreviousScreen: true,
      }}
    >
      <StackNavigator.Screen name="Tabs" component={RootTabNavigator} />
      <StackNavigator.Screen name="LiveScreen" component={LiveScreen} />
      <StackNavigator.Screen
        name="OverlayScreen"
        component={OverlayScreen}
        options={{
          presentation: "transparentModal",
          cardStyle: { backgroundColor: "transparent" },
          detachPreviousScreen: false,
        }}
      />
      <StackNavigator.Screen
        name="StoryFeedScreen"
        component={StoryFeedScreen}
      />
      <StackNavigator.Screen
        name="PostMetaInfoStack"
        component={PostMetaNavigator}
        options={{
          header: (props) => <MetaScreenHeader {...props} />,
          headerShown: true,
          headerTitle: "Comments",
        }}
      />
    </StackNavigator.Navigator>
  );
};

export default RootStackNavigator;
