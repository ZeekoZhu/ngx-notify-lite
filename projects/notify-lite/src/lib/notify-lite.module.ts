import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyCenterService } from './notify-center.service';
import { defaultConfig, NGX_NOTIFY_CONFIG, NotificationConfig } from './notification-config';
import { SlideInOutDirective } from './directives/slide-in-out.directive';
import { ActionTemplateComponent } from './action-template/action-template.component';


@NgModule({
    declarations: [
        DefaultNotifyTemplateComponent,
        SlideInOutDirective,
        ActionTemplateComponent
    ],
    entryComponents: [DefaultNotifyTemplateComponent, ActionTemplateComponent],
    imports: [OverlayModule, PortalModule, CommonModule, BrowserAnimationsModule],
    exports: [
        SlideInOutDirective
    ]
})
export class NotifyLiteModule {
    static forRoot(config?: Partial<NotificationConfig>): ModuleWithProviders {
        return {
            ngModule: NotifyLiteModule,
            providers: [
                NotifyCenterService,
                {
                    provide: NGX_NOTIFY_CONFIG,
                    useValue: { ...defaultConfig, ...config }
                }
            ]
        };
    }
}
