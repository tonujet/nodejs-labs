import {VideoRepository} from "../../repository/video/video.repository.js";
import {IVideoController} from "../../common/interface/controller/video/IVideo.controller.js";
import {IView} from "../../common/interface/view/IView.js";
import {IVideoRepository} from "../../common/interface/repository/video/IVideo.repository.js";

export class VideoController implements IVideoController{

    constructor(
        private readonly videoRepo: IVideoRepository,
        private readonly view: IView,
    ) {}

    async updateFavoriteVideosView() {
        await this.view.showWithTablename(
            this.videoRepo.tablename,
            "My favorite videos",
            await this.videoRepo.getFavoriteVideos()
        )
    }

    async updateMostPopularVideosView() {
        await this.view.showWithTablename(
            this.videoRepo.tablename,
            "The most popular videos",
            await this.videoRepo.getTheMostPopularVideos()
        )
    }

}