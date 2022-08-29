import { TimerClosingStatus } from "ui-kit/shared_components/Timer/Timer.types";

export const LineColors : {[key in keyof typeof TimerClosingStatus]: string}= {
    [TimerClosingStatus.ClosedAutomatically]: 'var(--bg)',
    [TimerClosingStatus.Done]: 'var(--success)',
    [TimerClosingStatus.Overdue]: 'var(--error)',

};
