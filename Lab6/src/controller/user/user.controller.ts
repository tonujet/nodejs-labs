import {UserRepository} from "../../repository/user/user.repository.js";
import {IUserController} from "../../common/interface/controller/user/IUser.controller.js";
import {IView} from "../../common/interface/view/IView.js";
import {IUserRepository} from "../../common/interface/repository/user/IUser.repository.js";

export class UserController implements IUserController{
    constructor(
        private readonly userRepo: IUserRepository,
        private readonly view: IView
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