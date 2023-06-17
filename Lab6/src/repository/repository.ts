import { ChannelRepository } from "./channel/channel.repository.js";
import { UserRepository } from "./user/user.repository.js";
import { VideoRepository } from "./video/video.repository.js";
import { dbConnection } from "../db.config.js";
import { TablenamesEnum } from "@enum/db/tablenames.enum.js";

const userRepo = new UserRepository(dbConnection, TablenamesEnum.USER);
const videoRepo = new VideoRepository(dbConnection, TablenamesEnum.VIDEO);
const channelRepo = new ChannelRepository(dbConnection, TablenamesEnum.CHANNEL);

export { userRepo, videoRepo, channelRepo };
