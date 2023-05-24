import { UserRepository } from "@repository/user/user.repository.js";
import { ConsoleView } from "@view/console/console.view.js";

export class UserController {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly view: ConsoleView
    ) {}

    async updateChannelView() {
        await this.view.showWithTablename(
            this.userRepo.tablename,
            "user with channels",
            await this.userRepo.getUsersWithChannel()
        )
    };

    async updateSortedSubscriptionsView(username: string){
        await this.view.showWithTablename(
            this.userRepo.tablename,
            "sorted subscriptions of user",
            await this.userRepo.getSortedSubscriptionsByName(username)
        )
    };

    async updateVideoFromSubscriptionsView(username: string){
        await this.view.showWithTablename(
            this.userRepo.tablename,
            "videos of subscriptions by user",
            await this.userRepo.getVideosFromSubscriptionsByName(username)
        )
    }
}