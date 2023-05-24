import { Pool } from "pg";
import { UserWithChannelDto } from "@dto/user/user-with-channel.dto.js";
import { BriefVideoDto } from "@dto/video/brief.video.dto.js";
import { UserWithSubscriptionsDto } from "@dto/user/user-with-subscriptions.dto.js";
import { SubscriptionLevelEnum } from "@enum/subcription/subscription-level.enum.js";

export class UserRepository {
    public readonly tablename;

    constructor(private readonly dbConnection: Pool, tablename: string) {
        this.tablename = tablename;
    }

    async getUsersWithChannel() {
      const queryText = `
            SELECT 
                u.id, u.name,
                u.avatar_url, c.photo_url, 
                c.description, c.created_at     
            FROM users u
            JOIN channels c 
            ON u.id = c.user_id
            ORDER BY created_at ASC
      `
        const result = await this.dbConnection.query<UserWithChannelDto>(queryText);
        return result.rows;
    }

    async getVideosFromSubscriptionsByName(name: string) {
        const queryText = `
            SELECT 
                v.id, v.title, v.preview_url,
                v.duration, v.published_at
            FROM users u
            JOIN subscriptions s 
            ON u.id = s.user_id
            JOIN channels ch 
            ON ch.id = s.channel_id
            JOIN videos v 
            ON ch.id = v.channel_id
            WHERE u.name = $1
            ORDER BY v.published_at ASC
        `;
        const values = [name];
        const result = await this.dbConnection.query<BriefVideoDto>(queryText, values);
        return result.rows
    }


    async getSortedSubscriptionsByName(name: string) {
        const queryText = `
            SELECT u.name,
                   u.avatar_url,
                   c.photo_url,
                   c.description,
                   s.level,
                   s.subscribed_at
            FROM users u
                     JOIN subscriptions s
                          ON u.id = s.user_id
                     JOIN channels c
                          ON c.id = s.channel_id
            WHERE u.name = $1
            ORDER BY CASE s.level
                         WHEN $2 THEN 4
                         WHEN $3 THEN 3
                         WHEN $4 THEN 2
                         WHEN $5 THEN 1
                         END,
                     s.subscribed_at ASC
        `
        const values = [
          name,
          SubscriptionLevelEnum.STANDART, SubscriptionLevelEnum.FAN,
          SubscriptionLevelEnum.FOLLOWER, SubscriptionLevelEnum.VIP
        ]
        const result = await this.dbConnection.query<UserWithSubscriptionsDto>(queryText, values)
        return result.rows
    }
}