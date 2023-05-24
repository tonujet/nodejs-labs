
import {userController, videoController, channelController} from "./controller/controller.js";


// Task1
await userController.updateChannelView();

// Task2
await videoController.updateVideosView(
  '17f760dc-6a39-45a7-9ad4-3f158fd96805',
  '9fe36789-4a45-409e-bf8d-540a67a49e6a',
  '6710e07b-11e0-410d-bd20-70839fd2aa5f',
  'e1b1341f-e657-4866-b9e9-8742805cf1f4',
  '90750e4d-f449-4853-a3ae-c1860b7ed501'
);

// Task3
await userController.updateVideoFromSubscriptionsView("Stephanie Bulger");

// Task4
await channelController.updateChannelInfoView("79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76");

// Task5
await videoController.updateMostPopularVideosView(10, 4);

// Task6
await userController.updateSortedSubscriptionsView("Ennis Haestier");















