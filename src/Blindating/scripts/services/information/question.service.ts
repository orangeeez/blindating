﻿import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { Question }                                from '../../models/question';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../../services/base.service';
import { QuestionAnswer }                          from '../../models/questionanswer'
import { AuthHttp }                                from 'angular2-jwt';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class QuestionService extends BaseService {
    constructor(public _http: Http,
        public _authHttp: AuthHttp) {
        super(_http, _authHttp, 'api/user/question');
    }

    public SetAnswer(answer: QuestionAnswer): Observable<boolean> {
        return this._authHttp.post(API_ADDRESS + this.api + "/setanswer", JSON.stringify(answer), this.options)
            .map(res => !!res.text());
    }

    public GetNotAnsweredByID(userID: number): Observable<Array<any>> {
        return this._authHttp.post(API_ADDRESS + this.api + "/getnotansweredbyid", JSON.stringify(userID), this.options)
            .map(user => user.json()['result']);
    }
}