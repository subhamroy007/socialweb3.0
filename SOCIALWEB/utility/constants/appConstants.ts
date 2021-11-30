import { Dimensions } from "react-native";

export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;

export const THERESHOLDLENGTH = 30;

export const IMAGE_POST_MIN_HEIGHT = 200;
export const IMAGE_POST_MAX_HEIGHT = 500;

export const AVATAR_PHOTO_TO_GAP_RATIO = 2.5 / 64;

export const ROUNDED_ICON_SIZE_TO_GAP_RATIO = 3 / 24;

export const TAG_IMAGE_SIZE_RATIO = 16 / 320;

export const TAG_TEXT_SIZE_RATIO = 10 / 320;

export const TAG_GAP_RAIO = 4 / 320;

export const TAG_BORDER_RADIUS_RATIO = 16 / 320;

export const USER_INFO_PRIMARY_TEXT_SIZE = (12 / 320) * WINDOW_WIDTH;

export const USER_INFO_SECONDARY_TEXT_SIZE = (10 / 320) * WINDOW_WIDTH;

export const NAME_VALUE_PAIR_NAME_FONT_SIZE = (14 / 320) * WINDOW_WIDTH;
export const NAME_VALUE_PAIR_VALUE_FONT_SIZE = (16 / 320) * WINDOW_WIDTH;

export const TAB_ICON_SIZE_RATIO = 30 / 320;

export const PROFILE_BIO_TEXT_SIZE = (12 / 320) * WINDOW_WIDTH;

export const PROFILE_LINK_CONTAINER_MARGIN = (24 / 320) * WINDOW_WIDTH;

export const PROFILE_SCREEN_PADDING = (8 / 320) * WINDOW_WIDTH;

export const PROFILE_META_CONTAINER_PADDING = (16 / 320) * WINDOW_WIDTH;

export const PROFILE_ICON_GAP = (16 / 320) * WINDOW_WIDTH;

export const PROFILE_NAME_VALUE_PAIR_GAP = (16 / 320) * WINDOW_WIDTH;

export const PROFILE_META_LINK_GAP = (16 / 320) * WINDOW_WIDTH;

//----------------------------------------shutter constants------------------------------------------------
export const SHUTTER_TOP_RADIUS = (16 / 320) * WINDOW_WIDTH;

export const SHUTTER_TRANSLATION_ANIMATION_DURATION = 150;

export const SHUTTER_TRANSLATION_ANIMATION_VELOCITY_THRESHOLD = 0.5;

export const SHUTTER_OVERLAY_MAX_OPACITY = 0.64;

export const SHUTTER_SCROLL_EVENT_THROTTLE = 1;

export const SHUTTER_CAROSOL_ACTIVE_DOT_SIZE = 6;

export const SHUTTER_CAROSOL_NORMAL_DOT_SIZE = 4;

export const SHUTTER_HEIGHT = Math.floor(WINDOW_HEIGHT * 0.47);

export const SHUTTER_ABSOLUTE_TOP_POSITION =
  WINDOW_HEIGHT - Math.floor((SHUTTER_HEIGHT * 4) / 25);

export const SHUTTER_TRANSLATION_Y_MIN =
  Math.floor((SHUTTER_HEIGHT * 4) / 25) - SHUTTER_HEIGHT;

export const SHUTTER_TRANSLATION_Y_MAX = 0;

export const SHUTTER_BODY_LIST_ITEM_HEIGHT =
  SHUTTER_HEIGHT * (18 / 25) * (4 / 5);

export const SHUTTER_ICON_SIZE = Math.floor(
  SHUTTER_BODY_LIST_ITEM_HEIGHT * 0.27
);

export const SHUTTER_ICON_VERTICAL_MARGIN =
  (SHUTTER_BODY_LIST_ITEM_HEIGHT -
    2 *
      (SHUTTER_ICON_SIZE +
        2 * SHUTTER_ICON_SIZE * ROUNDED_ICON_SIZE_TO_GAP_RATIO)) /
  2;

export const SHUTTER_ICON_HORIZONTAL_MARGIN =
  (WINDOW_WIDTH -
    2 *
      (SHUTTER_ICON_SIZE +
        2 * SHUTTER_ICON_SIZE * ROUNDED_ICON_SIZE_TO_GAP_RATIO)) /
  7.5;

//----------------------------------------font size constants------------------------------------------------

export const FONT_SIZE_REF_10 = (10 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_12 = (12 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_14 = (14 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_16 = (16 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_18 = (18 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_20 = (20 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_22 = (22 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_24 = (24 / 320) * WINDOW_WIDTH;
export const FONT_SIZE_REF_1 = (1 / 320) * WINDOW_WIDTH;

//----------------------------------------margin and padding size constants------------------------------------------------

export const GAP_SIZE_REF_2 = (2 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_4 = (4 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_6 = (6 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_8 = (8 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_10 = (10 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_12 = (12 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_14 = (14 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_16 = (16 / 320) * WINDOW_WIDTH;
export const GAP_SIZE_REF_1 = (1 / 320) * WINDOW_WIDTH;

//----------------------------------------size constants------------------------------------------------
export const SIZE_REF_2 = (2 / 320) * WINDOW_WIDTH;
export const SIZE_REF_4 = (4 / 320) * WINDOW_WIDTH;
export const SIZE_REF_6 = (6 / 320) * WINDOW_WIDTH;
export const SIZE_REF_8 = (8 / 320) * WINDOW_WIDTH;
export const SIZE_REF_10 = (10 / 320) * WINDOW_WIDTH;
export const SIZE_REF_12 = (12 / 320) * WINDOW_WIDTH;
export const SIZE_REF_14 = (14 / 320) * WINDOW_WIDTH;
export const SIZE_REF_16 = (16 / 320) * WINDOW_WIDTH;
export const SIZE_REF_1 = (1 / 320) * WINDOW_WIDTH;
