import { InjectionToken } from "@angular/core";

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export const NOTIFY_DATA = new InjectionToken<NotificationData>('NOTIFY_DATA');

export interface NotificationData {
    message: string;
    type: NotificationType;
    autoDismiss: boolean;
    pauseOnHover: boolean;
    autoDismissTimeout: number;
    msgId?: number;
    extraData?: any;
}
