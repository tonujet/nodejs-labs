import {ChannelController} from "./channel/channel.controller.js";
import {UserController} from "./user/user.controller.js";
import {VideoController} from "./video/video.controller.js";
import {consoleView} from "@view/view.js";
import {userRepo, channelRepo, videoRepo} from "@repository/repository.js";

const channelController = new ChannelController(channelRepo, consoleView);
const userController = new UserController(userRepo, consoleView);
const videoController = new VideoController(videoRepo, consoleView);


export {channelController, userController, videoController}