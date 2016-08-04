import {Http, Response, Headers, RequestOptions, Jsonp} from 'angular2/http'
import {Injectable}     from 'angular2/core'
import {Observable}     from 'rxjs/Observable'
import {Quote}          from './../utils/user.utils'

@Injectable()
export class UserInfoService {
    private api = 'api/user';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) { }

    GetRandomQuote(userID: string): Observable<Quote> {
        let body = userID;

        return this.http.post(this.api + "/getrandomquote", body, this.options)
            .map(res => res.json());
    }
}