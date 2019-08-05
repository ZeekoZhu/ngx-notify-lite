import { Component, Input, OnInit } from '@angular/core';
import { NotificationData } from "../notification-data";

@Component({
    selector: 'ngx-default-notify-template',
    templateUrl: './default-notify-template.component.html',
    styleUrls: ['./default-notify-template.component.less']
})
export class DefaultNotifyTemplateComponent implements OnInit {
    @Input() data: NotificationData;

    constructor() {
    }

    ngOnInit() {
    }

}
