import { VideoDto } from "./video.dto.js";

export interface VideoWithLikeCountDto extends VideoDto {
  total_like_count: number;
}
