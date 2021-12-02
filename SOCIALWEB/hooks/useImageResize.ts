import { ResizeMode } from "react-native-fast-image";
import { Size } from "../utility/types2";

const useImageResize = (width: Size, height: Size) => {
  let scaledWidth = 0;
  let scaledHeight = 0;

  let imageResizeMode: ResizeMode = "center";

  if (width.original > height.original) {
    scaledWidth =
      width.original >= width.max
        ? width.max
        : width.original <= width.min
        ? width.min
        : width.original;

    scaledHeight = (scaledWidth * height.original) / width.original;

    imageResizeMode = scaledWidth === width.max ? "cover" : "center";

    if (scaledHeight <= height.min) {
      scaledHeight = height.min;
    } else if (scaledHeight >= height.max) {
      scaledHeight = height.max;
    }
  } else {
    scaledHeight =
      height.original >= height.max
        ? height.max
        : height.original <= height.min
        ? height.min
        : height.original;

    scaledWidth = (width.original * scaledHeight) / height.original;

    imageResizeMode = scaledHeight === height.max ? "cover" : "center";

    if (scaledWidth <= width.min) {
      scaledWidth = width.min;
    } else if (scaledWidth >= width.max) {
      scaledWidth = width.max;
    }
  }

  return {
    width: scaledWidth,
    height: scaledHeight,
    resizeMode: imageResizeMode,
  };
};

export default useImageResize;
