import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { DefaultNotifyTemplateComponent } from './default-notify-template.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockDirective } from 'ng-mocks';
import { SlideInOutDirective } from '../directives/slide-in-out.directive';
import createSpy = jasmine.createSpy;

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

        it('should delay dismissed event 400ms', fakeAsync(() => {
            const callback = createSpy();
            component.dismissed.subscribe(callback);
            fixture.detectChanges();
            flushMicrotasks();
            expect(component.show).toBe(false);
            expect(callback).not.toHaveBeenCalled();
            tick(400);
            expect(callback).toHaveBeenCalled();
        }));

        describe('disable pause on hover', () => {
            beforeEach(() => {
                component.data = { ...component.data, pauseOnHover: false };
                spyOn(component, 'pause').and.callThrough();
                spyOn(component, 'resume').and.callThrough();
            });

            it('should not pause on hover', fakeAsync(() => {
                fixture.detectChanges();
                component.onHover();
                expect(component.pause).not.toHaveBeenCalled();
                flushMicrotasks();
                tick(400);
            }));

            it('should not resume on leave', fakeAsync(() => {
                fixture.detectChanges();
                component.onLeave();
                expect(component.resume).not.toHaveBeenCalled();
                flushMicrotasks();
                tick(400);
            }));
        });

        describe('enable pause on hover', () => {
            beforeEach(() => {
                component.data = { ...component.data, pauseOnHover: true };
                spyOn(component, 'pause').and.callThrough();
                spyOn(component, 'resume').and.callThrough();
            });

            it('should pause on hover', fakeAsync(() => {
                fixture.detectChanges();
                component.onHover();
                expect(component.pause).toHaveBeenCalled();
                flushMicrotasks();
                tick(400);
            }));

            it('should resume on leave', fakeAsync(() => {
                fixture.detectChanges();
                component.onLeave();
                expect(component.resume).toHaveBeenCalled();
                flushMicrotasks();
                tick(400);
            }));
        });
    });
});
