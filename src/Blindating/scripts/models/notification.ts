export class Notification {
    ID: number;
    type: string;
    JSONObject: string;
    isShown: boolean;
    date: Date;

    // NotMapped
    object: any;

    constructor(ID, type, JSONObject, isShown) {
        this.ID      = ID;
        this.type    = type;
        this.JSONObject  = JSONObject;
        this.isShown = isShown;
    }
}