import { NgModule } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [DefaultNotifyTemplateComponent],
    entryComponents: [],
    imports: [OverlayModule, PortalModule, CommonModule],
    exports: [
        DefaultNotifyTemplateComponent
    ]
})
export class NotifyLiteModule {
}
