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
    AnimationPlayer,
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
                style({
                    right: 0,
                    opacity: 1
                }),
                animate('200ms ease-out', style({
                    right: '-400px',
                    opacity: 0
                }))
            ])
        ])
    ]
})
export class DefaultNotifyTemplateComponent implements AfterViewInit, NotificationTemplate {
    @Input() data: NotificationData;
    @ViewChild('bar', { static: false }) barRef: ElementRef<HTMLDivElement>;
    @Output() dismiss = new EventEmitter<void>();
    private player: AnimationPlayer;
    started = false;

    constructor(private animationBuilder: AnimationBuilder) {
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
            this.dismiss.emit();
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
        this.start();
    }
}
