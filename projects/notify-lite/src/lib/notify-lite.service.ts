import { Injectable } from '@angular/core';

export interface NotificationData {
    content: string;
    type: 'success' | 'error' | 'warning' | 'info';
    autoDismiss: boolean;
    pauseOnHover: boolean;
    autoDismissTimeout: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotifyLiteService {

    constructor() {
    }

    notify() {
    }
}
