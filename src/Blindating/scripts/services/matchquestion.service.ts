import {
    Http,
    Response,
    Headers,
    RequestOptions
}                        from '@angular/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs/Observable';
import { User }          from '../models/user';
import { MatchQuestion } from '../models/matchquestion';
import { SearchUserData }    from '../static/utils';
import { API_ADDRESS }   from '../static/config';
import { BaseService }   from '../services/base.service';
import { AuthHttp }      from 'angular2-jwt';
import                      'rxjs/add/operator/map';
import                      'rxjs/add/operator/catch';
@Injectable()
export class MatchQuestionService extends BaseService {
    public api: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });

    constructor(public _http: Http,
        public _authHttp: AuthHttp) {
        super(_http, _authHttp, 'api/user/matchquestion');
    }
    public GetAllOverriden(): Observable<Array<any>> {
        return this._authHttp.get(API_ADDRESS + this.api + "/getalloverriden", this.options)
            .map(users => users.json()['result']);
    }
    public GetMatchedWith(remoteUserID: number): Observable<Array<any>> {
        return this._authHttp.post(API_ADDRESS + this.api + "/getmatchedwith", JSON.stringify(remoteUserID), this.options)
            .map(users => users.json()['result']);
    }
    public AddOverriden(matchQuestion: MatchQuestion): Observable<any> {
        return this._authHttp.post(API_ADDRESS + this.api + "/addoverriden", JSON.stringify(matchQuestion), this.options)
            .map(mq => mq.json()['result']);
    }
}