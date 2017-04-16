import {
    Http,
    Response,
    Headers,
    RequestOptions
}                      from '@angular/http';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import { User }        from '../models/user';
import { SearchUserData }  from '../static/utils';

import { API_ADDRESS } from '../static/config';
import { BaseService } from '../services/base.service';
import { AuthHttp }    from 'angular2-jwt';
import                      'rxjs/add/operator/map';
import                      'rxjs/add/operator/catch';
@Injectable()
export class SocialService {
    public api: string;
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });

    constructor(public _http: Http,
                public _authHttp: AuthHttp) {
        this.api = 'api/user';
    }

    public GetVKInfo(code: string): Observable<any> {
         return this._http.post(this.api + "/getvkinfo", JSON.stringify(code), this.options)
             .map(res => res.json());
     }
}