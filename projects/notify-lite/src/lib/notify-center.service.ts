import {
    ApplicationRef,
    ComponentFactoryResolver,
    Inject,
    Injectable,
    Injector, Optional,
    Renderer2,
    RendererFactory2
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { NotificationData } from './notification-data';
import { DomPortalOutlet, Portal } from '@angular/cdk/portal';
import { DEFAULT_NOTIFY_CONFIG, NGX_NOTIFY_CONFIG, NotificationConfig } from './notification-config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class NotifyCenterService {
    private overlayRef: OverlayRef;
    private renderer: Renderer2;
    private config: NotificationConfig;
    private $clearAll = new Subject();

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        rendererFactory: RendererFactory2,
        @Inject(NGX_NOTIFY_CONFIG) @Optional() config: NotificationConfig,
    ) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.config = { ...DEFAULT_NOTIFY_CONFIG, ...config };
    }

    private overlayInit() {
        this.overlayRef = this.overlay.create();
        this.overlayRef.addPanelClass('notify-center-panel');
    }

    private attachToOverlay(portal: Portal<any>, data: NotificationData) {
        const hostPlaceHolder = this.renderer.createElement('div');
        this.overlayRef.overlayElement.appendChild(hostPlaceHolder);
        const overlayHost = new DomPortalOutlet(
            hostPlaceHolder,
            this.componentFactoryResolver,
            this.appRef,
            this.injector,
        );
        const compRef = overlayHost.attach(portal);
        compRef.instance.data = data;
        this.$clearAll.pipe(takeUntil(compRef.instance.dismissed))
            .subscribe(() => {
                compRef.instance.dismiss();
            });
        compRef.instance.dismissed.subscribe(() => {
            overlayHost.dispose();
        });

    }

    show(data: NotificationData, config?: NotificationConfig) {
        if (!this.overlayRef) {
            this.overlayInit();
        }

        const actualData = { ...data };
        const actualConfig: NotificationConfig = { ...this.config, ...config };
        const portalFactory = actualConfig.portalFactory;
        const portal = portalFactory(this.injector);
        this.attachToOverlay(portal, actualData);
    }

    clearAll() {
        this.$clearAll.next();
    }
}
