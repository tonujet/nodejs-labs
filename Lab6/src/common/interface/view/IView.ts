
export interface IView {
    showWithTablename: <T>(tablename: string, title: string, data: T) => void | Promise<void>
}