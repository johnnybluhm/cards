export default class Message {
    severity: Severity;
    content: string;
    constructor(severity: Severity, content: string) {
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