export class Message {
    id:    number = 0;
    time:  number;
    whose: string;
    text:  string;
    type:  string = 'message';
    constructor(time: number, whose: string, text: string) {
        this.time  = time;
        this.whose = whose;
        this.text  = text;
    }
}