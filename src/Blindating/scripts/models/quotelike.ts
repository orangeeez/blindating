import { User }  from './user';
import { Quote } from './quote';

export class QuoteLike {
    id:            number;
    result:        boolean;
    remoteUserID:  number;
    message:       string;
    informationFK: number;

    updateQuote:   Quote;
    userID:        number;
}