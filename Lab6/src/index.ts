
import {userController, videoController, channelController} from "./controller/controller.js";


// Task1
await userController.updateChannelView();

// Task2
await videoController.updateFavoriteVideosView();

// Task3
await userController.updateVideoFromSubscriptionsView("Stephanie Bulger");

// Task4
await channelController.updateChannelInfoView("79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76");

// Task5
await videoController.updateMostPopularVideosView();

// Task6
await userController.updateSortedSubscriptionsView("Ennis Haestier");















