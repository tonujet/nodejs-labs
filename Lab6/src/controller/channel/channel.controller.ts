import { ChannelRepository } from "@repository/channel/channel.repository.js";
import { ConsoleView } from "@view/console/console.view.js";

export class ChannelController {
    constructor(
        private readonly channelRepo: ChannelRepository,
        private readonly view: ConsoleView,
    ) {}

    async updateChannelInfoView(id: string) {
        await this.view.showWithTablename(
            this.channelRepo.tablename,
            "Info about channel by id",
            await this.channelRepo.getInfoById(id)
        );
    }
}