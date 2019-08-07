import { EventEmitter, InjectionToken, Injector } from "@angular/core";
import { ComponentPortal } from "@angular/cdk/portal";
import { NotificationData } from '../notification-data';
import { DefaultNotifyTemplateComponent } from "./default-notify-template.component";

export interface NotificationTemplate {
    dismiss: EventEmitter<void>;
    data: NotificationData;
}

export type ComponentPortalFactory<TComp extends NotificationTemplate> = (injector: Injector) => ComponentPortal<TComp>;

export interface NotificationConfig {
    portalFactory: ComponentPortalFactory<any>;
}

export const NGX_NOTIFY_CONFIG = new InjectionToken<NotificationConfig>('NGX_NOTIFY_LITE_CONFIG');

export const defaultConfig: NotificationConfig = {
    portalFactory: injector => new ComponentPortal(DefaultNotifyTemplateComponent, null, injector)
};
