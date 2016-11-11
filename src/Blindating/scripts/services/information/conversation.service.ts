import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable }                              from '@angular/core';
import { Observable }                              from 'rxjs/Observable';
import { User }                                    from '../../models/user';
import { API_ADDRESS }                             from '../../static/config';
import { BaseService }                             from '../../services/base.service';
import                                                  'rxjs/add/operator/map';
import                                                  'rxjs/add/operator/catch';
@Injectable()
export class ConversationService extends BaseService {
    constructor(public _http: Http) {
        super(_http, 'api/user/conversation');
    }
}