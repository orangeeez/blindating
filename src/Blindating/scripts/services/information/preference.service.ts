import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { Preference }                              from '../../models/preference';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../base.service';
import { AuthHttp }                                from 'angular2-jwt';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class PreferenceService extends BaseService {
    constructor(public _http: Http,
                public _authHttp: AuthHttp) {
        super(_http, _authHttp, 'api/user/preference');
    }

    public GetCities(country: string): Observable<Array<string>> {
        return this._authHttp.post(API_ADDRESS + this.api + "/getcities", JSON.stringify(country), this.options)
            .map(result => result.json()['result']);
    }
}