import { Client } from "pg";
import { ChannelPlusSubscriberNumberDto } from "../../dto/channel/channel-plus-subcriber-number.dto.js";


export class ChannelRepository {
    public readonly tablename;

    constructor(private readonly dbConnection: Client, tablename: string) {
        this.tablename = tablename;
    }

    async getInfoById(id: string) {
        const result = await this.dbConnection.query<ChannelPlusSubscriberNumberDto>(`
            SELECT c.*, COUNT(s) as subscribers
            FROM ${this.tablename} c
            JOIN subscriptions s
            ON c.id = s.channel_id
            WHERE c.id = '${id}'
            GROUP BY c.id
       `);
        return result.rows[0];
    }


}