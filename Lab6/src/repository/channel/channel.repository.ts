import { Pool } from "pg";
import { ChannelPlusSubscriberNumberDto } from "@dto/channel/channel-plus-subcriber-number.dto.js";

export class ChannelRepository {
  constructor(
    private readonly dbConnection: Pool,
    public readonly tablename: string
  ) {}

  getInfoById(id: string): Promise<ChannelPlusSubscriberNumberDto> {
    const queryText = `
        SELECT c.*, COUNT(s) as subscribers
        FROM channels c
        JOIN subscriptions s
        ON c.id = s.channel_id
        WHERE c.id = $1
        GROUP BY c.id
    `;
    const values = [id];
    return this.dbConnection
      .query<ChannelPlusSubscriberNumberDto>(queryText, values)
      .then(result => result.rows[0]);
  }
}
