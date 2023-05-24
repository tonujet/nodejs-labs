import { Pool } from "pg";
import { ChannelPlusSubscriberNumberDto } from "@dto/channel/channel-plus-subcriber-number.dto.js";


export class ChannelRepository {
  public readonly tablename;

  constructor(private readonly dbConnection: Pool, tablename: string) {
    this.tablename = tablename;
  }

  async getInfoById(id: string) {
    const queryText = `
        SELECT c.*, COUNT(s) as subscribers
        FROM channels c
        JOIN subscriptions s
        ON c.id = s.channel_id
        WHERE c.id = $1
        GROUP BY c.id
    `;

    const values = [id];
    const result = await this.dbConnection.query<ChannelPlusSubscriberNumberDto>(queryText, values);
    return result.rows[0];
  }


}