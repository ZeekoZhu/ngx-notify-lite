export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationData {
    message: string;
    type: NotificationType;
    autoDismiss: boolean;
    pauseOnHover: boolean;
    autoDismissTimeout: number;
}
