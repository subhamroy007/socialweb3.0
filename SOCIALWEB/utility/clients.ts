import { serveImageFeed } from "../server/routes/imagePost";
import { AppError } from "./types2";

export const getImageFeed = async (
  pageId: number,
  userId: string,
  customHeaders: HeadersInit
) => {
  try {
    /*const response = await fetch(
      `https://mockapi/imagefeed/?pageNo=${pageNo}`,
      {
        method: "GET",
        cache: "no-cache",
        credentials: "omit",
        headers: {
          ...customHeaders,
          "Content-Type": "application/json",
        },
        keepalive: true,
      }
    );

    const responseBody = (await response.json()) as ImageFeedResponse;*/

    const responseBody = serveImageFeed(pageId, userId);

    return responseBody;
  } catch (e: any) {
    console.log("error happend while fetching image feed response");
    const responseBody: AppError = {
      code: 1000,
      message: "unable to refresh feed",
    };
    throw responseBody;
  }
};
