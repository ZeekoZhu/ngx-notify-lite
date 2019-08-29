import { EventEmitter, InjectionToken, Injector } from '@angular/core';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { NotificationData } from './notification-data';
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';

export interface NotificationTemplate {
    dismissed: EventEmitter<void>;
    data: NotificationData;

    dismiss(): void;
}

export type ComponentPortalFactory<TComp extends NotificationTemplate> = (injector: Injector) => ComponentPortal<TComp>;

export interface NotificationConfig {
    portalFactory: ComponentPortalFactory<NotificationTemplate>;
}

export const NGX_NOTIFY_CONFIG = new InjectionToken<NotificationConfig>('NGX_NOTIFY_LITE_CONFIG');

export const useComponentTemplate = <T extends NotificationTemplate>(compType: ComponentType<T>) =>
    (injector: Injector) =>
        new ComponentPortal(compType, null, injector);

export const DEFAULT_NOTIFY_CONFIG: NotificationConfig = {
    portalFactory: useComponentTemplate(DefaultNotifyTemplateComponent)
};
