import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, Input, Output,
    ViewChild
} from '@angular/core';
import { NotificationData } from "../notification-data";
import {
    animate,
    AnimationBuilder,
    AnimationMetadata,
    AnimationPlayer, state,
    style,
    transition,
    trigger
} from "@angular/animations";
import { NotificationTemplate } from "./notification-config";

@Component({
    selector: 'ngx-default-notify-template',
    templateUrl: './default-notify-template.component.html',
    styleUrls: ['./default-notify-template.component.less'],
    animations: [
        trigger('show', [
            state('true',
                style({
                    right: 0,
                    opacity: 1
                })
            ),
            state('false',
                style({
                    right: '-400px',
                    opacity: 0
                })
            ),
            transition('* => true',
                [
                    style({
                        right: '-400px',
                        opacity: 0
                    }),
                    animate('200ms ease-in-out')
                ]
            ),
            transition('true <=> false', animate('200ms ease-in-out'))
        ]),
    ]
})

export class DefaultNotifyTemplateComponent implements AfterViewInit, NotificationTemplate {
    @Input() data: NotificationData;
    @ViewChild('bar', { static: false }) barRef: ElementRef<HTMLDivElement>;
    @Output() dismiss = new EventEmitter<void>();
    private player: AnimationPlayer;
    private show = true;
    started = true;

    constructor(private animationBuilder: AnimationBuilder) {
    }

    private barAnimation(): AnimationMetadata[] {
        return [
            style({ height: "100%" }),
            animate(this.data.autoDismissTimeout, style({ height: 0 }))
        ];
    }

    internalDismiss() {
        this.started = false;
        this.show = false;
        setTimeout(() => {
            this.dismiss.emit();
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
