import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, AnimationBuilder, AnimationMetadata, style } from '@angular/animations';

@Directive({
    selector: '[ngxSlideInOut]'
})
export class SlideInOutDirective implements OnChanges {
    @Input() slideDirection: 'rtl' | 'ltr' = 'rtl';
    @Input() slideDistance = 360;
    @Input('ngxSlideInOut') show = false;
    @Input() slideDuration = 200;

    constructor(private elRef: ElementRef<HTMLElement>, private builder: AnimationBuilder) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const showChange = changes.show;
        if (showChange) {
            if ((showChange.previousValue === false || showChange.previousValue === undefined) && showChange.currentValue === true) {
                this.playAnimation(this.slideIn());
            } else if (showChange.previousValue === true && showChange.currentValue === false) {
                this.playAnimation(this.slideOut());
            }
        }
    }

    private get side() {
        return this.slideDirection === 'rtl' ? 'right' : 'left';
    }

    private playAnimation(metadata: AnimationMetadata[]) {
        const animation = this.builder.build(metadata);
        const player = animation.create(this.elRef.nativeElement);
        player.play();
    }

    slideIn(): AnimationMetadata [] {
        return [
            style({
                [this.side]: `-${this.slideDistance}px`,
                opacity: 0
            }),
            animate(`${this.slideDuration}ms ease-in`,
                style({
                    [this.side]: 0,
                    opacity: 1
                })
            )
        ];
    }

    slideOut(): AnimationMetadata[] {
        return [
            style({
                [this.side]: 0,
                opacity: 1
            }),
            animate(`${this.slideDuration}ms ease-out`,
                style({
                    [this.side]: `-${this.slideDistance}px`,
                    opacity: 0
                }),
            )
        ];
    }

}
