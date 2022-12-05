class PushprocException extends Error {

  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.name = "PushprocException";
    this.statusCode = statusCode;
    this.stack = (<any>new Error()).stack;
  }
}

export default PushprocException;
