import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DEFAULT_NOTIFY_CONFIG, NGX_NOTIFY_CONFIG, NotificationConfig } from './notification-config';
import { SlideInOutDirective } from './directives/slide-in-out.directive';
import { ActionTemplateComponent } from './action-template/action-template.component';
import { NotifyCenterService } from './notify-center.service';

@NgModule({
    declarations: [
        DefaultNotifyTemplateComponent,
        SlideInOutDirective,
        ActionTemplateComponent,
    ],
    entryComponents: [DefaultNotifyTemplateComponent, ActionTemplateComponent],
    imports: [OverlayModule, PortalModule, CommonModule, BrowserAnimationsModule],
    exports: [
        SlideInOutDirective,
    ],
})
export class NotifyLiteModule {
    constructor(@Optional() @SkipSelf() parentModule: NotifyLiteModule) {
        if (parentModule) {
            throw new Error(
                'NotifyLiteModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(config?: Partial<NotificationConfig>): ModuleWithProviders {
        return {
            ngModule: NotifyLiteModule,
            providers: [
                NotifyCenterService,
                {
                    provide: NGX_NOTIFY_CONFIG,
                    useValue: config,
                },
            ],
        };

    }
}

