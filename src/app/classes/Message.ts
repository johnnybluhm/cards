import { SocketEvent } from "../events/Events";

export default class Message {
    severity: Severity;
    content: string;
    event?: SocketEvent;
    constructor(severity: Severity, content: string, event?: SocketEvent) {
        this.event = event;
        this.severity = severity;
        this.content = content;
    }
}

export enum Severity {
    Info = 'info',
    Error = 'error',
    Success = 'success',
    Warning = 'warning'
}