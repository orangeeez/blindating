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
    DateString: string;
    TimeString: string;
    UserID: number;
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
export class Detail {
    ID: number;
    Firstname: string;
    BirthDate: Date
    City: string
    PrefferdLanguage: string
    AlsoSpeak: string;
    Relationship: string;
    Orientation: string;
    Work: string;
    Education: string;
    Ethnicity: string;
    BodyType: string;
    Height: number;
    HairColor: string;
    EyeColor: string;
    Wear: string;
    IHave: string;
    ClothingStyle: string;
    MyBestPart: string;
    OverallAppearance: string;
}