import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../../services/base.service';
import { AuthHttp }                                from 'angular2-jwt';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class NotificationService extends BaseService {
    constructor(public _http: Http,
                public _authHttp: AuthHttp) {
        super(_http, _authHttp, 'api/user/notification');
    }

    public GetCount(userID: number): Observable<number> {
        return this._authHttp.post(API_ADDRESS + this.api + "/getcount", userID, this.options)
            .map(users => users.json()['result']);
    }
}