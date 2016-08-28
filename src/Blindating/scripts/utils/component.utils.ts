import {User} from './../user'
import {Quote, Photo, Conversation, Question, Answer, Notification} from './user.utils'

export class Profilemenu {
    public profilemenu: Profilemenu;
    public CITIES: Array<string>;
    public quote: Quote;
    public photos: Array<Photo>;
    public conversations: Array<Conversation>;
    public notifications: Array<any>;
    public currentQuestionIndex: number;
    public question: string = "";
    public questions: Array<Question>;
    public gender: string = "";
    public relation: string = "";
    public age: any = { from: '', to: '' };
    public city: string;
    public cities: Array<string>;
    public country: string;
    public isOpenPhotos: boolean;
    public isOpenConversations: boolean;
    public notificationHTML: Array<any> = [];
}