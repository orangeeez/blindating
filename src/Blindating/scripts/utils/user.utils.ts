import {User} from './../user'

export class Quote {
    ID: number;
    Author: string;
    Content: string;
}
export class Photo {
    ID: number;
    Path: string;
    Width: number;
    Height: number;
}
export class Conversation {
    ID: number;
    JWT: string;
    User: User;
}