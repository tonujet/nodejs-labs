import {ChannelPlusSubscriberNumberDto} from "../../../../dto/channel/channel-plus-subcriber-number.dto.js";

export interface IChannelRepository {
    tablename: string;
    getInfoById: (id: string) => Promise<ChannelPlusSubscriberNumberDto>;
}