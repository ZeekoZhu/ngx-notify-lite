import { Observable, Subject } from "rxjs";

interface TimerState {
    startTime: number;
    elapsedTime: number;
    totalTime: number;
    state: 'running' | 'paused' | 'stopped';
}

interface ITimeProvider {
    now(): number;
}

export class Timer {
    private $event: Subject<void> = new Subject<void>();
    event$: Observable<void> = this.$event.asObservable();
    private handle;
    private state: TimerState = {
        startTime: -1,
        elapsedTime: 0,
        totalTime: -1,
        state: 'stopped'
    };

    constructor(private timeProvider: ITimeProvider = performance) {
    }

    alarm() {
        clearTimeout(this.handle);
        this.$event.next();
        this.state.state = 'stopped';
    }

    start(timeout: number) {
        if (this.state.state !== 'stopped') {
            throw new Error(`Invalid state: ${this.state.state}`);
        }
        this.state.startTime = this.timeProvider.now();
        this.state.totalTime = timeout;
        this.state.elapsedTime = 0;
        this.state.state = 'running';
        this.handle = setTimeout(() => {
            this.alarm();
        }, timeout);

    }

    pause() {
        if (this.state.state !== 'running') {
            throw new Error(`Invalid state: ${this.state.state}`);
        }
        clearTimeout(this.handle);
        const now = this.timeProvider.now();
        this.state.elapsedTime += now - this.state.startTime;
        this.state.state = 'paused';
    }

    resume() {
        if (this.state.state !== 'paused') {
            throw new Error(`Invalid state: ${this.state.state}`);
        }
        this.state.startTime = this.timeProvider.now();
        this.handle = setTimeout(() => {
            this.alarm();
        }, Math.max(this.state.totalTime - this.state.elapsedTime, 0));
        this.state.state = 'running';
    }

    stop() {
        this.alarm();
    }

    dispose() {
        this.$event.complete();
        clearTimeout(this.handle);
    }

}
