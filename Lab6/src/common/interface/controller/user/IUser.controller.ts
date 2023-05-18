export interface IUserController {
    updateChannelView: () => void

    updateSortedSubscriptionsView: (username: string) => void

    updateVideoFromSubscriptionsView: (username: string) => void
}