import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { DefaultNotifyTemplateComponent } from './default-notify-template.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockDirective } from 'ng-mocks';
import { SlideInOutDirective } from '../directives/slide-in-out.directive';

fdescribe('DefaultNotifyTemplateComponent', () => {
    let component: DefaultNotifyTemplateComponent;
    let fixture: ComponentFixture<DefaultNotifyTemplateComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DefaultNotifyTemplateComponent,
                MockDirective(SlideInOutDirective)
            ],
            imports: [NoopAnimationsModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultNotifyTemplateComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('disable auto dismiss', () => {
        beforeEach(() => {
            component.data = {
                message: '233',
                autoDismissTimeout: 0,
                autoDismiss: false,
                pauseOnHover: false,
                type: 'info'
            };
            spyOn(component, 'start');
            fixture.detectChanges();
        });

        it('should not call start', () => {
            expect(component.start).toHaveBeenCalledTimes(0);
        });
    });

    describe('enable auto dismiss', () => {
        beforeEach(() => {
            component.data = {
                message: '233',
                autoDismissTimeout: 1000,
                autoDismiss: true,
                pauseOnHover: false,
                type: 'info'
            };
            spyOn(component, 'start').and.callThrough();
            spyOn(component, 'internalDismiss').and.callThrough();
        });

        it('should call start', fakeAsync(() => {
            fixture.detectChanges();
            expect(component.start).toHaveBeenCalledTimes(1);
            flushMicrotasks();

            // slide out timeout
            tick(1000);
        }));

        it('should not dismiss before timeout', fakeAsync(() => {
            fixture.detectChanges();
            expect(component.show).toBeTruthy('component.show !== true');
            expect(component.internalDismiss).not.toHaveBeenCalled();
            flushMicrotasks();

            // slide out timeout
            tick(1000);
        }));

        it('should dismiss after timeout', fakeAsync(() => {
            fixture.detectChanges();
            flushMicrotasks();
            expect(component.internalDismiss).toHaveBeenCalled();
            expect(component.show).toBeFalsy();

            // slide out timeout
            tick(1000);
        }));
    });
});
