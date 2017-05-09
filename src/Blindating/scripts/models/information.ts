import { User }         from './user';
import { Quote }        from './quote';
import { Photo }        from './photo';
import { Conversation } from './conversation';
import { Question }     from './question';
import { Notification } from './notification';
import { Feedback }     from './feedback';
import { Detail }       from './detail';
import { Preference }   from './preference';
import { Rating }       from './rating';


export class Information {
    id: number;
    userFK: number;
    user: User;
    quotes: Quote[];
    photos: Photo[];
    conversations: Conversation[];
    questions: Question[];
    notifications: Notification[];
    feebacks: Feedback[];
    detail: Detail;
    preference: Preference;
    rating: Rating;
}