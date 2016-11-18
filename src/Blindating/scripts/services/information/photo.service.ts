import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { Photo }                                   from '../../models/photo';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../base.service';
import { AuthHttp }                                from 'angular2-jwt';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class PhotoService extends BaseService {
    constructor(public _http: Http,
                public _authHttp: AuthHttp) {
        super(_http, _authHttp, 'api/user/photo');
    }

    public GetLastCount(userID: number, count: number): Observable<Array<Photo>> {
        return this._authHttp.post(API_ADDRESS + this.api + "/getlastcount", JSON.stringify({ userID, count }), this.options)
            .map(user => user.json()['result']);
    }
}