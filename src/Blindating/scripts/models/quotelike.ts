import { User }  from './user';
import { Quote } from './quote';

export class QuoteLike {
    id:            number;
    quoteLikeFK:   number;
    remoteUserID:  number;
    direction:     string;
    result:        boolean;
    message:       string;

    updateQuote:   Quote;
}