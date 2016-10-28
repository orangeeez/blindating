import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { Photo }                                   from '../../models/photo';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../base.service';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class PhotoService extends BaseService {
    constructor(public _http: Http) {
        super(_http, 'api/user/photo');
    }

    public GetLastCount(userID: number, count: number): Observable<Array<Photo>> {
        return this._http.post(API_ADDRESS + this.api + "/getlastcount", JSON.stringify({ userID, count }), this.options)
            .map(user => user.json()['result']);
    }
}