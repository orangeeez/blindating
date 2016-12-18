import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { Quote }                                   from '../../models/quote';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../base.service';
import { QuoteLike }                               from '../../models/quotelike'
import { AuthHttp }                                from 'angular2-jwt';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class QuoteService extends BaseService {
    constructor(public _http: Http,
                public _authHttp: AuthHttp) {
        super(_http, _authHttp, 'api/user/quote');
    }

    public SetLike(qlike: QuoteLike): Observable<boolean> {
        return this._authHttp.post(API_ADDRESS + this.api + "/setlike", JSON.stringify(qlike), this.options)
            .map(res => !!res.text());
    }
}