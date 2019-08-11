import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, Input, Output,
    ViewChild
} from '@angular/core';
import { NotificationData } from '../notification-data';
import {
    animate,
    AnimationBuilder,
    AnimationMetadata,
    AnimationPlayer, style
} from '@angular/animations';
import { NotificationTemplate } from './notification-config';

@Component({
    selector: 'ngx-default-notify-template',
    templateUrl: './default-notify-template.component.html',
    styleUrls: ['./default-notify-template.component.less'],
})

export class DefaultNotifyTemplateComponent implements AfterViewInit, NotificationTemplate {

    constructor(private animationBuilder: AnimationBuilder) {
    }

    @Input() data: NotificationData;
    @ViewChild('bar', { static: false }) barRef: ElementRef<HTMLDivElement>;
    @Output() dismissed = new EventEmitter<void>();
    private player: AnimationPlayer;
    show = true;
    started = true;

    dismiss() {
        this.stop();
    }

    private barAnimation(): AnimationMetadata[] {
        return [
            style({ height: '100%' }),
            animate(this.data.autoDismissTimeout, style({ height: 0 }))
        ];
    }

    internalDismiss() {
        this.started = false;
        this.show = false;
        setTimeout(() => {
            this.dismissed.emit();
        }, 400);
    }

    start() {
        const animation = this.animationBuilder.build(this.barAnimation());
        this.player = animation.create(this.barRef.nativeElement);
        this.player.play();
        this.player.onDone(() => {
            this.internalDismiss();
        });
    }

    pause() {
        if (this.player && this.started) {
            this.player.pause();
        }
    }

    resume() {
        if (this.player && this.started) {
            this.player.play();
        }
    }

    stop() {
        this.pause();
        this.internalDismiss();
    }

    onHover() {
        if (this.data.autoDismiss && this.data.pauseOnHover) {
            this.pause();
        }
    }

    onLeave() {
        if (this.data.autoDismiss && this.data.pauseOnHover) {
            this.resume();
        }
    }

    ngAfterViewInit() {
        if (this.data.autoDismiss) {
            this.start();
        }
    }
}

