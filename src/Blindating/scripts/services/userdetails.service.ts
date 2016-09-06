import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {Quote, Photo, Conversation, Preference, Question, Answer, Notification, Detail} from './../utils/user.utils'
import {API_ADDRESS}    from './../mock/utils'


@Injectable()
export class UserDetailsService {
    private api = 'api/details';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    GetDetails(userID: number): Observable<Detail> {
        return this.http.post(API_ADDRESS + this.api + "/getdetails", userID + "", this.options)
            .map(res => res.json());
    }
}