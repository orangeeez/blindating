import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../models/user';
import { API_ADDRESS }                             from '../static/config';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class BaseService {
    public api: string;
    constructor(public _http:   Http,
                public _api: string) {
        this.api = _api;
    }

    protected headers = new Headers({ 'Content-Type': 'application/json' });
    protected options = new RequestOptions({ headers: this.headers });

    public GetAll(): Observable<Array<any>> {
        return this._http.get(API_ADDRESS + this.api + "/getall", this.options)
            .map(users => users.json()['result']);
    }
    public GetAllByID(userID: number): Observable<Array<any>> {
        return this._http.post(API_ADDRESS + this.api + "/getallbyid", JSON.stringify(userID), this.options)
            .map(user => user.json()['result']);
    }
    public GetLast(userID: number): Observable<any> {
        return this._http.post(API_ADDRESS + this.api + "/getlast", JSON.stringify(userID), this.options)
            .map(user => user.json()['result']);
    }
    public Add(entity: any): Observable<number> {
        return this._http.post(API_ADDRESS + this.api + "/add", JSON.stringify(entity), this.options)
            .map(user => user.json()['result']);
    }
    public Update(entity: any): Observable<boolean> {
        return this._http.post(API_ADDRESS + this.api + "/update", JSON.stringify(entity), this.options)
            .map(user => user.json()['result']);
    }
    public Remove(entity: any): Observable<boolean> {
        return this._http.post(API_ADDRESS + this.api + "/remove", JSON.stringify(entity), this.options)
            .map(user => user.json()['result']);
    }
}