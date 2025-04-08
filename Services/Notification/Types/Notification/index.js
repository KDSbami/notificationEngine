class Notification {
    constructor(id,subject, message, type, timestamp, to, providerId,status, latency) {
        this.id = id;
        this.message = message;
        this.subject = subject;
        this.type = type;
        this.to = to;
        this.providerId = providerId;
        this.timestamp = timestamp;
        this.status = status;
        this.latency = latency;
    }
    // for typescript would be better to use and there would be strict decoders and encoders

}