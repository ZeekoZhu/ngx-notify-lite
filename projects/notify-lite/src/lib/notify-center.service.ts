import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from "@angular/core";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { NotificationData } from "./notification-data";
import { DomPortalHost } from "@angular/cdk/portal";
import { NGX_NOTIFY_CONFIG, NotificationConfig } from "./default-notify-template/notification-config";

@Injectable({
    providedIn: 'root'
})
export class NotifyCenterService {
    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        @Inject(NGX_NOTIFY_CONFIG) private config,
    ) {
    }

    private overlayInit() {
        this.overlayRef = this.overlay.create();
        this.overlayRef.addPanelClass('notify-center-panel');
    }

    show(data: NotificationData, config?: NotificationConfig) {
        if (!this.overlayRef) {
            this.overlayInit();
        }
        const actualConfig: NotificationConfig = { ...this.config, ...config || {} };
        const portalFactory = actualConfig.portalFactory;

        const portal = portalFactory(this.injector);
        const overlayHost = new DomPortalHost(
            this.overlayRef.overlayElement,
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );
        const compRef = overlayHost.attach(portal);
        compRef.instance.data = data;
        compRef.changeDetectorRef.detectChanges();
        compRef.instance.dismiss.subscribe(() => {
            overlayHost.detach();
            overlayHost.dispose();
        });
    }
}
