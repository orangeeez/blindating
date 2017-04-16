import { User }  from './user';
import { Quote } from './quote';

export class QuoteLike {
    id:                       number;
    quoteLikeFK:              number;
    remoteUserID:             number;
    direction:                string;
    result:                   boolean;
    message:                  string;

    // not mapped
    informationNotificationFK: number;
    remoteInfoNotificationFK:  number;
    updateQuote:   Quote;
}