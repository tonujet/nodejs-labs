import {VideoDto} from "../../../../dto/video/video.dto.js";
import {VideoWithLikeCountDto} from "../../../../dto/video/video-with-like-count.dto.js";

export interface IVideoRepository {
    tablename: string;
    getFavoriteVideos: () => Promise<VideoDto[]>;
    getTheMostPopularVideos: () => Promise<VideoWithLikeCountDto[]>;
}