export class ErrorResponce{
    reason: string;
    message: string;

    constructor(reason: string, message: string){
        this.message = message;
        this.reason = reason;
    }
}