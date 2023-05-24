import { Client } from "pg";
import { VideoDto } from "@dto/video/video.dto.js";
import { VideoWithLikeCountDto } from "@dto/video/video-with-like-count.dto.js";

export class VideoRepository {
    public readonly tablename;

    constructor(private readonly dbConnection: Client, tablename: string) {
        this.tablename = tablename;
    }

    async getFavoriteVideos() {
        const result = await this.dbConnection.query<VideoDto>(`
            SELECT * 
            FROM ${this.tablename}
            WHERE id IN (
            '17f760dc-6a39-45a7-9ad4-3f158fd96805',
            '9fe36789-4a45-409e-bf8d-540a67a49e6a',
            '6710e07b-11e0-410d-bd20-70839fd2aa5f',
            'e1b1341f-e657-4866-b9e9-8742805cf1f4',
            '90750e4d-f449-4853-a3ae-c1860b7ed501'
            )
        `);
        return result.rows;
    }

    async getTheMostPopularVideos(){
        const result = await this.dbConnection.query<VideoWithLikeCountDto>(`
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
                     FROM ${this.tablename} v
                              JOIN likes l
                                   ON v.id = l.video_id
                     GROUP BY v.id
                 ) v
            WHERE v.positive_like_count > 4
            ORDER BY total_like_count DESC
                LIMIT 10;
        `)
        return result.rows
    }
}