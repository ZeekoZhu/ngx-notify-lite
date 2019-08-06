import { NgModule } from '@angular/core';
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { DefaultNotifyTemplateComponent } from './default-notify-template/default-notify-template.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
    declarations: [DefaultNotifyTemplateComponent],
    entryComponents: [],
    imports: [OverlayModule, PortalModule, CommonModule, BrowserAnimationsModule],
    exports: [
        DefaultNotifyTemplateComponent
    ]
})
export class NotifyLiteModule {
}
