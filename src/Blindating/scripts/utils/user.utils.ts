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
    Start: Date;
    End: Date;
    Duration: Date;
    Length: string;
    StartString: string;
    EndString: string;
    DurationString: string;
    User: User;
}
export class Preference {
    ID: number;
    Gender: string;
    Relationship: string;
    From: string;
    To: string;
    Country: string;
    City: string;
}
export class Question {
    ID: number;
    Message: string;
}
export class Answer {
    ID: number;
    Result: boolean;
    UserID: number;
    RemoteUserID: number;
    Message: string;
}
export class Notification {
    ID: number;
    Table: string;
    EntityID: string;
    IsShown: boolean;
}