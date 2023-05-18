import {IChannelController} from "../../common/interface/controller/channel/IChannel.controller.js";
import {IView} from "../../common/interface/view/IView.js";
import {IChannelRepository} from "../../common/interface/repository/channel/IChannel.repository.js";

export class ChannelController implements IChannelController {
    constructor(
        private readonly channelRepo: IChannelRepository,
        private readonly view: IView,
    ) {}

    async updateChannelInfoView(id: string) {
        await this.view.showWithTablename(
            this.channelRepo.tablename,
            "Info about channel by id",
            await this.channelRepo.getInfoById(id)
        );
    }
}