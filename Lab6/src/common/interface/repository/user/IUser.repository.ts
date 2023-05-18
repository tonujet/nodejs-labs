import {UserWithChannelDto} from "../../../../dto/user/user-with-channel.dto.js";
import {BriefVideoDto} from "../../../../dto/video/brief.video.dto.js";
import {UserWithSubscriptionsDto} from "../../../../dto/user/user-with-subscriptions.dto.js";

export interface IUserRepository {
    tablename: string;
    getUsersWithChannel: () => Promise<UserWithChannelDto[]>;
    getVideosFromSubscriptionsByName: (name: string) => Promise<BriefVideoDto[]>;
    getSortedSubscriptionsByName: (name: string) => Promise<UserWithSubscriptionsDto[]>
}