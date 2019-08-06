import { Component } from '@angular/core';
import { NotificationData } from '../../../notify-lite/src/lib/notification-data';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'playground';
    data: NotificationData[] = [
        {
            autoDismiss: false,
            message: '【云闪付】恭喜您在“云闪付消费领红包”活动中获得0.1元的红包奖励，立即前往“云闪付APP首页-热门应用-领奖中心”领取（中奖7天内领取有效）。【中国银联】',
            pauseOnHover: true,
            autoDismissTimeout: 2000,
            type: 'success'
        },
        {
            autoDismiss: false,
            message: '【云闪付】恭喜您在“云闪付消费领红包”活动中获得0.1元的红包奖励，立即前往“云闪付APP首页-热门应用-领奖中心”领取（中奖7天内领取有效）。【中国银联】',
            pauseOnHover: true,
            autoDismissTimeout: 2000,
            type: 'info'
        },
        {
            autoDismiss: false,
            message: '【云闪付】恭喜您在“云闪付消费领红包”活动中获得0.1元的红包奖励，立即前往“云闪付APP首页-热门应用-领奖中心”领取（中奖7天内领取有效）。【中国银联】',
            pauseOnHover: true,
            autoDismissTimeout: 2000,
            type: 'warning'
        },
        {
            autoDismiss: false,
            message: '【云闪付】恭喜您在“云闪付消费领红包”活动中获得0.1元的红包奖励，立即前往“云闪付APP首页-热门应用-领奖中心”领取（中奖7天内领取有效）。【中国银联】',
            pauseOnHover: true,
            autoDismissTimeout: 2000,
            type: 'error'
        },
    ];

    constructor() {
    }
}
