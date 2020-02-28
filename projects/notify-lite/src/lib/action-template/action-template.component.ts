import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NotificationTemplate } from '../notification-config';
import { NotificationData } from '../notification-data';

export interface ActionDefinition {
    label: string;
    callback: () => void;
}

@Component({
    selector: 'ngx-action-template',
    templateUrl: './action-template.component.html',
    styleUrls: ['./action-template.component.less']
})
export class ActionTemplateComponent implements NotificationTemplate {

    constructor() {
    }

    @Input() data: NotificationData;
    @ViewChild('bar') barRef: ElementRef<HTMLDivElement>;
    @Output() dismissed = new EventEmitter<void>();
    show = true;

    get actions() {
        if (this.data && this.data.extraData) {
            return this.data.extraData as ActionDefinition[];
        }
        return [];
    }

    handleAction(action: ActionDefinition) {
        action.callback();
        this.dismiss();
    }

    dismiss() {
        this.show = false;
        setTimeout(() => {
            this.dismissed.emit();
        }, 400);
    }
}
