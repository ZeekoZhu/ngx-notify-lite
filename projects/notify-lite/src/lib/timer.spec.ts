import { Timer } from "./timer";
import { fakeAsync, tick } from "@angular/core/testing";

class FakeTimeProvider {
    time = 0;
    now = () => this.time;
}

fdescribe('Timer', () => {
    let timer: Timer;
    let timeProvider: FakeTimeProvider;
    beforeEach(() => {
        timeProvider = new FakeTimeProvider();
        timer = new Timer(timeProvider);
    });

    describe('start', () => {
        let flag = false;
        beforeEach(() => {
            timer.event$.subscribe(() => {
                flag = true;
            });
        });

        it('should alarm when timeout', fakeAsync(() => {
            timer.start(1000);
            expect(timer['state']['state']).toBe('running');
            tick(1000);
            expect(flag).toBeTruthy();
            expect(timer['state']['state']).toBe('stopped');
        }));
    });

    describe('pause', () => {
        let flag = false;
        beforeEach(() => {
            timer.event$.subscribe(() => {
                flag = true;
            });
        });

        it('should pause even time out', fakeAsync(() => {
            timer.start(1000);
            expect(timer['state']['state']).toBe('running');
            tick(200);
            timeProvider.time += 200;
            timer.pause();
            tick(1000);
            expect(timer['state']['state']).toBe('paused');
            expect(flag).toBeFalsy();
        }));
    });

    describe('resume', () => {
        let flag = false;
        beforeEach(() => {
            timer.event$.subscribe(() => {
                flag = true;
            });
        });

        it('should running after resume', fakeAsync(() => {
            timer.start(1000);
            tick(200);
            timeProvider.time += 200;
            timer.pause();
            tick(1000);

            expect(flag).toBeFalsy();
            timer.resume();
            expect(timer['state']['state']).toBe('running');
            tick(800);
            timeProvider.time += 800;
            expect(timer['state']['state']).toBe('stopped');
            expect(flag).toBeTruthy();
        }));
    });

    describe('stop', () => {
        let flag = false;
        beforeEach(() => {
            timer.event$.subscribe(() => {
                flag = true;
            });
        });

        it('should stop while running', fakeAsync(() => {
            timer.start(1000);
            tick(200);
            timeProvider.time += 200;

            expect(timer['state']['state']).toBe('running');
            timer.stop();
            expect(timer['state']['state']).toBe('stopped');
            expect(flag).toBeTruthy();
        }));

    });

    const errorMsg = (state: string) => `Invalid state: ${state}`;

    describe('invalid state', () => {
        beforeEach(() => {
            timer.start(1000);
        });

        it('should throw error when resume while running', () => {
            expect(() => {
                timer.resume();
            }).toThrowError(errorMsg('running'));
        });

        it('should throw error when start while running', () => {
            expect(() => {
                timer.start(2333);
            }).toThrowError(errorMsg('running'));
        });

        it('should throw error when pause while paused', () => {
            timer.pause();
            expect(() => {
                timer.pause();
            }).toThrowError(errorMsg('paused'));
        })
    });
});
