import { Pool } from "pg";
import { VideoDto } from "@dto/video/video.dto.js";
import { VideoWithLikeCountDto } from "@dto/video/video-with-like-count.dto.js";

export class VideoRepository {
  constructor(
    private readonly dbConnection: Pool,
    public readonly tablename: string
  ) {}

  getVideos(names: string[]): Promise<VideoDto[]> {
    const queryText = `
            SELECT * 
            FROM videos
            WHERE id = ANY ($1)
        `;
    const values = [names];
    return this.dbConnection
      .query<VideoDto>(queryText, values)
      .then(result => result.rows);
  }

  getTheMostPopularVideos(
    limit: number,
    positiveLikes: number
  ): Promise<VideoWithLikeCountDto[]> {
    const queryText = `
             SELECT
                v.id,
                v.channel_id,
                v.title,
                v.description,
                v.preview_url,
                v.file_url,
                v.duration,
                v.published_at,
                v.total_like_count
            FROM (
                     SELECT
                         COUNT(l) as total_like_count,
                         COUNT(l.positive = true OR NULL) as positive_like_count,
                         v.*
                     FROM videos v
                              JOIN likes l
                                   ON v.id = l.video_id
                     GROUP BY v.id
                 ) v
            WHERE v.positive_like_count > $1
            ORDER BY total_like_count DESC
                LIMIT $2;
        `;
    const values = [positiveLikes, limit];
    return this.dbConnection
      .query<VideoWithLikeCountDto>(queryText, values)
      .then(result => result.rows);
  }
}
