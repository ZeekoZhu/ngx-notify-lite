import { Component } from '@angular/core';
import { NotificationData } from '../../../notify-lite/src/lib/notification-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'playground';
    data: NotificationData = {
        autoDismiss: false,
        message: 'Amet soufflé carrot cake tootsie roll jelly-o chocolate cake.',
        pauseOnHover: true,
        autoDismissTimeout: 2000,
        type: 'success'
    };

    constructor() {
    }
}
