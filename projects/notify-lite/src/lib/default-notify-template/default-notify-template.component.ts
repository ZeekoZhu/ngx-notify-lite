import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, inject,
    Input, Output,
    ViewChild,
    Inject
} from '@angular/core';
import { NotificationData, NOTIFY_DATA } from "../notification-data";
import {
    animate,
    AnimationBuilder,
    AnimationMetadata,
    AnimationPlayer,
    style,
    transition,
    trigger
} from "@angular/animations";

@Component({
    selector: 'ngx-default-notify-template',
    templateUrl: './default-notify-template.component.html',
    styleUrls: ['./default-notify-template.component.less'],
    animations: [
        trigger('containerTrigger', [
            transition(':enter', [
                style({
                    right: '-400px',
                    opacity: 0
                }),
                animate('200ms ease-in', style({
                    right: 0,
                    opacity: 1
                }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({
                    right: '-400px',
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class DefaultNotifyTemplateComponent implements AfterViewInit {
    @ViewChild('bar', { static: false }) barRef: ElementRef<HTMLDivElement>;
    @Output() dismiss = new EventEmitter<NotificationData>();
    private player: AnimationPlayer;
    private started = false;

    constructor(private animationBuilder: AnimationBuilder, @Inject(NOTIFY_DATA) private data: NotificationData) {
    }

    private barAnimation(): AnimationMetadata[] {
        return [
            style({ height: "100%" }),
            animate(this.data.autoDismissTimeout, style({ height: 0 }))
        ];
    }


    start() {
        const animation = this.animationBuilder.build(this.barAnimation());
        this.player = animation.create(this.barRef.nativeElement);
        this.player.play();
        this.player.onDone(() => {
            this.started = false;
        });
        this.started = true;
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

    ngAfterViewInit() {
    }
}
