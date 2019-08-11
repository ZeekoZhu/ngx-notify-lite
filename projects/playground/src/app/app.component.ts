import { Component } from '@angular/core';
import { NotificationData } from '../../../notify-lite/src/lib/notification-data';
import { NotifyCenterService } from "../../../notify-lite/src/lib/notify-center.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    data: NotificationData =
        {
            autoDismiss: false,
            message: '【云闪付】恭喜您在“云闪付消费领红包”活动中获得0.1元的红包奖励，立即前往“云闪付APP首页-热门应用-领奖中心”领取（中奖7天内领取有效）。【中国银联】',
            pauseOnHover: true,
            autoDismissTimeout: 10000,
            type: 'success'
        };

    constructor(private notifyCenter: NotifyCenterService) {
    }

    notify() {
        this.notifyCenter.show(this.data);
    }

    clearAll() {
        this.notifyCenter.clearAll();
    }
}
