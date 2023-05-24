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
        const result = await this.dbConnection.query<UserWithChannelDto>(`
            SELECT 
                u.id, u.name, u.avatar_url,
                c.photo_url, c.description, c.created_at     
            FROM ${this.tablename} u
            JOIN channels c 
            ON u.id = c.user_id
            ORDER BY created_at ASC
        `);
        return result.rows;
    }

    async getVideosFromSubscriptionsByName(name: string) {
        const result = await this.dbConnection.query<BriefVideoDto>(`
            SELECT 
                v.id, v.title, v.preview_url,
                v.duration, v.published_at
            FROM ${this.tablename} u
            JOIN subscriptions s 
            ON u.id = s.user_id
            JOIN channels ch 
            ON ch.id = s.channel_id
            JOIN videos v 
            ON ch.id = v.channel_id
            WHERE u.name = '${name}'
            ORDER BY v.published_at ASC
        `)
        return result.rows
    }


    async getSortedSubscriptionsByName(name: string) {
        const result = await this.dbConnection.query<UserWithSubscriptionsDto>(`
            SELECT u.name,
                   u.avatar_url,
                   c.photo_url,
                   c.description,
                   s.level,
                   s.subscribed_at
            FROM ${this.tablename} u
                     JOIN subscriptions s
                          ON u.id = s.user_id
                     JOIN channels c
                          ON c.id = s.channel_id
            WHERE u.name = '${name}'
            ORDER BY CASE s.level
                         WHEN '${SubscriptionLevelEnum.STANDART}' THEN 4
                         WHEN '${SubscriptionLevelEnum.FAN}' THEN 3
                         WHEN '${SubscriptionLevelEnum.FOLLOWER}' THEN 2
                         WHEN '${SubscriptionLevelEnum.VIP}' THEN 1
                         END,
                     s.subscribed_at ASC
        `)
        return result.rows
    }
}