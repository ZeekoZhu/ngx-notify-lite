import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationData } from "../notification-data";
import { animate, AnimationBuilder, AnimationMetadata, AnimationPlayer, style } from "@angular/animations";

@Component({
    selector: 'ngx-default-notify-template',
    templateUrl: './default-notify-template.component.html',
    styleUrls: ['./default-notify-template.component.less']
})
export class DefaultNotifyTemplateComponent implements AfterViewInit {
    @Input() data: NotificationData;
    @ViewChild('bar', { static: false }) barRef: ElementRef<HTMLDivElement>;
    private player: AnimationPlayer;
    private started = false;

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
        });
        this.started = true;
    }

    pause() {
        if(this.player && this.started) {
            this.player.pause();
        }
    }

    resume() {
        if(this.player && this.started) {
            this.player.play();
        }
    }

    ngAfterViewInit() {
    }
}
