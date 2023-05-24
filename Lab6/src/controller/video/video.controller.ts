import { VideoRepository } from "../../repository/video/video.repository.js";
import { ConsoleView } from "../../view/console/console.view.js";

export class VideoController {

  constructor(
    private readonly videoRepo: VideoRepository,
    private readonly view: ConsoleView
  ) {
  }

  async updateFavoriteVideosView() {
    await this.view.showWithTablename(
      this.videoRepo.tablename,
      "My favorite videos",
      await this.videoRepo.getFavoriteVideos()
    );
  }

  async updateMostPopularVideosView() {
    await this.view.showWithTablename(
      this.videoRepo.tablename,
      "The most popular videos",
      await this.videoRepo.getTheMostPopularVideos()
    );
  }
}