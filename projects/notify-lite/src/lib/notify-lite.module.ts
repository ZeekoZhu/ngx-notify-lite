import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyCenterService } from './notify-center.service';
import { defaultConfig, NGX_NOTIFY_CONFIG } from './default-notify-template/notification-config';
import { SlideInOutDirective } from './directives/slide-in-out.directive';


@NgModule({
    declarations: [
        DefaultNotifyTemplateComponent,
        SlideInOutDirective
    ],
    entryComponents: [DefaultNotifyTemplateComponent],
    imports: [OverlayModule, PortalModule, CommonModule, BrowserAnimationsModule],
    exports: [
        SlideInOutDirective
    ]
})
export class NotifyLiteModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotifyLiteModule,
            providers: [
                NotifyCenterService,
                {
                    provide: NGX_NOTIFY_CONFIG,
                    useValue: defaultConfig
                }
            ]
        };
    }
}
