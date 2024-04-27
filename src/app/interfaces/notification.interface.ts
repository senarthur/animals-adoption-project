export interface INotification {
    text: string,
    read: boolean
}

export function createNotification(): INotification {
    return {
        text: '',
        read: false
    }
}