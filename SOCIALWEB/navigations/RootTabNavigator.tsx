import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  ImageFeedScreenHeader,
  NotificationScreenHeader,
  ProfileScreenHeader,
  SavedScreenHeader,
  SettingsScreenHeader,
  TrendingScreenHeader,
  VideoFeedScreenHeader,
} from "../components/global/headers";
import AdvancedShutter from "../components/shutter/AdvancedShutter";
import NewImageFeedScreen from "../screens/NewImageFeedScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SavedDataScreen from "../screens/SavedDataScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TrendingScreen from "../screens/TrendingScreen";
import VideoFeedScreen from "../screens/VideoFeedScreen";
import { RootTabNavigatorParamList } from "../utility/types";
import UtilityStackNavigator from "./UtilityStackNavigator";

const TabNavigator = createBottomTabNavigator<RootTabNavigatorParamList>();

const RootTabNavigator = () => {
  return (
    <TabNavigator.Navigator
      backBehavior="history"
      tabBar={(props) => <AdvancedShutter {...props} />}
      initialRouteName="VideoFeedScreen"
    >
      <TabNavigator.Screen
        name="ImageFeedScreen"
        component={NewImageFeedScreen}
        options={{ header: (props) => <ImageFeedScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="VideoFeedScreen"
        component={VideoFeedScreen}
        options={{ header: (props) => <VideoFeedScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ header: (props) => <ProfileScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="TrendingScreen"
        component={TrendingScreen}
        options={{ header: (props) => <TrendingScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ header: (props) => <NotificationScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="SavedDataScreen"
        component={SavedDataScreen}
        options={{ header: (props) => <SavedScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ header: (props) => <SettingsScreenHeader {...props} /> }}
      />
      <TabNavigator.Screen
        name="Stacks"
        component={UtilityStackNavigator}
        options={{ headerShown: false, unmountOnBlur: true, lazy: true }}
      />
    </TabNavigator.Navigator>
  );
};

export default RootTabNavigator;
