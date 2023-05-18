import {SubscriptionLevelEnum} from "../../common/enum/subcription/subscription-level.enum.js";

export interface UserWithSubscriptionsDto {
    name: string,
    avatar_url: string,
    photo_url: string,
    description: string,
    level: SubscriptionLevelEnum,
    subscribed_at: Date
}