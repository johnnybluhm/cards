export default class Message {
    severity: Severity;
    content: string;
    constructor(severity: Severity, content: string) {
        this.severity = severity;
        this.content = content;
    }
}

type Severity = "info" | "error" | "success" | "warning";