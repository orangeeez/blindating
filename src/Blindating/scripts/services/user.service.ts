import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../models/user';
import { API_ADDRESS }                             from '../static/config';
import { BaseService }                             from '../services/base.service';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class UserService extends BaseService {
    constructor(public _http: Http) {
        super(_http, 'api/user');
    }

    public Register(user: User): Observable<string> {
        return this._http.post(API_ADDRESS + this.api + "/register", JSON.stringify(user), this.options)
            .map(jwt => jwt.json()['result']);
    }

    public Login(auth: any): Observable<User> {
        return this._http.post(API_ADDRESS + this.api + "/login", JSON.stringify(auth), this.options)
            .map(user => user.json()['result']);
    }

    public Logout(userID: number) {
        return this._http.post(API_ADDRESS + this.api + "/logout", userID, this.options);
    }

    public GetBy(field: string, value: string): Observable<User> {
        return this._http.post(API_ADDRESS + this.api + "/getby", JSON.stringify({ field, value }), this.options)
            .map(user => user.json()['result']);
    }
}