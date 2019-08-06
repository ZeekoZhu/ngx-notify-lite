import { ModuleWithProviders, NgModule } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NotifyCenterService } from "./notify-center.service";


@NgModule({
    declarations: [DefaultNotifyTemplateComponent],
    entryComponents: [DefaultNotifyTemplateComponent],
    imports: [OverlayModule, PortalModule, CommonModule, BrowserAnimationsModule],
    exports: [
        DefaultNotifyTemplateComponent
    ]
})
export class NotifyLiteModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotifyLiteModule,
            providers: [
                NotifyCenterService
            ]
        }
    }
}
