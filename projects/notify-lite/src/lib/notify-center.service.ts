import { Injectable, Injector } from "@angular/core";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { NotificationData, NOTIFY_DATA } from "./notification-data";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { DefaultNotifyTemplateComponent } from "./default-notify-template/default-notify-template.component";

@Injectable({
    providedIn: 'root'
})
export class NotifyCenterService {
    private overlayRef : OverlayRef;
    constructor(private overlay: Overlay, private injector: Injector) {
    }
    private overlayInit() {
        this.overlayRef = this.overlay.create();
        this.overlayRef.addPanelClass('notify-center-panel')
    }

    show(data: NotificationData) {
       data.msgId = performance.now();
       if(!this.overlayRef) {
           this.overlayInit();
       }
       const tokens = new WeakMap();
       tokens.set(NOTIFY_DATA, data);
       const injector = new PortalInjector(this.injector, tokens);
       const compPortal = new ComponentPortal(DefaultNotifyTemplateComponent, null, injector);
       this.overlayRef.attach(compPortal);
    }
}
